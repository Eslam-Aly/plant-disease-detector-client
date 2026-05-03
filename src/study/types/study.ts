export type StudyInterfaceType = "simple" | "full";

export type StudyDifficulty = "easy" | "hard";

export type StudyAction = "ACCEPT" | "MONITOR" | "RETAKE" | "REVIEW";

export type StudyCase = {
  id: string;
  interfaceType: StudyInterfaceType;
  difficulty: StudyDifficulty;
  image: string;
  predictedClass: string;
  confidence: number;
  uncertainty: number;
  recommendation: StudyAction;
  gradcamImage: string | null;
  safeAction: StudyAction;
  title: string;
  description: string;
};

export type StudyOrder = {
  id: string;
  cases: string[];
};

export type StudyCaseResponse = {
  participantId: string;
  orderId: string;
  caseId: string;
  interfaceType: StudyInterfaceType;
  selectedAction: StudyAction;
  clarityScore: number;
  trustScore: number;
  timestamp: string;
};

export type StudyFinalResponse = {
  participantId: string;
  orderId: string;
  clearerVersion: StudyInterfaceType | "no_difference";
  moreUsefulVersion: StudyInterfaceType | "no_difference";
  saferVersion: StudyInterfaceType | "no_difference";
  reuseScore: number;
  comment: string;
  timestamp: string;
};
