
import type { SymptomAnalysisResult } from '@/types/promptcare';
import UrgencyTag from './UrgencyTag';
import ConditionSuggestions from './ConditionSuggestions';
import BasicAdvice from './BasicAdvice';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ResponseDisplayProps {
  result: SymptomAnalysisResult;
  onRestart: () => void;
}

const ResponseDisplay = ({ result, onRestart }: ResponseDisplayProps) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-promptcare-surface rounded-xl shadow-xl space-y-6 animate-fade-in-up animation-delay-200">
      <div className="text-center">
        <UrgencyTag level={result.urgency} />
      </div>
      <ConditionSuggestions conditions={result.conditions} />
      <BasicAdvice advice={result.advice} />
      <div className="pt-4 text-center">
        <Button onClick={onRestart} variant="outline" className="border-promptcare-primary text-promptcare-primary hover:bg-promptcare-primary hover:text-promptcare-primary-foreground">
          <RefreshCw className="w-4 h-4 mr-2" />
          Start New Session
        </Button>
      </div>
    </div>
  );
};

export default ResponseDisplay;
