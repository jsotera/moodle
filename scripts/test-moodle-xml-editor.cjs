const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

const root = path.resolve(__dirname, "..");
const editor = path.join(root, "tools/moodle-xml-editor/index.html");

async function main() {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
    const errors = [];
    const requests = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("request", request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
    await page.goto(pathToFileURL(editor).href);
    await page.evaluate(() => document.fonts.ready);

    const fixtures = [];
    for (const unit of ["ut01", "ut02", "ut03"]) {
      for (const name of fs.readdirSync(path.join(root, "questions/prom", unit))) {
        if (name.endsWith(".xml")) fixtures.push({ name, source: fs.readFileSync(path.join(root, "questions/prom", unit, name), "utf8") });
      }
    }
    const roundTrips = await page.evaluate(fixtures => {
      function canonical(node) {
        return [node.nodeType, node.nodeName,
          node.attributes ? [...node.attributes].map(a => [a.name, a.value]).sort() : null,
          [3, 4, 7, 8].includes(node.nodeType) ? node.nodeValue : null,
          [...node.childNodes].map(canonical)];
      }
      return fixtures.map(file => {
        const bank = MoodleXml.Bank.parse(file.source);
        const before = canonical(bank.document.documentElement);
        const exported = MoodleXml.Bank.parse(bank.serialize());
        return { file: file.name, equal: JSON.stringify(before) === JSON.stringify(canonical(exported.document.documentElement)),
          count: bank.items().length, issues: bank.validate() };
      });
    }, fixtures);
    for (const result of roundTrips) {
      assert.equal(result.equal, true, result.file + ": pérdida de datos al exportar");
      assert.deepEqual(result.issues, [], result.file + ": validación inicial");
    }
    console.log("Ida y vuelta sin cambios:", roundTrips.map(r => r.file + " (" + r.count + ")").join(", "));

    const core = await page.evaluate(() => {
      const source = `<quiz data-custom="preserved"><!-- comentario -->
<question type="category"><category><text>$module$/top/Uno</text></category><info><text>Información</text></info></question>
<question type="multichoice" custom="yes"><name><text>Original</text></name><questiontext format="html"><text><![CDATA[<p>¿Qué muestra?</p><pre><code>int año = 1;\nSystem.out.print(año);</code></pre>]]></text><file name="foto.png" encoding="base64">YWJj</file></questiontext><generalfeedback format="html"><text>Explicación</text></generalfeedback><idnumber>ESTABLE-1</idnumber><defaultgrade>0.5</defaultgrade><penalty>0.3333333</penalty><single>true</single><shuffleanswers>false</shuffleanswers><answer fraction="100"><text>A</text><feedback><text>Bien</text></feedback></answer><answer fraction="-33.33333"><text>B</text></answer><answer fraction="-33.33333"><text>C</text></answer><answer fraction="-33.33333"><text>D</text></answer><tags><tag><text>origen-pdf</text></tag></tags><campo-futuro>conservar</campo-futuro></question>
<question type="essay"><name><text>Desarrollo</text></name><questiontext><text>Comenta.</text></questiontext><responseformat>editorfilepicker</responseformat><attachments>3</attachments></question></quiz>`;
      const bank = MoodleXml.Bank.parse(source);
      const item = bank.items()[0];
      bank.update(item.key, "body", '<p>Revisión ñ &amp; &lt;</p><pre><code>String dato = "]]&gt;";\nSystem.out.print(dato);</code></pre>');
      bank.update(item.key, "feedback", "<p>Explicación con ]]> y acentos: áéíóú.</p>");
      bank.setCorrect(item.key, 2);
      let parsed = MoodleXml.Bank.parse(bank.serialize());
      const modified = parsed.items()[0];
      const stable = modified.id === "ESTABLE-1" && modified.node.getAttribute("custom") === "yes"
        && modified.node.querySelector("file").textContent === "YWJj"
        && modified.node.querySelector("campo-futuro").textContent === "conservar"
        && modified.node.querySelector("tag text").textContent === "origen-pdf"
        && modified.feedback.includes("]]>") && modified.answers[2].fraction === "100"
        && modified.answers[0].fraction === "-33.33333" && !modified.shuffle
        && parsed.items()[1].node.querySelector("attachments").textContent === "3";
      const duplicate = bank.duplicate(item.key);
      const differentId = bank.item(duplicate).id !== item.id;
      const category = bank.addCategory("$module$/top/Dos");
      bank.changeCategory(duplicate, category);
      const placed = bank.item(duplicate).category.key === category;
      const added = bank.addQuestion(category);
      const fresh = bank.item(added);
      const validNew = fresh.answers.length === 4 && fresh.answers.filter(a => Number(a.fraction) === 100).length === 1;
      bank.remove(added);
      bank.remove(duplicate);
      const noLoss = bank.items().length === 2;
      let rejectsBroken = false, rejectsDoctype = false;
      try { MoodleXml.Bank.parse("<quiz><broken></quiz>"); } catch { rejectsBroken = true; }
      try { MoodleXml.Bank.parse('<!DOCTYPE quiz><quiz/>'); } catch { rejectsDoctype = true; }
      bank.update(item.key, "id", "MISMO");
      const next = bank.duplicate(item.key);
      bank.update(next, "id", "MISMO");
      const duplicateDetected = bank.validate().some(issue => issue.message.includes("repetido"));
      const numeric = MoodleXml.Bank.parse('<quiz><question type="numerical"><name><text>Número</text></name><questiontext><text>Resultado</text></questiontext><defaultgrade>1</defaultgrade><answer fraction="100"><text>2</text><tolerance>0.1</tolerance></answer><unitgradingtype>0</unitgradingtype></question></quiz>');
      numeric.update(numeric.items()[0].key, "answer", "3.5", 0);
      const numericRaw = numeric.items()[0].answers[0].value === "3.5" && numeric.items()[0].node.querySelector("unitgradingtype").textContent === "0";
      return { stable, differentId, placed, validNew, noLoss, rejectsBroken, rejectsDoctype, duplicateDetected, numericRaw };
    });
    Object.entries(core).forEach(([key, value]) => assert.equal(value, true, key));
    console.log("Núcleo XML: metadatos, CDATA, categorías, identificadores, duplicados y respuestas numéricas: OK");

    const bankFile = path.join(root, "questions/prom/ut03/prom-ut03-banco-entrenamiento.xml");
    await page.locator("#file-input").setInputFiles(bankFile);
    await page.waitForFunction(() => document.querySelectorAll(".question").length === 150);
    assert.equal(await page.locator('.answer input[type="radio"]:checked').count(), 150);
    assert.equal(await page.locator(".question").count(), 150);
    await page.locator("#search").fill("Math.random");
    assert.ok(await page.locator(".question.match").count() > 0);
    assert.equal(await page.locator(".question").count(), 150);
    await page.locator("#next-match").click();
    assert.equal(await page.locator(".question.current-match").count(), 1);
    await page.locator("#search").fill("");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(os.tmpdir(), "moodle-xml-editor-desktop.png") });

    const first = page.locator(".question").first();
    const originalId = await first.locator(".question-id").textContent();
    await first.locator('.answer input[type="radio"]').first().check();
    assert.equal(await first.locator('.answer input[type="radio"]').first().isChecked(), true);
    await page.locator("#html-mode").click();
    const statement = '<p>Revisión: métodos y parámetros.</p><pre><code>int año = 2;\nSystem.out.print(año &lt; 3);</code></pre>';
    await first.locator('[data-field="body"]').fill(statement);
    await page.locator("#visual-mode").click();
    assert.equal(await first.locator("pre").first().textContent(), "int año = 2;\nSystem.out.print(año < 3);");
    await first.locator('[data-action="duplicate"]').click();
    assert.equal(await page.locator(".question").count(), 151);
    await page.locator("#undo").click();
    assert.equal(await page.locator(".question").count(), 150);
    await page.locator("#redo").click();
    assert.equal(await page.locator(".question").count(), 151);
    await page.locator(".question").nth(1).locator('[data-action="delete"]').click();
    await page.locator("#confirm-accept").click();
    assert.equal(await page.locator(".question").count(), 150);
    const downloadEvent = page.waitForEvent("download");
    await page.locator("#export-file").click();
    const download = await downloadEvent;
    const exported = fs.readFileSync(await download.path(), "utf8");
    assert.match(download.suggestedFilename(), /-editado\.xml$/);
    const changed = await page.evaluate(({ xml, id }) => {
      const bank = MoodleXml.Bank.parse(xml);
      const item = bank.items().find(q => q.id === id);
      return { count: bank.items().length, correct: item.answers[0].fraction, body: item.body, issues: bank.validate() };
    }, { xml: exported, id: originalId });
    assert.equal(changed.count, 150);
    assert.equal(changed.correct, "100");
    assert.equal(changed.body, statement);
    assert.deepEqual(changed.issues, []);
    const comments = await page.evaluate(xml => {
      const answers = MoodleXml.Bank.parse(xml).items()[0].answers;
      return [answers[0].feedback, answers[3].feedback];
    }, exported);
    assert.deepEqual(comments, ["<p>Correcto.</p>", "<p>Revisa el recorrido del código y la explicación.</p>"]);
    console.log("Interfaz: 150 preguntas visibles, edición, radio, búsqueda sin ocultar, duplicado, borrado, deshacer y exportación: OK");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(os.tmpdir(), "moodle-xml-editor-mobile.png") });
    const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    assert.equal(dimensions.width, dimensions.scroll, "Desbordamiento en móvil");

    await page.locator("#file-input").setInputFiles(path.join(root, "questions/prom/ut01/prom-ut01-banco-entrenamiento.xml"));
    await page.waitForFunction(() => document.querySelectorAll(".question").length === 80);
    const numericCard = page.locator(".question").filter({ has: page.locator(".type-label", { hasText: "Numérica" }) }).first();
    await numericCard.locator('[data-field="answer"]').first().fill("12.5");
    const pairCard = page.locator(".question").filter({ has: page.locator(".type-label", { hasText: "Relacionar" }) }).first();
    await pairCard.locator('[data-field="pairAnswer"]').first().fill("Parámetro ñ");
    const truefalseCard = page.locator(".question").filter({ has: page.locator(".type-label", { hasText: "Verdadero / falso" }) }).first();
    await truefalseCard.locator('input[data-correct]:not(:checked)').check();
    const mixedEvent = page.waitForEvent("download");
    await page.locator("#export-file").click();
    const mixedXml = fs.readFileSync(await (await mixedEvent).path(), "utf8");
    const mixed = await page.evaluate(xml => {
      const bank = MoodleXml.Bank.parse(xml);
      return { issues: bank.validate(), numeric: bank.items().find(item => item.type === "numerical").answers[0].value,
        pair: bank.items().find(item => item.type === "matching").pairs[0].answer };
    }, mixedXml);
    assert.deepEqual(mixed, { issues: [], numeric: "12.5", pair: "Parámetro ñ" });
    console.log("Interfaz UT1: respuestas numéricas sin HTML añadido, correspondencias y verdadero/falso: OK");
    const hostile = `<quiz><question type="multichoice"><name><text>Prueba</text></name><questiontext format="html"><text><![CDATA[<p>Texto</p><script>window.INJECTED=true</script><img src="https://invalid.example/tracker" onerror="window.INJECTED=true"><a href="javascript:window.INJECTED=true">Enlace</a>]]></text></questiontext><defaultgrade>1</defaultgrade><single>true</single><answer fraction="100"><text>A</text></answer><answer fraction="0"><text>B</text></answer></question></quiz>`;
    await page.locator("#file-input").setInputFiles({ name: "seguridad.xml", mimeType: "application/xml", buffer: Buffer.from(hostile) });
    await page.waitForFunction(() => document.querySelectorAll(".question").length === 1);
    assert.equal(await page.evaluate(() => Boolean(window.INJECTED)), false);
    assert.equal(await page.locator(".rich-edit img, .rich-edit script").count(), 0);
    assert.equal(await page.locator('.rich-edit a[href^="javascript:"]').count(), 0);
    await page.locator("#new-bank").click();
    assert.equal(await page.locator(".question").count(), 0);
    await page.locator("#add-question").click();
    assert.equal(await page.locator(".question").count(), 1);
    assert.equal(await page.locator(".answer").count(), 4);
    await page.locator("#add-category").click();
    await page.locator("#category-name").fill("$module$/top/Nueva categoría ñ");
    await page.locator('#category-form button[type="submit"]').click();
    await page.locator("#add-question").click();
    assert.equal(await page.locator(".question").count(), 2);
    assert.ok(await page.locator(".category-heading").last().textContent().then(text => text.includes("Nueva categoría ñ")));
    for (const file of fixtures) {
      const unit = file.name.includes("ut01") ? "ut01" : file.name.includes("ut02") ? "ut02" : "ut03";
      assert.equal(fs.readFileSync(path.join(root, "questions/prom", unit, file.name), "utf8"), file.source);
    }
    assert.deepEqual(requests, [], "La herramienta ha hecho peticiones de red");
    assert.deepEqual(errors, [], "Errores de JavaScript: " + errors.join("; "));
    console.log("Vista móvil, acentos, archivos locales y vista previa sin scripts ni peticiones externas: OK");
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
