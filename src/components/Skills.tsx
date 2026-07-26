import { Brain, Database, Wrench, Code } from "lucide-react";
import { motion } from "motion/react";
import { SkillCategory } from "../types";

interface SkillsProps {
  darkMode: boolean;
}

export default function Skills({ darkMode }: SkillsProps) {
  const skillCategories: SkillCategory[] = [
    {
      title: "AI & ML",
      category: "ai",
      skills: ["AI Agents", "NLP", "Generative AI", "Deep Learning", "TensorFlow & scikit-learn"],
    },
    {
      title: "Languages & Web",
      category: "languages",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "React / Next.js", "HTML / CSS"],
    },
    {
      title: "Data & BI",
      category: "databases",
      skills: ["Power BI", "Pandas & NumPy", "MySQL", "PostgreSQL"],
    },
    {
      title: "Tools & Concepts",
      category: "tools",
      skills: ["n8n & LLMs", "Git & GitHub", "Docker & Cloud Run", "OOP / SDLC / Debugging"],
    },
  ];

  // Helper to render responsive icons matching the mockup design
  const renderIcon = (category: string) => {
    switch (category) {
      case "ai":
        return (
          <div className="p-3 rounded-2xl bg-orange-100 text-brand-orange">
            <Brain size={22} />
          </div>
        );
      case "languages":
        return (
          <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
            <Code size={22} />
          </div>
        );
      case "databases":
        return (
          <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
            <Database size={22} />
          </div>
        );
      case "tools":
        return (
          <div className="p-3 rounded-2xl bg-teal-100 text-teal-600">
            <Wrench size={22} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-500/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        
        {/* Header centered */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? "text-gray-100" : "text-neutral-dark"
          }`}>
            Technical <span className="text-brand-orange">Skills</span>
          </h2>
          <p className={`text-base sm:text-lg ${
            darkMode ? "text-gray-400" : "text-neutral-muted"
          }`}>
            Technologies and tools I leverage to build intelligent, scalable applications.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -8 }}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col space-y-6 ${
                darkMode
                  ? "bg-gray-900 border-gray-800 shadow-md shadow-black/10 hover:border-brand-orange/40"
                  : "bg-white border-gray-100 shadow-sm shadow-gray-100/40 hover:border-brand-orange/20 hover:shadow-lg hover:shadow-gray-200/20"
              }`}
            >
              {/* Card Header with Icon & Title side-by-side */}
              <div className="flex items-center space-x-3.5">
                {renderIcon(cat.category)}
                <h3 className={`text-lg font-bold tracking-tight ${
                  darkMode ? "text-gray-100" : "text-neutral-dark"
                }`}>
                  {cat.title}
                </h3>
              </div>

              {/* Skills breakdown */}
              <ul className="flex flex-col space-y-3">
                {cat.skills.map((skill, sIdx) => {
                  const isHighlighted = skill.toLowerCase().includes("vector") || skill.toLowerCase().includes("n8n") || skill.toLowerCase().includes("nlp");
                  return (
                    <li
                      key={skill}
                      className={`text-sm flex items-center justify-between font-medium ${
                        darkMode ? "text-gray-300" : "text-neutral-muted"
                      }`}
                    >
                      <span>{skill}</span>
                      {isHighlighted && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-orange/10 text-brand-orange uppercase tracking-wider scale-90">
                          Core
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
