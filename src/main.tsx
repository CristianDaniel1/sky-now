import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { App } from '@/app/App';
import { reportError } from '@/shared/lib/report-error';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element "#root" not found.');

registerSW({
  immediate: true,
  onRegisterError: (error: unknown) => reportError('pwa: register service worker', error),
});

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
