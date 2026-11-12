import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Footer, Header } from '@/features/layout';
import { Weather } from '@/features/weather';
import { reportError } from '@/shared/lib/report-error';
import { AppErrorFallback } from './components/AppErrorFallback';
import { createQueryClient } from './query-client';

export const App = () => {
  const [queryClient] = useState(createQueryClient);

  return (
    <ErrorBoundary
      FallbackComponent={AppErrorFallback}
      onError={(error) => reportError('app: render', error)}
    >
      <QueryClientProvider client={queryClient}>
        <Header />
        <Weather />
        <Footer />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
