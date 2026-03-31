"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Search, LogOut, User } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "首页" },
    { href: "/posts", label: "文章" },
    { href: "/about", label: "关于" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled
          ? "rgba(15, 15, 30, 0.85)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
      }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold gradient-text">
            XWL Blog
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-pill"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="social-btn" aria-label="搜索">
              <Search size={17} />
            </button>

            <a
              href="https://github.com/XuWL-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
            >
              <FaGithub size={17} />
            </a>

            {/* 用户状态 */}
            {mounted && !loading && (
              <>
                {user ? (
                  <div className="hidden md:flex items-center gap-2">
                    <Link href="/profile" className="flex items-center gap-2 nav-pill">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-6 h-6 rounded-full" />
                      ) : (
                        <User size={15} />
                      )}
                      <span className="text-sm">{user.username}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="social-btn"
                      aria-label="退出"
                      style={{ color: "rgba(255,100,100,0.8)" }}
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="hidden md:flex btn-primary text-sm py-2 px-5">
                    登录
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu */}
            <button
              className="md:hidden social-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden mt-4 p-4 rounded-2xl flex flex-col gap-2"
            style={{ background: "rgba(15,15,30,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-pill text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {mounted && !loading && (
              user ? (
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="nav-pill text-center"
                  style={{ color: "rgba(255,100,100,0.8)" }}
                >
                  退出登录
                </button>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登录
                </Link>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
