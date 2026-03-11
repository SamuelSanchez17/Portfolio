import {
  ProjectRepository,
  DESKTOP_TYPE,
  MOBILE_TYPE,
  BACKEND_TYPE,
  FRONTEND_TYPE,
} from "./repository.js";

/**
 * @typedef {import('./repository.js').Project} Project
 * @typedef {import('./repository.js').GithubInfo} GithubInfo
 */

/**
 * @typedef {Object} EnrichedProject
 * @property {string} name
 * @property {import('./repository.js').ProjectSummary} summary
 * @property {import('./repository.js').ProjectLink[]} links
 * @property {string[]} techStack
 * @property {string} type
 * @property {GithubInfo} githubInfo
 */

class ProjectService {
  constructor() {
    this.repository = new ProjectRepository();
  }

  /**
   * Adds live GitHub stats to a project (non-blocking — falls back to nulls).
   * @param {Project} project
   * @returns {Promise<EnrichedProject>}
   */
  async enrich(project) {
    const githubInfo = await this.repository.fetchGithubInfo(
      project.githubUsername,
      project.githubRepositoryName
    );
    return { ...project, githubInfo };
  }

  /**
   * Returns all projects enriched with GitHub data.
   * Fetches are made in parallel.
   * @returns {Promise<EnrichedProject[]>}
   */
  async getAllEnriched() {
    const projects = this.repository.getAllProjects();
    return Promise.all(projects.map((p) => this.enrich(p)));
  }

  /**
   * @param {EnrichedProject[]} projects
   * @param {string} type  — "all" | "desktop" | "mobile" | "backend" | "frontend"
   * @returns {EnrichedProject[]}
   */
  filterByType(projects, type) {
    if (type === "all") return projects;
    return projects.filter((p) => p.type === type);
  }
}

export { ProjectService };
