const root = document.documentElement;

// ─── Theme ────────────────────────────────────────────────────────────────────
const toggle = document.querySelector(".theme-toggle");

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const setTheme = (theme) => {
  root.dataset.theme = theme;
  if (toggle) {
    toggle.setAttribute("aria-pressed", theme === "dark");
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
};

if (toggle) {
  setTheme(getInitialTheme());
  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

// ─── Language ─────────────────────────────────────────────────────────────────
const langBtn = document.querySelector(".lang-toggle");

const translations = {
  en: {
    "nav-about": "About",
    "nav-projects": "Projects",
    "nav-certifications": "Certifications",
    "hero-pill": "Software Developer",
    "hero-summary": `I'm Samuel Sanchez, a <strong>Software Developer (Backend / Full-Stack)</strong> with 2+ years of experience building scalable REST APIs and efficient database systems. I work mainly with Java, Python, and JavaScript, delivering well-structured solutions under Agile practices and Git-based workflows.`,
    "h-contact": "Contact",
    "h-skills": "Core Skills",
    "sg-languages": "Languages",
    "sg-frameworks": "Frameworks",
    "sg-databases": "Databases",
    "sg-tools": "Tools & Practices",
    "h-experience": "Experience",
    "er-0": "Full-stack Desktop Developer",
    "ed-0": "Nov 2025 &ndash; Present",
    "eb-0": `<li>Commissioned by a national Mary Kay beauty consultant to build <strong>StockBeauty App</strong>, the system integrates inventory control, point of sale (POS), and an executive reporting module for decision-making.</li><li>Architected a layered Rust backend (Tauri) with Commands → Services → Repository pattern, backed by SQLite, delivering real-time stock monitoring, sales traceability, and multi-format data export (PDF/Excel).</li><li>Built a React + Vite frontend with dynamic themes, multi-language (i18n) support, a configurable sidebar, and an optimized POS interface with automatic calculations and receipt generation.</li><li>Application is currently in production and under active development, with ongoing feature iterations based on client feedback.</li>`,
    "er-1": "Java Jr Developer",
    "eb-1": `<li>Built the backend using Java, Spring Boot, and MySQL with clean architecture practices.</li><li>Delivered a production-style final project validated by technical leadership and HR.</li><li>Improved team delivery efficiency by 30% through collaborative Agile practices.</li>`,
    "er-2": "Full-Stack Developer",
    "eb-2": `<li>Developed an iOS app in Swift to teach and preserve the Mam language for 300+ students.</li><li>Designed inclusive UI flows, increasing retention by 25% in pilots.</li><li>Integrated a multilingual translation system using APIs and JSON, cutting lookup time by 40%.</li>`,
    "er-3": "Full-Stack Developer",
    "eb-3": `<li>Implemented an access-control system processing 500+ monthly lab entries.</li><li>Built a Java backend with authentication and access logging for scalable operations.</li><li>Reduced PostgreSQL response times by 35% and managed tasks with Git and Jira.</li>`,
    "h-education": "Education",
    "edr-0": "BS in Software Development and Technology Engineering",
    "edb-0": `<li>Participated in the national Swift Student Challenge (Apple), building a social impact app recognized in the Community Change Makers category.</li><li>Designed and developed a computer lab access-control system used daily by students and faculty, improving security and operational tracking.</li><li>Completed coursework in software architecture, distributed systems, and databases, applying knowledge through real-world academic projects.</li>`,
    "edr-1": "Technical Degree in Programming",
    "edb-1": `<li>Acquired foundational skills in programming logic, databases, and web development.</li><li>Developed practical projects in C and web technologies as part of the technical curriculum.</li>`,
    "h-projects": "Selected Projects",
    "proj-page-title": "Projects",
    "proj-page-subtitle": "A selection of software I've built — from enterprise desktop apps to backend systems and mobile applications.",
    "cert-page-title": "Certifications",
    "cert-page-subtitle": "Professional certifications and achievements that validate my expertise across various technologies and platforms.",
    "cert-verify": "Verify Certificate",
    "cert-no-link": "No public link",
    "cert-date-may2024": "May 2024",
    "cert-date-april2024": "April 2024",
    "cert-date-june2025": "June 2025",
    "cert-date-dec2022": "December 2022",
    "cert-date-march2026": "March 2026",
    "h-spoken": "Spoken languages 🈷️",
    "sl-0": "Spanish (native)",
    "sl-1": "English (B2)",
    "cl-cv": "Curriculum",
    "cv-download": "Download CV",
    "nav-contact": "Message",
    "contact-page-title": "Let's Work Together",
    "contact-page-subtitle": "Interested in collaborating or have an opportunity? Send me a message and I'll get back to you as soon as possible.",
    "form-name": "Name",
    "form-email": "Email",
    "form-title": "Subject",
    "form-message": "Message",
    "form-send": "Send Message",
    "form-success-title": "Message Sent!",
    "form-success-desc": "Thank you for reaching out. I'll get back to you within 24 hours.",
    "form-send-another": "Send Another Message",
    "form-error-title": "Something went wrong",
    "form-error-desc": "Please try again or email me directly.",
    "form-try-again": "Try Again",
  },
  es: {
    "nav-about": "Acerca",
    "nav-projects": "Proyectos",
    "nav-certifications": "Certificaciones",
    "hero-pill": "Desarrollador de Software",
    "hero-summary": `Soy Samuel Sanchez, <strong>Desarrollador de Software (Backend / Full-Stack)</strong> con más de 2 años de experiencia construyendo REST APIs escalables y sistemas de bases de datos eficientes. Trabajo principalmente con Java, Python y JavaScript, entregando soluciones bien estructuradas bajo prácticas Agile y flujos de trabajo basados en Git.`,
    "h-contact": "Contacto",
    "h-skills": "Habilidades Técnicas",
    "sg-languages": "Lenguajes",
    "sg-frameworks": "Frameworks",
    "sg-databases": "Bases de Datos",
    "sg-tools": "Herramientas y Prácticas",
    "h-experience": "Experiencia",
    "er-0": "Desarrollador de Escritorio Full-Stack",
    "ed-0": "Nov 2025 &ndash; Presente",
    "eb-0": `<li>Desarrollé <strong>StockBeauty App</strong> para una consultora nacional de Mary Kay, el sistema integra control de inventario, punto de venta (POS) y un módulo de reportes ejecutivos para la toma de decisiones.</li><li>Diseñé arquitectura por capas en Rust (Tauri): Commands → Services → Repository, respaldada por SQLite, con monitoreo en tiempo real y exportación en múltiples formatos (PDF/Excel).</li><li>Construí el frontend con React + Vite: temas dinámicos, soporte multilenguaje (i18n), barra lateral configurable e interfaz POS con cálculos automáticos y generación de comprobantes.</li><li>Aplicación en producción con desarrollo activo continuo e iteraciones basadas en retroalimentación del cliente.</li>`,
    "er-1": "Desarrollador Jr Java",
    "eb-1": `<li>Desarrollé el backend con Java, Spring Boot y MySQL siguiendo prácticas de arquitectura limpia.</li><li>Entregué un proyecto final de nivel productivo, validado por liderazgo técnico y RRHH.</li><li>Mejoré la eficiencia de entrega del equipo en un 30% mediante prácticas Agile colaborativas.</li>`,
    "er-2": "Desarrollador Full-Stack",
    "eb-2": `<li>Desarrollé una app iOS en Swift para enseñar y preservar el idioma Mam para más de 300 estudiantes.</li><li>Diseñé flujos de UI inclusivos, aumentando la retención en un 25% en pruebas piloto.</li><li>Integré un sistema de traducción multilenguaje con APIs y JSON, reduciendo el tiempo de búsqueda en un 40%.</li>`,
    "er-3": "Desarrollador Full-Stack",
    "eb-3": `<li>Implementé un sistema de control de acceso que procesa más de 500 entradas mensuales al laboratorio.</li><li>Desarrollé un backend en Java con autenticación y registro de accesos para operaciones escalables.</li><li>Reduje los tiempos de respuesta en PostgreSQL en un 35% y gestioné tareas con Git y Jira.</li>`,
    "h-education": "Educación",
    "edr-0": "Licenciatura en Ing. en Desarrollo y Tecnologías de Software",
    "edb-0": `<li>Participé en el Swift Student Challenge nacional (Apple), desarrollando una app de impacto social reconocida en la categoría Community Change Makers.</li><li>Diseñé y desarrollé un sistema de control de acceso a laboratorio utilizado diariamente por estudiantes y docentes, mejorando la seguridad y el seguimiento operativo.</li><li>Cursé asignaturas en arquitectura de software, sistemas distribuidos y bases de datos, aplicando conocimientos en proyectos académicos reales.</li>`,
    "edr-1": "Técnico en Programación",
    "edb-1": `<li>Adquirí habilidades fundamentales en lógica de programación, bases de datos y desarrollo web.</li><li>Desarrollé proyectos prácticos en C y tecnologías web como parte del plan de estudios técnico.</li>`,
    "h-projects": "Proyectos Destacados",
    "proj-page-title": "Proyectos",
    "proj-page-subtitle": "Una selección de software que he desarrollado — desde apps de escritorio empresariales hasta sistemas backend y aplicaciones móviles.",
    "cert-page-title": "Certificaciones",
    "cert-page-subtitle": "Certificaciones profesionales y logros que validan mi experiencia en diversas tecnologías y plataformas.",
    "cert-verify": "Verificar Certificado",
    "cert-no-link": "Sin enlace público",
    "cert-date-may2024": "Mayo 2024",
    "cert-date-april2024": "Abril 2024",
    "cert-date-june2025": "Junio 2025",
    "cert-date-dec2022": "Diciembre 2022",
    "h-spoken": "Idiomas hablados 🈷️",
    "sl-0": "Español (nativo)",
    "sl-1": "Inglés (B2)",
    "cl-cv": "Currículum",
    "cv-download": "Descargar CV",
    "nav-contact": "Mensaje",
    "contact-page-title": "Trabajemos Juntos",
    "contact-page-subtitle": "¿Te interesa colaborar o tienes una oportunidad? Envíame un mensaje y te responderé lo antes posible.",
    "form-name": "Nombre",
    "form-email": "Correo",
    "form-title": "Asunto",
    "form-message": "Mensaje",
    "form-send": "Enviar Mensaje",
    "form-success-title": "¡Mensaje Enviado!",
    "form-success-desc": "Gracias por escribirme. Te responderé dentro de las próximas 24 horas.",
    "form-send-another": "Enviar Otro Mensaje",
    "form-error-title": "Algo salió mal",
    "form-error-desc": "Por favor intenta de nuevo o escríbeme directamente.",
    "form-try-again": "Intentar de Nuevo",
  },
};

const applyLanguage = (lang) => {
  root.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (translations[lang]?.[key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });
  if (langBtn) {
    langBtn.textContent = lang === "en" ? "ES" : "EN";
    langBtn.setAttribute(
      "aria-label",
      lang === "en" ? "Cambiar a Español" : "Switch to English"
    );
  }
  // Notify dynamically-rendered components (e.g. project cards)
  document.dispatchEvent(new CustomEvent("portfolioLangChange", { detail: { lang } }));
};

const getInitialLang = () => localStorage.getItem("lang") || "en";

applyLanguage(getInitialLang());

if (langBtn) {
  langBtn.addEventListener("click", () => {
    const next = root.lang === "en" ? "es" : "en";
    applyLanguage(next);
    localStorage.setItem("lang", next);
  });
}

// Obfuscated contacts: text is stored reversed, JS rebuilds href on click
document.querySelectorAll(".contact-obf").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const reversed = link.querySelector(".reverse").textContent.trim();
    const real = reversed.split("").reverse().join("");
    window.location.href = `mailto:${real}`;
  });
});

// Transicion suave entre páginas usando el API de Transiciones (si el navegador lo soporta)
// Transición suave entre páginas
document.querySelectorAll("a.nav-link").forEach(link => {
  link.addEventListener("click", async (e) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    // Si el browser soporta View Transitions
    if (!document.startViewTransition) return;

    e.preventDefault();
    document.startViewTransition(() => {
      window.location.href = href;
    });
  });
});