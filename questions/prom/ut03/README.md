# PROM UT3: preguntas Moodle

## Archivos para importar

- `prom-ut03-banco-entrenamiento.xml`: 150 preguntas de entrenamiento.
- `prom-ut03-examen-modelo-a.xml`: 20 preguntas revisadas manualmente.
- `prom-ut03-examen-modelo-b.xml`: 20 preguntas paralelas al modelo A revisado.

Importar cada archivo en el banco de preguntas de Moodle seleccionando el formato
**Moodle XML**. Cada grupo tiene su propia categoria; los modelos A y B tienen
tres subcategorias y el banco de entrenamiento tiene cuatro.
Los archivos contienen preguntas, no la configuracion de un cuestionario.

### Revisión del Modelo A (6 de noviembre de 2026)

Las diez preguntas revisadas en `prom-ut03-examen-modelo-a-editado.xml` están
incorporadas al archivo original, sin cambiar su HTML, respuestas, explicaciones,
identificadores ni otros campos. El archivo editado queda como referencia local;
el que se debe importar es `prom-ut03-examen-modelo-a.xml`.

Se han adaptado las otras nueve preguntas y añadido una, porque el original tenía
19. El reparto actual es 6 de selección (incluye el switch revisado), 10 de bucles
y 4 de excepciones sencillas. Las nuevas no incluyen incrementos dentro de
expresiones, excepciones anidadas, `throw`, `throws`, aserciones ni depuración.
Las diez revisadas se conservan tal cual, incluido el `do/while` ya revisado.
Se mantienen los identificadores existentes; algunos conservan `B4` por este
motivo, aunque ahora pertenecen a la categoría de bucles.

Tras la segunda exportación, las 20 preguntas revisadas están sincronizadas con
el original y el catálogo. Se han comprobado las 20 salidas ejecutando Java y se
han corregido únicamente dos explicaciones: la primera pregunta de selección y
`UT3-EXAMEN-A-B4-12`, cuya salida actual es `LA`, no `OA`.

El catálogo también está actualizado. Su campo `moodle_xml` preserva íntegramente
las 20 preguntas revisadas durante futuras regeneraciones. Para editarlas de
nuevo habrá que sincronizar tanto este campo como los datos del catálogo.
En esa revisión no se modificaron el banco de entrenamiento ni el modelo B.

### Modelo B paralelo (8 de noviembre de 2026)

El modelo B se ha adaptado a las 20 preguntas del modelo A definitivo, con el
mismo orden de contenidos: 6 de selección, 10 de bucles y 4 de excepciones.
Cada pareja trabaja las mismas estructuras, con valores, operaciones, recorridos
y opciones diferentes, sin añadir conceptos. También conserva una pregunta de
`do/while`, como el modelo A revisado. No incluye incrementos dentro de expresiones,
excepciones anidadas, `throw`, `throws`, herencia, aserciones ni depuración.

El campo `parallel_to` del catálogo identifica la pregunta correspondiente del
modelo A. Se han compilado y ejecutado las 40 preguntas de ambos modelos para
comprobar sus respuestas. La dificultad comparable se basa en las estructuras
y el trabajo de seguimiento requerido; no es una equivalencia estadística medida.
El modelo A y el banco de entrenamiento permanecen intactos.
Se conservan los 19 identificadores anteriores del modelo B y se añade
`UT3-EXAMEN-B-B1-06`; las referencias con `B4` ahora están en la categoría de bucles.

## PDF con y sin soluciones

| Cuestionario | Con respuestas | Sin respuestas |
| --- | --- | --- |
| Banco, 150 preguntas | [Revisión](revision-pdf/con-respuestas/prom-ut03-banco-entrenamiento-revision.pdf) | [Alumnado](revision-pdf/sin-respuestas/prom-ut03-banco-entrenamiento-cuestionario.pdf) |
| Modelo A, 20 preguntas | [Revisión](revision-pdf/con-respuestas/prom-ut03-examen-modelo-a-revision-actualizado.pdf) | [Alumnado](revision-pdf/sin-respuestas/prom-ut03-examen-modelo-a-cuestionario-actualizado.pdf) |
| Modelo B, 20 preguntas | [Revisión](revision-pdf/con-respuestas/prom-ut03-examen-modelo-b-revision-actualizado.pdf) | [Alumnado](revision-pdf/sin-respuestas/prom-ut03-examen-modelo-b-cuestionario-actualizado.pdf) |

