/**
 * useGameState Hook 单元测试
 * 测试游戏状态管理的核心功能
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGameState, type GameState, type GameSettings } from '../useGameState';
import { supabase } from '@/integrations/supabase/client';

// Mock dependencies
vi.mock('@/integrations/supabase/client');
vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    requireAuth: vi.fn(),
    user: { id: 'test-user-id' },
    loading: false
  })
}));

describe('useGameState', () => {
  const mockRoomId = 'test-room-id';
  const mockGameState: GameState = {
    id: 'test-game-id',
    roomId: 'test-room-id',
    status: 'active',
    currentPhase: 3,
    currentRound: 1,
    phaseStartTime: '2024-01-01T00:00:00Z',
    phaseEndTime: '2024-01-01T01:00:00Z',
    isPaused: false,
    pausedAt: null,
    totalPausedDuration: 0,
    autoAdvance: true,
    phaseDuration: 3600,
    createdAt: '2024-01-01T00:00:00Z'
  };

  const mockGameSettings: GameSettings = {
    id: 'test-settings-id',
    roomId: 'test-room-id',
    isAutoAdvance: true,
    dayDuration: 300,
    eveningDuration: 180,
    nightDuration: 240,
    dawnDuration: 120
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock supabase methods
    const mockChannel = {
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnValue(Promise.resolve())
    };

    vi.mocked(supabase.channel).mockReturnValue(mockChannel);
    vi.mocked(supabase.removeChannel).mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('初始化和数据获取', () => {
    /**
     * 测试成功获取游戏状态和设置
     */
    it('应该成功获取游戏状态和设置', async () => {
      // Mock supabase queries
      vi.mocked(supabase.from).mockImplementation((table: string) => {
        const mockQuery = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn()
        };

        if (table === 'game_states') {
          mockQuery.maybeSingle.mockResolvedValue({
            data: {
              id: mockGameState.id,
              room_id: mockGameState.roomId,
              status: mockGameState.status,
              current_phase: mockGameState.currentPhase,
              current_round: mockGameState.currentRound,
              phase_start_time: mockGameState.phaseStartTime,
              phase_end_time: mockGameState.phaseEndTime,
              is_paused: mockGameState.isPaused,
              paused_at: mockGameState.pausedAt,
              total_paused_duration: mockGameState.totalPausedDuration,
              auto_advance: mockGameState.autoAdvance,
              phase_duration: mockGameState.phaseDuration,
              created_at: mockGameState.createdAt
            },
            error: null
          });
        } else if (table === 'game_settings') {
          mockQuery.maybeSingle.mockResolvedValue({
            data: {
              id: mockGameSettings.id,
              room_id: mockGameSettings.roomId,
              is_auto_advance: mockGameSettings.isAutoAdvance,
              day_duration: mockGameSettings.dayDuration,
              evening_duration: mockGameSettings.eveningDuration,
              night_duration: mockGameSettings.nightDuration,
              dawn_duration: mockGameSettings.dawnDuration
            },
            error: null
          });
        }

        return mockQuery;
      });

      // 执行测试
      const { result } = renderHook(() => useGameState(mockRoomId));

      // 等待数据加载完成
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 验证结果
      expect(result.current.gameState).toEqual(mockGameState);
      expect(result.current.gameSettings).toEqual(mockGameSettings);
    });

    /**
     * 测试处理空房间ID的情况
     */
    it('应该在房间ID为空时不执行查询', () => {
      // 执行测试
      const { result } = renderHook(() => useGameState(''));

      // 验证结果
      expect(result.current.gameState).toBeNull();
      expect(result.current.gameSettings).toBeNull();
      expect(result.current.loading).toBe(true);
      expect(supabase.from).not.toHaveBeenCalled();
    });

    /**
     * 测试处理数据库错误的情况
     */
    it('应该正确处理数据库查询错误', async () => {
      // Mock error response
      vi.mocked(supabase.from).mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({
          data: null,
          error: { code: 'PGRST301', message: 'Database error' }
        })
      }));

      // 执行测试
      const { result } = renderHook(() => useGameState(mockRoomId));

      // 等待处理完成
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 验证结果
      expect(result.current.gameState).toBeNull();
      expect(result.current.gameSettings).toBeNull();
    });
  });

  describe('实时更新', () => {
    /**
     * 测试游戏状态实时更新
     */
    it('应该正确处理游戏状态的实时更新', async () => {
      let gameStateCallback: ((payload: any) => void) | undefined;

      // Mock channel subscription
      const mockChannel = {
        on: vi.fn().mockImplementation((event, config, callback) => {
          if (config.table === 'game_states') {
            gameStateCallback = callback;
          }
          return mockChannel;
        }),
        subscribe: vi.fn()
      };

      vi.mocked(supabase.channel).mockReturnValue(mockChannel);

      // Mock initial data fetch
      vi.mocked(supabase.from).mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null })
      }));

      // 执行测试
      const { result } = renderHook(() => useGameState(mockRoomId));

      // 等待初始化完成
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 模拟实时更新
      const updatedGameState = {
        ...mockGameState,
        current_phase: 1, // 更新阶段
        current_round: 2  // 更新回合
      };

      if (gameStateCallback) {
        gameStateCallback({
          new: updatedGameState,
          old: null,
          eventType: 'UPDATE'
        });
      }

      // 验证更新结果
      await waitFor(() => {
        expect(result.current.gameState?.currentPhase).toBe(1);
        expect(result.current.gameState?.currentRound).toBe(2);
      });
    });

    /**
     * 测试游戏设置实时更新
     */
    it('应该正确处理游戏设置的实时更新', async () => {
      let gameSettingsCallback: ((payload: any) => void) | undefined;

      // Mock channel subscription
      const mockChannel = {
        on: vi.fn().mockImplementation((event, config, callback) => {
          if (config.table === 'game_settings') {
            gameSettingsCallback = callback;
          }
          return mockChannel;
        }),
        subscribe: vi.fn()
      };

      vi.mocked(supabase.channel).mockReturnValue(mockChannel);

      // Mock initial data fetch
      vi.mocked(supabase.from).mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null })
      }));

      // 执行测试
      const { result } = renderHook(() => useGameState(mockRoomId));

      // 等待初始化完成
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 模拟实时更新
      const updatedGameSettings = {
        ...mockGameSettings,
        day_duration: 600, // 更新白天持续时间
        is_auto_advance: false // 更新自动推进设置
      };

      if (gameSettingsCallback) {
        gameSettingsCallback({
          new: updatedGameSettings,
          old: null,
          eventType: 'UPDATE'
        });
      }

      // 验证更新结果
      await waitFor(() => {
        expect(result.current.gameSettings?.dayDuration).toBe(600);
        expect(result.current.gameSettings?.isAutoAdvance).toBe(false);
      });
    });
  });

  describe('时间计算', () => {
    /**
     * 测试剩余时间计算
     */
    it('应该正确计算阶段剩余时间', async () => {
      // 设置当前时间
      const now = new Date('2024-01-01T00:30:00Z').getTime();
      
      // 模拟Date构造函数和Date.now()
      const originalDate = global.Date;
      global.Date = class extends Date {
        constructor(...args: any[]) {
          if (args.length === 0) {
            super(now);
          } else {
            super(...args);
          }
        }
        
        static now() {
          return now;
        }
        
        getTime() {
          if (arguments.length === 0 && this.toISOString() === new originalDate(now).toISOString()) {
            return now;
          }
          return super.getTime();
        }
      } as any;

      // Mock initial data with phase end time
      const gameStateWithEndTime = {
        ...mockGameState,
        phaseEndTime: '2024-01-01T01:00:00Z',
        isPaused: false
      };

      vi.mocked(supabase.from).mockImplementation((table: string) => {
        const mockQuery = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn()
        };

        if (table === 'game_states') {
          mockQuery.maybeSingle.mockResolvedValue({
            data: {
              ...gameStateWithEndTime,
              phase_end_time: gameStateWithEndTime.phaseEndTime
            },
            error: null
          });
        } else {
          mockQuery.maybeSingle.mockResolvedValue({ data: null, error: null });
        }

        return mockQuery;
      });

      // 执行测试
      const { result } = renderHook(() => useGameState(mockRoomId));

      // 等待数据加载完成
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 验证剩余时间计算（30分钟 = 1800秒）
      expect(result.current.timeRemaining).toBe(1800);
      
      // 恢复原始Date
      global.Date = originalDate;
    });

    /**
     * 测试游戏暂停时的时间计算
     */
    it('应该在游戏暂停时将剩余时间设为0', async () => {
      // Mock paused game state
      const pausedGameState = {
        ...mockGameState,
        isPaused: true,
        phaseEndTime: '2024-01-01T01:00:00Z'
      };

      vi.mocked(supabase.from).mockImplementation((table: string) => {
        const mockQuery = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn()
        };

        if (table === 'game_states') {
          mockQuery.maybeSingle.mockResolvedValue({
            data: {
              ...pausedGameState,
              is_paused: pausedGameState.isPaused,
              phase_end_time: pausedGameState.phaseEndTime
            },
            error: null
          });
        } else {
          mockQuery.maybeSingle.mockResolvedValue({ data: null, error: null });
        }

        return mockQuery;
      });

      // 执行测试
      const { result } = renderHook(() => useGameState(mockRoomId));

      // 等待数据加载完成
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 验证暂停时剩余时间为0
      expect(result.current.timeRemaining).toBe(0);
    });

    /**
     * 测试阶段结束时间为空的情况
     */
    it('应该在阶段结束时间为空时将剩余时间设为0', async () => {
      // Mock game state without end time
      const gameStateWithoutEndTime = {
        ...mockGameState,
        phaseEndTime: null
      };

      vi.mocked(supabase.from).mockImplementation((table: string) => {
        const mockQuery = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn()
        };

        if (table === 'game_states') {
          mockQuery.maybeSingle.mockResolvedValue({
            data: {
              ...gameStateWithoutEndTime,
              phase_end_time: null
            },
            error: null
          });
        } else {
          mockQuery.maybeSingle.mockResolvedValue({ data: null, error: null });
        }

        return mockQuery;
      });

      // 执行测试
      const { result } = renderHook(() => useGameState(mockRoomId));

      // 等待数据加载完成
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 验证无结束时间时剩余时间为0
      expect(result.current.timeRemaining).toBe(0);
    });
  });

  describe('清理和卸载', () => {
    /**
     * 测试组件卸载时的清理工作
     */
    it('应该在组件卸载时正确清理订阅', () => {
      // 执行测试
      const { unmount } = renderHook(() => useGameState(mockRoomId));

      // 卸载组件
      unmount();

      // 验证清理工作
      expect(supabase.removeChannel).toHaveBeenCalled();
    });
  });
});