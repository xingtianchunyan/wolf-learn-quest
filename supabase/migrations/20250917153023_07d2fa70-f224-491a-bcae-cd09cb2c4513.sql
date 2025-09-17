-- 修复 use_skill_enhanced 函数中的 users 表访问问题
CREATE OR REPLACE FUNCTION public.use_skill_enhanced(
    p_game_state_id uuid,
    p_skill_name text,
    p_target_user_id uuid DEFAULT NULL::uuid,
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
  effect_queue_id UUID;
  phase_name TEXT;
  user_display_name TEXT;
BEGIN
  -- 使用当前认证用户的 ID
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

  -- 安全地获取用户显示名称
  SELECT COALESCE(player_name, '玩家') INTO user_display_name
  FROM public.get_public_user_profile(v_user_id);

  -- 获取游戏信息
  SELECT gs.current_round, gs.current_phase 
  INTO current_round, current_phase_num
  FROM public.game_states gs
  WHERE gs.id = p_game_state_id;

  -- 转换阶段数字为名称
  CASE current_phase_num
    WHEN 1 THEN phase_name := 'day';
    WHEN 2 THEN phase_name := 'evening';
    WHEN 3 THEN phase_name := 'night';
    WHEN 4 THEN phase_name := 'dawn';
    ELSE phase_name := 'day';
  END CASE;

  -- 获取技能优先级
  skill_priority := COALESCE((p_skill_data->>'priority')::INTEGER, 100);

  -- 创建技能使用记录，包含女巫魔药的特殊信息
  INSERT INTO public.skill_uses (
    user_id,
    game_state_id,
    skill_name,
    target_user_id,
    round_number,
    phase,
    skill_priority,
    skill_effects,
    conditions_met,
    execution_status
  ) VALUES (
    v_user_id,
    p_game_state_id,
    p_skill_name,
    p_target_user_id,
    current_round,
    phase_name,
    skill_priority,
    p_skill_data,
    jsonb_build_object(
      'phase_valid', true,
      'target_valid', CASE 
        WHEN p_target_user_id IS NULL THEN true 
        ELSE EXISTS (
          SELECT 1 FROM public.role_states rs 
          WHERE rs.user_id = p_target_user_id 
            AND rs.game_state_id = p_game_state_id 
            AND rs.role_status != 4
        )
      END
    ),
    'pending'
  ) RETURNING id INTO skill_use_id;

  -- 为技能效果创建队列条目
  INSERT INTO public.skill_effects_queue (
    skill_use_id,
    game_state_id,
    room_id,
    effect_type,
    effect_data,
    priority,
    status
  ) VALUES (
    skill_use_id,
    p_game_state_id,
    v_room_id,
    COALESCE(p_skill_data->>'effectType', 'generic'),
    jsonb_build_object(
      'skill_name', p_skill_name,
      'user_id', v_user_id,
      'target_user_id', p_target_user_id,
      'skill_data', p_skill_data,
      'potion_type', p_skill_data->>'potionType'
    ),
    skill_priority,
    'queued'
  ) RETURNING id INTO effect_queue_id;

  -- 为技能目标创建标准化记录
  IF p_target_user_id IS NOT NULL OR p_skill_name = 'magic_potion' THEN
    INSERT INTO public.standardized_skill_targets (
      skill_use_id,
      skill_effects_queue_id,
      target_user_id,
      target_type,
      effect_applied,
      effect_duration,
      effect_start_time,
      is_active
    ) VALUES (
      skill_use_id,
      effect_queue_id,
      COALESCE(p_target_user_id, v_user_id), -- 女巫保护魔药可能没有目标
      CASE 
        WHEN p_skill_data->>'potionType' = 'protection' THEN 'protection'
        WHEN p_skill_data->>'potionType' = 'attack' THEN 'elimination'
        ELSE COALESCE(p_skill_data->>'effectType', 'generic')
      END,
      jsonb_build_object(
        'effect_type', COALESCE(p_skill_data->>'effectType', 'generic'),
        'skill_name', p_skill_name,
        'potion_type', p_skill_data->>'potionType',
        'applied_at', now(),
        'source_user_id', v_user_id
      ),
      CASE 
        WHEN p_skill_name = 'magic_potion' THEN NULL -- 女巫魔药立即生效
        ELSE 3600 -- 其他技能默认1小时
      END,
      now(),
      true
    );
  END IF;

  -- 插入系统公告到聊天，修复用户名称获取问题
  INSERT INTO public.chat_messages (
    room_id,
    sender_id,
    message,
    chat_type,
    game_round,
    game_phase
  ) VALUES (
    v_room_id,
    NULL, -- 系统消息
    CASE 
      WHEN p_skill_name = 'magic_potion' AND p_skill_data->>'potionType' = 'protection' THEN
        '女巫使用了保护魔药'
      WHEN p_skill_name = 'magic_potion' AND p_skill_data->>'potionType' = 'attack' THEN
        '女巫使用了攻击魔药'
      ELSE
        format('%s 使用了技能', COALESCE(user_display_name, '玩家'))
    END,
    'system',
    current_round,
    phase_name
  );

  RETURN skill_use_id;
END;
$function$;