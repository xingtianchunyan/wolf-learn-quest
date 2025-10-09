# 最佳实践指南

## 概述

本文档提供了狼人杀学习任务项目的开发最佳实践，包括代码规范、测试策略、性能优化、安全开发等方面的指导原则。

## 目录

- [代码规范](#代码规范)
- [测试策略](#测试策略)
- [性能优化](#性能优化)
- [安全开发](#安全开发)
- [项目结构](#项目结构)
- [Git工作流](#git工作流)
- [部署策略](#部署策略)
- [监控运维](#监控运维)

## 代码规范

### TypeScript/JavaScript规范

#### 命名约定

```typescript
// ✅ 正确的命名方式
// 变量和函数：camelCase
const userName = 'player1';
const gameSettings = { maxPlayers: 8 };
function calculateWinRate(wins: number, total: number): number {}

// 常量：SCREAMING_SNAKE_CASE
const MAX_PLAYERS = 12;
const DEFAULT_GAME_DURATION = 300000;

// 类和接口：PascalCase
class GameStateManager {}
interface PlayerData {}
type GamePhase = 'waiting' | 'playing' | 'finished';

// 枚举：PascalCase
enum GameStatus {
  Waiting = 'waiting',
  Playing = 'playing',
  Finished = 'finished',
}

// 文件名：kebab-case
// game-state-manager.ts
// player-data.interface.ts
// skill-execution.service.ts
```

#### 函数设计原则

```typescript
// ✅ 单一职责原则
function validateUserInput(input: string): ValidationResult {
  // 只负责验证用户输入
}

function formatUserName(name: string): string {
  // 只负责格式化用户名
}

// ✅ 纯函数优先
function calculateDamage(baseDamage: number, multiplier: number): number {
  return baseDamage * multiplier;
}

// ✅ 明确的参数类型和返回值
function createGame(
  settings: GameSettings,
  players: Player[]
): Promise<GameState> {
  // 实现逻辑
}

// ✅ 使用可选参数和默认值
function fetchGameData(
  gameId: string,
  options: {
    includeHistory?: boolean;
    includeStats?: boolean;
  } = {}
): Promise<GameData> {
  const { includeHistory = false, includeStats = false } = options;
  // 实现逻辑
}
```

#### 错误处理

```typescript
// ✅ 使用自定义错误类
class GameError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'GameError';
  }
}

// ✅ 统一的错误处理
async function executeSkill(skillData: SkillData): Promise<SkillResult> {
  try {
    // 验证输入
    if (!skillData.skillType) {
      throw new GameError('技能类型不能为空', 'SKILL_TYPE_REQUIRED');
    }

    // 执行业务逻辑
    const result = await skillService.execute(skillData);
    return result;
  } catch (error) {
    // 记录错误日志
    logger.error('技能执行失败', { error, skillData });

    // 重新抛出或转换错误
    if (error instanceof GameError) {
      throw error;
    }

    throw new GameError('技能执行失败', 'SKILL_EXECUTION_FAILED', 500);
  }
}

// ✅ 使用Result模式处理可能失败的操作
type Result<T, E = Error> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

async function safeExecuteSkill(
  skillData: SkillData
): Promise<Result<SkillResult>> {
  try {
    const result = await executeSkill(skillData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

#### 异步编程

```typescript
// ✅ 使用async/await而不是Promise链
async function processGameAction(action: GameAction): Promise<void> {
  try {
    const validation = await validateAction(action);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const result = await executeAction(action);
    await saveActionResult(result);
    await notifyPlayers(result);
  } catch (error) {
    await handleActionError(error, action);
  }
}

// ✅ 并行处理独立的异步操作
async function loadGameData(gameId: string): Promise<GameData> {
  const [gameState, players, events] = await Promise.all([
    gameService.getState(gameId),
    playerService.getPlayers(gameId),
    eventService.getEvents(gameId),
  ]);

  return {
    state: gameState,
    players,
    events,
  };
}

// ✅ 使用Promise.allSettled处理可能失败的并行操作
async function notifyAllPlayers(
  players: Player[],
  notification: Notification
): Promise<void> {
  const results = await Promise.allSettled(
    players.map(player => notificationService.send(player.id, notification))
  );

  const failures = results
    .filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected'
    )
    .map(result => result.reason);

  if (failures.length > 0) {
    logger.warn('部分通知发送失败', { failures });
  }
}
```

### React组件规范

#### 组件结构

```typescript
/**
 * 游戏状态显示组件
 *
 * @description 显示当前游戏的状态信息，包括阶段、玩家数量、时间等
 * @author 开发者姓名
 * @since 1.0.0
 */
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useGameState } from '@/hooks/shared/useGameState';
import { formatTime } from '@/utils/common/formatters';
import type { GameState } from '@/types/game';

// 组件属性接口
interface GameStatusProps {
  /** 游戏ID */
  gameId: string;
  /** 是否显示详细信息 */
  showDetails?: boolean;
  /** 状态变更回调 */
  onStatusChange?: (status: GameState) => void;
}

/**
 * 游戏状态组件
 */
export const GameStatus = memo<GameStatusProps>(({
  gameId,
  showDetails = false,
  onStatusChange
}) => {
  // Hooks
  const { gameState, isLoading, error } = useGameState(gameId);

  // 计算属性
  const formattedTime = useMemo(() => {
    if (!gameState?.remainingTime) return null;
    return formatTime(gameState.remainingTime);
  }, [gameState?.remainingTime]);

  // 事件处理
  const handleStatusChange = useCallback((newStatus: GameState) => {
    onStatusChange?.(newStatus);
  }, [onStatusChange]);

  // 副作用
  useEffect(() => {
    if (gameState) {
      handleStatusChange(gameState);
    }
  }, [gameState, handleStatusChange]);

  // 渲染逻辑
  if (isLoading) {
    return <div className="animate-pulse">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500">错误: {error}</div>;
  }

  if (!gameState) {
    return <div>游戏不存在</div>;
  }

  return (
    <div className="game-status">
      <div className="status-header">
        <h3 className="text-lg font-semibold">
          游戏状态: {gameState.phase}
        </h3>
        {formattedTime && (
          <span className="text-sm text-gray-600">
            剩余时间: {formattedTime}
          </span>
        )}
      </div>

      {showDetails && (
        <div className="status-details mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">玩家数量:</span>
              <span className="ml-2">
                {gameState.alivePlayers}/{gameState.totalPlayers}
              </span>
            </div>
            <div>
              <span className="font-medium">游戏模式:</span>
              <span className="ml-2">{gameState.mode}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// 设置显示名称（用于调试）
GameStatus.displayName = 'GameStatus';

// 默认导出
export default GameStatus;
```

#### Hook设计

```typescript
/**
 * 游戏数据获取Hook
 *
 * @description 提供游戏数据的获取、缓存和更新功能
 * @param gameId 游戏ID
 * @param options 配置选项
 * @returns 游戏数据和操作方法
 */
export function useGameData(
  gameId: string,
  options: {
    /** 是否自动刷新 */
    autoRefresh?: boolean;
    /** 刷新间隔（毫秒） */
    refreshInterval?: number;
    /** 是否启用缓存 */
    enableCache?: boolean;
  } = {}
) {
  const {
    autoRefresh = false,
    refreshInterval = 5000,
    enableCache = true,
  } = options;

  // 状态管理
  const [data, setData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取数据的函数
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const gameData = await gameService.getGameData(gameId, {
        useCache: enableCache,
      });

      setData(gameData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取数据失败';
      setError(errorMessage);
      logger.error('获取游戏数据失败', { gameId, error: err });
    } finally {
      setIsLoading(false);
    }
  }, [gameId, enableCache]);

  // 自动刷新
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchData]);

  // 初始加载
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 手动刷新
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // 清除缓存
  const clearCache = useCallback(() => {
    gameService.clearCache(gameId);
    fetchData();
  }, [gameId, fetchData]);

  return {
    data,
    isLoading,
    error,
    refresh,
    clearCache,
  };
}
```

### CSS/样式规范

#### Tailwind CSS使用

```typescript
// ✅ 使用语义化的类名组合
const buttonStyles = {
  base: 'px-4 py-2 rounded-md font-medium transition-colors duration-200',
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500'
};

// ✅ 创建可复用的样式组件
const Button = ({ variant = 'primary', children, ...props }) => {
  const className = `${buttonStyles.base} ${buttonStyles[variant]}`;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

// ✅ 使用CSS变量进行主题定制
const themeStyles = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8fafc',
    '--text-primary': '#1f2937',
    '--text-secondary': '#6b7280'
  },
  dark: {
    '--bg-primary': '#1f2937',
    '--bg-secondary': '#374151',
    '--text-primary': '#f9fafb',
    '--text-secondary': '#d1d5db'
  }
};
```

#### 响应式设计

```typescript
// ✅ 移动优先的响应式设计
const ResponsiveLayout = () => (
  <div className="
    grid
    grid-cols-1
    gap-4
    p-4
    sm:grid-cols-2
    sm:gap-6
    sm:p-6
    lg:grid-cols-3
    lg:gap-8
    lg:p-8
    xl:grid-cols-4
  ">
    {/* 内容 */}
  </div>
);

// ✅ 使用断点前缀
const GameCard = () => (
  <div className="
    w-full
    max-w-sm
    mx-auto
    bg-white
    rounded-lg
    shadow-md
    hover:shadow-lg
    transition-shadow
    sm:max-w-md
    lg:max-w-lg
  ">
    {/* 卡片内容 */}
  </div>
);
```

## 测试策略

### 单元测试

#### 测试结构

```typescript
/**
 * 游戏状态管理器测试
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameStateManager } from '@/utils/common/stateHelpers';
import type { GameState } from '@/types/game';

describe('GameStateManager', () => {
  let manager: GameStateManager<GameState>;
  let mockGameState: GameState;

  beforeEach(() => {
    // 测试前的设置
    manager = new GameStateManager({
      maxHistorySize: 10,
      enableCompression: false,
    });

    mockGameState = {
      id: 'test-game',
      phase: 'waiting',
      players: [],
      events: [],
    };
  });

  afterEach(() => {
    // 测试后的清理
    manager.clear();
    vi.clearAllMocks();
  });

  describe('recordState', () => {
    it('应该正确记录游戏状态', () => {
      // Arrange
      const description = '游戏开始';

      // Act
      manager.recordState(mockGameState, description);

      // Assert
      const history = manager.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].state).toEqual(mockGameState);
      expect(history[0].description).toBe(description);
    });

    it('应该限制历史记录数量', () => {
      // Arrange
      const maxSize = 3;
      manager = new GameStateManager({ maxHistorySize: maxSize });

      // Act
      for (let i = 0; i < 5; i++) {
        manager.recordState({ ...mockGameState, id: `game-${i}` }, `状态 ${i}`);
      }

      // Assert
      const history = manager.getHistory();
      expect(history).toHaveLength(maxSize);
      expect(history[0].state.id).toBe('game-2'); // 最早的记录被移除
    });
  });

  describe('undo/redo', () => {
    it('应该正确执行撤销操作', () => {
      // Arrange
      const state1 = { ...mockGameState, phase: 'night' as const };
      const state2 = { ...mockGameState, phase: 'day_discussion' as const };

      manager.recordState(state1, '夜晚阶段');
      manager.recordState(state2, '白天讨论');

      // Act
      const undoResult = manager.undo();

      // Assert
      expect(undoResult).toEqual(state1);
      expect(manager.canRedo()).toBe(true);
    });

    it('应该正确执行重做操作', () => {
      // Arrange
      const state1 = { ...mockGameState, phase: 'night' as const };
      const state2 = { ...mockGameState, phase: 'day_discussion' as const };

      manager.recordState(state1, '夜晚阶段');
      manager.recordState(state2, '白天讨论');
      manager.undo();

      // Act
      const redoResult = manager.redo();

      // Assert
      expect(redoResult).toEqual(state2);
      expect(manager.canUndo()).toBe(true);
    });
  });
});
```

#### 组件测试

```typescript
/**
 * GameStatus组件测试
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { GameStatus } from '@/components/game/GameStatus';
import { useGameState } from '@/hooks/shared/useGameState';

// Mock hooks
vi.mock('@/hooks/shared/useGameState');

const mockUseGameState = vi.mocked(useGameState);

describe('GameStatus', () => {
  const defaultProps = {
    gameId: 'test-game-123',
    showDetails: false
  };

  beforeEach(() => {
    mockUseGameState.mockReturnValue({
      gameState: {
        id: 'test-game-123',
        phase: 'waiting',
        alivePlayers: 6,
        totalPlayers: 8,
        mode: 'classic',
        remainingTime: 300000
      },
      isLoading: false,
      error: null,
      updateGameState: vi.fn(),
      updatePhase: vi.fn(),
      updatePlayerState: vi.fn(),
      addGameEvent: vi.fn(),
      endGame: vi.fn()
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确渲染游戏状态', () => {
    render(<GameStatus {...defaultProps} />);

    expect(screen.getByText('游戏状态: waiting')).toBeInTheDocument();
    expect(screen.getByText(/剩余时间:/)).toBeInTheDocument();
  });

  it('应该在showDetails为true时显示详细信息', () => {
    render(<GameStatus {...defaultProps} showDetails={true} />);

    expect(screen.getByText('玩家数量:')).toBeInTheDocument();
    expect(screen.getByText('6/8')).toBeInTheDocument();
    expect(screen.getByText('游戏模式:')).toBeInTheDocument();
    expect(screen.getByText('classic')).toBeInTheDocument();
  });

  it('应该在加载时显示加载状态', () => {
    mockUseGameState.mockReturnValue({
      gameState: null,
      isLoading: true,
      error: null,
      updateGameState: vi.fn(),
      updatePhase: vi.fn(),
      updatePlayerState: vi.fn(),
      addGameEvent: vi.fn(),
      endGame: vi.fn()
    });

    render(<GameStatus {...defaultProps} />);

    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });

  it('应该在出错时显示错误信息', () => {
    const errorMessage = '网络连接失败';
    mockUseGameState.mockReturnValue({
      gameState: null,
      isLoading: false,
      error: errorMessage,
      updateGameState: vi.fn(),
      updatePhase: vi.fn(),
      updatePlayerState: vi.fn(),
      addGameEvent: vi.fn(),
      endGame: vi.fn()
    });

    render(<GameStatus {...defaultProps} />);

    expect(screen.getByText(`错误: ${errorMessage}`)).toBeInTheDocument();
  });

  it('应该在状态变更时调用回调函数', async () => {
    const onStatusChange = vi.fn();
    const gameState = {
      id: 'test-game-123',
      phase: 'night' as const,
      alivePlayers: 6,
      totalPlayers: 8,
      mode: 'classic' as const,
      remainingTime: 300000
    };

    mockUseGameState.mockReturnValue({
      gameState,
      isLoading: false,
      error: null,
      updateGameState: vi.fn(),
      updatePhase: vi.fn(),
      updatePlayerState: vi.fn(),
      addGameEvent: vi.fn(),
      endGame: vi.fn()
    });

    render(<GameStatus {...defaultProps} onStatusChange={onStatusChange} />);

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(gameState);
    });
  });
});
```

### 集成测试

```typescript
/**
 * 游戏流程集成测试
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestServer } from '@/test/utils/testServer';
import { createTestClient } from '@/test/utils/testClient';
import type { TestServer, TestClient } from '@/test/types';

describe('游戏流程集成测试', () => {
  let server: TestServer;
  let client: TestClient;

  beforeEach(async () => {
    server = await createTestServer();
    client = createTestClient(server.url);
  });

  afterEach(async () => {
    await server.close();
  });

  it('应该完成完整的游戏流程', async () => {
    // 1. 用户注册和登录
    const user1 = await client.register({
      username: 'player1',
      email: 'player1@test.com',
      password: 'password123',
    });

    const user2 = await client.register({
      username: 'player2',
      email: 'player2@test.com',
      password: 'password123',
    });

    // 2. 创建游戏
    const game = await client.createGame({
      name: '测试游戏',
      mode: 'classic',
      maxPlayers: 6,
    });

    expect(game.status).toBe('waiting');

    // 3. 玩家加入游戏
    await client.joinGame(game.id);
    await client.switchUser(user2.token);
    await client.joinGame(game.id);

    // 4. 开始游戏
    await client.switchUser(user1.token);
    const startedGame = await client.startGame(game.id);

    expect(startedGame.status).toBe('playing');
    expect(startedGame.phase).toBe('night');

    // 5. 执行游戏操作
    // 狼人杀人
    if (startedGame.myRole === 'werewolf') {
      const targets = startedGame.players.filter(p => p.role !== 'werewolf');
      await client.useSkill(game.id, {
        skillType: 'werewolf_kill',
        targetId: targets[0].id,
      });
    }

    // 6. 阶段转换
    await client.waitForPhaseChange(game.id, 'day_discussion');

    // 7. 投票
    const voteTarget = startedGame.players[0];
    await client.vote(game.id, {
      targetId: voteTarget.id,
      voteType: 'eliminate',
    });

    // 8. 验证游戏状态
    const finalGame = await client.getGame(game.id);
    expect(finalGame.events.length).toBeGreaterThan(0);
  });
});
```

### E2E测试

```typescript
/**
 * 端到端测试
 */
import { test, expect } from '@playwright/test';

test.describe('狼人杀游戏', () => {
  test('用户可以创建和加入游戏', async ({ page, context }) => {
    // 打开应用
    await page.goto('/');

    // 用户注册
    await page.click('[data-testid="register-button"]');
    await page.fill('[data-testid="username-input"]', 'testuser');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="submit-button"]');

    // 等待登录成功
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();

    // 创建游戏
    await page.click('[data-testid="create-game-button"]');
    await page.fill('[data-testid="game-name-input"]', '测试游戏');
    await page.selectOption('[data-testid="game-mode-select"]', 'classic');
    await page.click('[data-testid="create-button"]');

    // 验证游戏创建成功
    await expect(page.locator('[data-testid="game-lobby"]')).toBeVisible();
    await expect(page.locator('text=测试游戏')).toBeVisible();

    // 在新标签页中模拟第二个用户
    const page2 = await context.newPage();
    await page2.goto('/');

    // 第二个用户注册和加入游戏
    await page2.click('[data-testid="register-button"]');
    await page2.fill('[data-testid="username-input"]', 'testuser2');
    await page2.fill('[data-testid="email-input"]', 'test2@example.com');
    await page2.fill('[data-testid="password-input"]', 'password123');
    await page2.click('[data-testid="submit-button"]');

    // 加入游戏
    await page2.click('[data-testid="join-game-button"]');
    await page2.click('text=测试游戏');

    // 验证两个用户都在游戏中
    await expect(page.locator('text=testuser2')).toBeVisible();
    await expect(page2.locator('text=testuser')).toBeVisible();
  });

  test('游戏流程正常运行', async ({ page }) => {
    // 假设已经有一个正在进行的游戏
    await page.goto('/game/test-game-id');

    // 等待游戏加载
    await expect(page.locator('[data-testid="game-board"]')).toBeVisible();

    // 检查游戏阶段
    await expect(page.locator('[data-testid="game-phase"]')).toContainText(
      '夜晚'
    );

    // 如果是狼人，执行杀人操作
    const roleElement = page.locator('[data-testid="player-role"]');
    const role = await roleElement.textContent();

    if (role?.includes('狼人')) {
      await page.click('[data-testid="skill-button"]');
      await page.click('[data-testid="target-player"]:first-child');
      await page.click('[data-testid="confirm-skill"]');
    }

    // 等待阶段转换
    await expect(page.locator('[data-testid="game-phase"]')).toContainText(
      '白天讨论',
      {
        timeout: 30000,
      }
    );

    // 参与投票
    await page.click('[data-testid="vote-button"]');
    await page.click('[data-testid="vote-target"]:first-child');
    await page.click('[data-testid="confirm-vote"]');

    // 验证投票结果
    await expect(page.locator('[data-testid="vote-result"]')).toBeVisible({
      timeout: 10000,
    });
  });
});
```

## 性能优化

### React性能优化

#### 组件优化

```typescript
// ✅ 使用React.memo避免不必要的重渲染
const PlayerCard = memo<PlayerCardProps>(({ player, onAction }) => {
  return (
    <div className="player-card">
      <img src={player.avatar} alt={player.name} />
      <h3>{player.name}</h3>
      <button onClick={() => onAction(player.id)}>
        操作
      </button>
    </div>
  );
});

// ✅ 使用useMemo缓存计算结果
const GameStatistics = ({ games }: { games: Game[] }) => {
  const statistics = useMemo(() => {
    return {
      totalGames: games.length,
      winRate: games.filter(g => g.winner === 'player').length / games.length,
      averageDuration: games.reduce((sum, g) => sum + g.duration, 0) / games.length
    };
  }, [games]);

  return (
    <div>
      <p>总游戏数: {statistics.totalGames}</p>
      <p>胜率: {(statistics.winRate * 100).toFixed(1)}%</p>
      <p>平均时长: {statistics.averageDuration}分钟</p>
    </div>
  );
};

// ✅ 使用useCallback缓存事件处理函数
const PlayerList = ({ players, onPlayerSelect }: PlayerListProps) => {
  const handlePlayerClick = useCallback((playerId: string) => {
    onPlayerSelect(playerId);
  }, [onPlayerSelect]);

  return (
    <div>
      {players.map(player => (
        <PlayerCard
          key={player.id}
          player={player}
          onAction={handlePlayerClick}
        />
      ))}
    </div>
  );
};
```

#### 虚拟化长列表

```typescript
import { FixedSizeList as List } from 'react-window';

interface VirtualizedGameListProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const VirtualizedGameList = ({ games, onGameSelect }: VirtualizedGameListProps) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const game = games[index];

    return (
      <div style={style} className="game-list-item">
        <GameCard game={game} onSelect={() => onGameSelect(game)} />
      </div>
    );
  };

  return (
    <List
      height={600}
      itemCount={games.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

#### 代码分割和懒加载

```typescript
// ✅ 路由级别的代码分割
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const GameLobby = lazy(() => import('@/pages/GameLobby'));
const GameBoard = lazy(() => import('@/pages/GameBoard'));
const UserProfile = lazy(() => import('@/pages/UserProfile'));

const AppRoutes = () => (
  <Suspense fallback={<div>加载中...</div>}>
    <Routes>
      <Route path="/lobby" element={<GameLobby />} />
      <Route path="/game/:id" element={<GameBoard />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  </Suspense>
);

// ✅ 组件级别的懒加载
const LazyModal = lazy(() => import('@/components/ui/Modal'));

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && (
        <Suspense fallback={<div>加载模态框...</div>}>
          <LazyModal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
};
```

### 网络性能优化

#### 请求优化

```typescript
// ✅ 请求去重
class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<any>>();

  async request<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    const promise = fetcher().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

// ✅ 批量请求
class BatchRequestManager {
  private batchQueue: Array<{
    id: string;
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];
  private batchTimer: NodeJS.Timeout | null = null;

  async batchRequest(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.batchQueue.push({ id, resolve, reject });

      if (!this.batchTimer) {
        this.batchTimer = setTimeout(() => {
          this.processBatch();
        }, 50); // 50ms内的请求合并为一个批次
      }
    });
  }

  private async processBatch() {
    const batch = [...this.batchQueue];
    this.batchQueue.length = 0;
    this.batchTimer = null;

    try {
      const ids = batch.map(item => item.id);
      const results = await api.batchGet(ids);

      batch.forEach((item, index) => {
        item.resolve(results[index]);
      });
    } catch (error) {
      batch.forEach(item => {
        item.reject(error);
      });
    }
  }
}

// ✅ 智能缓存
class SmartCache {
  private cache = new Map<
    string,
    {
      data: any;
      timestamp: number;
      ttl: number;
      accessCount: number;
    }
  >();

  set(key: string, data: any, ttl: number = 300000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      accessCount: 0,
    });

    // 定期清理过期缓存
    this.scheduleCleanup();
  }

  get(key: string): any | null {
    const item = this.cache.get(key);

    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    item.accessCount++;
    return item.data;
  }

  private scheduleCleanup() {
    setTimeout(() => {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (now - item.timestamp > item.ttl) {
          this.cache.delete(key);
        }
      }
    }, 60000); // 每分钟清理一次
  }
}
```

### 状态管理优化

```typescript
// ✅ 使用Zustand进行状态管理
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface GameStore {
  games: Game[];
  currentGame: Game | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setGames: (games: Game[]) => void;
  setCurrentGame: (game: Game | null) => void;
  updateGame: (gameId: string, updates: Partial<Game>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    games: [],
    currentGame: null,
    isLoading: false,
    error: null,

    setGames: games => set({ games }),

    setCurrentGame: game => set({ currentGame: game }),

    updateGame: (gameId, updates) =>
      set(state => ({
        games: state.games.map(game =>
          game.id === gameId ? { ...game, ...updates } : game
        ),
        currentGame:
          state.currentGame?.id === gameId
            ? { ...state.currentGame, ...updates }
            : state.currentGame,
      })),

    setLoading: isLoading => set({ isLoading }),

    setError: error => set({ error }),
  }))
);

// ✅ 选择器优化
export const useGameById = (gameId: string) => {
  return useGameStore(
    useCallback(state => state.games.find(game => game.id === gameId), [gameId])
  );
};

export const useGamePlayers = (gameId: string) => {
  return useGameStore(
    useCallback(
      state => {
        const game = state.games.find(g => g.id === gameId);
        return game?.players || [];
      },
      [gameId]
    )
  );
};
```

## 安全开发

### 输入验证

```typescript
// ✅ 严格的输入验证
import { z } from 'zod';

// 定义验证模式
const CreateGameSchema = z
  .object({
    name: z
      .string()
      .min(1, '游戏名称不能为空')
      .max(50, '游戏名称不能超过50个字符')
      .regex(/^[a-zA-Z0-9\u4e00-\u9fa5\s]+$/, '游戏名称包含非法字符'),

    mode: z.enum(['classic', 'custom'], {
      errorMap: () => ({ message: '无效的游戏模式' }),
    }),

    maxPlayers: z
      .number()
      .int('玩家数量必须是整数')
      .min(4, '最少需要4个玩家')
      .max(12, '最多支持12个玩家'),

    settings: z.object({
      dayDuration: z.number().min(60000).max(600000),
      nightDuration: z.number().min(30000).max(300000),
      roles: z.object({
        werewolf: z.number().min(1).max(4),
        villager: z.number().min(1).max(8),
        seer: z.number().min(0).max(1),
        witch: z.number().min(0).max(1),
        hunter: z.number().min(0).max(1),
      }),
    }),

    isPrivate: z.boolean(),
    password: z.string().optional(),
  })
  .refine(
    data => {
      // 自定义验证：私有游戏必须有密码
      if (data.isPrivate && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: '私有游戏必须设置密码',
      path: ['password'],
    }
  );

// 使用验证
export async function createGame(req: Request, res: Response) {
  try {
    // 验证输入
    const validatedData = CreateGameSchema.parse(req.body);

    // 业务逻辑
    const game = await gameService.createGame(validatedData);

    res.json({
      success: true,
      data: { game },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '输入数据无效',
          details: error.errors,
        },
      });
    }

    throw error;
  }
}
```

### XSS防护

```typescript
// ✅ 输出转义
import DOMPurify from 'dompurify';

// 清理HTML内容
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  });
}

// 转义文本内容
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// React组件中安全渲染
const SafeContent = ({ content }: { content: string }) => {
  const sanitizedContent = useMemo(() => {
    return sanitizeHtml(content);
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedContent
      }}
    />
  );
};
```

### CSRF防护

```typescript
// ✅ CSRF令牌验证
import crypto from 'crypto';

class CSRFProtection {
  private static readonly SECRET = process.env.CSRF_SECRET || 'default-secret';

  static generateToken(sessionId: string): string {
    const timestamp = Date.now().toString();
    const hash = crypto
      .createHmac('sha256', this.SECRET)
      .update(`${sessionId}:${timestamp}`)
      .digest('hex');

    return `${timestamp}:${hash}`;
  }

  static validateToken(token: string, sessionId: string): boolean {
    try {
      const [timestamp, hash] = token.split(':');
      const expectedHash = crypto
        .createHmac('sha256', this.SECRET)
        .update(`${sessionId}:${timestamp}`)
        .digest('hex');

      // 检查令牌是否过期（1小时）
      const tokenAge = Date.now() - parseInt(timestamp);
      if (tokenAge > 3600000) {
        return false;
      }

      return crypto.timingSafeEqual(
        Buffer.from(hash, 'hex'),
        Buffer.from(expectedHash, 'hex')
      );
    } catch {
      return false;
    }
  }
}

// 中间件
export function csrfProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'GET') {
    return next();
  }

  const token = req.headers['x-csrf-token'] as string;
  const sessionId = req.session?.id;

  if (!token || !sessionId || !CSRFProtection.validateToken(token, sessionId)) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'CSRF_TOKEN_INVALID',
        message: 'CSRF令牌无效',
      },
    });
  }

  next();
}
```

### 权限控制

```typescript
// ✅ 基于角色的访问控制
interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

class RoleBasedAccessControl {
  private static permissions: Record<string, Permission[]> = {
    admin: [{ resource: '*', action: '*' }],
    moderator: [
      { resource: 'game', action: 'create' },
      { resource: 'game', action: 'delete' },
      { resource: 'game', action: 'manage' },
      { resource: 'user', action: 'ban' },
      { resource: 'user', action: 'unban' },
    ],
    player: [
      { resource: 'game', action: 'join' },
      { resource: 'game', action: 'leave' },
      { resource: 'game', action: 'play' },
      {
        resource: 'profile',
        action: 'update',
        conditions: { ownProfile: true },
      },
    ],
  };

  static hasPermission(
    userRole: string,
    resource: string,
    action: string,
    context?: Record<string, any>
  ): boolean {
    const rolePermissions = this.permissions[userRole] || [];

    return rolePermissions.some(permission => {
      // 检查资源和操作
      const resourceMatch =
        permission.resource === '*' || permission.resource === resource;
      const actionMatch =
        permission.action === '*' || permission.action === action;

      if (!resourceMatch || !actionMatch) {
        return false;
      }

      // 检查条件
      if (permission.conditions && context) {
        return this.checkConditions(permission.conditions, context);
      }

      return true;
    });
  }

  private static checkConditions(
    conditions: Record<string, any>,
    context: Record<string, any>
  ): boolean {
    return Object.entries(conditions).every(([key, value]) => {
      return context[key] === value;
    });
  }
}

// 权限检查中间件
export function requirePermission(resource: string, action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'AUTH_REQUIRED',
          message: '需要登录',
        },
      });
    }

    const context = {
      userId: user.id,
      ownProfile: req.params.userId === user.id,
    };

    if (
      !RoleBasedAccessControl.hasPermission(
        user.role,
        resource,
        action,
        context
      )
    ) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: '权限不足',
        },
      });
    }

    next();
  };
}
```

## 项目结构

### 目录组织

```
src/
├── components/           # 组件
│   ├── ui/              # 基础UI组件
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── Input/
│   ├── game/            # 游戏相关组件
│   │   ├── GameBoard/
│   │   ├── PlayerCard/
│   │   └── SkillPanel/
│   └── shared/          # 共享组件
│       ├── hoc/         # 高阶组件
│       └── layout/      # 布局组件
├── hooks/               # 自定义Hook
│   ├── game/           # 游戏相关Hook
│   ├── auth/           # 认证相关Hook
│   └── shared/         # 共享Hook
├── pages/              # 页面组件
│   ├── Home/
│   ├── GameLobby/
│   └── GameBoard/
├── services/           # 业务服务
│   ├── api/           # API服务
│   ├── websocket/     # WebSocket服务
│   └── storage/       # 存储服务
├── utils/             # 工具函数
│   ├── common/        # 通用工具
│   ├── game/          # 游戏相关工具
│   └── validation/    # 验证工具
├── types/             # 类型定义
│   ├── api.ts
│   ├── game.ts
│   └── user.ts
├── config/            # 配置文件
│   ├── constants.ts
│   ├── env.ts
│   └── routes.ts
└── styles/            # 样式文件
    ├── globals.css
    └── components/
```

### 文件命名规范

```typescript
// ✅ 组件文件
// components/game/PlayerCard/PlayerCard.tsx
// components/game/PlayerCard/PlayerCard.test.tsx
// components/game/PlayerCard/PlayerCard.stories.tsx
// components/game/PlayerCard/index.ts

// ✅ Hook文件
// hooks/game/useGameState.ts
// hooks/game/useGameState.test.ts

// ✅ 服务文件
// services/api/gameService.ts
// services/api/gameService.test.ts

// ✅ 工具文件
// utils/common/formatters.ts
// utils/common/formatters.test.ts

// ✅ 类型文件
// types/game.types.ts
// types/api.types.ts
```

### 导入导出规范

```typescript
// ✅ 统一的导出方式
// components/game/PlayerCard/PlayerCard.tsx
export const PlayerCard = memo<PlayerCardProps>(({ ... }) => {
  // 组件实现
});

// components/game/PlayerCard/index.ts
export { PlayerCard } from './PlayerCard';
export type { PlayerCardProps } from './PlayerCard';

// ✅ 统一的导入方式
// 外部库导入
import React, { memo, useCallback } from 'react';
import { clsx } from 'clsx';

// 内部模块导入（按层级排序）
import { Button } from '@/components/ui/Button';
import { useGameState } from '@/hooks/game/useGameState';
import { formatTime } from '@/utils/common/formatters';
import type { Player } from '@/types/game';

// ✅ 类型导入分离
import type { FC, ReactNode } from 'react';
import type { GameState, Player } from '@/types/game';
```

## Git工作流

### 分支策略

```bash
# 主分支
main                    # 生产环境代码
develop                 # 开发环境代码

# 功能分支
feature/game-lobby      # 游戏大厅功能
feature/skill-system    # 技能系统功能
feature/user-auth       # 用户认证功能

# 修复分支
hotfix/critical-bug     # 紧急修复
bugfix/ui-issue         # 一般修复

# 发布分支
release/v1.0.0          # 版本发布
```

### 提交规范

```bash
# 提交消息格式
<type>(<scope>): <subject>

<body>

<footer>

# 类型说明
feat:     新功能
fix:      修复bug
docs:     文档更新
style:    代码格式调整
refactor: 代码重构
test:     测试相关
chore:    构建工具、依赖更新

# 示例
feat(game): 添加技能系统

- 实现技能工厂模式
- 添加技能执行服务
- 完善技能配置管理

Closes #123

fix(ui): 修复游戏卡片显示问题

修复在小屏幕设备上游戏卡片布局错乱的问题

Fixes #456
```

### 代码审查

```markdown
# 代码审查清单

## 功能性

- [ ] 功能是否按需求正确实现
- [ ] 边界条件是否正确处理
- [ ] 错误处理是否完善

## 代码质量

- [ ] 代码是否遵循项目规范
- [ ] 命名是否清晰明确
- [ ] 函数是否单一职责
- [ ] 是否有重复代码

## 性能

- [ ] 是否有性能问题
- [ ] 是否正确使用缓存
- [ ] 是否有内存泄漏风险

## 安全性

- [ ] 输入是否正确验证
- [ ] 是否有安全漏洞
- [ ] 敏感信息是否正确处理

## 测试

- [ ] 是否有足够的测试覆盖
- [ ] 测试用例是否合理
- [ ] 是否通过所有测试

## 文档

- [ ] 是否有必要的注释
- [ ] API文档是否更新
- [ ] README是否需要更新
```

## 部署策略

### 环境配置

```typescript
// config/env.ts
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'staging' | 'production';
  API_BASE_URL: string;
  WS_BASE_URL: string;
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  CORS_ORIGINS: string[];
}

const config: Record<string, EnvironmentConfig> = {
  development: {
    NODE_ENV: 'development',
    API_BASE_URL: 'http://localhost:3000/api',
    WS_BASE_URL: 'ws://localhost:3000/ws',
    DATABASE_URL: 'postgresql://localhost:5432/werewolf_dev',
    REDIS_URL: 'redis://localhost:6379',
    JWT_SECRET: 'dev-secret',
    CORS_ORIGINS: ['http://localhost:5173'],
  },
  staging: {
    NODE_ENV: 'staging',
    API_BASE_URL: 'https://api-staging.werewolf.com/api',
    WS_BASE_URL: 'wss://api-staging.werewolf.com/ws',
    DATABASE_URL: process.env.DATABASE_URL!,
    REDIS_URL: process.env.REDIS_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    CORS_ORIGINS: ['https://staging.werewolf.com'],
  },
  production: {
    NODE_ENV: 'production',
    API_BASE_URL: 'https://api.werewolf.com/api',
    WS_BASE_URL: 'wss://api.werewolf.com/ws',
    DATABASE_URL: process.env.DATABASE_URL!,
    REDIS_URL: process.env.REDIS_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    CORS_ORIGINS: ['https://werewolf.com'],
  },
};

export const env = config[process.env.NODE_ENV || 'development'];
```

### CI/CD配置

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: werewolf_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/werewolf_test
          REDIS_URL: redis://localhost:6379

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/werewolf_test
          REDIS_URL: redis://localhost:6379

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Build application
        run: npm run build

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to staging
        run: |
          # 部署到测试环境的脚本
          echo "Deploying to staging..."

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to production
        run: |
          # 部署到生产环境的脚本
          echo "Deploying to production..."
```

## 监控运维

### 日志管理

```typescript
// utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'werewolf-game',
    version: process.env.APP_VERSION || '1.0.0',
  },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export { logger };

// 使用示例
logger.info('用户登录', {
  userId: 'user-123',
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
});

logger.error('游戏创建失败', {
  error: error.message,
  stack: error.stack,
  userId: 'user-123',
  gameData: { name: '测试游戏', mode: 'classic' },
});
```

### 性能监控

```typescript
// utils/metrics.ts
import { performance } from 'perf_hooks';

class MetricsCollector {
  private metrics: Map<string, number[]> = new Map();

  recordTiming(name: string, duration: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(duration);
  }

  recordCounter(name: string, value: number = 1) {
    const key = `${name}_count`;
    if (!this.metrics.has(key)) {
      this.metrics.set(key, []);
    }
    this.metrics.get(key)!.push(value);
  }

  getStats(name: string) {
    const values = this.metrics.get(name) || [];
    if (values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    return {
      count: values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  exportMetrics() {
    const result: Record<string, any> = {};
    for (const [name] of this.metrics) {
      result[name] = this.getStats(name);
    }
    return result;
  }
}

export const metrics = new MetricsCollector();

// 性能监控装饰器
export function measurePerformance(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = performance.now();
    try {
      const result = await method.apply(this, args);
      const duration = performance.now() - start;
      metrics.recordTiming(
        `${target.constructor.name}.${propertyName}`,
        duration
      );
      return result;
    } catch (error) {
      metrics.recordCounter(`${target.constructor.name}.${propertyName}.error`);
      throw error;
    }
  };
}
```

### 错误监控

```typescript
// utils/errorTracking.ts
interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  userAgent: string;
  userId?: string;
  sessionId: string;
  timestamp: number;
  level: 'error' | 'warning' | 'info';
  context?: Record<string, any>;
}

class ErrorTracker {
  private errorQueue: ErrorReport[] = [];
  private isOnline = navigator.onLine;

  constructor() {
    this.setupGlobalErrorHandlers();
    this.setupNetworkListeners();
  }

  private setupGlobalErrorHandlers() {
    // 捕获JavaScript错误
    window.addEventListener('error', event => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        level: 'error',
      });
    });

    // 捕获Promise拒绝
    window.addEventListener('unhandledrejection', event => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        level: 'error',
      });
    });

    // 捕获React错误边界
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('React')) {
        this.captureError({
          message: args.join(' '),
          url: window.location.href,
          level: 'error',
          context: { type: 'react_error' },
        });
      }
      originalConsoleError.apply(console, args);
    };
  }

  private setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushErrorQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  captureError(error: Partial<ErrorReport>) {
    const errorReport: ErrorReport = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      url: error.url || window.location.href,
      lineNumber: error.lineNumber,
      columnNumber: error.columnNumber,
      userAgent: navigator.userAgent,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
      timestamp: Date.now(),
      level: error.level || 'error',
      context: error.context,
    };

    this.errorQueue.push(errorReport);

    if (this.isOnline) {
      this.flushErrorQueue();
    }
  }

  private async flushErrorQueue() {
    if (this.errorQueue.length === 0) return;

    const errors = [...this.errorQueue];
    this.errorQueue.length = 0;

    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ errors }),
      });
    } catch (error) {
      // 如果发送失败，重新加入队列
      this.errorQueue.unshift(...errors);
    }
  }

  private getCurrentUserId(): string | undefined {
    // 从认证状态获取用户ID
    return localStorage.getItem('userId') || undefined;
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }
}