Los PDF del modelo A reflejan la segunda exportación revisada del 6 de noviembre.
Llevan el sufijo `actualizado` porque el PDF anterior estaba abierto y bloqueado
durante la generación. Los archivos anteriores sin ese sufijo no están al día.
Los PDF del modelo B con sufijo `actualizado` corresponden a la versión paralela
del 8 de noviembre. Los anteriores del modelo B tampoco reflejan esta revisión.

Las dos versiones incluyen los mismos enunciados, código, cuatro opciones y orden
de preguntas y respuestas. `con-respuestas` marca la correcta e incluye explicaciones.
`sin-respuestas` no incluye marcas de corrección, resaltados ni explicaciones, y
no añade una plantilla de soluciones. Es la versión destinada al alumnado.
Los identificadores permiten localizar la pregunta en Moodle.
Hay marcadores PDF por bloque y pregunta. Las letras siguen el orden del XML;
Moodle puede mezclar las respuestas. La paginación difiere al retirar las explicaciones.
Estas carpetas organizan los documentos, no restringen su acceso: si se suben ambas
a un repositorio público de GitHub, ambas estarán disponibles públicamente.

Se generan bajo demanda desde los XML, sin modificar el catálogo ni los archivos
de importación. Si cambia el catálogo, regenerar primero los XML y después los PDF.

```powershell
python -m pip install -r scripts/requirements-questions-pdf.txt
python -X utf8 scripts/build-question-review-pdfs.py
```

En este equipo también está preparado un entorno independiente, sin cambiar las
dependencias del proyecto, que permite regenerarlos directamente:

```powershell
& "$env:LOCALAPPDATA/codex-question-pdf/Scripts/python.exe" -X utf8 scripts/build-question-review-pdfs.py
```

Por defecto se generan ambas versiones, cada una en su subcarpeta. Para generar
solo una de ellas se puede añadir `--version con-respuestas` o `--version sin-respuestas`.
Se pueden pasar rutas XML como argumentos y elegir la carpeta padre con `--output-dir`.
El lector admite el formato usado aquí: respuesta única, cuatro opciones y textos
HTML en párrafos y bloques pre/code. No es un conversor de todos los tipos Moodle.

## Distribución

| Bloque de teoria | Entrenamiento | Modelo A | Modelo B |
| --- | ---: | ---: | ---: |
| I. Decisiones y estructuras de seleccion | 55 | 6 | 6 |
| II. Estructuras de repeticion | 66 | 10 | 10 |
| III. Control y creacion de excepciones | 9 | 4 | 4 |
| IV. Aserciones, prueba y depuracion | 20 | 0 | 0 |

Todas son de respuesta unica, con cuatro opciones y explicacion de la respuesta.
Puntuacion base: 0,5 puntos; acierto: 100 %; fallo: -33,33333 %.
La penalizacion para intentos sucesivos es 0,3333333. La nota final y el tratamiento
de puntuaciones negativas dependen tambien del comportamiento del cuestionario.
Las respuestas se mezclan y los identificadores permanecen estables al regenerar.
El XML y sus textos HTML se guardan en UTF-8; el Java se incluye en `pre/code`.

## Procedencia y adaptaciones

Se han inventariado las 211 preguntas de los 12 PDF facilitados. El banco contiene
109 preguntas historicas distintas y 41 nuevas para completar los cuatro bloques.
Hay 10 repeticiones agrupadas, conservando todas sus referencias de origen.
Las otras 92 preguntas quedan documentadas fuera del banco UT3 por corresponder
a objetos, referencias o expresiones sin estructuras de control de unidades previas.
Su texto extraido se conserva: no se han descartado del inventario.

La conversion no es una transcripcion ciega: se han corregido erratas de codigo,
saltos de linea de la extraccion y respuestas que no incluian el resultado real.
Se han sustituido distractores de errores de compilacion por resultados concretos.
En un metodo se ha completado el retorno y en otras preguntas se han inicializado
variables para evaluar el recorrido del codigo y no errores ajenos al objetivo.
Un bucle con decremento e eventual desbordamiento se ha limitado expresamente a
cuatro iteraciones. Los bucles realmente sin terminacion se preguntan por analisis.
Las adaptaciones concretas y la pagina de origen figuran en cada entrada del catalogo.

