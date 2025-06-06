import axiosInstance from './axios';

export interface PRData {
  name: string;
  merged: number;
  nonMerged: number;
  abondened:number;
}

export const getPRClosedData = async (projectId: string,teamId:string, year: number): Promise<PRData[]> => {
  try {
    const response = await axiosInstance.get(`/PRClosed`, {
      params: {
        projectId,
        teamId,
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