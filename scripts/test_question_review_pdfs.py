"""Pruebas del lector Moodle y de la generacion de PDF con respuestas."""

import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("review_pdf", ROOT / "scripts/build-question-review-pdfs.py")
PDF = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = PDF
SPEC.loader.exec_module(PDF)


SAMPLE = '''<?xml version="1.0" encoding="UTF-8"?>
<quiz>
  <question type="category"><category><text>top/UT3 - Bloque I - Selección</text></category></question>
  <question type="multichoice">
    <idnumber>UT3-TEST-01</idnumber><single>true</single>
    <questiontext><text><![CDATA[<p>¿Qué muestra?</p><pre><code>int niño = 1;
if (niño &lt; 3) {
    System.out.print(&quot;Sí&quot;);
}</code></pre>]]></text></questiontext>
    <answer fraction="-33.33333"><text><![CDATA[<pre><code>No</code></pre>]]></text></answer>
    <answer fraction="100"><text><![CDATA[<pre><code>Sí</code></pre>]]></text></answer>
    <answer fraction="-33.33333"><text><![CDATA[<pre><code>null</code></pre>]]></text></answer>
    <answer fraction="-33.33333"><text><![CDATA[<p>Ninguna de las anteriores</p>]]></text></answer>
    <generalfeedback><text><![CDATA[<p>La condición es verdadera.</p>]]></text></generalfeedback>
  </question>
</quiz>'''


class ReviewPdfTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.mono = PDF.register_fonts()

    def test_html_entities_and_line_breaks(self):
        blocks = PDF.html_blocks('<p>¿Qué muestra?</p><pre><code>if (a &lt; b) {\n\tprint(&quot;ñ&quot;);\n}</code></pre>')
        self.assertEqual(blocks, [("p", "¿Qué muestra?"), ("pre", 'if (a < b) {\n\tprint("ñ");\n}')])

    def test_line_wrapping_does_not_remove_characters(self):
        source = '    System.out.print("Un texto suficientemente largo para dividir la línea");'
        wrapped = PDF.wrap_code(source, self.mono, 8.4, 180)
        self.assertIn("\n", wrapped)
        self.assertEqual("".join(source.split()), "".join(wrapped.split()))

    def test_answer_order_and_correct_option(self):
        with tempfile.TemporaryDirectory() as temporary:
            xml = Path(temporary) / "sample.xml"
            xml.write_text(SAMPLE, encoding="utf-8")
            question, = PDF.read_questions(xml)
            self.assertEqual(question.identifier, "UT3-TEST-01")
            self.assertEqual(question.correct, 1)
            self.assertEqual(question.answers[1], [("pre", "Sí")])
            self.assertIn('    System.out.print("Sí");', question.body[1][1])

    def test_multiple_correct_answers_are_rejected(self):
        with tempfile.TemporaryDirectory() as temporary:
            xml = Path(temporary) / "sample.xml"
            xml.write_text(SAMPLE.replace('fraction="-33.33333"', 'fraction="100"', 1), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "una correcta"):
                PDF.read_questions(xml)

    def test_pdf_build(self):
        with tempfile.TemporaryDirectory() as temporary:
            xml = Path(temporary) / "sample.xml"
            output = Path(temporary) / "sample.pdf"
            xml.write_text(SAMPLE, encoding="utf-8")
            count, pages = PDF.build_pdf(xml, output, self.mono)
            self.assertEqual(count, 1)
            self.assertEqual(pages, 1)
            self.assertTrue(output.read_bytes().startswith(b"%PDF-"))

    def test_student_version_omits_markings_and_feedback(self):
        with tempfile.TemporaryDirectory() as temporary:
            xml = Path(temporary) / "sample.xml"
            output = Path(temporary) / "student.pdf"
            xml.write_text(SAMPLE, encoding="utf-8")
            with patch.object(PDF, "Paragraph", wraps=PDF.Paragraph) as paragraphs:
                count, pages = PDF.build_pdf(xml, output, self.mono, include_answers=False)
            texts = [call.args[0] for call in paragraphs.call_args_list]
            self.assertEqual((count, pages), (1, 1))
            self.assertNotIn("CORRECTA", texts)
            self.assertNotIn("Explicación", texts)
            self.assertNotIn("La condición es verdadera.", texts)
            self.assertIn("Ninguna de las anteriores", texts)
            self.assertTrue(output.read_bytes().startswith(b"%PDF-"))


if __name__ == "__main__":
    unittest.main()
