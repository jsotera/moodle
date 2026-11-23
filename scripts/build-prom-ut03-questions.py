"""Genera y verifica las tres importaciones Moodle XML de PROM UT3."""

from pathlib import Path
from xml.dom.minidom import Document, parseString
import argparse
import collections
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = ROOT / "questions/prom/ut03"
ROMAN = {1: "I", 2: "II", 3: "III", 4: "IV"}
BLOCKS = {
    1: "Decisiones y estructuras de selección",
    2: "Estructuras de repetición",
    3: "Control y creación de excepciones",
    4: "Aserciones, prueba y depuración",
}
BANK_MINIMUMS = {1: 20, 2: 20, 3: 9, 4: 20}
EXAM_COUNTS = {1: 5, 2: 5, 3: 4, 4: 5}
EXAM_COUNTS_BY_MODEL = {
    "examen-a": {1: 6, 2: 10, 3: 4, 4: 0},
    "examen-b": {1: 6, 2: 10, 3: 4, 4: 0},
}


def normalize_output(value):
    return "\n".join(" ".join(line.split()) for line in value.strip().splitlines())


def output_layout(value):
    return "\n".join(line.rstrip() for line in value.splitlines()).strip("\n")


def validate(catalog):
    bank = catalog["bank"]
    exams = catalog["exams"]
    seen_ids = set()
    seen_questions = set()
    for group, questions in [("bank", bank), *exams.items()]:
        counts = collections.Counter(q["block"] for q in questions)
        if group == "bank":
            if any(counts[block] < BANK_MINIMUMS[block] for block in BLOCKS):
                raise ValueError("El banco no alcanza el minimo configurado de preguntas por bloque.")
        elif len(questions) != sum(EXAM_COUNTS_BY_MODEL[group].values()) or any(
            counts[block] != EXAM_COUNTS_BY_MODEL[group][block] for block in BLOCKS
        ):
            raise ValueError(f"{group}: reparto distinto del configurado para el examen.")
        for question in questions:
            identifier = question["id"]
            if identifier in seen_ids:
                raise ValueError(f"Identificador repetido: {identifier}")
            seen_ids.add(identifier)
            answers = question["choices"]
            if len(answers) != 4 or len(set(map(normalize_output, answers))) != 4:
                raise ValueError(f"{identifier}: debe tener cuatro respuestas distintas.")
            if question["correct"] not in range(4):
                raise ValueError(f"{identifier}: indice correcto no valido.")
            if re.search(r"no compila|error de compil|da error|no ejecuta", " ".join(answers), re.I):
                raise ValueError(f"{identifier}: respuesta de error no admitida.")
            signature = (
                question["prompt"], question["code"],
                tuple(sorted(map(normalize_output, answers))),
            )
            if signature in seen_questions:
                raise ValueError(f"{identifier}: pregunta repetida entre banco y examenes.")
            seen_questions.add(signature)
            for field in ("prompt", "code", "feedback"):
                if "\ufffd" in question[field]:
                    raise ValueError(f"{identifier}: caracter de sustitucion en {field}.")
            for value in [question["prompt"], question["feedback"], *answers]:
                if "\ufffd" in value or re.search(r"\w\?\w|(?<!\w)\?nica\b", value):
                    raise ValueError(f"{identifier}: posible acento sustituido por un interrogante.")
                if re.search(r"\u00c3[\u0080-\u00bf]|\u00e2\u20ac|\u00c2\u00a0", value):
                    raise ValueError(f"{identifier}: posible texto mal decodificado.")


def element(document, parent, name, text=None, **attributes):
    result = document.createElement(name)
    for key, value in attributes.items():
        result.setAttribute(key, str(value))
    parent.appendChild(result)
    if text is not None:
        result.appendChild(document.createTextNode(str(text)))
    return result


