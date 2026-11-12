import { ArrowDown, ArrowUp } from 'lucide-react';
import { formatTemperature, useUnitSystem } from '@/features/units';
import { cn } from '@/shared/lib/cn';
import type { TemperatureRange } from '../../interfaces/weather';

interface TempMinMaxProps {
  range: TemperatureRange;
  className?: string | undefined;
}

export const TempMinMax = ({ range, className }: TempMinMaxProps) => {
  const system = useUnitSystem();

  return (
    <div className={cn('font-medium text-primary tabular-nums', className)}>
      <p className="flex items-center gap-2 text-hot">
        <span className="sr-only">Máxima</span>
        {formatTemperature(range.max, system)}
        <ArrowUp aria-hidden="true" className="size-5" />
      </p>
      <p className="flex items-center gap-2">
        <span className="sr-only">Mínima</span>
        {formatTemperature(range.min, system)}
        <ArrowDown aria-hidden="true" className="size-5" />
      </p>
    </div>
  );
};
