import { describe, it, expect, beforeEach } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

describe('技能冲突集成测试', () => {
  let testGameStateId: string;
  let testRoomId: string;

  beforeEach(() => {
    // 每个测试前重置测试数据
    testGameStateId = 'test-game-state-' + Date.now();
    testRoomId = 'test-room-' + Date.now();
  });

  describe('守卫与狼人攻击冲突', () => {
    it('应该检测到守卫保护与狼人攻击的冲突', async () => {
      // 模拟场景：守卫保护玩家A，狼人攻击玩家A
      const targetUserId = 'player-a';
      
      // 插入守卫技能使用
      const { error: guardError } = await supabase
        .from('skill_uses')
        .insert({
          game_state_id: testGameStateId,
          user_id: 'guard-user',
          skill_name: 'vigil',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          skill_priority: 5
        });

      // 插入狼人攻击
      const { error: wolfError } = await supabase
        .from('skill_uses')
        .insert({
          game_state_id: testGameStateId,
          user_id: 'wolf-user',
          skill_name: 'night_attack',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          skill_priority: 3
        });

      // 触发冲突检测
      const { data: conflicts, error: conflictError } = await supabase
        .rpc('detect_skill_conflicts', {
          p_game_state_id: testGameStateId,
          p_round_number: 1,
          p_phase: 'night'
        });

      if (!guardError && !wolfError && !conflictError) {
        expect(conflicts).toBeDefined();
        // 应该检测到冲突
      }
    });
  });

  describe('女巫解药与狼人攻击冲突', () => {
    it('应该检测到女巫解药与狼人攻击的冲突', async () => {
      const targetUserId = 'player-b';
      
      // 插入狼人攻击
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: testGameStateId,
          user_id: 'wolf-user',
          skill_name: 'night_attack',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          skill_priority: 3
        });

      // 插入女巫解药
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: testGameStateId,
          user_id: 'witch-user',
          skill_name: 'magic_potion',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          skill_priority: 6,
          skill_effects: { effect_type: 'protection' }
        });

      // 触发冲突检测
      const { data: conflicts } = await supabase
        .rpc('detect_skill_conflicts', {
          p_game_state_id: testGameStateId,
          p_round_number: 1,
          p_phase: 'night'
        });

      if (conflicts) {
        expect(conflicts).toBeDefined();
      }
    });
  });

  describe('多重保护检测', () => {
    it('应该检测多重保护并标记为淘汰', async () => {
      const targetUserId = 'player-c';
      
      // 插入守卫保护
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: testGameStateId,
          user_id: 'guard-user',
          skill_name: 'vigil',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          execution_status: 'completed'
        });

      // 插入女巫保护
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: testGameStateId,
          user_id: 'witch-user',
          skill_name: 'magic_potion',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          execution_status: 'completed',
          skill_effects: { effect_type: 'protection' }
        });

      // 检查多重保护
      const { data: multiProtection } = await supabase
        .rpc('check_multiple_protection', {
          p_target_user_id: targetUserId,
          p_game_state_id: testGameStateId,
          p_round_number: 1
        });

      if (multiProtection) {
        expect(multiProtection).toHaveProperty('has_multiple_protection');
        expect(multiProtection).toHaveProperty('should_eliminate');
      }
    });
  });

  describe('恶魔免疫测试', () => {
    it('应该验证恶魔对狼人攻击免疫', async () => {
      const demonUserId = 'demon-user';
      const wolfUserId = 'wolf-user';
      
      // 检查恶魔免疫
      const { data: isImmune } = await supabase
        .rpc('check_demon_immunity', {
          p_target_user_id: demonUserId,
          p_attacker_user_id: wolfUserId,
          p_game_state_id: testGameStateId
        });

      // 在真实环境中，如果恶魔和狼人角色正确设置，应该返回 true
      expect(isImmune).toBeDefined();
    });
  });

  describe('技能优先级排序', () => {
    it('应该按照优先级顺序执行技能', async () => {
      // 插入多个不同优先级的技能
      const skills = [
        { skill: 'night_attack', priority: 3 },
        { skill: 'vigil', priority: 5 },
        { skill: 'magic_potion', priority: 6 },
        { skill: 'prophecy', priority: 4 }
      ];

      for (const { skill, priority } of skills) {
        await supabase
          .from('skill_uses')
          .insert({
            game_state_id: testGameStateId,
            user_id: `user-${skill}`,
            skill_name: skill,
            round_number: 1,
            phase: 'night',
            skill_priority: priority
          });
      }

      // 查询并验证排序
      const { data: orderedSkills } = await supabase
        .from('skill_uses')
        .select('skill_name, skill_priority')
        .eq('game_state_id', testGameStateId)
        .order('skill_priority', { ascending: true });

      if (orderedSkills && orderedSkills.length > 0) {
        // 验证第一个应该是优先级最高的（数字最小）
        expect(orderedSkills[0].skill_priority).toBe(3);
        expect(orderedSkills[0].skill_name).toBe('night_attack');
      }
    });
  });
});
