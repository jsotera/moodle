# Instrucciones para generar apuntes de Programación en Java

Este documento define el criterio de trabajo para rehacer los apuntes del módulo de Programación de DAM y DAW. El objetivo es transformar la teoría facilitada en páginas HTML claras, reutilizables y publicables tanto en Moodle como en GitHub Pages.

## Objetivo general

Generar materiales de teoría sobre programación con Java para alumnado de ciclos formativos. Cada contenido debe ser didáctico, progresivo y orientado a aprender a programar desde la práctica, con explicaciones breves, ejemplos de código y pequeñas actividades cuando proceda.

Cada tema o entrada tendrá dos versiones:

1. **Fragmento limpio para Moodle**: solo el bloque HTML de contenido, sin `doctype`, `html`, `head`, `body`, enlaces CDN ni scripts.
2. **Página HTML completa para GitHub Pages**: documento HTML completo con Bootstrap, Font Awesome, estilos base y el mismo contenido central.

## Tecnologías

- HTML5.
- Bootstrap 5.
- Font Awesome.
- Código Java dentro de bloques `pre > code`.
- CSS propio solo cuando sea necesario para mejorar legibilidad, especialmente en bloques de código, tablas o avisos.

## Estructura base del fragmento para Moodle

El contenido exportable a Moodle debe seguir siempre esta estructura orientativa. Cada fragmento HTML debe ser autocontenido visualmente, de forma que pueda pegarse directamente en Moodle y también pueda ser leído por el generador del sitio:

```html
<div class="container mt-4 p-4"
  style="padding-top: 0 !important; margin-top: 0 !important;">
  <div class="card shadow p-4">
    <h2 class="text-primary mb-3"><i
        class="fas fa-code-branch"></i> TITULO ENTRADA</h2>
    <p class="lead">La <strong>descripcion</strong> breve de la entrada.</p>
    <div class="mb-4">
      <h4 class="text-primary mb-3"><i class="fas fa-file-alt"></i> Subsección de la entrada</h4>
      <p>Descripción de la subsección, a veces con código Java de ejemplo con una clase <code>Main</code>:</p>
      <pre><code>class Main {
   // AQUI SERÍA CODIGO DE EJEMPLO
}</code></pre>
      <p>Puede haber más explicaciones aclarativas</p>
    </div>
    <div class="mb-4">
      <h4 class="text-primary mb-3"><i class="fas fa-sync-alt"></i> Otra subsección</h4>
      <p>Más descripciones de las subsecciones <strong>con negritas</strong> o <code>Códigos</code> si son necesarias</p>
    </div>
    <div class="mb-4">
      <p><strong>Nombre del proyecto del ejercicio:</strong> <code>NombreProyecto</code></p>
    </div>
  </div>
</div>
```

Esta estructura puede ampliarse con más subsecciones, listas, tablas, avisos o ejercicios, pero manteniendo la jerarquía visual:

- El contenedor exterior debe ser `div.container.mt-4.p-4` con el ajuste inline de Moodle.
- El contenido visible debe ir dentro de `div.card.shadow.p-4`.
- El título principal de cada fragmento debe ser un `h2.text-primary.mb-3` con icono Font Awesome.
- La introducción breve debe ir en un `p.lead`.
- Cada bloque interno debe ir en un `div.mb-4`.
- Las subsecciones deben usar `h4.text-primary.mb-3` con icono.
- Los ejemplos Java deben ir en `pre > code`.
- En fragmentos de ejercicios, el nombre del proyecto debe aparecer con el formato `Nombre del proyecto del ejercicio:`.

## Estructura de la página completa

Las páginas completas para GitHub Pages deben incluir:

- `<!doctype html>` y `<html lang="es">`.
- `<meta charset="utf-8">`.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Título descriptivo en `<title>`.
- CDN de Bootstrap.
- CDN de Font Awesome.
- Estilos comunes del curso.
- Cabecera del curso si se mantiene en la plantilla definitiva.
- Zona principal con el mismo bloque de contenido que se usará en Moodle.
- Script de Bootstrap al final del `body` si la página usa componentes interactivos.

