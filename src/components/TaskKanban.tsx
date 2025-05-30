import React, { useEffect, useState } from "react";
import { TaskAPI } from "../api/TaskAPI";
import type { Task } from "../models/Task";

export default function TaskKanban() {
  const [tasks, setTasks] = useState<Task[]>([]);

 useEffect(() => {
  // загружаем асинхронно
  TaskAPI.getAll().then(fetched => {
    setTasks(fetched);
  }).catch(err => {
    console.error("Failed to load tasks", err);
  });
}, []);

  const byState = {
    todo: tasks.filter(t => t.state === "todo"),
    doing: tasks.filter(t => t.state === "doing"),
    done: tasks.filter(t => t.state === "done"),
  };

  return (
    <div className="flex gap-4">
      {(["todo","doing","done"] as const).map(state => (
        <div key={state} className="flex-1">
          <h2 className="capitalize mb-2">
            {state === "todo" ? "To Do" : state === "doing" ? "Doing" : "Done"}
          </h2>
          <div className="space-y-2">
            {byState[state].map(task => (
              <div key={task.id} className="p-4 bg-gray-800 rounded">
                <h3 className="font-bold">{task.name}</h3>
                <p className="text-sm truncate">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}