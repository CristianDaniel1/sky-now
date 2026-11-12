import type { LucideIcon } from 'lucide-react';
import type { z } from 'zod';
import type { Coordinates } from '@/shared/interfaces/coordinates';
import type { geoLocationSchema } from '../api/schemas';

export type GeoLocation = z.infer<typeof geoLocationSchema>;

export interface LocationLabel {
  city: string;
  state?: string | undefined;
  country: string;
}

export interface Place {
  coords: Coordinates;
  label: LocationLabel;
}

export interface LocationState extends Place {
  isFirstVisit: boolean;
  selectLocation: (place: Place) => void;
  dismissFirstVisit: () => void;
}

export interface SavedPlacesState {
  favorites: Place[];
  recents: Place[];
  toggleFavorite: (place: Place) => void;
  addRecent: (place: Place) => void;
}

export type PlaceGroupKind = 'recents' | 'results';

export interface PlaceGroupInput {
  kind: PlaceGroupKind;
  places: Place[];
}

export interface PlaceGroup extends PlaceGroupInput {
  startIndex: number;
}

export interface PlaceGroupDetails {
  title: string | null;
  icon: LucideIcon | null;
}
