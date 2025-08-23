-- 修复 use_skill RPC 函数的安全漏洞
-- 移除外部传入的 p_user_id 参数，强制使用 auth.uid()

DROP FUNCTION IF EXISTS public.use_skill(uuid, uuid, text, uuid, jsonb);

CREATE OR REPLACE FUNCTION public.use_skill(
  p_game_state_id uuid,
  p_skill_name text,
  p_target_user_id uuid DEFAULT NULL,
  p_skill_data jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
DECLARE
  skill_use_id UUID;
  role_state_record RECORD;
  skill_effects_data JSONB;
  current_round INTEGER;
  current_phase_num INTEGER;
  current_phase_name TEXT;
  skill_priority INTEGER;
  v_user_id UUID;
BEGIN
  -- 强制使用当前认证用户的 ID
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not authenticated';
  END IF;

  -- 验证用户是否为该游戏状态的参与者
  IF NOT EXISTS (
    SELECT 1 FROM public.role_states rs
    JOIN public.game_states gs ON gs.id = rs.game_state_id
    WHERE rs.user_id = v_user_id 
      AND rs.game_state_id = p_game_state_id
      AND is_room_participant(gs.room_id, v_user_id)
  ) THEN
    RAISE EXCEPTION 'User is not a participant in this game';
  END IF;

  -- 获取角色状态
  SELECT * INTO role_state_record
  FROM public.role_states rs
  WHERE rs.user_id = v_user_id AND rs.game_state_id = p_game_state_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Role state not found for user % in game %', v_user_id, p_game_state_id;
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

  -- 将整数阶段转换为文本名称（为了兼容性）
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
    v_user_id,
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
$function$;

-- 添加必要的复合索引优化查询性能
CREATE INDEX IF NOT EXISTS idx_skill_uses_game_round_status 
ON public.skill_uses (game_state_id, round_number, execution_status);

-- 为 effect_applied JSONB 字段添加 GIN 索引
CREATE INDEX IF NOT EXISTS idx_skill_targets_effect_applied_gin 
ON public.skill_targets USING GIN (effect_applied);

-- 添加外键约束保证数据一致性
ALTER TABLE public.skill_effects_queue 
ADD CONSTRAINT fk_skill_effects_queue_skill_use_id 
FOREIGN KEY (skill_use_id) REFERENCES public.skill_uses(id) ON DELETE CASCADE;

ALTER TABLE public.skill_effects_queue 
ADD CONSTRAINT fk_skill_effects_queue_game_state_id 
FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) ON DELETE CASCADE;

ALTER TABLE public.skill_targets 
ADD CONSTRAINT fk_skill_targets_skill_use_id 
FOREIGN KEY (skill_use_id) REFERENCES public.skill_uses(id) ON DELETE CASCADE;

-- 添加枚举约束
ALTER TABLE public.skill_effects_queue 
ADD CONSTRAINT chk_skill_effects_queue_status 
CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'cancelled'));

ALTER TABLE public.skill_uses 
ADD CONSTRAINT chk_skill_uses_execution_status 
CHECK (execution_status IN ('pending', 'processing', 'completed', 'failed', 'cancelled'));

ALTER TABLE public.skill_uses 
ADD CONSTRAINT chk_skill_uses_phase 
CHECK (phase IN ('day', 'evening', 'night', 'dawn'));

-- 为 effect_applied 添加结构约束（简化版）
ALTER TABLE public.skill_targets 
ADD CONSTRAINT chk_skill_targets_effect_applied_structure 
CHECK (
  effect_applied IS NULL OR 
  (effect_applied ? 'effect_type' OR effect_applied ? 'type')
);