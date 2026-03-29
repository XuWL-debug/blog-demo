"use client";

import { useState } from "react";
import { Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email: formData.email, password: formData.password }
            : formData
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "操作失败");
        return;
      }

      // 保存 token 到 localStorage
      localStorage.setItem("auth_token", data.token);
      
      // 跳转首页
      window.location.href = "/";
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = "/api/auth/github";
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {isLogin ? "欢迎回来" : "创建账号"}
          </h1>
          <p className="text-[var(--muted)] mt-2">
            {isLogin ? "登录你的账号继续" : "注册一个新账号开始"}
          </p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* 第三方登录 */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGitHubLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--foreground)] transition-colors font-medium"
          >
            <FaGithub size={20} /> 使用 GitHub 登录
          </button>
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--foreground)] transition-colors font-medium opacity-50 cursor-not-allowed">
            <FaGoogle size={20} /> 使用 Google 登录（暂未开放）
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--foreground)] transition-colors font-medium"
          >
            <Mail size={20} /> 邮箱密码登录
          </button>
        </div>

        {/* 分隔线 */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[var(--background)] text-[var(--muted)]">或者</span>
          </div>
        </div>

        {/* 表单 */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">用户名</label>
              <input
                type="text"
                placeholder="请输入用户名"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">邮箱</label>
            <input
              type="email"
              placeholder="请输入邮箱"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">密码</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="请输入密码"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                记住我
              </label>
              <a href="#" className="text-[var(--primary)] hover:underline">
                忘记密码？
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "处理中..." : isLogin ? "登录" : "注册"}{" "}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* 切换登录/注册 */}
        <p className="text-center mt-6 text-sm text-[var(--muted)]">
          {isLogin ? "还没有账号？" : "已有账号？"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[var(--primary)] hover:underline ml-1 font-medium"
          >
            {isLogin ? "立即注册" : "去登录"}
          </button>
        </p>
      </div>
    </div>
  );
}
