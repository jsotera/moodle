# Teoría de Programación en Java

Material didáctico de introducción a la programación en Java para DAM y DAW, organizado en 10 unidades de trabajo y preparado para publicarse con GitHub Pages.

## Estructura

- `index.html`: portada e índice general.
- `fragments/utXX/teoria/*.html`: subfragmentos de teoría.
- `fragments/utXX/ejercicios/*.html`: subfragmentos de ejercicios.
- `templates/page.html`: plantilla base para generar las páginas completas.
- `templates/index.html`: plantilla de la portada.
- `scripts/build-pages.js`: generador de páginas completas a partir de fragmentos.
- `assets/css/course.css`: estilos del sitio.
- `assets/js/course.js`: menú lateral, árbol de navegación, migas de pan y buscador.
- `assets/img/`: recursos gráficos.
- `dist/`: sitio completo generado para publicar en GitHub Pages.

## Unidades

1. Introducción a la programación y Java.
2. Variables, tipos de datos y constantes.
3. Operadores y expresiones.
4. Entrada y salida de datos.
5. Estructuras condicionales.
6. Bucles.
7. Métodos y modularidad.
8. Arrays y colecciones básicas.
9. Programación orientada a objetos.
10. Herencia, excepciones y ficheros.

## Ejecución local

No hay dependencias externas. Genera el sitio:

```bash
node scripts/build-pages.js
```

Para probar el sitio generado como se verá en GitHub Pages:

```bash
python -m http.server 8000 --directory dist
```

Después, abre:

```text
http://localhost:8000
```

## Generación de páginas

El contenido editable vive en los subfragmentos de `fragments/utXX/teoria/` y `fragments/utXX/ejercicios/`. Los archivos se ordenan por nombre, por eso conviene usar prefijos como `01-`, `02-`, `03-`.

Después de modificar un subfragmento, genera de nuevo las páginas completas:

```bash
node scripts/build-pages.js
```

La primera vez, si necesitas crear los fragmentos desde las páginas completas existentes:

```bash
node scripts/build-pages.js --init-fragments
```

Ese comando no sobrescribe fragmentos ya existentes.

El build genera el sitio completo en `dist/`. Para Moodle se usan directamente los subfragmentos de `fragments/`.

## Búsqueda

El buscador funciona en el navegador, sin servidor. Los contenidos indexables se generan en `dist/assets/js/search-data.js` a partir de los fragmentos.

Cuando se añadan contenidos nuevos a una unidad, basta con regenerar las páginas para actualizar también el buscador. La teoría y los ejercicios se indexan como páginas diferentes.
