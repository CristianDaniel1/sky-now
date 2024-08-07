import { skipToken, useQuery } from '@tanstack/react-query';
import { fetchGeo } from '../utils/http.ts';

export const useGeo = (local: string | undefined) => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['geo', local],
    queryFn: local ? ({ signal }) => fetchGeo({ local, signal }) : skipToken,
    staleTime: Infinity,
  });

  return { data, isFetching, isError, error };
};
