import { useEffect, useState } from "react";
import { ProjectAPI } from "../api/ProjectAPI";
import type { Project } from "../models/Project";

interface Props {
  value: string | null;
  onChange: (id: string) => void;
}

export default function ProjectSelector({ value, onChange }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(ProjectAPI.getAll());
  }, []);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Aktualny projekt:&nbsp;</label>
      <select value={value || ""} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>-- wybierz projekt --</option>
        {projects.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
    </div>
  );
}