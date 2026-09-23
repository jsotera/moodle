const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const fragmentsRoot = path.join(root, "fragments");
const templatesRoot = path.join(root, "templates");

const modules = [
  {
    id: "prom",
    title: "Programación",
    subtitle: "Programación en Java",
    description: "Materiales de Programación para DAM y DAW.",
    publicUrl: "https://jsotera.github.io/moodle/prom/",
    outputDir: path.join(root, "prom"),
    fragmentsDir: path.join(fragmentsRoot, "prom"),
    templatesDir: path.join(templatesRoot, "prom"),
    units: [
      { number: "01", title: "Introducción a la programación y Java" },
      { number: "02", title: "Variables, tipos de datos y constantes" },
      { number: "03", title: "Operadores y expresiones" },
      { number: "04", title: "Entrada y salida de datos" },
      { number: "05", title: "Estructuras condicionales" },
      { number: "06", title: "Bucles" },
      { number: "07", title: "Métodos y modularidad" },
      { number: "08", title: "Arrays y colecciones básicas" },
      { number: "09", title: "Programación orientada a objetos" },
      { number: "10", title: "Herencia, excepciones y ficheros" }
    ]
  }
];

const pageKinds = {
  teoria: {
    label: "Teoría",
    icon: "fa-book-open"
  },
  ejercicios: {
    label: "Ejercicios",
    icon: "fa-laptop-code"
  }
};

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function existsDirectory(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

function cleanDirectory(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDirectory(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const source = path.join(sourceDir, entry.name);
    const target = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(source, target);
    } else {
      fs.copyFileSync(source, target);
    }
  }
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeForHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function render(template, replacements) {
  return Object.entries(replacements).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    template
  );
}

function hydrateUnits(moduleConfig) {
  return moduleConfig.units.map((unit) => ({
    ...unit,
    id: `ut${unit.number}`,
    theoryId: `ut${unit.number}-teoria`,
    practiceId: `ut${unit.number}-ejercicios`,
    theoryUrl: `ut${unit.number}-teoria.html`,
    practiceUrl: `ut${unit.number}-ejercicios.html`
  }));
}

function titleFromFragment(html, fallback) {
  const heading = html.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);

  if (!heading) {
    return fallback;
  }

  return stripHtml(heading[1]).replace(/\s+/g, " ").trim() || fallback;
}

function readSubfragments(moduleConfig, unit, kind) {
  const sectionDir = path.join(moduleConfig.fragmentsDir, unit.id, kind);

  if (existsDirectory(sectionDir)) {
    const files = fs.readdirSync(sectionDir)
      .filter((file) => file.toLowerCase().endsWith(".html"))
      .sort((a, b) => a.localeCompare(b, "es"));

    if (files.length > 0) {
      return files.map((file, index) => {
        const html = read(path.join(sectionDir, file)).trim();
        const basename = path.basename(file, ".html");
        const title = titleFromFragment(html, basename.replace(/^\d+[-_ ]*/, ""));
        return {
          id: `${unit.id}-${kind}-${slugify(basename) || index + 1}`,
          file,
          title,
          html
        };
      });
    }
  }

  throw new Error(`No se han encontrado fragmentos para ${moduleConfig.id}/${unit.id}/${kind}`);
}

function renderFragmentIndex(kind, fragments) {
  if (fragments.length < 2) {
    return "";
  }

  const label = pageKinds[kind].label.toLowerCase();
  const links = fragments.map((fragment) => `
        <a class="section-nav-link" href="#${fragment.id}">
          ${escapeForHtml(fragment.title)}
        </a>`).join("");

  return `
<nav class="unit-fragment-index content-card mb-4" data-fragment-index aria-label="Índice de ${label}">
  <h2 class="h5 text-primary mb-3">
    <i class="fas fa-list-ul me-2" aria-hidden="true"></i>
    Índice de ${pageKinds[kind].label}
  </h2>
  <div class="section-nav-list">
${links}
  </div>
</nav>`;
}

function renderPageContent(unit, kind, fragments) {
  const kindConfig = pageKinds[kind];
  const intro = `
<section class="mb-4">
  <div class="content-card">
    <h1 class="text-primary mb-3">
      <i class="fas ${kindConfig.icon} me-2" aria-hidden="true"></i>
      UT ${unit.number}. ${kindConfig.label}
    </h1>
    <p class="lead mb-0">${escapeForHtml(unit.title)}</p>
  </div>
</section>`;

  const index = renderFragmentIndex(kind, fragments);
  const content = fragments.map((fragment) => `
<section id="${fragment.id}" class="fragment-section section-anchor">
${fragment.html}
</section>`).join("\n\n");

  return `${intro}${index}\n${content}`;
}

function pageUrlForKind(unit, kind) {
  return kind === "teoria" ? unit.theoryUrl : unit.practiceUrl;
}

function pageIdForKind(unit, kind) {
  return kind === "teoria" ? unit.theoryId : unit.practiceId;
}

function addSearchEntries(pages, unit, kind, fragments) {
  const kindConfig = pageKinds[kind];
  const baseUrl = pageUrlForKind(unit, kind);

  for (const fragment of fragments) {
    pages.push({
      id: fragment.id,
      unitId: unit.id,
      section: kindConfig.label,
      title: `UT ${unit.number}. ${kindConfig.label}: ${fragment.title}`,
      url: `${baseUrl}#${fragment.id}`,
      type: `${kindConfig.label} · Sección`,
      text: stripHtml(fragment.html)
    });
  }
}

