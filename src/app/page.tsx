import Link from "next/link";
import { ArrowRight, Clock, Tag, User } from "lucide-react";

// 模拟文章数据
const posts = [
  {
    id: 1,
    title: "Next.js 15 新特性完全解析",
    excerpt: "深入探索 Next.js 15 的最新功能，包括 Turbopack、Server Actions 优化等...",
    date: "2026-03-28",
    author: "博主",
    tags: ["Next.js", "React", "前端"],
    readTime: "8 分钟",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
  },
  {
    id: 2,
    title: "从零开始搭建 TypeScript 项目",
    excerpt: "一份完整的 TypeScript 项目搭建指南，涵盖配置、工具链和最佳实践...",
    date: "2026-03-25",
    author: "博主",
    tags: ["TypeScript", "教程"],
    readTime: "12 分钟",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
  },
  {
    id: 3,
    title: "Tailwind CSS 高级技巧",
    excerpt: "掌握 Tailwind CSS 的高级用法，打造独特的设计系统...",
    date: "2026-03-20",
    author: "博主",
    tags: ["CSS", "Tailwind", "设计"],
    readTime: "6 分钟",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero 区域 */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          欢迎来到我的博客
        </h1>
        <p className="text-xl text-[var(--muted)] mb-8">
          分享技术、记录生活、探索未知
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/posts"
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2"
          >
            浏览文章 <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-[var(--border)] rounded-lg font-medium hover:bg-[var(--secondary)] transition-colors"
          >
            关于我
          </Link>
        </div>
      </section>

      {/* 精选文章 */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link
            href="/posts"
            className="text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-[var(--secondary)] rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} /> {post.author}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full"
                      >
                        <Tag size={12} className="inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--muted)]">
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 功能展示 */}
      <section className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚡</span>
          </div>
          <h3 className="font-bold mb-2">极速加载</h3>
          <p className="text-sm text-[var(--muted)]">
            SSG/SSR 混合渲染，首屏毫秒级加载
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
            <span className="text-3xl">🎨</span>
          </div>
          <h3 className="font-bold mb-2">精美设计</h3>
          <p className="text-sm text-[var(--muted)]">
            现代化 UI，深色模式支持
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
            <span className="text-3xl">💬</span>
          </div>
          <h3 className="font-bold mb-2">互动评论</h3>
          <p className="text-sm text-[var(--muted)]">
            支持 GitHub、微信等第三方登录评论
          </p>
        </div>
      </section>
    </div>
  );
}
