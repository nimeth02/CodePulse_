import axiosInstance from "./axios";
export interface CycleTimeData {
  name: string;
  count: number;
  averageCycleTimeInDays: number;
}

export const getCycleTimeData = async (
  projectId: string,
  teamId: string,
  year: number
): Promise<CycleTimeData[]> => {
  const response = await axiosInstance.get(`/CycleTime`, {
    params: {
      projectId,
      teamId,
      year,
    },
  });

  return response.data.data;
};
