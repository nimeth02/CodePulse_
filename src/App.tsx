import { ProjectProvider } from "context/ProjectContext";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ErrorBoundary from "components/Common/ErrorBoundaries/ErrorBoundary";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create query client instance
const queryClient = new QueryClient();
function App() {
  return (
<QueryClientProvider client={queryClient}>
      <ProjectProvider>
        <div className="App">
          <Layout />
        </div>
      </ProjectProvider>
      </QueryClientProvider>

  );
}

export default App;
