# Wolf Learn Quest 使用指南

## 目录

1. [快速开始](#快速开始)
2. [核心功能使用](#核心功能使用)
3. [错误处理系统](#错误处理系统)
4. [安全审计系统](#安全审计系统)
5. [性能优化系统](#性能优化系统)
6. [开发指南](#开发指南)
7. [故障排除](#故障排除)

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- 现代浏览器 (Chrome 90+, Firefox 88+, Safari 14+)

### 安装和启动

```bash
# 克隆项目
git clone <YOUR_GIT_URL>
cd wolf-learn-quest

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm run test

# 构建生产版本
npm run build
```

## 核心功能使用

### 统一错误处理系统

#### 基本使用

```typescript
import { UnifiedErrorHandler } from '@/utils/unifiedErrorHandler';

// 创建错误处理器实例
const errorHandler = new UnifiedErrorHandler({
  enableLogging: true,
  enableUserNotification: true,
  enablePerformanceMonitoring: true,
});

// 处理错误
try {
  // 你的业务逻辑
  await someAsyncOperation();
} catch (error) {
  await errorHandler.handleError(error, {
    context: 'user-action',
    userId: 'user123',
    additionalInfo: { action: 'submit-form' },
  });
}
```

#### React组件中使用

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### 安全审计系统

#### 启用安全监控

```typescript
import { ComprehensiveSecurityAudit } from '@/utils/comprehensiveSecurityAudit';

// 初始化安全审计
const securityAudit = new ComprehensiveSecurityAudit({
  enableRealTimeMonitoring: true,
  enableThreatDetection: true,
  enableAutoResponse: true,
});

// 启动安全监控
await securityAudit.startMonitoring();

// 执行安全检查
const auditResult = await securityAudit.performSecurityAudit();
console.log('安全审计结果:', auditResult);
```

#### 安全策略配置

```typescript
// 配置安全策略
const securityConfig = {
  maxLoginAttempts: 5,
  sessionTimeout: 30 * 60 * 1000, // 30分钟
  enableCSRFProtection: true,
  enableXSSProtection: true,
  enableSQLInjectionProtection: true,
};

await securityAudit.updateSecurityPolicies(securityConfig);
```

### 性能优化系统

#### 智能缓存使用

```typescript
import { SmartCacheManager } from '@/utils/performanceOptimization';

// 创建缓存管理器
const cacheManager = new SmartCacheManager({
  ttl: 300000, // 5分钟
  maxSize: 1000,
  compressionEnabled: true,
});

// 缓存数据
await cacheManager.set('user-data', userData);

// 获取缓存数据
const cachedData = await cacheManager.get('user-data');
```

#### 性能监控

```typescript
import { PerformanceMonitor } from '@/utils/performanceOptimization';

// 启动性能监控
const monitor = new PerformanceMonitor();
monitor.startMonitoring();

// 记录性能指标
monitor.recordMetric('api-response-time', responseTime);
monitor.recordMetric('component-render-time', renderTime);

// 获取性能报告
const report = monitor.getPerformanceReport();
```

## 开发指南

### 代码规范

#### TypeScript类型定义

```typescript
/**
 * 用户数据接口
 * @interface UserData
 */
interface UserData {
  /** 用户ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 邮箱地址 */
  email: string;
  /** 创建时间 */
  createdAt: Date;
}
```

#### 函数注释规范

```typescript
/**
 * 处理用户登录
 * @param credentials - 用户凭证
 * @param options - 登录选项
 * @returns Promise<LoginResult> 登录结果
 * @throws {AuthenticationError} 当认证失败时抛出
 */
async function handleUserLogin(
  credentials: UserCredentials,
  options: LoginOptions = {}
): Promise<LoginResult> {
  // 实现逻辑
}
```

### 测试指南

#### 单元测试

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { UnifiedErrorHandler } from '@/utils/unifiedErrorHandler';

describe('UnifiedErrorHandler', () => {
  let errorHandler: UnifiedErrorHandler;

  beforeEach(() => {
    errorHandler = new UnifiedErrorHandler();
  });

  it('应该正确处理网络错误', async () => {
    const networkError = new Error('Network failed');
    const result = await errorHandler.handleError(networkError);

    expect(result.handled).toBe(true);
    expect(result.errorType).toBe('network');
  });
});
```

#### 集成测试

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '@/App';

describe('App Integration', () => {
  it('应该正确渲染应用', () => {
    render(<App />);
    expect(screen.getByText('Wolf Learn Quest')).toBeInTheDocument();
  });
});
```

## 故障排除

### 常见问题

#### 1. 性能测试失败

**问题**: 部分性能测试在某些环境下失败
**解决方案**:

- 检查浏览器兼容性
- 确保测试环境稳定
- 使用降级处理策略

#### 2. 缓存问题

**问题**: 缓存数据不一致
**解决方案**:

```typescript
// 清除特定缓存
await cacheManager.delete('problematic-key');

// 清除所有缓存
await cacheManager.clear();

// 重新初始化缓存
await cacheManager.initialize();
```

#### 3. 错误处理不生效

**问题**: 错误没有被正确捕获
**解决方案**:

```typescript
// 确保错误处理器正确初始化
const errorHandler = new UnifiedErrorHandler({
  enableLogging: true,
  enableUserNotification: true
});

// 检查错误边界是否正确设置
<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

### 调试技巧

#### 1. 启用详细日志

```typescript
// 在开发环境启用详细日志
if (process.env.NODE_ENV === 'development') {
  console.log('Debug mode enabled');
  // 启用详细错误日志
  errorHandler.setLogLevel('debug');
}
```

#### 2. 性能分析

```typescript
// 使用性能分析工具
const performanceData = monitor.getDetailedMetrics();
console.table(performanceData);
```

#### 3. 安全审计调试

```typescript
// 获取详细的安全审计日志
const auditLogs = await securityAudit.getAuditLogs();
console.log('Security audit logs:', auditLogs);
```

## 最佳实践

### 1. 错误处理

- 始终使用统一错误处理器
- 为用户提供友好的错误信息
- 记录详细的错误日志用于调试

### 2. 性能优化

- 合理使用缓存策略
- 监控关键性能指标
- 定期清理无用的缓存数据

### 3. 安全性

- 定期运行安全审计
- 及时更新安全策略
- 监控异常的用户行为

### 4. 代码质量

- 编写完整的测试用例
- 添加详细的代码注释
- 遵循TypeScript最佳实践

---

## 支持和反馈

如果您在使用过程中遇到问题或有改进建议，请：

1. 查看本文档的故障排除部分
2. 检查项目的测试用例
3. 提交Issue到项目仓库
4. 联系开发团队

**文档版本**: v2.0  
**最后更新**: 2024年12月
