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

El contenido exportable a Moodle debe seguir esta estructura general:

```html
<div class="container mt-4 p-4" style="padding-top: 0 !important; margin-top: 0 !important;">
  <div class="card shadow p-4">
    <h2 class="text-primary mb-3">
      <i class="fas fa-code-branch"></i> Título de la entrada
    </h2>

    <p class="lead">Descripción breve de la entrada.</p>

    <div class="mb-4">
      <h4 class="text-primary mb-3">
        <i class="fas fa-file-alt"></i> Subsección
      </h4>
      <p>Explicación de la subsección.</p>
      <pre><code>class Main {
    public static void main(String[] args) {
        System.out.println("Hola, mundo");
    }
}</code></pre>
    </div>

    <div class="mb-4">
      <p><strong>Nombre del proyecto del ejercicio:</strong> <code>NombreProyecto</code></p>
    </div>
  </div>
</div>
```

Esta estructura puede ampliarse con más subsecciones, listas, tablas, avisos o ejercicios, pero manteniendo la jerarquía visual.

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

La versión completa del temario se organizará como un sitio estático compatible con GitHub Pages:

- `fragments/utXX/teoria/*.html`: subfragmentos HTML limpios de teoría para Moodle.
- `fragments/utXX/ejercicios/*.html`: subfragmentos HTML limpios de ejercicios para Moodle.
- `templates/page.html`: plantilla común para las páginas completas.
- `scripts/build-pages.js`: script que genera las páginas completas a partir de los fragmentos.
- `assets/css/course.css`: estilos comunes del sitio.
- `assets/js/course.js`: menú lateral, árbol de navegación, migas de pan y búsqueda.
- `assets/img/`: imágenes comunes, como el logo del centro.
- `dist/`: salida generada con el sitio completo para GitHub Pages.

Cada UT tendrá, como mínimo, dos páginas separadas:

- Una página de teoría, con explicaciones, ejemplos y avisos.
- Una página de ejercicios, con prácticas y nombres de proyecto.

La teoría y la práctica no deben compartir la misma página visual. El menú lateral se genera desde JavaScript a partir del índice de unidades, pero cada página sigue siendo un HTML normal y publicable en GitHub Pages.

Las páginas de teoría generan un bloque de **Acceso rápido** a partir de sus títulos `h2` y `h4`. Para que ese índice sea útil, las secciones deben tener títulos claros y representar bloques reales de contenido.

## Fragmentos y generación

El contenido se editará preferentemente en subfragmentos dentro de `fragments/utXX/teoria/` y `fragments/utXX/ejercicios/`. Esos subfragmentos deben contener el HTML que se puede subir también a Moodle, sin `doctype`, `html`, `head`, `body`, cabecera del sitio ni scripts.

Los subfragmentos se ordenan por nombre de archivo. Usar prefijos numéricos:

```text
fragments/ut01/teoria/01-introduccion-entorno-java.html
fragments/ut01/teoria/02-variables-tipos-constantes.html
fragments/ut01/ejercicios/01-primer-programa.html
fragments/ut01/ejercicios/02-variables-tipos.html
```

Después de editar un fragmento, se debe regenerar el sitio con:

```bash
node scripts/build-pages.js
```

El script genera:

- Las páginas completas `dist/utXX-teoria.html`.
- Las páginas completas `dist/utXX-ejercicios.html`.
- Las redirecciones `dist/utXX.html` hacia la teoría.
- El índice de búsqueda `dist/assets/js/search-data.js`.

Para Moodle se usarán directamente los subfragmentos de `fragments/`.

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

La búsqueda será estática y en tiempo real, sin servidor ni base de datos. El archivo generado `dist/assets/js/search-data.js` contendrá los títulos, URLs y textos indexables de las páginas.

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
