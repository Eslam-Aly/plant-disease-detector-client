import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SafeActionGame from "./components/SafeActionGame";
import PlantDiseaseDetector from "./components/PlantDiseaseDetector";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import About from "./pages/About";
import StudyIntro from "./study/pages/StudyIntro";
import StudyInstructions from "./study/pages/StudyInstructions";
import StudyCase from "./study/pages/StudyCase";
import StudyFinal from "./study/pages/StudyFinal";
import StudyThanks from "./study/pages/StudyThanks";

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
              <SafeActionGame />
              <PlantDiseaseDetector />
            </>
          }
        />

        {/* Separate pages */}
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/contact" element={<Contact />} />

        {/* Study pages */}
        <Route path="/study" element={<StudyIntro />} />
        <Route path="/study/instructions" element={<StudyInstructions />} />
        <Route path="/study/case/:id" element={<StudyCase />} />
        <Route path="/study/final" element={<StudyFinal />} />
        <Route path="/study/thanks" element={<StudyThanks />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
