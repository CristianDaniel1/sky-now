import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useForecast } from '../../hooks/useForecast';
import { toTemperaturePoints } from '../../lib/forecast';
import { TemperatureTooltip } from './TemperatureTooltip';

export const TemperatureChart = () => {
  const { data: forecast } = useForecast();

  if (!forecast) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={toTemperaturePoints(forecast)}
        className="text-xs font-medium text-slate-400 sm:text-sm"
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <YAxis domain={['auto', 'dataMax + 4']} stroke="currentColor" />
        <XAxis dataKey="hour" stroke="currentColor" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={TemperatureTooltip} />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#ea580c"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
