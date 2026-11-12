import { capitalize } from '@/shared/lib/text';

const toDate = (timestamp: number) => new Date(timestamp * 1000);

/**
 * Formats a timestamp as the weekday name in the browser language.
 *
 * @param timestamp - Unix time in seconds.
 * @returns The weekday name, e.g. "segunda-feira".
 */
export const formatWeekday = (timestamp: number) =>
  toDate(timestamp).toLocaleDateString(navigator.language, { weekday: 'long' });

/**
 * Formats a timestamp as a long date in the browser language.
 *
 * @param timestamp - Unix time in seconds.
 * @returns The capitalized date, e.g. "Segunda-feira, 11 de novembro".
 */
export const formatLongDate = (timestamp: number) => {
  const date = toDate(timestamp).toLocaleDateString(navigator.language, {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  });

  return capitalize(date);
};

/**
 * Formats the hour of a timestamp as "HH:00".
 *
 * @param timestamp - Unix time in seconds.
 * @returns The two-digit hour followed by ":00".
 */
export const formatHour = (timestamp: number) => {
  const hour = toDate(timestamp).getHours();
  return `${String(hour).padStart(2, '0')}:00`;
};

/**
 * Formats the hour of a timestamp in the 12-hour clock.
 *
 * @param timestamp - Unix time in seconds.
 * @returns The hour with its period, e.g. "3 PM".
 */
export const formatHour12 = (timestamp: number) => {
  const hour = toDate(timestamp).getHours();
  const period = hour < 12 ? 'AM' : 'PM';

  return `${hour % 12 || 12} ${period}`;
};
