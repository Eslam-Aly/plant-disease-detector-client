import { Link } from "react-router-dom";

function StudyThanks() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 px-4 py-10 sm:px-6 md:px-8 ">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-2xl border border-green-100 bg-white p-8 text-center shadow-lg sm:p-10">
          <h1 className="text-3xl font-bold text-green-900 sm:text-4xl">
            Thank You
          </h1>
          <p className="mt-4 text-base leading-7 text-green-800/90 sm:text-lg">
            Your responses have been submitted successfully.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Thank you for helping evaluate this plant diagnosis prototype.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudyThanks;
