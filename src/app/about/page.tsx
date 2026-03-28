import Link from "next/link";
import { MessageCircle, Mail, MapPin, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 个人简介 */}
      <div className="text-center mb-16">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-5xl">👨‍💻</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">你好，我是博主</h1>
        <p className="text-xl text-[var(--muted)] mb-6">
          全栈开发者 / 技术博主 / 开源爱好者
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--primary)] transition-colors"
          >
            <FaGithub size={18} /> GitHub
          </a>
          <a
            href="mailto:blog@example.com"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--primary)] transition-colors"
          >
            <Mail size={18} /> 联系我
          </a>
        </div>
      </div>

      {/* 关于内容 */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-[var(--secondary)] rounded-xl p-6 border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
              <Code2 size={20} className="text-[var(--primary)]" />
            </div>
            <h3 className="font-bold text-lg">技术栈</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[var(--secondary)] rounded-xl p-6 border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-[var(--primary)]" />
            </div>
            <h3 className="font-bold text-lg">个人信息</h3>
          </div>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>📍 中国 · 某某城市</li>
            <li>💼 全栈开发工程师</li>
            <li>🎓 某某大学 · 计算机科学</li>
            <li>☕ 热爱咖啡与代码</li>
          </ul>
        </div>
      </div>

      {/* 博客统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: "文章数", value: "42" },
          { label: "评论数", value: "128" },
          { label: "访客数", value: "12.5K" },
          { label: "开源项目", value: "8" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-6 bg-[var(--secondary)] rounded-xl border border-[var(--border)]">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">{stat.value}</div>
            <div className="text-sm text-[var(--muted)]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 关于这个博客 */}
      <div className="prose">
        <h2>关于这个博客</h2>
        <p>
          这个博客使用 <strong>Next.js 15</strong> 构建，采用 <strong>SSG/SSR 混合渲染</strong> 策略，
          确保高性能和优秀的 SEO 表现。
        </p>
        <p>
          博客功能包括：文章管理、评论系统（支持 GitHub 登录）、深色模式、RSS 订阅、
          全文搜索等。数据存储使用 PostgreSQL，部署在 Vercel 上。
        </p>
        <p>
          如果你喜欢我的文章，欢迎在 GitHub 上给我一个 ⭐ Star！
        </p>
        <h2>联系我</h2>
        <p>
          如果你有什么问题或者合作意向，欢迎通过以下方式联系我：
        </p>
        <ul>
          <li>📧 邮箱：blog@example.com</li>
          <li>🐙 GitHub：@example</li>
          <li>🐦 Twitter：@example</li>
        </ul>
      </div>
    </div>
  );
}
