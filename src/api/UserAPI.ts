import type { User } from "../models/User";

const users: User[] = [
  { id: "u1", firstName: "Anna", lastName: "Admin", role: "admin" },
  { id: "u2", firstName: "Daniel", lastName: "Devops", role: "devops" },
  { id: "u3", firstName: "Daria", lastName: "Developer", role: "developer" },
];

export class UserAPI {
  static getLoggedUser(): User {
    return users[0]; // 👈 admin jako zalogowany
  }

  static getAll(): User[] {
    return users;
  }

  static getById(id: string): User | undefined {
    return users.find(u => u.id === id);
  }
}