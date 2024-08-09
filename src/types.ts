type Coord = {
  lon: number;
  lat: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type Wind = {
  speed: number;
  deg: number;
};

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type ListItem = {
  dt: number;
  main: Main;
  weather: Weather[];
  wind: Wind;
  visibility: number;
  pop: number;
  dt_txt: string;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type WeatherData = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type ForecastData = {
  cod: string;
  message: number;
  cnt: number;
  list: ListItem[];
  city: City;
};

export type Location = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type Locations = Location[];

export type CurrentLocale = {
  city: string;
  state: string;
  country: string;
};
