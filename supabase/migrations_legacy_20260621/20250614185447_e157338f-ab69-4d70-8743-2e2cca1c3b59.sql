
-- Step 1: 清空相关表中的测试数据，为结构变更做准备
TRUNCATE public.chat_messages, public.game_actions, public.game_sessions RESTART IDENTITY;

-- Step 2: 修正过程性数据表的关联，使其指向 game_states

-- 重定向 chat_messages 的外键
ALTER TABLE public.chat_messages
  DROP CONSTRAINT IF EXISTS chat_messages_game_id_fkey; -- 移除旧的、指向 game_sessions 的外键
ALTER TABLE public.chat_messages
  ADD CONSTRAINT chat_messages_game_id_fkey
  FOREIGN KEY (game_id) REFERENCES public.game_states(id) ON DELETE CASCADE;
COMMENT ON COLUMN public.chat_messages.game_id IS '关联到 game_states 表，代表唯一的游戏状态';

-- 重定向 game_actions 的外键
ALTER TABLE public.game_actions
  DROP CONSTRAINT IF EXISTS game_actions_game_id_fkey; -- 移除旧的、指向 game_sessions 的外键
ALTER TABLE public.game_actions
  ADD CONSTRAINT game_actions_game_id_fkey
  FOREIGN KEY (game_id) REFERENCES public.game_states(id) ON DELETE CASCADE;
COMMENT ON COLUMN public.game_actions.game_id IS '关联到 game_states 表，代表唯一的游戏状态';

-- Step 3: 按照“结果档案”的定位，改造 game_sessions 表

-- 移除不再需要的“过程性”列
ALTER TABLE public.game_sessions
  DROP COLUMN IF EXISTS active_role,
  DROP COLUMN IF EXISTS current_phase;

-- 重命名列以符合其“结果”的含义
ALTER TABLE public.game_sessions
  RENAME COLUMN current_round TO final_round;
ALTER TABLE public.game_sessions
  RENAME COLUMN created_at TO start_time;

-- 添加新的“结果性”列
ALTER TABLE public.game_sessions
  ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS total_duration_seconds INTEGER,
  ADD COLUMN IF NOT EXISTS winner_faction TEXT,
  ADD COLUMN IF NOT EXISTS end_reason TEXT;

-- 调整列的约束
ALTER TABLE public.game_sessions
  ALTER COLUMN room_id SET NOT NULL,
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN start_time SET NOT NULL,
  ALTER COLUMN start_time SET DEFAULT now();

-- 更新表和列的注释，以反映新的设计
COMMENT ON TABLE public.game_sessions IS '存储已结束游戏会话的最终结果和摘要。';
COMMENT ON COLUMN public.game_sessions.room_id IS '关联的游戏房间 ID。';
COMMENT ON COLUMN public.game_sessions.status IS '游戏的最终状态（例如：已完成、已中止）。';
COMMENT ON COLUMN public.game_sessions.final_round IS '游戏结束时的回合数。';
COMMENT ON COLUMN public.game_sessions.start_time IS '游戏会话开始的时间戳。';
COMMENT ON COLUMN public.game_sessions.end_time IS '游戏会话结束的时间戳。';
COMMENT ON COLUMN public.game_sessions.total_duration_seconds IS '游戏总时长（秒）。';
COMMENT ON COLUMN public.game_sessions.winner_faction IS '获胜阵营（例如：村民、狼人）。';
COMMENT ON COLUMN public.game_sessions.end_reason IS '游戏结束原因（例如：狼人被全部消灭、法官结束游戏）。';

