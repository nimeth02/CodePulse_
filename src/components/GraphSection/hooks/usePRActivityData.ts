import { useEffect, useState } from "react";
import {
  getprActivityData,
  getUserPRActivityData,
  prActivityData,
  UserPRActivityData,
} from "../../../services/PRActivityService";
import { useProject } from "context/ProjectContext";

export const usePRActivityData = (
  selectedTeam: string,
  year: number
) => {
  const {project}=useProject()

  const projectId=project?.projectId || ""
  const [data, setData] = useState<prActivityData[]>([]);
  const [devTableData, setDevTableData] = useState<UserPRActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getprActivityData(projectId, selectedTeam, year);
        const userresponse = await getUserPRActivityData(
          projectId,
          selectedTeam,
          year
        );
        setData(response);
        setDevTableData(userresponse);
        setError(null);
      } catch (err) {
        setError("Failed to fetch PR data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, selectedTeam, year]);

  return { error, loading, data, devTableData };
};
