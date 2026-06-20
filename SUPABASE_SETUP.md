# Wolf Learn Quest — Supabase 重建指南

> 旧 Supabase 项目已因长期未使用被销毁，需要按本指南重新创建项目并恢复后端能力。

## 1. 创建新项目

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 新建 Organization / Project
3. 记录以下信息（Settings → API）：
   - `Project URL`
   - `anon public` API key
   - `Project ID`

## 2. 配置本地环境

```bash
cp .env.example .env
```

填入：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

同时更新 `supabase/config.toml`：

```toml
project_id = "your-project-id"
```

## 3. 安装 Supabase CLI 并登录

```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-id
```

## 4. 执行数据库迁移

本项目所有表结构、函数、RLS 策略均保存在 `supabase/migrations/` 目录下，按时间顺序执行：

```bash
supabase db push
```

> 若 `db push` 因迁移文件过多而失败，可在 Supabase Dashboard SQL Editor 中按文件名顺序逐个执行 `supabase/migrations/*.sql`。

## 5. 创建 Storage Bucket

在 Supabase Dashboard → Storage 中创建 `question-files` bucket，并设置如下权限：

- **上传**： authenticated / anon 可上传（或仅 authenticated，视产品需求）
- **读取**： public / authenticated

## 6. 部署 Edge Functions

```bash
supabase functions deploy generate-questions
supabase functions deploy preprocess-file
```

设置 Edge Function 所需环境变量：

```bash
supabase secrets set SILICONFLOW_API_KEY=your_siliconflow_key
supabase secrets set SUPABASE_URL=https://your-project.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> `SUPABASE_SERVICE_ROLE_KEY` 和 `SUPABASE_URL` 通常由 Supabase CLI 自动注入，但建议显式设置以避免本地/生产环境差异。

## 7. 配置 CORS（生产环境）

编辑 `supabase/functions/generate-questions/index.ts` 和 `preprocess-file/index.ts` 中的 `ALLOWED_ORIGINS`，加入生产域名：

```ts
const ALLOWED_ORIGINS = [
  'https://your-production-domain.com',
  'https://wolf-learn-quest.vercel.app',
  'http://localhost:5173',
  'http://localhost:8080',
];
```

## 8. 配置 GitHub Actions Secrets

在仓库 Settings → Secrets and variables → Actions 中添加：

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SUPABASE_PROJECT_ID

# 恢复部署任务时还需要
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
DOCKER_USERNAME
DOCKER_PASSWORD
```

## 9. 重新启用部署工作流

编辑 `.github/workflows/deploy.yml`，将需要启用的 job 的 `if: false` 改回条件判断，例如：

```yaml
deploy-vercel:
  if: github.ref == 'refs/heads/main' && secrets.VERCEL_TOKEN != ''
```

## 10. 验证

```bash
npm ci
npm run lint
npm run type-check
npm run test:run
npm run build
```

确认 GitHub Actions 最新运行全部绿色。

---

## 常见问题

### Q: 迁移文件包含重复或冲突的 DDL？

A: 所有迁移按文件名时间顺序执行；如遇冲突，请保留时间戳最新的定义。

### Q: Edge Function 调用报 CORS 错误？

A: 检查请求来源是否在 `ALLOWED_ORIGINS` 中，并确认 Function 已重新部署。

### Q: 前端无法连接 Supabase？

A: 确认 `.env` 中的 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY` 与 Dashboard API 页面一致。
