import { APP_LOCALE } from '@/shared/constants/locale';
import { capitalize } from '@/shared/lib/text';

const toPlaceDate = (timestamp: number, timezoneOffset: number) =>
  new Date((timestamp + timezoneOffset) * 1000);

const formatInPlace = (
  timestamp: number,
  timezoneOffset: number,
  options: Intl.DateTimeFormatOptions,
) =>
  toPlaceDate(timestamp, timezoneOffset).toLocaleString(APP_LOCALE, {
    ...options,
    timeZone: 'UTC',
  });

/**
 * Formats a moment as "HH:mm" in the browser's time zone.
 *
 * @param milliseconds - Unix time in milliseconds.
 * @returns The local clock time, e.g. "14:05".
 */
export const formatClockTime = (milliseconds: number) =>
  new Date(milliseconds).toLocaleTimeString(APP_LOCALE, { hour: '2-digit', minute: '2-digit' });

/**
 * Formats a timestamp as the weekday name in the place's local time.
 *
 * @param timestamp - Unix time in seconds.
 * @param timezoneOffset - Offset of the place from UTC, in seconds.
 * @returns The weekday name, e.g. "segunda-feira".
 */
export const formatWeekday = (timestamp: number, timezoneOffset: number) =>
  formatInPlace(timestamp, timezoneOffset, { weekday: 'long' });

/**
 * Formats a timestamp as a long date in the place's local time.
 *
 * @param timestamp - Unix time in seconds.
 * @param timezoneOffset - Offset of the place from UTC, in seconds.
 * @returns The capitalized date, e.g. "Segunda-feira, 11 de novembro".
 */
export const formatLongDate = (timestamp: number, timezoneOffset: number) => {
  const date = formatInPlace(timestamp, timezoneOffset, {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  });

  return capitalize(date);
};

/**
 * Formats the time of a timestamp in the place's local time, 24-hour clock.
 *
 * @param timestamp - Unix time in seconds.
 * @param timezoneOffset - Offset of the place from UTC, in seconds.
 * @returns The time, e.g. "15:00".
 */
export const formatHour = (timestamp: number, timezoneOffset: number) =>
  formatInPlace(timestamp, timezoneOffset, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

/**
 * Gets the calendar day of a timestamp in the place's local time.
 *
 * @param timestamp - Unix time in seconds.
 * @param timezoneOffset - Offset of the place from UTC, in seconds.
 * @returns The day as `YYYY-MM-DD`, which sorts chronologically.
 */
export const getPlaceDayKey = (timestamp: number, timezoneOffset: number) =>
  toPlaceDate(timestamp, timezoneOffset).toISOString().slice(0, 10);

/**
 * Gets the hour of a timestamp in the place's local time.
 *
 * @param timestamp - Unix time in seconds.
 * @param timezoneOffset - Offset of the place from UTC, in seconds.
 * @returns The hour, from 0 to 23.
 */
export const getPlaceHour = (timestamp: number, timezoneOffset: number) =>
  toPlaceDate(timestamp, timezoneOffset).getUTCHours();
