const simpleIcon = (slug, alt) => `
<img
  src="https://cdn.simpleicons.org/${slug}"
  onerror="this.onerror=null;this.src='https://cdn.simpleicons.org/simpleicons';"
  alt="${alt}"
  aria-hidden="true"
  loading="lazy"
  decoding="async"
/>
`;

const externalIcon = (url, alt, fallbackSlug = "simpleicons") => `
<img
  src="${url}"
  onerror="this.onerror=null;this.src='https://cdn.simpleicons.org/${fallbackSlug}';"
  alt="${alt}"
  aria-hidden="true"
  loading="lazy"
  decoding="async"
/>
`;

const mono = (slug, alt) => simpleIcon(slug, alt);

export const DEFAULT_TECH_ICON = simpleIcon("simpleicons", "Technology");

export const TECH_ICONS = {
  JAVA: externalIcon("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", "Java", "openjdk"),
  SWIFT: mono("swift", "Swift"),
  JAVASCRIPT: mono("javascript", "JavaScript"),
  TYPESCRIPT: mono("typescript", "TypeScript"),
  RUST: mono("rust", "Rust"),
  SQL: mono("postgresql", "SQL"),
  SPRING_BOOT: mono("springboot", "Spring Boot"),
  REACT: mono("react", "React"),
  VUE: mono("vuedotjs", "Vue.js"),
  ANGULAR: mono("angular", "Angular"),
  TAILWIND_CSS: mono("tailwindcss", "Tailwind CSS"),
  POSTGRESQL: mono("postgresql", "PostgreSQL"),
  MYSQL: mono("mysql", "MySQL"),
  SQLITE: mono("sqlite", "SQLite"),
  GIT: mono("git", "Git"),
  JIRA: mono("jira", "Jira"),
  REST_APIS: mono("simpleicons", "REST APIs"),
  AGILE: mono("simpleicons", "Agile"),
  FIGMA: mono("figma", "Figma"),
};
