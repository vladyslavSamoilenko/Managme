import type { Task } from "../models/Task";

const BASE = import.meta.env.VITE_API_URL;

export class TaskAPI {
  static async getAll(): Promise<Task[]> {
    const res = await fetch(`${BASE}/tasks`);
    return res.json();
  }

  static async getById(id: string): Promise<Task> {
    const res = await fetch(`${BASE}/tasks/${id}`);
    return res.json();
  }

  static async create(
  data: Omit<
    Task,
    "id" | "state" | "createdAt" | "startedAt" | "completedAt" | "assignedUserId" | "spentHours"
  >
    ) : Promise<Task> {
  const res = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

  static async update(task: Task): Promise<Task> {
    const res = await fetch(`${BASE}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    return res.json();
  }

  static async delete(id: string): Promise<void> {
    await fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
  }

  static async assign(id: string, userId: string): Promise<Task> {
    const task = await TaskAPI.getById(id);
    const updated: Task = {
      ...task,
      state: 'doing',
      assignedUserId: userId,
      startedAt: task.startedAt || new Date().toISOString(),
    };
    return TaskAPI.update(updated);
  }

  static async complete(id: string): Promise<Task> {
    const task = await TaskAPI.getById(id);
    const updated: Task = {
      ...task,
      state: 'done',
      completedAt: new Date().toISOString(),
    };
    return TaskAPI.update(updated);
  }
}