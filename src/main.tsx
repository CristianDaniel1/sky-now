import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { listenForInstallPrompt } from '@/features/pwa';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element "#root" not found.');

listenForInstallPrompt();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
