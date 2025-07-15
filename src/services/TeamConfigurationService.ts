import { Team, TeamMember } from "../components/Configurations/types";
import axiosInstance from "./axios";

export interface TeamData {
  teamId: string;
  teamName: string;
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
  }[];
}

export const TeamConfigurationService = {
  getTeams: async (projectId: string): Promise<TeamData[]> => {
    try {
      const response = await axiosInstance.get(`/team/${projectId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },
  getUsers: async (projectId: string): Promise<TeamUserData[]> => {
    try {
      const response = await axiosInstance.get(`/user/${projectId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  getTeamMembers: async (teamId: string): Promise<TeamUserData[]> => {
    try {
      const response = await axiosInstance.get(`/team/${teamId}/members`);
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

      await axiosInstance.post("/team/members", payload);
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
          },
        ],
      };

      await axiosInstance.post("/team", payload);
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  },
};
