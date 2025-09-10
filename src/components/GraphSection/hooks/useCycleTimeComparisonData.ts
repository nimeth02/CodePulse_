import { useProject } from "context/ProjectContext";
import { getCycleTimeComparisonData ,TransformedDataItem} from "../../../services/CycleTimeComparisonService";
import { useEffect, useState } from "react";

export const useCycleTimeComparisonData=( year: number)=>{
  const {project}=useProject()

  const projectId=project?.projectId || ""
    const [data, setData] = useState<TransformedDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getCycleTimeComparisonData(projectId, year);
        console.log(response);

        if (!Array.isArray(response)) {
          throw new Error("API response is not an array");
        }
        const transformedData :TransformedDataItem[] = response.map(({ month, teams }) => {
          const result: { [key: string]: number | string } = { name: month };
          teams.forEach((team) => {
            result[`${team.name}_averageCycleTimeInDays`] =
              team.averageCycleTimeInDays;
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