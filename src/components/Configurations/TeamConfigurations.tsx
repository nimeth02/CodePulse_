import React, { useState } from "react";
import "./TeamConfigurations.scss";
import { useTeamConfiguration } from "./hooks/useTeamConfigurations";
import { Button, TextField } from "@mui/material";



export const TeamConfigurations: React.FC = () => {
  console.log("Team Configurations");
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const {
    teams,
    teamMembers,
    nonTeamMembers,
    isLoading,
    error,
    handleAddToTeam,
    handleCreateTeam: createTeam,
  } = useTeamConfiguration(
    selectedTeam,
    selectedUsers,
    setSelectedUsers
  );

  const handleCreateTeam = async () => {
    await createTeam(teamName, teamDescription);
    setTeamName("");
    setTeamDescription("");
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  const handleUserSelect = (userId: string) => {
    console.log(userId);
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  if (isLoading && teams.length === 0) {
    return <div className="team-configurations">Loading...</div>;
  }

  if (error) {
    return <div className="team-configurations error">{error}</div>;
  }

  return (
    <div className="team-configurations">
      <div className="team-configurations-heading">Team Configurations</div>
      <div className="configurations-content">
        <div className="left-panel">
          <div className="team-selector">
            <select
              value={selectedTeam}
              onChange={handleTeamChange}
              className="team-select"
            >
              <option value="">Select a team</option>
              {Array.isArray(teams) &&
                teams.map((team) => (
                  <option key={team.teamId} value={team.teamId}>
                    {team.teamName}
                  </option>
                ))}
            </select>
          </div>

          {selectedTeam && (
            <div className="team-members">
              <div className="team-members-heading">Team Members</div>
              <div className="members-list">
                {Array.isArray(teamMembers) &&
                  teamMembers.map((member) => (
                    <div key={member.userId} className="member-item">
                      {member.userName}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="right-panel">
          <div className="available-users-heading">Available Users</div>
          <div className="users-list">
            {Array.isArray(nonTeamMembers) &&
              nonTeamMembers.map((user) => (
                <div
                  key={user.userId}
                  className={`user-item ${
                    selectedUsers.includes(user.userId) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="red-checkbox"
                    checked={selectedUsers.includes(user.userId)}
                    onChange={() => handleUserSelect(user.userId)}
                  />
                  <span>{user.userName}</span>
                </div>
              ))}
          </div>
          {selectedUsers.length > 0 && (
            <Button
              className="add-to-team-btn"
              onClick={handleAddToTeam}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add to Team"}
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className="create-team-container">
          <div className="create-team-heading">Create Team</div>
          <div className="form-container">
            <TextField
              label="Team Name"
              variant="outlined"
              fullWidth
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
            />

            <Button
              className="create-btn"
              onClick={handleCreateTeam}
              disabled={isLoading || !teamName.trim()}
            >
              {isLoading ? "Creating..." : "Create Team"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamConfigurations;
