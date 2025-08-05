import { getProjectData, projectData } from "../services/ProjectService";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext<
  | {
      project: projectData;
      setProject: React.Dispatch<React.SetStateAction<projectData>>;
    }
  | undefined
>(undefined);

const initialProject: projectData = {
  projectId: "6c0f9fba-f6a4-44e6-9c52-10b251c1d777",
  projectName: "",
  projectCode: "",
  providerType: "",
  projectCreatedAt: "",
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [project, setProject] = useState<projectData>(initialProject);

  useEffect(() => {
    const fetchData = async () => {
      const projectResponse = await getProjectData(project.projectId);
      setProject(projectResponse);
    };
    fetchData();
  }, []);

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
