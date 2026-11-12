import type { LucideIcon } from 'lucide-react';
import type { z } from 'zod';
import type { UnitSystem } from '@/features/units';
import type {
  airPollutionSchema,
  currentWeatherSchema,
  forecastSchema,
  forecastSlotSchema,
} from '../api/schemas';

export type CurrentWeather = z.infer<typeof currentWeatherSchema>;

export type Forecast = z.infer<typeof forecastSchema>;

export type ForecastSlot = z.infer<typeof forecastSlotSchema>;

export interface HourlyPoint {
  time: number;
  hour: string;
  temp: number;
  rainChance: number;
  icon: string;
  description: string;
}

export interface DailyForecast {
  dayKey: string;
  slot: ForecastSlot;
  min: number;
  max: number;
  rainChance: number;
}

export interface TemperatureRange {
  min: number;
  max: number;
}

export type DaySummaryKind =
  'rain' | 'snow' | 'wind' | 'heat' | 'cold' | 'drop' | 'dry' | 'lowRain';

export interface DaySummaryResult {
  kind: DaySummaryKind;
  message: string;
}

export interface DaySummaryInput {
  weather: CurrentWeather;
  points: HourlyPoint[];
  system: UnitSystem;
}

export interface DaySummaryContext extends Omit<DaySummaryInput, 'points'> {
  points: [HourlyPoint, ...HourlyPoint[]];
  warmest: HourlyPoint;
  coldest: HourlyPoint;
  wettest: HourlyPoint;
}

export interface DaySummaryStyle {
  icon: LucideIcon;
  className: string;
}

export type AirPollution = z.infer<typeof airPollutionSchema>;

export interface AirQualityLevel {
  label: string;
  hint: string;
  colorClassName: string;
}
