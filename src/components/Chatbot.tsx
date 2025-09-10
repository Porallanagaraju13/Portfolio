import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Sparkles,
  Code,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply';
}

interface QuickReply {
  text: string;
  action: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Nagaraju's AI assistant. I can help you learn more about his skills, projects, experience, and how to get in touch. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'quick_reply'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY as string | undefined;

  const quickReplies: QuickReply[] = [
    { text: "Tell me about your skills", action: "skills" },
    { text: "Show me your projects", action: "projects" },
    { text: "What's your experience?", action: "experience" },
    { text: "How can I contact you?", action: "contact" },
    { text: "Download your CV", action: "cv" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) {
      // trigger entrance transition
      requestAnimationFrame(() => setPanelVisible(true));
    } else {
      setPanelVisible(false);
    }
  }, [isOpen]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Skills related
    if (message.includes('skill') || message.includes('technology') || message.includes('programming')) {
      return "Nagaraju is skilled in multiple programming languages including Python, JavaScript, Java, C, and PHP. He specializes in AI/ML technologies like TensorFlow, scikit-learn, NLTK, and has experience with web development using React, HTML, CSS, and WordPress. He's also proficient in database management with MySQL and design tools like Figma and Canva.";
    }
    
    // Projects related
    if (message.includes('project') || message.includes('work') || message.includes('build')) {
      return "Nagaraju has built several impressive projects including: 1) Smart E-Commerce Price Negotiation Chatbot using Python and NLP, 2) Underwater Image Enhancement with MSRAN using TensorFlow, 3) AI Spam Classifier with Streamlit interface, 4) Movie Recommendation System using collaborative filtering, and 5) Informative Website with WordPress. Each project showcases his expertise in AI/ML and web development.";
    }
    
    // Experience related
    if (message.includes('experience') || message.includes('intern') || message.includes('work')) {
      return "Nagaraju is currently working as a Web Developer Intern at TruPricer (Feb 2025 - Aug 2025) where he manages domains, handles DNS records, SSL integration, and builds SEO-friendly websites. He's also a Computer Science Engineering student at Siddhartha Institute Of Engineering and Technology with a CGPA of 7.33, graduating in July 2025.";
    }
    
