import { getPRComparisonData, TransformedDataItem } from "../../../services/PRClosedComparisonService";
import { useEffect, useState } from "react";

export const usePRClosedComparisonData=(projectId: string, year: number)=>{
    const [data, setData] = useState<TransformedDataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getPRComparisonData(projectId, year);
  
          const transformedData:TransformedDataItem[] = response?.map(({ month, teams }) => {
            const result: { [key: string]: number | string } = { name: month };
            teams.forEach((team, index) => {
              result[`${team.name}_merged`] = team.merged;
              result[`${team.name}_nonMerged`] = team.nonMerged;
            });
            return result;
          });
          console.log(transformedData);
  
          setData(transformedData);
          setError(null);
        } catch (err) {
          setError("Failed to fetch PR data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [projectId, year]);

    return {error,loading,data}

}