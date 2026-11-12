const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org';

const WEATHER_CACHE_CONTROL = 'public, s-maxage=600, stale-while-revalidate=600';

const GEOCODING_CACHE_CONTROL = 'public, s-maxage=86400, stale-while-revalidate=86400';

const UPSTREAM_TIMEOUT_MS = 8000;

const MAX_PARAM_LENGTH = 100;

const ALLOWED_PARAMS = ['lat', 'lon', 'q', 'limit', 'units', 'lang'];

interface ProxyEndpoint {
  path: string;
  cacheControl: string;
}

const ENDPOINTS: Record<string, ProxyEndpoint> = {
  weather: { path: '/data/2.5/weather', cacheControl: WEATHER_CACHE_CONTROL },
  forecast: { path: '/data/2.5/forecast', cacheControl: WEATHER_CACHE_CONTROL },
  'air-pollution': { path: '/data/2.5/air_pollution', cacheControl: WEATHER_CACHE_CONTROL },
  'geo-direct': { path: '/geo/1.0/direct', cacheControl: GEOCODING_CACHE_CONTROL },
  'geo-reverse': { path: '/geo/1.0/reverse', cacheControl: GEOCODING_CACHE_CONTROL },
};

const jsonError = (message: string, status: number) =>
  Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });

const buildUpstreamUrl = (endpoint: ProxyEndpoint, params: URLSearchParams, apiKey: string) => {
  const url = new URL(endpoint.path, OPEN_WEATHER_BASE_URL);

  for (const name of ALLOWED_PARAMS) {
    const value = params.get(name);
    if (value) url.searchParams.set(name, value.slice(0, MAX_PARAM_LENGTH));
  }
  url.searchParams.set('appid', apiKey);

  return url;
};

/**
 * Forwards an allowed OpenWeatherMap request, adding the API key kept on the server.
 *
 * @param request - Request to `/api/openweather?endpoint=<name>&…` with the query parameters.
 * @returns The OpenWeatherMap response, cached at the edge when it succeeds.
 */
export const GET = async (request: Request) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) return jsonError('Serviço de clima não configurado.', 500);

  const { searchParams } = new URL(request.url);
  const endpoint = ENDPOINTS[searchParams.get('endpoint') ?? ''];
  if (!endpoint) return jsonError('Endpoint não encontrado.', 404);

  try {
    const upstream = await fetch(buildUpstreamUrl(endpoint, searchParams, apiKey), {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': upstream.ok ? endpoint.cacheControl : 'no-store',
      },
    });
  } catch (error) {
    console.error('openweather proxy: upstream request failed', error);
    return jsonError('Serviço de clima indisponível.', 502);
  }
};
