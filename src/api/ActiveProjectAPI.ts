const ACTIVE_PROJECT_KEY = "activeProjectId";

export class ActiveProjectAPI {
  static setActiveProject(id: string) {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  }

  static getActiveProject(): string | null {
    return localStorage.getItem(ACTIVE_PROJECT_KEY);
  }

  static clearActiveProject() {
    localStorage.removeItem(ACTIVE_PROJECT_KEY);
  }
}