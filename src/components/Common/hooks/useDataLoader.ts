import { useCallback, useState } from "react";

export const useDataLoader=<T>(loader: () => Promise<T>)=> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const load =useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await loader();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }, [loader]);
  
    return { data, isLoading, error, load };
  }
  