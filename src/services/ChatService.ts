import axiosInstance from "./axios";


export const getChatData = async (
  projectId: string,
  question: string,
): Promise<string> => {
  try {
    const payload = {
        projectId,
        question
      };
    const response = await axiosInstance.post(`/chats`,payload);
    console.log(response.data);
  
    return response.data.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }

};
