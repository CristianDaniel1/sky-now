export type UnitSystem = 'metric' | 'imperial';

export interface UnitsState {
  system: UnitSystem;
  setSystem: (system: UnitSystem) => void;
}

export interface UnitSystemDetails {
  temperatureSymbol: string;
  temperatureName: string;
  temperatureScale: number;
  temperatureOffset: number;
  speedUnit: string;
  speedFactor: number;
}
