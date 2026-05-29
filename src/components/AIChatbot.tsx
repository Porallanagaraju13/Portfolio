import { Bot, X, Send, Sparkles, MessageCircleCode } from "lucide-react";
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

  const [messages, setMessages] = useState<ChatMessage[]>( [
    {
      id: "init-1",
      sender: "assistant",
      text: "Hi there! I am Nagaraju's AI Portfolio Assistant. Ask me anything about his skills, experience at Cypherbit, automated pipelines, or anything else you would like to know!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Quick prompt suggestions
  const presetPrompts = [
    "What is his tech stack?",
    "Tell me about Cypherbit",
    "Describe the HR Pipeline project",
    "How do I reach him?"
  ];

  // Auto-scroll on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

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

    try {
      // Create message list payload to maintain context
      const chatHistory = messages.concat(userMsg).map(m => ({
        role: m.sender === "user" ? "user" : "model",
        content: m.text
      }));

      // Call Express server-side /api/chat route securely
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        throw new Error("Failed to contact agent server.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        text: data.text || "I was able to track your request, but our generative flow is reloading. Feel free to contact Nagaraju directly!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      // Fail gracefully: leverage intelligent fallback client-side
      const lower = textMsg.toLowerCase();
      let fallbackText = "I encountered a minor network glitch connecting to the Gemini server, but here is a quick summary: Nagaraju specializes in AI Agents and automation! Reach him at nagarajuporalla13@gmail.com.";
      
      if (lower.includes("skills") || lower.includes("tech") || lower.includes("languages")) {
        fallbackText = "Nagaraju is proficient in Java, JavaScript, Python, C, and PHP. His core skills include AI Agents, n8n workflows, full-stack web development (HTML, CSS, WordPress), and databases like MySQL and PostgreSQL.";
      } else if (lower.includes("cypherbit") || lower.includes("job") || lower.includes("experience")) {
        fallbackText = "Nagaraju is a Founding Engineer at Cypherbit Private Limited (August 2025 - Present) building AI Agent workflows. Previously, he worked as a Web Developer Intern at TruPricer and gained experience at Prasanta Communications and Bluestock Fintech.";
      } else if (lower.includes("project") || lower.includes("pipeline")) {
        fallbackText = "Nagaraju has 3 core projects: AI HR Recruiter Pipeline (n8n & LLMs), Telegram Invoice OCR Agent, and Smart E-Commerce Chatbot dialog systems.";
      } else if (lower.includes("contact") || lower.includes("reach") || lower.includes("hire")) {
        fallbackText = "Please write him a line using the Contact form, or drop an email directly at: nagarajuporalla13@gmail.com. He would love to work together!";
      }

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setSending(false);
    }
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
                    <Sparkles size={8} /> Active Agent via Gemini 3.5
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversational Screen Messages log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`p-3.5 max-w-[85%] rounded-2xl text-xs leading-relaxed leading-relaxed ${
                    m.sender === "user"
                      ? "bg-brand-orange text-white rounded-tr-none"
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

            {/* Quick Presets chips block (hidden when user is typing) */}
            {inputText.length === 0 && (
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

            {/* Actions Footer message bar input */}
            <div className="p-3 border-t border-gray-100/10 flex items-center space-x-2 bg-transparent">
              <input
                type="text"
                placeholder="Ask about Cypherbit, Python, CV..."
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

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
