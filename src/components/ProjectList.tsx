import { useEffect, useState } from "react";
import { ProjectAPI } from "../api/ProjectAPI";
import type { Project } from "../models/Project";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const loadProjects = () => {
    setProjects(ProjectAPI.getAll());
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = (id: string) => {
    ProjectAPI.delete(id);
    loadProjects();
  };

  const startEdit = (project: Project) => {
    setEditId(project.id);
    setEditName(project.name);
    setEditDesc(project.description);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditDesc("");
  };

  const confirmEdit = () => {
    if (!editId) return;
    ProjectAPI.update({ id: editId, name: editName, description: editDesc });
    cancelEdit();
    loadProjects();
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {projects.map((project) =>
        project.id === editId ? (
          <li key={project.id} style={{ marginBottom: "1rem" }}>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nazwa"
              style={{ padding: "0.5rem", marginRight: "0.5rem" }}
            />
            <input
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Opis"
              style={{ padding: "0.5rem", marginRight: "0.5rem" }}
            />
            <button onClick={confirmEdit} style={{ marginRight: "0.5rem" }}>💾 Zapisz</button>
            <button onClick={cancelEdit}>❌ Anuluj</button>
          </li>
        ) : (
          <li
            key={project.id}
            style={{
              padding: "0.75rem",
              marginBottom: "0.75rem",
              background: "#333",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{project.name}</strong>: {project.description}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => startEdit(project)}
                style={{
                  background: "#2196f3",
                  color: "white",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ✏️ Edytuj
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                style={{
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                🗑️ Usuń
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
}