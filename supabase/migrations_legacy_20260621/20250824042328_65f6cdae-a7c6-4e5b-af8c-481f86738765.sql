-- Fix skill system by creating missing database functions and improving existing ones

-- 1. Create the missing use_skill RPC function
CREATE OR REPLACE FUNCTION public.use_skill(
  p_game_state_id uuid,
  p_skill_name text,
  p_target_user_id uuid DEFAULT NULL,
  p_skill_data jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  skill_use_id UUID;
  role_state_record RECORD;
  current_round INTEGER;
  current_phase_num INTEGER;
  skill_priority INTEGER;
  v_user_id UUID;
  v_room_id UUID;
BEGIN
  -- 使用当前认证用户的 ID，忽略外部传入的参数
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not authenticated';
  END IF;

  -- 获取房间ID
  SELECT room_id INTO v_room_id
  FROM public.game_states
  WHERE id = p_game_state_id;

  IF v_room_id IS NULL THEN
    RAISE EXCEPTION 'Game state not found';
  END IF;

  -- 验证用户是否为该游戏的参与者
  IF NOT public.is_room_participant(v_room_id, v_user_id) THEN
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

  -- 获取技能优先级
  skill_priority := COALESCE((p_skill_data->>'priority')::INTEGER, 100);

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
    result,
    execution_status
  ) VALUES (
    v_user_id,
    p_game_state_id,
    p_skill_name,
    p_target_user_id,
    current_round,
    CASE current_phase_num
      WHEN 1 THEN 'day'
      WHEN 2 THEN 'evening'
      WHEN 3 THEN 'night'
      WHEN 4 THEN 'dawn'
      ELSE 'day'
    END,
    skill_priority,
    COALESCE(p_skill_data, '{}'::jsonb),
    p_skill_data,
    'pending'
  ) RETURNING id INTO skill_use_id;

  -- 扣减技能使用次数（如果适用）
  PERFORM public.use_skill_charge(role_state_record.id);

  RETURN skill_use_id;
END;
$function$;

-- 2. Ensure is_room_participant function exists and works correctly
CREATE OR REPLACE FUNCTION public.is_room_participant(p_room_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  RETURN (
    -- 检查用户是否是房间中的玩家
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id = p_room_id AND rp.user_id = p_user_id
    )
    OR
    -- 检查用户是否是房间的法官
    EXISTS (
      SELECT 1 FROM public.rooms r
      WHERE r.id = p_room_id AND r.judge_user_id = p_user_id
    )
  );
END;
$function$;

-- 3. Create missing use_skill_charge function
CREATE OR REPLACE FUNCTION public.use_skill_charge(p_role_state_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
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
  SET skill_uses_remaining = current_skill_uses, updated_at = now()
  WHERE id = p_role_state_id;
  
  RETURN true;
END;
$function$;

-- 4. Create missing can_use_skill function
CREATE OR REPLACE FUNCTION public.can_use_skill(p_role_state_id uuid)
RETURNS boolean
LANGUAGE plpgsql
AS $function$
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
$function$;

-- 5. Create missing initialize_skill_uses_remaining function
CREATE OR REPLACE FUNCTION public.initialize_skill_uses_remaining(p_role_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
AS $function$
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
$function$;

-- 6. Create missing initialize_status_effects function
CREATE OR REPLACE FUNCTION public.initialize_status_effects(p_role_status integer)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
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
$function$;