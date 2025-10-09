/**
 * useVotingSystem Hook 单元测试
 * 测试投票系统的核心功能
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { useVotingSystem } from '../useVotingSystem';
import { supabase } from '@/integrations/supabase/client';
import { VotingService } from '@/services/votingService';

// Mock useToast
const mockToast = vi.fn();

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn(() => ({
              data: [],
              error: null,
            })),
          })),
        })),
      })),
    })),
    channel: vi.fn(() => {
      const mockChannel = {
        on: vi.fn(() => mockChannel),
        subscribe: vi.fn(() => mockChannel),
        unsubscribe: vi.fn(),
      };
      return mockChannel;
    }),
    removeChannel: vi.fn(),
    auth: {
      getUser: vi.fn(() =>
        Promise.resolve({
          data: { user: { id: 'test-user-id' } },
          error: null,
        })
      ),
    },
  },
}));

// Create mock AuthContext
/**
 * MockAuthContext组件
 * MockAuthContext组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MockAuthContext = React.createContext({
  currentUser: null,
  isLoggedIn: false,
  initializing: false,
  isLoginOpen: false,
  setIsLoginOpen: vi.fn(),
  requireAuth: vi.fn(() => true),
});

vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => React.useContext(MockAuthContext),
}));

// 模拟 VotingService
vi.mock('@/services/votingService', () => ({
  VotingService: {
    createVotingSession: vi.fn(),
    castVote: vi.fn(),
    calculateVotingResults: vi.fn(),
  },
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
  createLogger: () => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  }),
}));

// Mock AuthProvider
/**
 * MockAuthProvider组件
 * MockAuthProvider组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mockAuthValue = {
    currentUser: null,
    isLoggedIn: false,
    initializing: false,
    isLoginOpen: false,
    setIsLoginOpen: vi.fn(),
    requireAuth: vi.fn(() => true),
  };

  return React.createElement(
    MockAuthContext.Provider,
    { value: mockAuthValue },
    children
  );
};

// Test wrapper component
/**
 * TestWrapper组件
 * TestWrapper组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return React.createElement(MockAuthProvider, {}, children);
};

describe('useVotingSystem', () => {
  beforeEach(() => {
    // 重置所有模拟
    vi.clearAllMocks();

    // 重置模拟的 toast 函数
    mockToast.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('初始化和数据获取', () => {
    /**
     * 测试投票会话的初始化
     */
    it('应该正确初始化投票会话', async () => {
      // 模拟成功的数据获取
      const mockVotingSession = {
        id: 'test-session-id',
        game_state_id: 'test-game-id',
        round_number: 1,
        phase: 2,
        session_type: 'elimination',
        status: 'active',
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-01T01:00:00Z',
        created_at: '2024-01-01T00:00:00Z',
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              data: [mockVotingSession],
              error: null,
            })),
          })),
        })),
      });

      // 渲染Hook
      const { result } = renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });

      // 等待数据加载
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 验证结果
      expect(result.current.currentSession).toEqual(mockVotingSession);
      expect(result.current.error).toBeNull();
    });

    /**
     * 测试空游戏状态ID的处理
     */
    it('应该正确处理空游戏状态ID', () => {
      // 渲染Hook，传入空的游戏状态ID
      const { result } = renderHook(() => useVotingSystem(''), {
        wrapper: TestWrapper,
      });

      // 验证结果
      expect(result.current.currentSession).toBeNull();
      expect(result.current.votes).toEqual([]);
      expect(result.current.results).toEqual([]);
      expect(result.current.loading).toBe(false);
    });

    /**
     * 测试数据库错误处理
     */
    it('应该正确处理数据库查询错误', async () => {
      // 模拟数据库错误
      const mockError = { message: '数据库连接失败' };
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              data: null,
              error: mockError,
            })),
          })),
        })),
      });

      // 渲染Hook
      const { result } = renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });

      // 等待错误处理
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 验证错误处理
      expect(result.current.error).toBe('数据库连接失败');
      expect(mockToast).toHaveBeenCalledWith({
        title: '错误',
        description: '获取投票会话失败: 数据库连接失败',
        variant: 'destructive',
      });
    });
  });

  describe('特定投票会话获取', () => {
    /**
     * 测试根据轮次和阶段获取投票会话
     */
    it('应该根据轮次和阶段正确获取投票会话', async () => {
      // 模拟特定投票会话数据
      const mockSpecificSession = {
        id: 'specific-session-id',
        game_state_id: 'test-game-id',
        round_number: 2,
        phase: 2,
        session_type: 'elimination',
        status: 'completed',
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-01T01:00:00Z',
        created_at: '2024-01-01T00:00:00Z',
      };

      // 模拟数据库查询返回
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              limit: vi.fn(() =>
                Promise.resolve({
                  data: [mockSpecificSession],
                  error: null,
                })
              ),
            })),
          })),
        })),
      });

      // 渲染Hook
      const { result } = renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });

      // 等待初始化完成
      await waitFor(
        () => {
          expect(result.current.loading).toBe(false);
        },
        { timeout: 10000 }
      );

      // 调用获取特定会话的方法
      const specificSession = await result.current.getVotingSession(2, 2);

      // 验证结果
      expect(specificSession).toEqual(mockSpecificSession);
    }, 15000);
  });

  describe('实时更新', () => {
    /**
     * 测试投票会话的实时更新
     */
    it('应该正确处理投票会话的实时更新', async () => {
      // 模拟实时订阅
      const mockChannel = {
        on: vi.fn(() => mockChannel),
        subscribe: vi.fn(() => Promise.resolve()),
        unsubscribe: vi.fn(),
      };

      vi.mocked(supabase.channel).mockReturnValue(mockChannel);

      // 渲染Hook
      const { result } = renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });

      // 等待订阅设置
      await waitFor(
        () => {
          expect(supabase.channel).toHaveBeenCalledWith(
            'voting_system_test-game-id'
          );
        },
        { timeout: 10000 }
      );

      // 验证订阅设置
      expect(mockChannel.on).toHaveBeenCalled();
      expect(mockChannel.subscribe).toHaveBeenCalled();
    }, 15000);

    /**
     * 测试投票记录的实时更新
     */
    it('应该正确处理投票记录的实时更新', async () => {
      // 模拟投票记录更新
      const mockChannel = {
        on: vi.fn(() => mockChannel),
        subscribe: vi.fn(() => Promise.resolve()),
        unsubscribe: vi.fn(),
      };

      vi.mocked(supabase.channel).mockReturnValue(mockChannel);

      // 渲染Hook
      renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });

      // 等待订阅设置
      await waitFor(
        () => {
          expect(mockChannel.on).toHaveBeenCalled();
        },
        { timeout: 10000 }
      );

      // 验证投票记录订阅
      expect(mockChannel.on).toHaveBeenCalledWith(
        'postgres_changes',
        expect.objectContaining({
          event: '*',
          schema: 'public',
          table: 'votes',
        }),
        expect.any(Function)
      );
    }, 15000);

    /**
     * 测试投票结果的实时更新
     */
    it('应该正确处理投票结果的实时更新', async () => {
      // 模拟投票结果更新
      const mockChannel = {
        on: vi.fn(() => mockChannel),
        subscribe: vi.fn(() => Promise.resolve()),
        unsubscribe: vi.fn(),
      };

      vi.mocked(supabase.channel).mockReturnValue(mockChannel);

      // 渲染Hook
      renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });

      // 等待订阅设置
      await waitFor(
        () => {
          expect(mockChannel.on).toHaveBeenCalled();
        },
        { timeout: 10000 }
      );

      // 验证投票会话订阅
      expect(mockChannel.on).toHaveBeenCalledWith(
        'postgres_changes',
        expect.objectContaining({
          event: '*',
          schema: 'public',
          table: 'voting_sessions',
          filter: 'game_state_id=eq.test-game-id',
        }),
        expect.any(Function)
      );
    }, 15000);
  });

  describe('投票会话创建', () => {
    /**
     * 测试投票会话的创建
     */
    it('应该成功创建新的投票会话', async () => {
      // 模拟成功的插入操作
      const mockNewSession = {
        id: 'new-session-id',
        game_state_id: 'test-game-id',
        round_number: 1,
        phase: 2,
        session_type: 'elimination',
        status: 'active',
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-01T01:00:00Z',
        created_at: '2024-01-01T00:00:00Z',
      };

      // 模拟 VotingService.createVotingSession 返回会话ID
      vi.mocked(VotingService.createVotingSession).mockResolvedValue(
        'new-session-id'
      );

      // 重置并设置新的模拟
      vi.mocked(supabase.from).mockImplementation(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              limit: vi.fn(() => ({
                data: [],
                error: null,
              })),
            })),
          })),
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({
              data: mockNewSession,
              error: null,
            })),
          })),
        })),
      }));

      // 渲染Hook
      const { result } = renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });

      // 等待初始化完成
      await waitFor(
        () => {
          expect(result.current.loading).toBe(false);
        },
        { timeout: 10000 }
      );

      // 创建投票会话
      const newSession = await result.current.createVotingSession(
        1,
        2,
        'elimination'
      );

      // 验证结果 - createVotingSession 返回的是 sessionId，不是完整对象
      expect(newSession).toBe('new-session-id');
    }, 15000);

    /**
     * 测试投票会话创建时的错误处理
     */
    it('应该正确处理投票会话创建错误', async () => {
      // 为这个测试使用真实定时器
      vi.useRealTimers();

      // 模拟插入错误
      const mockError = new Error('创建投票会话失败');

      // 模拟 VotingService.createVotingSession 抛出错误
      vi.mocked(VotingService.createVotingSession).mockRejectedValue(mockError);

      vi.mocked(supabase.from).mockImplementation(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              limit: vi.fn(() => ({
                data: [],
                error: null,
              })),
            })),
          })),
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({
              data: null,
              error: mockError,
            })),
          })),
        })),
      }));

      // 渲染Hook
      const { result } = renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });

      // 等待初始化完成
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // 尝试创建投票会话
      const newSession = await result.current.createVotingSession(
        1,
        2,
        'elimination'
      );

      // 验证错误处理
      expect(newSession).toBeNull();
      expect(mockToast).toHaveBeenCalledWith({
        title: '创建投票会话失败',
        description: '请重试',
        variant: 'destructive',
      });

      // 恢复假定时器
      vi.useFakeTimers();
    });
  });

  describe('清理工作', () => {
    /**
     * 测试组件卸载时的清理工作
     */
    it('应该在组件卸载时正确清理订阅', () => {
      // 模拟订阅对象
      const mockChannel = {
        on: vi.fn(() => mockChannel),
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      };

      vi.mocked(supabase.channel).mockReturnValue(mockChannel);

      // 渲染并卸载Hook
      const { unmount } = renderHook(() => useVotingSystem('test-game-id'), {
        wrapper: TestWrapper,
      });
      unmount();

      // 验证清理工作
      expect(supabase.removeChannel).toHaveBeenCalled();
    });

    /**
     * 测试游戏状态ID变更时的清理工作
     */
    it('应该在游戏状态ID变更时正确清理和重新订阅', () => {
      // 模拟订阅对象
      const mockChannel = {
        on: vi.fn(() => mockChannel),
        subscribe: vi.fn(),
        unsubscribe: vi.fn(),
      };

      vi.mocked(supabase.channel).mockReturnValue(mockChannel);

      // 渲染Hook并更改游戏状态ID
      const { rerender } = renderHook(
        ({ gameStateId }) => useVotingSystem(gameStateId),
        {
          initialProps: { gameStateId: 'test-game-id-1' },
          wrapper: TestWrapper,
        }
      );

      // 更改游戏状态ID
      rerender({ gameStateId: 'test-game-id-2' });

      // 验证清理和重新订阅
      expect(supabase.removeChannel).toHaveBeenCalled();
      expect(supabase.channel).toHaveBeenCalledWith(
        'voting_sessions_test-game-id-2'
      );
    });
  });
});
