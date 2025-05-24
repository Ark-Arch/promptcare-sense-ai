
import type { UrgencyLevel } from '@/types/promptcare';

interface UrgencyTagProps {
  level: UrgencyLevel;
}

const UrgencyTag = ({ level }: UrgencyTagProps) => {
  let bgColor = '';
  let textColor = 'text-promptcare-monitor-foreground'; // Default for green

  switch (level) {
    case 'Emergency':
      bgColor = 'bg-promptcare-urgent';
      textColor = 'text-promptcare-urgent-foreground';
      break;
    case 'See a doctor soon':
      bgColor = 'bg-promptcare-soon';
      textColor = 'text-promptcare-soon-foreground';
      break;
    case 'Monitor at home':
      bgColor = 'bg-promptcare-monitor';
      break;
  }

  return (
    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${bgColor} ${textColor} shadow`}>
      {level}
    </div>
  );
};

export default UrgencyTag;
