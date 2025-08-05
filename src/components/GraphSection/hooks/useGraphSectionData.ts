import { useState } from "react";
import { GraphType } from "../Types/GraphType";
import { TeamData } from "@services/ProjectTeams";
import { useProject } from "context/ProjectContext";

export const useGraphSection = () => {
  const {project} =useProject()

    const [activeTab, setActiveTab] = useState<GraphType>('closed');
    const [selectedTeam, setSelectedTeam] = useState<TeamData>({teamId:project.projectId  , teamName: "Project"});
    const [selectedTime, setSelectedTime] = useState(2025);
  
    return { activeTab, setActiveTab, selectedTeam, setSelectedTeam,selectedTime, setSelectedTime  };
  };