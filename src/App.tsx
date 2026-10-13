import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import BlogSection from "./components/BlogSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import BlogPage from "./components/BlogPage";
import BlogPost from "./components/BlogPost";

// ─── Landing Page (all existing sections + new blog preview) ────────────────
function LandingPage({
  darkMode,
  setDarkMode,
  isChatOpen,
  setIsChatOpen,
}: {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (v: boolean) => void;
}) {
  // Smooth navigator scroll handler
  const scrollToContact = () => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 relative ${
        darkMode
          ? "bg-neutral-dark text-gray-100 dark"
          : "bg-neutral-light text-neutral-dark"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-orange focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      {/* Spring Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[4px] bg-brand-orange origin-left z-50"
      />

      {/* Centered Decorative background layout elements */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-brand-orange/3 to-transparent pointer-events-none z-0" />

      {/* Floating Navigation panel */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onHireMeClick={scrollToContact}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />

      {/* Primary Landing layout parts */}
      <main id="main-content" className="relative z-10 flex flex-col space-y-16 pb-24 md:pb-0">

        {/* Home / Hero introductory block */}
        <Hero darkMode={darkMode} onContactClick={scrollToContact} />

        {/* Detailed Developer facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <About darkMode={darkMode} />
        </motion.div>

        {/* Detailed job timeline charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Experience darkMode={darkMode} />
        </motion.div>

        {/* Custom skills segments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Skills darkMode={darkMode} />
        </motion.div>

        {/* Grid matching the 3 Featured Portfolio showcases with Interactive Playgrounds */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Projects darkMode={darkMode} />
        </motion.div>

        {/* Blog preview section — between Projects and Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <BlogSection darkMode={darkMode} />
        </motion.div>

        {/* High Circularity Get in Touch contacts dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Contact darkMode={darkMode} />
        </motion.div>

        {/* Footer with legal terms links */}
        <Footer darkMode={darkMode} />

        {/* Floating Interactive Gemini Chat widget */}
        <AIChatbot
          darkMode={darkMode}
          isOpenState={isChatOpen}
          setIsOpenState={setIsChatOpen}
        />

      </main>
    </div>
  );
}

// ─── Root App with Router ────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_dark_mode");
      if (saved !== null) return JSON.parse(saved);
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("portfolio_dark_mode", JSON.stringify(darkMode));
    } catch (err) {
      console.warn("Failed to preserve theme state:", err);
    }
  }, [darkMode]);

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
            />
          }
        />
        <Route path="/blog" element={<BlogPage darkMode={darkMode} />} />
        <Route path="/blog/:slug" element={<BlogPost darkMode={darkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
