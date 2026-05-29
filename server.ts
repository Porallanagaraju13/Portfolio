import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const PORT = 3000;

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI features will fallback to conversational presets.");
  }
} catch (err) {
  console.error("Failed to initialize GoogleGenAI client:", err);
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: isProduction ? "production" : "development" });
  });

  // Chat with Nagaraju's AI Agent
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected an array of chat items." });
    }

    const lastMessageObj = messages[messages.length - 1];
    const userPrompt = lastMessageObj?.content || lastMessageObj?.text || "";

    if (!userPrompt) {
      return res.status(400).json({ error: "Empty message text." });
    }

    // Prepare system instructions with all portfolio information for Nagaraju Poralla
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
- Achievements:
  * Earned Prompt Design in Vertex AI, Explore Generative AI with Vertex AI Gemini API, and Build Real World AI Apps with Gemini & Imagen – Google Cloud Skills Boost badges.
  * Completed Introduction to Generative AI (AWS Educate) and Journey to Cloud: Envisioning Your Solution (IBM SkillsBuild).
- Certifications & Internships:
  * Foundations of Artificial Intelligence Internship (Microsoft | Edunet Foundation | AICTE, 2025)
  * Web Developer– DNS Management & Server Deployment (TruPricer, 2025)
  * Technical Internship– JavaScript, AI Tools, Astro Framework (Prasanta Communications, 2024–2025)
  * Machine Learning Using Python Internship (YHills Edutech, 2024)
  * Programming in Python: Core Concepts (LearnTube by CareerNinja, 2024)
- Statistics: 2+ Years of hands-on experience, 10+ intelligent full-scale projects launched, 5+ professional certifications.
- Contact Info: Email: nagarajuporalla13@gmail.com, Phone: +91 9908425164, LinkedIn: https://www.linkedin.com/in/nagaraju-poralla-13aab2248/, GitHub: https://github.com/Porallanagaraju13

Technical Skillset:
- AI & ML: AI Agents, NLP, Supervised & Unsupervised Learning, Deep Learning, Generative AI.
- Languages: Java, JavaScript, Python, C, PHP.
- Web: HTML, CSS, WordPress.
- Databases: MySQL, PostgreSQL.
- Tools & Platforms: Git, GitHub, n8n, LLM, Hostinger, GoDaddy, Namecheap.
- Concepts: OOP, SDLC, Debugging, Problem Solving.

Key Projects Featured:
1. AI HR Recruitment Pipeline:
   - Stack: n8n, Gemini AI, Gmail, Google Sheets, Drive, Calendar.
   - Purpose: End-to-end automated recruitment: form intake → Gemini resume scoring → shortlist/reject → Drive CV upload → Calendar interview with Meet link → Gmail notifications.
2. Telegram Invoice Processing Agent:
   - Stack: n8n, Gemini Vision, Telegram Bot, JavaScript.
   - Purpose: Bot accepting invoice images/PDFs; uses Gemini Vision to extract line items, auto-generate pharmacy codes, map HSN & GST rates (CGST/SGST/IGST), and deliver structured CSV.
3. Smart E-Commerce Price Negotiation Chatbot:
   - Stack: Python, NLTK, scikit-learn, Tkinter.
   - Purpose: AI chatbot for intent recognition with tokenization/lemmatization on JSON training data with real-time dialogue management.
4. Underwater Image Enhancement with MSRAN:
   - Stack: Python, TensorFlow, CNN.
   - Purpose: Image restoration model using MSRAN with multi-scale feature extraction and attention mechanisms.

