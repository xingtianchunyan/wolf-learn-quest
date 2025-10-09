# 开发最佳实践指南

## 概述

本指南为狼人杀学习任务项目提供全面的开发最佳实践，涵盖代码规范、测试策略、性能优化和安全开发等方面。

## 📋 目录

1. [代码规范](#代码规范)
2. [组件开发](#组件开发)
3. [状态管理](#状态管理)
4. [测试策略](#测试策略)
5. [性能优化](#性能优化)
6. [安全开发](#安全开发)
7. [错误处理](#错误处理)
8. [文档规范](#文档规范)

## 代码规范

### 命名规范

#### 文件命名
```typescript
// ✅ 正确 - 组件文件使用PascalCase
GameRoom.tsx
PlayerCard.tsx
SkillPanel.tsx

// ✅ 正确 - Hook文件使用camelCase
useGameState.ts
usePlayerActions.ts
useSkillEffects.ts

// ✅ 正确 - 工具文件使用camelCase
gameUtils.ts
validationHelpers.ts
apiClient.ts

// ❌ 错误 - 不要使用kebab-case
game-room.tsx
player-card.tsx
```

#### 变量和函数命名
```typescript
// ✅ 正确 - 使用camelCase
const playerName = 'Alice';
const gameState = useGameState();
const handlePlayerAction = () => {};

// ✅ 正确 - 布尔值使用is/has/can前缀
const isGameActive = true;
const hasSkillUsed = false;
const canUseSkill = true;

// ✅ 正确 - 常量使用UPPER_SNAKE_CASE
const MAX_PLAYERS = 12;
const GAME_PHASES = {
  DAY: 'day',
  NIGHT: 'night'
};

// ❌ 错误 - 避免使用下划线前缀
const _privateMethod = () => {}; // 应该使用private关键字
```

#### 接口和类型命名
```typescript
// ✅ 正确 - 接口使用PascalCase
interface PlayerData {
  id: string;
  name: string;
  role: PlayerRole;
}

// ✅ 正确 - 类型别名使用PascalCase
type GamePhase = 'day' | 'night' | 'voting';
type SkillEffect = 'protect' | 'kill' | 'investigate';

// ✅ 正确 - 枚举使用PascalCase
enum PlayerRole {
  WEREWOLF = 'werewolf',
  VILLAGER = 'villager',
  SEER = 'seer'
}
```

### 代码组织

#### 导入顺序
```typescript
// 1. React相关导入
import React, { useState, useEffect } from 'react';

// 2. 第三方库导入
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// 3. 内部组件导入
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 4. 内部Hook和工具导入
import { useGameState } from '@/hooks/useGameState';
import { validatePlayerAction } from '@/utils/validation';

// 5. 类型导入
import type { PlayerData, GameState } from '@/types';
```

#### 组件结构
```typescript
/**
 * 文件级注释：PlayerCard 组件
 * 
 * 该文件实现了一个玩家卡片组件，主要功能包括：
 * - 显示玩家基本信息
 * - 处理玩家状态变化
 * - 提供交互功能
 * 
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 * @category game
 */

import React from 'react';
import { Card } from '@/components/ui/card';
import type { PlayerData } from '@/types';

// 接口定义
interface PlayerCardProps {
  player: PlayerData;
  isSelected?: boolean;
  onSelect?: (playerId: string) => void;
}

/**
 * PlayerCard 组件
 * 
 * 显示玩家信息和状态的卡片组件
 * 
 * @component
 * @param {PlayerCardProps} props - 组件属性
 * @returns {JSX.Element} 渲染的组件
 * 
 * @example
 * // 使用示例
 * <PlayerCard player={playerData} onSelect={handleSelect} />
 */
const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isSelected = false,
  onSelect
}) => {
  // 事件处理函数
  const handleClick = () => {
    onSelect?.(player.id);
  };

  // 渲染
  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-colors",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <h3 className="font-medium">{player.name}</h3>
          <p className="text-sm text-muted-foreground">{player.role}</p>
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
```

## 组件开发

### 组件设计原则

#### 1. 单一职责原则
```typescript
// ✅ 正确 - 每个组件只负责一个功能
const PlayerAvatar = ({ player }) => {
  return <img src={player.avatar} alt={player.name} />;
};

const PlayerName = ({ player }) => {
  return <span>{player.name}</span>;
};

const PlayerStatus = ({ player }) => {
  return <Badge variant={player.isAlive ? 'success' : 'destructive'} />;
};

// ❌ 错误 - 组件承担过多职责
const PlayerEverything = ({ player }) => {
  // 处理头像、名称、状态、技能、投票等所有逻辑
};
```

#### 2. 组件大小控制
```typescript
// ✅ 正确 - 保持组件小于200行
const SimpleButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
};

// ✅ 正确 - 复杂组件拆分为子组件
const GamePanel = () => {
  return (
    <div>
      <GameHeader />
      <GameContent />
      <GameFooter />
    </div>
  );
};
```

#### 3. Props设计
```typescript
// ✅ 正确 - 明确的Props接口
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

// ✅ 正确 - 使用默认值
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick
}) => {
  // 组件实现
};

// ❌ 错误 - 过于宽泛的Props
interface BadProps {
  data: any; // 应该明确类型
  config: object; // 应该定义具体结构
}
```

### Hook开发规范

#### 自定义Hook设计
```typescript
/**
 * useGameState Hook
 * 
 * 管理游戏状态和相关操作
 * 
 * @returns {Object} 游戏状态和操作方法
 */
const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 操作方法
  const startGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await gameApi.startGame();
      setGameState(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const endGame = useCallback(async () => {
    // 结束游戏逻辑
  }, []);

  // 返回状态和方法
  return {
    gameState,
    loading,
    error,
    startGame,
    endGame
  };
};
```

## 状态管理

### Zustand使用规范

#### Store设计
```typescript
/**
 * 游戏状态Store
 */
interface GameStore {
  // 状态
  gameState: GameState;
  players: PlayerData[];
  currentPhase: GamePhase;
  
  // 操作方法
  setGameState: (state: GameState) => void;
  addPlayer: (player: PlayerData) => void;
  removePlayer: (playerId: string) => void;
  nextPhase: () => void;
  
  // 异步操作
  startGame: () => Promise<void>;
  endGame: () => Promise<void>;
}

const useGameStore = create<GameStore>((set, get) => ({
  // 初始状态
  gameState: 'waiting',
  players: [],
  currentPhase: 'day',
  
  // 同步操作
  setGameState: (gameState) => set({ gameState }),
  
  addPlayer: (player) => set((state) => ({
    players: [...state.players, player]
  })),
  
  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId)
  })),
  
  nextPhase: () => set((state) => ({
    currentPhase: state.currentPhase === 'day' ? 'night' : 'day'
  })),
  
  // 异步操作
  startGame: async () => {
    set({ gameState: 'starting' });
    try {
      await gameApi.startGame();
      set({ gameState: 'active' });
    } catch (error) {
      set({ gameState: 'error' });
      throw error;
    }
  },
  
  endGame: async () => {
    // 结束游戏逻辑
  }
}));
```

#### Store使用
```typescript
// ✅ 正确 - 选择性订阅
const GameComponent = () => {
  const gameState = useGameStore(state => state.gameState);
  const startGame = useGameStore(state => state.startGame);
  
  // 组件逻辑
};

// ❌ 错误 - 订阅整个store
const BadComponent = () => {
  const store = useGameStore(); // 会导致不必要的重渲染
};
```

## 测试策略

### 单元测试

#### 组件测试
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PlayerCard from '../PlayerCard';

describe('PlayerCard', () => {
  const mockPlayer = {
    id: '1',
    name: 'Alice',
    role: 'villager',
    isAlive: true
  };

  it('应该正确渲染玩家信息', () => {
    render(<PlayerCard player={mockPlayer} />);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('villager')).toBeInTheDocument();
  });

  it('应该处理点击事件', () => {
    const onSelect = vi.fn();
    render(<PlayerCard player={mockPlayer} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('应该显示选中状态', () => {
    render(<PlayerCard player={mockPlayer} isSelected={true} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveClass('ring-2');
  });
});
```

#### Hook测试
```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useGameState } from '../useGameState';

describe('useGameState', () => {
  it('应该初始化正确的状态', () => {
    const { result } = renderHook(() => useGameState());
    
    expect(result.current.gameState).toBe('waiting');
    expect(result.current.players).toEqual([]);
  });

  it('应该正确添加玩家', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.addPlayer({
        id: '1',
        name: 'Alice',
        role: 'villager'
      });
    });
    
    expect(result.current.players).toHaveLength(1);
    expect(result.current.players[0].name).toBe('Alice');
  });
});
```

### 集成测试

#### API测试
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { gameApi } from '../api/gameApi';

describe('Game API', () => {
  beforeEach(() => {
    // 设置测试环境
  });

  it('应该成功创建游戏', async () => {
    const gameData = {
      name: 'Test Game',
      maxPlayers: 8
    };
    
    const result = await gameApi.createGame(gameData);
    
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });

  it('应该处理API错误', async () => {
    const invalidData = {};
    
    await expect(gameApi.createGame(invalidData))
      .rejects
      .toThrow('Invalid game data');
  });
});
```

## 性能优化

### React性能优化

#### 1. 使用React.memo
```typescript
// ✅ 正确 - 对纯组件使用memo
const PlayerCard = React.memo<PlayerCardProps>(({ player, onSelect }) => {
  return (
    <Card onClick={() => onSelect(player.id)}>
      {player.name}
    </Card>
  );
});

// 自定义比较函数
const PlayerList = React.memo<PlayerListProps>(
  ({ players }) => {
    return (
      <div>
        {players.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.players.length === nextProps.players.length &&
           prevProps.players.every((p, i) => p.id === nextProps.players[i].id);
  }
);
```

#### 2. 使用useCallback和useMemo
```typescript
const GameComponent = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [filter, setFilter] = useState('');

  // ✅ 正确 - 缓存计算结果
  const filteredPlayers = useMemo(() => {
    return players.filter(player => 
      player.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [players, filter]);

  // ✅ 正确 - 缓存事件处理函数
  const handlePlayerSelect = useCallback((playerId: string) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, selected: !p.selected } : p
    ));
  }, []);

  return (
    <div>
      {filteredPlayers.map(player => (
        <PlayerCard 
          key={player.id} 
          player={player} 
          onSelect={handlePlayerSelect}
        />
      ))}
    </div>
  );
};
```

#### 3. 虚拟化长列表
```typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedPlayerList = ({ players }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <PlayerCard player={players[index]} />
    </div>
  );

  return (
    <List
      height={400}
      itemCount={players.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

### 网络优化

#### 1. API请求优化
```typescript
// ✅ 正确 - 使用请求缓存
const usePlayerData = (playerId: string) => {
  return useQuery({
    queryKey: ['player', playerId],
    queryFn: () => playerApi.getPlayer(playerId),
    staleTime: 5 * 60 * 1000, // 5分钟缓存
    cacheTime: 10 * 60 * 1000 // 10分钟保留
  });
};

// ✅ 正确 - 批量请求
const useBatchPlayerData = (playerIds: string[]) => {
  return useQuery({
    queryKey: ['players', playerIds.sort()],
    queryFn: () => playerApi.getBatchPlayers(playerIds),
    enabled: playerIds.length > 0
  });
};
```

#### 2. WebSocket优化
```typescript
// ✅ 正确 - 事件节流
const useThrottledWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io();
    
    // 节流处理高频事件
    const throttledHandler = throttle((data) => {
      // 处理数据
    }, 100);
    
    newSocket.on('game_update', throttledHandler);
    
    setSocket(newSocket);
    
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};
```

## 安全开发

### 输入验证

#### 1. 前端验证
```typescript
import { z } from 'zod';

// ✅ 正确 - 使用schema验证
const playerSchema = z.object({
  name: z.string()
    .min(2, '名称至少2个字符')
    .max(20, '名称最多20个字符')
    .regex(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/, '名称只能包含字母、数字和中文'),
  
  email: z.string()
    .email('请输入有效的邮箱地址'),
    
  age: z.number()
    .min(13, '年龄必须大于13岁')
    .max(100, '年龄必须小于100岁')
});

const PlayerForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (data) => {
    try {
      const validData = playerSchema.parse(data);
      // 提交有效数据
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    }
  };
};
```

#### 2. XSS防护
```typescript
// ✅ 正确 - 转义用户输入
import DOMPurify from 'dompurify';

const SafeUserContent = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  );
};

// ✅ 正确 - 避免直接插入HTML
const UserMessage = ({ message }) => {
  return <p>{message}</p>; // React自动转义
};
```

### 认证和授权

#### 1. Token管理
```typescript
// ✅ 正确 - 安全的token存储
class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';
  
  static setToken(token: string): void {
    // 使用httpOnly cookie或secure storage
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  
  static isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}
```

#### 2. 权限检查
```typescript
// ✅ 正确 - 组件级权限控制
const withPermission = (
  WrappedComponent: React.ComponentType,
  requiredPermission: string
) => {
  return (props: any) => {
    const { user } = useAuth();
    
    if (!user || !user.permissions.includes(requiredPermission)) {
      return <div>权限不足</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// 使用示例
const AdminPanel = withPermission(AdminPanelComponent, 'admin');
```

## 错误处理

### 错误边界

#### 1. 全局错误边界
```typescript
/**
 * 全局错误边界组件
 */
class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 记录错误到监控系统
    console.error('Global error caught:', error, errorInfo);
    
    // 发送错误报告
    this.reportError(error, errorInfo);
  }

  private reportError(error: Error, errorInfo: React.ErrorInfo) {
    // 发送到错误监控服务
    errorReportingService.captureException(error, {
      extra: errorInfo,
      tags: {
        component: 'GlobalErrorBoundary'
      }
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>出现了一些问题</h2>
          <p>我们已经记录了这个错误，请稍后重试。</p>
          <button onClick={() => window.location.reload()}>
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### 2. 异步错误处理
```typescript
// ✅ 正确 - 统一的错误处理Hook
const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error) => {
    setError(error);
    
    // 记录错误
    console.error('Error handled:', error);
    
    // 显示用户友好的错误消息
    toast.error(getErrorMessage(error));
    
    // 发送错误报告
    errorReportingService.captureException(error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};

// 使用示例
const GameComponent = () => {
  const { handleError } = useErrorHandler();

  const startGame = async () => {
    try {
      await gameApi.startGame();
    } catch (error) {
      handleError(error);
    }
  };
};
```

### API错误处理

#### 1. 统一的API客户端
```typescript
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = TokenManager.getToken();

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new ApiError(
          response.status,
          await response.text(),
          response.statusText
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new NetworkError('网络请求失败', error);
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

// 自定义错误类
class ApiError extends Error {
  constructor(
    public status: number,
    public response: string,
    public statusText: string
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}

class NetworkError extends Error {
  constructor(message: string, public originalError: any) {
    super(message);
    this.name = 'NetworkError';
  }
}
```

## 文档规范

### JSDoc注释

#### 1. 文件级注释
```typescript
/**
 * 文件级注释：GameRoom 组件
 * 
 * 该文件实现了游戏房间的主要功能，包括：
 * - 玩家管理和状态同步
 * - 游戏流程控制
 * - 实时通信处理
 * - 用户界面渲染
 * 
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 * @category game
 * @filepath components/game/GameRoom.tsx
 */
```

#### 2. 组件注释
```typescript
/**
 * GameRoom 组件
 * 
 * 游戏房间的主要组件，负责管理游戏状态和玩家交互
 * 
 * @component
 * @param {GameRoomProps} props - 组件属性
 * @param {string} props.roomId - 房间ID
 * @param {PlayerData[]} props.players - 玩家列表
 * @param {Function} props.onGameEnd - 游戏结束回调
 * @returns {JSX.Element} 渲染的游戏房间组件
 * 
 * @example
 * // 基本使用
 * <GameRoom 
 *   roomId="room-123" 
 *   players={playerList}
 *   onGameEnd={handleGameEnd}
 * />
 * 
 * @example
 * // 带有自定义配置
 * <GameRoom 
 *   roomId="room-123"
 *   players={playerList}
 *   config={{ maxPlayers: 12, timeLimit: 300 }}
 *   onGameEnd={handleGameEnd}
 * />
 */
```

#### 3. 函数注释
```typescript
/**
 * 验证玩家操作是否有效
 * 
 * @param {PlayerAction} action - 玩家操作
 * @param {GameState} gameState - 当前游戏状态
 * @param {PlayerData} player - 执行操作的玩家
 * @returns {ValidationResult} 验证结果
 * 
 * @throws {ValidationError} 当操作无效时抛出
 * 
 * @example
 * const result = validatePlayerAction(action, gameState, player);
 * if (result.isValid) {
 *   // 执行操作
 * }
 */
const validatePlayerAction = (
  action: PlayerAction,
  gameState: GameState,
  player: PlayerData
): ValidationResult => {
  // 实现逻辑
};
```

### README文档

#### 项目README结构
```markdown
# 项目名称

## 概述
简要描述项目的目的和功能

## 功能特性
- 功能1
- 功能2
- 功能3

## 技术栈
- React 18
- TypeScript
- Tailwind CSS
- Zustand

## 快速开始

### 环境要求
- Node.js >= 18
- npm >= 8

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

## 项目结构
\`\`\`
src/
├── components/     # 组件
├── hooks/         # 自定义Hook
├── utils/         # 工具函数
├── types/         # 类型定义
└── styles/        # 样式文件
\`\`\`

## 开发指南
- [代码规范](./docs/coding-standards.md)
- [组件开发](./docs/component-guide.md)
- [测试指南](./docs/testing-guide.md)

## 部署
详细的部署说明

## 贡献指南
如何参与项目开发

## 许可证
项目许可证信息
```

## 总结

本最佳实践指南涵盖了项目开发的各个方面，遵循这些规范可以确保：

1. **代码质量**: 统一的编码规范和最佳实践
2. **可维护性**: 清晰的代码结构和完善的文档
3. **性能优化**: 有效的性能优化策略
4. **安全性**: 全面的安全防护措施
5. **测试覆盖**: 完整的测试策略
6. **团队协作**: 统一的开发流程和规范

请在开发过程中严格遵循这些指南，并根据项目的发展不断完善和更新。

---

**最后更新**: 2024-12-19  
**版本**: 1.0.0  
**维护者**: SOLO Coding