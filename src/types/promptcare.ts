
export type UrgencyLevel = "Emergency" | "See a doctor soon" | "Monitor at home";

export interface SymptomAnalysisResult {
  urgency: UrgencyLevel;
  conditions: string[];
  advice: string[];
}

export interface Clinic {
  id: string;
  name: string;
  distance: string;
  mapUrl: string;
}

export type AppState = "initial" | "loading" | "error" | "results";

