"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: null, loading: true, login: () => {}, logout: () => {} };
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查 cookie 或 localStorage 中的 token
    const checkAuth = async () => {
      try {
        // 优先从 cookie 读取（GitHub OAuth 登录用 cookie）
        const getCookie = (name: string) => {
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
          return match ? match[2] : null;
        };
        
        const cookieToken = getCookie('auth_token');
        const localToken = localStorage.getItem("auth_token");
        const token = cookieToken || localToken;
        
        // 如果 cookie 有 token 但 localStorage 没有，同步一下
        if (cookieToken && !localToken) {
          localStorage.setItem("auth_token", cookieToken);
        }
        
        const res = await fetch("/api/auth/session", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("auth_token", token);
    // 重新获取用户信息
    fetch("/api/auth/session", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => {});
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
