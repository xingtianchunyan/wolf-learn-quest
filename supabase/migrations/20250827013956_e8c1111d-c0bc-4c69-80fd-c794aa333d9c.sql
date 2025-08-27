-- 增强use_skill函数，确保同步到所有相关表
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
    phase_name,
    skill_priority,
    COALESCE(p_skill_data, '{}'::jsonb),
    p_skill_data,
    'pending'
  ) RETURNING id INTO skill_use_id;

  -- 立即将技能效果加入队列
  SELECT public.queue_skill_effect(
    skill_use_id,
    CASE 
      WHEN p_skill_name = 'night_attack' THEN 'elimination'
      WHEN p_skill_name = 'prophecy' THEN 'investigation'
      WHEN p_skill_name = 'magic_potion' THEN 'protection'
      WHEN p_skill_name = 'vigil' THEN 'protection'
      WHEN p_skill_name = 'self_destruct' THEN 'elimination'
      WHEN p_skill_name = 'dying_shot' THEN 'elimination'
      ELSE 'status_change'
    END,
    p_skill_data || jsonb_build_object(
      'target_type', CASE WHEN p_target_user_id IS NOT NULL THEN 'single' ELSE 'none' END,
      'effect_type', CASE 
        WHEN p_skill_name = 'night_attack' THEN 'elimination'
        WHEN p_skill_name = 'prophecy' THEN 'investigation'
        WHEN p_skill_name = 'magic_potion' THEN 'protection'
        WHEN p_skill_name = 'vigil' THEN 'protection'
        WHEN p_skill_name = 'self_destruct' THEN 'elimination'
        WHEN p_skill_name = 'dying_shot' THEN 'elimination'
        ELSE 'passive'
      END
    ),
    skill_priority,
    '{}'::jsonb,
    0 -- 立即触发
  ) INTO effect_queue_id;

  -- 立即处理非竞争性技能效果（如被动技能、立即生效的技能）
  IF p_skill_name IN ('Sleep', 'vigil', 'prophecy') THEN
    PERFORM public.apply_generic_effect(effect_queue_id);
  END IF;

  -- 扣减技能使用次数（如果适用）
  PERFORM public.use_skill_charge((
    SELECT id FROM public.role_states 
    WHERE user_id = v_user_id AND game_state_id = p_game_state_id
  ));

  RETURN skill_use_id;
END;
$function$;

-- 修改原始use_skill函数调用增强版本
CREATE OR REPLACE FUNCTION public.use_skill(
  p_game_state_id uuid, 
  p_skill_name text, 
  p_target_user_id uuid DEFAULT NULL::uuid, 
  p_skill_data jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT public.use_skill_enhanced(p_game_state_id, p_skill_name, p_target_user_id, p_skill_data);
$function$;

-- 为skill_uses表添加触发器，自动处理系统公告
CREATE OR REPLACE FUNCTION public.handle_skill_use_announcement()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
DECLARE
  v_room_id uuid;
  v_user_name text;
  v_role_name text;
  v_target_name text;
  v_target_role text;
  v_skill_chinese_name text;
  v_skill_type text;
BEGIN
  -- 获取房间ID
  SELECT room_id INTO v_room_id
  FROM public.game_states
  WHERE id = NEW.game_state_id;

  -- 获取使用者信息
  SELECT u.player_name, rd.role_name
  INTO v_user_name, v_role_name
  FROM public.users u
  JOIN public.role_states rs ON rs.user_id = u.user_id
  JOIN public.role_design rd ON rd.id = rs.role_id
  WHERE u.user_id = NEW.user_id 
    AND rs.game_state_id = NEW.game_state_id;

  -- 获取目标信息（如果有）
  IF NEW.target_user_id IS NOT NULL THEN
    SELECT u.player_name, rd.role_name
    INTO v_target_name, v_target_role
    FROM public.users u
    JOIN public.role_states rs ON rs.user_id = u.user_id
    JOIN public.role_design rd ON rd.id = rs.role_id
    WHERE u.user_id = NEW.target_user_id 
      AND rs.game_state_id = NEW.game_state_id;
  END IF;

  -- 获取技能中文名和类型
  v_skill_chinese_name := COALESCE(NEW.skill_effects->>'chinese_name', NEW.skill_name);
  v_skill_type := CASE 
    WHEN NEW.skill_name = 'night_attack' THEN '攻击'
    WHEN NEW.skill_name = 'prophecy' THEN '占卜'
    WHEN NEW.skill_name = 'magic_potion' THEN '药剂'
    WHEN NEW.skill_name = 'vigil' THEN '守护'
    WHEN NEW.skill_name = 'self_destruct' THEN '自爆'
    WHEN NEW.skill_name = 'dying_shot' THEN '击毙'
    ELSE '技能'
  END;

  -- 插入系统公告消息
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
      WHEN NEW.target_user_id IS NOT NULL THEN
        format('%s-%s，使用%s-%s，目标%s-%s', 
          v_user_name, v_role_name, v_skill_chinese_name, v_skill_type, v_target_name, v_target_role)
      ELSE
        format('%s-%s，使用%s-%s', 
          v_user_name, v_role_name, v_skill_chinese_name, v_skill_type)
    END,
    'system',
    NEW.round_number,
    NEW.phase
  );

  RETURN NEW;
