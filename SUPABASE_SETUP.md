# Wolf Learn Quest — Supabase 当前恢复指南

> 本文档已经根据当前仓库与已恢复成功的新 Supabase 项目重新整理，内容以“当前真实可用状态”为准，不再适用旧的碎片化迁移方案。

## 1. 当前项目信息

当前已绑定的新 Supabase 项目：

- `Project URL`: `https://ypwhqxervufltejzhwwg.supabase.co`
- `Project ID / project ref`: `ypwhqxervufltejzhwwg`

当前仓库中的 `supabase/config.toml` 应保持为：

```toml
project_id = "ypwhqxervufltejzhwwg"
```

## 2. 当前恢复结论

截至目前，以下内容已经过实际恢复与联调验证：

- 数据库基础 schema 已恢复
- 3 个 Storage bucket 已恢复
- `role_design` 基础种子数据已恢复
- 2 个 Edge Functions 已部署
- `SILICONFLOW_API_KEY` 已配置
- `preprocess-file` 与 `generate-questions` 已完成真实链路联调

## 3. 迁移结构说明

### 当前正式迁移目录

当前 **只应执行** `supabase/migrations/` 下的两条正式迁移：

1. `20251016170035_restore_public_schema_from_backup.sql`
2. `20260621134000_restore_storage_and_role_seed.sql`

含义如下：

- `20251016170035_restore_public_schema_from_backup.sql`
  - 基于历史数据库备份重建当前 `public schema`
  - 包含核心表、函数、约束、索引、触发器、RLS 等基础结构

- `20260621134000_restore_storage_and_role_seed.sql`
  - 恢复当前项目必需的 Storage buckets
  - 恢复 `role_design` 的基础角色种子数据

### 历史迁移归档目录

旧的碎片化历史迁移已归档到：

- `supabase/migrations_legacy_20260621/`

这些文件保留用于审计、追溯和对比，不再作为当前新项目的正式迁移链执行。

### 重要规则

- 新环境恢复时，只执行 `supabase/migrations/` 下的正式迁移
- 不要再把 `supabase/migrations_legacy_20260621/` 中的文件重新搬回正式目录
- 不要将 legacy 迁移逐个手工跑到新项目里，否则极易再次触发顺序冲突、重复建表和缺失依赖问题

## 4. 本地环境配置

如果本地缺少 `.env`，可参考 `.env.example` 新建：

```powershell
Copy-Item .env.example .env
```

填入以下变量：

```env
VITE_SUPABASE_URL=https://ypwhqxervufltejzhwwg.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_PROJECT_ID=ypwhqxervufltejzhwwg
```

说明：

- `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_ANON_KEY` 用于前端连接
- `VITE_SUPABASE_PROJECT_ID` 用于项目侧的一些配置识别
- `anon key` 以 Supabase Dashboard → Settings → API 页面为准

## 5. Supabase CLI 绑定流程

### 安装 CLI

```powershell
npm install -g supabase
```

### 登录

```powershell
supabase login
```

如果已有 Access Token，也可以直接：

```powershell
supabase login --token <your-personal-access-token>
```

### 绑定当前项目

```powershell
supabase link --project-ref ypwhqxervufltejzhwwg
```

如 CLI 需要数据库密码，则输入当前项目的数据库密码。

## 6. 数据库恢复流程

### 适用场景

以下步骤适用于：

- 新建空白 Supabase 项目
- 需要将该项目恢复到当前仓库已验证通过的后端状态

### 执行命令

```powershell
supabase db push --yes
```

### 预期结果

执行成功后，应至少恢复：

- `rooms`
- `room_players`
- `uploaded_files`
- `preprocessed_files`
- `generated_questions`
- `questions`
- `role_design`
- `game_states`
- `chat_messages`
- `voting_sessions`
- `votes`
- `voting_results`

以及与其配套的函数、RLS、触发器、索引。

## 7. Storage Bucket 规则

当前项目实际使用 3 个 bucket：

- `question-files`
- `avatars`
- `role-design`

### 7.1 `question-files`

用途：

- 上传题库原始文件
- 供 `preprocess-file` 下载并做 AI 预处理

当前规则：

- `public = false`
- 已登录用户可读写删
- 不对匿名用户公开读取

前端上传路径规范：

```text
question-files/uploads/<timestamp>_<sanitized-file-name>
```

注意：

- 当前恢复后的规则以“私有 + authenticated 访问”为准
- 旧文档中“anon 可上传 / public 可读”的说法已不再适用当前项目

### 7.2 `avatars`

用途：

- 用户头像上传与公开展示

当前规则：

- `public = true`
- 公共读取
- 已登录用户只能操作自己目录下的头像对象

路径规范：

```text
avatars/<userId>/avatar.<ext>
```

### 7.3 `role-design`

用途：

- 角色图片公开读取

当前规则：

- `public = true`
- 公共读取
- authenticated 用户允许上传

注意：

- 当前前端主要使用该 bucket 的公开读取能力
- 角色基础数据中的 `role_image` 已依赖该 bucket

## 8. Edge Functions 恢复与部署

当前需要部署的函数只有两个：

- `preprocess-file`
- `generate-questions`

部署命令：

```powershell
supabase functions deploy preprocess-file
supabase functions deploy generate-questions
```

### 函数用途

- `preprocess-file`
  - 从 `question-files` 下载文件
  - 提取文本
  - 调用 SiliconFlow 做预处理
  - 写入 `uploaded_files` 与 `preprocessed_files`

