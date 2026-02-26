import { FiCpu, FiShield, FiBarChart2, FiBookOpen } from "react-icons/fi";

function About() {
  return (
    <section id="about" className="bg-[#FBF9FE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-14 md:py-20 mt-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#314473]">
            About the Project
          </h2>
          <p className="text-base sm:text-lg text-[#314473]/90">
            This project presents a transfer learning–based deep learning system
            for detecting AI-generated (synthetic) faces using the Xception
            architecture. As generative models become increasingly realistic,
            robust detection tools are essential to combat misinformation,
            identity misuse, and digital manipulation.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left: narrative */}
          <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-[#314473] mb-4">
              Why this matters
            </h3>
            <div className="space-y-4 text-[#314473]/90 leading-relaxed">
              <p>
                Deepfakes can be used to spread misinformation, harm
                reputations, and bypass identity verification. As synthetic
                media becomes more accessible, reliable detection tools are
                increasingly important for platforms and end users.
              </p>
              <p>
                The Xception model was fully fine-tuned on a balanced dataset of
                real and synthetic faces and evaluated on a held-out test set of
                1,205 images.
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Performance Highlights
                </h3>

                <ul className="list-disc list-inside space-y-1">
                  <li>89.88% test accuracy</li>
                  <li>F1-score: 0.90</li>
                  <li>Evaluated on 1,205 unseen test images</li>
                </ul>
              </div>
              <p className="text-sm text-[#314473">
                Note: Predictions are probabilistic and may be wrong on
                low-quality images, heavy compression, or unseen manipulation
                techniques.
              </p>
            </div>
          </div>

          {/* Right: key points */}
          <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-[#314473] mb-6">
              Key features
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-2 text-[#314473]">
                  <FiCpu />
                  <h4 className="font-semibold">Model</h4>
                </div>
                <p className="text-sm text-[#314473]/80">
                  Xception with transfer learning for real vs fake
                  classification.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-2 text-[#314473]">
                  <FiBarChart2 />
                  <h4 className="font-semibold">Confidence</h4>
                </div>
                <p className="text-sm text-[#314473]/80">
                  Outputs a confidence score to help interpret the prediction.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-2 text-[#314473]">
                  <FiShield />
                  <h4 className="font-semibold">Privacy-first</h4>
                </div>
                <p className="text-sm text-[#314473]/80">
                  Uploads are processed temporarily and not stored.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-2 text-[#314473]">
                  <FiBookOpen />
                  <h4 className="font-semibold">Research</h4>
                </div>
                <p className="text-sm text-[#314473]/80">
                  Academic research with documented methodology and evaluation
                  metrics.
                </p>
              </div>
            </div>

            <div className="mt-6 text-sm text-[#314473]/80 leading-relaxed">
              <p>
                Want details about datasets, training settings, or evaluation
                metrics? Check the paper and GitHub links in the footer.
              </p>
            </div>
          </div>
        </div>

        {/* Optional: quick stats row */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white/70 p-5 text-center">
            <p className="text-2xl font-bold text-[#314473]">Xception</p>
            <p className="text-sm text-[#314473]/80">Transfer learning base</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/70 p-5 text-center">
            <p className="text-2xl font-bold text-[#314473]">REAL/FAKE</p>
            <p className="text-sm text-[#314473]/80">Binary classification</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/70 p-5 text-center">
            <p className="text-2xl font-bold text-[#314473]">Privacy</p>
            <p className="text-sm text-[#314473]/80">No stored uploads</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
