interface Env {
  GEMINI_API_KEY: string;
  ASSETS: {
    fetch: typeof fetch;
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Secure edge route for the chatbot
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body: any = await request.json();
        const messages = body.messages;

        if (!messages || !Array.isArray(messages)) {
          return new Response(
            JSON.stringify({ error: "Invalid messages format." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({
              text: "Nagaraju's AI Clone is active, but running in local fallback mode. Please contact him at nagarajuporalla13@gmail.com!"
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        }

        const lastMessage = messages[messages.length - 1];
        const userPrompt = lastMessage.content || lastMessage.text || "";

        if (!userPrompt.trim()) {
          return new Response(
            JSON.stringify({ error: "Empty prompt" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        // System instruction with factual resume details for Nagaraju Poralla
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
- Certifications:
  * Foundations of Artificial Intelligence Internship (Microsoft | Edunet Foundation | AICTE, 2025)
  * Web Developer– DNS Management & Server Deployment (TruPricer, 2025)
  * Technical Internship– JavaScript, AI Tools, Astro Framework (Prasanta Communications, 2024–2025)
  * Machine Learning Using Python Internship (YHills Edutech, 2024)
  * Programming in Python: Core Concepts (LearnTube by CareerNinja, 2024)
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
`;

        // Direct fetch call to the official Gemini REST API at the Edge
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: userPrompt }]
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

        const data: any = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am currently here to help you connect with Nagaraju Poralla!";

        return new Response(JSON.stringify({ text: replyText }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Default fallback to serving static files from build output
    return env.ASSETS.fetch(request);
  }
};
