/** @type {string} */
const DESKTOP_TYPE = "desktop";
/** @type {string} */
const MOBILE_TYPE = "mobile";
/** @type {string} */
const BACKEND_TYPE = "backend";
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
          en: "Full-featured desktop inventory & POS system built for a national beauty sector client. Manages products, stock levels, sales history and generates executive reports in multiple formats.",
          es: "Sistema de escritorio completo de inventario y punto de venta para cliente del sector belleza. Gestión de productos, stock, historial de ventas y reportes ejecutivos en múltiples formatos.",
        },
        links: [],
        techStack: ["Rust", "Tauri", "React", "Vite", "SQLite", "JavaScript", "Git"],
        type: DESKTOP_TYPE,
        status: [STATUS_DEVELOPMENT, STATUS_PRODUCTION],
        screenshots: [

           "../Assets/projects/stockbeauty/icon.png"
          // "Assets/projects/stockbeauty/inventory.png",
        ],
        githubUsername: "SamuelSanchez17",
        githubRepositoryName: "inventory-management-system",
      },
      {
        name: "MamLingua App",
        summary: {
          en: "iOS app to teach and preserve the Mam indigenous language for 300+ university students, with a multilingual translation system integrated via APIs and JSON.",
          es: "App iOS para enseñar y preservar el idioma mam para más de 300 estudiantes universitarios, con sistema de traducción multilenguaje integrado vía APIs y JSON.",
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
      },
      {
        name: "Academic Management API",
        summary: {
          en: "Academic Management is a REST API designed for educational institutions that need to centralize academic and administrative processes with a maintainable and secure architecture.",
          es: "Academic Management es una API REST diseñada para instituciones educativas que necesitan centralizar los procesos académicos y administrativos con una arquitectura mantenible y segura.",
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
      },
      {
        name: "FDN Computer Lab Access System",
        summary: {
          en: "Access-control system processing 500+ monthly lab entries, with Java backend, user authentication, access logging and PostgreSQL query optimization.",
          es: "Sistema de control de acceso que procesa más de 500 entradas mensuales al laboratorio, con backend Java, autenticación, registro de accesos y optimización de consultas en PostgreSQL.",
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

export { ProjectRepository, DESKTOP_TYPE, MOBILE_TYPE, BACKEND_TYPE };
