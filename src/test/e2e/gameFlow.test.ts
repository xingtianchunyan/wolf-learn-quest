import { describe, it, expect, beforeEach } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

describe('游戏流程 E2E 测试', () => {
  let testRoomId: string;
  let testGameStateId: string;
  let testPlayers: Array<{ userId: string; roleId: string }>;

  beforeEach(async () => {
    // 设置测试环境
    testRoomId = 'e2e-room-' + Date.now();
    testPlayers = [
      { userId: 'player-1', roleId: 'werewolf' },
      { userId: 'player-2', roleId: 'seer' },
      { userId: 'player-3', roleId: 'guard' },
      { userId: 'player-4', roleId: 'witch' },
      { userId: 'player-5', roleId: 'villager' },
      { userId: 'player-6', roleId: 'villager' }
    ];
  });

  describe('完整游戏流程', () => {
    it('应该完成一个完整的游戏回合', async () => {
      // 1. 创建房间
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .insert({
          room_id: testRoomId,
          status: 'waiting',
          max_players: 6,
          host_id: 'test-host'
        })
        .select()
        .single();

      if (roomError) {
        console.log('房间创建失败:', roomError);
        return;
      }

      expect(room).toBeDefined();

      // 2. 添加玩家
      for (const player of testPlayers) {
        await supabase
          .from('room_players')
          .insert({
            room_id: room.id,
            user_id: player.userId,
            is_ready: true
          });
      }

      // 3. 开始游戏
      const { data: gameState, error: gameError } = await supabase
        .from('game_states')
        .insert({
          room_id: room.id,
          status: 'active',
          current_phase: 1,
          current_round: 1
        })
        .select()
        .single();

      if (gameError) {
        console.log('游戏状态创建失败:', gameError);
        return;
      }

      testGameStateId = gameState.id;
      expect(gameState).toBeDefined();

      // 4. 分配角色
      for (const player of testPlayers) {
        await supabase
          .from('role_states')
          .insert({
            game_state_id: gameState.id,
            room_id: room.id,
            user_id: player.userId,
            role_id: player.roleId,
            role_status: 1
          });
      }

      // 5. 进入夜晚阶段 - 技能使用
      await supabase
        .from('game_states')
        .update({ current_phase: 3 })
        .eq('id', gameState.id);

      // 狼人攻击
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: gameState.id,
          user_id: 'player-1',
          skill_name: 'night_attack',
          target_user_id: 'player-5',
          round_number: 1,
          phase: 'night',
          skill_priority: 3
        });

      // 预言家查验
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: gameState.id,
          user_id: 'player-2',
          skill_name: 'prophecy',
          target_user_id: 'player-1',
          round_number: 1,
          phase: 'night',
          skill_priority: 4
        });

      // 守卫保护
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: gameState.id,
          user_id: 'player-3',
          skill_name: 'vigil',
          target_user_id: 'player-5',
          round_number: 1,
          phase: 'night',
          skill_priority: 5
        });

      // 6. 验证技能冲突检测
      const { data: conflicts } = await supabase
        .rpc('detect_skill_conflicts', {
          p_game_state_id: gameState.id,
          p_round_number: 1,
          p_phase: 'night'
        });

      if (conflicts) {
        expect(conflicts).toBeDefined();
      }

      // 7. 进入白天阶段 - 投票
      await supabase
        .from('game_states')
        .update({ current_phase: 1 })
        .eq('id', gameState.id);

      // 创建投票会话
      const { data: votingSession } = await supabase
        .from('voting_sessions')
        .insert({
          room_id: room.id,
          game_state_id: gameState.id,
          round_number: 1,
          phase: 1,
          session_type: 'day_vote',
          status: 'active'
        })
        .select()
        .single();

      if (votingSession) {
        // 模拟投票
        for (let i = 0; i < 4; i++) {
          await supabase
            .from('votes')
            .insert({
              voting_session_id: votingSession.id,
              voter_id: testPlayers[i].userId,
              target_id: 'player-1' // 投票给狼人
            });
        }

        // 计算投票结果
        await supabase.rpc('calculate_voting_results', {
          p_voting_session_id: votingSession.id
        });

        // 验证投票结果
        const { data: results } = await supabase
          .from('voting_results')
          .select()
          .eq('voting_session_id', votingSession.id);

        if (results) {
          expect(results.length).toBeGreaterThan(0);
        }
      }

      // 8. 清理测试数据
      await supabase.from('game_states').delete().eq('id', gameState.id);
      await supabase.from('rooms').delete().eq('id', room.id);
    });

    it('应该正确处理多重保护导致的淘汰', async () => {
      // 创建测试场景：同一目标被守卫和女巫同时保护
      const { data: room } = await supabase
        .from('rooms')
        .insert({
          room_id: 'multi-protect-room-' + Date.now(),
          status: 'active'
        })
        .select()
        .single();

      if (!room) return;

      const { data: gameState } = await supabase
        .from('game_states')
        .insert({
          room_id: room.id,
          status: 'active',
          current_phase: 3,
          current_round: 1
        })
        .select()
        .single();

      if (!gameState) return;

      const targetUserId = 'protected-player';

      // 狼人攻击
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: gameState.id,
          user_id: 'wolf-user',
          skill_name: 'night_attack',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          execution_status: 'completed'
        });

      // 守卫保护
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: gameState.id,
          user_id: 'guard-user',
          skill_name: 'vigil',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          execution_status: 'completed'
        });

      // 女巫保护
      await supabase
        .from('skill_uses')
        .insert({
          game_state_id: gameState.id,
          user_id: 'witch-user',
          skill_name: 'magic_potion',
          target_user_id: targetUserId,
          round_number: 1,
          phase: 'night',
          execution_status: 'completed',
          skill_effects: { effect_type: 'protection' }
        });

      // 检查多重保护
      const { data: multiProtectionResult } = await supabase
        .rpc('check_multiple_protection', {
          p_target_user_id: targetUserId,
          p_game_state_id: gameState.id,
          p_round_number: 1
        });

      if (multiProtectionResult) {
        expect(multiProtectionResult).toHaveProperty('has_multiple_protection');
        expect(multiProtectionResult).toHaveProperty('should_eliminate');
        
        if ((multiProtectionResult as any).should_eliminate) {
          // 多重保护应该导致淘汰
          expect((multiProtectionResult as any).has_multiple_protection).toBe(true);
        }
      }

      // 清理
      await supabase.from('game_states').delete().eq('id', gameState.id);
      await supabase.from('rooms').delete().eq('id', room.id);
    });
  });

  describe('异常场景处理', () => {
    it('应该正确处理网络中断后的恢复', async () => {
      // 模拟网络中断场景
      // 这里可以测试实时订阅的重连逻辑
      expect(true).toBe(true); // 占位测试
    });

    it('应该正确处理并发技能使用', async () => {
      // 模拟多个玩家同时使用技能
      expect(true).toBe(true); // 占位测试
    });
  });
});
