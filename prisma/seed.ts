import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始播种数据...");

  // 创建管理员用户
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@blog.com" },
    update: {},
    create: {
      username: "博主",
      email: "admin@blog.com",
      password: hashedPassword,
      role: "admin",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
      bio: "全栈开发者，热爱技术与分享",
    },
  });
  console.log(`✅ 创建管理员: ${admin.username}`);

  // 创建普通用户
  const userPassword = await bcrypt.hash("user123", 12);
  const user1 = await prisma.user.upsert({
    where: { email: "user1@blog.com" },
    update: {},
    create: {
      username: "小明",
      email: "user1@blog.com",
      password: userPassword,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=XiaoMing",
      bio: "技术爱好者",
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: "user2@blog.com" },
    update: {},
    create: {
      username: "技术达人",
      email: "user2@blog.com",
      password: userPassword,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TechFan",
    },
  });
  console.log(`✅ 创建用户: ${user1.username}, ${user2.username}`);

  // 创建示例文章
  const postsData = [
    {
      title: "Next.js 15 新特性完全解析",
      slug: "nextjs-15-features",
      excerpt: "深入探索 Next.js 15 的最新功能，包括 Turbopack、Server Actions 优化等...",
      content: `# 🚀 Next.js 15 新特性完全解析

## 引言

Next.js 15 带来了许多令人兴奋的新特性，这次更新进一步巩固了它在全栈 React 框架中的领先地位。

## ⚡ Turbopack 正式成为默认

经过多年的开发，Turbopack 终于在 Next.js 15 中成为默认的开发服务器。它基于 Rust 构建，在大型项目中可以提供 **10 倍以上的构建速度提升**。

\`\`\`typescript
// next.config.ts
module.exports = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}
\`\`\`

## 🎯 Server Actions 增强

Server Actions 在 Next.js 15 中得到了显著增强，现在支持更好的错误处理、表单验证和乐观更新。

> "Server Actions 是 React 和 Next.js 的未来。" — Next.js Team

## 📦 部分预渲染 (PPR)

Partial Prerendering 是 Next.js 15 最具创新性的特性之一，它允许你将静态 shell 和动态内容结合。

## 📋 总结

- Turbopack 成为默认开发服务器
- Server Actions 增强
- 部分预渲染 (PPR)
- CSS 优化与 Tailwind v4 支持`,
      cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      published: true,
      category: "前端开发",
      tags: ["Next.js", "React", "前端"],
    },
    {
      title: "从零开始搭建 TypeScript 项目",
      slug: "typescript-project-setup",
      excerpt: "一份完整的 TypeScript 项目搭建指南，涵盖配置、工具链和最佳实践...",
      content: `# 从零开始搭建 TypeScript 项目

## 初始化项目

\`\`\`bash
mkdir my-project && cd my-project
npm init -y
npm install typescript @types/node --save-dev
npx tsc --init
\`\`\`

## tsconfig.json 推荐配置

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
\`\`\`

## 总结

好的 TypeScript 配置是项目的基础，务必花时间做好初始配置。`,
      cover: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
      published: true,
      category: "教程",
      tags: ["TypeScript", "教程"],
    },
    {
      title: "Tailwind CSS 高级技巧",
      slug: "tailwind-css-tips",
      excerpt: "掌握 Tailwind CSS 的高级用法，打造独特的设计系统...",
      content: `# Tailwind CSS 高级技巧

## 自定义主题

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6',
      },
    },
  },
}
\`\`\`

## 组合模式

使用 \`@apply\` 减少重复：

\`\`\`css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
}
\`\`\`

## 暗黑模式

Tailwind 内置支持暗黑模式，配合 CSS 变量使用效果最佳。`,
      cover: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800",
      published: true,
      category: "前端开发",
      tags: ["CSS", "Tailwind", "设计"],
    },
    {
      title: "React 19 新特性一览",
      slug: "react-19-features",
      excerpt: "React 19 带来了许多激动人心的新特性，让我们一探究竟...",
      content: `# React 19 新特性一览

## Server Components

React Server Components 正式成为默认，无需额外配置。

## Actions

\`\`\`tsx
function Form() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const name = formData.get('name');
    await createUser(name);
  }
  
  return <form action={handleSubmit}>...</form>;
}
\`\`\`

## use() Hook

新的 \`use()\` Hook 可以在渲染时读取 Promise 或 Context。`,
      cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      published: true,
      category: "前端开发",
      tags: ["React", "前端"],
    },
    {
      title: "Vercel 部署最佳实践",
      slug: "vercel-deployment",
      excerpt: "如何优雅地在 Vercel 上部署你的 Next.js 应用...",
      content: `# Vercel 部署最佳实践

## 一键部署

连接 GitHub 仓库到 Vercel，每次 push 自动部署。

## 环境变量

在 Vercel Dashboard 中配置环境变量，支持多环境管理。

## 边缘函数

使用 \`export const runtime = 'edge'\` 启用边缘部署。`,
      cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      published: true,
      category: "运维部署",
      tags: ["Vercel", "部署", "DevOps"],
    },
    {
      title: "Node.js 性能优化指南",
      slug: "nodejs-performance",
      excerpt: "深入理解 Node.js 性能瓶颈，学习实用的优化技巧...",
      content: `# Node.js 性能优化指南

## 事件循环

理解事件循环是优化 Node.js 应用的基础。

## 内存管理

\`\`\`javascript
// 使用流处理大文件
const stream = fs.createReadStream('large-file.txt');
stream.pipe(process.stdout);
\`\`\`

## 集群模式

使用 \`cluster\` 模块充分利用多核 CPU。`,
      cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      published: true,
      category: "后端开发",
      tags: ["Node.js", "性能优化"],
    },
  ];

  for (const postData of postsData) {
    const { tags, ...postFields } = postData;
    const post = await prisma.post.create({
      data: {
        ...postFields,
        authorId: admin.id,
        tags: {
          create: tags.map((name: string) => ({ name })),
        },
      },
    });

    // 添加评论
    const commentsData = [
      { authorId: user1.id, postId: post.id, content: "写得非常好，学到了很多！" },
      { authorId: user2.id, postId: post.id, content: "期待更多这样的深度文章。" },
    ];
    await prisma.comment.createMany({ data: commentsData });
    console.log(`✅ 创建文章: ${post.title}`);
  }

  console.log("\n🎉 数据播种完成！");
  console.log("\n📊 测试账号:");
  console.log("  管理员: admin@blog.com / admin123");
  console.log("  用户:   user1@blog.com / user123");
  console.log("  用户:   user2@blog.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
