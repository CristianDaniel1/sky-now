import { FeelsLike } from '../weatherInfo/FeelsLike.tsx';
import { Humidity } from '../weatherInfo/Humidity.tsx';
import { TempMinMax } from '../weatherInfo/TempMinMax.tsx';
import { Visibility } from '../weatherInfo/Visibility.tsx';
import { Wind } from '../weatherInfo/Wind.tsx';

interface TodayWeatherInfoProps {
  icon: string;
  humidity: number;
  wind: number;
  visibility: number;
  feelsLike: number;
  max: number;
  min: number;
}

export const TodayWeatherInfo = (props: TodayWeatherInfoProps) => {
  return (
    <div className="flex items-center justify-around gap-4 pt-4 md:block md:w-1/3">
      <img
        src={props.icon}
        alt="Clima de hoje"
        width={150}
        height={150}
        className="mx-auto w-28 sm:w-[150px]"
      />
      <div className="mt-8 mb-4 flex w-2/3 flex-col gap-2 rounded-md border border-gray-200 bg-color-slate p-4 text-sm xs:w-1/2 sm:text-base md:w-auto">
        <Humidity humidityValue={props.humidity} />
        <Wind windValue={props.wind} />
        <Visibility visibilityValue={props.visibility} />
        <FeelsLike feelsLikeValue={props.feelsLike} />
        <div className="mt-4">
          <TempMinMax maxValue={props.max} minValue={props.min} />
        </div>
      </div>
    </div>
  );
};
