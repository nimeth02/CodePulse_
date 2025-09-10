import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useProject } from "context/ProjectContext";
import { useTeamData } from "../hooks/useTeamData";

export const CreateTeam: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const { handleCreateTeam: createTeam, isTeamLoading } = useTeamData();
  const { project } = useProject();
  const projectId = project?.projectId || "";
  const queryClient = useQueryClient();

  const handleCreateTeam = async () => {
    await createTeam(teamName, teamDescription);
    setTeamName("");
    setTeamDescription("");

    // 🔥 this refreshes TeamSelector immediately
    queryClient.invalidateQueries({ queryKey: ["teams", projectId] });
  };

  return (
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
          disabled={isTeamLoading || !teamName.trim()}
        >
          {isTeamLoading ? "Creating..." : "Create Team"}
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
