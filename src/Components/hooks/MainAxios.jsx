import { useEffect, useState } from "react";
import axios from "axios";

export const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const sessionData = sessionStorage.getItem(url);
      if (sessionData) {
        setData(JSON.parse(sessionData));
        setLoading(false);
      } else {
        try {
          const response = await axios.get(url);
          setData(response.data);
          sessionStorage.setItem(url, JSON.stringify(response.data));
          setLoading(false);

        } catch (err) {
          setError(err);
          setLoading(false);

        }
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
