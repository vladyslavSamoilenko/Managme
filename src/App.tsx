import React, { useState, useEffect } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import ProjectSelector from "./components/ProjectSelector";
import StoryForm from "./components/StoryForm";
import StoryList from "./components/StoryList";
import { UserAPI } from "./api/UserAPI";
import { ActiveProjectAPI } from "./api/ActiveProjectAPI";
import { TaskAPI } from "./api/TaskAPI";
import {TaskForm } from "./components/TaskForm";
import { TaskDetails } from "./components/TaskDetails";
import type { Task } from "./models/Task";


export default function App() {
  const user = UserAPI.getLoggedUser();
  // reload trigger for all lists
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [reload, setReload] = useState(false);
  const triggerReload = () => setReload(r => !r);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  // active project
  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    ActiveProjectAPI.getActiveProject()
  );
  const handleProjectChange = (id: string) => {
    ActiveProjectAPI.setActiveProject(id);
    setActiveProjectId(id);
    triggerReload();
  };

  // tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
  // вариант с then()
  TaskAPI.getAll()
    .then(fetched => setTasks(fetched))
    .catch(err => console.error("Failed to load tasks:", err));
}, [reload]);

  const sections = [
    { key: "todo", title: "To Do" },
    { key: "doing", title: "Doing" },
    { key: "done", title: "Done" }
  ];

  // card CRUD handlers
  const handleDelete = (id: string) => {
    TaskAPI.delete(id);
    if (selectedTaskId === id) setSelectedTaskId(null);
    triggerReload();
  };
  const handleSelect = (id: string) => setSelectedTaskId(id);

  return (
    <div className={`app-container ${theme}`} style={{ maxWidth: 960, margin: "0 auto", padding: 24, color: "white", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: 24,  display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ textAlign: "center", fontSize: 28 }}>ManagMe</h1>
        {/* ♦ 3) кнопка переключения темы */}
        <button onClick={toggleTheme} style={{ cursor: "pointer", padding: "0.5rem 1rem" }}>
          {theme === "dark" ? "🌞 Day" : "🌙 Night"}
        </button>
        <p style={{ textAlign: "right", opacity: 0.7 }}>
          {user.firstName} {user.lastName}
        </p>
      </header>

      {/* Projects & Stories */}
      <section style={{ marginBottom: 32 }}>
        <ProjectSelector value={activeProjectId} onChange={handleProjectChange} />
        <ProjectForm onSave={triggerReload} />
        <ProjectList reload={reload} />
        <hr style={{ margin: "32px 0", borderColor: "#555" }} />
        <h2 style={{ marginBottom: 16 }}>Stories</h2>
        <StoryForm projectId={activeProjectId} onAdd={triggerReload} />
        <StoryList projectId={activeProjectId} key={reload.toString()} />
      </section>

      {/* Tasks Section */}
      <section>
        <h2 style={{ marginBottom: 16 }}>Tasks</h2>
        <TaskForm onAdded={() => triggerReload()} />

        <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
          {/* Board */}
          <div style={{ flex: 3, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {sections.map(sec => (
              <div key={sec.key} style={{ background: "#111", borderRadius: 8, padding: 16, minHeight: 200 }}>
                <h3 style={{ marginTop: 0, borderBottom: "1px solid #333", paddingBottom: 8 }}>{sec.title}</h3>
                {tasks.filter(t => t.state === sec.key).map(t => (
                  <div
                    key={t.id}
                    onClick={() => handleSelect(t.id)}
                    style={{
                      background: selectedTaskId === t.id ? "#333" : "#222",
                      padding: 12,
                      borderRadius: 4,
                      marginTop: 8,
                      cursor: "pointer",
                    }}
                  >
                    <strong style={{ display: "block", marginBottom: 4 }}>{t.name}</strong>
                    <p style={{ margin: 0, fontSize: 13, color: "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.description}
                    </p>
                    <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <button onClick={e => { e.stopPropagation(); TaskAPI.assign(t.id, user.id); triggerReload(); }} style={{ fontSize: 12 }}>Assign</button>
                      <button onClick={e => { e.stopPropagation(); TaskAPI.complete(t.id); triggerReload(); }} style={{ fontSize: 12 }}>Complete</button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(t.id); }} style={{ fontSize: 12 }}>Delete</button>
                    </div>
                  </div>
                ))}
                {tasks.filter(t => t.state === sec.key).length === 0 && (
                  <p style={{ opacity: 0.6, textAlign: "center", marginTop: 16 }}>No tasks</p>
                )}
              </div>
            ))}
          </div>

          {/* Details */}
          <div style={{ flex: 2, background: "#111", borderRadius: 8, padding: 16, minHeight: 200 }}>
            {selectedTaskId ? (
              <TaskDetails id={selectedTaskId} />
            ) : (
              <p style={{ opacity: 0.6, textAlign: "center", marginTop: 80 }}>Select a task</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
