import { useUnitSystem } from '@/features/units';
import { cn } from '@/shared/lib/cn';
import { DAY_SUMMARY_STYLES } from '../../data/day-summary-styles';
import type { CurrentWeather, HourlyPoint } from '../../interfaces/weather';
import { getDaySummary } from '../../lib/day-summary';

interface DaySummaryProps {
  weather: CurrentWeather;
  points: HourlyPoint[];
}

export const DaySummary = ({ weather, points }: DaySummaryProps) => {
  const system = useUnitSystem();
  const summary = getDaySummary({ weather, points, system });
  if (!summary) return null;

  const { icon: Icon, className } = DAY_SUMMARY_STYLES[summary.kind];

  return (
    <p className="mt-6 flex items-start gap-3 rounded-lg bg-subtle px-4 py-3 text-primary">
      <Icon aria-hidden="true" className={cn('mt-0.5 size-5 shrink-0', className)} />
      {summary.message}
    </p>
  );
};
