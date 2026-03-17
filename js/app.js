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
    "hero-pill": "Backend / Full-Stack Developer",
    "hero-summary": `I'm Samuel Sanchez, a <strong>Backend / Full-Stack Software Developer</strong>  with 2+ years of experience designing REST APIs, desktop systems, and mobile applications with real-world user impact. I have delivered solutions to active clients, including production systems with CI/CD pipelines, optimized PostgreSQL databases, and apps with 300+ users. I work with Java, Python, and JavaScript building maintainable software focused on solving concrete business problems.`,
    "h-contact": "Contact",
    "h-skills": "Core Skills",
    "sg-languages": "Languages",
    "sg-frameworks": "Frameworks",
    "sg-databases": "Databases",
    "sg-tools": "Tools & Practices",
    "h-experience": "Experience",
    "ec-0": "Independent Beauty Distribution Consultant Client",
    "er-0": "Software Developer",
    "ed-0": "Nov 2025 &ndash; Present",
    "eb-0": `<li>Commissioned by a national Mary Kay beauty consultant to build <strong>StockBeauty App</strong>, the system integrates inventory control, point of sale (POS), and an executive reporting module for decision-making.</li><li>Architected a layered Rust backend (Tauri) with Commands → Services → Repository pattern, backed by SQLite, delivering real-time stock monitoring, sales traceability, and multi-format data export (PDF/Excel).</li><li>Built a React + Vite frontend with dynamic themes, multi-language (i18n) support, a configurable sidebar, and an optimized POS interface with automatic calculations and receipt generation.</li><li>Application is currently in production and under active development, with ongoing feature iterations based on client feedback.</li>`,
    "er-1": "Java  Developer",
    "eb-1": `<li>Developed practical exercises and projects throughout the program applying Java, Spring Boot, JWT authentication, and REST API design with MySQL.</li><li>Validated all endpoints through Postman testing and version-controlled the full development lifecycle with Git.</li><li>Final project approved by a senior Java professional and HR, meeting production-level quality standards.</li>`,
    "er-2": "Full-Stack Developer",
    "eb-2": `<li>Built a modular iOS app in SwiftUI to teach and preserve the Mam language, actively used by 300+ university students.</li><li>Implemented a multilingual localization system (Spanish, English, and Mam) using a global LanguageManager with EnvironmentObject state management.</li><li>Integrated Google Cloud Translation API through a dedicated service layer, enabling real-time in-app translation.</li>`,
    "er-3": "Full-Stack Developer",
    "eb-3": `<li>Implemented a university lab access control system processing 500+ monthly records.</li><li>Built a Java backend with secure authentication, access logging, and auditing to ensure full operational traceability.</li><li>Optimized PostgreSQL queries achieving a 35% reduction in response times, managing the full development lifecycle with Git and Jira.</li>`,
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
    "hero-pill": "Desarrollador Backend / Full-Stack",
    "hero-summary": `Soy Samuel Sanchez, <strong>Desarrollador de Software Backend / Full-Stack</strong> con más de2 años de experiencia diseñando REST APIs, sistemas de escritorio y aplicaciones móviles con impacto en usuarios reales. He entregado soluciones a clientes activos, incluyendo sistemas en producción con pipelines CI/CD, bases de datos optimizadas en PostgreSQL y apps con más de 300 usuarios. Trabajo con Java, Python y JavaScript construyendo software mantenible y orientado a resolver problemas concretos de negocio.`,
    "h-contact": "Contacto",
    "h-skills": "Habilidades Técnicas",
    "sg-languages": "Lenguajes",
    "sg-frameworks": "Frameworks",
    "sg-databases": "Bases de Datos",
    "sg-tools": "Herramientas y Prácticas",
    "h-experience": "Experiencia",
    "ec-0": "Cliente Consultora Independiente del Sector Belleza",
    "er-0": "Desarrollador de Software",
    "ed-0": "Nov 2025 &ndash; Presente",
    "eb-0": `<li>Desarrollé <strong>StockBeauty App</strong> para una consultora nacional de Mary Kay, el sistema integra control de inventario, punto de venta (POS) y un módulo de reportes ejecutivos para la toma de decisiones.</li><li>Diseñé arquitectura por capas en Rust (Tauri): Commands → Services → Repository, respaldada por SQLite, con monitoreo en tiempo real y exportación en múltiples formatos (PDF/Excel).</li><li>Construí el frontend con React + Vite: temas dinámicos, soporte multilenguaje (i18n), barra lateral configurable e interfaz POS con cálculos automáticos y generación de comprobantes.</li><li>Aplicación en producción con desarrollo activo continuo e iteraciones basadas en retroalimentación del cliente.</li>`,
    "er-1": "Desarrollador Java",
    "eb-1": `<li>Desarrollé ejercicios y proyectos prácticos a lo largo del programa aplicando Java, Spring Boot, autenticación JWT y diseño de REST APIs con MySQL.</li><li>Validé todos los endpoints mediante pruebas con Postman y gestioné el ciclo completo de desarrollo con control de versiones en Git.</li><li>Proyecto final aprobado por un profesional senior en Java y RRHH, cumpliendo estándares de calidad a nivel productivo.</li>`,
    "er-2": "Desarrollador Full-Stack",
    "eb-2": `<li>Desarrollé una app iOS en SwiftUI con arquitectura modular para enseñar y preservar el idioma Mam, activa con más de 300 estudiantes universitarios.</li><li>Implementé un sistema de localización multiidioma (Español, Inglés y Mam) con LanguageManager como estado global mediante EnvironmentObject.</li><li>Integré Google Cloud Translation API mediante una capa de servicio dedicada, habilitando traducción en tiempo real dentro de la app.</li>`,
    "er-3": "Desarrollador Full-Stack",
    "eb-3": `<li>Implementé un sistema de control de acceso a laboratorio universitario que procesa más de 500 registros mensuales.</li><li>Desarrollé el backend en Java con autenticación segura, registro de accesos y auditoría para garantizar trazabilidad completa.</li><li>Optimicé consultas en PostgreSQL reduciendo tiempos de respuesta en un 35%, gestionando el ciclo de desarrollo con Git y Jira.</li>`,
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
    "cert-date-march2026": "Marzo 2026",
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

document.querySelector('.reverse').addEventListener('copy', function(e) {
  e.clipboardData.setData('text/plain', 'samuel.sanchezdev17@gmail.com');
  e.preventDefault();
});