## Criterios de redacción

- Escribir en castellano claro, con tono docente y directo.
- Explicar primero la idea general y después mostrar ejemplos.
- Evitar párrafos excesivamente largos.
- Usar `strong` para conceptos importantes.
- Usar `code` para nombres de clases, métodos, variables, tipos, instrucciones y proyectos.
- Mantener una progresión adecuada para alumnado que está aprendiendo Java desde cero.
- Cuando haya conceptos abstractos, incluir una analogía breve o un ejemplo cotidiano si ayuda.
- Evitar teoría innecesariamente académica si no contribuye a programar mejor.

## Criterios para código Java

- El JDK del curso es el 25. Configurar los nuevos proyectos Maven con
  `maven.compiler.release=25` y verificar la compilación con JDK 25, sin preview.
  Las instrucciones de IntelliJ deben indicar JDK 25 para el proyecto y para Maven.
- Los ejemplos deben ser válidos y copiables.
- Usar preferentemente una clase `Main` cuando el ejemplo sea autocontenido.
- Incluir siempre `public static void main(String[] args)` si el programa necesita ejecutarse.
- Mantener indentación de 4 espacios.
- Evitar ejemplos demasiado largos en una primera explicación.
- Usar nombres de variables expresivos y adecuados para alumnado principiante.
- Si se introduce un error común, explicarlo claramente y diferenciarlo del código correcto.

Ejemplo recomendado:

```html
<pre><code>class Main {
    public static void main(String[] args) {
        int edad = 18;
        System.out.println("Edad: " + edad);
    }
}</code></pre>
```

## Componentes habituales

### Subsecciones

Cada bloque conceptual importante debe ir en un `div class="mb-4"` con un título `h4`.

```html
<div class="mb-4">
  <h4 class="text-primary mb-3">
    <i class="fas fa-circle-info"></i> Concepto principal
  </h4>
  <p>Explicación del concepto.</p>
</div>
```

### Avisos y notas

Usar alertas de Bootstrap para remarcar ideas importantes:

```html
<div class="alert alert-info">
  <strong>Recuerda:</strong> Java distingue entre mayúsculas y minúsculas.
</div>
```

Tipos recomendados:

- `alert-info`: aclaraciones.
- `alert-warning`: errores frecuentes o precauciones.
- `alert-success`: buenas prácticas o resumen positivo.
- `alert-danger`: errores graves que impiden compilar o ejecutar.

### Listas

Usar listas para enumerar pasos, reglas o características.

```html
<ul>
  <li>Primero se declara la variable.</li>
  <li>Después se le puede asignar un valor.</li>
  <li>Finalmente se puede utilizar en expresiones.</li>
</ul>
```

### Tablas

Usar tablas de Bootstrap para comparaciones claras:

```html
<div class="table-responsive">
  <table class="table table-striped align-middle">
    <thead>
      <tr>
        <th>Tipo</th>
        <th>Uso</th>
        <th>Ejemplo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>int</code></td>
        <td>Números enteros</td>
        <td><code>int edad = 18;</code></td>
      </tr>
    </tbody>
  </table>
</div>
```

### Ejercicios

Cuando la teoría termine con una práctica, incluir el nombre del proyecto:

```html
<div class="mb-4">
  <p><strong>Nombre del proyecto del ejercicio:</strong> <code>NombreProyecto</code></p>
</div>
```

Si el ejercicio tiene enunciado, usar una subsección propia:

```html
<div class="mb-4">
  <h4 class="text-primary mb-3">
    <i class="fas fa-laptop-code"></i> Ejercicio propuesto
  </h4>
  <p>Crea un programa que declare dos variables numéricas y muestre su suma por pantalla.</p>
  <p><strong>Nombre del proyecto del ejercicio:</strong> <code>SumaVariables</code></p>
</div>
```