def html_element(document, parent, name, content):
    result = element(document, parent, name, format="html")
    text = element(document, result, "text")
    if "]]>" in content:
        raise ValueError("El HTML contiene un cierre CDATA no admitido.")
    text.appendChild(document.createCDATASection(content))
    return result


def paragraph(text):
    return "<p>" + html.escape(text) + "</p>"


def code_block(text, java=False):
    language = ' class="language-java"' if java else ""
    return "<pre><code" + language + ">" + html.escape(text) + "</code></pre>"


def write_xml(questions, group, output):
    document = Document()
    quiz = element(document, document, "quiz")
    root_category = {
        "bank": "Banco Java - Programación estructurada UT3",
        "examen-a": "Examen Java UT3 - Modelo A",
        "examen-b": "Examen Java UT3 - Modelo B",
    }[group]
    for block, title in BLOCKS.items():
        if not any(q["block"] == block for q in questions):
            continue
        category = element(document, quiz, "question", type="category")
        category_value = element(document, category, "category")
        element(document, category_value, "text",
                "$module$/top/" + root_category + "/UT3 - Bloque "
                + ROMAN[block] + " - " + title)
        element(document, category, "idnumber", "")
        for question in (q for q in questions if q["block"] == block):
            # Preserve manually reviewed Moodle fields and HTML without normalization.
            if question.get("moodle_xml"):
                reviewed = parseString(question["moodle_xml"]).documentElement
                if reviewed.tagName != "question":
                    raise ValueError("El XML revisado no contiene una pregunta.")
                quiz.appendChild(document.createComment("reviewed-" + question["id"]))
                continue
            node = element(document, quiz, "question", type="multichoice")
            name = element(document, node, "name")
            element(document, name, "text",
                    f"UT3 - Bloque {ROMAN[block]} - {question['id']}")
            body = paragraph(question["prompt"])
            if question["code"]:
                body += code_block(question["code"], java=True)
            html_element(document, node, "questiontext", body)
            feedback = question["feedback"]
            expected = question["verification"].get("expected")
            if expected and feedback.endswith("El resultado es: " + expected):
                feedback = feedback[:-(len("El resultado es: ") + len(expected))].rstrip()
            feedback_html = paragraph(feedback)
            if expected is not None and question["verification"].get("answer_mode") == "salida":
                feedback_html += paragraph("Salida comprobada:") + code_block(
                    expected or "No muestra nada")
            html_element(document, node, "generalfeedback", feedback_html)
            for tag, value in [
                ("defaultgrade", "0.5000000"), ("penalty", "0.3333333"),
                ("hidden", "0"), ("idnumber", question["id"]), ("single", "true"),
                ("shuffleanswers", "true"), ("answernumbering", "abc"),
                ("showstandardinstruction", "1"),
            ]:
                element(document, node, tag, value)
            for tag in ("correctfeedback", "partiallycorrectfeedback", "incorrectfeedback"):
                html_element(document, node, tag, "")
            # A stable rotation avoids storing every authored answer first.
            offset = int(hashlib.sha256(question["id"].encode("utf-8")).hexdigest()[:4], 16) % 4
            for index in [(position + offset) % 4 for position in range(4)]:
                correct = index == question["correct"]
                answer = element(document, node, "answer",
                                 fraction="100" if correct else "-33.33333", format="html")
                answer_text = element(document, answer, "text")
                value = question["choices"][index]
                prose_answers = {
                    "no muestra nada", "no imprime nada", "ninguna de las anteriores",
                    "ninguna de las respuestas es correcta", "un valor aleatorio", "nada",
                }
                is_output = (
                    question["verification"].get("answer_mode") == "salida"
                    and value.casefold() not in prose_answers
                )
                content = code_block(value) if (
                    "\n" in value or "\t" in value
                    or is_output
                ) else paragraph(value)
                answer_text.appendChild(document.createCDATASection(content))
                html_element(document, answer, "feedback", paragraph(
                    "Correcto." if correct else "Revisa el recorrido del código y la explicación."))
            tags = element(document, node, "tags")
            values = [
                "PROM-UT03", f"bloque-{block}",
                "origen-pdf" if question["origins"] else "nueva",
                "dificultad-" + question["difficulty"],
            ]
            for value in values:
                tag = element(document, tags, "tag")
                element(document, tag, "text", value)
    content = document.toprettyxml(indent="  ", encoding="UTF-8").decode("utf-8")
    for question in questions:
        if question.get("moodle_xml"):
            content = content.replace(
                "<!--reviewed-" + question["id"] + "-->", question["moodle_xml"], 1)
    output.write_bytes(content.encode("utf-8"))


