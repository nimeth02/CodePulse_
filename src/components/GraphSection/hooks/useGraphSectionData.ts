import { useState } from "react";
import { GraphType } from "../Types/GraphType";
import { useProject } from "context/ProjectContext";
import { TeamData } from "../../../services/TeamConfigurationService";

export const useGraphSection = () => {
  const {project} =useProject()

    const [activeTab, setActiveTab] = useState<GraphType>('closed');
    const [selectedTeam, setSelectedTeam] = useState<TeamData>({teamId:project.projectId  , teamName: "All Teams",isDefault:true,description:"project",nodeId:""});
    const [selectedTime, setSelectedTime] = useState(2025);
  
    return { activeTab, setActiveTab, selectedTeam, setSelectedTeam,selectedTime, setSelectedTime  };
  };