import { useQuery } from '@tanstack/react-query';
import { fetchCurrentWeather } from '../utils/http.ts';

export const useCurrentWeather = (lat: number, lon: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['current-weather', { lat, lon }],
    queryFn: ({ signal }) => fetchCurrentWeather({ lat, lon, signal }),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isPending, isError, error };
};
