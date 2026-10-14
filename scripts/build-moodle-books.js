const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const fragmentsRoot = path.join(root, "fragments");
const outputRoot = path.join(root, "moodle-books");

const modules = [
  {
    id: "prom",
    title: "Programación",
    courseFullname: "Programación",
    courseShortname: "PROM",
    units: [
      { number: "01", title: "Introducción" },
      { number: "02", title: "Objetos y clases" },
      { number: "03", title: "Programación estructurada" },
      { number: "04", title: "Programación Orientada a Objetos (POO)" },
      { number: "05", title: "Arrays" },
      { number: "06", title: "Colecciones" },
      { number: "07", title: "I/O y GUI" },
      { number: "08", title: "Polimorfismo" },
      { number: "09", title: "Bases de Datos Relacionales (BDR)" },
      { number: "10", title: "Bases de Datos Orientadas a Objetos (BDOO)" }
    ]
  },
  {
    id: "lmgi",
    title: "Lenguaje de Marcas y Gestión de la Información",
    courseFullname: "Lenguaje de marcas y sistemas de gestión de información",
    courseShortname: "LMGI",
    units: [
      { number: "01", title: "Características del lenguaje XML. Documentos XML bien formados." },
      { number: "02", title: "Validación de documentos XML mediante esquemas." },
      { number: "03", title: "Introducción a los lenguajes de marcas en entornos WEB (HTML)" },
      { number: "04", title: "Desarrollo y aplicación de lenguajes de marcas en entornos WEB (CSS)" },
      { number: "05", title: "Utilización de lenguajes de marcas y de programación en entorno web" },
      { number: "06", title: "Almacenamiento de información" },
      { number: "07", title: "Proyecto web dinámica" },
      { number: "08", title: "Sindicación de contenidos" },
      { number: "09", title: "Sistemas de información" }
    ]
  }
];

const kinds = {
  teoria: "Teoría",
  ejercicios: "Ejercicios"
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

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromFragment(html, fallback) {
  const heading = html.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);
  return heading ? stripHtml(heading[1]) || fallback : fallback;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === "--module") {
      options.module = args[++i];
    } else if (arg === "--unit") {
      options.unit = args[++i]?.replace(/^ut/i, "").padStart(2, "0");
    } else if (arg === "--kind") {
      options.kind = args[++i];
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Argumento no reconocido: ${arg}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`Genera backups Moodle .mbz en formato libro.

Uso:
  node scripts/build-moodle-books.js
  node scripts/build-moodle-books.js --module lmgi
  node scripts/build-moodle-books.js --module lmgi --unit 03
  node scripts/build-moodle-books.js --module lmgi --unit 03 --kind teoria
  node scripts/build-moodle-books.js --module prom --unit 02 --kind ejercicios

Salida:
  moodle-books/{modulo}/utXX/{teoria|ejercicios}.mbz
`);
}

function getTargets(options) {
  return modules.flatMap((moduleConfig) => {
    if (options.module && moduleConfig.id !== options.module) {
      return [];
    }

    return moduleConfig.units.flatMap((unit) => {
      if (options.unit && unit.number !== options.unit) {
        return [];
      }

      return Object.keys(kinds).flatMap((kind) => {
        if (options.kind && kind !== options.kind) {
          return [];
        }

        return [{ moduleConfig, unit, kind }];
      });
    });
  });
}

function collectFragments(moduleConfig, unit, kind) {
  const dir = path.join(fragmentsRoot, moduleConfig.id, `ut${unit.number}`, kind);

  if (!existsDirectory(dir)) {
    return [];
  }

  return fs.readdirSync(dir)
    .filter((file) => file.toLowerCase().endsWith(".html"))
    .sort((a, b) => a.localeCompare(b, "es"))
    .map((file, index) => {
      const html = read(path.join(dir, file)).trim();
      const fallback = path.basename(file, ".html").replace(/^\d+[-_ ]*/, "");

      return {
        id: 1600 + index + 1,
        pageNumber: index + 1,
        title: titleFromFragment(html, fallback),
        html
      };
    });
}

