# Wolf Learn Quest

一个将经典**狼人杀**游戏与**答题学习**结合的在线多人 Web 游戏。玩家在游戏中扮演不同角色，通过回答问题、使用技能、投票推理来赢得胜利。

> 本项目已从 Lovable 平台迁移为独立维护的 React + Supabase 项目。

## 功能特性

- **在线多人房间**：创建/加入游戏房间，支持 AI 玩家补位
- **狼人杀核心玩法**：平民、狼人、预言家、女巫、猎人等经典角色与技能
- **答题学习机制**：白天/夜晚答题获取信息或触发技能效果
- **法官控制台**：法官可管理游戏流程、查看全部状态、手动干预
- **实时同步**：基于 Supabase Realtime 的房间状态、聊天、投票实时同步
- **响应式 UI**：使用 Tailwind CSS + shadcn/ui 构建的桌面/移动端适配界面

## 技术栈

- **React 18** + **TypeScript 5**
- **Vite 8**（构建与开发服务器）
- **Tailwind CSS** + **shadcn/ui**
- **Supabase**（Auth、Database、Realtime、Edge Functions）
- **TanStack Query v5**（服务端状态管理）
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
npm run format:check # Prettier 格式检查
npm run test:run     # 运行测试
npm run test:coverage # 运行测试并生成覆盖率报告
npm run preview      # 预览生产构建
```

## 项目结构

```
src/
  components/    # UI 组件
  contexts/      # React Context（权限等）
  hooks/         # 自定义 React Hooks
  integrations/  # Supabase 客户端与类型
  lib/           # 工具库（logger、utils 等）
  pages/         # 路由页面
  providers/     # 全局 Provider
  services/      # Supabase 表/RPC 封装
  styles/        # 全局样式
  types/         # 类型定义
  utils/         # 业务工具函数
supabase/
  functions/     # Edge Functions（AI 出题、文件预处理等）
public/          # 静态资源
```

## 架构要点

- **统一数据层**：`useRoomData` 统一订阅 room/players/gameState/roleStates，避免重复 Realtime 订阅
- **统一类型定义**：核心类型集中在 `src/types/`，通过 `src/types/index.ts` 统一导出
- **权限控制**：基于 `PermissionContext` 的角色/阶段权限判断
- **错误处理**：统一错误处理入口 `src/utils/unifiedErrorHandler.ts`

## 测试

```bash
npm run test:run
```

- 单元测试与组件测试位于 `src/**/__tests__/`（与源码同目录）
- 集成/E2E/性能测试位于 `src/__tests__/` 下对应子目录
- CI 要求覆盖率 ≥ 85%（当前 10 个用例被 skip，待后续修复）

## CI/CD

项目使用 GitHub Actions：

- `test.yml`：测试、覆盖率检查、Lint、类型检查
- `code-quality.yml`：代码质量与性能回归
- `performance-regression.yml`：性能基准对比
- `deploy.yml`：部署与健康检查（当前因缺少 secrets 已禁用）

## 部署

默认部署目标：

- **前端**：Vercel
- **后端/BaaS**：Supabase
- **容器**：提供 Dockerfile + nginx 多阶段构建

详见 [PROJECT_AUDIT_AND_PLAN.md](./PROJECT_AUDIT_AND_PLAN.md)。

## 状态与计划

项目已完成 P0 止血修复与 P1–P2 主要优化：统一类型定义、统一数据/实时层、合并重复 UI 入口、拆分巨型组件。P3 长期工程化（监控、E2E、依赖升级、文档同步）待后续迭代。详见 [PROJECT_AUDIT_AND_PLAN.md](./PROJECT_AUDIT_AND_PLAN.md)。

## 贡献

欢迎 Issue 和 PR。提交信息请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

## 许可证

MIT
