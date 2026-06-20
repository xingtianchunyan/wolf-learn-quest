import { describe, it, expect } from 'vitest';
import {
  checkNightSkillRestriction,
  checkSkillSpecificRestrictions,
  validateSkillUsage,
  getSkillUsageHint,
  type SkillUseRecord,
} from '../skillUsageRestrictions';

describe('skillUsageRestrictions', () => {
  describe('checkNightSkillRestriction', () => {
    it('应该允许女巫在夜晚多次使用技能', () => {
      const userSkillUses: SkillUseRecord[] = [
        {
          id: '1',
          user_id: 'user-1',
          skill_name: 'magic_potion',
          round_number: 1,
          phase: 'night',
          created_at: new Date().toISOString(),
        },
      ];

      const result = checkNightSkillRestriction('witch', 3, 1, userSkillUses);

      expect(result.canUse).toBe(true);
      expect(result.reason).toContain('女巫');
    });

    it('应该限制非女巫角色在夜晚重复使用技能', () => {
      const userSkillUses: SkillUseRecord[] = [
        {
          id: '1',
          user_id: 'user-1',
          skill_name: 'night_attack',
          round_number: 1,
          phase: 'night',
          created_at: new Date().toISOString(),
        },
      ];

      const result = checkNightSkillRestriction(
        'werewolf',
        3,
        1,
        userSkillUses
      );

      expect(result.canUse).toBe(false);
      expect(result.reason).toContain('夜晚');
    });

    it('应该允许非夜晚阶段使用技能', () => {
      const result = checkNightSkillRestriction(
        'werewolf',
        1, // 白天阶段
        1,
        []
      );

      expect(result.canUse).toBe(true);
    });
  });

  describe('checkSkillSpecificRestrictions', () => {
    it('应该限制女巫保护魔药只能使用一次', () => {
      const userSkillUses: SkillUseRecord[] = [
        {
          id: '1',
          user_id: 'user-1',
          skill_name: 'magic_potion',
          round_number: 1,
          phase: 'night',
          created_at: new Date().toISOString(),
        } as SkillUseRecord & { potionType: string },
      ];

      // 设置第一次使用为保护类型
      (userSkillUses[0] as any).potionType = 'protection';

      const result = checkSkillSpecificRestrictions(
        'magic_potion',
        'witch',
        userSkillUses,
        { currentRound: 2, currentPhase: 3, potionType: 'protection' }
      );

      expect(result.canUse).toBe(false);
      expect(result.reason).toContain('保护魔药');
    });

    it('应该限制猎人濒死射击只能使用一次', () => {
      const userSkillUses: SkillUseRecord[] = [
        {
          id: '1',
          user_id: 'user-1',
          skill_name: 'dying_shot',
          round_number: 1,
          phase: 'day',
          created_at: new Date().toISOString(),
        },
      ];

      const result = checkSkillSpecificRestrictions(
        'dying_shot',
        'hunter',
        userSkillUses
      );

      expect(result.canUse).toBe(false);
      expect(result.reason).toContain('濒死射击');
    });

    it('应该限制白狼王自爆只能使用一次', () => {
      const userSkillUses: SkillUseRecord[] = [
        {
          id: '1',
          user_id: 'user-1',
          skill_name: 'self_destruct',
          round_number: 1,
          phase: 'day',
          created_at: new Date().toISOString(),
        },
      ];

      const result = checkSkillSpecificRestrictions(
        'self_destruct',
        'whitewolf',
        userSkillUses
      );

      expect(result.canUse).toBe(false);
      expect(result.reason).toContain('自爆');
    });
  });

  describe('validateSkillUsage', () => {
    it('应该综合验证技能使用限制', () => {
      const result = validateSkillUsage('werewolf', 'night_attack', 3, 1, []);

      expect(result.canUse).toBe(true);
    });

    it('应该检测夜晚重复使用限制', () => {
      const userSkillUses: SkillUseRecord[] = [
        {
          id: '1',
          user_id: 'user-1',
          skill_name: 'night_attack',
          round_number: 1,
          phase: 'night',
          created_at: new Date().toISOString(),
        },
      ];

      const result = validateSkillUsage(
        'werewolf',
        'night_attack',
        3,
        1,
        userSkillUses
      );

      expect(result.canUse).toBe(false);
    });
  });

  describe('getSkillUsageHint', () => {
    it('应该为女巫提供特殊提示', () => {
      const hint = getSkillUsageHint('witch', 'magic_potion', 3);

      expect(hint).toContain('女巫');
      expect(hint).toContain('多次');
    });

    it('应该为非女巫角色提供夜晚限制提示', () => {
      const hint = getSkillUsageHint('werewolf', 'night_attack', 3);

      expect(hint).toContain('夜晚');
      expect(hint).toContain('一次');
    });

    it('应该为特殊技能提供专属提示', () => {
      const hints = {
        dying_shot: getSkillUsageHint('hunter', 'dying_shot', 1),
        magic_potion: getSkillUsageHint('witch', 'magic_potion', 1),
        self_destruct: getSkillUsageHint('whitewolf', 'self_destruct', 1),
      };

      expect(hints.dying_shot).toContain('濒死');
      expect(hints.magic_potion).toContain('药');
      expect(hints.self_destruct).toContain('自爆');
    });
  });
});
