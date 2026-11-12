import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  textOnly?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

export const Button = ({ children, textOnly, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`block bg-primary text-sky-50 ${textOnly ? '' : ''} ${className ? className : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
