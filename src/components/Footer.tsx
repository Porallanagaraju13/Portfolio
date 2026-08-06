import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const navigate = useNavigate();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className={`py-12 border-t font-medium ${
      darkMode ? "bg-gray-950 border-gray-900 text-gray-400" : "bg-white border-gray-100 text-neutral-muted"
    }`}>
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Logo brand */}
          <a 
            href="#home" 
            className="flex items-center select-none cursor-pointer group"
            aria-label="NP Tech Logo Home Footer"
          >
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_1.5px_6px_rgba(255,138,0,0.18)] transition-transform duration-300 group-hover:scale-110 shrink-0">
              <defs>
                <linearGradient id="logoGradFoot" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF8A00" />
                  <stop offset="100%" stopColor="#FF5100" />
                </linearGradient>
                <linearGradient id="logoTealFoot" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00A896" />
                  <stop offset="100%" stopColor="#028090" />
                </linearGradient>
              </defs>
              <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="url(#logoGradFoot)" strokeWidth="6" strokeLinejoin="round" />
              <polygon points="50,15 82,33 82,67 50,85 18,67 18,33" fill="none" stroke="url(#logoTealFoot)" strokeWidth="3" strokeLinejoin="round" opacity="0.8" />
              <path d="M33 30 V70 M33 30 L55 58 V30" stroke="url(#logoGradFoot)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M55 30 H65 C72 30 72 44 65 44 H55 V70" stroke="url(#logoTealFoot)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#projects" className="hover:text-brand-orange transition-colors">Work</a>
            <a href="#skills" className="hover:text-brand-orange transition-colors">Stack</a>
            <a href="#experience" className="hover:text-brand-orange transition-colors">Experience</a>
            <button
              onClick={() => navigate("/blog")}
              className="hover:text-brand-orange transition-colors cursor-pointer bg-transparent border-none p-0 font-medium font-sans"
            >
              Blog
            </button>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-brand-orange transition-colors cursor-pointer bg-transparent border-none p-0 font-medium font-sans"
            >
              Privacy
            </button>
          </div>

          {/* Right copyright terms */}
          <span className="text-xs font-mono select-none">
            &copy; 2026 Nagaraju Poralla. All rights reserved.
          </span>

        </div>
      </div>

      {/* Privacy modal dialog box */}
      <AnimatePresence>
        {privacyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPrivacyOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`p-6 max-w-md w-full rounded-3xl border relative z-10 shadow-2xl flex flex-col space-y-4 animate-in fade-in duration-200 ${
                darkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-100 text-neutral-dark"
              }`}
            >
              {/* Header */}
              <div className="flex items-center space-x-2.5 text-brand-orange">
                <ShieldCheck size={24} />
                <h3 className="text-lg font-extrabold tracking-tight">Privacy Policy Terms</h3>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setPrivacyOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-150 dark:hover:bg-gray-800 text-neutral-muted transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Privacy terms list */}
              <div className={`text-xs space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-1 ${
                darkMode ? "text-gray-300" : "text-neutral-muted"
              }`}>
                <p>
                  Welcome to Nagaraju Poralla's Personal AI Portfolio App. Your privacy is paramount, and this policy outlines our operations.
                </p>
                <h4 className="font-extrabold uppercase mt-4">1. Local Sandbox State Storage</h4>
                <p>
                  Any information supplied in our interactive project sandbox simulators (like resumes, receipt inputs, and e-commerce text chat messages) is executed entirely within your client browser local memory storage. No personal raw transaction receipts or resumes are uploaded or kept permanently on server disks.
                </p>
                <h4 className="font-extrabold uppercase mt-4">2. Gemini Chat Dialogs API</h4>
                <p>
                  Questions forwarded inside Nagaraju's AI Portfolio Chat helper are routed securely onto our Express backend proxy, which relays prompt items directly to Google's Gemini LLM. All chat transactions run privately and anonymously.
                </p>
                <h4 className="font-extrabold uppercase mt-4">3. External Links &amp; Referrals</h4>
                <p>
                  Our app contains referrals pointing to standard communication conduits like LinkedIn, GitHub, and directly reachable email. Please consult respective hosts for their terms.
                </p>
              </div>

              {/* Close button bottom */}
              <button
                onClick={() => setPrivacyOpen(false)}
                className="w-full py-3.5 mt-2 rounded-2xl bg-brand-orange text-white text-xs font-bold shadow-md shadow-brand-orange/20 hover:bg-brand-orange-hover duration-150 cursor-pointer"
              >
                Accept and Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
