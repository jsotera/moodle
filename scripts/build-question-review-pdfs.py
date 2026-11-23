"""Genera cuestionarios PDF con y sin soluciones desde exportaciones Moodle XML."""

import argparse
from dataclasses import dataclass
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import textwrap
import xml.etree.ElementTree as ET

try:
    import reportlab
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.units import mm
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.platypus import (
        HRFlowable, KeepTogether, PageBreak, Paragraph, Preformatted,
        SimpleDocTemplate, Spacer, Table, TableStyle,
    )
except ImportError as error:
    raise SystemExit(
        "Instala la dependencia: python -m pip install -r scripts/requirements-questions-pdf.txt"
    ) from error


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DIRECTORY = ROOT / "questions/prom/ut03"


class HTMLBlocks(HTMLParser):
    """Extrae parrafos y pre, conservando espacios y saltos del codigo."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = []
        self.kind = None
        self.buffer = []

    def handle_starttag(self, tag, attrs):
        if tag in ("p", "pre"):
            self.flush()
            self.kind = tag
        elif tag == "br":
            self.buffer.append("\n")

    def handle_endtag(self, tag):
        if tag == self.kind:
            self.flush()

    def handle_data(self, data):
        if self.kind:
            self.buffer.append(data)

    def flush(self):
        if self.kind is not None:
            self.blocks.append((self.kind, "".join(self.buffer)))
        self.kind = None
        self.buffer = []


def html_blocks(value):
    parser = HTMLBlocks()
    parser.feed(value or "")
    parser.flush()
    return parser.blocks


@dataclass
class Question:
    identifier: str
    block: str
    body: list
    answers: list
    correct: int
    feedback: list


def read_questions(file):
    root = ET.parse(file).getroot()
    if root.tag != "quiz":
        raise ValueError(f"{file}: no es Moodle XML.")
    questions = []
    category = "Preguntas"
    for node in root.findall("question"):
        kind = node.get("type")
        if kind == "category":
            category = node.findtext("category/text", "Preguntas").rsplit("/", 1)[-1]
            continue
        if kind != "multichoice" or node.findtext("single") != "true":
            raise ValueError(f"{file}: solo se admiten preguntas de respuesta unica.")
        answers = node.findall("answer")
        correct = [i for i, answer in enumerate(answers) if float(answer.get("fraction", "0")) == 100]
        if len(answers) != 4 or len(correct) != 1:
            raise ValueError(f"{file}: se requieren cuatro opciones y una correcta.")
        questions.append(Question(
            node.findtext("idnumber") or node.findtext("name/text", "Sin identificador"),
            category,
            html_blocks(node.findtext("questiontext/text")),
            [html_blocks(answer.findtext("text")) for answer in answers],
            correct[0],
            html_blocks(node.findtext("generalfeedback/text")),
        ))
    if not questions:
        raise ValueError(f"{file}: no contiene preguntas.")
    return questions


def register_fonts():
    bundled = Path(reportlab.__file__).parent / "fonts"
    pdfmetrics.registerFont(TTFont("ReviewSans", str(bundled / "Vera.ttf")))
    pdfmetrics.registerFont(TTFont("ReviewBold", str(bundled / "VeraBd.ttf")))
    pdfmetrics.registerFontFamily("ReviewSans", normal="ReviewSans", bold="ReviewBold")
    for candidate in (
        Path("C:/Windows/Fonts/DejaVuSansMono.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"),
        Path("/System/Library/Fonts/Supplemental/Courier New.ttf"),
    ):
        if candidate.exists():
            pdfmetrics.registerFont(TTFont("ReviewMono", str(candidate)))
            return "ReviewMono"
    return "Courier"


class ReviewDocument(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        bookmark = getattr(flowable, "review_bookmark", None)
        if bookmark:
            key, title, level = bookmark
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title, key, level=level, closed=True)


def wrap_code(text, font, size, width):
    columns = max(20, int(width / pdfmetrics.stringWidth("M", font, size)))
    lines = []
    for line in text.expandtabs(4).split("\n"):
        lines.extend(textwrap.wrap(
            line, width=columns, subsequent_indent="    ",
            replace_whitespace=False, drop_whitespace=False,
            break_long_words=True, break_on_hyphens=False,
        ) or [""])
    return "\n".join(lines)


def build_pdf(xml_file, output, mono, include_answers=True):
    questions = read_questions(xml_file)
    label = "Banco de entrenamiento"
    if "modelo-a" in xml_file.stem:
        label = "Examen - Modelo A"
    elif "modelo-b" in xml_file.stem:
        label = "Examen - Modelo B"
    styles = {
        "title": ParagraphStyle("Title", fontName="ReviewBold", fontSize=17, leading=21, spaceAfter=8),
        "block": ParagraphStyle("Block", fontName="ReviewBold", fontSize=12, leading=16, spaceAfter=12),
        "question": ParagraphStyle("Question", fontName="ReviewBold", fontSize=8.5, leading=12, spaceAfter=6),
        "body": ParagraphStyle("Body", fontName="ReviewSans", fontSize=9, leading=13, spaceAfter=6),
        "code": ParagraphStyle("Code", fontName=mono, fontSize=8.4, leading=11, spaceAfter=7),
        "small": ParagraphStyle("Small", fontName="ReviewSans", fontSize=8, leading=11, textColor=colors.HexColor("#47515b"), spaceAfter=6),
        "mark": ParagraphStyle("Mark", fontName="ReviewBold", fontSize=7, leading=10, textColor=colors.HexColor("#17623b")),
    }
    version_title = "Revision con soluciones" if include_answers else "Cuestionario sin soluciones"
    doc = ReviewDocument(
        str(output), pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm,
        topMargin=18 * mm, bottomMargin=17 * mm,
        title=f"PROM UT3 - {label} - {version_title}",
        author="Materiales PROM - LMGI",
    )

    def render(blocks, width, small=False):
        result = []
        for kind, text in blocks:
            if kind == "pre":
                result.append(Preformatted(wrap_code(text, mono, 8.4, width - 4), styles["code"], dedent=0))
            elif text.strip():
                result.append(Paragraph(escape(text).replace("\n", "<br/>"), styles["small" if small else "body"]))
        return result or [Spacer(1, 1)]

    story = [
        Paragraph("PROM UT3 - " + label, styles["title"]),
        Paragraph(f"{'REVISIÓN CON SOLUCIONES' if include_answers else 'CUESTIONARIO SIN SOLUCIONES'} · {len(questions)} preguntas", styles["body"]),
        Paragraph(
            "La opción correcta está marcada en verde y con CORRECTA. Las letras siguen el orden del XML; Moodle puede mezclar las opciones."
            if include_answers else "Selecciona una única opción por pregunta.",
            styles["small"],
        ),
        Spacer(1, 5),
    ]
    current_block = None
    for number, question in enumerate(questions, 1):
        if question.block != current_block:
            if current_block is not None:
                story.append(PageBreak())
            heading = Paragraph(escape(question.block), styles["block"])
            heading.review_bookmark = (f"block-{number}", question.block, 0)
            story.append(heading)
            current_block = question.block
        heading = Paragraph(f"{number:03}. {escape(question.identifier)}", styles["question"])
        heading.review_bookmark = (f"question-{number}", question.identifier, 1)
        content = [heading] + render(question.body, doc.width)
        for index, answer in enumerate(question.answers):
            correct = include_answers and index == question.correct
            answer_width = doc.width - (100 if include_answers else 36)
            cells = [
                Paragraph(chr(65 + index) + ")", styles["body"]),
                render(answer, answer_width),
            ]
            if include_answers:
                cells.append(Paragraph("CORRECTA" if correct else "", styles["mark"]))
            widths = [24, doc.width - 88, 64] if include_answers else [24, doc.width - 24]
            table = Table([cells], colWidths=widths, hAlign="LEFT")
            commands = [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]
            if correct:
                commands += [
                    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#e7f3eb")),
                    ("LINEBEFORE", (0, 0), (0, -1), 2, colors.HexColor("#287548")),
                ]
            table.setStyle(TableStyle(commands))
            content.append(table)
        if include_answers and question.feedback:
            content += [Spacer(1, 5), Paragraph("Explicación", styles["small"])]
            content += render(question.feedback, doc.width, small=True)
        content += [Spacer(1, 7), HRFlowable(width="100%", thickness=0.4, color=colors.HexColor("#c9ced2")), Spacer(1, 11)]
        story.append(KeepTogether(content))

    def page_frame(canvas, document):
        canvas.saveState()
        canvas.setFont("ReviewSans", 7.5)
        canvas.setFillColor(colors.HexColor("#47515b"))
        canvas.drawString(doc.leftMargin, A4[1] - 11 * mm, "PROM UT3 - " + label)
        header = "REVISIÓN DOCENTE - RESPUESTAS MARCADAS" if include_answers else "CUESTIONARIO - SIN SOLUCIONES"
        canvas.drawRightString(A4[0] - doc.rightMargin, A4[1] - 11 * mm, header)
        canvas.drawString(doc.leftMargin, 9 * mm, xml_file.name)
        canvas.drawRightString(A4[0] - doc.rightMargin, 9 * mm, f"Página {document.page}")
        canvas.restoreState()

    doc.build(story, onFirstPage=page_frame, onLaterPages=page_frame)
    return len(questions), doc.page


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("xml", nargs="*", type=Path, help="XML de respuesta unica; por defecto los tres de PROM UT3.")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_DIRECTORY / "revision-pdf")
    parser.add_argument("--version", choices=("ambas", "con-respuestas", "sin-respuestas"), default="ambas")
    args = parser.parse_args()
    inputs = args.xml or [DEFAULT_DIRECTORY / name for name in (
        "prom-ut03-banco-entrenamiento.xml", "prom-ut03-examen-modelo-a.xml", "prom-ut03-examen-modelo-b.xml",
    )]
    mono = register_fonts()
    versions = ("con-respuestas", "sin-respuestas") if args.version == "ambas" else (args.version,)
    for file in inputs:
        for version in versions:
            directory = args.output_dir / version
            directory.mkdir(parents=True, exist_ok=True)
            include_answers = version == "con-respuestas"
            suffix = "revision" if include_answers else "cuestionario"
            output = directory / f"{file.stem}-{suffix}.pdf"
            count, pages = build_pdf(file, output, mono, include_answers=include_answers)
            print(f"{output}: {count} preguntas, {pages} paginas.")


if __name__ == "__main__":
    main()
