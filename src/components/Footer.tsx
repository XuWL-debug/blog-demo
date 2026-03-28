import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaTwitter, FaRss } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--secondary)]/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 品牌 */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              MyBlog
            </Link>
            <p className="mt-4 text-[var(--muted)] text-sm max-w-md">
              一个高性能、高颜值的个人博客，专注于技术分享和生活记录。
              使用 Next.js 15 + TypeScript + Tailwind CSS 构建。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-bold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-[var(--foreground)] transition-colors">
                  文章
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
                  关于
                </Link>
              </li>
              <li>
                <Link href="/rss" className="hover:text-[var(--foreground)] transition-colors">
                  RSS 订阅
                </Link>
              </li>
            </ul>
          </div>

          {/* 社交媒体 */}
          <div>
            <h4 className="font-bold mb-4">关注我</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="mailto:blog@example.com"
                className="p-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <Link
                href="/rss"
                className="p-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
                aria-label="RSS"
              >
                <FaRss size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted)]">
          <p>© {currentYear} MyBlog. All rights reserved.</p>
          <p className="mt-2">
            Powered by{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline"
            >
              Next.js
            </a>{" "}
            & Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
