import axiosInstance from './axios';

export interface prActivityData {
  name: string;
  count:number;
}

export interface UserPRActivityData {
  name: string;
  mergedCount:number;
  notMergedCount: number;
  totalCommits:number;
  totalAdditions:number;
  totalDeletions:number;
}

export const getprActivityData = async (projectId: string,teamId:string, year: number): Promise<prActivityData[]> => {
  try {
    const response = await axiosInstance.get(`/PRActivity`, {
      params: {
        projectId,
        teamId,
        year
      }
    });
    console.log(response.data);
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching PR Activity Time data:', error);
    throw error;
  }
};

export const getUserPRActivityData = async (projectId: string,teamId:string, year: number): Promise<UserPRActivityData[]> => {
  try {
    const response = await axiosInstance.get(`/PRActivity/user`, {
      params: {
        projectId,
        teamId,
        year
      }
    });
    console.log(response.data);
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching User PR Activity Time data:', error);
    throw error;
  }
};