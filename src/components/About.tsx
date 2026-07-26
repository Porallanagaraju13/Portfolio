import { User } from "lucide-react";
import { motion } from "motion/react";
import Tilt3D from "./Tilt3D";

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  // Stat blocks data
  const stats = [
    { value: "2+", label: "EXPERIENCE" },
    { value: "10+", label: "PROJECTS" },
    { value: "5+", label: "CERTS" },
  ];

  return (
    <section id="about" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left layout: High-fidelity Vector illustration of Programmer with 3D Tilt */}
          <div className="lg:col-span-5 flex justify-center relative">
            <Tilt3D maxRotate={12} scale={1.04} className="w-full max-w-[340px] md:max-w-[380px]">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative w-full aspect-square flex items-center justify-center rounded-3xl transition-all duration-300 bg-transparent p-0"
              >
                {/* Floating ambient glow specifically behind the avatar */}
                <div className="absolute inset-6 rounded-full bg-brand-teal-light blur-3xl -z-10 animate-pulse"></div>
                {/* Developer Image */}
                <img
                  src="./assets/avatar_about.png"
                  alt="3D illustration of Nagaraju interacting with AI"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,168,150,0.2)] hover:scale-105 transition-transform duration-500 relative z-10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </Tilt3D>
          </div>

          {/* Right layout: About Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="flex items-center space-x-2 text-brand-orange">
              <User size={22} />
              <h2 className="text-xl font-bold uppercase tracking-wider">About Me</h2>
            </div>

            <h3 className={`text-3xl font-extrabold tracking-tight ${
              darkMode ? "text-gray-100" : "text-neutral-dark"
            }`}>
              Architecting the Next Era of Intelligent Automation
            </h3>

            <p className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? "text-gray-400" : "text-neutral-muted"
            }`}>
              I am an AI Enthusiast and Developer driven by a passion for solving complex, real-world challenges through technology. 
              With deep expertise in Artificial Intelligence, Machine Learning, and web engineering, I architect intelligent solutions 
              that seamlessly bridge the gap between human needs and high-powered, automated computation.
            </p>

            <p className={`text-base leading-relaxed ${
              darkMode ? "text-gray-400" : "text-neutral-muted"
            }`}>
              My technical work focuses heavily on building robust multi-agent setups, creating advanced processing workflows on n8n, 
              optimizing natural language storage with vector embedding configurations, and delivering flawless final app interfaces.
            </p>

            {/* Statistic Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="flex flex-col space-y-1"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold text-brand-orange tabular-nums">
                    {stat.value}
                  </span>
                  <span className={`text-xs font-extrabold tracking-widest ${
                    darkMode ? "text-gray-400" : "text-neutral-muted"
                  }`}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
