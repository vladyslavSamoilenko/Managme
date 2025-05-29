import { useState } from "react";
import type { Project } from "../models/Project";
import { ProjectAPI } from "../api/ProjectAPI";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSave: () => void;
}

export default function ProjectForm({ onSave }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: uuidv4(),
      name,
      description,
    };
    ProjectAPI.save(newProject);
    setName("");
    setDescription("");
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nazwa"
        required
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Opis"
        required
        rows={3}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        Dodaj projekt
      </button>
    </form>
  );
}