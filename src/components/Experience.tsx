import { Briefcase, Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface ExperienceProps {
  darkMode: boolean;
}

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export default function Experience({ darkMode }: ExperienceProps) {
  const jobs: Job[] = [
    {
      title: "AI Engineer",
      company: "Independent Projects",
      location: "Remote",
      period: "2024 - Present",
      description: "Building production AI agents, workflow automations, and full-stack SaaS products",
      achievements: [
        "Improved agent task success from 58.3% to 83.3% with HarnessDiff evaluation platform",
        "Built JobMatch: AI job aggregation SaaS serving 6 Indian platforms with Gemini scoring",
        "Shipped Aster: Desktop browser agent with 89 tests, per-task approvals, and BYOM support",
        "Created VgrowVoice: Multilingual voice AI receptionist with sub-second Twilio+Gemini latency"
      ]
    },
    {
      title: "Full-Stack Developer",
      company: "Previous Experience",
      location: "Remote",
      period: "2022 - 2024",
      description: "Web applications, automation pipelines, and intelligent systems",
      achievements: [
        "Designed and deployed n8n automation pipelines for recruitment and invoice processing",
        "Built e-commerce chatbots with NLP intent recognition and price negotiation",
        "Developed CTXR: Document normalization engine achieving 40-70% token savings",
        "Integrated Gemini Vision, Telegram bots, and Chrome extensions for production use"
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-24">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-brand-orange/[0.015] to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-3"
        >
          <h2 className={`text-4xl font-black tracking-tight sm:text-5xl ${
            darkMode ? "text-gray-100" : "text-neutral-dark"
          }`}>
            Work <span className="text-brand-orange">Experience</span>
          </h2>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-brand-orange to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12">
          {/* Vertical line */}
          <div className={`absolute left-0 top-8 bottom-8 w-px ${
            darkMode ? "bg-gray-800" : "bg-gray-200"
          } hidden md:block`} />

          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute left-0 top-8 hidden md:block w-3 h-3 rounded-full -translate-x-[5px] ${
                darkMode ? "bg-brand-orange ring-4 ring-gray-900" : "bg-brand-orange ring-4 ring-white"
              }`} />

              <div className="md:ml-8">
                <div className={`overflow-hidden rounded-3xl border transition-all duration-500 ${
                  darkMode
                    ? "border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/60"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/50"
                }`}>
                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="mb-6 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-neutral-dark"}`}>
                            {job.title}
                          </h3>
                          <p className={`text-lg font-semibold ${darkMode ? "text-brand-orange" : "text-brand-orange"}`}>
                            {job.company}
                          </p>
                        </div>
                        <div className={`flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium ${
                          darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                        }`}>
                          <Calendar size={14} />
                          <span>{job.period}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className={`flex items-center space-x-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <p className={`text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {job.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3">
                      <h4 className={`text-sm font-bold uppercase tracking-wide ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className={`flex items-start space-x-3 text-sm leading-relaxed ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
