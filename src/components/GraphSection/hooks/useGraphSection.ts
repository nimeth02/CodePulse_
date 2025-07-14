import { useState } from "react";
import { GraphType } from "../Types/GraphType";
import { TeamData } from "../../../services/ProjectTeams";

export const useGraphSection = (projectId:string) => {
    const [activeTab, setActiveTab] = useState<GraphType>('closed');
    const [selectedTeam, setSelectedTeam] = useState<TeamData>({teamId:projectId , teamName: "Project"});
    const [selectedTime, setSelectedTime] = useState(2025);
  
    return { activeTab, setActiveTab, selectedTeam, setSelectedTeam,selectedTime, setSelectedTime  };
  };