import axiosInstance from "./axios";

export interface projectData {
  projectId: string;
  projectName: string;
  projectCode: string;
  providerType: string;
  projectCreatedAt: string;
}

export const getProjectData = async (
  projectId: string
): Promise<projectData> => {
  const response = await axiosInstance.get(`/Project/${projectId}`);
  console.log(response);

  return response.data.data;
};
