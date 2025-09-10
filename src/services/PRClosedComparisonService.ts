import axiosInstance from "./axios";

export interface PRComparisonData {
  month: string;
  teams: PRTeamComparisonData[];
}

export interface PRTeamComparisonData {
  name: string;
  merged: number;
  nonMerged: number;
}

export interface TransformedDataItem {
  [key: string]: number | string; // Dynamic keys for team metrics
}

export const getPRComparisonData = async (
  projectId: string,
  year: number
): Promise<PRComparisonData[]> => {
  const response = await axiosInstance.get(`/pr-closed-comparison`, {
    params: {
      projectId,
      year,
    },
  });

  return response.data.data;
};
