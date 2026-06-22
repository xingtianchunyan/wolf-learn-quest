
-- 第二阶段：技能使用系统强化 (修复版本)
-- 1. 增强 skill_uses 表的结构
ALTER TABLE public.skill_uses 
ADD COLUMN IF NOT EXISTS skill_priority INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS execution_status TEXT DEFAULT 'pending', -- pending, processing, completed, failed, cancelled
ADD COLUMN IF NOT EXISTS skill_effects JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS conditions_met JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS execution_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS failure_reason TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- 2. 创建技能效果执行队列表
CREATE TABLE IF NOT EXISTS public.skill_effects_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_use_id UUID NOT NULL REFERENCES public.skill_uses(id) ON DELETE CASCADE,
  game_state_id UUID NOT NULL REFERENCES public.game_states(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  effect_type TEXT NOT NULL, -- immediate, delayed, conditional, persistent
  effect_data JSONB NOT NULL DEFAULT '{}',
  priority INTEGER NOT NULL DEFAULT 100,
  execution_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'queued', -- queued, processing, completed, failed, cancelled
  conditions JSONB DEFAULT '{}', -- 执行条件
  trigger_time TIMESTAMP WITH TIME ZONE, -- 延时触发时间
  expires_at TIMESTAMP WITH TIME ZONE, -- 效果过期时间
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- 3. 创建技能目标和影响表
CREATE TABLE IF NOT EXISTS public.skill_targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_use_id UUID NOT NULL REFERENCES public.skill_uses(id) ON DELETE CASCADE,
  skill_effects_queue_id UUID REFERENCES public.skill_effects_queue(id) ON DELETE CASCADE,
  target_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL, -- player, role, all_players, random_player, etc.
  effect_applied JSONB NOT NULL DEFAULT '{}',
  effect_duration INTEGER, -- 持续时间（秒）
  effect_start_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  effect_end_time TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  stack_count INTEGER DEFAULT 1, -- 效果叠加次数
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. 创建技能冲突解决表
CREATE TABLE IF NOT EXISTS public.skill_conflicts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_state_id UUID NOT NULL REFERENCES public.game_states(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  phase TEXT NOT NULL,
  conflicting_skills JSONB NOT NULL DEFAULT '[]', -- 冲突技能列表
  resolution_rule TEXT NOT NULL, -- priority, cancel_all, first_wins, last_wins
  resolved_skill_id UUID REFERENCES public.skill_uses(id),
  resolution_details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 添加索引优化查询性能
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_game_state ON public.skill_effects_queue(game_state_id);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_priority ON public.skill_effects_queue(priority, execution_order);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_status ON public.skill_effects_queue(status);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_trigger_time ON public.skill_effects_queue(trigger_time);

CREATE INDEX IF NOT EXISTS idx_skill_targets_skill_use ON public.skill_targets(skill_use_id);
CREATE INDEX IF NOT EXISTS idx_skill_targets_target_user ON public.skill_targets(target_user_id);
CREATE INDEX IF NOT EXISTS idx_skill_targets_active ON public.skill_targets(is_active);
CREATE INDEX IF NOT EXISTS idx_skill_targets_end_time ON public.skill_targets(effect_end_time);

CREATE INDEX IF NOT EXISTS idx_skill_conflicts_game_state ON public.skill_conflicts(game_state_id, round_number, phase);

-- 创建技能使用函数 (修复版本)
CREATE OR REPLACE FUNCTION public.use_skill(
  p_user_id UUID,
  p_game_state_id UUID,
  p_skill_name TEXT,
  p_target_user_id UUID DEFAULT NULL,
  p_skill_data JSONB DEFAULT '{}'
) RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  skill_use_id UUID;
  role_state_record RECORD;
  skill_effects_data JSONB;
  current_round INTEGER;
  current_phase_num INTEGER;
  current_phase_name TEXT;
  skill_priority INTEGER;
BEGIN
  -- 获取角色状态
  SELECT * INTO role_state_record
  FROM public.role_states rs
  WHERE rs.user_id = p_user_id AND rs.game_state_id = p_game_state_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Role state not found for user % in game %', p_user_id, p_game_state_id;
  END IF;

  -- 获取游戏信息
  SELECT gs.current_round, gs.current_phase 
  INTO current_round, current_phase_num
  FROM public.game_states gs
  WHERE gs.id = p_game_state_id;

  -- 获取技能效果数据
  SELECT rd.skill_effects 
  INTO skill_effects_data
  FROM public.role_design rd
  WHERE rd.id = role_state_record.role_id;

  -- 检查技能使用权限
  IF NOT public.can_use_skill(role_state_record.id) THEN
    RAISE EXCEPTION 'Skill usage not available';
  END IF;

  -- 获取当前阶段名称
  current_phase_name := CASE current_phase_num
    WHEN 1 THEN 'day'
    WHEN 2 THEN 'evening'
    WHEN 3 THEN 'night'
    WHEN 4 THEN 'dawn'
    ELSE 'day'
  END;

  -- 获取技能优先级
  skill_priority := COALESCE((skill_effects_data->>'priority')::INTEGER, 100);

  -- 创建技能使用记录
  INSERT INTO public.skill_uses (
    user_id,
    game_state_id,
    skill_name,
    target_user_id,
    round_number,
    phase,
    skill_priority,
    skill_effects,
    result
  ) VALUES (
    p_user_id,
    p_game_state_id,
    p_skill_name,
    p_target_user_id,
    current_round,
    current_phase_name,
    skill_priority,
    skill_effects_data,
    p_skill_data
  ) RETURNING id INTO skill_use_id;

  -- 扣减技能使用次数
  PERFORM public.use_skill_charge(role_state_record.id);

  RETURN skill_use_id;
END;
$$;

-- 创建技能效果队列添加函数
CREATE OR REPLACE FUNCTION public.queue_skill_effect(
  p_skill_use_id UUID,
  p_effect_type TEXT,
  p_effect_data JSONB,
  p_priority INTEGER DEFAULT 100,
  p_conditions JSONB DEFAULT '{}',
  p_trigger_delay_seconds INTEGER DEFAULT 0
) RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  effect_queue_id UUID;
  skill_record RECORD;
  trigger_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- 获取技能使用信息
  SELECT su.*, gs.room_id
  INTO skill_record
  FROM public.skill_uses su
  JOIN public.game_states gs ON gs.id = su.game_state_id
  WHERE su.id = p_skill_use_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Skill use record not found: %', p_skill_use_id;
  END IF;

  -- 计算触发时间
  IF p_trigger_delay_seconds > 0 THEN
    trigger_time := now() + (p_trigger_delay_seconds || ' seconds')::INTERVAL;
  ELSE
    trigger_time := now();
  END IF;

  -- 添加到效果队列
  INSERT INTO public.skill_effects_queue (
    skill_use_id,
    game_state_id,
    room_id,
    effect_type,
    effect_data,
    priority,
    conditions,
    trigger_time
  ) VALUES (
    p_skill_use_id,
    skill_record.game_state_id,
    skill_record.room_id,
    p_effect_type,
    p_effect_data,
    p_priority,
    p_conditions,
    trigger_time
  ) RETURNING id INTO effect_queue_id;

  RETURN effect_queue_id;
END;
$$;

-- 创建技能效果执行函数
CREATE OR REPLACE FUNCTION public.process_skill_effects(
  p_game_state_id UUID
) RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  effect_record RECORD;
  processed_count INTEGER := 0;
BEGIN
  -- 处理所有准备执行的技能效果
  FOR effect_record IN
    SELECT *
    FROM public.skill_effects_queue
    WHERE game_state_id = p_game_state_id
      AND status = 'queued'
      AND (trigger_time IS NULL OR trigger_time <= now())
    ORDER BY priority ASC, execution_order ASC, created_at ASC
  LOOP
    -- 标记为处理中
    UPDATE public.skill_effects_queue
    SET status = 'processing', updated_at = now()
    WHERE id = effect_record.id;

    -- 根据效果类型执行不同逻辑
    CASE effect_record.effect_type
      WHEN 'status_change' THEN
        PERFORM public.apply_status_effect(effect_record.id);
      WHEN 'elimination' THEN
        PERFORM public.apply_elimination_effect(effect_record.id);
      WHEN 'protection' THEN
        PERFORM public.apply_protection_effect(effect_record.id);
      WHEN 'investigation' THEN
        PERFORM public.apply_investigation_effect(effect_record.id);
      ELSE
        -- 通用效果处理
        PERFORM public.apply_generic_effect(effect_record.id);
    END CASE;

    -- 标记为完成
    UPDATE public.skill_effects_queue
    SET status = 'completed', processed_at = now(), updated_at = now()
    WHERE id = effect_record.id;

    processed_count := processed_count + 1;
  END LOOP;

  RETURN processed_count;
END;
$$;

-- 创建通用效果应用函数
CREATE OR REPLACE FUNCTION public.apply_generic_effect(
  p_effect_queue_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  effect_record RECORD;
  target_user_id UUID;
BEGIN
  -- 获取效果信息
  SELECT seq.*
  INTO effect_record
  FROM public.skill_effects_queue seq
  WHERE seq.id = p_effect_queue_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- 获取目标用户ID
  SELECT su.target_user_id 
  INTO target_user_id
  FROM public.skill_uses su
  WHERE su.id = effect_record.skill_use_id;

  -- 创建技能目标记录
  INSERT INTO public.skill_targets (
    skill_use_id,
    skill_effects_queue_id,
    target_user_id,
    target_type,
    effect_applied
  ) VALUES (
    effect_record.skill_use_id,
    p_effect_queue_id,
    target_user_id,
    COALESCE(effect_record.effect_data->>'target_type', 'player'),
    effect_record.effect_data
  );

  RETURN true;
END;
$$;

-- 创建状态效果应用函数
CREATE OR REPLACE FUNCTION public.apply_status_effect(
  p_effect_queue_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  effect_record RECORD;
  target_user_id UUID;
  new_status INTEGER;
  effect_duration INTEGER;
BEGIN
  -- 获取效果信息
  SELECT seq.*
  INTO effect_record
  FROM public.skill_effects_queue seq
  WHERE seq.id = p_effect_queue_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- 获取目标用户ID
  SELECT su.target_user_id 
  INTO target_user_id
  FROM public.skill_uses su
  WHERE su.id = effect_record.skill_use_id;

  -- 获取目标状态和持续时间
  new_status := (effect_record.effect_data->>'new_status')::INTEGER;
  effect_duration := COALESCE((effect_record.effect_data->>'duration_seconds')::INTEGER, 0);

  -- 更新目标角色状态
  UPDATE public.role_states
  SET role_status = new_status, updated_at = now()
  WHERE user_id = target_user_id AND game_state_id = effect_record.game_state_id;

  -- 创建技能目标记录
  INSERT INTO public.skill_targets (
    skill_use_id,
    skill_effects_queue_id,
    target_user_id,
    target_type,
    effect_applied,
    effect_duration,
    effect_end_time
  ) VALUES (
    effect_record.skill_use_id,
    p_effect_queue_id,
    target_user_id,
    'status_change',
    effect_record.effect_data,
    effect_duration,
    CASE WHEN effect_duration > 0 THEN now() + (effect_duration || ' seconds')::INTERVAL ELSE NULL END
  );

  RETURN true;
END;
$$;

-- 创建淘汰效果应用函数
CREATE OR REPLACE FUNCTION public.apply_elimination_effect(
  p_effect_queue_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  effect_record RECORD;
  target_user_id UUID;
BEGIN
  -- 获取效果信息
  SELECT seq.*
  INTO effect_record
  FROM public.skill_effects_queue seq
  WHERE seq.id = p_effect_queue_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- 获取目标用户ID
  SELECT su.target_user_id 
  INTO target_user_id
  FROM public.skill_uses su
  WHERE su.id = effect_record.skill_use_id;

  -- 更新目标角色状态为淘汰
  UPDATE public.role_states
  SET role_status = 4, updated_at = now() -- 4 = 淘汰状态
  WHERE user_id = target_user_id AND game_state_id = effect_record.game_state_id;

  -- 创建技能目标记录
  INSERT INTO public.skill_targets (
    skill_use_id,
    skill_effects_queue_id,
    target_user_id,
    target_type,
    effect_applied
  ) VALUES (
    effect_record.skill_use_id,
    p_effect_queue_id,
    target_user_id,
    'elimination',
    effect_record.effect_data
  );

  RETURN true;
END;
$$;

-- 创建保护效果应用函数
CREATE OR REPLACE FUNCTION public.apply_protection_effect(
  p_effect_queue_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  effect_record RECORD;
  target_user_id UUID;
  effect_duration INTEGER;
BEGIN
  -- 获取效果信息
  SELECT seq.*
  INTO effect_record
  FROM public.skill_effects_queue seq
  WHERE seq.id = p_effect_queue_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- 获取目标用户ID
  SELECT su.target_user_id 
  INTO target_user_id
  FROM public.skill_uses su
  WHERE su.id = effect_record.skill_use_id;

  effect_duration := COALESCE((effect_record.effect_data->>'duration_seconds')::INTEGER, 86400); -- 默认24小时

  -- 更新目标角色状态效果，添加保护
  UPDATE public.role_states
  SET 
    status_effects = status_effects || jsonb_build_object(
      'protected', true,
      'protection_end_time', (now() + (effect_duration || ' seconds')::INTERVAL)::text
    ),
    updated_at = now()
  WHERE user_id = target_user_id AND game_state_id = effect_record.game_state_id;

  -- 创建技能目标记录
  INSERT INTO public.skill_targets (
    skill_use_id,
    skill_effects_queue_id,
    target_user_id,
    target_type,
    effect_applied,
    effect_duration,
    effect_end_time
  ) VALUES (
    effect_record.skill_use_id,
    p_effect_queue_id,
    target_user_id,
    'protection',
    effect_record.effect_data,
    effect_duration,
    now() + (effect_duration || ' seconds')::INTERVAL
  );

  RETURN true;
END;
$$;

-- 创建调查效果应用函数
CREATE OR REPLACE FUNCTION public.apply_investigation_effect(
  p_effect_queue_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  effect_record RECORD;
  target_user_id UUID;
  investigator_user_id UUID;
  target_role_info JSONB;
BEGIN
  -- 获取效果信息
  SELECT seq.*
  INTO effect_record
  FROM public.skill_effects_queue seq
  WHERE seq.id = p_effect_queue_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- 获取目标用户ID和调查者ID
  SELECT su.target_user_id, su.user_id
  INTO target_user_id, investigator_user_id
  FROM public.skill_uses su
  WHERE su.id = effect_record.skill_use_id;

  -- 获取目标角色信息
  SELECT jsonb_build_object(
    'role_name', rd.role_name,
    'faction', rd.faction,
    'role_status', rs.role_status
  ) INTO target_role_info
  FROM public.role_states rs
  JOIN public.role_design rd ON rd.id = rs.role_id
  WHERE rs.user_id = target_user_id AND rs.game_state_id = effect_record.game_state_id;

  -- 创建技能目标记录，包含调查结果
  INSERT INTO public.skill_targets (
    skill_use_id,
    skill_effects_queue_id,
    target_user_id,
    target_type,
    effect_applied
  ) VALUES (
    effect_record.skill_use_id,
    p_effect_queue_id,
    target_user_id,
    'investigation',
    effect_record.effect_data || jsonb_build_object('investigation_result', target_role_info)
  );

  RETURN true;
END;
$$;

-- 创建自动清理过期效果的函数
CREATE OR REPLACE FUNCTION public.cleanup_expired_skill_effects()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  -- 清理过期的技能目标效果
  UPDATE public.skill_targets
  SET is_active = false, updated_at = now()
  WHERE is_active = true
    AND effect_end_time IS NOT NULL
    AND effect_end_time < now();

  -- 取消过期的排队效果
  UPDATE public.skill_effects_queue
  SET status = 'cancelled', updated_at = now()
  WHERE status = 'queued'
    AND expires_at IS NOT NULL
    AND expires_at < now();
END;
$$;

-- 创建技能冲突检测函数
CREATE OR REPLACE FUNCTION public.detect_skill_conflicts(
  p_game_state_id UUID,
  p_round_number INTEGER,
  p_phase TEXT
) RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  conflict_id UUID;
  conflicting_skills JSONB;
  resolution_rule TEXT := 'priority';
  resolved_skill_id UUID;
BEGIN
  -- 检查同一回合同一阶段是否有冲突技能
  SELECT json_agg(
    json_build_object(
      'skill_use_id', id,
      'user_id', user_id,
      'skill_name', skill_name,
      'priority', skill_priority,
      'target_user_id', target_user_id
    )
  ) INTO conflicting_skills
  FROM public.skill_uses
  WHERE game_state_id = p_game_state_id
    AND round_number = p_round_number
    AND phase = p_phase
    AND execution_status = 'pending';

  -- 如果有多个技能，检测冲突
  IF json_array_length(conflicting_skills) > 1 THEN
    -- 按优先级解决冲突（数字越小优先级越高）
    SELECT (skill_data->>'skill_use_id')::UUID INTO resolved_skill_id
    FROM json_array_elements(conflicting_skills) AS skill_data
    ORDER BY (skill_data->>'priority')::INTEGER ASC
    LIMIT 1;

    -- 记录冲突解决
    INSERT INTO public.skill_conflicts (
      game_state_id,
      round_number,
      phase,
      conflicting_skills,
      resolution_rule,
      resolved_skill_id
    ) VALUES (
      p_game_state_id,
      p_round_number,
      p_phase,
      conflicting_skills,
      resolution_rule,
      resolved_skill_id
    ) RETURNING id INTO conflict_id;

    -- 取消其他技能
    UPDATE public.skill_uses
    SET execution_status = 'cancelled', updated_at = now()
    WHERE game_state_id = p_game_state_id
      AND round_number = p_round_number
      AND phase = p_phase
      AND execution_status = 'pending'
      AND id != resolved_skill_id;
  END IF;

  RETURN conflict_id;
END;
$$;
