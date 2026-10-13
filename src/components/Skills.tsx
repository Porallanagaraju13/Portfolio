import { motion } from "motion/react";

interface SkillsProps {
  darkMode: boolean;
}

interface SkillCategory {
  title: string;
  skills: string[];
}

export default function Skills({ darkMode }: SkillsProps) {
  const categories: SkillCategory[] = [
    {
      title: "AI & ML",
      skills: [
        "Gemini / Claude API",
        "Agent Development",
        "Prompt Engineering",
        "RAG & Vector DBs",
        "Model Evaluation"
      ]
    },
    {
      title: "Frontend",
      skills: [
        "React / Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Motion / Framer",
        "Vite"
      ]
    },
    {
      title: "Backend",
      skills: [
        "Node.js / Python",
        "Supabase / Firebase",
        "Inngest Events",
        "FastAPI",
        "REST APIs"
      ]
    },
    {
      title: "Automation",
      skills: [
        "n8n Workflows",
        "Playwright",
        "Electron",
        "Twilio / WebSockets",
        "Chrome Extensions"
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        "Vercel / Render",
        "GitHub Actions",
        "Docker",
        "Git",
        "Cloud Run"
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-3 text-center"
        >
          <h2 className={`text-4xl font-black tracking-tight sm:text-5xl ${
            darkMode ? "text-gray-100" : "text-neutral-dark"
          }`}>
            Technical <span className="text-brand-orange">Skills</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-base sm:text-lg ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Technologies and tools I use to build intelligent, scalable systems
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1 ${
                darkMode
                  ? "border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/60"
                  : "border-gray-200 bg-white hover:border-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/5"
              }`}
            >
              {/* Category Title */}
              <h3 className={`mb-5 text-xl font-bold ${
                darkMode ? "text-gray-100" : "text-neutral-dark"
              }`}>
                {category.title}
              </h3>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                      i === 0
                        ? darkMode
                          ? "bg-brand-orange/15 text-brand-orange group-hover:bg-brand-orange/20"
                          : "bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange/15"
                        : darkMode
                          ? "bg-gray-800 text-gray-400 group-hover:bg-gray-800/80"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-50"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
