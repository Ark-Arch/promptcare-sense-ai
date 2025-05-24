
import { Stethoscope } from 'lucide-react';

interface ConditionSuggestionsProps {
  conditions: string[];
}

const ConditionSuggestions = ({ conditions }: ConditionSuggestionsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-promptcare-primary mb-2 flex items-center">
        <Stethoscope className="w-6 h-6 mr-2" />
        Possible Causes:
      </h3>
      <ul className="list-disc list-inside pl-2 space-y-1 text-gray-700">
        {conditions.map((condition, index) => (
          <li key={index}>{condition}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConditionSuggestions;
