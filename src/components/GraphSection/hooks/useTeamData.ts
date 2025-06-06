import { useEffect, useState } from "react";
import { getTeamData, TeamData } from "../../../services/ProjectTeams";

export const useTeamData=( projectId: string)=>
{
    const [TeamData, setTeamData] = useState<TeamData[]>([{teamId:projectId , teamName: "Project"}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await getTeamData(projectId);
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

      return {error,loading,TeamData}
}