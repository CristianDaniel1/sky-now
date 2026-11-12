import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { TemperatureRange } from '../../interfaces/weather';
import { formatTemperature } from '../../lib/format';

interface TempMinMaxProps {
  range: TemperatureRange;
  className?: string | undefined;
}

export const TempMinMax = ({ range, className }: TempMinMaxProps) => (
  <div className={cn('font-medium text-primary tabular-nums', className)}>
    <p className="flex items-center gap-2 text-hot">
      <span className="sr-only">Máxima</span>
      {formatTemperature(range.max)}
      <ArrowUp aria-hidden="true" className="size-5" />
    </p>
    <p className="flex items-center gap-2">
      <span className="sr-only">Mínima</span>
      {formatTemperature(range.min)}
      <ArrowDown aria-hidden="true" className="size-5" />
    </p>
  </div>
);
