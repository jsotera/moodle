(function () {
  const pages = window.COURSE_PAGES || [];
  const units = window.COURSE_UNITS || [];
  const currentId = document.body.dataset.pageId || "home";
  const currentUnit = units.find((unit) => unit.theoryId === currentId || unit.practiceId === currentId);
  const currentKind = currentUnit && currentUnit.theoryId === currentId ? "teoria" : currentUnit ? "ejercicios" : "home";
  const currentPage = currentId === "home"
    ? pages.find((page) => page.id === "home")
    : {
        id: currentId,
        unitId: currentUnit?.id,
        section: currentKind === "teoria" ? "Teoría" : "Ejercicios",
        title: currentUnit?.title || ""
      };

  const sidebar = document.querySelector("[data-sidebar]");
  const backdrop = document.querySelector("[data-sidebar-backdrop]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const tree = document.querySelector("[data-course-tree]");
  const breadcrumb = document.querySelector("[data-breadcrumb]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  const desktopQuery = window.matchMedia("(min-width: 992px)");

  function isDesktop() {
    return desktopQuery.matches;
  }

  function setMenuExpanded(expanded) {
    menuButton?.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  function openSidebar() {
    if (isDesktop()) {
      document.body.classList.remove("sidebar-collapsed");
      setMenuExpanded(true);
      return;
    }

    sidebar?.classList.add("is-open");
    backdrop?.classList.add("is-visible");
    setMenuExpanded(true);
  }

  function closeSidebar() {
    if (isDesktop()) {
      document.body.classList.add("sidebar-collapsed");
      setMenuExpanded(false);
      return;
    }

    sidebar?.classList.remove("is-open");
    backdrop?.classList.remove("is-visible");
    setMenuExpanded(false);
  }

  function toggleSidebar() {
    if (isDesktop()) {
      document.body.classList.toggle("sidebar-collapsed");
      setMenuExpanded(!document.body.classList.contains("sidebar-collapsed"));
      return;
    }

    if (sidebar?.classList.contains("is-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  function normalize(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function highlight(text, query) {
    const normalizedText = normalize(text);
    const normalizedQuery = normalize(query);
    const index = normalizedText.indexOf(normalizedQuery);

    if (index === -1 || !query) {
      return text;
    }

    const end = index + query.length;
    return `${text.slice(0, index)}<mark>${text.slice(index, end)}</mark>${text.slice(end)}`;
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function escapeHtml(value) {
    const element = document.createElement("span");
    element.textContent = value;
    return element.innerHTML;
  }

  function buildSearchUrl(url, query) {
    const targetUrl = new URL(url, window.location.href);
    targetUrl.searchParams.set("q", query);
    return `${targetUrl.pathname.split("/").pop()}${targetUrl.search}${targetUrl.hash}`;
  }

  function renderTree() {
    if (!tree) {
      return;
    }

    const items = units.map((unit) => {
      const pageBelongsToUnit = currentPage?.unitId === unit.id;
      const expanded = pageBelongsToUnit ? "true" : "false";
      const collapsedClass = pageBelongsToUnit ? "" : " collapsed";
      const showClass = pageBelongsToUnit ? " show" : "";
      const theoryActive = currentId === unit.theoryId ? " active" : "";
      const practiceActive = currentId === unit.practiceId ? " active" : "";

      return `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading-${unit.id}">
            <button class="accordion-button${collapsedClass}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${unit.id}" aria-expanded="${expanded}" aria-controls="collapse-${unit.id}">
              <span class="unit-number">UT ${unit.number}</span>
              <span>${unit.title}</span>
            </button>
          </h2>
          <div id="collapse-${unit.id}" class="accordion-collapse collapse${showClass}" aria-labelledby="heading-${unit.id}" data-bs-parent="#courseTree">
            <div class="accordion-body">
              <a class="tree-link${theoryActive}" href="${unit.theoryUrl}">
                <i class="fas fa-book-open" aria-hidden="true"></i>
                Teoría
              </a>
              <a class="tree-link${practiceActive}" href="${unit.practiceUrl}">
                <i class="fas fa-laptop-code" aria-hidden="true"></i>
                Ejercicios
              </a>
            </div>
          </div>
        </div>
      `;
    }).join("");

    tree.innerHTML = `
      <div class="accordion" id="courseTree">
        <a class="tree-link${currentId === "home" ? " active" : ""} mb-2" href="index.html">
          <i class="fas fa-house" aria-hidden="true"></i>
          Inicio
        </a>
        ${items}
      </div>
    `;
  }

  function renderBreadcrumb(activeSectionTitle) {
    if (!breadcrumb || !currentPage) {
      return;
    }

    if (currentPage.id === "home") {
      breadcrumb.innerHTML = '<li class="breadcrumb-item active" aria-current="page">Inicio</li>';
      return;
    }

    const unit = units.find((item) => item.id === currentPage.unitId);
    const unitLabel = unit ? `UT ${Number(unit.number)}` : currentPage.title;
    const sectionLabel = activeSectionTitle || currentPage.section || currentPage.title;

    breadcrumb.innerHTML = `
      <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
      <li class="breadcrumb-item"><a href="#" data-scroll-top>${escapeHtml(unitLabel)}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${escapeHtml(sectionLabel)}</li>
    `;
  }

  function slugify(value) {
    return normalize(value)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70);
  }

  function renderSectionNav() {
    if (!currentId.endsWith("-teoria")) {
      return;
    }

    const main = document.querySelector("main.page-wrap");
    if (!main || main.querySelector("[data-section-nav], [data-fragment-index]")) {
      return;
    }

    const headings = Array.from(main.querySelectorAll("h2, h4"))
      .filter((heading) => heading.textContent.trim().length > 0)
      .map((heading, index) => {
        const title = heading.textContent.replace(/\s+/g, " ").trim();
        const level = heading.tagName.toLowerCase();

        if (!heading.id) {
          heading.id = `${slugify(title) || "seccion"}-${index + 1}`;
        }

        heading.classList.add("section-anchor");
        return { id: heading.id, title, level };
      });

    if (headings.length < 2) {
      return;
    }

    const nav = document.createElement("nav");
    nav.className = "section-nav content-card mb-4";
    nav.dataset.sectionNav = "true";
    nav.setAttribute("aria-label", "Acceso rápido a secciones");
    nav.innerHTML = `
      <h2 class="h5 text-primary mb-3">
        <i class="fas fa-list-ul me-2" aria-hidden="true"></i>
        Acceso rápido
      </h2>
      <div class="section-nav-list">
        ${headings.map((item) => `
          <a class="section-nav-link ${item.level === "h4" ? "is-subsection" : ""}" href="#${item.id}">
            ${item.title}
          </a>
        `).join("")}
      </div>
    `;

    const breadcrumbNav = main.querySelector("nav[aria-label='Migas de pan']");
    breadcrumbNav?.insertAdjacentElement("afterend", nav);
  }

  function titleFromSection(section) {
    const heading = section.querySelector("h1, h2");
    return heading?.textContent.replace(/\s+/g, " ").trim() || "";
  }

  function setupDynamicBreadcrumb() {
    if (!breadcrumb || currentId === "home") {
      return;
    }

    const sections = Array.from(document.querySelectorAll(".fragment-section"));
    if (sections.length === 0) {
      renderBreadcrumb();
      return;
    }

    let activeSectionId = "";
    let ticking = false;

    function updateActiveSection() {
      const checkpoint = Math.min(window.innerHeight * 0.32, 180);
      let activeSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= checkpoint) {
          activeSection = section;
        } else {
          break;
        }
      }

      if (activeSection?.id && activeSection.id !== activeSectionId) {
        activeSectionId = activeSection.id;
        renderBreadcrumb(titleFromSection(activeSection));
      }

      ticking = false;
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
      }
    }

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);
  }

  function resultExcerpt(text, query) {
    const normalizedText = normalize(text);
    const normalizedQuery = normalize(query);
    const matchIndex = normalizedText.indexOf(normalizedQuery);
    const start = matchIndex > 40 ? matchIndex - 40 : 0;
    const excerpt = text.slice(start, start + 155);
    return `${start > 0 ? "..." : ""}${excerpt}${start + 155 < text.length ? "..." : ""}`;
  }

  function renderSearch(query) {
    if (!searchResults) {
      return;
    }

    const cleanQuery = query.trim();
    if (cleanQuery.length < 2) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      return;
    }

    const normalizedQuery = normalize(cleanQuery);
    const matches = pages
      .map((page) => {
        const haystack = normalize(`${page.title} ${page.type} ${page.text}`);
        return haystack.includes(normalizedQuery) ? page : null;
      })
      .filter(Boolean)
      .slice(0, 8);

    searchResults.hidden = false;

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div class="p-3 text-muted">
          No se han encontrado resultados para <strong>${cleanQuery}</strong>.
        </div>
      `;
      return;
    }

    searchResults.innerHTML = matches.map((page) => `
      <a class="search-result" href="${buildSearchUrl(page.url, cleanQuery)}">
        <span class="d-block small text-uppercase text-muted">${page.type}</span>
        <strong class="d-block">${highlight(page.title, cleanQuery)}</strong>
        <span class="d-block small text-muted">${highlight(resultExcerpt(page.text, cleanQuery), cleanQuery)}</span>
      </a>
    `).join("");
  }

  function unwrapSearchMarks() {
    document.querySelectorAll(".search-content-mark").forEach((mark) => {
      mark.replaceWith(document.createTextNode(mark.textContent));
    });
  }

  function highlightTextMatches(target, query) {
    const cleanQuery = query.trim();
    if (cleanQuery.length < 2) {
      return;
    }

    unwrapSearchMarks();

    const words = cleanQuery
      .split(/\s+/)
      .map((word) => word.trim())
      .filter((word) => word.length >= 2);

    if (words.length === 0) {
      return;
    }

    const pattern = new RegExp(`(${words.map(escapeRegExp).join("|")})`, "gi");
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;

        if (!parent || !node.nodeValue || !pattern.test(node.nodeValue)) {
          pattern.lastIndex = 0;
          return NodeFilter.FILTER_REJECT;
        }

        pattern.lastIndex = 0;
        if (parent.closest("script, style, textarea, input, select, .unit-fragment-index, .section-nav")) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      const parts = node.nodeValue.split(pattern);

      parts.forEach((part) => {
        if (!part) {
          return;
        }

        if (pattern.test(part)) {
          const mark = document.createElement("mark");
          mark.className = "search-content-mark";
          mark.textContent = part;
          fragment.appendChild(mark);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }

        pattern.lastIndex = 0;
      });

      node.replaceWith(fragment);
    });

    window.setTimeout(() => {
      document.querySelectorAll(".search-content-mark").forEach((mark) => {
        mark.classList.add("is-fading");
      });
    }, 3600);

    window.setTimeout(unwrapSearchMarks, 5200);
  }

  function highlightTargetFromHash() {
    if (!window.location.hash) {
      return;
    }

    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const query = new URLSearchParams(window.location.search).get("q") || "";

    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      highlightTextMatches(target, query);
    }, 80);
  }

  renderTree();
  renderBreadcrumb();
  renderSectionNav();
  setupDynamicBreadcrumb();
  highlightTargetFromHash();
  setMenuExpanded(isDesktop());

  menuButton?.addEventListener("click", toggleSidebar);
  backdrop?.addEventListener("click", closeSidebar);

  desktopQuery.addEventListener("change", () => {
    sidebar?.classList.remove("is-open");
    backdrop?.classList.remove("is-visible");
    document.body.classList.remove("sidebar-collapsed");
    setMenuExpanded(isDesktop());
  });

  searchInput?.addEventListener("input", (event) => {
    renderSearch(event.target.value);
  });

  document.addEventListener("click", (event) => {
    const scrollTopLink = event.target.closest("[data-scroll-top]");
    if (scrollTopLink) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname);
      return;
    }

    const anchor = event.target.closest("a[href*='#']");
    if (anchor) {
      const url = new URL(anchor.href, window.location.href);
      const samePage = url.pathname === window.location.pathname;

      if (samePage && url.hash) {
        window.setTimeout(highlightTargetFromHash, 80);
      }
    }

    if (!event.target.closest(".search-panel")) {
      renderSearch("");
      if (searchInput) {
        searchInput.value = "";
      }
    }
  });

  window.addEventListener("hashchange", highlightTargetFromHash);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
      renderSearch("");
      if (searchInput) {
        searchInput.value = "";
      }
    }
  });
})();
