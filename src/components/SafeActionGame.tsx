import { useEffect, useMemo, useState } from "react";

type Choice = "accept" | "monitor" | "retake" | "review" | null;

type GameCase = {
  image: string;
  predictedDisease: string;
  confidence: number;
  uncertainty: number;
  explanationSupport: string;
  correctAction: Exclude<Choice, null>;
  explanation: string;
};

type GameManifest = GameCase[];

const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

function RealFakeGame() {
  const [selected, setSelected] = useState<Choice>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [systemScore, setSystemScore] = useState(0);
  const [round, setRound] = useState(0);

  const [cases, setCases] = useState<GameManifest>([]);
  const [datasetError, setDatasetError] = useState<string | null>(null);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const response = await fetch("/game/manifest.json");
        if (!response.ok) {
          throw new Error("Could not load game cases.");
        }

        const manifest = (await response.json()) as GameManifest;

        if (!Array.isArray(manifest) || manifest.length === 0) {
          throw new Error("Game manifest is empty.");
        }

        setCases(shuffleArray(manifest));
      } catch {
        setDatasetError("Game cases are not available right now.");
      }
    };

    void loadCases();
  }, []);

  const currentCase = useMemo(() => {
    if (cases.length === 0) return null;
    return cases[round % cases.length];
  }, [cases, round]);

  const handleSelect = (choice: Choice) => {
    if (selected || !choice || !currentCase) return;

    setSelected(choice);

    if (choice === currentCase.correctAction) {
      setFeedback(
        `Correct ✅ The safest action is ${currentCase.correctAction.toUpperCase()}`,
      );
      setUserScore((s) => s + 1);
    } else {
      setFeedback(
        `Not quite ❌ The safest action is ${currentCase.correctAction.toUpperCase()}`,
      );
      setSystemScore((s) => s + 1);
    }
  };

  const userIsWinning = userScore > systemScore;
  const systemIsWinning = systemScore > userScore;

  const nextRound = () => {
    setSelected(null);
    setFeedback(null);
    setRound((r) => r + 1);
  };

  const resetScore = () => {
    setUserScore(0);
    setSystemScore(0);
    setSelected(null);
    setFeedback(null);
    setCases((prev) => shuffleArray(prev));
    setRound((r) => r + 1);
  };

  return (
    <section className="bg-gradient-to-t from-green-50 via-white to-slate-50">
      <div className="min-h-screen container mx-auto space-y-8 md:space-y-10 px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col justify-center items-center pt-12 sm:pt-14 md:pt-16 text-center">
          <h2 className="text-4xl font-bold mb-4 text-green-900">
            Can You Choose the Safest Action?
          </h2>
          <p className="text-lg mb-2 text-green-800">
            Use the model output to decide whether the case should be accepted,
            monitored, retaken, or reviewed.
          </p>
          <p className="font-medium text-green-800/80">
            Choose the safest recommendation based on the current placeholder
            case.
          </p>

          <div className="mt-4 text-base text-green-900 font-medium">
            🧑 You: <strong>{userScore}</strong> {userIsWinning ? "🔥" : ""}
            <span className="mx-3">|</span>🌿 System:{" "}
            <strong>{systemScore}</strong> {systemIsWinning ? "🔥" : ""}
          </div>
        </div>

        {/* Cases and Controls */}
        {datasetError ? (
          <p className="text-center text-red-600">{datasetError}</p>
        ) : !currentCase ? (
          <p className="text-center text-slate-500">Loading game cases…</p>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border-2 border-slate-800 bg-slate-50 p-3">
                  <img
                    src={currentCase.image}
                    alt={currentCase.predictedDisease}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>

                <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-green-800">
                      Predicted disease
                    </p>
                    <p className="text-2xl font-bold text-green-900">
                      {currentCase.predictedDisease}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <p className="text-sm text-green-800">Confidence</p>
                      <p className="text-xl font-semibold text-green-900">
                        {currentCase.confidence.toFixed(2)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <p className="text-sm text-green-800">Uncertainty</p>
                      <p className="text-xl font-semibold text-green-900">
                        {currentCase.uncertainty.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-4 shadow-sm">
                    <p className="text-sm text-green-800">
                      Explanation support
                    </p>
                    <p className="text-lg font-semibold capitalize text-green-900">
                      {currentCase.explanationSupport}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              <button
                onClick={() => handleSelect("accept")}
                className="rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-60"
                disabled={!!selected}
              >
                Accept
              </button>
              <button
                onClick={() => handleSelect("monitor")}
                className="rounded-lg bg-amber-500 px-4 py-3 font-medium text-white hover:bg-amber-600 disabled:opacity-60"
                disabled={!!selected}
              >
                Monitor
              </button>
              <button
                onClick={() => handleSelect("retake")}
                className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={!!selected}
              >
                Retake
              </button>
              <button
                onClick={() => handleSelect("review")}
                className="rounded-lg bg-slate-700 px-4 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-60"
                disabled={!!selected}
              >
                Review
              </button>
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto pb-20">
            <p className="text-xl font-semibold text-green-900">{feedback}</p>
            <p className="text-center text-green-800">
              {currentCase?.explanation}
            </p>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={nextRound}
                className="w-full sm:w-auto px-6 py-2 bg-green-800 text-green-100 rounded-lg hover:bg-green-600 cursor-pointer"
              >
                Next Round
              </button>
              <button
                onClick={resetScore}
                className="w-full sm:w-auto px-6 py-2 border border-[#314473] text-green-800 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Reset Score
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RealFakeGame;
