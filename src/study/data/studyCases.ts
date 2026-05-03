import type { StudyCase } from "../types/study";

export const studyCases: StudyCase[] = [
  {
    id: "simple_easy",
    interfaceType: "simple",
    difficulty: "easy",
    image: "/study/cases/tomato-septoria-accept.jpg",
    predictedClass: "Tomato Septoria leaf spot",
    confidence: 89,
    uncertainty: 5,
    recommendation: "ACCEPT",
    gradcamImage: null,
    safeAction: "ACCEPT",
    title: "Case 1",
    description:
      "Please review the system output and answer the questions below.",
  },
  {
    id: "simple_hard",
    interfaceType: "simple",
    difficulty: "hard",
    image: "/study/cases/tomato-late-blight-review.jpg",
    predictedClass: "Tomato leaf late blight",
    confidence: 38,
    uncertainty: 57,
    recommendation: "REVIEW",
    gradcamImage: null,
    safeAction: "REVIEW",
    title: "Case 2",
    description:
      "Please review the system output and answer the questions below.",
  },
  {
    id: "full_easy",
    interfaceType: "full",
    difficulty: "easy",
    image: "/study/cases/tomato-late-blight-monitor.jpg",
    predictedClass: "Tomato leaf late blight",
    confidence: 72,
    uncertainty: 33,
    recommendation: "MONITOR",
    gradcamImage: "/study/gradcam/tomato-late-blight-monitor-gradcam.png",
    safeAction: "MONITOR",
    title: "Case 3",
    description:
      "Please review the system output and answer the questions below.",
  },
  {
    id: "full_hard",
    interfaceType: "full",
    difficulty: "hard",
    image: "/study/cases/tomato-late-blight-retake.jpg",
    predictedClass: "Tomato leaf late blight",
    confidence: 63,
    uncertainty: 50,
    recommendation: "RETAKE",
    gradcamImage: "/study/gradcam/tomato-late-blight-retake-gradcam.png",
    safeAction: "RETAKE",
    title: "Case 4",
    description:
      "Please review the system output and answer the questions below.",
  },
];
