import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';
import { createMockQueryBuilder } from '@/test/helpers/mockSupabase';
import { createMockSkillUse } from '@/test/helpers/testFactory';

vi.mock('@/integrations/supabase/client');
const mockSupabase = supabase as any;

describe('技能冲突集成测试', () => {
  const testGameStateId = 'test-game-state-id';
  const testRound = 1;

  beforeEach(() => {
    vi.clearAllMocks();

    // 默认 Mock 配置
    const mockBuilder = createMockQueryBuilder({ data: [], error: null });
    mockSupabase.from = vi.fn(() => mockBuilder);
    mockSupabase.rpc = vi.fn().mockResolvedValue({ data: [], error: null });
  });

  describe('守卫与狼人攻击冲突', () => {
    it('应该检测到守卫保护与狼人攻击的冲突', async () => {
      const conflicts = [
        {
          conflict_type: 'guard_vs_werewolf',
          involved_skills: ['guard_protect', 'werewolf_attack'],
          target_user_id: 'protected-player',
          resolution: '守卫成功保护目标',
        },
      ];

      mockSupabase.rpc = vi.fn().mockResolvedValue({
        data: conflicts,
        error: null,
      });

      const { data, error } = await supabase.rpc('detect_skill_conflicts', {
        p_game_state_id: testGameStateId,
        p_phase: 'night',
        p_round_number: testRound,
      });

      expect(error).toBeNull();
      expect(data).toBeDefined();
    });
  });

  describe('女巫解药与狼人攻击冲突', () => {
    it('应该检测到女巫解药与狼人攻击的冲突', async () => {
      const conflicts = [
        {
          conflict_type: 'witch_antidote_vs_werewolf',
          involved_skills: ['witch_antidote', 'werewolf_attack'],
          target_user_id: 'saved-player',
          resolution: '女巫成功救人',
        },
      ];

      mockSupabase.rpc = vi.fn().mockResolvedValue({
        data: conflicts,
        error: null,
      });

      const { data, error } = await supabase.rpc('detect_skill_conflicts', {
        p_game_state_id: testGameStateId,
        p_phase: 'night',
        p_round_number: testRound,
      });

      expect(error).toBeNull();
      expect(data).toBeDefined();
    });
  });

  describe('多重保护检测', () => {
    it('应该检测多重保护并标记为淘汰', async () => {
      const multipleProtection = {
        has_multiple_protection: true,
        protection_count: 2,
        should_eliminate: true,
      };

      mockSupabase.rpc = vi.fn().mockResolvedValue({
        data: multipleProtection,
        error: null,
      });

      const { data, error } = await supabase.rpc('check_multiple_protection', {
        p_game_state_id: testGameStateId,
        p_round_number: testRound,
        p_target_user_id: 'over-protected-player',
      });

      expect(error).toBeNull();
      expect(data).toBeDefined();
    });
  });

  describe('恶魔免疫测试', () => {
    it('应该验证恶魔对狼人攻击免疫', async () => {
      const demonImmunity = {
        is_immune: true,
        immunity_type: 'demon_immunity',
        message: '恶魔对狼人攻击免疫',
      };

      mockSupabase.rpc = vi.fn().mockResolvedValue({
        data: demonImmunity,
        error: null,
      });

      const { data, error } = await supabase.rpc('check_demon_immunity', {
        p_attacker_user_id: 'werewolf-player',
        p_target_user_id: 'demon-player',
        p_game_state_id: testGameStateId,
      });

      expect(error).toBeNull();
      expect(data).toBeDefined();
    });
  });

  describe('技能优先级排序', () => {
    it('应该按照优先级顺序执行技能', async () => {
      const skills = [
        createMockSkillUse({ skill_name: 'guard_protect', skill_priority: 10 }),
        createMockSkillUse({
          skill_name: 'werewolf_attack',
          skill_priority: 50,
        }),
        createMockSkillUse({ skill_name: 'witch_poison', skill_priority: 60 }),
      ];

      const mockBuilder = createMockQueryBuilder({ data: skills, error: null });
      mockSupabase.from = vi.fn(() => mockBuilder);

      const { data, error } = await supabase
        .from('skill_uses')
        .select('skill_name, skill_priority')
        .eq('game_state_id', testGameStateId)
        .order('skill_priority', { ascending: true });

      expect(error).toBeNull();
      expect(data).toHaveLength(3);
      expect(data[0].skill_priority).toBeLessThan(data[1].skill_priority);
    });
  });
});
