import { type ReactNode } from 'react';

interface SuggestionsListProps {
  children: ReactNode;
  className: string;
}

export const SuggestionsList = ({
  className,
  children,
}: SuggestionsListProps) => {
  return <ul className={className}>{children}</ul>;
};
