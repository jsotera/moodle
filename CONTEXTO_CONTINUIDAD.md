# Contexto de continuidad

## Estado posterior al traspaso: preparación del guardado en Git

Este apartado tiene prioridad sobre el traspaso histórico del 8 de noviembre
que se conserva debajo. El usuario confirma que los exámenes ya se han realizado
y autoriza expresamente hacer commit y push del trabajo acumulado, incluidos
los materiales de preguntas y el examen práctico con su solución.

### EmpujaPiedras: nueva base del 26 de noviembre de 2026

- El docente aporta una nueva solución externa y pide sustituir el enunciado
  y generar una base a partir de ella. Esa solución externa no se modifica.
- En `projects/prom/ut04/EmpujaPiedras/` se conservan completas únicamente
  `AplicacionJavaFX`, `VistaTablero`, `MainJavaFX` y `conf.Const`, idénticas a
  las aportadas. `GUI`, `Personaje`, `Nivel`, `Util` y `MainConsola` contienen
  las firmas de 30 constructores/métodos con cuerpos totalmente vacíos.
- **Por petición expresa, la base no tiene retornos provisionales ni lógica:**
  todavía no compila. El alumnado debe declarar los atributos e implementar
  también los constructores y accesores. No rellenar esos métodos para
  «arreglar» la compilación sin una nueva petición.
- El tablero es un String con saltos de línea, los niveles se numeran desde
  cero y una piedra colocada queda fija. Esta versión sustituye la anterior
  arquitectura con listados, Juego, Partida, nodos y vista previa.
- Base preparada para JDK 25, con las dependencias JavaFX del proyecto aportado.
  El ZIP de `assets/downloads/prom-ut04-empuja-piedras-base.zip` y sus copias
  de publicación incluyen README y enunciado, sin IDE, compilados ni solución.
- La base y el ZIP anteriores se conservan en la copia local ignorada
  `soluciones-profesorado/copias-base/EmpujaPiedras-anterior-27ae362b/`.
  Las soluciones antiguas del repositorio no se han sustituido por la solución
  externa. La descripción histórica posterior de EmpujaPiedras está superada.

### Estado del trabajo anterior

- Entorno nuevo configurado: Git, Node 26, Python 3.11 y JDK 25 disponibles.
  ReportLab 5.1.0 en `%LOCALAPPDATA%/codex-question-pdf`. Playwright reutilizado
  del proyecto local `Proyectos/loot-and-heroes/Idle-RPG---Loot-and-Heroes`,
  con variables de usuario `PLAYWRIGHT_MODULE` y
  `PLAYWRIGHT_CHROMIUM_EXECUTABLE`; Chromium instalado en ms-playwright.
- Examen práctico: el docente ha editado ambos proyectos. No sobrescribirlos
  con versiones anteriores. Hay 12 TODO: GUI 01–02, Personaje 11–13,
  Mapa 21–26 y Main 31. Movimiento booleano en `moverJugador`, efectos en
  `aplicarEfecto`, dibujo y gestión en `Mapa`; GUI muestra colores y tabla.
- Enunciados actualizados con los mensajes de lectura, las llamadas de GUI
  y constantes de símbolos y `NUMERO_MAPAS`. `enunciado.html` tiene ediciones
  manuales y no incluye enlace de descarga. No reconstruirlo ciegamente desde
  el fragmento. `enunciado2.html` conserva la variante con columna RA.
- RA3 suma 10: TODO 01=0,40; 02=0,60; 11=0,20; 12=0,60; 13=0,60;
  21=0,40; 22=0,40; 23=1; 24=1,20; 25=1,40; 26=1,80; 31=1,40.
  TODO 31 también evalúa RA2 por separado: puntuación de TODO 31 / 1,40 × 10.
  Los detalles y descuentos son internos, en
  `soluciones-profesorado/prom/ut03/examen-practico/rubrica-correccion.{html,md}`.
  Esta carpeta sigue ignorada y no se publica. Penalización por constantes:
  −0,25 por constante, máximo −1 en RA3; los descuentos locales son −0,20.
- Los seis scripts de monitorización están en el proyecto base y se incluyen
  al empaquetar: `uno.bat`, `dos.bat`, `tres.bat`, `cuatro.bat`, `cinco.ps1`
  y `limpiar.bat`. **Nunca ejecutarlos**: incluyen borrado de Descargas y
  operaciones Git. Leer INSTRUCCIONES.md. Solo copiar/verificar bytes.
- Los ZIP oficiales de `questions/prom/ut03/examen-practico/` se han preparado
  con las fuentes actuales y el enunciado existente, sin regenerar el contenido.
  Las dos copias manuales `projects/prom/ut03/ExamenUT3.zip` y
  `soluciones/prom/ut03/ExamenUT3-sol.zip` se conservan localmente e ignoran:
  contienen archivos del IDE y compilados. La copia manual resuelta tiene
  diferencias con las fuentes actuales; no borrarla ni sustituirla.
- Se excluyen de Git también `.idea`, `target`, clases, cachés Python y logs
  de monitorización. No se borran archivos locales.
- Validación antes del guardado: 12 pruebas de preguntas, 6 de PDF y ambas
  suites Playwright correctas; base y solución compilan con JDK 25 en carpetas
  temporales; tres enunciados con 12 TODO literales y 10 puntos; ZIP verificados.
  La antigua suite `test_prom_ut03_exam.py` sigue describiendo la API anterior
  y está documentada como pendiente de adaptación; no afirmar que haya pasado.
- No se han regenerado Pages, MBZ, XML de preguntas ni PDF vigentes. No se han
  ejecutado scripts de monitorización ni modificado fuentes de los proyectos.

Para conocer el commit y el estado exactos tras esta preparación, consultar
`git log -1` y `git status`; el historial siguiente describe estados anteriores.

---

## Traspaso histórico original

Actualizado: **8 de noviembre de 2026**, zona Europe/Madrid.

