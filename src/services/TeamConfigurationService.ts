import { Team, TeamMember } from "../components/Configurations/types";
import axiosInstance from "./axios";

export interface TeamData {
  teamId: string;
  nodeId:string;
  teamName: string;
  description: string;
  isDefault: boolean;
}

export interface TeamUserData {
  userId: string;
  userName: string;
}

export interface CreateTeamPayload {
  projectId: string;
  teams: {
    nodeId: string;
    teamName: string;
    description: string;
    isDefault: boolean;
  }[];
}

export interface EditTeamPayload {
  projectId: string,
  nodeId:string,
  teamName: string,
  description: string,
  isDefault:boolean
}

export const TeamConfigurationService = {
  getTeams: async (projectId: string): Promise<TeamData[]> => {
    try {
      const response = await axiosInstance.get(`/teams/${projectId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },
  getUsers: async (projectId: string): Promise<TeamUserData[]> => {
    try {
      const response = await axiosInstance.get(`/users/${projectId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  getTeamMembers: async (teamId: string): Promise<TeamUserData[]> => {
    try {
      const response = await axiosInstance.get(`/teams/${teamId}/members`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }
  },

  createTeamMember: async (
    teamId: string,
    userIds: string[]
  ): Promise<void> => {
    try {
      const payload = userIds.map((userId) => ({
        teamId,
        userId,
      }));

      if (payload.length === 0) {
        throw new Error("No valid user IDs found for selected users");
      }

      await axiosInstance.post("/teams/members", payload);
    } catch (error) {
      console.error("Error creating team member:", error);
      throw error;
    }
  },

  createTeam: async (
    projectId: string,
    teamName: string,
    description: string = ""
  ): Promise<void> => {
    try {
      // Generate a node ID (similar to GitHub's format)
      const nodeId = `team-${Math.random().toString(36).substring(2, 10)}`;

      const payload: CreateTeamPayload = {
        projectId,
        teams: [
          {
            nodeId,
            teamName,
            description,
            isDefault: false,
          },
        ],
      };

      await axiosInstance.post("/teams", payload);
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  },

  editTeam: async (
    teamId: string,
    payload: EditTeamPayload
  ): Promise<void> => {
    try {
      await axiosInstance.put(`/teams/${teamId}`, payload);
    } catch (error) {
      console.error("Error editing team:", error);
      throw error;
    }
  },

  deleteTeam: async (
    teamId: string
  ): Promise<void> => {
    try {
      await axiosInstance.delete(`/teams/${teamId}`);
    } catch (error) {
      console.error("Error editing team:", error);
      throw error;
    }
  },
  deleteTeamMembership: async (
    teamId: string,
    userId:string
  ): Promise<void> => {
    try {
      await axiosInstance.delete(`/teams/${teamId}/users/${userId}`);
    } catch (error) {
      console.error("Error editing team:", error);
      throw error;
    }
  }
};
