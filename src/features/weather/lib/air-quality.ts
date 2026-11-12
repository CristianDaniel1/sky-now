import { AIR_QUALITY_LEVELS, UNKNOWN_AIR_QUALITY_LEVEL } from '../data/air-quality';

/**
 * Finds the name, advice and color of an air quality index.
 *
 * @param index - OpenWeatherMap air quality index, from 1 (good) to 5 (very poor).
 * @returns The level details, or a neutral level for an unknown index.
 */
export const getAirQualityLevel = (index: number) =>
  AIR_QUALITY_LEVELS[index] ?? UNKNOWN_AIR_QUALITY_LEVEL;
