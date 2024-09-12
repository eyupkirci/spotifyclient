import {useState, useEffect, useCallback} from 'react';
import {getSpotifyToken} from './getSpotifyToken';
import {IPlaylistsResponse, IPlaylistTracksResponse} from '../types/types';

const cache = new Map<string, IPlaylistsResponse | IPlaylistTracksResponse>();

const defaultOptions = {
  key: '',
  refetch: false,
};

interface IUseFetchSpotifyDataOptions {
  key?: string;
  refetch?: boolean;
}

// Custom hook to fetch Spotify data
const useFetchSpotifyData = (
  endpoint: string,
  options: IUseFetchSpotifyDataOptions = defaultOptions,
) => {
  const [data, setData] = useState<
    IPlaylistsResponse | IPlaylistTracksResponse | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const {key, refetch} = {...defaultOptions, ...options};

    if (!refetch && key && cache.has(key)) {
      setData(cache.get(key) || null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const token = await getSpotifyToken();

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
        const result: IPlaylistsResponse | IPlaylistTracksResponse =
          await response.json();
        setData(result);

        if (key) {
          cache.set(key, result);
        }
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
  }, [endpoint, options]);

  useEffect(() => {
    fetchData();
  }, [endpoint, fetchData]);

  return {data, error, isLoading};
};

export default useFetchSpotifyData;