    // Contact related
    if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
      return "You can reach Nagaraju through: 📧 Email: nagarajuporalla13@gmail.com, 🐙 GitHub: github.com/Nagaraju13, 💼 LinkedIn: linkedin.com/in/nagarajuporalla, 📍 Location: Hyderabad, Telangana, India. He's available for internship opportunities, freelance projects, and collaborative work in AI/ML and web development.";
    }
    
    // CV related
    if (message.includes('cv') || message.includes('resume') || message.includes('download')) {
      return "You can download Nagaraju's CV by clicking the 'Download CV' button in the navigation bar or the 'Download CV' button in the hero section. The CV contains his complete professional information, projects, certifications, and contact details.";
    }
    
    // Education related
    if (message.includes('education') || message.includes('degree') || message.includes('college')) {
      return "Nagaraju is pursuing a Bachelor of Technology in Computer Science and Engineering from Siddhartha Institute Of Engineering and Technology (June 2021 - July 2025) with a CGPA of 7.33. He completed his Intermediate Public Examination from Krishnaveni Junior College with 900 marks.";
    }
    
    // Certifications related
    if (message.includes('certification') || message.includes('certificate') || message.includes('badge')) {
      return "Nagaraju has earned 6 professional certifications including Python Programming, Machine Learning internships, Technical Intern roles, and Web Development experience. He also has 5 skill badges from Google Cloud, AWS, and IBM covering AI, Generative AI, and Cloud technologies.";
    }
    
    // AI/ML related
    if (message.includes('ai') || message.includes('machine learning') || message.includes('ml')) {
      return "Nagaraju is passionate about AI/ML and has hands-on experience with supervised learning, deep learning, NLP, TensorFlow, and computer vision. His projects include chatbots, image enhancement, spam classification, and recommendation systems. He's currently exploring generative AI and cloud technologies.";
    }
    
    // Default responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you learn more about Nagaraju Poralla. You can ask me about his skills, projects, experience, education, certifications, or how to contact him. What interests you most?";
    }
    
    if (message.includes('help')) {
      return "I can help you with information about Nagaraju's: 🔧 Technical Skills & Technologies, 💼 Professional Experience & Education, 🚀 Projects & Achievements, 📧 Contact Information, 📄 CV Download, 🎓 Certifications & Badges. Just ask me anything!";
    }
    
    // Fallback response
    return "That's an interesting question! While I have extensive information about Nagaraju's technical skills, projects, experience, and background, I might not have specific details about that. Feel free to ask me about his programming skills, AI/ML projects, web development experience, or how to get in touch with him!";
  };

  const generateAiResponse = async (userMessage: string): Promise<string | null> => {
    try {
      if (!apiKey) return null;
      const systemPrompt = `You are an AI assistant for a personal developer portfolio. Answer concisely (max ~120 words), friendly and professional. If asked about the portfolio owner, use the following verified facts:

Name: Nagaraju Poralla
Title: Fullstack Developer & AI/ML Enthusiast
Location: Hyderabad, Telangana, India
Contact: Email nagarajuporalla13@gmail.com, GitHub github.com/Nagaraju13, LinkedIn linkedin.com/in/nagarajuporalla
Education: B.Tech CSE (2021–2025), Siddhartha Institute Of Engineering and Technology, CGPA 7.33
Experience: Web Developer Intern at TruPricer (Feb 2025 – Aug 2025)
Skills: Python, JavaScript, Java, C, PHP, React, HTML/CSS, MySQL, WordPress, Git, Figma, Canva; AI/ML (TensorFlow, scikit-learn, NLTK, CV, NLP, DL)
Projects: Price Negotiation Chatbot (NLP), Underwater Image Enhancement (MSRAN), AI Spam Classifier, Movie Recommendation System, Informative Website
Certifications: Multiple in Python, ML, Web Dev; skill badges from Google Cloud, AWS, IBM

If asked to download CV, direct them: use the Download CV button (opens /Nagaraju_Poralla_CV.html). If asked something unrelated, answer helpfully like ChatGPT but avoid hallucinating about private data.`;

      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7
        })
      });

      if (!resp.ok) return null;
      const data = await resp.json();
      const text = data?.choices?.[0]?.message?.content?.trim();
      return text || null;
    } catch {
      return null;
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    let reply: string | null = null;
    if (apiKey) {
      reply = await generateAiResponse(text);
    }
    if (!reply) {
      // fallback to rule-based
      reply = generateBotResponse(text);
      // small delay to feel natural
      await new Promise(r => setTimeout(r, 600 + Math.random() * 600));
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: reply,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuickReply = (action: string) => {
    let message = '';
    switch (action) {
      case 'skills':
        message = 'Tell me about your technical skills';
        break;
      case 'projects':
        message = 'Show me your projects';
        break;
      case 'experience':
        message = 'What is your work experience?';
        break;
      case 'contact':
        message = 'How can I contact you?';
        break;
      case 'cv':
        message = 'I want to download your CV';
        break;
      default:
        message = action;
    }
    handleSendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          data-chatbot-trigger
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Open chat assistant"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-80 bg-card border border-border shadow-xl transform transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-96'
        } ${panelVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Nagaraju's Assistant</h3>
              <p className="text-xs text-muted-foreground">AI-Powered Help</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-64">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    <div className={`rounded-lg px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-colors text-xs"
                        onClick={() => handleQuickReply(reply.action)}
                      >
                        {reply.text}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Nagaraju..."
                  className="flex-1 bg-secondary border-border focus:border-primary"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Chatbot;
