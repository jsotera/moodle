# Editor local de preguntas Moodle XML

[Abrir el editor](index.html). Funciona directamente en Chrome, Edge o Firefox,
sin instalar dependencias ni iniciar un servidor. Sus recursos estan incluidos
en la carpeta: no envia el banco de preguntas ni solicita servicios externos.

## Trabajo habitual

1. Pulsa Abrir XML o arrastra un banco Moodle XML a la pagina.
2. Edita el enunciado, el codigo y las respuestas directamente. Todas las
   preguntas permanecen visibles; el buscador solo localiza coincidencias.
3. Marca la correcta con su radio. Las respuestas positivas aparecen en verde.
4. Abre Explicacion general o Comentario para modificar las explicaciones.
5. Exporta el XML modificado e importalo en Moodle.

El modo HTML permite editar el contenido HTML de los campos, no el XML del banco.
El boton de codigo del enunciado incorpora un bloque pre/code editable. Dentro de
un bloque de codigo, Enter introduce un salto y Tab cuatro espacios.

Puedes crear un banco vacio, anadir preguntas o categorias, duplicar, borrar y
ordenar preguntas dentro de su categoria. Para cambiar una pregunta de categoria,
usa su apartado Puntuacion y metadatos. Las preguntas nuevas son tipo test de
cuatro opciones con un acierto al 100 % y fallos al -33,33333 %.

Deshacer y rehacer conservan hasta 30 estados del documento. No existe guardado
automatico persistente: exporta antes de cerrar. Se avisa si quedan cambios sin
exportar. El original no se sobrescribe; se descarga una copia terminada en
`-editado.xml`.

## PDF desde el navegador

Los botones **PDF con respuestas** y **PDF sin respuestas** descargan directamente
el cuestionario abierto, incluyendo los cambios que aún no se hayan exportado a
XML. No necesitan servidor, conexión, Python ni el diálogo de impresión.

- Con respuestas: marca las opciones positivas en verde y con CORRECTA e incluye
  la explicación general de cada pregunta.
- Sin respuestas: conserva enunciados, código y opciones sin marcas, porcentajes
  ni explicaciones. En preguntas cortas o numéricas deja una línea para responder;
  en las de relacionar separa y ordena las opciones, sin indicar las parejas.

Se respeta el orden del XML, con apartados por categoría, numeración de preguntas,
identificadores y páginas. El texto es seleccionable y el código conserva los
saltos de línea y la sangría con una fuente monoespaciada. Se comprueban los datos
antes de generar. Los PDF no ejecutan Java ni validan la solución pedagógica.
Descargar un PDF no guarda el XML ni quita el aviso de cambios pendientes.

El PDF admite los cinco tipos editables anteriores. Para otros tipos muestra un
aviso en lugar de generar un documento incompleto. El HTML se convierte a texto
y bloques de código: no reproduce todos los estilos y las imágenes se sustituyen
por un aviso. No se ejecuta contenido ni se descargan recursos del XML.

## Compatibilidad y conservacion

- Respuesta unica: radio para la correcta y porcentajes editables.
- Respuesta multiple: casillas y porcentajes; los positivos deben sumar 100 %.
- Verdadero/falso: radio, conservando los textos internos true/false.
- Respuesta corta y numerica: variantes aceptadas, porcentajes y tolerancia numerica.
- Relacionar: elementos y sus correspondencias editables.
- Otros tipos: se conservan completos, con edicion del nombre, identificador,
  enunciado y explicacion; el contenido especifico no tiene un editor especializado.

Se conservan identificadores, categorias, archivos incrustados, comentarios XML,
etiquetas, puntuaciones, penalizaciones y campos desconocidos. Cambiar la correcta
de respuesta unica intercambia su puntuacion con la opcion elegida, sin convertir
los descuentos a otros valores. Los identificadores existentes no se renumeran;
duplicar o crear una pregunta genera un identificador diferente.

Los XML deben estar en UTF-8 y tener quiz como raiz. La salida siempre es UTF-8.
Se comprueban respuestas correctas, porcentajes, identificadores duplicados y
campos obligatorios antes de exportar. No se ejecuta Java ni se comprueba que
el resultado indicado sea correcto: revisa tambien las explicaciones al editar.
Los comentarios genericos de acierto/fallo se actualizan al cambiar el radio;
las explicaciones personalizadas no se reescriben automaticamente.

La vista visual no ejecuta scripts ni carga imagenes o recursos del banco.
El contenido incrustado se muestra como un marcador y se conserva al guardar.
Los campos editados visualmente usan HTML normalizado sin estilos ni manejadores
de eventos; el modo HTML permite mantener o editar sus atributos originales.
Los campos no editados permanecen intactos. Se rechazan declaraciones DOCTYPE.

## Relacion con los generadores

Esta herramienta edita y exporta XML, no sincroniza los catalogos JSON del
repositorio. Si editas un XML generado desde catalogo-preguntas.json y vuelves a
ejecutar su generador, este sobrescribira el XML con los datos del catalogo.
Conserva la copia editada y actualiza el catalogo antes de regenerar desde el script.
Los PDF se pueden generar directamente a partir del XML exportado.
También pueden descargarse desde el editor con los botones de PDF, sin ejecutar
el generador del repositorio. Los dos caminos tienen una maquetación propia.

## Comprobaciones

`scripts/test-moodle-xml-editor.cjs` utiliza Playwright para comprobar los
bancos reales, la conservacion de metadatos, CDATA, edicion y exportacion,
correctas, busqueda, altas, bajas, deshacer y vista movil. Requiere Playwright en
el entorno de pruebas, no para usar el editor. Admite PLAYWRIGHT_MODULE y
PLAYWRIGHT_CHROMIUM_EXECUTABLE para emplear una instalacion de pruebas existente.

`scripts/test-moodle-xml-editor-pdf.cjs` prueba las dos descargas reales desde
`file://`, los cambios sin guardar, la validación, el código, la privacidad de
soluciones, la vista móvil y la ausencia de peticiones externas.

Los iconos locales son Font Awesome Free 6.7.2; licencia en vendor/LICENSE.txt.
La generación usa pdfmake 0.2.20 (MIT), con sus fuentes Roboto (Apache 2.0), y
Roboto Mono de @fontsource/roboto-mono 5.2.6 (OFL 1.1). Las copias locales y sus
licencias están en `vendor/pdfmake/`. `mono-vfs.js` contiene la fuente WOFF en
base64 para poder usarla desde `file://` sin peticiones de red.
