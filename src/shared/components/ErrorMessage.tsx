import { RotateCw } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: (() => void) | undefined;
  className?: string | undefined;
}

export const ErrorMessage = ({ title, message, onRetry, className }: ErrorMessageProps) => (
  <div role="alert" className={cn('flex flex-col items-center gap-2 text-center', className)}>
    <h3 className="text-2xl font-medium text-primary">{title}</h3>
    <p className="max-w-prose">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 flex items-center gap-2 rounded-full bg-brand px-5 py-2 font-medium text-white hover:opacity-90"
      >
        <RotateCw aria-hidden="true" className="size-4" />
        Tentar de novo
      </button>
    )}
  </div>
);
