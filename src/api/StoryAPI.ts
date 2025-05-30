import type { Story } from "../models/Story";

const STORAGE_KEY = "stories";

export class StoryAPI {
  static getAll(): Story[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getByProject(projectId: string): Story[] {
    return this.getAll().filter(s => s.projectId === projectId);
  }

  static save(story: Story): void {
    const stories = this.getAll();

    const alreadyExists = stories.some(
      (s) =>
        s.name.trim().toLowerCase() === story.name.trim().toLowerCase() &&
        s.projectId === story.projectId
    );

    if (alreadyExists) return;

    stories.push(story);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  static update(updated: Story): void {
    const stories = this.getAll().map(s => s.id === updated.id ? updated : s);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  static delete(id: string): void {
    const stories = this.getAll().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

   static getById(id: string): Story | null {
    const stories = this.getAll();
    return stories.find(s => s.id === id) || null;
  }
}