import { getProjectData, projectData } from "../services/ProjectService";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext<
  | {
      project: projectData;
      setProject: React.Dispatch<React.SetStateAction<projectData>>;
    }
  | undefined
>(undefined);


const queryParams = new URLSearchParams(window.location.search);
const projectIdFromQuery = queryParams.get("projectId") ?? "";

const initialProject: projectData = {
  projectId:projectIdFromQuery,
  projectName: "",
  projectCode: "",
  providerType: "",
  projectCreatedAt: "",
};



export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [project, setProject] = useState<projectData>(initialProject);
  const [error, setError] = useState<string | null>(null);
  
  // const projectId = window.location.pathname.split("/").pop();
  // console.log(projectId)

  useEffect(() => {
    const fetchData = async () => {
      if (!project.projectId) {
        setError("Project ID is missing in the URL.");
        return;
      }

      try {
        const projectResponse = await getProjectData(project.projectId);
        if (!projectResponse) {
          throw new Error("Project not found");
        }
        setProject(projectResponse);
      } catch (err) {
        console.error("Failed to fetch project data:", err);
        setError("Invalid or missing project ID.");
      }
    };

    fetchData();
  }, [project.projectId]);

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
