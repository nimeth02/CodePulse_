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
  year: number
): Promise<prActivityData[]> => {
  const response = await axiosInstance.get(`/PRActivity`, {
    params: {
      projectId,
      teamId,
      year,
    },
  });

  return response.data.data;
};

export const getUserPRActivityData = async (
  projectId: string,
  teamId: string,
  year: number
): Promise<UserPRActivityData[]> => {
  const response = await axiosInstance.get(`/PRActivity/user`, {
    params: {
      projectId,
      teamId,
      year,
    },
  });

  return response.data.data;
};
