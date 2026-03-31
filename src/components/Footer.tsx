import Link from "next/link";
import { FaGithub, FaTwitter, FaEnvelope, FaRss } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold gradient-text">XWL Blog</span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              © {year}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 text-sm" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <Link href="/posts" className="hover:text-white transition-colors">文章</Link>
            <Link href="/about" className="hover:text-white transition-colors">关于</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            <a href="https://github.com/XuWL-debug" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaGithub size={16} />
            </a>
            <a href="mailto:xlod139@163.com" className="social-btn">
              <FaEnvelope size={16} />
            </a>
            <Link href="/rss" className="social-btn">
              <FaRss size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs" style={{ color: "var(--text-muted)" }}>
          Powered by{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            style={{ color: "rgba(160,165,255,0.9)" }}
          >
            Next.js
          </a>{" "}
          & Made with ❤️
        </div>
      </div>
    </footer>
  );
}
