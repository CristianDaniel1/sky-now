import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { openWeatherProxy } from './vite-plugins/openweather-proxy.ts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.OPENWEATHER_API_KEY ??= env.OPENWEATHER_API_KEY;

  return {
    plugins: [react(), tailwindcss(), openWeatherProxy()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  };
});
