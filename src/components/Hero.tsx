import { Download, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect } from "react";
import HairlineFigure from "../hairline/HairlineFigure";
import { heroNetworkMount } from "../hairline/figures";

interface HeroProps {
  darkMode: boolean;
  onContactClick: () => void;
}

export default function Hero({ darkMode, onContactClick }: HeroProps) {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -35]);

  // Load Hairline kernel
  useEffect(() => {
    if (!(window as any).HL) {
      const script = document.createElement('script');
      script.src = '/src/hairline/kernel.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section id="home" className="relative flex min-h-[90vh] items-center overflow-hidden px-0 pb-16 pt-32 md:pt-28">
      {/* Subtle gradient backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/4 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: Text Content */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: yText }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col space-y-8"
            >
              {/* Social Links Row */}
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.linkedin.com/in/nagaraju-poralla-13aab2248/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Visit Nagaraju's LinkedIn profile"
                  className={`group cursor-pointer rounded-2xl border p-3.5 transition-all duration-300 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 text-gray-400 hover:border-brand-orange hover:bg-gray-900 hover:text-brand-orange"
                      : "border-gray-200 bg-white text-gray-600 hover:border-brand-orange hover:text-brand-orange hover:shadow-lg hover:shadow-brand-orange/5"
                  }`}
                >
                  <Linkedin size={19} strokeWidth={1.5} />
                </a>
                <a
                  href="https://github.com/Porallanagaraju13"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Visit Nagaraju's GitHub profile"
                  className={`group cursor-pointer rounded-2xl border p-3.5 transition-all duration-300 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 text-gray-400 hover:border-brand-orange hover:bg-gray-900 hover:text-brand-orange"
                      : "border-gray-200 bg-white text-gray-600 hover:border-brand-orange hover:text-brand-orange hover:shadow-lg hover:shadow-brand-orange/5"
                  }`}
                >
                  <Github size={19} strokeWidth={1.5} />
                </a>
                <a
                  href="mailto:nagarajuporalla13@gmail.com"
                  aria-label="Email Nagaraju"
                  className={`group cursor-pointer rounded-2xl border p-3.5 transition-all duration-300 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/50 text-gray-400 hover:border-brand-orange hover:bg-gray-900 hover:text-brand-orange"
                      : "border-gray-200 bg-white text-gray-600 hover:border-brand-orange hover:text-brand-orange hover:shadow-lg hover:shadow-brand-orange/5"
                  }`}
                >
                  <Mail size={19} strokeWidth={1.5} />
                </a>
              </div>

              {/* Main Heading */}
              <div className="space-y-5">
                <h1 className="max-w-full break-words text-[2.75rem] font-black leading-[1.1] tracking-[-0.02em] select-none sm:text-6xl md:text-[4.5rem]">
                  <span className={darkMode ? "text-gray-100" : "text-neutral-dark"}>Hi, I'm</span>
                  <br />
                  <span className="bg-gradient-to-r from-brand-orange via-brand-orange to-[#FF6B00] bg-clip-text text-transparent">
                    Nagaraju Poralla
                  </span>
                </h1>
                <h2 className={`text-xl font-bold tracking-tight sm:text-2xl md:text-[1.75rem] ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  AI Engineer
                </h2>
              </div>

              {/* Description */}
              <p className={`max-w-xl text-base leading-relaxed sm:text-lg md:text-[1.125rem] ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Building AI agents, workflow automations, and full-stack products that solve real-world problems with clean, intuitive user experiences.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-stretch space-y-4 pt-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                <a
                  href="./Nagaraju_Poralla_CV.pdf"
                  download
                  id="download-resume-hero-btn"
                  className="group flex w-full items-center justify-center space-x-2.5 rounded-2xl bg-brand-orange px-8 py-4 font-bold text-white shadow-xl shadow-brand-orange/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF6B00] hover:shadow-2xl hover:shadow-brand-orange/30 active:scale-[0.98] sm:w-auto"
                >
                  <Download size={18} strokeWidth={2.5} />
                  <span>Download CV</span>
                </a>
                <button
                  type="button"
                  onClick={onContactClick}
                  id="contact-me-hero-btn"
                  className={`flex w-full items-center justify-center space-x-2.5 rounded-2xl border px-8 py-4 font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto cursor-pointer ${
                    darkMode
                      ? "border-gray-700 bg-gray-900/50 text-gray-300 hover:border-brand-orange hover:bg-gray-900 hover:text-brand-orange"
                      : "border-brand-orange/20 bg-white text-brand-orange hover:border-brand-orange hover:bg-brand-orange/5 hover:shadow-lg"
                  }`}
                >
                  <MessageSquare size={18} strokeWidth={2.5} />
                  <span>Contact Me</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Interactive Hairline Figure */}
          <div className="flex justify-center md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-[420px]"
            >
              {/* Glow backdrop */}
              <div className="absolute inset-0 -z-10 animate-pulse rounded-3xl bg-gradient-to-br from-brand-orange/10 via-brand-orange/5 to-transparent blur-2xl" />
              
              {/* Figure container with premium card styling */}
              <div className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500 ${
                darkMode
                  ? "border-gray-800 bg-gray-900/40"
                  : "border-gray-200 bg-white/80 shadow-xl shadow-gray-200/50"
              }`}>
                <HairlineFigure
                  figureId="hero-network"
                  mountFn={heroNetworkMount}
                  ariaLabel="Interactive neural network visualization responding to pointer"
                  darkMode={darkMode}
                  className="w-full"
                />
                <div className={`mt-4 text-center text-xs font-medium tracking-wide ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}>
                  Hover to interact
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
