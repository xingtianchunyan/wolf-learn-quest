# 接口定义文档

## 概述

本文档描述了系统中所有的TypeScript接口定义。

## 接口列表

### PerformanceDashboardProps

**文件位置**: `src\components\admin\PerformanceDashboard.tsx`

**属性**:

- **autoRefresh** (可选): `boolean`

- **refreshInterval** (可选): `number`

- **showDetails** (可选): `boolean`

**完整定义**:

```typescript
interface PerformanceDashboardProps {
  /** 是否自动刷新数据 */
  autoRefresh?: boolean;
  /** 刷新间隔（毫秒） */
  refreshInterval?: number;
  /** 是否显示详细信息 */
  showDetails?: boolean;
}
```

---

### PerformanceSummary

**文件位置**: `src\components\admin\PerformanceDashboard.tsx`

**属性**:

- **overallHealth**: `'healthy' | 'warning' | 'critical'`

- **renderingHealth**: `'healthy' | 'warning' | 'critical'`

- **memoryHealth**: `'healthy' | 'warning' | 'critical'`

- **networkHealth**: `'healthy' | 'warning' | 'critical'`

- **activeAlerts**: `number`

- **recentMetrics**: `number`

**完整定义**:

```typescript
interface PerformanceSummary {
  /** 总体健康状态 */
  overallHealth: 'healthy' | 'warning' | 'critical';
  /** 渲染性能 */
  renderingHealth: 'healthy' | 'warning' | 'critical';
  /** 内存使用情况 */
  memoryHealth: 'healthy' | 'warning' | 'critical';
  /** 网络性能 */
  networkHealth: 'healthy' | 'warning' | 'critical';
  /** 活跃告警数量 */
  activeAlerts: number;
  /** 最近的指标数量 */
  recentMetrics: number;
}
```

---

### SkillSystemMonitorProps

**文件位置**: `src\components\admin\SkillSystemMonitor.tsx`

**属性**:

- **gameStateId** (可选): `string`

- **roomId** (可选): `string`

- **isJudge** (可选): `boolean`

**完整定义**:

```typescript
interface SkillSystemMonitorProps {
  gameStateId?: string;
  roomId?: string;
  isJudge?: boolean;
}
```

---

### SystemHealth

**文件位置**: `src\components\admin\SkillSystemMonitor.tsx`

**属性**:

- **overall**: `'healthy' | 'warning' | 'critical'`

- **database**: `'healthy' | 'warning' | 'critical'`

- **processing**: `'healthy' | 'warning' | 'critical'`

- **queue**: `'healthy' | 'warning' | 'critical'`

**完整定义**:

```typescript
interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical';
  database: 'healthy' | 'warning' | 'critical';
  processing: 'healthy' | 'warning' | 'critical';
  queue: 'healthy' | 'warning' | 'critical';
}
```

---

### PerformanceMetrics

**文件位置**: `src\components\admin\SkillSystemMonitor.tsx`

**属性**:

- **totalSkillUses**: `number`

- **activeEffects**: `number`

- **queuedEffects**: `number`

- **processingEffects**: `number`

- **completedEffects**: `number`

- **failedEffects**: `number`

- **averageProcessingTime**: `number`

- **errorRate**: `number`

**完整定义**:

```typescript
interface PerformanceMetrics {
  totalSkillUses: number;
  activeEffects: number;
  queuedEffects: number;
  processingEffects: number;
  completedEffects: number;
  failedEffects: number;
  averageProcessingTime: number;
  errorRate: number;
}
```

---

### ChatChannelSelectorProps

**文件位置**: `src\components\chat\ChatChannelSelector.tsx`

**属性**:

- **currentChannel**: `ChatChannel`

- **onChannelChange**: `(channel: ChatChannel) => void`

- **availableChannels**: `ChatChannel[]`

- **isGameRoom** (可选): `boolean`

**完整定义**:

```typescript
interface ChatChannelSelectorProps {
  currentChannel: ChatChannel;
  onChannelChange: (channel: ChatChannel) => void;
  availableChannels: ChatChannel[];
  isGameRoom?: boolean;
}
```

---

### ChatMessage

**文件位置**: `src\components\chat\ChatMessage.tsx`

**属性**:

- **id**: `string`

- **sender_id**: `string`

- **message**: `string`

- **created_at**: `string`

- **chat_type**: `string`

- **game_round** (可选): `number`

- **game_phase** (可选): `string`

- **sender_name** (可选): `string`

- **metadata** (可选): `{`

- **visibility** (可选): `any`

- **data** (可选): `any`

- **announcement_type** (可选): `string`

**完整定义**:

```typescript
interface ChatMessage {
id: string;
  sender_id: string;
  message: string;
  created_at: string;
  chat_type: string;
  game_round?: number;
  game_phase?: string;
  sender_name?: string;
  metadata?: {
    visibility?: any;
    data?: any;
    announcement_type?: string;
}
```

---

### ChatMessageProps

**文件位置**: `src\components\chat\ChatMessage.tsx`

**属性**:

- **message**: `ChatMessage`

- **currentUserId** (可选): `string`

- **gamePhase** (可选): `string`

- **gameRound** (可选): `number`

**完整定义**:

```typescript
interface ChatMessageProps {
  message: ChatMessage;
  currentUserId?: string;
  gamePhase?: string;
  gameRound?: number;
}
```

---

### MultiChannelChatProps

**文件位置**: `src\components\chat\MultiChannelChat.tsx`

**属性**:

- **roomId**: `string | null`

- **currentUser**: `any`

- **gamePhase** (可选): `string`

- **gameRound** (可选): `number`

- **userRole** (可选): `string`

- **isGameRoom** (可选): `boolean`

- **title** (可选): `string`

- **className** (可选): `string`

- **height** (可选): `string`

**完整定义**:

```typescript
interface MultiChannelChatProps {
  roomId: string | null;
  currentUser: any;
  gamePhase?: string;
  gameRound?: number;
  userRole?: string;
  isGameRoom?: boolean;
  title?: string;
  className?: string;
  height?: string;
}
```

---

### ErrorBoundaryConfig

**文件位置**: `src\components\common\hoc\withErrorBoundary.tsx`

**属性**:

- **showErrorDetails** (可选): `boolean`

- **allowRetry** (可选): `boolean`

- **customErrorMessage** (可选): `string`

- **onError** (可选): `(error: Error, errorInfo: React.ErrorInfo) => void`

- **onRecover** (可选): `() => void`

- **fallbackComponent** (可选): `ComponentType<ErrorFallbackProps>`

**完整定义**:

```typescript
interface ErrorBoundaryConfig {
  /** 是否显示错误详情 */
  showErrorDetails?: boolean;
  /** 是否允许重试 */
  allowRetry?: boolean;
  /** 自定义错误消息 */
  customErrorMessage?: string;
  /** 错误回调函数 */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** 恢复回调函数 */
  onRecover?: () => void;
  /** 自定义错误UI */
  fallbackComponent?: ComponentType<ErrorFallbackProps>;
}
```

---

### ErrorFallbackProps

**文件位置**: `src\components\common\hoc\withErrorBoundary.tsx`

**属性**:

- **error**: `Error`

- **errorInfo**: `React.ErrorInfo`

- **retry**: `() => void`

- **config**: `ErrorBoundaryConfig`

- **handlingResult** (可选): `ErrorHandlingResult`

**完整定义**:

```typescript
interface ErrorFallbackProps {
  /** 错误对象 */
  error: Error;
  /** 错误信息 */
  errorInfo: React.ErrorInfo;
  /** 重试函数 */
  retry: () => void;
  /** 配置选项 */
  config: ErrorBoundaryConfig;
  /** 错误处理结果 */
  handlingResult?: ErrorHandlingResult;
}
```

---

### ErrorBoundaryState

**文件位置**: `src\components\common\hoc\withErrorBoundary.tsx`

**属性**:

- **hasError**: `boolean`

- **error** (可选): `Error`

- **errorInfo** (可选): `React.ErrorInfo`

- **retryCount**: `number`

- **handlingResult** (可选): `ErrorHandlingResult`

**完整定义**:

```typescript
interface ErrorBoundaryState {
  /** 是否有错误 */
  hasError: boolean;
  /** 错误对象 */
  error?: Error;
  /** 错误信息 */
  errorInfo?: React.ErrorInfo;
  /** 重试次数 */
  retryCount: number;
  /** 错误处理结果 */
  handlingResult?: ErrorHandlingResult;
}
```

---

### LoadingConfig

**文件位置**: `src\components\common\hoc\withLoading.tsx`

**属性**:

- **loadingText** (可选): `string`

- **showLoadingText** (可选): `boolean`

- **iconSize** (可选): `number`

- **minLoadingTime** (可选): `number`

- **customLoadingComponent** (可选): `ComponentType<LoadingComponentProps>`

- **containerClassName** (可选): `string`

- **fullScreen** (可选): `boolean`

- **overlayOpacity** (可选): `number`

**完整定义**:

```typescript
interface LoadingConfig {
  /** 加载文本 */
  loadingText?: string;
  /** 是否显示加载文本 */
  showLoadingText?: boolean;
  /** 加载图标大小 */
  iconSize?: number;
  /** 最小加载时间（毫秒） */
  minLoadingTime?: number;
  /** 自定义加载组件 */
  customLoadingComponent?: ComponentType<LoadingComponentProps>;
  /** 加载容器样式类名 */
  containerClassName?: string;
  /** 是否全屏加载 */
  fullScreen?: boolean;
  /** 背景遮罩透明度 */
  overlayOpacity?: number;
}
```

---

### LoadingComponentProps

**文件位置**: `src\components\common\hoc\withLoading.tsx`

**属性**:

- **loadingText** (可选): `string`

- **showLoadingText** (可选): `boolean`

- **iconSize** (可选): `number`

- **containerClassName** (可选): `string`

- **fullScreen** (可选): `boolean`

- **overlayOpacity** (可选): `number`

**完整定义**:

```typescript
interface LoadingComponentProps {
  /** 加载文本 */
  loadingText?: string;
  /** 是否显示加载文本 */
  showLoadingText?: boolean;
  /** 加载图标大小 */
  iconSize?: number;
  /** 容器样式类名 */
  containerClassName?: string;
  /** 是否全屏加载 */
  fullScreen?: boolean;
  /** 背景遮罩透明度 */
  overlayOpacity?: number;
}
```

---

### WithLoadingProps

**文件位置**: `src\components\common\hoc\withLoading.tsx`

**属性**:

- **loading** (可选): `boolean`

- **loadingConfig** (可选): `LoadingConfig`

**完整定义**:

```typescript
interface WithLoadingProps {
  /** 是否正在加载 */
  loading?: boolean;
  /** 加载配置 */
  loadingConfig?: LoadingConfig;
}
```

---

### PermissionRule

**文件位置**: `src\components\common\hoc\withPermission.tsx`

**属性**:

- **type**: `PermissionType`

- **allowed** (可选): `any[]`

- **denied** (可选): `any[]`

- **validator** (可选): `(context: PermissionContext) => boolean | Promise<boolean>`

- **description** (可选): `string`

**完整定义**:

```typescript
interface PermissionRule {
  /** 权限类型 */
  type: PermissionType;
  /** 允许的值列表 */
  allowed?: any[];
  /** 禁止的值列表 */
  denied?: any[];
  /** 自定义验证函数 */
  validator?: (context: PermissionContext) => boolean | Promise<boolean>;
  /** 权限描述 */
  description?: string;
}
```

---

### PermissionContext

**文件位置**: `src\components\common\hoc\withPermission.tsx`

**属性**:

- **userId** (可选): `string`

- **userRole** (可选): `RoleType`

- **roleStatus** (可选): `RoleStatus`

- **gamePhase** (可选): `GamePhase`

- **gameId** (可选): `string`

- **isGameAdmin** (可选): `boolean`

