import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Footer, Header } from '@/features/layout';
import { Weather } from '@/features/weather';
import { reportError } from '@/shared/lib/report-error';
import { AppErrorFallback } from './components/AppErrorFallback';
import { createQueryClient, createQueryPersistOptions } from './query-client';

export const App = () => {
  const [queryClient] = useState(createQueryClient);
  const [persistOptions] = useState(createQueryPersistOptions);

  return (
    <ErrorBoundary
      FallbackComponent={AppErrorFallback}
      onError={(error) => reportError('app: render', error)}
    >
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        <Header />
        <Weather />
        <Footer />
      </PersistQueryClientProvider>
    </ErrorBoundary>
  );
};
