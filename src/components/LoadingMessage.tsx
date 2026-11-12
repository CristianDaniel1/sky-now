import weatherIcon from '../assets/weatherIcons/02d.png';

interface LoadingMessageProps {
  message: string;
  className?: string;
}

export const LoadingMessage = ({ message, className = '' }: LoadingMessageProps) => {
  return (
    <div
      className={`mx-auto flex h-full animate-pulse flex-col items-center justify-center gap-4 ${className}`}
    >
      <p className="text-xl text-primary">{message}</p>
      <img src={weatherIcon} alt="Clima" width={80} height={80} className="animate-pulse" />
    </div>
  );
};
