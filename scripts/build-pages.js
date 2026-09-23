const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const templatePath = path.join(root, "templates", "page.html");
const indexTemplatePath = path.join(root, "templates", "index.html");
const fragmentsRoot = path.join(root, "fragments");
const distRoot = path.join(root, "dist");

const units = [
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
].map((unit) => ({
  ...unit,
  id: `ut${unit.number}`,
  theoryId: `ut${unit.number}-teoria`,
  practiceId: `ut${unit.number}-ejercicios`,
  theoryUrl: `ut${unit.number}-teoria.html`,
  practiceUrl: `ut${unit.number}-ejercicios.html`
}));

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

function extractCurrentMainContent(pagePath) {
  const html = read(pagePath);
  const mainMatch = html.match(/<main class="page-wrap">([\s\S]*?)<\/main>/);

  if (!mainMatch) {
    throw new Error(`No se ha encontrado <main class="page-wrap"> en ${pagePath}`);
  }

  return mainMatch[1]
    .replace(/^\s*<nav aria-label="Migas de pan"><ol class="breadcrumb" data-breadcrumb><\/ol><\/nav>\s*/, "")
    .trim();
}

function titleFromFragment(html, fallback) {
  const heading = html.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);

  if (!heading) {
    return fallback;
  }

  return stripHtml(heading[1]).replace(/\s+/g, " ").trim() || fallback;
}

function readSubfragments(unit, kind) {
  const sectionDir = path.join(fragmentsRoot, unit.id, kind);
  const legacyFile = path.join(fragmentsRoot, unit.id, `${kind}.html`);

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

  if (fs.existsSync(legacyFile)) {
    const html = read(legacyFile).trim();
    return [{
      id: `${unit.id}-${kind}`,
      file: `${kind}.html`,
      title: pageKinds[kind].label,
      html
    }];
  }

  throw new Error(`No se han encontrado fragmentos para ${unit.id}/${kind}`);
}

function renderFragmentIndex(kind, fragments) {
  if (fragments.length < 2) {
    return "";
  }

  const label = pageKinds[kind].label.toLowerCase();
  const links = fragments.map((fragment, index) => `
        <a class="section-nav-link" href="#${fragment.id}">
          <span class="small text-muted d-block">${String(index + 1).padStart(2, "0")}</span>
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
  const baseId = pageIdForKind(unit, kind);
  const searchableText = fragments.map((fragment) => stripHtml(fragment.html)).join(" ");

  pages.push({
    id: baseId,
    unitId: unit.id,
    section: kindConfig.label,
    title: `UT ${unit.number}. ${kindConfig.label}: ${unit.title}`,
    url: baseUrl,
    type: kindConfig.label,
    text: searchableText
  });

  if (fragments.length < 2) {
    return;
  }

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

function initFragments() {
  for (const unit of units) {
    const dir = path.join(fragmentsRoot, unit.id);
    const theoryFragment = path.join(dir, "teoria.html");
    const practiceFragment = path.join(dir, "ejercicios.html");

    if (!fs.existsSync(theoryFragment)) {
      write(theoryFragment, `${extractCurrentMainContent(path.join(root, unit.theoryUrl))}\n`);
    }

    if (!fs.existsSync(practiceFragment)) {
      write(practiceFragment, `${extractCurrentMainContent(path.join(root, unit.practiceUrl))}\n`);
    }
  }
}

function prepareDist() {
  cleanDirectory(distRoot);
  copyDirectory(path.join(root, "assets"), path.join(distRoot, "assets"));
}

function buildPages() {
  prepareDist();

  const template = read(templatePath);
  const assetVersion = Date.now().toString();
  const pages = [
    {
      id: "home",
      title: "Inicio",
      url: "index.html",
      type: "Portada",
      text: "Programación en Java para DAM y DAW. Unidades de trabajo, teoría, ejercicios y materiales del módulo."
    }
  ];

  write(path.join(distRoot, "index.html"), render(read(indexTemplatePath), {
    assetVersion
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
    const theoryFragments = readSubfragments(unit, "teoria");
    const practiceFragments = readSubfragments(unit, "ejercicios");
    const theoryContent = renderPageContent(unit, "teoria", theoryFragments);
    const practiceContent = renderPageContent(unit, "ejercicios", practiceFragments);

    write(path.join(distRoot, unit.theoryUrl), render(template, {
      assetVersion,
      pageId: unit.theoryId,
      title: `UT ${unit.number} | Teoría`,
      description: `Teoría de la UT ${unit.number}. ${escapeForHtml(unit.title)}.`,
      content: theoryContent
    }));

    write(path.join(distRoot, unit.practiceUrl), render(template, {
      assetVersion,
      pageId: unit.practiceId,
      title: `UT ${unit.number} | Ejercicios`,
      description: `Ejercicios de la UT ${unit.number}. ${escapeForHtml(unit.title)}.`,
      content: practiceContent
    }));

    write(path.join(distRoot, `${unit.id}.html`), `<!doctype html>
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
  write(path.join(distRoot, "assets", "js", "search-data.js"), searchData);
}

if (process.argv.includes("--init-fragments")) {
  initFragments();
}

buildPages();
console.log("Sitio generado correctamente en dist.");
