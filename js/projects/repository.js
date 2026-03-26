/** @type {string} */
const DESKTOP_TYPE = "desktop";
/** @type {string} */
const MOBILE_TYPE = "mobile";
/** @type {string} */
const BACKEND_TYPE = "backend";
/** @type {string} */
const FRONTEND_TYPE = "frontend";
/** @type {string} */
const STATUS_PRODUCTION = "production";
/** @type {string} */
const STATUS_DEVELOPMENT = "development";
/** @type {string} */
const STATUS_COMPLETED = "completed";

/**
 * @typedef {Object} ProjectLink
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} ProjectSummary
 * @property {string} en
 * @property {string} es
 */

/**
 * @typedef {Object} Project
 * @property {string} name
 * @property {ProjectSummary} summary
 * @property {ProjectLink[]} links
 * @property {string[]} techStack
 * @property {string} type
 * @property {string[]} screenshots  — paths relative to project root
 * @property {string[]} status
 * @property {string|null} githubUsername  — null = private
 * @property {string|null} githubRepositoryName
 * @property {string|null} demoUrl
 */

/**
 * @typedef {Object} GithubInfo
 * @property {number|null} stars
 * @property {number|null} forks
 */

class ProjectRepository {
  constructor() {
    /** @type {Project[]} */
    this.projects = [
      {
        name: "StockBeauty",
        summary: {
          en: "Comprehensive desktop system for a beauty sector consultancy, centralizing inventory control, sales recording, and executive report generation in multiple formats. Includes integrated data backup and a CI/CD pipeline with GitHub Actions that automates build and deployment of updates directly to the client via Tauri's autoupdater.",
          es: "Sistema de escritorio completo para una consultora del sector belleza, centralizando el control de inventario, registro de ventas y generación de reportes ejecutivos en múltiples formatos. Incluye respaldo de datos integrado y un pipeline CI/CD con GitHub Actions que automatiza el build y despliegue de actualizaciones directamente al cliente mediante el autoupdater de Tauri.",
        },
        links: [],
        techStack: ["Rust", "Tauri", "React", "Vite", "SQLite", "JavaScript", "Git", "i18n"],
        type: DESKTOP_TYPE,
        status: [STATUS_DEVELOPMENT, STATUS_PRODUCTION],
        screenshots: [

           "../Assets/projects/stockbeauty/icon.png"
          // "Assets/projects/stockbeauty/inventory.png",
        ],
        githubUsername: "SamuelSanchez17",
        githubRepositoryName: "inventory-management-system",
        demoUrl: null,
      },
      {
        name: "MamLingua App",
        summary: {
          en: "iOS app for teaching and preserving the Mam language, actively used by over 300 university students. Integrates multilingual translation via external APIs with direct impact on cultural preservation of indigenous communities.",
          es: "Aplicación iOS para la enseñanza y preservación del idioma mam, activa con más de 300 estudiantes universitarios. Integra traducción multilenguaje mediante APIs externas con impacto directo en la preservación cultural de comunidades indígenas.",
        },
        links: [],
        techStack: ["Swift", "iOS", "API REST", "JSON", "Git", "Figma"],
        type: MOBILE_TYPE,
        status: [STATUS_COMPLETED, STATUS_PRODUCTION],
        screenshots: 
        [
          "../Assets/projects/mamLingua/Mamlingua.png",
          "../Assets/projects/mamLingua/Descripcion.png",
          "../Assets/projects/mamLingua/Traditions.png",
          "../Assets/projects/mamLingua/Translator.png"
        ],
        githubUsername: "SamuelSanchez17",
        githubRepositoryName: "Mam-Project",
        demoUrl: null,
      },
      {
        name: "Academic Management API",
        summary: {
          en: "REST API for educational institution centralizing academic and administrative processes. Implements authentication, role control and layered architecture oriented to scalability, with documented endpoints and clear separation of responsibilities.",
          es: "API REST para institución educativa que centraliza procesos académicos y administrativos. Implementa autenticación, control de roles y arquitectura en capas orientada a escalabilidad, con endpoints documentados y separación clara de responsabilidades.",
        },
        links: [],
        techStack: ["Java", "Spring Boot", "MySQL", "Git", "JWT", "Spring Security", "JPA", "Maven"],
        type: BACKEND_TYPE,
        status: [STATUS_COMPLETED],
        screenshots: 
        [
          "../Assets/projects/studentsManagement/Menu.png",
          "../Assets/projects/studentsManagement/Jwt.png",
          "../Assets/projects/studentsManagement/Schemas.png",
        ],
        githubUsername: "SamuelSanchez17",  // private repository
        githubRepositoryName: "students-management-api",
        demoUrl: null,
      },
      {
        name: "FDN Lab Access System",
        summary: {
          en: "University lab access control system processing 500+ monthly records. Features secure authentication, access auditing, and optimized PostgreSQL queries for traceability and performance.",
          es: "Sistema de control de acceso a laboratorio universitario que procesa más de 500 registros mensuales. Incluye autenticación segura, auditoría de accesos y consultas optimizadas en PostgreSQL para garantizar trazabilidad y rendimiento.",
        },
        links: [],
        techStack: ["Java", "Spring Boot", "PostgreSQL", "Git", "Jira", "Maven"],
        type: BACKEND_TYPE,
        status: [STATUS_COMPLETED, STATUS_PRODUCTION],
        screenshots: 
        [
          "../Assets/projects/labAccess/Login.png",
          "../Assets/projects/labAccess/SelectLab.png",
          "../Assets/projects/labAccess/Scan.png",
          "../Assets/projects/labAccess/ScanQR.png",
          "../Assets/projects/labAccess/Reports.png",
          "../Assets/projects/labAccess/Visits.png",
        ],
        githubUsername: "",  // private repository
        githubRepositoryName: "Sistema-de-Acceso-Laboratorios-de-Computo-FDN",
        demoUrl: null,
      },
      {
        name: "Rick & Morty Directory",
        summary: {
          en: "Interactive character directory built as a web app, consuming a public API with dynamic combinable filters, real-time favorites persistence with Firestore and ES/EN internationalization. Responsive design adaptable to any device and emphasis on predictable state management.",
          es: "Directorio interactivo de personajes construido como aplicación web, consumiendo una API pública con filtros dinámicos combinables, persistencia de favoritos en tiempo real con Firestore e internacionalización ES/EN. Diseño responsive adaptable a cualquier dispositivo y énfasis en gestión de estado predecible.",
        },
        links: [],
        techStack: ["Angular", "TypeScript", "Firebase", "Firestore", "Git", "RxJS", "i18n"],
        type: FRONTEND_TYPE,
        status: [STATUS_COMPLETED, STATUS_PRODUCTION],
        screenshots: 
        [
          "../Assets/projects/rick&Morty/Main.png",
          "../Assets/projects/rick&Morty/Favorites.png",
          "../Assets/projects/rick&Morty/Details.png",
        ],
        githubUsername: "SamuelSanchez17",  // private repository
        githubRepositoryName: "rick-and-morty-challenge",
        demoUrl: "https://directory-rick-morty.web.app",
      },
    ];
  }

  /** @returns {Project[]} */
  getAllProjects() {
    return this.projects;
  }

  /**
   * @param {string} type
   * @returns {Project[]}
   */
  getProjectsByType(type) {
    return this.projects.filter((p) => p.type === type);
  }

  /**
   * Tries to fetch GitHub stats; returns nulls silently on any failure.
   * @param {string|null} username
   * @param {string|null} repo
   * @returns {Promise<GithubInfo>}
   */
  async fetchGithubInfo(username, repo) {
    if (!username || !repo) return { stars: null, forks: null };
    try {
      const res = await fetch(
        `https://api.github.com/repos/${username}/${repo}`
      );
      if (!res.ok) return { stars: null, forks: null };
      const data = await res.json();
      return {
        stars: data.stargazers_count ?? 0,
        forks: data.forks_count ?? 0,
      };
    } catch {
      return { stars: null, forks: null };
    }
  }
}

export { ProjectRepository, DESKTOP_TYPE, MOBILE_TYPE, BACKEND_TYPE, FRONTEND_TYPE };
