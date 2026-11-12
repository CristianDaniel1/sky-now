interface ErrorMessageProps {
  title: string;
  message: string;
  className?: string;
}

export const ErrorMessage = ({ title, message, className = '' }: ErrorMessageProps) => {
  return (
    <div className={`text-center ${className} w-full`}>
      <h2 className="py-4 text-2xl font-medium text-primary">{title}</h2>
      <p>{message}</p>
    </div>
  );
};