Guidelines for your responses:
- Tone: Extremely smart, conversational, helpful, confident, and professional. Avoid sounding robotic, dry, or over-the-top promotional.
- Speak in the FIRST PERSON on behalf of Nagaraju's portfolio ("As Nagaraju's AI Assistant, I can tell you...", "Nagaraju enjoys..."). Alternatively, you can speak as Nagaraju's personal assistant.
- Give concise answers. If a user asks about projects, draw detail from the featured projects list.
- Feel free to write code examples or explain AI concepts if the visitor asks tech questions.
- Maintain a high-quality conversation. If the Gemini API key is missing or calls fail, a fallback rules-engine will speak instead, but yours should always feel highly intelligent.
`;

    // Attempt to invoke Gemini API, with a clean mock fallback if key is missing or any error happens.
    if (ai) {
      try {
        // Construct the conversation history for Gemini. We map typical {role, content} to Gemini API structures
        // Gemini .generateContent supports simple prompts, or we can use chat or prompt lists.
        // Let's pass the context as a formatted prompt structure or chat messages.
        const chatParts: string[] = [];
        messages.slice(-6).forEach((msg: any) => {
          const roleLabel = msg.role === "user" ? "Visitor" : "Assistant";
          chatParts.push(`${roleLabel}: ${msg.content || msg.text}`);
        });
        chatParts.push("Assistant:");

        const fullPrompt = `The following is a conversation with a visitor checking Nagaraju's portfolio.\n\n` + 
          chatParts.join("\n") + `\n\nProvide the next intelligent message from Nagaraju's AI Assistant. Keep it reasonably concise and focused.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || "I'm here to assist you! Feel free to ask me anything about Nagaraju's experience and skill set.";
        return res.json({ text: reply });
      } catch (geminiError: any) {
        console.error("Gemini API call failed, using smart fallback:", geminiError);
        // Fall through to smart fallback
      }
    }

    // Intelligent preset responses fallback if API key is not present or calls fail
    const lowerPrompt = userPrompt.toLowerCase();
    let reply = "";

    if (lowerPrompt.includes("skill") || lowerPrompt.includes("language") || lowerPrompt.includes("tech")) {
      reply = "Nagaraju is highly proficient in Java, JavaScript, Python, C, and PHP. His core skills include AI Agents, NLP, Generative AI, n8n workflows, full-stack web development (HTML, CSS, WordPress), and databases like MySQL and PostgreSQL!";
    } else if (lowerPrompt.includes("experience") || lowerPrompt.includes("work") || lowerPrompt.includes("job") || lowerPrompt.includes("cypherbit")) {
      reply = "Nagaraju is working as a Founding Engineer @ Cypherbit Private Limited (August 2025 - Present) building AI Agent pipelines. Previously, he worked as a Web Developer Intern @ TruPricer and technical support @ Prasanta Communications and Bluestock Fintech!";
    } else if (lowerPrompt.includes("project") || lowerPrompt.includes("pipeline") || lowerPrompt.includes("telegram") || lowerPrompt.includes("bot")) {
      reply = "Nagaraju features several key projects: the AI HR Recruitment Pipeline (automated resume-parser with n8n), the Telegram Invoice Processing Agent (using Gemini Vision for line extraction and Indian HSN/GST mapping), the Smart E-Commerce Price Negotiation Chatbot, and Underwater Image Enhancement using MSRAN. Which one would you like to know more about?";
    } else if (lowerPrompt.includes("contact") || lowerPrompt.includes("hire") || lowerPrompt.includes("email") || lowerPrompt.includes("phone")) {
      reply = "You can easily reach Nagaraju via the contact form at the bottom of the page! Alternatively, his email is nagarajuporalla13@gmail.com, phone is +91 9908425164, and you can connect with him on GitHub (https://github.com/Porallanagaraju13) or LinkedIn (https://www.linkedin.com/in/nagaraju-poralla-13aab2248/)!";
    } else {
      reply = `Thank you for asking! As Nagaraju's portfolio assistant, I can tell you that he is a dedicated Founding Engineer specializing in creating intelligent autonomous AI agents, automated n8n pipelines, and modular full-stack solutions. What can I help you discover about him?`;
    }

    return res.json({ text: reply });
  });

  // Handle Vite Asset Serving & Routing
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting in ${isProduction ? "production" : "development"} mode on http://0.0.0.0:${PORT}`);
  });
}

startServer();
