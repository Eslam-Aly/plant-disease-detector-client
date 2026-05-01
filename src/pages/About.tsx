import { FiCpu, FiShield, FiBarChart2, FiBookOpen } from "react-icons/fi";

function About() {
  return (
    <section id="about" className=" bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-14 md:py-20 mt-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
            About the Project
          </h2>
          <p className="text-base sm:text-lg text-green-800/90">
            This project presents an uncertainty-aware and explainable deep
            learning system for plant disease diagnosis under real-world
            conditions. It combines convolutional neural network classification
            with confidence estimation, uncertainty-aware recommendation, and
            explanation support to help make agricultural AI outputs safer and
            more interpretable.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left: narrative */}
          <div className="rounded-2xl border border-green-100 bg-white shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">
              Why this matters
            </h3>
            <div className="space-y-4 text-green-800/90 leading-relaxed">
              <p>
                Plant diseases threaten crop yield, food quality, and
                agricultural sustainability. Although image-based deep learning
                models often perform well in controlled datasets, they can
                degrade substantially under field conditions with background
                clutter, variable lighting, occlusion, and symptom variability.
              </p>
              <p>
                This prototype is based on a research workflow that evaluates
                multiple CNN backbones under cross-dataset shift, robustness
                perturbations, uncertainty-aware decision support,
                explainability analysis, and deployment-oriented efficiency
                trade-offs.
              </p>
              <div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  Framework Highlights
                </h3>

                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Cross-dataset evaluation using PlantVillage and PlantDoc
                  </li>
                  <li>
                    Uncertainty-aware actions: accept, monitor, retake, or
                    review
                  </li>
                  <li>
                    Grad-CAM explanation support for model attention analysis
                  </li>
                </ul>
              </div>
              <p className="text-sm text-green-800/80">
                Note: Predictions are probabilistic and may be unreliable under
                severe domain shift, poor image quality, heavy occlusion, or
                visually ambiguous symptoms.
              </p>
            </div>
          </div>

          {/* Right: key points */}
          <div className="rounded-2xl border border-green-100 bg-white shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-green-900 mb-6">
              Key features
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-green-100 bg-green-50/60 p-5">
                <div className="flex items-center gap-3 mb-2 text-green-900">
                  <FiCpu />
                  <h4 className="font-semibold">Model</h4>
                </div>
                <p className="text-sm text-green-800/80">
                  CNN-based plant disease classification with
                  deployment-oriented backbone comparison.
                </p>
              </div>

              <div className="rounded-xl border border-green-100 bg-green-50/60 p-5">
                <div className="flex items-center gap-3 mb-2 text-green-900">
                  <FiBarChart2 />
                  <h4 className="font-semibold">Confidence</h4>
                </div>
                <p className="text-sm text-green-800/80">
                  Outputs confidence and uncertainty signals to support safer
                  decision-making.
                </p>
              </div>

              <div className="rounded-xl border border-green-100 bg-green-50/60 p-5">
                <div className="flex items-center gap-3 mb-2 text-green-900">
                  <FiShield />
                  <h4 className="font-semibold">Decision Support</h4>
                </div>
                <p className="text-sm text-green-800/80">
                  Produces risk-aware recommendations such as accept, monitor,
                  retake, or review.
                </p>
              </div>

              <div className="rounded-xl border border-green-100 bg-green-50/60 p-5">
                <div className="flex items-center gap-3 mb-2 text-green-900">
                  <FiBookOpen />
                  <h4 className="font-semibold">Research</h4>
                </div>
                <p className="text-sm text-green-800/80">
                  Research-driven prototype built around robustness,
                  explainability, and deployment analysis.
                </p>
              </div>
            </div>

            <div className="mt-6 text-sm text-green-800/80 leading-relaxed">
              <p>
                Want details about datasets, uncertainty estimation,
                explainability, or evaluation metrics? The project is part of an
                academic thesis workflow focused on robust plant disease
                diagnosis.
              </p>
            </div>
          </div>
        </div>

        {/* Optional: quick stats row */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-green-100 bg-white p-5 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-900">3 CNNs</p>
            <p className="text-sm text-green-800/80">
              ResNet50, EfficientNet-B0, MobileNetV2
            </p>
          </div>
          <div className="rounded-xl border border-green-100 bg-white p-5 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-900">4 Actions</p>
            <p className="text-sm text-green-800/80">
              Accept, Monitor, Retake, Review
            </p>
          </div>
          <div className="rounded-xl border border-green-100 bg-white p-5 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-900">XAI + UQ</p>
            <p className="text-sm text-green-800/80">
              Grad-CAM and uncertainty-aware support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
