import { useState, useRef } from "react";
import { Briefcase, Calendar, GraduationCap, Trophy, Award } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ExperienceItem } from "../types";
import Tilt3D from "./Tilt3D";

interface ExperienceProps {
  darkMode: boolean;
}

interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  details: string;
}

interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export default function Experience({ darkMode }: ExperienceProps) {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to a wider translation range so it glides dynamically all the way through the section (e.g. -125px to 125px)
  const yImage = useTransform(scrollYProgress, [0, 1], [-125, 125]);

  const experiences: ExperienceItem[] = [
    {
      id: "exp-1",
      period: "August 2025 – Present",
      role: "Founding Engineer – AI Agents & R&D",
      company: "Cypherbit Private Limited",
      description: "Built an AI HR recruitment pipeline (form intake → Gemini scoring → shortlisting → Drive → Calendar → Gmail) and a Telegram invoice agent using Gemini Vision to extract line items, map HSN & GST rates, and deliver CSV reports; contributing to R&D evaluating LangChain & Gemini API.",
      isLatest: true,
    },
    {
      id: "exp-2",
      period: "February 2025 – February 2026",
      role: "Web Developer Intern",
      company: "TruPricer (Pure In Fresh Foods Pvt Ltd)",
      description: "Managed DNS records, domain registration, and SSL integration across Hostinger, GoDaddy, and Namecheap; developed responsive SEO-friendly websites using HTML, CSS, JavaScript, and PHP.",
      isLatest: false,
    },
    {
      id: "exp-3",
      period: "October 2024 – January 2025",
      role: "Technical Support Intern",
      company: "Prasanta Communications",
      description: "Built internal features using JavaScript, Astro framework, and AI tools; delivered modules reliably and on schedule.",
      isLatest: false,
    },
    {
      id: "exp-4",
      period: "September 2024 – October 2024",
      role: "SDE Intern (Part-time, Remote)",
      company: "Bluestock Fintech",
      description: "Contributed to fintech software development following structured engineering workflows alongside senior engineers.",
      isLatest: false,
    },
  ];

  const education: EducationItem[] = [
    {
      id: "edu-1",
      period: "June 2021 – July 2025",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Siddhartha Institute of Engineering and Technology",
      details: "CGPA: 7.33",
    },
    {
      id: "edu-2",
      period: "June 2020 – March 2021",
      degree: "Intermediate Public Examination (MPC)",
      institution: "Krishnaveni Junior College",
      details: "Marks: 900",
    },
  ];

  const achievements: string[] = [
    "Earned Google Cloud Skills Boost credentials: Prompt Design in Vertex AI, Explore Generative AI with Vertex AI Gemini API, and Build Real World AI Apps with Gemini & Imagen.",
    "Completed AWS Educate's Introduction to Generative AI and IBM SkillsBuild's Journey to Cloud: Envisioning Your Solution."
  ];

  const certifications: CertificationItem[] = [
    {
      title: "Foundations of Artificial Intelligence (Internship)",
      issuer: "Microsoft | Edunet Foundation | AICTE",
      year: "2025"
    },
    {
      title: "Web Developer– DNS Management & Server Deployment",
      issuer: "TruPricer (Pure In Fresh Foods Pvt Ltd)",
      year: "2025"
    },
    {
      title: "Technical Internship– JavaScript, AI Tools, Astro Framework",
      issuer: "Prasanta Communications",
      year: "2024–2025"
    },
    {
      title: "Machine Learning Using Python (Internship)",
      issuer: "YHills Edutech Pvt Ltd",
      year: "2024"
    },
    {
      title: "Programming in Python: Core Concepts",
      issuer: "LearnTube by CareerNinja",
      year: "2024"
    }
  ];

  return (
    <section ref={containerRef} id="experience" className="py-14 sm:py-20 bg-brand-orange-faint relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF8F2]/30 to-transparent pointer-events-none dark:via-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        
        {/* Header containing switcher */}
        <div className="flex flex-col items-center justify-center text-center gap-5 mb-8 sm:mb-14">
          {/* Section Title */}
          <div className="flex items-center justify-center space-x-2 text-neutral-dark dark:text-gray-100">
            {activeTab === "experience" ? (
              <Briefcase className="text-brand-orange animate-pulse" size={24} />
            ) : (
              <GraduationCap className="text-brand-orange animate-pulse" size={24} />
            )}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {activeTab === "experience" ? "Career Path" : "Education & Credentials"}
            </h2>
          </div>

          {/* Toggle pill selector */}
          <div className={`p-1.5 rounded-full flex flex-row items-center w-full max-w-[340px] sm:w-auto border text-xs font-bold leading-none ${
            darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100/80 border-[#E5E5E5]"
          }`}>
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                activeTab === "experience"
                  ? "bg-brand-orange text-white shadow-sm"
                  : darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-neutral-muted hover:text-neutral-dark"
              }`}
            >
              <Briefcase size={13} />
              <span>Experience</span>
            </button>
            
            <button
              onClick={() => setActiveTab("education")}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                activeTab === "education"
                  ? "bg-brand-orange text-white shadow-sm"
                  : darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-neutral-muted hover:text-neutral-dark"
              }`}
            >
              <GraduationCap size={13} />
              <span>Education & Certs</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Area - Timeline content switching */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeTab === "experience" ? (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 relative"
                >
                  {/* Thread Line connecting list */}
                  <div className={`absolute left-4 top-2 bottom-2 w-[2px] border-l-2 border-dashed ${
                    darkMode ? "border-gray-800" : "border-gray-200"
                  }`}></div>

                  {experiences.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="relative pl-12 flex flex-col space-y-2 group"
                    >
                      {/* Timeline Pin Indicator */}
                      <div className={`absolute left-[7px] top-1.5 w-5 h-5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 z-10 flex items-center justify-center ${
                        exp.isLatest
                          ? "bg-brand-orange border-brand-orange shadow-md shadow-brand-orange/40"
                          : darkMode 
                            ? "bg-gray-900 border-gray-700" 
                            : "bg-white border-gray-300"
                      }`}>
                        {exp.isLatest && (
                          <span className="absolute w-full h-full rounded-full bg-brand-orange/30 animate-ping"></span>
                        )}
                      </div>

                      {/* Period Badge */}
                      <div className="flex items-center space-x-1.5 text-xs font-bold tracking-wider text-brand-orange">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>

                      {/* Card Container */}
                      <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 ${
                        exp.isLatest
                          ? darkMode
                            ? "bg-gray-950/80 border-brand-orange/40 shadow-lg shadow-black/20"
                            : "bg-white border-[#EBEBEB] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.02)]"
                          : darkMode
                            ? "bg-gray-900/40 border-gray-800 hover:border-gray-700"
                            : "bg-white/60 border-gray-100 hover:border-gray-200 hover:shadow-xs"
                      }`}>
                        <h3 className={`text-lg font-bold tracking-tight ${
                          darkMode ? "text-gray-100" : "text-neutral-dark"
                        }`}>
                          {exp.role}
                        </h3>
                        
                        <h4 className="text-sm font-semibold text-brand-orange mt-0.5">
                          {exp.company}
                        </h4>
                        
                        <p className={`text-sm leading-relaxed mt-2.5 ${
                          darkMode ? "text-gray-400" : "text-neutral-muted"
                        }`}>
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-10"
                >
                  {/* Education Timeline */}
                  <div className="space-y-6 relative">
                    <h3 className="text-lg font-bold tracking-tight text-neutral-dark dark:text-gray-100 flex items-center gap-2 mb-4">
                      <GraduationCap className="text-brand-orange" size={20} />
                      <span>Education Details</span>
                    </h3>

                    {/* Thread Line */}
                    <div className={`absolute left-4 top-14 bottom-2 w-[2px] border-l-2 border-dashed ${
                      darkMode ? "border-gray-800" : "border-gray-200"
                    }`}></div>

                    {education.map((edu, idx) => (
                      <div
                        key={edu.id}
                        className="relative pl-12 flex flex-col space-y-2 group"
                      >
                        {/* Timeline Pin */}
                        <div className={`absolute left-[7px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          idx === 0
                            ? "bg-brand-orange border-brand-orange shadow-md shadow-brand-orange/40"
                            : darkMode 
                              ? "bg-gray-900 border-gray-700" 
                              : "bg-white border-gray-300"
                        }`}>
                          {idx === 0 && (
                            <span className="absolute w-full h-full rounded-full bg-brand-orange/30 animate-ping"></span>
                          )}
                        </div>

                        {/* Period Badge */}
                        <div className="flex items-center space-x-1.5 text-xs font-bold tracking-wider text-brand-orange">
                          <Calendar size={12} />
                          <span>{edu.period}</span>
                        </div>

                        {/* Card Container */}
                        <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                          darkMode ? "bg-gray-950/80 border-gray-850" : "bg-white border-[#EBEBEB] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.015)]"
                        }`}>
                          <h4 className={`text-base font-bold tracking-tight ${
                            darkMode ? "text-gray-100" : "text-neutral-dark"
                          }`}>
                            {edu.degree}
                          </h4>
                          <h5 className="text-xs font-semibold text-brand-orange mt-0.5">
                            {edu.institution}
                          </h5>
                          <div className="pt-2 border-t border-gray-100/5 mt-2.5">
                            <span className="text-[10px] font-mono text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded-md font-bold">
                              {edu.details}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Achievements section */}
                  <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-850">
                    <h3 className="text-lg font-bold tracking-tight text-neutral-dark dark:text-gray-100 flex items-center gap-2">
                      <Trophy className="text-brand-orange animate-bounce" size={20} />
                      <span>Key Achievements</span>
                    </h3>
                    <div className="space-y-3">
                      {achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all duration-200 hover:shadow-xs ${
                            darkMode ? "bg-gray-900/40 border-gray-800" : "bg-white/80 border-[#F0F0F0]"
                          }`}
                        >
                          <div className="p-2 rounded-xl bg-orange-100/60 dark:bg-orange-950/40 text-brand-orange mt-0.5">
                            <Trophy size={14} />
                          </div>
                          <p className={`text-xs sm:text-sm leading-relaxed ${
                            darkMode ? "text-gray-300" : "text-neutral-muted"
                          }`}>
                            {ach}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications & Internships section */}
                  <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-850">
                    <h3 className="text-lg font-bold tracking-tight text-neutral-dark dark:text-gray-100 flex items-center gap-2">
                      <Award className="text-brand-orange" size={20} />
                      <span>Certifications & Internships</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          className={`p-4.5 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${
                            darkMode 
                              ? "bg-gray-950/80 border-gray-850 hover:border-gray-700" 
                              : "bg-white border-[#EBEBEB] hover:border-[#D5D5D5] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.015)]"
                          }`}
                        >
                          <div className="space-y-1.5">
                            <h4 className={`text-[13px] font-bold leading-snug tracking-tight ${
                              darkMode ? "text-gray-100" : "text-neutral-dark"
                            }`}>
                              {cert.title}
                            </h4>
                            <p className={`text-[11px] font-medium ${darkMode ? "text-gray-400" : "text-neutral-muted"}`}>
                              {cert.issuer}
                            </p>
                          </div>
                          <div className="pt-2.5 border-t border-gray-100/5 mt-3 flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded-md">
                              {cert.year}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Presentation Vector Graphic Column */}
          <div className="order-1 lg:order-2 lg:col-span-5 lg:self-stretch relative">
            <div className="lg:sticky lg:top-20 flex justify-center">
              <Tilt3D maxRotate={12} scale={1.06} className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[460px]">
                <motion.div
                  style={{ y: yImage }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full aspect-square flex items-center justify-center rounded-3xl transition-all duration-300 bg-transparent p-0"
                >
                  {/* Floating ambient glow specifically behind the avatar */}
                  <div className="absolute inset-6 rounded-full bg-brand-orange/10 blur-3xl -z-10 animate-pulse"></div>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeTab}
                      src={activeTab === "education" ? "./assets/avatar_education.png" : "./assets/avatar_experience.png"}
                      alt={activeTab === "education" ? "3D illustration of graduation and education" : "3D illustration of career timeline"}
                      className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(255,138,0,0.15)] hover:scale-105 transition-transform duration-550 relative z-10"
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                </motion.div>
              </Tilt3D>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