- **customData** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface PermissionContext {
  /** 用户ID */
  userId?: string;
  /** 用户角色 */
  userRole?: RoleType;
  /** 角色状态 */
  roleStatus?: RoleStatus;
  /** 当前游戏阶段 */
  gamePhase?: GamePhase;
  /** 游戏ID */
  gameId?: string;
  /** 是否为游戏管理员 */
  isGameAdmin?: boolean;
  /** 自定义权限数据 */
  customData?: Record<string, any>;
}
```

---

### PermissionConfig

**文件位置**: `src\components\common\hoc\withPermission.tsx`

**属性**:

- **rules**: `PermissionRule[]`

- **mode** (可选): `'all' | 'any'`

- **showNoPermissionMessage** (可选): `boolean`

- **noPermissionComponent** (可选): `ComponentType<NoPermissionProps>`

- **onPermissionDenied** (可选): `(context: PermissionContext, failedRules: PermissionRule[]) => void`

- **skipInDevelopment** (可选): `boolean`

**完整定义**:

```typescript
interface PermissionConfig {
  /** 权限规则列表 */
  rules: PermissionRule[];
  /** 权限验证模式：'all' 表示所有规则都必须通过，'any' 表示任一规则通过即可 */
  mode?: 'all' | 'any';
  /** 是否显示无权限提示 */
  showNoPermissionMessage?: boolean;
  /** 自定义无权限组件 */
  noPermissionComponent?: ComponentType<NoPermissionProps>;
  /** 权限检查失败回调 */
  onPermissionDenied?: (
    context: PermissionContext,
    failedRules: PermissionRule[]
  ) => void;
  /** 是否在开发环境跳过权限检查 */
  skipInDevelopment?: boolean;
}
```

---

### NoPermissionProps

**文件位置**: `src\components\common\hoc\withPermission.tsx`

**属性**:

- **context**: `PermissionContext`

- **failedRules**: `PermissionRule[]`

- **config**: `PermissionConfig`

**完整定义**:

```typescript
interface NoPermissionProps {
  /** 权限上下文 */
  context: PermissionContext;
  /** 失败的权限规则 */
  failedRules: PermissionRule[];
  /** 权限配置 */
  config: PermissionConfig;
}
```

---

### WithPermissionProps

**文件位置**: `src\components\common\hoc\withPermission.tsx`

**属性**:

- **permissionContext** (可选): `PermissionContext`

- **permissionConfig** (可选): `Partial<PermissionConfig>`

**完整定义**:

```typescript
interface WithPermissionProps {
  /** 权限上下文 */
  permissionContext?: PermissionContext;
  /** 权限配置覆盖 */
  permissionConfig?: Partial<PermissionConfig>;
}
```

---

### BaseCardProps

**文件位置**: `src\components\core\BaseCard.tsx`

**属性**:

- **title**: `string`

- **icon** (可选): `React.ComponentType<{ className?: string`

**完整定义**:

```typescript
interface BaseCardProps {
title: string;
  icon?: React.ComponentType<{ className?: string
}
```

---

### LoadingSpinnerProps

**文件位置**: `src\components\core\LoadingSpinner.tsx`

**属性**:

- **size** (可选): `'sm' | 'md' | 'lg'`

- **text** (可选): `string`

- **className** (可选): `string`

**完整定义**:

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}
```

---

### PlayerAvatarProps

**文件位置**: `src\components\core\PlayerAvatar.tsx`

**属性**:

- **name**: `string`

- **avatarUrl** (可选): `string`

- **size** (可选): `'sm' | 'md' | 'lg'`

- **status** (可选): `'alive' | 'dead' | 'eliminated'`

- **className** (可选): `string`

**完整定义**:

```typescript
interface PlayerAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'alive' | 'dead' | 'eliminated';
  className?: string;
}
```

---

### StatusBadgeProps

**文件位置**: `src\components\core\StatusBadge.tsx`

**属性**:

- **status**: `string`

- **variant** (可选): `'default' | 'secondary' | 'destructive' | 'outline'`

- **className** (可选): `string`

**完整定义**:

```typescript
interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}
```

---

### ErrorBoundaryProps

**文件位置**: `src\components\error\ErrorBoundary.tsx`

**属性**:

- **children**: `ReactNode`

- **fallback** (可选): `ReactNode`

- **onError** (可选): `(error: Error, errorInfo: ErrorInfo) => void`

- **onRetry** (可选): `() => void`

- **maxRetries** (可选): `number`

- **componentName** (可选): `string`

- **enableAutoRecovery** (可选): `boolean`

- **autoRecoveryDelay** (可选): `number`

- **showUserFriendlyUI** (可选): `boolean`

**完整定义**:

```typescript
interface ErrorBoundaryProps {
  /** 子组件 */
  children: ReactNode;
  /** 降级组件 */
  fallback?: ReactNode;
  /** 错误回调 */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** 重试回调 */
  onRetry?: () => void;
  /** 最大重试次数 */
  maxRetries?: number;
  /** 组件名称 */
  componentName?: string;
  /** 是否启用自动恢复 */
  enableAutoRecovery?: boolean;
  /** 自动恢复延迟（毫秒） */
  autoRecoveryDelay?: number;
  /** 是否显示用户友好界面 */
  showUserFriendlyUI?: boolean;
}
```

---

### ErrorDisplayProps

**文件位置**: `src\components\error\ErrorDisplayComponent.tsx`

**属性**:

- **errorInfo**: `UserFriendlyErrorInfo`

- **config** (可选): `Partial<ErrorDisplayConfig>`

- **onClose** (可选): `() => void`

- **onRetry** (可选): `() => Promise<void>`

- **onFeedback** (可选): `(feedback: ErrorFeedback) => void`

- **onSolutionExecute** (可选): `(solutionId: string) => Promise<boolean>`

- **visible** (可选): `boolean`

- **className** (可选): `string`

**完整定义**:

```typescript
interface ErrorDisplayProps {
  /** 错误信息 */
  errorInfo: UserFriendlyErrorInfo;
  /** 展示配置 */
  config?: Partial<ErrorDisplayConfig>;
  /** 关闭回调 */
  onClose?: () => void;
  /** 重试回调 */
  onRetry?: () => Promise<void>;
  /** 反馈回调 */
  onFeedback?: (feedback: ErrorFeedback) => void;
  /** 解决方案执行回调 */
  onSolutionExecute?: (solutionId: string) => Promise<boolean>;
  /** 是否显示 */
  visible?: boolean;
  /** 自定义类名 */
  className?: string;
}
```

---

### AccessibilitySettings

**文件位置**: `src\components\game\accessibility\AccessibilityEnhancement.tsx`

**属性**:

- **theme**: `'light' | 'dark' | 'high-contrast' | 'auto'`

- **fontSize**: `number`

- **reducedMotion**: `boolean`

- **soundEnabled**: `boolean`

- **soundVolume**: `number`

- **voiceAnnouncements**: `boolean`

- **keyboardNavigation**: `boolean`

- **focusIndicators**: `boolean`

- **clickAreas**: `'normal' | 'large' | 'extra-large'`

- **gameInstructions**: `boolean`

- **tooltipsEnabled**: `boolean`

- **confirmActions**: `boolean`

**完整定义**:

```typescript
interface AccessibilitySettings {
  // 视觉设置
  theme: 'light' | 'dark' | 'high-contrast' | 'auto';
  fontSize: number;
  reducedMotion: boolean;

  // 听觉设置
  soundEnabled: boolean;
  soundVolume: number;
  voiceAnnouncements: boolean;

  // 交互设置
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  clickAreas: 'normal' | 'large' | 'extra-large';

  // 认知辅助
  gameInstructions: boolean;
  tooltipsEnabled: boolean;
  confirmActions: boolean;
}
```

---

### AccessibilityContextType

**文件位置**: `src\components\game\accessibility\AccessibilityEnhancement.tsx`

**属性**:

- **settings**: `AccessibilitySettings`

- **updateSetting**: `<K extends keyof AccessibilitySettings>(`

- **key**: `K,`

- **value**: `AccessibilitySettings[K]`

- **announceText**: `(text: string) => void`

- **isHighContrast**: `boolean`

**完整定义**:

```typescript
interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  announceText: (text: string) => void;
  isHighContrast: boolean;
}
```

---

### AccessibilityProviderProps

**文件位置**: `src\components\game\accessibility\AccessibilityEnhancement.tsx`

**属性**:

- **children**: `React.ReactNode`

**完整定义**:

```typescript
interface AccessibilityProviderProps {
  children: React.ReactNode;
}
```

---

### AccessibilityControlPanelProps

**文件位置**: `src\components\game\accessibility\AccessibilityEnhancement.tsx`

**属性**:

- **isOpen**: `boolean`

- **onClose**: `() => void`

**完整定义**:

```typescript
interface AccessibilityControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
```

---

### Player

**文件位置**: `src\components\game\displays\GamePlayerStatusDisplay.tsx`

**属性**:

- **id**: `string`

- **name**: `string`

- **avatar**: `string`

- **userId** (可选): `string`

**完整定义**:

```typescript
interface Player {
  id: string;
  name: string;
  avatar: string;
  userId?: string;
}
```

---

### GamePlayerStatusDisplayProps

**文件位置**: `src\components\game\displays\GamePlayerStatusDisplay.tsx`

**属性**:

- **players**: `Player[]`

- **roomId**: `string`

- **maxPlayers**: `number`

- **selectedTargetId** (可选): `string`

- **onTargetSelect** (可选): `(targetId: string) => void`

- **canSelectTargets** (可选): `boolean`

- **currentPhase** (可选): `number`

**完整定义**:

```typescript
interface GamePlayerStatusDisplayProps {
  players: Player[];
  roomId: string;
  maxPlayers: number;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
  canSelectTargets?: boolean;
  currentPhase?: number;
}
```

---

### GameStateDisplayProps

**文件位置**: `src\components\game\displays\GameStateDisplay.tsx`

**属性**:

- **roomId**: `string`

- **isJudge**: `boolean`

**完整定义**:

```typescript
interface GameStateDisplayProps {
  roomId: string;
  isJudge: boolean; // 移除默认值，强制上层传入
}
```

---

### RoleSkillInfoProps

**文件位置**: `src\components\game\displays\RoleSkillInfo.tsx`

**属性**:

- **roleName**: `string`

- **skillEffects** (可选): `SkillEffects`

- **roleAttributes** (可选): `RoleAttributes`

- **className** (可选): `string`

**完整定义**:

```typescript
interface RoleSkillInfoProps {
  roleName: string;
  skillEffects?: SkillEffects;
  roleAttributes?: RoleAttributes;
  className?: string;
}
```

---

### SkillEffectsDisplayProps

**文件位置**: `src\components\game\displays\SkillEffectsDisplay.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId**: `string`

- **players**: `Array<{ userId: string`

**完整定义**:

```typescript
interface SkillEffectsDisplayProps {
roomId: string;
  gameStateId: string;
  players: Array<{ userId: string; name: string; roleStatus: number
}
```

---

### FeedbackMessage

**文件位置**: `src\components\game\feedback\OperationFeedback.tsx`

**属性**:

- **id**: `string`

- **type**: `'success' | 'error' | 'warning' | 'info' | 'loading'`

- **title**: `string`

- **description** (可选): `string`

- **action** (可选): `string`

- **duration** (可选): `number`

- **progress** (可选): `number`

- **skillType** (可选): `string`

**完整定义**:

```typescript
interface FeedbackMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  title: string;
  description?: string;
  action?: string;
  duration?: number;
  progress?: number;
  skillType?: string;
}
```

---

### OperationFeedbackProps

**文件位置**: `src\components\game\feedback\OperationFeedback.tsx`

**属性**:

- **messages**: `FeedbackMessage[]`

- **onDismiss**: `(id: string) => void`

- **position** (可选): `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'`

**完整定义**:

```typescript
interface OperationFeedbackProps {
  messages: FeedbackMessage[];
  onDismiss: (id: string) => void;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center';
}
```

---

### EnhancedSkillManagerProps

**文件位置**: `src\components\game\interfaces\EnhancedSkillManager.tsx`

**属性**:

- **gameStateId**: `string`

- **roomId**: `string`

- **userId**: `string`

- **currentRound**: `number`

- **currentPhase**: `number`

- **isJudge**: `boolean`

- **roleDesign** (可选): `Tables<'role_design'> | null`

- **roleState** (可选): `Tables<'role_states'> | null`

**完整定义**:

```typescript
interface EnhancedSkillManagerProps {
  gameStateId: string;
  roomId: string;
  userId: string;
  currentRound: number;
  currentPhase: number;
  isJudge: boolean;
  roleDesign?: Tables<'role_design'> | null;
  roleState?: Tables<'role_states'> | null;
}
```

---

### WitchPotionState

**文件位置**: `src\components\game\interfaces\EnhancedSkillManager.tsx`

**属性**:

- **canUseProtection**: `boolean`

- **canUseAttack**: `boolean`

- **nightDeaths** (可选): `Array<{ userId: string`

**完整定义**:

```typescript
interface WitchPotionState {
canUseProtection: boolean;
  canUseAttack: boolean;
  nightDeaths?: Array<{ userId: string; reason: string; [key: string]: unknown
}
```

---

### GuardProtectionInterfaceProps

**文件位置**: `src\components\game\interfaces\GuardProtectionInterface.tsx`

**属性**:

- **onProtect**: `(playerId: string) => void`

- **availablePlayers**: `Array<{ userId: string`

**完整定义**:

```typescript
interface GuardProtectionInterfaceProps {
onProtect: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string
}
```

---

### HunterRevengeInterfaceProps

**文件位置**: `src\components\game\interfaces\HunterRevengeInterface.tsx`

**属性**:

- **onRevenge**: `(playerId: string) => void`

- **availablePlayers**: `Array<{ userId: string`

**完整定义**:

```typescript
interface HunterRevengeInterfaceProps {
onRevenge: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string
}
```

---

### NightSkillInterfaceProps

**文件位置**: `src\components\game\interfaces\NightSkillInterface.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId**: `string`

- **userId**: `string`

- **currentPhase**: `number`

- **currentRound**: `number`

- **roleState**: `Tables<'role_states'> | null`

- **roleDesign**: `Tables<'role_design'> | null`

- **players**: `Array<{`

- **userId**: `string`

- **name**: `string`

- **roleStatus**: `number`

- **isAlive**: `boolean`

**完整定义**:

```typescript
interface NightSkillInterfaceProps {
roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  currentRound: number;
  roleState: Tables<'role_states'> | null;
  roleDesign: Tables<'role_design'> | null;
  players: Array<{
    userId: string;
    name: string;
    roleStatus: number;
    isAlive: boolean;
}
```

---

### SeerInvestigationInterfaceProps

**文件位置**: `src\components\game\interfaces\SeerInvestigationInterface.tsx`

**属性**:

- **onInvestigate**: `(playerId: string) => void`

- **availablePlayers**: `Array<{ userId: string`

**完整定义**:

```typescript
interface SeerInvestigationInterfaceProps {
onInvestigate: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string
}
```

---

### SkillConflictResolverProps

**文件位置**: `src\components\game\interfaces\SkillConflictResolver.tsx`

**属性**:

- **gameStateId**: `string`

- **currentRound**: `number`

- **currentPhase**: `number`

- **isJudge**: `boolean`

- **onConflictResolved** (可选): `(conflictId: string) => void`

**完整定义**:

```typescript
interface SkillConflictResolverProps {
  gameStateId: string;
  currentRound: number;
  currentPhase: number;
  isJudge: boolean;
  onConflictResolved?: (conflictId: string) => void;
}
```

---

### UnifiedWitchSkillInterfaceProps

**文件位置**: `src\components\game\interfaces\UnifiedWitchSkillInterface.tsx`

**属性**:

- **gameStateId**: `string`

- **userId**: `string`

- **currentRound**: `number`

- **currentPhase**: `number`

- **canUseSkill**: `boolean`

- **onUseSkill**: `(skillData: any) => void`

- **availableTargets**: `Array<{ userId: string`

**完整定义**:

```typescript
interface UnifiedWitchSkillInterfaceProps {
gameStateId: string;
  userId: string;
  currentRound: number;
  currentPhase: number;
  canUseSkill: boolean;
  onUseSkill: (skillData: any) => void;
  availableTargets: Array<{ userId: string; name: string; roleStatus: number
}
```

---

### WolfKillInterfaceProps

**文件位置**: `src\components\game\interfaces\WolfKillInterface.tsx`

**属性**:

- **onKill**: `(playerId: string) => void`

- **availablePlayers**: `Array<{ userId: string`

**完整定义**:

```typescript
interface WolfKillInterfaceProps {
onKill: (playerId: string) => void;
  availablePlayers: Array<{ userId: string; name: string
}
```

---

### SkillData

**文件位置**: `src\components\game\optimized\AdvancedSkillAnalytics.tsx`

**属性**:

- **uses**: `Array<{`

- **skillName**: `string`

- **timestamp**: `number`

- **target** (可选): `string`

- **success**: `boolean`

- **duration** (可选): `number`

**完整定义**:

```typescript
interface SkillData {
uses: Array<{
    skillName: string;
    timestamp: number;
    target?: string;
    success: boolean;
    duration?: number;
}
```

---

### SkillStats

**文件位置**: `src\components\game\optimized\AdvancedSkillAnalytics.tsx`

**属性**:

- **totalUses**: `number`

- **activeEffects**: `number`

- **queuedEffects**: `number`

- **conflictCount**: `number`

- **successRate** (可选): `number`

- **averageDuration** (可选): `number`

**完整定义**:

```typescript
interface SkillStats {
  totalUses: number;
  activeEffects: number;
  queuedEffects: number;
  conflictCount: number;
  successRate?: number;
  averageDuration?: number;
}
```

---

### AdvancedSkillAnalyticsProps

**文件位置**: `src\components\game\optimized\AdvancedSkillAnalytics.tsx`

**属性**:

- **skillData**: `SkillData`

- **stats**: `SkillStats`

- **performanceState**: `ComponentPerformanceState`

- **timeRange** (可选): `number`

- **showDetailedAnalysis** (可选): `boolean`

**完整定义**:

```typescript
interface AdvancedSkillAnalyticsProps {
  /** 技能数据 */
  skillData: SkillData;
  /** 技能统计 */
  stats: SkillStats;
  /** 性能状态 */
  performanceState: ComponentPerformanceState;
  /** 时间范围（小时） */
  timeRange?: number;
  /** 是否显示详细分析 */
  showDetailedAnalysis?: boolean;
}
```

---

### AnalysisResult

**文件位置**: `src\components\game\optimized\AdvancedSkillAnalytics.tsx`

**属性**:

- **efficiency**: `{`

- **score**: `number`

- **grade**: `string`

- **description**: `string`

**完整定义**:

```typescript
interface AnalysisResult {
efficiency: {
    score: number;
    grade: string;
    description: string;
}
```

---

### TimeSlotStats

**文件位置**: `src\components\game\optimized\AdvancedSkillAnalytics.tsx`

**属性**:

- **hour**: `number`

- **uses**: `number`

- **successRate**: `number`

- **averageDuration**: `number`

**完整定义**:

```typescript
interface TimeSlotStats {
  hour: number;
  uses: number;
  successRate: number;
  averageDuration: number;
}
```

---

### EffectTypeStats

**文件位置**: `src\components\game\optimized\AdvancedSkillAnalytics.tsx`

**属性**:

- **type**: `string`

- **count**: `number`

- **successRate**: `number`

- **averageDuration**: `number`

- **percentage**: `number`

**完整定义**:

```typescript
interface EffectTypeStats {
  type: string;
  count: number;
  successRate: number;
  averageDuration: number;
  percentage: number;
}
```

---

### OptimizedEnhancedSkillPanelProps

**文件位置**: `src\components\game\optimized\OptimizedEnhancedSkillPanel.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId** (可选): `string`

- **userId** (可选): `string`

- **roleDesign**: `RoleDesign`

- **roleState**: `any`

- **currentPhase**: `string`

- **currentRound**: `number`

- **isJudge** (可选): `boolean`

- **availableTargets**: `Player[]`

- **gameState** (可选): `GameState`

- **performanceConfig** (可选): `{`

- **enableMonitoring**: `boolean`

- **enableOptimization**: `boolean`

- **renderThreshold**: `number`

- **memoryThreshold**: `number`

**完整定义**:

```typescript
interface OptimizedEnhancedSkillPanelProps {
/** 房间ID */
  roomId: string;
  /** 游戏状态ID */
  gameStateId?: string;
  /** 用户ID */
  userId?: string;
  /** 角色设计配置 */
  roleDesign: RoleDesign;
  /** 角色状态 */
  roleState: any;
  /** 当前阶段 */
  currentPhase: string;
  /** 当前轮次 */
  currentRound: number;
  /** 是否为法官 */
  isJudge?: boolean;
  /** 可用目标列表 */
  availableTargets: Player[];
  /** 游戏状态 */
  gameState?: GameState;
  /** 性能监控配置 */
  performanceConfig?: {
    enableMonitoring: boolean;
    enableOptimization: boolean;
    renderThreshold: number;
    memoryThreshold: number;
}
```

---

### ComponentPerformanceState

**文件位置**: `src\components\game\optimized\OptimizedEnhancedSkillPanel.tsx`

**属性**:

- **renderCount**: `number`

- **lastRenderTime**: `number`

- **averageRenderTime**: `number`

- **memoryUsage**: `number`

- **cacheHitRate**: `number`

- **subscriptionCount**: `number`

- **isOptimized**: `boolean`

**完整定义**:

```typescript
interface ComponentPerformanceState {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  subscriptionCount: number;
  isOptimized: boolean;
}
```

---

### CacheStrategy

**文件位置**: `src\components\game\optimized\OptimizedEnhancedSkillPanel.tsx`

**属性**:

- **skillConfig**: `{ ttl: number`

**完整定义**:

```typescript
interface CacheStrategy {
skillConfig: { ttl: number; priority: 'high'
}
```

---

### CacheStats

**文件位置**: `src\components\game\optimized\PerformanceMonitor.tsx`

**属性**:

- **size**: `number`

- **hitRate**: `number`

**完整定义**:

```typescript
interface CacheStats {
  size: number;
  hitRate: number;
}
```

---

### PerformanceMonitorProps

**文件位置**: `src\components\game\optimized\PerformanceMonitor.tsx`

**属性**:

- **performanceState**: `ComponentPerformanceState`

- **cacheStats**: `CacheStats`

- **onOptimize** (可选): `() => void`

- **showDetails** (可选): `boolean`

- **updateInterval** (可选): `number`

- **thresholds** (可选): `{`

- **renderTime**: `number`

- **memoryUsage**: `number`

- **cacheHitRate**: `number`

**完整定义**:

```typescript
interface PerformanceMonitorProps {
/** 性能状态数据 */
  performanceState: ComponentPerformanceState;
  /** 缓存统计信息 */
  cacheStats: CacheStats;
  /** 优化回调函数 */
  onOptimize?: () => void;
  /** 是否显示详细信息 */
  showDetails?: boolean;
  /** 更新间隔（毫秒） */
  updateInterval?: number;
  /** 性能阈值配置 */
  thresholds?: {
    renderTime: number;
    memoryUsage: number;
    cacheHitRate: number;
}
```

---

### PerformanceDataPoint

**文件位置**: `src\components\game\optimized\PerformanceMonitor.tsx`

**属性**:

- **timestamp**: `number`

- **renderTime**: `number`

- **memoryUsage**: `number`

- **cacheHitRate**: `number`

- **subscriptionCount**: `number`

**完整定义**:

```typescript
interface PerformanceDataPoint {
  timestamp: number;
  renderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  subscriptionCount: number;
}
```

---

### PerformanceWarning

**文件位置**: `src\components\game\optimized\PerformanceMonitor.tsx`

**属性**:

- **id**: `string`

- **type**: `'error' | 'warning' | 'info'`

- **message**: `string`

- **suggestion**: `string`

- **timestamp**: `number`

**完整定义**:

```typescript
interface PerformanceWarning {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
  timestamp: number;
}
```

---

### OptimizationSuggestion

**文件位置**: `src\components\game\optimized\PerformanceMonitor.tsx`

**属性**:

- **id**: `string`

- **category**: `'rendering' | 'memory' | 'cache' | 'subscription'`

- **title**: `string`

- **description**: `string`

- **impact**: `'high' | 'medium' | 'low'`

- **effort**: `'easy' | 'medium' | 'hard'`

- **action** (可选): `() => void`

**完整定义**:

```typescript
interface OptimizationSuggestion {
  id: string;
  category: 'rendering' | 'memory' | 'cache' | 'subscription';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  action?: () => void;
}
```

---

### SkillEffect

**文件位置**: `src\components\game\optimized\SkillEffectsVirtualList.tsx`

**属性**:

- **id**: `string`

- **effectType**: `string`

- **isActive**: `boolean`

- **remainingTime**: `number`

- **maxTime**: `number`

- **stackCount** (可选): `number`

- **targetName** (可选): `string`

- **description** (可选): `string`

- **priority** (可选): `'high' | 'medium' | 'low'`

- **metadata** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface SkillEffect {
  id: string;
  effectType: string;
  isActive: boolean;
  remainingTime: number;
  maxTime: number;
  stackCount?: number;
  targetName?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  metadata?: Record<string, any>;
}
```

---

### SkillEffectsVirtualListProps

**文件位置**: `src\components\game\optimized\SkillEffectsVirtualList.tsx`

**属性**:

- **effects**: `SkillEffect[]`

- **getEffectIcon**: `(effectType: string) => JSX.Element`

- **itemHeight** (可选): `number`

- **containerHeight** (可选): `number`

- **bufferSize** (可选): `number`

- **enableAnimation** (可选): `boolean`

- **enablePerformanceMonitoring** (可选): `boolean`

- **onEffectClick** (可选): `(effect: SkillEffect) => void`

**完整定义**:

```typescript
interface SkillEffectsVirtualListProps {
  /** 技能效果列表 */
  effects: SkillEffect[];
  /** 获取效果图标的函数 */
  getEffectIcon: (effectType: string) => JSX.Element;
  /** 项目高度（默认80px） */
  itemHeight?: number;
  /** 容器高度（默认400px） */
  containerHeight?: number;
  /** 缓冲区大小（默认5） */
  bufferSize?: number;
  /** 是否启用动画 */
  enableAnimation?: boolean;
  /** 是否启用性能监控 */
  enablePerformanceMonitoring?: boolean;
  /** 点击效果项的回调 */
  onEffectClick?: (effect: SkillEffect) => void;
}
```

---

### VirtualizationState

**文件位置**: `src\components\game\optimized\SkillEffectsVirtualList.tsx`

**属性**:

- **scrollTop**: `number`

- **startIndex**: `number`

- **endIndex**: `number`

- **visibleItems**: `SkillEffect[]`

- **totalHeight**: `number`

- **itemHeights**: `Map<string, number>`

**完整定义**:

```typescript
interface VirtualizationState {
  scrollTop: number;
  startIndex: number;
  endIndex: number;
  visibleItems: SkillEffect[];
  totalHeight: number;
  itemHeights: Map<string, number>;
}
```

---

### PerformanceMonitoringState

**文件位置**: `src\components\game\optimized\SkillEffectsVirtualList.tsx`

**属性**:

- **renderCount**: `number`

- **averageRenderTime**: `number`

- **scrollEventCount**: `number`

- **memoryUsage**: `number`

- **lastOptimizationTime**: `number`

**完整定义**:

```typescript
interface PerformanceMonitoringState {
  renderCount: number;
  averageRenderTime: number;
  scrollEventCount: number;
  memoryUsage: number;
  lastOptimizationTime: number;
}
```

---

### EnhancedSkillPanelProps

**文件位置**: `src\components\game\panels\EnhancedSkillPanel.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId** (可选): `string`

- **userId** (可选): `string`

- **roleDesign**: `RoleDesign`

- **roleState**: `any`

- **currentPhase**: `string`

- **currentRound**: `number`

- **isJudge** (可选): `boolean`

- **availableTargets**: `Player[]`

- **gameState** (可选): `GameState`

**完整定义**:

```typescript
interface EnhancedSkillPanelProps {
  /** 房间ID */
  roomId: string;
  /** 游戏状态ID */
  gameStateId?: string;
  /** 用户ID */
  userId?: string;
  /** 角色设计配置 */
  roleDesign: RoleDesign;
  /** 角色状态 */
  roleState: any;
  /** 当前阶段 */
  currentPhase: string;
  /** 当前轮次 */
  currentRound: number;
  /** 是否为法官 */
  isJudge?: boolean;
  /** 可用目标列表 */
  availableTargets: Player[];
  /** 游戏状态 */
  gameState?: GameState;
}
```

---

### ComponentState

**文件位置**: `src\components\game\panels\EnhancedSkillPanel.tsx`

**属性**:

- **selectedTarget**: `string`

- **lastUpdateTime**: `number`

- **renderCount**: `number`

**完整定义**:

```typescript
interface ComponentState {
  selectedTarget: string;
  lastUpdateTime: number;
  renderCount: number;
}
```

---

### GameInfoPanelProps

**文件位置**: `src\components\game\panels\GameInfoPanel.tsx`

**属性**:

- **roomId**: `string`

- **selectedTargetId** (可选): `string`

- **onTargetSelect** (可选): `(targetId: string) => void`

- **canSelectTargets** (可选): `boolean`

**完整定义**:

```typescript
interface GameInfoPanelProps {
  roomId: string;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
  canSelectTargets?: boolean;
}
```

---

### GameSettingsPanelProps

**文件位置**: `src\components\game\panels\GameSettingsPanel.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface GameSettingsPanelProps {
  roomId: string;
}
```

---

### GameSkillPanelProps

**文件位置**: `src\components\game\panels\GameSkillPanel.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId**: `string`

- **userId**: `string`

- **currentPhase**: `number`

- **roleState**: `Tables<'role_states'> | null`

- **roleDesign**: `Tables<'role_design'> | null`

- **players** (可选): `Array<{`

- **userId**: `string`

- **name**: `string`

- **roleStatus** (可选): `number`

- **status** (可选): `string`

**完整定义**:

```typescript
interface GameSkillPanelProps {
roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  roleState: Tables<'role_states'> | null;
  roleDesign: Tables<'role_design'> | null;
  players?: Array<{
    userId: string;
    name: string;
    roleStatus?: number;
    status?: string;
}
```

---

### PlayerStatusManagerProps

**文件位置**: `src\components\game\panels\PlayerStatusManager.tsx`

**属性**:

- **players**: `Player[]`

- **roomId**: `string`

- **maxPlayers**: `number`

- **showDyingStatusOnly** (可选): `boolean`

- **allowedRoles** (可选): `string[]`

- **className** (可选): `string`

**完整定义**:

```typescript
interface PlayerStatusManagerProps {
  players: Player[];
  roomId: string;
  maxPlayers: number;
  showDyingStatusOnly?: boolean; // 是否只显示濒死状态变更
  allowedRoles?: string[]; // 允许查看状态变更的角色列表
  className?: string;
}
```

---

### RoleStatusPanelProps

**文件位置**: `src\components\game\panels\RoleStatusPanel.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface RoleStatusPanelProps {
  roomId: string;
}
```

---

### SkillSystemManagerProps

**文件位置**: `src\components\game\panels\SkillSystemManager.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId**: `string`

- **userId**: `string`

- **isJudge**: `boolean`

- **currentPhase**: `number`

- **roleState**: `Tables<'role_states'> | null`

- **roleDesign**: `Tables<'role_design'> | null`

- **players**: `Array<{ userId: string`

**完整定义**:

```typescript
interface SkillSystemManagerProps {
roomId: string;
  gameStateId: string;
  userId: string;
  isJudge: boolean;
  currentPhase: number;
  roleState: Tables<'role_states'> | null;
  roleDesign: Tables<'role_design'> | null;
  players: Array<{ userId: string; name: string; roleStatus: number
}
```

---

### SkillUsePanelProps

**文件位置**: `src\components\game\panels\SkillUsePanel.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId**: `string`

- **userId**: `string`

- **currentPhase**: `number`

- **roleState**: `Tables<'role_states'> | null`

- **roleDesign**: `Tables<'role_design'> | null`

- **players**: `Array<{ userId: string`

**完整定义**:

```typescript
interface SkillUsePanelProps {
roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  roleState: Tables<'role_states'> | null;
  roleDesign: Tables<'role_design'> | null;
  players: Array<{ userId: string; name: string; roleStatus: number
}
```

---

### Question

**文件位置**: `src\components\game\panels\StudentAnswerRecordPanel.tsx`

**属性**:

- **id**: `string`

- **question**: `string`

- **option_a**: `string`

- **option_b**: `string`

- **option_c**: `string`

- **option_d**: `string`

- **correct_option**: `number`

**完整定义**:

```typescript
interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
}
```

---

### StudentAnswerRecordPanelProps

**文件位置**: `src\components\game\panels\StudentAnswerRecordPanel.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface StudentAnswerRecordPanelProps {
  roomId: string;
}
```

---

### PlayerAnswer

**文件位置**: `src\components\game\panels\StudentAnswerRecordPanel.tsx`

**属性**:

- **selectedOption**: `number | null`

- **responseTime**: `number | null`

- **isCorrect**: `boolean | null`

**完整定义**:

```typescript
interface PlayerAnswer {
  selectedOption: number | null;
  responseTime: number | null;
  isCorrect: boolean | null;
}
```

---

### AnswerRecord

**文件位置**: `src\components\game\panels\StudentAnswerRecordPanel.tsx`

**属性**:

- **round**: `number`

- **phase**: `string`

- **questionText**: `string`

- **answer**: `PlayerAnswer`

**完整定义**:

```typescript
interface AnswerRecord {
  round: number;
  phase: string;
  questionText: string;
  answer: PlayerAnswer;
}
```

---

### RoomQuestion

**文件位置**: `src\components\game\panels\StudentSystemPanel.tsx`

**属性**:

- **id**: `string`

- **room_id**: `string`

- **question_id**: `string`

- **question_order**: `number`

- **questions**: `Question`

**完整定义**:

```typescript
interface RoomQuestion {
  id: string;
  room_id: string;
  question_id: string;
  question_order: number;
  questions: Question;
}
```

---

### StudentSystemPanelProps

**文件位置**: `src\components\game\panels\StudentSystemPanel.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface StudentSystemPanelProps {
  roomId: string;
}
```

---

### VotingSystemManagerProps

**文件位置**: `src\components\game\panels\VotingSystemManager.tsx`

**属性**:

- **roomId**: `string`

- **isJudge**: `boolean`

**完整定义**:

```typescript
interface VotingSystemManagerProps {
  roomId: string;
  isJudge: boolean; // 移除默认值，强制上层传入
}
```

---

### SkillConflict

**文件位置**: `src\components\game\skill\SkillConflictVisualization.tsx`

**属性**:

- **id**: `string`

- **conflictingSkills**: `Array<{`

- **skillName**: `string`

- **userId**: `string`

- **userName**: `string`

- **priority**: `number`

- **targetUserId** (可选): `string`

- **targetUserName** (可选): `string`

**完整定义**:

```typescript
interface SkillConflict {
id: string;
  conflictingSkills: Array<{
    skillName: string;
    userId: string;
    userName: string;
    priority: number;
    targetUserId?: string;
    targetUserName?: string;
}
```

---

### SkillConflictVisualizationProps

**文件位置**: `src\components\game\skill\SkillConflictVisualization.tsx`

**属性**:

- **conflicts**: `SkillConflict[]`

- **onResolveConflict**: `(conflictId: string, resolution: any) => void`

- **gamePhase**: `string`

- **isJudge**: `boolean`

**完整定义**:

```typescript
interface SkillConflictVisualizationProps {
  conflicts: SkillConflict[];
  onResolveConflict: (conflictId: string, resolution: any) => void;
  gamePhase: string;
  isJudge: boolean;
}
```

---

### GameState

**文件位置**: `src\components\game\smart-hints\SmartHintSystem.tsx`

**属性**:

- **phase**: `'day' | 'evening' | 'night' | 'dawn'`

- **round**: `number`

- **timeRemaining**: `number`

- **players**: `Array<{`

- **id**: `string`

- **name**: `string`

- **role**: `string`

- **status**: `'alive' | 'dying' | 'dead'`

- **isReady**: `boolean`

**完整定义**:

```typescript
interface GameState {
phase: 'day' | 'evening' | 'night' | 'dawn';
  round: number;
  timeRemaining: number;
  players: Array<{
    id: string;
    name: string;
    role: string;
    status: 'alive' | 'dying' | 'dead';
    isReady: boolean;
}
```

---

### SmartHint

**文件位置**: `src\components\game\smart-hints\SmartHintSystem.tsx`

**属性**:

- **id**: `string`

- **type**: `'strategy' | 'timing' | 'warning' | 'opportunity' | 'tutorial'`

- **priority**: `'high' | 'medium' | 'low'`

- **title**: `string`

- **description**: `string`

- **action** (可选): `string`

- **actionLabel** (可选): `string`

- **dismissible**: `boolean`

- **autoExpire** (可选): `number`

- **conditions** (可选): `string[]`

**完整定义**:

```typescript
interface SmartHint {
  id: string;
  type: 'strategy' | 'timing' | 'warning' | 'opportunity' | 'tutorial';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: string;
  actionLabel?: string;
  dismissible: boolean;
  autoExpire?: number;
  conditions?: string[];
}
```

---

### SmartHintSystemProps

**文件位置**: `src\components\game\smart-hints\SmartHintSystem.tsx`

**属性**:

- **gameState**: `GameState`

- **onHintAction** (可选): `(hintId: string, action: string) => void`

- **onDismissHint** (可选): `(hintId: string) => void`

- **userExperience**: `'beginner' | 'intermediate' | 'expert'`

- **showTutorialHints**: `boolean`

**完整定义**:

```typescript
interface SmartHintSystemProps {
  gameState: GameState;
  onHintAction?: (hintId: string, action: string) => void;
  onDismissHint?: (hintId: string) => void;
  userExperience: 'beginner' | 'intermediate' | 'expert';
  showTutorialHints: boolean;
}
```

---

### StudentPreviousQuestionDisplayProps

**文件位置**: `src\components\game\student\StudentPreviousQuestionDisplay.tsx`

**属性**:

- **previousQuestion**: `Question`

**完整定义**:

```typescript
interface StudentPreviousQuestionDisplayProps {
  previousQuestion: Question;
}
```

---

### StudentQuestionDisplayProps

**文件位置**: `src\components\game\student\StudentQuestionDisplay.tsx`

**属性**:

- **currentQuestion**: `Question`

- **selectedOption**: `number | null`

- **hasSubmitted**: `boolean`

- **loading**: `boolean`

- **timeIsUp**: `boolean`

- **onOptionClick**: `(optionNumber: number) => void`

**完整定义**:

```typescript
interface StudentQuestionDisplayProps {
  currentQuestion: Question;
  selectedOption: number | null;
  hasSubmitted: boolean;
  loading: boolean;
  timeIsUp: boolean;
  onOptionClick: (optionNumber: number) => void;
}
```

---

### StudentQuestionNotFoundProps

**文件位置**: `src\components\game\student\StudentQuestionNotFound.tsx`

**属性**:

- **roundNumber**: `number`

- **phaseName**: `string`

- **expectedQuestionIndex**: `number`

- **totalQuestions**: `number`

**完整定义**:

```typescript
interface StudentQuestionNotFoundProps {
  roundNumber: number;
  phaseName: string;
  expectedQuestionIndex: number;
  totalQuestions: number;
}
```

---

### StudentTimerDisplayProps

**文件位置**: `src\components\game\student\StudentTimerDisplay.tsx`

**属性**:

- **showTimer**: `boolean`

- **timeIsUp**: `boolean`

- **timeRemaining**: `number`

- **formatTime**: `(seconds: number) => string`

- **isAnsweringPhase**: `boolean`

- **gameState**: `any`

**完整定义**:

```typescript
interface StudentTimerDisplayProps {
  showTimer: boolean;
  timeIsUp: boolean;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  isAnsweringPhase: boolean;
  gameState: any; // 保持原有类型
}
```

---

### FeatureCardProps

**文件位置**: `src\components\home\FeatureCard.tsx`

**属性**:

- **title**: `string`

- **description**: `string`

- **icon**: `LucideIcon`

**完整定义**:

```typescript
interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}
```

---

### AnswerRecordPanelProps

**文件位置**: `src\components\judge\management\AnswerRecordPanel.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface AnswerRecordPanelProps {
  roomId: string;
}
```

---

### JudgeActionPanelProps

**文件位置**: `src\components\judge\management\JudgeActionPanel.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface JudgeActionPanelProps {
  roomId: string;
}
```

---

### ManualQuestionEditorProps

**文件位置**: `src\components\judge\management\ManualQuestionEditor.tsx`

**属性**:

- **manualQuestion**: `ManualQuestionForm`

- **onUpdateQuestion**: `(updates: Partial<ManualQuestionForm>) => void`

- **onSubmit**: `() => void`

**完整定义**:

```typescript
interface ManualQuestionEditorProps {
  manualQuestion: ManualQuestionForm;
  onUpdateQuestion: (updates: Partial<ManualQuestionForm>) => void;
  onSubmit: () => void;
}
```

---

### PlayerStatusPanelProps

**文件位置**: `src\components\judge\management\PlayerStatusPanel.tsx`

**属性**:

- **roomId**: `string`

- **className** (可选): `string`

**完整定义**:

```typescript
interface PlayerStatusPanelProps {
  roomId: string;
  className?: string;
}
```

---

### PreparationPhaseDialogProps

**文件位置**: `src\components\judge\management\PreparationPhaseDialog.tsx`

**属性**:

- **isOpen**: `boolean`

- **onClose**: `() => void`

- **roomId**: `string`

**完整定义**:

```typescript
interface PreparationPhaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}
```

---

### QuestionBankDialogProps

**文件位置**: `src\components\judge\management\QuestionBankDialog.tsx`

**属性**:

- **isOpen**: `boolean`

- **onClose**: `() => void`

- **roomId**: `string`

**完整定义**:

```typescript
interface QuestionBankDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}
```

---

### QuestionBankPanelProps

**文件位置**: `src\components\judge\management\QuestionBankPanel.tsx`

**属性**:

- **className** (可选): `string`

- **roomId** (可选): `string`

**完整定义**:

```typescript
interface QuestionBankPanelProps {
  className?: string;
  roomId?: string;
}
```

---

### UploadedFile

**文件位置**: `src\components\judge\management\QuestionBankPanel.tsx`

**属性**:

- **id**: `string`

- **file_name**: `string`

- **file_path**: `string`

- **uploaded_at**: `string`

- **is_preprocessed** (可选): `boolean`

- **is_generated** (可选): `boolean`

**完整定义**:

```typescript
interface UploadedFile {
  id: string;
  file_name: string;
  file_path: string;
  uploaded_at: string;
  is_preprocessed?: boolean;
  is_generated?: boolean;
}
```

---

### PreprocessedFile

**文件位置**: `src\components\judge\management\QuestionBankPanel.tsx`

**属性**:

- **id**: `string`

- **file_name**: `string`

- **original_file_path**: `string`

- **created_at**: `string`

- **model_used**: `string`

- **is_generated** (可选): `boolean`

**完整定义**:

```typescript
interface PreprocessedFile {
  id: string;
  file_name: string;
  original_file_path: string;
  created_at: string;
  model_used: string;
  is_generated?: boolean;
}
```

---

### QuestionOrderEditorProps

**文件位置**: `src\components\judge\management\QuestionOrderEditor.tsx`

**属性**:

- **selectedQuestions**: `Question[]`

- **onDragEnd**: `(result: any) => void`

- **onLinkSystem**: `() => void`

- **isSystemLinked**: `boolean`

**完整定义**:

```typescript
interface QuestionOrderEditorProps {
  selectedQuestions: Question[];
  onDragEnd: (result: any) => void;
  onLinkSystem: () => void;
  isSystemLinked: boolean;
}
```

---

### QuestionPreviewProps

**文件位置**: `src\components\judge\management\QuestionPreview.tsx`

**属性**:

- **questions**: `Question[]`

- **selectedQuestions**: `Question[]`

- **currentIndex**: `number`

- **loading**: `boolean`

- **onIndexChange**: `(index: number) => void`

- **onToggleSelection**: `(question: Question) => void`

**完整定义**:

```typescript
interface QuestionPreviewProps {
  questions: Question[];
  selectedQuestions: Question[];
  currentIndex: number;
  loading: boolean;
  onIndexChange: (index: number) => void;
  onToggleSelection: (question: Question) => void;
}
```

---

### QuestionSourceListProps

**文件位置**: `src\components\judge\management\QuestionSourceList.tsx`

**属性**:

- **questionSources**: `QuestionSource[]`

- **selectedSources**: `string[]`

- **onToggleSource**: `(sourceId: string) => void`

- **onSelectAllFromSource**: `(sourceId: string) => void`

- **onRandomSelectAll**: `() => void`

- **onClearAllSelections**: `() => void`

**完整定义**:

```typescript
interface QuestionSourceListProps {
  questionSources: QuestionSource[];
  selectedSources: string[];
  onToggleSource: (sourceId: string) => void;
  onSelectAllFromSource: (sourceId: string) => void;
  onRandomSelectAll: () => void;
  onClearAllSelections: () => void;
}
```

---

### TeacherSystemPanelProps

**文件位置**: `src\components\judge\management\TeacherSystemPanel.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface TeacherSystemPanelProps {
  roomId: string;
}
```

---

### DyingStatusResolutionPanelProps

**文件位置**: `src\components\judge\monitoring\DyingStatusResolutionPanel.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId**: `string`

- **className** (可选): `string`

**完整定义**:

```typescript
interface DyingStatusResolutionPanelProps {
  roomId: string;
  gameStateId: string;
  className?: string;
}
```

---

### EnhancedGameStateDisplayProps

**文件位置**: `src\components\judge\monitoring\EnhancedGameStateDisplay.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface EnhancedGameStateDisplayProps {
  roomId: string;
}
```

---

### PlayerStatusDisplayProps

**文件位置**: `src\components\judge\monitoring\PlayerStatusDisplay.tsx`

**属性**:

- **players**: `Player[]`

- **roomId**: `string`

- **maxPlayers**: `number`

**完整定义**:

```typescript
interface PlayerStatusDisplayProps {
  players: Player[];
  roomId: string;
  maxPlayers: number;
}
```

---

### SkillSystemDashboardProps

**文件位置**: `src\components\judge\monitoring\SkillSystemDashboard.tsx`

**属性**:

- **gameStateId** (可选): `string`

- **roomId** (可选): `string`

- **isJudge** (可选): `boolean`

- **userId** (可选): `string`

**完整定义**:

```typescript
interface SkillSystemDashboardProps {
  gameStateId?: string;
  roomId?: string;
  isJudge?: boolean;
  userId?: string;
}
```

---

### QuestionSource

**文件位置**: `src\components\judge\types\questionBank.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **count**: `number`

- **type**: `'file' | 'manual'`

**完整定义**:

```typescript
interface QuestionSource {
  id: string;
  name: string;
  count: number;
  type: 'file' | 'manual';
}
```

---

### ManualQuestionForm

**文件位置**: `src\components\judge\types\questionBank.ts`

**属性**:

- **question**: `string`

- **option_a**: `string`

- **option_b**: `string`

- **option_c**: `string`

- **option_d**: `string`

- **correct_option**: `number`

- **explanation**: `string`

- **difficulty**: `number`

**完整定义**:

```typescript
interface ManualQuestionForm {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string;
  difficulty: number;
}
```

---

### LanguageContextType

**文件位置**: `src\components\layout\LanguageSwitcher.tsx`

**属性**:

- **language**: `string`

- **setLanguage**: `(code: string) => void`

- **t**: `(key: string) => string`

**完整定义**:

```typescript
interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}
```

---

### PageLayoutProps

**文件位置**: `src\components\layout\PageLayout.tsx`

**属性**:

- **children**: `React.ReactNode`

**完整定义**:

```typescript
interface PageLayoutProps {
  children: React.ReactNode;
}
```

---

### AvatarUploadProps

**文件位置**: `src\components\lobby\AvatarUpload.tsx`

**属性**:

- **avatarUrl**: `string | null`

- **playerName**: `string`

- **onAvatarUpdate**: `(url: string) => void`

**完整定义**:

```typescript
interface AvatarUploadProps {
  avatarUrl: string | null;
  playerName: string;
  onAvatarUpdate: (url: string) => void;
}
```

---

### LobbyActionButtonsProps

**文件位置**: `src\components\lobby\LobbyActionButtons.tsx`

**属性**:

- **handleCreateAIJudge**: `() => Promise<void>`

- **handleCreateRoom**: `() => Promise<void>`

- **currentUser**: `any`

- **isCreatingAIRoom**: `boolean`

- **isCreatingRoom**: `boolean`

- **playerRoom**: `{ roomDbId: string | null`

**完整定义**:

```typescript
interface LobbyActionButtonsProps {
handleCreateAIJudge: () => Promise<void>;
  handleCreateRoom: () => Promise<void>;
  currentUser: any;
  isCreatingAIRoom: boolean;
  isCreatingRoom: boolean;
  playerRoom: { roomDbId: string | null
}
```

---

### PlayerInfoProps

**文件位置**: `src\components\lobby\PlayerInfo.tsx`

**属性**:

- **className** (可选): `string`

- **currentUser**: `(User & { player_name?: string`

**完整定义**:

```typescript
interface PlayerInfoProps {
className?: string;
  currentUser: (User & { player_name?: string
}
```

---

### PlayerInfoPanelProps

**文件位置**: `src\components\lobby\PlayerInfoPanel.tsx`

**属性**:

- **currentUser**: `any`

- **playerRoom**: `{`

- **roomId**: `string | null`

- **roomDbId**: `string | null`

- **isLoading**: `boolean`

**完整定义**:

```typescript
interface PlayerInfoPanelProps {
currentUser: any;
  playerRoom: {
    roomId: string | null;
    roomDbId: string | null;
    isLoading: boolean;
}
```

---

### PlayerStatsProps

**文件位置**: `src\components\lobby\PlayerStats.tsx`

**属性**:

- **level**: `number`

- **experience**: `number`

- **wins**: `number`

- **losses**: `number`

**完整定义**:

```typescript
interface PlayerStatsProps {
  level: number;
  experience: number;
  wins: number;
  losses: number;
}
```

---

### GameRoom

**文件位置**: `src\components\lobby\RoomListTable.tsx`

**属性**:

- **id**: `string`

- **roomId**: `string`

- **name**: `string`

- **host**: `string`

- **players**: `number`

- **maxPlayers**: `number`

- **hasAI**: `boolean`

- **isPrivate**: `boolean`

- **status**: `string`

- **judgeUserId** (可选): `string`

- **judgeName** (可选): `string`

**完整定义**:

```typescript
interface GameRoom {
  id: string;
  roomId: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  hasAI: boolean;
  isPrivate: boolean;
  status: string;
  judgeUserId?: string;
  judgeName?: string;
}
```

---

### RoomListTableProps

**文件位置**: `src\components\lobby\RoomListTable.tsx`

**属性**:

- **gameRooms**: `GameRoom[]`

- **playerRoom**: `{ roomDbId: string | null`

**完整定义**:

```typescript
interface RoomListTableProps {
gameRooms: GameRoom[];
  playerRoom: { roomDbId: string | null
}
```

---

### PlayersListProps

**文件位置**: `src\components\room\PlayersList.tsx`

**属性**:

- **players**: `Player[]`

- **maxPlayers**: `number`

- **isReady**: `boolean`

- **allReady**: `boolean`

- **selectedCharacter**: `string | null`

- **loading**: `boolean`

- **onReadyToggle**: `() => void`

- **onLeaveRoom**: `() => void`

- **onStartGame**: `() => void`

- **onAddAIPlayer**: `() => void`

- **onMaxPlayersChange**: `(increment: number) => void`

- **onlinePlayers**: `string[]`

- **allPlayersSelectedRoles**: `boolean`

- **canSelectRoles**: `boolean`

- **currentPlayerHasSelectedRole** (可选): `boolean`

**完整定义**:

```typescript
interface PlayersListProps {
  players: Player[];
  maxPlayers: number;
  isReady: boolean;
  allReady: boolean;
  selectedCharacter: string | null;
  loading: boolean;
  onReadyToggle: () => void;
  onLeaveRoom: () => void;
  onStartGame: () => void;
  onAddAIPlayer: () => void;
  onMaxPlayersChange: (increment: number) => void;
  onlinePlayers: string[];
  allPlayersSelectedRoles: boolean;
  canSelectRoles: boolean;
  currentPlayerHasSelectedRole?: boolean; // 新增：当前玩家是否已选择角色
}
```

---

### RoleSelectionProps

**文件位置**: `src\components\room\RoleSelection.tsx`

**属性**:

- **maxPlayers**: `number`

- **currentPlayerCount**: `number`

- **selectedCharacter**: `string | null`

- **onCharacterSelect**: `(characterId: string | null) => void`

- **roomId**: `string`

- **currentPlayerId**: `string | null`

- **isReady**: `boolean`

**完整定义**:

```typescript
interface RoleSelectionProps {
  maxPlayers: number;
  currentPlayerCount: number;
  selectedCharacter: string | null;
  onCharacterSelect: (characterId: string | null) => void;
  roomId: string;
  currentPlayerId: string | null;
  isReady: boolean;
}
```

---

### RoomInfoCardProps

**文件位置**: `src\components\room\RoomInfoCard.tsx`

**属性**:

- **roomId**: `string`

**完整定义**:

```typescript
interface RoomInfoCardProps {
  roomId: string;
}
```

---

### RoomInfo

**文件位置**: `src\components\room\RoomInfoCard.tsx`

**属性**:

- **roomId**: `string`

- **hostPlayerId**: `string`

- **maxPlayers**: `number`

- **currentPlayers**: `number`

**完整定义**:

```typescript
interface RoomInfo {
  roomId: string;
  hostPlayerId: string;
  maxPlayers: number;
  currentPlayers: number;
}
```

---

### SkillProgressStep

**文件位置**: `src\components\ui\skill-progress-indicator.tsx`

**属性**:

- **id**: `string`

- **name**: `string`

- **status**: `'pending' | 'processing' | 'completed' | 'failed'`

- **duration** (可选): `number`

- **errorMessage** (可选): `string`

**完整定义**:

```typescript
interface SkillProgressStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  duration?: number;
  errorMessage?: string;
}
```

---

### SkillProgressIndicatorProps

**文件位置**: `src\components\ui\skill-progress-indicator.tsx`

**属性**:

- **skillName**: `string`

- **skillChineseName** (可选): `string`

- **steps**: `SkillProgressStep[]`

- **currentStep** (可选): `string`

- **showProgress** (可选): `boolean`

- **showStepDetails** (可选): `boolean`

- **onStepClick** (可选): `(stepId: string) => void`

- **className** (可选): `string`

**完整定义**:

```typescript
interface SkillProgressIndicatorProps {
  skillName: string;
  skillChineseName?: string;
  steps: SkillProgressStep[];
  currentStep?: string;
  showProgress?: boolean;
  showStepDetails?: boolean;
  onStepClick?: (stepId: string) => void;
  className?: string;
}
```

---

### EnhancedVotingManagerProps

**文件位置**: `src\components\voting\EnhancedVotingManager.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId** (可选): `string`

**完整定义**:

```typescript
interface EnhancedVotingManagerProps {
  roomId: string;
  gameStateId?: string;
}
```

---

### VotingPanelProps

**文件位置**: `src\components\voting\VotingPanel.tsx`

**属性**:

- **roomId**: `string`

- **gameStateId** (可选): `string`

- **currentPhase** (可选): `number`

- **currentRound** (可选): `number`

- **isJudge**: `boolean`

- **selectedTargetId** (可选): `string`

- **onTargetSelect** (可选): `(targetId: string) => void`

**完整定义**:

```typescript
interface VotingPanelProps {
  roomId: string;
  gameStateId?: string;
  currentPhase?: number;
  currentRound?: number;
  isJudge: boolean; // 移除默认值，强制上层传入
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
}
```

---

### APISecurityConfig

**文件位置**: `src\config\security.config.ts`

**属性**:

- **path**: `string`

- **methods**: `string[]`

- **securityLevel**: `SecurityLevel`

- **requireAuth**: `boolean`

- **requiredPermissions**: `Permission[]`

- **rateLimit**: `{`

- **maxRequests**: `number`

- **windowMs**: `number`

**完整定义**:

```typescript
interface APISecurityConfig {
path: string;
  methods: string[];
  securityLevel: SecurityLevel;
  requireAuth: boolean;
  requiredPermissions: Permission[];
  rateLimit: {
    maxRequests: number;
    windowMs: number;
}
```

---

### LinkedQuestion

**文件位置**: `src\contexts\JudgePageContext.tsx`

**属性**:

- **question_order**: `number`

- **question**: `Question`

- **room_question_id**: `string`

**完整定义**:

```typescript
interface LinkedQuestion {
  question_order: number; // 来自room_questions表
  question: Question; // 来自questions表的详细信息
  room_question_id: string; // room_questions表的id
}
```

---

### JudgePageContextType

**文件位置**: `src\contexts\JudgePageContext.tsx`

**属性**:

- **linkedQuestions**: `LinkedQuestion[] | null`

- **isSystemLinked**: `boolean`

- **refreshLinkedQuestions**: `() => Promise<void>`

- **saveLinkedQuestions**: `(questions: Question[]) => Promise<void>`

**完整定义**:

```typescript
interface JudgePageContextType {
  linkedQuestions: LinkedQuestion[] | null;
  isSystemLinked: boolean;
  refreshLinkedQuestions: () => Promise<void>;
  saveLinkedQuestions: (questions: Question[]) => Promise<void>;
}
```

---

### JudgePageProviderProps

**文件位置**: `src\contexts\JudgePageContext.tsx`

**属性**:

- **roomId**: `string`

- **children**: `React.ReactNode`

**完整定义**:

```typescript
interface JudgePageProviderProps {
  roomId: string;
  children: React.ReactNode;
}
```

---

### PermissionState

**文件位置**: `src\contexts\PermissionContext.tsx`

**属性**:

- **isJudge**: `boolean`

- **isRoomParticipant**: `boolean`

- **canVote**: `boolean`

- **canUseSkill**: `boolean`

- **canAnswerQuestions**: `boolean`

- **canChat**: `boolean`

- **loading**: `boolean`

**完整定义**:

```typescript
interface PermissionState {
  isJudge: boolean;
  isRoomParticipant: boolean;
  canVote: boolean;
  canUseSkill: boolean;
  canAnswerQuestions: boolean;
  canChat: boolean;
  loading: boolean;
}
```

---

### PermissionProviderProps

**文件位置**: `src\contexts\PermissionContext.tsx`

**属性**:

- **children**: `ReactNode`

- **roomId** (可选): `string`

**完整定义**:

```typescript
interface PermissionProviderProps {
  children: ReactNode;
  roomId?: string;
}
```

---

### EnhancedSkillUse

**文件位置**: `src\hooks\skill\useSkillData.ts`

**属性**:

- **id**: `string`

- **user_id**: `string`

- **game_state_id**: `string`

- **skill_name**: `string`

- **target_user_id** (可选): `string`

- **round_number**: `number`

- **phase**: `string`

- **skill_priority**: `number`

- **execution_status**: `string`

- **skill_effects**: `any`

- **conditions_met**: `any`

- **result** (可选): `any`

- **execution_time** (可选): `string`

- **failure_reason** (可选): `string`

- **created_at**: `string`

- **updated_at** (可选): `string`

- **chinese_name** (可选): `string`

- **skill_config** (可选): `any`

**完整定义**:

```typescript
interface EnhancedSkillUse {
  id: string;
  user_id: string;
  game_state_id: string;
  skill_name: string;
  target_user_id?: string;
  round_number: number;
  phase: string;
  skill_priority: number;
  execution_status: string;
  skill_effects: any;
  conditions_met: any;
  result?: any;
  execution_time?: string;
  failure_reason?: string;
  created_at: string;
  updated_at?: string;
  chinese_name?: string;
  skill_config?: any;
}
```

---

### UseSkillRealtimeParams

**文件位置**: `src\hooks\skill\useSkillRealtime.ts`

**属性**:

- **gameStateId** (可选): `string`

- **setSkillUses**: `React.Dispatch<React.SetStateAction<EnhancedSkillUse[]>>`

- **fetchAllSkillData**: `() => Promise<void>`

**完整定义**:

```typescript
interface UseSkillRealtimeParams {
  gameStateId?: string;
  setSkillUses: React.Dispatch<React.SetStateAction<EnhancedSkillUse[]>>;
  fetchAllSkillData: () => Promise<void>;
}
```

---

### SkillSystemStats

**文件位置**: `src\hooks\skill\useSkillStats.ts`

**属性**:

- **totalUses**: `number`

- **activeEffects**: `number`

- **queuedEffects**: `number`

- **completedEffects**: `number`

- **conflictCount**: `number`

- **userSkillCount**: `number`

**完整定义**:

```typescript
interface SkillSystemStats {
  totalUses: number;
  activeEffects: number;
  queuedEffects: number;
  completedEffects: number;
  conflictCount: number;
  userSkillCount: number;
}
```

---

### SkillSuggestion

**文件位置**: `src\hooks\skill\useSkillValidation.ts`

**属性**:

- **canUse**: `boolean`

- **suggestion**: `string`

- **priority**: `'high' | 'medium' | 'low'`

- **timing**: `string`

- **conflicts** (可选): `string[]`

**完整定义**:

```typescript
interface SkillSuggestion {
  canUse: boolean;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
  timing: string;
  conflicts?: string[];
}
```

---

### MinimalGameState

**文件位置**: `src\hooks\useAutoDyingStatusProcessor.ts`

**属性**:

- **id**: `string`

- **currentPhase**: `number`

- **currentRound**: `number`

**完整定义**:

```typescript
interface MinimalGameState {
  id: string;
  currentPhase: number;
  currentRound: number;
}
```

---

### AutoProcessingConfig

**文件位置**: `src\hooks\useAutoDyingStatusProcessor.ts`

**属性**:

- **enableProtectionResolution**: `boolean`

- **enableAnswerBasedResolution**: `boolean`

- **protectionDelay**: `number`

- **answerCheckDelay**: `number`

**完整定义**:

```typescript
interface AutoProcessingConfig {
  enableProtectionResolution: boolean;
  enableAnswerBasedResolution: boolean;
  protectionDelay: number; // 延迟时间(毫秒)
  answerCheckDelay: number; // 答题检查延迟(毫秒)
}
```

---

### CacheOptions

**文件位置**: `src\hooks\useDataCache.ts`

**属性**:

- **ttl** (可选): `number`

- **maxSize** (可选): `number`

- **enablePersistence** (可选): `boolean`

**完整定义**:

```typescript
interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum cache size
  enablePersistence?: boolean; // Enable localStorage persistence
}
```

---

### DyingPlayer

**文件位置**: `src\hooks\useDyingStatusManager.ts`

**属性**:

- **userId**: `string`

- **userName**: `string`

- **userAvatar** (可选): `string`

- **dyingReason** (可选): `string`

- **dyingRound** (可选): `number`

- **dyingPhase** (可选): `string`

- **statusEffects** (可选): `any`

**完整定义**:

```typescript
interface DyingPlayer {
  userId: string;
  userName: string;
  userAvatar?: string;
  dyingReason?: string;
  dyingRound?: number;
  dyingPhase?: string;
  statusEffects?: any;
}
```

---

### ErrorRecoveryStrategy

**文件位置**: `src\hooks\useEnhancedErrorHandler.ts`

**属性**:

- **retryAction** (可选): `() => Promise<void> | void`

- **fallbackAction** (可选): `() => Promise<void> | void`

- **refreshAction** (可选): `() => Promise<void> | void`

**完整定义**:

```typescript
interface ErrorRecoveryStrategy {
  retryAction?: () => Promise<void> | void;
  fallbackAction?: () => Promise<void> | void;
  refreshAction?: () => Promise<void> | void;
}
```

---

### GameSettings

**文件位置**: `src\hooks\useGameState.ts`

**属性**:

- **id**: `string`

- **roomId**: `string`

- **isAutoAdvance**: `boolean`

- **dayDuration**: `number`

- **eveningDuration**: `number`

- **nightDuration**: `number`

- **dawnDuration**: `number`

**完整定义**:

```typescript
interface GameSettings {
  id: string;
  roomId: string;
  isAutoAdvance: boolean;
  dayDuration: number;
  eveningDuration: number;
  nightDuration: number;
  dawnDuration: number;
}
```

---

### MemoryManagerOptions

**文件位置**: `src\hooks\useMemoryManager.ts`

**属性**:

- **componentName**: `string`

- **maxMemoryThreshold** (可选): `number`

- **checkInterval** (可选): `number`

- **enableAutoCleanup** (可选): `boolean`

**完整定义**:

```typescript
interface MemoryManagerOptions {
  componentName: string;
  maxMemoryThreshold?: number; // MB
  checkInterval?: number; // 毫秒
  enableAutoCleanup?: boolean;
}
```

---

### UseMultiChannelChatProps

**文件位置**: `src\hooks\useMultiChannelChat.ts`

**属性**:

- **roomId**: `string | null`

- **currentUser**: `any`

- **userRole** (可选): `string`

**完整定义**:

```typescript
interface UseMultiChannelChatProps {
  roomId: string | null;
  currentUser: any;
  userRole?: string;
}
```

---

### AnnouncementVisibility

**文件位置**: `src\hooks\useMultiChannelChat.ts`

**属性**:

- **isVisibleToJudge**: `boolean`

- **isVisibleToActor**: `boolean`

- **isVisibleToTarget**: `boolean`

- **isVisibleToWerewolves**: `boolean`

- **isVisibleToRescuers**: `boolean`

- **isVisibleToAll**: `boolean`

**完整定义**:

```typescript
interface AnnouncementVisibility {
  isVisibleToJudge: boolean;
  isVisibleToActor: boolean;
  isVisibleToTarget: boolean;
  isVisibleToWerewolves: boolean;
  isVisibleToRescuers: boolean;
  isVisibleToAll: boolean;
}
```

---

### SystemAnnouncementMetadata

**文件位置**: `src\hooks\useMultiChannelChat.ts`

**属性**:

- **visibility** (可选): `AnnouncementVisibility`

- **data** (可选): `{`

- **actorUserId** (可选): `string`

- **targetUserId** (可选): `string`

- **roomId** (可选): `string`

**完整定义**:

```typescript
interface SystemAnnouncementMetadata {
visibility?: AnnouncementVisibility;
  data?: {
    actorUserId?: string;
    targetUserId?: string;
    roomId?: string;
}
```

---

### QueryOptions

**文件位置**: `src\hooks\useOptimizedSupabaseQuery.ts`

**属性**:

- **enableCache** (可选): `boolean`

- **cacheTTL** (可选): `number`

- **enableRealtime** (可选): `boolean`

- **debounceMs** (可选): `number`

- **retryAttempts** (可选): `number`

- **retryDelay** (可选): `number`

**完整定义**:

```typescript
interface QueryOptions {
  enableCache?: boolean;
  cacheTTL?: number;
  enableRealtime?: boolean;
  debounceMs?: number;
  retryAttempts?: number;
  retryDelay?: number;
}
```

---

### UsePerformanceMonitoringOptions

**文件位置**: `src\hooks\usePerformanceMonitoring.ts`

**属性**:

- **componentName**: `string`

- **trackUserActions** (可选): `boolean`

- **trackPerformance** (可选): `boolean`

- **sampleRate** (可选): `number`

**完整定义**:

```typescript
interface UsePerformanceMonitoringOptions {
  componentName: string;
  trackUserActions?: boolean;
  trackPerformance?: boolean;
  sampleRate?: number; // 0-1, 采样率
}
```

---

### UsePerformanceOptimizationOptions

**文件位置**: `src\hooks\usePerformanceOptimizationNew.ts`

**属性**:

- **componentName**: `string`

- **enableMemoryTracking** (可选): `boolean`

- **enableRenderTracking** (可选): `boolean`

- **debounceTime** (可选): `number`

- **maxRenderThreshold** (可选): `number`

**完整定义**:

```typescript
interface UsePerformanceOptimizationOptions {
  componentName: string;
  enableMemoryTracking?: boolean;
  enableRenderTracking?: boolean;
  debounceTime?: number;
  maxRenderThreshold?: number;
}
```

---

### PermissionsState

**文件位置**: `src\hooks\usePermissions.ts`

**属性**:

- **isJudge**: `boolean`

- **isRoomParticipant**: `boolean`

- **loading**: `boolean`

**完整定义**:

```typescript
interface PermissionsState {
  isJudge: boolean;
  isRoomParticipant: boolean;
  loading: boolean;
}
```

---

### PlayerPresence

**文件位置**: `src\hooks\usePlayerPresence.ts`

**属性**:

- **user_id**: `string`

- **player_name**: `string`

- **online_at**: `string`

**完整定义**:

```typescript
interface PlayerPresence {
  user_id: string;
  player_name: string;
  online_at: string;
}
```

---

### PlayerRoomInfo

**文件位置**: `src\hooks\usePlayerRoom.ts`

**属性**:

- **roomId**: `string | null`

- **roomDbId**: `string | null`

- **isLoading**: `boolean`

**完整定义**:

```typescript
interface PlayerRoomInfo {
  roomId: string | null;
  roomDbId: string | null;
  isLoading: boolean;
}
```

---

### RoleSelection

**文件位置**: `src\hooks\useRoleSelection.ts`

**属性**:

- **id**: `string`

- **room_id**: `string`

- **user_id**: `string`

- **role_id**: `string`

- **selected_at**: `string`

- **role_design** (可选): `{`

- **id**: `string`

- **role_name**: `string`

- **faction**: `boolean`

- **role_description**: `string | null`

**完整定义**:

```typescript
interface RoleSelection {
id: string;
  room_id: string;
  user_id: string;
  role_id: string; // 现在是 uuid 类型，关联到 role_design.id
  selected_at: string;
  // 添加角色设计信息
  role_design?: {
    id: string;
    role_name: string;
    faction: boolean;
    role_description: string | null;
}
```

---

### RoleState

**文件位置**: `src\hooks\useRoleStates.ts`

**属性**:

- **id**: `string`

- **game_state_id**: `string`

- **room_id**: `string`

- **user_id**: `string`

- **role_id**: `string`

- **current_phase**: `number | null`

- **role_status**: `number`

- **skill_uses_remaining**: `any`

- **status_effects**: `any`

- **created_at**: `string`

- **updated_at**: `string`

**完整定义**:

```typescript
interface RoleState {
  id: string;
  game_state_id: string;
  room_id: string;
  user_id: string;
  role_id: string;
  current_phase: number | null;
  role_status: number;
  skill_uses_remaining: any;
  status_effects: any;
  created_at: string;
  updated_at: string;
}
```

---

### RoomAnswerRecord

**文件位置**: `src\hooks\useRoomAnswers.ts`

**属性**:

- **id**: `string`

- **room_id**: `string | null`

- **user_id**: `string | null`

- **role_id**: `string | null`

- **room_question_id**: `string | null`

- **question_order**: `number | null`

- **selected_option**: `number | null`

- **is_correct**: `boolean | null`

- **response_time**: `number | null`

- **created_at**: `string | null`

**完整定义**:

```typescript
interface RoomAnswerRecord {
  id: string;
  room_id: string | null;
  user_id: string | null;
  role_id: string | null;
  room_question_id: string | null;
  question_order: number | null;
  selected_option: number | null;
  is_correct: boolean | null;
  response_time: number | null;
  created_at: string | null;
}
```

---

### RoomRealtimeData

**文件位置**: `src\hooks\useRoomRealtime.ts`

**属性**:

- **maxPlayers**: `number`

- **status**: `string`

- **judge_user_id** (可选): `string | null`

- **lastUpdate**: `Date`

**完整定义**:

```typescript
interface RoomRealtimeData {
  maxPlayers: number;
  status: string;
  judge_user_id?: string | null;
  lastUpdate: Date;
}
```

---

### ProcessorStats

**文件位置**: `src\hooks\useSkillEffectAutoProcessor.ts`

**属性**:

- **totalProcessed**: `number`

- **successCount**: `number`

- **failureCount**: `number`

- **lastProcessTime**: `Date | null`

- **isRunning**: `boolean`

**完整定义**:

```typescript
interface ProcessorStats {
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  lastProcessTime: Date | null;
  isRunning: boolean;
}
```

---

### EffectProcessorStats

**文件位置**: `src\hooks\useSkillEffectProcessor.ts`

**属性**:

- **totalProcessed**: `number`

- **successCount**: `number`

- **failureCount**: `number`

- **lastProcessTime**: `Date | null`

- **processingStatus**: `'idle' | 'processing' | 'error'`

- **averageProcessTime**: `number`

**完整定义**:

```typescript
interface EffectProcessorStats {
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  lastProcessTime: Date | null;
  processingStatus: 'idle' | 'processing' | 'error';
  averageProcessTime: number;
}
```

---

### ProcessorConfig

**文件位置**: `src\hooks\useSkillEffectProcessor.ts`

**属性**:

- **autoProcess**: `boolean`

- **intervalMs**: `number`

- **batchSize**: `number`

- **retryAttempts**: `number`

- **enableLogging**: `boolean`

**完整定义**:

```typescript
interface ProcessorConfig {
  autoProcess: boolean;
  intervalMs: number;
  batchSize: number;
  retryAttempts: number;
  enableLogging: boolean;
}
```

---

### State

**文件位置**: `src\hooks\useToast.ts`

**属性**:

- **toasts**: `ToasterToast[]`

**完整定义**:

```typescript
interface State {
  toasts: ToasterToast[];
}
```

---

### UseUnifiedErrorHandlingOptions

**文件位置**: `src\hooks\useUnifiedErrorHandling.ts`

**属性**:

- **componentName** (可选): `string`

- **defaultContext** (可选): `Partial<ErrorContext>`

- **defaultOptions** (可选): `Partial<ErrorHandlingOptions>`

- **autoNotify** (可选): `boolean`

- **notificationPosition** (可选): `NotificationPosition`

- **enableErrorBoundary** (可选): `boolean`

- **recoveryStrategy** (可选): `'silent' | 'notify' | 'redirect' | 'reload'`

- **maxRetries** (可选): `number`

- **retryDelay** (可选): `number`

**完整定义**:

```typescript
interface UseUnifiedErrorHandlingOptions {
  /** 组件名称（用于错误上下文） */
  componentName?: string;
  /** 默认错误上下文 */
  defaultContext?: Partial<ErrorContext>;
  /** 默认处理选项 */
  defaultOptions?: Partial<ErrorHandlingOptions>;
  /** 是否自动显示通知 */
  autoNotify?: boolean;
  /** 通知位置 */
  notificationPosition?: NotificationPosition;
  /** 是否启用错误边界 */
  enableErrorBoundary?: boolean;
  /** 错误恢复策略 */
  recoveryStrategy?: 'silent' | 'notify' | 'redirect' | 'reload';
  /** 最大重试次数 */
  maxRetries?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
}
```

---

### UseUnifiedErrorHandlingReturn

**文件位置**: `src\hooks\useUnifiedErrorHandling.ts`

**属性**:

- **handleError**: `(`

- **error**: `any,`

- **context** (可选): `Partial<ErrorContext>,`

- **options** (可选): `Partial<ErrorHandlingOptions>`

- **wrapAsync**: `<T extends any[], R>(`

- **fn**: `(...args: T) => Promise<R>,`

- **context** (可选): `Partial<ErrorContext>`

- **args**: `T) => Promise<R | null>`

- **wrapSync**: `<T extends any[], R>(`

- **fn**: `(...args: T) => R,`

- **context** (可选): `Partial<ErrorContext>`

- **args**: `T) => R | null`

- **retry**: `<T>(`

- **operation**: `() => Promise<T>,`

- **options** (可选): `{ maxRetries?: number`

**完整定义**:

```typescript
interface UseUnifiedErrorHandlingReturn {
/** 处理错误 */
  handleError: (
    error: any,
    context?: Partial<ErrorContext>,
    options?: Partial<ErrorHandlingOptions>
  ) => Promise<ErrorHandlingResult>;

  /** 包装异步函数 */
  wrapAsync: <T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    context?: Partial<ErrorContext>
  ) => (...args: T) => Promise<R | null>;

  /** 包装同步函数 */
  wrapSync: <T extends any[], R>(
    fn: (...args: T) => R,
    context?: Partial<ErrorContext>
  ) => (...args: T) => R | null;

  /** 重试操作 */
  retry: <T>(
    operation: () => Promise<T>,
    options?: { maxRetries?: number; delay?: number
}
```

---

### UXOptimizationConfig

**文件位置**: `src\hooks\useUXOptimization.ts`

**属性**:

- **confirmCriticalActions**: `boolean`

- **autoSaveInterval**: `number`

- **enableUndo**: `boolean`

- **undoStackSize**: `number`

- **enableSmartSuggestions**: `boolean`

- **showOnboarding**: `boolean`

- **enablePerformanceMonitoring**: `boolean`

**完整定义**:

```typescript
interface UXOptimizationConfig {
  // 操作确认
  confirmCriticalActions: boolean;
  // 自动保存
  autoSaveInterval: number;
  // 操作撤销
  enableUndo: boolean;
  undoStackSize: number;
  // 智能预测
  enableSmartSuggestions: boolean;
  // 操作引导
  showOnboarding: boolean;
  // 性能监控
  enablePerformanceMonitoring: boolean;
}
```

---

### OperationHistory

**文件位置**: `src\hooks\useUXOptimization.ts`

**属性**:

- **id**: `string`

- **action**: `string`

- **data**: `any`

- **timestamp**: `number`

- **canUndo**: `boolean`

**完整定义**:

```typescript
interface OperationHistory {
  id: string;
  action: string;
  data: any;
  timestamp: number;
  canUndo: boolean;
}
```

---

### VoteRecord

**文件位置**: `src\hooks\useVoteResults.ts`

**属性**:

- **votedPlayerId**: `string`

- **votedPlayerName**: `string`

- **voteCount**: `number`

- **voters**: `string[]`

**完整定义**:

```typescript
interface VoteRecord {
  votedPlayerId: string;
  votedPlayerName: string;
  voteCount: number;
  voters: string[];
}
```

---

### VotingSession

**文件位置**: `src\hooks\useVotingSystem.ts`

**属性**:

- **id**: `string`

- **game_state_id**: `string`

- **room_id**: `string`

- **round_number**: `number`

- **phase**: `number`

- **session_type**: `string`

- **status**: `string`

- **start_time**: `string`

- **end_time** (可选): `string`

- **created_at** (可选): `string`

- **updated_at** (可选): `string`

**完整定义**:

```typescript
interface VotingSession {
  id: string;
  game_state_id: string;
  room_id: string;
  round_number: number;
  phase: number;
  session_type: string;
  status: string;
  start_time: string;
  end_time?: string;
  created_at?: string;
  updated_at?: string;
}
```

---

### Vote

**文件位置**: `src\hooks\useVotingSystem.ts`

**属性**:

- **id**: `string`

- **voting_session_id**: `string`

- **voter_id**: `string`

- **target_id** (可选): `string`

- **vote_time**: `string`

- **is_valid**: `boolean`

- **vote_weight**: `number`

- **created_at** (可选): `string`

**完整定义**:

```typescript
interface Vote {
  id: string;
  voting_session_id: string;
  voter_id: string;
  target_id?: string;
  vote_time: string;
  is_valid: boolean;
  vote_weight: number;
  created_at?: string;
}
```

---

### VotingResult

**文件位置**: `src\hooks\useVotingSystem.ts`

**属性**:

- **id**: `string`

- **voting_session_id**: `string`

- **target_id** (可选): `string`

- **total_votes**: `number`

- **vote_percentage** (可选): `number`

- **is_majority**: `boolean`

- **is_tied**: `boolean`

- **result_type**: `string`

- **processing_status**: `string`

- **processed_at** (可选): `string`

- **created_at** (可选): `string`

- **updated_at** (可选): `string`

**完整定义**:

```typescript
interface VotingResult {
  id: string;
  voting_session_id: string;
  target_id?: string;
  total_votes: number;
  vote_percentage?: number;
  is_majority: boolean;
  is_tied: boolean;
  result_type: string;
  processing_status: string;
  processed_at?: string;
  created_at?: string;
  updated_at?: string;
}
```

---

### PotionUsageStatus

**文件位置**: `src\hooks\useWitchPotionManager.ts`

**属性**:

- **protectionUsed**: `boolean`

- **attackUsed**: `boolean`

- **canUseProtection**: `boolean`

- **canUseAttack**: `boolean`

- **nightDeaths** (可选): `any[]`

**完整定义**:

```typescript
interface PotionUsageStatus {
  protectionUsed: boolean;
  attackUsed: boolean;
  canUseProtection: boolean;
  canUseAttack: boolean;
  nightDeaths?: any[];
}
```

---

### ILogger

**文件位置**: `src\lib\logger.ts`

**属性**:

- **debug**: `(...args: unknown[]) => void`

- **info**: `(...args: unknown[]) => void`

- **warn**: `(...args: unknown[]) => void`

- **error**: `(...args: unknown[]) => void`

**完整定义**:

```typescript
interface ILogger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}
```

---

### PerformanceMetric

**文件位置**: `src\lib\performanceReporter.ts`

**属性**:

- **name**: `string`

- **value**: `number`

- **unit**: `string`

- **timestamp**: `number`

- **context** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  context?: Record<string, any>;
}
```

---

### ComponentRenderMetric

**文件位置**: `src\lib\performanceReporter.ts`

**属性**:

- **componentName**: `string`

- **renderTime**: `number`

- **renderCount**: `number`

- **propsChanges**: `number`

**完整定义**:

```typescript
interface ComponentRenderMetric {
  componentName: string;
  renderTime: number;
  renderCount: number;
  propsChanges: number;
}
```

---

### ApiSecurityConfig

**文件位置**: `src\middleware\apiSecurityMiddleware.ts`

**属性**:

- **enabled**: `boolean`

- **jwt**: `{`

- **secret**: `string`

- **expiresIn**: `string`

- **issuer**: `string`

- **audience**: `string`

**完整定义**:

```typescript
interface ApiSecurityConfig {
/** 是否启用安全中间件 */
  enabled: boolean;
  /** JWT配置 */
  jwt: {
    secret: string;
    expiresIn: string;
    issuer: string;
    audience: string;
}
```

---

### ApiRequestContext

**文件位置**: `src\middleware\apiSecurityMiddleware.ts`

**属性**:

- **requestId**: `string`

- **userId** (可选): `string`

- **sessionId** (可选): `string`

- **clientIp**: `string`

- **userAgent**: `string`

- **timestamp**: `number`

- **authenticated**: `boolean`

- **permissions**: `string[]`

- **apiKey** (可选): `{`

- **keyId**: `string`

- **scope**: `string[]`

**完整定义**:

```typescript
interface ApiRequestContext {
/** 请求ID */
  requestId: string;
  /** 用户ID */
  userId?: string;
  /** 会话ID */
  sessionId?: string;
  /** 客户端IP */
  clientIp: string;
  /** 用户代理 */
  userAgent: string;
  /** 请求时间戳 */
  timestamp: number;
  /** 认证状态 */
  authenticated: boolean;
  /** 权限列表 */
  permissions: string[];
  /** API密钥信息 */
  apiKey?: {
    keyId: string;
    scope: string[];
}
```

---

### SecurityAuditLog

**文件位置**: `src\middleware\apiSecurityMiddleware.ts`

**属性**:

- **id**: `string`

- **context**: `ApiRequestContext`

- **request**: `{`

- **method**: `string`

- **url**: `string`

- **headers**: `Record<string, string>`

- **body** (可选): `any`

- **query**: `Record<string, any>`

- **params**: `Record<string, any>`

**完整定义**:

```typescript
interface SecurityAuditLog {
/** 日志ID */
  id: string;
  /** 请求上下文 */
  context: ApiRequestContext;
  /** 请求信息 */
  request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
    query: Record<string, any>;
    params: Record<string, any>;
}
```

---

### PermissionMiddlewareConfig

**文件位置**: `src\middleware\permissionMiddleware.ts`

**属性**:

- **mode**: `PermissionCheckMode`

- **strategy**: `PermissionStrategy`

- **permissions** (可选): `string[]`

- **roles** (可选): `string[]`

- **resources** (可选): `string[]`

- **conditions** (可选): `Array<{`

- **field**: `string`

- **operator**: `'equals' | 'not_equals' | 'in' | 'not_in' | 'contains' | 'matches'`

- **value**: `any`

**完整定义**:

```typescript
interface PermissionMiddlewareConfig {
// 基础配置
  mode: PermissionCheckMode;
  strategy: PermissionStrategy;

  // 权限配置
  permissions?: string[];
  roles?: string[];
  resources?: string[];

  // 条件配置
  conditions?: Array<{
    field: string;
    operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'contains' | 'matches';
    value: any;
}
```

---

### PermissionCheckResult

**文件位置**: `src\middleware\permissionMiddleware.ts`

**属性**:

- **allowed**: `boolean`

- **reason** (可选): `string`

- **permissions**: `Array<{`

- **name**: `string`

- **granted**: `boolean`

- **reason** (可选): `string`

**完整定义**:

```typescript
interface PermissionCheckResult {
allowed: boolean;
  reason?: string;
  permissions: Array<{
    name: string;
    granted: boolean;
    reason?: string;
}
```

---

### PermissionAuditRecord

**文件位置**: `src\middleware\permissionMiddleware.ts`

**属性**:

- **id**: `string`

- **timestamp**: `number`

- **userId**: `string`

- **endpoint**: `string`

- **method**: `string`

- **permissions**: `string[]`

- **result**: `'granted' | 'denied' | 'error'`

- **reason** (可选): `string`

- **duration**: `number`

- **ip**: `string`

- **userAgent**: `string`

- **requestData** (可选): `any`

- **responseData** (可选): `any`

- **context**: `PermissionContext`

**完整定义**:

```typescript
interface PermissionAuditRecord {
  id: string;
  timestamp: number;
  userId: string;
  endpoint: string;
  method: string;
  permissions: string[];
  result: 'granted' | 'denied' | 'error';
  reason?: string;
  duration: number;
  ip: string;
  userAgent: string;
  requestData?: any;
  responseData?: any;
  context: PermissionContext;
}
```

---

### UserProfile

**文件位置**: `src\providers\AuthProvider.tsx`

**属性**:

- **user_id**: `string`

- **player_name**: `string`

- **level**: `number`

- **experience**: `number`

- **games_won**: `number`

- **games_lost**: `number`

**完整定义**:

```typescript
interface UserProfile {
  user_id: string;
  player_name: string;
  level: number;
  experience: number;
  games_won: number;
  games_lost: number;
}
```

---

### AuthContextType

**文件位置**: `src\providers\AuthProvider.tsx`

**属性**:

- **currentUser**: `(User & { player_name?: string`

**完整定义**:

```typescript
interface AuthContextType {
currentUser: (User & { player_name?: string
}
```

---

### UserAction

**文件位置**: `src\services\analyticsService.ts`

**属性**:

- **userId**: `string`

- **action**: `string`

- **timestamp**: `number`

- **metadata** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface UserAction {
  userId: string;
  action: string;
  timestamp: number;
  metadata?: Record<string, any>;
}
```

---

### SkillUsageStats

**文件位置**: `src\services\analyticsService.ts`

**属性**:

- **skillName**: `string`

- **totalUses**: `number`

- **successRate**: `number`

- **avgResponseTime**: `number`

- **mostCommonTargets**: `string[]`

- **usageByPhase**: `Record<string, number>`

**完整定义**:

```typescript
interface SkillUsageStats {
  skillName: string;
  totalUses: number;
  successRate: number;
  avgResponseTime: number;
  mostCommonTargets: string[];
  usageByPhase: Record<string, number>;
}
```

---

### UserBehaviorPattern

**文件位置**: `src\services\analyticsService.ts`

**属性**:

- **userId**: `string`

- **mostUsedSkills**: `string[]`

- **avgDecisionTime**: `number`

- **skillSuccessRate**: `number`

- **preferredPhases**: `string[]`

- **activityPattern**: `{`

- **hour**: `number`

- **count**: `number`

**完整定义**:

```typescript
interface UserBehaviorPattern {
userId: string;
  mostUsedSkills: string[];
  avgDecisionTime: number;
  skillSuccessRate: number;
  preferredPhases: string[];
  activityPattern: {
    hour: number;
    count: number;
}
```

---

### SecurityScheduleConfig

**文件位置**: `src\services\automatedSecurityService.ts`

**属性**:

- **enabled**: `boolean`

- **interval**: `number`

- **deepScanInterval**: `number`

- **maxConcurrentChecks**: `number`

- **checkTimeout**: `number`

- **autoFixLevel**: `'none' | 'low' | 'medium' | 'high'`

- **notifications**: `{`

- **enabled**: `boolean`

- **channels**: `('log' | 'email' | 'webhook')[]`

- **criticalOnly**: `boolean`

**完整定义**:

```typescript
interface SecurityScheduleConfig {
/** 是否启用自动检查 */
  enabled: boolean;
  /** 检查间隔（毫秒） */
  interval: number;
  /** 深度检查间隔（毫秒） */
  deepScanInterval: number;
  /** 最大并发检查数 */
  maxConcurrentChecks: number;
  /** 检查超时时间（毫秒） */
  checkTimeout: number;
  /** 自动修复级别 */
  autoFixLevel: 'none' | 'low' | 'medium' | 'high';
  /** 通知配置 */
  notifications: {
    enabled: boolean;
    channels: ('log' | 'email' | 'webhook')[];
    criticalOnly: boolean;
}
```

---

### SecurityEvent

**文件位置**: `src\services\automatedSecurityService.ts`

**属性**:

- **id**: `string`

- **type**: `'vulnerability_detected' | 'threat_detected' | 'policy_violation' | 'anomaly_detected'`

- **severity**: `'low' | 'medium' | 'high' | 'critical'`

- **timestamp**: `string`

- **source**: `string`

- **description**: `string`

- **details**: `any`

- **resolved**: `boolean`

- **resolvedAt** (可选): `string`

- **resolvedBy** (可选): `string`

- **actions**: `string[]`

**完整定义**:

```typescript
interface SecurityEvent {
  id: string;
  type:
    | 'vulnerability_detected'
    | 'threat_detected'
    | 'policy_violation'
    | 'anomaly_detected';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source: string;
  description: string;
  details: any;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  actions: string[];
}
```

---

### ThreatDetectionResult

**文件位置**: `src\services\automatedSecurityService.ts`

**属性**:

- **detected**: `boolean`

- **threats**: `Array<{`

- **type**: `string`

- **severity**: `'low' | 'medium' | 'high' | 'critical'`

- **description**: `string`

- **indicators**: `string[]`

- **confidence**: `number`

**完整定义**:

```typescript
interface ThreatDetectionResult {
detected: boolean;
  threats: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    indicators: string[];
    confidence: number;
}
```

---

### CacheConfig

**文件位置**: `src\services\cacheService.ts`

**属性**:

- **strategy**: `CacheStrategy`

- **storageType**: `CacheStorageType`

- **maxSize**: `number`

- **maxItems**: `number`

- **defaultTTL**: `number`

- **enableCompression**: `boolean`

- **enableEncryption**: `boolean`

- **enableStatistics**: `boolean`

- **cleanupInterval**: `number`

- **persistToDisk**: `boolean`

- **syncAcrossTabs**: `boolean`

**完整定义**:

```typescript
interface CacheConfig {
  strategy: CacheStrategy;
  storageType: CacheStorageType;
  maxSize: number;
  maxItems: number;
  defaultTTL: number;
  enableCompression: boolean;
  enableEncryption: boolean;
  enableStatistics: boolean;
  cleanupInterval: number;
  persistToDisk: boolean;
  syncAcrossTabs: boolean;
}
```

---

### CacheStatistics

**文件位置**: `src\services\cacheService.ts`

**属性**:

- **totalItems**: `number`

- **totalSize**: `number`

- **hitCount**: `number`

- **missCount**: `number`

- **hitRate**: `number`

- **evictionCount**: `number`

- **compressionRatio**: `number`

- **averageAccessTime**: `number`

- **memoryUsage**: `number`

- **storageUsage**: `number`

- **topKeys**: `Array<{`

- **key**: `string`

- **accessCount**: `number`

- **size**: `number`

**完整定义**:

```typescript
interface CacheStatistics {
totalItems: number;
  totalSize: number;
  hitCount: number;
  missCount: number;
  hitRate: number;
  evictionCount: number;
  compressionRatio: number;
  averageAccessTime: number;
  memoryUsage: number;
  storageUsage: number;
  topKeys: Array<{
    key: string;
    accessCount: number;
    size: number;
}
```

---

### CacheQueryOptions

**文件位置**: `src\services\cacheService.ts`

**属性**:

- **tags** (可选): `string[]`

- **priority** (可选): `CachePriority`

- **minAccessCount** (可选): `number`

- **maxAge** (可选): `number`

- **pattern** (可选): `RegExp`

**完整定义**:

```typescript
interface CacheQueryOptions {
  tags?: string[];
  priority?: CachePriority;
  minAccessCount?: number;
  maxAge?: number;
  pattern?: RegExp;
}
```

---

### ConfigurationItem

**文件位置**: `src\services\configurationService.ts`

**属性**:

- **key**: `string`

- **value**: `any`

- **type**: `ConfigurationType`

- **environment**: `ConfigurationEnvironment`

- **description** (可选): `string`

- **required** (可选): `boolean`

- **sensitive** (可选): `boolean`

- **validation** (可选): `{`

- **type**: `'string' | 'number' | 'boolean' | 'array' | 'object' | 'url' | 'email'`

- **min** (可选): `number`

- **max** (可选): `number`

- **pattern** (可选): `string`

- **enum** (可选): `any[]`

**完整定义**:

```typescript
interface ConfigurationItem {
key: string;
  value: any;
  type: ConfigurationType;
  environment: ConfigurationEnvironment;
  description?: string;
  required?: boolean;
  sensitive?: boolean;
  validation?: {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'url' | 'email';
    min?: number;
    max?: number;
    pattern?: string;
    enum?: any[];
}
```

---

### ConfigurationSchema

**文件位置**: `src\services\configurationService.ts`

**属性**:

- **key**: `string]: {`

- **type**: `ConfigurationType`

- **required**: `boolean`

- **description**: `string`

- **validation** (可选): `ConfigurationItem['validation']`

- **defaultValue** (可选): `any`

- **sensitive** (可选): `boolean`

**完整定义**:

```typescript
interface ConfigurationSchema {
[key: string]: {
    type: ConfigurationType;
    required: boolean;
    description: string;
    validation?: ConfigurationItem['validation'];
    defaultValue?: any;
    sensitive?: boolean;
}
```

---

### ConfigurationValidationResult

**文件位置**: `src\services\configurationService.ts`

**属性**:

- **isValid**: `boolean`

- **errors**: `Array<{`

- **key**: `string`

- **message**: `string`

- **severity**: `'error' | 'warning'`

**完整定义**:

```typescript
interface ConfigurationValidationResult {
isValid: boolean;
  errors: Array<{
    key: string;
    message: string;
    severity: 'error' | 'warning';
}
```

---

### ConfigurationUpdateEvent

**文件位置**: `src\services\configurationService.ts`

**属性**:

- **key**: `string`

- **oldValue**: `any`

- **newValue**: `any`

- **type**: `ConfigurationType`

- **environment**: `ConfigurationEnvironment`

- **timestamp**: `Date`

- **source**: `'api' | 'file' | 'env' | 'default'`

**完整定义**:

```typescript
interface ConfigurationUpdateEvent {
  key: string;
  oldValue: any;
  newValue: any;
  type: ConfigurationType;
  environment: ConfigurationEnvironment;
  timestamp: Date;
  source: 'api' | 'file' | 'env' | 'default';
}
```

---

### DyingStatusResolution

**文件位置**: `src\services\dyingStatusService.ts`

**属性**:

- **userId**: `string`

- **gameStateId**: `string`

- **resolutionType**: `'protected' | 'answer_correct' | 'answer_wrong'`

**完整定义**:

```typescript
interface DyingStatusResolution {
  userId: string;
  gameStateId: string;
  resolutionType: 'protected' | 'answer_correct' | 'answer_wrong';
}
```

---

### StandardizedError

**文件位置**: `src\services\errorHandlingService.ts`

**属性**:

- **id**: `string`

- **type**: `ErrorType`

- **severity**: `ErrorSeverity`

- **code**: `string`

- **message**: `string`

- **userMessage**: `string`

- **details** (可选): `Record<string, any>`

- **stack** (可选): `string`

- **timestamp**: `Date`

- **source**: `{`

- **component** (可选): `string`

- **function** (可选): `string`

- **file** (可选): `string`

- **line** (可选): `number`

**完整定义**:

```typescript
interface StandardizedError {
id: string;
  type: ErrorType;
  severity: ErrorSeverity;
  code: string;
  message: string;
  userMessage: string;
  details?: Record<string, any>;
  stack?: string;
  timestamp: Date;
  source: {
    component?: string;
    function?: string;
    file?: string;
    line?: number;
}
```

---

### ErrorHandlingConfig

**文件位置**: `src\services\errorHandlingService.ts`

**属性**:

- **enabled**: `boolean`

- **logErrors**: `boolean`

- **reportErrors**: `boolean`

- **showUserFriendlyMessages**: `boolean`

- **enableRetry**: `boolean`

- **maxRetries**: `number`

- **retryDelay**: `number`

- **enableFallback**: `boolean`

- **enableRecovery**: `boolean`

- **captureStackTrace**: `boolean`

- **captureContext**: `boolean`

- **filterSensitiveData**: `boolean`

- **errorReportingUrl** (可选): `string`

- **errorReportingApiKey** (可选): `string`

**完整定义**:

```typescript
interface ErrorHandlingConfig {
  enabled: boolean;
  logErrors: boolean;
  reportErrors: boolean;
  showUserFriendlyMessages: boolean;
  enableRetry: boolean;
  maxRetries: number;
  retryDelay: number;
  enableFallback: boolean;
  enableRecovery: boolean;
  captureStackTrace: boolean;
  captureContext: boolean;
  filterSensitiveData: boolean;
  errorReportingUrl?: string;
  errorReportingApiKey?: string;
}
```

---

### ErrorStatistics

**文件位置**: `src\services\errorHandlingService.ts`

**属性**:

- **totalErrors**: `number`

- **errorsByType**: `Record<ErrorType, number>`

- **errorsBySeverity**: `Record<ErrorSeverity, number>`

- **errorsByComponent**: `Record<string, number>`

- **resolvedErrors**: `number`

- **unresolvedErrors**: `number`

- **averageResolutionTime**: `number`

- **errorRate**: `number`

- **timeRange**: `{`

- **start**: `Date`

- **end**: `Date`

**完整定义**:

```typescript
interface ErrorStatistics {
totalErrors: number;
  errorsByType: Record<ErrorType, number>;
  errorsBySeverity: Record<ErrorSeverity, number>;
  errorsByComponent: Record<string, number>;
  resolvedErrors: number;
  unresolvedErrors: number;
  averageResolutionTime: number;
  errorRate: number;
  timeRange: {
    start: Date;
    end: Date;
}
```

---

### ErrorRecoveryResult

**文件位置**: `src\services\errorHandlingService.ts`

**属性**:

- **success**: `boolean`

- **strategy**: `ErrorRecoveryStrategy`

- **message**: `string`

- **data** (可选): `any`

- **nextAction** (可选): `string`

**完整定义**:

```typescript
interface ErrorRecoveryResult {
  success: boolean;
  strategy: ErrorRecoveryStrategy;
  message: string;
  data?: any;
  nextAction?: string;
}
```

---

### ErrorReport

**文件位置**: `src\services\errorMonitoringService.ts`

**属性**:

- **id**: `string`

- **level**: `ErrorLevel`

- **type**: `ErrorType`

- **message**: `string`

- **stack** (可选): `string`

- **timestamp**: `number`

- **userId** (可选): `string`

- **sessionId**: `string`

- **url**: `string`

- **userAgent**: `string`

- **browser**: `BrowserInfo`

- **device**: `DeviceInfo`

- **context**: `ErrorContext`

- **userActions**: `UserAction[]`

- **performance**: `PerformanceMetrics`

- **customData** (可选): `any`

- **handled**: `boolean`

- **handlingResult** (可选): `string`

**完整定义**:

```typescript
interface ErrorReport {
  /** 错误ID */
  id: string;
  /** 错误级别 */
  level: ErrorLevel;
  /** 错误类型 */
  type: ErrorType;
  /** 错误消息 */
  message: string;
  /** 错误堆栈 */
  stack?: string;
  /** 错误发生时间 */
  timestamp: number;
  /** 用户ID */
  userId?: string;
  /** 会话ID */
  sessionId: string;
  /** 页面URL */
  url: string;
  /** 用户代理 */
  userAgent: string;
  /** 浏览器信息 */
  browser: BrowserInfo;
  /** 设备信息 */
  device: DeviceInfo;
  /** 错误上下文 */
  context: ErrorContext;
  /** 用户操作历史 */
  userActions: UserAction[];
  /** 性能指标 */
  performance: PerformanceMetrics;
  /** 自定义数据 */
  customData?: any;
  /** 是否已处理 */
  handled: boolean;
  /** 处理结果 */
  handlingResult?: string;
}
```

---

### BrowserInfo

**文件位置**: `src\services\errorMonitoringService.ts`

**属性**:

- **name**: `string`

- **version**: `string`

- **engine**: `string`

- **os**: `string`

- **mobile**: `boolean`

**完整定义**:

```typescript
interface BrowserInfo {
  /** 浏览器名称 */
  name: string;
  /** 浏览器版本 */
  version: string;
  /** 渲染引擎 */
  engine: string;
  /** 操作系统 */
  os: string;
  /** 是否移动设备 */
  mobile: boolean;
}
```

---

### DeviceInfo

**文件位置**: `src\services\errorMonitoringService.ts`

**属性**:

- **type**: `'desktop' | 'mobile' | 'tablet'`

- **screenResolution**: `string`

- **viewportSize**: `string`

- **pixelRatio**: `number`

- **memory** (可选): `number`

- **cpuCores** (可选): `number`

- **networkType** (可选): `string`

**完整定义**:

```typescript
interface DeviceInfo {
  /** 设备类型 */
  type: 'desktop' | 'mobile' | 'tablet';
  /** 屏幕分辨率 */
  screenResolution: string;
  /** 视口大小 */
  viewportSize: string;
  /** 像素比 */
  pixelRatio: number;
  /** 内存大小 */
  memory?: number;
  /** CPU核心数 */
  cpuCores?: number;
  /** 网络类型 */
  networkType?: string;
}
```

---

### ErrorContext

**文件位置**: `src\services\errorMonitoringService.ts`

**属性**:

- **component** (可选): `string`

- **operation** (可选): `string`

- **filename** (可选): `string`

- **line** (可选): `number`

- **column** (可选): `number`

- **function** (可选): `string`

- **state** (可选): `any`

- **props** (可选): `any`

- **environment** (可选): `string`

- **version** (可选): `string`

**完整定义**:

```typescript
interface ErrorContext {
  /** 组件名称 */
  component?: string;
  /** 操作名称 */
  operation?: string;
  /** 文件名 */
  filename?: string;
  /** 行号 */
  line?: number;
  /** 列号 */
  column?: number;
  /** 函数名 */
  function?: string;
  /** 状态信息 */
  state?: any;
  /** 属性信息 */
  props?: any;
  /** 环境变量 */
  environment?: string;
  /** 版本信息 */
  version?: string;
}
```

---

### MonitoringConfig

**文件位置**: `src\services\errorMonitoringService.ts`

**属性**:

- **enableErrorMonitoring**: `boolean`

- **enablePerformanceMonitoring**: `boolean`

- **enableUserTracking**: `boolean`

- **enableAutoReporting**: `boolean`

- **reportingEndpoint** (可选): `string`

- **reportingInterval**: `number`

- **maxErrorCache**: `number`

- **maxUserActions**: `number`

- **samplingRate**: `number`

- **ignoredErrors**: `string[]`

- **ignoredUrls**: `RegExp[]`

- **customFilters**: `((error: ErrorReport) => boolean)[]`

**完整定义**:

```typescript
interface MonitoringConfig {
  /** 是否启用错误监控 */
  enableErrorMonitoring: boolean;
  /** 是否启用性能监控 */
  enablePerformanceMonitoring: boolean;
  /** 是否启用用户行为追踪 */
  enableUserTracking: boolean;
  /** 是否启用自动上报 */
  enableAutoReporting: boolean;
  /** 上报端点 */
  reportingEndpoint?: string;
  /** 上报间隔（毫秒） */
  reportingInterval: number;
  /** 最大错误缓存数 */
  maxErrorCache: number;
  /** 最大用户操作历史数 */
  maxUserActions: number;
  /** 采样率（0-1） */
  samplingRate: number;
  /** 忽略的错误类型 */
  ignoredErrors: string[];
  /** 忽略的URL模式 */
  ignoredUrls: RegExp[];
  /** 自定义过滤器 */
  customFilters: ((error: ErrorReport) => boolean)[];
}
```

---

### MonitoringStats

**文件位置**: `src\services\errorMonitoringService.ts`

**属性**:

- **totalErrors**: `number`

- **errorsByLevel**: `Record<ErrorLevel, number>`

- **errorsByType**: `Record<ErrorType, number>`

- **errorsByBrowser**: `Record<string, number>`

- **errorsByDevice**: `Record<string, number>`

- **averageErrorRate**: `number`

- **performanceMetrics**: `PerformanceMetrics`

- **userActivity**: `number`

- **lastUpdated**: `number`

**完整定义**:

```typescript
interface MonitoringStats {
  /** 总错误数 */
  totalErrors: number;
  /** 按级别统计 */
  errorsByLevel: Record<ErrorLevel, number>;
  /** 按类型统计 */
  errorsByType: Record<ErrorType, number>;
  /** 按浏览器统计 */
  errorsByBrowser: Record<string, number>;
  /** 按设备统计 */
  errorsByDevice: Record<string, number>;
  /** 平均错误率 */
  averageErrorRate: number;
  /** 性能指标 */
  performanceMetrics: PerformanceMetrics;
  /** 用户活跃度 */
  userActivity: number;
  /** 最后更新时间 */
  lastUpdated: number;
}
```

---

### ServiceMetadata

**文件位置**: `src\services\index.ts`

**属性**:

- **name**: `string`

- **version**: `string`

- **description**: `string`

- **dependencies**: `string[]`

- **priority**: `number`

- **initialized**: `boolean`

- **healthy**: `boolean`

**完整定义**:

```typescript
interface ServiceMetadata {
  name: string;
  version: string;
  description: string;
  dependencies: string[];
  priority: number;
  initialized: boolean;
  healthy: boolean;
}
```

---

### ServiceConfiguration

**文件位置**: `src\services\index.ts`

**属性**:

- **enabled**: `boolean`

- **autoStart**: `boolean`

- **retryOnFailure**: `boolean`

- **maxRetries**: `number`

- **retryDelay**: `number`

- **healthCheckInterval**: `number`

- **dependencies**: `string[]`

- **config**: `Record<string, any>`

**完整定义**:

```typescript
interface ServiceConfiguration {
  enabled: boolean;
  autoStart: boolean;
  retryOnFailure: boolean;
  maxRetries: number;
  retryDelay: number;
  healthCheckInterval: number;
  dependencies: string[];
  config: Record<string, any>;
}
```

---

### Alert

**文件位置**: `src\services\monitoringService.ts`

**属性**:

- **id**: `string`

- **severity**: `'info' | 'warning' | 'error' | 'critical'`

- **message**: `string`

- **timestamp**: `number`

- **resolved**: `boolean`

**完整定义**:

```typescript
interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: number;
  resolved: boolean;
}
```

---

### PerformanceThreshold

**文件位置**: `src\services\performanceMonitoringService.ts`

**属性**:

- **type**: `PerformanceMetricType`

- **warningThreshold**: `number`

- **criticalThreshold**: `number`

- **unit**: `string`

- **description**: `string`

**完整定义**:

```typescript
interface PerformanceThreshold {
  type: PerformanceMetricType;
  warningThreshold: number;
  criticalThreshold: number;
  unit: string;
  description: string;
}
```

---

### PerformanceAnalysis

**文件位置**: `src\services\performanceMonitoringService.ts`

**属性**:

- **overallScore**: `number`

- **criticalIssues**: `PerformanceIssue[]`

- **warnings**: `PerformanceIssue[]`

- **recommendations**: `PerformanceRecommendation[]`

- **trends**: `PerformanceTrend[]`

- **summary**: `{`

- **totalMetrics**: `number`

- **averageScore**: `number`

- **worstPerformingComponents**: `string[]`

- **bestPerformingComponents**: `string[]`

**完整定义**:

```typescript
interface PerformanceAnalysis {
overallScore: number; // 0-100分
  criticalIssues: PerformanceIssue[];
  warnings: PerformanceIssue[];
  recommendations: PerformanceRecommendation[];
  trends: PerformanceTrend[];
  summary: {
    totalMetrics: number;
    averageScore: number;
    worstPerformingComponents: string[];
    bestPerformingComponents: string[];
}
```

---

### PerformanceIssue

**文件位置**: `src\services\performanceMonitoringService.ts`

**属性**:

- **id**: `string`

- **type**: `PerformanceMetricType`

- **severity**: `'warning' | 'critical'`

- **componentName** (可选): `string`

- **operationName** (可选): `string`

- **currentValue**: `number`

- **thresholdValue**: `number`

- **impact**: `string`

- **description**: `string`

- **detectedAt**: `Date`

**完整定义**:

```typescript
interface PerformanceIssue {
  id: string;
  type: PerformanceMetricType;
  severity: 'warning' | 'critical';
  componentName?: string;
  operationName?: string;
  currentValue: number;
  thresholdValue: number;
  impact: string;
  description: string;
  detectedAt: Date;
}
```

---

### PerformanceRecommendation

**文件位置**: `src\services\performanceMonitoringService.ts`

**属性**:

- **id**: `string`

- **category**: `'rendering' | 'memory' | 'network' | 'caching' | 'code_splitting'`

- **priority**: `'high' | 'medium' | 'low'`

- **title**: `string`

- **description**: `string`

- **implementation**: `string`

- **estimatedImpact**: `string`

- **effort**: `'low' | 'medium' | 'high'`

- **relatedMetrics**: `PerformanceMetricType[]`

**完整定义**:

```typescript
interface PerformanceRecommendation {
  id: string;
  category: 'rendering' | 'memory' | 'network' | 'caching' | 'code_splitting';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  implementation: string;
  estimatedImpact: string;
  effort: 'low' | 'medium' | 'high';
  relatedMetrics: PerformanceMetricType[];
}
```

---

### PerformanceTrend

**文件位置**: `src\services\performanceMonitoringService.ts`

**属性**:

- **type**: `PerformanceMetricType`

- **direction**: `'improving' | 'degrading' | 'stable'`

- **changePercentage**: `number`

- **timeRange**: `string`

- **dataPoints**: `Array<{`

- **timestamp**: `Date`

- **value**: `number`

**完整定义**:

```typescript
interface PerformanceTrend {
type: PerformanceMetricType;
  direction: 'improving' | 'degrading' | 'stable';
  changePercentage: number;
  timeRange: string;
  dataPoints: Array<{
    timestamp: Date;
    value: number;
}
```

---

### PerformanceMonitoringConfig

**文件位置**: `src\services\performanceMonitoringService.ts`

**属性**:

- **enabled**: `boolean`

- **sampleRate**: `number`

- **bufferSize**: `number`

- **reportingInterval**: `number`

- **thresholds**: `PerformanceThreshold[]`

- **enabledMetrics**: `PerformanceMetricType[]`

- **autoOptimization**: `boolean`

**完整定义**:

```typescript
interface PerformanceMonitoringConfig {
  enabled: boolean;
  sampleRate: number; // 0-1之间，采样率
  bufferSize: number; // 缓存的指标数量
  reportingInterval: number; // 报告间隔（毫秒）
  thresholds: PerformanceThreshold[];
  enabledMetrics: PerformanceMetricType[];
  autoOptimization: boolean;
}
```

---

### ThreatDetectionRule

**文件位置**: `src\services\securityAuditService.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **eventTypes**: `SecurityEventType[]`

- **condition**: `(events: SecurityEvent[]) => boolean`

- **threatLevel**: `ThreatLevel`

- **description**: `string`

- **responseAction**: `(events: SecurityEvent[]) => Promise<void>`

- **enabled**: `boolean`

**完整定义**:

```typescript
interface ThreatDetectionRule {
  id: string;
  name: string;
  eventTypes: SecurityEventType[];
  condition: (events: SecurityEvent[]) => boolean;
  threatLevel: ThreatLevel;
  description: string;
  responseAction: (events: SecurityEvent[]) => Promise<void>;
  enabled: boolean;
}
```

---

### SecurityStats

**文件位置**: `src\services\securityAuditService.ts`

**属性**:

- **totalEvents**: `number`

- **eventsByType**: `Record<SecurityEventType, number>`

- **eventsByThreatLevel**: `Record<ThreatLevel, number>`

- **topThreats**: `Array<{ type: SecurityEventType`

**完整定义**:

```typescript
interface SecurityStats {
totalEvents: number;
  eventsByType: Record<SecurityEventType, number>;
  eventsByThreatLevel: Record<ThreatLevel, number>;
  topThreats: Array<{ type: SecurityEventType; count: number
}
```

---

### SecurityConfig

**文件位置**: `src\services\securityAuditService.ts`

**属性**:

- **enableRealTimeMonitoring**: `boolean`

- **enableThreatDetection**: `boolean`

- **enableAutoResponse**: `boolean`

- **maxEventsInMemory**: `number`

- **eventRetentionDays**: `number`

- **alertThresholds**: `Record<ThreatLevel, number>`

- **rateLimits**: `Record<string, { requests: number`

**完整定义**:

```typescript
interface SecurityConfig {
enableRealTimeMonitoring: boolean;
  enableThreatDetection: boolean;
  enableAutoResponse: boolean;
  maxEventsInMemory: number;
  eventRetentionDays: number;
  alertThresholds: Record<ThreatLevel, number>;
  rateLimits: Record<string, { requests: number; window: number
}
```

---

### SkillUseRequest

**文件位置**: `src\services\skillSystemService.ts`

**属性**:

- **skillType**: `string`

- **targetUserId** (可选): `string`

- **gameStateId**: `string`

- **userId**: `string`

- **roomId**: `string`

- **metadata** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface SkillUseRequest {
  skillType: string;
  targetUserId?: string;
  gameStateId: string;
  userId: string;
  roomId: string;
  metadata?: Record<string, any>;
}
```

---

### SkillUseResult

**文件位置**: `src\services\skillSystemService.ts`

**属性**:

- **success**: `boolean`

- **skillUseId** (可选): `string`

- **message**: `string`

- **effects** (可选): `Array<{`

- **type**: `string`

- **targetUserId**: `string`

- **value**: `any`

**完整定义**:

```typescript
interface SkillUseResult {
success: boolean;
  skillUseId?: string;
  message: string;
  effects?: Array<{
    type: string;
    targetUserId: string;
    value: any;
}
```

---

### SkillDataQueryOptions

**文件位置**: `src\services\skillSystemService.ts`

**属性**:

- **gameStateId** (可选): `string`

- **userId** (可选): `string`

- **skillType** (可选): `string`

- **includeEffects** (可选): `boolean`

- **includeTargets** (可选): `boolean`

- **limit** (可选): `number`

- **offset** (可选): `number`

**完整定义**:

```typescript
interface SkillDataQueryOptions {
  gameStateId?: string;
  userId?: string;
  skillType?: string;
  includeEffects?: boolean;
  includeTargets?: boolean;
  limit?: number;
  offset?: number;
}
```

---

### SystemAnnouncementData

**文件位置**: `src\services\systemAnnouncementService.ts`

**属性**:

- **type**: `'skill_usage' | 'status_change' | 'hunter_broadcast' | 'whitewolf_broadcast'`

- **actorUserId**: `string`

- **actorName**: `string`

- **actorRole**: `string`

- **skillName** (可选): `string`

- **skillType** (可选): `string`

- **targetUserId** (可选): `string`

- **targetName** (可选): `string`

- **targetRole** (可选): `string`

- **finalStatus** (可选): `string`

- **roomId**: `string`

- **gameRound**: `number`

- **gamePhase**: `string`

**完整定义**:

```typescript
interface SystemAnnouncementData {
  type:
    | 'skill_usage'
    | 'status_change'
    | 'hunter_broadcast'
    | 'whitewolf_broadcast';
  actorUserId: string;
  actorName: string;
  actorRole: string;
  skillName?: string;
  skillType?: string;
  targetUserId?: string;
  targetName?: string;
  targetRole?: string;
  finalStatus?: string;
  roomId: string;
  gameRound: number;
  gamePhase: string;
}
```

---

### SkillEffectData

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **effect_type**: `string`

- **target_type** (可选): `TargetType`

- **duration** (可选): `number`

- **stack_count** (可选): `number`

- **data** (可选): `Record<string, unknown>`

**完整定义**:

```typescript
interface SkillEffectData {
  effect_type: string;
  target_type?: TargetType;
  duration?: number;
  stack_count?: number;
  data?: Record<string, unknown>;
}
```

---

### SkillEffects

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **werewolf_kill** (可选): `boolean`

- **werewolf_target** (可选): `string`

- **seer_check** (可选): `boolean`

- **seer_result** (可选): `'werewolf' | 'villager' | null`

- **witch_save** (可选): `boolean`

- **witch_poison** (可选): `boolean`

- **witch_save_used** (可选): `boolean`

- **witch_poison_used** (可选): `boolean`

- **guard_protect** (可选): `boolean`

- **guard_last_target** (可选): `string`

- **hunter_shoot** (可选): `boolean`

- **hunter_shoot_used** (可选): `boolean`

- **villager_sleep** (可选): `boolean`

- **key**: `string]: unknown`

**完整定义**:

```typescript
interface SkillEffects {
  // 狼人技能效果
  werewolf_kill?: boolean;
  werewolf_target?: string;

  // 预言家技能效果
  seer_check?: boolean;
  seer_result?: 'werewolf' | 'villager' | null;

  // 女巫技能效果
  witch_save?: boolean;
  witch_poison?: boolean;
  witch_save_used?: boolean;
  witch_poison_used?: boolean;

  // 守卫技能效果
  guard_protect?: boolean;
  guard_last_target?: string;

  // 猎人技能效果
  hunter_shoot?: boolean;
  hunter_shoot_used?: boolean;

  // 村民技能效果（睡觉）
  villager_sleep?: boolean;

  // 通用字段
  [key: string]: unknown;
}
```

---

### RoleAttributes

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **hasSavePotion** (可选): `boolean`

- **hasPoisonPotion** (可选): `boolean`

- **saveUsedRounds** (可选): `number[]`

- **poisonUsedRounds** (可选): `number[]`

- **lastProtectedTarget** (可选): `string`

- **hasShot** (可选): `boolean`

- **checkHistory** (可选): `Array<{`

- **round**: `number`

- **target**: `string`

- **result**: `'werewolf' | 'villager'`

**完整定义**:

```typescript
interface RoleAttributes {
// 女巫属性
  hasSavePotion?: boolean;
  hasPoisonPotion?: boolean;
  saveUsedRounds?: number[];
  poisonUsedRounds?: number[];

  // 守卫属性
  lastProtectedTarget?: string;

  // 猎人属性
  hasShot?: boolean;

  // 预言家属性
  checkHistory?: Array<{
    round: number;
    target: string;
    result: 'werewolf' | 'villager';
}
```

---

### SkillUseRecord

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **id**: `string`

- **user_id**: `string`

- **game_state_id**: `string`

- **skill_name**: `string`

- **skill_chinese_name** (可选): `string`

- **target_user_id** (可选): `string`

- **round_number**: `number`

- **phase**: `Phase | string`

- **skill_priority**: `number`

- **execution_status**: `ExecutionStatus | string`

- **skill_effects**: `SkillEffectData`

- **conditions_met**: `Record<string, unknown>`

- **result** (可选): `SkillResult`

- **execution_time** (可选): `string`

- **failure_reason** (可选): `string`

- **created_at**: `string`

- **updated_at** (可选): `string`

**完整定义**:

```typescript
interface SkillUseRecord {
  id: string;
  user_id: string;
  game_state_id: string;
  skill_name: string;
  skill_chinese_name?: string;
  target_user_id?: string;
  round_number: number;
  phase: Phase | string; // 兼容 string 类型
  skill_priority: number;
  execution_status: ExecutionStatus | string; // 兼容 string 类型
  skill_effects: SkillEffectData;
  conditions_met: Record<string, unknown>;
  result?: SkillResult;
  execution_time?: string;
  failure_reason?: string;
  created_at: string;
  updated_at?: string;
}
```

---

### SkillResult

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **success**: `boolean`

- **message** (可选): `string`

- **data** (可选): `Record<string, unknown>`

- **seer_result** (可选): `'werewolf' | 'villager'`

- **key**: `string]: unknown`

**完整定义**:

```typescript
interface SkillResult {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  // 查验结果
  seer_result?: 'werewolf' | 'villager';
  // 其他结果字段
  [key: string]: unknown;
}
```

---

### SkillTarget

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **id**: `string`

- **skill_use_id**: `string`

- **skill_effects_queue_id** (可选): `string`

- **target_user_id** (可选): `string`

- **target_type**: `TargetType`

- **effect_applied**: `SkillEffectData`

- **effect_duration** (可选): `number`

- **effect_start_time**: `string`

- **effect_end_time** (可选): `string`

- **stack_count**: `number`

- **is_active**: `boolean`

- **created_at**: `string`

- **updated_at**: `string`

**完整定义**:

```typescript
interface SkillTarget {
  id: string;
  skill_use_id: string;
  skill_effects_queue_id?: string;
  target_user_id?: string;
  target_type: TargetType;
  effect_applied: SkillEffectData;
  effect_duration?: number;
  effect_start_time: string;
  effect_end_time?: string;
  stack_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

---

### AvailableTarget

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **userId**: `string`

- **name**: `string`

- **roleStatus**: `RoleStatus | number`

- **roleName** (可选): `string`

**完整定义**:

```typescript
interface AvailableTarget {
  userId: string;
  name: string;
  roleStatus: RoleStatus | number; // 兼容 number 类型
  roleName?: string;
}
```

---

### UsageRestriction

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **canUse**: `boolean`

- **reason** (可选): `string`

- **remainingUses** (可选): `number`

- **maxUses** (可选): `number`

- **usedInCurrentRound** (可选): `boolean`

**完整定义**:

```typescript
interface UsageRestriction {
  canUse: boolean;
  reason?: string;
  remainingUses?: number;
  maxUses?: number;
  usedInCurrentRound?: boolean;
}
```

---

### RoleSpecificSkillsProps

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **roleName**: `string`

- **skillEffects**: `SkillEffects | Record<string, unknown>`

- **roleAttributes**: `RoleAttributes | Record<string, unknown>`

- **canUseSkill**: `boolean`

- **onUseSkill**: `(skillData: SkillData | Record<string, unknown>) => void | Promise<void>`

- **availableTargets**: `AvailableTarget[]`

- **currentPhase**: `number`

- **userSkillUses** (可选): `Array<{`

- **round_number**: `number`

- **phase**: `string`

- **skill_name**: `string`

**完整定义**:

```typescript
interface RoleSpecificSkillsProps {
roleName: string;
  skillEffects: SkillEffects | Record<string, unknown>; // 兼容动态数据
  roleAttributes: RoleAttributes | Record<string, unknown>; // 兼容动态数据
  canUseSkill: boolean;
  onUseSkill: (skillData: SkillData | Record<string, unknown>) => void | Promise<void>; // 兼容多种类型
  availableTargets: AvailableTarget[];
  currentPhase: number;
  userSkillUses?: Array<{
    round_number: number;
    phase: string;
    skill_name: string;
}
```

---

### SkillConflictData

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **id**: `string`

- **game_state_id**: `string`

- **round_number**: `number`

- **phase**: `string`

- **conflicting_skills**: `ConflictingSkill[] | unknown`

- **resolution_rule**: `string`

- **resolved_skill_id**: `string`

- **created_at**: `string`

- **updated_at** (可选): `string`

**完整定义**:

```typescript
interface SkillConflictData {
  id: string;
  game_state_id: string;
  round_number: number;
  phase: string;
  conflicting_skills: ConflictingSkill[] | unknown; // 兼容数据库Json类型
  resolution_rule: string;
  resolved_skill_id: string;
  created_at: string;
  updated_at?: string;
}
```

---

### ConflictingSkill

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **skill_use_id**: `string`

- **skill_name**: `string`

- **user_id**: `string`

- **priority**: `number`

- **key**: `string]: unknown`

**完整定义**:

```typescript
interface ConflictingSkill {
  skill_use_id: string;
  skill_name: string;
  user_id: string;
  priority: number;
  [key: string]: unknown;
}
```

---

### ResourceStats

**文件位置**: `src\types\skill.types.ts`

**属性**:

- **memoryUsage**: `string`

- **registeredIntervals**: `number`

- **registeredTimeouts**: `number`

- **lastCleanup** (可选): `string`

**完整定义**:

```typescript
interface ResourceStats {
  memoryUsage: string;
  registeredIntervals: number;
  registeredTimeouts: number;
  lastCleanup?: string;
}
```

---

### SkillUsageRecord

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **skillId**: `string`

- **used**: `number`

- **remaining**: `number`

- **total**: `number`

- **lastUsed** (可选): `number`

**完整定义**:

```typescript
interface SkillUsageRecord {
  /** 技能ID */
  skillId: string;
  /** 已使用次数 */
  used: number;
  /** 剩余使用次数 */
  remaining: number;
  /** 总使用次数限制 */
  total: number;
  /** 最后使用时间 */
  lastUsed?: number;
}
```

---

### RoleSkillUsageState

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **skillId**: `string]: SkillUsageRecord`

**完整定义**:

```typescript
interface RoleSkillUsageState {
  /** 技能使用记录映射 */
  [skillId: string]: SkillUsageRecord;
}
```

---

### RoundSkillUsage

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **roundNumber**: `number]: string[]`

**完整定义**:

```typescript
interface RoundSkillUsage {
  /** 回合号到技能ID列表的映射 */
  [roundNumber: number]: string[];
}
```

---

### LegacySkillUsageState

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **total**: `number`

- **remaining**: `number`

**完整定义**:

```typescript
interface LegacySkillUsageState {
  /** 总使用次数 */
  total: number;
  /** 剩余使用次数 */
  remaining: number;
}
```

---

### RoleDesign

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **id**: `string`

- **role_name**: `string`

- **skill_name**: `string`

- **skill_description** (可选): `string`

- **role_description** (可选): `string`

- **faction** (可选): `'werewolf' | 'villager' | 'neutral'`

- **priority** (可选): `number`

- **is_enabled** (可选): `boolean`

- **created_at** (可选): `string`

- **updated_at** (可选): `string`

**完整定义**:

```typescript
interface RoleDesign {
  /** 角色ID */
  id: string;
  /** 角色名称 */
  role_name: string;
  /** 技能名称（英文） */
  skill_name: string;
  /** 技能描述（中文） */
  skill_description?: string;
  /** 角色描述 */
  role_description?: string;
  /** 角色阵营 */
  faction?: 'werewolf' | 'villager' | 'neutral';
  /** 角色优先级 */
  priority?: number;
  /** 是否启用 */
  is_enabled?: boolean;
  /** 创建时间 */
  created_at?: string;
  /** 更新时间 */
  updated_at?: string;
}
```

---

### SkillConfig

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **id**: `string`

- **chineseName**: `string`

- **englishName**: `string`

- **priority**: `number`

- **phase**: `GamePhase`

- **usageLimit**: `SkillUsageLimit`

- **requiredStatus**: `string[]`

- **targetType**: `SkillTargetType`

- **effectType**: `SkillEffectType[]`

- **isPassive**: `boolean`

- **conflictsWith**: `string[]`

- **description** (可选): `string`

- **cooldown** (可选): `number`

**完整定义**:

```typescript
interface SkillConfig {
  /** 技能唯一标识 */
  id: string;
  /** 中文名称 */
  chineseName: string;
  /** 英文名称 */
  englishName: string;
  /** 优先级（数字越大优先级越高） */
  priority: number;
  /** 适用阶段 */
  phase: GamePhase;
  /** 使用限制 */
  usageLimit: SkillUsageLimit;
  /** 需要的角色状态 */
  requiredStatus: string[];
  /** 目标类型 */
  targetType: SkillTargetType;
  /** 效果类型 */
  effectType: SkillEffectType[];
  /** 是否为被动技能 */
  isPassive: boolean;
  /** 冲突的技能ID列表 */
  conflictsWith: string[];
  /** 技能描述 */
  description?: string;
  /** 冷却时间（回合数） */
  cooldown?: number;
}
```

---

### SkillUsageContext

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **userId**: `string`

- **gameStateId**: `string`

- **roomId**: `string`

- **currentPhase**: `number`

- **currentRound**: `number`

- **roleState**: `RoleState`

- **roleDesign**: `RoleDesign`

- **targetUserId** (可选): `string`

- **additionalData** (可选): `SkillAdditionalData`

**完整定义**:

```typescript
interface SkillUsageContext {
  /** 用户ID */
  userId: string;
  /** 游戏状态ID */
  gameStateId: string;
  /** 房间ID */
  roomId: string;
  /** 当前阶段 */
  currentPhase: number;
  /** 当前回合 */
  currentRound: number;
  /** 角色状态 */
  roleState: RoleState;
  /** 角色设计 */
  roleDesign: RoleDesign;
  /** 目标用户ID */
  targetUserId?: string;
  /** 额外数据 */
  additionalData?: SkillAdditionalData;
}
```

---

### SkillAdditionalData

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **potionType** (可选): `'heal' | 'poison'`

- **effectType** (可选): `SkillEffectType`

- **skill_config_id** (可选): `string`

- **chinese_name** (可选): `string`

- **priority** (可选): `number`

- **key**: `string]: unknown`

**完整定义**:

```typescript
interface SkillAdditionalData {
  /** 魔药类型（女巫专用） */
  potionType?: 'heal' | 'poison';
  /** 效果类型 */
  effectType?: SkillEffectType;
  /** 技能配置ID */
  skill_config_id?: string;
  /** 中文名称 */
  chinese_name?: string;
  /** 优先级 */
  priority?: number;
  /** 其他自定义数据 */
  [key: string]: unknown;
}
```

---

### SkillValidationResult

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **isValid**: `boolean`

- **reason** (可选): `string`

- **conflictingSkills** (可选): `string[]`

- **suggestedAction** (可选): `string`

- **details** (可选): `SkillValidationDetails`

**完整定义**:

```typescript
interface SkillValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 失败原因 */
  reason?: string;
  /** 冲突的技能列表 */
  conflictingSkills?: string[];
  /** 建议的操作 */
  suggestedAction?: string;
  /** 验证详情 */
  details?: SkillValidationDetails;
}
```

---

### SkillValidationDetails

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **phaseCheck**: `boolean`

- **statusCheck**: `boolean`

- **usageCheck**: `boolean`

- **targetCheck**: `boolean`

- **conflictCheck**: `boolean`

- **permissionCheck**: `boolean`

**完整定义**:

```typescript
interface SkillValidationDetails {
  /** 阶段检查结果 */
  phaseCheck: boolean;
  /** 状态检查结果 */
  statusCheck: boolean;
  /** 使用次数检查结果 */
  usageCheck: boolean;
  /** 目标检查结果 */
  targetCheck: boolean;
  /** 冲突检查结果 */
  conflictCheck: boolean;
  /** 权限检查结果 */
  permissionCheck: boolean;
}
```

---

### SkillConflictResult

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **hasConflicts**: `boolean`

- **conflicts**: `string[]`

- **conflictDetails** (可选): `SkillConflictDetail[]`

**完整定义**:

```typescript
interface SkillConflictResult {
  /** 是否有冲突 */
  hasConflicts: boolean;
  /** 冲突列表 */
  conflicts: string[];
  /** 冲突详情 */
  conflictDetails?: SkillConflictDetail[];
}
```

---

### SkillConflictDetail

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **skill1**: `SkillConfig`

- **skill2**: `SkillConfig`

- **conflictType**: `'direct' | 'indirect' | 'priority'`

- **description**: `string`

- **resolution** (可选): `string`

**完整定义**:

```typescript
interface SkillConflictDetail {
  /** 技能1 */
  skill1: SkillConfig;
  /** 技能2 */
  skill2: SkillConfig;
  /** 冲突类型 */
  conflictType: 'direct' | 'indirect' | 'priority';
  /** 冲突描述 */
  description: string;
  /** 解决建议 */
  resolution?: string;
}
```

---

### SkillUsageSuggestion

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **canUse**: `boolean`

- **suggestion**: `string`

- **priority**: `'high' | 'medium' | 'low'`

- **timing**: `string`

- **riskAssessment** (可选): `'low' | 'medium' | 'high'`

- **successProbability** (可选): `number`

**完整定义**:

```typescript
interface SkillUsageSuggestion {
  /** 是否可以使用 */
  canUse: boolean;
  /** 建议内容 */
  suggestion: string;
  /** 优先级 */
  priority: 'high' | 'medium' | 'low';
  /** 建议时机 */
  timing: string;
  /** 风险评估 */
  riskAssessment?: 'low' | 'medium' | 'high';
  /** 成功概率 */
  successProbability?: number;
}
```

---

### SkillStatistics

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **totalUses**: `number`

- **successCount**: `number`

- **failureCount**: `number`

- **successRate**: `number`

- **averageExecutionTime**: `number`

- **lastUsedAt** (可选): `string`

- **usageFrequency**: `number`

**完整定义**:

```typescript
interface SkillStatistics {
  /** 总使用次数 */
  totalUses: number;
  /** 成功次数 */
  successCount: number;
  /** 失败次数 */
  failureCount: number;
  /** 成功率 */
  successRate: number;
  /** 平均执行时间 */
  averageExecutionTime: number;
  /** 最后使用时间 */
  lastUsedAt?: string;
  /** 使用频率（每回合） */
  usageFrequency: number;
}
```

---

### SkillError

**文件位置**: `src\types\skillSystem.types.ts`

**属性**:

- **type**: `SkillErrorType`

- **code**: `string`

- **message**: `string`

- **skillName** (可选): `string`

- **userId** (可选): `string`

- **gameStateId** (可选): `string`

- **originalError** (可选): `unknown`

- **timestamp**: `number`

- **context** (可选): `Record<string, unknown>`

**完整定义**:

```typescript
interface SkillError {
  /** 错误类型 */
  type: SkillErrorType;
  /** 错误代码 */
  code: string;
  /** 错误消息 */
  message: string;
  /** 技能名称 */
  skillName?: string;
  /** 用户ID */
  userId?: string;
  /** 游戏状态ID */
  gameStateId?: string;
  /** 原始错误 */
  originalError?: unknown;
  /** 错误时间戳 */
  timestamp: number;
  /** 错误上下文 */
  context?: Record<string, unknown>;
}
```

---

### BehaviorAnalysisResult

**文件位置**: `src\utils\advancedInputValidationSystem.ts`

**属性**:

- **suspicious**: `boolean`

- **riskScore**: `number`

- **patterns**: `string[]`

- **anomalies**: `string[]`

- **userProfile**: `{`

- **isNewUser**: `boolean`

- **riskLevel**: `string`

- **historicalBehavior**: `any`

**完整定义**:

```typescript
interface BehaviorAnalysisResult {
suspicious: boolean;
  riskScore: number;
  patterns: string[];
  anomalies: string[];
  userProfile: {
    isNewUser: boolean;
    riskLevel: string;
    historicalBehavior: any;
}
```

---

### AdvancedValidationContext

**文件位置**: `src\utils\advancedInputValidationSystem.ts`

**属性**:

- **sessionId**: `string`

- **userId** (可选): `string`

- **requestId**: `string`

- **timestamp**: `number`

- **request**: `{`

- **ip**: `string`

- **userAgent**: `string`

- **referer** (可选): `string`

- **origin** (可选): `string`

- **method**: `string`

- **path**: `string`

- **headers**: `Record<string, string>`

**完整定义**:

```typescript
interface AdvancedValidationContext {
// 基础信息
  sessionId: string;
  userId?: string;
  requestId: string;
  timestamp: number;

  // 请求信息
  request: {
    ip: string;
    userAgent: string;
    referer?: string;
    origin?: string;
    method: string;
    path: string;
    headers: Record<string, string>;
}
```

---

### ValidationMetrics

**文件位置**: `src\utils\advancedInputValidationSystem.ts`

**属性**:

- **totalValidations**: `number`

- **successfulValidations**: `number`

- **failedValidations**: `number`

- **threatsDetected**: `number`

- **averageProcessingTime**: `number`

- **cacheHitRate**: `number`

- **threatsByType**: `Map<string, number>`

- **threatsByLevel**: `Map<ThreatLevel, number>`

- **performanceMetrics**: `{`

- **p50ResponseTime**: `number`

- **p95ResponseTime**: `number`

- **p99ResponseTime**: `number`

- **errorRate**: `number`

**完整定义**:

```typescript
interface ValidationMetrics {
totalValidations: number;
  successfulValidations: number;
  failedValidations: number;
  threatsDetected: number;
  averageProcessingTime: number;
  cacheHitRate: number;

  // 威胁统计
  threatsByType: Map<string, number>;
  threatsByLevel: Map<ThreatLevel, number>;

  // 性能统计
  performanceMetrics: {
    p50ResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    errorRate: number;
}
```

---

### AIModelConfig

**文件位置**: `src\utils\advancedInputValidationSystem.ts`

**属性**:

- **modelType**: `'neural_network' | 'decision_tree' | 'ensemble'`

- **modelVersion**: `string`

- **confidenceThreshold**: `number`

- **enableOnlineLearning**: `boolean`

- **retrainInterval**: `number`

- **features**: `string[]`

**完整定义**:

```typescript
interface AIModelConfig {
  modelType: 'neural_network' | 'decision_tree' | 'ensemble';
  modelVersion: string;
  confidenceThreshold: number;
  enableOnlineLearning: boolean;
  retrainInterval: number;
  features: string[];
}
```

---

### AdvancedRole

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **displayName**: `string`

- **description**: `string`

- **type**: `RoleType`

- **scope**: `PermissionScope`

- **parentRoles**: `string[]`

- **childRoles**: `string[]`

- **level**: `number`

- **priority**: `number`

- **permissions**: `AdvancedPermission[]`

- **inheritedPermissions**: `AdvancedPermission[]`

- **delegatedPermissions**: `AdvancedPermission[]`

- **constraints**: `RoleConstraint[]`

- **conditions**: `RoleCondition[]`

- **validFrom** (可选): `number`

- **validTo** (可选): `number`

- **maxDuration** (可选): `number`

- **isActive**: `boolean`

- **isSystem**: `boolean`

- **isAssignable**: `boolean`

- **metadata**: `Record<string, any>`

- **tags**: `string[]`

- **createdAt**: `number`

- **updatedAt**: `number`

- **createdBy**: `string`

- **updatedBy**: `string`

**完整定义**:

```typescript
interface AdvancedRole {
  id: string;
  name: string;
  displayName: string;
  description: string;
  type: RoleType;
  scope: PermissionScope;

  // 层级关系
  parentRoles: string[];
  childRoles: string[];
  level: number;
  priority: number;

  // 权限配置
  permissions: AdvancedPermission[];
  inheritedPermissions: AdvancedPermission[];
  delegatedPermissions: AdvancedPermission[];

  // 约束条件
  constraints: RoleConstraint[];
  conditions: RoleCondition[];

  // 时间控制
  validFrom?: number;
  validTo?: number;
  maxDuration?: number;

  // 状态信息
  isActive: boolean;
  isSystem: boolean;
  isAssignable: boolean;

  // 元数据
  metadata: Record<string, any>;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
}
```

---

### AdvancedPermission

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **displayName**: `string`

- **description**: `string`

- **category**: `string`

- **subcategory** (可选): `string`

- **action**: `string`

- **resource**: `string`

- **scope**: `PermissionScope`

- **scopeId** (可选): `string`

- **level**: `number`

- **priority**: `number`

- **constraints**: `PermissionConstraint[]`

- **conditions**: `PermissionCondition[]`

- **validFrom** (可选): `number`

- **validTo** (可选): `number`

- **maxUsage** (可选): `number`

- **usageCount** (可选): `number`

- **state**: `PermissionState`

- **isInheritable**: `boolean`

- **isDelegatable**: `boolean`

- **isRevocable**: `boolean`

- **dependencies**: `string[]`

- **conflicts**: `string[]`

- **metadata**: `Record<string, any>`

- **tags**: `string[]`

- **createdAt**: `number`

- **updatedAt**: `number`

**完整定义**:

```typescript
interface AdvancedPermission {
  id: string;
  name: string;
  displayName: string;
  description: string;

  // 权限分类
  category: string;
  subcategory?: string;
  action: string;
  resource: string;

  // 权限范围
  scope: PermissionScope;
  scopeId?: string;

  // 权限级别
  level: number;
  priority: number;

  // 约束条件
  constraints: PermissionConstraint[];
  conditions: PermissionCondition[];

  // 时间控制
  validFrom?: number;
  validTo?: number;
  maxUsage?: number;
  usageCount?: number;

  // 状态信息
  state: PermissionState;
  isInheritable: boolean;
  isDelegatable: boolean;
  isRevocable: boolean;

  // 依赖关系
  dependencies: string[];
  conflicts: string[];

  // 元数据
  metadata: Record<string, any>;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}
```

---

### RoleConstraint

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **type**: `'mutual_exclusion' | 'prerequisite' | 'cardinality' | 'separation_of_duty' | 'time_based' | 'location_based'`

- **description**: `string`

- **parameters**: `Record<string, any>`

- **isActive**: `boolean`

**完整定义**:

```typescript
interface RoleConstraint {
  id: string;
  type:
    | 'mutual_exclusion'
    | 'prerequisite'
    | 'cardinality'
    | 'separation_of_duty'
    | 'time_based'
    | 'location_based';
  description: string;
  parameters: Record<string, any>;
  isActive: boolean;
}
```

---

### RoleCondition

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **type**: `'user_attribute' | 'context' | 'time' | 'location' | 'custom'`

- **field**: `string`

- **operator**: `'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than' | 'matches' | 'custom'`

- **value**: `any`

- **description** (可选): `string`

**完整定义**:

```typescript
interface RoleCondition {
  id: string;
  type: 'user_attribute' | 'context' | 'time' | 'location' | 'custom';
  field: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'in'
    | 'not_in'
    | 'greater_than'
    | 'less_than'
    | 'matches'
    | 'custom';
  value: any;
  description?: string;
}
```

---

### PermissionConstraint

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **type**: `'time_window' | 'usage_limit' | 'ip_restriction' | 'device_restriction' | 'approval_required' | 'custom'`

- **description**: `string`

- **parameters**: `Record<string, any>`

- **isActive**: `boolean`

**完整定义**:

```typescript
interface PermissionConstraint {
  id: string;
  type:
    | 'time_window'
    | 'usage_limit'
    | 'ip_restriction'
    | 'device_restriction'
    | 'approval_required'
    | 'custom';
  description: string;
  parameters: Record<string, any>;
  isActive: boolean;
}
```

---

### PermissionCondition

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **type**: `'context' | 'resource_state' | 'user_state' | 'environment' | 'custom'`

- **field**: `string`

- **operator**: `'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than' | 'matches' | 'custom'`

- **value**: `any`

- **description** (可选): `string`

**完整定义**:

```typescript
interface PermissionCondition {
  id: string;
  type: 'context' | 'resource_state' | 'user_state' | 'environment' | 'custom';
  field: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'in'
    | 'not_in'
    | 'greater_than'
    | 'less_than'
    | 'matches'
    | 'custom';
  value: any;
  description?: string;
}
```

---

### UserRoleAssignment

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **userId**: `string`

- **roleId**: `string`

- **assignedBy**: `string`

- **assignedAt**: `number`

- **reason**: `string`

- **validFrom** (可选): `number`

- **validTo** (可选): `number`

- **constraints**: `AssignmentConstraint[]`

- **conditions**: `AssignmentCondition[]`

- **isActive**: `boolean`

- **isTemporary**: `boolean`

- **isDelegated**: `boolean`

- **delegatedFrom** (可选): `string`

- **delegatedBy** (可选): `string`

- **delegationLevel** (可选): `number`

- **metadata**: `Record<string, any>`

- **lastUsed** (可选): `number`

- **usageCount**: `number`

**完整定义**:

```typescript
interface UserRoleAssignment {
  id: string;
  userId: string;
  roleId: string;

  // 分配信息
  assignedBy: string;
  assignedAt: number;
  reason: string;

  // 时间控制
  validFrom?: number;
  validTo?: number;

  // 约束条件
  constraints: AssignmentConstraint[];
  conditions: AssignmentCondition[];

  // 状态信息
  isActive: boolean;
  isTemporary: boolean;
  isDelegated: boolean;

  // 委托信息
  delegatedFrom?: string;
  delegatedBy?: string;
  delegationLevel?: number;

  // 元数据
  metadata: Record<string, any>;
  lastUsed?: number;
  usageCount: number;
}
```

---

### AssignmentConstraint

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **type**: `'approval_required' | 'time_limit' | 'usage_limit' | 'location_based' | 'custom'`

- **description**: `string`

- **parameters**: `Record<string, any>`

- **isActive**: `boolean`

**完整定义**:

```typescript
interface AssignmentConstraint {
  id: string;
  type:
    | 'approval_required'
    | 'time_limit'
    | 'usage_limit'
    | 'location_based'
    | 'custom';
  description: string;
  parameters: Record<string, any>;
  isActive: boolean;
}
```

---

### AssignmentCondition

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **id**: `string`

- **type**: `'user_attribute' | 'context' | 'time' | 'location' | 'approval' | 'custom'`

- **field**: `string`

- **operator**: `'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than' | 'matches' | 'custom'`

- **value**: `any`

- **description** (可选): `string`

**完整定义**:

```typescript
interface AssignmentCondition {
  id: string;
  type:
    | 'user_attribute'
    | 'context'
    | 'time'
    | 'location'
    | 'approval'
    | 'custom';
  field: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'in'
    | 'not_in'
    | 'greater_than'
    | 'less_than'
    | 'matches'
    | 'custom';
  value: any;
  description?: string;
}
```

---

### PermissionEvaluationContext

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **userId**: `string`

- **roleIds**: `string[]`

- **permissionName**: `string`

- **resourceId** (可选): `string`

- **resourceType** (可选): `string`

- **timestamp**: `number`

- **ip** (可选): `string`

- **userAgent** (可选): `string`

- **location** (可选): `{`

- **country** (可选): `string`

- **region** (可选): `string`

- **city** (可选): `string`

- **coordinates** (可选): `{ lat: number`

**完整定义**:

```typescript
interface PermissionEvaluationContext {
userId: string;
  roleIds: string[];
  permissionName: string;
  resourceId?: string;
  resourceType?: string;

  // 环境信息
  timestamp: number;
  ip?: string;
  userAgent?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
    coordinates?: { lat: number; lng: number
}
```

---

### PermissionEvaluationResult

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **allowed**: `boolean`

- **reason** (可选): `string`

- **evaluatedRoles**: `Array<{`

- **roleId**: `string`

- **roleName**: `string`

- **allowed**: `boolean`

- **reason** (可选): `string`

- **permissions**: `Array<{`

- **permissionId**: `string`

- **permissionName**: `string`

- **allowed**: `boolean`

- **reason** (可选): `string`

**完整定义**:

```typescript
interface PermissionEvaluationResult {
allowed: boolean;
  reason?: string;

  // 详细信息
  evaluatedRoles: Array<{
    roleId: string;
    roleName: string;
    allowed: boolean;
    reason?: string;
    permissions: Array<{
      permissionId: string;
      permissionName: string;
      allowed: boolean;
      reason?: string;
}
```

---

### RBACConfiguration

**文件位置**: `src\utils\advancedRBACSystem.ts`

**属性**:

- **enableInheritance**: `boolean`

- **enableDelegation**: `boolean`

- **enableConstraints**: `boolean`

- **enableConditions**: `boolean`

- **enforceConstraints**: `boolean`

- **requireApprovalForSensitive**: `boolean`

- **enableSeparationOfDuty**: `boolean`

- **enableLeastPrivilege**: `boolean`

- **enableCaching**: `boolean`

- **cacheTimeout**: `number`

- **enableParallelEvaluation**: `boolean`

- **maxEvaluationTime**: `number`

- **enableAuditTrail**: `boolean`

- **auditLevel**: `'basic' | 'detailed' | 'verbose'`

- **retentionDays**: `number`

- **enableAutoOptimization**: `boolean`

- **optimizationInterval**: `number`

- **enableConflictDetection**: `boolean`

- **enableRedundancyDetection**: `boolean`

**完整定义**:

```typescript
interface RBACConfiguration {
  // 基础配置
  enableInheritance: boolean;
  enableDelegation: boolean;
  enableConstraints: boolean;
  enableConditions: boolean;

  // 安全配置
  enforceConstraints: boolean;
  requireApprovalForSensitive: boolean;
  enableSeparationOfDuty: boolean;
  enableLeastPrivilege: boolean;

  // 性能配置
  enableCaching: boolean;
  cacheTimeout: number;
  enableParallelEvaluation: boolean;
  maxEvaluationTime: number;

  // 审计配置
  enableAuditTrail: boolean;
  auditLevel: 'basic' | 'detailed' | 'verbose';
  retentionDays: number;

  // 优化配置
  enableAutoOptimization: boolean;
  optimizationInterval: number;
  enableConflictDetection: boolean;
  enableRedundancyDetection: boolean;
}
```

---

### RateLimitConfig

**文件位置**: `src\utils\apiSecurityConfig.ts`

**属性**:

- **enabled**: `boolean`

- **windowMs**: `number`

- **maxRequests**: `number`

- **limitBy**: `'ip' | 'user' | 'apiKey' | 'custom'`

- **keyGenerator** (可选): `(req: any) => string`

- **message** (可选): `string`

- **statusCode** (可选): `number`

- **skipSuccessfulRequests** (可选): `boolean`

- **skipFailedRequests** (可选): `boolean`

- **whitelist** (可选): `string[]`

- **blacklist** (可选): `string[]`

**完整定义**:

```typescript
interface RateLimitConfig {
  /** 是否启用速率限制 */
  enabled: boolean;
  /** 时间窗口（秒） */
  windowMs: number;
  /** 最大请求数 */
  maxRequests: number;
  /** 限制类型（IP、用户、API密钥） */
  limitBy: 'ip' | 'user' | 'apiKey' | 'custom';
  /** 自定义限制键生成器 */
  keyGenerator?: (req: any) => string;
  /** 超限时的响应消息 */
  message?: string;
  /** 超限时的状态码 */
  statusCode?: number;
  /** 是否跳过成功的请求 */
  skipSuccessfulRequests?: boolean;
  /** 是否跳过失败的请求 */
  skipFailedRequests?: boolean;
  /** 白名单IP */
  whitelist?: string[];
  /** 黑名单IP */
  blacklist?: string[];
}
```

---

### CorsConfig

**文件位置**: `src\utils\apiSecurityConfig.ts`

**属性**:

- **enabled**: `boolean`

- **origin**: `string | string[] | boolean | ((origin: string) => boolean)`

- **methods**: `string[]`

- **allowedHeaders**: `string[]`

- **exposedHeaders** (可选): `string[]`

- **credentials**: `boolean`

- **maxAge** (可选): `number`

- **preflightContinue** (可选): `boolean`

- **optionsSuccessStatus** (可选): `number`

**完整定义**:

```typescript
interface CorsConfig {
  /** 是否启用CORS */
  enabled: boolean;
  /** 允许的源 */
  origin: string | string[] | boolean | ((origin: string) => boolean);
  /** 允许的HTTP方法 */
  methods: string[];
  /** 允许的请求头 */
  allowedHeaders: string[];
  /** 暴露的响应头 */
  exposedHeaders?: string[];
  /** 是否允许凭据 */
  credentials: boolean;
  /** 预检请求缓存时间 */
  maxAge?: number;
  /** 是否启用预检请求 */
  preflightContinue?: boolean;
  /** 预检请求成功状态码 */
  optionsSuccessStatus?: number;
}
```

---

### AuthenticationConfig

**文件位置**: `src\utils\apiSecurityConfig.ts`

**属性**:

- **type**: `AuthenticationType`

- **required**: `boolean`

- **jwt** (可选): `{`

- **secret**: `string`

- **algorithm**: `string`

- **expiresIn**: `string`

- **issuer** (可选): `string`

- **audience** (可选): `string`

- **clockTolerance** (可选): `number`

**完整定义**:

```typescript
interface AuthenticationConfig {
/** 认证类型 */
  type: AuthenticationType;
  /** 是否必需认证 */
  required: boolean;
  /** JWT配置 */
  jwt?: {
    /** 密钥 */
    secret: string;
    /** 算法 */
    algorithm: string;
    /** 过期时间 */
    expiresIn: string;
    /** 发行者 */
    issuer?: string;
    /** 受众 */
    audience?: string;
    /** 时钟偏移容忍度 */
    clockTolerance?: number;
}
```

---

### EncryptionConfig

**文件位置**: `src\utils\apiSecurityConfig.ts`

**属性**:

- **enabled**: `boolean`

- **algorithm**: `EncryptionAlgorithm`

- **key**: `string`

- **iv** (可选): `string`

- **encryptRequest**: `boolean`

- **encryptResponse**: `boolean`

- **encryptFields** (可选): `string[]`

- **keyRotation** (可选): `{`

- **enabled**: `boolean`

- **intervalHours**: `number`

- **retentionHours**: `number`

**完整定义**:

```typescript
interface EncryptionConfig {
/** 是否启用加密 */
  enabled: boolean;
  /** 加密算法 */
  algorithm: EncryptionAlgorithm;
  /** 加密密钥 */
  key: string;
  /** 初始化向量 */
  iv?: string;
  /** 是否加密请求体 */
  encryptRequest: boolean;
  /** 是否加密响应体 */
  encryptResponse: boolean;
  /** 需要加密的字段 */
  encryptFields?: string[];
  /** 密钥轮换配置 */
  keyRotation?: {
    /** 是否启用密钥轮换 */
    enabled: boolean;
    /** 轮换间隔（小时） */
    intervalHours: number;
    /** 旧密钥保留时间（小时） */
    retentionHours: number;
}
```

---

### InputValidationConfig

**文件位置**: `src\utils\apiSecurityConfig.ts`

**属性**:

- **enabled**: `boolean`

- **maxBodySize**: `string`

- **maxUrlLength**: `number`

- **maxHeaderSize**: `number`

- **allowedContentTypes**: `string[]`

- **xssProtection**: `boolean`

- **sqlInjectionProtection**: `boolean`

- **pathTraversalProtection**: `boolean`

- **commandInjectionProtection**: `boolean`

- **customRules** (可选): `Array<{`

- **name**: `string`

- **pattern**: `RegExp`

- **message**: `string`

- **block**: `boolean`

**完整定义**:

```typescript
interface InputValidationConfig {
/** 是否启用输入验证 */
  enabled: boolean;
  /** 最大请求体大小 */
  maxBodySize: string;
  /** 最大URL长度 */
  maxUrlLength: number;
  /** 最大头部大小 */
  maxHeaderSize: number;
  /** 允许的内容类型 */
  allowedContentTypes: string[];
  /** 是否启用XSS防护 */
  xssProtection: boolean;
  /** 是否启用SQL注入防护 */
  sqlInjectionProtection: boolean;
  /** 是否启用路径遍历防护 */
  pathTraversalProtection: boolean;
  /** 是否启用命令注入防护 */
  commandInjectionProtection: boolean;
  /** 自定义验证规则 */
  customRules?: Array<{
    /** 规则名称 */
    name: string;
    /** 规则模式 */
    pattern: RegExp;
    /** 错误消息 */
    message: string;
    /** 是否阻止请求 */
    block: boolean;
}
```

---

### SecurityHeadersConfig

**文件位置**: `src\utils\apiSecurityConfig.ts`

**属性**:

- **enabled**: `boolean`

- **contentSecurityPolicy** (可选): `{`

- **enabled**: `boolean`

- **directives**: `Record<string, string[]>`

- **reportOnly**: `boolean`

**完整定义**:

```typescript
interface SecurityHeadersConfig {
/** 是否启用安全头 */
  enabled: boolean;
  /** 内容安全策略 */
  contentSecurityPolicy?: {
    /** 是否启用 */
    enabled: boolean;
    /** CSP指令 */
    directives: Record<string, string[]>;
    /** 是否仅报告 */
    reportOnly: boolean;
}
```

---

### ConfigValidationResult

**文件位置**: `src\utils\apiSecurityConfig.ts`

**属性**:

- **isValid**: `boolean`

- **errors**: `string[]`

- **warnings**: `string[]`

- **suggestions**: `string[]`

**完整定义**:

```typescript
interface ConfigValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 错误列表 */
  errors: string[];
  /** 警告列表 */
  warnings: string[];
  /** 建议列表 */
  suggestions: string[];
}
```

---

### ConfigUpdateEvent

**文件位置**: `src\utils\apiSecurityConfig.ts`

**属性**:

- **type**: `'config_updated' | 'config_validated' | 'config_error'`

- **timestamp**: `Date`

- **version**: `string`

- **updatedFields** (可选): `string[]`

- **error** (可选): `string`

- **user** (可选): `{`

- **id**: `string`

- **name**: `string`

**完整定义**:

```typescript
interface ConfigUpdateEvent {
/** 事件类型 */
  type: 'config_updated' | 'config_validated' | 'config_error';
  /** 时间戳 */
  timestamp: Date;
  /** 配置版本 */
  version: string;
  /** 更新的字段 */
  updatedFields?: string[];
  /** 错误信息 */
  error?: string;
  /** 用户信息 */
  user?: {
    id: string;
    name: string;
}
```

---

### SecurityCheckConfig

**文件位置**: `src\utils\automatedSecurityChecker.ts`

**属性**:

- **types**: `SecurityCheckType[]`

- **level**: `SecurityCheckLevel`

- **interval**: `number`

- **enableRealTimeMonitoring**: `boolean`

- **enableAutoResponse**: `boolean`

- **maxConcurrentChecks**: `number`

- **checkTimeout**: `number`

- **excludeChecks**: `string[]`

- **customRules**: `SecurityCheckRule[]`

**完整定义**:

```typescript
interface SecurityCheckConfig {
  /** 检查类型 */
  types: SecurityCheckType[];
  /** 检查级别 */
  level: SecurityCheckLevel;
  /** 检查间隔（毫秒） */
  interval: number;
  /** 是否启用实时监控 */
  enableRealTimeMonitoring: boolean;
  /** 是否启用自动响应 */
  enableAutoResponse: boolean;
  /** 最大并发检查数 */
  maxConcurrentChecks: number;
  /** 检查超时时间（毫秒） */
  checkTimeout: number;
  /** 排除的检查项 */
  excludeChecks: string[];
  /** 自定义检查规则 */
  customRules: SecurityCheckRule[];
}
```

---

### SecurityCheckRule

**文件位置**: `src\utils\automatedSecurityChecker.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **description**: `string`

- **type**: `SecurityCheckType`

- **severity**: `VulnerabilitySeverity`

- **check**: `() => Promise<SecurityCheckResult>`

- **enabled**: `boolean`

- **frequency** (可选): `number`

**完整定义**:

```typescript
interface SecurityCheckRule {
  /** 规则ID */
  id: string;
  /** 规则名称 */
  name: string;
  /** 规则描述 */
  description: string;
  /** 检查类型 */
  type: SecurityCheckType;
  /** 严重级别 */
  severity: VulnerabilitySeverity;
  /** 检查函数 */
  check: () => Promise<SecurityCheckResult>;
  /** 是否启用 */
  enabled: boolean;
  /** 检查频率（毫秒） */
  frequency?: number;
}
```

---

### SecurityCheckResult

**文件位置**: `src\utils\automatedSecurityChecker.ts`

**属性**:

- **checkId**: `string`

- **type**: `SecurityCheckType`

- **status**: `'passed' | 'failed' | 'warning' | 'error'`

- **message**: `string`

- **severity**: `VulnerabilitySeverity`

- **timestamp**: `number`

- **duration**: `number`

- **details** (可选): `any`

- **recommendations** (可选): `string[]`

- **requiresImmediateAction**: `boolean`

**完整定义**:

```typescript
interface SecurityCheckResult {
  /** 检查ID */
  checkId: string;
  /** 检查类型 */
  type: SecurityCheckType;
  /** 检查状态 */
  status: 'passed' | 'failed' | 'warning' | 'error';
  /** 检查消息 */
  message: string;
  /** 严重级别 */
  severity: VulnerabilitySeverity;
  /** 检查时间 */
  timestamp: number;
  /** 检查耗时（毫秒） */
  duration: number;
  /** 详细信息 */
  details?: any;
  /** 建议措施 */
  recommendations?: string[];
  /** 是否需要立即处理 */
  requiresImmediateAction: boolean;
}
```

---

### SecurityMonitoringStats

**文件位置**: `src\utils\automatedSecurityChecker.ts`

**属性**:

- **totalChecks**: `number`

- **passedChecks**: `number`

- **failedChecks**: `number`

- **warningCount**: `number`

- **errorCount**: `number`

- **securityEvents**: `number`

- **checksByType**: `Record<SecurityCheckType, number>`

- **checksBySeverity**: `Record<VulnerabilitySeverity, number>`

- **averageCheckDuration**: `number`

- **lastCheckTime**: `number`

**完整定义**:

```typescript
interface SecurityMonitoringStats {
  /** 总检查次数 */
  totalChecks: number;
  /** 通过的检查数 */
  passedChecks: number;
  /** 失败的检查数 */
  failedChecks: number;
  /** 警告数 */
  warningCount: number;
  /** 错误数 */
  errorCount: number;
  /** 安全事件数 */
  securityEvents: number;
  /** 按类型统计 */
  checksByType: Record<SecurityCheckType, number>;
  /** 按严重级别统计 */
  checksBySeverity: Record<VulnerabilitySeverity, number>;
  /** 平均检查时间 */
  averageCheckDuration: number;
  /** 最后检查时间 */
  lastCheckTime: number;
}
```

---

### ValidationResult

**文件位置**: `src\utils\common\dataValidation.ts`

**属性**:

- **valid**: `boolean`

- **reason** (可选): `string`

- **data** (可选): `any`

**完整定义**:

```typescript
interface ValidationResult {
  /** 验证是否通过 */
  valid: boolean;
  /** 失败原因 */
  reason?: string;
  /** 额外数据 */
  data?: any;
}
```

---

### RetryableErrorConfig

**文件位置**: `src\utils\common\dataValidation.ts`

**属性**:

- **retryableTypes**: `SkillErrorType[]`

- **maxRetries** (可选): `number`

- **baseDelay** (可选): `number`

**完整定义**:

```typescript
interface RetryableErrorConfig {
  /** 可重试的错误类型列表 */
  retryableTypes: SkillErrorType[];
  /** 最大重试次数 */
  maxRetries?: number;
  /** 重试延迟基数（毫秒） */
  baseDelay?: number;
}
```

---

### ErrorRecoverySuggestion

**文件位置**: `src\utils\common\errorHandling.ts`

**属性**:

- **action**: `ErrorRecoveryAction`

- **description**: `string`

- **autoExecute** (可选): `boolean`

- **delay** (可选): `number`

**完整定义**:

```typescript
interface ErrorRecoverySuggestion {
  /** 建议的操作 */
  action: ErrorRecoveryAction;
  /** 建议描述 */
  description: string;
  /** 是否自动执行 */
  autoExecute?: boolean;
  /** 执行延迟（毫秒） */
  delay?: number;
}
```

---

### ErrorHandlingResult

**文件位置**: `src\utils\common\errorHandling.ts`

**属性**:

- **handled**: `boolean`

- **strategy**: `ErrorHandlingStrategy`

- **userMessage**: `string`

- **recoverySuggestion** (可选): `ErrorRecoverySuggestion`

- **shouldRetry**: `boolean`

- **retryDelay** (可选): `number`

**完整定义**:

```typescript
interface ErrorHandlingResult {
  /** 是否成功处理 */
  handled: boolean;
  /** 处理策略 */
  strategy: ErrorHandlingStrategy;
  /** 用户消息 */
  userMessage: string;
  /** 恢复建议 */
  recoverySuggestion?: ErrorRecoverySuggestion;
  /** 是否需要重试 */
  shouldRetry: boolean;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
}
```

---

### SkillUsageLimitResult

**文件位置**: `src\utils\common\skillValidation.ts`

**属性**:

- **allowed**: `boolean`

- **remainingUses** (可选): `number`

- **reason** (可选): `string`

- **resetTime** (可选): `Date`

**完整定义**:

```typescript
interface SkillUsageLimitResult {
  /** 是否允许使用 */
  allowed: boolean;
  /** 剩余使用次数 */
  remainingUses?: number;
  /** 限制原因 */
  reason?: string;
  /** 重置时间（如果有） */
  resetTime?: Date;
}
```

---

### SkillChainValidationResult

**文件位置**: `src\utils\common\skillValidation.ts`

**属性**:

- **valid**: `boolean`

- **executionOrder** (可选): `SkillType[]`

- **reason** (可选): `string`

- **conflicts** (可选): `SkillConflictResult[]`

**完整定义**:

```typescript
interface SkillChainValidationResult {
  /** 验证是否通过 */
  valid: boolean;
  /** 执行顺序 */
  executionOrder?: SkillType[];
  /** 验证失败原因 */
  reason?: string;
  /** 冲突详情 */
  conflicts?: SkillConflictResult[];
}
```

---

### RenderMetrics

**文件位置**: `src\utils\componentRenderOptimizer.ts`

**属性**:

- **componentName**: `string`

- **renderCount**: `number`

- **averageRenderTime**: `number`

- **lastRenderTime**: `number`

- **totalRenderTime**: `number`

- **propsChanges**: `number`

- **stateChanges**: `number`

- **timestamp**: `number`

**完整定义**:

```typescript
interface RenderMetrics {
  componentName: string;
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  totalRenderTime: number;
  propsChanges: number;
  stateChanges: number;
  timestamp: number;
}
```

---

### RenderOptimizationConfig

**文件位置**: `src\utils\componentRenderOptimizer.ts`

**属性**:

- **enableProfiling**: `boolean`

- **enableMemoization**: `boolean`

- **enableVirtualization**: `boolean`

- **debounceDelay**: `number`

- **throttleDelay**: `number`

- **maxRenderTime**: `number`

- **warningThreshold**: `number`

**完整定义**:

```typescript
interface RenderOptimizationConfig {
  enableProfiling: boolean;
  enableMemoization: boolean;
  enableVirtualization: boolean;
  debounceDelay: number;
  throttleDelay: number;
  maxRenderTime: number;
  warningThreshold: number;
}
```

---

### SecurityVulnerability

**文件位置**: `src\utils\comprehensiveSecurityAudit.ts`

**属性**:

- **id**: `string`

- **type**: `VulnerabilityType`

- **severity**: `VulnerabilitySeverity`

- **title**: `string`

- **description**: `string`

- **location**: `string`

- **evidence** (可选): `any`

- **impact**: `string`

- **recommendation**: `string`

- **cweId** (可选): `string`

- **cvssScore** (可选): `number`

- **exploitability**: `'easy' | 'medium' | 'hard'`

- **detectedAt**: `string`

**完整定义**:

```typescript
interface SecurityVulnerability {
  id: string;
  type: VulnerabilityType;
  severity: VulnerabilitySeverity;
  title: string;
  description: string;
  location: string;
  evidence?: any;
  impact: string;
  recommendation: string;
  cweId?: string;
  cvssScore?: number;
  exploitability: 'easy' | 'medium' | 'hard';
  detectedAt: string;
}
```

---

### SecurityAuditResult

**文件位置**: `src\utils\comprehensiveSecurityAudit.ts`

**属性**:

- **auditId**: `string`

- **timestamp**: `string`

- **overallScore**: `number`

- **riskLevel**: `'low' | 'medium' | 'high' | 'critical'`

- **vulnerabilities**: `SecurityVulnerability[]`

- **summary**: `{`

- **totalVulnerabilities**: `number`

- **criticalCount**: `number`

- **highCount**: `number`

- **mediumCount**: `number`

- **lowCount**: `number`

- **infoCount**: `number`

**完整定义**:

```typescript
interface SecurityAuditResult {
auditId: string;
  timestamp: string;
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilities: SecurityVulnerability[];
  summary: {
    totalVulnerabilities: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
    infoCount: number;
}
```

---

### AuditConfig

**文件位置**: `src\utils\comprehensiveSecurityAudit.ts`

**属性**:

- **includeCodeAnalysis**: `boolean`

- **includeConfigurationCheck**: `boolean`

- **includeRuntimeAnalysis**: `boolean`

- **includePenetrationTesting**: `boolean`

- **includeComplianceCheck**: `boolean`

- **depth**: `'basic' | 'standard' | 'comprehensive'`

- **excludeCategories**: `VulnerabilityType[]`

- **customRules**: `Array<{`

- **name**: `string`

- **check**: `() => Promise<SecurityVulnerability[]>`

**完整定义**:

```typescript
interface AuditConfig {
includeCodeAnalysis: boolean;
  includeConfigurationCheck: boolean;
  includeRuntimeAnalysis: boolean;
  includePenetrationTesting: boolean;
  includeComplianceCheck: boolean;
  depth: 'basic' | 'standard' | 'comprehensive';
  excludeCategories: VulnerabilityType[];
  customRules: Array<{
    name: string;
    check: () => Promise<SecurityVulnerability[]>;
}
```

---

### ValidationRule

**文件位置**: `src\utils\enhancedInputValidation.ts`

**属性**:

- **type**: `ValidationRuleType`

- **params** (可选): `any`

- **message** (可选): `string`

- **required** (可选): `boolean`

- **validator** (可选): `(value: any, context?: ValidationContext) => boolean | Promise<boolean>`

**完整定义**:

```typescript
interface ValidationRule {
  /** 规则类型 */
  type: ValidationRuleType;
  /** 规则参数 */
  params?: any;
  /** 错误消息 */
  message?: string;
  /** 是否必需 */
  required?: boolean;
  /** 自定义验证函数 */
  validator?: (
    value: any,
    context?: ValidationContext
  ) => boolean | Promise<boolean>;
}
```

---

### FieldValidationConfig

**文件位置**: `src\utils\enhancedInputValidation.ts`

**属性**:

- **name**: `string`

- **type**: `DataType`

- **rules**: `ValidationRule[]`

- **required** (可选): `boolean`

- **defaultValue** (可选): `any`

- **description** (可选): `string`

- **sanitize** (可选): `boolean`

- **sanitizer** (可选): `(value: any) => any`

**完整定义**:

```typescript
interface FieldValidationConfig {
  /** 字段名称 */
  name: string;
  /** 数据类型 */
  type: DataType;
  /** 验证规则列表 */
  rules: ValidationRule[];
  /** 是否必需 */
  required?: boolean;
  /** 默认值 */
  defaultValue?: any;
  /** 字段描述 */
  description?: string;
  /** 是否启用清理 */
  sanitize?: boolean;
  /** 自定义清理函数 */
  sanitizer?: (value: any) => any;
}
```

---

### ValidationConfig

**文件位置**: `src\utils\enhancedInputValidation.ts`

**属性**:

- **fields**: `FieldValidationConfig[]`

- **global** (可选): `{`

- **maxStringLength** (可选): `number`

- **maxArrayLength** (可选): `number`

- **maxObjectDepth** (可选): `number`

- **allowedFileTypes** (可选): `string[]`

- **maxFileSize** (可选): `number`

- **enableSanitization** (可选): `boolean`

- **enableXSSProtection** (可选): `boolean`

- **enableSQLInjectionProtection** (可选): `boolean`

- **strictMode** (可选): `boolean`

**完整定义**:

```typescript
interface ValidationConfig {
/** 字段配置列表 */
  fields: FieldValidationConfig[];
  /** 全局配置 */
  global?: {
    /** 最大字符串长度 */
    maxStringLength?: number;
    /** 最大数组长度 */
    maxArrayLength?: number;
    /** 最大对象深度 */
    maxObjectDepth?: number;
    /** 允许的文件类型 */
    allowedFileTypes?: string[];
    /** 最大文件大小 */
    maxFileSize?: number;
    /** 是否启用清理 */
    enableSanitization?: boolean;
    /** 是否启用XSS防护 */
    enableXSSProtection?: boolean;
    /** 是否启用SQL注入防护 */
    enableSQLInjectionProtection?: boolean;
    /** 严格模式 */
    strictMode?: boolean;
}
```

---

### ValidationContext

**文件位置**: `src\utils\enhancedInputValidation.ts`

**属性**:

- **fieldName**: `string`

- **data**: `any`

- **config**: `ValidationConfig`

- **path**: `string[]`

- **depth**: `number`

- **user** (可选): `{`

- **id**: `string`

- **role**: `string`

**完整定义**:

```typescript
interface ValidationContext {
/** 字段名称 */
  fieldName: string;
  /** 完整数据对象 */
  data: any;
  /** 验证配置 */
  config: ValidationConfig;
  /** 当前路径 */
  path: string[];
  /** 验证深度 */
  depth: number;
  /** 用户信息 */
  user?: {
    id: string;
    role: string;
}
```

---

### ValidationError

**文件位置**: `src\utils\enhancedInputValidation.ts`

**属性**:

- **field**: `string`

- **type**: `ValidationRuleType`

- **message**: `string`

- **value**: `any`

- **path**: `string[]`

- **ruleParams** (可选): `any`

**完整定义**:

```typescript
interface ValidationError {
  /** 字段名称 */
  field: string;
  /** 错误类型 */
  type: ValidationRuleType;
  /** 错误消息 */
  message: string;
  /** 错误值 */
  value: any;
  /** 字段路径 */
  path: string[];
  /** 规则参数 */
  ruleParams?: any;
}
```

---

### FileValidationConfig

**文件位置**: `src\utils\enhancedInputValidation.ts`

**属性**:

- **allowedTypes**: `string[]`

- **maxSize**: `number`

- **minSize** (可选): `number`

- **allowedMimeTypes** (可选): `string[]`

- **checkContent** (可选): `boolean`

- **scanVirus** (可选): `boolean`

**完整定义**:

```typescript
interface FileValidationConfig {
  /** 允许的文件类型 */
  allowedTypes: string[];
  /** 最大文件大小（字节） */
  maxSize: number;
  /** 最小文件大小（字节） */
  minSize?: number;
  /** 允许的MIME类型 */
  allowedMimeTypes?: string[];
  /** 是否检查文件内容 */
  checkContent?: boolean;
  /** 是否扫描病毒 */
  scanVirus?: boolean;
}
```

---

### Permission

**文件位置**: `src\utils\enhancedPermissionSystem.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **description**: `string`

- **type**: `PermissionType`

- **resourceType**: `ResourceType`

- **resourceId** (可选): `string`

- **conditions** (可选): `PermissionCondition[]`

- **level**: `number`

- **inheritable**: `boolean`

- **createdAt**: `number`

- **updatedAt**: `number`

- **expiresAt** (可选): `number`

**完整定义**:

```typescript
interface Permission {
  /** 权限ID */
  id: string;
  /** 权限名称 */
  name: string;
  /** 权限描述 */
  description: string;
  /** 权限类型 */
  type: PermissionType;
  /** 资源类型 */
  resourceType: ResourceType;
  /** 资源ID（可选，用于特定资源权限） */
  resourceId?: string;
  /** 权限条件（可选） */
  conditions?: PermissionCondition[];
  /** 权限级别 */
  level: number;
  /** 是否可继承 */
  inheritable: boolean;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
  /** 过期时间（可选） */
  expiresAt?: number;
}
```

---

### Role

**文件位置**: `src\utils\enhancedPermissionSystem.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **description**: `string`

- **permissions**: `string[]`

- **parentRoleId** (可选): `string`

- **childRoleIds**: `string[]`

- **level**: `number`

- **isSystemRole**: `boolean`

- **isActive**: `boolean`

- **createdAt**: `number`

- **updatedAt**: `number`

**完整定义**:

```typescript
interface Role {
  /** 角色ID */
  id: string;
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  description: string;
  /** 角色权限列表 */
  permissions: string[];
  /** 父角色ID（用于角色继承） */
  parentRoleId?: string;
  /** 子角色ID列表 */
  childRoleIds: string[];
  /** 角色级别 */
  level: number;
  /** 是否系统角色 */
  isSystemRole: boolean;
  /** 是否激活 */
  isActive: boolean;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
}
```

---

### UserPermissions

**文件位置**: `src\utils\enhancedPermissionSystem.ts`

**属性**:

- **userId**: `string`

- **directPermissions**: `string[]`

- **rolePermissions**: `Map<string, string[]>`

- **inheritedPermissions**: `string[]`

- **cacheTime**: `number`

- **version**: `number`

**完整定义**:

```typescript
interface UserPermissions {
  /** 用户ID */
  userId: string;
  /** 直接分配的权限 */
  directPermissions: string[];
  /** 角色分配的权限 */
  rolePermissions: Map<string, string[]>;
  /** 继承的权限 */
  inheritedPermissions: string[];
  /** 权限缓存时间 */
  cacheTime: number;
  /** 权限版本 */
  version: number;
}
```

---

### PermissionAuditLog

**文件位置**: `src\utils\enhancedPermissionSystem.ts`

**属性**:

- **id**: `string`

- **action**: `'grant' | 'revoke' | 'check' | 'modify' | 'inherit'`

- **userId**: `string`

- **permissionId**: `string`

- **resource**: `{`

- **type**: `ResourceType`

- **id** (可选): `string`

**完整定义**:

```typescript
interface PermissionAuditLog {
/** 日志ID */
  id: string;
  /** 操作类型 */
  action: 'grant' | 'revoke' | 'check' | 'modify' | 'inherit';
  /** 用户ID */
  userId: string;
  /** 权限ID */
  permissionId: string;
  /** 资源信息 */
  resource: {
    type: ResourceType;
    id?: string;
}
```

---

### EnhancedCacheConfig

**文件位置**: `src\utils\enhancedQueryCacheStrategy.ts`

**属性**:

- **strategy**: `EnhancedCacheStrategy`

- **baseTTL**: `number`

- **maxTTL**: `number`

- **minTTL**: `number`

- **adaptiveTTL**: `boolean`

- **maxMemoryUsage**: `number`

- **compressionThreshold**: `number`

- **maxCacheSize**: `number`

- **enablePreloading**: `boolean`

- **preloadThreshold**: `number`

- **maxPreloadItems**: `number`

- **preloadBatchSize**: `number`

- **enableLearning**: `boolean`

- **learningRate**: `number`

- **optimizationInterval**: `number`

- **enableMetrics**: `boolean`

- **metricsInterval**: `number`

- **alertThresholds**: `{`

- **hitRate**: `number`

- **memoryUsage**: `number`

- **responseTime**: `number`

**完整定义**:

```typescript
interface EnhancedCacheConfig {
strategy: EnhancedCacheStrategy;

  // TTL配置
  baseTTL: number;
  maxTTL: number;
  minTTL: number;
  adaptiveTTL: boolean;

  // 性能配置
  maxMemoryUsage: number;        // 最大内存使用（字节）
  compressionThreshold: number;   // 压缩阈值（字节）
  maxCacheSize: number;          // 最大缓存条目数

  // 预加载配置
  enablePreloading: boolean;
  preloadThreshold: number;      // 预加载触发阈值
  maxPreloadItems: number;       // 最大预加载项目数
  preloadBatchSize: number;      // 预加载批次大小

  // 智能优化配置
  enableLearning: boolean;       // 启用机器学习优化
  learningRate: number;          // 学习率
  optimizationInterval: number;  // 优化间隔（毫秒）

  // 监控配置
  enableMetrics: boolean;        // 启用指标收集
  metricsInterval: number;       // 指标收集间隔
  alertThresholds: {
    hitRate: number;
    memoryUsage: number;
    responseTime: number;
}
```

---

### EnhancedQueryContext

**文件位置**: `src\utils\enhancedQueryCacheStrategy.ts`

**属性**:

- **key**: `string`

- **priority**: `QueryPriority`

- **tags**: `string[]`

- **userId** (可选): `string`

- **sessionId** (可选): `string`

- **expectedSize** (可选): `number`

- **cacheable**: `boolean`

- **customTTL** (可选): `number`

- **level**: `CacheLevel`

- **compression** (可选): `boolean`

- **metadata** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface EnhancedQueryContext {
  key: string;
  priority: QueryPriority;
  tags: string[];
  userId?: string;
  sessionId?: string;
  expectedSize?: number;
  cacheable: boolean;
  customTTL?: number;
  level: CacheLevel;
  compression?: boolean;
  metadata?: Record<string, any>;
}
```

---

### QueryMetrics

**文件位置**: `src\utils\enhancedQueryCacheStrategy.ts`

**属性**:

- **key**: `string`

- **hitCount**: `number`

- **missCount**: `number`

- **totalRequests**: `number`

- **hitRate**: `number`

- **avgResponseTime**: `number`

- **lastAccess**: `number`

- **accessPattern**: `string`

- **dataSize**: `number`

- **compressionRatio**: `number`

- **memoryUsage**: `number`

- **cacheLevel**: `CacheLevel`

- **ttlEffectiveness**: `number`

- **costBenefit**: `number`

**完整定义**:

```typescript
interface QueryMetrics {
  key: string;
  hitCount: number;
  missCount: number;
  totalRequests: number;
  hitRate: number;
  avgResponseTime: number;
  lastAccess: number;
  accessPattern: string;
  dataSize: number;
  compressionRatio: number;
  memoryUsage: number;
  cacheLevel: CacheLevel;
  ttlEffectiveness: number;
  costBenefit: number;
}
```

---

### CacheLevelStats

**文件位置**: `src\utils\enhancedQueryCacheStrategy.ts`

**属性**:

- **hits**: `number`

- **misses**: `number`

- **hitRate**: `number`

- **avgResponseTime**: `number`

- **memoryUsage**: `number`

- **itemCount**: `number`

**完整定义**:

```typescript
interface CacheLevelStats {
  hits: number;
  misses: number;
  hitRate: number;
  avgResponseTime: number;
  memoryUsage: number;
  itemCount: number;
}
```

---

### HourlyStats

**文件位置**: `src\utils\enhancedQueryCacheStrategy.ts`

**属性**:

- **hour**: `number`

- **queries**: `number`

- **hits**: `number`

- **avgResponseTime**: `number`

- **memoryUsage**: `number`

**完整定义**:

```typescript
interface HourlyStats {
  hour: number;
  queries: number;
  hits: number;
  avgResponseTime: number;
  memoryUsage: number;
}
```

---

### TrendAnalysis

**文件位置**: `src\utils\enhancedQueryCacheStrategy.ts`

**属性**:

- **hitRateTrend**: `'improving' | 'stable' | 'declining'`

- **memoryTrend**: `'increasing' | 'stable' | 'decreasing'`

- **performanceTrend**: `'improving' | 'stable' | 'declining'`

- **recommendations**: `string[]`

**完整定义**:

```typescript
interface TrendAnalysis {
  hitRateTrend: 'improving' | 'stable' | 'declining';
  memoryTrend: 'increasing' | 'stable' | 'decreasing';
  performanceTrend: 'improving' | 'stable' | 'declining';
  recommendations: string[];
}
```

---

### OptimizationRecommendation

**文件位置**: `src\utils\enhancedQueryCacheStrategy.ts`

**属性**:

- **type**: `'ttl' | 'compression' | 'preload' | 'eviction' | 'strategy'`

- **priority**: `'high' | 'medium' | 'low'`

- **description**: `string`

- **expectedImprovement**: `number`

- **implementation**: `string`

- **impact**: `{`

- **hitRate** (可选): `number`

- **memoryUsage** (可选): `number`

- **responseTime** (可选): `number`

**完整定义**:

```typescript
interface OptimizationRecommendation {
type: 'ttl' | 'compression' | 'preload' | 'eviction' | 'strategy';
  priority: 'high' | 'medium' | 'low';
  description: string;
  expectedImprovement: number;
  implementation: string;
  impact: {
    hitRate?: number;
    memoryUsage?: number;
    responseTime?: number;
}
```

---

### SubscriptionConfig

**文件位置**: `src\utils\enhancedRealtimeManager.ts`

**属性**:

- **table**: `string`

- **filter** (可选): `string`

- **event** (可选): `'INSERT' | 'UPDATE' | 'DELETE' | '*'`

- **schema** (可选): `string`

- **enableReconnect** (可选): `boolean`

- **maxReconnectAttempts** (可选): `number`

- **reconnectDelay** (可选): `number`

- **heartbeatInterval** (可选): `number`

- **maxIdleTime** (可选): `number`

- **enableMemoryOptimization** (可选): `boolean`

- **memoryOptimizationLevel** (可选): `MemoryOptimizationLevel`

- **priority** (可选): `'high' | 'medium' | 'low'`

- **maxMessageBuffer** (可选): `number`

- **enableBatching** (可选): `boolean`

- **batchSize** (可选): `number`

- **batchTimeout** (可选): `number`

**完整定义**:

```typescript
interface SubscriptionConfig {
  table: string;
  filter?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  enableReconnect?: boolean;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
  heartbeatInterval?: number;
  maxIdleTime?: number;
  enableMemoryOptimization?: boolean;
  memoryOptimizationLevel?: MemoryOptimizationLevel;
  priority?: 'high' | 'medium' | 'low'; // 新增：优先级
  maxMessageBuffer?: number; // 新增：最大消息缓冲
  enableBatching?: boolean; // 新增：启用批处理
  batchSize?: number; // 新增：批处理大小
  batchTimeout?: number; // 新增：批处理超时
}
```

---

### SubscriptionInfo

**文件位置**: `src\utils\enhancedRealtimeManager.ts`

**属性**:

- **id**: `string`

- **channelName**: `string`

- **config**: `SubscriptionConfig`

- **status**: `SubscriptionStatus`

- **channel**: `RealtimeChannel | null`

- **createdAt**: `number`

- **lastActivity**: `number`

- **reconnectAttempts**: `number`

- **errorCount**: `number`

- **messageCount**: `number`

- **memoryUsage**: `number`

- **priority**: `'high' | 'medium' | 'low'`

- **messageBuffer**: `any[]`

- **batchTimer** (可选): `NodeJS.Timeout`

- **weakRef** (可选): `WeakRef<any>`

**完整定义**:

```typescript
interface SubscriptionInfo {
  id: string;
  channelName: string;
  config: SubscriptionConfig;
  status: SubscriptionStatus;
  channel: RealtimeChannel | null;
  createdAt: number;
  lastActivity: number;
  reconnectAttempts: number;
  errorCount: number;
  messageCount: number;
  memoryUsage: number;
  priority: 'high' | 'medium' | 'low';
  messageBuffer: any[]; // 消息缓冲区
  batchTimer?: NodeJS.Timeout; // 批处理定时器
  weakRef?: WeakRef<any>; // 弱引用
}
```

---

### MemoryStats

**文件位置**: `src\utils\enhancedRealtimeManager.ts`

**属性**:

- **totalSubscriptions**: `number`

- **totalMemoryUsage**: `number`

- **averageMemoryPerSubscription**: `number`

- **highPrioritySubscriptions**: `number`

- **idleSubscriptions**: `number`

- **suspendedSubscriptions**: `number`

- **memoryOptimizationLevel**: `MemoryOptimizationLevel`

- **lastCleanupTime**: `number`

- **cleanupCount**: `number`

**完整定义**:

```typescript
interface MemoryStats {
  totalSubscriptions: number;
  totalMemoryUsage: number;
  averageMemoryPerSubscription: number;
  highPrioritySubscriptions: number;
  idleSubscriptions: number;
  suspendedSubscriptions: number;
  memoryOptimizationLevel: MemoryOptimizationLevel;
  lastCleanupTime: number;
  cleanupCount: number;
}
```

---

### SkillSystemOptimizationConfig

**文件位置**: `src\utils\enhancedSkillSystemOptimizer.ts`

**属性**:

- **enableRenderOptimization**: `boolean`

- **enableMemoryManagement**: `boolean`

- **enableStateCache**: `boolean`

- **enableSubscriptionOptimization**: `boolean`

- **maxRenderPerSecond**: `number`

- **memoryThreshold**: `number`

- **stateCacheTTL**: `number`

- **debounceDelay**: `number`

**完整定义**:

```typescript
interface SkillSystemOptimizationConfig {
  /** 启用渲染优化 */
  enableRenderOptimization: boolean;
  /** 启用内存管理 */
  enableMemoryManagement: boolean;
  /** 启用状态缓存 */
  enableStateCache: boolean;
  /** 启用订阅优化 */
  enableSubscriptionOptimization: boolean;
  /** 渲染频率阈值（每秒最大渲染次数） */
  maxRenderPerSecond: number;
  /** 内存使用阈值（字节） */
  memoryThreshold: number;
  /** 状态缓存TTL（毫秒） */
  stateCacheTTL: number;
  /** 防抖延迟（毫秒） */
  debounceDelay: number;
}
```

---

### SkillSystemPerformanceMetrics

**文件位置**: `src\utils\enhancedSkillSystemOptimizer.ts`

**属性**:

- **renderCount**: `number`

- **averageRenderTime**: `number`

- **memoryUsage**: `number`

- **activeSubscriptions**: `number`

- **cacheHitRate**: `number`

- **lastUpdateTime**: `number`

**完整定义**:

```typescript
interface SkillSystemPerformanceMetrics {
  /** 渲染次数 */
  renderCount: number;
  /** 平均渲染时间 */
  averageRenderTime: number;
  /** 内存使用量 */
  memoryUsage: number;
  /** 活跃订阅数量 */
  activeSubscriptions: number;
  /** 缓存命中率 */
  cacheHitRate: number;
  /** 最后更新时间 */
  lastUpdateTime: number;
}
```

---

### RenderStateTracker

**文件位置**: `src\utils\enhancedSkillSystemOptimizer.ts`

**属性**:

- **renderTimestamps**: `number[]`

- **renderDurations**: `number[]`

- **isRendering**: `boolean`

- **renderStartTime**: `number`

**完整定义**:

```typescript
interface RenderStateTracker {
  /** 渲染时间戳数组 */
  renderTimestamps: number[];
  /** 渲染持续时间数组 */
  renderDurations: number[];
  /** 是否正在渲染 */
  isRendering: boolean;
  /** 渲染开始时间 */
  renderStartTime: number;
}
```

---

### SubscriptionManager

**文件位置**: `src\utils\enhancedSkillSystemOptimizer.ts`

**属性**:

- **activeSubscriptions**: `Set<() => void>`

- **subscriptionMetadata**: `Map<string, { createdAt: number`

**完整定义**:

```typescript
interface SubscriptionManager {
/** 活跃订阅集合 */
  activeSubscriptions: Set<() => void>;
  /** 订阅元数据 */
  subscriptionMetadata: Map<string, { createdAt: number; lastUsed: number
}
```

---

### StateCacheManager

**文件位置**: `src\utils\enhancedSkillSystemOptimizer.ts`

**属性**:

- **cache**: `Map<string, { data: any`

**完整定义**:

```typescript
interface StateCacheManager {
/** 缓存数据 */
  cache: Map<string, { data: any; timestamp: number; ttl: number
}
```

---

### ErrorDisplayConfig

**文件位置**: `src\utils\enhancedUserErrorInterface.ts`

**属性**:

- **mode**: `'toast' | 'modal' | 'inline' | 'banner' | 'sidebar'`

- **theme**: `'light' | 'dark' | 'auto'`

- **animation**: `'slide' | 'fade' | 'bounce' | 'none'`

- **autoClose**: `number`

- **showTechnicalDetails**: `boolean`

- **showSolutions**: `boolean`

- **showFeedback**: `boolean`

- **showRetry**: `boolean`

- **maxWidth**: `string`

- **position**: `'top' | 'bottom' | 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`

**完整定义**:

```typescript
interface ErrorDisplayConfig {
  /** 展示模式 */
  mode: 'toast' | 'modal' | 'inline' | 'banner' | 'sidebar';
  /** 主题样式 */
  theme: 'light' | 'dark' | 'auto';
  /** 动画效果 */
  animation: 'slide' | 'fade' | 'bounce' | 'none';
  /** 自动关闭时间（毫秒，0表示不自动关闭） */
  autoClose: number;
  /** 是否显示技术详情 */
  showTechnicalDetails: boolean;
  /** 是否显示解决方案 */
  showSolutions: boolean;
  /** 是否显示反馈按钮 */
  showFeedback: boolean;
  /** 是否显示重试按钮 */
  showRetry: boolean;
  /** 最大宽度 */
  maxWidth: string;
  /** 位置 */
  position:
    | 'top'
    | 'bottom'
    | 'center'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';
}
```

---

### UserFriendlyErrorInfo

**文件位置**: `src\utils\enhancedUserErrorInterface.ts`

**属性**:

- **id**: `string`

- **title**: `string`

- **description**: `string`

- **details** (可选): `string`

- **severity**: `ErrorSeverity`

- **classification**: `ErrorClassification`

- **solutions**: `ErrorSolution[]`

- **helpLinks**: `HelpLink[]`

- **retryable**: `boolean`

- **estimatedResolutionTime** (可选): `string`

- **impactScope**: `'user' | 'feature' | 'system' | 'global'`

- **icon**: `React.ReactNode`

- **colorTheme**: `string`

**完整定义**:

```typescript
interface UserFriendlyErrorInfo {
  /** 错误ID */
  id: string;
  /** 用户友好标题 */
  title: string;
  /** 简短描述 */
  description: string;
  /** 详细说明 */
  details?: string;
  /** 错误严重级别 */
  severity: ErrorSeverity;
  /** 错误分类 */
  classification: ErrorClassification;
  /** 解决方案列表 */
  solutions: ErrorSolution[];
  /** 相关帮助链接 */
  helpLinks: HelpLink[];
  /** 是否可重试 */
  retryable: boolean;
  /** 预计解决时间 */
  estimatedResolutionTime?: string;
  /** 影响范围 */
  impactScope: 'user' | 'feature' | 'system' | 'global';
  /** 错误图标 */
  icon: React.ReactNode;
  /** 错误颜色主题 */
  colorTheme: string;
}
```

---

### ErrorSolution

**文件位置**: `src\utils\enhancedUserErrorInterface.ts`

**属性**:

- **id**: `string`

- **title**: `string`

- **description**: `string`

- **steps**: `string[]`

- **type**: `'automatic' | 'manual' | 'contact_support'`

- **successRate**: `number`

- **estimatedTime**: `string`

- **action** (可选): `() => Promise<boolean>`

- **recommended**: `boolean`

**完整定义**:

```typescript
interface ErrorSolution {
  /** 解决方案ID */
  id: string;
  /** 解决方案标题 */
  title: string;
  /** 解决方案描述 */
  description: string;
  /** 操作步骤 */
  steps: string[];
  /** 解决方案类型 */
  type: 'automatic' | 'manual' | 'contact_support';
  /** 成功率 */
  successRate: number;
  /** 预计耗时 */
  estimatedTime: string;
  /** 操作函数 */
  action?: () => Promise<boolean>;
  /** 是否推荐 */
  recommended: boolean;
}
```

---

### HelpLink

**文件位置**: `src\utils\enhancedUserErrorInterface.ts`

**属性**:

- **title**: `string`

- **url**: `string`

- **type**: `'documentation' | 'faq' | 'tutorial' | 'support' | 'community'`

- **description** (可选): `string`

**完整定义**:

```typescript
interface HelpLink {
  /** 链接标题 */
  title: string;
  /** 链接URL */
  url: string;
  /** 链接类型 */
  type: 'documentation' | 'faq' | 'tutorial' | 'support' | 'community';
  /** 链接描述 */
  description?: string;
}
```

---

### ErrorFeedback

**文件位置**: `src\utils\enhancedUserErrorInterface.ts`

**属性**:

- **errorId**: `string`

- **type**: `'helpful' | 'not_helpful' | 'suggestion' | 'bug_report'`

- **content**: `string`

- **contact** (可选): `string`

- **timestamp**: `number`

- **userAgent**: `string`

- **pageUrl**: `string`

**完整定义**:

```typescript
interface ErrorFeedback {
  /** 错误ID */
  errorId: string;
  /** 反馈类型 */
  type: 'helpful' | 'not_helpful' | 'suggestion' | 'bug_report';
  /** 反馈内容 */
  content: string;
  /** 用户联系方式 */
  contact?: string;
  /** 时间戳 */
  timestamp: number;
  /** 用户代理 */
  userAgent: string;
  /** 页面URL */
  pageUrl: string;
}
```

---

### NotificationAction

**文件位置**: `src\utils\enhancedUserNotificationSystem.ts`

**属性**:

- **label**: `string`

- **action**: `() => void | Promise<void>`

- **style** (可选): `'primary' | 'secondary' | 'danger'`

- **closeAfterAction** (可选): `boolean`

**完整定义**:

```typescript
interface NotificationAction {
  /** 动作标签 */
  label: string;
  /** 动作处理函数 */
  action: () => void | Promise<void>;
  /** 动作样式 */
  style?: 'primary' | 'secondary' | 'danger';
  /** 是否在执行后关闭通知 */
  closeAfterAction?: boolean;
}
```

---

### NotificationConfig

**文件位置**: `src\utils\enhancedUserNotificationSystem.ts`

**属性**:

- **id** (可选): `string`

- **type**: `NotificationType`

- **title** (可选): `string`

- **message**: `string`

- **duration** (可选): `number`

- **closable** (可选): `boolean`

- **position** (可选): `NotificationPosition`

- **icon** (可选): `string`

- **className** (可选): `string`

- **actions** (可选): `NotificationAction[]`

- **showProgress** (可选): `boolean`

- **onClick** (可选): `() => void`

- **onClose** (可选): `() => void`

- **persistent** (可选): `boolean`

- **priority** (可选): `number`

**完整定义**:

```typescript
interface NotificationConfig {
  /** 通知ID */
  id?: string;
  /** 通知类型 */
  type: NotificationType;
  /** 标题 */
  title?: string;
  /** 消息内容 */
  message: string;
  /** 显示时长（毫秒），0表示不自动关闭 */
  duration?: number;
  /** 是否可关闭 */
  closable?: boolean;
  /** 通知位置 */
  position?: NotificationPosition;
  /** 图标 */
  icon?: string;
  /** 自定义CSS类 */
  className?: string;
  /** 动作按钮 */
  actions?: NotificationAction[];
  /** 是否显示进度条 */
  showProgress?: boolean;
  /** 点击回调 */
  onClick?: () => void;
  /** 关闭回调 */
  onClose?: () => void;
  /** 是否持久化（页面刷新后保留） */
  persistent?: boolean;
  /** 优先级（数字越大优先级越高） */
  priority?: number;
}
```

---

### NotificationInstance

**文件位置**: `src\utils\enhancedUserNotificationSystem.ts`

**属性**:

- **id**: `string`

- **config**: `NotificationConfig`

- **createdAt**: `Date`

- **shown**: `boolean`

- **closed**: `boolean`

- **close**: `() => void`

- **update**: `(config: Partial<NotificationConfig>) => void`

**完整定义**:

```typescript
interface NotificationInstance {
  /** 通知ID */
  id: string;
  /** 通知配置 */
  config: NotificationConfig;
  /** 创建时间 */
  createdAt: Date;
  /** 是否已显示 */
  shown: boolean;
  /** 是否已关闭 */
  closed: boolean;
  /** 关闭通知 */
  close: () => void;
  /** 更新通知 */
  update: (config: Partial<NotificationConfig>) => void;
}
```

---

### NotificationQueue

**文件位置**: `src\utils\enhancedUserNotificationSystem.ts`

**属性**:

- **add**: `(notification: NotificationInstance) => void`

- **remove**: `(id: string) => void`

- **get**: `(id: string) => NotificationInstance | undefined`

- **getAll**: `() => NotificationInstance[]`

- **clear**: `() => void`

- **getByPosition**: `(position: NotificationPosition) => NotificationInstance[]`

**完整定义**:

```typescript
interface NotificationQueue {
  /** 添加通知到队列 */
  add: (notification: NotificationInstance) => void;
  /** 从队列中移除通知 */
  remove: (id: string) => void;
  /** 获取队列中的通知 */
  get: (id: string) => NotificationInstance | undefined;
  /** 获取所有通知 */
  getAll: () => NotificationInstance[];
  /** 清空队列 */
  clear: () => void;
  /** 按位置分组获取通知 */
  getByPosition: (position: NotificationPosition) => NotificationInstance[];
}
```

---

### ErrorClassification

**文件位置**: `src\utils\errorClassifier.ts`

**属性**:

- **type**: `string`

- **category**: `string`

- **severity**: `ErrorSeverity`

- **isRetryable**: `boolean`

- **expectedRecoveryTime** (可选): `number`

- **userFriendlyDescription**: `string`

- **technicalDescription**: `string`

- **suggestedHandling**: `string[]`

**完整定义**:

```typescript
interface ErrorClassification {
  /** 错误类型 */
  type: string;
  /** 错误分类 */
  category: string;
  /** 严重级别 */
  severity: ErrorSeverity;
  /** 是否可重试 */
  isRetryable: boolean;
  /** 预期恢复时间（毫秒） */
  expectedRecoveryTime?: number;
  /** 用户友好描述 */
  userFriendlyDescription: string;
  /** 技术描述 */
  technicalDescription: string;
  /** 建议的处理方式 */
  suggestedHandling: string[];
}
```

---

### ErrorPattern

**文件位置**: `src\utils\errorClassifier.ts`

**属性**:

- **matcher**: `(error: any) => boolean`

- **classification**: `Omit<ErrorClassification, 'userFriendlyDescription' | 'technicalDescription'>`

- **userDescriptionGenerator**: `(error: any) => string`

- **technicalDescriptionGenerator**: `(error: any) => string`

**完整定义**:

```typescript
interface ErrorPattern {
  /** 匹配函数 */
  matcher: (error: any) => boolean;
  /** 分类信息 */
  classification: Omit<
    ErrorClassification,
    'userFriendlyDescription' | 'technicalDescription'
  >;
  /** 用户友好描述生成器 */
  userDescriptionGenerator: (error: any) => string;
  /** 技术描述生成器 */
  technicalDescriptionGenerator: (error: any) => string;
}
```

---

### StandardErrorOptions

**文件位置**: `src\utils\errorHandlerInterface.ts`

**属性**:

- **context** (可选): `string`

- **severity** (可选): `ErrorSeverity`

- **showToUser** (可选): `boolean`

- **customMessage** (可选): `string`

- **retryable** (可选): `boolean`

- **maxRetries** (可选): `number`

- **logError** (可选): `boolean`

- **reportToMonitoring** (可选): `boolean`

**完整定义**:

```typescript
interface StandardErrorOptions {
  /** 错误上下文 */
  context?: string;
  /** 错误严重级别 */
  severity?: ErrorSeverity;
  /** 是否显示用户提示 */
  showToUser?: boolean;
  /** 自定义用户消息 */
  customMessage?: string;
  /** 是否可重试 */
  retryable?: boolean;
  /** 最大重试次数 */
  maxRetries?: number;
  /** 是否记录日志 */
  logError?: boolean;
  /** 是否上报监控 */
  reportToMonitoring?: boolean;
}
```

---

### IErrorHandler

**文件位置**: `src\utils\errorHandlerInterface.ts`

**属性**:

- **error**: `any, options?: StandardErrorOptions): Promise<ErrorHandlingResult>`

- **total**: `number`

- **byType**: `Record<string, number>`

- **bySeverity**: `Record<ErrorSeverity, number>`

- **recent**: `number`

**完整定义**:

```typescript
interface IErrorHandler {
/**
   * 处理错误的主要方法
   * @param error - 错误对象
   * @param options - 处理选项
   * @returns 处理结果
   */
  handleError(error: any, options?: StandardErrorOptions): Promise<ErrorHandlingResult>;

  /**
   * 获取错误统计信息
   * @returns 错误统计
   */
  getErrorStats(): {
    total: number;
    byType: Record<string, number>;
    bySeverity: Record<ErrorSeverity, number>;
    recent: number; // 最近1小时的错误数
}
```

---

### IUserNotifier

**文件位置**: `src\utils\errorHandlerInterface.ts`

**属性**:

- **message**: `string, duration?: number): void`

- **message**: `string, duration?: number): void`

- **message**: `string, duration?: number): void`

- **message**: `string, duration?: number): void`

**完整定义**:

```typescript
interface IUserNotifier {
  /**
   * 显示成功消息
   * @param message - 消息内容
   * @param duration - 显示时长（毫秒）
   */
  showSuccess(message: string, duration?: number): void;

  /**
   * 显示警告消息
   * @param message - 消息内容
   * @param duration - 显示时长（毫秒）
   */
  showWarning(message: string, duration?: number): void;

  /**
   * 显示错误消息
   * @param message - 消息内容
   * @param duration - 显示时长（毫秒）
   */
  showError(message: string, duration?: number): void;

  /**
   * 显示信息消息
   * @param message - 消息内容
   * @param duration - 显示时长（毫秒）
   */
  showInfo(message: string, duration?: number): void;
}
```

---

### IErrorRecoveryStrategy

**文件位置**: `src\utils\errorHandlerInterface.ts`

**属性**:

- **error**: `any): boolean`

- **error**: `any): Promise<boolean>`

- **error**: `any): string`

**完整定义**:

```typescript
interface IErrorRecoveryStrategy {
  /**
   * 检查是否可以恢复
   * @param error - 错误对象
   * @returns 是否可以恢复
   */
  canRecover(error: any): boolean;

  /**
   * 执行恢复操作
   * @param error - 错误对象
   * @returns 恢复结果
   */
  recover(error: any): Promise<boolean>;

  /**
   * 获取恢复建议
   * @param error - 错误对象
   * @returns 恢复建议
   */
  getRecoverySuggestion(error: any): string;
}
```

---

### IErrorClassifier

**文件位置**: `src\utils\errorHandlerInterface.ts`

**属性**:

- **error**: `any): {`

- **type**: `string`

- **category**: `string`

- **severity**: `ErrorSeverity`

- **isRetryable**: `boolean`

- **expectedRecoveryTime** (可选): `number`

**完整定义**:

```typescript
interface IErrorClassifier {
/**
   * 分类错误
   * @param error - 错误对象
   * @returns 错误分类信息
   */
  classify(error: any): {
    type: string;
    category: string;
    severity: ErrorSeverity;
    isRetryable: boolean;
    expectedRecoveryTime?: number;
}
```

---

### ErrorMonitoringConfig

**文件位置**: `src\utils\errorMonitoringAndReporting.ts`

**属性**:

- **enabled**: `boolean`

- **sampleRate**: `number`

- **maxHistorySize**: `number`

- **reportInterval**: `number`

- **enablePerformanceMonitoring**: `boolean`

- **enableUserBehaviorTracking**: `boolean`

- **thresholds**: `{`

- **errorRatePerMinute**: `number`

- **highSeverityThreshold**: `number`

- **memoryUsageThreshold**: `number`

**完整定义**:

```typescript
interface ErrorMonitoringConfig {
/** 是否启用监控 */
  enabled: boolean;
  /** 采样率（0-1） */
  sampleRate: number;
  /** 最大错误历史记录数 */
  maxHistorySize: number;
  /** 报告间隔（毫秒） */
  reportInterval: number;
  /** 是否启用性能监控 */
  enablePerformanceMonitoring: boolean;
  /** 是否启用用户行为追踪 */
  enableUserBehaviorTracking: boolean;
  /** 错误阈值配置 */
  thresholds: {
    /** 错误率阈值（每分钟） */
    errorRatePerMinute: number;
    /** 高严重级别错误阈值 */
    highSeverityThreshold: number;
    /** 内存使用阈值（MB） */
    memoryUsageThreshold: number;
}
```

---

### UserBehaviorEvent

**文件位置**: `src\utils\errorMonitoringAndReporting.ts`

**属性**:

- **type**: `'click' | 'navigation' | 'form_submit' | 'error_encounter' | 'recovery_action'`

- **timestamp**: `string`

- **url**: `string`

- **userAgent**: `string`

- **details**: `Record<string, any>`

- **sessionId**: `string`

**完整定义**:

```typescript
interface UserBehaviorEvent {
  /** 事件类型 */
  type:
    | 'click'
    | 'navigation'
    | 'form_submit'
    | 'error_encounter'
    | 'recovery_action';
  /** 事件时间戳 */
  timestamp: string;
  /** 页面URL */
  url: string;
  /** 用户代理 */
  userAgent: string;
  /** 事件详情 */
  details: Record<string, any>;
  /** 会话ID */
  sessionId: string;
}
```

---

### ErrorMonitorConfig

**文件位置**: `src\utils\globalErrorMonitor.ts`

**属性**:

- **enabled**: `boolean`

- **sampleRate**: `number`

- **maxErrorCache**: `number`

- **reportInterval**: `number`

- **enablePerformanceMonitoring**: `boolean`

- **enableUserTracking**: `boolean`

- **thirdPartyServices**: `{`

- **sentry** (可选): `{`

- **dsn**: `string`

- **environment**: `string`

**完整定义**:

```typescript
interface ErrorMonitorConfig {
/** 是否启用监控 */
  enabled: boolean;
  /** 采样率 (0-1) */
  sampleRate: number;
  /** 最大错误缓存数量 */
  maxErrorCache: number;
  /** 报告间隔（毫秒） */
  reportInterval: number;
  /** 是否启用性能监控 */
  enablePerformanceMonitoring: boolean;
  /** 是否启用用户行为追踪 */
  enableUserTracking: boolean;
  /** 第三方服务配置 */
  thirdPartyServices: {
    sentry?: {
      dsn: string;
      environment: string;
}
```

---

### ErrorStats

**文件位置**: `src\utils\globalErrorMonitor.ts`

**属性**:

- **totalErrors**: `number`

- **errorsBySeverity**: `Record<ErrorSeverity, number>`

- **errorsByCategory**: `Record<ErrorCategory, number>`

- **errorsByTime**: `Array<{`

- **timestamp**: `number`

- **count**: `number`

- **severity**: `ErrorSeverity`

**完整定义**:

```typescript
interface ErrorStats {
/** 总错误数 */
  totalErrors: number;
  /** 按严重级别分组的错误数 */
  errorsBySeverity: Record<ErrorSeverity, number>;
  /** 按分类分组的错误数 */
  errorsByCategory: Record<ErrorCategory, number>;
  /** 按时间分组的错误数 */
  errorsByTime: Array<{
    timestamp: number;
    count: number;
    severity: ErrorSeverity;
}
```

---

### UserSession

**文件位置**: `src\utils\globalErrorMonitor.ts`

**属性**:

- **sessionId**: `string`

- **userId** (可选): `string`

- **startTime**: `number`

- **lastActivity**: `number`

- **pageViews**: `Array<{`

- **url**: `string`

- **timestamp**: `number`

- **duration**: `number`

**完整定义**:

```typescript
interface UserSession {
/** 会话ID */
  sessionId: string;
  /** 用户ID */
  userId?: string;
  /** 开始时间 */
  startTime: number;
  /** 最后活动时间 */
  lastActivity: number;
  /** 页面访问记录 */
  pageViews: Array<{
    url: string;
    timestamp: number;
    duration: number;
}
```

---

### ValidatorConfig

**文件位置**: `src\utils\inputValidationManager.ts`

**属性**:

- **type**: `ValidatorType`

- **enabled**: `boolean`

- **priority**: `number`

- **weight**: `number`

- **timeout**: `number`

- **fallback**: `boolean`

- **config**: `any`

**完整定义**:

```typescript
interface ValidatorConfig {
  type: ValidatorType;
  enabled: boolean;
  priority: number;
  weight: number;
  timeout: number;
  fallback: boolean;
  config: any;
}
```

---

### ValidationManagerConfig

**文件位置**: `src\utils\inputValidationManager.ts`

**属性**:

- **validators**: `Record<ValidatorType, ValidatorConfig>`

- **strategy**: `ValidationStrategy`

- **performance**: `{`

- **enableParallel**: `boolean`

- **maxConcurrent**: `number`

- **timeout**: `number`

- **enableCaching**: `boolean`

- **cacheSize**: `number`

- **cacheTTL**: `number`

**完整定义**:

```typescript
interface ValidationManagerConfig {
// 验证器配置
  validators: Record<ValidatorType, ValidatorConfig>;

  // 策略配置
  strategy: ValidationStrategy;

  // 性能配置
  performance: {
    enableParallel: boolean;
    maxConcurrent: number;
    timeout: number;
    enableCaching: boolean;
    cacheSize: number;
    cacheTTL: number;
}
```

---

### ValidationRequest

**文件位置**: `src\utils\inputValidationManager.ts`

**属性**:

- **id**: `string`

- **data**: `any`

- **context**: `AdvancedValidationContext`

- **config** (可选): `Partial<ValidationManagerConfig>`

- **validators** (可选): `ValidatorType[]`

- **strategy** (可选): `ValidationStrategy`

- **priority** (可选): `number`

**完整定义**:

```typescript
interface ValidationRequest {
  id: string;
  data: any;
  context: AdvancedValidationContext;
  config?: Partial<ValidationManagerConfig>;
  validators?: ValidatorType[];
  strategy?: ValidationStrategy;
  priority?: number;
}
```

---

### ValidationResponse

**文件位置**: `src\utils\inputValidationManager.ts`

**属性**:

- **id**: `string`

- **success**: `boolean`

- **result**: `AggregatedValidationResult`

- **metadata**: `{`

- **strategy**: `ValidationStrategy`

- **validatorsUsed**: `ValidatorType[]`

- **processingTime**: `number`

- **cacheHit**: `boolean`

- **retryCount**: `number`

**完整定义**:

```typescript
interface ValidationResponse {
id: string;
  success: boolean;
  result: AggregatedValidationResult;
  metadata: {
    strategy: ValidationStrategy;
    validatorsUsed: ValidatorType[];
    processingTime: number;
    cacheHit: boolean;
    retryCount: number;
}
```

---

### AggregatedValidationResult

**文件位置**: `src\utils\inputValidationManager.ts`

**属性**:

- **isValid**: `boolean`

- **sanitizedData**: `any`

- **confidence**: `number`

- **errors**: `ValidationError[]`

- **warnings**: `ValidationError[]`

- **securityScore**: `number`

- **threatLevel**: `ThreatLevel`

- **threats**: `string[]`

- **validatorResults**: `Map<ValidatorType, ValidationResult | AdvancedValidationResult>`

- **stats**: `{`

- **totalValidators**: `number`

- **successfulValidators**: `number`

- **failedValidators**: `number`

- **averageProcessingTime**: `number`

- **consensusLevel**: `number`

**完整定义**:

```typescript
interface AggregatedValidationResult {
// 基础结果
  isValid: boolean;
  sanitizedData: any;
  confidence: number;

  // 错误和警告
  errors: ValidationError[];
  warnings: ValidationError[];

  // 安全信息
  securityScore: number;
  threatLevel: ThreatLevel;
  threats: string[];

  // 验证器结果
  validatorResults: Map<ValidatorType, ValidationResult | AdvancedValidationResult>;

  // 统计信息
  stats: {
    totalValidators: number;
    successfulValidators: number;
    failedValidators: number;
    averageProcessingTime: number;
    consensusLevel: number;
}
```

---

### ValidatorMetrics

**文件位置**: `src\utils\inputValidationManager.ts`

**属性**:

- **type**: `ValidatorType`

- **totalRequests**: `number`

- **successfulRequests**: `number`

- **failedRequests**: `number`

- **averageResponseTime**: `number`

- **errorRate**: `number`

- **availability**: `number`

- **lastUpdate**: `number`

**完整定义**:

```typescript
interface ValidatorMetrics {
  type: ValidatorType;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  errorRate: number;
  availability: number;
  lastUpdate: number;
}
```

---

### ManagerMetrics

**文件位置**: `src\utils\inputValidationManager.ts`

**属性**:

- **totalRequests**: `number`

- **successfulRequests**: `number`

- **failedRequests**: `number`

- **averageResponseTime**: `number`

- **cacheHitRate**: `number`

- **validatorMetrics**: `Map<ValidatorType, ValidatorMetrics>`

- **strategyMetrics**: `Map<ValidationStrategy, {`

- **usage**: `number`

- **successRate**: `number`

- **averageTime**: `number`

**完整定义**:

```typescript
interface ManagerMetrics {
totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  cacheHitRate: number;

  // 验证器指标
  validatorMetrics: Map<ValidatorType, ValidatorMetrics>;

  // 策略指标
  strategyMetrics: Map<ValidationStrategy, {
    usage: number;
    successRate: number;
    averageTime: number;
}
```

---

### CacheStrategyConfig

**文件位置**: `src\utils\intelligentCacheStrategy.ts`

**属性**:

- **type**: `CacheStrategyType`

- **baseTTL**: `number`

- **maxTTL**: `number`

- **minTTL**: `number`

- **hitRateThreshold**: `number`

- **frequencyThreshold**: `number`

- **enablePrediction**: `boolean`

- **enablePreloading**: `boolean`

- **maxPreloadItems**: `number`

- **memoryLimit**: `number`

- **batchSize**: `number`

- **compressionThreshold**: `number`

- **adaptiveThreshold**: `number`

**完整定义**:

```typescript
interface CacheStrategyConfig {
  type: CacheStrategyType;
  baseTTL: number;
  maxTTL: number;
  minTTL: number;
  hitRateThreshold: number;
  frequencyThreshold: number;
  enablePrediction: boolean;
  enablePreloading: boolean;
  maxPreloadItems: number;
  memoryLimit: number;
  batchSize: number;
  compressionThreshold: number;
  adaptiveThreshold: number;
}
```

---

### QueryStats

**文件位置**: `src\utils\intelligentCacheStrategy.ts`

**属性**:

- **key**: `string`

- **hitCount**: `number`

- **missCount**: `number`

- **lastAccess**: `number`

- **accessFrequency**: `number`

- **pattern**: `QueryPattern`

- **avgResponseTime**: `number`

- **dataSize**: `number`

- **priority**: `CachePriority`

- **compressionRatio**: `number`

- **memoryUsage**: `number`

- **accessTrend**: `number`

**完整定义**:

```typescript
interface QueryStats {
  key: string;
  hitCount: number;
  missCount: number;
  lastAccess: number;
  accessFrequency: number;
  pattern: QueryPattern;
  avgResponseTime: number;
  dataSize: number;
  priority: CachePriority;
  compressionRatio: number;
  memoryUsage: number;
  accessTrend: number; // 访问趋势
}
```

---

### PredictionResult

**文件位置**: `src\utils\intelligentCacheStrategy.ts`

**属性**:

- **key**: `string`

- **probability**: `number`

- **suggestedTTL**: `number`

- **preloadPriority**: `number`

- **confidence**: `number`

- **pattern**: `QueryPattern`

**完整定义**:

```typescript
interface PredictionResult {
  key: string;
  probability: number;
  suggestedTTL: number;
  preloadPriority: number;
  confidence: number;
  pattern: QueryPattern;
}
```

---

### CachePerformanceMetrics

**文件位置**: `src\utils\intelligentCacheStrategy.ts`

**属性**:

- **totalQueries**: `number`

- **cacheHits**: `number`

- **cacheMisses**: `number`

- **hitRate**: `number`

- **avgResponseTime**: `number`

- **memoryUsage**: `number`

- **compressionSavings**: `number`

- **preloadSuccessRate**: `number`

- **adaptiveAdjustments**: `number`

**完整定义**:

```typescript
interface CachePerformanceMetrics {
  totalQueries: number;
  cacheHits: number;
  cacheMisses: number;
  hitRate: number;
  avgResponseTime: number;
  memoryUsage: number;
  compressionSavings: number;
  preloadSuccessRate: number;
  adaptiveAdjustments: number;
}
```

---

### ErrorHandlingOptions

**文件位置**: `src\utils\masterErrorHandler.ts`

**属性**:

- **logError** (可选): `boolean`

- **showNotification** (可选): `boolean`

- **attemptRecovery** (可选): `boolean`

- **reportToMonitoring** (可选): `boolean`

- **customMessage** (可选): `string`

- **silent** (可选): `boolean`

- **maxRetries** (可选): `number`

- **retryDelay** (可选): `number`

- **onError** (可选): `(error: UnifiedError) => void`

- **onRecovery** (可选): `(error: UnifiedError) => void`

**完整定义**:

```typescript
interface ErrorHandlingOptions {
  /** 是否记录日志 */
  logError?: boolean;
  /** 是否显示用户通知 */
  showNotification?: boolean;
  /** 是否尝试自动恢复 */
  attemptRecovery?: boolean;
  /** 是否上报监控系统 */
  reportToMonitoring?: boolean;
  /** 自定义用户消息 */
  customMessage?: string;
  /** 是否静默处理 */
  silent?: boolean;
  /** 最大重试次数 */
  maxRetries?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
  /** 错误回调函数 */
  onError?: (error: UnifiedError) => void;
  /** 恢复回调函数 */
  onRecovery?: (error: UnifiedError) => void;
}
```

---

### UnifiedError

**文件位置**: `src\utils\masterErrorHandler.ts`

**属性**:

- **id**: `string`

- **type**: `'app' | 'skill' | 'network' | 'validation' | 'permission' | 'unknown'`

- **code**: `string`

- **message**: `string`

- **originalError**: `any`

- **context**: `ErrorContext`

- **timestamp**: `number`

- **severity**: `ErrorSeverity`

- **classification**: `ErrorClassification`

- **stack** (可选): `string`

- **retryable**: `boolean`

- **maxRetries**: `number`

**完整定义**:

```typescript
interface UnifiedError {
  /** 错误唯一标识 */
  id: string;
  /** 错误类型 */
  type: 'app' | 'skill' | 'network' | 'validation' | 'permission' | 'unknown';
  /** 错误代码 */
  code: string;
  /** 错误消息 */
  message: string;
  /** 原始错误对象 */
  originalError: any;
  /** 错误上下文 */
  context: ErrorContext;
  /** 时间戳 */
  timestamp: number;
  /** 错误严重级别 */
  severity: ErrorSeverity;
  /** 错误分类 */
  classification: ErrorClassification;
  /** 堆栈跟踪 */
  stack?: string;
  /** 是否可重试 */
  retryable: boolean;
  /** 最大重试次数 */
  maxRetries: number;
}
```

---

### MemoryLeakDetectionConfig

**文件位置**: `src\utils\memoryLeakPrevention.ts`

**属性**:

- **enableMemoryMonitoring**: `boolean`

- **enableSubscriptionLeakDetection**: `boolean`

- **enableDOMLeakDetection**: `boolean`

- **memoryCheckInterval**: `number`

- **memoryGrowthThreshold**: `number`

- **subscriptionTimeout**: `number`

- **maxSubscriptions**: `number`

**完整定义**:

```typescript
interface MemoryLeakDetectionConfig {
  /** 启用内存监控 */
  enableMemoryMonitoring: boolean;
  /** 启用订阅泄漏检测 */
  enableSubscriptionLeakDetection: boolean;
  /** 启用DOM泄漏检测 */
  enableDOMLeakDetection: boolean;
  /** 内存检查间隔（毫秒） */
  memoryCheckInterval: number;
  /** 内存增长阈值（字节） */
  memoryGrowthThreshold: number;
  /** 订阅超时时间（毫秒） */
  subscriptionTimeout: number;
  /** 最大允许订阅数 */
  maxSubscriptions: number;
}
```

---

### MemoryUsageStats

**文件位置**: `src\utils\memoryLeakPrevention.ts`

**属性**:

- **currentUsage**: `number`

- **peakUsage**: `number`

- **growthRate**: `number`

- **activeSubscriptions**: `number`

- **potentialLeaks**: `number`

- **lastCheckTime**: `number`

**完整定义**:

```typescript
interface MemoryUsageStats {
  /** 当前内存使用量 */
  currentUsage: number;
  /** 峰值内存使用量 */
  peakUsage: number;
  /** 内存增长率 */
  growthRate: number;
  /** 活跃订阅数 */
  activeSubscriptions: number;
  /** 潜在泄漏数 */
  potentialLeaks: number;
  /** 最后检查时间 */
  lastCheckTime: number;
}
```

---

### DOMReferenceInfo

**文件位置**: `src\utils\memoryLeakPrevention.ts`

**属性**:

- **id**: `string`

- **elementType**: `string`

- **createdAt**: `number`

- **isCleanedUp**: `boolean`

**完整定义**:

```typescript
interface DOMReferenceInfo {
  /** 引用ID */
  id: string;
  /** 元素类型 */
  elementType: string;
  /** 创建时间 */
  createdAt: number;
  /** 是否已清理 */
  isCleanedUp: boolean;
}
```

---

### MemoryUsage

**文件位置**: `src\utils\memoryManagementSystem.ts`

**属性**:

- **used**: `number`

- **total**: `number`

- **percentage**: `number`

- **timestamp**: `number`

**完整定义**:

```typescript
interface MemoryUsage {
  used: number;
  total: number;
  percentage: number;
  timestamp: number;
}
```

---

### MemoryLeakDetection

**文件位置**: `src\utils\memoryManagementSystem.ts`

**属性**:

- **isLeaking**: `boolean`

- **growthRate**: `number`

- **suspiciousObjects**: `string[]`

- **recommendations**: `string[]`

- **severity**: `'low' | 'medium' | 'high' | 'critical'`

**完整定义**:

```typescript
interface MemoryLeakDetection {
  isLeaking: boolean;
  growthRate: number;
  suspiciousObjects: string[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}
```

---

### ComponentMemoryInfo

**文件位置**: `src\utils\memoryManagementSystem.ts`

**属性**:

- **name**: `string`

- **instances**: `number`

- **memoryUsage**: `number`

- **subscriptions**: `number`

- **timers**: `number`

- **eventListeners**: `number`

- **lastUpdate**: `number`

**完整定义**:

```typescript
interface ComponentMemoryInfo {
  name: string;
  instances: number;
  memoryUsage: number;
  subscriptions: number;
  timers: number;
  eventListeners: number;
  lastUpdate: number;
}
```

---

### MemoryConfig

**文件位置**: `src\utils\memoryManagementSystem.ts`

**属性**:

- **maxMemoryUsage**: `number`

- **leakDetectionInterval**: `number`

- **cleanupInterval**: `number`

- **subscriptionTimeout**: `number`

- **enableAutoCleanup**: `boolean`

- **enableLeakDetection**: `boolean`

- **enablePerformanceMonitoring**: `boolean`

- **warningThreshold**: `number`

- **criticalThreshold**: `number`

**完整定义**:

```typescript
interface MemoryConfig {
  maxMemoryUsage: number;
  leakDetectionInterval: number;
  cleanupInterval: number;
  subscriptionTimeout: number;
  enableAutoCleanup: boolean;
  enableLeakDetection: boolean;
  enablePerformanceMonitoring: boolean;
  warningThreshold: number;
  criticalThreshold: number;
}
```

---

### RenderingMetrics

**文件位置**: `src\utils\optimizedRenderingSystem.ts`

**属性**:

- **renderCount**: `number`

- **averageRenderTime**: `number`

- **lastRenderTime**: `number`

- **totalRenderTime**: `number`

- **memoryUsage**: `number`

- **componentName**: `string`

- **timestamp**: `number`

**完整定义**:

```typescript
interface RenderingMetrics {
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  totalRenderTime: number;
  memoryUsage: number;
  componentName: string;
  timestamp: number;
}
```

---

### RenderingConfig

**文件位置**: `src\utils\optimizedRenderingSystem.ts`

**属性**:

- **enableProfiling**: `boolean`

- **enableMemoryTracking**: `boolean`

- **enableRenderOptimization**: `boolean`

- **maxRenderTime**: `number`

- **maxRenderCount**: `number`

- **memoryThreshold**: `number`

- **debounceDelay**: `number`

**完整定义**:

```typescript
interface RenderingConfig {
  enableProfiling: boolean;
  enableMemoryTracking: boolean;
  enableRenderOptimization: boolean;
  maxRenderTime: number;
  maxRenderCount: number;
  memoryThreshold: number;
  debounceDelay: number;
}
```

---

### ComponentRenderState

**文件位置**: `src\utils\optimizedRenderingSystem.ts`

**属性**:

- **isRendering**: `boolean`

- **renderStartTime**: `number`

- **renderCount**: `number`

- **lastProps**: `any`

- **lastState**: `any`

- **shouldUpdate**: `boolean`

**完整定义**:

```typescript
interface ComponentRenderState {
  isRendering: boolean;
  renderStartTime: number;
  renderCount: number;
  lastProps: any;
  lastState: any;
  shouldUpdate: boolean;
}
```

---

### PatternMetadata

**文件位置**: `src\utils\patterns\index.ts`

**属性**:

- **type**: `PatternType`

- **name**: `string`

- **description**: `string`

- **createdAt**: `Date`

- **version**: `string`

**完整定义**:

```typescript
interface PatternMetadata {
  type: PatternType;
  name: string;
  description: string;
  createdAt: Date;
  version: string;
}
```

---

### EventSubscription

**文件位置**: `src\utils\patterns\observer.ts`

**属性**:

- **id**: `string`

- **eventName**: `string`

- **listener**: `EventListener`

- **once** (可选): `boolean`

- **priority** (可选): `number`

- **subscribedAt**: `Date`

**完整定义**:

```typescript
interface EventSubscription {
  /** 订阅ID */
  id: string;
  /** 事件名称 */
  eventName: string;
  /** 监听器函数 */
  listener: EventListener;
  /** 是否只执行一次 */
  once?: boolean;
  /** 优先级（数字越大优先级越高） */
  priority?: number;
  /** 订阅时间 */
  subscribedAt: Date;
}
```

---

### PerformanceFixConfig

**文件位置**: `src\utils\performanceCriticalFixes.ts`

**属性**:

- **enableRenderOptimization**: `boolean`

- **enableMemoryManagement**: `boolean`

- **enableCacheOptimization**: `boolean`

- **enableSubscriptionCleanup**: `boolean`

- **renderThreshold**: `number`

- **memoryThreshold**: `number`

- **cacheHitRateThreshold**: `number`

**完整定义**:

```typescript
interface PerformanceFixConfig {
  enableRenderOptimization: boolean;
  enableMemoryManagement: boolean;
  enableCacheOptimization: boolean;
  enableSubscriptionCleanup: boolean;
  renderThreshold: number;
  memoryThreshold: number;
  cacheHitRateThreshold: number;
}
```

---

### QueryConfig

**文件位置**: `src\utils\queryCacheOptimizer.ts`

**属性**:

- **key**: `string`

- **queryFn**: `() => Promise<any>`

- **cache** (可选): `Partial<CacheConfig>`

- **retry**: `{`

- **enabled**: `boolean`

- **maxAttempts**: `number`

- **delay**: `number`

- **backoff**: `'linear' | 'exponential'`

**完整定义**:

```typescript
interface QueryConfig {
/** 查询键 */
  key: string;
  /** 查询函数 */
  queryFn: () => Promise<any>;
  /** 缓存配置 */
  cache?: Partial<CacheConfig>;
  /** 重试配置 */
  retry: {
    enabled: boolean;
    maxAttempts: number;
    delay: number;
    backoff: 'linear' | 'exponential';
}
```

---

### CacheOptimizationSuggestion

**文件位置**: `src\utils\queryCacheOptimizer.ts`

**属性**:

- **type**: `'strategy' | 'size' | 'ttl' | 'preload' | 'cleanup'`

- **priority**: `'high' | 'medium' | 'low'`

- **description**: `string`

- **currentValue**: `any`

- **suggestedValue**: `any`

- **expectedImprovement**: `string`

- **implementation**: `string`

**完整定义**:

```typescript
interface CacheOptimizationSuggestion {
  type: 'strategy' | 'size' | 'ttl' | 'preload' | 'cleanup';
  priority: 'high' | 'medium' | 'low';
  description: string;
  currentValue: any;
  suggestedValue: any;
  expectedImprovement: string;
  implementation: string;
}
```

---

### SubscriptionState

**文件位置**: `src\utils\realtimeSubscriptionManager.ts`

**属性**:

- **id**: `string`

- **status**: `'connecting' | 'connected' | 'disconnected' | 'error' | 'reconnecting'`

- **connection**: `any`

- **lastActivity**: `number`

- **reconnectAttempts**: `number`

- **memoryUsage**: `number`

- **messageCount**: `number`

- **errorCount**: `number`

- **createdAt**: `number`

- **listeners**: `Set<Function>`

- **buffer**: `any[]`

- **heartbeatTimer** (可选): `NodeJS.Timeout`

- **reconnectTimer** (可选): `NodeJS.Timeout`

- **flushTimer** (可选): `NodeJS.Timeout`

**完整定义**:

```typescript
interface SubscriptionState {
  id: string;
  status:
    | 'connecting'
    | 'connected'
    | 'disconnected'
    | 'error'
    | 'reconnecting';
  connection: any;
  lastActivity: number;
  reconnectAttempts: number;
  memoryUsage: number;
  messageCount: number;
  errorCount: number;
  createdAt: number;
  listeners: Set<Function>;
  buffer: any[];
  heartbeatTimer?: NodeJS.Timeout;
  reconnectTimer?: NodeJS.Timeout;
  flushTimer?: NodeJS.Timeout;
}
```

---

### SubscriptionStats

**文件位置**: `src\utils\realtimeSubscriptionManager.ts`

**属性**:

- **totalSubscriptions**: `number`

- **activeSubscriptions**: `number`

- **totalMemoryUsage**: `number`

- **totalMessages**: `number`

- **totalErrors**: `number`

- **connectionsByType**: `Record<string, number>`

- **connectionsByPriority**: `Record<string, number>`

- **averageLatency**: `number`

- **uptime**: `number`

**完整定义**:

```typescript
interface SubscriptionStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalMemoryUsage: number;
  totalMessages: number;
  totalErrors: number;
  connectionsByType: Record<string, number>;
  connectionsByPriority: Record<string, number>;
  averageLatency: number;
  uptime: number;
}
```

---

### MemoryMonitorConfig

**文件位置**: `src\utils\realtimeSubscriptionManager.ts`

**属性**:

- **enabled**: `boolean`

- **checkInterval**: `number`

- **warningThreshold**: `number`

- **criticalThreshold**: `number`

- **autoCleanup**: `boolean`

- **gcThreshold**: `number`

**完整定义**:

```typescript
interface MemoryMonitorConfig {
  enabled: boolean;
  checkInterval: number;
  warningThreshold: number;
  criticalThreshold: number;
  autoCleanup: boolean;
  gcThreshold: number;
}
```

---

### SubscriptionEvent

**文件位置**: `src\utils\realtimeSubscriptionManager.ts`

**属性**:

- **type**: `'connect' | 'disconnect' | 'message' | 'error' | 'reconnect' | 'cleanup'`

- **subscriptionId**: `string`

- **timestamp**: `number`

- **data** (可选): `any`

- **error** (可选): `Error`

**完整定义**:

```typescript
interface SubscriptionEvent {
  type:
    | 'connect'
    | 'disconnect'
    | 'message'
    | 'error'
    | 'reconnect'
    | 'cleanup';
  subscriptionId: string;
  timestamp: number;
  data?: any;
  error?: Error;
}
```

---

### RoleCountConfig

**文件位置**: `src\utils\roleConfiguration.ts`

**属性**:

- **roleName**: `string`

- **count**: `number`

**完整定义**:

```typescript
interface RoleCountConfig {
  roleName: string;
  count: number;
}
```

---

### ExpandedRole

**文件位置**: `src\utils\roleConfiguration.ts`

**属性**:

- **roleName**: `string`

- **instanceId**: `string`

- **displayName**: `string`

- **roleDesignId** (可选): `string`

**完整定义**:

```typescript
interface ExpandedRole {
  roleName: string;
  instanceId: string;
  displayName: string;
  roleDesignId?: string;
}
```

---

### RateLimiter

**文件位置**: `src\utils\securityEnhancement.ts`

**属性**:

- **key**: `string`

- **requests**: `number`

- **window**: `number`

- **lastReset**: `number`

- **count**: `number`

**完整定义**:

```typescript
interface RateLimiter {
  key: string;
  requests: number;
  window: number; // 时间窗口（毫秒）
  lastReset: number;
  count: number;
}
```

---

### CSRFToken

**文件位置**: `src\utils\securityEnhancement.ts`

**属性**:

- **token**: `string`

- **userId**: `string`

- **sessionId**: `string`

- **expiry**: `number`

- **used**: `boolean`

**完整定义**:

```typescript
interface CSRFToken {
  token: string;
  userId: string;
  sessionId: string;
  expiry: number;
  used: boolean;
}
```

---

### SecurityMiddlewareOptions

**文件位置**: `src\utils\securityMiddleware.ts`

**属性**:

- **requireAuth** (可选): `boolean`

- **requiredPermissions** (可选): `Permission[]`

- **enableRateLimit** (可选): `boolean`

- **rateLimitConfig** (可选): `{`

- **maxRequests**: `number`

- **windowMs**: `number`

**完整定义**:

```typescript
interface SecurityMiddlewareOptions {
requireAuth?: boolean;
  requiredPermissions?: Permission[];
  enableRateLimit?: boolean;
  rateLimitConfig?: {
    maxRequests: number;
    windowMs: number;
}
```

---

### RequestContext

**文件位置**: `src\utils\securityMiddleware.ts`

**属性**:

- **userId** (可选): `string`

- **sessionId** (可选): `string`

- **ipAddress** (可选): `string`

- **userAgent** (可选): `string`

- **method**: `string`

- **path**: `string`

- **headers**: `Record<string, string>`

- **body** (可选): `any`

- **query** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface RequestContext {
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  body?: any;
  query?: Record<string, any>;
}
```

---

### BatchOperation

**文件位置**: `src\utils\skillBatchProcessor.ts`

**属性**:

- **id**: `string`

- **type**: `'skill_use' | 'effect_update' | 'state_sync' | 'validation_check'`

- **data**: `any`

- **priority**: `number`

- **timestamp**: `number`

- **gameStateId**: `string`

- **userId** (可选): `string`

**完整定义**:

```typescript
interface BatchOperation {
  id: string;
  type: 'skill_use' | 'effect_update' | 'state_sync' | 'validation_check';
  data: any;
  priority: number;
  timestamp: number;
  gameStateId: string;
  userId?: string;
}
```

---

### BatchResult

**文件位置**: `src\utils\skillBatchProcessor.ts`

**属性**:

- **success**: `boolean`

- **processed**: `number`

- **errors**: `Array<{ operation: BatchOperation`

**完整定义**:

```typescript
interface BatchResult {
success: boolean;
  processed: number;
  errors: Array<{ operation: BatchOperation; error: any
}
```

---

### SkillValidationCache

**文件位置**: `src\utils\skillCache.ts`

**属性**:

- **canUse**: `boolean`

- **reason** (可选): `string`

- **suggestion** (可选): `string`

**完整定义**:

```typescript
interface SkillValidationCache {
  canUse: boolean;
  reason?: string;
  suggestion?: string;
}
```

---

### UserRoleStateCache

**文件位置**: `src\utils\skillCache.ts`

**属性**:

- **roleState**: `any`

- **roleDesign**: `any`

- **timestamp**: `number`

**完整定义**:

```typescript
interface UserRoleStateCache {
  roleState: any;
  roleDesign: any;
  timestamp: number;
}
```

---

### GameStateCache

**文件位置**: `src\utils\skillCache.ts`

**属性**:

- **gameState**: `any`

- **players**: `any[]`

- **timestamp**: `number`

**完整定义**:

```typescript
interface GameStateCache {
  gameState: any;
  players: any[];
  timestamp: number;
}
```

---

### StandardizedSkillUse

**文件位置**: `src\utils\skillDataStandardizer.ts`

**属性**:

- **id**: `string`

- **user_id**: `string`

- **game_state_id**: `string`

- **skill_name**: `string`

- **skill_chinese_name**: `string`

- **target_user_id** (可选): `string`

- **round_number**: `number`

- **phase**: `string`

- **skill_priority**: `number`

- **execution_status**: `'pending' | 'processing' | 'completed' | 'cancelled' | 'failed'`

- **skill_effects**: `StandardizedEffectData`

- **conditions_met**: `Record<string, any>`

- **result** (可选): `any`

- **execution_time** (可选): `string`

- **failure_reason** (可选): `string`

- **created_at**: `string`

- **updated_at** (可选): `string`

- **skill_config**: `SkillConfig`

**完整定义**:

```typescript
interface StandardizedSkillUse {
  id: string;
  user_id: string;
  game_state_id: string;
  skill_name: string;
  skill_chinese_name: string;
  target_user_id?: string;
  round_number: number;
  phase: string;
  skill_priority: number;
  execution_status:
    | 'pending'
    | 'processing'
    | 'completed'
    | 'cancelled'
    | 'failed';
  skill_effects: StandardizedEffectData;
  conditions_met: Record<string, any>;
  result?: any;
  execution_time?: string;
  failure_reason?: string;
  created_at: string;
  updated_at?: string;
  // 标准化配置
  skill_config: SkillConfig;
}
```

---

### StandardizedSkillEffectsQueue

**文件位置**: `src\utils\skillDataStandardizer.ts`

**属性**:

- **id**: `string`

- **skill_use_id**: `string`

- **game_state_id**: `string`

- **room_id**: `string`

- **effect_type**: `string`

- **effect_data**: `StandardizedEffectData`

- **priority**: `number`

- **execution_order**: `number`

- **status**: `'queued' | 'processing' | 'completed' | 'cancelled' | 'failed'`

- **trigger_time** (可选): `string`

- **processed_at** (可选): `string`

- **expires_at** (可选): `string`

- **conditions** (可选): `Record<string, any>`

- **created_at**: `string`

- **updated_at**: `string`

**完整定义**:

```typescript
interface StandardizedSkillEffectsQueue {
  id: string;
  skill_use_id: string;
  game_state_id: string;
  room_id: string;
  effect_type: string;
  effect_data: StandardizedEffectData;
  priority: number;
  execution_order: number;
  status: 'queued' | 'processing' | 'completed' | 'cancelled' | 'failed';
  trigger_time?: string;
  processed_at?: string;
  expires_at?: string;
  conditions?: Record<string, any>;
  created_at: string;
  updated_at: string;
}
```

---

### StandardizedSkillTarget

**文件位置**: `src\utils\skillDataStandardizer.ts`

**属性**:

- **id**: `string`

- **skill_use_id**: `string`

- **skill_effects_queue_id** (可选): `string`

- **target_user_id** (可选): `string`

- **target_type**: `'player' | 'room' | 'phase' | 'global'`

- **effect_applied**: `StandardizedEffectData`

- **effect_duration** (可选): `number`

- **effect_start_time**: `string`

- **effect_end_time** (可选): `string`

- **stack_count**: `number`

- **is_active**: `boolean`

- **created_at**: `string`

- **updated_at**: `string`

**完整定义**:

```typescript
interface StandardizedSkillTarget {
  id: string;
  skill_use_id: string;
  skill_effects_queue_id?: string;
  target_user_id?: string;
  target_type: 'player' | 'room' | 'phase' | 'global';
  effect_applied: StandardizedEffectData;
  effect_duration?: number;
  effect_start_time: string;
  effect_end_time?: string;
  stack_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

---

### DataValidationResult

**文件位置**: `src\utils\skillDataStandardizer.ts`

**属性**:

- **isValid**: `boolean`

- **errors**: `string[]`

- **warnings**: `string[]`

- **statistics**: `{`

- **totalRecords**: `number`

- **validRecords**: `number`

- **invalidRecords**: `number`

- **missingFieldCount**: `number`

- **inconsistentFieldCount**: `number`

**完整定义**:

```typescript
interface DataValidationResult {
isValid: boolean;
  errors: string[];
  warnings: string[];
  statistics: {
    totalRecords: number;
    validRecords: number;
    invalidRecords: number;
    missingFieldCount: number;
    inconsistentFieldCount: number;
}
```

---

### SkillEffectConfig

**文件位置**: `src\utils\skillEffectsManager.ts`

**属性**:

- **type**: `string`

- **priority**: `number`

- **duration** (可选): `number`

- **conditions** (可选): `any`

- **data**: `any`

**完整定义**:

```typescript
interface SkillEffectConfig {
  type: string;
  priority: number;
  duration?: number;
  conditions?: any;
  data: any;
}
```

---

### StandardizedEffectData

**文件位置**: `src\utils\skillEffectStandardization.ts`

**属性**:

- **effect_type**: `string`

- **target_type** (可选): `string`

- **duration** (可选): `number`

- **stack_count** (可选): `number`

- **data** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface StandardizedEffectData {
  effect_type: string;
  target_type?: string;
  duration?: number;
  stack_count?: number;
  data?: Record<string, any>;
}
```

---

### SkillValidationError

**文件位置**: `src\utils\skillSystemValidation.ts`

**属性**:

- **code**: `string`

- **message**: `string`

- **details** (可选): `Record<string, unknown>`

- **suggestedAction** (可选): `string`

**完整定义**:

```typescript
interface SkillValidationError {
  /** 错误代码 */
  code: string;
  /** 错误消息 */
  message: string;
  /** 错误详情 */
  details?: Record<string, unknown>;
  /** 建议操作 */
  suggestedAction?: string;
}
```

---

### SkillUseLimitValidation

**文件位置**: `src\utils\skillSystemValidation.ts`

**属性**:

- **canUse**: `boolean`

- **remainingUses** (可选): `number`

- **reason** (可选): `string`

**完整定义**:

```typescript
interface SkillUseLimitValidation {
  /** 是否可以使用 */
  canUse: boolean;
  /** 剩余使用次数 */
  remainingUses?: number;
  /** 失败原因 */
  reason?: string;
}
```

---

### WitchGameContext

**文件位置**: `src\utils\skillSystemValidation.ts`

**属性**:

- **gameStateId**: `string`

- **currentRound**: `number`

- **nightDeaths** (可选): `Array<{`

- **userId**: `string`

- **cause**: `string`

- **round**: `number`

**完整定义**:

```typescript
interface WitchGameContext {
/** 游戏状态ID */
  gameStateId: string;
  /** 当前回合数 */
  currentRound: number;
  /** 夜晚死亡信息 */
  nightDeaths?: Array<{
    userId: string;
    cause: string;
    round: number;
}
```

---

### AvailablePlayer

**文件位置**: `src\utils\skillSystemValidation.ts`

**属性**:

- **userId**: `string`

- **username** (可选): `string`

- **roleName** (可选): `string`

- **isAlive**: `boolean`

**完整定义**:

```typescript
interface AvailablePlayer {
  /** 用户ID */
  userId: string;
  /** 用户名 */
  username?: string;
  /** 角色名 */
  roleName?: string;
  /** 是否存活 */
  isAlive: boolean;
}
```

---

### SkillQueueItem

**文件位置**: `src\utils\skillSystemValidation.ts`

**属性**:

- **skillName**: `string`

- **priority**: `number`

- **userId**: `string`

- **targetUserId** (可选): `string`

**完整定义**:

```typescript
interface SkillQueueItem {
  /** 技能名称 */
  skillName: string;
  /** 执行优先级 */
  priority: number;
  /** 使用者用户ID */
  userId: string;
  /** 目标用户ID（可选） */
  targetUserId?: string;
}
```

---

### SkillExecutionOrderResult

**文件位置**: `src\utils\skillSystemValidation.ts`

**属性**:

- **validOrder**: `boolean`

- **conflicts**: `string[]`

- **suggestedOrder**: `SkillQueueItem[]`

**完整定义**:

```typescript
interface SkillExecutionOrderResult {
  /** 执行顺序是否有效 */
  validOrder: boolean;
  /** 冲突列表 */
  conflicts: string[];
  /** 建议的执行顺序 */
  suggestedOrder: SkillQueueItem[];
}
```

---

### SkillValidationRule

**文件位置**: `src\utils\skillValidationRules.ts`

**属性**:

- **skillName**: `string`

- **phases**: `number[]`

- **maxUsesPerGame** (可选): `number`

- **maxUsesPerRound** (可选): `number`

- **requiresTarget**: `boolean`

- **targetValidation** (可选): `(targetId: string, gameStateId: string) => Promise<boolean>`

- **customValidation** (可选): `(userId: string, gameStateId: string, skillData: any) => Promise<boolean>`

**完整定义**:

```typescript
interface SkillValidationRule {
  skillName: string;
  phases: number[]; // 允许的游戏阶段 (1=day, 2=evening, 3=night, 4=dawn)
  maxUsesPerGame?: number; // 每局游戏最大使用次数
  maxUsesPerRound?: number; // 每回合最大使用次数
  requiresTarget: boolean; // 是否需要目标
  targetValidation?: (
    targetId: string,
    gameStateId: string
  ) => Promise<boolean>;
  customValidation?: (
    userId: string,
    gameStateId: string,
    skillData: any
  ) => Promise<boolean>;
}
```

---

### UnifiedCacheConfig

**文件位置**: `src\utils\unifiedCacheManager.ts`

**属性**:

- **defaultProvider**: `CacheProvider`

- **routingRules**: `CacheRoutingRule[]`

- **loadBalancing**: `{`

- **enabled**: `boolean`

- **strategy**: `'round_robin' | 'least_loaded' | 'performance_based'`

- **healthCheckInterval**: `number`

**完整定义**:

```typescript
interface UnifiedCacheConfig {
// 默认提供者
  defaultProvider: CacheProvider;

  // 路由规则
  routingRules: CacheRoutingRule[];

  // 负载均衡配置
  loadBalancing: {
    enabled: boolean;
    strategy: 'round_robin' | 'least_loaded' | 'performance_based';
    healthCheckInterval: number;
}
```

---

### CacheRoutingRule

**文件位置**: `src\utils\unifiedCacheManager.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **condition**: `CacheCondition`

- **provider**: `CacheProvider`

- **priority**: `number`

- **enabled**: `boolean`

**完整定义**:

```typescript
interface CacheRoutingRule {
  id: string;
  name: string;
  condition: CacheCondition;
  provider: CacheProvider;
  priority: number;
  enabled: boolean;
}
```

---

### CacheCondition

**文件位置**: `src\utils\unifiedCacheManager.ts`

**属性**:

- **keyPattern** (可选): `RegExp`

- **dataSize** (可选): `{ min?: number`

**完整定义**:

```typescript
interface CacheCondition {
keyPattern?: RegExp;
  dataSize?: { min?: number; max?: number
}
```

---

### CacheRequestContext

**文件位置**: `src\utils\unifiedCacheManager.ts`

**属性**:

- **key**: `string`

- **operation**: `CacheOperation`

- **priority**: `QueryPriority`

- **tags**: `string[]`

- **dataSize** (可选): `number`

- **ttl** (可选): `number`

- **metadata** (可选): `Record<string, any>`

- **retryCount** (可选): `number`

**完整定义**:

```typescript
interface CacheRequestContext {
  key: string;
  operation: CacheOperation;
  priority: QueryPriority;
  tags: string[];
  dataSize?: number;
  ttl?: number;
  metadata?: Record<string, any>;
  retryCount?: number;
}
```

---

### ProviderHealth

**文件位置**: `src\utils\unifiedCacheManager.ts`

**属性**:

- **provider**: `CacheProvider`

- **healthy**: `boolean`

- **responseTime**: `number`

- **errorRate**: `number`

- **memoryUsage**: `number`

- **lastCheck**: `number`

- **consecutiveFailures**: `number`

**完整定义**:

```typescript
interface ProviderHealth {
  provider: CacheProvider;
  healthy: boolean;
  responseTime: number;
  errorRate: number;
  memoryUsage: number;
  lastCheck: number;
  consecutiveFailures: number;
}
```

---

### UnifiedCacheStats

**文件位置**: `src\utils\unifiedCacheManager.ts`

**属性**:

- **totalRequests**: `number`

- **successfulRequests**: `number`

- **failedRequests**: `number`

- **averageResponseTime**: `number`

- **overallHitRate**: `number`

- **providerStats**: `Map<CacheProvider, ProviderStats>`

- **operationStats**: `Map<CacheOperation, OperationStats>`

- **providerHealth**: `Map<CacheProvider, ProviderHealth>`

- **routingStats**: `Map<string, number>`

**完整定义**:

```typescript
interface UnifiedCacheStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  overallHitRate: number;

  // 按提供者分组的统计
  providerStats: Map<CacheProvider, ProviderStats>;

  // 按操作分组的统计
  operationStats: Map<CacheOperation, OperationStats>;

  // 健康状态
  providerHealth: Map<CacheProvider, ProviderHealth>;

  // 路由统计
  routingStats: Map<string, number>;
}
```

---

### ProviderStats

**文件位置**: `src\utils\unifiedCacheManager.ts`

**属性**:

- **requests**: `number`

- **successes**: `number`

- **failures**: `number`

- **averageResponseTime**: `number`

- **hitRate**: `number`

- **memoryUsage**: `number`

**完整定义**:

```typescript
interface ProviderStats {
  requests: number;
  successes: number;
  failures: number;
  averageResponseTime: number;
  hitRate: number;
  memoryUsage: number;
}
```

---

### OperationStats

**文件位置**: `src\utils\unifiedCacheManager.ts`

**属性**:

- **count**: `number`

- **averageResponseTime**: `number`

- **successRate**: `number`

**完整定义**:

```typescript
interface OperationStats {
  count: number;
  averageResponseTime: number;
  successRate: number;
}
```

---

### UnifiedErrorData

**文件位置**: `src\utils\unifiedErrorManager.ts`

**属性**:

- **id**: `string`

- **type**: `'app' | 'skill' | 'network' | 'validation' | 'business' | 'system' | 'security'`

- **code**: `string`

- **message**: `string`

- **userMessage**: `string`

- **technicalDetails** (可选): `string`

- **severity**: `ErrorSeverity`

- **strategy**: `ErrorHandlingStrategy`

- **context**: `ErrorContext`

- **timestamp**: `Date`

- **retryable**: `boolean`

- **maxRetries**: `number`

- **currentRetries**: `number`

- **stack** (可选): `string`

- **actionSuggestion** (可选): `string`

**完整定义**:

```typescript
interface UnifiedErrorData {
  /** 错误唯一标识 */
  id: string;
  /** 错误类型 */
  type:
    | 'app'
    | 'skill'
    | 'network'
    | 'validation'
    | 'business'
    | 'system'
    | 'security';
  /** 错误代码 */
  code: string;
  /** 原始错误消息 */
  message: string;
  /** 用户友好消息 */
  userMessage: string;
  /** 技术详情 */
  technicalDetails?: string;
  /** 错误严重级别 */
  severity: ErrorSeverity;
  /** 处理策略 */
  strategy: ErrorHandlingStrategy;
  /** 错误上下文 */
  context: ErrorContext;
  /** 时间戳 */
  timestamp: Date;
  /** 是否可重试 */
  retryable: boolean;
  /** 最大重试次数 */
  maxRetries: number;
  /** 当前重试次数 */
  currentRetries: number;
  /** 错误堆栈 */
  stack?: string;
  /** 用户操作建议 */
  actionSuggestion?: string;
}
```

---

### PermissionPolicy

**文件位置**: `src\utils\unifiedPermissionManager.ts`

**属性**:

- **id**: `string`

- **name**: `string`

- **description**: `string`

- **type**: `PermissionPolicyType`

- **priority**: `number`

- **conditions**: `PolicyCondition[]`

- **actions**: `PolicyAction[]`

- **isActive**: `boolean`

- **createdAt**: `number`

- **updatedAt**: `number`

- **createdBy**: `string`

**完整定义**:

```typescript
interface PermissionPolicy {
  id: string;
  name: string;
  description: string;
  type: PermissionPolicyType;
  priority: number;
  conditions: PolicyCondition[];
  actions: PolicyAction[];
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
}
```

---

### PolicyCondition

**文件位置**: `src\utils\unifiedPermissionManager.ts`

**属性**:

- **id**: `string`

- **type**: `'user' | 'role' | 'resource' | 'time' | 'location' | 'custom'`

- **operator**: `'equals' | 'not_equals' | 'in' | 'not_in' | 'contains' | 'matches' | 'greater_than' | 'less_than'`

- **field**: `string`

- **value**: `any`

- **description** (可选): `string`

**完整定义**:

```typescript
interface PolicyCondition {
  id: string;
  type: 'user' | 'role' | 'resource' | 'time' | 'location' | 'custom';
  operator:
    | 'equals'
    | 'not_equals'
    | 'in'
    | 'not_in'
    | 'contains'
    | 'matches'
    | 'greater_than'
    | 'less_than';
  field: string;
  value: any;
  description?: string;
}
```

---

### PolicyAction

**文件位置**: `src\utils\unifiedPermissionManager.ts`

**属性**:

- **id**: `string`

- **type**: `PermissionOperation`

- **target**: `string`

- **parameters** (可选): `Record<string, any>`

- **description** (可选): `string`

**完整定义**:

```typescript
interface PolicyAction {
  id: string;
  type: PermissionOperation;
  target: string; // 权限名称或角色ID
  parameters?: Record<string, any>;
  description?: string;
}
```

---

### PermissionRequest

**文件位置**: `src\utils\unifiedPermissionManager.ts`

**属性**:

- **id**: `string`

- **userId**: `string`

- **permissionName**: `string`

- **resourceType**: `ResourceType`

- **resourceId** (可选): `string`

- **reason**: `string`

- **requestedBy**: `string`

- **requestedAt**: `number`

- **status**: `PermissionStatus`

- **approvedBy** (可选): `string`

- **approvedAt** (可选): `number`

- **expiresAt** (可选): `number`

- **metadata** (可选): `Record<string, any>`

**完整定义**:

```typescript
interface PermissionRequest {
  id: string;
  userId: string;
  permissionName: string;
  resourceType: ResourceType;
  resourceId?: string;
  reason: string;
  requestedBy: string;
  requestedAt: number;
  status: PermissionStatus;
  approvedBy?: string;
  approvedAt?: number;
  expiresAt?: number;
  metadata?: Record<string, any>;
}
```

---

### PermissionAnalysis

**文件位置**: `src\utils\unifiedPermissionManager.ts`

**属性**:

- **userId**: `string`

- **totalPermissions**: `number`

- **activePermissions**: `number`

- **unusedPermissions**: `string[]`

- **conflictingPermissions**: `Array<{`

- **permission1**: `string`

- **permission2**: `string`

- **conflict**: `string`

**完整定义**:

```typescript
interface PermissionAnalysis {
userId: string;
  totalPermissions: number;
  activePermissions: number;
  unusedPermissions: string[];
  conflictingPermissions: Array<{
    permission1: string;
    permission2: string;
    conflict: string;
}
```

---

### PermissionStatistics

**文件位置**: `src\utils\unifiedPermissionManager.ts`

**属性**:

- **totalUsers**: `number`

- **totalRoles**: `number`

- **totalPermissions**: `number`

- **totalPolicies**: `number`

- **userStats**: `{`

- **activeUsers**: `number`

- **inactiveUsers**: `number`

- **suspendedUsers**: `number`

- **averagePermissionsPerUser**: `number`

**完整定义**:

```typescript
interface PermissionStatistics {
totalUsers: number;
  totalRoles: number;
  totalPermissions: number;
  totalPolicies: number;

  // 用户统计
  userStats: {
    activeUsers: number;
    inactiveUsers: number;
    suspendedUsers: number;
    averagePermissionsPerUser: number;
}
```

---

### UnifiedPermissionConfig

**文件位置**: `src\utils\unifiedPermissionManager.ts`

**属性**:

- **cache**: `{`

- **enabled**: `boolean`

- **ttl**: `number`

- **maxSize**: `number`

- **cleanupInterval**: `number`

**完整定义**:

```typescript
interface UnifiedPermissionConfig {
// 缓存配置
  cache: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
    cleanupInterval: number;
}
```

---

### PermissionEvent

**文件位置**: `src\utils\unifiedPermissionManager.ts`

**属性**:

- **id**: `string`

- **type**: `'permission_granted' | 'permission_revoked' | 'role_assigned' | 'role_removed' | 'policy_applied' | 'security_violation'`

- **userId**: `string`

- **targetId**: `string`

- **details**: `Record<string, any>`

- **timestamp**: `number`

- **source**: `string`

- **severity**: `'info' | 'warning' | 'error' | 'critical'`

**完整定义**:

```typescript
interface PermissionEvent {
  id: string;
  type:
    | 'permission_granted'
    | 'permission_revoked'
    | 'role_assigned'
    | 'role_removed'
    | 'policy_applied'
    | 'security_violation';
  userId: string;
  targetId: string; // 权限ID、角色ID等
  details: Record<string, any>;
  timestamp: number;
  source: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}
```

---

### NotificationSystemConfig

**文件位置**: `src\utils\userNotificationSystem.ts`

**属性**:

- **defaultDuration**: `number`

- **defaultPosition**: `NotificationPosition`

- **maxNotifications**: `number`

- **maxHistory**: `number`

- **enableSound**: `boolean`

- **enableAnimation**: `boolean`

- **animationDuration**: `number`

- **enablePersistence**: `boolean`

- **storageKey**: `string`

**完整定义**:

```typescript
interface NotificationSystemConfig {
  /** 默认持续时间 */
  defaultDuration: number;
  /** 默认位置 */
  defaultPosition: NotificationPosition;
  /** 最大通知数量 */
  maxNotifications: number;
  /** 最大历史记录数量 */
  maxHistory: number;
  /** 是否启用声音 */
  enableSound: boolean;
  /** 是否启用动画 */
  enableAnimation: boolean;
  /** 动画持续时间 */
  animationDuration: number;
  /** 是否启用持久化 */
  enablePersistence: boolean;
  /** 存储键名 */
  storageKey: string;
}
```

---

### NotificationStats

**文件位置**: `src\utils\userNotificationSystem.ts`

**属性**:

- **total**: `number`

- **byType**: `Record<NotificationType, number>`

- **byPosition**: `Record<NotificationPosition, number>`

- **averageDisplayTime**: `number`

- **interactionRate**: `number`

- **lastNotificationTime**: `number`

**完整定义**:

```typescript
interface NotificationStats {
  /** 总通知数 */
  total: number;
  /** 按类型统计 */
  byType: Record<NotificationType, number>;
  /** 按位置统计 */
  byPosition: Record<NotificationPosition, number>;
  /** 平均显示时间 */
  averageDisplayTime: number;
  /** 用户交互率 */
  interactionRate: number;
  /** 最后通知时间 */
  lastNotificationTime: number;
}
```

---

### VotingSummary

**文件位置**: `src\utils\votingSystemHelpers.ts`

**属性**:

- **totalVotes**: `number`

- **validVotes**: `number`

- **abstentions**: `number`

- **topCandidate** (可选): `{`

- **playerId**: `string`

- **playerName**: `string`

- **voteCount**: `number`

- **percentage**: `number`

**完整定义**:

```typescript
interface VotingSummary {
totalVotes: number;
  validVotes: number;
  abstentions: number;
  topCandidate?: {
    playerId: string;
    playerName: string;
    voteCount: number;
    percentage: number;
}
```

---

## 通用接口

### 基础响应接口

```typescript
interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: number;
}
```

### 分页接口

```typescript
interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaginatedResponse<T> extends BaseResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

## 更新日志

- 2025-10-08: 自动生成接口定义文档
