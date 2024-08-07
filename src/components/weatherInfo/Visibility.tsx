import { visibility } from '../../data.ts';

export const Visibility = ({
  visibilityValue,
}: {
  visibilityValue: number;
}) => {
  return (
    <div className="flex gap-1 items-center">
      <img src={visibility.img} alt={visibility.alt} width={20} height={20} />
      <div>
        Visibilidade:{' '}
        <span className="font-medium text-primary">
          {visibilityValue / 1000}km
        </span>
      </div>
    </div>
  );
};