function prepareModuleOutput(moduleConfig) {
  cleanDirectory(moduleConfig.outputDir);
  copyDirectory(path.join(root, "assets"), path.join(moduleConfig.outputDir, "assets"));
}

function buildModule(moduleConfig) {
  prepareModuleOutput(moduleConfig);

  const units = hydrateUnits(moduleConfig);
  const pageTemplate = read(path.join(moduleConfig.templatesDir, "page.html"));
  const indexTemplate = read(path.join(moduleConfig.templatesDir, "index.html"));
  const assetVersion = Date.now().toString();
  const pages = [
    {
      id: "home",
      title: "Inicio",
      url: "index.html",
      type: "Portada",
      text: `${moduleConfig.title}. ${moduleConfig.description}`
    }
  ];

  write(path.join(moduleConfig.outputDir, "index.html"), render(indexTemplate, {
    assetVersion,
    moduleTitle: moduleConfig.title,
    moduleSubtitle: moduleConfig.subtitle
  }));

  const unitIndex = units.map((unit) => ({
    id: unit.id,
    number: unit.number,
    title: unit.title,
    theoryId: unit.theoryId,
    practiceId: unit.practiceId,
    theoryUrl: unit.theoryUrl,
    practiceUrl: unit.practiceUrl
  }));

  for (const unit of units) {
    const theoryFragments = readSubfragments(moduleConfig, unit, "teoria");
    const practiceFragments = readSubfragments(moduleConfig, unit, "ejercicios");
    const theoryContent = renderPageContent(unit, "teoria", theoryFragments);
    const practiceContent = renderPageContent(unit, "ejercicios", practiceFragments);

    write(path.join(moduleConfig.outputDir, unit.theoryUrl), render(pageTemplate, {
      assetVersion,
      moduleTitle: moduleConfig.title,
      moduleSubtitle: moduleConfig.subtitle,
      pageId: unit.theoryId,
      title: `UT ${unit.number} | Teoría`,
      description: `Teoría de la UT ${unit.number}. ${escapeForHtml(unit.title)}.`,
      content: theoryContent
    }));

    write(path.join(moduleConfig.outputDir, unit.practiceUrl), render(pageTemplate, {
      assetVersion,
      moduleTitle: moduleConfig.title,
      moduleSubtitle: moduleConfig.subtitle,
      pageId: unit.practiceId,
      title: `UT ${unit.number} | Ejercicios`,
      description: `Ejercicios de la UT ${unit.number}. ${escapeForHtml(unit.title)}.`,
      content: practiceContent
    }));

    write(path.join(moduleConfig.outputDir, `${unit.id}.html`), `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=${unit.theoryUrl}">
    <title>Redirigiendo a UT ${unit.number}</title>
  </head>
  <body>
    <p>Redirigiendo a <a href="${unit.theoryUrl}">UT ${unit.number} - Teoría</a>.</p>
  </body>
</html>
`);

    addSearchEntries(pages, unit, "teoria", theoryFragments);
    addSearchEntries(pages, unit, "ejercicios", practiceFragments);
  }

  const searchData = `window.COURSE_UNITS = ${JSON.stringify(unitIndex, null, 2)};\n\nwindow.COURSE_PAGES = ${JSON.stringify(pages, null, 2)};\n`;
  write(path.join(moduleConfig.outputDir, "assets", "js", "search-data.js"), searchData);
}

function buildRootIndex() {
  const moduleCards = modules.map((moduleConfig) => `      <a class="module-card" href="./${moduleConfig.id}/">
        <span class="module-code">${moduleConfig.id.toUpperCase()}</span>
        <strong>${escapeForHtml(moduleConfig.title)}</strong>
        <span>${escapeForHtml(moduleConfig.description)}</span>
      </a>`).join("\n");

  write(path.join(root, "index.html"), `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Materiales Moodle</title>
    <style>
      body {
        margin: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #f3f6f9;
        color: #202833;
      }
      main {
        width: min(960px, calc(100% - 2rem));
        margin: 0 auto;
        padding: 3rem 0;
      }
      h1 {
        color: #083c5f;
        margin-bottom: 0.5rem;
      }
      .module-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
      }
      .module-card {
        display: grid;
        gap: 0.4rem;
        padding: 1rem;
        border: 1px solid #d9e2ea;
        border-radius: 0.75rem;
        background: #ffffff;
        color: inherit;
        text-decoration: none;
        box-shadow: 0 0.75rem 1.75rem rgba(15, 35, 52, 0.08);
      }
      .module-card:hover {
        border-color: #0f5d8f;
      }
      .module-code {
        width: fit-content;
        padding: 0.2rem 0.5rem;
        border-radius: 999px;
        background: #ffe8a3;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Materiales Moodle</h1>
      <p>Acceso a los módulos publicados.</p>
      <div class="module-grid">
${moduleCards}
      </div>
    </main>
  </body>
</html>
`);
}

for (const moduleConfig of modules) {
  buildModule(moduleConfig);
}

buildRootIndex();
console.log("Módulos generados correctamente.");
