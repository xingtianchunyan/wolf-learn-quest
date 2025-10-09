# 组件文档

## 概览

本项目基于React + TypeScript构建，使用模块化组件设计。

## 目录结构

```
src/components/
├── chat/          # 聊天系统组件
├── dialogs/       # 对话框组件
├── game/          # 游戏相关组件
├── home/          # 首页组件
├── judge/         # 法官系统组件
├── layout/        # 布局组件
├── lobby/         # 大厅组件
├── room/          # 房间组件
├── ui/            # 基础UI组件 (shadcn/ui)
└── voting/        # 投票系统组件
```

## 核心组件

### 游戏系统组件

#### StudentSystemPanel.tsx
学生答题界面的主要组件。

**Props:**
- `roomId: string` - 房间ID

**功能:**
- 显示当前题目和答题界面
- 处理学生答题逻辑
- 实时同步房间题目变化
- 显示答题计时器
- 显示上一道题目信息

**使用示例:**
```tsx
<StudentSystemPanel roomId={roomId} />
```

#### GameSkillPanel.tsx
游戏技能面板组件。

**Props:**
```tsx
interface GameSkillPanelProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  selectedTargetId?: string;
  onTargetChange?: (targetId: string | undefined) => void;
}
```

**功能:**
- 显示角色技能信息
- 处理技能使用逻辑
- 目标选择界面
- 技能冷却和限制显示

#### SkillSystemManager.tsx
技能系统管理器。

**Props:**
```tsx
interface SkillSystemManagerProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  roleState: any;
  roleDesign: any;
  currentPhase: number;
  currentRound: number;
}
```

**功能:**
- 统一管理技能系统
- 处理技能冲突
- 技能效果显示
- 技能使用记录

### 投票系统组件

#### VotingPanel.tsx
投票面板组件。

**Props:**
```tsx
interface VotingPanelProps {
  roomId: string;
  gameStateId: string;
  currentPhase: number;
  players: Player[];
}
```

**功能:**
- 显示投票界面
- 处理投票逻辑
- 显示投票结果
- 投票时间管理

### 聊天系统组件

#### MultiChannelChat.tsx
多频道聊天组件。

**Props:**
```tsx
interface MultiChannelChatProps {
  roomId: string;
  currentUserId: string;
  gameState?: GameState;
  players: Player[];
}
```

**功能:**
- 多频道聊天
- 私聊功能
- 系统公告
- 实时消息同步

### 法官系统组件

#### JudgeActionPanel.tsx
法官操作面板。

**Props:**
```tsx
interface JudgeActionPanelProps {
  roomId: string;
  gameState: GameState;
  onPhaseAdvance: () => void;
  onGameEnd: () => void;
}
```

**功能:**
- 游戏阶段控制
- 游戏暂停/恢复
- 游戏结束操作
- 设置管理

## 设计原则

### 1. 单一职责原则
每个组件只负责一个特定的功能模块。

### 2. 统一的错误处理
所有组件使用统一的错误处理机制：

```tsx
import { createLogger } from '@/lib/logger';

const Component = () => {
  const logger = createLogger('ComponentName');
  
  try {
    // 业务逻辑
  } catch (error) {
    logger.error('操作失败:', error);
    toast({
      title: '操作失败',
      description: '请稍后重试',
      variant: 'destructive'
    });
  }
};
```

### 3. 类型安全
所有组件都有完整的TypeScript类型定义：

```tsx
interface ComponentProps {
  required: string;
  optional?: number;
}

const Component: React.FC<ComponentProps> = ({ required, optional = 0 }) => {
  // 组件实现
};
```

### 4. 响应式设计
使用Tailwind CSS实现响应式布局：

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 内容 */}
</div>
```

### 5. 可访问性
遵循WCAG指南，添加适当的ARIA属性：

```tsx
<button 
  aria-label="关闭对话框"
  className="sr-only focus:not-sr-only"
>
  关闭
</button>
```

## 状态管理

### 本地状态
使用React useState管理组件内部状态：

```tsx
const [loading, setLoading] = useState(false);
const [data, setData] = useState<Data[]>([]);
```

### 全局状态
通过Context和自定义Hooks共享状态：

```tsx
const { currentUser, isLoggedIn } = useAuth();
const { gameState, timeRemaining } = useGameState(roomId);
```

### 实时状态
使用Supabase Realtime同步状态：

```tsx
useEffect(() => {
  const channel = supabase
    .channel('table_changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'table_name'
    }, handleChange)
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);
```

## 性能优化

### 1. 懒加载
对大型组件使用懒加载：

```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 使用时
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### 2. 记忆化
使用useMemo和useCallback优化性能：

```tsx
const expensiveValue = useMemo(() => 
  computeExpensiveValue(data), [data]
);

const handleClick = useCallback(() => {
  // 处理点击
}, [dependency]);
```

### 3. 虚拟化
对长列表使用虚拟化：

```tsx
import { FixedSizeList as List } from 'react-window';

<List
  height={600}
  itemCount={items.length}
  itemSize={50}
>
  {({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  )}
</List>
```

## 测试指南

### 单元测试
使用Jest和React Testing Library：

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Component from './Component';

test('should render correctly', () => {
  render(<Component prop="value" />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### 集成测试
测试组件间的交互：

```tsx
test('should handle user interaction', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByRole('button', { name: '点击' }));
  
  await waitFor(() => {
    expect(screen.getByText('结果')).toBeInTheDocument();
  });
});
```

## 最佳实践

### 1. 组件命名
- 使用PascalCase命名组件文件
- 组件名称应该清晰描述其功能
- 避免过于通用的名称

### 2. Props接口
- 总是定义Props接口
- 使用描述性的属性名
- 提供默认值

### 3. 文件组织
- 相关组件放在同一目录下
- 使用index.ts导出组件
- 保持目录结构清晰

### 4. 代码复用
- 提取公共逻辑到自定义Hooks
- 使用高阶组件(HOC)或Render Props模式
- 创建可复用的UI组件

### 5. 错误边界
为重要组件添加错误边界：

```tsx
import { createErrorBoundary } from '@/utils/errorHandler';

const ErrorFallback = ({ error }: { error: Error }) => (
  <div>Something went wrong: {error.message}</div>
);

const SafeComponent = createErrorBoundary(ErrorFallback);
```