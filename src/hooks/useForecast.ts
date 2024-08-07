import { useQuery } from '@tanstack/react-query';
import { fetchForecast } from '../utils/http.ts';

export const useForecast = (lat: number, lon: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['forecast', { lat, lon }],
    queryFn: ({ signal }) => fetchForecast({ lat, lon, signal }),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isPending, isError, error };
};
