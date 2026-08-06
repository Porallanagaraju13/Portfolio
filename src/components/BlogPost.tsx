import { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getPostBySlug } from "../blog-data";

interface BlogPostProps {
  darkMode: boolean;
}

export default function BlogPost({ darkMode }: BlogPostProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug ?? "");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!post) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center font-sans ${
          darkMode ? "bg-neutral-dark text-gray-100" : "bg-neutral-light text-neutral-dark"
        }`}
      >
        <p className="text-5xl mb-4">📝</p>
        <h1 className="text-2xl font-extrabold mb-2">Post Not Found</h1>
        <p className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-neutral-muted"}`}>
          The article you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/blog")}
          className="px-5 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-bold hover:bg-brand-orange-hover transition-colors duration-200"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? "bg-neutral-dark text-gray-100" : "bg-neutral-light text-neutral-dark"
      }`}
    >
      {/* Hero */}
      <div
        className={`relative border-b overflow-hidden ${
          darkMode ? "border-gray-800 bg-gray-950" : "border-gray-100 bg-white"
        }`}
      >
        {/* Decorative gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        {/* Cover gradient bar */}
        <div className={`h-2 bg-gradient-to-r ${post.coverGradient}`} />

        <div className="max-w-3xl mx-auto px-4 py-12 relative z-10">
          {/* Back navigation */}
          <button
            onClick={() => navigate("/blog")}
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
            All Posts
          </button>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange"
              >
                <Tag size={8} />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4"
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`flex items-center gap-4 text-xs ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-current opacity-40" />
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
          </motion.div>

          {/* Cover emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={`mt-8 h-48 rounded-2xl flex items-center justify-center bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}
          >
            <span className="text-7xl filter drop-shadow-2xl">{post.coverEmoji}</span>
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`prose-blog ${darkMode ? "dark-prose" : "light-prose"}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom divider + nav */}
        <div
          className={`mt-16 pt-8 border-t flex items-center justify-between ${
            darkMode ? "border-gray-800" : "border-gray-100"
          }`}
        >
          <button
            onClick={() => navigate("/blog")}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group ${
              darkMode
                ? "text-gray-400 hover:text-brand-orange"
                : "text-neutral-muted hover:text-brand-orange"
            }`}
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to all posts
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-xl border border-brand-orange text-brand-orange text-xs font-bold hover:bg-brand-orange hover:text-white transition-all duration-200"
          >
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
