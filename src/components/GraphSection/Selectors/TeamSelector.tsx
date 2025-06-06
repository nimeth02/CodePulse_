import React from "react";
import { TeamData } from "../../../services/ProjectTeams";

const TeamSelector =({selectedTeam,setSelectedTeam,teams}:{selectedTeam:TeamData,setSelectedTeam:(selectedTeam:TeamData)=>void,teams:TeamData[]})=>{
  console.log("Team selector")
return (
    <select 
          className="team-select"
          value={selectedTeam.teamId}
          onChange={(e) => setSelectedTeam({teamId:e.target.value,teamName:teams.find(t=>t.teamId===e.target.value)?.teamName || ""})}
           aria-label="Select team for graph data"
        >
          {teams.map((team:TeamData) => (
            <option key={team.teamId} value={team.teamId}>
              {team.teamName}
            </option>
          ))}
        </select>
)
}

export default React.memo(TeamSelector);