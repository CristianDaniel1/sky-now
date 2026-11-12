import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { type TooltipContentProps } from 'recharts';
import { useForecast } from '../../hooks/useForecast.ts';
import { getDate } from '../../utils/helpers.ts';
import { useCoordsStore } from '../../store/weatherStore.ts';

interface TodayHours {
  strHours: string;
  temp: number;
}

export const Chart = () => {
  const coords = useCoordsStore((state) => state.coords);
  const { data } = useForecast(coords.lat, coords.lon);
  const todayHours: TodayHours[] = [];

  if (data) {
    const todayTemp = data.list.slice(0, 8);

    for (let i = 0; i < todayTemp.length; i++) {
      const { hours } = getDate(todayTemp[i].dt);
      const strHours = `${hours}`.length > 1 ? `${hours}:00` : `0${hours}:00`;

      todayHours.push({ strHours: strHours, temp: todayTemp[i].main.temp });
    }
  }

  return (
    <>
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={400}
            height={400}
            data={todayHours}
            className="text-xs font-medium text-slate-400 sm:text-sm"
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <YAxis domain={['auto', 'dataMax + 4']} stroke="currentColor" />
            <XAxis dataKey="strHours" stroke="currentColor" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ea580c"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-white p-4 shadow-sm">
        <p>{label}h</p>
        <p className="text-primary">
          Temperatura: <span>{payload[0].value}°C</span>
        </p>
      </div>
    );
  }
  return null;
};
