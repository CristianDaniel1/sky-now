import { History } from 'lucide-react';
import type { PlaceGroupDetails, PlaceGroupKind } from '../interfaces/location';

/** Title and icon of each group of places in the search panel. */
export const PLACE_GROUP_DETAILS: Record<PlaceGroupKind, PlaceGroupDetails> = {
  recents: { title: 'Recentes', icon: History },
  results: { title: null, icon: null },
};
