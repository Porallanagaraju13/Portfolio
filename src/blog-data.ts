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
    slug: "ai-system-design-from-idea-to-production",
    title: "AI System Design: From Idea to Production",
    date: "2026-08-06",
    readTime: "12 min read",
    tags: ["AI Systems", "RAG", "Production"],
    excerpt:
      "A practical framework for turning an AI idea into a reliable production system—with retrieval, evaluation, guardrails, human review, and observability.",
    coverEmoji: "🧠",
    coverGradient: "from-orange-500 via-amber-500 to-teal-500",
    content: `
<p class="blog-lead">An impressive model demo is not yet a production AI system. Production quality comes from the system around the model: clear goals, reliable data, retrieval, validation, human oversight, and a feedback loop that keeps improving the experience.</p>

<h2>Start with the business workflow, not the model</h2>
<p>“We need an LLM” and “we need RAG” are technology choices, not product requirements. Begin with the user’s workflow: what they need to accomplish, the information required, the mistakes that are unacceptable, the response-time target, and the cost budget.</p>
<p>A useful requirement is measurable: <strong>reduce claim review time from 20 minutes to under 5 minutes while escalating uncertain cases to a reviewer.</strong> That gives every design decision a target.</p>

<div class="blog-callout"><strong>Measure three things together.</strong> Business outcomes (time saved, completion, cost), AI quality (accuracy, faithfulness, retrieval quality), and operations (latency, availability, errors, token use).</div>

<h2>The production lifecycle</h2>
<p>The following workflow keeps the design grounded. Each stage answers a different engineering question, and monitoring feeds evidence back into the next iteration.</p>
<figure class="blog-infographic">
  <img src="/assets/ai-system-workflow.svg" alt="AI system workflow from business problem through requirements, data, architecture, evaluation, guardrails, production, monitoring and optimization, with a continuous-improvement loop." />
  <figcaption>Design the system as a loop, not as a one-time model selection.</figcaption>
</figure>

<h2>Choose the smallest useful level of autonomy</h2>
<p>AI can assist a human, react to a request, act proactively when an event occurs, or autonomously plan and use tools. More autonomy also creates more failure paths, so it should be a product decision—not a default technical preference.</p>
<p>My preferred progression is: <strong>prompt → RAG → deterministic workflow → tool calling → agent → multi-agent system.</strong> Move forward only when evaluation shows that the extra complexity solves a real problem.</p>

<h2>Build a data strategy before selecting a model</h2>
<p>Identify where the knowledge lives: documents, databases, APIs, tickets, images, logs, or live application data. The update rate matters. Static policies may be indexed periodically, while inventory, transactions, and schedules should usually be retrieved from a live source.</p>
<p>For document-heavy use cases, use an ingestion pipeline: extract text, clean it, chunk it, enrich chunks with metadata, generate embeddings, and store the result in a vector database. Metadata such as source, section, page, document type, and last-updated time makes filtering, citations, evaluation, and debugging substantially stronger.</p>

<h2>Retrieval should give the model evidence</h2>
<p>RAG retrieves the few relevant passages for a question and includes them in the prompt. It is more efficient and auditable than sending every document to the model. For enterprise search, hybrid retrieval is often stronger than vector search alone:</p>
<ul>
  <li><strong>Semantic search</strong> finds conceptually similar passages—even when wording differs.</li>
  <li><strong>Keyword search</strong> handles IDs, codes, acronyms, drug names, and exact legal terms.</li>
  <li><strong>Fusion + reranking</strong> combines fast candidates, then selects the most relevant context for the model.</li>
</ul>

<h2>A reference architecture for production</h2>
<p>The architecture below makes the LLM one component in a controlled system. Requests are authenticated, inspected before the model call, grounded with retrieval or tools, returned as structured data, and checked again before the application acts.</p>
<figure class="blog-infographic">
  <img src="/assets/ai-production-architecture.svg" alt="Production AI architecture showing client and API gateway flowing through authentication, input guardrails, workflow orchestration, retrieval, LLM and tools, structured output, output guardrails, confidence rules, application or human review, observability, evaluation and optimization." />
  <figcaption>Guardrails, human review, and observability are first-class parts of the architecture.</figcaption>
</figure>

<h2>Make outputs predictable and decisions reviewable</h2>
<p>Free-form prose is good for a person; software needs a contract. Return validated, structured data such as a decision, confidence score, reason, and evidence. The application can then route the result reliably.</p>
<pre><code>{
  "decision": "human_review",
  "confidence": 0.72,
  "reason": "Required clinical evidence is incomplete.",
  "evidence": ["clinical-guidelines.pdf#page=42"]
}</code></pre>
<p>Use confidence and deterministic rules to route high-confidence cases to the application, uncertain cases to a review queue, and risky cases to a specialist. Human decisions are not merely a fallback: they become valuable evaluation data for the next iteration.</p>

<h2>Evaluate before deployment, observe after it</h2>
<p>Build an evaluation dataset early. For each representative task, capture the question, expected outcome, expected sources, and relevant chunks. Measure retrieval independently (for example, recall@K and precision@K), then assess generation quality, faithfulness, citations, latency, cost, and end-to-end success.</p>
<p>After deployment, collect traces, logs, metrics, guardrail failures, empty retrievals, human escalations, overrides, and user feedback. A high human-override rate is a particularly clear signal that something is wrong, even if offline results looked good.</p>

<h2>Optimize only after the baseline works</h2>
<p>First prove the workflow and evaluation baseline. Then improve the dimension that matters: prompts, chunking, metadata, hybrid search, reranking, structured outputs, caching, batching, routing simple tasks to smaller models, retries, timeouts, and fallbacks.</p>

<h2>Final takeaway</h2>
<p>Good AI engineering is system thinking. Start with the business problem, build the simplest architecture that can solve it, evaluate before adding complexity, keep people in the loop when risk requires it, and improve with production evidence. That is how an AI idea becomes a reliable product.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
