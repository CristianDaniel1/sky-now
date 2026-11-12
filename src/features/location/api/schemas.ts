import { z } from 'zod';

/** Schema of one place returned by the OpenWeatherMap geocoding API. */
export const geoLocationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});

/** Schema of the geocoding API response. */
export const geoLocationsSchema = z.array(geoLocationSchema);
