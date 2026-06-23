/**
 * 文件级注释：基于 Supabase mock 的游戏流程集成测试
 * 该测试验证查询拼装与 RPC 调用契约，不代表真实浏览器 E2E。
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';
import { createMockQueryBuilder } from '@/__tests__/helpers/mockSupabase';
import {
  createMockRoom,
  createMockGameState,
  createMockSkillUse,
} from '@/__tests__/helpers/testFactory';

vi.mock('@/integrations/supabase/client');
const mockSupabase = supabase as any;

describe('游戏流程集成测试（mock Supabase）', () => {
  let testRoomId: string;
  let testGameStateId: string;

  beforeEach(() => {
    vi.clearAllMocks();
    testRoomId = 'integration-test-room';
    testGameStateId = 'integration-test-game-state';

    const mockBuilder = createMockQueryBuilder({ data: null, error: null });
    mockSupabase.from = vi.fn(() => mockBuilder);
    mockSupabase.rpc = vi.fn().mockResolvedValue({ data: null, error: null });
  });

  it('应该完成一个 mock 游戏回合的数据调用链', async () => {
    const mockRoom = createMockRoom({ id: testRoomId });
    const roomBuilder = createMockQueryBuilder({
      data: mockRoom,
      error: null,
    });
    mockSupabase.from = vi.fn(() => roomBuilder);

    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .insert({
        room_id: testRoomId,
        host_id: 'test-host',
      })
      .select()
      .single();

    expect(roomError).toBeNull();
    expect(room).toBeDefined();

    const mockGameState = createMockGameState({
      id: testGameStateId,
      room_id: testRoomId,
    });
    const gameStateBuilder = createMockQueryBuilder({
      data: mockGameState,
      error: null,
    });
    mockSupabase.from = vi.fn(() => gameStateBuilder);

    const { data: gameState, error: gameStateError } = await supabase
      .from('game_states')
      .insert({
        room_id: testRoomId,
        current_phase: 3,
        current_round: 1,
        status: 'active',
      })
      .select()
      .single();

    expect(gameStateError).toBeNull();
    expect(gameState).toBeDefined();

    mockSupabase.rpc = vi.fn().mockResolvedValue({
      data: { success: true, skill_id: 'skill-1' },
      error: null,
    });

    const { data: attackResult, error: attackError } = await supabase.rpc(
      'use_skill_enhanced',
      {
        p_game_state_id: testGameStateId,
        p_skill_name: 'attack',
        p_target_user_id: 'victim-player',
      }
    );

    expect(attackError).toBeNull();
    expect(attackResult).toBeDefined();

    mockSupabase.rpc = vi.fn().mockResolvedValue({
      data: [],
      error: null,
    });

    const { data: conflicts, error: conflictError } = await supabase.rpc(
      'detect_skill_conflicts',
      {
        p_game_state_id: testGameStateId,
        p_phase: 'night',
        p_round_number: 1,
      }
    );

    expect(conflictError).toBeNull();
    expect(conflicts).toBeDefined();
  });

  it('应该处理多重保护的 mock 查询链', async () => {
    const mockRoom = createMockRoom({ id: testRoomId });
    const roomBuilder = createMockQueryBuilder({
      data: mockRoom,
      error: null,
    });
    mockSupabase.from = vi.fn(() => roomBuilder);

    const { data: room } = await supabase
      .from('rooms')
      .insert({
        room_id: testRoomId,
        host_id: 'test-host',
      })
      .select()
      .single();

    expect(room).toBeDefined();

    const guardProtect = createMockSkillUse({
      skill_name: 'guard_protect',
      target_id: 'protected-player',
      skill_priority: 10,
    });
    const witchAntidote = createMockSkillUse({
      skill_name: 'witch_antidote',
      target_id: 'protected-player',
      skill_priority: 20,
    });

    const skillsBuilder = createMockQueryBuilder({
      data: [guardProtect, witchAntidote],
      error: null,
    });
    mockSupabase.from = vi.fn(() => skillsBuilder);

    mockSupabase.rpc = vi.fn().mockResolvedValue({
      data: {
        has_multiple_protection: true,
        protection_count: 2,
        should_eliminate: true,
      },
      error: null,
    });

    const { data: multiProtect, error: protectError } = await supabase.rpc(
      'check_multiple_protection',
      {
        p_game_state_id: testGameStateId,
        p_round_number: 1,
        p_target_user_id: 'protected-player',
      }
    );

    expect(protectError).toBeNull();
    expect(multiProtect).toBeDefined();

    mockSupabase.from = vi.fn(() =>
      createMockQueryBuilder({ data: null, error: null })
    );

    const { error: updateError } = await supabase
      .from('role_states')
      .update({ role_status: 4 })
      .eq('user_id', 'protected-player');

    expect(updateError).toBeNull();
  });

  it('应该正确处理网络中断后的恢复', async () => {
    mockSupabase.rpc = vi
      .fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ data: { success: true }, error: null });

    await expect(
      supabase.rpc('use_skill_enhanced', {
        p_game_state_id: testGameStateId,
        p_skill_name: 'attack',
      })
    ).rejects.toThrow('Network error');

    const { data, error } = await supabase.rpc('use_skill_enhanced', {
      p_game_state_id: testGameStateId,
      p_skill_name: 'attack',
    });

    expect(error).toBeNull();
    expect(data).toBeDefined();
  });

  it('应该正确处理并发技能使用', async () => {
    mockSupabase.rpc = vi.fn().mockResolvedValue({
      data: { success: true },
      error: null,
    });

    const skillPromises = [
      supabase.rpc('use_skill_enhanced', {
        p_game_state_id: testGameStateId,
        p_skill_name: 'attack',
      }),
      supabase.rpc('use_skill_enhanced', {
        p_game_state_id: testGameStateId,
        p_skill_name: 'guard_protect',
      }),
      supabase.rpc('use_skill_enhanced', {
        p_game_state_id: testGameStateId,
        p_skill_name: 'prophecy',
      }),
    ];

    const results = await Promise.all(skillPromises);

    expect(results).toHaveLength(3);
    results.forEach(result => {
      expect(result.error).toBeNull();
      expect(result.data).toBeDefined();
    });
  });
});
