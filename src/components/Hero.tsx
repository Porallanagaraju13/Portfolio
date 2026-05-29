import { Linkedin, Github, Mail, Download, MessageSquare } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Tilt3D from "./Tilt3D";

interface HeroProps {
  darkMode: boolean;
  onContactClick: () => void;
}

export default function Hero({ darkMode, onContactClick }: HeroProps) {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -35]);
  const yAvatar = useTransform(scrollY, [0, 600], [0, 55]);

  // Real CV content generator
  const handleDownloadCV = () => {
    const resumeText = `NAGARAJU PORALLA
Founding Engineer – AI Agents & R&D
Email: nagarajuporalla13@gmail.com
Phone: +91 9908425164
LinkedIn: https://www.linkedin.com/in/nagaraju-poralla-13aab2248/
GitHub: https://github.com/Porallanagaraju13
Location: India

TECHNICAL SKILLS:
* Languages: Java, JavaScript, Python, C, PHP
* Web: HTML, CSS, WordPress
* Databases: MySQL, PostgreSQL
* Tools & Platforms: Git, GitHub, n8n, LLM, Hostinger, GoDaddy, Namecheap
* AI/ML: AI Agents, NLP, Supervised & Unsupervised Learning, Deep Learning, Generative AI
* Concepts: OOP, SDLC, Debugging, Problem Solving

EXPERIENCE:
1. Cypherbit Private Limited | Founding Engineer– AI Agents & R&D
   August 2025 – Present | Nalgonda, TS
   * Built an AI HR recruitment pipeline (form intake → Gemini scoring → shortlisting → Drive → Calendar → Gmail) and a Telegram invoice agent using Gemini Vision to extract line items, map HSN & GST rates, and deliver CSV reports; contributing to R&D evaluating LangChain & Gemini API.

2. TruPricer (Pure In Fresh Foods Pvt Ltd) | Web Developer Intern
   February 2025 – February 2026 | Remote
   * Managed DNS records, domain registration, and SSL integration across Hostinger, GoDaddy, and Namecheap; developed responsive SEO-friendly websites using HTML, CSS, JavaScript, and PHP.

3. Prasanta Communications | Technical Support Intern
   October 2024 – January 2025 | Hyderabad, India
   * Built internal features using JavaScript, Astro framework, and AI tools; delivered modules reliably and on schedule.

4. Bluestock Fintech | SDE Intern (Part-time, Remote)
   September 2024 – October 2024
   * Contributed to fintech software development following structured engineering workflows alongside senior engineers.

PROJECTS:
* AI HR Recruitment Pipeline | n8n, Gemini AI, Gmail, Google Sheets, Drive, Calendar
  - End-to-end automated recruitment: form intake → Gemini resume scoring → shortlist/reject → Drive CV upload → Calendar interview with Meet link → Gmail notifications for candidate & HR, all tracked in Google Sheets.
* Telegram Invoice Processing Agent | n8n, Gemini Vision, Telegram Bot, JavaScript
  - Bot accepting invoice images/PDFs; uses Gemini Vision to extract line items, auto-generate pharmacy codes with dosage, map HSN codes & GST rates (CGST/SGST/IGST per Indian tax law), and deliver a structured CSV– eliminating manual pharmacy data entry.
* Smart E-Commerce Price Negotiation Chatbot | Python, NLTK, scikit-learn, Tkinter
  - AI chatbot using NLTK & scikit-learn for intent recognition with tokenization and lemmatization on JSON training data; Tkinter GUI for real-time dialogue management.
* Underwater Image Enhancement with MSRAN | Python, TensorFlow, CNN
  - Image restoration model using MSRAN with multi-scale feature extraction and attention mechanisms; outperformed baselines on PSNR/SSIM metrics.

EDUCATION:
* Bachelor of Technology in Computer Science and Engineering
  Siddhartha Institute of Engineering and Technology | June 2021 – July 2025 | CGPA: 7.33
* Intermediate Public Examination (MPC)
  Krishnaveni Junior College | June 2020 – March 2021 | Marks: 900

ACHIEVEMENTS:
* Earned Prompt Design in Vertex AI, Explore Generative AI with Vertex AI Gemini API, and Build Real World AI Apps with Gemini & Imagen– Google Cloud Skills Boost.
* Completed Introduction to Generative AI (AWS Educate) and Journey to Cloud: Envisioning Your Solution (IBM SkillsBuild).

CERTIFICATIONS:
* Foundations of Artificial Intelligence (Internship) - Microsoft | Edunet Foundation | AICTE, 2025
* Web Developer– DNS Management & Server Deployment - TruPricer (Pure In Fresh Foods Pvt Ltd), 2025
* Technical Internship– JavaScript, AI Tools, Astro Framework - Prasanta Communications, 2024–2025
* Machine Learning Using Python (Internship) - YHills Edutech Pvt Ltd, 2024
* Programming in Python: Core Concepts - LearnTube by CareerNinja, 2024

-- Generated on Nagaraju Poralla's Personal AI Portfolio App --
`;

    const blob = new Blob([resumeText], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Nagaraju_Poralla_CV.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Dynamic background ambient blur glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio / Info */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: yText }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col space-y-8"
            >
              {/* Social Icons row */}
              <div className="flex items-center space-x-3.5">
                <a
                  href="https://www.linkedin.com/in/nagaraju-poralla-13aab2248/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    darkMode
                      ? "bg-gray-900 border-gray-800 text-gray-300 hover:text-brand-orange hover:border-brand-orange"
                      : "bg-white border-gray-100 text-neutral-muted hover:text-brand-orange hover:border-brand-orange hover:shadow-md hover:shadow-gray-100"
                  }`}
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>

                <a
                  href="https://github.com/Porallanagaraju13"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    darkMode
                      ? "bg-gray-900 border-gray-800 text-gray-300 hover:text-brand-orange hover:border-brand-orange"
                      : "bg-white border-gray-100 text-neutral-muted hover:text-brand-orange hover:border-brand-orange hover:shadow-md hover:shadow-gray-100"
                  }`}
                  title="GitHub"
                >
                  <Github size={20} />
                </a>

                <a
                  href="mailto:nagarajuporalla13@gmail.com"
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    darkMode
                      ? "bg-gray-900 border-gray-800 text-gray-300 hover:text-brand-orange hover:border-brand-orange"
                      : "bg-white border-gray-100 text-neutral-muted hover:text-brand-orange hover:border-brand-orange hover:shadow-md hover:shadow-gray-100"
                  }`}
                  title="Email"
                >
                  <Mail size={20} />
                </a>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight select-none">
                  <span className={darkMode ? "text-gray-100" : "text-neutral-dark"}>Hi, I'm</span>
                  <br />
                  <span className="text-brand-orange">Nagaraju Poralla</span>
                </h1>

                <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  darkMode ? "text-gray-300" : "text-neutral-muted"
                }`}>
                  Founding Engineer &ndash; AI Agents &amp; R&amp;D
                </h2>
              </div>

              {/* Description */}
              <p className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? "text-gray-400" : "text-neutral-muted"
              }`}>
                Specializing in AI/ML engineering, intelligent autonomous agents, and robust full-stack systems. 
                I architect optimal data-driven workflows, streamline neural pipelines, and build practical AI business backbones with high-quality user experiences.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 pt-4">
                {/* Download CV button */}
                <button
                  onClick={handleDownloadCV}
                  id="download-resume-hero-btn"
                  className="flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-brand-orange text-white font-bold shadow-lg shadow-brand-orange/20 cursor-pointer hover:bg-brand-orange-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Download size={18} />
                  <span>Download CV</span>
                </button>

                {/* Contact button */}
                <button
                  onClick={onContactClick}
                  id="contact-me-hero-btn"
                  className={`flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-bold border transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                    darkMode
                      ? "border-gray-800 bg-gray-900 text-gray-300 hover:text-brand-orange hover:border-brand-orange"
                      : "border-brand-orange bg-transparent text-brand-orange hover:bg-brand-orange-light"
                  }`}
                >
                  <MessageSquare size={18} />
                  <span>Contact Me</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Pixar-style Avatar Image with 3D Tilt */}
          <div className="md:col-span-5 flex justify-center relative">
            <Tilt3D maxRotate={15} scale={1.05} className="w-full max-w-[360px] md:max-w-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ y: yAvatar }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-square flex items-center justify-center rounded-3xl transition-all duration-300 bg-transparent p-0"
              >
                {/* Floating ambient glow specifically behind the avatar */}
                <div className="absolute inset-4 rounded-full bg-brand-orange/15 blur-3xl -z-10 animate-pulse"></div>
                <img
                  src="/assets/avatar_hero.png"
                  alt="3D Pixar-style character avatar of Nagaraju Poralla as a software engineer"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(255,138,0,0.25)] hover:scale-[1.03] transition-transform duration-550 relative z-10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </Tilt3D>
          </div>

        </div>
      </div>
    </section>
  );
}
