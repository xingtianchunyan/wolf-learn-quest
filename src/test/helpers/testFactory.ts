/**
 * 测试数据工厂函数
 * 用于创建一致的测试数据
 */
export const createMockRoom = (overrides = {}) => ({
  id: 'test-room-id',
  name: '测试房间',
  host_id: 'test-host-id',
  status: 'waiting',
  max_players: 12,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createMockGameState = (overrides = {}) => ({
  id: 'test-game-state-id',
  room_id: 'test-room-id',
  current_phase: 1,
  current_round: 1,
  phase_start_time: new Date().toISOString(),
  phase_end_time: new Date(Date.now() + 300000).toISOString(),
  phase_duration: 300,
  status: 'active',
  is_paused: false,
  paused_at: null as string | null,
  total_paused_duration: 0,
  auto_advance: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createMockGameSettings = (overrides = {}) => ({
  id: 'test-settings-id',
  room_id: 'test-room-id',
  is_auto_advance: true,
  day_duration: 300,
  evening_duration: 40,
  night_duration: 180,
  dawn_duration: 40,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createMockPlayer = (overrides = {}) => ({
  id: 'test-player-id',
  user_id: 'test-user-id',
  room_id: 'test-room-id',
  role: 'villager',
  is_ready: true,
  is_ai: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createMockRoleState = (overrides = {}) => ({
  id: 'test-role-state-id',
  user_id: 'test-user-id',
  game_state_id: 'test-game-state-id',
  role: 'villager',
  is_alive: true,
  death_round: null as number | null,
  death_reason: null as string | null,
  protected_count: 0,
  last_skill_used_round: null as number | null,
  skill_uses_remaining: {} as Record<string, number>,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createMockSkillUse = (overrides = {}) => ({
  id: 'test-skill-id',
  user_id: 'test-user-id',
  game_state_id: 'test-game-state-id',
  skill_name: 'attack',
  target_id: 'test-target-id',
  round_number: 1,
  phase: 'night',
  skill_data: {},
  skill_priority: 50,
  execution_time: new Date().toISOString(),
  is_processed: false,
  result: null as any,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createMockVote = (overrides = {}) => ({
  id: 'test-vote-id',
  game_state_id: 'test-game-state-id',
  voter_id: 'test-voter-id',
  target_id: 'test-target-id',
  round_number: 1,
  vote_phase: 'day',
  created_at: new Date().toISOString(),
  ...overrides,
});

export const createMockRoleDesign = (overrides = {}) => ({
  id: 'test-role-design-id',
  name: 'villager',
  display_name: '村民',
  description: '普通的村民',
  victory_condition: '好人阵营获胜',
  special_abilities: [] as string[],
  skill_effects: {},
  priority: 0,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

/**
 * 创建完整的游戏场景
 */
export const createGameScenario = () => {
  const roomId = 'test-room-id';
  const gameStateId = 'test-game-state-id';

  return {
    room: createMockRoom({ id: roomId }),
    gameState: createMockGameState({ id: gameStateId, room_id: roomId }),
    gameSettings: createMockGameSettings({ room_id: roomId }),
    players: [
      createMockPlayer({ id: 'player-1', user_id: 'user-1', role: 'werewolf' }),
      createMockPlayer({ id: 'player-2', user_id: 'user-2', role: 'seer' }),
      createMockPlayer({ id: 'player-3', user_id: 'user-3', role: 'guard' }),
      createMockPlayer({ id: 'player-4', user_id: 'user-4', role: 'witch' }),
    ],
    roleStates: [
      createMockRoleState({
        user_id: 'user-1',
        role: 'werewolf',
        game_state_id: gameStateId,
      }),
      createMockRoleState({
        user_id: 'user-2',
        role: 'seer',
        game_state_id: gameStateId,
      }),
      createMockRoleState({
        user_id: 'user-3',
        role: 'guard',
        game_state_id: gameStateId,
      }),
      createMockRoleState({
        user_id: 'user-4',
        role: 'witch',
        game_state_id: gameStateId,
      }),
    ],
  };
};
