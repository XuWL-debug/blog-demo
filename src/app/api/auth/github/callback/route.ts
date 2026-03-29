import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
} from "@/lib/github-oauth";

interface GitHubUser {
  id: number;
  login: string;
  email: string | null;
  name: string | null;
  avatar_url: string;
}

interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  try {
    // 1. 用 code 换 access_token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: GITHUB_REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error("GitHub token error:", tokenData);
      return NextResponse.redirect(new URL("/login?error=github_auth_failed", request.url));
    }

    const accessToken = tokenData.access_token;

    // 2. 获取 GitHub 用户信息
    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const githubUser: GitHubUser = await userRes.json();

    // 3. 获取用户邮箱（如果公开邮箱为空）
    let email = githubUser.email;
    if (!email) {
      const emailsRes = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const emails: GitHubEmail[] = await emailsRes.json();
      const primaryEmail = emails.find((e) => e.primary && e.verified);
      email = primaryEmail?.email || emails[0]?.email;
    }

    if (!email) {
      return NextResponse.redirect(new URL("/login?error=no_email", request.url));
    }

    // 4. 查找或创建用户
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // 自动创建新用户
      user = await prisma.user.create({
        data: {
          email,
          username: githubUser.login,
          password: "", // GitHub 登录用户不需要密码
          avatar: githubUser.avatar_url,
          bio: githubUser.name || null,
        },
      });
    }

    // 5. 生成 JWT
    const token = await signToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // 6. 重定向到首页，带上 token
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
  }
}
