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
  try {
    const response = await axiosInstance.get(`/projects/${projectId}`);
    console.log(response);
  
    return response.data.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }

};