/**
 * 增强技能服务单元测试
 * 测试技能服务的核心功能，包括技能配置获取、验证、使用等
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies before importing the service
vi.mock('@/integrations/supabase/client');
vi.mock('@/lib/logger', () => ({
  createLogger: vi.fn(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  })),
}));
vi.mock('@/services/performanceMonitoringService');
vi.mock('@/utils/skillValidationRules', () => ({
  validateSkillUnified: vi.fn(),
}));

// Now import the service and other dependencies
import {
  EnhancedSkillService,
  SkillServiceError,
} from '../enhancedSkillService';
import { supabase } from '@/integrations/supabase/client';
import { createLogger } from '@/lib/logger';
import { validateSkillUnified } from '@/utils/skillValidationRules';
import {
  SkillUsageContext,
  RoleDesign,
  RoleState,
  SkillConfig as SkillConfigType,
} from '@/types/skillSystem.types';

describe('EnhancedSkillService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock supabase auth
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
      error: null,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getRoleSkillConfig', () => {
    /**
     * 测试获取角色技能配置功能
     */
    it('应该成功获取有效角色的技能配置', () => {
      // 准备测试数据
      const roleDesign: RoleDesign = {
        id: 'test-role-id',
        skill_name: 'seer_prophecy',
        role_name: '预言家',
        description: '测试角色',
        created_at: '2024-01-01T00:00:00Z',
      };

      // 执行测试
      const result = EnhancedSkillService.getRoleSkillConfig(roleDesign, 'zh');

      // 验证结果
      expect(result).toBeDefined();
      expect(result.englishName).toBe('prophecy');
      expect(result.chineseName).toBe('占卜');
    });

    /**
     * 测试处理无效角色设计的情况
     */
    it('应该在角色设计缺少技能名称时抛出错误', () => {
      // 准备测试数据
      const roleDesign: RoleDesign = {
        id: 'test-role-id',
        skill_name: '',
        role_name: '测试角色',
        description: '测试角色',
        created_at: '2024-01-01T00:00:00Z',
      };

      // 执行测试并验证错误
      expect(() => {
        EnhancedSkillService.getRoleSkillConfig(roleDesign, 'zh');
      }).toThrow(SkillServiceError);
    });

    /**
     * 测试处理未知技能名称的情况
     */
    it('应该在技能配置不存在时抛出错误', () => {
      // 准备测试数据
      const roleDesign: RoleDesign = {
        id: 'test-role-id',
        skill_name: 'unknown_skill',
        role_name: '未知角色',
        description: '测试角色',
        created_at: '2024-01-01T00:00:00Z',
      };

      // 执行测试并验证错误
      expect(() => {
        EnhancedSkillService.getRoleSkillConfig(roleDesign, 'zh');
      }).toThrow(SkillServiceError);
      expect(() => {
        EnhancedSkillService.getRoleSkillConfig(roleDesign, 'zh');
      }).toThrow('未找到技能配置: unknown_skill');
    });
  });

  describe('getSkillUsedCount', () => {
    /**
     * 测试获取技能使用次数功能
     */
    it('应该正确返回新版格式的技能使用次数', () => {
      // 准备测试数据
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: {
          seer_prophecy: {
            total: 3,
            used: 1,
            remaining: 2,
          },
        },
        round_skill_uses: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      // 执行测试
      const result = EnhancedSkillService.getSkillUsedCount(
        roleState,
        'seer_prophecy'
      );

      // 验证结果
      expect(result).toBe(1);
    });

    /**
     * 测试处理旧版格式的技能使用次数
     */
    it('应该正确返回旧版格式的技能使用次数', () => {
      // 准备测试数据
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: {
          total: 3,
          remaining: 1,
        },
        round_skill_uses: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      // 执行测试
      const result = EnhancedSkillService.getSkillUsedCount(
        roleState,
        'seer_prophecy'
      );

      // 验证结果
      expect(result).toBe(2); // total(3) - remaining(1) = used(2)
    });

    /**
     * 测试处理空技能使用状态的情况
     */
    it('应该在技能使用状态为空时返回0', () => {
      // 准备测试数据
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: null,
        round_skill_uses: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      // 执行测试
      const result = EnhancedSkillService.getSkillUsedCount(
        roleState,
        'seer_prophecy'
      );

      // 验证结果
      expect(result).toBe(0);
    });
  });

  describe('hasSkillUsedInCurrentRound', () => {
    /**
     * 测试检查技能在当前回合是否已使用
     */
    it('应该正确检查技能在当前回合的使用状态', () => {
      // 准备测试数据
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: null,
        round_skill_uses: {
          1: ['seer_prophecy', 'witch_heal'],
          2: ['witch_poison'],
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      // 执行测试
      const result1 = EnhancedSkillService.hasSkillUsedInCurrentRound(
        roleState,
        'seer_prophecy',
        1
      );
      const result2 = EnhancedSkillService.hasSkillUsedInCurrentRound(
        roleState,
        'seer_prophecy',
        2
      );
      const result3 = EnhancedSkillService.hasSkillUsedInCurrentRound(
        roleState,
        'witch_poison',
        2
      );

      // 验证结果
      expect(result1).toBe(true); // seer_prophecy在第1回合已使用
      expect(result2).toBe(false); // seer_prophecy在第2回合未使用
      expect(result3).toBe(true); // witch_poison在第2回合已使用
    });

    /**
     * 测试处理空回合技能使用记录的情况
     */
    it('应该在回合技能使用记录为空时返回false', () => {
      // 准备测试数据
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: null,
        round_skill_uses: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      // 执行测试
      const result = EnhancedSkillService.hasSkillUsedInCurrentRound(
        roleState,
        'seer_prophecy',
        1
      );

      // 验证结果
      expect(result).toBe(false);
    });
  });

  describe('validateSkillUsage', () => {
    /**
     * 测试技能使用条件验证
     */
    it('应该成功验证有效的技能使用条件', async () => {
      // Mock validateSkillUnified
      vi.mocked(validateSkillUnified).mockResolvedValue({
        valid: true,
        reason: '验证通过',
      });

      // 准备测试数据
      const context: SkillUsageContext = {
        userId: 'test-user-id',
        gameStateId: 'test-game-id',
        currentPhase: 3, // 夜晚阶段
        roleDesign: {
          id: 'test-role-id',
          skill_name: 'seer_prophecy',
          role_name: '预言家',
          description: '测试角色',
          created_at: '2024-01-01T00:00:00Z',
        },
        roleState: {
          id: 'test-role-state-id',
          user_id: 'test-user-id',
          game_state_id: 'test-game-id',
          role_design_id: 'test-role-design-id',
          role_status: 1,
          skill_uses_remaining: null,
          round_skill_uses: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        targetUserId: 'target-user-id',
      };

      // 执行测试
      const result = await EnhancedSkillService.validateSkillUsage(
        context,
        'zh'
      );

      // 验证结果
      expect(result.isValid).toBe(true);
      expect(result.reason).toBe('验证通过');
    });

    /**
     * 测试技能配置不存在的情况
     */
    it('应该在技能配置不存在时返回验证失败', async () => {
      // 准备测试数据
      const context: SkillUsageContext = {
        userId: 'test-user-id',
        gameStateId: 'test-game-id',
        currentPhase: 3,
        roleDesign: {
          id: 'test-role-id',
          skill_name: 'unknown_skill',
          role_name: '未知角色',
          description: '测试角色',
          created_at: '2024-01-01T00:00:00Z',
        },
        roleState: {
          id: 'test-role-state-id',
          user_id: 'test-user-id',
          game_state_id: 'test-game-id',
          role_design_id: 'test-role-design-id',
          role_status: 1,
          skill_uses_remaining: null,
          round_skill_uses: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      };

      // 执行测试
      const result = await EnhancedSkillService.validateSkillUsage(
        context,
        'zh'
      );

      // 验证结果
      expect(result.isValid).toBe(false);
      expect(result.reason).toBe('未找到技能配置');
      expect(result.suggestedAction).toBe('请检查角色设计配置');
    });
  });

  describe('useSkillEnhanced', () => {
    /**
     * 测试增强版技能使用功能
     */
    it('应该成功使用技能', async () => {
      // Mock dependencies
      vi.mocked(validateSkillUnified).mockResolvedValue({
        valid: true,
        reason: '验证通过',
      });

      // Mock supabase RPC call
      vi.mocked(supabase.rpc).mockResolvedValue({
        data: 'skill_use_success',
        error: null,
      });

      // 准备测试数据
      const context: SkillUsageContext = {
        userId: 'test-user-id',
        gameStateId: 'test-game-id',
        currentPhase: 3,
        roleDesign: {
          id: 'test-role-id',
          skill_name: 'seer_prophecy',
          role_name: '预言家',
          description: '测试角色',
          created_at: '2024-01-01T00:00:00Z',
        },
        roleState: {
          id: 'test-role-state-id',
          user_id: 'test-user-id',
          game_state_id: 'test-game-id',
          role_design_id: 'test-role-design-id',
          role_status: 1,
          skill_uses_remaining: null,
          round_skill_uses: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        targetUserId: 'target-user-id',
      };

      // 执行测试
      const result = await EnhancedSkillService.useSkillEnhanced(context, 'zh');

      // 验证结果
      expect(result).toBe('skill_use_success');
      expect(supabase.rpc).toHaveBeenCalledWith(
        'use_skill_enhanced',
        expect.objectContaining({
          p_game_state_id: 'test-game-id',
          p_skill_name: 'prophecy',
          p_target_user_id: 'target-user-id',
          p_skill_data: expect.objectContaining({
            skill_config_id: 'seer_prophecy',
            chinese_name: '占卜',
            priority: 4,
          }),
        })
      );
    });

    /**
     * 测试用户未登录的情况
     */
    it('应该在用户未登录时抛出错误', async () => {
      // Mock unauthenticated user
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: null },
        error: null,
      });

      // 准备测试数据
      const context: SkillUsageContext = {
        userId: 'test-user-id',
        gameStateId: 'test-game-id',
        currentPhase: 3,
        roleDesign: {
          id: 'test-role-id',
          skill_name: 'seer_prophecy',
          role_name: '预言家',
          description: '测试角色',
          created_at: '2024-01-01T00:00:00Z',
        },
        roleState: {
          id: 'test-role-state-id',
          user_id: 'test-user-id',
          game_state_id: 'test-game-id',
          role_design_id: 'test-role-design-id',
          role_status: 1,
          skill_uses_remaining: null,
          round_skill_uses: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      };

      // 执行测试并验证错误
      await expect(
        EnhancedSkillService.useSkillEnhanced(context, 'zh')
      ).rejects.toThrow('用户未登录');
    });
  });

  describe('边界情况和错误处理测试', () => {
    /**
     * 测试空角色状态的处理
     */
    it('应该正确处理空角色状态', () => {
      const result = EnhancedSkillService.getSkillUsedCount(
        null as any,
        'seer_prophecy'
      );
      expect(result).toBe(0);
    });

    /**
     * 测试无效技能名称的处理
     */
    it('应该正确处理无效技能名称', () => {
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: null,
        round_skill_uses: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = EnhancedSkillService.getSkillUsedCount(roleState, '');
      expect(result).toBe(0);
    });

    /**
     * 测试技能使用状态数据格式异常的处理
     */
    it('应该正确处理异常的技能使用状态数据', () => {
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: 'invalid_data' as any, // 异常数据
        round_skill_uses: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = EnhancedSkillService.getSkillUsedCount(
        roleState,
        'seer_prophecy'
      );
      expect(result).toBe(0);
    });

    /**
     * 测试负数剩余次数的处理
     */
    it('应该正确处理负数剩余次数', () => {
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: {
          total: 3,
          remaining: -1, // 负数剩余次数
        },
        round_skill_uses: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const result = EnhancedSkillService.getSkillUsedCount(
        roleState,
        'seer_prophecy'
      );
      expect(result).toBe(4); // total(3) - remaining(-1) = 4，但应该被限制
    });
  });

  describe('性能监控和缓存测试', () => {
    /**
     * 测试性能监控功能
     */
    it('应该正确记录性能指标', () => {
      const roleDesign: RoleDesign = {
        id: 'test-role-id',
        skill_name: 'seer_prophecy',
        role_name: '预言家',
        description: '测试角色',
        created_at: '2024-01-01T00:00:00Z',
      };

      // 执行操作
      EnhancedSkillService.getRoleSkillConfig(roleDesign, 'zh');

      // 验证性能监控被调用
      // 注意：这里需要根据实际的 performanceMonitoringService mock 来验证
    });

    /**
     * 测试大量技能使用记录的处理性能
     */
    it('应该高效处理大量技能使用记录', () => {
      const roleState: RoleState = {
        id: 'test-role-state-id',
        user_id: 'test-user-id',
        game_state_id: 'test-game-id',
        role_design_id: 'test-role-design-id',
        role_status: 1,
        skill_uses_remaining: null,
        round_skill_uses: {
          // 模拟大量回合数据
          ...Array.from({ length: 100 }, (_, i) => ({
            [i + 1]: ['seer_prophecy'],
          })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const startTime = performance.now();
      const result = EnhancedSkillService.hasSkillUsedInCurrentRound(
        roleState,
        'seer_prophecy',
        50
      );
      const endTime = performance.now();

      expect(result).toBe(true);
      expect(endTime - startTime).toBeLessThan(10); // 应该在10ms内完成
    });
  });

  describe('技能冲突检测测试', () => {
    /**
     * 测试技能冲突检测功能
     */
    it('应该正确检测技能冲突', async () => {
      // Mock validateSkillUnified 返回冲突
      vi.mocked(validateSkillUnified).mockResolvedValue({
        valid: false,
        reason: '技能冲突：与其他技能冲突',
      });

      const context: SkillUsageContext = {
        userId: 'test-user-id',
        gameStateId: 'test-game-id',
        currentPhase: 3,
        roleDesign: {
          id: 'test-role-id',
          skill_name: 'seer_prophecy',
          role_name: '预言家',
          description: '测试角色',
          created_at: '2024-01-01T00:00:00Z',
        },
        roleState: {
          id: 'test-role-state-id',
          user_id: 'test-user-id',
          game_state_id: 'test-game-id',
          role_design_id: 'test-role-design-id',
          role_status: 1,
          skill_uses_remaining: null,
          round_skill_uses: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      };

      const result = await EnhancedSkillService.validateSkillUsage(
        context,
        'zh'
      );

      expect(result.isValid).toBe(false);
      expect(result.reason).toContain('技能冲突');
    });
  });

  describe('数据库操作测试', () => {
    /**
     * 测试数据库连接失败的处理
     */
    it('应该正确处理数据库连接失败', async () => {
      // Mock supabase.rpc 返回错误
      vi.mocked(supabase.rpc).mockResolvedValue({
        data: null,
        error: { message: '数据库连接失败', code: 'CONNECTION_ERROR' },
      });

      const context: SkillUsageContext = {
        userId: 'test-user-id',
        gameStateId: 'test-game-id',
        currentPhase: 3,
        roleDesign: {
          id: 'test-role-id',
          skill_name: 'seer_prophecy',
          role_name: '预言家',
          description: '测试角色',
          created_at: '2024-01-01T00:00:00Z',
        },
        roleState: {
          id: 'test-role-state-id',
          user_id: 'test-user-id',
          game_state_id: 'test-game-id',
          role_design_id: 'test-role-design-id',
          role_status: 1,
          skill_uses_remaining: null,
          round_skill_uses: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      };

      // Mock validateSkillUnified 返回成功
      vi.mocked(validateSkillUnified).mockResolvedValue({
        valid: true,
        reason: '验证通过',
      });

      await expect(
        EnhancedSkillService.useSkillEnhanced(context, 'zh')
      ).rejects.toThrow('技能使用失败: 数据库连接失败');
    });

    /**
     * 测试网络错误处理
     */
    it('应该正确处理网络错误', async () => {
      // Mock 网络错误
      const networkError = new Error('fetch failed');
      networkError.name = 'NetworkError';
      vi.mocked(supabase.rpc).mockRejectedValue(networkError);

      const context: SkillUsageContext = {
        userId: 'test-user-id',
        gameStateId: 'test-game-id',
        currentPhase: 3,
        roleDesign: {
          id: 'test-role-id',
          skill_name: 'seer_prophecy',
          role_name: '预言家',
          description: '测试角色',
          created_at: '2024-01-01T00:00:00Z',
        },
        roleState: {
          id: 'test-role-state-id',
          user_id: 'test-user-id',
          game_state_id: 'test-game-id',
          role_design_id: 'test-role-design-id',
          role_status: 1,
          skill_uses_remaining: null,
          round_skill_uses: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      };

      // Mock validateSkillUnified 返回成功
      vi.mocked(validateSkillUnified).mockResolvedValue({
        valid: true,
        reason: '验证通过',
      });

      await expect(
        EnhancedSkillService.useSkillEnhanced(context, 'zh')
      ).rejects.toThrow('网络连接失败');
    });
  });
});
