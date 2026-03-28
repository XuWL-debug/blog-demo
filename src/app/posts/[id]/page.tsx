import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Eye, MessageCircle, Share2 } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const post = {
    title: "Next.js 15 新特性完全解析",
    date: "2026-03-28",
    author: "博主",
    readTime: "8 分钟",
    views: 1234,
    comments: 23,
    category: "前端开发",
    tags: ["Next.js", "React", "前端"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <Link
        href="/posts"
        className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8"
      >
        <ArrowLeft size={18} /> 返回文章列表
      </Link>

      {/* 文章头图 */}
      <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-8 relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* 文章标题 */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {/* 文章元信息 */}
      <div className="flex items-center gap-6 text-sm text-[var(--muted)] mb-8 pb-8 border-b border-[var(--border)]">
        <span className="flex items-center gap-1">
          <User size={16} /> {post.author}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={16} /> {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={16} /> {post.readTime}
        </span>
        <span className="flex items-center gap-1">
          <Eye size={16} /> {post.views} 阅读
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle size={16} /> {post.comments} 评论
        </span>
      </div>

      {/* 文章正文 */}
      <div className="prose">
        <h2>🚀 引言</h2>
        <p>
          Next.js 15 带来了许多令人兴奋的新特性，这次更新进一步巩固了它在全栈 React
          框架中的领先地位。本文将深入解析每个重要变化，帮助你快速上手。
        </p>

        <h2>⚡ Turbopack 正式成为默认</h2>
        <p>
          经过多年的开发，Turbopack 终于在 Next.js 15 中成为默认的开发服务器。
          它基于 Rust 构建，在大型项目中可以提供 <strong>10 倍以上的构建速度提升</strong>。
        </p>
        <pre><code>{`// next.config.ts
module.exports = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}`}</code></pre>

        <h2>🎯 Server Actions 增强</h2>
        <p>
          Server Actions 在 Next.js 15 中得到了显著增强，现在支持更好的错误处理、
          表单验证和乐观更新。
        </p>
        <blockquote>
          "Server Actions 是 React 和 Next.js 的未来，它让我们可以用更简单的方式处理数据变更。"
          — Next.js Team
        </blockquote>

        <h2>🎨 CSS 优化</h2>
        <p>
          新版本对 CSS 处理进行了深度优化，支持 CSS Layers、容器查询和更多现代 CSS 特性。
          结合 Tailwind CSS v4，开发体验更加流畅。
        </p>

        <h2>📦 部分预渲染 (PPR)</h2>
        <p>
          Partial Prerendering 是 Next.js 15 最具创新性的特性之一。
          它允许你将静态 shell 和动态内容结合，实现<strong>静态的性能 + 动态的灵活性</strong>。
        </p>

        <h2>📋 总结</h2>
        <p>Next.js 15 是一次重大升级，值得重点关注的新特性包括：</p>
        <ul>
          <li>Turbopack 成为默认开发服务器</li>
          <li>Server Actions 增强与表单处理改进</li>
          <li>部分预渲染 (PPR)</li>
          <li>CSS 优化与 Tailwind v4 支持</li>
          <li>缓存行为优化</li>
        </ul>
      </div>

      {/* 标签 */}
      <div className="mt-8 pt-8 border-t border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--muted)]">标签：</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[var(--secondary)] text-sm rounded-full border border-[var(--border)] hover:border-[var(--primary)] cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 分享按钮 */}
      <div className="mt-8 flex items-center gap-4">
        <span className="text-[var(--muted)]">分享：</span>
        <button className="p-2 bg-[var(--secondary)] rounded-lg hover:bg-blue-500 hover:text-white transition-colors">
          <FaTwitter size={18} />
        </button>
        <button className="p-2 bg-[var(--secondary)] rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
          <FaGithub size={18} />
        </button>
        <button className="p-2 bg-[var(--secondary)] rounded-lg hover:bg-green-500 hover:text-white transition-colors">
          <Share2 size={18} />
        </button>
      </div>

      {/* 评论区 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <MessageCircle size={24} /> 评论 ({post.comments})
        </h2>

        {/* 评论输入框 */}
        <div className="bg-[var(--secondary)] rounded-xl p-6 mb-8 border border-[var(--border)]">
          <textarea
            placeholder="写下你的评论...（需要登录）"
            className="w-full p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg resize-none h-24 focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-[var(--muted)]">
              支持 Markdown 语法
            </p>
            <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors">
              提交评论
            </button>
          </div>
        </div>

        {/* 模拟评论列表 */}
        <div className="space-y-6">
          {[
            {
              id: 1,
              author: "小明",
              avatar: "M",
              date: "2026-03-28 20:30",
              content: "写得很详细！Turbopack 的速度确实提升了很多，期待更多优化。",
              likes: 12,
              replies: 2,
            },
            {
              id: 2,
              author: "技术爱好者",
              avatar: "T",
              date: "2026-03-28 18:15",
              content:
                "PPR 这个特性真的很有意思，静态和动态的完美结合。不过还在实验阶段，生产环境使用要谨慎。",
              likes: 8,
              replies: 1,
            },
            {
              id: 3,
              author: "React开发者",
              avatar: "R",
              date: "2026-03-28 15:00",
              content:
                "Server Actions 的增强让我很兴奋，表单处理终于不用那么繁琐了。请问缓存行为优化具体指哪些方面？",
              likes: 5,
              replies: 0,
            },
          ].map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 p-4 bg-[var(--secondary)] rounded-xl border border-[var(--border)]"
            >
              <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-sm">{comment.author}</span>
                  <span className="text-xs text-[var(--muted)]">{comment.date}</span>
                </div>
                <p className="text-sm leading-relaxed">{comment.content}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[var(--muted)]">
                  <button className="hover:text-[var(--primary)] transition-colors">
                    👍 {comment.likes}
                  </button>
                  <button className="hover:text-[var(--primary)] transition-colors">
                    💬 回复 ({comment.replies})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
