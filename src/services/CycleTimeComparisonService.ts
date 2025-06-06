import axiosInstance from './axios';

export interface CycleTimeComparisonData {
  month: string;
  teams:CycleTimeData[]
}
export interface CycleTimeData {
  name: string;
  count:number;
  averageCycleTimeInDays: number;
}

export const getCycleTimeComparisonData = async (projectId: string, year: number): Promise<CycleTimeComparisonData[]> => {
  try {
    const response = await axiosInstance.get(`/CycleTimeComparison`, {
      params: {
        projectId,
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