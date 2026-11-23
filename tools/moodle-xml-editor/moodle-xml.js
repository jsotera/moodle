(function () {
  "use strict";

  const supported = new Set(["multichoice", "truefalse", "shortanswer", "numerical", "matching"]);
  const child = (node, name) => Array.from(node.children).find(element => element.tagName === name) || null;
  const children = (node, name) => Array.from(node.children).filter(element => element.tagName === name);
  const text = (node, name, fallback = "") => child(node, name)?.textContent ?? fallback;
  const fieldText = (node, name) => text(child(node, name) || node, "text");
  const boolean = value => value === "true" || value === "1";

  function ensure(node, name) {
    let element = child(node, name);
    if (!element) {
      element = node.ownerDocument.createElement(name);
      node.appendChild(element);
    }
    return element;
  }

  function setText(node, name, value) {
    ensure(node, name).textContent = String(value);
  }

  function setCDATA(node, value) {
    node.replaceChildren();
    const parts = String(value).split("]]>");
    parts.forEach((part, index) => {
      const segment = (index ? ">" : "") + part + (index < parts.length - 1 ? "]]" : "");
      node.appendChild(node.ownerDocument.createCDATASection(segment));
    });
  }

  function setHTML(node, name, value) {
    const field = name ? ensure(node, name) : node;
    field.setAttribute("format", "html");
    setCDATA(ensure(field, "text"), value);
  }

  function freshId(prefix = "PREGUNTA") {
    const suffix = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}-${suffix}`;
  }

  class Bank {
    constructor(document) {
      this.document = document;
      this.root = document.documentElement;
      this.keys = new WeakMap();
      this.sequence = 0;
    }

    static parse(source) {
      if (/<!DOCTYPE/i.test(source)) throw new Error("El XML no puede contener una declaración DOCTYPE.");
      const document = new DOMParser().parseFromString(source.replace(/^\uFEFF/, ""), "application/xml");
      if (document.querySelector("parsererror")) throw new Error("El XML no está bien formado. Comprueba que el archivo está completo.");
      if (document.documentElement.tagName !== "quiz") throw new Error("El archivo no es un banco Moodle XML: falta el elemento quiz.");
      return new Bank(document);
    }

    key(node) {
      if (!this.keys.has(node)) this.keys.set(node, `item-${++this.sequence}`);
      return this.keys.get(node);
    }

    categories() {
      return children(this.root, "question").filter(node => node.getAttribute("type") === "category")
        .map(node => ({ node, key: this.key(node), name: fieldText(node, "category") }));
    }

    items() {
      let category = null;
      return children(this.root, "question").flatMap(node => {
        if (node.getAttribute("type") === "category") {
          category = { key: this.key(node), name: fieldText(node, "category"), node };
          return [];
        }
        const type = node.getAttribute("type");
        const answers = children(node, "answer").map(answer => ({
          node: answer, value: text(answer, "text"), format: answer.getAttribute("format") || "html",
          fraction: answer.getAttribute("fraction") ?? "0", feedback: fieldText(answer, "feedback"),
          tolerance: text(answer, "tolerance", "0"),
        }));
        return [{
          node, key: this.key(node), category, type, supported: supported.has(type),
          name: fieldText(node, "name"), id: text(node, "idnumber"),
          body: fieldText(node, "questiontext"), bodyFormat: child(node, "questiontext")?.getAttribute("format") || "html",
          feedback: fieldText(node, "generalfeedback"),
          feedbackFormat: child(node, "generalfeedback")?.getAttribute("format") || "html",
          grade: text(node, "defaultgrade", "1"), penalty: text(node, "penalty", "0"),
          shuffle: boolean(text(node, "shuffleanswers", "true")),
          multiple: type === "multichoice" && !boolean(text(node, "single", "true")),
          answers,
          pairs: children(node, "subquestion").map(pair => ({
            node: pair, question: text(pair, "text"), answer: fieldText(pair, "answer"),
            format: pair.getAttribute("format") || "html",
          })),
        }];
      });
    }

    item(key) {
      const item = this.items().find(entry => entry.key === key);
      if (!item) throw new Error("La pregunta ya no existe.");
      return item;
    }

    update(key, field, value, index) {
      const item = this.item(key);
      switch (field) {
        case "name": setText(ensure(item.node, "name"), "text", value); break;
        case "id": setText(item.node, "idnumber", value); break;
        case "body": setHTML(item.node, "questiontext", value); break;
        case "feedback": setHTML(item.node, "generalfeedback", value); break;
        case "grade": setText(item.node, "defaultgrade", value); break;
        case "penalty": setText(item.node, "penalty", value); break;
        case "shuffle": setText(item.node, "shuffleanswers", value ? "true" : "false"); break;
        case "answer":
          if (["numerical", "shortanswer"].includes(item.type)) setCDATA(ensure(item.answers[index].node, "text"), value);
          else setHTML(item.answers[index].node, null, value);
          break;
        case "fraction": item.answers[index].node.setAttribute("fraction", String(value)); break;
        case "answerFeedback": setHTML(item.answers[index].node, "feedback", value); break;
        case "tolerance": setText(item.answers[index].node, "tolerance", value); break;
        case "pairQuestion": setHTML(item.pairs[index].node, null, value); break;
        case "pairAnswer": setText(ensure(item.pairs[index].node, "answer"), "text", value); break;
        default: throw new Error("Campo no reconocido: " + field);
      }
    }

    setCorrect(key, index, checked = true) {
      const item = this.item(key);
      if (item.type !== "multichoice" && item.type !== "truefalse") {
        item.answers[index].node.setAttribute("fraction", checked ? "100" : "0");
        return;
      }
      if (item.multiple) {
        item.answers[index].node.setAttribute("fraction", checked ? "100" : "0");
        return;
      }
      const previous = Number(item.answers[index].fraction);
      const wrong = previous <= 0 ? item.answers[index].fraction : (item.answers.find(a => Number(a.fraction) <= 0)?.fraction || "0");
      item.answers.forEach((answer, i) => {
        if (i === index) answer.node.setAttribute("fraction", "100");
        else if (Number(answer.fraction) > 0) answer.node.setAttribute("fraction", wrong);
        const stock = new Set(["<p>Correcto.</p>", "<p>Revisa el recorrido del código y la explicación.</p>"]);
        if (stock.has(answer.feedback)) setHTML(answer.node, "feedback", i === index
          ? "<p>Correcto.</p>" : "<p>Revisa el recorrido del código y la explicación.</p>");
      });
    }

    addAnswer(key) {
      const item = this.item(key);
      const answer = this.document.createElement("answer");
      answer.setAttribute("fraction", item.answers.find(a => Number(a.fraction) <= 0)?.fraction || "-33.33333");
      if (["numerical", "shortanswer"].includes(item.type)) setText(answer, "text", item.type === "numerical" ? "0" : "Nueva respuesta");
      else setHTML(answer, null, "<p>Nueva respuesta</p>");
      setHTML(answer, "feedback", "");
      if (item.type === "numerical") setText(answer, "tolerance", "0");
      item.node.appendChild(answer);
    }

    removeAnswer(key, index) { this.item(key).answers[index].node.remove(); }

    addPair(key) {
      const node = this.document.createElement("subquestion");
      setHTML(node, null, "<p>Nuevo elemento</p>");
      setText(ensure(node, "answer"), "text", "Correspondencia");
      this.item(key).node.appendChild(node);
    }

    removePair(key, index) { this.item(key).pairs[index].node.remove(); }

    addCategory(name) {
      const existing = this.categories().find(category => category.name === name);
      if (existing) return existing.key;
      const node = this.document.createElement("question");
      node.setAttribute("type", "category");
      setText(ensure(node, "category"), "text", name);
      this.root.appendChild(node);
      return this.key(node);
    }

    placeInCategory(node, categoryKey) {
      const category = this.categories().find(entry => entry.key === categoryKey);
      if (!category) {
        const firstCategory = this.categories()[0]?.node;
        this.root.insertBefore(node, firstCategory || null);
        return;
      }
      let next = category.node.nextElementSibling;
      while (next && !(next.tagName === "question" && next.getAttribute("type") === "category")) next = next.nextElementSibling;
      this.root.insertBefore(node, next);
    }

    changeCategory(key, categoryKey) { this.placeInCategory(this.item(key).node, categoryKey); }

    addQuestion(categoryKey = null) {
      const node = this.document.createElement("question");
      node.setAttribute("type", "multichoice");
      setText(ensure(node, "name"), "text", "Nueva pregunta");
      setHTML(node, "questiontext", "<p>Escribe el enunciado.</p>");
      setHTML(node, "generalfeedback", "");
      for (const [tag, value] of Object.entries({
        defaultgrade: "0.5000000", penalty: "0.3333333", hidden: "0", idnumber: freshId(),
        single: "true", shuffleanswers: "true", answernumbering: "abc", showstandardinstruction: "1",
      })) setText(node, tag, value);
      for (let i = 0; i < 4; i++) {
        const answer = this.document.createElement("answer");
        answer.setAttribute("fraction", i === 0 ? "100" : "-33.33333");
        setHTML(answer, null, `<p>Respuesta ${String.fromCharCode(65 + i)}</p>`);
        setHTML(answer, "feedback", "");
        node.appendChild(answer);
      }
      this.placeInCategory(node, categoryKey);
      return this.key(node);
    }

    duplicate(key) {
      const item = this.item(key);
      const node = item.node.cloneNode(true);
      setText(ensure(node, "name"), "text", item.name + " (copia)");
      setText(node, "idnumber", freshId(item.id ? item.id + "-COPIA" : "COPIA"));
      item.node.after(node);
      return this.key(node);
    }

    remove(key) { this.item(key).node.remove(); }

    move(key, direction) {
      const item = this.item(key);
      const siblings = this.items().filter(entry => entry.category?.key === item.category?.key);
      const index = siblings.findIndex(entry => entry.key === key);
      const other = siblings[index + direction];
      if (!other) return;
      if (direction < 0) this.root.insertBefore(item.node, other.node);
      else this.root.insertBefore(other.node, item.node);
    }

    validate() {
      const issues = [];
      const identifiers = new Map();
      for (const item of this.items()) {
        const problem = message => issues.push({ key: item.key, message });
        if (!item.name.trim()) problem("Falta el nombre de la pregunta.");
        if (item.id.trim()) {
          if (identifiers.has(item.id)) problem("Identificador repetido: " + item.id);
          identifiers.set(item.id, item.key);
        }
        if (!item.body.trim()) problem("El enunciado está vacío.");
        if (item.supported && (!Number.isFinite(Number(item.grade)) || Number(item.grade) <= 0)) problem("La puntuación debe ser mayor que cero.");
        if (!item.penalty.trim() || !Number.isFinite(Number(item.penalty)) || Number(item.penalty) < 0 || Number(item.penalty) > 1) problem("La penalización debe estar entre 0 y 1.");
        if (["multichoice", "truefalse", "shortanswer", "numerical"].includes(item.type)) {
          if (item.answers.length < 2 && ["multichoice", "truefalse"].includes(item.type)) problem("Se necesitan al menos dos respuestas.");
          if (!item.answers.length) problem("Faltan las respuestas.");
          item.answers.forEach(answer => {
            const fraction = Number(answer.fraction);
            if (!answer.fraction.trim() || !Number.isFinite(fraction) || fraction < -100 || fraction > 100) problem("Un porcentaje no está entre -100 y 100.");
            if (!answer.value.trim()) problem("Hay una respuesta vacía.");
            if (item.type === "numerical" && (!answer.tolerance.trim() || !Number.isFinite(Number(answer.tolerance)) || Number(answer.tolerance) < 0)) problem("La tolerancia no es válida.");
          });
          if (item.multiple) {
            const sum = item.answers.reduce((total, answer) => total + Math.max(0, Number(answer.fraction)), 0);
            if (Math.abs(sum - 100) > 0.001) problem("Los porcentajes positivos deben sumar 100 %.");
          } else if (["multichoice", "truefalse"].includes(item.type)) {
            if (item.answers.filter(answer => Number(answer.fraction) === 100).length !== 1
              || item.answers.some(answer => Number(answer.fraction) > 0 && Number(answer.fraction) !== 100)) problem("Debe haber una única respuesta al 100 % y las demás no pueden tener puntuación positiva.");
          } else if (!item.answers.some(answer => Number(answer.fraction) === 100)) problem("Debe existir al menos una respuesta al 100 %.");
        }
        if (item.type === "matching") {
          if (item.pairs.length < 2) problem("Se necesitan al menos dos correspondencias.");
          if (item.pairs.some(pair => !pair.answer.trim())) problem("Hay una correspondencia vacía.");
        }
      }
      return issues;
    }

    serialize() {
      const serializer = new XMLSerializer();
      const content = Array.from(this.document.childNodes)
        .filter(node => !(node.nodeType === 7 && node.target.toLowerCase() === "xml"))
        .map(node => serializer.serializeToString(node)).join("");
      return '<?xml version="1.0" encoding="UTF-8"?>\n' + content;
    }
  }

  window.MoodleXml = { Bank, supported };
}());
