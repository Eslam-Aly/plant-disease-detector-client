import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import RealFakeGame from "./components/RealFakeGame";
import DeepFakeDetector from "./components/DeepFakeDetector";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        {/* Home / Landing page */}
        <Route
          path="/"
          element={
            <>
              <Main />
              <RealFakeGame />
              <DeepFakeDetector />
            </>
          }
        />

        {/* Separate pages */}
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
