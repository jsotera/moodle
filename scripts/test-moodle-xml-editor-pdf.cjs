const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { pathToFileURL } = require("node:url");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

async function main() {
  const root = path.resolve(__dirname, "..");
  const output = path.join(os.tmpdir(), "moodle-xml-editor-pdf");
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
    const errors = [], requests = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("request", request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
    page.on("dialog", dialog => dialog.accept());
    await page.goto(pathToFileURL(path.join(root, "tools/moodle-xml-editor/index.html")).href);
    assert.equal(await page.locator("#pdf-answers").isDisabled(), true);
    assert.equal(await page.locator("#pdf-student").isDisabled(), true);
    const source = path.join(root, "questions/prom/ut03/prom-ut03-examen-modelo-a.xml");
    const original = fs.readFileSync(source, "utf8");
    await page.locator("#file-input").setInputFiles(source);
    await page.waitForFunction(() => document.querySelectorAll(".question").length === 20);
    await page.locator("#html-mode").click();
    const body = page.locator('[data-field="body"]').first();
    await body.fill((await body.inputValue()) + "<p>Texto añadido sin exportar: áéíóú ñ ¿Revisión?</p>");
    const dirty = await page.locator("#save-status").textContent();
    const documentChecks = await page.evaluate(() => {
      const sample = '<p>Texto ñ &lt;x&gt;</p><pre><code>int año = 1;\n    System.out.print(año);</code></pre><img src="https://invalid.example/tracker"><script>window.BAD_PDF = true</script>';
      const blocks = MoodlePdf.htmlBlocks(sample);
      const mixed = MoodleXml.Bank.parse(`<quiz><question type="category"><category><text>top/Uno</text></category></question><question type="matching"><name><text>Pares</text></name><questiontext><text>Relaciona</text></questiontext><subquestion format="html"><text>Uno</text><answer><text>Secreto1</text></answer></subquestion><subquestion format="html"><text>Dos</text><answer><text>Secreto2</text></answer></subquestion></question><question type="shortanswer"><name><text>Corta</text></name><questiontext><text>Responde</text></questiontext><answer fraction="100"><text>Clave oculta</text></answer></question></quiz>`).items();
      const teacher = JSON.stringify(MoodlePdf.definition(mixed, "prueba.xml", true));
      const student = JSON.stringify(MoodlePdf.definition(mixed, "prueba.xml", false));
      let unsupported = false;
      try { MoodlePdf.definition([{ type: "essay", name: "Desarrollo" }], "prueba.xml", false); } catch { unsupported = true; }
      return { code: blocks.find(b => b.style === "code").text, safe: !window.BAD_PDF,
        escaped: blocks[0].text, teacher: teacher.includes("Clave oculta"),
        student: !student.includes("Clave oculta") && !student.includes("Respuesta: Secreto1"), unsupported };
    });
    assert.deepEqual(documentChecks, { code: "int año = 1;\n    System.out.print(año);", safe: true,
      escaped: "Texto ñ <x>", teacher: true, student: true, unsupported: true });
    for (const [button, suffix] of [["pdf-answers", "con-respuestas"], ["pdf-student", "sin-respuestas"]]) {
      const downloadPromise = page.waitForEvent("download", { timeout: 120000 });
      await page.locator("#" + button).click();
      const download = await downloadPromise;
      assert.equal(download.suggestedFilename(), "prom-ut03-examen-modelo-a-" + suffix + ".pdf");
      await download.saveAs(path.join(output, download.suggestedFilename()));
      await page.waitForFunction(() => !document.getElementById("pdf-answers").disabled);
      assert.equal(await page.locator("#save-status").textContent(), dirty, "El PDF no debe dar por guardado el XML");
    }
    await page.locator("#visual-mode").click();
    await page.screenshot({ path: path.join(output, "desktop.png") });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await page.locator("#pdf-answers").isVisible(), true);
    assert.equal(await page.locator("#pdf-student").isVisible(), true);
    await page.screenshot({ path: path.join(output, "mobile.png") });
    await page.locator("#new-bank").click();
    await page.locator("#confirm-accept").click();
    assert.equal(await page.locator("#pdf-answers").isDisabled(), true);
    await page.locator("#add-question").click();
    await page.locator("#html-mode").click();
    await page.locator('[data-field="body"]').fill("");
    await page.locator("#pdf-answers").click();
    assert.equal(await page.locator("#validation").isVisible(), true);
    assert.equal(fs.readFileSync(source, "utf8"), original);
    assert.deepEqual(requests, [], "No debe solicitar recursos de red");
    assert.deepEqual(errors, [], errors.join("; "));
    console.log("PDF local: ambas descargas, cambios sin guardar, código, acentos, privacidad, validación y móvil: OK");
    console.log("Artefactos de revisión: " + output);
  } finally { await browser.close(); }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
