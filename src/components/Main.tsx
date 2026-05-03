import heroImg from "../assets/plantBG.png";
import { Link } from "react-router-dom";

function Main() {
  return (
    <section className="bg-gradient-to-b from-green-50 via-white to-slate-50">
      <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat">
        {/* Readability overlay */}

        <div className="relative z-10 container mx-auto min-h-screen px-4 sm:px-6 md:px-8 flex items-center">
          <div className="w-full max-w-2xl flex flex-col space-y-6 sm:space-y-7">
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
                Plant Disease Diagnosis
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-800">
                Uncertainty-Aware Decision Support
              </p>
            </div>

            {/* Subtitle */}
            <div className="flex flex-col space-y-2">
              <p className="text-base sm:text-lg text-green-800">
                Upload a plant leaf image and receive a disease prediction,
                confidence score, and risk-aware recommendation.
              </p>
              {/*
               <a
                href="https://sciforum.net/paper/view/27925"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-800/80 hover:text-green-600 transition-colors"
              >
                This project is part of an academic research workflow for robust
                plant disease diagnosis under real-world conditions. Learn more
                about the thesis direction →
              </a>
              */}
              <p className="text-sm text-green-800/80">
                This project is part of an academic research workflow for robust
                plant disease diagnosis under real-world conditions.
              </p>
            </div>

            {/* Bullets */}
            <ul className="text-green-800 list-disc list-inside text-base sm:text-lg space-y-1">
              <li>CNN-based plant disease classification</li>
              <li>Confidence, uncertainty, and explanation support</li>
              <li>Risk-aware actions: accept, monitor, retake, or review</li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#detector"
                className="w-full sm:w-auto px-5 py-3 bg-green-800 text-green-100 rounded-md hover:bg-green-600 hover:scale-[1.02] transition-all text-center"
              >
                Try the demo
              </a>
              <Link
                to="/pages/about"
                className="w-full sm:w-auto px-5 py-3 bg-[#EBEEF7] text-green-800 rounded-md hover:bg-slate-100 hover:scale-[1.02] transition-all border border-[#314473] text-center"
              >
                About the project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
