export type Recommendation = "ACCEPT" | "MONITOR" | "RETAKE" | "REVIEW";
export type ExplanationSupport = "strong" | "moderate" | "weak";

export type PredictionResponse = {
  label: string;
  confidence: number;
  uncertainty: number;
  recommendation: Recommendation;
  explanation_support: ExplanationSupport;
  gradcam_base64?: string | null;
};

export type StudyCaseResponsePayload = {
  participantId: string;
  orderId: string;
  caseId: string;
  interfaceType: "simple" | "full";
  selectedAction: Recommendation;
  clarityScore: number;
  trustScore: number;
  timestamp: string;
};

export type StudyFinalResponsePayload = {
  participantId: string;
  orderId: string;
  clearerVersion: "simple" | "full" | "no_difference";
  moreUsefulVersion: "simple" | "full" | "no_difference";
  saferVersion: "simple" | "full" | "no_difference";
  reuseScore: number;
  comment: string;
  timestamp: string;
};

export type StudySubmissionRequest = {
  participantId: string;
  orderId: string;
  caseResponses: StudyCaseResponsePayload[];
  finalResponse: StudyFinalResponsePayload;
  submittedAt: string;
};

export type StudySubmissionResponse = {
  success: boolean;
  message: string;
  total_submissions: number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_PREDICT_PATH =
  import.meta.env.VITE_API_PREDICT_PATH || "/api/predict";
const API_STUDY_SUBMIT_PATH = "/api/study/submit";

const buildUrl = () => {
  if (/^https?:\/\//.test(API_PREDICT_PATH)) return API_PREDICT_PATH;
  return `${API_BASE_URL}${API_PREDICT_PATH}`;
};

const buildStudySubmitUrl = () => {
  if (/^https?:\/\//.test(API_STUDY_SUBMIT_PATH)) return API_STUDY_SUBMIT_PATH;
  return `${API_BASE_URL}${API_STUDY_SUBMIT_PATH}`;
};

export async function predictPlantDisease(
  file: File,
): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(buildUrl(), {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || "Prediction request failed.");
  }

  return data as PredictionResponse;
}

export async function submitStudyResults(
  payload: StudySubmissionRequest,
): Promise<StudySubmissionResponse> {
  const response = await fetch(buildStudySubmitUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || "Study submission failed.");
  }

  return data as StudySubmissionResponse;
}
