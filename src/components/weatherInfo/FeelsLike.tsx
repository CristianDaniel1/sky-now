import { thermometer } from '../../data.ts';

export const FeelsLike = ({ feelsLikeValue }: { feelsLikeValue: number }) => {
  return (
    <div className="flex items-center gap-1">
      <img src={thermometer.img} alt={thermometer.alt} width={20} height={20} />
      <div>
        Sensação Térmica:{' '}
        <span className="font-medium text-primary">{feelsLikeValue.toFixed(1)}°C</span>
      </div>
    </div>
  );
};
