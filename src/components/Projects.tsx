import { UserPlus, Receipt, MessageSquare, ArrowRight, Play, CheckCircle2, Bot, Send, Target, Mic, Zap, Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import Tilt3D from "./Tilt3D";

interface ProjectsProps {
  darkMode: boolean;
}

export default function Projects({ darkMode }: ProjectsProps) {
  const [activeDemo, setActiveDemo] = useState<"resume" | "invoice" | "ecommerce" | "jobmatch" | "voiceai" | "ctxr" | null>(null);

  // Resume Simulator States
  const [resumeText, setResumeText] = useState("Alex Rivers\nExperience: 3 years building automated systems in Python.\nSkilled in: n8n pipelines, Docker container orchestration, PostgreSQL database design.\nGoal: Seeking AI Development roles.");
  const [resumeResult, setResumeResult] = useState<any>(null);
  const [resumeRunning, setResumeRunning] = useState(false);

  // Invoice Simulator States
  const [invoiceText, setInvoiceText] = useState("ACME COOPERATIVE INC.\nDate: May 20, 2026\nInvoice ID: INV-77492\nItems:\n- 2x High-Performance Server Racks @ $1200.00 each\n- 1x Cloud Router Node @ $450.00 each\nSUB-TOTAL: $2850.00\nTAX 10%: $285.00\nTOTAL CHARGED: $3135.0" );
  const [invoiceResult, setInvoiceResult] = useState<any>(null);
  const [invoiceRunning, setInvoiceRunning] = useState(false);

  // E-Commerce RAG Simulator States
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Welcome! I am the Smart E-Commerce Chatbot connected to Nagaraju's merchandise catalog. Try asking me if the orange hoodie is in stock or ask for recommendation!" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const projects: Project[] = [
    {
      id: "proj-1",
      title: "AI HR Recruitment Pipeline",
      description: "End-to-end automated recruitment pipeline: form intake → Gemini resume scoring → shortlisting → Drive CV upload → Meet interview → Gmail.",
      tags: ["n8n", "Gemini AI", "Google Sheets", "Gmail"],
      iconType: "pipeline",
      demoType: "resume",
      githubUrl: "https://github.com/Porallanagaraju13",
      details: "A multi-stage agentic recruiter pipeline. Automates CV processing by scanning intakes, scoring resumes via Gemini AI, uploading selected CVs to Google Drive, scheduling Google Meet interviews, and notifying applicants and HR via Gmail."
    },
    {
      id: "proj-2",
      title: "Telegram Invoice Agent",
      description: "Intelligent agent using Gemini Vision to extract invoice line items, map pharmacy codes, HSN & GST, and deliver CSV reports.",
      tags: ["Gemini Vision", "n8n", "Telegram Bot", "JavaScript"],
      iconType: "telegram",
      demoType: "invoice",
      githubUrl: "https://github.com/Porallanagaraju13",
      details: "A smart Telegram bot that processes invoice images or PDFs. Leverages Gemini Vision to extract line items, auto-generates pharmacy codes with dosage, maps HSN & GST rates (CGST/SGST/IGST) according to Indian tax law, and outputs structured CSV files."
    },
    {
      id: "proj-3",
      title: "Smart E-Commerce Chatbot",
      description: "AI chatbot built with intent recognition, tokenization, lemmatization, and real-time price negotiation dialogues.",
      tags: ["Python", "NLTK", "scikit-learn", "Tkinter"],
      iconType: "chatbot",
      demoType: "ecommerce",
      githubUrl: "https://github.com/Porallanagaraju13",
      details: "An AI negotiation chatbot trained on JSON dialogue datasets. Utilizes NLTK and scikit-learn for intent recognition, incorporating custom tokenization and lemmatization, with an interactive Tkinter graphical interface."
    },
    {
      id: "proj-4",
      title: "JobMatch AI Platform",
      description: "Full-stack AI job matching platform featuring durable Inngest event workflows, automated resume extraction, job discovery, and Stripe billing.",
      tags: ["Next.js", "TypeScript", "Supabase", "Inngest", "Stripe"],
      iconType: "jobmatch",
      githubUrl: "https://github.com/Porallanagaraju13/Job-Match",
      details: "A comprehensive SaaS platform that automates job discovery and resume parsing. Built with Next.js App Router, Supabase RLS, and Inngest background event processing."
    },
    {
      id: "proj-5",
      title: "VgrowVoice AI Receptionist",
      description: "Real-time Voice AI receptionist & lead capture SaaS achieving sub-second latency via Gemini Multimodal Live WebSocket API & Twilio Streams.",
      tags: ["Next.js", "Gemini Live API", "Twilio", "Supabase", "WebSocket"],
      iconType: "voiceai",
      githubUrl: "https://github.com/Porallanagaraju13/Vgrow-Voice-AI",
      details: "Autonomous voice AI agent handling inbound calls, lead campaign form call-backs, appointment scheduling, and multilingual conversations (English, Telugu, Hindi)."
    },
    {
      id: "proj-6",
      title: "CTXR Engine & Extension",
      description: "Production-ready document normalizer & prompt optimization engine delivering 40-70% token savings with a Manifest V3 Chrome Extension.",
      tags: ["Python", "FastAPI", "Gemini 2.0 Flash", "Chrome Extension", "Cloud Run"],
      iconType: "ctxr",
      githubUrl: "https://github.com/Porallanagaraju13/CTXR",
      details: "7-stage prompt compression & GFM markdown document normalizer for PDFs, DOCX, and PPTX with inline ChatGPT/Claude/Gemini Chrome extension optimization."
    }
  ];

  // Resume Demo Runner
  const runResumePipeline = () => {
    setResumeRunning(true);
    setResumeResult(null);
    setTimeout(() => {
      // Analyze text values to extract keywords
      const lower = resumeText.toLowerCase();
      const score = lower.includes("python") || lower.includes("n8n") ? 92 : 74;
      const structuredData = {
        candidateName: lower.includes("alex river") ? "Alex Rivers" : "Unidentified Profile",
        extractedSkills: [] as string[],
        recommendation: score >= 85 ? "STRONG MATCH &ndash; Route to Founder Panel" : "MODERATE MATCH &ndash; Queue For Screening Interview",
        scores: {
          skillsMatch: score,
          experienceScore: lower.includes("year") ? 88 : 70,
          completeness: 100
        }
      };
      if (lower.includes("python")) structuredData.extractedSkills.push("Python");
      if (lower.includes("n8n")) structuredData.extractedSkills.push("n8n Orchestration");
      if (lower.includes("docker")) structuredData.extractedSkills.push("Docker Containerization");
      if (lower.includes("postgres")) structuredData.extractedSkills.push("PostgreSQL DB");

      setResumeResult(structuredData);
      setResumeRunning(false);
    }, 1800);
  };

  // Invoice OCR Demo Runner
  const runInvoiceOCR = () => {
    setInvoiceRunning(true);
    setInvoiceResult(null);
    setTimeout(() => {
      const lower = invoiceText.toLowerCase();
      const extracted = {
        vendorName: lower.includes("acme") ? "ACME COOPERATIVE INC." : "Unknown Vendor",
        invoiceDate: lower.includes("2026") ? "May 20, 2026" : "N/A",
        invoiceId: lower.includes("inv") ? "INV-77492" : "AUTOGEN_019",
        itemsMatched: [
          { item: "Server Racks", qty: 2, unitPrice: "$1200.00" },
          { item: "Router Node", qty: 1, unitPrice: "$450.00" }
        ],
        calculatedTotal: "$3135.00",
        originalTotalText: lower.includes("total") ? "Matched ($3135.0)" : "Extracted total of $3135.00"
      };
      setInvoiceResult(extracted);
      setInvoiceRunning(false);
    }, 1500);
  };

  // E-Commerce Dialogue Send Handler
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let responseText = "I search Nagaraju's catalog (RAG Vector DB matching) but couldn't locate specific matches. Nagaraju's developer gears include custom 'Orange Neural Hoodie' ($59.00) or 'Mechanical Blue Switches Keyboard' ($99.00)!";

      if (lowerMsg.includes("hoodie") || lowerMsg.includes("stock") || lowerMsg.includes("orange")) {
        responseText = "🔍 VECTOR MATCH [Similarity: 0.96]:\n\nYes! The signature 'Nagaraju Orange Neural Hoodie' is fully IN-STOCK. It is woven from 100% premium airproof heavy fleece cotton with a customized digital 'AI Agent' print on chest. Available sizes: S, M, L, XL, for $59.00! Would you like to select a size?";
      } else if (lowerMsg.includes("order") || lowerMsg.includes("1234") || lowerMsg.includes("track")) {
        responseText = "📦 SHIPMENT STATUS LOOKUP:\n\nOrder #1234 has been processed and is currently with the logistics carrier! It's tracking via n8n pipeline node [SHIP-ID: CY-9011]\n\nExpected delivery: June 2, 2026. Real-time updates have been routed to nagarajuporalla13@gmail.com!";
      } else if (lowerMsg.includes("recommend") || lowerMsg.includes("gear") || lowerMsg.includes("accessory")) {
        responseText = "🤖 AGENT RECOMMENDATION:\n\nBased on your profile as a technical engineer, I highly recommend checking out:\n1. The Mechanical Blue Switch Keyboard ($99.00) - provides responsive tactile tracking for rapid programming.\n2. The Neural Orange Canvas Hoodie ($59.00) - premium focus apparel with integrated high collar.";
      }

      setChatMessages(prev => [...prev, { sender: "bot", text: responseText }]);
    }, 1000);
  };

  return (
    <section id="projects" className="py-20 relative">
      {/* Subtle warm gradient behind cards */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#FFF8F2]/60 via-[#FFFAF6]/30 to-transparent pointer-events-none dark:from-[#1a1510]/20 dark:via-transparent" />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        
        {/* Header centered */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
            darkMode ? "text-gray-100" : "text-neutral-dark"
          }`}>
            Featured <span className="text-brand-orange">Projects</span>
          </h2>
          <p className={`text-sm sm:text-base ${
            darkMode ? "text-gray-400" : "text-neutral-muted"
          }`}>
            A showcase of AI-driven SaaS solutions, automated pipelines, and technical R&D.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => {
            const isResume = proj.iconType === "pipeline";
            const isInvoice = proj.iconType === "telegram";
            const isChatbot = proj.iconType === "chatbot";
            const isJobMatch = proj.iconType === "jobmatch";
            const isVoiceAI = proj.iconType === "voiceai";
            const isCTXR = proj.iconType === "ctxr";
            
            return (
              <div key={proj.id} className="h-full">
                <Tilt3D maxRotate={4} scale={1.005} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                    onClick={() => proj.demoType && setActiveDemo(activeDemo === proj.demoType ? null : proj.demoType)}
                    className={`p-6 rounded-[28px] border flex flex-col justify-between h-full transition-all duration-300 ${
                      proj.demoType ? "cursor-pointer" : ""
                    } ${
                      darkMode ? "bg-[#1C1C1E] border-neutral-800" : "bg-white border-[#EDEDED]"
                    } ${
                      activeDemo === proj.demoType
                        ? "border-brand-orange/60 shadow-[0_12px_30px_-4px_rgba(255,138,0,0.12)]"
                        : `shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_35px_-8px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 ${
                            darkMode ? "hover:border-neutral-700" : "hover:border-[#D8D8D8]"
                          }`
                    }`}
                  >
                    {/* Top Content Area */}
                    <div className="space-y-5">
                      {/* Premium gradient header icon box */}
                      <div className={`w-full aspect-[16/10] rounded-[20px] flex items-center justify-center relative overflow-hidden ${
                        isResume
                          ? darkMode ? "bg-gradient-to-br from-[#3D2517]/80 to-[#1A1D27]/80" : "bg-gradient-to-br from-[#FFF2EA] to-[#E9EDF5]"
                          : isInvoice
                            ? darkMode ? "bg-gradient-to-br from-[#1E2835]/80 to-[#211E2D]/80" : "bg-gradient-to-br from-[#EBF3FC] to-[#EEEDFA]"
                            : isChatbot
                              ? darkMode ? "bg-gradient-to-br from-[#1A2E26]/80 to-[#1E222C]/80" : "bg-gradient-to-br from-[#E9F6F0] to-[#EAEFF9]"
                              : isJobMatch
                                ? darkMode ? "bg-gradient-to-br from-[#2D1F3D]/80 to-[#1E1B2E]/80" : "bg-gradient-to-br from-[#F4EBFB] to-[#EAE5F8]"
                                : isVoiceAI
                                  ? darkMode ? "bg-gradient-to-br from-[#3D1A25]/80 to-[#291B24]/80" : "bg-gradient-to-br from-[#FDE8EF] to-[#F7E7F0]"
                                  : darkMode ? "bg-gradient-to-br from-[#3A2B15]/80 to-[#262118]/80" : "bg-gradient-to-br from-[#FEF7E8] to-[#F9EED9]"
                      }`}>
                        {isResume && <UserPlus className="w-[42px] h-[42px] text-[#E08A4E] dark:text-[#FFA87D]" strokeWidth={1.2} />}
                        {isInvoice && <Receipt className="w-[42px] h-[42px] text-[#6A94C2] dark:text-[#99BEFA]" strokeWidth={1.2} />}
                        {isChatbot && <MessageSquare className="w-[42px] h-[42px] text-[#68A78F] dark:text-[#82D9B7]" strokeWidth={1.2} />}
                        {isJobMatch && <Target className="w-[42px] h-[42px] text-[#A855F7] dark:text-[#C084FC]" strokeWidth={1.2} />}
                        {isVoiceAI && <Mic className="w-[42px] h-[42px] text-[#EC4899] dark:text-[#F472B6]" strokeWidth={1.2} />}
                        {isCTXR && <Zap className="w-[42px] h-[42px] text-[#EAB308] dark:text-[#FACC15]" strokeWidth={1.2} />}
                      </div>

                      {/* Text info & GitHub Link */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`text-[17px] font-bold tracking-tight leading-snug ${
                            darkMode ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
                          }`}>
                            {proj.title}
                          </h3>
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title="View GitHub Repository"
                              className={`p-1.5 rounded-full transition-colors ${
                                darkMode 
                                  ? "text-gray-400 hover:text-white hover:bg-neutral-800" 
                                  : "text-gray-500 hover:text-black hover:bg-gray-100"
                              }`}
                            >
                              <Github size={16} />
                            </a>
                          )}
                        </div>

                        <p className={`text-[13px] leading-relaxed ${
                          darkMode ? "text-gray-400" : "text-[#6B7280]"
                        }`}>
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Row - Tags */}
                    <div className="pt-5 flex flex-wrap gap-1.5">
                      {proj.tags.map((t, tIdx) => {
                        const isFirst = tIdx === 0;
                        return (
                          <span 
                            key={t} 
                            className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                              isFirst
                                ? `${darkMode ? "bg-brand-orange/15 text-brand-orange" : "bg-[#FFF4E7] text-[#FF8A00]"}`
                                : `${darkMode ? "bg-[#2A2A2D] text-[#A1A1AA]" : "bg-[#F4F4F5] text-[#71717A]"}`
                            }`}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>

                  </motion.div>
                </Tilt3D>
              </div>
            );
          })}
        </div>

        {/* Dynamic Sandbox Simulator Drawer view */}
        <AnimatePresence>
          {activeDemo && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`mt-12 p-8 rounded-3xl border shadow-xl relative animate-in fade-in zoom-in-95 duration-200 ${
                darkMode 
                  ? "bg-gray-950 border-gray-800 text-white" 
                  : "bg-white border-gray-100 text-neutral-dark shadow-xl"
              }`}
            >
              {/* Close Simulator */}
              <button
                onClick={() => setActiveDemo(null)}
                className="absolute top-4 right-4 text-xs font-bold py-1 px-3.5 rounded-full border border-gray-200 dark:border-gray-800 text-neutral-muted dark:text-gray-400 hover:text-brand-orange transition-colors cursor-pointer"
              >
                Close Sandbox &times;
              </button>

              {/* Displayed Simulator depending on category selection */}
              
              {/* 1. Resume Recruiter Pipeline Simulator */}
              {activeDemo === "resume" && (
                <div className="flex flex-col space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase">Live Interactive Simulator</span>
                    <h4 className="text-2xl font-extrabold tracking-tight">AI HR Recruitment Pipeline Sandbox</h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-neutral-muted"}`}>
                      Paste your CV below or edit this sample to test Nagaraju's customized recruitment qual scoring agent.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-bold text-neutral-muted">Raw Resume Content</label>
                      <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        className={`p-4 h-56 rounded-2xl border text-sm font-mono focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                          darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"
                        }`}
                      ></textarea>
                      <button
                        onClick={runResumePipeline}
                        disabled={resumeRunning}
                        className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-2xl bg-brand-orange text-white text-sm font-bold cursor-pointer hover:bg-brand-orange-hover active:scale-98 transition-all duration-200 disabled:opacity-50"
                      >
                        {resumeRunning ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Parsing with n8n workflow...</span>
                          </>
                        ) : (
                          <>
                            <Play size={14} />
                            <span>Run Recruiter Evaluation</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-col space-y-2 justify-center">
                      <span className="text-xs font-bold text-neutral-muted">Agent Output JSON</span>
                      <div className={`p-4 h-68 rounded-2xl border text-xs font-mono overflow-auto flex flex-col ${
                        resumeResult ? "" : "items-center justify-center"
                      } ${
                        darkMode ? "bg-gray-900 border-gray-800 text-teal-400" : "bg-gray-50 border-gray-100 text-emerald-800"
                      }`}>
                        {resumeResult ? (
                          <pre className="whitespace-pre-wrap">{JSON.stringify(resumeResult, null, 2)}</pre>
                        ) : (
                          <div className="text-center p-6 space-y-2">
                            <Bot className="mx-auto text-neutral-muted" size={32} />
                            <p className="text-sm font-sans text-neutral-muted">Click "Run Recruiter Evaluation" on the left to see structured LLM outputs.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Telegram OCR Invoice Parsing Agent */}
              {activeDemo === "invoice" && (
                <div className="flex flex-col space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase">Live Interactive Simulator</span>
                    <h4 className="text-2xl font-extrabold tracking-tight">Telegram OCR Invoice Agent</h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-neutral-muted"}`}>
                      Simulate uploading receipt text to the Telegram Agent to verify data matching.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-bold text-neutral-muted">Simulated Receipt / Bill Text</label>
                      <textarea
                        value={invoiceText}
                        onChange={(e) => setInvoiceText(e.target.value)}
                        className={`p-4 h-56 rounded-2xl border text-sm font-mono focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all ${
                          darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"
                        }`}
                      ></textarea>
                      <button
                        onClick={runInvoiceOCR}
                        disabled={invoiceRunning}
                        className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-2xl bg-brand-orange text-white text-sm font-bold cursor-pointer hover:bg-brand-orange-hover active:scale-98 transition-all duration-200 disabled:opacity-50"
                      >
                        {invoiceRunning ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Scanning Invoice Image OCR...</span>
                          </>
                        ) : (
                          <>
                            <Play size={14} />
                            <span>Scan Bill &amp; Structure Expenses</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-col space-y-2 justify-center">
                      <span className="text-xs font-bold text-neutral-muted">Agent Structured DB Record</span>
                      <div className={`p-4 h-68 rounded-2xl border text-xs font-mono overflow-auto flex flex-col ${
                        invoiceResult ? "" : "items-center justify-center"
                      } ${
                        darkMode ? "bg-gray-900 border-gray-800 text-sky-400" : "bg-gray-50 border-gray-100 text-sky-800"
                      }`}>
                        {invoiceResult ? (
                          <pre className="whitespace-pre-wrap">{JSON.stringify(invoiceResult, null, 2)}</pre>
                        ) : (
                          <div className="text-center p-6 space-y-2">
                            <Bot className="mx-auto text-neutral-muted" size={32} />
                            <p className="text-sm font-sans text-neutral-muted">Activate OCR scanning to parse bill credentials into JSON schemas.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Smart E-Commerce Chatbot Simulator */}
              {activeDemo === "ecommerce" && (
                <div className="flex flex-col space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase">Live Interactive Simulator</span>
                    <h4 className="text-2xl font-extrabold tracking-tight">Smart E-Commerce Chatbot Dialog</h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-neutral-muted"}`}>
                      Live RAG chat test! Type questions about Nagaraju's developer gear listings (e.g. "Is the orange hoodie in stock?").
                    </p>
                  </div>

                  {/* Simulated Telegram / Chat frame */}
                  <div className={`border rounded-2xl flex flex-col h-80 overflow-hidden ${
                    darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"
                  }`}>
                    {/* Chat Header */}
                    <div className="px-4 py-3 border-b flex items-center space-x-2 border-gray-100/10 bg-brand-orange-light">
                      <Bot className="text-brand-orange" size={16} />
                      <span className="text-xs font-extrabold text-brand-orange uppercase">Active Vector-RAG Dialogue Simulator</span>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3.5 custom-scrollbar">
                      {chatMessages.map((msg, mIdx) => (
                        <div
                          key={mIdx}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`p-3.5 max-w-[85%] rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                            msg.sender === "user"
                              ? "bg-brand-orange text-white rounded-tr-none"
                              : darkMode
                                ? "bg-gray-950 text-gray-300 border border-gray-800 rounded-tl-none"
                                : "bg-white text-neutral-dark border border-gray-100 rounded-tl-none"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input form */}
                    <div className="p-3 border-t border-gray-100/10 flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Type 'Is the orange hoodie in stock?' or check order #1234..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                        className={`flex-1 px-4 py-2 text-xs rounded-xl border focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange ${
                          darkMode ? "bg-gray-950 border-gray-800 text-white" : "bg-white border-gray-100 text-neutral-dark"
                        }`}
                      />
                      <button
                        onClick={sendChatMessage}
                        className="p-2.5 rounded-xl bg-brand-orange text-white hover:bg-brand-orange-hover duration-200 cursor-pointer"
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Projects central link */}
        <div className="text-center mt-12">
          <a
            href="#projects"
            className="inline-flex items-center space-x-1.5 text-sm font-extrabold text-brand-orange hover:text-brand-orange-hover group"
          >
            <span>View all projects</span>
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