END;
$function$;

-- 创建触发器
DROP TRIGGER IF EXISTS trigger_skill_use_announcement ON public.skill_uses;
CREATE TRIGGER trigger_skill_use_announcement
  AFTER INSERT ON public.skill_uses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_skill_use_announcement();

-- 为standardized_skill_targets表添加触发器处理状态变更公告
CREATE OR REPLACE FUNCTION public.handle_skill_effect_announcement()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
DECLARE
  v_room_id uuid;
  v_target_name text;
  v_target_role text;
  v_skill_name text;
  v_skill_type text;
  v_effect_type text;
  v_round_number integer;
  v_phase text;
BEGIN
  -- 只处理新插入的记录
  IF TG_OP = 'INSERT' THEN
    -- 获取相关信息
    SELECT gs.room_id, su.round_number, su.phase, su.skill_name
    INTO v_room_id, v_round_number, v_phase, v_skill_name
    FROM public.skill_uses su
    JOIN public.game_states gs ON gs.id = su.game_state_id
    WHERE su.id = NEW.skill_use_id;

    -- 获取目标信息
    IF NEW.target_user_id IS NOT NULL THEN
      SELECT u.player_name, rd.role_name
      INTO v_target_name, v_target_role
      FROM public.users u
      JOIN public.role_states rs ON rs.user_id = u.user_id
      JOIN public.role_design rd ON rd.id = rs.role_id
      WHERE u.user_id = NEW.target_user_id;
    END IF;

    -- 获取效果类型
    v_effect_type := NEW.effect_applied->>'effect_type';
    v_skill_type := CASE 
      WHEN v_skill_name = 'night_attack' THEN '攻击'
      WHEN v_skill_name = 'prophecy' THEN '占卜'
      WHEN v_skill_name = 'magic_potion' THEN '药剂'
      WHEN v_skill_name = 'vigil' THEN '守护'
      ELSE '技能'
    END;

    -- 只对重要的效果类型发送公告
    IF v_effect_type IN ('elimination', 'protection', 'investigation') AND NEW.target_user_id IS NOT NULL THEN
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
        format('%s-%s，受到%s-%s效果影响', 
          v_target_name, v_target_role, v_skill_name, v_skill_type),
        'system',
        v_round_number,
        v_phase
      );
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- 创建触发器
DROP TRIGGER IF EXISTS trigger_skill_effect_announcement ON public.standardized_skill_targets;
CREATE TRIGGER trigger_skill_effect_announcement
  AFTER INSERT ON public.standardized_skill_targets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_skill_effect_announcement();