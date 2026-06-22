-- 技能系统数据库优化 - 第一阶段：性能关键优化
-- 此迁移旨在立即提升数据库查询性能和数据一致性

-- 1. 为 skill_uses 表添加关键索引
-- 这些索引将大幅提升查询性能，特别是按游戏状态、轮次和阶段查询技能使用记录时
CREATE INDEX IF NOT EXISTS idx_skill_uses_game_state_round_phase 
ON public.skill_uses (game_state_id, round_number, phase);

CREATE INDEX IF NOT EXISTS idx_skill_uses_user_game_state 
ON public.skill_uses (user_id, game_state_id);

CREATE INDEX IF NOT EXISTS idx_skill_uses_execution_status 
ON public.skill_uses (execution_status) WHERE execution_status = 'pending';

-- 2. 为 skill_effects_queue 表添加关键索引
-- 这些索引将优化技能效果队列的查询和处理性能
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_status_trigger 
ON public.skill_effects_queue (status, trigger_time) WHERE status = 'queued';

CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_game_priority 
ON public.skill_effects_queue (game_state_id, priority, execution_order);

CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_room_id 
ON public.skill_effects_queue (room_id);

-- 3. 为 skill_targets 表添加关键索引
-- 这些索引将优化技能目标查询和效果管理
CREATE INDEX IF NOT EXISTS idx_skill_targets_target_user_active 
ON public.skill_targets (target_user_id, is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_skill_targets_skill_use_id 
ON public.skill_targets (skill_use_id);

CREATE INDEX IF NOT EXISTS idx_skill_targets_effect_end_time 
ON public.skill_targets (effect_end_time) WHERE effect_end_time IS NOT NULL AND is_active = true;

-- 4. 添加外键约束以确保数据一致性
-- 这些约束将防止数据不一致问题，并提升查询优化器性能

-- skill_uses 表的外键约束
ALTER TABLE public.skill_uses 
ADD CONSTRAINT fk_skill_uses_game_state 
FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) 
ON DELETE CASCADE;

-- skill_effects_queue 表的外键约束
ALTER TABLE public.skill_effects_queue 
ADD CONSTRAINT fk_skill_effects_queue_skill_use 
FOREIGN KEY (skill_use_id) REFERENCES public.skill_uses(id) 
ON DELETE CASCADE;

ALTER TABLE public.skill_effects_queue 
ADD CONSTRAINT fk_skill_effects_queue_game_state 
FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) 
ON DELETE CASCADE;

ALTER TABLE public.skill_effects_queue 
ADD CONSTRAINT fk_skill_effects_queue_room 
FOREIGN KEY (room_id) REFERENCES public.rooms(id) 
ON DELETE CASCADE;

-- skill_targets 表的外键约束
ALTER TABLE public.skill_targets 
ADD CONSTRAINT fk_skill_targets_skill_use 
FOREIGN KEY (skill_use_id) REFERENCES public.skill_uses(id) 
ON DELETE CASCADE;

ALTER TABLE public.skill_targets 
ADD CONSTRAINT fk_skill_targets_skill_effects_queue 
FOREIGN KEY (skill_effects_queue_id) REFERENCES public.skill_effects_queue(id) 
ON DELETE SET NULL;

-- skill_conflicts 表的外键约束
ALTER TABLE public.skill_conflicts 
ADD CONSTRAINT fk_skill_conflicts_game_state 
FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) 
ON DELETE CASCADE;

ALTER TABLE public.skill_conflicts 
ADD CONSTRAINT fk_skill_conflicts_resolved_skill 
FOREIGN KEY (resolved_skill_id) REFERENCES public.skill_uses(id) 
ON DELETE SET NULL;

-- 5. 为 role_design 表添加性能索引
CREATE INDEX IF NOT EXISTS idx_role_design_faction 
ON public.role_design (faction);

CREATE INDEX IF NOT EXISTS idx_role_design_usage_frequency 
ON public.role_design (usage_frequency) WHERE usage_frequency = true;

-- 6. 清理和优化现有表
-- 删除可能存在的重复或不必要的索引（如果存在）
DROP INDEX IF EXISTS public.idx_skill_uses_created_at;
DROP INDEX IF EXISTS public.idx_skill_effects_queue_created_at;
DROP INDEX IF EXISTS public.idx_skill_targets_created_at;

-- 添加必要的部分索引以优化常见查询
CREATE INDEX IF NOT EXISTS idx_game_states_active_rooms 
ON public.game_states (room_id, status) WHERE status = 'active';

-- 为投票相关表添加关键索引（如果还没有的话）
CREATE INDEX IF NOT EXISTS idx_voting_sessions_active 
ON public.voting_sessions (room_id, status) WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_votes_session_voter 
ON public.votes (voting_session_id, voter_id);

-- 添加用于清理过期数据的索引
CREATE INDEX IF NOT EXISTS idx_skill_targets_cleanup 
ON public.skill_targets (effect_end_time, is_active) 
WHERE effect_end_time IS NOT NULL AND is_active = true;

-- 确保 role_states 表有必要的索引
CREATE INDEX IF NOT EXISTS idx_role_states_game_user 
ON public.role_states (game_state_id, user_id);

CREATE INDEX IF NOT EXISTS idx_role_states_room_status 
ON public.role_states (room_id, role_status);

-- 添加统计信息更新
ANALYZE public.skill_uses;
ANALYZE public.skill_effects_queue;
ANALYZE public.skill_targets;
ANALYZE public.skill_conflicts;
ANALYZE public.role_design;
ANALYZE public.game_states;
ANALYZE public.role_states;