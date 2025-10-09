# 部署指南

## 概览

本项目是一个基于React + Vite + Supabase的全栈应用，支持多种部署方式。

## 环境要求

### 开发环境

- Node.js 18.0.0 或更高版本
- npm 或 yarn 或 pnpm
- Git

### 生产环境

- 支持静态文件托管的服务器
- PostgreSQL数据库（通过Supabase提供）
- HTTPS支持（推荐）

## 部署方式

### 1. Lovable平台部署（推荐）

项目在Lovable平台上开发，可以直接使用平台的一键部署功能。

#### 步骤：

1. 在Lovable编辑器中点击右上角的"Publish"按钮
2. 选择部署配置：
   - 域名设置（可使用默认域名或自定义域名）
   - 环境变量配置
   - 构建设置
3. 等待构建完成
4. 访问生成的URL测试部署

#### 优势：

- 零配置部署
- 自动CI/CD
- 内置Supabase集成
- 免费HTTPS证书
- 全球CDN加速

### 2. Vercel部署

#### 步骤：

1. 将代码推送到GitHub仓库
2. 在Vercel平台导入项目
3. 配置环境变量：
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. 部署配置：
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

#### 自动部署设置：

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 3. Netlify部署

#### 步骤：

1. 连接GitHub仓库到Netlify
2. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
3. 设置环境变量
4. 配置重定向规则：
   ```
   # netlify.toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### 4. 自托管部署

#### 使用Docker部署：

创建Dockerfile：

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

创建nginx.conf：

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /assets {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

构建和运行：

```bash
docker build -t werewolf-app .
docker run -p 80:80 werewolf-app
```

#### 使用PM2部署：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 安装PM2
npm install -g pm2

# 使用serve托管静态文件
npm install -g serve

# 创建PM2配置
# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'werewolf-app',
    script: 'serve',
    args: '-s dist -l 3000',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
}

# 启动应用
pm2 start ecosystem.config.js
```

## 环境变量配置

### 开发环境

创建`.env.local`文件：

```env
# Supabase配置
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# 可选配置
VITE_APP_NAME=Werewolf Game
VITE_APP_VERSION=1.0.0
```

### 生产环境

在部署平台配置以下环境变量：

| 变量名                   | 描述             | 示例值                    |
| ------------------------ | ---------------- | ------------------------- |
| `VITE_SUPABASE_URL`      | Supabase项目URL  | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase匿名密钥 | `eyJhbGciOiJIUzI1NiIs...` |

⚠️ **安全提醒**:

- 生产环境不要使用开发环境的密钥
- 确保RLS策略正确配置
- 定期轮换API密钥

## Supabase配置

### 数据库迁移

1. **安装Supabase CLI**：

   ```bash
   npm install -g supabase
   ```

2. **初始化项目**：

   ```bash
   supabase init
   ```

3. **链接远程项目**：

   ```bash
   supabase link --project-ref your-project-ref
   ```

4. **应用迁移**：
   ```bash
   supabase db push
   ```

### 边缘函数部署

如果使用了边缘函数，需要单独部署：

```bash
# 部署所有函数
supabase functions deploy

# 部署特定函数
supabase functions deploy generate-questions
```

### 存储桶配置

如果使用文件上传功能，需要配置存储桶：

```sql
-- 创建存储桶
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- 配置存储策略
CREATE POLICY "用户可以上传头像" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 性能优化

### 构建优化

1. **代码分割**：

   ```typescript
   // 懒加载页面组件
   const GamePage = lazy(() => import('./pages/GamePage'));
   const LobbyPage = lazy(() => import('./pages/LobbyPage'));
   ```

2. **Bundle分析**：

   ```bash
   npm run build -- --analyze
   ```

3. **Vite配置优化**：
   ```typescript
   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast'],
             supabase: ['@supabase/supabase-js'],
           },
         },
       },
     },
   });
   ```

### 运行时优化

1. **服务端渲染（可选）**：
   考虑使用Next.js重构以支持SSR

2. **CDN配置**：

   ```nginx
   location /assets/ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Gzip压缩**：
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

## 监控和日志

### 错误监控

集成Sentry进行错误监控：

```bash
npm install @sentry/react @sentry/tracing
```

```typescript
// main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### 性能监控

1. **Web Vitals**：

   ```typescript
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

   getCLS(console.log);
   getFID(console.log);
   getFCP(console.log);
   getLCP(console.log);
   getTTFB(console.log);
   ```

2. **Supabase监控**：
   在Supabase仪表板查看：
   - API使用情况
   - 数据库性能
   - 实时连接数

### 日志管理

生产环境日志配置：

```typescript
// utils/logger.ts
const logger = {
  info: (message: string, data?: any) => {
    if (import.meta.env.PROD) {
      // 发送到日志服务
      sendToLogService('info', message, data);
    } else {
      console.log(message, data);
    }
  },
  error: (message: string, error?: any) => {
    if (import.meta.env.PROD) {
      sendToLogService('error', message, error);
    } else {
      console.error(message, error);
    }
  },
};
```

## 安全配置

### HTTPS配置

生产环境必须使用HTTPS：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # 其他配置...
}
```

### 安全头配置

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

### 环境变量安全

1. **不要在代码中硬编码敏感信息**
2. **使用环境变量管理配置**
3. **生产环境使用密钥管理服务**

## 备份和恢复

### 数据库备份

```bash
# 自动备份（Supabase提供）
# 手动导出
supabase db dump --file backup.sql

# 导入备份
psql -h your-host -U postgres -d your-db -f backup.sql
```

### 文件备份

```bash
# 备份上传的文件
supabase storage download --recursive bucket-name ./backup/
```

## 故障排除

### 常见问题

1. **构建失败**：
   - 检查Node.js版本
   - 清除node_modules重新安装
   - 检查TypeScript错误

2. **部署后白屏**：
   - 检查控制台错误
   - 验证环境变量
   - 检查路由配置

3. **Supabase连接失败**：
   - 验证URL和密钥
   - 检查网络连接
   - 确认RLS策略

### 调试工具

1. **开发工具**：

   ```bash
   # 开发服务器
   npm run dev

   # TypeScript检查
   npm run type-check

   # ESLint检查
   npm run lint
   ```

2. **生产调试**：
   ```typescript
   // 添加调试信息
   if (import.meta.env.DEV) {
     console.log('Debug info:', debugData);
   }
   ```

## 最佳实践

### 版本管理

1. **语义化版本**：使用semver管理版本号
2. **标签发布**：为每个生产版本打标签
3. **变更日志**：维护CHANGELOG.md

### CI/CD流程

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: # 部署脚本
```

### 发布检查清单

部署前检查：

- [ ] 所有测试通过
- [ ] TypeScript无错误
- [ ] ESLint无错误
- [ ] 环境变量正确配置
- [ ] 数据库迁移完成
- [ ] 备份重要数据
- [ ] 性能测试通过
- [ ] 安全扫描通过
- [ ] 文档更新
- [ ] 变更日志更新

部署后验证：

- [ ] 应用可正常访问
- [ ] 所有功能正常工作
- [ ] 数据库连接正常
- [ ] 实时功能正常
- [ ] 错误监控正常
- [ ] 性能指标正常
