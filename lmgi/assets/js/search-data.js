window.COURSE_UNITS = [
  {
    "id": "ut01",
    "number": "01",
    "title": "Características del lenguaje XML. Documentos XML bien formados.",
    "theoryId": "ut01-teoria",
    "practiceId": "ut01-ejercicios",
    "theoryUrl": "ut01-teoria.html",
    "practiceUrl": "ut01-ejercicios.html"
  },
  {
    "id": "ut02",
    "number": "02",
    "title": "Validación de documentos XML mediante esquemas.",
    "theoryId": "ut02-teoria",
    "practiceId": "ut02-ejercicios",
    "theoryUrl": "ut02-teoria.html",
    "practiceUrl": "ut02-ejercicios.html"
  },
  {
    "id": "ut03",
    "number": "03",
    "title": "Introducción a los lenguajes de marcas en entornos WEB (HTML)",
    "theoryId": "ut03-teoria",
    "practiceId": "ut03-ejercicios",
    "theoryUrl": "ut03-teoria.html",
    "practiceUrl": "ut03-ejercicios.html"
  },
  {
    "id": "ut04",
    "number": "04",
    "title": "Desarrollo y aplicación de lenguajes de marcas en entornos WEB (CSS)",
    "theoryId": "ut04-teoria",
    "practiceId": "ut04-ejercicios",
    "theoryUrl": "ut04-teoria.html",
    "practiceUrl": "ut04-ejercicios.html"
  },
  {
    "id": "ut05",
    "number": "05",
    "title": "Utilización de lenguajes de marcas y de programación en entorno web",
    "theoryId": "ut05-teoria",
    "practiceId": "ut05-ejercicios",
    "theoryUrl": "ut05-teoria.html",
    "practiceUrl": "ut05-ejercicios.html"
  },
  {
    "id": "ut06",
    "number": "06",
    "title": "Almacenamiento de información",
    "theoryId": "ut06-teoria",
    "practiceId": "ut06-ejercicios",
    "theoryUrl": "ut06-teoria.html",
    "practiceUrl": "ut06-ejercicios.html"
  },
  {
    "id": "ut07",
    "number": "07",
    "title": "Proyecto web dinámica",
    "theoryId": "ut07-teoria",
    "practiceId": "ut07-ejercicios",
    "theoryUrl": "ut07-teoria.html",
    "practiceUrl": "ut07-ejercicios.html"
  },
  {
    "id": "ut08",
    "number": "08",
    "title": "Sindicación de contenidos",
    "theoryId": "ut08-teoria",
    "practiceId": "ut08-ejercicios",
    "theoryUrl": "ut08-teoria.html",
    "practiceUrl": "ut08-ejercicios.html"
  },
  {
    "id": "ut09",
    "number": "09",
    "title": "Sistemas de información",
    "theoryId": "ut09-teoria",
    "practiceId": "ut09-ejercicios",
    "theoryUrl": "ut09-teoria.html",
    "practiceUrl": "ut09-ejercicios.html"
  }
];

