interface ErrorMessageProps {
  title: string;
  message: string;
  className?: string;
}

export const ErrorMessage = ({
  title,
  message,
  className = '',
}: ErrorMessageProps) => {
  return (
    <div className={`text-center ${className} w-full`}>
      <h2 className="text-2xl text-primary font-medium py-4">{title}</h2>
      <p>{message}</p>
    </div>
  );
};
