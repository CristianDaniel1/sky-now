import { Leaf } from 'lucide-react';
import { Skeleton } from '@/shared/components/Skeleton';
import { cn } from '@/shared/lib/cn';
import { UNKNOWN_AIR_QUALITY_LEVEL } from '../../data/air-quality';
import { useAirQuality } from '../../hooks/useAirQuality';
import { getAirQualityLevel } from '../../lib/air-quality';

export const AirQuality = () => {
  const { data, isPending } = useAirQuality();
  const level = data ? getAirQualityLevel(data.list[0].main.aqi) : UNKNOWN_AIR_QUALITY_LEVEL;

  return (
    <div className="col-span-full flex items-center gap-3 rounded-lg bg-subtle px-4 py-3">
      <span className="flex size-6 shrink-0 items-center justify-center">
        <Leaf
          aria-hidden="true"
          className={cn('size-5', isPending ? 'text-muted' : level.colorClassName)}
        />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <dt className="text-xs text-muted sm:text-sm">Qualidade do ar</dt>
        {isPending ? (
          <dd className="pt-1">
            <Skeleton className="h-9 w-full max-w-64 rounded-md" />
          </dd>
        ) : (
          <dd>
            <span className={cn('font-semibold', level.colorClassName)}>{level.label}</span>
            <span className="block text-xs text-muted sm:text-sm">{level.hint}</span>
          </dd>
        )}
      </div>
    </div>
  );
};
