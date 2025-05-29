import { useState } from "react";
import type { Story, Priority, StoryState } from "../models/Story";
import { StoryAPI } from "../api/StoryAPI";
import { UserAPI } from "../api/UserAPI";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onAdd: () => void;
  projectId: string | null;
}

export default function StoryForm({ onAdd, projectId }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("średni");
  const [state, setState] = useState<StoryState>("todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = UserAPI.getLoggedUser();
    if (!projectId) return;

    const newStory: Story = {
      id: uuidv4(),
      name,
      description,
      priority,
      state,
      createdAt: new Date().toISOString(),
      projectId,
      ownerId: user.id,
    };

    StoryAPI.save(newStory);
    setName("");
    setDescription("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="Nazwa historyjki"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
        <option value="niski">Niski</option>
        <option value="średni">Średni</option>
        <option value="wysoki">Wysoki</option>
      </select>
      <select value={state} onChange={(e) => setState(e.target.value as StoryState)}>
        <option value="todo">Do zrobienia</option>
        <option value="doing">W trakcie</option>
        <option value="done">Zrobione</option>
      </select>
      <button type="submit" style={{ background: "green", color: "white", padding: "0.5rem" }}>
        Dodaj historyjkę
      </button>
    </form>
  );
}