## Proyectos base con TODOs

Cuando la actividad pida implementar clases dadas, proporcionar un proyecto que
compile con los atributos, constructores y firmas de métodos definidos. El alumnado
completa los cuerpos y el método `main`, respetando esas firmas. Documentar cada
método con Javadoc e incluir en el enunciado los contratos y casos rechazados.

- Ordenar el trabajo y los enunciados empezando por `GUI`, continuando por las
  clases de modelo según sus dependencias y terminando por `Main`.
  Con dos modelos: `TODO 01`, `TODO 02`... en `GUI`; `TODO 11`, `TODO 12`...
  en el primer modelo; `TODO 21`, `TODO 22`... en el segundo;
  `TODO 31`, `TODO 32`... en `Main`.
- Mantener los TODOs únicos y ordenados dentro de cada proyecto. Reservar los
  bloques necesarios si una clase necesita más tareas que las disponibles.
- Proporcionar implementados los getters y setters directos, los constructores
  que solo asignan datos y los `toString` de descripción directa, cuando existan.
  No añadir setters innecesarios que rompan las reglas del modelo.
- Mantener como TODO los métodos con cálculos o decisiones, incluidas consultas
  cuyo nombre empiece por `get`, y los constructores con validaciones u otra lógica.
- Cada TODO del código debe contener únicamente el enunciado de lo que debe hacer,
  sin pseudocódigo, algoritmos ni comentarios adicionales de resolución.
- En el enunciado HTML, incluir un punto individual por cada TODO con su mismo
  número y texto literal. Colocar debajo las explicaciones o requisitos adicionales.
  Comprobar automáticamente la correspondencia entre código y enunciado.
- Solo los constructores y métodos `void` pendientes llevan cuerpos con únicamente
  los comentarios de sus tareas.
- Si un método pendiente tiene retorno, utilizar el valor inicial del tipo: `0`, `0L`, `0.0f`, `0.0`,
  `false`, `'\u0000'` o `null` para referencias, incluido `String`.
- No usar excepciones para señalar operaciones pendientes. Aclarar que los retornos
  provisionales permiten compilar, pero no constituyen una solución.
- Evitar campos `final` sin inicializar que impidan compilar constructores vacíos.
  Las constantes ya suministradas pueden estar inicializadas.
- Incluir un README con el orden de trabajo y la ejecución desde IntelliJ.
- Empaquetar los ZIP sin `target`, clases compiladas ni carpetas del IDE y usar
  enlaces absolutos de GitHub Pages en los fragmentos para Moodle.
- No incluir soluciones cuando se solicite únicamente la base del alumnado.
- En el material para el alumnado, omitir explicaciones sobre por qué un
  constructor o método se entrega implementado o queda como TODO. Describir
  únicamente los requisitos y el código que se proporciona.

## Interfaces de consola

- Siempre que sea posible, suministrar una clase `GUI` en un
  subpaquete `gui`, al mismo nivel que `modelo` y `app`.
- Todos los métodos de `GUI` deben ser estáticos, con llamadas como
  `GUI.mostrarMenu()` y `GUI.pedirOpcion()`, sin crear instancias.
  Compartir la entrada mediante `private static Scanner scanner = new Scanner(System.in);`.
  Mantener una clase sencilla, sin `final` ni constructor privado.
- Dar implementados los métodos que solo imprimen textos o datos recibidos,
  como `mostrarMenu` o `mostrarOpcionIncorrecta`. Dejar como TODO las lecturas
  y validaciones de interfaz, especialmente `pedirOpcion`, con sus retornos
  provisionales y puntos individuales idénticos en el enunciado.
- `GUI` no debe importar ni recibir objetos del modelo. Usar parámetros simples
  como `String`, `int` o `boolean`, en la cantidad mínima necesaria para el mensaje.
