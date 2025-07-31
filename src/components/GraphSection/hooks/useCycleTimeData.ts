import { useEffect, useState } from "react";
import {
  CycleTimeData,
  getCycleTimeData,
} from "../../../services/CycleTimeService";
import { useProject } from "context/ProjectContext";

export const useCycleTimeData = (selectedTeam: string, year: number) => {
  const { project } = useProject();

  const projectId = project?.projectId || "";
  const [data, setData] = useState<CycleTimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getCycleTimeData(projectId, selectedTeam, year);
        setData(response);
        setError(null);
      } catch (err) {
        setError("Failed to fetch PR data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, year, selectedTeam]);

  return { error, loading, data };
};