Documento de traspaso para retomar este proyecto sin disponer de la conversación.
Se ha preparado leyendo los archivos, Git y el historial de trabajo disponible.
En este turno solo se ha creado este documento: no se han ejecutado generadores,
pruebas, instalaciones, commits, push ni otros cambios del proyecto.
Las validaciones descritas más abajo son de turnos anteriores, no de esta revisión.

## 1. Objetivo y alcance

El usuario, Javi, es docente de DAM/DAW en Navarra. Está renovando materiales de
**PROM (Programación en Java)** y **LMGI (Lenguaje de Marcas)**. Alterna con
frecuencia entre ambos módulos; confirmar siempre a cuál se refiere su petición.

El repositorio sirve para:

- Publicar teoría y ejercicios en GitHub Pages, con navegación y búsqueda.
- Reutilizar el mismo contenido como fragmentos HTML limpios en Moodle.
- Generar libros Moodle `.mbz` bajo demanda.
- Distribuir proyectos Java base y, cuando se solicitan, soluciones separadas.
- Mantener bancos Moodle XML de entrenamiento y dos modelos de examen.
- Revisar esos bancos mediante PDF con/sin respuestas y un editor web local.

Repositorio de referencia: `https://github.com/jsotera/moodle`.
Sitio raíz: `https://jsotera.github.io/moodle/`.
Módulos: `https://jsotera.github.io/moodle/prom/` y
`https://jsotera.github.io/moodle/lmgi/`.
Estas direcciones son las acordadas; no se ha comprobado ahora el despliegue remoto.

## 2. Instrucciones y preferencias del usuario

Leer primero `INSTRUCCIONES.md`; este documento lo complementa, no lo sustituye.

### Material didáctico y HTML

- Castellano claro, progresivo y adecuado a primero. Evitar conceptos no vistos.
- Moodle y Pages comparten contenido, pero teoría y ejercicios son vistas separadas.
- Editar fuentes en `fragments/`, no directamente la salida de `prom/` o `lmgi/`.
- Cada fragmento debe ser autocontenido, con el formato Bootstrap acordado:

```html
<div class="container mt-4 p-4"
  style="padding-top: 0 !important; margin-top: 0 !important;">
  <div class="card shadow p-4">
    <h2 class="text-primary mb-3"><i class="fas fa-code-branch"></i> N.N Título</h2>
    <p class="lead">Introducción.</p>
    <div class="mb-4">
      <h4 class="text-primary mb-3"><i class="fas fa-file-alt"></i> Subsección</h4>
      <p>Contenido.</p>
      <pre><code>// Ejemplo</code></pre>
    </div>
  </div>
</div>
```

- Fragmentos sin `doctype`, `head`, `body`, CDN ni scripts innecesarios.
- Mantener iconos Font Awesome y numeración de los títulos. No duplicar números
  en los índices generados. Usar `strong`, `code`, listas y tablas con criterio.
- Los `pre` deben quedar sin clases heredadas: los estilos comunes dan el formato.
- Para proyectos reales: indicar nombre y enlace de descarga **absoluto** de Pages,
  de modo que funcione al pegar el fragmento en Moodle. No inventar nombres de
  proyecto ni entregas para actividades que no los necesitan.
- Después de cambiar contenido del sitio, regenerar HTML con
  `node scripts/build-pages.js`. **No regenerar `.mbz` con cada cambio**: solo a petición.
- UTF-8 siempre. Revisar también mojibake y acentos convertidos en `?`: un archivo
  puede ser UTF-8 válido y contener texto ya dañado.
- En LMGI se usa W3Schools como referencia solicitada, con explicaciones propias.
  Las demostraciones HTML se muestran con apariencia básica, aislando los estilos
  del curso mediante CSS de restablecimiento; no se eligieron iframes.

### Java y proyectos base

- JDK actual del curso: **25**, sin preview. Maven y Javadoc en los proyectos dados.
- Paquete base: `edu.masanz.da.ut2`, `edu.masanz.da.ut3`, etc.; `app`, `modelo`,
  `gui` y `util` según corresponda. No conservar paquetes antiguos `es.masanz.ut4`.
- En UT2 el alumnado utiliza clases dadas: solo escribe en `main`, sin bucles ni
  condicionales. Se permiten constructores, llamadas y expresiones booleanas.
- En la tanda nueva de UT3 también completa cuerpos de métodos dados.
- TODOs numerados por decenas de clase: GUI 01..., primer modelo 11...,
  segundo modelo 21..., Main al final 31...; ampliar bloques si hace falta.
- Un punto individual del enunciado por TODO, con su número y **texto literal**.
  Explicaciones adicionales debajo; TODO sin pseudocódigo ni solución encubierta.
- Getters/setters directos, constructores de mera asignación y `toString` directos
  se entregan implementados. Si requieren lógica, pueden ser TODO.
- Retornos provisionales: `0`, `false`, `null`, etc. No lanzar excepciones para
  indicar métodos pendientes en los proyectos nuevos.
- No explicar al alumnado por qué un método se entrega implementado o pendiente.
- GUI sencilla con **todos sus métodos estáticos** y
  `private static Scanner scanner = new Scanner(System.in);`.
  Solo entrada/salida; no recibe objetos del modelo, sino parámetros simples.
  Mensajes pequeños, sin recorrer modelos ni aglutinar toda la lógica en resúmenes.
- Menús: 1, 2, 3... y **0. Salir** al final. Proporcionar ejemplos de pantallas y
  rechazos, distinguiendo ejemplos aleatorios de transcripciones completas.
- Clases de utilidades normales: no `final` ni constructor privado por costumbre.
- JavaFX se ejecuta desde el `main` de la clase de aplicación en IntelliJ. No
  insistir en `javafx:run`, configuración de Maven o JDK en cada enunciado.
- ZIP sin `target`, clases compiladas ni carpetas del IDE. No crear soluciones
  si se ha pedido únicamente base; sí hay solicitudes explícitas de soluciones
  para EmpujaPiedras y para el examen práctico UT3.

