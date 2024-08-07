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
    <div className="sm:w-1/3 flex items-center justify-center gap-4 sm:block">
      <img
        src={props.icon}
        alt="Clima de hoje"
        width={150}
        height={150}
        className="sm:ml-10 sm:mt-2 w-28 sm:w-[150px]"
      />
      <div className="border border-gray-200 bg-slate-50 p-4 rounded-md mt-8 mb-4">
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
