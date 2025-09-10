import { useQuery } from "@tanstack/react-query";
import {
  TeamConfigurationService,
  TeamData,
} from "../../../services/TeamConfigurationService";
import { useProject } from "context/ProjectContext";

export const useTeams = () => {
  const { project } = useProject();
  
  const projectId = project?.projectId || "";
  return useQuery<TeamData[], Error>(
    {
      queryKey: ["teams", projectId], // unique cache key
      queryFn: () => TeamConfigurationService.getTeams(projectId), // fetch function
      enabled: !!projectId, // only fetch if projectId is valid
    }
  )
}