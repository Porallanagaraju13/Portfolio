import { Bot, X, Send, Sparkles, Settings, Key, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

interface AIChatbotProps {
  darkMode: boolean;
  isOpenState?: boolean;
  setIsOpenState?: (open: boolean) => void;
}

export default function AIChatbot({ darkMode, isOpenState, setIsOpenState }: AIChatbotProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = isOpenState !== undefined ? isOpenState : localIsOpen;
  const setIsOpen = setIsOpenState !== undefined ? setIsOpenState : setLocalIsOpen;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "assistant",
      text: "Hi there! I am Nagaraju's AI Portfolio Assistant. Ask me anything about his skills, experience at Cypherbit, automated pipelines, or anything else you would like to know!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("GEMINI_API_KEY") || "");
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Quick prompt suggestions
  const presetPrompts = [
    "What is his tech stack?",
    "Tell me about VgrowVoice AI",
    "What is CTXR Engine?",
    "Tell me about JobMatch AI"
  ];

  // Auto-scroll on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Synchronize temp API key when main key state changes
  useEffect(() => {
    setTempApiKey(apiKey);
  }, [apiKey]);

  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    if (trimmed) {
      localStorage.setItem("GEMINI_API_KEY", trimmed);
      setApiKey(trimmed);
    } else {
      localStorage.removeItem("GEMINI_API_KEY");
      setApiKey("");
    }
    setShowSettings(false);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("GEMINI_API_KEY");
    setApiKey("");
    setTempApiKey("");
    setShowSettings(false);
  };

  const getSmartLocalResponse = (userText: string): string => {
    const lower = userText.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi ") || lower.startsWith("hi") || lower.includes("hey") || lower.includes("greetings")) {
      return "Hi there! I am Nagaraju's AI Clone. 🤖 I am happy to guide you through his portfolio! Ask me about his tech stack, work experience at Cypherbit, VgrowVoice AI, JobMatch AI, CTXR Engine, or n8n automated pipelines.";
    }

    if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("languages") || lower.includes("program")) {
      return "Nagaraju's core technology stack includes:\n\n" +
        "• Languages: Java, JavaScript, TypeScript, Python, C, PHP\n" +
        "• AI/ML & Speech: Gemini Multimodal Live API, Gemini 2.0 Flash, AI Agents, NLP, Generative AI, LLM Integration\n" +
        "• Automation & Orchestration: n8n workflow pipelines, Inngest durable workflows, Twilio Media Streams\n" +
        "• Web & Frameworks: Next.js 14, React, FastAPI, Tailwind CSS, Zustand, Astro\n" +
        "• Databases & Backend: MySQL, PostgreSQL, Supabase RLS\n" +
        "• Infrastructure & Deployment: Docker, Google Cloud Run, Hostinger, GoDaddy, Namecheap, Git, GitHub\n\n" +
        "He is highly skilled in object-oriented programming (OOP), SDLC, debugging, multi-tenant architectures, and building scalable modular systems.";
    }

    if (lower.includes("cypherbit") || lower.includes("founding") || lower.includes("current job") || lower.includes("current role")) {
      return "Nagaraju is currently working as a Founding Engineer @ Cypherbit Private Limited (August 2025 - Present).\n\n" +
        "His core responsibilities and accomplishments include:\n" +
        "1. Architecting high-impact AI/ML engineering pipelines.\n" +
        "2. Developing an automated AI HR Recruitment Pipeline using n8n and Gemini AI.\n" +
        "3. Designing a Telegram Invoice Processing Agent powered by Gemini Vision.\n" +
        "4. Researching and evaluating advanced LangChain and Gemini API frameworks to integrate R&D features.";
    }

    if (lower.includes("experience") || lower.includes("work") || lower.includes("job") || lower.includes("history") || lower.includes("intern")) {
      return "Nagaraju has a rich portfolio of software engineering experience:\n\n" +
        "1. Founding Engineer @ Cypherbit Private Limited (August 2025 - Present): Leading AI Agent engineering and pipeline automation.\n\n" +
        "2. Web Developer Intern @ TruPricer (Pure In Fresh Foods Pvt Ltd) (February 2025 - February 2026): Managed high-traffic web domains, SSL certificates, and DNS settings on Hostinger, GoDaddy, and Namecheap; built optimized, SEO-friendly responsive landing pages and portals with HTML, CSS, JavaScript, and PHP.\n\n" +
        "3. Technical Support Intern @ Prasanta Communications (October 2024 - January 2025): Maintained server endpoints and developed dynamic frontend integrations using JavaScript and the Astro framework.\n\n" +
        "4. SDE Intern @ Bluestock Fintech (September 2024 - October 2024): Worked alongside core engineers developing secure financial technology software.";
    }

    if (lower.includes("vgrow") || lower.includes("voice") || lower.includes("receptionist") || lower.includes("twilio")) {
      return "VgrowVoice AI is an Intelligent Voice Receptionist & Lead Capture SaaS built by Nagaraju:\n\n" +
        "• Sub-Second Voice Latency: Powered by Google Gemini Multimodal Live API (BidiGenerateContent WebSocket) and Twilio Media Streams.\n" +
        "• Autonomous Inbound & Outbound Calling: Handles incoming customer inquiries and instantly initiates callbacks upon ad lead form submission.\n" +
        "• Features: Dynamic appointment scheduling, anti-hallucination guardrails, multilingual support (English, Telugu, Hindi), live call transcripts, and Supabase multi-tenant RLS.\n" +
        "• GitHub Repo: https://github.com/Porallanagaraju13/Vgrow-Voice-AI";
    }

    if (lower.includes("jobmatch") || lower.includes("job-match") || lower.includes("job match") || lower.includes("inngest")) {
      return "JobMatch AI (JobBuddy AI) is a full-stack AI job application & matching platform built by Nagaraju:\n\n" +
        "• Tech Stack: Next.js App Router, TypeScript, Supabase (PostgreSQL + RLS), Inngest, Stripe, Tailwind CSS.\n" +
        "• Key Features: Durable background workflows for resume extraction, scheduled job discovery across platforms, application preparation, multi-tenant database schema, private resume storage, and Stripe subscription sync.\n" +
        "• GitHub Repo: https://github.com/Porallanagaraju13/Job-Match";
    }

    if (lower.includes("ctxr") || lower.includes("prompt engine") || lower.includes("normalizer") || lower.includes("chrome extension")) {
      return "CTXR is a production-ready Document Normalizer & Prompt Optimization Engine built by Nagaraju:\n\n" +
        "• Tech Stack: Python 3.12+, FastAPI, Google Gemini 2.0 Flash, Manifest V3 Chrome Extension, Docker, Google Cloud Run.\n" +
        "• Core Features: 7-stage prompt compression delivering 40-70% token savings, GFM Markdown document normalizer (PDFs, DOCX, PPTX, Images), AI-Vision OCR, and inline '✨ Optimize' button injected directly into ChatGPT, Claude & Gemini prompt bars.\n" +
        "• GitHub Repo: https://github.com/Porallanagaraju13/CTXR";
    }

    if (lower.includes("hr recruitment") || lower.includes("pipeline") || lower.includes("automated recruitment") || lower.includes("hr pipeline")) {
      return "The AI HR Recruitment Pipeline is a stellar n8n automation project built by Nagaraju:\n\n" +
        "• Intake & Analysis: Forms intake triggers the flow, passing resumes directly to Gemini AI.\n" +
        "• Match Relevancy: Gemini reads and scores resumes based on role requirements, sorting them into shortlist or rejection queues.\n" +
        "• Automation: Structured documents are uploaded to Google Drive. Shortlisted candidates receive automated Google Calendar invites with unique Google Meet links, and status emails are dispatched securely via Gmail.";
    }

    if (lower.includes("invoice") || lower.includes("telegram") || lower.includes("ocr") || lower.includes("gst") || lower.includes("tax")) {
      return "The Telegram Invoice Processing Agent is an intelligent R&D project:\n\n" +
        "• Bot Integration: A custom Telegram Bot receives invoice scans/PDFs.\n" +
        "• Extraction: Passes images to Gemini Vision to accurately pull line item details and quantities.\n" +
        "• Tax & Pharmacy Codes: Automatically assigns internal pharmacy inventory codes and calculates Indian HSN/GST brackets (CGST/SGST/IGST).\n" +
        "• Structured Output: Delivers a clean CSV directly back, ready for immediate pharmacy ERP import!";
    }

    if (lower.includes("negotiation") || lower.includes("e-commerce") || lower.includes("chatbot") || lower.includes("price")) {
      return "His Smart E-Commerce Price Negotiation Chatbot is built with Python, NLTK, scikit-learn, and Tkinter.\n\n" +
        "It uses tokenization and lemmatization on custom JSON datasets to detect intent. The chatbot manages conversational state dynamically to simulate real-time price bargaining, helping automate dynamic checkout negotiation structures!";
    }

    if (lower.includes("underwater") || lower.includes("msran") || lower.includes("image enhancement") || lower.includes("cnn")) {
      return "Underwater Image Enhancement using MSRAN is a research-focused project:\n\n" +
        "• Technology: Built using Python, TensorFlow, and deep Convolutional Neural Networks (CNNs).\n" +
        "• Core Idea: Restores underwater images by mitigating color cast, light scattering, and low contrast.\n" +
        "• Architecture: Leverages a Multi-Scale Recursive Attention Network (MSRAN) for precise local structure enhancement and color restoration.";
    }

    if (lower.includes("resume") || lower.includes("cv") || lower.includes("download") || lower.includes("profile")) {
      return "You can download Nagaraju's fully detailed resume CV by clicking the floating 'Download CV' action button in the Hero section at the very top of the page! It contains his contact information, academics, and complete experience.";
    }

    if (lower.includes("education") || lower.includes("college") || lower.includes("study") || lower.includes("academics") || lower.includes("btech") || lower.includes("degree")) {
      return "Nagaraju's academic credentials are fully verified:\n\n" +
        "• Bachelor of Technology in Computer Science and Engineering @ Siddhartha Institute of Engineering and Technology (2021 - 2025) | Cumulative CGPA: 7.33.\n" +
        "• Intermediate Education (MPC) @ Krishnaveni Junior College (2020 - 2021) | Final score: 900 / 1000.";
    }

    if (lower.includes("certifications") || lower.includes("badge") || lower.includes("google cloud") || lower.includes("aws") || lower.includes("ibm")) {
      return "Nagaraju is continually upskilling, holding certified credentials:\n\n" +
        "• Google Cloud Skills Boost: Earned badges in Prompt Design in Vertex AI, Explore Generative AI with Vertex AI Gemini API, and Build Real World AI Apps with Gemini & Imagen.\n" +
        "• AWS Educate: Finished Introduction to Generative AI.\n" +
        "• IBM SkillsBuild: Finished Journey to Cloud: Envisioning Your Solution.\n" +
        "• Microsoft & Edunet: Completed a rigorous Foundations of Artificial Intelligence Internship.";
    }

    if (lower.includes("contact") || lower.includes("reach") || lower.includes("email") || lower.includes("phone") || lower.includes("hire") || lower.includes("linkedin") || lower.includes("github")) {
      return "You can contact Nagaraju instantly through the following channels:\n\n" +
        "• Email: nagarajuporalla13@gmail.com\n" +
        "• Phone: +91 9908425164\n" +
        "• LinkedIn: https://www.linkedin.com/in/nagaraju-poralla-13aab2248/\n" +
        "• GitHub: https://github.com/Porallanagaraju13\n\n" +
        "You can also use the contact form at the bottom of this website to send a direct message straight to his inbox!";
    }

    return "Thank you for asking! As Nagaraju's AI Clone, I can tell you that he is a dedicated Founding Engineer specializing in creating intelligent autonomous AI agents, real-time Voice AI receptionists (VgrowVoice AI), prompt optimization engines (CTXR), job matching SaaS (JobMatch AI), automated n8n pipelines, and modular full-stack solutions. What can I help you discover about him?";
  };

  const handleSendMessage = async (textToSend: string) => {
    const textMsg = textToSend.trim();
    if (!textMsg) return;

    // Append User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setSending(true);

    let replyText = "";

    // 1. Direct Browser-to-Gemini Call if client-side API Key is loaded in LocalStorage
    if (apiKey) {
      try {
        const systemInstruction = `
You are the interactive AI Agent / Portfolio Assistant of Nagaraju Poralla (Founding Engineer - AI Agents & R&D).
Your mission is to represent Nagaraju to recruiters, clients, and visitors with intelligence, clarity, and developer wit.

Nagaraju's Professional Bio:
- Role: Founding Engineer @ Cypherbit Private Limited (August 2025 - Present). Working on high-impact AI/ML engineering, building an AI HR recruitment pipeline (n8n, Gemini) and a Telegram invoice processing agent using Gemini Vision, and evaluating LangChain & Gemini API for R&D.
- Past Experience:
  1. Web Developer Intern @ TruPricer (Pure In Fresh Foods Pvt Ltd) (February 2025 - February 2026): Managed DNS records, domain registration, and SSL integration across Hostinger, GoDaddy, and Namecheap; developed responsive SEO-friendly websites using HTML, CSS, JavaScript, and PHP.
  2. Technical Support Intern @ Prasanta Communications (October 2024 - January 2025): Developed internal features using JavaScript, Astro framework, and AI tools.
  3. SDE Intern @ Bluestock Fintech (September 2024 - October 2024): Worked on fintech software development with senior engineers.
- Education:
  * Bachelor of Technology in Computer Science and Engineering @ Siddhartha Institute of Engineering and Technology (June 2021 - July 2025), CGPA: 7.33.
  * Intermediate Public Examination (MPC) @ Krishnaveni Junior College (June 2020 - March 2021), Marks: 900.
- Contact Info: Email: nagarajuporalla13@gmail.com, Phone: +91 9908425164, LinkedIn: https://www.linkedin.com/in/nagaraju-poralla-13aab2248/, GitHub: https://github.com/Porallanagaraju13

Technical Skillset:
- AI, Speech & ML: Gemini Multimodal Live API, Gemini 2.0 Flash, AI Agents, NLP, Generative AI.
- Languages: Java, JavaScript, TypeScript, Python, C, PHP.
- Web & Frameworks: Next.js 14, React, FastAPI, HTML, CSS, Tailwind CSS, Zustand, Astro, WordPress.
- Databases & Auth: MySQL, PostgreSQL, Supabase RLS.
- Automation & Tools: n8n, Inngest, Twilio Media Streams, Docker, Google Cloud Run, Git, GitHub, Hostinger, GoDaddy, Namecheap.

Key Projects Featured:
1. JobMatch AI Platform (https://github.com/Porallanagaraju13/Job-Match):
   - Full-stack AI job matching platform with Next.js, Supabase, Inngest durable workflows, and Stripe billing.
2. VgrowVoice AI Receptionist (https://github.com/Porallanagaraju13/Vgrow-Voice-AI):
   - Real-time sub-second latency Voice AI receptionist & lead capture SaaS using Gemini Multimodal Live WebSocket API & Twilio Streams.
3. CTXR Engine & Chrome Extension (https://github.com/Porallanagaraju13/CTXR):
   - 7-stage prompt optimization engine & document normalizer (FastAPI, Gemini 2.0 Flash, Docker, Cloud Run) with Manifest V3 Chrome Extension.
4. AI HR Recruitment Pipeline:
   - n8n automated recruitment: form intake → Gemini resume scoring → shortlist → Drive upload → Calendar interview with Meet link → Gmail.
5. Telegram Invoice Processing Agent:
   - Telegram Bot with Gemini Vision to extract invoice line items, map HSN & GST rates, and export CSV.
6. Smart E-Commerce Price Negotiation Chatbot:
   - Python NLTK & scikit-learn intent recognition with Tkinter dialogue GUI.

Guidelines for your responses:
- Tone: Extremely smart, conversational, helpful, confident, and professional. Avoid sounding robotic or dry.
- Speak in the FIRST PERSON on behalf of Nagaraju's portfolio ("As Nagaraju's AI Assistant, I can tell you...", "Nagaraju enjoys...").
- Give concise answers. Highlight his latest projects (VgrowVoice AI, CTXR, JobMatch AI) when relevant.
`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: textMsg }]
              }
            ],
            systemInstruction: {
              parts: [{ text: systemInstruction }]
            },
            generationConfig: {
              temperature: 0.7
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      } catch (clientErr) {
        console.warn("Client-side direct Gemini call failed, trying local server fallback:", clientErr);
      }
    }

    // 2. Local Express Server Call (fallback/local development backend route)
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (!replyText && isLocal) {
      try {
        const chatHistory = messages.concat(userMsg).map(m => ({
          role: m.sender === "user" ? "user" : "model",
          content: m.text
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: chatHistory })
        });

        if (response.ok) {
          const data = await response.json();
          replyText = data.text || "";
        }
      } catch (serverErr) {
        // Safe to ignore, we have our robust smart rule-engine fallback below
      }
    }

    // 3. Fully Static Client-Side Rules Engine Fallback (for production GitHub Pages deployments)
    if (!replyText) {
      replyText = getSmartLocalResponse(textMsg);
    }

    const assistantMsg: ChatMessage = {
      id: `ast-${Date.now()}`,
      sender: "assistant",
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, assistantMsg]);
    setSending(false);
  };

  return (
    <>
      {/* Floating Action Trigger Button (Hidden on Mobile, visible on Desktop/Tablet) */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="ai-chatbot-trigger-btn"
          className="relative h-14 w-14 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/30 cursor-pointer hover:bg-brand-orange-hover hover:scale-105 active:scale-95 transition-all duration-200"
          title="Chat with Nagaraju's AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Bot className="w-6 h-6" />
          )}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 text-[8px] text-white font-extrabold items-center justify-center">1</span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Drawer Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 60, x: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`fixed bottom-26 left-4 right-4 sm:left-auto sm:right-6 w-[calc(100%-2rem)] sm:w-96 max-w-[385px] sm:max-w-none h-[420px] sm:h-[500px] rounded-3xl border z-50 shadow-2xl flex flex-col overflow-hidden ${
              darkMode ? "bg-gray-950 border-gray-800 text-white" : "bg-white border-gray-100 text-neutral-dark"
            }`}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100/10 flex items-center justify-between bg-brand-orange text-white">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-xl bg-white/20">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">Nagaraju's AI Clone</h4>
                  <span className="text-[10px] text-orange-100 flex items-center gap-1">
                    <Sparkles size={8} /> {apiKey ? "Live Gemini AI Mode" : "Smart Assist Mode"}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors ${showSettings ? "bg-white/10" : ""}`}
                  title="Configure Gemini API Key"
                >
                  <Settings size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Main Conversational Area / Settings View */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              <AnimatePresence>
                {showSettings ? (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`absolute inset-0 z-20 p-5 flex flex-col justify-between ${
                      darkMode ? "bg-gray-950 text-white" : "bg-white text-neutral-dark"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-brand-orange">
                        <Key size={18} />
                        <h5 className="text-sm font-bold">Secure Local API Configuration</h5>
                      </div>
                      <p className="text-xs text-neutral-muted dark:text-gray-400 leading-relaxed">
                        To unlock unrestricted generative AI answers directly from the model, paste your personal Google Gemini API key below.
                      </p>
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 text-[10px] leading-relaxed border border-amber-500/20">
                        🔒 <strong>Privacy Guarantee:</strong> Your key is stored strictly inside your browser's private local storage. It is never uploaded to any remote server or stored in git history.
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-muted dark:text-gray-400">
                          Gemini API Key
                        </label>
                        <input
                          type="password"
                          placeholder="AIzaSy..."
                          value={tempApiKey}
                          onChange={(e) => setTempApiKey(e.target.value)}
                          className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-brand-orange ${
                            darkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-gray-50 border-gray-100 text-neutral-dark"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t border-gray-100/10">
                      {apiKey && (
                        <button
                          onClick={handleClearApiKey}
                          className="flex items-center justify-center p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer transition-colors"
                          title="Delete saved API key"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => setShowSettings(false)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors ${
                          darkMode ? "border-gray-800 text-white" : "border-gray-100 text-neutral-dark"
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveApiKey}
                        className="flex-1 py-2 text-xs font-bold rounded-xl bg-brand-orange text-white cursor-pointer hover:bg-brand-orange-hover transition-colors"
                      >
                        Save Settings
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Conversational Screen Messages log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`p-3.5 max-w-[85%] rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-brand-orange text-white rounded-tr-none font-medium"
                        : darkMode
                          ? "bg-gray-900 border border-gray-800 text-gray-300 rounded-tl-none"
                          : "bg-gray-50 text-neutral-dark border border-gray-100 rounded-tl-none"
                    }`}>
                      {m.text}
                      <div className="text-[9px] text-right mt-1.5 opacity-60 font-mono">
                        {m.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className={`p-3.5 rounded-2xl text-xs flex items-center space-x-2 ${
                      darkMode ? "bg-gray-900" : "bg-gray-50"
                    }`}>
                      <div className="flex space-x-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messageEndRef} />
              </div>
            </div>

            {/* Quick Presets chips block (hidden when user is typing or settings is open) */}
            {inputText.length === 0 && !showSettings && (
              <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 bg-transparent border-t border-gray-100/5">
                {presetPrompts.map(p => (
                  <button
                    key={p}
                    onClick={() => handleSendMessage(p)}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-800 text-neutral-muted dark:text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-colors cursor-pointer bg-transparent"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Actions Footer message bar input (hidden when settings open) */}
            {!showSettings && (
              <div className="p-3 border-t border-gray-100/10 flex items-center space-x-2 bg-transparent">
                <input
                  type="text"
                  placeholder={apiKey ? "Ask Live Gemini anything..." : "Ask about Cypherbit, Python, CV..."}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                  disabled={sending}
                  className={`flex-1 px-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange ${
                    darkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-gray-50 border-gray-100 text-neutral-dark"
                  }`}
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={sending || !inputText.trim()}
                  className="p-3 rounded-xl bg-brand-orange text-white hover:bg-brand-orange-hover outline-none disabled:opacity-40 transition-colors duration-200 cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
