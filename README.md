# Wolf Learn Quest

一个将经典**狼人杀**游戏与**答题学习**结合的在线多人 Web 游戏。玩家在游戏中扮演不同角色，通过回答问题、使用技能、投票推理来赢得胜利。

> 本项目已从 Lovable 平台迁移为独立维护的 React + Supabase 项目。

## 技术栈

- **React 18** + **TypeScript 5**
- **Vite 8**（构建与开发服务器）
- **Tailwind CSS** + **shadcn/ui**
- **Supabase**（Auth、Database、Realtime、Edge Functions）
- **Vitest** + **Testing Library**（测试）

## 快速开始

### 1. 环境要求

- Node.js ≥ 18
- npm ≥ 9

### 2. 安装依赖

```bash
npm ci
```

### 3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env`，填入你的 Supabase 项目信息：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

> 旧的 Supabase 项目已因长期未使用被销毁，需要创建新项目并替换上述配置。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:8080。

## 常用脚本

```bash
npm run dev          # 开发服务器
npm run build        # 生产构建
npm run lint         # ESLint 检查
npm run type-check   # TypeScript 类型检查
npm run test:run     # 运行测试
npm run preview      # 预览生产构建
```

## 项目结构

```
src/
  components/    # UI 组件
  hooks/         # 自定义 React Hooks
  pages/         # 路由页面
  services/      # Supabase 表/RPC 封装
  utils/         # 工具函数
  types/         # 类型定义
supabase/
  functions/     # Edge Functions
public/          # 静态资源
```

## 部署

详见 [DEPLOYMENT.md](./DEPLOYMENT.md) 和 [PROJECT_AUDIT_AND_PLAN.md](./PROJECT_AUDIT_AND_PLAN.md)。

默认部署目标：

- **前端**：Vercel
- **后端/BaaS**：Supabase

## 状态与计划

项目当前已完成第一周止血修复（构建、类型、lint、测试、依赖安全），正在进行 P1–P3 架构与代码质量优化。详见 [PROJECT_AUDIT_AND_PLAN.md](./PROJECT_AUDIT_AND_PLAN.md)。

## 许可证

MIT
