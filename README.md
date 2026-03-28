# MyBlog - 高性能个人博客

一个基于 **Next.js 16 + TypeScript + Tailwind CSS + Prisma + SQLite** 构建的高性能、高颜值个人博客。

## ✨ 特性

- 🚀 **SSG/SSR 混合渲染** — 首屏毫秒级加载
- 🎨 **精美 UI** — Tailwind CSS + 响应式设计 + 暗黑模式
- 🔐 **用户认证** — JWT 登录/注册，支持第三方登录入口
- 💬 **评论系统** — 登录用户可评论
- 📝 **Markdown 文章** — 完整的文章 CRUD
- 🏷️ **标签系统** — 文章标签分类
- 🔍 **搜索筛选** — 文章搜索和分类筛选
- 📊 **阅读统计** — 文章阅读量计数
- 📱 **响应式** — 完美适配手机/平板/桌面
- 🌙 **暗黑模式** — 自动跟随系统偏好

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| **后端** | Next.js API Routes |
| **数据库** | SQLite + Prisma ORM |
| **认证** | JWT (jose) + bcryptjs |
| **图标** | Lucide React + React Icons |
| **部署** | Vercel |

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/blog-demo.git
cd blog-demo
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件：
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="你的随机密钥"
```

### 4. 初始化数据库

```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可访问。

## 📡 API 接口

### 认证
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/register` | 注册 |
| POST | `/api/auth/login` | 登录 |
| GET | `/api/auth/session` | 获取当前会话 |

### 文章
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/posts?page=1&limit=10&search=&category=` | 文章列表 |
| GET | `/api/posts/:id` | 文章详情 |
| POST | `/api/posts` | 创建文章 (需登录) |
| PUT | `/api/posts/:id` | 编辑文章 (需登录) |
| DELETE | `/api/posts/:id` | 删除文章 (需登录) |

### 评论
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/posts/:id/comments` | 评论列表 |
| POST | `/api/posts/:id/comments` | 发表评论 (需登录) |

### 标签
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/tags` | 所有标签 |

## 🔑 测试账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@blog.com | admin123 |
| 用户 | user1@blog.com | user123 |
| 用户 | user2@blog.com | user123 |

## 📁 项目结构

```
blog-demo/
├── prisma/
│   ├── schema.prisma          # 数据库模型
│   ├── seed.ts                # 种子数据
│   └── dev.db                 # SQLite 数据库
├── src/
│   ├── app/
│   │   ├── layout.tsx         # 全局布局
│   │   ├── page.tsx           # 首页
│   │   ├── globals.css        # 全局样式
│   │   ├── posts/
│   │   │   ├── page.tsx       # 文章列表
│   │   │   └── [id]/page.tsx  # 文章详情
│   │   ├── about/page.tsx     # 关于页面
│   │   ├── login/page.tsx     # 登录注册
│   │   └── api/               # API 路由
│   │       ├── auth/          # 认证接口
│   │       ├── posts/         # 文章接口
│   │       └── tags/route.ts  # 标签接口
│   ├── components/
│   │   ├── Header.tsx         # 导航栏
│   │   ├── Footer.tsx         # 页脚
│   │   └── ThemeProvider.tsx  # 主题切换
│   └── lib/
│       ├── prisma.ts          # Prisma 客户端
│       └── auth.ts            # JWT 认证工具
├── .env.example
├── package.json
└── README.md
```

## 📜 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run db:migrate   # 运行数据库迁移
npm run db:seed      # 播种测试数据
npm run db:reset     # 重置数据库
npm run db:studio    # 打开 Prisma Studio (数据库管理)
```

## 🌐 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署完成！

> ⚠️ Vercel 不支持 SQLite 持久化存储，生产环境请将 `DATABASE_URL` 改为 PostgreSQL (推荐 [Neon](https://neon.tech) 或 [Supabase](https://supabase.com) 免费套餐)。

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npx prisma migrate deploy
EXPOSE 3000
CMD ["npm", "start"]
```

## 📄 License

MIT
