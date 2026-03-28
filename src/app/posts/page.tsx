import Link from "next/link";
import { Clock, Tag, User, Search } from "lucide-react";

// 模拟文章数据
const allPosts = [
  {
    id: 1,
    title: "Next.js 15 新特性完全解析",
    excerpt: "深入探索 Next.js 15 的最新功能，包括 Turbopack、Server Actions 优化等...",
    date: "2026-03-28",
    author: "博主",
    tags: ["Next.js", "React", "前端"],
    readTime: "8 分钟",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    category: "前端开发",
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
    category: "教程",
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
    category: "前端开发",
  },
  {
    id: 4,
    title: "React 19 新特性一览",
    excerpt: "React 19 带来了许多激动人心的新特性，让我们一探究竟...",
    date: "2026-03-15",
    author: "博主",
    tags: ["React", "前端"],
    readTime: "10 分钟",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    category: "前端开发",
  },
  {
    id: 5,
    title: "Vercel 部署最佳实践",
    excerpt: "如何优雅地在 Vercel 上部署你的 Next.js 应用...",
    date: "2026-03-10",
    author: "博主",
    tags: ["Vercel", "部署", "DevOps"],
    readTime: "7 分钟",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    category: "运维部署",
  },
  {
    id: 6,
    title: "Node.js 性能优化指南",
    excerpt: "深入理解 Node.js 性能瓶颈，学习实用的优化技巧...",
    date: "2026-03-05",
    author: "博主",
    tags: ["Node.js", "性能优化"],
    readTime: "15 分钟",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    category: "后端开发",
  },
];

const categories = ["全部", "前端开发", "后端开发", "运维部署", "教程"];

export default function PostsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">文章列表</h1>
        <p className="text-[var(--muted)]">探索我的技术文章和心得分享</p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />
          <input
            type="text"
            placeholder="搜索文章..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg transition-colors ${
                cat === "全部"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] hover:bg-[var(--primary)]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 文章网格 */}
      <div className="grid gap-8 md:grid-cols-2">
        {allPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-[var(--secondary)] rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] transition-all hover:shadow-lg"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[var(--primary)] text-white text-xs rounded-full">
                {post.category}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-3">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} /> {post.author}
                </span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex gap-2 flex-wrap">
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
            </div>
          </article>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-center gap-2 mt-12">
        <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg">1</button>
        <button className="px-4 py-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--primary)]/10 transition-colors">2</button>
        <button className="px-4 py-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--primary)]/10 transition-colors">3</button>
        <button className="px-4 py-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--primary)]/10 transition-colors">下一页</button>
      </div>
    </div>
  );
}
