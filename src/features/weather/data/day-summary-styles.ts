import {
  CloudSun,
  Snowflake,
  Sun,
  ThermometerSun,
  TrendingDown,
  Umbrella,
  Wind,
} from 'lucide-react';
import type { DaySummaryKind, DaySummaryStyle } from '../interfaces/weather';

/** Icon and icon color of each kind of day summary. */
export const DAY_SUMMARY_STYLES: Record<DaySummaryKind, DaySummaryStyle> = {
  rain: { icon: Umbrella, className: 'text-rain' },
  snow: { icon: Snowflake, className: 'text-cold' },
  wind: { icon: Wind, className: 'text-heading' },
  heat: { icon: ThermometerSun, className: 'text-hot' },
  cold: { icon: Snowflake, className: 'text-cold' },
  drop: { icon: TrendingDown, className: 'text-cold' },
  dry: { icon: Sun, className: 'text-accent' },
  lowRain: { icon: CloudSun, className: 'text-heading' },
};