function simpleXmlFile(rootName) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n</${rootName}>\n`;
}

function activityFile(rootName, inner = "") {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${inner}</${rootName}>\n`;
}

function buildMoodleBackupXml({ filename, moduleId, sectionId, moduleConfig, unit, kind, timestamp, backupId }) {
  const bookTitle = `${kinds[kind]} UT${unit.number}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<moodle_backup>
  <information>
    <name>${escapeXml(filename)}</name>
    <moodle_version>2026042003.01</moodle_version>
    <moodle_release>5.2.3+ (Build: 20260916)</moodle_release>
    <backup_version>2026042000</backup_version>
    <backup_release>5.2</backup_release>
    <backup_date>${timestamp}</backup_date>
    <mnet_remoteusers>0</mnet_remoteusers>
    <include_files>1</include_files>
    <include_file_references_to_external_content>0</include_file_references_to_external_content>
    <original_wwwroot>https://moodle.mariaanasanz.es</original_wwwroot>
    <original_site_identifier_hash>generated-by-local-script</original_site_identifier_hash>
    <original_course_id>1</original_course_id>
    <original_course_format>topics</original_course_format>
    <original_course_fullname>${escapeXml(moduleConfig.courseFullname)}</original_course_fullname>
    <original_course_shortname>${escapeXml(moduleConfig.courseShortname)}</original_course_shortname>
    <original_course_startdate>0</original_course_startdate>
    <original_course_enddate>0</original_course_enddate>
    <original_course_contextid>1</original_course_contextid>
    <original_system_contextid>1</original_system_contextid>
    <details>
      <detail backup_id="${backupId}">
        <type>activity</type>
        <format>moodle2</format>
        <interactive>0</interactive>
        <mode>70</mode>
        <execution>2</execution>
        <executiontime>0</executiontime>
      </detail>
    </details>
    <contents>
      <activities>
        <activity>
          <moduleid>${moduleId}</moduleid>
          <sectionid>${sectionId}</sectionid>
          <modulename>book</modulename>
          <title>${escapeXml(bookTitle)}</title>
          <directory>activities/book_${moduleId}</directory>
          <insubsection></insubsection>
        </activity>
      </activities>
    </contents>
    <settings>
      <setting><level>root</level><name>filename</name><value>${escapeXml(filename)}</value></setting>
      <setting><level>root</level><name>users</name><value>0</value></setting>
      <setting><level>root</level><name>anonymize</name><value>0</value></setting>
      <setting><level>root</level><name>role_assignments</name><value>0</value></setting>
      <setting><level>root</level><name>activities</name><value>1</value></setting>
      <setting><level>root</level><name>blocks</name><value>0</value></setting>
      <setting><level>root</level><name>files</name><value>1</value></setting>
      <setting><level>root</level><name>filters</name><value>1</value></setting>
      <setting><level>root</level><name>comments</name><value>0</value></setting>
      <setting><level>root</level><name>badges</name><value>0</value></setting>
      <setting><level>root</level><name>calendarevents</name><value>0</value></setting>
      <setting><level>root</level><name>userscompletion</name><value>0</value></setting>
      <setting><level>root</level><name>logs</name><value>0</value></setting>
      <setting><level>root</level><name>grade_histories</name><value>0</value></setting>
      <setting><level>root</level><name>groups</name><value>0</value></setting>
      <setting><level>root</level><name>competencies</name><value>0</value></setting>
      <setting><level>root</level><name>customfield</name><value>0</value></setting>
      <setting><level>root</level><name>contentbankcontent</name><value>0</value></setting>
      <setting><level>root</level><name>xapistate</name><value>0</value></setting>
      <setting><level>root</level><name>legacyfiles</name><value>0</value></setting>
      <setting><level>activity</level><activity>book_${moduleId}</activity><name>book_${moduleId}_included</name><value>1</value></setting>
      <setting><level>activity</level><activity>book_${moduleId}</activity><name>book_${moduleId}_userinfo</name><value>0</value></setting>
    </settings>
  </information>
</moodle_backup>
`;
}

