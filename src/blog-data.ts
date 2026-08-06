export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  coverEmoji: string;
  coverGradient: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-ai-powered-portfolio",
    title: "Building an AI-Powered Portfolio with Gemini & React",
    date: "2026-07-28",
    readTime: "6 min read",
    tags: ["AI", "React", "Gemini"],
    excerpt:
      "How I integrated Google Gemini into my personal portfolio to create a conversational AI assistant that knows everything about my work.",
    coverEmoji: "🤖",
    coverGradient: "from-orange-500 to-rose-500",
    content: `
<h2>Why an AI Chatbot?</h2>
<p>Most developer portfolios are static — a list of projects, a skills table, a contact form. I wanted something that felt alive. So I integrated <strong>Google Gemini</strong> directly into my portfolio to create a conversational assistant that can answer questions about my experience, projects, and skills in real time.</p>

<h2>The Architecture</h2>
<p>The system has three layers:</p>
<ul>
  <li><strong>Frontend</strong> — A React 19 chat component built with Framer Motion animations and streaming message rendering.</li>
  <li><strong>Backend proxy</strong> — An Express.js server that forwards requests to the Gemini API, keeping my API key safe on the server side.</li>
  <li><strong>Context injection</strong> — A system prompt containing structured information about my projects, skills, and experience, which grounds Gemini in accurate, personal details.</li>
</ul>

<h2>Challenges I Solved</h2>
<p>The trickiest part was streaming. Gemini supports SSE (Server-Sent Events) for token-by-token streaming, which gives the AI a "typing" feel. Getting that to work seamlessly with React state — without flicker or double renders — took some careful use of <code>useRef</code> alongside <code>useState</code>.</p>

<h2>What I Learned</h2>
<p>Injecting well-structured context into a system prompt makes a massive difference. When I gave Gemini a plain paragraph about my work, answers were generic. When I switched to structured markdown with headers for each project, the quality jumped dramatically.</p>

<p>If you're building a personal AI assistant, spend 80% of your time on the system prompt — it's the highest-leverage investment you can make.</p>

<h2>Try It Yourself</h2>
<p>The chatbot is live on this very portfolio — click the bot icon in the bottom navigation bar and ask it anything about my work!</p>
`,
  },
  {
    slug: "react-19-features-deep-dive",
    title: "React 19 Features That Changed How I Write Components",
    date: "2026-06-15",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Frontend"],
    excerpt:
      "A practical look at React 19's new hooks, the Actions API, and how they simplify async state management patterns I used to solve with Redux.",
    coverEmoji: "⚛️",
    coverGradient: "from-cyan-500 to-blue-500",
    content: `
<h2>React 19 — A Genuine Step Forward</h2>
<p>After years of incremental updates, React 19 landed with features that genuinely changed how I structure components. Here are the three that matter most to me day-to-day.</p>

<h2>1. useActionState — Goodbye, Loading Booleans</h2>
<p>Before React 19, every form submission looked like this:</p>
<pre><code>const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

async function handleSubmit(e) {
  setLoading(true);
  try { await submit(data); } 
  catch (err) { setError(err.message); }
  finally { setLoading(false); }
}</code></pre>

<p>With <code>useActionState</code>, that collapses to:</p>
<pre><code>const [state, action, isPending] = useActionState(submitAction, initialState);</code></pre>

<p>The pending state, error handling, and optimistic updates are all handled by React. This eliminated an entire class of bugs from my forms.</p>

<h2>2. use() for Promises</h2>
<p>The new <code>use()</code> hook lets you read a Promise's resolved value inside a component, suspending rendering until it resolves. Combined with React's Suspense boundaries, data fetching has never been cleaner.</p>

<h2>3. Server Components (via frameworks)</h2>
<p>While not exclusive to React 19, the framework-level adoption of Server Components has matured significantly. Moving data-fetching logic to the server reduces client bundle size and eliminates loading spinners for initial renders.</p>

<h2>My Verdict</h2>
<p>React 19 doesn't reinvent the wheel — it removes the friction that accumulated over years of "workarounds." If you're still on React 17 or 18, upgrading is well worth the afternoon it takes.</p>
`,
  },
  {
    slug: "from-student-to-developer-journey",
    title: "From Student to Developer: Lessons From My First Year in Tech",
    date: "2026-05-02",
    readTime: "5 min read",
    tags: ["Career", "Learning", "Developer Life"],
    excerpt:
      "The honest, unfiltered story of what my first year as a professional developer actually looked like — the wins, the imposter syndrome, and the habits that helped.",
    coverEmoji: "🚀",
    coverGradient: "from-violet-500 to-purple-600",
    content: `
<h2>It Starts With Imposter Syndrome</h2>
<p>Nobody warns you that your first week as a professional developer involves staring at a massive codebase, understanding roughly 10% of it, and wondering how you ever got hired. That was me. And talking to other developers, it's almost everyone's experience.</p>

<p>The trick I found: <strong>don't try to understand everything at once</strong>. Pick one thread — one bug, one feature, one file — and pull on it. Understanding expands outward naturally from there.</p>

<h2>The Habits That Actually Helped</h2>
<ul>
  <li><strong>Read code every day.</strong> Not write — read. Other people's code is the fastest way to level up your vocabulary as a developer.</li>
  <li><strong>Ship something small every week.</strong> Big projects feel good to plan. Small, shipped features feel good to do. Build the habit of finishing.</li>
  <li><strong>Write about what you learn.</strong> The act of explaining a concept forces clarity in ways that just "knowing" it doesn't. (Hence this blog!)</li>
</ul>

<h2>The Myth of the Perfect Stack</h2>
<p>I spent months trying to pick the "best" framework, the "right" state management library, the "optimal" CSS approach. It was procrastination dressed up as research.</p>

<p>The best stack is the one you're currently building something with. Ship first, optimize later.</p>

<h2>Looking Forward</h2>
<p>A year in, I feel like I'm just getting started. The more I learn, the more I see how much there is to learn — and somehow that's more energizing than intimidating now. If you're early in your journey, hold on. It gets better.</p>
`,
  },
  {
    slug: "css-animations-without-libraries",
    title: "Stunning CSS Animations Without a Single Library",
    date: "2026-04-10",
    readTime: "7 min read",
    tags: ["CSS", "Frontend", "Design"],
    excerpt:
      "You don't need Framer Motion or GSAP for most animations. Here's how to create scroll-triggered, performant CSS animations that work in every browser.",
    coverEmoji: "✨",
    coverGradient: "from-emerald-400 to-teal-500",
    content: `
<h2>The Case for Native CSS Animations</h2>
<p>Animation libraries are great — but they come with bundle cost, API surface to learn, and sometimes a loss of control. For many common UI animations, native CSS with a sprinkle of JavaScript is all you need.</p>

<h2>Scroll-Triggered Animations with IntersectionObserver</h2>
<p>The pattern I use most often:</p>
<pre><code>/* CSS */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}</code></pre>

<pre><code>// JS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));</code></pre>

<p>This pattern costs zero bytes in JavaScript bundle (it's browser-native) and is GPU-accelerated because we're only animating <code>opacity</code> and <code>transform</code> — properties that don't trigger layout recalculation.</p>

<h2>Performance Rules to Live By</h2>
<ul>
  <li>Only animate <code>opacity</code> and <code>transform</code> — everything else forces repaints.</li>
  <li>Add <code>will-change: transform</code> sparingly, only on elements that animate repeatedly.</li>
  <li>Use <code>prefers-reduced-motion</code> to respect user accessibility settings.</li>
</ul>

<h2>When to Reach for a Library</h2>
<p>Use a library when you need: complex sequencing, physics-based spring animations, layout animations (animating between positions when items reorder), or gesture-driven interactions. For everything else, CSS has you covered.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
