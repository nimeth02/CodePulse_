import axiosInstance from "./axios";

export interface PRClosedData {
  name: string;
  merged: number;
  nonMerged: number;
  abondened: number;
}

export const getPRClosedData = async (
  projectId: string,
  teamId: string,
  year: number
): Promise<PRClosedData[]> => {
  const response = await axiosInstance.get(`/PRClosed`, {
    params: {
      projectId,
      teamId,
      year,
    },
  });
  return response.data.data;
};