### Preguntas de evaluación

- Banco y dos modelos de examen: preguntas parecidas pero no copias, dificultad
  comparable. Preferencia por código y seguimiento de salidas frente a memorizar.
- UT2: cuatro opciones, una correcta; referencias, constructores, métodos,
  atributos, `static`, Math y Random. Evitar herencia/polimorfismo/sobrecarga como
  terminología evaluada y preguntas de nombres exactos de paquetes.
- No respuestas del estilo «no compila», «da error» o «no ejecuta». Si se pregunta
  por código inválido, explicarlo pedagógicamente. No convertir fallos de ejecución
  no tratados en la trampa central de una pregunta de salida.
- Mantener identificadores al modificar preguntas ya importadas en Moodle.
- Fallos descuentan: respuesta correcta 100 %, incorrectas -33,33333 %;
  penalización de reintentos 0,3333333. En UT3, nota base por pregunta 0,5.
- Antes se pidieron al menos 20 por bloque y exámenes equilibrados. Hay excepciones
  expresamente acordadas en UT3: el banco conserva solo 9 de excepciones tras bajas;
  los exámenes actuales son **6 selección, 10 bucles, 4 excepciones**.
- UT3: reforzar IF/FOR/WHILE, `break` y `continue`; evitar excepciones anidadas,
  `throws`, excepciones propias y `finally` mezclado con return/break/continue en
  los exámenes actuales. No añadir más do/while por iniciativa: cada modelo
  conserva uno porque estaba en el A revisado por el usuario.
- No eliminar variantes históricas solo por compartir código: distintas opciones
  también pueden justificar preguntas diferentes. Mantener procedencia.
- No sustituir indiscriminadamente distractores textuales por `0`: preferir `null`
  o «ninguna de las anteriores» cuando proceda.
- En UT2, mostrar instanciación seguida de llamada como `(new Coche()).metodo()`;
  no usar la forma inválida `(new Coche).metodo()` del ejemplo informal del usuario.

### Git y privacidad

- No hacer commit ni push sin petición. No revertir trabajo ajeno ni limpiar
  archivos desconocidos. El usuario suele pedir ambas acciones explícitamente.
- La antigua prohibición de versionar **todo** `questions/` fue revocada para las
  preguntas ya utilizadas; UT1 y UT2 están versionadas. No equivale a autorización
  para publicar automáticamente exámenes nuevos de UT3: el usuario habló de subirlos
  cuando termine la UT. Confirmar alcance/publicidad antes de un futuro push.
- Una carpeta `soluciones/` o `con-respuestas/` en GitHub público **no protege**
  su contenido. Recordarlo especialmente para el examen práctico y sus respuestas.

## 3. Arquitectura y archivos importantes

### Sitio estático y contenidos

| Ruta | Función |
| --- | --- |
| `INSTRUCCIONES.md`, `README.md` | Formato docente y uso general. |
| `fragments/{prom,lmgi}/utXX/{teoria,ejercicios}/*.html` | Fuentes Moodle; orden lexicográfico con prefijos numéricos. |
| `templates/{prom,lmgi}/{index,page}.html` | Plantillas de portada y páginas. |
| `scripts/build-pages.js` | Configuración de módulos/UTs, ensamblado, índices de navegación/búsqueda, copias de recursos y PWA. |
| `prom/`, `lmgi/` | Salida generada por módulo, no la antigua carpeta `dist/`. |
| `index.html` | Portada raíz generada con enlaces a módulos. |
| `assets/css/course.css` | Estilos, impresión, anchuras, código y demostraciones HTML sin CSS del curso. |
| `assets/js/course.js` | Menú lateral plegable, búsqueda, resaltado temporal de palabras, migas de pan según sección y demos. |
| `assets/img/` | Logos e imágenes; logo horizontal en cabecera, no duplicado en el lateral. |
| `assets/downloads/` | Proyectos base ZIP y otros recursos publicados. |
| `projects/` | Fuentes de proyectos del alumnado. |
| `soluciones/` | Soluciones solicitadas, separadas de las bases. |
| `manifest.webmanifest`, `sw.js` | PWA PROM - LMGI; archivos generados por el constructor del sitio. |
| `scripts/build-moodle-books.js` | Genera libros Moodle `.mbz`; necesita `tar` disponible. |
| `moodle-books/` | Salidas `.mbz` ignoradas por Git. |

No hay un servidor de aplicación ni base de datos; Node genera archivos y Python
puede servirlos estáticamente. No hay instalación npm raíz necesaria para generar
el sitio. La publicación acordada es GitHub Pages, no otro servicio de hosting.

PROM tiene 10 UT: Introducción; Objetos y clases; Programación estructurada; POO;
Arrays; Colecciones; I/O y GUI; Polimorfismo; BDR; BDOO. LMGI tiene 9 UT: XML;
XSD; HTML; CSS; lenguajes de marcas y programación web; almacenamiento;
proyecto web dinámica; sindicación; sistemas de información. Los títulos literales
están en `scripts/build-pages.js` y también en `scripts/build-moodle-books.js`:
si se cambian, revisar ambas configuraciones.

### Generadores de preguntas y examen

