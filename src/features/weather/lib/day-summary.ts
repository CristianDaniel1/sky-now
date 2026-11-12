import { formatTemperature, formatWindSpeed } from '@/features/units';
import {
  SUMMARY_COLD_CELSIUS,
  SUMMARY_HOT_CELSIUS,
  SUMMARY_RAIN_CHANCE,
  SUMMARY_STRONG_WIND_MPS,
  SUMMARY_TEMPERATURE_DROP_CELSIUS,
  SNOW_ICON_PREFIX,
} from '../constants/day-summary';
import { MIN_VISIBLE_RAIN_CHANCE } from '../constants/weather';
import type {
  DaySummaryContext,
  DaySummaryInput,
  DaySummaryResult,
  HourlyPoint,
} from '../interfaces/weather';

type DaySummaryRule = (context: DaySummaryContext) => DaySummaryResult | null;

const pickPoint = (
  [firstPoint, ...otherPoints]: [HourlyPoint, ...HourlyPoint[]],
  isBetter: (point: HourlyPoint, picked: HourlyPoint) => boolean,
) => otherPoints.reduce((picked, point) => (isBetter(point, picked) ? point : picked), firstPoint);

const describePrecipitation: DaySummaryRule = ({ points }) => {
  const wetPoint = points.find((point) => point.rainChance >= SUMMARY_RAIN_CHANCE);
  if (!wetPoint) return null;

  if (wetPoint.icon.startsWith(SNOW_ICON_PREFIX))
    return {
      kind: 'snow',
      message: `Neve à vista: ${wetPoint.rainChance}% de chance às ${wetPoint.hour}. Cuidado com o chão escorregadio.`,
    };

  return {
    kind: 'rain',
    message: `Leve guarda-chuva: ${wetPoint.rainChance}% de chance de chuva às ${wetPoint.hour}.`,
  };
};

const describeWind: DaySummaryRule = ({ weather, system }) => {
  if (weather.wind.speed < SUMMARY_STRONG_WIND_MPS) return null;

  return {
    kind: 'wind',
    message: `Vento forte agora: ${formatWindSpeed(weather.wind.speed, system)}. Cuidado com objetos soltos.`,
  };
};

const describeHeat: DaySummaryRule = ({ warmest, system }) => {
  if (warmest.temp < SUMMARY_HOT_CELSIUS) return null;

  return {
    kind: 'heat',
    message: `Dia quente: máxima de ${formatTemperature(warmest.temp, system)} às ${warmest.hour}. Beba bastante água.`,
  };
};

const describeCold: DaySummaryRule = ({ coldest, system }) => {
  if (coldest.temp > SUMMARY_COLD_CELSIUS) return null;

  return {
    kind: 'cold',
    message: `Frio: mínima de ${formatTemperature(coldest.temp, system)} às ${coldest.hour}. Saia bem agasalhado.`,
  };
};

const describeTemperatureDrop: DaySummaryRule = ({ weather, coldest, system }) => {
  if (weather.main.temp - coldest.temp < SUMMARY_TEMPERATURE_DROP_CELSIUS) return null;

  return {
    kind: 'drop',
    message: `Esfria mais tarde: ${formatTemperature(coldest.temp, system)} às ${coldest.hour}. Leve um casaco.`,
  };
};

const describeRainChance: DaySummaryRule = ({ wettest }) => {
  if (wettest.rainChance < MIN_VISIBLE_RAIN_CHANCE)
    return { kind: 'dry', message: 'Sem chuva prevista nas próximas 24 horas.' };

  return {
    kind: 'lowRain',
    message: `Chuva pouco provável: no máximo ${wettest.rainChance}% de chance nas próximas 24 horas.`,
  };
};

const DAY_SUMMARY_RULES: DaySummaryRule[] = [
  describePrecipitation,
  describeWind,
  describeHeat,
  describeCold,
  describeTemperatureDrop,
  describeRainChance,
];

/**
 * Writes one practical sentence about the next 24 hours, picking the most relevant event.
 *
 * @param input - Current weather, hourly timeline (temperatures in °C) and the unit system to show.
 * @returns The summary with its kind, or null when there is no timeline yet.
 */
export const getDaySummary = ({ weather, points, system }: DaySummaryInput) => {
  const [firstPoint, ...otherPoints] = points;
  if (!firstPoint) return null;

  const timeline: [HourlyPoint, ...HourlyPoint[]] = [firstPoint, ...otherPoints];
  const context: DaySummaryContext = {
    weather,
    system,
    points: timeline,
    warmest: pickPoint(timeline, (point, picked) => point.temp > picked.temp),
    coldest: pickPoint(timeline, (point, picked) => point.temp < picked.temp),
    wettest: pickPoint(timeline, (point, picked) => point.rainChance > picked.rainChance),
  };

  for (const rule of DAY_SUMMARY_RULES) {
    const summary = rule(context);
    if (summary) return summary;
  }

  return null;
};