Se han recuperado por separado las variantes del examen UT4 2025/26, preguntas
6, 7, 8, 11 y 14: comparten código con otras preguntas, pero sus opciones difieren.
Sus identificadores son los de su PDF y número de pregunta, sin modificar los ya
existentes. La comprobación de duplicados incluye las cuatro opciones, no solo el código.
En la variante de esPrimo se mantienen true, false y null; la opción de error se
sustituye por «Ninguna de las anteriores». Los distractores 0 de tres preguntas de
salida textual vuelven a «ninguna de las anteriores» y en otra se emplea null.
Los distractores numéricos se mantienen cuando encajan con el resultado numérico.

El bloque II incluye 12 preguntas nuevas específicas: seis con break y seis con
continue, identificadas por UT3-BANK-B2-BREAK-01 a 06 y UT3-BANK-B2-CONTINUE-01 a 06.
Emplean for y while, sin do-while en esta ampliación. Se trabajan bucles anidados,
el alcance de break, break dentro de switch, actualizaciones después de continue,
postincrementos en la condición y acumuladores modificados antes de saltar.
Cada pregunta tiene cuatro salidas distintas, una correcta y una explicación del
recorrido. Esta ampliación no modificó los modelos de examen ni las preguntas anteriores.

Del banco se han retirado por petición expresa UT3-BANK-B3-05, 08, 09, 10, 11,
12, 14, 15, 16, 18, 20, 21 y 22, sin sustituirlas ni renumerar las restantes.
Las últimas cuatro bajas (10, 15, 16 y 18) mezclaban finally con return, break o
continue. Por eso el bloque III queda en 9 preguntas y se permite ese mínimo,
en lugar del mínimo general de 20.
También se retiraron UT3-EXAMEN-A-B3-09 y UT3-EXAMEN-B-B3-09: en aquella revisión
cada modelo quedó en 19 preguntas. Las revisiones posteriores del 6 y 8 de
noviembre amplían y adaptan ambos modelos al reparto actual de 20 preguntas.
Si las preguntas retiradas ya están importadas en Moodle, hay que eliminarlas allí:
su ausencia del nuevo XML no las borra del banco.

## Fuentes y comprobaciones

- `catalogo-preguntas.json`: enunciados, opciones, respuestas, explicaciones,
  identificadores, procedencia y codigo de comprobacion.
- `inventario-pdf.json`: las 211 preguntas originales, contextos compartidos,
  estado de inclusion y correspondencia con el banco.
- `verificacion.json`: resumen de cantidades y comprobaciones realizadas.
- [Revisión de opciones](revision-opciones.md): lista completa de diferencias
  frente a cada PDF, con las cuatro alternativas originales y las actuales.
  Las opciones originales también se conservan estructuradas en el inventario.

En la verificación del 8 de noviembre se han compilado 190 arneses con JDK 25 y
ejecutado 184. Se han contrastado 176 salidas deterministas; los casos aleatorios
se revisan por sus limites. Los seis
casos no ejecutados se revisan por analisis para evitar bucles sin terminacion.
Compilar un arnes conceptual no demuestra la respuesta teorica: esta requiere
revision del enunciado y sus opciones. No se ha probado aun la importacion en Moodle.

Para regenerar los tres XML desde el catalogo, sin necesitar los PDF:

```powershell
python -X utf8 scripts/build-prom-ut03-questions.py
```

Para repetir tambien la comprobacion de Java (ajustar la ruta local del JDK):

```powershell
python -X utf8 scripts/build-prom-ut03-questions.py --verify-java --java-home "C:/Program Files/Java/jdk-25.0.2"
```

La generacion no modifica la teoria, las paginas publicadas ni los libros Moodle.

Para regenerar el informe de comparación de opciones desde el inventario:

```powershell
python -X utf8 scripts/audit-prom-ut03-questions.py
```

El generador comprueba también posibles interrogantes dentro de palabras y patrones
de texto mal decodificado en enunciados, explicaciones y opciones. Un archivo UTF-8
válido puede contener errores previos de este tipo; comprobar la codificación no basta.