| Ruta | Función |
| --- | --- |
| `questions/prom/ut01/`, `questions/prom/ut02/` | Banco y modelos A/B anteriores; base histórica del formato. |
| `questions/prom/ut03/README.md` | Estado detallado, distribución, auditoría, enlaces a PDF vigentes. |
| `questions/prom/ut03/catalogo-preguntas.json` | Fuente editable de banco y modelos, opciones, explicación y Java de comprobación. |
| `questions/prom/ut03/inventario-pdf.json` | 211 preguntas históricas extraídas con procedencia y decisión de inclusión. |
| `questions/prom/ut03/prom-ut03-*.xml` | XML de entrenamiento, A, B y exportación manual A `-editado`. |
| `questions/prom/ut03/verificacion.json` | Resumen de la última comprobación Java, fechado 2026-11-08. |
| `scripts/build-prom-ut03-questions.py` | Valida catálogo, genera los tres XML y opcionalmente compila/ejecuta con JDK 25. |
| `scripts/audit-prom-ut03-questions.py` | Informe `revision-opciones.md` frente a opciones históricas. |
| `scripts/build-question-review-pdfs.py` | PDF ReportLab desde XML; ambas versiones, fuentes y marcadores. |
| `scripts/requirements-questions-pdf.txt` | `reportlab==5.1.0`. |
| `scripts/build-prom-ut03-exam.py` | Genera enunciado completo y ZIP base/resuelto; valida 15 TODO y 10 puntos. |
| `questions/prom/ut03/examen-practico/` | Enunciado completo/fragmento, base ZIP, ZIP resuelto separado y README. |
| `projects/prom/ut03/ExamenUT3/` | Fuentes del examen práctico base, Maven release 25. |
| `soluciones/prom/ut03/ExamenUT3/` | Solución del mismo examen. |

**Precaución con el catálogo:** las 20 preguntas del modelo A tienen `moodle_xml`,
que preserva el nodo completo revisado manualmente. El generador da prioridad a
ese campo. Modificar solo `code`, `choices` o `feedback` no cambia su XML conservado:
sincronizar ambos niveles. Las pruebas comprueban esta conservación y parte de
la coherencia. La herramienta web NO sincroniza el catálogo; reimportar cambios
exportados antes de lanzar el generador. No hay un sincronizador genérico persistido:
las migraciones de las últimas exportaciones se hicieron con scripts temporales.

El modelo B actual tiene `parallel_to` por pregunta: apunta al identificador del A.
No usa `moodle_xml` por ahora. Algunos IDs A/B siguen incluyendo `B4` aunque su
categoría actual sea bucles: se mantuvieron para no romper las referencias Moodle.

### Editor web local

Abrir directamente `tools/moodle-xml-editor/index.html`, incluso mediante `file://`.
No necesita servidor, instalación ni conexión. Leer su `README.md`.

- `moodle-xml.js`: DOMParser/XMLSerializer, edición y conservación del XML.
- `editor.js`: interfaz, validación, historial, carga, exportación XML/PDF.
- `editor.css`, `index.html`: presentación y controles.
- `question-pdf.js`: composición de PDF a partir del estado actual del banco.
- `vendor/`: Font Awesome Free 6.7.2, pdfmake 0.2.20, Roboto y Roboto Mono,
  archivos locales y licencias. `mono-vfs.js` contiene la fuente embebida.

Muestra todas las preguntas, busca sin ocultarlas, edita en visual/HTML, permite
radios/porcentajes, altas/bajas/duplicación/reordenación/categorías e historial de
30 estados. Preserva IDs, metadatos, CDATA y adjuntos. Exporta `-editado.xml`, sin
sobrescribir el original en disco. **No hay autoguardado persistente**.

Admite test simple/múltiple, verdadero-falso, corta, numérica y relacionar. Tipos
desconocidos se conservan con edición común, pero PDF los rechaza con aviso.
La vista y los PDF no ejecutan HTML importado ni cargan recursos externos.

Dos botones: **PDF con respuestas** y **PDF sin respuestas**. Incluyen cambios
aún no exportados; descargar PDF no da por guardado el XML. En la versión del
alumnado no hay marcas ni explicación; corta/numérica dejan línea de respuesta y
relacionar presenta opciones separadas. Los PDF del navegador tienen maquetación
propia, distinta de ReportLab; texto seleccionable, código monoespaciado y páginas.
No comprueban semántica Java ni reescriben explicaciones personalizadas al cambiar
la respuesta correcta. Las imágenes se sustituyen por aviso, no se reproducen.

## 4. Estado real del contenido

- PROM UT1: cinco fragmentos de teoría y seis de ejercicios.
- PROM UT2: quince fragmentos de teoría y doce de ejercicios, con proyectos de
  clases dadas. Orden actual: comprensión Persona/Pelicula, carrera de coches,
  rectángulos, Math/Random en lanzamiento lineal, piedra/papel/tijera, carnets,
  robots, red social, referencias coche/personas, consolas prestadas, expendedora,
  clínica veterinaria. No volver a numeraciones antiguas de la conversación.
- PROM UT3: cuatro bloques de teoría y 61 archivos de ejercicios, **incluidos
  separadores**; el número de archivo no siempre coincide con el de actividad.
  Condicionales, FOR y WHILE preceden a JavaFX, y los tres proyectos con clases
  quedan al final: expendedora, ascensor y árbol genealógico. No confundir el viejo
  ejercicio 28 de carrera con el archivo actual `35-simulador-de-carrera-de-caballos.html`.
  La carrera conserva consola y añade base JavaFX. JavaFX dispone de libro separado,
  no debe acoplarse a FOR/WHILE.
- PROM UT4: nueve fragmentos de teoría y proyecto integrador EmpujaPiedras.
  UT5 a UT10 tienen estructura inicial/placeholder, no temario completo.
- LMGI UT1: cinco fragmentos XML y tres actividades: RSS, SVG e investigación de
  otros usos; GPX es ejemplo excluido de las opciones de investigación.
- LMGI UT2: siete fragmentos XSD, ejercicios progresivos, soluciones y actividad
  de examen con dos XSD. Se trabaja XSD, no crear DTD. Se incluyen restricciones,
  obligatoriedad, atributos y tipos reutilizables. Hay descarga en `assets/downloads/`.
- LMGI UT3: introducción, texto/enlaces/imágenes/listas, tablas y formularios;
  siete bloques de ejercicios, incluidos páginas completas y reproducción de
  capturas desde PDF Moodle. Se proporcionó CSS mínimo en `head` para bordes de tabla.
  UT4 a UT9 tienen estructura inicial, no desarrollo completo.

### EmpujaPiedras: proyecto integrador anterior

