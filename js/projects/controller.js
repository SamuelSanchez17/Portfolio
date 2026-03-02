import { ProjectService } from "./service.js";

/** @type {Record<string, Record<string, string>>} */
const TYPE_LABELS = {
  en: { all: "All", desktop: "Desktop", mobile: "Mobile", backend: "Backend" },
  es: { all: "Todos", desktop: "Escritorio", mobile: "Móvil", backend: "Backend" },
};

/** @type {Record<string, string>} */
const STATUS_SECTION_LABEL = {
  en: "Project status",
  es: "Estado del proyecto",
};

/** @type {Record<string, Record<string, string>>} */
const STATUS_LABELS = {
  en: {
    production: "In production",
    development: "In development",
    completed: "Completed",
  },
  es: {
    production: "En producción",
    development: "En desarrollo",
    completed: "Completado",
  },
};

class ProjectController {
  constructor() {
    this.service = new ProjectService();
    /** @type {import('./service.js').EnrichedProject[]} */
    this.allProjects = [];
    this.activeFilter = "all";
    /** @type {HTMLElement|null} */
    this.gridEl = null;
    /** @type {HTMLElement|null} */
    this.filtersEl = null;
  }

  /** @returns {string} */
  get lang() {
    return document.documentElement.lang || "en";
  }

  // ─── Filter pills ────────────────────────────────────────────────────────
  _renderFilters() {
    const types = ["all", "desktop", "mobile", "backend"];
    this.filtersEl.innerHTML = "";
    types.forEach((type) => {
      const btn = document.createElement("button");
      btn.className =
        "filter-pill" + (type === this.activeFilter ? " active" : "");
      btn.dataset.type = type;
      btn.textContent = TYPE_LABELS[this.lang]?.[type] ?? type;
      btn.addEventListener("click", () => {
        this.activeFilter = type;
        this._renderAll();
      });
      this.filtersEl.appendChild(btn);
    });
  }

