import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import plantLogo from "../assets/plantLogo.png";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on resize to desktop to avoid stuck-open state
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false); // md breakpoint
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const handleNavClick = () => {
    closeMenu();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6 text-green-700">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleNavClick}
          aria-label="Go to Home"
        >
          <img
            className="h-12 sm:h-16 rounded-sm hover:scale-105 transition-all duration-200"
            src={plantLogo}
            alt="Fake Face Detector Logo"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6 text-base lg:text-lg font-medium">
          <Link
            to="/"
            onClick={handleNavClick}
            className="hover:text-green-600 hover:scale-105 transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/pages/about"
            onClick={handleNavClick}
            className="hover:text-green-600 hover:scale-105 transition-all duration-200"
          >
            About
          </Link>
          <Link
            to="/pages/contact"
            onClick={handleNavClick}
            className="hover:text-green-600 hover:scale-105 transition-all duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 transition"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t border-white/10 bg-green-900 transition-[max-height,opacity] duration-200 ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto flex flex-col px-4 sm:px-6 py-3 text-base font-medium justify-center items-center space-y-2 text-green-500">
          <Link
            to="/"
            onClick={handleNavClick}
            className="py-2 hover:text-green-400 transition"
          >
            Home
          </Link>
          <Link
            to="/pages/about"
            onClick={handleNavClick}
            className="py-2 hover:text-green-400 transition"
          >
            About
          </Link>
          <Link
            to="/pages/contact"
            onClick={handleNavClick}
            className="py-2 hover:text-green-400 transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