Fuentes en `projects/prom/ut04/EmpujaPiedras/` y solución en
`soluciones/prom/ut04/EmpujaPiedras/`, con ZIP de solución junto a esta última.
Juego tipo Sokoban, lógica compartida por consola/JavaFX, dos lanzadores
`MainConsola` y `MainJavaFX`; JavaFX suministrado al alumnado.
Una interfaz `IListado<T>`, **tres listados concretos** y tres nodos específicos;
el alumnado implementa los listados. No sustituirlos por un listado genérico único.
Niveles textuales en `configuracion.Constantes.NIVELES`, procesados por
`utilidades.Utilidades.cargarNiveles()` con String, sin arrays/colecciones.
No excepciones propias. Lista doble circular, deshacer y obstáculos se reservaron
como extensión/examen, no como requisitos de la base original.

**Desajuste observado, no corregido:** este proyecto anterior aún declara JDK 17
y JavaFX 17.0.18 y usa `UnsupportedOperationException` para stubs/vista demo, según
su README y POM. Las convenciones posteriores piden JDK 25 y retornos por defecto.
No homogeneizar automáticamente: si se retoma, revisar qué cambios quiere el usuario.

### Examen práctico UT3: base y solución completadas

Laberinto de **8 filas x 14 columnas**, tres escenarios en `util.Conf` como String
lineal, sin arrays de mapa. Se dibuja cada casilla entre corchetes: `[ ]`, `[+]`,
`[P]`, `[#]`, `[T]`, `[S]`. WASD mueve, 1 usa un botiquín, 2 reinicia el nivel,
3 muestra menú y 0 sale. Selección inicial numérica de mapa con captura sencilla.

`Mapa` integra personaje y reglas: no hay clase `Partida`. Casillas son `String`;
`obtenerCasilla` devuelve `null` fuera de límites, no excepción. `contiene` es TODO.
`Personaje.usarBotiquin()` consume solo uno si puede. Vida inicial 100, trampas
20 puntos, botiquín 30 hasta 100; recoger no cura automáticamente. Trampas persisten.
Reiniciar restaura mapa y estado del mismo personaje; salir termina la partida.

15 TODO: GUI 01-02, Personaje 11-16, Mapa 21-24 y Main 31-33. Enunciado de 10 puntos.
Se descartaron temática «escapar de la estación», batería, `Partida`, chars,
excepciones por consultas fuera de límites y uso de varios botiquines de golpe.
El enunciado empieza por reglas, sin insistir en JDK/Maven ni mencionar arrays
que aún no conocen; prohibición final de técnicas no vistas.
Base y solución ZIP están separadas; el enunciado enlaza solo la base. **No está
añadido al índice público del curso y no se generó MBZ del examen**.
El usuario dijo que seguiría revisándolo; no asumir cerrado pedagógicamente para siempre.

### Banco y exámenes teóricos UT3

| Material | Selección | Bucles | Excepciones | Aserciones/depuración | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Entrenamiento | 55 | 66 | 9 | 20 | 150 |
| Modelo A actual | 6 | 10 | 4 | 0 | 20 |
| Modelo B actual | 6 | 10 | 4 | 0 | 20 |

211 originales inventariadas: 109 históricas distintas incluidas, 10 duplicadas
agrupadas y 92 fuera de UT3 con texto conservado. El banco añade 41 nuevas.
Tiene seis preguntas nuevas específicas con break y seis con continue.

Se retiraron del banco `UT3-BANK-B3-05, 08, 09, 10, 11, 12, 14, 15, 16, 18, 20,
21, 22` y de los modelos `UT3-EXAMEN-A-B3-09` y `UT3-EXAMEN-B-B3-09`.
No reintroducirlas automáticamente. Una reimportación no elimina preguntas
antiguas en Moodle: deben borrarse allí si ya estaban cargadas.

Modelo A: el usuario revisó primero diez preguntas y después las veinte con el
editor. Se incorporaron sin perder campos/HTML; solo se corrigieron dos
explicaciones, incluida `UT3-EXAMEN-A-B4-12`: la salida correcta actual es `LA`, no
el antiguo `OA`. El XML `-editado` queda de referencia y el original es el canónico.

Modelo B: terminado el 8 de noviembre como variante paralela al A definitivo.
Mismas estructuras de control por pareja; cambian datos/operaciones/opciones y
todas las salidas correctas difieren de su pareja A. Se conservan 19 IDs previos
y se añade `UT3-EXAMEN-B-B1-06`. No afirmar equivalencia estadística: la dificultad
comparable es una decisión pedagógica, no una medición empírica.

PDF **vigentes**:

- `questions/prom/ut03/revision-pdf/con-respuestas/prom-ut03-banco-entrenamiento-revision.pdf`
- `questions/prom/ut03/revision-pdf/sin-respuestas/prom-ut03-banco-entrenamiento-cuestionario.pdf`
- `questions/prom/ut03/revision-pdf/con-respuestas/prom-ut03-examen-modelo-a-revision-actualizado.pdf`
- `questions/prom/ut03/revision-pdf/sin-respuestas/prom-ut03-examen-modelo-a-cuestionario-actualizado.pdf`
- `questions/prom/ut03/revision-pdf/con-respuestas/prom-ut03-examen-modelo-b-revision-actualizado.pdf`
- `questions/prom/ut03/revision-pdf/sin-respuestas/prom-ut03-examen-modelo-b-cuestionario-actualizado.pdf`

Los modelos con soluciones tienen 10 páginas y sin soluciones 8 en la versión
ReportLab vigente. Los PDF sin `actualizado` de A/B son anteriores y obsoletos;
también queda un PDF antiguo del banco en la raíz de `revision-pdf/`.
No borrarlos sin petición: algunos estaban abiertos/bloqueados por Windows.

## 5. Estado de Git y transporte al otro ordenador

Inspección actual: rama `main`, seguimiento `origin/main`; `git status --short
--branch` muestra `main...origin/main` sin divergencia respecto a la referencia
local. **No se hizo fetch**, por lo que no demuestra el estado remoto actual.
Último commit local: `a7cd23e` (versión JavaFX de la carrera de caballos).
Anteriores: `98b5403`, `3804786`, `d4b1afa`, `9e6961b`.

