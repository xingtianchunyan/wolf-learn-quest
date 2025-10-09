# 组件文档

## 概述

本文档详细介绍了狼人杀学习任务项目中的所有核心组件，包括使用方法、API接口、最佳实践和示例代码。

## 目录

- [高阶组件 (HOC)](#高阶组件-hoc)
- [共享Hook](#共享hook)
- [工具函数](#工具函数)
- [设计模式](#设计模式)
- [专业化服务](#专业化服务)

## 高阶组件 (HOC)

### withErrorBoundary

错误边界高阶组件，为组件提供错误捕获和处理功能。

#### 接口定义

```typescript
interface ErrorBoundaryConfig {
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  enableLogging?: boolean;
  resetOnPropsChange?: boolean;
  resetKeys?: string[];
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  hasError: boolean;
}
```

#### 使用方法

```typescript
import { withErrorBoundary } from '@/components/shared/hoc/withErrorBoundary';

// 基本使用
const SafeComponent = withErrorBoundary(MyComponent);

// 自定义配置
const SafeComponentWithConfig = withErrorBoundary(MyComponent, {
  fallback: CustomErrorFallback,
  onError: (error, errorInfo) => {
    console.error('Component error:', error);
    // 发送错误报告
  },
  enableLogging: true,
  resetOnPropsChange: true,
  resetKeys: ['userId', 'gameId'],
});
```

#### Hook使用

```typescript
import { useErrorHandler, useAsyncError } from '@/components/shared/hoc/withErrorBoundary';

function MyComponent() {
  const handleError = useErrorHandler();
  const throwAsyncError = useAsyncError();

  const handleClick = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      handleError(error);
    }
  };

  return <button onClick={handleClick}>执行操作</button>;
}
```

#### 最佳实践

1. **错误边界层级**：在应用的关键层级设置错误边界
2. **错误回退UI**：提供用户友好的错误回退界面
3. **错误日志**：启用错误日志记录，便于调试
4. **重置机制**：合理设置重置条件，避免错误状态持续

### withPermission

权限控制高阶组件，提供基于角色和权限的访问控制。

#### 接口定义

```typescript
interface PermissionCheckConfig {
  roles?: RoleType[];
  permissions?: string[];
  requireAll?: boolean;
  fallback?: React.ComponentType<PermissionFallbackProps>;
  onAccessDenied?: (
    missingRoles: RoleType[],
    missingPermissions: string[]
  ) => void;
}

interface PermissionFallbackProps {
  missingRoles: RoleType[];
  missingPermissions: string[];
  hasAccess: boolean;
}
```

#### 使用方法

```typescript
import { withPermission } from '@/components/shared/hoc/withPermission';

// 角色权限检查
const AdminOnlyComponent = withPermission(MyComponent, {
  roles: ['admin'],
  fallback: AccessDeniedComponent,
});

// 多权限检查
const MultiPermissionComponent = withPermission(MyComponent, {
  permissions: ['game:create', 'game:manage'],
  requireAll: true,
  onAccessDenied: (missingRoles, missingPermissions) => {
    console.log('Access denied:', { missingRoles, missingPermissions });
  },
});
```

#### Hook使用

```typescript
import { usePermission } from '@/components/shared/hoc/withPermission';

function MyComponent() {
  const { hasAccess, missingRoles, missingPermissions } = usePermission({
    roles: ['admin', 'moderator'],
    permissions: ['game:create']
  });

  if (!hasAccess) {
    return <div>权限不足</div>;
  }

  return <div>有权限的内容</div>;
}
```

#### 条件渲染组件

```typescript
import { PermissionGate } from '@/components/shared/hoc/withPermission';

function MyComponent() {
  return (
    <div>
      <PermissionGate roles={['admin']}>
        <AdminPanel />
      </PermissionGate>

      <PermissionGate permissions={['game:create']}>
        <CreateGameButton />
      </PermissionGate>
    </div>
  );
}
```

### withLoading

加载状态高阶组件，提供统一的加载状态管理和UI展示。

#### 接口定义

```typescript
interface LoadingConfig {
  loadingComponent?: React.ComponentType<LoadingComponentProps>;
  timeout?: number;
  showTimeout?: boolean;
  enableProgress?: boolean;
  minDisplayTime?: number;
}

interface LoadingComponentProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
  hasTimeout: boolean;
}
```

#### 使用方法

```typescript
import { withLoading } from '@/components/shared/hoc/withLoading';

// 基本使用
const LoadingComponent = withLoading(MyComponent);

// 自定义配置
const CustomLoadingComponent = withLoading(MyComponent, {
  loadingComponent: CustomSpinner,
  timeout: 10000,
  showTimeout: true,
  enableProgress: true,
  minDisplayTime: 500,
});
```

#### Hook使用

```typescript
import { useLoading, useAsyncLoading } from '@/components/shared/hoc/withLoading';

function MyComponent() {
  const { isLoading, setLoading, setProgress } = useLoading();

  const handleAsyncOperation = useAsyncLoading(async () => {
    // 异步操作
    await fetchData();
  });

  return (
    <div>
      <button onClick={handleAsyncOperation} disabled={isLoading}>
        {isLoading ? '加载中...' : '执行操作'}
      </button>
    </div>
  );
}
```

## 共享Hook

### useGameState

游戏状态管理Hook，提供统一的游戏状态管理功能。

#### 接口定义

```typescript
interface GameStateHookReturn {
  gameState: GameState | null;
  isLoading: boolean;
  error: string | null;
  updateGameState: (updates: Partial<GameState>) => Promise<void>;
  updatePhase: (phase: GamePhase) => Promise<void>;
  updatePlayerState: (
    playerId: string,
    updates: Partial<PlayerState>
  ) => Promise<void>;
  addGameEvent: (event: GameEvent) => Promise<void>;
  endGame: (
    winner: 'werewolf' | 'villager' | 'draw',
    reason: string
  ) => Promise<void>;
}
```

#### 使用方法

```typescript
import { useGameState } from '@/hooks/shared/useGameState';

function GameComponent() {
  const {
    gameState,
    isLoading,
    error,
    updateGameState,
    updatePhase,
    updatePlayerState,
    addGameEvent,
    endGame
  } = useGameState('game-123');

  const handlePhaseChange = async () => {
    await updatePhase('day_discussion');
  };

  const handlePlayerAction = async (playerId: string) => {
    await updatePlayerState(playerId, { isAlive: false });
  };

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h2>游戏状态: {gameState?.phase}</h2>
      <button onClick={handlePhaseChange}>切换阶段</button>
    </div>
  );
}
```

### useDataFetch

数据获取Hook，提供统一的数据获取、缓存和错误处理功能。

#### 接口定义

```typescript
interface DataFetchConfig<T> {
  url?: string;
  fetcher?: () => Promise<T>;
  cacheKey?: string;
  cacheTtl?: number;
  retryCount?: number;
  retryDelay?: number;
  enabled?: boolean;
  dependencies?: any[];
}

interface DataFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isValidating: boolean;
  lastFetchTime: number | null;
}
```

#### 使用方法

```typescript
import { useDataFetch, useSimpleFetch, useCachedFetch } from '@/hooks/shared/useDataFetch';

// 基本使用
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error, refetch } = useDataFetch({
    url: `/api/users/${userId}`,
    cacheKey: `user-${userId}`,
    cacheTtl: 300000, // 5分钟
    enabled: !!userId
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h2>{user?.name}</h2>
      <button onClick={refetch}>刷新</button>
    </div>
  );
}

// 简单获取
function SimpleComponent() {
  const { data, isLoading, error } = useSimpleFetch('/api/data');

  return <div>{data ? JSON.stringify(data) : '无数据'}</div>;
}

// 缓存获取
function CachedComponent() {
  const { data, isLoading, error } = useCachedFetch(
    'cached-data',
    () => fetchExpensiveData(),
    300000 // 5分钟缓存
  );

  return <div>{data ? '有缓存数据' : '无缓存数据'}</div>;
}
```

### useForm

表单管理Hook，提供统一的表单状态管理、验证和提交功能。

#### 接口定义

```typescript
interface FormConfig<T> {
  initialValues: T;
  validationRules?: Record<keyof T, ValidationRule[]>;
  onSubmit?: (values: T) => Promise<void> | void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  resetOnSubmit?: boolean;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}
```

#### 使用方法

```typescript
import { useForm } from '@/hooks/shared/useForm';

interface LoginForm {
  username: string;
  password: string;
}

function LoginComponent() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm
  } = useForm<LoginForm>({
    initialValues: {
      username: '',
      password: ''
    },
    validationRules: {
      username: [
        { type: 'required', message: '用户名不能为空' },
        { type: 'minLength', value: 3, message: '用户名至少3个字符' }
      ],
      password: [
        { type: 'required', message: '密码不能为空' },
        { type: 'minLength', value: 6, message: '密码至少6个字符' }
      ]
    },
    onSubmit: async (values) => {
      await login(values);
    },
    validateOnChange: true,
    validateOnBlur: true
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="用户名"
        />
        {touched.username && errors.username && (
          <span className="error">{errors.username}</span>
        )}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="密码"
        />
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? '登录中...' : '登录'}
      </button>
    </form>
  );
}
```

## 工具函数

### StateHelpers

状态管理辅助工具，提供状态历史记录、游戏阶段管理等功能。

#### StateHistoryManager

```typescript
import { StateHistoryManager } from '@/utils/common/stateHelpers';

// 创建状态历史管理器
const historyManager = new StateHistoryManager<GameState>({
  maxHistorySize: 100,
  enableCompression: true,
});

// 记录状态
historyManager.recordState(gameState, '游戏开始');

// 获取历史
const history = historyManager.getHistory();

// 撤销/重做
const previousState = historyManager.undo();
const nextState = historyManager.redo();
```

#### GamePhaseManager

```typescript
import { GamePhaseManager } from '@/utils/common/stateHelpers';

const phaseManager = new GamePhaseManager();

// 检查阶段转换
const canTransition = phaseManager.canTransition('waiting', 'night');

// 执行阶段转换
const transition = phaseManager.transition('night', 'day_discussion');

// 获取阶段信息
const phaseInfo = phaseManager.getPhaseInfo('night');
```

### CacheUtils

缓存管理工具，提供内存缓存和本地存储缓存功能。

#### MemoryCache

```typescript
import { MemoryCache } from '@/utils/common/cacheUtils';

// 创建内存缓存
const cache = new MemoryCache<UserData>({
  maxSize: 100,
  ttl: 300000, // 5分钟
});

// 设置缓存
cache.set('user-123', userData);

// 获取缓存
const userData = cache.get('user-123');

// 检查是否存在
const exists = cache.has('user-123');

// 删除缓存
cache.delete('user-123');

// 清空缓存
cache.clear();
```

#### LocalStorageCache

```typescript
import { LocalStorageCache } from '@/utils/common/cacheUtils';

// 创建本地存储缓存
const localCache = new LocalStorageCache<GameSettings>({
  prefix: 'game_',
  ttl: 86400000, // 24小时
});

// 使用方法与MemoryCache相同
localCache.set('settings', gameSettings);
const settings = localCache.get('settings');
```

#### 缓存装饰器

```typescript
import { cacheDecorator, asyncCacheDecorator } from '@/utils/common/cacheUtils';

class DataService {
  @cacheDecorator('user-data', 300000)
  getUserData(userId: string): UserData {
    // 获取用户数据的逻辑
    return fetchUserData(userId);
  }

  @asyncCacheDecorator('game-data', 600000)
  async getGameData(gameId: string): Promise<GameData> {
    // 异步获取游戏数据的逻辑
    return await fetchGameData(gameId);
  }
}
```

## 设计模式

### SkillFactory (工厂模式)

技能工厂模式，提供统一的技能创建和管理机制。

#### 使用方法

```typescript
import {
  skillFactory,
  SkillRegistration,
} from '@/patterns/factory/SkillFactory';

// 注册技能类
@SkillRegistration('werewolf_kill')
class WerewolfKillSkill implements Skill {
  execute(context: SkillContext): SkillResult {
    // 技能执行逻辑
  }
}

// 创建技能实例
const skill = skillFactory.createSkill('werewolf_kill', {
  level: 1,
  power: 100,
});

// 批量创建
const skills = skillFactory.createSkills(['werewolf_kill', 'seer_detect']);
```

### EventEmitter (观察者模式)

事件发射器，实现观察者模式，提供统一的事件订阅和发布机制。

#### 使用方法

```typescript
import {
  EventEmitter,
  globalEventEmitter,
} from '@/patterns/observer/EventEmitter';

// 创建事件发射器
const emitter = new EventEmitter();

// 订阅事件
emitter.on('gameStarted', gameData => {
  console.log('游戏开始:', gameData);
});

// 发布事件
emitter.emit('gameStarted', { gameId: '123', players: [] });

// 一次性订阅
emitter.once('gameEnded', result => {
  console.log('游戏结束:', result);
});

// 取消订阅
emitter.off('gameStarted', handler);

// 使用全局事件发射器
globalEventEmitter.emit('systemNotification', {
  type: 'info',
  message: '系统维护通知',
});
```

### ValidationStrategy (策略模式)

验证策略模式，提供可扩展的验证策略系统。

#### 使用方法

```typescript
import {
  defaultValidationManager,
  ValidationStrategyRegistration,
} from '@/patterns/strategy/ValidationStrategy';

// 注册自定义验证策略
@ValidationStrategyRegistration('custom-validation')
class CustomValidationStrategy extends BaseValidationStrategy {
  async validate(
    value: any,
    context?: ValidationContext
  ): Promise<ValidationResult> {
    // 自定义验证逻辑
    return {
      isValid: true,
      errors: [],
      warnings: [],
    };
  }
}

// 使用验证管理器
const result = await defaultValidationManager.validate(
  userData,
  'user-data-validation',
  { userId: '123' }
);

// 组合验证策略
const combinedResult = await defaultValidationManager.validateWithStrategies(
  formData,
  ['required-fields', 'format-validation', 'business-rules'],
  context
);
```

## 专业化服务

### SkillExecutionService

技能执行服务，负责处理所有技能相关的业务逻辑。

#### 使用方法

```typescript
import { skillExecutionService } from '@/services/SkillExecutionService';

// 执行技能
const result = await skillExecutionService.executeSkill('werewolf_kill', {
  executorId: 'player-1',
  executorRole: 'werewolf',
  targetId: 'player-2',
  gameId: 'game-123',
  gamePhase: 'night',
  timestamp: Date.now(),
});

// 获取技能冷却信息
const cooldown = skillExecutionService.getSkillCooldown(
  'werewolf_kill',
  'player-1'
);

// 获取技能使用统计
const stats = skillExecutionService.getSkillUsageStats(
  'werewolf_kill',
  'player-1'
);

// 监听技能执行事件
skillExecutionService.on('skillExecuted', result => {
  console.log('技能执行完成:', result);
});
```

### GameStateService

游戏状态服务，负责游戏状态的维护、同步和持久化。

#### 使用方法

```typescript
import { gameStateService } from '@/services/GameStateService';

// 创建游戏
const gameState = await gameStateService.createGame(
  'game-123',
  { mode: 'classic', maxPlayers: 8 },
  ['player-1', 'player-2', 'player-3']
);

// 更新游戏状态
await gameStateService.updateGameState('game-123', {
  phase: 'day_discussion',
});

// 更新玩家状态
await gameStateService.updatePlayerState('game-123', 'player-1', {
  isAlive: false,
});

// 添加游戏事件
await gameStateService.addGameEvent('game-123', {
  type: 'player_eliminated',
  playerId: 'player-1',
  timestamp: Date.now(),
});

// 结束游戏
await gameStateService.endGame('game-123', 'villager', '所有狼人被淘汰');
```

### ValidationService

验证服务，提供统一的验证逻辑和规则管理。

#### 使用方法

```typescript
import { validationService } from '@/services/ValidationService';

// 验证数据
const result = await validationService.validate(userData, 'userData', {
  userId: '123',
});

// 批量验证
const batchResult = await validationService.validateBatch([
  { id: '1', data: user1, validatorName: 'userData' },
  { id: '2', data: user2, validatorName: 'userData' },
]);

// 验证表单
const formResult = await validationService.validateForm(
  formData,
  'userRegistration'
);

// 验证API请求
const apiResult = await validationService.validateApiRequest(
  requestData,
  '/api/users',
  'POST'
);

// 注册自定义验证器
validationService.registerValidator({
  name: 'customValidator',
  validate: (value, context) => {
    // 自定义验证逻辑
    return { isValid: true, errors: [], warnings: [] };
  },
});
```

### NotificationService

通知服务，提供统一的消息推送、通知管理和用户提醒功能。

#### 使用方法

```typescript
import {
  notificationService,
  NotificationType,
  NotificationPriority,
  NotificationChannel,
} from '@/services/NotificationService';

// 发送通知
const notificationId = await notificationService.sendNotification({
  type: NotificationType.GAME,
  priority: NotificationPriority.HIGH,
  title: '游戏开始',
  content: '您的游戏即将开始，请准备',
  recipientId: 'user-123',
  channels: [NotificationChannel.IN_APP, NotificationChannel.BROWSER],
});

// 使用模板发送通知
await notificationService.sendNotificationFromTemplate(
  'game_started',
  'user-123',
  { gameId: 'game-123', role: 'werewolf' }
);

// 批量发送通知
await notificationService.sendBatchNotifications([
  { title: '通知1', content: '内容1', recipientId: 'user-1' },
  { title: '通知2', content: '内容2', recipientId: 'user-2' },
]);

// 获取用户通知
const notifications = notificationService.getUserNotifications('user-123', {
  unreadOnly: true,
  types: [NotificationType.GAME, NotificationType.SYSTEM],
});

// 标记为已读
await notificationService.markAsRead(notificationId);

// 监听通知事件
notificationService.on('inAppNotification', data => {
  // 显示应用内通知
  showToast(data.notification);
});
```

## 最佳实践

### 组件开发

1. **单一职责**：每个组件只负责一个功能
2. **可复用性**：设计可在多个场景使用的组件
3. **类型安全**：使用TypeScript确保类型安全
4. **错误处理**：使用错误边界处理组件错误
5. **性能优化**：合理使用memo、useMemo、useCallback

### Hook使用

1. **依赖管理**：正确设置useEffect依赖数组
2. **状态管理**：合理拆分状态，避免过度渲染
3. **副作用清理**：及时清理定时器、事件监听器等
4. **错误处理**：在Hook中处理异步操作的错误
5. **可测试性**：编写可测试的Hook逻辑

### 服务使用

1. **单例模式**：服务类使用单例模式，避免重复实例化
2. **事件驱动**：使用事件机制实现松耦合
3. **错误处理**：统一的错误处理和日志记录
4. **缓存策略**：合理使用缓存提高性能
5. **资源清理**：及时清理不需要的资源

### 性能优化

1. **懒加载**：按需加载组件和资源
2. **代码分割**：使用动态导入分割代码
3. **缓存策略**：合理使用各种缓存机制
4. **防抖节流**：对频繁操作进行防抖或节流
5. **虚拟化**：对大列表使用虚拟化技术

## 故障排除

### 常见问题

1. **组件不更新**：检查依赖数组和状态更新
2. **内存泄漏**：检查事件监听器和定时器清理
3. **类型错误**：检查TypeScript类型定义
4. **性能问题**：使用React DevTools分析性能
5. **缓存问题**：检查缓存键和过期时间

### 调试技巧

1. **使用React DevTools**：分析组件树和状态
2. **使用浏览器调试工具**：设置断点调试
3. **添加日志**：在关键位置添加console.log
4. **使用错误边界**：捕获和显示错误信息
5. **单元测试**：编写测试用例验证功能

## 更新日志

### v1.0.0 (2024-12-19)

- 初始版本发布
- 完成所有核心组件文档
- 添加使用示例和最佳实践
- 完善故障排除指南
