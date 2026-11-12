import type { ImageAsset } from '@/shared/interfaces/image';
import { cn } from '@/shared/lib/cn';

interface DetailImageProps {
  image: ImageAsset;
}

export const DetailImage = ({ image }: DetailImageProps) => (
  <img
    src={image.src}
    alt=""
    aria-hidden="true"
    width={20}
    height={20}
    className={cn('size-5', image.invertOnDark && 'dark:invert')}
  />
);
