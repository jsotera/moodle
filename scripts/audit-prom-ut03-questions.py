"""Compara las opciones del banco UT3 con las conservadas de cada PDF original."""

from collections import Counter
import json
from pathlib import Path


DIRECTORY = Path(__file__).resolve().parents[1] / "questions/prom/ut03"


def normalize(value):
    return " ".join(value.split()).casefold()


def comparison(original, current, source):
    before = Counter(map(normalize, original))
    after = Counter(map(normalize, current))
    if before == after:
        return "Sin cambio de contenido"
    if source["pdf"] == "Control UT4 2023_24 V1.pdf" and source["pregunta"] == 8:
        return "Solo redacción"
    synonyms = {"no imprime nada": "no muestra nada"}
    canonical = Counter(synonyms.get(normalize(v), normalize(v)) for v in original)
    if canonical == after:
        return "Solo redacción"
    if before - Counter(["5"]) + Counter(["5.0"]) == after and "5" in before:
        return "Precisión de salida (5 a 5.0)"
    return "Cambio de contenido"


def explain(original, current, question, source):
    category = comparison(original, current, source)
    if source["pdf"] == "Control UT4 2023_24 V1.pdf" and source["pregunta"] == 8:
        return "Se acortó la redacción de las cuatro afirmaciones, conservando su significado."
    if category == "Solo redacción":
        return "Se sustituyó «No imprime nada» por «No muestra nada»; mismo significado."
    if category.startswith("Precisión"):
        return "La salida es de tipo double: se muestra 5.0, no 5."
    if question["id"].endswith("2024-25-V1-P16"):
        return "Se reformularon las cuatro opciones como explicaciones para mantener cuatro alternativas sin usar null ni errores de compilación."
    if source["pdf"] == "Control UT4 2023_24 V1.pdf" and source["pregunta"] == 7:
        return "Se reformuló la comparación for/while: la distinción entre número conocido/desconocido de vueltas no es una obligación del lenguaje."
    if question["kind"] == "analysis":
        return "Se sustituyeron las opciones por explicaciones del comportamiento del bucle. No era necesario reemplazarlas todas; se deja señalado para revisar."
    if question["kind"] == "range":
        return "Se precisaron los intervalos y la inclusión de sus extremos para distinguir el rango completo de otros intervalos."
    removed = [v for v in original if normalize(v) not in set(map(normalize, current))]
    reasons = []
    if any("ninguna" in v.casefold() for v in removed):
        actual = normalize(current[question["correct"]])
        if actual not in set(map(normalize, original)):
            reasons.append("Se sustituyó «ninguna de las anteriores», que representaba la respuesta correcta, por la salida explícita. También se podía conservar la opción original.")
        else:
            reasons.append("Se reemplazó el distractor válido «ninguna de las anteriores» por otra salida; no era imprescindible.")
    if any("error" in v.casefold() or "compila" in v.casefold() or "bloquea" in v.casefold() for v in removed):
        reasons.append("Se reemplazaron opciones de error o bloqueo para evitar ese tipo de distractor.")
    if any("\n" in v for v in original + current):
        reasons.append("Además de reconstruir los saltos de línea, se sustituyó al menos un patrón o salida; no es solo maquetación.")
    if len(question["origins"]) > 1:
        reasons.append("Se agruparon en una pregunta variantes con el mismo código, pero algunos PDF tenían distractores diferentes.")
    if not reasons:
        reasons.append("Se sustituyeron distractores o se incluyó explícitamente la salida calculada. Consultar el antes y el después.")
    return " ".join(reasons)


def options_block(options):
    lines = ["```text"]
    for index, value in enumerate(options):
        rows = value.expandtabs(4).splitlines() or [""]
        lines.append(f"{chr(97 + index)}) {rows[0]}")
        lines.extend("   " + row for row in rows[1:])
    return lines + ["```", ""]


