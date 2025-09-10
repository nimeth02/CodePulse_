import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useProject } from "context/ProjectContext";
import { useTeamData } from "../hooks/useTeamData";
import { TeamData } from "../../../services/TeamConfigurationService";


interface EditTeamProps {
  selectedTeam: TeamData;
}

export const EditTeam: React.FC<EditTeamProps> = ({ selectedTeam }) => {
  const [teamName, setTeamName] = useState(selectedTeam.teamName);
  const [teamDescription, setTeamDescription] = useState(selectedTeam.description);
  const { handleEditTeam:editTeam, isTeamLoading } = useTeamData();
  const { project } = useProject();
  const projectId = project?.projectId || "";
  const queryClient = useQueryClient();

  const handleEditTeam = async () => {
    const updatedPayload = {
      nodeId: selectedTeam.nodeId,
      teamName,
      description: teamDescription,
      projectId,
      isDefault: selectedTeam.isDefault,
    };

    const updatedTeam = await editTeam(selectedTeam.teamId,updatedPayload);

    setTeamName("");
    setTeamDescription("");

    // 🔥 this refreshes TeamSelector immediately
    queryClient.invalidateQueries({ queryKey: ["teams", projectId] });
  };

  return (
    <div className="create-team-container">
      <div className="create-team-heading">Edit Team</div>
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
          onClick={handleEditTeam}
          disabled={isTeamLoading || !teamName.trim()}
        >
          {isTeamLoading ? "Creating..." : "Edit Team"}
        </Button>
      </div>
    </div>
  );
};

export default EditTeam;