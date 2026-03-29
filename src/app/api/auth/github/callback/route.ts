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

  console.log("GitHub OAuth callback - code:", code ? "received" : "missing");

  if (!code) {
    console.log("Error: no code in callback");
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  try {
    // 1. 用 code 换 access_token
    console.log("Exchanging code for token...");
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
    console.log("Token response:", tokenData);

    if (tokenData.error) {
      console.error("GitHub token error:", tokenData);
      return NextResponse.redirect(new URL("/login?error=github_auth_failed", request.url));
    }

    const accessToken = tokenData.access_token;

    // 2. 获取 GitHub 用户信息
    console.log("Fetching GitHub user info...");
    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const githubUser: GitHubUser = await userRes.json();
    console.log("GitHub user:", githubUser.login);

    // 3. 获取用户邮箱（如果公开邮箱为空）
    let email = githubUser.email;
    if (!email) {
      console.log("Fetching GitHub emails...");
      const emailsRes = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const emails: GitHubEmail[] = await emailsRes.json();
      const primaryEmail = emails.find((e) => e.primary && e.verified);
      email = primaryEmail?.email || emails[0]?.email;
    }

    if (!email) {
      console.log("Error: no email found");
      return NextResponse.redirect(new URL("/login?error=no_email", request.url));
    }

    console.log("Using email:", email);

    // 4. 查找或创建用户
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("Creating new user...");
      user = await prisma.user.create({
        data: {
          email,
          username: githubUser.login,
          password: "",
          avatar: githubUser.avatar_url,
          bio: githubUser.name || null,
        },
      });
    } else {
      console.log("Found existing user:", user.username);
    }

    // 5. 生成 JWT
    const token = await signToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
    console.log("Generated token, length:", token.length);

    // 6. 重定向到首页，同时设置 cookie 和 URL 参数
    const baseUrl = new URL("/", request.url);
    const response = NextResponse.redirect(baseUrl);
    
    // 设置 cookie
    response.cookies.set("auth_token", token, {
      httpOnly: false, // 改为 false，让 JS 可以读取
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    console.log("Cookie set, redirecting to home");
    return response;
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
  }
}
