"""Valida y empaqueta el examen de consola UT3 sin publicarlo en el indice."""

from decimal import Decimal
from html.parser import HTMLParser
from pathlib import Path
import argparse
import re
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED


ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "projects/prom/ut03/ExamenUT3"
SOLUTION = ROOT / "soluciones/prom/ut03/ExamenUT3"
OUTPUT = ROOT / "questions/prom/ut03/examen-practico"
ZIP_NAME = "prom-ut03-examen-base.zip"
SOLUTION_ZIP = "prom-ut03-examen-resuelto.zip"
PUBLIC_URL = "https://jsotera.github.io/moodle/questions/prom/ut03/examen-practico/" + ZIP_NAME


class Statement(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.text = []
        self.tasks = {}

    def handle_data(self, data):
        self.text.append(data)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "data-todo" in attrs:
            number = attrs["data-todo"]
            if number in self.tasks:
                raise ValueError("TODO repetido en el enunciado: " + number)
            self.tasks[number] = Decimal(attrs["data-puntos"])


def validate(fragment):
    tasks = {}
    for source in sorted(PROJECT.rglob("*.java")):
        text = source.read_text(encoding="utf-8")
        for number, statement in re.findall(r"// TODO (\d{2}): ([^\r\n]+)", text):
            if number in tasks:
                raise ValueError("TODO repetido en Java: " + number)
            tasks[number] = statement
    parser = Statement()
    parser.feed(fragment)
    visible = " ".join(" ".join(parser.text).split())
    if set(tasks) != set(parser.tasks):
        raise ValueError("Deben coincidir los TODO del codigo y del enunciado.")
    for number, statement in tasks.items():
        if f"TODO {number}: {statement}" not in visible:
            raise ValueError("El enunciado difiere del TODO " + number)
    if sum(parser.tasks.values()) != Decimal("10"):
        raise ValueError("La puntuacion debe sumar 10.")
    if PUBLIC_URL not in fragment:
        raise ValueError("Falta el enlace absoluto al ZIP para Moodle.")
    return len(tasks)


def build(statement_only=False):
    fragment = (OUTPUT / "enunciado-fragmento.html").read_text(encoding="utf-8")
    count = validate(fragment)
    standalone = '''<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Examen UT3</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/all.min.css" rel="stylesheet">
  <style>
    body { background: #f4f6f7; color: #202428; font-family: Arial, sans-serif; line-height: 1.55; }
    .container { max-width: 1100px; margin: 0 auto; }
    .card { border-radius: 6px; background: white; }
    h2 { font-size: 26px; } h4 { font-size: 20px; }
    pre { background: #f0f3f5; color: #161b20; padding: 16px; border-radius: 4px; white-space: pre; overflow-x: auto; }
    code { overflow-wrap: anywhere; }
    pre code { color: inherit; font-family: Consolas, monospace; overflow-wrap: normal; }
    li { margin-bottom: 10px; }
    @media print {
      body { background: white; }
      .container, .card { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; border: 0 !important; box-shadow: none !important; }
      .btn { display: none; } h2, h4, h5 { break-after: avoid; }
      pre, tr { break-inside: avoid; } pre { white-space: pre-wrap; } .table-responsive { overflow: visible; }
    }
  </style>
</head>
<body>
''' + fragment.replace(PUBLIC_URL, ZIP_NAME) + "\n</body>\n</html>\n"
    (OUTPUT / "enunciado.html").write_text(standalone, encoding="utf-8", newline="\n")
    print(f"{count} TODO verificados; puntuacion total: 10 puntos.")
    print(OUTPUT / "enunciado.html")
    if statement_only:
        return
    solution_output = OUTPUT / "soluciones"
    solution_output.mkdir(exist_ok=True)
    for project, target in ((PROJECT, OUTPUT / ZIP_NAME), (SOLUTION, solution_output / SOLUTION_ZIP)):
        package_project(project, target, standalone)
    print(OUTPUT / ZIP_NAME)
    print(solution_output / SOLUTION_ZIP)


def package_project(project, target, standalone):
    with ZipFile(target, "w", compression=ZIP_DEFLATED) as archive:
        files = [(file.relative_to(project), file.read_bytes()) for file in sorted(project.rglob("*"))
                 if file.is_file() and file.suffix.lower() in (".java", ".xml", ".md", ".bat", ".ps1")
                 and not {"target", ".idea", ".git"}.intersection(file.relative_to(project).parts)]
        files.append((Path("enunciado.html"), standalone.encode("utf-8")))
        for relative, data in files:
            info = ZipInfo("ExamenUT3/" + relative.as_posix(), date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, data)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--statement-only", action="store_true", help="Actualiza solo el enunciado HTML, sin empaquetar proyectos.")
    args = parser.parse_args()
    build(args.statement_only)
