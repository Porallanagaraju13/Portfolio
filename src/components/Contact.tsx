import { Mail, Check, MessageSquare } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validation checks
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please complete all required fields (First Name, Email address, and message).");
      return;
    }

    setLoading(true);

    const senderName = [formData.firstName, formData.lastName].filter(Boolean).join(" ");
    const subject = `Portfolio enquiry from ${senderName}`;
    const body = [
      `Name: ${senderName}`,
      `Email: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");

    window.location.href = `mailto:nagarajuporalla13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <section id="contact" className="py-20 bg-brand-orange-faint relative overflow-hidden">
      {/* Background neon orb glow */}
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Form: Get in touch input fields */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="space-y-2">
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                darkMode ? "text-gray-100" : "text-neutral-dark"
              }`}>
                Get In <span className="text-brand-orange">Touch</span>
              </h2>
              <p className={`text-base sm:text-lg ${
                darkMode ? "text-gray-400" : "text-neutral-muted"
              }`}>
                Let's discuss how we can build something amazing together.
              </p>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-neutral-muted"}`}>
                Prefer email? <a className="font-semibold text-brand-orange hover:underline" href="mailto:nagarajuporalla13@gmail.com">nagarajuporalla13@gmail.com</a>
              </p>
            </div>

            {/* Error notifications */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-3 rounded-xl bg-red-100 border border-red-200 text-red-800 text-sm font-medium"
                >
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            {submitted ? (
              <motion.div
                role="status"
                aria-live="polite"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`p-8 rounded-3xl border text-center flex flex-col items-center justify-center space-y-4 ${
                  darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
                }`}
              >
                <div className="p-4 rounded-full bg-emerald-100 text-emerald-600">
                  <Check size={36} />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">Your email draft is ready</h3>
                <p className={`text-sm max-w-sm ${darkMode ? "text-gray-400" : "text-neutral-muted"}`}>
                  Your email app should open with a pre-filled message. Send it to contact Nagaraju, or email him directly if no mail app opens.
                </p>
                <a
                  href="mailto:nagarajuporalla13@gmail.com"
                  className="text-sm font-bold text-brand-orange hover:underline"
                >
                  Email Nagaraju directly
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold hover:text-brand-orange hover:border-brand-orange transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-muted uppercase tracking-wider">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Nagaraju"
                      className={`px-5 py-3.5 rounded-2xl border text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                        darkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-100 text-neutral-dark"
                      }`}
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-extrabold text-neutral-muted uppercase tracking-wider">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Poralla"
                      className={`px-5 py-3.5 rounded-2xl border text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                        darkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-100 text-neutral-dark"
                      }`}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-extrabold text-neutral-muted uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@yourdomain.com"
                    className={`px-5 py-3.5 rounded-2xl border text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                      darkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-100 text-neutral-dark"
                    }`}
                    required
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-extrabold text-neutral-muted uppercase tracking-wider">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello! I would love to collaborate on a new AI Agent workflow project with you..."
                    className={`px-5 py-3.5 h-36 rounded-2xl border text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                      darkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-100 text-neutral-dark"
                    }`}
                    required
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-4 rounded-2xl bg-brand-orange text-white font-extrabold shadow-lg shadow-brand-orange/20 cursor-pointer hover:bg-brand-orange-hover active:scale-98 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Preparing email...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare size={16} />
                      <span>Open Email Draft</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Right side Orb Orbit Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-xs md:max-w-sm aspect-square flex items-center justify-center"
            >
              {/* Spinning background orb ring */}
              <div className="absolute inset-0 bg-brand-orange/5 dark:bg-brand-orange/10 rounded-full blur-2xl animate-pulse"></div>

              {/* Orbital connections visual */}
              <svg
                id="contact-orbital-svg"
                viewBox="0 0 300 300"
                className="w-full h-full relative z-10"
                alt="Contact Orbiting Network Elements"
              >
                <defs>
                  <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2E6" />
                    <stop offset="100%" stopColor="#FFE0CC" />
                  </linearGradient>
                  {/* Dark Mode Gradient */}
                  <linearGradient id="orbGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2A1A0A" />
                    <stop offset="100%" stopColor="#1C1107" />
                  </linearGradient>
                </defs>

                {/* Outer decorative orbits */}
                <circle cx="150" cy="150" r="100" fill="none" stroke={darkMode ? "#334155" : "#E2E8F0"} strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="150" cy="150" r="70" fill="none" stroke={darkMode ? "#1E293B" : "#F1F5F9"} strokeWidth="1.5" />

                {/* Central main Mail coin element */}
                <circle cx="150" cy="150" r="45" fill={darkMode ? "url(#orbGradDark)" : "url(#orbGrad)"} stroke="#FF8A00" strokeWidth="2" className="animate-pulse" />
                
                {/* Bright '@' logo inside coin */}
                <text x="150" y="160" fill="#FF8A00" fontSize="32" fontWeight="800" textAnchor="middle" fontFamily="Plus Jakarta Sans">@</text>

                {/* Orbiting element 1 - Link icon */}
                <g className="animate-bounce" style={{ transformOrigin: "80px 80px", animationDuration: "3.5s" }}>
                  <circle cx="80" cy="80" r="22" fill={darkMode ? "#1F2937" : "#FFFFFF"} stroke={darkMode ? "#374151" : "#E2E8F0"} strokeWidth="1.5" />
                  <path d="M74 86 H86 M74 80 H86 M77 74 H83" stroke="#FF8A00" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Orbiting element 2 - Envelope logo */}
                <g className="animate-bounce" style={{ transformOrigin: "230px 180px", animationDuration: "5s" }}>
                  <circle cx="230" cy="180" r="22" fill={darkMode ? "#1F2937" : "#FFFFFF"} stroke="#FF8A00" strokeWidth="1.5" />
                  <rect x="219" y="172" width="22" height="15" rx="3" fill="none" stroke="#FF8A00" strokeWidth="1.8" />
                  <path d="M219 173 L230 181 L241 173" stroke="#FF8A00" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
                </g>

                {/* Orbiting element 3 - Phone badge */}
                <g className="animate-bounce" style={{ transformOrigin: "100px 220px", animationDuration: "4.2s" }}>
                  <circle cx="100" cy="220" r="18" fill={darkMode ? "#1F2937" : "#FFFFFF"} stroke={darkMode ? "#4B5563" : "#F3F4F6"} strokeWidth="1.5" />
                  <circle cx="100" cy="220" r="6" fill="#00A896" />
                </g>

                {/* Linking bridges */}
                <line x1="150" y1="105" x2="80" y2="80" stroke="#FF8A00" strokeWidth="1.0" strokeOpacity="0.4" strokeDasharray="3 3" />
                <line x1="150" y1="195" x2="230" y2="180" stroke="#FF8A00" strokeWidth="1.0" strokeOpacity="0.4" strokeDasharray="3 3" />
              </svg>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
