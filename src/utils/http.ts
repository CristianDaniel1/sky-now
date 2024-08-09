import {
  type Locations,
  type ForecastData,
  type WeatherData,
} from '../types.ts';

interface FetchWeather {
  lat: number;
  lon: number;
  signal: AbortSignal;
}

export async function fetchCurrentWeather({ lat, lon, signal }: FetchWeather) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric&lang=pt_br
  `,
    { signal }
  );

  if (!response.ok) throw new Error(`Ocorreu um erro ao carregar os dados`);

  const data: WeatherData = await response.json();
  return data;
}

export async function fetchForecast({ lat, lon, signal }: FetchWeather) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric&lang=pt_br`,
    { signal }
  );

  if (!response.ok) throw new Error('Erro ao obter dados da previsão do tempo');

  const data: ForecastData = await response.json();
  return data;
}

interface FetchGeo {
  local: string;
  signal: AbortSignal;
}

export async function fetchGeo({ signal, local }: FetchGeo) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${local}&limit=5&appid=${
      import.meta.env.VITE_API_KEY
    }`,
    { signal }
  );

  if (!response.ok)
    throw new Error('Erro ao procurar local, tente mais tarde.');

  const data: Locations = await response.json();
  return data;
}
