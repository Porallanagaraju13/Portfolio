export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  iconType: "pipeline" | "telegram" | "chatbot" | "jobmatch" | "voiceai" | "ctxr";
  details: string;
  demoType?: "resume" | "invoice" | "ecommerce" | "jobmatch" | "voiceai" | "ctxr";
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  title: string;
  category: "ai" | "languages" | "databases" | "tools";
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  isLatest: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
}
