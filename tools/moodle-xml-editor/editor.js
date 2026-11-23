(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const state = { bank: null, filename: "banco-preguntas.xml", mode: "visual", dirty: false, saved: "", history: [], historyIndex: -1, timer: null, matches: [], matchIndex: -1 };
  const preserved = new Map();
  let placeholderSequence = 0;
  let pdfBusy = false;
  const typeNames = { multichoice: "Tipo test", truefalse: "Verdadero / falso", shortanswer: "Respuesta corta", numerical: "Numérica", matching: "Relacionar" };

  function element(tag, attributes = {}, ...content) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
      if (value === undefined || value === null) continue;
      if (key === "class") node.className = value;
      else if (["value", "checked", "disabled", "hidden"].includes(key)) node[key] = value;
      else node.setAttribute(key, String(value));
    }
    for (const item of content.flat()) if (item !== null && item !== undefined) node.append(item instanceof Node ? item : document.createTextNode(String(item)));
    return node;
  }

  const icon = name => element("i", { class: "fa-solid fa-" + name, "aria-hidden": "true" });
  function iconButton(name, label, action, extra = {}) {
    return element("button", { type: "button", class: "icon-button", title: label, "aria-label": label, "data-action": action, ...extra }, icon(name));
  }
  const plainHTML = value => { const node = element("p", {}, value); return node.outerHTML.replace(/\n/g, "<br>"); };
  const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  function safeHTML(source, format) {
    const template = document.createElement("template");
    const rich = format === "html" || (format === "moodle_auto_format" && /<\/?[a-z][^>]*>/i.test(source));
    template.innerHTML = rich ? source : plainHTML(source);
    const allowed = new Set("P BR DIV SPAN STRONG B EM I U S PRE CODE UL OL LI TABLE THEAD TBODY TFOOT TR TH TD BLOCKQUOTE H1 H2 H3 H4 H5 H6 HR SUP SUB A".split(" "));
    const safeAttributes = new Set(["colspan", "rowspan", "scope", "start", "reversed", "type"]);
    const visit = parent => {
      for (const node of Array.from(parent.children)) {
        if (!allowed.has(node.tagName)) {
          const token = String(++placeholderSequence);
          preserved.set(token, node.outerHTML);
          node.replaceWith(element("span", { class: "embedded-placeholder", "data-preserved": token, contenteditable: "false" }, "Contenido incrustado"));
          continue;
        }
        for (const attr of Array.from(node.attributes)) {
          if (node.tagName === "A" && attr.name === "href" && /^(https?:|mailto:|#)/i.test(attr.value)) continue;
          if (!safeAttributes.has(attr.name)) node.removeAttribute(attr.name);
        }
        visit(node);
      }
    };
    visit(template.content);
    return template.innerHTML;
  }

  function editorHTML(node) {
    const clone = node.cloneNode(true);
    clone.querySelectorAll("[data-preserved]").forEach(placeholder => {
      const original = preserved.get(placeholder.dataset.preserved);
      if (original === undefined) return;
      const template = document.createElement("template");
      template.innerHTML = original;
      placeholder.replaceWith(template.content);
    });
    return clone.innerHTML;
  }

  function field(item, name, value, format = "html", index = null, plain = false) {
    const attrs = { "data-field": name, "aria-label": name === "body" ? "Enunciado" : name === "feedback" ? "Explicación" : "Respuesta" };
    if (index !== null) attrs["data-index"] = index;
    if (state.mode === "html" || plain) {
      return element("textarea", { ...attrs, class: "html-edit", "data-kind": "source", rows: Math.min(22, Math.max(2, value.split("\n").length + 1)), spellcheck: "false", value });
    }
    const node = element("div", { ...attrs, class: "rich-edit", contenteditable: "true", spellcheck: "false", role: "textbox", "aria-multiline": "true" });
    node.innerHTML = safeHTML(value, format);
    return node;
  }

  function notice(message) {
    $("notice").textContent = message;
    $("notice").hidden = !message;
  }

  function updateStatus() {
    $("save-status").textContent = state.dirty ? "Cambios sin exportar" : "Sin cambios pendientes";
    $("save-status").classList.toggle("dirty", state.dirty);
    $("file-name").textContent = state.bank ? state.filename : "Sin archivo";
    $("file-name").title = state.filename;
    $("undo").disabled = !state.bank || state.historyIndex <= 0;
    $("redo").disabled = !state.bank || state.historyIndex >= state.history.length - 1;
    for (const id of ["export-file", "add-question", "add-category", "search"]) $(id).disabled = !state.bank;
    for (const id of ["pdf-answers", "pdf-student"]) $(id).disabled = !state.bank || pdfBusy || !state.bank.items().length;
  }

  function snapshot() {
    clearTimeout(state.timer);
    if (!state.bank) return;
    const xml = state.bank.serialize();
    if (state.history[state.historyIndex] !== xml) {
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(xml);
      if (state.history.length > 30) state.history.shift();
      state.historyIndex = state.history.length - 1;
    }
    state.dirty = xml !== state.saved;
    updateStatus();
  }

  function changed() {
    state.dirty = true;
    $("validation").hidden = true;
    updateStatus();
    clearTimeout(state.timer);
    state.timer = setTimeout(snapshot, 450);
    findMatches();
  }

  function mutate(action, focusKey) {
    snapshot();
    const key = action();
    snapshot();
    render();
    if (key || focusKey) focusQuestion(key || focusKey);
  }

  function focusQuestion(key) {
    const card = document.getElementById(key);
    if (!card) return;
    card.scrollIntoView({ block: "start", behavior: "instant" });
    card.querySelector(".question-name")?.focus({ preventScroll: true });
  }

  function updateAnswerMarks(key) {
    const item = state.bank.item(key);
    const card = document.getElementById(key);
    card?.querySelectorAll(".answer").forEach((row, i) => {
      const correct = Number(item.answers[i].fraction) > 0;
      row.classList.toggle("correct", correct);
      row.querySelector("[data-correct]").checked = correct;
      const score = row.querySelector('[data-field="fraction"]');
      if (score !== document.activeElement) score.value = item.answers[i].fraction;
      const comment = row.querySelector('[data-field="answerFeedback"]');
      if (comment && comment !== document.activeElement) {
        if (comment.tagName === "TEXTAREA") comment.value = item.answers[i].feedback;
        else comment.innerHTML = safeHTML(item.answers[i].feedback, "html");
      }
    });
  }

  function settings(item) {
    const detail = element("details", {}, element("summary", {}, "Puntuación y metadatos"));
    const grid = element("div", { class: "settings-grid" });
    grid.append(element("label", { class: "full" }, "Identificador", element("input", { "data-field": "id", value: item.id })));
    const category = element("select", { "data-action": "category", "aria-label": "Categoría" }, element("option", { value: "" }, "Sin categoría"));
    state.bank.categories().forEach(entry => category.append(element("option", { value: entry.key }, entry.name)));
    category.value = item.category?.key || "";
    grid.append(element("label", { class: "full" }, "Categoría", category));
    grid.append(element("label", {}, "Puntuación", element("input", { type: "number", min: "0", step: "any", "data-field": "grade", value: item.grade })));
    grid.append(element("label", {}, "Penalización por intento", element("input", { type: "number", min: "0", max: "1", step: "any", "data-field": "penalty", value: item.penalty })));
    if (item.type === "multichoice") grid.append(element("label", { class: "checkbox-label full" }, element("input", { type: "checkbox", "data-field": "shuffle", checked: item.shuffle }), "Mezclar respuestas"));
    detail.append(grid);
    return detail;
  }

  function answerRow(item, answer, index) {
    const letter = String.fromCharCode(65 + index);
    const single = item.type === "truefalse" || (item.type === "multichoice" && !item.multiple);
    const row = element("div", { class: "answer" + (Number(answer.fraction) > 0 ? " correct" : "") });
    row.append(element("input", { type: single ? "radio" : "checkbox", name: "correct-" + item.key, checked: Number(answer.fraction) > 0,
      "data-correct": index, "aria-label": "Marcar respuesta " + letter + " como correcta" }));
    row.append(element("span", { class: "answer-letter" }, letter));
    const content = element("div", { class: "answer-content" });
    if (item.type === "truefalse") content.append(element("div", { class: "rich-edit" }, answer.value === "true" ? "Verdadero" : answer.value === "false" ? "Falso" : answer.value));
    else content.append(field(item, "answer", answer.value, answer.format, index, ["shortanswer", "numerical"].includes(item.type)));
    const detail = element("details", { class: "answer-extra" }, element("summary", {}, "Comentario"));
    detail.append(field(item, "answerFeedback", answer.feedback, "html", index));
    if (item.type === "numerical") detail.append(element("label", { class: "field-label" }, "Tolerancia", element("input", { type: "number", min: "0", step: "any", "data-field": "tolerance", "data-index": index, value: answer.tolerance })));
    content.append(detail);
    row.append(content);
    row.append(element("label", { class: "fraction" }, element("input", { type: "number", min: "-100", max: "100", step: "any", value: answer.fraction,
      "data-field": "fraction", "data-index": index, "aria-label": "Porcentaje de la respuesta " + letter }), "%"));
    row.append(item.type === "truefalse" ? element("span") : iconButton("xmark", "Eliminar respuesta " + letter, "remove-answer", { "data-index": index }));
    return row;
  }

  function questionCard(item, index) {
    const card = element("article", { class: "question", id: item.key, "data-qkey": item.key });
    const name = element("input", { class: "question-name", "data-field": "name", value: item.name, "aria-label": "Nombre de la pregunta" });
    const description = element("div", { class: "question-description" },
      element("span", { class: "type-label" }, typeNames[item.type] || item.type),
      element("span", {}, item.multiple ? "Respuesta múltiple" : item.type === "multichoice" ? "Respuesta única" : ""),
      element("span", { class: "question-id" }, item.id));
    card.append(element("header", { class: "question-header" }, element("span", { class: "question-number" }, String(index + 1).padStart(3, "0")),
      element("div", { class: "question-heading" }, name, description),
      element("div", { class: "question-actions" }, iconButton("arrow-up", "Subir pregunta", "up"), iconButton("arrow-down", "Bajar pregunta", "down"),
        iconButton("copy", "Duplicar pregunta", "duplicate"), iconButton("trash-can", "Eliminar pregunta", "delete", { class: "icon-button delete" }))));
    const content = element("div", { class: "question-content" });
    const label = element("div", { class: "field-label" }, "Enunciado");
    if (state.mode === "visual") label.append(iconButton("file-code", "Añadir bloque de código", "insert-code"));
    content.append(label, field(item, "body", item.body, item.bodyFormat));
    if (item.type === "matching") {
      const pairs = element("div", { class: "answers" }, element("div", { class: "field-label" }, "Correspondencias"));
      item.pairs.forEach((pair, i) => pairs.append(element("div", { class: "pair-row" },
        field(item, "pairQuestion", pair.question, pair.format, i), icon("arrow-right"),
        field(item, "pairAnswer", pair.answer, "plain_text", i, true), iconButton("xmark", "Eliminar correspondencia", "remove-pair", { "data-index": i }))));
      pairs.append(element("button", { class: "add-answer", type: "button", "data-action": "add-pair" }, icon("plus"), "Correspondencia"));
      content.append(pairs);
    } else if (item.supported) {
      const answers = element("div", { class: "answers" }, element("div", { class: "field-label" }, "Respuestas"));
      item.answers.forEach((answer, i) => answers.append(answerRow(item, answer, i)));
      if (item.type !== "truefalse") answers.append(element("button", { type: "button", class: "add-answer", "data-action": "add-answer" }, icon("plus"), "Respuesta"));
      content.append(answers);
    } else {
      content.append(element("div", { class: "type-notice" }, "Tipo especializado: " + item.type + ". Contenido específico conservado."));
      if (item.answers.length) {
        const answers = element("div", { class: "answers" }, element("div", { class: "field-label" }, "Respuestas conservadas"));
        item.answers.forEach((answer, index) => {
          const preview = element("div", { class: "rich-edit" });
          preview.innerHTML = safeHTML(answer.value, answer.format);
          answers.append(element("div", { class: "answer" + (Number(answer.fraction) > 0 ? " correct" : "") },
            element("input", { type: "checkbox", disabled: true, checked: Number(answer.fraction) > 0, "aria-label": "Respuesta con puntuación positiva" }),
            element("span", { class: "answer-letter" }, String.fromCharCode(65 + index)), preview,
            element("span", { class: "fraction" }, answer.fraction + " %"), element("span")));
        });
        content.append(answers);
      }
    }
    const feedback = element("details", {}, element("summary", {}, "Explicación general"), field(item, "feedback", item.feedback, item.feedbackFormat));
    content.append(feedback, settings(item));
    card.append(content);
    return card;
  }

  function render() {
    preserved.clear();
    const container = $("questions");
    container.replaceChildren();
    $("category-list").replaceChildren();
    const items = state.bank?.items() || [];
    $("total-count").textContent = items.length;
    $("empty-state").hidden = !!state.bank;
    let current = undefined;
    items.forEach((item, index) => {
      const categoryKey = item.category?.key || "uncategorized";
      if (categoryKey !== current) {
        const count = items.filter(entry => entry.category?.key === item.category?.key).length;
        const title = item.category?.name.split("/").filter(Boolean).at(-1) || "Sin categoría";
        const id = "category-" + categoryKey;
        container.append(element("section", { class: "category-heading", id }, element("h2", {}, title), element("span", {}, count + " preguntas")));
        $("category-list").append(element("a", { class: "category-link", href: "#" + id, title: item.category?.name || "Sin categoría" }, element("span", {}, title), element("small", {}, count)));
        current = categoryKey;
      }
      container.append(questionCard(item, index));
    });
    if (state.bank && !items.length) container.append(element("p", {}, "El banco no contiene preguntas."));
    updateStatus();
    findMatches();
  }

  function findMatches() {
    const query = normalize($("search").value.trim());
    state.matches = [];
    for (const item of state.bank?.items() || []) {
      const template = document.createElement("template");
      template.innerHTML = item.body + item.answers.map(answer => answer.value).join(" ")
        + item.pairs.map(pair => pair.question + " " + pair.answer).join(" ") + item.feedback;
      const match = !!query && normalize(item.name + " " + item.id + " " + template.content.textContent).includes(query);
      const card = document.getElementById(item.key);
      card?.classList.toggle("match", match);
      card?.classList.remove("current-match");
      if (match) state.matches.push(item.key);
    }
    if (state.matchIndex >= state.matches.length) state.matchIndex = -1;
    $("search-count").textContent = query ? state.matches.length + " coincidencias" : "";
    $("previous-match").disabled = $("next-match").disabled = !state.matches.length;
  }

  function nextMatch(direction) {
    if (!state.matches.length) return;
    document.querySelectorAll(".current-match").forEach(card => card.classList.remove("current-match"));
    state.matchIndex = (state.matchIndex + direction + state.matches.length) % state.matches.length;
    const card = document.getElementById(state.matches[state.matchIndex]);
    card.classList.add("current-match");
    card.scrollIntoView({ block: "start", behavior: "instant" });
    $("search-count").textContent = `${state.matchIndex + 1}/${state.matches.length}`;
  }

  function confirmAction(title, message, accept = "Eliminar") {
    const dialog = $("confirm-dialog");
    $("confirm-title").textContent = title;
    $("confirm-message").textContent = message;
    $("confirm-accept").textContent = accept;
    dialog.returnValue = "cancel";
    dialog.showModal();
    return new Promise(resolve => dialog.addEventListener("close", () => resolve(dialog.returnValue === "confirm"), { once: true }));
  }

  function load(bank, filename) {
    clearTimeout(state.timer);
    state.bank = bank;
    state.filename = filename;
    state.saved = bank.serialize();
    state.history = [state.saved];
    state.historyIndex = 0;
    state.dirty = false;
    state.matchIndex = -1;
    $("search").value = "";
    $("validation").hidden = true;
    const unsupported = bank.items().filter(item => !item.supported).length;
    notice(unsupported ? `${unsupported} preguntas de tipos especializados se conservarán en la exportación.` : "");
    render();
    window.scrollTo(0, 0);
  }

  async function loadFile(file) {
    try {
      const source = new TextDecoder("utf-8", { fatal: true }).decode(await file.arrayBuffer());
      const bank = window.MoodleXml.Bank.parse(source);
      if (state.dirty && !await confirmAction("Cambiar de archivo", "Hay cambios sin exportar. ¿Quieres descartarlos?", "Descartar y abrir")) return;
      load(bank, file.name);
    } catch (error) { notice(error instanceof TypeError ? "El archivo no tiene una codificación UTF-8 válida." : error.message); }
  }

  function validForExport() {
    const issues = state.bank.validate();
    document.querySelectorAll(".invalid").forEach(card => card.classList.remove("invalid"));
    if (issues.length) {
      const panel = $("validation");
      panel.replaceChildren(element("strong", {}, "Revisa los datos antes de exportar"));
      issues.forEach(issue => {
        document.getElementById(issue.key)?.classList.add("invalid");
        const button = element("button", { type: "button" }, state.bank.item(issue.key).name + ": " + issue.message);
        button.addEventListener("click", () => focusQuestion(issue.key));
        panel.append(button);
      });
      panel.hidden = false;
      panel.scrollIntoView({ block: "start" });
      return false;
    }
    $("validation").hidden = true;
    return true;
  }

  async function exportPdf(includeAnswers) {
    if (!state.bank || pdfBusy) return;
    snapshot();
    if (!validForExport()) return;
    const bank = window.MoodleXml.Bank.parse(state.bank.serialize());
    const filename = state.filename;
    pdfBusy = true;
    updateStatus();
    notice("Generando PDF…");
    try {
      await new Promise(resolve => setTimeout(resolve, 30));
      const blob = await window.MoodlePdf.blob(bank.items(), filename, includeAnswers);
      const url = URL.createObjectURL(blob);
      const suffix = includeAnswers ? "con-respuestas" : "sin-respuestas";
      const anchor = element("a", { href: url, download: filename.replace(/\.xml$/i, "") + "-" + suffix + ".pdf" });
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      notice("PDF " + (includeAnswers ? "con respuestas" : "sin respuestas") + " descargado.");
    } catch (error) { notice("No se pudo generar el PDF: " + error.message); }
    finally { pdfBusy = false; updateStatus(); }
  }

  function exportFile() {
    if (!state.bank) return;
    snapshot();
    if (!validForExport()) return;
    const xml = state.bank.serialize();
    const url = URL.createObjectURL(new Blob([xml], { type: "application/xml;charset=utf-8" }));
    const anchor = element("a", { href: url, download: state.filename.replace(/\.xml$/i, "") + "-editado.xml" });
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    state.saved = xml;
    state.dirty = false;
    updateStatus();
    notice("XML exportado.");
  }

  function insertText(target, value) {
    const selection = window.getSelection();
    if (!selection.rangeCount || !target.contains(selection.anchorNode)) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const text = document.createTextNode(value);
    range.insertNode(text);
    range.setStartAfter(text);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    target.dispatchEvent(new Event("input", { bubbles: true }));
  }

  $("questions").addEventListener("input", event => {
    const target = event.target.closest("[data-field]");
    const card = target?.closest("[data-qkey]");
    if (!card) return;
    const value = target.matches('[contenteditable="true"]') ? editorHTML(target) : target.type === "checkbox" ? target.checked : target.value;
    state.bank.update(card.dataset.qkey, target.dataset.field, value, target.dataset.index === undefined ? undefined : Number(target.dataset.index));
    if (target.dataset.field === "fraction") updateAnswerMarks(card.dataset.qkey);
    if (target.dataset.field === "id") card.querySelector(".question-id").textContent = value;
    changed();
  });

  $("questions").addEventListener("change", event => {
    const card = event.target.closest("[data-qkey]");
    if (!card) return;
    if (event.target.hasAttribute("data-correct")) {
      state.bank.setCorrect(card.dataset.qkey, Number(event.target.dataset.correct), event.target.checked);
      updateAnswerMarks(card.dataset.qkey);
      changed();
      notice("Respuesta actualizada. Revisa la explicación general y los comentarios personalizados.");
    } else if (event.target.dataset.action === "category") mutate(() => state.bank.changeCategory(card.dataset.qkey, event.target.value || null), card.dataset.qkey);
  });

  $("questions").addEventListener("click", async event => {
    if (event.target.closest(".rich-edit a")) event.preventDefault();
    const button = event.target.closest("[data-action]");
    const card = button?.closest("[data-qkey]");
    if (!card || button.tagName !== "BUTTON") return;
    const key = card.dataset.qkey;
    const action = button.dataset.action;
    const index = Number(button.dataset.index);
    try {
      if (action === "delete") {
        if (await confirmAction("Eliminar pregunta", state.bank.item(key).name)) mutate(() => state.bank.remove(key));
      } else if (action === "duplicate") mutate(() => state.bank.duplicate(key));
      else if (action === "up" || action === "down") mutate(() => state.bank.move(key, action === "up" ? -1 : 1), key);
      else if (action === "add-answer") mutate(() => state.bank.addAnswer(key));
      else if (action === "remove-answer") mutate(() => state.bank.removeAnswer(key, index));
      else if (action === "add-pair") mutate(() => state.bank.addPair(key));
      else if (action === "remove-pair") mutate(() => state.bank.removePair(key, index));
      else if (action === "insert-code") {
        const target = card.querySelector('[contenteditable="true"][data-field="body"]');
        const code = element("code", {}, "// Código Java");
        target.append(element("pre", {}, code));
        target.focus();
        const range = document.createRange();
        range.selectNodeContents(code);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        target.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } catch (error) { notice(error.message); }
  });

  $("questions").addEventListener("paste", event => {
    const target = event.target.closest('[contenteditable="true"]');
    if (!target) return;
    event.preventDefault();
    insertText(target, event.clipboardData.getData("text/plain"));
  });
  $("questions").addEventListener("keydown", event => {
    const target = event.target.closest('[contenteditable="true"]');
    if (!target) return;
    const selection = window.getSelection();
    const node = selection.anchorNode?.nodeType === Node.ELEMENT_NODE ? selection.anchorNode : selection.anchorNode?.parentElement;
    if (node?.closest("pre") && (event.key === "Enter" || event.key === "Tab")) {
      event.preventDefault();
      insertText(target, event.key === "Enter" ? "\n" : "    ");
    }
  });

  for (const id of ["open-file", "empty-open"]) $(id).addEventListener("click", () => $("file-input").click());
  $("file-input").addEventListener("change", async event => { if (event.target.files[0]) await loadFile(event.target.files[0]); event.target.value = ""; });
  $("new-bank").addEventListener("click", async () => {
    if (state.dirty && !await confirmAction("Nuevo banco", "Hay cambios sin exportar. ¿Quieres descartarlos?", "Descartar")) return;
    load(window.MoodleXml.Bank.parse("<quiz/>"), "banco-preguntas.xml");
  });
  $("export-file").addEventListener("click", exportFile);
  $("pdf-answers").addEventListener("click", () => exportPdf(true));
  $("pdf-student").addEventListener("click", () => exportPdf(false));
  $("add-question").addEventListener("click", () => mutate(() => state.bank.addQuestion(state.bank.categories().at(-1)?.key || null)));
  $("search").addEventListener("input", () => { state.matchIndex = -1; findMatches(); });
  $("search").addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); nextMatch(event.shiftKey ? -1 : 1); } });
  $("previous-match").addEventListener("click", () => nextMatch(-1));
  $("next-match").addEventListener("click", () => nextMatch(1));
  for (const mode of ["visual", "html"]) $(mode + "-mode").addEventListener("click", () => {
    snapshot();
    state.mode = mode;
    for (const id of ["visual", "html"]) $(id + "-mode").setAttribute("aria-pressed", String(id === mode));
    render();
  });
  for (const [id, delta] of [["undo", -1], ["redo", 1]]) $(id).addEventListener("click", () => {
    snapshot();
    const next = state.historyIndex + delta;
    if (next < 0 || next >= state.history.length) return;
    state.historyIndex = next;
    state.bank = window.MoodleXml.Bank.parse(state.history[next]);
    state.dirty = state.history[next] !== state.saved;
    render();
  });
  $("add-category").addEventListener("click", () => {
    $("category-name").value = "$module$/top/";
    $("category-dialog").showModal();
    $("category-name").focus();
  });
  $("cancel-category").addEventListener("click", () => $("category-dialog").close());
  $("category-form").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("category-name").value.trim();
    if (!name) return;
    mutate(() => { state.bank.addCategory(name); });
    $("category-dialog").close();
    notice("Categoría creada: " + name);
  });
  document.addEventListener("dragover", event => { if (event.dataTransfer.types.includes("Files")) event.preventDefault(); });
  document.addEventListener("drop", event => {
    if (!event.dataTransfer.files.length) return;
    event.preventDefault();
    loadFile(event.dataTransfer.files[0]);
  });
  window.addEventListener("beforeunload", event => { if (state.dirty) { event.preventDefault(); event.returnValue = ""; } });
  const dimensions = new ResizeObserver(() => {
    document.documentElement.style.setProperty("--toolbar-height", ($("open-file").closest("header").offsetHeight + document.querySelector(".toolbar").offsetHeight) + "px");
  });
  dimensions.observe(document.querySelector(".app-header"));
  dimensions.observe(document.querySelector(".toolbar"));
  updateStatus();
}());
