import { ArrowDownIcon } from '../icons/ArrowDownIcon.tsx';
import { ArrowUpIcon } from '../icons/ArrowUpIcon.tsx';

interface TempMinMaxProps {
  maxValue: number;
  minValue: number;
  className?: string;
}

export const TempMinMax = ({ maxValue, minValue, className = '' }: TempMinMaxProps) => {
  return (
    <div className="font-medium text-primary">
      <div className={`flex items-center gap-2 text-red-800 ${className ? className : ''}`}>
        <div>{maxValue.toFixed(1)}°C</div>
        <ArrowUpIcon />
      </div>
      <div className={`flex items-center gap-2 ${className ? className : ''}`}>
        <div>{minValue.toFixed(1)}°C</div>
        <ArrowDownIcon />
      </div>
    </div>
  );
};
