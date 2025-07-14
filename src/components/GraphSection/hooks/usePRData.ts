import { useEffect, useState } from "react";
import { getPRClosedData, PRClosedData } from "../../../services/PRClosedService";

export const usePRData=(selectedTeam: string, projectId: string, year: number)=>
{
    const [data, setData] = useState<PRClosedData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await getPRClosedData(projectId,selectedTeam, year);
            setData(response);
            setError(null);
          } catch (err) {
            setError('Failed to fetch PR data');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [projectId, year,selectedTeam]);

      return {error,loading,data}

}