window.COURSE_PAGES = [
  {
    "id": "home",
    "title": "Inicio",
    "url": "index.html",
    "type": "Portada",
    "text": "Lenguaje de Marcas y Gestión de la Información. Materiales de Lenguaje de Marcas y Gestión de la Información para DAM y DAW."
  },
  {
    "id": "ut01-teoria-01-que-es-xml",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: 1.1 ¿Qué es XML?",
    "url": "ut01-teoria.html#ut01-teoria-01-que-es-xml",
    "type": "Teoría · Sección",
    "text": "1.1 ¿Qué es XML? XML es un lenguaje de marcas pensado para almacenar, organizar y transportar informacion de forma estructurada. Ademas de esta documentacion de clase, puedes consultar la documentacion completa sobre XML en W3Schools XML Tutorial . Idea principal XML significa eXtensible Markup Language . Igual que HTML, utiliza marcas o etiquetas, pero su objetivo no es mostrar una pagina bonita en el navegador, sino describir datos . Un documento XML suele ser leido por programas, aplicaciones, servicios web u otros sistemas que necesitan intercambiar informacion de manera clara y predecible. &lt;nota&gt; &lt;para&gt;Ana&lt;/para&gt; &lt;de&gt;Luis&lt;/de&gt; &lt;mensaje&gt;Recuerda entregar la practica.&lt;/mensaje&gt; &lt;/nota&gt; En este ejemplo, las etiquetas no explican como se debe dibujar la informacion, sino que indican que significa cada dato . XML no es HTML Aunque XML y HTML se parecen visualmente, se usan para cosas distintas: Caracteristica XML HTML Objetivo Guardar y transportar datos Mostrar contenido en una pagina web Etiquetas Las define quien crea el documento Ya vienen definidas por el lenguaje Enfoque Significado de los datos Presentacion y estructura visual XML es estricto En XML hay que cuidar mucho la sintaxis: las etiquetas deben cerrarse, deben estar bien anidadas y se distingue entre mayusculas y minusculas. Si el documento no respeta estas reglas, se considera que no esta bien formado ."
  },
  {
    "id": "ut01-teoria-02-elementos-atributos-contenido",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: 1.2 Elementos, etiquetas, atributos y contenido",
    "url": "ut01-teoria.html#ut01-teoria-02-elementos-atributos-contenido",
    "type": "Teoría · Sección",
    "text": "1.2 Elementos, etiquetas, atributos y contenido La informacion de un XML se representa mediante elementos , formados por etiquetas, atributos y contenido. Etiquetas y elementos Una etiqueta es la marca que aparece entre los simbolos &lt; y &gt; . Un elemento incluye la etiqueta de apertura, el contenido y la etiqueta de cierre. &lt;nombre&gt;Marta&lt;/nombre&gt; En el ejemplo, &lt;nombre&gt; es la etiqueta de apertura, &lt;/nombre&gt; es la etiqueta de cierre y Marta es el contenido. Tipos de contenido Un elemento XML puede contener texto, otros elementos, una mezcla de ambos o no contener nada. &lt;ciudad&gt;Pamplona&lt;/ciudad&gt; &lt;alumno&gt; &lt;nombre&gt;Iker&lt;/nombre&gt; &lt;curso&gt;1 DAM&lt;/curso&gt; &lt;/alumno&gt; &lt;linea /&gt; La etiqueta &lt;linea /&gt; es un elemento vacio escrito de forma abreviada. Equivale a escribir &lt;linea&gt;&lt;/linea&gt; . Atributos Los atributos añaden informacion adicional a un elemento. Siempre aparecen dentro de la etiqueta de apertura y sus valores deben ir entre comillas. &lt;libro isbn=\"978-84-376-0494-7\" idioma=\"es\"&gt; &lt;titulo&gt;Don Quijote de la Mancha&lt;/titulo&gt; &lt;/libro&gt; En este caso, isbn e idioma son atributos del elemento &lt;libro&gt; . ¿Elemento o atributo? No existe una unica respuesta correcta, pero esta regla practica suele ayudar: Usa elementos para... Usa atributos para... Datos principales del documento Metadatos o informacion auxiliar Contenido largo o estructurado Identificadores, codigos o clasificaciones breves Informacion que puede repetirse Propiedades simples de un elemento"
  },
  {
    "id": "ut01-teoria-03-comentarios-cdata-entidades",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: 1.3 Comentarios, CDATA y caracteres especiales",
    "url": "ut01-teoria.html#ut01-teoria-03-comentarios-cdata-entidades",
    "type": "Teoría · Sección",
    "text": "1.3 Comentarios, CDATA y caracteres especiales XML permite incluir comentarios , escapar caracteres reservados y usar secciones CDATA para texto que no debe interpretarse como marcado. Comentarios Los comentarios sirven para dejar aclaraciones en el documento. No forman parte de los datos que una aplicacion deberia procesar. &lt;!-- Lista de alumnos matriculados en el modulo --&gt; &lt;alumnos&gt; &lt;alumno id=\"A001\"&gt;Nerea&lt;/alumno&gt; &lt;/alumnos&gt; Un comentario empieza con &lt;!-- y termina con --&gt; . Caracteres especiales Algunos caracteres tienen significado propio en XML. Si queremos usarlos como texto, debemos escribirlos mediante entidades. Caracter Entidad Ejemplo de uso &lt; &amp;lt; 3 &amp;lt; 5 &gt; &amp;gt; 5 &amp;gt; 3 &amp; &amp;amp; Java &amp;amp; XML \" &amp;quot; &amp;quot;Hola&amp;quot; ' &amp;apos; &amp;apos;Hola&amp;apos; Secciones CDATA Una seccion CDATA permite escribir texto que contiene caracteres como &lt; o &amp; sin que el procesador XML los interprete como etiquetas o entidades. &lt;ejemplo&gt; &lt;![CDATA[ if (edad &lt; 18 &amp;&amp; activo) { System.out.println(\"Menor activo\"); } ]]&gt; &lt;/ejemplo&gt; CDATA es util para incluir fragmentos de codigo, expresiones o texto tecnico. Aun asi, no debe usarse para evitar pensar la estructura del documento: los datos importantes deben seguir estando modelados con elementos y atributos."
  },
  {
    "id": "ut01-teoria-04-estructura-documento",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: 1.4 Estructura de un documento XML",
    "url": "ut01-teoria.html#ut01-teoria-04-estructura-documento",
    "type": "Teoría · Sección",
    "text": "1.4 Estructura de un documento XML Un documento XML se organiza como un arbol de elementos , con una unica raiz y diferentes elementos hijos. Declaracion XML Muchos documentos XML comienzan con una declaracion que indica la version de XML y la codificacion de caracteres utilizada. &lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt; Esta linea no representa datos del documento. Sirve para informar al programa que va a leer el XML de como debe interpretarlo. Elemento raiz Todo documento XML debe tener un unico elemento raiz . Ese elemento contiene al resto del documento. &lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt; &lt;biblioteca&gt; &lt;libro&gt; &lt;titulo&gt;El principito&lt;/titulo&gt; &lt;autor&gt;Antoine de Saint-Exupery&lt;/autor&gt; &lt;/libro&gt; &lt;libro&gt; &lt;titulo&gt;Don Quijote de la Mancha&lt;/titulo&gt; &lt;autor&gt;Miguel de Cervantes&lt;/autor&gt; &lt;/libro&gt; &lt;/biblioteca&gt; En este caso, &lt;biblioteca&gt; es la raiz. Dentro aparecen varios elementos &lt;libro&gt; , y cada libro tiene sus propios elementos hijos. Reglas para que este bien formado Un XML esta bien formado cuando cumple unas reglas basicas de escritura. Estas reglas son importantes porque un programa no interpreta un XML \"mas o menos bien\": si la sintaxis falla, el documento no se puede procesar correctamente. Regla Explicacion Ejemplo Las etiquetas se escriben entre &lt; y &gt; Una etiqueta es una palabra que representa un dato. La etiqueta de apertura marca donde empieza ese dato. &lt;nombre&gt;Ana&lt;/nombre&gt; Las etiquetas de cierre llevan / La etiqueta de cierre indica donde termina el contenido de ese elemento. &lt;ciudad&gt;Pamplona&lt;/ciudad&gt; Un elemento vacio puede cerrarse directamente Si un elemento no tiene contenido entre apertura y cierre, se puede escribir con una unica etiqueta terminada en /&gt; . &lt;persona edad=\"12\" /&gt; Debe existir un unico elemento raiz Todos los datos del documento deben estar dentro de un mismo elemento principal. &lt;alumnos&gt;&lt;alumno&gt;Ana&lt;/alumno&gt;&lt;/alumnos&gt; Las etiquetas deben cerrarse en orden Si un elemento empieza dentro de otro, tambien debe terminar dentro de ese mismo elemento. &lt;persona&gt;&lt;nombre&gt;Ana&lt;/nombre&gt;&lt;/persona&gt; Los nombres no pueden contener espacios Los nombres de etiquetas y atributos deben escribirse como una sola palabra. Se pueden usar guiones o guiones bajos si hace falta separar ideas. &lt;fecha_nacimiento&gt;2008-04-12&lt;/fecha_nacimiento&gt; Mayusculas y minusculas no son lo mismo &lt;Nombre&gt; y &lt;nombre&gt; son etiquetas diferentes para XML. &lt;nombre&gt;Ana&lt;/nombre&gt; Los atributos deben ir entre comillas Un atributo aporta informacion adicional dentro de la etiqueta de apertura. Su valor debe escribirse entre comillas. &lt;alumno id=\"A001\"&gt;Ana&lt;/alumno&gt; &lt;!-- Incorrecto: el nombre de la etiqueta tiene espacios --&gt; &lt;nombre completo&gt;Ana Perez&lt;/nombre completo&gt; &lt;!-- Correcto: el nombre de la etiqueta no tiene espacios --&gt; &lt;nombre_completo&gt;Ana Perez&lt;/nombre_completo&gt; &lt;!-- Correcto: elemento vacio cerrado directamente --&gt; &lt;persona edad=\"12\" /&gt; &lt;!-- Incorrecto: las etiquetas se cruzan --&gt; &lt;persona&gt;&lt;nombre&gt;Ana&lt;/persona&gt;&lt;/nombre&gt; &lt;!-- Correcto: las etiquetas se cierran en orden --&gt; &lt;persona&gt;&lt;nombre&gt;Ana&lt;/nombre&gt;&lt;/persona&gt;"
  },
  {
    "id": "ut01-teoria-05-usos-xml",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: 1.5 Usos habituales de XML",
    "url": "ut01-teoria.html#ut01-teoria-05-usos-xml",
    "type": "Teoría · Sección",
    "text": "1.5 Usos habituales de XML XML aparece en muchos contextos donde interesa tener informacion estructurada, legible y facil de intercambiar entre sistemas. RSS y sindicacion de contenidos Los canales RSS usan XML para publicar noticias, entradas de blog, podcasts u otros contenidos que pueden ser leidos por aplicaciones externas. &lt;rss version=\"2.0\"&gt; &lt;channel&gt; &lt;title&gt;Noticias del centro&lt;/title&gt; &lt;item&gt; &lt;title&gt;Inicio de curso&lt;/title&gt; &lt;link&gt;https://ejemplo.test/noticias/inicio&lt;/link&gt; &lt;/item&gt; &lt;/channel&gt; &lt;/rss&gt; SVG: graficos vectoriales SVG es un formato basado en XML que permite describir imagenes vectoriales mediante etiquetas. &lt;svg width=\"120\" height=\"80\" xmlns=\"http://www.w3.org/2000/svg\"&gt; &lt;circle cx=\"40\" cy=\"40\" r=\"25\" fill=\"steelblue\" /&gt; &lt;text x=\"75\" y=\"45\"&gt;XML&lt;/text&gt; &lt;/svg&gt; En lugar de guardar una imagen como pixeles, SVG describe formas, colores, textos y coordenadas. Configuracion e intercambio de datos XML tambien se ha utilizado mucho en ficheros de configuracion, integracion entre aplicaciones, intercambio de datos entre empresas y formatos de documentos. &lt;configuracion&gt; &lt;baseDatos host=\"localhost\" puerto=\"3306\"&gt; &lt;usuario&gt;app&lt;/usuario&gt; &lt;/baseDatos&gt; &lt;/configuracion&gt; Hoy en dia convive con otros formatos como JSON, pero sigue siendo importante porque muchos estandares, herramientas y sistemas lo siguen utilizando. Ventajas y limites Ventajas Limites Es legible por personas y programas. Puede ser mas largo que otros formatos. Permite crear etiquetas adaptadas al problema. Exige respetar una sintaxis estricta. Representa datos jerarquicos con claridad. Para validar estructuras complejas suele necesitar esquemas."
  },
  {
    "id": "ut01-ejercicios-01-rss-online",
    "unitId": "ut01",
    "section": "Ejercicios",
    "title": "UT 01. Ejercicios: 1.1 Explorando canales RSS reales",
    "url": "ut01-ejercicios.html#ut01-ejercicios-01-rss-online",
    "type": "Ejercicios · Sección",
    "text": "1.1 Explorando canales RSS reales Actividad grupal para localizar canales RSS reales , visualizarlos con una herramienta online y observar que todos tienen una estructura XML parecida. Organización El ejercicio se realizará en grupos de 2 o 3 personas , según cómo estéis sentados en el aula. La idea no es memorizar todas las etiquetas de RSS, sino aprender a reconocer que un RSS es un documento XML con una estructura organizada mediante etiquetas, atributos y contenido. Búsqueda de canales RSS Buscad páginas web que ofrezcan canales RSS. Muchas webs los muestran con un icono naranja parecido a una señal WiFi o antena. Podéis buscar RSS en webs de noticias, blogs, medios deportivos, páginas de tecnología, instituciones, podcasts o cualquier sitio que publique contenidos periódicamente. Localizad entre 3 y 4 canales RSS diferentes y copiad la URL de cada uno. Visualización con un lector RSS online Entrad en un lector RSS online, por ejemplo RSS Viewer , pegad la URL de cada canal RSS y comprobad que se muestran sus entradas. Después, abrid también la URL del RSS directamente en el navegador para observar el documento XML original. &lt;rss version=\"2.0\"&gt; &lt;channel&gt; &lt;title&gt;Nombre del canal&lt;/title&gt; &lt;link&gt;https://ejemplo.test&lt;/link&gt; &lt;description&gt;Descripción del canal&lt;/description&gt; &lt;item&gt; &lt;title&gt;Título de una noticia&lt;/title&gt; &lt;link&gt;https://ejemplo.test/noticia&lt;/link&gt; &lt;description&gt;Resumen de la noticia&lt;/description&gt; &lt;/item&gt; &lt;/channel&gt; &lt;/rss&gt; Comparación de estructuras Comparad los RSS encontrados y completad una tabla similar a esta en vuestro cuaderno o documento de trabajo: Web URL del RSS Etiqueta raíz Etiquetas que se repiten ¿Qué información contiene cada entrada? Ejemplo https://... &lt;rss&gt; &lt;item&gt; , &lt;title&gt; , &lt;link&gt; Título, enlace, descripción y fecha Preguntas para responder ¿Qué etiquetas aparecen en casi todos los RSS que habéis encontrado? ¿Qué etiqueta se utiliza para representar cada noticia, entrada o publicación? ¿Qué diferencias habéis visto entre unos RSS y otros? ¿Por qué creéis que un lector RSS puede entender canales de webs diferentes?"
  },
  {
    "id": "ut01-ejercicios-02-svg-basico",
    "unitId": "ut01",
    "section": "Ejercicios",
    "title": "UT 01. Ejercicios: 1.2 Creando nuestras primeras imágenes SVG",
    "url": "ut01-ejercicios.html#ut01-ejercicios-02-svg-basico",
    "type": "Ejercicios · Sección",
    "text": "1.2 Creando nuestras primeras imágenes SVG Actividad individual para crear imágenes SVG y comprobar que un SVG es un documento XML con etiquetas y atributos específicos para dibujar. Organización El ejercicio se realizará de forma individual . Cada persona investigará, probará y ajustará sus propios SVG. Al final de la actividad mostraremos algunos resultados en la pizarra compartida para comparar soluciones y comentar cómo se ha construido cada dibujo. Documentación de apoyo Consultad la documentación de SVG en W3Schools y utilizad su sección Try it Yourself para modificar el código y ver el resultado directamente en el navegador: W3Schools SVG Tutorial Recordad la idea importante: un SVG puede ser un XML bien formado, pero además necesita usar las etiquetas y atributos que entiende SVG . Por ejemplo, &lt;circle&gt; , &lt;rect&gt; , &lt;line&gt; , &lt;ellipse&gt; , cx , cy , r , fill , stroke o stroke-width . Código base para empezar Podéis partir de una estructura como esta y modificar su contenido dentro de la etiqueta &lt;svg&gt; : &lt;svg width=\"300\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"&gt; &lt;circle cx=\"150\" cy=\"100\" r=\"50\" fill=\"lightblue\" stroke=\"black\" stroke-width=\"3\" /&gt; &lt;/svg&gt; Fijaos en que cada figura se crea con una etiqueta y se configura mediante atributos. Si el atributo no existe, está mal escrito o tiene valores poco adecuados, el navegador no dibujará lo esperado. Imagen 1: aros olímpicos Cread una imagen SVG que represente los cinco aros olímpicos . Utilizad cinco elementos &lt;circle&gt; . Cada aro debe tener color de borde diferente. Los círculos no deben estar rellenos, solo tener borde. Colocad tres aros arriba y dos ligeramente más abajo. Os resultarán útiles los atributos cx , cy , r , stroke , stroke-width y fill . Ejemplo orientativo, creado solo con círculos: Imagen 2: cara de sorpresa Cread una cara sorprendida utilizando círculos. Un círculo grande para la cara. Dos círculos para los ojos. Dos círculos pequeños dentro de los ojos para las pupilas. Un círculo o elipse para la boca en forma de O . Probad a cambiar colores, tamaños y posiciones hasta que la expresión se entienda visualmente. Ejemplo orientativo, creado solo con círculos: Imagen 3: cara enfadada Cread una cara enfadada combinando formas básicas. Un círculo grande para la cara. Dos ojos con pupilas. Círculos pequeños alineados en diagonal para simular cejas o pestañas enfadadas. Una boca curvada hacia abajo construida con varios círculos pequeños. Ejemplo orientativo, creado solo con círculos (se pueden emplear líneas, rectángulos, etc): Imagen 4: creación libre Cread una imagen libre utilizando las formas que ofrece SVG. Podéis investigar etiquetas como &lt;rect&gt; , &lt;ellipse&gt; , &lt;line&gt; , &lt;polygon&gt; , &lt;polyline&gt; , &lt;text&gt; o &lt;path&gt; . La imagen puede ser un paisaje, un icono, una señal, un personaje sencillo, una figura geométrica, un logotipo inventado o cualquier composición que os permita experimentar con etiquetas y atributos. Comprobaciones durante la actividad ¿El SVG tiene una etiqueta raíz &lt;svg&gt; ? ¿Las etiquetas están correctamente cerradas? ¿Los atributos están escritos sin espacios en el nombre? ¿Los valores de los atributos están entre comillas? ¿Las etiquetas usadas pertenecen realmente al lenguaje SVG? ¿La imagen se interpreta correctamente en el navegador?"
  },
  {
    "id": "ut01-ejercicios-03-usos-xml",
    "unitId": "ut01",
    "section": "Ejercicios",
    "title": "UT 01. Ejercicios: 1.3 Investigando otros usos de XML",
    "url": "ut01-ejercicios.html#ut01-ejercicios-03-usos-xml",
    "type": "Ejercicios · Sección",
    "text": "1.3 Investigando otros usos de XML Actividad de investigación para descubrir otros usos reales de XML y comparar cómo se organizan sus documentos. Qué hay que buscar Buscad al menos 3 usos distintos de XML . Para cada uno, localizad una breve explicación y, si es posible, un ejemplo sencillo de documento XML. El objetivo es comprobar que XML no es un único formato cerrado, sino una forma de crear lenguajes de marcas adaptados a necesidades diferentes. Algunas pistas para investigar podrían ser formatos de configuración, documentos ofimáticos, intercambio de datos entre sistemas, servicios web, mapas, metadatos, catálogos o formatos usados por aplicaciones concretas. Un ejemplo podría ser GPX , que se emplea para compartir rutas mediante coordenadas GPS, por ejemplo en actividades de senderismo, ciclismo o tracking. &lt;gpx version=\"1.1\" creator=\"AppRutas\"&gt; &lt;trk&gt; &lt;name&gt;Ruta por el monte&lt;/name&gt; &lt;trkseg&gt; &lt;trkpt lat=\"42.8125\" lon=\"-1.6458\"&gt; &lt;ele&gt;460&lt;/ele&gt; &lt;time&gt;2026-09-24T09:30:00Z&lt;/time&gt; &lt;/trkpt&gt; &lt;/trkseg&gt; &lt;/trk&gt; &lt;/gpx&gt; No hace falta entender todos los detalles técnicos del formato elegido. Lo importante es reconocer para qué se utiliza y cómo organiza la información mediante etiquetas y atributos. Usos que no se pueden elegir Debéis buscar usos de XML diferentes a los trabajados ya en clase. Por tanto, no se pueden elegir estos ejemplos: RSS , porque ya lo hemos usado para canales de noticias y publicaciones. SVG , porque ya lo hemos usado para crear imágenes vectoriales. Tabla de análisis Preparad una tabla similar a esta para comparar los formatos encontrados: Uso o formato XML Para qué se utiliza Etiqueta raíz o etiquetas importantes Qué datos almacena Fuente consultada Ejemplo encontrado Configuración, intercambio, documento, metadatos... &lt;etiqueta&gt; Datos principales del formato URL o documentación consultada Similitudes y diferencias Después de completar la tabla, comparad los formatos encontrados y responded: ¿Todos tienen una etiqueta raíz? ¿Utilizan etiquetas anidadas? ¿Usan atributos? ¿Para qué tipo de información? ¿Qué formato parece más fácil de leer? ¿Por qué? ¿Qué formato parece más especializado? ¿En qué se parecen a RSS, SVG o al ejemplo GPX? ¿En qué se diferencian de RSS, SVG o del ejemplo GPX? Puesta en común Al final, comentaremos algunos de los usos encontrados. La idea es construir entre toda la clase una lista de situaciones reales en las que XML sigue siendo útil."
  },
  {
    "id": "ut02-teoria-01-que-es-xsd",
    "unitId": "ut02",
    "section": "Teoría",
    "title": "UT 02. Teoría: 2.1 ¿Qué es XSD?",
    "url": "ut02-teoria.html#ut02-teoria-01-que-es-xsd",
    "type": "Teoría · Sección",
    "text": "2.1 ¿Qué es XSD? XSD permite definir qué estructura, elementos, atributos y tipos de datos debe cumplir un documento XML para considerarse válido. Además de esta documentación de clase, puedes consultar la documentación completa sobre XSD en W3Schools XML Schema Tutorial . Idea principal XSD significa XML Schema Definition . Un XSD es un documento que describe las reglas que debe cumplir otro documento XML. En la UT1 vimos que un XML puede estar bien formado : etiquetas cerradas, anidadas correctamente, un único elemento raíz, atributos entre comillas, etc. Pero eso no garantiza que el documento tenga los datos correctos. &lt;alumno&gt; &lt;nombre&gt;Ane&lt;/nombre&gt; &lt;edad&gt;diecisiete&lt;/edad&gt; &lt;/alumno&gt; Este XML puede estar bien formado, pero quizá para nuestra aplicación la edad debe ser un número entero. XSD sirve precisamente para definir ese tipo de reglas. Bien formado no es lo mismo que válido Concepto Qué comprueba Ejemplo XML bien formado Que la sintaxis XML es correcta. Las etiquetas se abren y cierran bien. XML válido Que el XML cumple las reglas de un esquema. &lt;edad&gt; debe contener un número entero. Enfoque de esta unidad En esta unidad trabajaremos con XSD . Los DTD pueden aparecer como referencia o venir dados, pero el trabajo principal será crear, leer y modificar documentos XML en función de esquemas XSD. La pregunta habitual será: ¿este XML cumple el XSD? Si no lo cumple, tendremos que detectar por qué y corregir el XML o el esquema según el caso."
  },
  {
    "id": "ut02-teoria-02-estructura-basica-xsd",
    "unitId": "ut02",
    "section": "Teoría",
    "title": "UT 02. Teoría: 2.2 Estructura básica de un XSD",
    "url": "ut02-teoria.html#ut02-teoria-02-estructura-basica-xsd",
    "type": "Teoría · Sección",
    "text": "2.2 Estructura básica de un XSD Un XSD también es un documento XML, pero utiliza etiquetas propias del vocabulario XML Schema . La etiqueta raíz &lt;xs:schema&gt; Todo esquema XSD suele comenzar con la etiqueta &lt;xs:schema&gt; . El prefijo xs indica que estamos usando elementos del lenguaje XML Schema. &lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt; &lt;xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\"&gt; &lt;!-- Aquí se definen las reglas del XML --&gt; &lt;/xs:schema&gt; La parte xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" declara el espacio de nombres de XSD. Gracias a ello, etiquetas como &lt;xs:element&gt; o &lt;xs:complexType&gt; tienen significado para un validador. Ejemplo mínimo Este XSD define que el XML debe tener un elemento llamado &lt;mensaje&gt; cuyo contenido será texto: &lt;xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\"&gt; &lt;xs:element name=\"mensaje\" type=\"xs:string\" /&gt; &lt;/xs:schema&gt; Con ese esquema, este XML sería válido: &lt;mensaje&gt;Hola XML&lt;/mensaje&gt; Pero este otro no cumpliría la regla, porque la raíz no se llama &lt;mensaje&gt; : &lt;texto&gt;Hola XML&lt;/texto&gt; Relación entre XML y XSD Un XML puede indicar qué esquema XSD debe usarse para validarlo. Para ello se suelen usar atributos relacionados con xsi y schemaLocation . &lt;alumno xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"alumno.xsd\"&gt; &lt;nombre&gt;Ane&lt;/nombre&gt; &lt;edad&gt;17&lt;/edad&gt; &lt;/alumno&gt; En clase será habitual trabajar con dos ficheros: un XML con datos y un XSD con las reglas que debe cumplir."
  },
  {
    "id": "ut02-teoria-03-elementos-simples-atributos",
    "unitId": "ut02",
    "section": "Teoría",
    "title": "UT 02. Teoría: 2.3 Elementos simples, tipos de datos y atributos",
    "url": "ut02-teoria.html#ut02-teoria-03-elementos-simples-atributos",
    "type": "Teoría · Sección",
    "text": "2.3 Elementos simples, tipos de datos y atributos XSD permite indicar qué elementos existen, qué tipo de dato contienen y qué atributos pueden usar. Elementos simples Un elemento simple contiene texto, pero no contiene otros elementos ni atributos propios. &lt;nombre&gt;Ane&lt;/nombre&gt; &lt;edad&gt;17&lt;/edad&gt; &lt;fechaNacimiento&gt;2009-04-18&lt;/fechaNacimiento&gt; En XSD se pueden definir así: &lt;xs:element name=\"nombre\" type=\"xs:string\" /&gt; &lt;xs:element name=\"edad\" type=\"xs:integer\" /&gt; &lt;xs:element name=\"fechaNacimiento\" type=\"xs:date\" /&gt; Tipos de datos habituales Tipo XSD Qué representa Ejemplo válido xs:string Texto Ane xs:integer Número entero 17 xs:decimal Número con decimales 8.75 xs:boolean Verdadero o falso true , false , 1 , 0 xs:date Fecha 2026-09-24 Atributos Los atributos también pueden declararse en XSD. Normalmente se definen dentro de un tipo complejo, porque pertenecen a un elemento. &lt;alumno id=\"A001\"&gt; &lt;nombre&gt;Ane&lt;/nombre&gt; &lt;/alumno&gt; &lt;xs:attribute name=\"id\" type=\"xs:string\" use=\"required\" /&gt; El atributo use=\"required\" indica que ese atributo es obligatorio. Si no aparece en el XML, el documento no será válido respecto al XSD."
  },
  {
    "id": "ut02-teoria-04-tipos-complejos-secuencias",
    "unitId": "ut02",
    "section": "Teoría",
    "title": "UT 02. Teoría: 2.4 Tipos complejos y secuencias",
    "url": "ut02-teoria.html#ut02-teoria-04-tipos-complejos-secuencias",
    "type": "Teoría · Sección",
    "text": "2.4 Tipos complejos y secuencias Los tipos complejos permiten definir elementos que contienen otros elementos, atributos o ambas cosas. Elementos con otros elementos dentro Muchos documentos XML tienen elementos que agrupan información. Por ejemplo, un elemento &lt;alumno&gt; puede contener &lt;nombre&gt; , &lt;edad&gt; y &lt;curso&gt; . &lt;alumno&gt; &lt;nombre&gt;Ane&lt;/nombre&gt; &lt;edad&gt;17&lt;/edad&gt; &lt;curso&gt;1 DAM&lt;/curso&gt; &lt;/alumno&gt; En XSD, ese elemento se define con &lt;xs:complexType&gt; : &lt;xs:element name=\"alumno\"&gt; &lt;xs:complexType&gt; &lt;xs:sequence&gt; &lt;xs:element name=\"nombre\" type=\"xs:string\" /&gt; &lt;xs:element name=\"edad\" type=\"xs:integer\" /&gt; &lt;xs:element name=\"curso\" type=\"xs:string\" /&gt; &lt;/xs:sequence&gt; &lt;/xs:complexType&gt; &lt;/xs:element&gt; La importancia del orden &lt;xs:sequence&gt; indica que los elementos hijos deben aparecer en el mismo orden en el que se han declarado. XML Resultado Motivo &lt;nombre&gt; , &lt;edad&gt; , &lt;curso&gt; Válido Respeta el orden del XSD. &lt;edad&gt; , &lt;nombre&gt; , &lt;curso&gt; No válido No respeta la secuencia definida. Repeticiones y obligatoriedad Con minOccurs y maxOccurs podemos indicar cuántas veces puede aparecer un elemento. &lt;xs:element name=\"telefono\" type=\"xs:string\" minOccurs=\"0\" maxOccurs=\"unbounded\" /&gt; Este ejemplo indica que &lt;telefono&gt; puede no aparecer, aparecer una vez o aparecer muchas veces."
  },
  {
    "id": "ut02-teoria-05-restricciones-validacion",
    "unitId": "ut02",
    "section": "Teoría",
    "title": "UT 02. Teoría: 2.5 Restricciones y validación",
    "url": "ut02-teoria.html#ut02-teoria-05-restricciones-validacion",
    "type": "Teoría · Sección",
    "text": "2.5 Restricciones y validación Las restricciones permiten limitar los valores aceptados por un elemento o atributo. Restricciones numéricas Podemos indicar valores mínimos y máximos. Por ejemplo, una edad entre 0 y 120: &lt;xs:element name=\"edad\"&gt; &lt;xs:simpleType&gt; &lt;xs:restriction base=\"xs:integer\"&gt; &lt;xs:minInclusive value=\"0\" /&gt; &lt;xs:maxInclusive value=\"120\" /&gt; &lt;/xs:restriction&gt; &lt;/xs:simpleType&gt; &lt;/xs:element&gt; &lt;edad&gt;17&lt;/edad&gt; sería válido, pero &lt;edad&gt;200&lt;/edad&gt; no lo sería. Valores permitidos Con &lt;xs:enumeration&gt; podemos limitar un valor a una lista cerrada de opciones. &lt;xs:element name=\"modalidad\"&gt; &lt;xs:simpleType&gt; &lt;xs:restriction base=\"xs:string\"&gt; &lt;xs:enumeration value=\"DAM\" /&gt; &lt;xs:enumeration value=\"DAW\" /&gt; &lt;xs:enumeration value=\"ASIR\" /&gt; &lt;/xs:restriction&gt; &lt;/xs:simpleType&gt; &lt;/xs:element&gt; En este caso, &lt;modalidad&gt;DAM&lt;/modalidad&gt; sería válido, pero &lt;modalidad&gt;Bachillerato&lt;/modalidad&gt; no. Patrones Con &lt;xs:pattern&gt; podemos obligar a que un texto siga una forma concreta. Por ejemplo, un código de alumno formado por la letra A y tres dígitos: &lt;xs:element name=\"codigo\"&gt; &lt;xs:simpleType&gt; &lt;xs:restriction base=\"xs:string\"&gt; &lt;xs:pattern value=\"A[0-9][0-9][0-9]\" /&gt; &lt;/xs:restriction&gt; &lt;/xs:simpleType&gt; &lt;/xs:element&gt; &lt;codigo&gt;A125&lt;/codigo&gt; sería válido, pero &lt;codigo&gt;AL125&lt;/codigo&gt; no. Cómo pensaremos la validación Para validar un XML frente a un XSD seguiremos siempre una idea sencilla: Leer el XSD para localizar la raíz esperada. Comprobar qué elementos y atributos son obligatorios. Revisar el orden definido por las secuencias. Comprobar los tipos de datos. Aplicar restricciones: rangos, enumeraciones, patrones y repeticiones. Durante la unidad trabajaremos mucho modificando XML para que cumplan un XSD dado, y también modificando XSD para expresar nuevas reglas."
  },
  {
    "id": "ut02-ejercicios-01-contenido-inicial",
    "unitId": "ut02",
    "section": "Ejercicios",
    "title": "UT 02. Ejercicios: 2.1 Ejercicios sobre Validación de documentos XML mediante esquemas.",
    "url": "ut02-ejercicios.html#ut02-ejercicios-01-contenido-inicial",
    "type": "Ejercicios · Sección",
    "text": "2.1 Ejercicios sobre Validación de documentos XML mediante esquemas. Práctica inicial de la unidad: Validación de documentos XML mediante esquemas. Práctica propuesta Crea un documento XML y valida su estructura usando un esquema proporcionado o definido por ti. Nombre del proyecto del ejercicio: ValidacionXML"
  },
  {
    "id": "ut03-teoria-01-contenido-inicial",
    "unitId": "ut03",
    "section": "Teoría",
    "title": "UT 03. Teoría: 3.1 Introducción a los lenguajes de marcas en entornos WEB (HTML)",
    "url": "ut03-teoria.html#ut03-teoria-01-contenido-inicial",
    "type": "Teoría · Sección",
    "text": "3.1 Introducción a los lenguajes de marcas en entornos WEB (HTML) Primer contacto con HTML y con la estructura básica de documentos web. Contenidos Pendiente: aquí se volcará la teoría completa de la unidad cuando esté disponible."
  },
  {
    "id": "ut03-ejercicios-01-contenido-inicial",
    "unitId": "ut03",
    "section": "Ejercicios",
    "title": "UT 03. Ejercicios: 3.1 Ejercicios sobre Introducción a los lenguajes de marcas en entornos WEB (HTML)",
    "url": "ut03-ejercicios.html#ut03-ejercicios-01-contenido-inicial",
    "type": "Ejercicios · Sección",
    "text": "3.1 Ejercicios sobre Introducción a los lenguajes de marcas en entornos WEB (HTML) Práctica inicial de la unidad: Introducción a los lenguajes de marcas en entornos WEB (HTML) Práctica propuesta Crea una página HTML sencilla con estructura semántica, textos, enlaces e imágenes. Nombre del proyecto del ejercicio: PrimerHTML"
  },
  {
    "id": "ut04-teoria-01-contenido-inicial",
    "unitId": "ut04",
    "section": "Teoría",
    "title": "UT 04. Teoría: 4.1 Desarrollo y aplicación de lenguajes de marcas en entornos WEB (CSS)",
    "url": "ut04-teoria.html#ut04-teoria-01-contenido-inicial",
    "type": "Teoría · Sección",
    "text": "4.1 Desarrollo y aplicación de lenguajes de marcas en entornos WEB (CSS) Aplicación de CSS para definir presentación, layout, tipografía, colores y adaptación visual. Contenidos Pendiente: aquí se volcará la teoría completa de la unidad cuando esté disponible."
  },
  {
    "id": "ut04-ejercicios-01-contenido-inicial",
    "unitId": "ut04",
    "section": "Ejercicios",
    "title": "UT 04. Ejercicios: 4.1 Ejercicios sobre Desarrollo y aplicación de lenguajes de marcas en entornos WEB (CSS)",
    "url": "ut04-ejercicios.html#ut04-ejercicios-01-contenido-inicial",
    "type": "Ejercicios · Sección",
    "text": "4.1 Ejercicios sobre Desarrollo y aplicación de lenguajes de marcas en entornos WEB (CSS) Práctica inicial de la unidad: Desarrollo y aplicación de lenguajes de marcas en entornos WEB (CSS) Práctica propuesta Aplica estilos CSS a una página HTML para mejorar su presentación y organización. Nombre del proyecto del ejercicio: PrimerCSS"
  },
  {
    "id": "ut05-teoria-01-contenido-inicial",
    "unitId": "ut05",
    "section": "Teoría",
    "title": "UT 05. Teoría: 5.1 Utilización de lenguajes de marcas y de programación en entorno web",
    "url": "ut05-teoria.html#ut05-teoria-01-contenido-inicial",
    "type": "Teoría · Sección",
    "text": "5.1 Utilización de lenguajes de marcas y de programación en entorno web Combinación de lenguajes de marcas y programación para crear páginas web interactivas. Contenidos Pendiente: aquí se volcará la teoría completa de la unidad cuando esté disponible."
  },
  {
    "id": "ut05-ejercicios-01-contenido-inicial",
    "unitId": "ut05",
    "section": "Ejercicios",
    "title": "UT 05. Ejercicios: 5.1 Ejercicios sobre Utilización de lenguajes de marcas y de programación en entorno web",
    "url": "ut05-ejercicios.html#ut05-ejercicios-01-contenido-inicial",
    "type": "Ejercicios · Sección",
    "text": "5.1 Ejercicios sobre Utilización de lenguajes de marcas y de programación en entorno web Práctica inicial de la unidad: Utilización de lenguajes de marcas y de programación en entorno web Práctica propuesta Añade comportamiento básico a una página web usando scripts y manipulación de elementos. Nombre del proyecto del ejercicio: WebInteractiva"
  },
  {
    "id": "ut06-teoria-01-contenido-inicial",
    "unitId": "ut06",
    "section": "Teoría",
    "title": "UT 06. Teoría: 6.1 Almacenamiento de información",
    "url": "ut06-teoria.html#ut06-teoria-01-contenido-inicial",
    "type": "Teoría · Sección",
    "text": "6.1 Almacenamiento de información Representación, organización y almacenamiento de información mediante formatos estructurados. Contenidos Pendiente: aquí se volcará la teoría completa de la unidad cuando esté disponible."
  },
  {
    "id": "ut06-ejercicios-01-contenido-inicial",
    "unitId": "ut06",
    "section": "Ejercicios",
    "title": "UT 06. Ejercicios: 6.1 Ejercicios sobre Almacenamiento de información",
    "url": "ut06-ejercicios.html#ut06-ejercicios-01-contenido-inicial",
    "type": "Ejercicios · Sección",
    "text": "6.1 Ejercicios sobre Almacenamiento de información Práctica inicial de la unidad: Almacenamiento de información Práctica propuesta Diseña una estructura de datos para almacenar información y representa varios registros. Nombre del proyecto del ejercicio: AlmacenamientoInformacion"
  },
  {
    "id": "ut07-teoria-01-contenido-inicial",
    "unitId": "ut07",
    "section": "Teoría",
    "title": "UT 07. Teoría: 7.1 Proyecto web dinámica",
    "url": "ut07-teoria.html#ut07-teoria-01-contenido-inicial",
    "type": "Teoría · Sección",
    "text": "7.1 Proyecto web dinámica Desarrollo de un proyecto web dinámico integrando estructura, estilos y comportamiento. Contenidos Pendiente: aquí se volcará la teoría completa de la unidad cuando esté disponible."
  },
  {
    "id": "ut07-ejercicios-01-contenido-inicial",
    "unitId": "ut07",
    "section": "Ejercicios",
    "title": "UT 07. Ejercicios: 7.1 Ejercicios sobre Proyecto web dinámica",
    "url": "ut07-ejercicios.html#ut07-ejercicios-01-contenido-inicial",
    "type": "Ejercicios · Sección",
    "text": "7.1 Ejercicios sobre Proyecto web dinámica Práctica inicial de la unidad: Proyecto web dinámica Práctica propuesta Construye una pequeña web dinámica integrando contenidos, estilos e interacción. Nombre del proyecto del ejercicio: ProyectoWebDinamica"
  },
  {
    "id": "ut08-teoria-01-contenido-inicial",
    "unitId": "ut08",
    "section": "Teoría",
    "title": "UT 08. Teoría: 8.1 Sindicación de contenidos",
    "url": "ut08-teoria.html#ut08-teoria-01-contenido-inicial",
    "type": "Teoría · Sección",
    "text": "8.1 Sindicación de contenidos Uso de formatos de sindicación para distribuir y consumir contenidos actualizados. Contenidos Pendiente: aquí se volcará la teoría completa de la unidad cuando esté disponible."
  },
  {
    "id": "ut08-ejercicios-01-contenido-inicial",
    "unitId": "ut08",
    "section": "Ejercicios",
    "title": "UT 08. Ejercicios: 8.1 Ejercicios sobre Sindicación de contenidos",
    "url": "ut08-ejercicios.html#ut08-ejercicios-01-contenido-inicial",
    "type": "Ejercicios · Sección",
    "text": "8.1 Ejercicios sobre Sindicación de contenidos Práctica inicial de la unidad: Sindicación de contenidos Práctica propuesta Crea o analiza un canal de sindicación de contenidos y revisa sus elementos principales. Nombre del proyecto del ejercicio: SindicacionContenidos"
  },
  {
    "id": "ut09-teoria-01-contenido-inicial",
    "unitId": "ut09",
    "section": "Teoría",
    "title": "UT 09. Teoría: 9.1 Sistemas de información",
    "url": "ut09-teoria.html#ut09-teoria-01-contenido-inicial",
    "type": "Teoría · Sección",
    "text": "9.1 Sistemas de información Introducción a sistemas de información y al intercambio estructurado de datos. Contenidos Pendiente: aquí se volcará la teoría completa de la unidad cuando esté disponible."
  },
  {
    "id": "ut09-ejercicios-01-contenido-inicial",
    "unitId": "ut09",
    "section": "Ejercicios",
    "title": "UT 09. Ejercicios: 9.1 Ejercicios sobre Sistemas de información",
    "url": "ut09-ejercicios.html#ut09-ejercicios-01-contenido-inicial",
    "type": "Ejercicios · Sección",
    "text": "9.1 Ejercicios sobre Sistemas de información Práctica inicial de la unidad: Sistemas de información Práctica propuesta Analiza un sistema de información sencillo e identifica sus datos, procesos y salidas. Nombre del proyecto del ejercicio: SistemaInformacion"
  }
];
