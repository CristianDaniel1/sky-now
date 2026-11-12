import { Umbrella } from 'lucide-react';
import { MIN_VISIBLE_RAIN_CHANCE } from '../../constants/weather';

interface RainChanceProps {
  percentage: number;
}

export const RainChance = ({ percentage }: RainChanceProps) => {
  if (percentage < MIN_VISIBLE_RAIN_CHANCE) return null;

  return (
    <p className="flex items-center gap-1 text-sm font-semibold text-rain tabular-nums">
      <Umbrella aria-hidden="true" className="size-4" />
      <span className="sr-only">Chance de chuva:</span>
      {percentage}%
    </p>
  );
};
