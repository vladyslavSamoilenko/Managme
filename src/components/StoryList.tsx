import { useEffect, useState } from "react";
import { StoryAPI } from "../api/StoryAPI";
import type { Story } from "../models/Story";

interface Props {
  projectId: string | null;
}

export default function StoryList({ projectId }: Props) {
  const [stories, setStories] = useState<Story[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ name: string; description: string }>({ name: "", description: "" });

  const loadStories = () => {
    if (projectId) {
      const data = StoryAPI.getByProject(projectId);
      setStories(data);
    }
  };

  useEffect(() => {
  if (projectId) {
    const data = StoryAPI.getByProject(projectId);
    setStories(data);
  }
}, [projectId]);

  const handleDelete = (id: string) => {
    StoryAPI.delete(id);
    loadStories();
  };

  const startEdit = (story: Story) => {
    setEditId(story.id);
    setEditData({ name: story.name, description: story.description });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", description: "" });
  };

  const confirmEdit = () => {
    const story = stories.find(s => s.id === editId);
    if (!story) return;

    StoryAPI.update({
      ...story,
      name: editData.name,
      description: editData.description,
    });

    cancelEdit();
    loadStories();
  };

  const filteredByState = {
    todo: stories.filter((s) => s.state === "todo"),
    doing: stories.filter((s) => s.state === "doing"),
    done: stories.filter((s) => s.state === "done"),
  };

  if (!projectId) {
    return <p style={{ color: "#aaa" }}>Brak wybranego projektu.</p>;
  }

  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
      {(["todo", "doing", "done"] as const).map((state) => (
        <div key={state} style={{ flex: 1 }}>
          <h3 style={{ textTransform: "capitalize" }}>
            {state === "todo" ? "Do zrobienia" : state === "doing" ? "W trakcie" : "Zrobione"}
          </h3>

          {filteredByState[state].map((s) =>
            editId === s.id ? (
              <div
                key={s.id}
                style={{
                  background: "#444",
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                  borderRadius: "4px",
                }}
              >
                <input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Nazwa"
                />
                <br />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Opis"
                />
                <br />
                <button onClick={confirmEdit} style={{ marginRight: "0.5rem" }}>💾 Zapisz</button>
                <button onClick={cancelEdit}>❌ Anuluj</button>
              </div>
            ) : (
              <div
                key={s.id}
                style={{
                  background: "#333",
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                  borderRadius: "4px",
                }}
              >
                <strong>{s.name}</strong>
                <br />
                {s.description}
                <br />
                <small>Priorytet: {s.priority}</small>
                <br />
                <button onClick={() => startEdit(s)} style={{ marginRight: "0.5rem" }}>
                  ✏️ Edytuj
                </button>
                <button onClick={() => handleDelete(s.id)}>🗑 Usuń</button>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
