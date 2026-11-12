import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '@/features/location';
import { fetchCurrentWeather } from '../api/weather';
import { WEATHER_STALE_TIME_MS } from '../constants/weather';

/**
 * Fetches the current weather of the selected place.
 *
 * @returns The query state with the current weather.
 */
export const useCurrentWeather = () => {
  const coords = useLocationStore((store) => store.coords);

  return useQuery({
    queryKey: ['current-weather', coords],
    queryFn: ({ signal }) => fetchCurrentWeather({ ...coords, signal }),
    staleTime: WEATHER_STALE_TIME_MS,
    meta: { persist: true },
  });
};
