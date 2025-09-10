import React, { useState } from "react";
import "./TeamConfigurations.scss";
import { useTeamMembershipData } from "./hooks/useTeamMembershipData";
import { Button } from "@mui/material";
import { TeamData } from "@services/TeamConfigurationService";
import { toggle } from "./types";
import CreateTeam from "./components/CreateTeam";
import { useTeams } from "../../components/GraphSection/hooks/useTeamData";
import EditTeam from "./components/EditTeam";
import DeleteTeam from "./components/DeleteTeam";
import { useQueryClient } from "@tanstack/react-query";
import DialogBox from "../../components/Common/DialogBox/Dialogbox";
import { useTeamData } from "./hooks/useTeamData";
import { useProject } from "context/ProjectContext";

export const TeamConfigurations: React.FC = () => {
  const [toggle, setToggle] = useState<toggle>("create");
  const [selectedTeam, setSelectedTeam] = useState<TeamData>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const [deleteTeamMemberDialogOpen, setDeleteTeamMemberDialogOpen] =
    useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string>("");
  const [memberNameToDelete, setMemberNameToDelete] = useState<string>("");
  const [deleteTeamDialogOpen, setDeleteTeamDialogOpen] = useState(false);

  const {
    teamMembers,
    nonTeamMembers,
    handleAddToTeam,
    handleDeleteTeamMembership,
  } = useTeamMembershipData(selectedTeam, selectedUsers, setSelectedUsers);
  const { data: teams = [], error, isLoading } = useTeams();
  const { handleDeleteTeam: deleteTeam, isTeamLoading } = useTeamData();
  const { project } = useProject();

  const queryClient = useQueryClient();
  const projectId = project?.projectId || "";

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(teams.find((t: TeamData) => t.teamId == event.target.value));
    setSelectedTeam(
      teams.find((t: TeamData) => t.teamId == event.target.value)
    );
    setToggle("create");
  };

  const handleDeleteTeamClick = () => {
    setDeleteTeamDialogOpen(true);
  };

  const handleDeleteTeam = async () => {
    if (selectedTeam?.teamId) {
      await deleteTeam(selectedTeam.teamId);
      setDeleteTeamDialogOpen(false);

      queryClient.invalidateQueries({ queryKey: ["teams", projectId] });
    }
  };

  const handleDeleteMemberClick = (userId: string, userName: string) => {
    setMemberToDelete(userId);
    setMemberNameToDelete(userName);
    setDeleteTeamMemberDialogOpen(true);
  };

  const handleDeleteMember = async () => {
    if (selectedTeam?.teamId && memberToDelete) {
      await handleDeleteTeamMembership(selectedTeam.teamId, memberToDelete);
      setDeleteTeamMemberDialogOpen(false);
      setMemberToDelete("");
      setMemberNameToDelete("");
    }
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

  return (
    <div className="team-configurations">
      <div className="team-configurations-heading">Team Configurations</div>
      <div className="configurations-content">
        <div className="left-panel">
          <div className="team-section">
            <div className="team-selector">
              <select
                value={selectedTeam?.teamId}
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
                <div className="members-list scrollable">
                  {Array.isArray(teamMembers) &&
                    teamMembers.map((member) => (
                      <div key={member.userId} className="member-item">
                        <div className="member-name">{member.userName}</div>
                        {toggle === "edit" && (
                          <div className="member-actions">
                            <button
                              className="edit-member-btn"
                              title="Delete Member"
                              onClick={() =>
                                handleDeleteMemberClick(
                                  member.userId,
                                  member.userName
                                )
                              }
                            >
                              <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                width="16"
                                height="16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          {selectedTeam?.isDefault == false && (
            <div className="edit-section">
              <Button
                className="create-btn"
                onClick={() => setToggle("edit")}
                disabled={!selectedTeam}
              >
                Edit Team
              </Button>
              <Button
                className="create-btn"
                onClick={handleDeleteTeamClick}
                disabled={!selectedTeam}
                color="error"
              >
                Delete Team
              </Button>
            </div>
          )}
        </div>
        {selectedTeam?.isDefault == true ? (
          <div className="right-panel">
            This is provider default team. you dont have permisiion to edit that
          </div>
        ) : (
          <div className="right-panel">
            <div className="available-users-heading">Available Users</div>
            <div className="users-list scrollable">
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
        )}
      </div>
      {toggle == "create" ? <CreateTeam /> : ""}
      {toggle == "edit" && selectedTeam ? (
        <EditTeam selectedTeam={selectedTeam} />
      ) : (
        ""
      )}

      <DialogBox
        open={deleteTeamMemberDialogOpen}
        title="Remove Team Member"
        message={
          <>
            Are you sure you want to remove{" "}
            <strong>{memberNameToDelete}</strong> from this team?
          </>
        }
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={handleDeleteMember}
        onCancel={() => setDeleteTeamMemberDialogOpen(false)}
      />

      <DialogBox
        open={deleteTeamDialogOpen}
        title="Delete Team"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong>{selectedTeam?.teamName}</strong> team?
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteTeam}
        onCancel={() => setDeleteTeamDialogOpen(false)}
      />
    </div>
  );
};

export default TeamConfigurations;