function buildModuleXml({ moduleId, sectionId, timestamp }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<module id="${moduleId}" version="2026042000">
  <modulename>book</modulename>
  <sectionid>${sectionId}</sectionid>
  <sectionnumber>1</sectionnumber>
  <idnumber></idnumber>
  <added>${timestamp}</added>
  <score>0</score>
  <indent>0</indent>
  <visible>1</visible>
  <visibleoncoursepage>1</visibleoncoursepage>
  <visibleold>1</visibleold>
  <groupmode>0</groupmode>
  <groupingid>0</groupingid>
  <completion>0</completion>
  <completiongradeitemnumber>$@NULL@$</completiongradeitemnumber>
  <completionpassgrade>0</completionpassgrade>
  <completionview>0</completionview>
  <completionexpected>0</completionexpected>
  <availability>$@NULL@$</availability>
  <showdescription>0</showdescription>
  <downloadcontent>1</downloadcontent>
  <lang></lang>
  <enableaitools>$@NULL@$</enableaitools>
  <enabledaiactions>$@NULL@$</enabledaiactions>
  <tags>
  </tags>
</module>
`;
}

function buildBookXml({ moduleId, contextId, bookId, title, chapters, timestamp }) {
  const renderedChapters = chapters.map((chapter) => `      <chapter id="${chapter.id}">
        <pagenum>${chapter.pageNumber}</pagenum>
        <subchapter>0</subchapter>
        <title>${escapeXml(chapter.title)}</title>
        <content>${escapeXml(chapter.html)}</content>
        <contentformat>1</contentformat>
        <hidden>0</hidden>
        <timemodified>${timestamp}</timemodified>
        <importsrc></importsrc>
      </chapter>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<activity id="${bookId}" moduleid="${moduleId}" modulename="book" contextid="${contextId}">
  <book id="${bookId}">
    <name>${escapeXml(title)}</name>
    <intro></intro>
    <introformat>1</introformat>
    <numbering>0</numbering>
    <navstyle>1</navstyle>
    <customtitles>1</customtitles>
    <timecreated>${timestamp}</timecreated>
    <timemodified>${timestamp}</timemodified>
    <chapters>
${renderedChapters}
    </chapters>
    <chaptertags>
    </chaptertags>
  </book>
</activity>
`;
}

function writeArchiveIndex(baseDir, timestamp) {
  const entries = [];

  function visit(relativeDir) {
    const absoluteDir = path.join(baseDir, relativeDir);

    for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
      const relativePath = path.join(relativeDir, entry.name).split(path.sep).join("/");
      const absolutePath = path.join(baseDir, relativePath);

      if (entry.isDirectory()) {
        entries.push(`${relativePath}/\td\t0\t?`);
        visit(relativePath);
      } else if (relativePath !== ".ARCHIVE_INDEX") {
        entries.push(`${relativePath}\tf\t${fs.statSync(absolutePath).size}\t${timestamp}`);
      }
    }
  }

  visit("");
  write(
    path.join(baseDir, ".ARCHIVE_INDEX"),
    `Moodle archive file index. Count: ${entries.length}\n${entries.join("\n")}\n`
  );
}

function createMoodleBook({ moduleConfig, unit, kind }) {
  const chapters = collectFragments(moduleConfig, unit, kind);

  if (chapters.length === 0) {
    return null;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const moduleSeed = modules.findIndex((item) => item.id === moduleConfig.id) + 1;
  const kindSeed = kind === "teoria" ? 1 : 2;
  const moduleId = Number(`${moduleSeed}${unit.number}${kindSeed}77`);
  const sectionId = Number(`${moduleSeed}${unit.number}63`);
  const contextId = Number(`${moduleSeed}${unit.number}${kindSeed}79`);
  const bookId = Number(`${unit.number}${kindSeed}00`);
  const backupId = `${moduleConfig.id}${unit.number}${kind}${timestamp}`.replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
  const bookTitle = `${kinds[kind]} UT${unit.number}`;
  const filename = `${moduleConfig.id}-ut${unit.number}-${kind}-book.mbz`;
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `moodle-book-${moduleConfig.id}-ut${unit.number}-${kind}-`));
  const activityDir = path.join(tempDir, "activities", `book_${moduleId}`);

  write(path.join(tempDir, "moodle_backup.xml"), buildMoodleBackupXml({
    filename,
    moduleId,
    sectionId,
    moduleConfig,
    unit,
    kind,
    timestamp,
    backupId
  }));
  write(path.join(tempDir, "files.xml"), simpleXmlFile("files"));
  write(path.join(tempDir, "badges.xml"), simpleXmlFile("badges"));
  write(path.join(tempDir, "groups.xml"), activityFile("groups", "  <groupings>\n  </groupings>\n"));
  write(path.join(tempDir, "outcomes.xml"), simpleXmlFile("outcomes_definition"));
  write(path.join(tempDir, "questions.xml"), simpleXmlFile("question_categories"));
  write(path.join(tempDir, "roles.xml"), simpleXmlFile("roles_definition"));
  write(path.join(tempDir, "scales.xml"), simpleXmlFile("scales_definition"));
  write(path.join(tempDir, "users.xml"), simpleXmlFile("users"));
  write(path.join(tempDir, "completion.xml"), activityFile("course_completion", "  <course_completion_criteria>\n  </course_completion_criteria>\n  <course_completion_aggr_methd>\n  </course_completion_aggr_methd>\n"));
  write(path.join(tempDir, "moodle_backup.log"), "");

  write(path.join(activityDir, "book.xml"), buildBookXml({
    moduleId,
    contextId,
    bookId,
    title: bookTitle,
    chapters,
    timestamp
  }));
  write(path.join(activityDir, "module.xml"), buildModuleXml({ moduleId, sectionId, timestamp }));
  write(path.join(activityDir, "competencies.xml"), activityFile("course_module_competencies", "  <competencies>\n  </competencies>\n"));
  write(path.join(activityDir, "grade_history.xml"), simpleXmlFile("grade_history"));
  write(path.join(activityDir, "calendar.xml"), simpleXmlFile("events"));
  write(path.join(activityDir, "xapistate.xml"), simpleXmlFile("states"));
  write(path.join(activityDir, "grades.xml"), activityFile("activity_gradebook", "  <grade_items>\n  </grade_items>\n  <grade_letters>\n  </grade_letters>\n"));
  write(path.join(activityDir, "roles.xml"), activityFile("roles", "  <role_overrides>\n  </role_overrides>\n  <role_assignments>\n  </role_assignments>\n"));
  write(path.join(activityDir, "completion.xml"), activityFile("completions", "  <completionviews>\n  </completionviews>\n"));
  write(path.join(activityDir, "comments.xml"), simpleXmlFile("comments"));
  write(path.join(activityDir, "inforef.xml"), simpleXmlFile("inforef"));
  write(path.join(activityDir, "filters.xml"), activityFile("filters", "  <filter_actives>\n  </filter_actives>\n  <filter_configs>\n  </filter_configs>\n"));

  writeArchiveIndex(tempDir, timestamp);

  const outputDir = path.join(outputRoot, moduleConfig.id, `ut${unit.number}`);
  const outputFile = path.join(outputDir, filename);
  fs.mkdirSync(outputDir, { recursive: true });

  const tarResult = spawnSync("tar", ["-czf", outputFile, "-C", tempDir, "."], {
    encoding: "utf8"
  });

  if (tarResult.status !== 0) {
    throw new Error(`No se pudo generar ${outputFile}:\n${tarResult.stderr || tarResult.stdout}`);
  }

  return {
    outputFile: path.relative(root, outputFile),
    chapters: chapters.length
  };
}

function main() {
  const options = parseArgs();

  if (options.help) {
    printHelp();
    return;
  }

  if (options.kind && !kinds[options.kind]) {
    throw new Error(`Tipo no válido: ${options.kind}. Usa teoria o ejercicios.`);
  }

  const targets = getTargets(options);
  const generated = targets.map(createMoodleBook).filter(Boolean);

  if (generated.length === 0) {
    console.log("No se han encontrado fragmentos para generar libros Moodle.");
    return;
  }

  for (const item of generated) {
    console.log(`${item.outputFile} (${item.chapters} capítulos)`);
  }
}

main();