- `generate-questions`
  - 读取 `preprocessed_files`
  - 调用 SiliconFlow 生成题目
  - 写入 `generated_questions` 与 `questions`

## 9. Edge Functions Secrets

### 必须手动设置

当前唯一必须手动设置的 secret：

```powershell
supabase secrets set SILICONFLOW_API_KEY=<your_siliconflow_key>
```

### 不需要手动设置

以下两个变量为 Supabase 平台保留注入项：

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

说明：

- 当前项目中，这两个值由平台自动注入给 Edge Functions
- Supabase CLI 不允许手动 `secrets set` 这类保留变量
- 因此如果 CLI 提示不能设置，是正常现象，不是配置失败

## 10. CORS 配置

当前两个函数中的允许来源为：

```ts
const ALLOWED_ORIGINS = [
  'https://wolf-learn-quest.vercel.app',
  'http://localhost:5173',
  'http://localhost:8080',
];
```

对应文件：

- `supabase/functions/preprocess-file/index.ts`
- `supabase/functions/generate-questions/index.ts`

如果未来更换正式域名，需要同步更新这两个文件并重新部署函数。

## 11. 当前已验证通过的链路

### 已验证通过

当前已做过真实联调的链路：

1. 上传文本文件到 `question-files`
2. 调用 `preprocess-file`
3. 成功生成 `preprocessed_files` 记录
4. 调用 `generate-questions`
5. 成功生成 `generated_questions`
6. 成功写入 `questions`

### 已修复的函数问题

恢复过程中已经修复以下问题：

- `preprocess-file` 缺参时错误返回数据库 `500`
  - 现已改为明确返回 `400`

- `generate-questions` 将 `correct_option` 错误写成 `0-3`
  - 现已改为符合数据库约束的 `1-4`

- `generate-questions` 在 `questions` 写入失败时仍返回成功
  - 现已改为失败则回滚并返回错误

- `preprocess-file` 在文件下载失败前先写 `uploaded_files`
  - 现已调整为先下载、后写库，并处理重试场景

## 12. GitHub Actions / CI 配置建议

当前如果要恢复 CI/CD，至少应补齐：

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SUPABASE_PROJECT_ID
```

如果恢复部署，还需要按工作流需要配置：

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
DOCKER_USERNAME
DOCKER_PASSWORD
```

## 13. 推荐验证命令

恢复完成后，建议至少执行：

```powershell
npm ci
npm run lint
npm run type-check
npm run test:run
npm run build
```

然后做一次最小业务验证：

1. 前端能正常连接 Supabase
2. 可以进入题库页面
3. 可以上传文件
4. 可以预处理文件
5. 可以生成题目

## 14. 已知注意事项

### 14.1 不要再使用旧迁移链恢复新库

当前新库已经切换为“基线迁移 + 资源迁移”的结构。

不要再尝试：

- 逐个执行 legacy 迁移
- 将 legacy 文件重新放回 `supabase/migrations/`
- 按旧时间戳链条重建整个库

### 14.2 `.temp` 目录是恢复辅助目录

当前仓库下的：

- `supabase/.temp/`

用于保存恢复时解压出的历史数据库备份与临时验证文件。

说明：

- 它不是正式迁移目录
- 不参与 `supabase db push`
- 如后续不再需要，可在确认备份用途结束后手动清理

### 14.3 PowerShell 中中文乱码不等于函数数据损坏

在 Windows PowerShell 中，函数响应体里的中文有时会显示为乱码。

这通常只是终端编码问题，不代表：

- 数据库存储损坏
- Edge Function JSON 真正乱码
- Supabase 返回内容异常

### 14.4 `role_design` 是基础种子数据

当前项目依赖 `role_design` 中的角色配置数据。

如果新环境里该表为空，前端角色相关流程会异常或不可用。

当前正式迁移已经负责恢复这部分种子数据，不需要再单独导入。

## 15. 常见问题

### Q: `supabase db push` 为什么现在只看到两条迁移？

A: 因为旧的迁移历史已经归档。当前正式迁移链只保留“恢复当前可运行状态”所需的两条迁移，这是有意整理后的结果。

### Q: 为什么不能设置 `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` secrets？

A: 它们是 Supabase 平台保留注入变量，函数运行时自动提供，不需要也不能通过普通 `supabase secrets set` 手动设置。

### Q: 为什么 `question-files` 不是公开 bucket？

A: 当前项目已按“私有 + authenticated 读写”恢复，这是与当前代码和安全性更一致的规则；旧文档中的公开策略不再作为现行方案。

### Q: 如果我要再次恢复一个全新的 Supabase 项目，最短路径是什么？

A: 按以下顺序执行即可：

1. 创建新项目
2. 更新 `.env`
3. 更新 `supabase/config.toml`
4. `supabase login`
5. `supabase link --project-ref <project-ref>`
6. `supabase db push --yes`
7. `supabase secrets set SILICONFLOW_API_KEY=<key>`
8. `supabase functions deploy preprocess-file`
9. `supabase functions deploy generate-questions`

### Q: 如果恢复后函数能部署，但调用仍失败怎么办？

A: 先按顺序检查：

1. `SILICONFLOW_API_KEY` 是否已设置
2. 调用域名是否在 `ALLOWED_ORIGINS` 中
3. `question-files` 是否存在且权限正确
4. `role_design`、`preprocessed_files`、`generated_questions` 等关键表是否已恢复
