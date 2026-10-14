# PROM UT01 - Preguntas Moodle XML

Esta carpeta contiene tres exportaciones Moodle XML para la UT01 de Programacion.

## Archivos

- `prom-ut01-banco-entrenamiento.xml`: banco de entrenamiento de la unidad.
- `prom-ut01-examen-modelo-a.xml`: modelo de examen A.
- `prom-ut01-examen-modelo-b.xml`: modelo de examen B.

## Convencion detectada

- El banco de entrenamiento contiene 80 preguntas.
- La unidad se divide en 4 bloques de teoria.
- Cada bloque del banco contiene 20 preguntas.
- Cada modelo de examen contiene 20 preguntas.
- Cada modelo de examen reparte las preguntas de forma equilibrada: 5 preguntas por bloque.
- Los modelos A y B tienen dificultad equivalente al banco de entrenamiento: misma profundidad conceptual, sin ser mas faciles ni mas dificiles.

## Bloques de UT01

- Bloque I: Fundamentos de Java.
- Bloque II: Variables, tipos y constantes.
- Bloque III: Operadores y expresiones.
- Bloque IV: Conversiones y documentacion.

## Tipos de pregunta usados

- `multichoice`
- `truefalse`
- `numerical`
- `shortanswer`
- `matching`

## Criterio para futuras unidades

Para generar preguntas de otra UT se mantendra esta estructura:

- Un banco de entrenamiento con al menos 20 preguntas por bloque de teoria.
- Dos modelos de examen, A y B.
- Cada modelo tendra 20 preguntas en total.
- El reparto del examen sera lo mas equilibrado posible entre los bloques de teoria.
- Las preguntas de examen seran similares a las del banco de entrenamiento en dificultad, formato y nivel de razonamiento.
- Los nombres de categorias de Moodle deben separar claramente banco, examen A y examen B.
