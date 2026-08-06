import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "../blog-data";

interface BlogSectionProps {
  darkMode: boolean;
}

export default function BlogSection({ darkMode }: BlogSectionProps) {
  const navigate = useNavigate();
  const latest = blogPosts.slice(0, 3);

  return (
    <section
      id="blog"
      className={`py-20 px-4 md:px-8 ${
        darkMode ? "text-gray-100" : "text-neutral-dark"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-orange mb-3">
                <span className="w-5 h-[2px] bg-brand-orange inline-block rounded-full" />
                From the Blog
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Thoughts &amp; Insights
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`mt-2 text-sm md:text-base max-w-lg ${
                darkMode ? "text-gray-400" : "text-neutral-muted"
              }`}
            >
              A practical guide to designing reliable AI systems for production.
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-sm font-bold text-brand-orange hover:gap-3 transition-all duration-200 shrink-0 group"
          >
            All Posts
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
                <h3 className="text-base font-bold leading-snug group-hover:text-brand-orange transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  className={`text-xs leading-relaxed line-clamp-3 flex-1 ${
                    darkMode ? "text-gray-400" : "text-neutral-muted"
                  }`}
                >
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div
                  className={`flex items-center gap-3 text-[11px] mt-1 ${
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
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-orange text-brand-orange text-sm font-bold hover:bg-brand-orange hover:text-white transition-all duration-200 group"
          >
            View All Posts
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
