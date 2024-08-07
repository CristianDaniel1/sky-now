import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';
import { Weather } from './components/Weather.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Weather />
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
