import { useEffect, useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import { FiTrash2 } from "react-icons/fi";

type Recommendation = "ACCEPT" | "MONITOR" | "RETAKE" | "REVIEW";

type ResultState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success";
      label: string;
      confidence: number;
      uncertainty: number;
      recommendation: Recommendation;
      explanationSupport: "strong" | "moderate" | "weak";
    }
  | { status: "error"; message: string };

function DeepFakeDetector() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState>({ status: "idle" });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (f: File | null) => {
    if (!f) return;

    if (!["image/jpeg", "image/png"].includes(f.type)) {
      setResult({
        status: "error",
        message: "Only JPG or PNG plant images are allowed.",
      });
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      setResult({ status: "error", message: "Max file size is 5MB." });
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResult({ status: "idle" });
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setResult({ status: "idle" });
  };

  const handleDetect = async () => {
    if (!file) return;

    setResult({ status: "loading" });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const placeholderOutputs = [
      {
        label: "Tomato Early Blight",
        confidence: 86,
        uncertainty: 18,
        recommendation: "ACCEPT" as Recommendation,
        explanationSupport: "strong" as const,
      },
      {
        label: "Apple Scab",
        confidence: 64,
        uncertainty: 33,
        recommendation: "MONITOR" as Recommendation,
        explanationSupport: "moderate" as const,
      },
      {
        label: "Corn Leaf Blight",
        confidence: 53,
        uncertainty: 46,
        recommendation: "RETAKE" as Recommendation,
        explanationSupport: "moderate" as const,
      },
      {
        label: "Potato Early Blight",
        confidence: 39,
        uncertainty: 61,
        recommendation: "REVIEW" as Recommendation,
        explanationSupport: "weak" as const,
      },
    ];

    const selectedOutput =
      placeholderOutputs[Math.floor(Math.random() * placeholderOutputs.length)];

    setResult({
      status: "success",
      ...selectedOutput,
    });
  };

  return (
    <div
      id="detector"
      className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 px-4 py-10 sm:px-6 md:px-8 scroll-mt-32"
    >
      {/* Title */}
      <div className="flex flex-col items-center mb-10 md:mb-12 space-y-3 md:space-y-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
          Plant Disease Detector
        </h2>
        <p className="text-base sm:text-lg text-green-800/90">
          Upload a plant leaf image and receive a placeholder disease
          prediction, uncertainty-aware recommendation, and explanation support.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto flex flex-col lg:flex-row justify-center gap-6 sm:gap-8 max-w-6xl">
        {/* Upload Card */}
        <div className="w-full lg:w-1/2 rounded-2xl border border-green-100 bg-white shadow-lg p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            Upload Plant Image
          </h3>

          {!previewUrl ? (
            <label className="border-2 border-dashed border-green-200 bg-green-50 h-56 sm:h-64 flex flex-col justify-center items-center cursor-pointer hover:bg-green-100 transition rounded-xl">
              <CgSoftwareUpload size={36} className="text-green-700 mb-2" />
              <p className="text-green-800 text-center">
                Click to upload a plant leaf image
                <br />
                or drag and drop
              </p>
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
            </label>
          ) : (
            <div className="relative h-56 sm:h-64 flex justify-center items-center bg-green-50 rounded-xl">
              <img
                src={previewUrl}
                alt="preview"
                className="h-full object-contain rounded-lg"
              />
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-green-50"
              >
                <FiTrash2 className="text-red-600" />
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={handleDetect}
              disabled={!file || result.status === "loading"}
              className="flex-1 bg-green-700 text-white py-2 rounded-lg disabled:opacity-50 hover:bg-green-800"
            >
              {result.status === "loading" ? "Analyzing..." : "Analyze"}
            </button>
            <button
              onClick={removeFile}
              disabled={!file}
              className="flex-1 border border-green-700 text-green-800 py-2 rounded-lg disabled:opacity-40 hover:bg-green-50"
            >
              Choose Another
            </button>
          </div>

          <p className="text-sm text-green-800/70 mt-4">
            JPG/PNG • Max 5MB • Placeholder predictions for prototype UI
          </p>
        </div>

        {/* Results Card */}
        <div className="w-full lg:w-1/2 rounded-2xl border border-green-100 bg-white shadow-lg p-5 sm:p-6 flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-semibold text-green-900 mb-6">Results</h3>

          {result.status === "idle" && (
            <p className="text-slate-500">
              Upload a plant image to see the placeholder analysis result
            </p>
          )}

          {result.status === "loading" && (
            <p className="text-green-800 animate-pulse">
              Analyzing plant image…
            </p>
          )}

          {result.status === "error" && (
            <p className="text-red-600">{result.message}</p>
          )}

          {result.status === "success" && (
            <>
              <div
                className={`px-6 py-2 rounded-lg text-white text-2xl font-bold mb-4 ${
                  result.recommendation === "ACCEPT"
                    ? "bg-green-600"
                    : result.recommendation === "MONITOR"
                      ? "bg-amber-500"
                      : result.recommendation === "RETAKE"
                        ? "bg-blue-600"
                        : "bg-slate-700"
                }`}
              >
                {result.recommendation}
              </div>

              <p className="text-lg mb-2">
                Predicted disease: <strong>{result.label}</strong>
              </p>
              <p className="text-sm text-slate-600 mb-2">
                Confidence: <strong>{result.confidence}%</strong>
              </p>
              <p className="text-sm text-slate-600 mb-2">
                Uncertainty: <strong>{result.uncertainty}%</strong>
              </p>
              <p className="text-sm text-slate-600 mb-4">
                Explanation support:{" "}
                <strong className="capitalize">
                  {result.explanationSupport}
                </strong>
              </p>

              <div className="w-full max-w-md bg-slate-200 rounded-full h-3 mb-6">
                <div
                  className="h-3 rounded-full bg-green-700"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>

              <div className="w-full max-w-md rounded-xl bg-green-50 border border-green-100 p-4 mb-4 text-left">
                <p className="text-sm font-semibold text-green-900 mb-1">
                  Recommendation
                </p>
                <p className="text-sm text-slate-600 leading-6">
                  {result.recommendation === "ACCEPT" &&
                    "This case appears reliable enough for acceptance under the current placeholder logic."}
                  {result.recommendation === "MONITOR" &&
                    "This case looks plausible, but the result should be monitored instead of fully trusted."}
                  {result.recommendation === "RETAKE" &&
                    "This image may still contain useful signal, but it should be retaken before acting on the result."}
                  {result.recommendation === "REVIEW" &&
                    "This case is too uncertain for automated action and should be reviewed more carefully."}
                </p>
              </div>

              <div className="w-full max-w-md rounded-xl border border-dashed border-green-200 bg-green-50 p-6 mb-4">
                <p className="text-sm font-semibold text-green-900 mb-2">
                  Grad-CAM Placeholder
                </p>
                <div className="h-32 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-sm text-slate-400">
                  Explanation heatmap will appear here later
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-2">
                This prototype currently shows placeholder results for UI
                development.
              </p>
              <p className="text-xs text-slate-400">
                Future version: CNN prediction + uncertainty + explanation-aware
                support
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeepFakeDetector;
