import { useEffect, useState } from "react";
import { StoryAPI } from "../api/StoryAPI";
import type { Story } from "../models/Story";

interface Props {
  projectId: string | null;
}

export default function StoryList({ projectId }: Props) {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    if (projectId) {
      const data = StoryAPI.getByProject(projectId);
      setStories(data);
    }
  }, [projectId]);

  if (!projectId) {
    return <p style={{ color: "#aaa" }}>Brak wybranego projektu.</p>;
  }

  const filteredByState = {
    todo: stories.filter((s) => s.state === "todo"),
    doing: stories.filter((s) => s.state === "doing"),
    done: stories.filter((s) => s.state === "done"),
  };

  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
      {(["todo", "doing", "done"] as const).map((state) => (
        <div key={state} style={{ flex: 1 }}>
          <h3 style={{ textTransform: "capitalize" }}>
            {state === "todo"
              ? "Do zrobienia"
              : state === "doing"
              ? "W trakcie"
              : "Zrobione"}
          </h3>
          {filteredByState[state].map((s) => (
            <div
              key={s.id}
              style={{
                background: "#333",
                margin: "0.5rem 0",
                padding: "0.5rem",
                borderRadius: "4px",
              }}
            >
              <strong>{s.name}</strong>
              <br />
              {s.description}
              <br />
              <small>Priorytet: {s.priority}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}