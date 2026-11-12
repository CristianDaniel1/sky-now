import { z } from 'zod';

const conditionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const readingsSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
});

const windSchema = z.object({
  speed: z.number(),
  deg: z.number(),
});

/** Schema of the OpenWeatherMap current weather response. */
export const currentWeatherSchema = z.object({
  coord: z.object({ lat: z.number(), lon: z.number() }),
  weather: z.tuple([conditionSchema], conditionSchema),
  main: readingsSchema,
  visibility: z.number().optional(),
  wind: windSchema,
  dt: z.number(),
  sys: z.object({
    country: z.string().optional(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
  timezone: z.number(),
  name: z.string(),
});

/** Schema of one 3-hour slot of the OpenWeatherMap forecast. */
export const forecastSlotSchema = z.object({
  dt: z.number(),
  main: readingsSchema,
  weather: z.tuple([conditionSchema], conditionSchema),
  wind: windSchema,
  visibility: z.number().optional(),
  pop: z.number(),
  dt_txt: z.string(),
});

/** Schema of the OpenWeatherMap 5 day / 3 hour forecast response. */
export const forecastSchema = z.object({
  list: z.array(forecastSlotSchema),
  city: z.object({
    name: z.string(),
    country: z.string().optional(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});
