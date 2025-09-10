import React from "react";
import { TeamSelectorProps } from "../Types/SelectorTypes";
// import { useTeamData } from "../hooks/useTeamData";
import { useTeams } from "../hooks/useTeamData";
import { useProject } from "context/ProjectContext";
import { TeamData } from "../../../services/TeamConfigurationService";

const TeamSelector = ({
  selectedTeam,
  setSelectedTeam,
}: TeamSelectorProps) => {
  const { project } = useProject();

  const { data: fetchedTeams = [], error, isLoading } = useTeams();

  const teams = [
    {
      teamId: project.projectId,
      teamName: "All Teams",
      isDefault: true,
      description: "project",
      nodeId: "",
    },
    ...fetchedTeams,
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = e.target.value;
    const team = teams.find((t) => t.teamId === teamId);
    if(team){
    setSelectedTeam(team);
    }
  };
  

  return (
    <select
      className="team-select"
      value={selectedTeam.teamId}
      onChange={handleChange}
      aria-label="Select team for graph data"
    >
      {teams.map((team: TeamData) => (
        <option key={team.teamId} value={team.teamId}>
          {team.teamName}
        </option>
      ))}
    </select>
  );
};

export default React.memo(TeamSelector);
