import { useEffect, useState } from "react";
import { Team, TeamMember, User } from "../types";
import {
  TeamConfigurationService,
  TeamData,
  TeamUserData,
} from "../../../services/TeamConfigurationService";

export const useTeamConfiguration = (projectId: string) => {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [availableUsers, setAvailableUsers] = useState<TeamUserData[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<TeamUserData[]>([]);
  const [nonTeamMembers, setNonTeamMembers] = useState<TeamUserData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeams();
    loadUsers();
  }, [projectId]);

  useEffect(() => {
    if (selectedTeam) {
      loadTeamMembers(selectedTeam);
    }
  }, [selectedTeam]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const teamUserData = await TeamConfigurationService.getUsers(projectId);
      setAvailableUsers(Array.isArray(teamUserData) ? teamUserData : []);
    } catch (error) {
      console.error("Error loading teams:", error);
      setError("Failed to load teams");
      setAvailableUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTeams = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const teamsData = await TeamConfigurationService.getTeams(projectId);
      setTeams(Array.isArray(teamsData) ? teamsData : []);
    } catch (error) {
      console.error("Error loading teams:", error);
      setError("Failed to load teams");
      setTeams([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTeamMembers = async (teamId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const members = await TeamConfigurationService.getTeamMembers(teamId);
      const teamMembersArray = Array.isArray(members) ? members : [];
      setTeamMembers(teamMembersArray);

      const teamMemberIds = new Set(
        teamMembersArray.map((member) => member.userId)
      );
      setNonTeamMembers(
        availableUsers.filter((user) => !teamMemberIds.has(user.userId))
      );
    } catch (error) {
      console.error("Error loading team members:", error);
      setError("Failed to load team members");
      setTeamMembers([]);
    } finally {
      setIsLoading(false);
    }
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

  const handleCreateTeam = async (
    teamName: string,
    description: string = ""
  ) => {
    try {
      setIsLoading(true);
      setError(null);

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
      setError("Failed to create team");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToTeam = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (selectedUsers.length === 0) {
        throw new Error("No users selected");
      }

      await TeamConfigurationService.createTeamMember(
        selectedTeam,
        selectedUsers
      );
      loadTeamMembers(selectedTeam);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error adding members to team:", error);
      setError("Failed to add members to team");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teams,
    selectedTeam,
    availableUsers,
    teamMembers,
    nonTeamMembers,
    selectedUsers,
    isLoading,
    error,
    handleTeamChange,
    handleUserSelect,
    handleAddToTeam,
    handleCreateTeam,
  };
};
