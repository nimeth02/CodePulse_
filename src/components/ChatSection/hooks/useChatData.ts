import { useState } from "react";
import { useProject } from "context/ProjectContext";
import { getChatData } from "../../../services/ChatService";
import { Message } from "../types/messageTypes";


export const useChatData = (

) => {
  const {project}=useProject()
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const projectId=project?.projectId || ""


  const handleSendMessage = async (
    question: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!question.trim()) {
        throw new Error("Team name is required");
      }
      const userMessage = {
        text: question,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMessage]);

      const response=await getChatData(
        projectId,
        question,
      );

      const botResponse = {
        text: response || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botResponse]);
    // Reload teams after creating a new one
    } catch (error) {
      console.error("Error creating team:", error);
      setError("Failed to create team");
    } finally {
      setIsLoading(false);
    }
  };



  return {
    messages,
    handleSendMessage,
    isLoading,
    error,
  };
};
