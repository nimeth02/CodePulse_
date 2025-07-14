import { useEffect, useState } from "react";
import { TeamConfigurationService, TeamData } from "../../../services/TeamConfigurationService";
export const useTeamData=( projectId: string)=>
{
    const [teamData, setTeamData] = useState<TeamData[]>([{teamId:projectId , teamName: "Project"}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await TeamConfigurationService.getTeams(projectId);
            setTeamData(t => [...t, ...response]);
            setError(null);
          } catch (err) {
            setError('Failed to fetch Team data');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [projectId]);

      return {error,loading,teamData}
}