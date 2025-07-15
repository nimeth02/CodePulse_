import axiosInstance from "./axios";

export interface CycleTimeComparisonData {
  month: string;
  teams: CycleTimeData[];
}
export interface CycleTimeData {
  name: string;
  count: number;
  averageCycleTimeInDays: number;
}

export interface TransformedDataItem {
  [key: string]: number | string; // Dynamic keys for team metrics
}

export const getCycleTimeComparisonData = async (
  projectId: string,
  year: number
): Promise<CycleTimeComparisonData[]> => {
  const response = await axiosInstance.get(`/CycleTimeComparison`, {
    params: {
      projectId,
      year,
    },
  });

  return response.data.data;
};
