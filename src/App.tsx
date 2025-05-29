import { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

function App() {
  const [reload, setReload] = useState(false);

  const handleSave = () => {
    setReload(!reload);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>ManagMe</h1>

      <ProjectForm onSave={handleSave} />
      <ProjectList key={reload.toString()} />
    </div>
  );
}

export default App;