- Evitar métodos de presentación que recorran modelos, calculen o decidan
  reglas de negocio, o reciban conjuntos grandes de parámetros. Preferir
  mensajes pequeños como `mostrarAlguienEntra(nombre)` y `mostrarAlguienSale(nombre)`.
- `Main` consulta los objetos y decide qué texto o datos mostrar; `GUI` solo
  los imprime o solicita datos. El modelo no lee del teclado ni imprime.
- Los resultados finales pueden mostrarse mediante mensajes simples; evitar
  métodos como `mostrarResumen` que aglutinen todos los contadores.
- Ordenar las opciones como `1`, `2`, `3`... y, al final, `0. Salir`.
  El valor cero siempre significa salir del menú, no otra operación.
- En simulaciones automáticas, el menú puede iniciar un servicio completo y
  volver a mostrarse al finalizar; no añadir entradas durante cada paso si
  no forman parte de la actividad.
- Incluir en cada enunciado ejemplos de pantallas, solicitudes de datos,
  resultados correctos y rechazos. Marcar los extractos y los casos aleatorios
  para no confundirlos con una transcripción completa o un resultado fijo.
- Documentar los métodos públicos de `GUI` con Javadoc y enumerarlos en el
  enunciado. Mantener la correspondencia literal de los TODOs de las otras clases.

## Iconos recomendados

Usar Font Awesome para reforzar visualmente cada sección:

- `fa-code-branch`: título principal o estructura de programa.
- `fa-file-alt`: teoría o explicación.
- `fa-laptop-code`: ejercicios o práctica.
- `fa-terminal`: ejecución o consola.
- `fa-bug`: errores frecuentes.
- `fa-lightbulb`: ideas clave.
- `fa-list-check`: resumen o comprobaciones.
- `fa-table`: tablas de referencia.
- `fa-sync-alt`: procesos, ciclos o transformaciones.
- `fa-database`: datos, variables o almacenamiento.

## Limpieza y compatibilidad

- Mantener el HTML bien indentado.
- No incluir scripts innecesarios en los fragmentos de Moodle.
- No depender de rutas locales para recursos externos.
- Evitar estilos inline salvo el ajuste inicial del contenedor de Moodle si es necesario.
- Usar siempre codificación UTF-8 para conservar correctamente tildes, eñes y signos de apertura.
- Revisar que los ejemplos no tengan entidades HTML innecesarias ni caracteres corruptos.

## Flujo de trabajo previsto

1. El usuario facilita teoría, apuntes o borradores.
2. Se analiza el contenido y se organiza en bloques didácticos.
3. Se genera una versión HTML completa para GitHub Pages.
4. Se genera o conserva también el fragmento limpio para Moodle.
5. Se revisa que el código Java sea correcto y adecuado al nivel.
6. Se ajustan estilos, iconos y estructura para dejar una versión definitiva.

## Estructura del sitio GitHub Pages

El repositorio puede contener varios módulos. Cada módulo tendrá su propio código corto y su propio espacio publicado.

- `index.html`: portada raíz con enlaces a cada módulo.
- `fragments/{modulo}/utXX/teoria/*.html`: subfragmentos HTML limpios de teoría para Moodle.
- `fragments/{modulo}/utXX/ejercicios/*.html`: subfragmentos HTML limpios de ejercicios para Moodle.
- `templates/{modulo}/index.html`: plantilla de portada del módulo.
- `templates/{modulo}/page.html`: plantilla de página del módulo.
- `scripts/build-pages.js`: script que genera las páginas completas a partir de los fragmentos.
- `assets/css/course.css`: estilos comunes del sitio.
- `assets/js/course.js`: menú lateral, árbol de navegación, migas de pan y búsqueda.
- `assets/img/`: imágenes comunes, como el logo del centro.
- `{modulo}/`: salida generada del módulo para GitHub Pages, por ejemplo `prom/`.

Ejemplos de URLs públicas:

- `https://jsotera.github.io/moodle/prom/`
- `https://jsotera.github.io/moodle/lmgi/`