export const errorTracker = new ErrorTracker();
```

### 健康检查

```typescript
// utils/healthCheck.ts
interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: Record<
    string,
    {
      status: 'pass' | 'fail';
      message?: string;
      duration: number;
    }
  >;
  timestamp: number;
}

class HealthChecker {
  private checks: Map<string, () => Promise<boolean>> = new Map();

  registerCheck(name: string, checkFn: () => Promise<boolean>) {
    this.checks.set(name, checkFn);
  }

  async runHealthCheck(): Promise<HealthCheckResult> {
    const results: HealthCheckResult = {
      status: 'healthy',
      checks: {},
      timestamp: Date.now(),
    };

    let failedChecks = 0;

    for (const [name, checkFn] of this.checks) {
      const start = performance.now();
      try {
        const passed = await Promise.race([
          checkFn(),
          new Promise<boolean>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 5000)
          ),
        ]);

        results.checks[name] = {
          status: passed ? 'pass' : 'fail',
          duration: performance.now() - start,
        };

        if (!passed) failedChecks++;
      } catch (error) {
        results.checks[name] = {
          status: 'fail',
          message: error instanceof Error ? error.message : 'Unknown error',
          duration: performance.now() - start,
        };
        failedChecks++;
      }
    }

    // 确定整体健康状态
    const totalChecks = this.checks.size;
    if (failedChecks === 0) {
      results.status = 'healthy';
    } else if (failedChecks < totalChecks / 2) {
      results.status = 'degraded';
    } else {
      results.status = 'unhealthy';
    }

    return results;
  }
}

