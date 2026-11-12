import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

export const Button = ({ className, type = 'button', ...props }: ComponentProps<'button'>) => (
  <button type={type} className={cn('block bg-primary text-sky-50', className)} {...props} />
);
