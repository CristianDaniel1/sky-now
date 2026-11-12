import type { ImageAsset } from '@/shared/interfaces/icon';

interface DetailItemProps {
  icon: ImageAsset;
  label: string;
  value: string;
}

export const DetailItem = ({ icon, label, value }: DetailItemProps) => (
  <div className="flex items-center gap-1">
    <img src={icon.src} alt={icon.alt} width={20} height={20} />
    <div>
      {label}: <span className="font-medium text-primary">{value}</span>
    </div>
  </div>
);
