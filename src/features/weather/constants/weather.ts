/** Time weather data stays fresh before being fetched again, in milliseconds. */
export const WEATHER_STALE_TIME_MS = 10 * 60 * 1000;

/** Number of 3-hour forecast slots in 24 hours. */
export const FORECAST_SLOTS_PER_DAY = 8;

/** Number of upcoming days highlighted with a bigger card. */
export const HIGHLIGHTED_FORECAST_DAYS = 2;

/** Local hour whose forecast represents a whole day (icon, description, temperature). */
export const REPRESENTATIVE_DAY_HOUR = 12;

/** Lowest rain chance worth showing, in percent. */
export const MIN_VISIBLE_RAIN_CHANCE = 10;
