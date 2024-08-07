import weatherIcon from '../assets/weatherIcons/02d.png';

interface LoadingMessageProps {
  message: string;
  className?: string;
}

export const LoadingMessage = ({
  message,
  className = '',
}: LoadingMessageProps) => {
  return (
    <div
      className={`mx-auto h-full flex flex-col items-center justify-center gap-4 animate-pulse ${className}`}
    >
      <p className="text-primary text-xl">{message}</p>
      <img
        src={weatherIcon}
        alt="Clima"
        width={80}
        height={80}
        className="animate-pulse"
      />
    </div>
  );
};
