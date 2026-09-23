# Materiales Moodle

Repositorio de materiales didácticos para publicar en GitHub Pages y reutilizar fragmentos HTML en Moodle.

## Acceso a módulos

### [PROM · Programación](https://jsotera.github.io/moodle/prom/)

### [LMGI · Lenguaje de Marcas](https://jsotera.github.io/moodle/lmgi/)

## Estructura

- `index.html`: portada raíz con enlaces a los módulos.
- `fragments/prom/`: subfragmentos HTML del módulo de Programación.
- `fragments/lmgi/`: subfragmentos HTML del módulo de Lenguaje de Marcas.
- `templates/prom/`: plantillas del módulo de Programación.
- `templates/lmgi/`: plantillas del módulo de Lenguaje de Marcas.
- `prom/`: sitio generado del módulo de Programación.
- `lmgi/`: sitio generado del módulo de Lenguaje de Marcas.
- `assets/`: estilos, scripts e imágenes compartidas.
- `scripts/build-pages.js`: generador de módulos.
- `INSTRUCCIONES.md`: guía de formato y flujo de trabajo.

## Ejecución local

Genera los módulos:

```bash
node scripts/build-pages.js
```

Prueba el repositorio completo:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

Para acceder directamente al módulo de Programación:

```text
http://localhost:8000/prom/
```

Para acceder directamente al módulo de Lenguaje de Marcas:

```text
http://localhost:8000/lmgi/
```

## Fragmentos

El contenido editable vive en:

```text
fragments/{modulo}/utXX/teoria/*.html
fragments/{modulo}/utXX/ejercicios/*.html
```

Esos subfragmentos son los que pueden reutilizarse en Moodle.

Cada fragmento debe seguir la estructura visual Moodle documentada en `INSTRUCCIONES.md`: `div.container.mt-4.p-4` exterior, `div.card.shadow.p-4` interior, título `h2.text-primary.mb-3` con icono, introducción `p.lead` y bloques internos `div.mb-4` con subsecciones `h4`.

## Publicación

Cada módulo genera su propio espacio público:

```text
https://jsotera.github.io/moodle/prom/
https://jsotera.github.io/moodle/lmgi/
```

El buscador y las páginas completas se generan por módulo.
