import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { convertTemperature, formatTemperature, useUnitSystem } from '@/features/units';
import { TEMPERATURE_GRADIENT_ID } from '../../constants/chart';
import type { HourlyPoint } from '../../interfaces/weather';

export interface TemperatureChartProps {
  points: HourlyPoint[];
}

export const TemperatureChart = ({ points }: TemperatureChartProps) => {
  const system = useUnitSystem();
  const chartPoints = points.map((point) => ({
    ...point,
    temp: convertTemperature(point.temp, system),
  }));

  return (
    <>
      <div className="size-full text-xs font-medium sm:text-sm" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartPoints} margin={{ top: 28, right: 30, bottom: 0, left: 30 }}>
            <defs>
              <linearGradient id={TEMPERATURE_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-strong)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--accent-strong)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--line)" />
            <YAxis hide domain={['dataMin - 3', 'dataMax + 2']} />
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              tick={{ fill: 'var(--muted)' }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="var(--accent-strong)"
              strokeWidth={2.5}
              fill={`url(#${TEMPERATURE_GRADIENT_ID})`}
              dot={{ r: 3.5, fill: 'var(--accent-strong)', strokeWidth: 0 }}
              activeDot={false}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="temp"
                position="top"
                offset={10}
                fill="var(--primary)"
                fontWeight={600}
                formatter={(value) => `${String(value)}°`}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ol className="sr-only">
        {points.map((point) => (
          <li key={point.time}>{`${point.hour}: ${formatTemperature(point.temp, system)}`}</li>
        ))}
      </ol>
    </>
  );
};
