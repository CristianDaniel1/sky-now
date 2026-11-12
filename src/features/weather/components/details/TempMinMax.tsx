import { ArrowDownIcon } from '@/shared/components/icons/ArrowDownIcon';
import { ArrowUpIcon } from '@/shared/components/icons/ArrowUpIcon';
import { formatTemperature } from '../../lib/format';

interface TempMinMaxProps {
  max: number;
  min: number;
}

export const TempMinMax = ({ max, min }: TempMinMaxProps) => (
  <div className="font-medium text-primary">
    <div className="flex items-center gap-2 text-red-800">
      <div>{formatTemperature(max)}</div>
      <ArrowUpIcon />
    </div>
    <div className="flex items-center gap-2">
      <div>{formatTemperature(min)}</div>
      <ArrowDownIcon />
    </div>
  </div>
);
