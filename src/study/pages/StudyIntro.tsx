import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studyOrders } from "../data/ studyOrders";

function StudyIntro() {
  const navigate = useNavigate();
  const [consentAccepted, setConsentAccepted] = useState(false);

  const handleStartStudy = () => {
    if (!consentAccepted) return;

    const selectedOrder =
      studyOrders[Math.floor(Math.random() * studyOrders.length)];

    const participantId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `participant_${Date.now()}`;

    localStorage.setItem("study_participant_id", participantId);
    localStorage.setItem("study_order_id", selectedOrder.id);
    localStorage.setItem(
      "study_case_order",
      JSON.stringify(selectedOrder.cases),
    );
    localStorage.removeItem("study_case_responses");
    localStorage.removeItem("study_final_response");

    navigate("/study/instructions");
  };
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-2xl border border-green-100 bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-green-900 sm:text-4xl">
              Plant Diagnosis Interface Study
            </h1>
            <p className="mt-4 text-base leading-7 text-green-800/90 sm:text-lg">
              You will review 4 example plant diagnosis cases and answer a few
              short questions. The study takes about 5 minutes.
            </p>
          </div>

          <div className="rounded-xl border border-green-100 bg-green-50 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-900">
              Consent
            </p>
            <p className="text-sm leading-7 text-green-800/90">
              By continuing, you confirm that your participation is voluntary
              and that your responses will be used only for academic evaluation.
              No sensitive personal data is required.
            </p>
          </div>

          <label className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-green-700 focus:ring-green-700/30"
            />
            <span className="text-sm leading-6 text-slate-700">
              I agree to participate in this study.
            </span>
          </label>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleStartStudy}
              disabled={!consentAccepted}
              className="rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start Study
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudyIntro;