Cada UT tendrá, como mínimo, dos páginas separadas:

- Una página de teoría, con explicaciones, ejemplos y avisos.
- Una página de ejercicios, con prácticas y nombres de proyecto.

La teoría y la práctica no deben compartir la misma página visual. El menú lateral se genera desde JavaScript a partir del índice de unidades, pero cada página sigue siendo un HTML normal y publicable en GitHub Pages.

Las páginas de teoría generan un bloque de **Acceso rápido** a partir de sus títulos `h2` y `h4`. Para que ese índice sea útil, las secciones deben tener títulos claros y representar bloques reales de contenido.

## Fragmentos y generación

El contenido se editará preferentemente en subfragmentos dentro de `fragments/{modulo}/utXX/teoria/` y `fragments/{modulo}/utXX/ejercicios/`. Esos subfragmentos deben contener el HTML que se puede subir también a Moodle, sin `doctype`, `html`, `head`, `body`, cabecera del sitio ni scripts.

Los subfragmentos se ordenan por nombre de archivo. Usar prefijos numéricos:

```text
fragments/prom/ut01/teoria/01-introduccion-entorno-java.html
fragments/prom/ut01/teoria/02-variables-tipos-constantes.html
fragments/prom/ut01/ejercicios/01-primer-programa.html
fragments/prom/ut01/ejercicios/02-variables-tipos.html
```

Después de editar un fragmento, se debe regenerar el sitio con:

```bash
node scripts/build-pages.js
```

El script genera:

- Las páginas completas `{modulo}/utXX-teoria.html`.
- Las páginas completas `{modulo}/utXX-ejercicios.html`.
- Las redirecciones `{modulo}/utXX.html` hacia la teoría.
- El índice de búsqueda `{modulo}/assets/js/search-data.js`.
- La portada raíz `index.html` con enlaces a todos los módulos.

Para Moodle se usarán directamente los subfragmentos de `fragments/{modulo}/`.

Cuando una teoría o bloque de ejercicios tiene varios subfragmentos, el script genera automáticamente un índice de la UT con enlaces a cada subfragmento.

Si alguna vez hay que crear los fragmentos a partir de páginas ya existentes, se puede usar:

```bash
node scripts/build-pages.js --init-fragments
```

Ese modo solo crea fragmentos que no existan todavía.

## Impresión

Al imprimir una página, deben ocultarse:

- Menú lateral.
- Cabecera superior.
- Migas de pan.
- Bloque de acceso rápido.
- Pie de página, si existe.

El contenido debe ocupar todo el ancho disponible, sin sombras ni elementos de navegación.

## Búsqueda del sitio

La búsqueda será estática y en tiempo real, sin servidor ni base de datos. Cada módulo tendrá su propio archivo generado `{modulo}/assets/js/search-data.js`, con títulos, URLs y textos indexables de sus páginas.

Cuando se añada o modifique una unidad, habrá que actualizar también ese índice para que el buscador encuentre los nuevos contenidos. El buscador debe apuntar a la página concreta de teoría o ejercicios, no a una página mixta.

## Convenciones de nombres

- Usar nombres de archivo claros y ordenados, por ejemplo `parte1.html`, `parte2.html` o nombres temáticos como `variables.html`.
- Usar nombres de proyecto Java en PascalCase, por ejemplo `HolaMundo`, `VariablesBasicas` o `CalculoArea`.
- Mantener títulos visibles con acentos correctamente escritos.

## Resultado esperado por cada tema

Para cada entrada o tema, el resultado debería incluir:

- Título claro.
- Descripción breve en formato `lead`.
- Varias subsecciones explicativas.
- Ejemplos Java cuando el tema lo requiera.
- Avisos sobre errores frecuentes si procede.
- Actividad o ejercicio final cuando sea adecuado.
- Nombre del proyecto del ejercicio.
- Versión completa para GitHub Pages.
- Fragmento limpio para Moodle.
