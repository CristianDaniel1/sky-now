import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '@/features/location';
import { fetchForecast } from '../api/weather';
import { WEATHER_STALE_TIME_MS } from '../constants/weather';

/**
 * Fetches the 5 day forecast of the selected place.
 *
 * @returns The query state with the forecast.
 */
export const useForecast = () => {
  const coords = useLocationStore((store) => store.coords);

  return useQuery({
    queryKey: ['forecast', coords],
    queryFn: ({ signal }) => fetchForecast({ ...coords, signal }),
    staleTime: WEATHER_STALE_TIME_MS,
    meta: { persist: true },
  });
};
