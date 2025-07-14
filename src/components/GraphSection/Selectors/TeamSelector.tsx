import React from "react";
import { TeamData } from "../../../services/ProjectTeams";
import { TeamSelectorProps } from '../Types/SelectorTypes';
import { useTeamData } from "../hooks/useTeamData";

const TeamSelector =({selectedTeam,setSelectedTeam,projectId}: TeamSelectorProps)=>{
  console.log("Team selector")
  const {teamData,error,loading} = useTeamData(projectId)
  

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = e.target.value;
    const teamName = teamData.find(t => t.teamId === teamId)?.teamName || "";
    setSelectedTeam({ teamId, teamName });
  };

  return (
    <select 
      className="team-select"
      value={selectedTeam.teamId}
      onChange={handleChange}
      aria-label="Select team for graph data"
    >
      {teamData.map((team:TeamData) => (
        <option key={team.teamId} value={team.teamId}>
          {team.teamName}
        </option>
      ))}
    </select>
  )
}

export default React.memo(TeamSelector);