  // ─── Project card ────────────────────────────────────────────────────────
  /**
   * @param {import('./service.js').EnrichedProject} project
   * @returns {HTMLLIElement}
   */
  _createCard(project) {
    const lang = this.lang;
    const summary = project.summary[lang] ?? project.summary.en;
    const typeLabel = TYPE_LABELS[lang]?.[project.type] ?? project.type;
    const projectStatuses = Array.isArray(project.status) ? project.status : [];
    const hasStatus = projectStatuses.length > 0;
    const hasScreenshots = project.screenshots && project.screenshots.length > 0;
    const hasGithub = !!project.githubUsername && !!project.githubRepositoryName;
    const githubUrl = hasGithub
      ? `https://github.com/${project.githubUsername}/${project.githubRepositoryName}`
      : null;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="proj-card">
        ${hasScreenshots ? `
          <div class="proj-screenshots">
            <div class="proj-screenshots-track">
              ${project.screenshots.map((src, i) => `
                <img src="${src}" alt="${project.name} screenshot ${i + 1}"
                  class="proj-screenshot"
                  loading="${i === 0 ? "eager" : "lazy"}"
                  draggable="false"
                  decoding="async"/>
              `).join("")}
            </div>
            ${project.screenshots.length > 1 ? `
              <div class="proj-screenshots-dots">
                ${project.screenshots.map((_, i) => `
                  <button class="proj-dot${i === 0 ? " active" : ""}" data-index="${i}" aria-label="Screenshot ${i + 1}"></button>
                `).join("")}
              </div>
            ` : ""}
          </div>
        ` : ""}
        <div class="proj-card-head">
          <div class="proj-title-row">
            <h3 class="proj-name">${project.name}</h3>
            <span class="proj-type-badge proj-type-${project.type}">${typeLabel}</span>
          </div>
          ${hasStatus ? `
            <div class="proj-status-section">
              <span class="proj-status-label">${STATUS_SECTION_LABEL[lang] ?? STATUS_SECTION_LABEL.en}</span>
              <div class="proj-status-list">
                ${projectStatuses.map((status) => `
                  <span class="proj-status-badge proj-status-${status}">${STATUS_LABELS[lang]?.[status] ?? status}</span>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>
        <p class="proj-summary">${summary}</p>
        <ul class="proj-tech-list">
          ${project.techStack.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="proj-footer">
          <div class="proj-actions">
            ${hasGithub ? `
              <a href="${githubUrl}" target="_blank" class="proj-link proj-link-github" aria-label="View ${project.name} on GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M9 19c-4 1.5-4-2.5-6-3m12 6v-3.1a2.7 2.7 0 0 0-.8-2.1c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 19 7.5a4.4 4.4 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C7.3 4 6.3 4.3 6.3 4.3A4.4 4.4 0 0 0 6.2 7.5a4.7 4.7 0 0 0-1.3 3.5c0 4.7 2.8 5.7 5.5 6a2.7 2.7 0 0 0-.8 2.1V22"/>
                </svg>
                Code
              </a>
            ` : `
              <span class="proj-private">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Private
              </span>
            `}
          </div>
        </div>
      </div>
    `;

    // Carrusel de Screenshots con swipe
    if (hasScreenshots) {
      const track = li.querySelector(".proj-screenshots-track");
      const dots = li.querySelectorAll(".proj-dot");
      const imgs = li.querySelectorAll(".proj-screenshot");
      const total = project.screenshots.length;
      let current = 0;

      const goTo = (idx) => {
        current = Math.max(0, Math.min(idx, total - 1));
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
      };

      // Dot navigation
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          goTo(parseInt(dot.dataset.index, 10));
        });
      });

      // ── Swipe / drag logic ──
      const container = li.querySelector(".proj-screenshots");
      let startX = 0;
      let deltaX = 0;
      let dragging = false;
      let didDrag = false;
      const SWIPE_THRESHOLD = 40;

      const onStart = (x) => {
        dragging = true;
        didDrag = false;
        startX = x;
        deltaX = 0;
        track.classList.add("dragging");
      };

      const onMove = (x) => {
        if (!dragging) return;
        deltaX = x - startX;
        if (Math.abs(deltaX) > 5) didDrag = true;
        // Clamp at edges with rubber-band
        const baseOffset = -current * 100;
        const pxToPercent = (deltaX / container.offsetWidth) * 100;
        track.style.transform = `translateX(${baseOffset + pxToPercent}%)`;
      };

      const onEnd = () => {
        if (!dragging) return;
        dragging = false;
        track.classList.remove("dragging");
        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
          if (deltaX < 0 && current < total - 1) goTo(current + 1);
          else if (deltaX > 0 && current > 0) goTo(current - 1);
          else goTo(current);
        } else {
          goTo(current);
        }
      };

      // Touch events
      container.addEventListener("touchstart", (e) => onStart(e.touches[0].clientX), { passive: true });
      container.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX), { passive: true });
      container.addEventListener("touchend", onEnd);
      container.addEventListener("touchcancel", onEnd);

      // Mouse events (desktop drag)
      container.addEventListener("mousedown", (e) => {
        e.preventDefault();
        onStart(e.clientX);
      });
      container.addEventListener("mousemove", (e) => onMove(e.clientX));
      container.addEventListener("mouseup", onEnd);
      container.addEventListener("mouseleave", onEnd);

      // Open modal only on click (not after drag)
      imgs.forEach((img, i) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", (e) => {
          if (didDrag) { e.preventDefault(); return; }
          this._openModal(project.screenshots, current);
        });
      });
    }

    return li;
  }

  // ─── Image modal ─────────────────────────────────────────────────────────
  _initModal() {
    const modal = document.createElement("div");
    modal.id = "img-modal";
    modal.className = "img-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="img-modal-backdrop"></div>
      <div class="img-modal-box">
        <button class="img-modal-close" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <button class="img-modal-nav img-modal-prev" aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <img class="img-modal-img" src="" alt="" />
        <button class="img-modal-nav img-modal-next" aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <div class="img-modal-counter"></div>
      </div>
    `;
    document.body.appendChild(modal);

    this._modal = modal;
    this._modalImg = modal.querySelector(".img-modal-img");
    this._modalPrev = modal.querySelector(".img-modal-prev");
    this._modalNext = modal.querySelector(".img-modal-next");
    this._modalCounter = modal.querySelector(".img-modal-counter");
    this._modalScreenshots = [];
    this._modalIndex = 0;

    modal.querySelector(".img-modal-backdrop").addEventListener("click", () => this._closeModal());
    modal.querySelector(".img-modal-close").addEventListener("click", () => this._closeModal());
    this._modalPrev.addEventListener("click", () => this._navigateModal(-1));
    this._modalNext.addEventListener("click", () => this._navigateModal(1));

    document.addEventListener("keydown", (e) => {
      if (!this._modal.classList.contains("open")) return;
      if (e.key === "Escape") this._closeModal();
      if (e.key === "ArrowLeft") this._navigateModal(-1);
      if (e.key === "ArrowRight") this._navigateModal(1);
    });
  }

  /**
   * @param {string[]} screenshots
   * @param {number} index
   */
  _openModal(screenshots, index) {
    this._modalScreenshots = screenshots;
    this._modalIndex = index;
    this._updateModal();
    this._modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  _closeModal() {
    this._modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  /** @param {number} dir — -1 prev, +1 next */
  _navigateModal(dir) {
    const total = this._modalScreenshots.length;
    this._modalIndex = (this._modalIndex + dir + total) % total;
    this._updateModal();
  }

  _updateModal() {
    const total = this._modalScreenshots.length;
    const idx = this._modalIndex;
    this._modalImg.src = this._modalScreenshots[idx];
    this._modalImg.alt = `Screenshot ${idx + 1} of ${total}`;
    this._modalCounter.textContent = total > 1 ? `${idx + 1} / ${total}` : "";
    this._modalPrev.hidden = idx === 0;
    this._modalNext.hidden = idx === total - 1;
  }

  // ─── Circulo del render completo ───────────────────────────────────────────────────
  _renderAll() {
    this._renderFilters();
    const filtered = this.service.filterByType(this.allProjects, this.activeFilter);
    this.gridEl.innerHTML = "";
    if (filtered.length === 0) {
      const empty = document.createElement("li");
      empty.className = "proj-empty";
      empty.textContent =
        this.lang === "es" ? "Sin proyectos en esta categoría." : "No projects in this category.";
      this.gridEl.appendChild(empty);
      return;
    }
    filtered.forEach((p) => this.gridEl.appendChild(this._createCard(p)));
  }

  // ─── Bootstrap ──────────────────────────────────────────────────────────
  init() {
    document.addEventListener("DOMContentLoaded", async () => {
      this.gridEl = document.getElementById("project-grid");
      this.filtersEl = document.getElementById("project-filters");
      if (!this.gridEl || !this.filtersEl) return;

      this._initModal();

      // Carga el esqueleto
      this._renderFilters();
      this.gridEl.innerHTML =
        '<li class="proj-loading"><span></span><span></span><span></span></li>';

      try {
        this.allProjects = await this.service.getAllEnriched();
      } catch (err) {
        console.error("ProjectController: failed to load projects", err);
        this.allProjects = [];
      }

      this._renderAll();

      //Re-renderiza etiquetas + resúmenes al cambiar idioma
      document.addEventListener("portfolioLangChange", () => this._renderAll());
    });
  }
}

const controller = new ProjectController();
controller.init();
