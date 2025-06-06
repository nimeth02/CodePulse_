import axiosInstance from './axios';
export interface CycleTimeData {
  name: string;
  count:number;
  averageCycleTimeInDays: number;
}

export const getCycleTimeData = async (projectId: string,teamId:string, year: number): Promise<CycleTimeData[]> => {
  try {
    const response = await axiosInstance.get(`/CycleTime`, {
      params: {
        projectId,
        teamId,
        year
      }
    });
    console.log(response.data);
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching PR Cycle Time data:', error);
    throw error;
  }
};