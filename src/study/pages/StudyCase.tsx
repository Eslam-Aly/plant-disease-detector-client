import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { studyCases } from "../data/studyCases";
import { studyOrders } from "../data/ studyOrders";
import type { StudyAction, StudyCase as StudyCaseType } from "../types/study";

const actionOptions: StudyAction[] = ["ACCEPT", "MONITOR", "RETAKE", "REVIEW"];
const likertOptions = [1, 2, 3, 4, 5];

function StudyCase() {
  const navigate = useNavigate();
  const { id } = useParams();

  const caseIndex = Math.max(0, Number(id || "1") - 1);
  const participantId = localStorage.getItem("study_participant_id") || "";
  const orderId = localStorage.getItem("study_order_id") || "";

  const orderedCaseIds = useMemo<string[]>(() => {
    const stored = localStorage.getItem("study_case_order");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.every((item) => typeof item === "string")
        ) {
          return parsed;
        }
      } catch {
        // fall back to default order below
      }
    }

    return studyOrders[0]?.cases ?? [];
  }, []);

  const studyCase: StudyCaseType | undefined = useMemo(() => {
    const selectedCaseId = orderedCaseIds[caseIndex];
    return studyCases.find((entry) => entry.id === selectedCaseId);
  }, [caseIndex, orderedCaseIds]);

  const [selectedAction, setSelectedAction] = useState<StudyAction | null>(
    null,
  );
  const [clarityScore, setClarityScore] = useState<number | null>(null);
  const [trustScore, setTrustScore] = useState<number | null>(null);

  useEffect(() => {
    setSelectedAction(null);
    setClarityScore(null);
    setTrustScore(null);
  }, [studyCase?.id]);

  const isComplete =
    selectedAction !== null && clarityScore !== null && trustScore !== null;

  const handleNext = () => {
    if (!studyCase || !isComplete) return;

    const responses = JSON.parse(
      localStorage.getItem("study_case_responses") || "[]",
    );
    const updated = responses.filter(
      (entry: { caseId: string }) => entry.caseId !== studyCase.id,
    );

    updated.push({
      participantId,
      orderId,
      caseId: studyCase.id,
      interfaceType: studyCase.interfaceType,
      selectedAction,
      clarityScore,
      trustScore,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem("study_case_responses", JSON.stringify(updated));

    if (caseIndex < orderedCaseIds.length - 1) {
      navigate(`/study/case/${caseIndex + 2}`);
    } else {
      navigate("/study/final");
    }
  };

  if (!studyCase) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 px-4 py-10 sm:px-6 md:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-2xl border border-green-100 bg-white p-8 text-center shadow-lg sm:p-10">
            <h1 className="text-2xl font-bold text-green-900">
              Study case not found
            </h1>
            <div className="mt-6">
              <Link
                to="/study"
                className="rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800"
              >
                Back to Study
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 px-4 py-8 sm:px-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-green-800/70">
                {studyCase.title}
              </p>
              <h1 className="text-2xl font-bold text-green-900 sm:text-3xl">
                Case {caseIndex + 1} of {orderedCaseIds.length}
              </h1>
            </div>
            <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-900">
              {studyCase.interfaceType === "simple"
                ? "Simple Interface"
                : "Full Interface"}
            </div>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-green-700"
              style={{
                width: `${((caseIndex + 1) / orderedCaseIds.length) * 100}%`,
              }}
            />
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-700">
            {studyCase.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-lg sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-green-900">
              Case Image
            </h2>
            <img
              src={studyCase.image}
              alt={studyCase.predictedClass}
              className="w-full rounded-xl border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-lg sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-green-900">
              System Output
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Predicted class
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {studyCase.predictedClass}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Confidence
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {studyCase.confidence}%
                </p>
              </div>

              {studyCase.interfaceType === "full" && (
                <>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Uncertainty
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {studyCase.uncertainty}%
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-green-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-green-800/70">
                      Recommendation
                    </p>
                    <p className="mt-2 text-lg font-semibold text-green-900">
                      {studyCase.recommendation}
                    </p>
                  </div>

                  <div className="rounded-xl border border-dashed border-green-200 bg-green-50 p-4">
                    <p className="mb-3 text-sm font-semibold text-green-900">
                      Grad-CAM Explanation
                    </p>
                    {studyCase.gradcamImage ? (
                      <img
                        src={studyCase.gradcamImage}
                        alt="Grad-CAM explanation"
                        className="w-full rounded-lg border border-slate-200 bg-white"
                      />
                    ) : (
                      <div className="flex h-32 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm text-slate-400">
                        Grad-CAM image not available
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-green-100 bg-white p-5 shadow-lg sm:p-6">
          <h2 className="mb-6 text-xl font-semibold text-green-900">
            Questions
          </h2>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm font-medium text-slate-800">
                1. What would you do with this result?
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {actionOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedAction(option)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                      selectedAction === option
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-green-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-800">
                2. How clear was this output?
              </p>
              <div className="flex flex-wrap gap-3">
                {likertOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setClarityScore(value)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium transition ${
                      clarityScore === value
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-green-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                1 = Very unclear, 5 = Very clear
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-800">
                3. How much would you trust this output?
              </p>
              <div className="flex flex-wrap gap-3">
                {likertOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTrustScore(value)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium transition ${
                      trustScore === value
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-green-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                1 = Not at all, 5 = Very much
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!isComplete}
              className="rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {caseIndex < orderedCaseIds.length - 1 ? "Next" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudyCase;
