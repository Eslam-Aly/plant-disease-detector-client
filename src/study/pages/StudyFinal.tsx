import { useState } from "react";
import { submitStudyResults } from "../../lib/api";
import { useNavigate } from "react-router-dom";

function StudyFinal() {
  const navigate = useNavigate();
  const participantId = localStorage.getItem("study_participant_id") || "";
  const orderId = localStorage.getItem("study_order_id") || "";

  const [clearerVersion, setClearerVersion] = useState<string>("");
  const [moreUsefulVersion, setMoreUsefulVersion] = useState<string>("");
  const [saferVersion, setSaferVersion] = useState<string>("");
  const [reuseScore, setReuseScore] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const isComplete =
    clearerVersion !== "" &&
    moreUsefulVersion !== "" &&
    saferVersion !== "" &&
    reuseScore !== null;

  const handleSubmit = async () => {
    if (!isComplete) return;

    setIsSubmitting(true);
    setSubmitError("");

    const finalResponse = {
      participantId,
      orderId,
      clearerVersion: clearerVersion as "simple" | "full" | "no_difference",
      moreUsefulVersion: moreUsefulVersion as
        | "simple"
        | "full"
        | "no_difference",
      saferVersion: saferVersion as "simple" | "full" | "no_difference",
      reuseScore,
      comment,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("study_final_response", JSON.stringify(finalResponse));

    try {
      const caseResponses = JSON.parse(
        localStorage.getItem("study_case_responses") || "[]",
      );

      await submitStudyResults({
        participantId,
        orderId,
        caseResponses,
        finalResponse,
        submittedAt: new Date().toISOString(),
      });

      navigate("/study/thanks");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Study submission failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonOptions = [
    { value: "simple", label: "Simple interface" },
    { value: "full", label: "Full interface" },
    { value: "no_difference", label: "No difference" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-green-100 bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-green-900 sm:text-4xl">
              Final Questions
            </h1>
            <p className="mt-4 text-base leading-7 text-green-800/90 sm:text-lg">
              Please answer a few short questions about the overall interface
              experience.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm font-medium text-slate-800">
                1. Which version felt clearer?
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {comparisonOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setClearerVersion(option.value)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                      clearerVersion === option.value
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-green-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-800">
                2. Which version felt more useful for decision-making?
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {comparisonOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMoreUsefulVersion(option.value)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                      moreUsefulVersion === option.value
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-green-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-800">
                3. Which version felt safer?
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {comparisonOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSaferVersion(option.value)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                      saferVersion === option.value
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-green-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-800">
                4. Would you use a system like this again?
              </p>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setReuseScore(value)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium transition ${
                      reuseScore === value
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-green-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                1 = Definitely not, 5 = Definitely yes
              </p>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-800">
                5. Any short comment? (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-green-700/30"
                placeholder="Write a short comment here..."
              />
            </div>
          </div>

          {submitError && (
            <p className="mt-6 text-sm text-red-600">{submitError}</p>
          )}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitting}
              className="rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudyFinal;