Antes de crear este documento, único archivo rastreado modificado:
`README.md`, con una sección/enlace al editor web. Archivos/carpetas sin seguimiento:

```text
projects/prom/ut03/ExamenUT3/
questions/prom/ut03/
scripts/audit-prom-ut03-questions.py
scripts/build-prom-ut03-exam.py
scripts/build-prom-ut03-questions.py
scripts/build-question-review-pdfs.py
scripts/requirements-questions-pdf.txt
scripts/test-moodle-xml-editor-pdf.cjs
scripts/test-moodle-xml-editor.cjs
scripts/test_prom_ut03_exam.py
scripts/test_prom_ut03_questions.py
scripts/test_question_review_pdfs.py
soluciones/prom/ut03/
tools/
```

Este documento se añade a esa lista. **Clonar GitHub no recuperará esos cambios**
si no se transfieren aparte o se versionan con autorización. Gran parte del trabajo
más reciente vive precisamente en ellos, incluidos ZIP, PDF y bibliotecas locales.
No ejecutar `git clean`, reset o checkout para «arreglar» este estado.

Ignorados por `.gitignore`: `moodle-books/`, `assets/ejemplos/`,
`soluciones-profesorado/`. El usuario aportó en `assets/ejemplos/` libros Moodle,
PDF y documentos; también borró material antiguo cuando ya no lo necesitaba.
No asumir que los originales estarán en otro equipo. JSON/XML conservan las
extracciones necesarias para continuar las preguntas sin volver a esos PDF.

La conversación incluye trabajo previo y ediciones manuales del usuario. Git no
permite atribuir autoría por cada archivo sin seguimiento: no adjudicar todo al
último agente. En concreto, el contenido revisado del A procede del usuario;
el B, generadores y editor se desarrollaron durante la colaboración. En **este
turno de traspaso**, el único cambio propio es `CONTEXTO_CONTINUIDAD.md`.

## 6. Problemas conocidos y enfoques que no repetir

1. **Mojibake/acentos `?`:** hubo corrupción real en preguntas, posteriormente
   corregida. Pipes PowerShell también pueden estropear literales acentuados de
   scripts enviados por stdin. Preferir archivos UTF-8, `python -X utf8` y
   escapes Unicode en comprobaciones auxiliares; no confundir consola dañada con
   archivo dañado. Los tests incluyen detectores de patrones corruptos.
2. **Exportación manual vs catálogo:** no lanzar el generador encima de XML recién
   editado antes de sincronizar. Para A, actualizar también `moodle_xml`.
3. **PDF bloqueado:** ReportLab dio `PermissionError` al sobrescribir un PDF abierto.
   Se generaron nombres `-actualizado.pdf`, sin cerrar aplicaciones del usuario.
   El CLI normal no añade ese sufijo; antes de usarlo revisar qué archivo sustituye.
4. **Dos motores PDF:** ReportLab y pdfmake no generan maquetación idéntica. No
   presentarlos como copias binarias o visuales exactas. Ambos se comprobaron.
5. **pdfmake/VFS:** `addVirtualFileSystem` en 0.2.20 reemplaza el VFS anterior;
   añadir solo Mono causó `Roboto-Medium.ttf not found`. Se solucionó pasando
   explícitamente `{ ...window.vfs, ...window.MoodlePdfFonts }` a `createPdf`.
   No volver a registrar Mono aislado. Hubo además un JS de fuente mal generado
   por comillas en PowerShell; ya está corregido y probado.
6. **Caché del sitio/PWA:** en ocasiones se veía una carrera eliminada hasta
   Ctrl+F5. Revisar caché y salida generada antes de concluir que falta la edición.
   PWA usa red primero y caché como respaldo; excluye descargas, ZIP, `projects/`
   y `questions/`. No prometer proyectos descargables offline.
7. **Editor no protege secretos ni valida Java:** trabaja localmente, pero un
   XML/PDF que se suba al repositorio público será público; el radio no demuestra
   que la respuesta sea semánticamente correcta.
8. **Proyectos anteriores:** EmpujaPiedras conserva convenciones antiguas; no
   convertirlo masivamente a las nuevas sin revisar alcance. Hay `target/`
   locales observados en esa solución; no incluirlos al empaquetar.
9. **No volver a `dist/` ni duplicar fragmentos agregados:** se decidió que fuentes
   son los subfragmentos y salidas completas viven en cada módulo.
10. **No usar soluciones de infraestructura para enseñar conceptos prematuros:**
    sin matrices/listas estándar antes de su UT; el listado genérico solo era
    para la interfaz. No introducir constructores privados ni `final` innecesarios.

## 7. Entorno y ejecución

Estos comandos son instrucciones para el nuevo equipo; **no se han ejecutado en
este turno de traspaso**. Ejecutarlos desde la raíz y solo según la tarea pedida.

Herramientas conocidas del equipo de origen: Windows/PowerShell, Node 18,
Python 3.11 (`C:/Python311/python.exe`), JDK 25.0.2 e IntelliJ. Esas versiones
se utilizaron antes; no se ha revalidado aquí su instalación actual.

### Sitio y libros

```powershell
node scripts/build-pages.js
python -m http.server 8000
# http://localhost:8000/prom/
# http://localhost:8000/lmgi/
```

El servidor solo es necesario para probar el sitio/PWA. El puerto 8003 se usó en
la conversación; no es requisito. No se ha comprobado si sigue activo. Si está
ocupado, usar otro puerto; no finalizar procesos ajenos.
`build-pages.js` limpia/recrea salidas de módulos y cambia versión de SW: produce
muchos cambios. No es una comprobación de solo lectura.

Libros bajo demanda, con Node y `tar` en PATH:

```powershell
node scripts/build-moodle-books.js --module prom --unit 03 --kind ejercicios
node scripts/build-moodle-books.js --module lmgi --unit 03 --kind teoria
```

