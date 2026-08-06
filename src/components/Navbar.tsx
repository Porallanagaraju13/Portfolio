import { Moon, Sun, ArrowRight, Briefcase, Home, User, Code, Folder, Mail, Bot, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onHireMeClick: () => void;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode, onHireMeClick, isChatOpen, setIsChatOpen }: NavbarProps) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  // Intersection Observer to highlight current section as user scrolls
  useEffect(() => {
    const sections = ["home", "about", "experience", "skills", "projects", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Optimizes target section in focus
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", icon: Home, id: "home" },
    { name: "About", href: "#about", icon: User, id: "about" },
    { name: "Experience", href: "#experience", icon: Briefcase, id: "experience" },
    { name: "Skills", href: "#skills", icon: Code, id: "skills" },
    { name: "Projects", href: "#projects", icon: Folder, id: "projects" },
    { name: "Contact", href: "#contact", icon: Mail, id: "contact" },
  ];

  const handleBlogClick = () => navigate("/blog");

  return (
    <>
      {/* Desktop header */}
      <header className={`sticky top-0 z-50 hidden w-full border-b backdrop-blur-md transition-all duration-300 md:block ${
        darkMode
          ? "bg-neutral-dark/85 border-gray-800/80 text-white shadow-lg shadow-black/5"
          : "bg-white/80 border-gray-100 text-neutral-dark shadow-xs"
      }`}>
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between gap-4 px-6 md:px-8">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center select-none cursor-pointer group"
            aria-label="NP Tech Logo Home"
          >
            <svg width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2.5px_9px_rgba(255,138,0,0.22)] transition-transform duration-300 group-hover:scale-110 shrink-0">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF8A00" />
                  <stop offset="100%" stopColor="#FF5100" />
                </linearGradient>
                <linearGradient id="logoTeal" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00A896" />
                  <stop offset="100%" stopColor="#028090" />
                </linearGradient>
              </defs>
              <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="url(#logoGrad)" strokeWidth="6" strokeLinejoin="round" />
              <polygon points="50,15 82,33 82,67 50,85 18,67 18,33" fill="none" stroke="url(#logoTeal)" strokeWidth="3" strokeLinejoin="round" opacity="0.8" />
              <path d="M33 30 V70 M33 30 L55 58 V30" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M55 30 H65 C72 30 72 44 65 44 H55 V70" stroke="url(#logoTeal)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary navigation" className="flex min-w-0 items-center space-x-4 lg:space-x-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-200 relative group py-2 ${
                    isActive 
                      ? "text-brand-orange" 
                      : darkMode ? "text-gray-300 hover:text-brand-orange" : "text-neutral-dark hover:text-brand-orange"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-brand-orange transition-all duration-200 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </a>
              );
            })}
            {/* Blog link (navigates to /blog page) */}
            <button
              onClick={handleBlogClick}
              className={`text-sm font-semibold tracking-wide transition-colors duration-200 relative group py-2 bg-transparent border-none cursor-pointer ${
                darkMode ? "text-gray-300 hover:text-brand-orange" : "text-neutral-dark hover:text-brand-orange"
              }`}
            >
              Blog
              <span className="absolute bottom-0 left-0 h-[2px] bg-brand-orange transition-all duration-200 w-0 group-hover:w-full" />
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Theme Switch Action */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center justify-center p-2 rounded-full border transition-all duration-200 cursor-pointer ${
                darkMode 
                  ? "border-neutral-800 bg-neutral-900 text-amber-400 hover:bg-neutral-850" 
                  : "border-gray-100 bg-gray-50 text-neutral-muted hover:bg-gray-100"
              }`}
              style={{ width: "38px", height: "38px" }}
              aria-label="Toggle theme desktop"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Hire Me button */}
            <button
              onClick={onHireMeClick}
              aria-label="Contact Nagaraju"
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-bold shadow-lg shadow-brand-orange/15 hover:bg-brand-orange-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Hire Me</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Minimal top header on mobile */}
      <header className="absolute inset-x-0 top-0 z-40 flex w-full max-w-full box-border items-center justify-between px-5 py-5 select-none md:hidden">
        <a 
          href="#home" 
          className="flex items-center cursor-pointer group"
          aria-label="NP Tech Logo Home Mobile"
        >
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_8px_rgba(255,138,0,0.2)] shrink-0 transition-transform duration-300 group-hover:scale-105">
            <defs>
              <linearGradient id="logoGradMob" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8A00" />
                <stop offset="100%" stopColor="#FF5100" />
              </linearGradient>
              <linearGradient id="logoTealMob" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00A896" />
                <stop offset="100%" stopColor="#028090" />
              </linearGradient>
            </defs>
            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="url(#logoGradMob)" strokeWidth="6" strokeLinejoin="round" />
            <polygon points="50,15 82,33 82,67 50,85 18,67 18,33" fill="none" stroke="url(#logoTealMob)" strokeWidth="3" strokeLinejoin="round" opacity="0.8" />
            <path d="M33 30 V70 M33 30 L55 58 V30" stroke="url(#logoGradMob)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M55 30 H65 C72 30 72 44 65 44 H55 V70" stroke="url(#logoTealMob)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <button
          onClick={onHireMeClick}
          aria-label="Contact Nagaraju"
          className="flex shrink-0 items-center space-x-1 rounded-xl bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-orange/15 transition-all duration-200 hover:bg-brand-orange-hover active:scale-[0.98] cursor-pointer"
        >
          <span>Hire Me</span>
          <ArrowRight size={12} />
        </button>
      </header>

      {/* Floating mobile navigation */}
      <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 pointer-events-auto md:hidden">
        <nav aria-label="Mobile navigation" className={`flex items-center justify-between gap-0 overflow-hidden rounded-full border p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          darkMode 
            ? "bg-black/80 border-neutral-800 text-gray-300 shadow-black/40" 
            : "bg-white/90 border-gray-200/50 text-neutral-dark shadow-gray-200/40"
        }`}>
          {/* Navigation Links */}
          <div className="flex items-center justify-between w-full px-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group select-none relative sm:h-[42px] sm:w-[42px] ${
                    isActive
                      ? "text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/15 font-semibold"
                      : "text-gray-400 dark:text-gray-550 hover:text-brand-orange"
                  }`}
                >
                  <Icon size={19} className="transition-transform duration-200 group-hover:scale-110 shrink-0" />
                  
                  {/* Subtle active circle indicator below icon on small screens */}
                  {isActive && (
                    <span className="absolute bottom-1 w-1 h-1 bg-brand-orange rounded-full"></span>
                  )}
                </a>
              );
            })}

            {/* Blog button in mobile nav */}
            <button
              onClick={handleBlogClick}
              className={`flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer relative text-gray-400 dark:text-gray-550 hover:text-brand-orange`}
              style={{ width: "42px", height: "42px" }}
              aria-label="Go to Blog"
            >
              <BookOpen size={19} className="transition-transform duration-200 group-hover:scale-110 shrink-0" />
            </button>

            {/* Embedded Chatbot Action inside Mobile Bottom Menu */}
            <div className="w-[1px] h-5 bg-gray-200 dark:bg-neutral-800 mx-1 shrink-0"></div>

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer relative sm:h-[42px] sm:w-[42px] ${
                isChatOpen
                  ? "text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/15 font-semibold"
                  : "text-gray-400 dark:text-gray-550 hover:text-brand-orange"
              }`}
              aria-label="Toggle chat mobile"
            >
              <Bot size={19} className="transition-transform duration-200" />
              {!isChatOpen && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
