import React, { useState } from "react";
import { TaskAPI } from "../api/TaskAPI";
import type { Task, Priority } from "../models/Task";
import { StoryAPI } from "../api/StoryAPI";

interface Props {
  onAdded?: (task: Task) => void;
}

export function TaskForm({ onAdded }: Props) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [storyId, setStoryId] = useState<string>("");
  const [estimatedHours, setEstimatedHours] = useState<number>(1);

  const handleSubmit = async () => {
    if (!name.trim() || !storyId) return;
    try {
      const newTask = await TaskAPI.create({ name, description, priority, storyId, estimatedHours });
      onAdded?.(newTask);
      // reset form fields
      setName("");
      setDescription("");
      setPriority("medium");
      setStoryId("");
      setEstimatedHours(1);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const stories = StoryAPI.getAll();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        rowGap: "0.75rem",
        width: "100%",
        marginBottom: "1rem",
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #444" }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #444",
          minHeight: "60px",
        }}
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value as Priority)}
        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #444" }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={storyId}
        onChange={e => setStoryId(e.target.value)}
        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #444" }}
      >
        <option value="">Select story</option>
        {stories.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <input
        type="number"
        min={1}
        placeholder="Est. hours"
        value={estimatedHours}
        onChange={e => setEstimatedHours(Number(e.target.value))}
        style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #444" }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "0.75rem",
          borderRadius: "4px",
          background: "#2196f3",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
    </div>
  );
}
