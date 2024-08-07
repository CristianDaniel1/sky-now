import { humidity } from '../../data.ts';

export const Humidity = ({ humidityValue }: { humidityValue: number }) => {
  return (
    <div className="flex gap-1 items-center">
      <img src={humidity.img} alt={humidity.alt} width={20} height={20} />
      <div>
        Umidade:{' '}
        <span className="font-medium text-primary">{humidityValue}%</span>
      </div>
    </div>
  );
};
