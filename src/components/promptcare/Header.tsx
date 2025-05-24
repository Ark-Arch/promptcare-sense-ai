
import { HeartPulse } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-8 text-center bg-promptcare-primary shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-2">
          <HeartPulse className="w-12 h-12 text-promptcare-primary-foreground mr-3" />
          <h1 className="text-4xl font-bold text-promptcare-primary-foreground">PromptCare</h1>
        </div>
        <p className="text-lg text-promptcare-primary-foreground opacity-90">
          Understand your symptoms in plain language.
        </p>
      </div>
    </header>
  );
};

export default Header;
