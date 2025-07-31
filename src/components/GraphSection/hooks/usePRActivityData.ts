import { useEffect, useState } from "react";
import {
  getprActivityData,
  getUserPRActivityData,
  prActivityData,
  UserPRActivityData,
} from "../../../services/PRActivityService";

export const usePRActivityData = (
  projectId: string,
  selectedTeam: string,
  year: number
) => {
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
