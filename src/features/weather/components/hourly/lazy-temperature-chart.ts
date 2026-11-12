import { lazy } from 'react';

/** Temperature chart loaded on demand, keeping the chart library out of the main bundle. */
export const LazyTemperatureChart = lazy(() =>
  import('./TemperatureChart').then((module) => ({ default: module.TemperatureChart })),
);
