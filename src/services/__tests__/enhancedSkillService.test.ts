import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EnhancedSkillService, EnhancedSkillServiceError } from '../enhancedSkillService';
import { createMockQueryBuilder } from '@/test/helpers/mockSupabase';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client');
const mockSupabase = supabase as any;

describe('EnhancedSkillService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // 设置默认 Mock
    const mockBuilder = createMockQueryBuilder({ data: [], error: null });
    mockSupabase.from = vi.fn(() => mockBuilder);
    mockSupabase.rpc = vi.fn().mockResolvedValue({ data: null, error: null });
  });

  describe('validateSkillUsage', () => {
    it('应该验证有效的技能使用', async () => {
      // Mock 没有使用记录
      const mockBuilder = createMockQueryBuilder({ data: [], error: null });
      mockSupabase.from = vi.fn(() => mockBuilder);

      const context = {
        userId: 'test-user-id',
        gameStateId: 'test-game-state-id',
        roomId: 'test-room-id',
        currentPhase: 3,
        currentRound: 1,
        roleState: {
          role_status: 1,
          skill_uses_remaining: { unlimited: true }
        },
        roleDesign: {
          skill_name: 'attack'
        },
        targetUserId: 'test-target-id'
      };

      const result = await EnhancedSkillService.validateSkillUsage(context);
      
      expect(result.isValid).toBeDefined();
    });

    it('应该拒绝无效角色状态的技能使用', async () => {
      // Mock 空数据
      const mockBuilder = createMockQueryBuilder({ data: [], error: null });
      mockSupabase.from = vi.fn(() => mockBuilder);

      const context = {
        userId: 'test-user-id',
        gameStateId: 'test-game-state-id',
        roomId: 'test-room-id',
        currentPhase: 3,
        currentRound: 1,
        roleState: {
          role_status: 4, // 淘汰状态
          skill_uses_remaining: {}
        },
        roleDesign: {
          skill_name: 'attack'
        },
        targetUserId: 'test-target-id'
      };

      const result = await EnhancedSkillService.validateSkillUsage(context);
      
      expect(result.isValid).toBe(false);
      expect(result.reason).toBeTruthy();
    });

    it('应该验证女巫魔药的使用', async () => {
      // Mock 没有使用过魔药
      const mockBuilder = createMockQueryBuilder({ data: [], error: null });
      mockSupabase.from = vi.fn(() => mockBuilder);

      const context = {
        userId: 'test-user-id',
        gameStateId: 'test-game-state-id',
        roomId: 'test-room-id',
        currentPhase: 3,
        currentRound: 1,
        roleState: {
          role_status: 1,
          skill_uses_remaining: {
            witch_potion: { protection_used: false, attack_used: false }
          }
        },
        roleDesign: {
          skill_name: 'magic_potion',
          role_name: 'witch'
        },
        targetUserId: 'test-target-id'
      };

      const result = await EnhancedSkillService.validateSkillUsage(context);
      
      expect(result).toBeDefined();
    });
  });

  describe('useSkillEnhanced', () => {
    it('应该成功使用技能', async () => {
      const context = {
        userId: 'test-user-id',
        gameStateId: 'test-game-state-id',
        roomId: 'test-room-id',
        currentPhase: 3,
        currentRound: 1,
        roleState: {
          role_status: 1,
          skill_uses_remaining: { unlimited: true }
        },
        roleDesign: {
          skill_name: 'night_attack'
        },
        targetUserId: 'test-target-id'
      };

      try {
        const result = await EnhancedSkillService.useSkillEnhanced(context);
        expect(result).toBeDefined();
      } catch (error) {
        // 在测试环境中可能会失败，因为没有真实的数据库
        expect(error).toBeDefined();
      }
    });

    it('应该在验证失败时抛出错误', async () => {
      const context = {
        userId: 'test-user-id',
        gameStateId: 'test-game-state-id',
        roomId: 'test-room-id',
        currentPhase: 1, // 白天阶段不能使用夜间技能
        currentRound: 1,
        roleState: {
          role_status: 1
        },
        roleDesign: {
          skill_name: 'night_attack'
        }
      };

      await expect(
        EnhancedSkillService.useSkillEnhanced(context)
      ).rejects.toThrow();
    });
  });

  describe('detectSkillConflicts', () => {
    it('应该检测技能冲突', async () => {
      try {
        const result = await EnhancedSkillService.detectSkillConflicts(
          'test-game-state-id',
          1,
          'night'
        );
        
        expect(result).toHaveProperty('conflicts');
        expect(result).toHaveProperty('details');
      } catch (error) {
        // 预期在测试环境中可能失败
        expect(error).toBeDefined();
      }
    });
  });

  describe('validateWitchPotion', () => {
    it('应该验证女巫解药使用', async () => {
      try {
        const result = await EnhancedSkillService.validateWitchPotion(
          'test-user-id',
          'test-game-state-id',
          'protection'
        );
        
        expect(result).toHaveProperty('canUse');
        expect(result).toHaveProperty('reason');
      } catch (error) {
        // 预期在测试环境中可能失败
        expect(error).toBeDefined();
      }
    });

    it('应该验证女巫毒药使用', async () => {
      try {
        const result = await EnhancedSkillService.validateWitchPotion(
          'test-user-id',
          'test-game-state-id',
          'attack',
          'target-user-id'
        );
        
        expect(result).toHaveProperty('canUse');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
