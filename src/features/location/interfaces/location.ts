import type { z } from 'zod';
import type { Coordinates } from '@/shared/interfaces/coordinates';
import type { geoLocationSchema } from '../api/schemas';

export type GeoLocation = z.infer<typeof geoLocationSchema>;

export interface LocationLabel {
  city: string;
  state?: string | undefined;
  country: string;
}

export interface LocationState {
  coords: Coordinates;
  label: LocationLabel;
  selectLocation: (coords: Coordinates, label: LocationLabel) => void;
}
