
import { useState } from 'react';
import type { AppState, SymptomAnalysisResult } from '@/types/promptcare';
import Header from '@/components/promptcare/Header';
import SymptomInput from '@/components/promptcare/SymptomInput';
import ResponseDisplay from '@/components/promptcare/ResponseDisplay';
import NearbyClinics from '@/components/promptcare/NearbyClinics';
import Footer from '@/components/promptcare/Footer';
import { toast } from 'sonner';

// Mock AI analysis function
const mockAnalyzeSymptoms = (symptoms: string): Promise<SymptomAnalysisResult> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (symptoms.toLowerCase().includes("error test")) {
        reject(new Error("Simulated analysis error"));
        return;
      }

      let result: SymptomAnalysisResult;
      if (symptoms.toLowerCase().includes("headache") && symptoms.toLowerCase().includes("nausea")) {
        result = {
          urgency: "See a doctor soon",
          conditions: ["Migraine", "Tension Headache", "Dehydration"],
          advice: ["Rest in a dark, quiet room.", "Stay hydrated by drinking plenty of water.", "Consider over-the-counter pain relievers if appropriate."],
        };
      } else if (symptoms.toLowerCase().includes("chest pain") && symptoms.toLowerCase().includes("breath")) {
        result = {
          urgency: "Emergency",
          conditions: ["Possible Cardiac Event", "Severe Asthma Attack", "Pulmonary Embolism"],
          advice: ["Call emergency services (e.g., 911 or local equivalent) immediately.", "Try to remain calm and rest in a comfortable position.", "If prescribed, use an emergency inhaler for asthma."],
        };
      } else {
        result = {
          urgency: "Monitor at home",
          conditions: ["Common Cold", "Mild Fatigue", "Stress"],
          advice: ["Get plenty of rest.", "Drink warm fluids like tea or soup.", "Monitor your symptoms for any changes."],
        };
      }
      resolve(result);
    }, 2000); // Simulate 2-second analysis
  });
};


const Index = () => {
  const [appState, setAppState] = useState<AppState>("initial");
  const [analysisResult, setAnalysisResult] = useState<SymptomAnalysisResult | null>(null);
  // symptômes is not used directly, but kept for potential future use with SymptomInput state management
  // const [symptoms, setSymptoms] = useState(""); 

  const handleSymptomSubmit = async (submittedSymptoms: string) => {
    setAppState("loading");
    setAnalysisResult(null);
    // setSymptoms(submittedSymptoms); // If you want to store submitted symptoms in Index page state

    try {
      const result = await mockAnalyzeSymptoms(submittedSymptoms);
      setAnalysisResult(result);
      setAppState("results");
    } catch (error) {
      console.error("Analysis error:", error);
      setAppState("error");
      toast.error("Something went wrong during analysis. Please try again.", {
        description: (error as Error).message || "An unknown error occurred.",
      });
      // Optionally reset to initial after error to allow retry
      setTimeout(() => setAppState("initial"), 3000);
    }
  };

  const handleRestartSession = () => {
    setAppState("initial");
    setAnalysisResult(null);
    // setSymptoms(""); 
    // Reset SymptomInput component's internal state by re-rendering or passing a key
  };

  return (
    <div className="flex flex-col min-h-screen bg-promptcare-subtle-bg">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        {appState !== "results" && (
          <section className="w-full flex flex-col items-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 text-center mt-4 mb-6">
              How are you feeling today?
            </h2>
            <SymptomInput
              onSubmit={handleSymptomSubmit}
              isLoading={appState === "loading"}
              // key={appState === 'initial' ? 'initial-input' : 'active-input'} // Force re-render on restart
            />
          </section>
        )}

        {appState === "results" && analysisResult && (
          <>
            <ResponseDisplay result={analysisResult} onRestart={handleRestartSession} />
            <NearbyClinics />
          </>
        )}
        
        {appState === "loading" && (
           <p className="mt-8 text-lg text-promptcare-primary animate-pulse-subtle">Checking your symptoms, please wait...</p>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Index;

