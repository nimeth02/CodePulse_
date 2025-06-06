import axiosInstance from './axios';

export interface TeamData {
    teamId: string;
  teamName: string;
}

export const getTeamData = async (projectId: string): Promise<TeamData[]> => {
  try {
    console.log("hello",projectId);
    const response = await axiosInstance.get(`/team/${projectId}`);
   
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching PR closed data:', error);
    throw error;
  }
};