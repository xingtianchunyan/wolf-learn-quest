
-- 首先为 role_selections 表添加唯一约束
ALTER TABLE public.role_selections 
ADD CONSTRAINT unique_role_selection_per_room 
UNIQUE (room_id, user_id, role_id);

-- 将 player_game_states 表重命名为 role_states
ALTER TABLE public.player_game_states RENAME TO role_states;

-- 删除原有的 user_id 和 role 字段
ALTER TABLE public.role_states DROP COLUMN user_id CASCADE;
ALTER TABLE public.role_states DROP COLUMN role CASCADE;

-- 添加与 role_selections 表关联的字段
ALTER TABLE public.role_states ADD COLUMN room_id uuid NOT NULL;
ALTER TABLE public.role_states ADD COLUMN user_id uuid NOT NULL;
ALTER TABLE public.role_states ADD COLUMN role_id uuid NOT NULL;

-- 添加 current_phase 字段
ALTER TABLE public.role_states ADD COLUMN current_phase integer;

-- 将 is_alive 字段改为 role_status 字段
ALTER TABLE public.role_states DROP COLUMN is_alive;
ALTER TABLE public.role_states ADD COLUMN role_status integer NOT NULL DEFAULT 1;

-- 添加外键约束
ALTER TABLE public.role_states 
ADD CONSTRAINT fk_role_states_game_state_id 
FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) ON DELETE CASCADE;

ALTER TABLE public.role_states 
ADD CONSTRAINT fk_role_states_role_selection 
FOREIGN KEY (room_id, user_id, role_id) REFERENCES public.role_selections(room_id, user_id, role_id) ON DELETE CASCADE;

-- 添加检查约束确保 role_status 只能是 1-4
ALTER TABLE public.role_states 
ADD CONSTRAINT check_role_status_range 
CHECK (role_status >= 1 AND role_status <= 4);

-- 为性能优化添加索引
CREATE INDEX idx_role_states_room_id ON public.role_states(room_id);
CREATE INDEX idx_role_states_user_id ON public.role_states(user_id);
CREATE INDEX idx_role_states_role_id ON public.role_states(role_id);
CREATE INDEX idx_role_states_game_state_id ON public.role_states(game_state_id);
CREATE INDEX idx_role_states_role_status ON public.role_states(role_status);

-- 添加唯一约束，确保每个游戏状态中每个角色选择只有一条记录
ALTER TABLE public.role_states 
ADD CONSTRAINT unique_role_state_per_selection 
UNIQUE (game_state_id, room_id, user_id, role_id);

-- 启用 RLS
ALTER TABLE public.role_states ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
CREATE POLICY "允许房间参与者查看角色状态" 
ON public.role_states 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.role_selections rs 
    WHERE rs.room_id = role_states.room_id 
    AND rs.user_id = auth.uid()
  )
  OR 
  EXISTS (
    SELECT 1 FROM public.rooms r 
    WHERE r.id = role_states.room_id 
    AND r.judge_user_id = auth.uid()
  )
);

CREATE POLICY "允许玩家更新自己的角色状态" 
ON public.role_states 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "允许系统插入角色状态" 
ON public.role_states 
FOR INSERT 
WITH CHECK (true);

