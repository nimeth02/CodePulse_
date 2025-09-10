import axiosInstance from "./axios";

export interface prActivityData {
  name: string;
  count: number;
}

export interface UserPRActivityData {
  name: string;
  mergedCount: number;
  notMergedCount: number;
  totalCommits: number;
  totalAdditions: number;
  totalDeletions: number;
}

export const getprActivityData = async (
  projectId: string,
  teamId: string,
  year: number,
  selectedMonth:number
): Promise<prActivityData[]> => {
  const response = await axiosInstance.get(`/pr-activity`, {
    params: {
      projectId,
      teamId,
      year,
      month:selectedMonth
    },
  });

  return response.data.data;
};

export const getUserPRActivityData = async (
  projectId: string,
  teamId: string,
  year: number,
  selectedMonth:number
): Promise<UserPRActivityData[]> => {
  const response = await axiosInstance.get(`/pr-activity/user`, {
    params: {
      projectId,
      teamId,
      year,
      month:selectedMonth
    },
  });

  return response.data.data;
};


