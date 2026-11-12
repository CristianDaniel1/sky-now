import type { FallbackProps } from 'react-error-boundary';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { Button } from '@/shared/components/ui/Button';

export const AppErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
    <ErrorMessage
      title="Ops! Algo deu errado"
      message="Ocorreu um erro inesperado. Tente novamente."
    />
    <Button className="rounded-full px-6 py-3" onClick={resetErrorBoundary}>
      Tentar novamente
    </Button>
  </div>
);
