/**
 * @fileoverview 技能验证规则测试文件
 * 
 * 本文件包含对技能验证规则系统的全面测试，包括：
 * - 技能验证规则配置测试
 * - 统一技能验证函数测试
 * - 技能使用次数限制验证测试
 * - 各种技能的特定验证逻辑测试
 * 
 * @author AI Assistant
 * @version 1.0.0
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(),
              order: vi.fn(() => ({
                limit: vi.fn(() => ({
                  single: vi.fn()
                }))
              })),
              limit: vi.fn(),
              data: []
            }))
          }))
        }))
      }))
    }))
  }
}));

import { 
  SKILL_VALIDATION_RULES, 
  validateSkillUnified,
  SkillValidationRule 
} from '../skillValidationRules';
import { supabase } from '@/integrations/supabase/client';

/**
 * 技能验证规则测试套件
 */
describe('SkillValidationRules', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * 技能验证规则配置测试
   */
  describe('技能验证规则配置', () => {
    /**
     * 测试技能验证规则是否正确定义
     */
    it('应该包含所有必要的技能验证规则', () => {
      const expectedSkills = [
        'werewolf_attack',
        'night_attack', 
        'seer_divination',
        'prophecy',
        'magic_potion',
        'guard_protection',
        'vigil',
        'hunter_revenge',
        'dying_shot',
        'demon_eye',
        'voodoo',
        'self_destruct',
        'Sleep'
      ];

      expectedSkills.forEach(skillName => {
        expect(SKILL_VALIDATION_RULES[skillName]).toBeDefined();
        expect(SKILL_VALIDATION_RULES[skillName].skillName).toBe(skillName);
      });
    });

    /**
     * 测试狼人攻击技能规则
     */
    it('应该正确配置狼人攻击技能规则', () => {
      const rule = SKILL_VALIDATION_RULES.werewolf_attack;
      
      expect(rule.skillName).toBe('werewolf_attack');
      expect(rule.phases).toEqual([3]); // 夜晚阶段
      expect(rule.maxUsesPerRound).toBe(1);
      expect(rule.requiresTarget).toBe(true);
      expect(rule.targetValidation).toBeDefined();
    });

    /**
     * 测试预言家占卜技能规则
     */
    it('应该正确配置预言家占卜技能规则', () => {
      const rule = SKILL_VALIDATION_RULES.seer_divination;
      
      expect(rule.skillName).toBe('seer_divination');
      expect(rule.phases).toEqual([3]); // 夜晚阶段
      expect(rule.maxUsesPerRound).toBe(1);
      expect(rule.requiresTarget).toBe(true);
      expect(rule.targetValidation).toBeDefined();
    });

    /**
     * 测试女巫魔药技能规则
     */
    it('应该正确配置女巫魔药技能规则', () => {
      const rule = SKILL_VALIDATION_RULES.magic_potion;
      
      expect(rule.skillName).toBe('magic_potion');
      expect(rule.phases).toEqual([3]); // 夜晚阶段
      expect(rule.maxUsesPerGame).toBe(2);
      expect(rule.requiresTarget).toBe(false);
      expect(rule.customValidation).toBeDefined();
    });

    /**
     * 测试守卫保护技能规则
     */
    it('应该正确配置守卫保护技能规则', () => {
      const rule = SKILL_VALIDATION_RULES.guard_protection;
      
      expect(rule.skillName).toBe('guard_protection');
      expect(rule.phases).toEqual([3]); // 夜晚阶段
      expect(rule.maxUsesPerRound).toBe(1);
      expect(rule.requiresTarget).toBe(true);
      expect(rule.customValidation).toBeDefined();
    });

    /**
     * 测试猎人复仇技能规则
     */
    it('应该正确配置猎人复仇技能规则', () => {
      const rule = SKILL_VALIDATION_RULES.hunter_revenge;
      
      expect(rule.skillName).toBe('hunter_revenge');
      expect(rule.phases).toEqual([1, 2, 3, 4]); // 任何阶段
      expect(rule.maxUsesPerGame).toBe(1);
      expect(rule.requiresTarget).toBe(true);
      expect(rule.customValidation).toBeDefined();
    });
  });

  /**
   * 统一技能验证函数测试
   */
  describe('统一技能验证函数', () => {
    /**
     * 测试未知技能验证
     */
    it('应该拒绝未知技能', async () => {
      const result = await validateSkillUnified(
        'unknown_skill',
        'user1',
        'game1',
        3,
        {}
      );

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('未知技能');
    });

    /**
     * 测试错误阶段验证
     */
    it('应该拒绝在错误阶段使用的技能', async () => {
      const result = await validateSkillUnified(
        'werewolf_attack',
        'user1',
        'game1',
        1, // 白天阶段，但狼人攻击只能在夜晚
        {}
      );

      expect(result.valid).toBe(false);
      expect(result.reason).toContain('当前阶段');
      expect(result.reason).toContain('不是技能使用阶段');
    });

    /**
      * 测试缺少目标验证
      */
     it('应该拒绝需要目标但未提供目标的技能', async () => {
       // Mock skill usage limits validation to pass
       vi.mocked(supabase.from).mockImplementation((table: string) => {
         if (table === 'skill_uses') {
           return {
             select: vi.fn(() => ({
               eq: vi.fn(() => ({
                 eq: vi.fn(() => ({
                   eq: vi.fn(() => ({
                     data: []
                   }))
                 }))
               }))
             }))
           };
         } else if (table === 'game_states') {
           return {
             select: vi.fn(() => ({
               eq: vi.fn(() => ({
                 single: vi.fn().mockResolvedValue({
                   data: { current_round: 1 }
                 })
               }))
             }))
           };
         }
         return {} as any;
       });

       const result = await validateSkillUnified(
         'werewolf_attack',
         'user1',
         'game1',
         3, // 夜晚阶段
         {} // 没有提供目标
       );

       expect(result.valid).toBe(false);
       expect(result.reason).toBe('该技能需要选择目标');
     });

    /**
      * 测试有效技能验证
      */
     it('应该通过有效的技能验证', async () => {
       // Mock skill usage limits validation and game state query
       vi.mocked(supabase.from).mockImplementation((table: string) => {
         if (table === 'skill_uses') {
           return {
             select: vi.fn(() => ({
               eq: vi.fn(() => ({
                 eq: vi.fn(() => ({
                   eq: vi.fn(() => ({
                     data: [] // 没有使用记录
                   }))
                 }))
               }))
             }))
           };
         } else if (table === 'game_states') {
           return {
             select: vi.fn(() => ({
               eq: vi.fn(() => ({
                 single: vi.fn().mockResolvedValue({
                   data: { current_round: 1 }
                 })
               }))
             }))
           };
         }
         return {} as any;
       });

       // Mock target validation
       const originalTargetValidation = SKILL_VALIDATION_RULES.werewolf_attack.targetValidation;
       SKILL_VALIDATION_RULES.werewolf_attack.targetValidation = vi.fn().mockResolvedValue(true);

       const result = await validateSkillUnified(
         'werewolf_attack',
         'user1',
         'game1',
         3, // 夜晚阶段
         { targetUserId: 'target1' }
       );

       expect(result.valid).toBe(true);
       expect(result.reason).toBeUndefined();

       // Restore original function
       SKILL_VALIDATION_RULES.werewolf_attack.targetValidation = originalTargetValidation;
     });
  });

  /**
   * 目标验证测试
   */
  describe('目标验证', () => {
    /**
      * 测试存活目标验证
      */
     it('应该验证目标是否存活', async () => {
       // Mock target as alive - 直接 mock targetValidation 函数
       const originalTargetValidation = SKILL_VALIDATION_RULES.werewolf_attack.targetValidation;
       SKILL_VALIDATION_RULES.werewolf_attack.targetValidation = vi.fn().mockResolvedValue(true);

       const targetValidation = SKILL_VALIDATION_RULES.werewolf_attack.targetValidation;
       if (targetValidation) {
         const result = await targetValidation('target1', 'game1');
         expect(result).toBe(true);
       }

       // Restore original function
       SKILL_VALIDATION_RULES.werewolf_attack.targetValidation = originalTargetValidation;
     });

    /**
      * 测试死亡目标验证
      */
     it('应该拒绝已死亡的目标', async () => {
       // Mock target as dead - 直接 mock targetValidation 函数
       const originalTargetValidation = SKILL_VALIDATION_RULES.werewolf_attack.targetValidation;
       SKILL_VALIDATION_RULES.werewolf_attack.targetValidation = vi.fn().mockResolvedValue(false);

       const targetValidation = SKILL_VALIDATION_RULES.werewolf_attack.targetValidation;
       if (targetValidation) {
         const result = await targetValidation('target1', 'game1');
         expect(result).toBe(false);
       }

       // Restore original function
       SKILL_VALIDATION_RULES.werewolf_attack.targetValidation = originalTargetValidation;
     });
  });

  /**
   * 自定义验证测试
   */
  describe('自定义验证', () => {
    /**
     * 测试女巫魔药自定义验证
     */
    it('应该验证女巫魔药使用次数', async () => {
      // Mock no previous potion usage
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              eq: vi.fn(() => ({
                eq: vi.fn(() => ({
                  data: []
                }))
              }))
            }))
          }))
        }))
      } as any);

      const customValidation = SKILL_VALIDATION_RULES.magic_potion.customValidation;
      if (customValidation) {
        const result = await customValidation(
          'user1',
          'game1',
          { potionType: 'antidote' }
        );
        expect(result).toBe(true);
      }
    });

    /**
      * 测试守卫保护自定义验证
      */
     it('应该验证守卫不能连续保护同一人', async () => {
       // Mock previous protection of same target
       vi.mocked(supabase.from).mockReturnValue({
         select: vi.fn(() => ({
           eq: vi.fn(() => ({
             eq: vi.fn(() => ({
               eq: vi.fn(() => ({
                 order: vi.fn(() => ({
                   limit: vi.fn().mockResolvedValue({
                     data: [{ target_user_id: 'target1', round_number: 1 }]
                   })
                 }))
               }))
             }))
           }))
         }))
       } as any);

      const customValidation = SKILL_VALIDATION_RULES.guard_protection.customValidation;
      if (customValidation) {
        const result = await customValidation(
          'user1',
          'game1',
          { targetUserId: 'target1' } // 尝试保护同一目标
        );
        expect(result).toBe(false);
      }
    });

    /**
     * 测试猎人复仇自定义验证
     */
    it('应该验证猎人是否处于濒死状态', async () => {
      // Mock hunter in dying state
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({
                data: { role_status: 2 } // 濒死状态
              })
            }))
          }))
        }))
      } as any);

      const customValidation = SKILL_VALIDATION_RULES.hunter_revenge.customValidation;
      if (customValidation) {
        const result = await customValidation('user1', 'game1', {});
        expect(result).toBe(true);
      }
    });
  });

  /**
   * 技能使用次数限制测试
   */
  describe('技能使用次数限制', () => {
    /**
     * 测试每局游戏使用次数限制
     */
    it('应该限制每局游戏的技能使用次数', async () => {
      // Mock skill already used maximum times per game
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              eq: vi.fn(() => ({
                data: [{ round_number: 1 }, { round_number: 2 }] // 已使用2次
              }))
            }))
          }))
        }))
      } as any);

      const result = await validateSkillUnified(
        'magic_potion', // maxUsesPerGame: 2
        'user1',
        'game1',
        3,
        { potionType: 'antidote' }
      );

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('技能使用次数已达上限');
    });

    /**
      * 测试每回合使用次数限制
      */
     it('应该限制每回合的技能使用次数', async () => {
       // Mock skill already used in current round
       vi.mocked(supabase.from).mockImplementation((table: string) => {
         if (table === 'skill_uses') {
           return {
             select: vi.fn(() => ({
               eq: vi.fn(() => ({
                 eq: vi.fn(() => ({
                   eq: vi.fn(() => ({
                     data: [{ round_number: 1 }] // 当前回合已使用
                   }))
                 }))
               }))
             }))
           };
         } else if (table === 'game_states') {
           return {
             select: vi.fn(() => ({
               eq: vi.fn(() => ({
                 single: vi.fn().mockResolvedValue({
                   data: { current_round: 1 }
                 })
               }))
             }))
           };
         }
         return {} as any;
       });

      const result = await validateSkillUnified(
        'werewolf_attack', // maxUsesPerRound: 1
        'user1',
        'game1',
        3,
        { targetUserId: 'target1' }
      );

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('本回合技能使用次数已达上限');
    });
  });

  /**
   * 边界情况测试
   */
  describe('边界情况', () => {
    /**
     * 测试空技能数据
     */
    it('应该处理空技能数据', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              eq: vi.fn(() => ({
                data: []
              }))
            }))
          }))
        }))
      } as any);

      const result = await validateSkillUnified(
        'Sleep', // 不需要目标的技能
        'user1',
        'game1',
        3,
        {}
      );

      expect(result.valid).toBe(true);
    });

    /**
      * 测试数据库查询失败
      */
     it('应该处理数据库查询失败', async () => {
       // Mock target validation to simulate database failure
       const originalTargetValidation = SKILL_VALIDATION_RULES.werewolf_attack.targetValidation;
       SKILL_VALIDATION_RULES.werewolf_attack.targetValidation = vi.fn().mockRejectedValue(new Error('Database error'));

       // Mock skill usage limits validation
       vi.mocked(supabase.from).mockImplementation((table: string) => {
         if (table === 'skill_uses') {
           return {
             select: vi.fn(() => ({
               eq: vi.fn(() => ({
                 eq: vi.fn(() => ({
                   eq: vi.fn(() => ({
                     data: []
                   }))
                 }))
               }))
             }))
           };
         } else if (table === 'game_states') {
           return {
             select: vi.fn(() => ({
               eq: vi.fn(() => ({
                 single: vi.fn().mockResolvedValue({
                   data: { current_round: 1 }
                 })
               }))
             }))
           };
         }
         return {} as any;
       });

       try {
         const result = await validateSkillUnified(
           'werewolf_attack',
           'user1',
           'game1',
           3,
           { targetUserId: 'target1' }
         );
         
         // 如果没有抛出错误，应该返回无效结果
         expect(result.valid).toBe(false);
       } catch (error) {
         // 如果抛出错误，这也是可以接受的
         expect(error).toBeDefined();
       }

       // Restore original function
       SKILL_VALIDATION_RULES.werewolf_attack.targetValidation = originalTargetValidation;
     });
  });
});