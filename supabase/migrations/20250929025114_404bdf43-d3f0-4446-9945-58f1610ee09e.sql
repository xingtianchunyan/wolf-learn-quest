-- 性能优化：为技能系统添加复合索引
-- 这些索引将显著提升查询性能

-- 技能使用表的复合索引
CREATE INDEX IF NOT EXISTS idx_skill_uses_game_user_round 
ON skill_uses (game_state_id, user_id, round_number, phase);

CREATE INDEX IF NOT EXISTS idx_skill_uses_execution_status 
ON skill_uses (execution_status, created_at);

CREATE INDEX IF NOT EXISTS idx_skill_uses_priority 
ON skill_uses (skill_priority, execution_time);

-- 标准化技能目标表的复合索引
CREATE INDEX IF NOT EXISTS idx_standardized_skill_targets_active 
ON standardized_skill_targets (is_active, effect_end_time) 
WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_standardized_skill_targets_user_game 
ON standardized_skill_targets (target_user_id, skill_use_id);

-- 技能效果队列表的复合索引
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_processing 
ON skill_effects_queue (status, priority, trigger_time);

CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_game_room 
ON skill_effects_queue (game_state_id, room_id);

-- 角色状态表的复合索引
CREATE INDEX IF NOT EXISTS idx_role_states_game_user 
ON role_states (game_state_id, user_id, role_status);

CREATE INDEX IF NOT EXISTS idx_role_states_room_status 
ON role_states (room_id, role_status, updated_at);

-- 游戏状态表的复合索引
CREATE INDEX IF NOT EXISTS idx_game_states_room_status 
ON game_states (room_id, status, current_phase, current_round);

-- 技能冲突表的复合索引
CREATE INDEX IF NOT EXISTS idx_skill_conflicts_game_round 
ON skill_conflicts (game_state_id, round_number, phase);

-- 为聚合查询优化的部分索引
CREATE INDEX IF NOT EXISTS idx_skill_uses_recent_active 
ON skill_uses (game_state_id, created_at) 
WHERE execution_status IN ('pending', 'processing');

CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_pending 
ON skill_effects_queue (game_state_id, priority, created_at) 
WHERE status = 'queued';

-- 角色设计表索引（如果经常被查询）
CREATE INDEX IF NOT EXISTS idx_role_design_name_faction 
ON role_design (role_name, faction);

-- 房间玩家表索引
CREATE INDEX IF NOT EXISTS idx_room_players_active 
ON room_players (room_id, is_ai) 
WHERE is_ready = true;