import { describe, it, expect } from 'vitest';
import { 
  validateSkillUsage,
  checkNightSkillRestriction,
  checkSkillSpecificRestrictions,
  getSkillUsageHint,
  type UsageRestriction,
  type SkillUseRecord
} from '../skillUsageRestrictions';

describe('skillUsageRestrictions', () => {
  const mockSkillHistory: SkillUseRecord[] = [
    {
      id: 'skill-1',
      user_id: 'user-1',
      skill_name: 'test_skill',
      round_number: 1,
      phase: 'night',
      created_at: new Date().toISOString()
    }
  ];

  describe('validateSkillUsage', () => {
    it('should allow skill usage when no restrictions apply', () => {
      const result = validateSkillUsage(
        'villager',
        'test_skill',
        1, // day phase
        1,
        []
      );

      expect(result.canUse).toBe(true);
    });

    it('should restrict non-witch night skill usage after first use', () => {
      const result = validateSkillUsage(
        'werewolf',
        'test_skill',
        3, // night phase
        1,
        mockSkillHistory
      );

      expect(result.canUse).toBe(false);
      expect(result.reason).toContain('当前夜晚已经使用过技能');
    });

    it('should allow witch to use skills multiple times at night', () => {
      const result = validateSkillUsage(
        'witch',
        'magic_potion',
        3, // night phase
        1,
        mockSkillHistory
      );

      expect(result.canUse).toBe(true);
    });
  });

  describe('checkNightSkillRestriction', () => {
    it('should allow skills during day phase', () => {
      const result = checkNightSkillRestriction(
        'werewolf',
        1, // day phase
        1,
        mockSkillHistory
      );

      expect(result.canUse).toBe(true);
    });

    it('should restrict night skills after first use for non-witch', () => {
      const result = checkNightSkillRestriction(
        'werewolf',
        3, // night phase
        1,
        mockSkillHistory
      );

      expect(result.canUse).toBe(false);
      expect(result.reason).toContain('当前夜晚已经使用过技能');
    });

    it('should allow witch multiple night skill uses', () => {
      const result = checkNightSkillRestriction(
        'witch',
        3, // night phase
        1,
        mockSkillHistory
      );

      expect(result.canUse).toBe(true);
      expect(result.reason).toContain('女巫角色在夜晚可多次使用技能');
    });
  });

  describe('checkSkillSpecificRestrictions', () => {
    it('should allow first-time skill usage', () => {
      const result = checkSkillSpecificRestrictions(
        'dying_shot',
        'hunter',
        [],
        { currentRound: 1, currentPhase: 3 }
      );

      expect(result.canUse).toBe(true);
      expect(result.remainingUses).toBe(1);
    });

    it('should restrict hunter dying shot after first use', () => {
      const hunterHistory: SkillUseRecord[] = [
        {
          id: 'shot-1',
          user_id: 'user-1',
          skill_name: 'dying_shot',
          round_number: 1,
          phase: 'day',
          created_at: new Date().toISOString()
        }
      ];

      const result = checkSkillSpecificRestrictions(
        'dying_shot',
        'hunter',
        hunterHistory,
        { currentRound: 2, currentPhase: 3 }
      );

      expect(result.canUse).toBe(false);
      expect(result.reason).toBe('濒死射击只能使用一次');
    });

    it('should restrict witch potion after first use', () => {
      const witchHistory: SkillUseRecord[] = [
        {
          id: 'potion-1',
          user_id: 'user-1', 
          skill_name: 'magic_potion',
          round_number: 1,
          phase: 'night',
          created_at: new Date().toISOString()
        } as SkillUseRecord & { potionType: string }
      ];
      (witchHistory[0] as any).potionType = 'protection';

      const result = checkSkillSpecificRestrictions(
        'magic_potion',
        'witch',
        witchHistory,
        { 
          currentRound: 2, 
          currentPhase: 3,
          potionType: 'protection' 
        }
      );

      expect(result.canUse).toBe(false);
      expect(result.reason).toBe('保护魔药已经使用过了');
    });
  });

  describe('getSkillUsageHint', () => {
    it('should provide witch-specific night hint', () => {
      const hint = getSkillUsageHint('witch', 'magic_potion', 3);
      expect(hint).toContain('女巫可在夜晚多次使用技能');
    });

    it('should provide general night hint for non-witch', () => {
      const hint = getSkillUsageHint('werewolf', 'attack', 3);
      expect(hint).toContain('除女巫外，每个角色在夜晚只能使用一次技能');
    });

    it('should provide skill-specific hints', () => {
      expect(getSkillUsageHint('hunter', 'dying_shot', 1)).toContain('猎人技能只能在濒死状态时使用');
      expect(getSkillUsageHint('witch', 'magic_potion', 1)).toContain('女巫的解药和毒药各只能使用一次');
      expect(getSkillUsageHint('warlock', 'voodoo', 1)).toContain('暗夜术士的巫毒术只能使用一次');
      expect(getSkillUsageHint('white', 'self_destruct', 1)).toContain('白狼王的自爆技能只能使用一次');
    });
  });
});