import type { Project } from "../models/Project";

const STORAGE_KEY = "projects";

export class ProjectAPI {
  static getAll(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static save(project: Project): void {
    const projects = this.getAll();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static delete(id: string): void {
    const projects = this.getAll().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
  
  static update(updated: Project): void {
  const projects = this.getAll().map((p) => (p.id === updated.id ? updated : p));
  localStorage.setItem("projects", JSON.stringify(projects));
}
}