import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Search } from "lucide-react";
import { blogPosts, getAllTags } from "../blog-data";

interface BlogPageProps {
  darkMode: boolean;
}

export default function BlogPage({ darkMode }: BlogPageProps) {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const allTags = getAllTags();

  const filtered = blogPosts.filter((post) => {
    const matchTag = !activeTag || post.tags.includes(activeTag);
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? "bg-neutral-dark text-gray-100" : "bg-neutral-light text-neutral-dark"
      }`}
    >
      {/* Hero Banner */}
      <div
        className={`relative py-20 px-4 border-b overflow-hidden ${
          darkMode ? "border-gray-800 bg-gray-950" : "border-gray-100 bg-white"
        }`}
      >
        {/* Decorative blob */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-1.5 text-xs font-semibold mb-8 transition-colors duration-200 group ${
              darkMode
                ? "text-gray-400 hover:text-brand-orange"
                : "text-neutral-muted hover:text-brand-orange"
            }`}
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to Portfolio
          </button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-orange mb-3">
              <span className="w-5 h-[2px] bg-brand-orange inline-block rounded-full" />
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Thoughts &amp; Insights
            </h1>
            <p
              className={`text-base max-w-xl ${
                darkMode ? "text-gray-400" : "text-neutral-muted"
              }`}
            >
              Articles on web development, AI, career growth, and everything in between.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Controls: search + tags */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Search */}
          <div className={`relative flex-1 max-w-xs`}>
            <Search
              size={14}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search posts…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all duration-200 focus:border-brand-orange ${
                darkMode
                  ? "bg-gray-900 border-gray-800 text-gray-100 placeholder-gray-600 focus:bg-gray-900"
                  : "bg-white border-gray-200 text-neutral-dark placeholder-gray-400 focus:bg-white"
              }`}
            />
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                !activeTag
                  ? "bg-brand-orange text-white border-brand-orange"
                  : darkMode
                  ? "border-gray-700 text-gray-400 hover:border-brand-orange hover:text-brand-orange"
                  : "border-gray-200 text-gray-500 hover:border-brand-orange hover:text-brand-orange"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-brand-orange text-white border-brand-orange"
                    : darkMode
                    ? "border-gray-700 text-gray-400 hover:border-brand-orange hover:text-brand-orange"
                    : "border-gray-200 text-gray-500 hover:border-brand-orange hover:text-brand-orange"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Post Count */}
        <p
          className={`text-xs mb-6 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {filtered.length} post{filtered.length !== 1 ? "s" : ""}
          {activeTag ? ` tagged "${activeTag}"` : ""}
        </p>

        {/* Posts Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-20 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm font-semibold">No posts found</p>
            <p className="text-xs mt-1">Try a different search or tag filter.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className={`group flex flex-col rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  darkMode
                    ? "bg-gray-900/70 border-gray-800 hover:border-gray-700 hover:shadow-black/30"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-gray-200/60"
                }`}
              >
                {/* Cover */}
                <div
                  className={`h-36 flex items-center justify-center bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}
                >
                  <span className="text-5xl filter drop-shadow-lg">{post.coverEmoji}</span>
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange"
                      >
                        <Tag size={8} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-bold leading-snug group-hover:text-brand-orange transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    className={`text-xs leading-relaxed line-clamp-3 flex-1 ${
                      darkMode ? "text-gray-400" : "text-neutral-muted"
                    }`}
                  >
                    {post.excerpt}
                  </p>

                  {/* Meta + CTA row */}
                  <div className="flex items-center justify-between mt-1">
                    <div
                      className={`flex items-center gap-3 text-[11px] ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight
                      size={13}
                      className="text-brand-orange opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
