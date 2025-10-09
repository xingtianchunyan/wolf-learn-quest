# 狼人杀游戏平台

## 项目概览

这是一个基于 React + TypeScript + Supabase 构建的在线狼人杀游戏平台，支持实时多人游戏、角色技能系统、投票系统和答题系统。

## 核心功能

- **用户认证系统**：支持登录/注册，用户档案管理
- **房间管理**：创建/加入游戏房间，角色选择
- **实时游戏**：多阶段游戏流程，实时状态同步
- **技能系统**：多种角色技能，冲突解决机制
- **投票系统**：白天投票，结果处理
- **答题系统**：自动生成题目，答题验证
- **聊天系统**：多频道实时聊天

## 技术栈

- **前端**：React 18, TypeScript, Tailwind CSS
- **后端**：Supabase (PostgreSQL + Edge Functions)
- **状态管理**：React Query, React Context
- **实时功能**：Supabase Realtime
- **构建工具**：Vite
- **UI组件**：Radix UI, Shadcn/ui

## 项目结构

```
src/
├── components/          # React 组件
│   ├── ui/             # 基础 UI 组件
│   ├── game/           # 游戏相关组件
│   ├── judge/          # 法官页面组件
│   ├── lobby/          # 大厅组件
│   └── ...
├── hooks/              # 自定义 Hooks
├── services/           # 业务逻辑层
├── utils/              # 工具函数
├── contexts/           # React Context
├── providers/          # Provider 组件
├── pages/              # 页面组件
└── integrations/       # 第三方集成
    └── supabase/       # Supabase 相关
```

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Supabase 账户

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd werewolf-game
```

2. 安装依赖
```bash
npm install
```

3. 环境配置
```bash
cp .env.example .env
# 配置 Supabase 相关环境变量
```

4. 启动开发服务器
```bash
npm run dev
```

### 环境变量配置

创建 `.env` 文件并配置以下变量：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 部署指南

### 生产环境部署

1. **构建项目**
```bash
npm run build
```

2. **Supabase 配置**
   - 确保数据库迁移已执行
   - 配置 RLS 策略
   - 部署 Edge Functions

3. **静态文件部署**
   - 将 `dist/` 目录部署到 CDN 或静态托管服务
   - 配置路由重定向到 `index.html`

4. **环境变量设置**
   - 在生产环境中配置 Supabase URL 和密钥
   - 确保安全配置

## 开发指南

- [API 文档](./API.md)
- [组件文档](./COMPONENTS.md)
- [数据库设计](./DATABASE.md)
- [部署文档](./DEPLOYMENT.md)

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 创建 Pull Request

## 许可证

MIT License