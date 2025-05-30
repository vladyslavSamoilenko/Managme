import React, { useEffect, useState } from "react";
import { TaskAPI } from "../api/TaskAPI";
import { StoryAPI } from "../api/StoryAPI";
import { UserAPI } from "../api/UserAPI";
import type { Task } from "../models/Task";

interface Props { id: string; }
export function TaskDetails({ id }: Props) {
   const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    TaskAPI.getById(id)
      .then(fetched => {
        if (!cancelled) setTask(fetched);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>Task not found</p>;

  const handleAssign = async (userId: string) => {
    await TaskAPI.assign(id, userId);
    const updated = await TaskAPI.getById(id);
    setTask(updated);
  };

  const handleComplete = async () => {
    await TaskAPI.complete(id);
    const updated = await TaskAPI.getById(id);
    setTask(updated);
  };

  const assignedName = task.assignedUserId ? UserAPI.getById(task.assignedUserId)?.lastName : "Unassigned";

  return (
    <div className="p-4 bg-gray-900 rounded">
      <h2 className="text-xl font-bold mb-2">{task.name}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Story:</strong> {StoryAPI.getById(task.storyId)?.name}</p>
      <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      {task.startedAt && <p><strong>Started:</strong> {new Date(task.startedAt).toLocaleString()}</p>}
      {task.completedAt && <p><strong>Completed:</strong> {new Date(task.completedAt).toLocaleString()}</p>}
      <p><strong>Assigned to:</strong> {assignedName}</p>
      <div className="mt-4 space-x-2">
        <select value={task.assignedUserId || ""} onChange={e => handleAssign(e.target.value)}>
          <option value="">Assign...</option>
          {UserAPI.getAll().map(u => (
            <option key={u.id} value={u.id}>{u.lastName}</option>
          ))}
        </select>
        <button
          onClick={handleComplete}
          disabled={task.state === "done"}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Mark Done
        </button>
      </div>
    </div>
  );
}