
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Spinner from './Spinner';

interface SymptomInputProps {
  onSubmit: (symptoms: string) => void;
  isLoading: boolean;
}

const SymptomInput = ({ onSubmit, isLoading }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState('');
  const charLimit = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim() && !isLoading) {
      onSubmit(symptoms.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= charLimit) {
      setSymptoms(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-4 animate-fade-in-up">
      <Textarea
        value={symptoms}
        onChange={handleChange}
        placeholder="Describe what you’re feeling… e.g., 'I have a throbbing headache on one side and feel nauseous.'"
        className="min-h-[120px] text-base p-4 rounded-xl border-border shadow-sm focus:ring-2 focus:ring-promptcare-primary resize-none"
        disabled={isLoading}
        maxLength={charLimit}
      />
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          {symptoms.length}/{charLimit} characters
        </p>
        <Button 
          type="submit" 
          disabled={isLoading || symptoms.trim().length === 0}
          className="px-8 py-3 text-base bg-promptcare-primary hover:bg-opacity-80 text-promptcare-primary-foreground rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? (
            <div className="flex items-center">
              <Spinner size={20} className="mr-2 text-promptcare-primary-foreground" />
              Analyzing...
            </div>
          ) : (
            'Analyze Symptoms'
          )}
        </Button>
      </div>
    </form>
  );
};

export default SymptomInput;
