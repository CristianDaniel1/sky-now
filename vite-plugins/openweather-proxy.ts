import type { ServerResponse } from 'node:http';
import type { Connect, Plugin } from 'vite';
import { GET } from '../api/openweather.ts';

const OPEN_WEATHER_ROUTE = '/api/openweather';

const serveOpenWeather = async (request: Connect.IncomingMessage, response: ServerResponse) => {
  try {
    const url = new URL(request.originalUrl ?? request.url ?? '/', 'http://localhost');
    const proxied = await GET(new Request(url));
    const body = await proxied.text();

    response.statusCode = proxied.status;
    proxied.headers.forEach((value, name) => response.setHeader(name, value));
    response.end(body);
  } catch (error) {
    console.error('openweather dev proxy: request failed', error);
    response.statusCode = 500;
    response.end();
  }
};

/**
 * Serves `/api/openweather` in `vite dev` and `vite preview` with the same handler deployed to Vercel.
 *
 * @returns The Vite plugin.
 */
export const openWeatherProxy = (): Plugin => ({
  name: 'sky-now:openweather-proxy',
  configureServer: (server) => {
    server.middlewares.use(OPEN_WEATHER_ROUTE, (request, response) => {
      void serveOpenWeather(request, response);
    });
  },
  configurePreviewServer: (server) => {
    server.middlewares.use(OPEN_WEATHER_ROUTE, (request, response) => {
      void serveOpenWeather(request, response);
    });
  },
});
