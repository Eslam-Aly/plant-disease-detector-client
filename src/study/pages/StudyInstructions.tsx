import { Link } from "react-router-dom";

function StudyInstructions() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 px-4 py-10 sm:px-6 md:px-8 mt-16">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-2xl border border-green-100 bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-green-900 sm:text-4xl">
              Instructions
            </h1>
            <p className="mt-4 text-base leading-7 text-green-800/90 sm:text-lg">
              In this study, you will review 4 plant diagnosis cases.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-green-100 bg-green-50 p-5">
              <p className="text-sm leading-7 text-green-800/90">
                For each case, please review the displayed system output, choose
                what action you would take, and answer two short rating
                questions.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="mb-4 text-lg font-semibold text-green-900">
                Action meanings
              </h2>
              <div className="space-y-3 text-sm leading-7 text-slate-700">
                <p>
                  <strong>Accept</strong> — the result looks reliable enough to
                  trust.
                </p>
                <p>
                  <strong>Monitor</strong> — the result may be useful, but
                  should be treated cautiously.
                </p>
                <p>
                  <strong>Retake</strong> — the image should be captured again
                  before acting on the result.
                </p>
                <p>
                  <strong>Review</strong> — the result is too uncertain and
                  should be checked more carefully.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm leading-7 text-slate-700">
                Some cases will show a simpler interface, while others will show
                a fuller interface with more decision-support information.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/study/case/1"
              className="rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Begin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudyInstructions;
