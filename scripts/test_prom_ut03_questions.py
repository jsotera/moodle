"""Pruebas de las variantes, los distractores y la exportacion Moodle de UT3."""

from collections import Counter
from copy import deepcopy
import html
import importlib.util
import json
from pathlib import Path
import re
import unittest
import xml.etree.ElementTree as ET
from xml.dom import minidom
import tempfile


ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = ROOT / "questions/prom/ut03"
SPEC = importlib.util.spec_from_file_location("questions_build", ROOT / "scripts/build-prom-ut03-questions.py")
BUILD = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(BUILD)


class QuestionsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.catalog = json.loads((DIRECTORY / "catalogo-preguntas.json").read_text(encoding="utf-8"))
        cls.archive = json.loads((DIRECTORY / "inventario-pdf.json").read_text(encoding="utf-8"))

    def test_counts_and_source_mapping(self):
        BUILD.validate(self.catalog)
        self.assertEqual(Counter(q["block"] for q in self.catalog["bank"]), {1: 55, 2: 66, 3: 9, 4: 20})
        for model, questions in self.catalog["exams"].items():
            self.assertEqual(Counter(q["block"] for q in questions), {
                block: count for block, count in BUILD.EXAM_COUNTS_BY_MODEL[model].items() if count
            })
        self.assertEqual(Counter(q["estado"] for q in self.archive["questions"]), {
            "incluida": 109, "duplicada_agrupada": 10, "fuera_ut3": 92,
        })
        by_id = {q["id"]: q for q in self.catalog["bank"]}
        for source in self.archive["questions"]:
            if source["estado"] == "fuera_ut3":
                continue
            origins = by_id[source["pregunta_banco"]]["origins"]
            self.assertTrue(any(o["pdf"] == source["pdf"] and o["pregunta"] == source["pregunta"] for o in origins))

    def test_restored_variants(self):
        by_id = {q["id"]: q for q in self.catalog["bank"]}
        for old_number, new_number in [(14, 6), (15, 7), (16, 8), (19, 11), (24, 14)]:
            old = by_id[f"UT3-PDF-Control-UT4-2024-25-V1-P{old_number:02}"]
            new = by_id[f"UT3-PDF-Control-UT4-2025-26-V1-P{new_number:02}"]
            self.assertEqual(old["code"], new["code"])
            self.assertNotEqual(set(old["choices"]), set(new["choices"]))
            self.assertEqual(len(old["origins"]), 1)
            self.assertEqual(len(new["origins"]), 1)

    def test_exact_duplicate_is_rejected(self):
        catalog = deepcopy(self.catalog)
        duplicate = deepcopy(catalog["bank"][0])
        duplicate["id"] = "DUPLICATE-TEST"
        duplicate["choices"].reverse()
        duplicate["correct"] = 3 - duplicate["correct"]
        catalog["bank"].append(duplicate)
        with self.assertRaisesRegex(ValueError, "pregunta repetida"):
            BUILD.validate(catalog)

    def test_damaged_accents_in_choices_are_rejected(self):
        catalog = deepcopy(self.catalog)
        catalog["bank"][0]["choices"][0] = "Una condici?n"
        with self.assertRaisesRegex(ValueError, "interrogante"):
            BUILD.validate(catalog)

    def test_text_output_has_no_zero_distractor(self):
        for question in self.catalog["bank"]:
            expected = question["verification"].get("expected") or ""
            if re.search("[A-Za-z]", expected):
                self.assertNotIn("0", question["choices"], question["id"])

    def test_break_continue_questions(self):
        added = [q for q in self.catalog["bank"] if q["id"].startswith((
            "UT3-BANK-B2-BREAK-", "UT3-BANK-B2-CONTINUE-",
        ))]
        self.assertEqual(len(added), 12)
        self.assertEqual(sum(bool(re.search(r"\bbreak\b", q["code"])) for q in added), 6)
        self.assertEqual(sum(bool(re.search(r"\bcontinue\b", q["code"])) for q in added), 6)
        for question in added:
            self.assertEqual(question["block"], 2)
            self.assertFalse(question["origins"])
            self.assertNotRegex(question["code"], r"\bdo\b")
            self.assertRegex(question["code"], r"\b(for|while)\b")
            self.assertEqual(question["verification"]["answer_mode"], "salida")
            self.assertEqual(question["verification"]["status"], "compilado_y_ejecutado")
            self.assertEqual(question["choices"][question["correct"]], question["verification"]["expected"])

    def test_selected_exception_questions_removed(self):
        by_id = {q["id"]: q for q in self.catalog["bank"]}
        for number in (8, 5, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 22):
            self.assertNotIn(f"UT3-BANK-B3-{number:02}", by_id)
        for model, questions in self.catalog["exams"].items():
            ids = {q["id"] for q in questions}
            letter = model[-1].upper()
            self.assertNotIn(f"UT3-EXAMEN-{letter}-B3-09", ids)

    def test_finally_questions_do_not_mix_control_jumps(self):
        questions = self.catalog["bank"] + sum(self.catalog["exams"].values(), [])
        for question in questions:
            if re.search(r"\bfinally\b", question["code"]):
                self.assertNotRegex(question["code"], r"\b(return|break|continue)\b")

    def test_xml_answers_round_trip(self):
        ids = set()
        for key, suffix in [("bank", "banco-entrenamiento"), ("examen-a", "examen-modelo-a"), ("examen-b", "examen-modelo-b")]:
            questions = self.catalog["bank"] if key == "bank" else self.catalog["exams"][key]
            by_id = {q["id"]: q for q in questions}
            file = DIRECTORY / f"prom-ut03-{suffix}.xml"
            text = file.read_text(encoding="utf-8", errors="strict")
            self.assertNotIn("\ufffd", text)
            nodes = ET.fromstring(text).findall("question[@type='multichoice']")
            self.assertEqual(len(nodes), len(questions))
            for node in nodes:
                identifier = node.findtext("idnumber")
                self.assertNotIn(identifier, ids)
                ids.add(identifier)
                question = by_id[identifier]
                answers = node.findall("answer")
                self.assertEqual(Counter(a.attrib["fraction"] for a in answers), {"100": 1, "-33.33333": 3})
                decoded = [html.unescape(re.sub("<[^>]*>", "", a.findtext("text"))) for a in answers]
                self.assertEqual(sorted(decoded), sorted(question["choices"]))
                correct = next(a for a in answers if a.attrib["fraction"] == "100")
                self.assertEqual(html.unescape(re.sub("<[^>]*>", "", correct.findtext("text"))), question["choices"][question["correct"]])

    def test_reviewed_model_a_is_preserved_on_regeneration(self):
        questions = self.catalog["exams"]["examen-a"]
        reviewed = [q for q in questions if q.get("moodle_xml")]
        self.assertEqual(len(reviewed), 20)
        expected_ids = {q["id"] for q in questions}
        self.assertEqual({q["id"] for q in reviewed}, expected_ids)
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "model-a.xml"
            BUILD.write_xml(questions, "examen-a", output)
            document = minidom.parse(str(output))
            actual = {}
            for node in document.getElementsByTagName("question"):
                if node.getAttribute("type") == "category":
                    continue
                identifier = node.getElementsByTagName("idnumber")[0].firstChild.data
                actual[identifier] = node
            self.assertEqual(len(actual), 20)
            for q in reviewed:
                self.assertEqual(actual[q["id"]].toxml(), q["moodle_xml"])
                node = ET.fromstring(q["moodle_xml"])
                source = node.findtext("questiontext/text")
                match = re.search(r"<pre\b[^>]*>(.*?)</pre>", source, re.S)
                code = html.unescape(re.sub("<[^>]*>", "", match[1]))
                self.assertEqual(code.replace("\r\n", "\n"), q["code"])

    def test_model_a_new_questions_use_simple_control_flow(self):
        initial_ids = {
            f"UT3-EXAMEN-A-B{block}-{number:02}"
            for block in (1, 2) for number in range(1, 6)
        }
        added = [q for q in self.catalog["exams"]["examen-a"] if q["id"] not in initial_ids]
        self.assertEqual(Counter(q["block"] for q in added), {1: 1, 2: 5, 3: 4})
        for q in added:
            self.assertNotRegex(q["code"], r"\bthrows\b|\bthrow\b|\bassert\b|\bdo\b")
            self.assertNotRegex(q["code"], r"(?:\+\+|--)\w|\w(?:\+\+|--)(?!\s*;)")
            if q["block"] == 3:
                self.assertEqual(len(re.findall(r"\btry\b", q["code"])), 1)
                self.assertNotRegex(q["code"], r"\b(return|break|continue)\b")

    def test_model_b_is_parallel_to_reviewed_model_a(self):
        model_a = self.catalog["exams"]["examen-a"]
        model_b = self.catalog["exams"]["examen-b"]
        self.assertEqual(len(model_a), len(model_b))
        structure = r"\b(?:if|else|switch|case|default|for|while|do|break|continue|try|catch|finally)\b"
        for a, b in zip(model_a, model_b):
            self.assertEqual(b["parallel_to"], a["id"])
            self.assertEqual(a["block"], b["block"])
            self.assertEqual(a["difficulty"], b["difficulty"])
            self.assertEqual(re.findall(structure, a["code"]), re.findall(structure, b["code"]), b["id"])
            self.assertNotEqual(a["code"], b["code"])
            self.assertNotEqual(a["choices"][a["correct"]], b["choices"][b["correct"]])
            self.assertNotRegex(b["code"], r"(?:\+\+|--)\w|\w(?:\+\+|--)(?!\s*[;)])")
            self.assertNotRegex(b["code"], r"\b(?:throws|throw|assert|extends)\b")


if __name__ == "__main__":
    unittest.main()
