/**
 * 技能冲突检测和投票结果处理集成测试
 * 
 * 本文件包含技能冲突检测、投票结果处理以及两者结合的集成测试
 * 测试覆盖以下场景：
 * 1. 技能冲突检测的完整流程
 * 2. 投票结果处理的完整流程
 * 3. 技能冲突与投票结果的交互场景
 * 4. 边界情况和错误处理
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedSkillService } from '@/services/enhancedSkillService';
import { useVotingSystem } from '@/hooks/useVotingSystem';
import { checkSkillConflicts, resolveSkillConflicts } from '@/utils/skillMappingConfig';
import { validateSkillExecutionOrder } from '@/utils/skillSystemValidation';
import { checkEffectConflicts, resolveSkillEffects } from '@/utils/skillEffectsManager';
import { renderHook, act } from '@testing-library/react';
import { toast } from '@/hooks/use-toast';
import type { SkillConfig, SkillQueueItem, SkillEffectConfig } from '@/types/skillSystem.types';

// Mock dependencies
vi.mock('@/integrations/supabase/client');
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
  useToast: () => ({
    toast: vi.fn()
  })
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
    isAuthenticated: true,
    requireAuth: vi.fn()
  })
}));
vi.mock('@/services/votingService', () => ({
  VotingService: {
    castVote: vi.fn(),
    calculateVotingResults: vi.fn(),
    processVotingResult: vi.fn(),
    createVotingSession: vi.fn()
  }
}));

describe('技能冲突检测和投票结果处理集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock supabase auth
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
      error: null
    });
    
    // Mock supabase rpc with default success response
    vi.mocked(supabase.rpc).mockResolvedValue({
      data: { conflicts_detected: 0, conflict_details: [] },
      error: null
    });
    
    // Mock toast
    vi.mocked(toast).mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('技能冲突检测集成测试', () => {
    /**
     * 测试基本技能冲突检测功能
     */
    it('应该正确检测基本技能冲突', () => {
      const activeSkills: SkillConfig[] = [
        {
          id: 'vigil',
          englishName: 'vigil',
          chineseName: '守卫',
          priority: 2,
          conflictsWith: ['night_attack'],
          phaseRestrictions: [3],
          usageLimit: { type: 'per_game', count: 1 },
          targetRequired: true,
          description: '守卫技能'
        },
        {
          id: 'night_attack',
          englishName: 'night_attack',
          chineseName: '夜袭',
          priority: 1,
          conflictsWith: ['vigil'],
          phaseRestrictions: [3],
          usageLimit: { type: 'per_round', count: 1 },
          targetRequired: true,
          description: '夜袭技能'
        }
      ];

      const result = checkSkillConflicts(activeSkills);

      expect(result.conflicts).toBe(true);
      expect(result.conflictPairs).toHaveLength(1);
      expect(result.conflictPairs[0]).toEqual(['vigil', 'night_attack']);
    });

    /**
     * 测试技能冲突解决机制
     */
    it('应该根据优先级正确解决技能冲突', () => {
      const conflictingSkills: SkillConfig[] = [
        {
          id: 'vigil',
          englishName: 'vigil',
          chineseName: '守卫',
          priority: 2, // 优先级较低
          conflictsWith: ['night_attack'],
          phaseRestrictions: [3],
          usageLimit: { type: 'per_game', count: 1 },
          targetRequired: true,
          description: '守卫技能'
        },
        {
          id: 'night_attack',
          englishName: 'night_attack',
          chineseName: '夜袭',
          priority: 1, // 优先级较高
          conflictsWith: ['vigil'],
          phaseRestrictions: [3],
          usageLimit: { type: 'per_round', count: 1 },
          targetRequired: true,
          description: '夜袭技能'
        }
      ];

      const resolved = resolveSkillConflicts(conflictingSkills);

      expect(resolved).toHaveLength(1);
      expect(resolved[0].id).toBe('night_attack'); // 优先级高的技能生效
    });

    /**
     * 测试复杂技能冲突场景
     */
    it('应该正确处理多技能复杂冲突场景', () => {
      const skillQueue: SkillQueueItem[] = [
        {
          skillName: 'vigil',
          userId: 'guard-user',
          targetUserId: 'target-1',
          priority: 2,
          phase: 3
        },
        {
          skillName: 'night_attack',
          userId: 'wolf-user',
          targetUserId: 'target-1',
          priority: 1,
          phase: 3
        },
        {
          skillName: 'magic_potion',
          userId: 'witch-user',
          targetUserId: 'target-1',
          priority: 3,
          phase: 3
        }
      ];

      const result = validateSkillExecutionOrder(skillQueue);

      expect(result.validOrder).toBe(false);
      expect(result.conflicts).toContain('目标 target-1: 守卫保护与狼人攻击冲突');
      expect(result.conflicts).toContain('目标 target-1: 女巫解药与狼人攻击冲突');
    });

    /**
     * 测试技能效果冲突检测
     */
    it('应该正确检测技能效果冲突', () => {
      const effects: SkillEffectConfig[] = [
        {
          id: 'protection-effect',
          type: 'protection',
          priority: 2,
          data: {
            target_user_id: 'target-1',
            effect_type: 'protection'
          }
        },
        {
          id: 'elimination-effect',
          type: 'elimination',
          priority: 1,
          data: {
            target_user_id: 'target-1',
            effect_type: 'elimination',
            can_be_protected: true
          }
        }
      ];

      const result = checkEffectConflicts(effects);

      expect(result.conflicts).toBe(true);
      expect(result.resolution).toHaveLength(1);
      expect(result.resolution[0].type).toBe('protection_vs_elimination');
      expect(result.resolution[0].resolution).toBe('protection_wins');
    });

    /**
     * 测试技能效果解决方案应用
     */
    it('应该正确应用技能效果解决方案', () => {
      const effects: SkillEffectConfig[] = [
        {
          id: 'protection-effect',
          type: 'protection',
          priority: 2,
          data: {
            target_user_id: 'target-1',
            effect_type: 'protection'
          }
        },
        {
          id: 'elimination-effect',
          type: 'elimination',
          priority: 1,
          data: {
            target_user_id: 'target-1',
            effect_type: 'elimination',
            can_be_protected: true
          }
        }
      ];

      const resolved = resolveSkillEffects(effects);

      expect(resolved).toHaveLength(1);
      expect(resolved[0].type).toBe('protection'); // 保护效果生效，伤害效果被移除
    });

    /**
     * 测试数据库技能冲突检测
     */
    it('应该正确调用数据库技能冲突检测', async () => {
      const mockConflictData = {
        conflicts_detected: 2,
        conflict_details: [
          {
            skill1: 'vigil',
            skill2: 'night_attack',
            target: 'target-1'
          }
        ]
      };

      vi.mocked(supabase.rpc).mockResolvedValue({
        data: mockConflictData,
        error: null
      });

      const result = await EnhancedSkillService.detectSkillConflicts(
        'test-game-id',
        1,
        'night'
      );

      expect(supabase.rpc).toHaveBeenCalledWith('detect_skill_conflicts', {
        p_game_state_id: 'test-game-id',
        p_round_number: 1,
        p_phase: 'night'
      });

      expect(result.conflicts).toBe(2);
      expect(result.details).toEqual(mockConflictData);
    });

    /**
     * 测试技能冲突检测错误处理
     */
    it('应该正确处理技能冲突检测错误', async () => {
      vi.mocked(supabase.rpc).mockResolvedValue({
        data: null,
        error: { message: '数据库连接失败', code: 'CONNECTION_ERROR' }
      });

      await expect(
        EnhancedSkillService.detectSkillConflicts('test-game-id', 1, 'night')
      ).rejects.toThrow('冲突检测失败: 数据库连接失败');
    });
  });

  describe('投票结果处理集成测试', () => {
    /**
     * 测试投票会话创建
     */
    it('应该成功创建投票会话', async () => {
      const mockSession = {
        id: 'session-id',
        game_state_id: 'game-id',
        room_id: 'room-id',
        round_number: 1,
        phase: 1,
        session_type: 'day_vote',
        status: 'active',
        start_time: '2024-01-01T12:00:00Z'
      };

      vi.mocked(supabase.from).mockReturnValue({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: mockSession,
              error: null
            })
          }))
        }))
      } as any);

      const { result } = renderHook(() => useVotingSystem());

      await act(async () => {
        const success = await result.current.createVotingSession(
          'game-id',
          'room-id',
          1,
          1,
          'day_vote'
        );
        expect(success).toBe(true);
      });
    });

    /**
     * 测试投票功能
     */
    it('应该成功进行投票', async () => {
      const mockVote = {
        id: 'vote-id',
        voting_session_id: 'session-id',
        voter_id: 'voter-id',
        target_id: 'target-id',
        vote_time: '2024-01-01T12:00:00Z',
        is_valid: true,
        vote_weight: 1
      };

      // Mock VotingService.castVote
      vi.doMock('@/services/votingService', () => ({
        VotingService: {
          castVote: vi.fn().mockResolvedValue(mockVote)
        }
      }));

      const { result } = renderHook(() => useVotingSystem());

      // 设置当前会话
      act(() => {
        (result.current as any).currentSession = {
          id: 'session-id',
          status: 'active'
        };
      });

      await act(async () => {
        const success = await result.current.castVote('voter-id', 'target-id');
        expect(success).toBe(true);
      });
    });

    /**
     * 测试投票结果计算
     */
    it('应该正确计算投票结果', async () => {
      // Mock VotingService.calculateVotingResults
      vi.doMock('@/services/votingService', () => ({
        VotingService: {
          calculateVotingResults: vi.fn().mockResolvedValue(true)
        }
      }));

      const { result } = renderHook(() => useVotingSystem());

      // 设置当前会话
      act(() => {
        (result.current as any).currentSession = {
          id: 'session-id',
          status: 'active'
        };
      });

      await act(async () => {
        const success = await result.current.calculateResults('session-id');
        expect(success).toBe(true);
      });
    });

    /**
     * 测试投票结果处理
     */
    it('应该正确处理投票结果', async () => {
      const mockResults = [
        {
          id: 'result-1',
          result_type: 'eliminated',
          target_id: 'target-1',
          processing_status: 'pending'
        }
      ];

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn().mockResolvedValue({
              data: mockResults,
              error: null
            })
          }))
        }))
      } as any);

      vi.mocked(supabase.rpc).mockResolvedValue({
        data: null,
        error: null
      });

      const { result } = renderHook(() => useVotingSystem());

      await act(async () => {
        const success = await result.current.processEnhancedVotingResult(
          'session-id',
          'room-id',
          'game-id'
        );
        expect(success).toBe(true);
      });

      expect(supabase.rpc).toHaveBeenCalledWith('process_voting_result', {
        p_voting_result_id: 'result-1'
      });
    });

    /**
     * 测试投票统计功能
     */
    it('应该正确计算投票统计信息', () => {
      const mockVotes = [
        {
          id: 'vote-1',
          voting_session_id: 'session-id',
          voter_id: 'voter-1',
          target_id: 'target-1',
          vote_time: '2024-01-01T12:00:00Z',
          is_valid: true,
          vote_weight: 1
        },
        {
          id: 'vote-2',
          voting_session_id: 'session-id',
          voter_id: 'voter-2',
          target_id: 'target-1',
          vote_time: '2024-01-01T12:01:00Z',
          is_valid: true,
          vote_weight: 1
        },
        {
          id: 'vote-3',
          voting_session_id: 'session-id',
          voter_id: 'voter-3',
          target_id: null, // 弃权
          vote_time: '2024-01-01T12:02:00Z',
          is_valid: true,
          vote_weight: 1
        }
      ];

      const { result } = renderHook(() => useVotingSystem());

      // 设置投票数据
      act(() => {
        (result.current as any).votes = mockVotes;
      });

      const summary = result.current.getVotingSummary();

      expect(summary.totalVotes).toBe(3);
      expect(summary.abstentions).toBe(1);
      expect(summary.votesByTarget['target-1']).toBe(2);
      expect(summary.hasVotes).toBe(true);
    });

    /**
     * 测试投票错误处理
     */
    it.skip('应该正确处理投票错误', async () => {
      // 导入 VotingService 模块
      const { VotingService } = await import('@/services/votingService');
      
      // Mock VotingService.castVote 抛出错误
      vi.mocked(VotingService.castVote).mockRejectedValue(new Error('投票失败'));

      const { result } = renderHook(() => useVotingSystem());

      // 设置当前会话
      act(() => {
        (result.current as any).currentSession = {
          id: 'session-id',
          status: 'active'
        };
      });

      await act(async () => {
        const success = await result.current.castVote('voter-id', 'target-id');
        expect(success).toBe(false);
      });

      expect(toast).toHaveBeenCalledWith({
        title: '投票失败',
        description: '请重试',
        variant: 'destructive'
      });
    });
  });

  describe('技能冲突与投票结果交互测试', () => {
    /**
     * 测试投票淘汰后的技能冲突处理
     */
    it('应该在投票淘汰后正确处理技能冲突', async () => {
      // 模拟投票结果：某玩家被淘汰
      const mockVotingResult = {
        id: 'result-1',
        target_id: 'eliminated-player',
        result_type: 'eliminated',
        processing_status: 'completed'
      };

      // 模拟技能冲突：被淘汰玩家的技能与其他技能冲突
      const mockConflictData = {
        conflicts_detected: 1,
        conflict_details: [
          {
            skill1: 'vigil',
            skill2: 'night_attack',
            target: 'eliminated-player',
            affected_by_elimination: true
          }
        ]
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn().mockResolvedValue({
              data: [mockVotingResult],
              error: null
            })
          }))
        }))
      } as any);

      vi.mocked(supabase.rpc).mockImplementation((functionName) => {
        if (functionName === 'process_voting_result') {
          return Promise.resolve({ data: null, error: null });
        }
        if (functionName === 'detect_skill_conflicts') {
          return Promise.resolve({ data: mockConflictData, error: null });
        }
        return Promise.resolve({ data: null, error: null });
      });

      // 1. 处理投票结果
      const { result: votingResult } = renderHook(() => useVotingSystem());
      
      await act(async () => {
        const success = await votingResult.current.processEnhancedVotingResult(
          'session-id',
          'room-id',
          'game-id'
        );
        expect(success).toBe(true);
      });

      // 2. 检测技能冲突
      const conflictResult = await EnhancedSkillService.detectSkillConflicts(
        'game-id',
        1,
        'night'
      );

      expect(conflictResult.conflicts).toBe(1);
      expect(conflictResult.details.conflict_details[0].affected_by_elimination).toBe(true);
    });

    /**
     * 测试技能冲突影响投票结果的场景
     */
    it('应该正确处理技能冲突影响投票结果的场景', async () => {
      // 模拟场景：女巫使用解药救了被投票淘汰的玩家
      const mockSkillEffects: SkillEffectConfig[] = [
        {
          id: 'save-effect',
          type: 'protection',
          priority: 1,
          data: {
            target_user_id: 'voted-target',
            effect_type: 'save_from_elimination'
          }
        }
      ];

      const mockVotingResult = {
        id: 'result-1',
        target_id: 'voted-target',
        result_type: 'eliminated',
        processing_status: 'pending'
      };

      // 检查技能效果是否能阻止投票淘汰
      const hasProtection = mockSkillEffects.some(
        effect => effect.type === 'protection' && 
        effect.data.target_user_id === 'voted-target' &&
        effect.data.effect_type === 'save_from_elimination'
      );

      expect(hasProtection).toBe(true);

      // 如果有保护效果，投票结果应该被修改
      if (hasProtection) {
        mockVotingResult.result_type = 'saved';
      }

      expect(mockVotingResult.result_type).toBe('saved');
    });

    /**
     * 测试并发技能冲突和投票处理
     */
    it.skip('应该正确处理并发的技能冲突和投票处理', async () => {
      const promises = [];

      // 并发执行技能冲突检测
      promises.push(
        EnhancedSkillService.detectSkillConflicts('game-id', 1, 'night')
      );

      // 并发执行投票结果处理
      const { result } = renderHook(() => useVotingSystem());
      promises.push(
        result.current.processEnhancedVotingResult('session-id', 'room-id', 'game-id')
      );

      // Mock 并发响应
      vi.mocked(supabase.rpc).mockImplementation((functionName) => {
        if (functionName === 'detect_skill_conflicts') {
          return Promise.resolve({
            data: { conflicts_detected: 0 },
            error: null
          });
        }
        if (functionName === 'calculate_voting_results' || functionName === 'process_voting_result') {
          return Promise.resolve({
            data: { success: true },
            error: null
          });
        }
        return Promise.resolve({ data: null, error: null });
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn().mockResolvedValue({
              data: [{ id: 'session-id', status: 'active' }],
              error: null
            })
          }))
        }))
      } as any);

      const results = await Promise.all(promises);

      expect(results[0]).toEqual({ conflicts: 0, details: { conflicts_detected: 0 } });
      expect(results[1]).toBe(true);
    });
  });

  describe('边界情况和错误处理测试', () => {
    /**
     * 测试空数据处理
     */
    it('应该正确处理空技能列表', () => {
      const result = checkSkillConflicts([]);
      expect(result.conflicts).toBe(false);
      expect(result.conflictPairs).toHaveLength(0);
    });

    /**
     * 测试单个技能处理
     */
    it('应该正确处理单个技能', () => {
      const singleSkill: SkillConfig[] = [
        {
          id: 'vigil',
          englishName: 'vigil',
          chineseName: '守卫',
          priority: 2,
          conflictsWith: [],
          phaseRestrictions: [3],
          usageLimit: { type: 'per_game', count: 1 },
          targetRequired: true,
          description: '守卫技能'
        }
      ];

      const result = checkSkillConflicts(singleSkill);
      expect(result.conflicts).toBe(false);
    });

    /**
     * 测试网络错误处理
     */
    it('应该正确处理网络错误', async () => {
      const networkError = new Error('Network error');
      networkError.name = 'NetworkError';
      
      vi.mocked(supabase.rpc).mockRejectedValue(networkError);

      await expect(
        EnhancedSkillService.detectSkillConflicts('game-id', 1, 'night')
      ).rejects.toThrow('Network error');
    });

    /**
     * 测试数据格式错误处理
     */
    it('应该正确处理数据格式错误', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn().mockResolvedValue({
              data: 'invalid-data', // 错误的数据格式
              error: null
            })
          }))
        }))
      } as any);

      const { result } = renderHook(() => useVotingSystem());

      await act(async () => {
        const success = await result.current.processEnhancedVotingResult(
          'session-id',
          'room-id',
          'game-id'
        );
        expect(success).toBe(true); // 应该优雅处理错误数据
      });
    });
  });
});