import type { z } from 'zod';
import type { currentWeatherSchema, forecastSchema, forecastSlotSchema } from '../api/schemas';

export type CurrentWeather = z.infer<typeof currentWeatherSchema>;

export type Forecast = z.infer<typeof forecastSchema>;

export type ForecastSlot = z.infer<typeof forecastSlotSchema>;

export interface TemperaturePoint {
  hour: string;
  temp: number;
}

export interface DailyForecast {
  dayKey: string;
  slot: ForecastSlot;
  min: number;
  max: number;
}
