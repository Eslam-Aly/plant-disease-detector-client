import { Link } from "react-router-dom";
import plantLogo from "../assets/plantLogo.png";

function Footer() {
  return (
    <footer className="bg-slate-50 text-green-800 shadow-black shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col items-start space-y-4">
            <img
              src={plantLogo}
              alt="Fake Face Detector Logo"
              className="h-16 rounded-sm"
            />
            <p className="text-sm leading-relaxed">
              Uncertainty-aware plant disease diagnosis prototype with
              confidence, uncertainty, and explanation support for safer
              recommendations.
            </p>
          </div>

          {/* Project */}
          <div className="flex flex-col space-y-2">
            <h4 className="font-semibold text-lg">Project</h4>
            <Link to="/" className="hover:text-green-600">
              Home
            </Link>

            <Link to="/pages/about" className="hover:text-green-600">
              About
            </Link>
            <Link to="/pages/contact" className="hover:text-green-600">
              Contact
            </Link>
          </div>

          {/* Resources */}
          <div className="flex flex-col space-y-2">
            <h4 className="font-semibold text-lg">Resources</h4>
            {/*
            <a
              href="https://sciforum.net/paper/view/27925"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              Research Paper
            </a>
            */}
            <Link to="/study" className="hover:text-green-600">
              User Study
            </Link>
            <a
              href="https://github.com/Eslam-Aly/plant-disease-detector-client.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              GitHub (Client)
            </a>
            <a
              href="https://github.com/Eslam-Aly/plant-disease-detector-api.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              GitHub (API)
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-2">
            <h4 className="font-semibold text-lg">Contact</h4>
            <a href="tel:+491623320059" className="hover:text-green-600">
              Phone: +49 162 332 0059
            </a>
            <a
              href="mailto:eslam.aly@eslamaly.com"
              className="hover:text-green-600"
            >
              Email: eslam.aly@eslamaly.com
            </a>
            <a
              href="https://eslamaly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              Portfolio: eslamaly.com
            </a>
            <a
              href="https://www.linkedin.com/in/eslam-aly-88b66ab8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-[#1a2542]/30" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm space-y-4 sm:space-y-0">
          <p>
            © {new Date().getFullYear()} Plant Disease Detector. All rights
            reserved.
          </p>
          <p className="text-green-800/70">Privacy-first · Academic project</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
