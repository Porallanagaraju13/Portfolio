import { Code2, Sparkles, Target, Zap } from "lucide-react";
import { motion } from "motion/react";

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const highlights = [
    {
      icon: Sparkles,
      title: "AI Engineering",
      description: "Building production AI agents with Gemini, Claude, and custom evaluation harnesses"
    },
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Next.js, React, TypeScript, Supabase, and modern serverless architectures"
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "n8n pipelines, Inngest events, and intelligent process orchestration"
    },
    {
      icon: Target,
      title: "Problem Solving",
      description: "Real-world solutions with measurable impact and clean user experiences"
    }
  ];

  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left: About Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h2 className={`text-4xl font-black tracking-tight sm:text-5xl ${
                  darkMode ? "text-gray-100" : "text-neutral-dark"
                }`}>
                  About <span className="text-brand-orange">Me</span>
                </h2>
                <div className={`h-1 w-20 rounded-full bg-gradient-to-r from-brand-orange to-transparent`} />
              </div>

              <div className="space-y-4">
                <p className={`text-base leading-relaxed sm:text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  I'm an <strong className="font-bold text-brand-orange">AI Engineer</strong> focused on building intelligent systems that work reliably in production. My work spans agent development, workflow automation, and full-stack applications.
                </p>
                
                <p className={`text-base leading-relaxed sm:text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  I've shipped AI agents that improved task success rates from <strong className="font-semibold">58.3% to 83.3%</strong>, built multilingual voice AI systems with sub-second latency, and created SaaS platforms that automate complex workflows end-to-end.
                </p>

                <p className={`text-base leading-relaxed sm:text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  My approach: start with the user problem, build the simplest thing that solves it, measure what matters, and iterate based on real feedback.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Highlight Cards */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`group flex items-start space-x-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                    darkMode
                      ? "border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/60"
                      : "border-gray-200 bg-white hover:border-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/5"
                  }`}
                >
                  <div className={`rounded-xl p-3 transition-colors ${
                    darkMode
                      ? "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange/15"
                      : "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange/15"
                  }`}>
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className={`font-bold ${darkMode ? "text-gray-100" : "text-neutral-dark"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
