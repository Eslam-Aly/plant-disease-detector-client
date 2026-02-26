import heroImg from "../assets/backgroundHero.jpg";

function Main() {
  return (
    <section className="bg-slate-50">
      <div
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-linear-to-l from-black/20 to-[#FBF9FE] backdrop-blur-lg" />

        <div className="relative z-10 container mx-auto min-h-screen px-4 sm:px-6 md:px-8 flex items-center">
          <div className="w-full max-w-2xl flex flex-col space-y-6 sm:space-y-7">
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#314473] leading-tight">
                Fake Face Detector
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#314473]">
                Deepfake Check
              </p>
            </div>

            {/* Subtitle */}
            <div className="flex flex-col space-y-2">
              <p className="text-base sm:text-lg text-[#314473]">
                Upload an image and get a prediction with a confidence score.
              </p>
              <a
                href="https://sciforum.net/paper/view/27925"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#314473]/80 hover:text-[#314473] transition-colors"
              >
                This project is part of an academic research workflow. Read the
                full paper on Sciforum →
              </a>
            </div>

            {/* Bullets */}
            <ul className="text-[#314473] list-disc list-inside text-base sm:text-lg space-y-1">
              <li>Xception + transfer learning</li>
              <li>Confidence score</li>
              <li>No storage (privacy-first)</li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#detector"
                className="w-full sm:w-auto px-5 py-3 bg-[#314473] text-[#EBEEF7] rounded-md hover:bg-[#25365E] hover:scale-[1.02] transition-all text-center"
              >
                Try it now
              </a>
              <a
                href="/pages/about"
                className="w-full sm:w-auto px-5 py-3 bg-[#EBEEF7] text-[#314473] rounded-md hover:bg-slate-100 hover:scale-[1.02] transition-all border border-[#314473] text-center"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
