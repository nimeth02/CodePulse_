import axiosInstance from "./axios";

export interface TeamData {
  teamId: string;
  teamName: string;
}

export const getTeamData = async (projectId: string): Promise<TeamData[]> => {
  const response = await axiosInstance.get(`/team/${projectId}`);
  return response.data.data;
};
