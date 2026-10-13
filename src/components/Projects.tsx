import { Github, ExternalLink, Play, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import HairlineFigure from "../hairline/HairlineFigure";
import { jobMatchMount } from "../hairline/figures";

interface ProjectsProps {
  darkMode: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  releasesUrl?: string;
  featured: boolean;
  figureMountFn?: any;
  figureLabel?: string;
}

export default function Projects({ darkMode }: ProjectsProps) {
  // Load Hairline kernel
  useEffect(() => {
    if (!(window as any).HL) {
      const script = document.createElement('script');
      script.src = '/src/hairline/kernel.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const projects: Project[] = [
    {
      id: "jobmatch",
      title: "JobMatch",
      description: "AI job-aggregation and resume-matching SaaS pulling roles from 6 Indian platforms, scoring fit with Gemini. Next.js, Supabase, Inngest, Stripe.",
      tags: ["Next.js", "Gemini AI", "Supabase", "Inngest", "Stripe"],
      githubUrl: "https://github.com/Porallanagaraju13/Job-Match",
      liveUrl: "https://job-match-1.vercel.app",
      featured: true,
      figureMountFn: jobMatchMount,
      figureLabel: "Job matching funnel: aggregation to best fit"
    },
    {
      id: "harnessdiff",
      title: "HarnessDiff",
      description: "Agent-harness eval and ablation lab. With Gemini, task success went from 58.3% to 83.3%. Measures what makes agents work.",
      tags: ["Agent Evals", "Gemini", "Next.js", "TypeScript"],
      githubUrl: "https://github.com/Porallanagaraju13/Harness",
      liveUrl: "https://harnessdiff.vercel.app",
      featured: true,
      figureLabel: "Agent evaluation harness with success metrics"
    },
    {
      id: "aster",
      title: "Aster",
      description: "Desktop browser agent (Electron + Playwright) with per-task approvals, bring-your-own model, and 89 tests. Windows desktop app.",
      tags: ["Electron", "Playwright", "TypeScript", "Desktop"],
      githubUrl: "https://github.com/Porallanagaraju13/aster-browser-agent",
      releasesUrl: "https://github.com/Porallanagaraju13/aster-browser-agent/releases",
      featured: true,
      figureLabel: "Browser automation agent with approval gates"
    },
    {
      id: "vgrowvoice",
      title: "VgrowVoice AI",
      description: "Multilingual (EN/TE/HI) voice AI receptionist on Twilio and Gemini Live. Real-time conversation with sub-second latency.",
      tags: ["Gemini Live", "Twilio", "WebSocket", "Multilingual"],
      githubUrl: "https://github.com/Porallanagaraju13/Vgrow-Voice-AI",
      featured: false
    },
    {
      id: "actgate",
      title: "ActGate",
      description: "Confidence-gated AI support agent with a policy gate before generation. Ensures responses meet quality thresholds.",
      tags: ["AI Agents", "Policy Gates", "TypeScript"],
      githubUrl: "https://github.com/Porallanagaraju13/actgate",
      featured: false
    },
    {
      id: "ctxr",
      title: "CTXR",
      description: "AI context packager converting docs to Markdown with prompt compression. Chrome extension for inline optimization.",
      tags: ["Prompt Engineering", "Chrome Ext", "Python", "FastAPI"],
      githubUrl: "https://github.com/Porallanagaraju13/CTXR",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const moreProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="relative py-24">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-brand-orange/[0.02] to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl space-y-3 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`text-4xl font-black tracking-tight sm:text-5xl ${
              darkMode ? "text-gray-100" : "text-neutral-dark"
            }`}
          >
            Featured <span className="text-brand-orange">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-base sm:text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            AI systems, agents, and full-stack products—each built to solve real problems
          </motion.p>
        </div>

        {/* Featured Projects Grid */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group h-full"
            >
              <div className={`flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
                darkMode
                  ? "border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-200/50"
              }`}>
                
                {/* Figure or Icon Area */}
                <div className={`relative aspect-[5/3] overflow-hidden border-b ${
                  darkMode ? "border-gray-800 bg-gray-950/50" : "border-gray-100 bg-gray-50"
                }`}>
                  {proj.figureMountFn ? (
                    <HairlineFigure
                      figureId={proj.id}
                      mountFn={proj.figureMountFn}
                      ariaLabel={proj.figureLabel || proj.title}
                      darkMode={darkMode}
                      className="h-full w-full"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className={`text-6xl font-black ${darkMode ? "text-gray-800" : "text-gray-200"}`}>
                        {proj.title.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col space-y-4 p-6">
                  {/* Title & Links */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={`text-xl font-bold leading-tight ${
                      darkMode ? "text-gray-100" : "text-neutral-dark"
                    }`}>
                      {proj.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${proj.title} on GitHub`}
                        className={`rounded-full p-2 transition-all duration-300 ${
                          darkMode
                            ? "text-gray-500 hover:bg-gray-800 hover:text-brand-orange"
                            : "text-gray-400 hover:bg-gray-100 hover:text-brand-orange"
                        }`}
                      >
                        <Github size={16} strokeWidth={2} />
                      </a>
                      {(proj.liveUrl || proj.releasesUrl) && (
                        <a
                          href={proj.liveUrl || proj.releasesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${proj.title} ${proj.liveUrl ? 'live site' : 'releases'}`}
                          className={`rounded-full p-2 transition-all duration-300 ${
                            darkMode
                              ? "text-gray-500 hover:bg-gray-800 hover:text-brand-orange"
                              : "text-gray-400 hover:bg-gray-100 hover:text-brand-orange"
                          }`}
                        >
                          <ExternalLink size={16} strokeWidth={2} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`flex-1 text-sm leading-relaxed ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                          i === 0
                            ? darkMode
                              ? "bg-brand-orange/15 text-brand-orange"
                              : "bg-brand-orange/10 text-brand-orange"
                            : darkMode
                              ? "bg-gray-800 text-gray-400"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-neutral-dark"}`}>
            More Projects
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {moreProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className={`group flex flex-col space-y-4 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                  darkMode
                    ? "border-gray-800 bg-gray-900/30 hover:border-gray-700 hover:bg-gray-900/50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className={`text-lg font-bold ${darkMode ? "text-gray-100" : "text-neutral-dark"}`}>
                    {proj.title}
                  </h4>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${proj.title} on GitHub`}
                    className={`shrink-0 rounded-full p-2 transition-colors ${
                      darkMode
                        ? "text-gray-500 hover:bg-gray-800 hover:text-brand-orange"
                        : "text-gray-400 hover:bg-gray-100 hover:text-brand-orange"
                    }`}
                  >
                    <Github size={16} strokeWidth={2} />
                  </a>
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map(tag => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
