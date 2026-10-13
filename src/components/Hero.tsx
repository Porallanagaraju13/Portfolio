import { Download, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Tilt3D from "./Tilt3D";
import HairlineFigure from "../hairline/HairlineFigure";
import { heroNetworkMount } from "../hairline/figures";

interface HeroProps {
  darkMode: boolean;
  onContactClick: () => void;
}

export default function Hero({ darkMode, onContactClick }: HeroProps) {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -35]);
  const yAvatar = useTransform(scrollY, [0, 600], [0, 55]);

  return (
    <section id="home" className="relative flex min-h-[85vh] items-center overflow-hidden px-0 pb-12 pt-28 md:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: yText }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col space-y-6 sm:space-y-8"
            >
              <div className="flex items-center space-x-3.5">
                <a
                  href="https://www.linkedin.com/in/nagaraju-poralla-13aab2248/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Visit Nagaraju's LinkedIn profile"
                  className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900 text-gray-300 hover:border-primary-500 hover:text-primary-500"
                      : "border-gray-100 bg-white text-neutral-muted hover:border-primary-500 hover:text-primary-500 hover:shadow-md hover:shadow-gray-100"
                  }`}
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/Porallanagaraju13"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Visit Nagaraju's GitHub profile"
                  className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900 text-gray-300 hover:border-primary-500 hover:text-primary-500"
                      : "border-gray-100 bg-white text-neutral-muted hover:border-primary-500 hover:text-primary-500 hover:shadow-md hover:shadow-gray-100"
                  }`}
                >
                  <Github size={20} />
                </a>
                <a
                  href="mailto:nagarajuporalla13@gmail.com"
                  aria-label="Email Nagaraju"
                  className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900 text-gray-300 hover:border-primary-500 hover:text-primary-500"
                      : "border-gray-100 bg-white text-neutral-muted hover:border-primary-500 hover:text-primary-500 hover:shadow-md hover:shadow-gray-100"
                  }`}
                >
                  <Mail size={20} />
                </a>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-full break-words text-4xl font-extrabold leading-tight tracking-tight select-none sm:text-6xl md:text-7xl">
                  <span className={darkMode ? "text-gray-100" : "text-neutral-dark"}>Hi, I'm</span>
                  <br />
                  <span className="text-primary-500">Nagaraju</span>
                  <span className="block text-primary-500">Poralla</span>
                </h1>
                <h2 className={`text-lg font-bold sm:text-2xl md:text-3xl ${darkMode ? "text-gray-300" : "text-neutral-muted"}`}>
                  Founding Engineer &ndash; AI Agents &amp; R&amp;D
                </h2>
              </div>

              <p className={`max-w-2xl text-base leading-relaxed sm:text-lg ${darkMode ? "text-gray-400" : "text-neutral-muted"}`}>
                I build AI agents, workflow automations, and full-stack products that solve practical business problems and create clear user experiences.
              </p>

              <div className="flex flex-col items-stretch space-y-4 pt-4 sm:flex-row sm:items-center sm:space-x-5 sm:space-y-0">
                <a
                  href="./Nagaraju_Poralla_CV.pdf"
                  download
                  id="download-resume-hero-btn"
                  className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-primary-500 px-8 py-4 font-bold text-white shadow-lg shadow-primary-500/20 transition-all duration-200 hover:scale-[1.02] hover:bg-primary-500-hover active:scale-[0.98] sm:w-auto"
                >
                  <Download size={18} />
                  <span>Download CV</span>
                </a>
                <button
                  type="button"
                  onClick={onContactClick}
                  id="contact-me-hero-btn"
                  className={`flex w-full items-center justify-center space-x-2 rounded-2xl border px-8 py-4 font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] sm:w-auto cursor-pointer ${
                    darkMode
                      ? "border-gray-800 bg-gray-900 text-gray-300 hover:border-primary-500 hover:text-primary-500"
                      : "border-primary-500 bg-transparent text-primary-500 hover:bg-primary-500-light"
                  }`}
                >
                  <MessageSquare size={18} />
                  <span>Contact Me</span>
                </button>
              </div>
            </motion.div>
          </div>

          <div className="hidden justify-center md:col-span-5 md:flex">
            {/* Hairline figure instead of Tilt3D */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ y: yAvatar }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[360px] md:max-w-[400px]"
            >
              <div className="absolute inset-4 -z-10 animate-pulse rounded-full bg-primary-500/15 blur-3xl" />
              <HairlineFigure
                figureId="hero-network"
                mountFn={heroNetworkMount}
                ariaLabel="Interactive AI network visualization"
                darkMode={darkMode}
                className="relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
