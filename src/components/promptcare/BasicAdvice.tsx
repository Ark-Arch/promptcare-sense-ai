
import { Lightbulb } from 'lucide-react';

interface BasicAdviceProps {
  advice: string[];
}

const BasicAdvice = ({ advice }: BasicAdviceProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-promptcare-primary mb-2 flex items-center">
        <Lightbulb className="w-6 h-6 mr-2" />
        Basic Advice:
      </h3>
      <ul className="list-disc list-inside pl-2 space-y-1 text-gray-700">
        {advice.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default BasicAdvice;
