
import { LoaderCircle } from 'lucide-react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner = ({ size = 24, className }: SpinnerProps) => {
  return (
    <LoaderCircle
      className={`animate-spin text-promptcare-primary ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;
