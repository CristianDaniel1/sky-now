import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

export const Button = ({ className, type = 'button', ...props }: ComponentProps<'button'>) => (
  <button
    type={type}
    className={cn(
      'flex items-center justify-center gap-2 rounded-full bg-brand text-sky-50 transition-opacity hover:opacity-90 disabled:opacity-60',
      className,
    )}
    {...props}
  />
);
