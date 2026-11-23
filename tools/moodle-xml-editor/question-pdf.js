(function () {
  "use strict";

  // Template contents stay inert: imported HTML cannot execute or fetch resources.
  function htmlBlocks(source, format = "html") {
    if (format !== "html" && !(format === "moodle_auto_format" && /<\/?[a-z]/i.test(source))) {
      return [{ text: source || " ", margin: [0, 0, 0, 5] }];
    }
    const template = document.createElement("template");
    template.innerHTML = source;
    template.content.querySelectorAll("script,style,iframe,object,embed,svg,math,template").forEach(node => node.remove());
    const blocks = [];
    let buffer = "";
    function flush() {
      const value = buffer.replace(/\s+/g, " ").trim();
      if (value) blocks.push({ text: value, margin: [0, 0, 0, 5] });
      buffer = "";
    }
    function visit(node) {
      if (node.nodeType === Node.TEXT_NODE) { buffer += node.textContent; return; }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName;
      if (tag === "PRE") {
        flush();
        blocks.push({ text: node.textContent.replace(/\t/g, "    ") || " ", style: "code", preserveLeadingSpaces: true });
        return;
      }
      if (tag === "IMG") { buffer += " [Imagen no incluida] "; return; }
      if (tag === "BR") { flush(); return; }
      const boundary = /^(P|DIV|H[1-6]|UL|OL|LI|TABLE|TR|BLOCKQUOTE|SECTION|ARTICLE|HR)$/.test(tag);
      if (boundary) flush();
      if (tag === "LI") buffer += "• ";
      for (const child of node.childNodes) visit(child);
      if (tag === "TD" || tag === "TH") buffer += " | ";
      if (boundary) flush();
    }
    for (const child of template.content.childNodes) visit(child);
    flush();
    return blocks.length ? blocks : [{ text: " " }];
  }

  const categoryName = item => item.category?.name.split("/").filter(Boolean).at(-1) || "Sin categoría";
  const label = index => String.fromCharCode(65 + index) + ")";

  function estimatedHeight(nodes) {
    return nodes.reduce((height, node) => {
      let value = 0;
      if (typeof node.text === "string") {
        value = node.text.split("\n").reduce((lines, line) => lines + Math.max(1, Math.ceil(line.length / 65)), 0) * 14;
      } else if (node.stack) value = estimatedHeight(node.stack);
      else if (node.table) value = node.table.body.reduce((sum, row) => sum + Math.max(...row.map(cell => estimatedHeight([cell]))) + 10, 0);
      else if (node.canvas) value = 5;
      return height + value + (node.margin?.[1] || 0) + (node.margin?.[3] || 0);
    }, 0);
  }

  function definition(items, filename, includeAnswers) {
    if (!items.length) throw new Error("El banco no contiene preguntas.");
    const unsupported = items.find(item => !["multichoice", "truefalse", "shortanswer", "numerical", "matching"].includes(item.type));
    if (unsupported) throw new Error("No se puede generar el PDF del tipo " + unsupported.type + ": " + unsupported.name + ".");
    const title = filename.replace(/\.xml$/i, "");
    const content = [
      { text: title, style: "title" },
      { text: (includeAnswers ? "REVISIÓN CON RESPUESTAS" : "CUESTIONARIO SIN RESPUESTAS") + " · " + items.length + " preguntas", margin: [0, 0, 0, 12] },
    ];
    let currentCategory = null;
    items.forEach((item, index) => {
      const category = categoryName(item);
      const categoryPath = item.category?.name || "";
      if (categoryPath !== currentCategory) {
        content.push({ text: category, style: "category", ...(currentCategory === null ? {} : { pageBreak: "before" }) });
        currentCategory = categoryPath;
      }
      const start = content.length;
      content.push({ text: `${String(index + 1).padStart(3, "0")}. ${item.id || item.name}`, style: "question", headlineLevel: 2 });
      content.push(...htmlBlocks(item.body, item.bodyFormat));
      if (item.type === "matching") {
        const choices = item.pairs.map(pair => pair.answer).sort((a, b) => a.localeCompare(b));
        const pairs = item.pairs.filter(pair => pair.question.trim());
        pairs.forEach((pair, pairIndex) => {
          content.push({ text: String(pairIndex + 1) + ".", bold: true, margin: [0, 5, 0, 2] });
          content.push(...htmlBlocks(pair.question, pair.format));
          content.push({ text: includeAnswers ? "Respuesta: " + pair.answer : "Respuesta: ____________________", margin: [0, 0, 0, 5] });
        });
        if (!includeAnswers) {
          content.push({ text: "Opciones", bold: true, margin: [0, 5, 0, 4] });
          choices.forEach((choice, i) => content.push({ text: label(i) + " " + choice, margin: [0, 0, 0, 4] }));
        }
      } else if (!includeAnswers && ["shortanswer", "numerical"].includes(item.type)) {
        content.push({ text: "Respuesta: ________________________________________", margin: [0, 8, 0, 12] });
      } else {
        const rows = item.answers.map((answer, i) => {
          const correct = includeAnswers && Number(answer.fraction) > 0;
          const text = item.type === "truefalse" ? (answer.value === "true" ? "Verdadero" : "Falso") : answer.value;
          const fields = [
            { text: label(i), color: "#47515b" },
            { stack: htmlBlocks(text, ["shortanswer", "numerical"].includes(item.type) ? "plain_text" : answer.format)
              .map(block => ({ ...block, margin: [0, 0, 0, 1] })) },
          ];
          if (includeAnswers) fields.push({ text: correct ? "CORRECTA" : "", fontSize: 8, bold: true, color: "#18714a" });
          if (correct) fields.forEach(cell => { cell.fillColor = "#e7f3eb"; });
          return fields;
        });
        if (rows.length) content.push({
          table: { widths: includeAnswers ? [19, "*", 58] : [19, "*"], body: rows },
          layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingTop: () => 5, paddingBottom: () => 3 },
          margin: [0, 4, 0, 8],
        });
      }
      if (includeAnswers && item.feedback.trim()) {
        content.push({ text: "Explicación", bold: true, fontSize: 9, margin: [0, 5, 0, 4] });
        content.push(...htmlBlocks(item.feedback, item.feedbackFormat));
      }
      content.push({ canvas: [{ type: "line", x1: 0, x2: 499, y1: 0, y2: 0, lineWidth: 0.4, lineColor: "#c9ced2" }], margin: [0, 10, 0, 14] });
      const question = content.splice(start);
      // Keep ordinary questions together; allow unusually long ones to span pages.
      content.push({ stack: question, unbreakable: estimatedHeight(question) < 620 });
    });
    return {
      info: { title, subject: includeAnswers ? "Cuestionario con respuestas" : "Cuestionario sin respuestas", creator: "Editor Moodle XML" },
      pageSize: "A4", pageMargins: [48, 48, 48, 44],
      defaultStyle: { font: "Roboto", fontSize: 10, color: "#20262a", lineHeight: 1.2 },
      styles: {
        title: { fontSize: 17, bold: true, margin: [0, 0, 0, 8] },
        category: { fontSize: 12, bold: true, margin: [0, 4, 0, 12] },
        question: { fontSize: 10, bold: true, margin: [0, 4, 0, 7] },
        code: { font: "Mono", fontSize: 8.2, lineHeight: 1.2, margin: [0, 3, 0, 8] },
      },
      footer: (page, pages) => ({ text: `${includeAnswers ? "CON RESPUESTAS" : "SIN RESPUESTAS"} · ${page} / ${pages}`, alignment: "right", fontSize: 8, color: "#5b666c", margin: [48, 12, 48, 0] }),
      pageBreakBefore: (node, following) => node.headlineLevel === 2 && following.length === 0,
      content,
    };
  }

  function blob(items, filename, includeAnswers) {
    if (!window.pdfMake) throw new Error("No se ha podido cargar la librería PDF local.");
    const fonts = {
      Roboto: { normal: "Roboto-Regular.ttf", bold: "Roboto-Medium.ttf", italics: "Roboto-Italic.ttf", bolditalics: "Roboto-MediumItalic.ttf" },
      Mono: { normal: "RobotoMono.woff", bold: "RobotoMono.woff", italics: "RobotoMono.woff", bolditalics: "RobotoMono.woff" },
    };
    const vfs = { ...window.vfs, ...window.MoodlePdfFonts };
    const pdf = window.pdfMake.createPdf(definition(items, filename, includeAnswers), undefined, fonts, vfs);
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("La generación del PDF ha tardado demasiado. Prueba con un banco más pequeño.")), 120000);
      try {
        pdf.getBlob(result => { clearTimeout(timeout); resolve(result); });
      } catch (error) { clearTimeout(timeout); reject(error); }
    });
  }

  window.MoodlePdf = { htmlBlocks, definition, blob };
}());
