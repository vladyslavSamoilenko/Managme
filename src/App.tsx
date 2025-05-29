import { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import ProjectSelector from "./components/ProjectSelector";
import StoryForm from "./components/StoryForm";
import StoryList from "./components/StoryList";
import { UserAPI } from "./api/UserAPI";
import { ActiveProjectAPI } from "./api/ActiveProjectAPI";

function App() {
  const user = UserAPI.getLoggedUser();

  const [reload, setReload] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    ActiveProjectAPI.getActiveProject()
  );

  const handleProjectChange = (id: string) => {
    ActiveProjectAPI.setActiveProject(id);
    setActiveProjectId(id);
  };

  const handleSave = () => {
    const current = ActiveProjectAPI.getActiveProject();
    setActiveProjectId(current);
    setReload(!reload);
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>ManagMe</h1>

      {/* 👤 Mockowany użytkownik */}
      <p style={{ textAlign: "right", fontStyle: "italic" }}>
        Zalogowany jako: {user.firstName} {user.lastName}
      </p>

      {/* 🔽 Wybór aktywnego projektu */}
      <ProjectSelector value={activeProjectId} onChange={handleProjectChange} />

      {/* ➕ Dodawanie nowego projektu */}
      <ProjectForm onSave={handleSave} />

      {/* 📋 Lista projektów */}
      <ProjectList reload={reload} />

      <hr style={{ margin: "2rem 0", borderColor: "#444" }} />

      {/* 📝 Dodawanie i przeglądanie historyjek */}
      <h2>Historyjki projektu</h2>
      <StoryForm
        projectId={activeProjectId}
        onAdd={() => setReload(!reload)}
      />
      <StoryList projectId={activeProjectId} key={reload.toString()} />
    </div>
  );
}

export default App;
