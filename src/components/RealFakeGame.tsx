import { useEffect, useMemo, useState } from "react";

type Choice = "real" | "fake" | null;
type ImageKind = "real" | "fake";

type DatasetManifest = {
  real: string[];
  fake: string[];
};

type GameImage = {
  type: ImageKind;
  src: string;
};

const randomFrom = <T,>(items: T[]): T => {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};

function RealFakeGame() {
  const [selected, setSelected] = useState<Choice>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [round, setRound] = useState(0);
  const [dataset, setDataset] = useState<DatasetManifest>({
    real: [],
    fake: [],
  });
  const [datasetError, setDatasetError] = useState<string | null>(null);

  useEffect(() => {
    const loadDataset = async () => {
      try {
        const response = await fetch("/dataset/manifest.json");
        if (!response.ok) {
          throw new Error("Could not load game dataset.");
        }

        const manifest = (await response.json()) as Partial<DatasetManifest>;
        const real = Array.isArray(manifest.real) ? manifest.real : [];
        const fake = Array.isArray(manifest.fake) ? manifest.fake : [];

        if (real.length === 0 || fake.length === 0) {
          throw new Error("Dataset folders are empty.");
        }

        setDataset({ real, fake });
      } catch {
        setDatasetError("Game images are not available right now.");
      }
    };

    void loadDataset();
  }, []);

  // Randomize positions each round
  const images = useMemo<GameImage[]>(() => {
    if (dataset.real.length === 0 || dataset.fake.length === 0) {
      return [];
    }

    const realSrc = `/dataset/real/${randomFrom(dataset.real)}`;
    const fakeSrc = `/dataset/fake/${randomFrom(dataset.fake)}`;
    const order = Math.random() > 0.5;

    return order
      ? [
          { type: "real", src: realSrc },
          { type: "fake", src: fakeSrc },
        ]
      : [
          { type: "fake", src: fakeSrc },
          { type: "real", src: realSrc },
        ];
  }, [dataset, round]);

  const handleSelect = (choice: Choice) => {
    if (selected) return;

    setSelected(choice);

    if (choice === "real") {
      setFeedback("Correct ✅ This image is REAL");
      setUserScore((s) => s + 1);
    } else {
      setFeedback("Wrong ❌ This image is FAKE");
      setAiScore((s) => s + 1);
    }
  };

  const userIsWinning = userScore > aiScore;
  const aiIsWinning = aiScore > userScore;

  const nextRound = () => {
    setSelected(null);
    setFeedback(null);
    setRound((r) => r + 1);
  };

  const resetScore = () => {
    setUserScore(0);
    setAiScore(0);
    setSelected(null);
    setFeedback(null);
    setRound((r) => r + 1);
  };

  return (
    <section className="bg-[#FBF9FE]">
      <div className="min-h-screen container mx-auto space-y-8 md:space-y-10 px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col justify-center items-center pt-12 sm:pt-14 md:pt-16 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#314473]">
            Can You Guess Which One is Real?
          </h2>
          <p className="text-lg mb-2 text-[#314473]">
            Test your skills by identifying the real image.
          </p>
          <p className="font-medium text-[#1a2542]/80">
            Click the image you think is REAL
          </p>

          <div className="mt-4 text-base text-slate-700 font-medium">
            🧑 You: <strong>{userScore}</strong> {userIsWinning ? "🔥" : ""}
            <span className="mx-3">|</span>🤖 AI: <strong>{aiScore}</strong>{" "}
            {aiIsWinning ? "🔥" : ""}
          </div>
        </div>

        {/* Images */}
        {datasetError ? (
          <p className="text-center text-red-600">{datasetError}</p>
        ) : images.length === 0 ? (
          <p className="text-center text-slate-500">Loading game images…</p>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8">
            {images.map((img, idx) => {
              const isWrong = selected && img.type === "fake";
              const isCorrect = selected && img.type === "real";

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(img.type as Choice)}
                  className={`
                    border-4 rounded-xl shadow-lg cursor-pointer transition-all duration-200 sm:w-1/2 max-w-sm sm:max-w-md md:max-w-lg
                    hover:shadow-xl hover:-translate-y-1 
                    ${isCorrect ? "border-green-500 ring-4 ring-green-300" : ""}
                    ${isWrong ? "border-red-500 ring-4 ring-red-300" : "border-slate-800"}
                  `}
                >
                  <img
                    src={img.src}
                    alt={img.type}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
            <p className="text-xl font-semibold text-[#314473]">{feedback}</p>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={nextRound}
                className="w-full sm:w-auto px-6 py-2 bg-[#314473] text-white rounded-lg hover:bg-[#25365E]"
              >
                Next Round
              </button>
              <button
                onClick={resetScore}
                className="w-full sm:w-auto px-6 py-2 border border-[#314473] text-[#314473] rounded-lg hover:bg-slate-100"
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
