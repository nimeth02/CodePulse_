import { getProjectData, projectData } from "../services/ProjectService";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext<{
    project: projectData | null;
    setProject: React.Dispatch<React.SetStateAction<projectData | null>>;
  } | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [project, setProject] = useState<projectData | null>(null);

    useEffect(()=>{
        const fetchData=async()=>{
            const projectResponse= await getProjectData("6C0F9FBA-F6A4-44E6-9C52-10B251C1D777")
            setProject(projectResponse)
        }
        fetchData()
    },[])

  return (
    <ProjectContext.Provider value={{ project, setProject}}>
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