import type { ImageAsset } from '@/shared/interfaces/icon';

export interface SocialLink {
  url: string;
  icon: ImageAsset;
  isExternal: boolean;
}
