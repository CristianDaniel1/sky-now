import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { openWeatherProxy } from './vite-plugins/openweather-proxy.ts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.OPENWEATHER_API_KEY ??= env.OPENWEATHER_API_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      openWeatherProxy(),
      VitePWA({
        registerType: 'prompt',
        injectRegister: false,
        pwaAssets: { config: true, overrideManifestIcons: true },
        manifest: {
          name: 'SkyNow - Clima e previsão do tempo',
          short_name: 'SkyNow',
          description: 'Clima atual e previsão do tempo para qualquer cidade.',
          lang: 'pt-BR',
          start_url: '/',
          display: 'standalone',
          theme_color: '#ffffff',
          background_color: '#f3f4f6',
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
          navigateFallbackDenylist: [/^\/api\//],
          cleanupOutdatedCaches: true,
        },
      }),
    ],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  };
});
