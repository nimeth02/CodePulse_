import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  EditTeamPayload,
  TeamConfigurationService,
  TeamData,
  TeamUserData,
} from "../../../services/TeamConfigurationService";
import { useProject } from "context/ProjectContext";

export const useTeamData = () => {
  const { project } = useProject();
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [isTeamLoading, setIsTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState<string | null>(null);

  const projectId = project?.projectId || "";

  useEffect(() => {
    loadTeams();
  }, [projectId]);

  const loadTeams = async () => {
    try {
      setIsTeamLoading(true);
      setTeamError(null);
      const teamsData = await TeamConfigurationService.getTeams(projectId);
      setTeams(Array.isArray(teamsData) ? teamsData : []);
    } catch (error) {
      console.error("Error loading teams:", error);
      setTeamError("Failed to load teams");
      setTeams([]);
    } finally {
      setIsTeamLoading(false);
    }
  };

  const handleCreateTeam = async (
    teamName: string,
    description: string = ""
  ) => {
    try {
      setIsTeamLoading(true);
      setTeamError(null);

      if (!teamName.trim()) {
        throw new Error("Team name is required");
      }

      await TeamConfigurationService.createTeam(
        projectId,
        teamName,
        description
      );
      await loadTeams(); // Reload teams after creating a new one
    } catch (error) {
      console.error("Error creating team:", error);
      setTeamError("Failed to create team");
    } finally {
      setIsTeamLoading(false);
    }
  };

  const handleEditTeam = async (
    teamId: string,
    editTeamPayload: EditTeamPayload
  ) => {
    try {
      setIsTeamLoading(true);
      setTeamError(null);

      await TeamConfigurationService.editTeam(teamId, editTeamPayload);
      await loadTeams(); // Reload teams after creating a new one
    } catch (error) {
      console.error("Error creating team:", error);
      setTeamError("Failed to create team");
    } finally {
      setIsTeamLoading(false);
    }
  };

  const handleDeleteTeam = async (
    teamId: string
  ) => {
    try {
      setIsTeamLoading(true);
      setTeamError(null);

      await TeamConfigurationService.deleteTeam(teamId);
      await loadTeams(); // Reload teams after creating a new one
    } catch (error) {
      console.error("Error creating team:", error);
      setTeamError("Failed to create team");
    } finally {
      setIsTeamLoading(false);
    }
  };


//   const handleDeleteTeamMembership = async (
//     teamId: string,
//     userId:string
//   ) => {
//     try {
//       setIsTeamLoading(true);
//       setTeamError(null);

//       await TeamConfigurationService.deleteTeamMembership(teamId,userId);
//  // Reload teams after creating a new one
//     } catch (error) {
//       console.error("Error creating team:", error);
//       setTeamError("Failed to create team");
//     } finally {
//       setIsTeamLoading(false);
//     }
//   };

  return {
    teams,
    isTeamLoading,
    teamError,
    handleCreateTeam,
    handleEditTeam,
    handleDeleteTeam,
    // handleDeleteTeamMembership
  };
};
