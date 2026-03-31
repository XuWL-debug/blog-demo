"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, Tag, Eye, MessageCircle } from "lucide-react";
import { FaGithub, FaTwitter, FaEnvelope, FaRss } from "react-icons/fa";

const posts = [
  {
    id: 1,
    title: "Next.js 15 新特性完全解析",
    excerpt: "深入探索 Next.js 15 的最新功能，包括 Turbopack、Server Actions 优化等...",
    date: "2026-03-28",
    tags: ["Next.js", "React"],
    readTime: "8 分钟",
    views: 1234,
    comments: 23,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    category: "前端开发",
  },
  {
    id: 2,
    title: "从零开始搭建 TypeScript 项目",
    excerpt: "一份完整的 TypeScript 项目搭建指南，涵盖配置、工具链和最佳实践...",
    date: "2026-03-25",
    tags: ["TypeScript", "教程"],
    readTime: "12 分钟",
    views: 856,
    comments: 12,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    category: "教程",
  },
  {
    id: 3,
    title: "Tailwind CSS 高级技巧",
    excerpt: "掌握 Tailwind CSS 的高级用法，打造独特的设计系统...",
    date: "2026-03-20",
    tags: ["CSS", "Tailwind"],
    readTime: "6 分钟",
    views: 2341,
    comments: 31,
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800",
    category: "前端开发",
  },
];

const skills = [
  "Next.js", "React", "TypeScript", "Node.js",
  "Tailwind CSS", "Prisma", "PostgreSQL", "Docker",
  "Git", "Vercel",
];

const navItems = [
  { id: "about", label: "简介" },
  { id: "skills", label: "技能" },
  { id: "posts", label: "文章" },
  { id: "contact", label: "联系" },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("about");

  const scrollTo = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ===== 左侧边栏 ===== */}
        <aside className="w-full lg:w-72 flex flex-col gap-5 lg:sticky lg:top-24">

          {/* 头像卡片 */}
          <div className="flex flex-col items-center gap-4 fade-up">
            <div className="avatar-ring">
              <span className="text-5xl">👨‍💻</span>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">XWL_debug</h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                全栈开发者 · 技术博主
              </p>
            </div>
          </div>

          {/* 社交图标 */}
          <div className="flex justify-center gap-3 fade-up delay-1">
            <a href="https://github.com/XuWL-debug" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaGithub size={18} />
            </a>
            <a href="#" className="social-btn">
              <FaTwitter size={18} />
            </a>
            <a href="mailto:xlod139@163.com" className="social-btn">
              <FaEnvelope size={18} />
            </a>
            <Link href="/rss" className="social-btn">
              <FaRss size={18} />
            </Link>
          </div>

          {/* 导航 */}
          <div className="glass-card p-3 fade-up delay-2">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-pill text-left w-full ${activeNav === item.id ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 博客统计 */}
          <div className="glass-card p-5 fade-up delay-3">
            <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--text-muted)" }}>博客统计</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "文章", value: "6" },
                { label: "评论", value: "12" },
                { label: "访客", value: "3.2K" },
                { label: "标签", value: "8" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ===== 右侧主内容 ===== */}
        <main className="flex-1 flex flex-col gap-8 min-w-0">

          {/* 标题 */}
          <div className="fade-up">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="text-white">欢迎来到</span>{" "}
              <span className="gradient-text">XWL Blog</span>
            </h1>
            <p className="mt-3 text-lg" style={{ color: "var(--text-muted)" }}>
              Welcome to my personal blog · 分享技术，记录生活
            </p>
          </div>

          {/* 简介 */}
          <section id="about" className="fade-up delay-1">
            <h3 className="section-title">个人简介</h3>
            <div className="glass-card p-6">
              <p className="leading-relaxed" style={{ color: "var(--text-muted)", fontSize: "15px" }}>
                我是一名热爱技术的初中生，对前端开发、服务器运维和 Minecraft 充满热情。
                喜欢折腾各种有趣的技术项目，从搭建个人博客到配置 Minecraft 服务器，
                享受从零到一的创造过程。如果你有有趣的想法或合作机会，欢迎联系我！
              </p>
              <div className="glass-divider" />
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
                <span>📍 中国</span>
                <span>🎓 初三在读</span>
                <span>💻 全栈开发爱好者</span>
                <span>🎮 Minecraft 玩家</span>
              </div>
            </div>
          </section>

          {/* 技能 */}
          <section id="skills" className="fade-up delay-2">
            <h3 className="section-title">技能</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>

          {/* 最新文章 */}
          <section id="posts" className="fade-up delay-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title mb-0">最新文章</h3>
              <Link
                href="/posts"
                className="flex items-center gap-1 text-sm transition-colors"
                style={{ color: "rgba(160,165,255,0.8)" }}
              >
                查看全部 <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <article className="post-card h-full">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="post-card-cover"
                      />
                      <span
                        className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full"
                        style={{ background: "rgba(99,102,241,0.8)", color: "#fff" }}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="post-card-body">
                      <h4 className="post-card-title">{post.title}</h4>
                      <p className="post-card-excerpt">{post.excerpt}</p>
                      <div className="glass-divider" style={{ margin: "12px 0" }} />
                      <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye size={12} /> {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle size={12} /> {post.comments}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* 联系方式 */}
          <section id="contact" className="fade-up delay-4">
            <h3 className="section-title">联系我</h3>
            <div className="glass-card p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 联系信息 */}
                <div>
                  <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--text-muted)" }}>联系方式</h4>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: "📧", label: "邮箱", value: "xlod139@163.com" },
                      { icon: "🐙", label: "GitHub", value: "XuWL-debug" },
                      { icon: "🌐", label: "博客", value: "nihoniumblog.netlify.app" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-3 rounded-xl text-sm"
                        style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <span>{item.icon}</span>
                        <span style={{ color: "var(--text-muted)" }}>{item.label}：</span>
                        <span style={{ color: "var(--text)" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 留言表单 */}
                <div>
                  <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--text-muted)" }}>给我留言</h4>
                  <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="你的称呼"
                      className="glass-input"
                    />
                    <input
                      type="email"
                      placeholder="你的邮箱（用于回复）"
                      className="glass-input"
                    />
                    <textarea
                      placeholder="写下你想说的话..."
                      rows={3}
                      className="glass-input resize-none"
                    />
                    <button type="submit" className="btn-primary self-start">
                      发送留言
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
