-- 修复 use_skill_enhanced 函数的语法错误

CREATE OR REPLACE FUNCTION public.use_skill_enhanced(
    p_game_state_id uuid,
    p_skill_name text,
    p_target_user_id uuid DEFAULT NULL::uuid,
    p_skill_data jsonb DEFAULT '{}'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  skill_use_id UUID;
  v_user_id UUID;
  v_room_id UUID;
  current_round INTEGER;
  current_phase_num INTEGER;
  validation_result jsonb;
  skill_priority INTEGER := 100;
  phase_name TEXT;
  effect_queue_id UUID;
BEGIN
  -- 使用当前认证用户的 ID
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not authenticated';
  END IF;

  -- 获取游戏信息
  SELECT gs.current_round, gs.current_phase, gs.room_id
  INTO current_round, current_phase_num, v_room_id
  FROM public.game_states gs
  WHERE gs.id = p_game_state_id;

  IF v_room_id IS NULL THEN
    RAISE EXCEPTION 'Game state not found';
  END IF;

  -- 验证用户是否为该游戏的参与者
  IF NOT public.is_room_participant(v_room_id, v_user_id) THEN
    RAISE EXCEPTION 'User is not a participant in this game';
  END IF;

  -- 使用统一验证函数
  SELECT public.validate_skill_usage_unified(
    p_skill_name,
    v_user_id,
    p_game_state_id,
    current_phase_num,
    p_skill_data || jsonb_build_object('targetUserId', p_target_user_id)
  ) INTO validation_result;
  
  -- 检查验证结果
  IF NOT (validation_result->>'valid')::boolean THEN
    RAISE EXCEPTION '%', validation_result->>'reason';
  END IF;

  -- 设置技能优先级
  skill_priority := CASE p_skill_name
    WHEN 'Sleep' THEN 1
    WHEN 'vigil' THEN 2
    WHEN 'guard_protection' THEN 2
    WHEN 'werewolf_attack' THEN 3
    WHEN 'night_attack' THEN 3
    WHEN 'prophecy' THEN 4
    WHEN 'seer_divination' THEN 4
    WHEN 'demon_eye' THEN 5
    WHEN 'magic_potion' THEN 6
    WHEN 'voodoo' THEN 7
    WHEN 'self_destruct' THEN 8
    WHEN 'hunter_revenge' THEN 9
    WHEN 'dying_shot' THEN 9
    ELSE 100
  END;

  -- 转换阶段数字为名称
  phase_name := CASE current_phase_num
    WHEN 1 THEN 'day'
    WHEN 2 THEN 'evening'
    WHEN 3 THEN 'night'
    WHEN 4 THEN 'dawn'
    ELSE 'day'
  END;

  -- 插入技能使用记录
  INSERT INTO public.skill_uses (
    game_state_id,
    user_id,
    skill_name,
    target_user_id,
    round_number,
    phase,
    skill_priority,
    skill_effects,
    execution_status
  ) VALUES (
    p_game_state_id,
    v_user_id,
    p_skill_name,
    p_target_user_id,
    current_round,
    phase_name,
    skill_priority,
    p_skill_data,
    'pending'
  ) RETURNING id INTO skill_use_id;

  -- 为技能创建效果队列记录
  INSERT INTO public.skill_effects_queue (
    game_state_id,
    room_id,
    skill_use_id,
    effect_type,
    effect_data,
    priority,
    status
  ) VALUES (
    p_game_state_id,
    v_room_id,
    skill_use_id,
    CASE 
      WHEN p_skill_name IN ('werewolf_attack', 'night_attack', 'voodoo', 'self_destruct') THEN 'elimination'
      WHEN p_skill_name IN ('vigil', 'guard_protection') THEN 'protection'
      WHEN p_skill_name IN ('prophecy', 'seer_divination', 'demon_eye') THEN 'investigation'
      WHEN p_skill_name = 'magic_potion' THEN 
        CASE WHEN p_skill_data->>'potionType' = 'attack' THEN 'elimination' ELSE 'protection' END
      ELSE 'passive'
    END,
    jsonb_build_object(
      'skill_name', p_skill_name,
      'target_user_id', p_target_user_id,
      'skill_data', p_skill_data,
      'effect_type', CASE 
        WHEN p_skill_name IN ('werewolf_attack', 'night_attack', 'voodoo', 'self_destruct') THEN 'elimination'
        WHEN p_skill_name IN ('vigil', 'guard_protection') THEN 'protection'
        WHEN p_skill_name IN ('prophecy', 'seer_divination', 'demon_eye') THEN 'investigation'
        WHEN p_skill_name = 'magic_potion' THEN 
          CASE WHEN p_skill_data->>'potionType' = 'attack' THEN 'elimination' ELSE 'protection' END
        ELSE 'passive'
      END
    ),
    skill_priority,
    'queued'
  ) RETURNING id INTO effect_queue_id;

  RETURN skill_use_id;
END;
$function$;