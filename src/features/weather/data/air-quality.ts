import type { AirQualityLevel } from '../interfaces/weather';

/** Name, advice and color of each OpenWeatherMap air quality index (1 = best, 5 = worst). */
export const AIR_QUALITY_LEVELS: Record<number, AirQualityLevel> = {
  1: {
    label: 'Boa',
    hint: 'Ótima para atividades ao ar livre.',
    colorClassName: 'text-emerald-600 dark:text-emerald-400',
  },
  2: {
    label: 'Razoável',
    hint: 'Aceitável para a maioria das pessoas.',
    colorClassName: 'text-lime-600 dark:text-lime-400',
  },
  3: {
    label: 'Moderada',
    hint: 'Pessoas sensíveis devem evitar esforço prolongado ao ar livre.',
    colorClassName: 'text-amber-600 dark:text-amber-400',
  },
  4: {
    label: 'Ruim',
    hint: 'Reduza atividades intensas ao ar livre.',
    colorClassName: 'text-orange-600 dark:text-orange-400',
  },
  5: {
    label: 'Muito ruim',
    hint: 'Evite atividades ao ar livre, principalmente quem tem problemas respiratórios.',
    colorClassName: 'text-red-700 dark:text-red-400',
  },
};

/** Level shown when the API returns an index outside the known scale. */
export const UNKNOWN_AIR_QUALITY_LEVEL: AirQualityLevel = {
  label: 'Sem dados',
  hint: 'Não foi possível classificar a qualidade do ar agora.',
  colorClassName: 'text-muted',
};
