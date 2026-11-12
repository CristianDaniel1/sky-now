import { humidity } from '../../data.ts';

export const Humidity = ({ humidityValue }: { humidityValue: number }) => {
  return (
    <div className="flex items-center gap-1">
      <img src={humidity.img} alt={humidity.alt} width={20} height={20} />
      <div>
        Umidade: <span className="font-medium text-primary">{humidityValue}%</span>
      </div>
    </div>
  );
};
