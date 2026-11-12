import { cn } from '@/shared/lib/cn';

interface ErrorMessageProps {
  title: string;
  message: string;
  className?: string | undefined;
}

export const ErrorMessage = ({ title, message, className }: ErrorMessageProps) => (
  <div className={cn('w-full text-center', className)}>
    <h2 className="py-4 text-2xl font-medium text-primary">{title}</h2>
    <p>{message}</p>
  </div>
);