export const healthChecker = new HealthChecker();

// 注册健康检查
healthChecker.registerCheck('api', async () => {
  try {
    const response = await fetch('/api/health', { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
});

healthChecker.registerCheck('websocket', async () => {
  return new Promise(resolve => {
    const ws = new WebSocket(
      process.env.WS_BASE_URL || 'ws://localhost:3000/ws'
    );

    const timeout = setTimeout(() => {
      ws.close();
      resolve(false);
    }, 3000);

    ws.onopen = () => {
      clearTimeout(timeout);
      ws.close();
      resolve(true);
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
  });
});

healthChecker.registerCheck('localStorage', async () => {
  try {
    const testKey = '__health_check__';
    localStorage.setItem(testKey, 'test');
    const value = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return value === 'test';
  } catch {
    return false;
  }
});
```

## 总结

本最佳实践指南涵盖了狼人杀学习任务项目开发的各个方面：

### 核心原则

1. **代码质量优先**：遵循严格的代码规范和设计原则
2. **安全第一**：实施全面的安全防护措施
3. **性能优化**：持续关注和优化应用性能
4. **可维护性**：编写清晰、可读、可测试的代码
5. **团队协作**：建立统一的工作流程和标准

### 关键实践

- 使用TypeScript确保类型安全
- 实施全面的测试策略
- 建立完善的错误处理机制
- 采用现代化的开发工具链
- 实施持续集成和部署
- 建立监控和运维体系

### 持续改进

- 定期审查和更新最佳实践
- 收集团队反馈并优化流程
- 关注技术发展趋势
- 持续学习和分享经验

遵循这些最佳实践将帮助团队构建高质量、可维护、安全可靠的狼人杀学习任务应用。
