import type { TooltipContentProps } from 'recharts';

export const TemperatureTooltip = ({ active, payload, label }: TooltipContentProps) => {
  const [point] = payload;
  if (!active || !point) return null;

  return (
    <div className="rounded-md bg-white p-4 shadow-sm">
      <p>{label}h</p>
      <p className="text-primary">
        Temperatura: <span>{point.value}°C</span>
      </p>
    </div>
  );
};
