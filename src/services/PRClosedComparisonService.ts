import axiosInstance from './axios';

export interface PRComparisonData {
  month: string;
  teams:PRTeamComparisonData[]
}

export interface PRTeamComparisonData {
  name: string;
  merged: number;
  nonMerged: number;
}

export const getPRComparisonData = async (projectId: string, year: number): Promise<PRComparisonData[]> => {
  try {
    const response = await axiosInstance.get(`/PRClosedComparison`, {
      params: {
        projectId,
        year
      }
    });
    console.log(response.data);
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching PR closed data:', error);
    throw error;
  }
}; 