# AGENTS.md — 项目总控配置

## 项目概览

本项目使用以下技术栈：

- 前端：React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- 后端/BaaS：Supabase (PostgreSQL + Auth + Edge Functions)
- 认证：Supabase Auth
- 数据库：PostgreSQL (via Supabase)
- 部署：Vercel + Docker（可选）
- 监控：Sentry + Lighthouse CI（可选）

## 自动 Skill 路由规则（核心）

收到任何请求时，按以下规则自动判断需要调用哪些 Skill，不要询问用户。

### 意图识别表

| 任务类型    | 关键词特征                                             | 自动调用的 Skills                                   |
| ----------- | ------------------------------------------------------ | --------------------------------------------------- |
| 界面设计    | UI、页面、组件、样式、布局、颜色、字体、美观、视觉效果 | frontend-design + design-taste-frontend + shadcn-ui |
| 动画效果    | 动画、动效、滚动、过渡、粒子、GSAP、缓动               | gsap-core + 21st-frontend-design                    |
| 3D/视觉效果 | Three.js、WebGL、3D、着色器、粒子、流体、Canvas        | threejs + shader-dev                                |
| 前端开发    | React 组件实现、Hook、State、TypeScript、事件处理      | frontend-dev + frontend-designer-skill              |
| 后端API开发 | API、接口、路由、控制器、中间件、服务端                | backend-api                                         |
| 数据库      | 表、Schema、Migration、查询、索引、外键、迁移          | supabase + supabase-postgres-best-practices         |
| 认证授权    | 登录、注册、权限、角色、JWT、OAuth、Session、账号      | secure-auth-rbac                                    |
| 测试        | 测试、Test、Spec、Coverage、E2E、Mock、用例            | testing-suite                                       |
| 部署/DevOps | 部署、Docker、CI/CD、GitHub Actions、Vercel、构建      | devops-pipeline                                     |
| 监控        | 错误、监控、Sentry、性能、日志、追踪                   | monitoring-observability                            |
| Git操作     | 提交、分支、PR、Merge、Commit、Rebase、标签            | git-workflow                                        |
| 代码审查    | 审查、Review、重构、优化、清理                         | design-review + frontend-designer-skill             |
| 设计系统    | Design System、Token、主题、规范、组件库               | design-md + shadcn-ui                               |

### 多 Skill 协同规则

如果任务涉及多个领域，自动组合相关 Skills 按顺序执行：

- **新功能开发（前后端联动）**：
  frontend-design → frontend-dev → backend-api → supabase → testing-suite → git-workflow

- **UI改版/新页面**：
  design-taste-frontend → frontend-design → 21st-frontend-design → shadcn-ui → gsap-core → design-review → testing-suite

- **性能优化**：
  monitoring-observability → frontend-designer-skill → devops-pipeline → testing-suite

- **Bug修复**：
  testing-suite（定位）→ frontend-dev/backend-api（修复）→ testing-suite（回归）→ git-workflow

- **发布版本**：
  git-workflow → testing-suite（全量）→ devops-pipeline → monitoring-observability

- **添加新表/数据库变更**：
  supabase → supabase-postgres-best-practices → backend-api → testing-suite → git-workflow

- **添加认证功能**：
  secure-auth-rbac → frontend-dev → backend-api → testing-suite → git-workflow

## 执行 Loop（每个任务必走）

1. 分析需求 → 识别意图
2. 自动路由 → 根据上表选择 Skill(s)
3. 制定计划 → 告知用户你要做什么、调用哪些 Skills
4. 执行 Skill → 按 Skill 规范产出
5. 自检审查 → design-review / testing-suite（不跳过）
6. Git提交 → git-workflow（如果用户要求保存或任务完成时询问）
7. 交付结果 → 说明使用了哪些 Skills 和完成的内容

## 全局约束（不可违反）

1. 不要问用户用哪个 Skill —— 你自己判断
2. 不要跳过 testing-suite —— 任何代码变更都要考虑测试
3. 不要跳过 git-workflow —— 提交必须符合 Conventional Commits
4. 优先使用已安装的 Skill —— 不要自己发明规范
5. 交付时列出使用的 Skills —— 让用户知道调用了什么
6. 不要在 Skill 缓存路径（~/.claude/skills/、**/.bare/**）直接编辑

## 已安装 Skill 清单

### 前端设计

- frontend-design — 生产级前端界面设计
- frontend-designer-skill — 现代 CSS 架构
- frontend-dev — 全栈开发规范
- 21st-frontend-design — 炫酷动画效果
- design-md — Design.md 规范
- design-review — 设计评审
- shadcn-ui — shadcn/ui 组件库
- gsap-core — GSAP 动画系统
- gsap-frameworks — GSAP 框架集成
- threejs — Three.js 3D 效果
- shader-dev — GLSL 着色器开发

### 后端开发

- backend-api — 通用后端 API 开发

### 数据库

- supabase — Supabase 全栈后端
- supabase-postgres-best-practices — PostgreSQL 优化

### 认证安全

- secure-auth-rbac — 认证 + RBAC 授权

### 测试

- testing-suite — 完整测试套件

### DevOps

- devops-pipeline — CI/CD + 部署

### 监控

- monitoring-observability — Sentry + 性能监控

## i18n / 国际化开发规范

- 所有面向用户的文本必须通过 `useLanguage().t(key, vars?)` 或 `createTranslator(language)` 获取，禁止在组件/Hook/Service 中硬编码用户可见字符串。
- 翻译文件按领域分组存放：
  - `src/lib/translations/en/` 与 `src/lib/translations/zh/`
  - 命名空间：`common`、`game`、`gameComponent`、`hook`、`judge`、`meta`、`page`、`voting`
  - 新增 key 必须同时写入英文和中文文件。
- key 规范：
  - 通用术语使用 `common.*` / `game.*`（如 `common.loading`、`game.phase.day`）。
  - 页面级文本使用 `page.*`，游戏组件使用 `gameComponent.*`，法官面板使用 `judge.*`，投票使用 `voting.*`，Hook/Service 使用 `hook.*`。
  - 优先使用嵌套 key（如 `gameComponent.state.title`），保持旧版扁平 key 兼容。
- 模板变量使用 `{var}` 语法，调用时传入 `vars` 对象：`t('game.phase.round_phase', { round: 1, phase: 'day' })`。
- 语言切换时 `document.title`、`html.lang`、`<meta name="description">` 与 `og:locale` 会自动同步。
- 新增功能必须通过 `npm run type-check` 与 `npm run test:run` 回归验证。

### SEO

- nextjs-seo-optimizer — SEO 全套方案
- i18n-nextjs — 国际化