def verify_java(catalog, java_home):
    executable = "java.exe" if os.name == "nt" else "java"
    java = Path(java_home) / "bin" / executable if java_home else Path(shutil.which("java") or "")
    javac = java.with_name("javac.exe" if os.name == "nt" else "javac")
    version = subprocess.run([str(java), "-version"], capture_output=True, text=True)
    match = re.search(r'version "(\d+)', version.stderr + version.stdout)
    if not match or int(match[1]) != 25:
        raise ValueError("La verificacion requiere el JDK 25; indica --java-home.")
    questions = catalog["bank"] + catalog["exams"]["examen-a"] + catalog["exams"]["examen-b"]
    executed = 0
    with tempfile.TemporaryDirectory(prefix="prom-ut03-questions-") as temporary:
        temporary = Path(temporary)
        sources = []
        for index, question in enumerate(questions):
            name = f"Question{index:03}"
            code = re.sub(r"\bQuestionCheck\b", name, question["verification"]["java"])
            file = temporary / (name + ".java")
            file.write_text(code, encoding="utf-8")
            sources.append(file)
        compiled = subprocess.run(
            [str(javac), "-encoding", "UTF-8", "-d", str(temporary), *map(str, sources)],
            capture_output=True, text=True, encoding="utf-8")
        if compiled.returncode:
            raise ValueError(compiled.stderr)
        for index, question in enumerate(questions):
            verification = question["verification"]
            if not verification["run"]:
                continue
            completed = subprocess.run(
                [str(java), "-ea" if verification["assertions"] else "-da",
                 "-cp", str(temporary), f"Question{index:03}"],
                capture_output=True, text=True, encoding="utf-8", timeout=3)
            if completed.returncode:
                raise ValueError(question["id"] + ": " + completed.stderr)
            expected = verification.get("expected")
            if expected is not None and output_layout(completed.stdout) != output_layout(expected):
                raise ValueError(f"{question['id']}: salida distinta de la esperada.")
            if verification.get("answer_mode") == "salida":
                answer = question["choices"][question["correct"]]
                actual = completed.stdout.strip() or "No muestra nada"
                if output_layout(answer) != output_layout(actual):
                    raise ValueError(f"{question['id']}: respuesta distinta de la salida Java.")
            executed += 1
    print(f"JDK 25: {len(questions)} arneses compilados; {executed} ejecutados.")
    print("Los bucles sin terminacion se revisan por analisis, no se ejecutan.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--verify-java", action="store_true")
    parser.add_argument("--java-home", default=os.environ.get("JAVA_HOME"))
    options = parser.parse_args()
    catalog = json.loads((DIRECTORY / "catalogo-preguntas.json").read_text(encoding="utf-8"))
    validate(catalog)
    if options.verify_java:
        verify_java(catalog, options.java_home)
    for group, questions, filename in [
        ("bank", catalog["bank"], "prom-ut03-banco-entrenamiento.xml"),
        ("examen-a", catalog["exams"]["examen-a"], "prom-ut03-examen-modelo-a.xml"),
        ("examen-b", catalog["exams"]["examen-b"], "prom-ut03-examen-modelo-b.xml"),
    ]:
        write_xml(questions, group, DIRECTORY / filename)
        print(f"{filename}: {len(questions)} preguntas.")


if __name__ == "__main__":
    main()
