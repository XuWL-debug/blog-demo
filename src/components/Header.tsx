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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
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

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              MyBlog
            </Link>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        isScrolled
          ? "bg-[var(--background)]/80 backdrop-blur-md border-[var(--border)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            MyBlog
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors"
              aria-label="搜索"
            >
              <Search size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors"
              aria-label="切换主题"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>

            {/* 用户状态 */}
            {!loading && (
              <>
                {user ? (
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 text-sm hover:text-[var(--primary)] transition-colors"
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center">
                          <User size={16} />
                        </div>
                      )}
                      <span>{user.username}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors text-[var(--muted)] hover:text-red-500"
                      aria-label="登出"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="hidden md:flex px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    登录
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="菜单"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[var(--border)] pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!loading && (
                user ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      {user.username}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={18} /> 退出登录
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-center hover:bg-[var(--primary-hover)] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    登录
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
