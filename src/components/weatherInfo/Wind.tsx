import { wind } from '../../data.ts';

export const Wind = ({ windValue }: { windValue: number }) => {
  return (
    <div className="flex gap-1 items-center">
      <img src={wind.img} alt={wind.alt} width={20} height={20} />
      <div>
        Vento:{' '}
        <span className="font-medium text-primary">
          {windValue.toFixed(1)} km/h
        </span>
      </div>
    </div>
  );
};
