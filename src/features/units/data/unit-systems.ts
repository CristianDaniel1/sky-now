import {
  FAHRENHEIT_AT_ZERO_CELSIUS,
  FAHRENHEIT_PER_CELSIUS,
  METERS_PER_SECOND_TO_KM_PER_HOUR,
  METERS_PER_SECOND_TO_MILES_PER_HOUR,
} from '../constants/units';
import type { UnitSystem, UnitSystemDetails } from '../interfaces/units';

/** Unit systems in the order they appear in the selector. */
export const UNIT_SYSTEMS: UnitSystem[] = ['metric', 'imperial'];

/** Symbols, names and conversion factors (from °C and m/s) of each unit system. */
export const UNIT_SYSTEM_DETAILS: Record<UnitSystem, UnitSystemDetails> = {
  metric: {
    temperatureSymbol: '°C',
    temperatureName: 'Celsius',
    temperatureScale: 1,
    temperatureOffset: 0,
    speedUnit: 'km/h',
    speedFactor: METERS_PER_SECOND_TO_KM_PER_HOUR,
  },
  imperial: {
    temperatureSymbol: '°F',
    temperatureName: 'Fahrenheit',
    temperatureScale: FAHRENHEIT_PER_CELSIUS,
    temperatureOffset: FAHRENHEIT_AT_ZERO_CELSIUS,
    speedUnit: 'mph',
    speedFactor: METERS_PER_SECOND_TO_MILES_PER_HOUR,
  },
};
