import { thermometer } from '../../data.ts';

export const FeelsLike = ({ feelsLikeValue }: { feelsLikeValue: number }) => {
  return (
    <div className="flex gap-1 items-center">
      <img src={thermometer.img} alt={thermometer.alt} width={20} height={20} />
      <div>
        Sensação Térmica:{' '}
        <span className="font-medium text-primary">
          {feelsLikeValue.toFixed(1)}°C
        </span>
      </div>
    </div>
  );
};