-- 创建技能使用次数初始化函数
CREATE OR REPLACE FUNCTION public.initialize_skill_uses_remaining(p_role_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  skill_usage_count integer;
  result jsonb;
BEGIN
  -- 从 role_design 表获取技能使用次数
  SELECT skill_usage INTO skill_usage_count
  FROM public.role_design
  WHERE id = p_role_id;
  
  -- 如果没有找到角色或技能使用次数为空，返回空对象
  IF skill_usage_count IS NULL THEN
    RETURN '{}'::jsonb;
  END IF;
  
  -- 根据技能使用次数设置初始值
  IF skill_usage_count = -1 THEN
    -- 无限次使用
    result := '{"unlimited": true}'::jsonb;
  ELSE
    -- 有限次使用
    result := jsonb_build_object('remaining', skill_usage_count, 'total', skill_usage_count);
  END IF;
  
  RETURN result;
END;
$$;

-- 创建技能使用扣减函数
CREATE OR REPLACE FUNCTION public.use_skill_charge(p_role_state_id uuid)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  current_skill_uses jsonb;
  remaining_uses integer;
  is_unlimited boolean;
BEGIN
  -- 获取当前技能使用次数
  SELECT skill_uses_remaining INTO current_skill_uses
  FROM public.role_states
  WHERE id = p_role_state_id;
  
  -- 检查是否为无限次使用
  is_unlimited := (current_skill_uses->>'unlimited')::boolean;
  
  IF is_unlimited = true THEN
    -- 无限次使用，直接返回成功
    RETURN true;
  END IF;
  
  -- 获取剩余使用次数
  remaining_uses := (current_skill_uses->>'remaining')::integer;
  
  -- 检查是否还有剩余次数
  IF remaining_uses IS NULL OR remaining_uses <= 0 THEN
    RETURN false;
  END IF;
  
  -- 扣减使用次数
  current_skill_uses := jsonb_set(
    current_skill_uses,
    '{remaining}',
    to_jsonb(remaining_uses - 1)
  );
  
  -- 更新数据库
  UPDATE public.role_states
  SET skill_uses_remaining = current_skill_uses
  WHERE id = p_role_state_id;
  
  RETURN true;
END;
$$;

-- 创建技能使用限制检查函数
CREATE OR REPLACE FUNCTION public.can_use_skill(p_role_state_id uuid)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  current_skill_uses jsonb;
  remaining_uses integer;
  is_unlimited boolean;
BEGIN
  -- 获取当前技能使用次数
  SELECT skill_uses_remaining INTO current_skill_uses
  FROM public.role_states
  WHERE id = p_role_state_id;
  
  -- 检查是否为无限次使用
  is_unlimited := (current_skill_uses->>'unlimited')::boolean;
  
  IF is_unlimited = true THEN
    RETURN true;
  END IF;
  
  -- 获取剩余使用次数
  remaining_uses := (current_skill_uses->>'remaining')::integer;
  
  -- 检查是否还有剩余次数
  RETURN remaining_uses IS NOT NULL AND remaining_uses > 0;
END;
$$;

-- 创建状态效果初始化函数
CREATE OR REPLACE FUNCTION public.initialize_status_effects(p_role_status integer)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  result jsonb;
BEGIN
  CASE p_role_status
    WHEN 1 THEN -- 正常状态
      result := '{
        "can_chat": true,
        "can_vote": true,
        "can_use_skill": true,
        "can_be_targeted": true,
        "can_answer_questions": true,
        "can_be_voted": true
      }'::jsonb;
    WHEN 2 THEN -- 濒死状态
      result := '{
        "can_chat": false,
        "can_vote": false,
        "can_use_skill": true,
        "can_be_targeted": true,
        "can_answer_questions": true,
        "can_be_voted": false
      }'::jsonb;
    WHEN 3 THEN -- 虚弱状态
      result := '{
        "can_chat": true,
        "can_vote": false,
        "can_use_skill": false,
        "can_be_targeted": true,
        "can_answer_questions": true,
        "can_be_voted": true
      }'::jsonb;
    WHEN 4 THEN -- 淘汰状态
      result := '{
        "can_chat": false,
        "can_vote": false,
        "can_use_skill": false,
        "can_be_targeted": false,
        "can_answer_questions": true,
        "can_be_voted": false
      }'::jsonb;
    ELSE
      result := '{}'::jsonb;
  END CASE;
  
  RETURN result;
END;
$$;

-- 创建角色状态更新函数
CREATE OR REPLACE FUNCTION public.update_role_status()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- 当 role_status 字段更新时，自动更新 status_effects
  NEW.status_effects := public.initialize_status_effects(NEW.role_status);
  
  -- 更新时间戳
  NEW.updated_at := now();
  
  RETURN NEW;
END;
$$;

-- 创建触发器，当 role_status 更新时自动更新 status_effects
CREATE TRIGGER trigger_update_role_status_effects
  BEFORE UPDATE ON public.role_states
  FOR EACH ROW
  WHEN (OLD.role_status IS DISTINCT FROM NEW.role_status)
  EXECUTE FUNCTION public.update_role_status();

-- 创建角色状态插入触发器
CREATE OR REPLACE FUNCTION public.initialize_role_state()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- 初始化技能使用次数
  NEW.skill_uses_remaining := public.initialize_skill_uses_remaining(NEW.role_id);
  
  -- 初始化状态效果
  NEW.status_effects := public.initialize_status_effects(NEW.role_status);
  
  RETURN NEW;
END;
$$;

-- 创建触发器，在插入新角色状态时自动初始化
CREATE TRIGGER trigger_initialize_role_state
  BEFORE INSERT ON public.role_states
  FOR EACH ROW
  EXECUTE FUNCTION public.initialize_role_state();
