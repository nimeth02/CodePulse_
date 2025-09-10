import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useProject } from "context/ProjectContext";
import { useTeamData } from "../hooks/useTeamData";
import { TeamData } from "../../../services/TeamConfigurationService";
import DialogBox from "../../../components/Common/DialogBox/Dialogbox";

interface DeleteTeamProps {
    selectedTeam: TeamData;
  }

export const DeleteTeam: React.FC<DeleteTeamProps> = ({selectedTeam}) => {
  const [teamName, setTeamName] = useState(selectedTeam.teamName);
  const [teamDescription, setTeamDescription] = useState(selectedTeam.description);
  const { handleDeleteTeam: deleteTeam, isTeamLoading } = useTeamData();
  const { project } = useProject();
  const projectId = project?.projectId || "";
  const queryClient = useQueryClient();

  const handleDeleteTeam = async () => {
    await deleteTeam(selectedTeam.teamId);
    setTeamName("");
    setTeamDescription("");

    // 🔥 this refreshes TeamSelector immediately
    queryClient.invalidateQueries({ queryKey: ["teams", projectId] });
  };

  return (
    <div className="create-team-container">
      <div className="create-team-heading">Delete Team</div>
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
          onClick={handleDeleteTeam}
          disabled={isTeamLoading || !teamName.trim()}
        >
          {isTeamLoading ? "Creating..." : "Delete Team"}
        </Button>
      </div>

      
    </div>
  );
};

export default DeleteTeam;