El usuario probó la restauración de un `.mbz` y funcionó; apareció en UT1 en vez
de la ubicación elegida. Lo consideró aceptable, no hay petición pendiente de
resolver ese comportamiento de Moodle. Los libros separados de teoría UT3 por
sección se hicieron excepcionalmente; no convertirlo en nueva regla general.

### Preguntas y PDF Python

Pruebas del catálogo, sin regenerar XML:

```powershell
python -B -X utf8 scripts/test_prom_ut03_questions.py
```

Regeneración de los tres XML y comprobación Java, **solo tras sincronizar ediciones**:

```powershell
$env:JAVA_HOME = 'RUTA_AL_JDK_25'
python -B -X utf8 scripts/build-prom-ut03-questions.py --verify-java --java-home "$env:JAVA_HOME"
```

El verificador exige Java 25. Compila en directorio temporal, no ejecuta los seis
casos no terminantes y contrasta las salidas deterministas.

Para ReportLab, preparar un entorno Python propio fuera del árbol versionado o
en una ubicación que no se vaya a añadir a Git. Ejemplo de instalación futura:

```powershell
python -m venv RUTA_AL_ENTORNO_PDF
& 'RUTA_AL_ENTORNO_PDF/Scripts/python.exe' -m pip install -r scripts/requirements-questions-pdf.txt
& 'RUTA_AL_ENTORNO_PDF/Scripts/python.exe' -B -X utf8 scripts/test_question_review_pdfs.py
& 'RUTA_AL_ENTORNO_PDF/Scripts/python.exe' -B -X utf8 scripts/build-question-review-pdfs.py questions/prom/ut03/prom-ut03-examen-modelo-b.xml
```

El CLI sin XML procesa banco+A+B. `--version ambas|con-respuestas|sin-respuestas`
y `--output-dir` permiten elegir versión y carpeta. Nombres por defecto:
`-revision.pdf` y `-cuestionario.pdf`, **sin `-actualizado`**. Los vigentes con ese
sufijo se generaron invocando `build_pdf` del mismo módulo con ruta explícita.
El PDF Python actual admite respuesta única/cuatro opciones, no todos los tipos.

### Examen práctico

```powershell
$env:JAVA_HOME = 'RUTA_AL_JDK_25'
python -B -X utf8 scripts/test_prom_ut03_exam.py
# Solo si se pide regenerar enunciado y ambos ZIP:
python -B -X utf8 scripts/build-prom-ut03-exam.py
```

Abrir `questions/prom/ut03/examen-practico/enunciado.html` sin servidor.
Los proyectos se abren en IntelliJ; ejecutar `edu.masanz.da.ut3.app.Main`.
La base compila con TODO, pero no es funcional hasta completarlos.

### Editor web y sus pruebas

Uso: doble clic en `tools/moodle-xml-editor/index.html`. No necesita Python,
Node, Maven, Java, npm ni servidor. Conservar **toda** su carpeta `vendor/`.

Solo para pruebas automatizadas se necesita Playwright y Chromium. Puede
reutilizarse una instalación externa o instalarse en un entorno de pruebas
separado. Variables admitidas:

```powershell
$env:PLAYWRIGHT_MODULE = 'RUTA_AL_MODULO_PLAYWRIGHT'
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE = 'RUTA_AL_EJECUTABLE_CHROMIUM'
node scripts/test-moodle-xml-editor.cjs
node scripts/test-moodle-xml-editor-pdf.cjs
```

Si no se define `PLAYWRIGHT_MODULE`, se hace `require('playwright')`. La variable
del navegador es opcional si Playwright ya tiene un Chromium compatible.
No hace falta instalar estas herramientas solo para usar el editor.

## 8. Configuración que cambia al migrar

- `JAVA_HOME`, PATH de Java/Node/Python y ejecutor Maven de IntelliJ.
- `PLAYWRIGHT_MODULE` y `PLAYWRIGHT_CHROMIUM_EXECUTABLE` para pruebas web.
- PowerShell de origen usó JDK en `C:/Program Files/Java/jdk-25.0.2`; sustituir
  por la instalación real. Las rutas con espacios deben ir entre comillas.
- Entorno ReportLab anterior: `%LOCALAPPDATA%/codex-question-pdf/Scripts/python.exe`.
- Playwright anterior: `%LOCALAPPDATA%/codex-exam-preview/node_modules/playwright`,
  versión 1.50.1 compatible con Node 18.
- Chromium anterior:
  `%LOCALAPPDATA%/ms-playwright/chromium-1248/chrome-win64/chrome.exe`.
- Para inspeccionar PDF se usaron además `pypdf`, Pillow y PyMuPDF. Parte estaba
  en `%TEMP%/codex-pdf-review`; no son dependencias normales del sitio/editor.
  El generador solo requiere lo declarado en `requirements-questions-pdf.txt`.
- Fuentes del PDF Python: Vera incluida con ReportLab; intenta DejaVu Mono o
  Courier New en rutas de Windows/Linux/macOS y recurre a Courier si faltan.
  El cambio de fuente puede cambiar saltos de página. El editor lleva sus fuentes.
- Servidor local y sesiones de terminal no se transfieren. No asumir que está up.
- Los scripts temporales de migración en `%TEMP%` no forman parte del repositorio
  y **no deben usarse para reconstruir ciegamente** el catálogo: algunos representan
  estados anteriores y reintroducirían preguntas retiradas o sobrescribirían A.
- La sesión tenía credenciales Git vinculadas en el equipo. Configurar la
  autenticación del nuevo ordenador por los mecanismos habituales; no hay secretos
  que copiar en este documento ni se ha comprobado la autenticación actual.
- Si cambia dueño/nombre del repositorio, adaptar `publicUrl` y enlaces absolutos
  de descargas en fragmentos, no solo el README. Mantener `lmgi`, no el viejo `lm`.

## 9. Validaciones realizadas y límites

Resultados registrados en turnos anteriores:

