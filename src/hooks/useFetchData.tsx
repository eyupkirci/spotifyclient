import {useState, useEffect, useCallback} from 'react';
import {getToken} from './getToken';

const useFetchData = (endpoint: string) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = await getToken();

    if (!token) {
      setError('Failed to retrieve Spotify token');
      setIsLoading(false);
      return;
    }

    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(endpoint, fetchOptions);
      if (response.ok) {
        const result: any = await response.json();
        setData(result);
      } else {
        setError(
          `Failed to fetch data: ${response.status} ${response.statusText}`,
        );
      }
    } catch (fetchError) {
      if (fetchError instanceof Error) {
        setError(`Error occurred while fetching data: ${fetchError.message}`);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [endpoint, fetchData]);

  return {data, error, isLoading};
};

export default useFetchData;
