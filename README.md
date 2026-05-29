# 🚀 Nagaraju Poralla | Personal AI Agent Portfolio

Welcome to the official repository for the **Nagaraju Poralla Personal AI Portfolio**. This is a state-of-the-art, high-fidelity developer portfolio designed to showcase premium web aesthetics, responsive layouts, interactive 3D elements, and real-time AI Agent orchestration.

Designed with a sleek, HSL-tailored visual design system featuring vibrant orange and teal gradients, glassmorphism, dynamic parallax scrolling, and an interactive **Gemini 3.5-powered AI Chatbot Clone** that speaks intelligently on Nagaraju's behalf.

---

## 🌟 Key Features

* **💎 Bespoke Glowing Brand Logo:** Custom abstract double-hexagon vector branding wrapping the `NP` tech emblem with responsive SVG gradients, set up uniformly as the site's header, footer, and tab favicon.
* **⚡ Bounded Parallax Scrolling:** Buttery-smooth, container-relative scroll parallax utilizing Framer Motion CSS transforms on the career illustration that glides dynamically through the timeline all the way to the final Bluestock Fintech item.
* **🤖 Active Gemini 3.5 AI Clone:** Fully interactive floating chat widget powered by Google's **Gemini 3.5** models. Includes robust client and server fallback logic configured with Nagaraju's full-scale bio, projects, and contact rules.
* **🛠️ Dynamic Timeline Tab Switcher:** Responsive pill-selector centered on-screen to toggle seamlessly between **Experience** and **Education & Certs** with 50/50 flex space auto-fitting on mobile.
* **🎮 Interactive Project Sandboxes:** Fully playable playground blocks for the core projects:
  * **AI HR Recruitment Pipeline:** Simulated resume qual-scoring n8n pipeline parser.
  * **Telegram Invoice Agent:** Vision-based line extraction, dosage-code generation, and Indian HSN/GST calculation parser.
  * **Smart E-Commerce Chatbot:** Live contextual RAG dialogue and shipment lookup simulator.

---

## 🛠️ Tech Stack & Architecture

* **Core UI & Logic:** React 19, TypeScript, HTML5 Semantic Layouts.
* **Styling & Animations:** TailwindCSS v4, Vanilla CSS tokens, Framer Motion (`motion/react`), Lucide React icons.
* **Interactivity:** Custom 3D Tilt components powered by Vector math.
* **Backend API & Server:** Express (Node), `@google/genai` (Google GenAI SDK), TSX runner.
* **Tooling:** Vite, Esbuild, TSConfig.

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone & Open the Repository
```bash
git clone https://github.com/Porallanagaraju13/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
Install all package dependencies via `npm`:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory (you can copy from `.env.example`):
```bash
cp .env.example .env
```
Inside your `.env` file, configure your **Gemini API Key**:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3000
```
*Note: If `GEMINI_API_KEY` is not provided, the portfolio chatbot will gracefully fall back to highly intelligent, pre-programmed client-side and server-side rule presets.*

### 4. Run the Development Server
Launch the development server running Express and Vite:
```bash
npm run dev
```
Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)** to view your portfolio running locally!

---

## 📦 Build & Production Deployment

To compile the production-ready static assets and bundle the server:
```bash
npm run build
```
To spin up the production server listening on port 3000:
```bash
npm run start
```

---

## 📂 Project Structure

```text
├── assets/                  # High-fidelity PNG & SVG illustration assets
├── src/
│   ├── components/          # React structural UI blocks
│   │   ├── AIChatbot.tsx    # Floating Gemini 3.5 Chatbot widget
│   │   ├── Experience.tsx   # Responsive timeline and parallax graphics
│   │   ├── Hero.tsx         # Hero introduction and CV exporter
│   │   ├── Skills.tsx       # Responsive grouped technical skills matrix
│   │   ├── Projects.tsx     # Project listings and playable sandbox simulators
│   │   └── Navbar.tsx       # Clean branded header navigation
│   ├── App.tsx              # Core app router & global dark theme toggles
│   ├── main.tsx             # React DOM renderer entry
│   └── types.ts             # Global TypeScript interface specs
├── server.ts                # Express backend routing & Gemini API SDK proxies
├── index.html               # Document template & embedded brand favicon
├── package.json             # Build script tasks and npm package declarations
└── tsconfig.json            # Strict compiler configurations
```

---

## 📞 Contact Nagaraju Poralla

* **Email:** [nagarajuporalla13@gmail.com](mailto:nagarajuporalla13@gmail.com)
* **Phone:** +91 9908425164
* **LinkedIn:** [linkedin.com/in/nagaraju-poralla-13aab2248](https://www.linkedin.com/in/nagaraju-poralla-13aab2248/)
* **GitHub:** [github.com/Porallanagaraju13](https://github.com/Porallanagaraju13)
