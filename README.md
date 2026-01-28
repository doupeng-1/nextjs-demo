# Next.js 视频播放器演示

这是一个使用 Next.js 15、React 19 和 Supabase 构建的视频播放器应用。

## 功能特性

- ✅ 用户输入视频 URL
- ✅ 视频播放界面（支持 YouTube 和直接视频文件）
- ✅ 用户注册和登录功能
- ✅ Supabase 认证集成
- ✅ 用户状态管理
- ✅ 响应式设计，支持深色模式

## 技术栈

- React 19
- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase (认证和数据库)

## 开始使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Supabase

#### 2.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建账户
2. 创建新项目
3. 在项目设置中找到 API 密钥

#### 2.2 配置环境变量

创建 `.env.local` 文件并添加你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

你可以在 Supabase 项目的 Settings > API 中找到这些值。

#### 2.3 配置 Supabase 认证

在 Supabase 控制台中：

1. 进入 **Authentication** > **Providers**
2. 确保 **Email** 提供程序已启用
3. （可选）配置邮箱验证设置

### 3. 运行开发服务器

```bash
npm run dev
```

### 4. 访问应用

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 使用说明

1. **注册新用户**：点击右上角"登录/注册"按钮，切换到注册页面
2. **登录**：使用注册的邮箱和密码登录
3. **播放视频**：输入视频 URL（支持 YouTube 链接或直接视频文件）
4. **登出**：点击右上角"登出"按钮

## 项目结构

```
nextjs-demo/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局（包含 AuthProvider）
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── VideoInput.tsx    # URL 输入组件
│   ├── VideoPlayer.tsx   # 视频播放器组件
│   ├── LoginForm.tsx    # 登录表单
│   ├── RegisterForm.tsx  # 注册表单
│   └── AuthModal.tsx     # 认证模态框
├── contexts/             # React Context
│   └── AuthContext.tsx   # 认证上下文
├── lib/                  # 工具函数
│   ├── supabase.ts       # Supabase 客户端（旧版）
│   ├── supabase-client.ts # Supabase 客户端（新版）
│   └── videoUtils.ts     # 视频工具函数
└── package.json          # 项目配置
```

## 支持的视频格式

- **YouTube**: `https://www.youtube.com/watch?v=...` 或 `https://youtu.be/...`
- **直接视频文件**: `.mp4`, `.webm`, `.ogg`, `.mov`, `.avi`, `.m3u8` 等

## 开发

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```
