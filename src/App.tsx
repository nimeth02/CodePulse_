import { ProjectProvider } from "context/ProjectContext";
import "./App.css";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <ProjectProvider>
      <div className="App">
        <Layout />
      </div>
    </ProjectProvider>
  );
}

export default App;