def main():
    catalog = json.loads((DIRECTORY / "catalogo-preguntas.json").read_text(encoding="utf-8"))
    inventory = json.loads((DIRECTORY / "inventario-pdf.json").read_text(encoding="utf-8"))
    by_id = {q["id"]: q for q in catalog["bank"]}
    rows = []
    for source in inventory["questions"]:
        if source["estado"] == "fuera_ut3":
            continue
        question = by_id[source["pregunta_banco"]]
        original = list(source["opciones_originales"].values())
        assert len(original) == 4
        kind = comparison(original, question["choices"], source)
        rows.append((source, question, original, kind))
    counts = Counter(row[3] for row in rows)
    changed = [row for row in rows if row[3] != "Sin cambio de contenido"]
    changed_ids = {row[1]["id"] for row in changed}
    content_ids = {row[1]["id"] for row in rows if row[3] == "Cambio de contenido"}
    lines = [
        "# Revisión de opciones: PROM UT3", "",
        "Comparación de cada pregunta histórica incluida con las cuatro opciones de su PDF original.",
        f"No incluye las {sum(not q['origins'] for q in catalog['bank'])} preguntas nuevas del banco ni los dos modelos nuevos de examen.",
        "Se comparan conjuntos de opciones: cambiar su orden no cuenta como cambio de contenido.",
        "Los espacios de maquetación y las tabulaciones se normalizan solo para esta comparación;",
        "en los XML se conserva la separación de las salidas. Los patrones multilínea se han",
        "reconstruido contrastando las columnas del texto extraído del PDF, no concatenándolas.", "",
        "## Resumen", "",
        f"- {len(rows)} preguntas de origen corresponden a {sum(bool(q['origins']) for q in catalog['bank'])} preguntas distintas del banco.",
        f"- {len(changed)} comparaciones tienen diferencias, correspondientes a {len(changed_ids)} identificadores del banco.",
        f"- De esos identificadores, {len(content_ids)} tienen cambios de contenido; los otros {len(changed_ids - content_ids)} solo redacción o precisión numérica.",
    ]
    for label, total in sorted(counts.items()):
        lines.append(f"- {label}: {total} preguntas de origen.")
    lines += [
        "", "Las diferencias marcadas como contenido no son necesariamente correcciones necesarias:",
        "también incluyen distractores reemplazados por decisión editorial y diferencias al agrupar",
        "preguntas con código idéntico. No se han restaurado opciones durante esta auditoría.",
        "Las letras a/b/c/d de «Ahora» siguen el catálogo; Moodle mezcla las respuestas.", "",
        "## Índice de diferencias", "",
        "| PDF original | Pregunta | Identificador en Moodle | Tipo |",
        "| --- | ---: | --- | --- |",
    ]
    for source, question, original, kind in changed:
        lines.append(f"| {source['pdf']} | {source['pregunta']} | `{question['id']}` | {kind} |")
    lines += ["", "## Antes y después", ""]
    for source, question, original, kind in changed:
        lines += [
            f"### {source['pdf']} — pregunta {source['pregunta']}", "",
            f"- Identificador: `{question['id']}`.",
            f"- Página: {source['pagina']}. Clasificación: **{kind}**.",
            "- " + explain(original, question["choices"], question, source), "",
            "**Original**", "",
        ]
        lines += options_block(original)
        lines += ["**Ahora**", ""] + options_block(question["choices"])
    lines += [
        "## Sin cambio de contenido", "",
        "En estas preguntas se mantienen las mismas cuatro alternativas; pueden variar el orden,",
        "los espacios de maquetación, las tabulaciones o la presentación HTML.", "",
        "| PDF original | Pregunta | Identificador en Moodle |",
        "| --- | ---: | --- |",
    ]
    for source, question, original, kind in rows:
        if kind == "Sin cambio de contenido":
            lines.append(f"| {source['pdf']} | {source['pregunta']} | `{question['id']}` |")
    output = DIRECTORY / "revision-opciones.md"
    output.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{output.name}: {len(changed)} diferencias de origen, {len(changed_ids)} preguntas del banco.")
    print(dict(counts))


if __name__ == "__main__":
    main()
