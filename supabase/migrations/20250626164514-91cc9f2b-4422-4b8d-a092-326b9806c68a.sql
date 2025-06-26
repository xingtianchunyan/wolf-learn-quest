
-- 先删除现有的函数，然后重新创建
DROP FUNCTION IF EXISTS public.advance_game_phase(uuid);
DROP FUNCTION IF EXISTS public.get_phase_duration(uuid, text);
DROP FUNCTION IF EXISTS public.get_phase_duration(uuid, integer);

-- 重新创建修复后的阶段切换函数，使用整数类型的阶段值
CREATE OR REPLACE FUNCTION public.advance_game_phase(p_room_id uuid)
 RETURNS TABLE(new_phase integer, new_round integer, phase_end_time timestamp with time zone)
 LANGUAGE plpgsql
AS $$
DECLARE
  current_state RECORD;
  next_phase INTEGER;
  next_round INTEGER;
  phase_duration INTEGER;
  end_time TIMESTAMP WITH TIME ZONE;
  settings RECORD;
  phase_name TEXT;
BEGIN
  -- Get current game state
  SELECT * INTO current_state 
  FROM public.game_states 
  WHERE room_id = p_room_id AND status = 'active';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No active game found for room %', p_room_id;
  END IF;
  
  -- Get game settings
  SELECT * INTO settings
  FROM public.game_settings
  WHERE room_id = p_room_id;
  
  -- Determine next phase (using integer values)
  CASE current_state.current_phase
    WHEN 1 THEN  -- day -> evening
      next_phase := 2;
      next_round := current_state.current_round;
      phase_name := 'evening';
    WHEN 2 THEN  -- evening -> night
      next_phase := 3;
      next_round := current_state.current_round;
      phase_name := 'night';
    WHEN 3 THEN  -- night -> dawn
      next_phase := 4;
      next_round := current_state.current_round;
      phase_name := 'dawn';
    WHEN 4 THEN  -- dawn -> day (next round)
      next_phase := 1;
      next_round := current_state.current_round + 1;
      phase_name := 'day';
    ELSE 
      next_phase := 1;
      next_round := current_state.current_round;
      phase_name := 'day';
  END CASE;
  
  -- Get phase duration
  CASE next_phase
    WHEN 1 THEN phase_duration := COALESCE(settings.day_duration, 300);
    WHEN 2 THEN phase_duration := COALESCE(settings.evening_duration, 40);
    WHEN 3 THEN phase_duration := COALESCE(settings.night_duration, 180);
    WHEN 4 THEN phase_duration := COALESCE(settings.dawn_duration, 40);
    ELSE phase_duration := 300;
  END CASE;
  
  -- Calculate end time (only if auto-advance is enabled for day/night phases)
  IF COALESCE(settings.is_auto_advance, true) OR next_phase IN (2, 4) THEN -- evening, dawn always auto
    end_time := now() + (phase_duration || ' seconds')::INTERVAL;
  ELSE
    end_time := NULL; -- No time limit for manual phases
  END IF;
  
  -- Record current phase end
  INSERT INTO public.game_phase_history (
    game_state_id, 
    phase, 
    round_number, 
    started_at, 
    ended_at, 
    duration_seconds
  ) VALUES (
    current_state.id,
    current_state.current_phase::text, -- Convert to text for history
    current_state.current_round,
    current_state.phase_start_time,
    now(),
    EXTRACT(EPOCH FROM (now() - current_state.phase_start_time))::INTEGER
  );
  
  -- Update game state to next phase
  UPDATE public.game_states 
  SET 
    current_phase = next_phase,
    current_round = next_round,
    phase_start_time = now(),
    phase_end_time = end_time,
    is_paused = false,
    total_paused_duration = 0,
    phase_duration = phase_duration,
    auto_advance = COALESCE(settings.is_auto_advance, true)
  WHERE id = current_state.id;
  
  RETURN QUERY SELECT next_phase, next_round, end_time;
END;
$$;

-- 重新创建修复后的获取阶段持续时间函数
CREATE OR REPLACE FUNCTION public.get_phase_duration(p_room_id uuid, p_phase integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $$
DECLARE
  duration INTEGER;
BEGIN
  SELECT 
    CASE p_phase
      WHEN 1 THEN day_duration      -- day
      WHEN 2 THEN evening_duration  -- evening
      WHEN 3 THEN night_duration    -- night
      WHEN 4 THEN dawn_duration     -- dawn
      ELSE 300
    END
  INTO duration
  FROM public.game_settings
  WHERE room_id = p_room_id;
  
  RETURN COALESCE(duration, 300);
END;
$$;

-- 重新创建修复后的技能使用函数
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