- Catálogo UT3: **12 pruebas** de `test_prom_ut03_questions.py`, OK tras crear B.
  Incluyen distribución, IDs, duplicados, XML/opciones, conservación literal del A,
  bajas solicitadas y correspondencia estructural de las 20 parejas A/B.
- JDK 25: última ejecución completa **190 arneses compilados, 184 ejecutados y
  176 salidas deterministas contrastadas**. Seis no se ejecutan para evitar bucles
  sin terminación. Compilar un arnés conceptual no demuestra la respuesta teórica.
- Los 40 códigos de A+B se compilaron y ejecutaron; respuestas correctas verificadas.
  Al crear B se comprobó que A, su `-editado` y el banco no cambiaron en bytes.
- Examen práctico: **10 pruebas** previas, OK. Compilación de base/solución,
  15 TODO y rúbrica, API, tres mapas, movimientos, curación, reinicio, victorias,
  derrota, entradas inválidas/EOF, contenido de ambos ZIP y UTF-8. No se repitieron hoy.
- PDF Python: **6 pruebas** previas del lector/generador, OK. PDF vigentes A/B:
  20 IDs una vez cada uno, marcas solo en versión docente, sin explicaciones ni
  «Salida comprobada» en alumnado; se revisaron textos, acentos, límites de página
  y capturas. B docente visto visualmente, 10 páginas; B alumnado, 8.
- Editor: suites Playwright `test-moodle-xml-editor.cjs` y
  `test-moodle-xml-editor-pdf.cjs` pasaron. Conservación de los XML reales, metadatos,
  CDATA, cambios, correctas, importación/exportación, seguridad, búsquedas sin ocultar,
  historial, móvil 390px y escritorio 1440px; sin errores JS ni peticiones HTTP(S).
- PDF del editor: dos descargas reales desde `file://`, cambios no guardados,
  acentos, 20 preguntas y ausencia de soluciones en alumnado; límites y capturas
  revisados. También se generó PDF docente del banco UT3 de 150 y alumnado del
  banco UT1 de 80 con tipos variados. Los tests web se ejecutaron antes de la última
  revisión B; no cambió el editor después, pero no se ha reimportado B allí ahora.
- PWA y libros: el usuario informó que instalación PWA y restauración de un `.mbz`
  funcionaron. No se ha vuelto a verificar todo el sitio ni todos los libros hoy.

Pendiente/no demostrado: importación real de los nuevos XML UT3 en Moodle,
revisión docente final del B y del examen práctico, compatibilidad con todos los
Moodle/navegadores, despliegue remoto de archivos locales recientes y continuidad
de las sesiones/instalaciones en otro equipo. No afirmar que esto ya esté en GitHub.

## 10. Últimas peticiones y punto exacto de parada

Última tarea de contenido completada: crear una segunda versión de examen de
dificultad comparable. Se terminó el **modelo B de PROM UT3** (20 preguntas),
se actualizaron catálogo, configuración de reparto, pruebas, README y verificación,
y se generaron ambos PDF `-actualizado`. Se entregaron enlaces locales al XML y PDF.
No se hizo commit ni push de este trabajo. No hay proceso de esa tarea pendiente.

Petición actual: preparar este traspaso y **no modificar ningún otro archivo ni
instalar o ejecutar acciones que alteren el proyecto**. Esta restricción se ha
respetado durante la preparación. No aprovecharla para compilar, regenerar,
limpiar, resolver desajustes antiguos, publicar ni versionar.

## 11. Próximos pasos ordenados

1. **Primera acción del nuevo agente:** leer este documento, `INSTRUCCIONES.md` y
   `git status --short --branch` en el equipo de destino. Confirmar que llegaron
   `questions/prom/ut03/`, `tools/`, ambos proyectos ExamenUT3 y los scripts nuevos;
   un clon limpio sin transferencia adicional no basta.
2. Revisar `questions/prom/ut03/README.md` y localizar los PDF `-actualizado`.
   Mantener el A revisado por el usuario como referencia intocable salvo petición.
3. Preguntar cuál es la siguiente tarea si no hay una nueva petición concreta.
   No existe encargo pendiente de redactar más preguntas, generar MBZ o hacer push.
4. Si se continúa con preguntas, comparar primero cualquier nueva exportación
   `-editado` con los XML canónicos y sincronizar el catálogo antes de regenerar.
   Mantener IDs; comprobar código, opciones y explicación como conjunto.
5. Preparar solo las herramientas necesarias para la tarea, adaptando las rutas
   de entorno; el editor ya se puede abrir sin instalación.
6. Al modificar: ejecutar las pruebas relevantes y producir solo las salidas
   solicitadas. Para contenido del sitio, regenerar Pages; para preguntas/PDF
   aislados no es necesario reconstruir todo el curso.
7. Si el usuario pide persistir o trasladar por Git, revisar explícitamente qué
   exámenes/soluciones pueden publicarse. Añadir archivos concretos, no `git add .`
   indiscriminado. No incluir archivos ignorados, caches, entornos o `target`.
8. Solo si se pide, abordar pendientes secundarios: limpieza de PDF obsoletos tras
   cerrar los abiertos, homogeneización de EmpujaPiedras a convenciones actuales,
   sincronizador de XML editado a catálogo o futura ampliación de otras UT.

## Mensaje para el nuevo agente

Este es un repositorio docente estático con mucho trabajo útil todavía **sin
commit**. Empieza comprobando que la transferencia incluye los archivos nuevos,
no regenerando. El último resultado es el modelo B de PROM UT3, paralelo al A
revisado manualmente, con XML y dos PDF actualizados. Preserva ese A y sus campos
`moodle_xml`; no sobrescribas ediciones exportadas desde la herramienta local sin
sincronizar el catálogo. Respeta la progresión didáctica, las convenciones TODO/GUI
y el carácter bajo demanda de los MBZ. No hay un siguiente cambio autorizado:
retoma desde la nueva petición del usuario y distingue lo local de lo publicado.
