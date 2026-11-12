import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '@/features/location';
import { fetchAirPollution } from '../api/weather';
import { WEATHER_STALE_TIME_MS } from '../constants/weather';

/**
 * Fetches the current air quality of the selected place.
 *
 * @returns The query state with the air quality index.
 */
export const useAirQuality = () => {
  const coords = useLocationStore((store) => store.coords);

  return useQuery({
    queryKey: ['air-pollution', coords],
    queryFn: ({ signal }) => fetchAirPollution({ ...coords, signal }),
    staleTime: WEATHER_STALE_TIME_MS,
  });
};
