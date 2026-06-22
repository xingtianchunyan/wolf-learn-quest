-- Generated from historical cluster dump: db_cluster-16-10-2025@17-00-35.backup.gz
-- Purpose: rebuild the public schema baseline for the new Supabase project without restoring table data.

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
SET check_function_bodies = false;

-- Name: advance_game_phase(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.advance_game_phase(p_room_id uuid) RETURNS TABLE(new_phase integer, new_round integer, phase_end_time timestamp with time zone)
    LANGUAGE plpgsql
    AS $$
DECLARE
  current_state RECORD;
  next_phase INTEGER;
  next_round INTEGER;
  phase_duration_value INTEGER;
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
  
  -- Get phase duration using qualified column names
  CASE next_phase
    WHEN 1 THEN phase_duration_value := COALESCE(settings.day_duration, 300);
    WHEN 2 THEN phase_duration_value := COALESCE(settings.evening_duration, 40);
    WHEN 3 THEN phase_duration_value := COALESCE(settings.night_duration, 180);
    WHEN 4 THEN phase_duration_value := COALESCE(settings.dawn_duration, 40);
    ELSE phase_duration_value := 300;
  END CASE;
  
  -- Calculate end time (only if auto-advance is enabled for day/night phases)
  IF COALESCE(settings.is_auto_advance, true) OR next_phase IN (2, 4) THEN -- evening, dawn always auto
    end_time := now() + (phase_duration_value || ' seconds')::INTERVAL;
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
  
  -- Update game state to next phase using qualified column names
  UPDATE public.game_states 
  SET 
    current_phase = next_phase,
    current_round = next_round,
    phase_start_time = now(),
    phase_end_time = end_time,
    is_paused = false,
    total_paused_duration = 0,
    phase_duration = phase_duration_value,
    auto_advance = COALESCE(settings.is_auto_advance, true)
  WHERE id = current_state.id;
  
  RETURN QUERY SELECT next_phase, next_round, end_time;
END;
$$;



--

-- Name: apply_elimination_effect(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.apply_elimination_effect(p_effect_queue_id uuid) RETURNS boolean
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



--

-- Name: apply_generic_effect(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.apply_generic_effect(p_effect_queue_id uuid) RETURNS boolean
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
DECLARE
  effect_record RECORD;
  target_user_id UUID;
BEGIN
  -- Get effect information
  SELECT seq.*
  INTO effect_record
  FROM public.skill_effects_queue seq
  WHERE seq.id = p_effect_queue_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- Get target user ID
  SELECT su.target_user_id 
  INTO target_user_id
  FROM public.skill_uses su
  WHERE su.id = effect_record.skill_use_id;

  -- Create skill target record in standardized table
  INSERT INTO public.standardized_skill_targets (
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



--

-- Name: apply_investigation_effect(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.apply_investigation_effect(p_effect_queue_id uuid) RETURNS boolean
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



--

-- Name: apply_protection_effect(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.apply_protection_effect(p_effect_queue_id uuid) RETURNS boolean
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



--

-- Name: apply_status_effect(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.apply_status_effect(p_effect_queue_id uuid) RETURNS boolean
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



--

-- Name: auto_eliminate_expired_hunters(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.auto_eliminate_expired_hunters() RETURNS void
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Automatically eliminate timed out hunters
  UPDATE public.role_states
  SET role_status = 4, updated_at = now()
  WHERE role_status = 2 -- Dying status
    AND status_effects->>'is_hunter_revenge' = 'true'
    AND (status_effects->>'hunter_revenge_end_time')::timestamp with time zone < now();
END;
$$;



--

-- Name: calculate_voting_results(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_voting_results(p_voting_session_id uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $$
DECLARE
  total_valid_votes INTEGER;
  vote_record RECORD;
  max_votes INTEGER := 0;
  tied_count INTEGER := 0;
BEGIN
  -- 清除旧的结果
  DELETE FROM public.voting_results WHERE voting_session_id = p_voting_session_id;
  
  -- 计算总有效票数权重
  SELECT COALESCE(SUM(vote_weight), 0) INTO total_valid_votes
  FROM public.votes
  WHERE voting_session_id = p_voting_session_id AND is_valid = true;
  
  -- 统计每个目标的得票权重
  FOR vote_record IN
    SELECT 
      target_id,
      COALESCE(SUM(vote_weight), 0) as vote_count,
      CASE 
        WHEN total_valid_votes > 0 THEN (COALESCE(SUM(vote_weight), 0) * 100.0 / total_valid_votes)
        ELSE 0
      END as percentage
    FROM public.votes
    WHERE voting_session_id = p_voting_session_id 
      AND is_valid = true 
      AND target_id IS NOT NULL
    GROUP BY target_id
  LOOP
    INSERT INTO public.voting_results (
      voting_session_id,
      target_id,
      total_votes,
      vote_percentage
    ) VALUES (
      p_voting_session_id,
      vote_record.target_id,
      vote_record.vote_count,
      vote_record.percentage
    );
    
    -- 记录最高票数
    IF vote_record.vote_count > max_votes THEN
      max_votes := vote_record.vote_count;
    END IF;
  END LOOP;
  
  -- 检查是否有并列最高票
  SELECT COUNT(*) INTO tied_count
  FROM public.voting_results
  WHERE voting_session_id = p_voting_session_id AND total_votes = max_votes;
  
  -- 更新结果状态
  UPDATE public.voting_results
  SET 
    is_majority = (total_votes > total_valid_votes / 2),
    is_tied = (tied_count > 1 AND total_votes = max_votes),
    result_type = CASE
      WHEN tied_count > 1 AND total_votes = max_votes THEN 'tied'
      WHEN total_votes = max_votes AND total_votes > 0 THEN 'eliminated'
      ELSE 'no_result'
    END,
    updated_at = now()
  WHERE voting_session_id = p_voting_session_id;
  
  -- 更新投票会话状态
  UPDATE public.voting_sessions
  SET status = 'completed', end_time = now(), updated_at = now()
  WHERE id = p_voting_session_id;
  
END;
$$;



--

-- Name: can_use_skill(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.can_use_skill(p_role_state_id uuid) RETURNS boolean
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
DECLARE
  current_skill_uses jsonb;
  remaining_uses integer;
  is_unlimited boolean;
BEGIN
  -- Get current skill usage count
  SELECT skill_uses_remaining INTO current_skill_uses
  FROM public.role_states
  WHERE id = p_role_state_id;
  
  -- Check if unlimited usage
  is_unlimited := (current_skill_uses->>'unlimited')::boolean;
  
  IF is_unlimited = true THEN
    RETURN true;
  END IF;
  
  -- Get remaining usage count
  remaining_uses := (current_skill_uses->>'remaining')::integer;
  
  -- Check if there are remaining uses
  RETURN remaining_uses IS NOT NULL AND remaining_uses > 0;
END;
$$;



--

-- Name: cast_vote(uuid, uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cast_vote(p_voting_session_id uuid, p_voter_id uuid, p_target_id uuid DEFAULT NULL::uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  current_user_id UUID;
  session_room_id UUID;
  session_status TEXT;
  voter_can_vote BOOLEAN := false;
  voter_role_status INTEGER;
  voter_status_effects JSONB;
BEGIN
  -- 获取当前用户ID
  current_user_id := auth.uid();
  
  -- 检查用户是否已认证
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required'
      USING ERRCODE = '42501';
  END IF;
  
  -- 检查投票者是否是当前用户
  IF p_voter_id != current_user_id THEN
    RAISE EXCEPTION 'Can only vote for yourself'
      USING ERRCODE = '42501';
  END IF;
  
  -- 获取会话对应的房间ID和状态
  SELECT room_id, status INTO session_room_id, session_status
  FROM voting_sessions
  WHERE id = p_voting_session_id;
  
  IF session_room_id IS NULL THEN
    RAISE EXCEPTION 'Voting session not found'
      USING ERRCODE = '42704';
  END IF;
  
  -- 检查会话状态必须为active
  IF session_status != 'active' THEN
    RAISE EXCEPTION 'Voting session is not active (current status: %)', session_status
      USING ERRCODE = '23503';
  END IF;
  
  -- 检查用户是否是房间参与者
  IF NOT is_room_participant(session_room_id, current_user_id) THEN
    RAISE EXCEPTION 'User is not authorized to vote in this session'
      USING ERRCODE = '42501';
  END IF;
  
  -- 检查投票权限：获取角色状态和状态效果
  SELECT role_status, status_effects 
  INTO voter_role_status, voter_status_effects
  FROM role_states rs
  JOIN game_states gs ON gs.id = rs.game_state_id
  JOIN voting_sessions vs ON vs.game_state_id = gs.id
  WHERE rs.user_id = current_user_id 
    AND vs.id = p_voting_session_id;
  
  -- 检查角色状态是否允许投票
  IF voter_role_status IS NULL THEN
    RAISE EXCEPTION 'Player role state not found'
      USING ERRCODE = '42704';
  END IF;
  
  -- 角色状态检查：1=正常, 3=虚弱 可以投票；2=濒死, 4=淘汰 不能投票
  IF voter_role_status NOT IN (1, 3) THEN
    RAISE EXCEPTION 'Player cannot vote due to role status (status: %)', voter_role_status
      USING ERRCODE = '23503';
  END IF;
  
  -- 状态效果检查：can_vote必须为true
  voter_can_vote := COALESCE((voter_status_effects->>'can_vote')::boolean, true);
  
  IF NOT voter_can_vote THEN
    RAISE EXCEPTION 'Player cannot vote due to status effects'
      USING ERRCODE = '23503';
  END IF;
  
  -- 插入或更新投票
  INSERT INTO votes (
    voting_session_id,
    voter_id,
    target_id,
    vote_time,
    is_valid,
    vote_weight
  ) VALUES (
    p_voting_session_id,
    p_voter_id,
    p_target_id,
    now(),
    true,
    1
  ) ON CONFLICT (voting_session_id, voter_id) DO UPDATE SET
    target_id = EXCLUDED.target_id,
    vote_time = EXCLUDED.vote_time,
    is_valid = EXCLUDED.is_valid;
    
END;
$$;



--

-- Name: check_demon_immunity(uuid, uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_demon_immunity(p_target_user_id uuid, p_attacker_user_id uuid, p_game_state_id uuid) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
    target_role TEXT;
    attacker_role TEXT;
BEGIN
    -- 获取目标角色
    SELECT rd.role_name INTO target_role
    FROM role_states rs
    JOIN role_design rd ON rd.id = rs.role_id
    WHERE rs.user_id = p_target_user_id
      AND rs.game_state_id = p_game_state_id;

    -- 获取攻击者角色  
    SELECT rd.role_name INTO attacker_role
    FROM role_states rs
    JOIN role_design rd ON rd.id = rs.role_id
    WHERE rs.user_id = p_attacker_user_id
      AND rs.game_state_id = p_game_state_id;

    -- 恶魔免疫狼人攻击
    IF target_role = 'demon' AND attacker_role IN ('werewolf', 'whitewolf') THEN
        RETURN true;
    END IF;

    RETURN false;
END;
$$;



--

-- Name: check_multiple_protection(uuid, uuid, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_multiple_protection(p_target_user_id uuid, p_game_state_id uuid, p_round_number integer) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
    protection_count INTEGER;
    protection_sources UUID[];
    result JSON;
BEGIN
    -- 统计当前回合对该目标的保护技能数量
    SELECT 
        COUNT(*),
        array_agg(DISTINCT su.user_id)
    INTO protection_count, protection_sources
    FROM skill_uses su
    WHERE su.game_state_id = p_game_state_id
      AND su.round_number = p_round_number
      AND su.target_user_id = p_target_user_id
      AND su.skill_name IN ('vigil', 'magic_potion')
      AND (su.skill_effects->>'effect_type' = 'protection' OR su.skill_name = 'vigil')
      AND su.execution_status = 'completed';

    -- 检查是否有多重保护
    IF protection_count >= 2 AND array_length(protection_sources, 1) >= 2 THEN
        result := json_build_object(
            'has_multiple_protection', true,
            'protection_count', protection_count,
            'should_eliminate', true,
            'reason', '多重保护导致淘汰'
        );
    ELSE
        result := json_build_object(
            'has_multiple_protection', false,
            'protection_count', protection_count,
            'should_eliminate', false
        );
    END IF;

    RETURN result;
END;
$$;



--

-- Name: check_skill_data_quality(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_skill_data_quality() RETURNS TABLE(issue_type text, issue_count bigint, description text)
    LANGUAGE sql STABLE
    SET search_path TO ''
    AS $$
  -- 检查缺少 effect_type 的记录
  SELECT 
    'missing_effect_type' as issue_type,
    COUNT(*) as issue_count,
    'skill_targets records without effect_type in effect_applied' as description
  FROM public.skill_targets 
  WHERE effect_applied IS NOT NULL 
    AND NOT (effect_applied ? 'effect_type' OR effect_applied ? 'type')
  
  UNION ALL
  
  -- 检查同时有 type 和 effect_type 的记录
  SELECT 
    'duplicate_effect_fields' as issue_type,
    COUNT(*) as issue_count,
    'skill_targets records with both type and effect_type fields' as description
  FROM public.skill_targets 
  WHERE effect_applied ? 'type' AND effect_applied ? 'effect_type'
  
  UNION ALL
  
  -- 检查空的 effect_applied 记录
  SELECT 
    'empty_effect_applied' as issue_type,
    COUNT(*) as issue_count,
    'skill_targets records with null or empty effect_applied' as description
  FROM public.skill_targets 
  WHERE effect_applied IS NULL OR effect_applied = '{}'::jsonb;
$$;



--

-- Name: cleanup_expired_skill_effects(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cleanup_expired_skill_effects() RETURNS void
    LANGUAGE plpgsql
    SET search_path TO ''
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



--

-- Name: cleanup_expired_standardized_skill_effects(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cleanup_expired_standardized_skill_effects() RETURNS void
    LANGUAGE plpgsql
    SET search_path TO ''
    AS $$
BEGIN
  -- Mark expired effects as inactive
  UPDATE public.standardized_skill_targets
  SET is_active = false, updated_at = now()
  WHERE is_active = true
    AND effect_end_time IS NOT NULL
    AND effect_end_time < now();

  -- Log cleanup activity
  RAISE NOTICE 'Cleaned up expired standardized skill effects at %', now();
END;
$$;



--

-- Name: cleanup_old_skill_data(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cleanup_old_skill_data() RETURNS void
    LANGUAGE plpgsql
    SET search_path TO ''
    AS $$
BEGIN
  -- Clean up old completed skill effects queue entries (older than 7 days)
  DELETE FROM public.skill_effects_queue
  WHERE status IN ('completed', 'cancelled', 'failed')
    AND updated_at < (now() - interval '7 days');

  -- Clean up old inactive standardized skill targets (older than 30 days)
  UPDATE public.standardized_skill_targets
  SET is_active = false, updated_at = now()
  WHERE is_active = true
    AND effect_end_time IS NOT NULL
    AND effect_end_time < (now() - interval '30 days');

  -- Clean up old skill conflicts (older than 30 days)
  DELETE FROM public.skill_conflicts
  WHERE created_at < (now() - interval '30 days');

  RAISE NOTICE 'Cleaned up old skill system data at %', now();
END;
$$;



--

-- Name: cleanup_old_voice_signals(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cleanup_old_voice_signals() RETURNS void
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Delete signal messages from 5 minutes ago
  DELETE FROM public.voice_signals 
  WHERE created_at < (now() - interval '5 minutes');
END;
$$;



--

-- Name: close_inactive_rooms(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.close_inactive_rooms() RETURNS void
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Update rooms to 'closed' status if they have no human players and last activity was more than 3 minutes ago
  UPDATE public.rooms 
  SET status = 'closed'
  WHERE status = 'waiting' 
    AND last_human_activity < (now() - interval '3 minutes')
    AND id NOT IN (
      SELECT DISTINCT room_id 
      FROM public.room_players 
      WHERE is_ai = false OR is_ai IS NULL
    );
END;
$$;



--

-- Name: create_next_room(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_next_room(p_room_id uuid) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $$
DECLARE
  v_judge uuid;
  v_host uuid;
  v_max_players integer;
  v_human_judge boolean;
  v_status text;
  v_existing_next uuid;
  v_new_room_id uuid;
  v_new_room_code text;
BEGIN
  SELECT judge_user_id, host_id, max_players, human_judge, status, next_room_id
  INTO v_judge, v_host, v_max_players, v_human_judge, v_status, v_existing_next
  FROM public.rooms
  WHERE id = p_room_id;

  IF v_judge IS NULL THEN
    RAISE EXCEPTION 'Room % has no judge assigned', p_room_id;
  END IF;

  IF auth.uid() IS NULL OR auth.uid() <> v_judge THEN
    RAISE EXCEPTION 'Not authorized to create next room';
  END IF;

  IF v_existing_next IS NOT NULL THEN
    RETURN v_existing_next;
  END IF;

  v_new_room_code := to_char(now(), 'YYYY/MM/DD') || '-' || lpad(((floor(random()*99)+1))::text, 2, '0');

  INSERT INTO public.rooms (room_id, host_id, max_players, status, human_judge, judge_user_id, last_human_activity)
  VALUES (v_new_room_code, v_host, COALESCE(v_max_players, 12), 'waiting', COALESCE(v_human_judge, true), v_judge, now())
  RETURNING id INTO v_new_room_id;

  UPDATE public.rooms
  SET next_room_id = v_new_room_id,
      status = CASE WHEN v_status = 'ended' THEN 'closed' ELSE v_status END
  WHERE id = p_room_id;

  RETURN v_new_room_id;
END;
$$;



--

-- Name: create_voting_session(uuid, uuid, integer, integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_voting_session(p_game_state_id uuid, p_room_id uuid, p_round_number integer, p_phase integer, p_session_type text DEFAULT 'day_vote'::text) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  current_user_id UUID;
  session_id UUID;
  existing_session_id UUID;
BEGIN
  -- 获取当前用户ID
  current_user_id := auth.uid();
  
  -- 检查用户是否已认证
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required'
      USING ERRCODE = '42501';
  END IF;
  
  -- 检查用户是否是房间参与者或法官
  IF NOT (is_room_participant(p_room_id, current_user_id) OR is_room_judge(p_room_id, current_user_id)) THEN
    RAISE EXCEPTION 'User is not authorized to create voting sessions for this room'
      USING ERRCODE = '42501';
  END IF;
  
  -- 检查是否已存在相同的投票会话
  SELECT id INTO existing_session_id
  FROM voting_sessions
  WHERE game_state_id = p_game_state_id
    AND round_number = p_round_number
    AND phase = p_phase
    AND session_type = p_session_type
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- 如果已存在，返回现有会话ID
  IF existing_session_id IS NOT NULL THEN
    RETURN existing_session_id;
  END IF;
  
  -- 创建新的投票会话
  INSERT INTO voting_sessions (
    game_state_id,
    room_id,
    round_number,
    phase,
    session_type,
    status,
    start_time
  ) VALUES (
    p_game_state_id,
    p_room_id,
    p_round_number,
    p_phase,
    p_session_type,
    'active',
    now()
  ) RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$;



--

-- Name: detect_skill_conflicts(uuid, integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.detect_skill_conflicts(p_game_state_id uuid, p_round_number integer, p_phase text) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
    conflict_data JSON;
    skill_record RECORD;
    conflicts_found INTEGER := 0;
BEGIN
    -- 获取当前回合阶段的所有待执行技能
    FOR skill_record IN
        SELECT 
            su.id as skill_use_id,
            su.skill_name,
            su.target_user_id,
            su.skill_priority,
            su.user_id,
            COALESCE(su.skill_effects->>'effect_type', 'unknown') as effect_type
        FROM skill_uses su
        WHERE su.game_state_id = p_game_state_id
          AND su.round_number = p_round_number
          AND su.phase = p_phase
          AND su.execution_status = 'pending'
        ORDER BY su.skill_priority ASC, su.created_at ASC
    LOOP
        -- 检查技能冲突逻辑
        -- 守卫保护与狼人攻击同目标
        IF skill_record.skill_name = 'vigil' THEN
            -- 检查是否有狼人攻击相同目标
            IF EXISTS (
                SELECT 1 FROM skill_uses su2 
                WHERE su2.game_state_id = p_game_state_id
                  AND su2.round_number = p_round_number
                  AND su2.phase = p_phase
                  AND su2.skill_name = 'night_attack'
                  AND su2.target_user_id = skill_record.target_user_id
                  AND su2.execution_status = 'pending'
                  AND su2.id != skill_record.skill_use_id
            ) THEN
                -- 插入冲突记录
                INSERT INTO skill_conflicts (
                    game_state_id,
                    round_number,
                    phase,
                    conflicting_skills,
                    resolution_rule
                ) VALUES (
                    p_game_state_id,
                    p_round_number,
                    p_phase,
                    jsonb_build_array(
                        jsonb_build_object(
                            'skill_use_id', skill_record.skill_use_id,
                            'skill_name', skill_record.skill_name,
                            'priority', skill_record.skill_priority,
                            'target_user_id', skill_record.target_user_id
                        )
                    ),
                    'priority'
                ) ON CONFLICT (game_state_id, round_number, phase) DO UPDATE SET
                    conflicting_skills = skill_conflicts.conflicting_skills || EXCLUDED.conflicting_skills,
                    updated_at = now();
                
                conflicts_found := conflicts_found + 1;
            END IF;
        END IF;
        
        -- 女巫解药与狼人攻击同目标
        IF skill_record.skill_name = 'magic_potion' AND skill_record.effect_type = 'protection' THEN
            IF EXISTS (
                SELECT 1 FROM skill_uses su2 
                WHERE su2.game_state_id = p_game_state_id
                  AND su2.round_number = p_round_number
                  AND su2.phase = p_phase
                  AND su2.skill_name = 'night_attack'
                  AND su2.target_user_id = skill_record.target_user_id
                  AND su2.execution_status = 'pending'
                  AND su2.id != skill_record.skill_use_id
            ) THEN
                INSERT INTO skill_conflicts (
                    game_state_id,
                    round_number,
                    phase,
                    conflicting_skills,
                    resolution_rule
                ) VALUES (
                    p_game_state_id,
                    p_round_number,
                    p_phase,
                    jsonb_build_array(
                        jsonb_build_object(
                            'skill_use_id', skill_record.skill_use_id,
                            'skill_name', skill_record.skill_name,
                            'priority', skill_record.skill_priority,
                            'target_user_id', skill_record.target_user_id,
                            'effect_type', skill_record.effect_type
                        )
                    ),
                    'priority'
                ) ON CONFLICT (game_state_id, round_number, phase) DO UPDATE SET
                    conflicting_skills = skill_conflicts.conflicting_skills || EXCLUDED.conflicting_skills,
                    updated_at = now();
                
                conflicts_found := conflicts_found + 1;
            END IF;
        END IF;
    END LOOP;

    conflict_data := json_build_object(
        'conflicts_detected', conflicts_found,
        'game_state_id', p_game_state_id,
        'round_number', p_round_number,
        'phase', p_phase
    );

    RETURN conflict_data;
END;
$$;



--

-- Name: get_active_skill_effects_for_user(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_active_skill_effects_for_user(p_user_id uuid, p_game_state_id uuid) RETURNS TABLE(effect_type text, effect_duration integer, effect_end_time timestamp with time zone, stack_count integer, skill_name text)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT 
    sst.effect_applied->>'effect_type' as effect_type,
    sst.effect_duration,
    sst.effect_end_time,
    sst.stack_count,
    su.skill_name
  FROM public.standardized_skill_targets sst
  JOIN public.skill_uses su ON su.id = sst.skill_use_id
  WHERE sst.target_user_id = p_user_id
    AND su.game_state_id = p_game_state_id
    AND sst.is_active = true
    AND (sst.effect_end_time IS NULL OR sst.effect_end_time > now())
  ORDER BY sst.created_at ASC;
$$;



--

-- Name: get_phase_duration(uuid, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_phase_duration(p_room_id uuid, p_phase integer) RETURNS integer
    LANGUAGE plpgsql
    SET search_path TO 'public'
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



--

-- Name: get_public_user_by_name(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_public_user_by_name(p_name text) RETURNS TABLE(user_id uuid, player_name text, avatar_url text)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT u.user_id, u.player_name, u.avatar_url
  FROM public.users u
  WHERE u.player_name = p_name;
$$;



--

-- Name: get_public_user_profile(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_public_user_profile(p_user_id uuid) RETURNS TABLE(user_id uuid, player_name text, avatar_url text)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT u.user_id, u.player_name, u.avatar_url
  FROM public.users u
  WHERE u.user_id = p_user_id;
$$;



--

-- Name: get_public_user_profiles_by_ids(uuid[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_public_user_profiles_by_ids(p_user_ids uuid[]) RETURNS TABLE(user_id uuid, player_name text, avatar_url text)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT u.user_id, u.player_name, u.avatar_url
  FROM public.users u
  WHERE u.user_id = ANY (p_user_ids);
$$;



--

-- Name: get_room_judge_id(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_room_judge_id(p_room_id uuid) RETURNS uuid
    LANGUAGE plpgsql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  v_judge_id uuid;
BEGIN
  SELECT judge_user_id INTO v_judge_id FROM public.rooms WHERE id = p_room_id;
  RETURN v_judge_id;
END;
$$;



--

-- Name: get_skill_effects_by_type(uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_skill_effects_by_type(p_game_state_id uuid, p_effect_type text) RETURNS TABLE(target_user_id uuid, effect_data jsonb, created_at timestamp with time zone, is_active boolean)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT 
    sst.target_user_id,
    sst.effect_applied as effect_data,
    sst.created_at,
    sst.is_active
  FROM public.standardized_skill_targets sst
  JOIN public.skill_uses su ON su.id = sst.skill_use_id
  WHERE su.game_state_id = p_game_state_id
    AND sst.effect_applied->>'effect_type' = p_effect_type
  ORDER BY sst.created_at DESC;
$$;



--

-- Name: get_skill_system_status(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_skill_system_status(p_game_state_id uuid) RETURNS TABLE(total_skill_uses bigint, pending_effects bigint, active_effects bigint, expired_effects bigint, total_conflicts bigint)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT 
    (SELECT COUNT(*) FROM public.skill_uses WHERE game_state_id = p_game_state_id) as total_skill_uses,
    (SELECT COUNT(*) FROM public.skill_effects_queue WHERE game_state_id = p_game_state_id AND status = 'queued') as pending_effects,
    (SELECT COUNT(*) FROM public.standardized_skill_targets sst 
     JOIN public.skill_uses su ON su.id = sst.skill_use_id 
     WHERE su.game_state_id = p_game_state_id AND sst.is_active = true) as active_effects,
    (SELECT COUNT(*) FROM public.standardized_skill_targets sst 
     JOIN public.skill_uses su ON su.id = sst.skill_use_id 
     WHERE su.game_state_id = p_game_state_id AND sst.is_active = false) as expired_effects,
    (SELECT COUNT(*) FROM public.skill_conflicts WHERE game_state_id = p_game_state_id) as total_conflicts;
$$;



--

-- Name: get_skill_table_index_usage(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_skill_table_index_usage() RETURNS TABLE(table_name text, index_name text, index_size text, index_scans bigint, tuples_read bigint, tuples_fetched bigint)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT 
    schemaname||'.'||relname as table_name,
    indexrelname as index_name,
    pg_size_pretty(pg_relation_size(schemaname||'.'||indexrelname)) as index_size,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
  FROM pg_stat_user_indexes 
  WHERE schemaname = 'public' 
    AND relname IN ('skill_uses', 'skill_effects_queue', 'standardized_skill_targets', 'skill_conflicts')
  ORDER BY relname, indexrelname;
$$;



--

-- Name: get_skill_target_room_id(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_skill_target_room_id(p_skill_effects_queue_id uuid) RETURNS uuid
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT room_id FROM public.skill_effects_queue WHERE id = p_skill_effects_queue_id;
$$;



--

-- Name: get_standardized_skill_targets_by_game(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_standardized_skill_targets_by_game(p_game_state_id uuid) RETURNS TABLE(id uuid, skill_use_id uuid, target_user_id uuid, target_type text, effect_type text, effect_duration integer, is_active boolean, created_at timestamp with time zone)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT 
    sst.id,
    sst.skill_use_id,
    sst.target_user_id,
    sst.target_type,
    sst.effect_applied->>'effect_type' as effect_type,
    sst.effect_duration,
    sst.is_active,
    sst.created_at
  FROM public.standardized_skill_targets sst
  JOIN public.skill_uses su ON su.id = sst.skill_use_id
  WHERE su.game_state_id = p_game_state_id
  ORDER BY sst.created_at DESC;
$$;



--

-- Name: get_waiting_room_player_counts(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_waiting_room_player_counts() RETURNS TABLE(room_id uuid, player_count bigint)
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT 
    r.id as room_id,
    COALESCE(COUNT(rp.id), 0) as player_count
  FROM public.rooms r
  LEFT JOIN public.room_players rp ON rp.room_id = r.id
  WHERE r.status = 'waiting'
  GROUP BY r.id;
$$;



--

-- Name: handle_skill_effect_announcement(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_skill_effect_announcement() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO ''
    AS $$
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
$$;



--

-- Name: handle_skill_use_announcement(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_skill_use_announcement() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO ''
    AS $$
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
$$;



--

-- Name: initialize_game_state(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.initialize_game_state(p_room_id uuid) RETURNS uuid
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
DECLARE
  game_state_id UUID;
BEGIN
  -- Insert new game state
  INSERT INTO public.game_states (room_id, status)
  VALUES (p_room_id, 'waiting')
  RETURNING id INTO game_state_id;
  
  RETURN game_state_id;
END;
$$;



--

-- Name: initialize_role_state(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.initialize_role_state() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Initialize skill usage count
  NEW.skill_uses_remaining := public.initialize_skill_uses_remaining(NEW.role_id);
  
  -- Initialize status effects
  NEW.status_effects := public.initialize_status_effects(NEW.role_status);
  
  RETURN NEW;
END;
$$;



--

-- Name: initialize_room_role_states(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.initialize_room_role_states(p_room_id uuid) RETURNS integer
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $$
DECLARE
  v_game_state_id uuid;
  inserted_count integer := 0;
BEGIN
  -- Find the active game state for the room (fallback to latest if none active)
  SELECT gs.id INTO v_game_state_id
  FROM public.game_states gs
  WHERE gs.room_id = p_room_id
  ORDER BY (gs.status = 'active') DESC, gs.created_at DESC
  LIMIT 1;

  IF v_game_state_id IS NULL THEN
    RAISE EXCEPTION 'No game_state found for room %', p_room_id;
  END IF;

  -- Insert one role_state per user based on their latest selection, skipping existing
  WITH latest_selections AS (
    SELECT DISTINCT ON (rs.user_id)
      rs.room_id,
      rs.user_id,
      rs.role_id,
      rs.selected_at
    FROM public.role_selections rs
    WHERE rs.room_id = p_room_id
    ORDER BY rs.user_id, rs.selected_at DESC
  ), ins AS (
    INSERT INTO public.role_states (
      game_state_id,
      room_id,
      user_id,
      role_id,
      current_phase,
      role_status,
      skill_uses_remaining,
      status_effects
    )
    SELECT 
      v_game_state_id,
      ls.room_id,
      ls.user_id,
      ls.role_id,
      NULL,
      1,
      public.initialize_skill_uses_remaining(ls.role_id),
      public.initialize_status_effects(1)
    FROM latest_selections ls
    LEFT JOIN public.role_states existing
      ON existing.game_state_id = v_game_state_id
     AND existing.user_id = ls.user_id
    WHERE existing.id IS NULL
    RETURNING 1
  )
  SELECT COUNT(*) INTO inserted_count FROM ins;

  RETURN inserted_count;
END;
$$;



--

-- Name: initialize_skill_uses_remaining(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.initialize_skill_uses_remaining(p_role_id uuid) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
DECLARE
  skill_usage_count integer;
  result jsonb;
BEGIN
  -- Get skill usage count from role_design table
  SELECT skill_usage INTO skill_usage_count
  FROM public.role_design
  WHERE id = p_role_id;
  
  -- If role not found or skill usage is null, return empty object
  IF skill_usage_count IS NULL THEN
    RETURN '{}'::jsonb;
  END IF;
  
  -- Set initial values based on skill usage count
  IF skill_usage_count = -1 THEN
    -- Unlimited usage
    result := '{"unlimited": true}'::jsonb;
  ELSE
    -- Limited usage
    result := jsonb_build_object('remaining', skill_usage_count, 'total', skill_usage_count);
  END IF;
  
  RETURN result;
END;
$$;



--

-- Name: initialize_status_effects(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.initialize_status_effects(p_role_status integer) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  CASE p_role_status
    WHEN 1 THEN -- Normal status
      RETURN jsonb_build_object(
        'can_chat', true,
        'can_vote', true,
        'can_use_skill', true,
        'can_be_targeted', true,
        'can_answer_questions', true,
        'can_be_voted', true
      );
    WHEN 2 THEN -- Dying status
      RETURN jsonb_build_object(
        'can_chat', false,
        'can_vote', false,
        'can_use_skill', false,
        'can_be_targeted', false,
        'can_answer_questions', true,
        'can_be_voted', false
      );
    WHEN 3 THEN -- Weak status
      RETURN jsonb_build_object(
        'can_chat', true,
        'can_vote', true,
        'can_use_skill', true,
        'can_be_targeted', true,
        'can_answer_questions', true,
        'can_be_voted', true,
        'is_weak', true
      );
    WHEN 4 THEN -- Eliminated status
      RETURN jsonb_build_object(
        'can_chat', false,
        'can_vote', false,
        'can_use_skill', false,
        'can_be_targeted', false,
        'can_answer_questions', false,
        'can_be_voted', false,
        'is_eliminated', true
      );
    ELSE
      RETURN jsonb_build_object(
        'can_chat', true,
        'can_vote', true,
        'can_use_skill', true,
        'can_be_targeted', true,
        'can_answer_questions', true,
        'can_be_voted', true
      );
  END CASE;
END;
$$;



--

-- Name: is_room_judge(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.is_room_judge(p_room_id uuid, p_user_id uuid) RETURNS boolean
    LANGUAGE plpgsql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.rooms 
    WHERE id = p_room_id AND judge_user_id = p_user_id
  );
END;
$$;



--

-- Name: is_room_participant(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.is_room_participant(p_room_id uuid, p_user_id uuid) RETURNS boolean
    LANGUAGE plpgsql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  RETURN (
    -- Check if user is a player in the room
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id = p_room_id AND rp.user_id = p_user_id
    )
    OR
    -- Check if user is the room judge
    EXISTS (
      SELECT 1 FROM public.rooms r
      WHERE r.id = p_room_id AND r.judge_user_id = p_user_id
    )
  );
END;
$$;



--

-- Name: join_room_as_player(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.join_room_as_player(p_room_id uuid) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  current_user_id UUID;
  room_record RECORD;
  player_count INTEGER;
BEGIN
  -- 获取当前用户ID
  current_user_id := auth.uid();
  
  -- 检查用户是否已认证
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required'
      USING ERRCODE = '42501';
  END IF;
  
  -- 检查房间是否存在且状态为waiting
  SELECT * INTO room_record
  FROM rooms 
  WHERE id = p_room_id AND status = 'waiting';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Room not found or not accepting players'
      USING ERRCODE = '42704';
  END IF;
  
  -- 检查房间是否已满
  SELECT COUNT(*) INTO player_count
  FROM room_players 
  WHERE room_id = p_room_id;
  
  IF player_count >= room_record.max_players THEN
    RAISE EXCEPTION 'Room is full'
      USING ERRCODE = '23505';
  END IF;
  
  -- 尝试加入房间（如果已存在则更新状态）
  INSERT INTO room_players (room_id, user_id, is_ai, is_ready) 
  VALUES (p_room_id, current_user_id, false, true)
  ON CONFLICT (room_id, user_id) DO UPDATE SET 
    is_ready = true,
    is_ai = false;
  
  RETURN true;
END;
$$;



--

-- Name: process_skill_effects(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.process_skill_effects(p_game_state_id uuid) RETURNS integer
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
DECLARE
  effect_record RECORD;
  processed_count INTEGER := 0;
BEGIN
  -- Process all ready-to-execute skill effects
  FOR effect_record IN
    SELECT *
    FROM public.skill_effects_queue
    WHERE game_state_id = p_game_state_id
      AND status = 'queued'
      AND (trigger_time IS NULL OR trigger_time <= now())
    ORDER BY priority ASC, execution_order ASC, created_at ASC
  LOOP
    -- Mark as processing
    UPDATE public.skill_effects_queue
    SET status = 'processing', updated_at = now()
    WHERE id = effect_record.id;

    -- Execute different logic based on effect type
    CASE effect_record.effect_type
      WHEN 'status_change' THEN
        PERFORM public.apply_generic_effect(effect_record.id);
      WHEN 'elimination' THEN
        PERFORM public.apply_generic_effect(effect_record.id);
      WHEN 'protection' THEN
        PERFORM public.apply_generic_effect(effect_record.id);
      WHEN 'investigation' THEN
        PERFORM public.apply_generic_effect(effect_record.id);
      ELSE
        -- Generic effect processing
        PERFORM public.apply_generic_effect(effect_record.id);
    END CASE;

    -- Mark as completed
    UPDATE public.skill_effects_queue
    SET status = 'completed', processed_at = now(), updated_at = now()
    WHERE id = effect_record.id;

    processed_count := processed_count + 1;
  END LOOP;

  RETURN processed_count;
END;
$$;



--

-- Name: process_voting_result(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.process_voting_result(p_voting_result_id uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  current_user_id UUID;
  result_record RECORD;
  target_user_id UUID;
  current_status TEXT;
  rows_updated INTEGER;
BEGIN
  -- 获取当前用户ID并验证认证
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  -- 原子性检查并锁定结果记录
  SELECT processing_status INTO current_status
  FROM voting_results 
  WHERE id = p_voting_result_id
  FOR UPDATE;
  
  IF current_status IS NULL THEN
    RAISE EXCEPTION 'Voting result not found' USING ERRCODE = '42704';
  END IF;
  
  -- 幂等性检查：如果已经处理过，直接返回
  IF current_status != 'pending' THEN
    RETURN;
  END IF;
  
  -- 原子性更新状态为processing
  UPDATE voting_results 
  SET processing_status = 'processing', updated_at = now()
  WHERE id = p_voting_result_id AND processing_status = 'pending';
  
  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  
  -- 如果更新失败，说明被其他进程抢先处理
  IF rows_updated = 0 THEN
    RETURN;
  END IF;

  -- 获取详细的投票结果信息
  SELECT 
    vr.*,
    vs.room_id,
    vs.game_state_id,
    vs.round_number,
    vs.phase
  INTO result_record
  FROM voting_results vr
  JOIN voting_sessions vs ON vs.id = vr.voting_session_id
  WHERE vr.id = p_voting_result_id;

  -- 验证用户是否为房间法官
  IF NOT is_room_judge(result_record.room_id, current_user_id) THEN
    UPDATE voting_results 
    SET processing_status = 'failed', updated_at = now()
    WHERE id = p_voting_result_id;
    
    RAISE EXCEPTION 'Only room judge can process voting results' USING ERRCODE = '42501';
  END IF;

  BEGIN
    target_user_id := result_record.target_id;
    
    -- 处理投票结果的主要逻辑
    IF result_record.result_type = 'eliminated' AND target_user_id IS NOT NULL THEN
      -- 修改逻辑：得票最高的玩家进入濒死状态（而非淘汰状态）
      -- 更新角色状态为濒死状态
      UPDATE role_states 
      SET 
        role_status = 2, -- 濒死状态
        status_effects = jsonb_build_object(
          'can_chat', false,
          'can_vote', false,
          'can_use_skill', false,
          'can_be_targeted', false,
          'can_answer_questions', true,
          'can_be_voted', false,
          'dying_reason', 'vote_elimination',
          'dying_round', result_record.round_number,
          'dying_phase', result_record.phase
        ),
        updated_at = now()
      WHERE user_id = target_user_id 
        AND game_state_id = result_record.game_state_id;
      
      -- 记录处理日志
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        step_details
      ) VALUES (
        p_voting_result_id,
        'player_dying',
        'completed',
        jsonb_build_object(
          'target_user_id', target_user_id,
          'new_status', 'dying',
          'reason', 'vote_elimination',
          'round', result_record.round_number,
          'phase', result_record.phase
        )
      );
      
    ELSIF result_record.result_type = 'tied' THEN
      -- 平票情况的处理日志
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        step_details
      ) VALUES (
        p_voting_result_id,
        'tie_result',
        'completed',
        jsonb_build_object(
          'result_type', 'tied',
          'message', '投票平票，无人进入濒死状态'
        )
      );
      
    ELSE
      -- 其他情况的处理日志
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        step_details
      ) VALUES (
        p_voting_result_id,
        'no_action',
        'completed',
        jsonb_build_object(
          'result_type', result_record.result_type,
          'message', '投票结果无需特殊处理'
        )
      );
    END IF;

    -- 标记处理完成
    UPDATE voting_results 
    SET 
      processing_status = 'completed',
      processed_at = now(),
      updated_at = now()
    WHERE id = p_voting_result_id;

  EXCEPTION
    WHEN OTHERS THEN
      -- 处理失败，记录错误并更新状态
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        error_message,
        step_details
      ) VALUES (
        p_voting_result_id,
        'processing_error',
        'failed',
        SQLERRM,
        jsonb_build_object(
          'error_code', SQLSTATE,
          'error_message', SQLERRM
        )
      );
      
      UPDATE voting_results 
      SET processing_status = 'failed', updated_at = now()
      WHERE id = p_voting_result_id;
      
      RAISE;
  END;
END;
$$;



--

-- Name: queue_skill_effect(uuid, text, jsonb, integer, jsonb, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.queue_skill_effect(p_skill_use_id uuid, p_effect_type text, p_effect_data jsonb, p_priority integer DEFAULT 100, p_conditions jsonb DEFAULT '{}'::jsonb, p_trigger_delay_seconds integer DEFAULT 0) RETURNS uuid
    LANGUAGE plpgsql
    SET search_path TO ''
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



--

-- Name: resolve_dying_status(uuid, uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.resolve_dying_status(p_user_id uuid, p_game_state_id uuid, p_resolution_type text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  current_user_id UUID;
  role_state_record RECORD;
  new_status INTEGER;
  room_id_val UUID;
BEGIN
  -- 获取当前用户ID并验证认证
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  -- 获取角色状态
  SELECT * INTO role_state_record
  FROM role_states rs
  WHERE rs.user_id = p_user_id 
    AND rs.game_state_id = p_game_state_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Role state not found' USING ERRCODE = '42704';
  END IF;

  -- 获取房间信息
  SELECT room_id INTO room_id_val
  FROM game_states
  WHERE id = p_game_state_id;

  -- 验证用户是否为房间法官
  IF NOT is_room_judge(room_id_val, current_user_id) THEN
    RAISE EXCEPTION 'Only room judge can resolve dying status' USING ERRCODE = '42501';
  END IF;

  -- 检查当前状态是否为濒死状态
  IF role_state_record.role_status != 2 THEN
    RAISE EXCEPTION 'Player is not in dying status' USING ERRCODE = '23503';
  END IF;

  -- 根据解除类型设置新状态
  CASE p_resolution_type
    WHEN 'protected' THEN
      -- 获得保护：解除濒死状态，恢复为正常状态
      new_status := 1;
    WHEN 'answer_correct' THEN
      -- 答题正确：转为虚弱状态
      new_status := 3;
    WHEN 'answer_wrong' THEN
      -- 答题错误：转为淘汰状态
      new_status := 4;
    ELSE
      RAISE EXCEPTION 'Invalid resolution type: %', p_resolution_type USING ERRCODE = '22023';
  END CASE;

  -- 更新角色状态
  UPDATE role_states 
  SET 
    role_status = new_status,
    status_effects = CASE 
      WHEN new_status = 1 THEN jsonb_build_object(
        'can_chat', true,
        'can_vote', true,
        'can_use_skill', true,
        'can_be_targeted', true,
        'can_answer_questions', true,
        'can_be_voted', true
      )
      WHEN new_status = 3 THEN jsonb_build_object(
        'can_chat', true,
        'can_vote', true,
        'can_use_skill', true,
        'can_be_targeted', true,
        'can_answer_questions', true,
        'can_be_voted', true,
        'is_weak', true
      )
      WHEN new_status = 4 THEN jsonb_build_object(
        'can_chat', false,
        'can_vote', false,
        'can_use_skill', false,
        'can_be_targeted', false,
        'can_answer_questions', false,
        'can_be_voted', false,
        'is_eliminated', true
      )
      ELSE role_state_record.status_effects
    END,
    updated_at = now()
  WHERE user_id = p_user_id 
    AND game_state_id = p_game_state_id;

  RETURN true;
END;
$$;



--

-- Name: start_game(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.start_game(p_room_id uuid) RETURNS uuid
    LANGUAGE plpgsql
    AS $$
DECLARE
  game_state_id UUID;
BEGIN
  -- 更新或创建游戏状态
  INSERT INTO public.game_states (room_id, status, current_phase, phase_start_time)
  VALUES (p_room_id, 'active', 'day', now())
  ON CONFLICT (room_id) 
  DO UPDATE SET 
    status = 'active',
    current_phase = 'day',
    current_round = 1,
    phase_start_time = now()
  RETURNING id INTO game_state_id;
  
  -- 记录游戏开始的第一个阶段
  INSERT INTO public.game_phase_history (
    game_state_id, 
    phase, 
    round_number, 
    started_at
  ) VALUES (
    game_state_id,
    'day',
    1,
    now()
  );
  
  RETURN game_state_id;
END;
$$;



--

-- Name: toggle_game_pause(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.toggle_game_pause(p_room_id uuid) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE
  current_state RECORD;
  new_pause_state BOOLEAN;
BEGIN
  SELECT * INTO current_state 
  FROM public.game_states 
  WHERE room_id = p_room_id AND status = 'active';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No active game found for room %', p_room_id;
  END IF;
  
  new_pause_state := NOT current_state.is_paused;
  
  IF new_pause_state THEN
    -- Pausing the game
    UPDATE public.game_states 
    SET is_paused = true, paused_at = now()
    WHERE id = current_state.id;
  ELSE
    -- Resuming the game
    UPDATE public.game_states 
    SET 
      is_paused = false,
      total_paused_duration = total_paused_duration + EXTRACT(EPOCH FROM (now() - paused_at))::INTEGER,
      phase_end_time = CASE 
        WHEN phase_end_time IS NOT NULL 
        THEN phase_end_time + (now() - paused_at)
        ELSE NULL 
      END,
      paused_at = NULL
    WHERE id = current_state.id;
  END IF;
  
  RETURN new_pause_state;
END;
$$;



--

-- Name: trigger_hunter_dying_skill(uuid, uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_hunter_dying_skill(p_hunter_user_id uuid, p_game_state_id uuid, p_trigger_reason text DEFAULT 'elimination'::text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
    room_id_val UUID;
    current_round_val INTEGER;
    current_phase_val INTEGER;
BEGIN
    -- 获取游戏信息
    SELECT gs.room_id, gs.current_round, gs.current_phase
    INTO room_id_val, current_round_val, current_phase_val
    FROM game_states gs
    WHERE gs.id = p_game_state_id;

    -- 验证是否是猎人角色
    IF NOT EXISTS (
        SELECT 1 FROM role_states rs
        JOIN role_design rd ON rd.id = rs.role_id
        WHERE rs.user_id = p_hunter_user_id
          AND rs.game_state_id = p_game_state_id
          AND rd.role_name = 'hunter'
          AND rs.role_status IN (1, 3) -- 正常或虚弱状态
    ) THEN
        RETURN false;
    END IF;

    -- 更新猎人状态为濒死，激活反击技能
    UPDATE role_states SET
        role_status = 2, -- 濒死状态
        status_effects = jsonb_build_object(
            'can_chat', false,
            'can_vote', false,
            'can_use_skill', true,
            'can_be_targeted', false,
            'can_answer_questions', true,
            'can_be_voted', false,
            'is_hunter_revenge', true,
            'hunter_revenge_end_time', (now() + interval '40 seconds')::text,
            'trigger_reason', p_trigger_reason
        ),
        updated_at = now()
    WHERE user_id = p_hunter_user_id
      AND game_state_id = p_game_state_id;

    -- 插入系统公告
    INSERT INTO chat_messages (
        room_id,
        sender_id,
        message,
        chat_type,
        game_round,
        game_phase
    ) VALUES (
        room_id_val,
        NULL, -- 系统消息
        '猎人进入濒死状态，获得反击机会（40秒内选择目标）',
        'system',
        current_round_val,
        CASE current_phase_val 
            WHEN 1 THEN 'day'
            WHEN 2 THEN 'evening'
            WHEN 3 THEN 'night'
            WHEN 4 THEN 'dawn'
            ELSE 'day'
        END
    );

    RETURN true;
END;
$$;



--

-- Name: update_role_status(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_role_status() RETURNS trigger
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



--

-- Name: update_room_human_activity(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_room_human_activity() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Update last_human_activity when a human player joins or leaves
  IF TG_OP = 'INSERT' AND (NEW.is_ai = false OR NEW.is_ai IS NULL) THEN
    UPDATE public.rooms 
    SET last_human_activity = now() 
    WHERE id = NEW.room_id;
  ELSIF TG_OP = 'DELETE' AND (OLD.is_ai = false OR OLD.is_ai IS NULL) THEN
    -- Check if there are any remaining human players
    IF NOT EXISTS (
      SELECT 1 FROM public.room_players 
      WHERE room_id = OLD.room_id 
        AND (is_ai = false OR is_ai IS NULL) 
        AND id != OLD.id
    ) THEN
      UPDATE public.rooms 
      SET last_human_activity = now() 
      WHERE id = OLD.room_id;
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;



--

-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;



--

-- Name: use_skill(uuid, text, uuid, jsonb); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.use_skill(p_game_state_id uuid, p_skill_name text, p_target_user_id uuid DEFAULT NULL::uuid, p_skill_data jsonb DEFAULT '{}'::jsonb) RETURNS uuid
    LANGUAGE sql SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT public.use_skill_enhanced(p_game_state_id, p_skill_name, p_target_user_id, p_skill_data);
$$;



--

-- Name: use_skill_charge(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.use_skill_charge(p_role_state_id uuid) RETURNS boolean
    LANGUAGE plpgsql
    SET search_path TO ''
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
  SET skill_uses_remaining = current_skill_uses, updated_at = now()
  WHERE id = p_role_state_id;
  
  RETURN true;
END;
$$;



--

-- Name: use_skill_enhanced(uuid, text, uuid, jsonb); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.use_skill_enhanced(p_game_state_id uuid, p_skill_name text, p_target_user_id uuid DEFAULT NULL::uuid, p_skill_data jsonb DEFAULT '{}'::jsonb) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
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
$$;



--

-- Name: user_has_effect_type(uuid, uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.user_has_effect_type(p_user_id uuid, p_game_state_id uuid, p_effect_type text) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO ''
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.standardized_skill_targets sst
    JOIN public.skill_uses su ON su.id = sst.skill_use_id
    WHERE sst.target_user_id = p_user_id
      AND su.game_state_id = p_game_state_id
      AND sst.effect_applied->>'effect_type' = p_effect_type
      AND sst.is_active = true
      AND (sst.effect_end_time IS NULL OR sst.effect_end_time > now())
  );
$$;



--

-- Name: validate_skill_data_consistency(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validate_skill_data_consistency() RETURNS boolean
    LANGUAGE plpgsql
    SET search_path TO ''
    AS $$
DECLARE
  inconsistent_count integer;
BEGIN
  -- Check for skill_targets records not in standardized_skill_targets
  SELECT COUNT(*) INTO inconsistent_count
  FROM public.skill_targets st
  LEFT JOIN public.standardized_skill_targets sst ON sst.id = st.id
  WHERE sst.id IS NULL;
  
  IF inconsistent_count > 0 THEN
    RAISE WARNING 'Found % skill_targets records not in standardized_skill_targets', inconsistent_count;
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;



--

-- Name: validate_witch_potion_usage(uuid, uuid, text, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validate_witch_potion_usage(p_user_id uuid, p_game_state_id uuid, p_potion_type text, p_target_user_id uuid DEFAULT NULL::uuid) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
    role_state_record RECORD;
    witch_uses JSONB;
    night_deaths JSONB;
    result JSON;
BEGIN
    -- 获取女巫的角色状态
    SELECT * INTO role_state_record
    FROM role_states rs
    JOIN role_design rd ON rd.id = rs.role_id
    WHERE rs.user_id = p_user_id 
      AND rs.game_state_id = p_game_state_id
      AND rd.role_name = 'witch';

    IF NOT FOUND THEN
        RETURN json_build_object(
            'can_use', false,
            'reason', '只有女巫角色可以使用药剂'
        );
    END IF;

    -- 检查女巫药剂使用状态
    witch_uses := COALESCE(role_state_record.skill_uses_remaining->'witch_potion', '{}'::jsonb);

    -- 验证解药使用
    IF p_potion_type = 'protection' THEN
        -- 检查解药是否已使用
        IF (witch_uses->>'protection_used')::boolean = true THEN
            RETURN json_build_object(
                'can_use', false,
                'reason', '解药已经使用过了'
            );
        END IF;

        -- 检查当夜是否有死亡信息（需要先知道谁会死亡才能使用解药）
        SELECT jsonb_agg(
            jsonb_build_object(
                'target_user_id', su.target_user_id,
                'attacker_user_id', su.user_id,
                'skill_name', su.skill_name
            )
        ) INTO night_deaths
        FROM skill_uses su
        WHERE su.game_state_id = p_game_state_id
          AND su.round_number = (
              SELECT current_round FROM game_states WHERE id = p_game_state_id
          )
          AND su.phase = 'night'
          AND su.skill_name IN ('night_attack', 'self_destruct')
          AND su.execution_status = 'pending';

        RETURN json_build_object(
            'can_use', true,
            'night_deaths', COALESCE(night_deaths, '[]'::jsonb),
            'potion_type', 'protection'
        );
    END IF;

    -- 验证毒药使用
    IF p_potion_type = 'attack' THEN
        -- 检查毒药是否已使用
        IF (witch_uses->>'attack_used')::boolean = true THEN
            RETURN json_build_object(
                'can_use', false,
                'reason', '毒药已经使用过了'
            );
        END IF;

        -- 检查目标是否有效
        IF p_target_user_id IS NULL THEN
            RETURN json_build_object(
                'can_use', false,
                'reason', '使用毒药需要选择目标'
            );
        END IF;

        RETURN json_build_object(
            'can_use', true,
            'potion_type', 'attack',
            'target_user_id', p_target_user_id
        );
    END IF;

    RETURN json_build_object(
        'can_use', false,
        'reason', '未知的药剂类型'
    );
END;
$$;



--

-- Name: chat_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    game_id uuid,
    sender_id uuid,
    message text NOT NULL,
    chat_type text NOT NULL,
    recipient_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    game_round integer,
    game_phase text,
    room_id uuid NOT NULL,
    CONSTRAINT chat_messages_chat_type_check CHECK ((chat_type = ANY (ARRAY['public'::text, 'team'::text, 'judge_private'::text, 'system'::text, 'room'::text])))
);

ALTER TABLE ONLY public.chat_messages REPLICA IDENTITY FULL;



--

-- Name: game_phase_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_phase_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    game_state_id uuid NOT NULL,
    phase text NOT NULL,
    round_number integer NOT NULL,
    started_at timestamp with time zone NOT NULL,
    ended_at timestamp with time zone,
    duration_seconds integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.game_phase_history REPLICA IDENTITY FULL;



--

-- Name: game_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    start_time timestamp with time zone DEFAULT now() NOT NULL,
    final_round integer DEFAULT 1,
    status text DEFAULT 'active'::text NOT NULL,
    end_time timestamp with time zone,
    total_duration_seconds integer,
    winner_faction text,
    end_reason text,
    CONSTRAINT game_sessions_status_check CHECK ((status = ANY (ARRAY['active'::text, 'completed'::text])))
);



--

-- Name: game_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    is_auto_advance boolean DEFAULT true NOT NULL,
    day_duration integer DEFAULT 300 NOT NULL,
    evening_duration integer DEFAULT 40 NOT NULL,
    night_duration integer DEFAULT 180 NOT NULL,
    dawn_duration integer DEFAULT 40 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.game_settings REPLICA IDENTITY FULL;



--

-- Name: game_states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_states (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    current_round integer DEFAULT 1 NOT NULL,
    phase_start_time timestamp with time zone DEFAULT now() NOT NULL,
    phase_duration integer DEFAULT 300 NOT NULL,
    auto_advance boolean DEFAULT true NOT NULL,
    status text DEFAULT 'waiting'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    phase_end_time timestamp with time zone,
    is_paused boolean DEFAULT false NOT NULL,
    paused_at timestamp with time zone,
    total_paused_duration integer DEFAULT 0 NOT NULL,
    current_phase integer DEFAULT 1,
    CONSTRAINT check_current_phase CHECK ((current_phase = ANY (ARRAY[1, 2, 3, 4]))),
    CONSTRAINT check_current_round CHECK (((current_round >= 1) AND (current_round <= 9))),
    CONSTRAINT check_max_phases CHECK (((((current_round - 1) * 4) + current_phase) <= 36)),
    CONSTRAINT game_states_status_check CHECK ((status = ANY (ARRAY['waiting'::text, 'active'::text, 'paused'::text, 'ended'::text])))
);

ALTER TABLE ONLY public.game_states REPLICA IDENTITY FULL;



--

-- Name: generated_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.generated_questions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid,
    original_file_path text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    file_name text,
    model_used text DEFAULT 'Qwen/Qwen3-30B-A3B'::text,
    question_count integer DEFAULT 0,
    questions jsonb,
    uploaded_file_id uuid
);



--

-- Name: preprocessed_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.preprocessed_files (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    original_file_path text NOT NULL,
    file_name text NOT NULL,
    preprocessed_content text NOT NULL,
    model_used text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    uploaded_file_id uuid
);



--

-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    question text NOT NULL,
    option_a text NOT NULL,
    option_b text NOT NULL,
    option_c text NOT NULL,
    option_d text NOT NULL,
    correct_option integer NOT NULL,
    explanation text,
    category text,
    difficulty integer,
    generated_questions_id uuid,
    CONSTRAINT questions_correct_option_check CHECK (((correct_option >= 1) AND (correct_option <= 4))),
    CONSTRAINT questions_difficulty_check CHECK (((difficulty >= 1) AND (difficulty <= 5)))
);



--

-- Name: role_design; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_design (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role_name text NOT NULL,
    faction boolean NOT NULL,
    role_description text,
    skill_name text,
    skill_type jsonb,
    skill_usage integer,
    skill_description text,
    role_image text,
    skill_effects jsonb DEFAULT '{}'::jsonb NOT NULL,
    role_attributes jsonb DEFAULT '{}'::jsonb NOT NULL,
    priority integer NOT NULL,
    usage_frequency boolean DEFAULT false NOT NULL
);



--

-- Name: role_selections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_selections (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    selected_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL,
    role_id uuid NOT NULL
);

ALTER TABLE ONLY public.role_selections REPLICA IDENTITY FULL;



--

-- Name: role_states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_states (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    game_state_id uuid NOT NULL,
    skill_uses_remaining jsonb DEFAULT '{}'::jsonb,
    status_effects jsonb DEFAULT '[]'::jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    room_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role_id uuid NOT NULL,
    current_phase integer,
    role_status integer DEFAULT 1 NOT NULL,
    CONSTRAINT check_role_status_range CHECK (((role_status >= 1) AND (role_status <= 4)))
);

ALTER TABLE ONLY public.role_states REPLICA IDENTITY FULL;



--

-- Name: room_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_answers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    selected_option integer,
    is_correct boolean,
    response_time integer,
    created_at timestamp with time zone DEFAULT now(),
    room_id uuid,
    user_id uuid,
    role_id uuid,
    room_question_id uuid,
    question_order integer,
    CONSTRAINT check_response_time_positive CHECK ((response_time >= 0)),
    CONSTRAINT check_selected_option_range CHECK (((selected_option >= 1) AND (selected_option <= 4))),
    CONSTRAINT player_answers_selected_option_check CHECK (((selected_option >= 0) AND (selected_option <= 3)))
);

ALTER TABLE ONLY public.room_answers REPLICA IDENTITY FULL;



--

-- Name: room_players; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_players (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid,
    user_id uuid,
    is_ready boolean DEFAULT false,
    is_ai boolean DEFAULT false,
    role text,
    status text DEFAULT 'alive'::text,
    CONSTRAINT room_players_status_check CHECK ((status = ANY (ARRAY['alive'::text, 'weakened'::text, 'dead'::text])))
);

ALTER TABLE ONLY public.room_players REPLICA IDENTITY FULL;



--

-- Name: room_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_questions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    question_id uuid NOT NULL,
    question_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.room_questions REPLICA IDENTITY FULL;



--

-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    room_id text NOT NULL,
    max_players integer DEFAULT 8,
    human_judge boolean DEFAULT true,
    status text DEFAULT 'waiting'::text,
    host_id uuid,
    last_human_activity timestamp with time zone DEFAULT now(),
    judge_user_id uuid,
    next_room_id uuid,
    CONSTRAINT rooms_max_players_check CHECK (((max_players >= 6) AND (max_players <= 12))),
    CONSTRAINT rooms_status_check CHECK ((status = ANY (ARRAY['waiting'::text, 'playing'::text, 'finished'::text])))
);

ALTER TABLE ONLY public.rooms REPLICA IDENTITY FULL;



--

-- Name: skill_conflicts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skill_conflicts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    game_state_id uuid NOT NULL,
    round_number integer NOT NULL,
    phase text NOT NULL,
    conflicting_skills jsonb DEFAULT '[]'::jsonb NOT NULL,
    resolution_rule text DEFAULT 'priority'::text NOT NULL,
    resolved_skill_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);



--

-- Name: skill_effects_queue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skill_effects_queue (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    skill_use_id uuid NOT NULL,
    game_state_id uuid NOT NULL,
    room_id uuid NOT NULL,
    effect_type text NOT NULL,
    effect_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    priority integer DEFAULT 100 NOT NULL,
    execution_order integer DEFAULT 0 NOT NULL,
    status text DEFAULT 'queued'::text NOT NULL,
    conditions jsonb DEFAULT '{}'::jsonb,
    trigger_time timestamp with time zone,
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    processed_at timestamp with time zone,
    CONSTRAINT chk_skill_effects_queue_status CHECK ((status = ANY (ARRAY['queued'::text, 'processing'::text, 'completed'::text, 'failed'::text, 'cancelled'::text])))
);



--

-- Name: skill_uses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skill_uses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    game_state_id uuid NOT NULL,
    user_id uuid NOT NULL,
    skill_name text NOT NULL,
    target_user_id uuid,
    phase text NOT NULL,
    round_number integer NOT NULL,
    result jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    skill_priority integer DEFAULT 100,
    execution_status text DEFAULT 'pending'::text,
    skill_effects jsonb DEFAULT '{}'::jsonb,
    conditions_met jsonb DEFAULT '{}'::jsonb,
    execution_time timestamp with time zone,
    failure_reason text,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT chk_skill_uses_execution_status CHECK ((execution_status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'failed'::text, 'cancelled'::text]))),
    CONSTRAINT chk_skill_uses_phase CHECK ((phase = ANY (ARRAY['day'::text, 'evening'::text, 'night'::text, 'dawn'::text])))
);

ALTER TABLE ONLY public.skill_uses REPLICA IDENTITY FULL;



--

-- Name: standardized_skill_targets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.standardized_skill_targets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    skill_use_id uuid NOT NULL,
    skill_effects_queue_id uuid,
    target_user_id uuid,
    target_type text NOT NULL,
    effect_applied jsonb DEFAULT '{}'::jsonb NOT NULL,
    effect_duration integer,
    effect_start_time timestamp with time zone DEFAULT now() NOT NULL,
    effect_end_time timestamp with time zone,
    stack_count integer DEFAULT 1 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT check_effect_applied_has_effect_type CHECK (((effect_applied IS NULL) OR (effect_applied = '{}'::jsonb) OR (effect_applied ? 'effect_type'::text))),
    CONSTRAINT check_effect_duration_non_negative CHECK (((effect_duration IS NULL) OR (effect_duration >= 0))),
    CONSTRAINT check_stack_count_positive CHECK ((stack_count > 0))
);



--

-- Name: uploaded_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uploaded_files (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    file_name text NOT NULL,
    file_path text NOT NULL,
    room_id uuid,
    uploaded_at timestamp with time zone DEFAULT now()
);



--

-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    user_id uuid DEFAULT auth.uid() NOT NULL,
    avatar_url text,
    experience integer DEFAULT 0,
    level integer DEFAULT 1,
    games_won integer DEFAULT 0,
    games_lost integer DEFAULT 0,
    player_name text
);



--

-- Name: vote_processing_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vote_processing_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    voting_result_id uuid NOT NULL,
    processing_step text NOT NULL,
    step_status text NOT NULL,
    step_details jsonb,
    error_message text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.vote_processing_logs REPLICA IDENTITY FULL;



--

-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    voting_session_id uuid NOT NULL,
    voter_id uuid NOT NULL,
    target_id uuid,
    vote_time timestamp with time zone DEFAULT now() NOT NULL,
    is_valid boolean DEFAULT true NOT NULL,
    vote_weight integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.votes REPLICA IDENTITY FULL;



--

-- Name: voting_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.voting_results (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    voting_session_id uuid NOT NULL,
    target_id uuid,
    total_votes integer DEFAULT 0 NOT NULL,
    vote_percentage numeric(5,2),
    is_majority boolean DEFAULT false NOT NULL,
    is_tied boolean DEFAULT false NOT NULL,
    result_type text DEFAULT 'no_result'::text NOT NULL,
    processing_status text DEFAULT 'pending'::text NOT NULL,
    processed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.voting_results REPLICA IDENTITY FULL;



--

-- Name: voting_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.voting_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    game_state_id uuid NOT NULL,
    room_id uuid NOT NULL,
    round_number integer NOT NULL,
    phase integer NOT NULL,
    session_type text DEFAULT 'day_vote'::text NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    start_time timestamp with time zone DEFAULT now() NOT NULL,
    end_time timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.voting_sessions REPLICA IDENTITY FULL;



--

-- Name: chat_messages chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);


--

-- Name: game_phase_history game_phase_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_phase_history
    ADD CONSTRAINT game_phase_history_pkey PRIMARY KEY (id);


--

-- Name: room_questions game_questions_game_id_question_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_questions
    ADD CONSTRAINT game_questions_game_id_question_id_key UNIQUE (room_id, question_id);


--

-- Name: room_questions game_questions_game_id_question_order_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_questions
    ADD CONSTRAINT game_questions_game_id_question_order_key UNIQUE (room_id, question_order);


--

-- Name: room_questions game_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_questions
    ADD CONSTRAINT game_questions_pkey PRIMARY KEY (id);


--

-- Name: game_sessions game_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_sessions
    ADD CONSTRAINT game_sessions_pkey PRIMARY KEY (id);


--

-- Name: game_settings game_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_settings
    ADD CONSTRAINT game_settings_pkey PRIMARY KEY (id);


--

-- Name: game_settings game_settings_room_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_settings
    ADD CONSTRAINT game_settings_room_id_key UNIQUE (room_id);


--

-- Name: game_states game_states_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_states
    ADD CONSTRAINT game_states_pkey PRIMARY KEY (id);


--

-- Name: game_states game_states_room_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_states
    ADD CONSTRAINT game_states_room_id_key UNIQUE (room_id);


--

-- Name: generated_questions generated_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.generated_questions
    ADD CONSTRAINT generated_questions_pkey PRIMARY KEY (id);


--

-- Name: room_answers player_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_answers
    ADD CONSTRAINT player_answers_pkey PRIMARY KEY (id);


--

-- Name: role_states player_game_states_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_states
    ADD CONSTRAINT player_game_states_pkey PRIMARY KEY (id);


--

-- Name: preprocessed_files preprocessed_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preprocessed_files
    ADD CONSTRAINT preprocessed_files_pkey PRIMARY KEY (id);


--

-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--

-- Name: role_design role_design_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_design
    ADD CONSTRAINT role_design_pkey PRIMARY KEY (id);


--

-- Name: role_design role_design_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_design
    ADD CONSTRAINT role_design_role_name_key UNIQUE (role_name);


--

-- Name: role_selections role_selections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_selections
    ADD CONSTRAINT role_selections_pkey PRIMARY KEY (id);


--

-- Name: role_selections role_selections_unique_room_role; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_selections
    ADD CONSTRAINT role_selections_unique_room_role UNIQUE (room_id, role_id);


--

-- Name: role_selections role_selections_unique_room_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_selections
    ADD CONSTRAINT role_selections_unique_room_user UNIQUE (room_id, user_id);


--

-- Name: role_selections role_selections_user_room_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_selections
    ADD CONSTRAINT role_selections_user_room_unique UNIQUE (user_id, room_id);


--

-- Name: room_players room_players_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_players
    ADD CONSTRAINT room_players_pkey PRIMARY KEY (id);


--

-- Name: room_players room_players_room_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_players
    ADD CONSTRAINT room_players_room_id_user_id_key UNIQUE (room_id, user_id);


--

-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--

-- Name: rooms rooms_room_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_room_id_key UNIQUE (room_id);


--

-- Name: skill_conflicts skill_conflicts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_conflicts
    ADD CONSTRAINT skill_conflicts_pkey PRIMARY KEY (id);


--

-- Name: skill_effects_queue skill_effects_queue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_effects_queue
    ADD CONSTRAINT skill_effects_queue_pkey PRIMARY KEY (id);


--

-- Name: skill_uses skill_uses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_uses
    ADD CONSTRAINT skill_uses_pkey PRIMARY KEY (id);


--

-- Name: standardized_skill_targets standardized_skill_targets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.standardized_skill_targets
    ADD CONSTRAINT standardized_skill_targets_pkey PRIMARY KEY (id);


--

-- Name: skill_conflicts unique_conflict_per_round_phase; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_conflicts
    ADD CONSTRAINT unique_conflict_per_round_phase UNIQUE (game_state_id, round_number, phase);


--

-- Name: generated_questions unique_generated_questions; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.generated_questions
    ADD CONSTRAINT unique_generated_questions UNIQUE (original_file_path);


--

-- Name: preprocessed_files unique_preprocessed_file; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preprocessed_files
    ADD CONSTRAINT unique_preprocessed_file UNIQUE (original_file_path);


--

-- Name: role_selections unique_role_selection_per_room; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_selections
    ADD CONSTRAINT unique_role_selection_per_room UNIQUE (room_id, user_id, role_id);


--

-- Name: role_states unique_role_state_per_selection; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_states
    ADD CONSTRAINT unique_role_state_per_selection UNIQUE (game_state_id, room_id, user_id, role_id);


--

-- Name: room_answers unique_room_answer_per_question; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_answers
    ADD CONSTRAINT unique_room_answer_per_question UNIQUE (room_id, user_id, question_order);


--

-- Name: uploaded_files uploaded_files_file_name_room_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uploaded_files
    ADD CONSTRAINT uploaded_files_file_name_room_id_key UNIQUE (file_name, room_id);


--

-- Name: uploaded_files uploaded_files_file_path_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uploaded_files
    ADD CONSTRAINT uploaded_files_file_path_key UNIQUE (file_path);


--

-- Name: uploaded_files uploaded_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uploaded_files
    ADD CONSTRAINT uploaded_files_pkey PRIMARY KEY (id);


--

-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--

-- Name: users users_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_id_key UNIQUE (user_id);


--

-- Name: vote_processing_logs vote_processing_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vote_processing_logs
    ADD CONSTRAINT vote_processing_logs_pkey PRIMARY KEY (id);


--

-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--

-- Name: votes votes_voting_session_id_voter_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_voting_session_id_voter_id_key UNIQUE (voting_session_id, voter_id);


--

-- Name: voting_results voting_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.voting_results
    ADD CONSTRAINT voting_results_pkey PRIMARY KEY (id);


--

-- Name: voting_sessions voting_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.voting_sessions
    ADD CONSTRAINT voting_sessions_pkey PRIMARY KEY (id);


--

-- Name: idx_chat_messages_chat_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_chat_messages_chat_type ON public.chat_messages USING btree (chat_type);


--

-- Name: idx_chat_messages_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_chat_messages_created_at ON public.chat_messages USING btree (created_at DESC);


--

-- Name: idx_chat_messages_game_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_chat_messages_game_id ON public.chat_messages USING btree (game_id);


--

-- Name: idx_chat_messages_recipient_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_chat_messages_recipient_id ON public.chat_messages USING btree (recipient_id);


--

-- Name: idx_chat_messages_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_chat_messages_room_id ON public.chat_messages USING btree (room_id);


--

-- Name: idx_chat_messages_room_phase_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_chat_messages_room_phase_time ON public.chat_messages USING btree (room_id, game_phase, created_at DESC);


--

-- Name: idx_chat_messages_room_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_chat_messages_room_type ON public.chat_messages USING btree (room_id, chat_type, created_at DESC);


--

-- Name: idx_chat_messages_sender_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_chat_messages_sender_id ON public.chat_messages USING btree (sender_id);


--

-- Name: idx_game_phase_history_ended_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_phase_history_ended_at ON public.game_phase_history USING btree (ended_at DESC);


--

-- Name: idx_game_phase_history_game_state_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_phase_history_game_state_id ON public.game_phase_history USING btree (game_state_id);


--

-- Name: idx_game_phase_history_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_phase_history_phase ON public.game_phase_history USING btree (phase);


--

-- Name: idx_game_phase_history_round_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_phase_history_round_number ON public.game_phase_history USING btree (round_number);


--

-- Name: idx_game_phase_history_started_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_phase_history_started_at ON public.game_phase_history USING btree (started_at DESC);


--

-- Name: idx_game_sessions_end_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_sessions_end_time ON public.game_sessions USING btree (end_time DESC);


--

-- Name: idx_game_sessions_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_sessions_room_id ON public.game_sessions USING btree (room_id);


--

-- Name: idx_game_sessions_start_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_sessions_start_time ON public.game_sessions USING btree (start_time DESC);


--

-- Name: idx_game_sessions_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_sessions_status ON public.game_sessions USING btree (status);


--

-- Name: idx_game_sessions_winner_faction; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_sessions_winner_faction ON public.game_sessions USING btree (winner_faction);


--

-- Name: idx_game_settings_is_auto_advance; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_settings_is_auto_advance ON public.game_settings USING btree (is_auto_advance);


--

-- Name: idx_game_settings_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_settings_room_id ON public.game_settings USING btree (room_id);


--

-- Name: idx_game_states_active_rooms; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_states_active_rooms ON public.game_states USING btree (room_id, status) WHERE (status = 'active'::text);


--

-- Name: idx_game_states_current_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_states_current_phase ON public.game_states USING btree (current_phase);


--

-- Name: idx_game_states_current_round; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_states_current_round ON public.game_states USING btree (current_round);


--

-- Name: idx_game_states_is_paused; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_states_is_paused ON public.game_states USING btree (is_paused);


--

-- Name: idx_game_states_phase_end_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_states_phase_end_time ON public.game_states USING btree (phase_end_time);


--

-- Name: idx_game_states_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_states_room_id ON public.game_states USING btree (room_id);


--

-- Name: idx_game_states_room_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_states_room_status ON public.game_states USING btree (room_id, status, current_phase, current_round);


--

-- Name: idx_game_states_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_game_states_status ON public.game_states USING btree (status);


--

-- Name: idx_preprocessed_files_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_preprocessed_files_created_at ON public.preprocessed_files USING btree (created_at DESC);


--

-- Name: idx_preprocessed_files_file_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_preprocessed_files_file_name ON public.preprocessed_files USING btree (file_name);


--

-- Name: idx_questions_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_questions_category ON public.questions USING btree (category);


--

-- Name: idx_questions_correct_option; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_questions_correct_option ON public.questions USING btree (correct_option);


--

-- Name: idx_questions_difficulty; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_questions_difficulty ON public.questions USING btree (difficulty);


--

-- Name: idx_role_design_faction; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_design_faction ON public.role_design USING btree (faction);


--

-- Name: idx_role_design_name_faction; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_design_name_faction ON public.role_design USING btree (role_name, faction);


--

-- Name: idx_role_design_priority; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_design_priority ON public.role_design USING btree (priority);


--

-- Name: idx_role_design_role_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_design_role_name ON public.role_design USING btree (role_name);


--

-- Name: idx_role_design_skill_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_design_skill_name ON public.role_design USING btree (skill_name);


--

-- Name: idx_role_design_usage_frequency; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_design_usage_frequency ON public.role_design USING btree (usage_frequency);


--

-- Name: idx_role_selections_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_selections_room_id ON public.role_selections USING btree (room_id);


--

-- Name: idx_role_selections_room_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_selections_room_user ON public.role_selections USING btree (room_id, user_id);


--

-- Name: idx_role_selections_selected_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_selections_selected_at ON public.role_selections USING btree (selected_at DESC);


--

-- Name: idx_role_selections_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_selections_user_id ON public.role_selections USING btree (user_id);


--

-- Name: idx_role_states_current_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_states_current_phase ON public.role_states USING btree (current_phase);


--

-- Name: idx_role_states_game_role_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_states_game_role_status ON public.role_states USING btree (game_state_id, role_status);


--

-- Name: idx_role_states_game_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_states_game_user ON public.role_states USING btree (game_state_id, user_id);


--

-- Name: idx_role_states_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_states_room_id ON public.role_states USING btree (room_id);


--

-- Name: idx_role_states_room_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_states_room_status ON public.role_states USING btree (room_id, role_status);


--

-- Name: idx_role_states_room_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_states_room_user ON public.role_states USING btree (room_id, user_id);


--

-- Name: idx_room_answers_is_correct; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_answers_is_correct ON public.room_answers USING btree (is_correct);


--

-- Name: idx_room_answers_role_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_answers_role_id ON public.room_answers USING btree (role_id);


--

-- Name: idx_room_answers_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_answers_room_id ON public.room_answers USING btree (room_id);


--

-- Name: idx_room_answers_room_question; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_answers_room_question ON public.room_answers USING btree (room_question_id, question_order);


--

-- Name: idx_room_answers_room_question_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_answers_room_question_id ON public.room_answers USING btree (room_question_id);


--

-- Name: idx_room_answers_room_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_answers_room_user ON public.room_answers USING btree (room_id, user_id);


--

-- Name: idx_room_players_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_players_active ON public.room_players USING btree (room_id, is_ai) WHERE (is_ready = true);


--

-- Name: idx_room_players_is_ai; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_players_is_ai ON public.room_players USING btree (is_ai);


--

-- Name: idx_room_players_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_players_room_id ON public.room_players USING btree (room_id);


--

-- Name: idx_room_players_room_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_players_room_user ON public.room_players USING btree (room_id, user_id);


--

-- Name: idx_room_players_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_players_status ON public.room_players USING btree (status);


--

-- Name: idx_room_players_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_players_user_id ON public.room_players USING btree (user_id);


--

-- Name: idx_room_questions_question_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_questions_question_id ON public.room_questions USING btree (question_id);


--

-- Name: idx_room_questions_question_order; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_questions_question_order ON public.room_questions USING btree (question_order);


--

-- Name: idx_room_questions_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_questions_room_id ON public.room_questions USING btree (room_id);


--

-- Name: idx_rooms_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rooms_created_at ON public.rooms USING btree (created_at DESC);


--

-- Name: idx_rooms_host_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rooms_host_id ON public.rooms USING btree (host_id);


--

-- Name: idx_rooms_judge_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rooms_judge_user_id ON public.rooms USING btree (judge_user_id);


--

-- Name: idx_rooms_last_human_activity; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rooms_last_human_activity ON public.rooms USING btree (last_human_activity DESC);


--

-- Name: idx_rooms_next_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rooms_next_room_id ON public.rooms USING btree (next_room_id);


--

-- Name: idx_rooms_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rooms_room_id ON public.rooms USING btree (room_id);


--

-- Name: idx_rooms_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rooms_status ON public.rooms USING btree (status);


--

-- Name: idx_skill_conflicts_game_round; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_conflicts_game_round ON public.skill_conflicts USING btree (game_state_id, round_number, phase);


--

-- Name: idx_skill_conflicts_game_round_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_conflicts_game_round_phase ON public.skill_conflicts USING btree (game_state_id, round_number, phase);


--

-- Name: idx_skill_conflicts_game_state; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_conflicts_game_state ON public.skill_conflicts USING btree (game_state_id);


--

-- Name: idx_skill_conflicts_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_conflicts_phase ON public.skill_conflicts USING btree (phase);


--

-- Name: idx_skill_conflicts_resolution_rule; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_conflicts_resolution_rule ON public.skill_conflicts USING btree (resolution_rule);


--

-- Name: idx_skill_conflicts_resolved_skill_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_conflicts_resolved_skill_id ON public.skill_conflicts USING btree (resolved_skill_id);


--

-- Name: idx_skill_conflicts_round_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_conflicts_round_number ON public.skill_conflicts USING btree (round_number);


--

-- Name: idx_skill_effects_queue_effect_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_effect_type ON public.skill_effects_queue USING btree (effect_type);


--

-- Name: idx_skill_effects_queue_expires_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_expires_at ON public.skill_effects_queue USING btree (expires_at);


--

-- Name: idx_skill_effects_queue_game_priority; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_game_priority ON public.skill_effects_queue USING btree (game_state_id, priority, execution_order);


--

-- Name: idx_skill_effects_queue_game_room; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_game_room ON public.skill_effects_queue USING btree (game_state_id, room_id);


--

-- Name: idx_skill_effects_queue_pending; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_pending ON public.skill_effects_queue USING btree (game_state_id, priority, created_at) WHERE (status = 'queued'::text);


--

-- Name: idx_skill_effects_queue_processing; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_processing ON public.skill_effects_queue USING btree (status, trigger_time, priority);


--

-- Name: idx_skill_effects_queue_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_room_id ON public.skill_effects_queue USING btree (room_id);


--

-- Name: idx_skill_effects_queue_skill_use_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_skill_use_id ON public.skill_effects_queue USING btree (skill_use_id);


--

-- Name: idx_skill_effects_queue_status_trigger; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_status_trigger ON public.skill_effects_queue USING btree (status, trigger_time) WHERE (status = 'queued'::text);


--

-- Name: idx_skill_effects_queue_trigger_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_effects_queue_trigger_time ON public.skill_effects_queue USING btree (trigger_time);


--

-- Name: idx_skill_uses_execution_priority; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_execution_priority ON public.skill_uses USING btree (game_state_id, round_number, phase, execution_status, skill_priority, created_at);


--

-- Name: idx_skill_uses_execution_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_execution_status ON public.skill_uses USING btree (execution_status);


--

-- Name: idx_skill_uses_game_round_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_game_round_phase ON public.skill_uses USING btree (game_state_id, round_number, phase);


--

-- Name: idx_skill_uses_game_round_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_game_round_status ON public.skill_uses USING btree (game_state_id, round_number, execution_status);


--

-- Name: idx_skill_uses_game_state_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_game_state_id ON public.skill_uses USING btree (game_state_id);


--

-- Name: idx_skill_uses_game_state_round_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_game_state_round_phase ON public.skill_uses USING btree (game_state_id, round_number, phase);


--

-- Name: idx_skill_uses_game_user_round; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_game_user_round ON public.skill_uses USING btree (game_state_id, user_id, round_number, phase);


--

-- Name: idx_skill_uses_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_phase ON public.skill_uses USING btree (phase);


--

-- Name: idx_skill_uses_priority; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_priority ON public.skill_uses USING btree (skill_priority);


--

-- Name: idx_skill_uses_recent_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_recent_active ON public.skill_uses USING btree (game_state_id, created_at) WHERE (execution_status = ANY (ARRAY['pending'::text, 'processing'::text]));


--

-- Name: idx_skill_uses_round_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_round_phase ON public.skill_uses USING btree (round_number, phase);


--

-- Name: idx_skill_uses_skill_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_skill_name ON public.skill_uses USING btree (skill_name);


--

-- Name: idx_skill_uses_target_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_target_user_id ON public.skill_uses USING btree (target_user_id);


--

-- Name: idx_skill_uses_user_game_state; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_user_game_state ON public.skill_uses USING btree (user_id, game_state_id);


--

-- Name: idx_skill_uses_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_skill_uses_user_id ON public.skill_uses USING btree (user_id);


--

-- Name: idx_standardized_skill_targets_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_standardized_skill_targets_active ON public.standardized_skill_targets USING btree (skill_use_id, is_active, effect_end_time);


--

-- Name: idx_standardized_skill_targets_active_effects; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_standardized_skill_targets_active_effects ON public.standardized_skill_targets USING btree (is_active, effect_end_time) WHERE (is_active = true);


--

-- Name: idx_standardized_skill_targets_effect_applied; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_standardized_skill_targets_effect_applied ON public.standardized_skill_targets USING gin (effect_applied);


--

-- Name: idx_standardized_skill_targets_effect_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_standardized_skill_targets_effect_type ON public.standardized_skill_targets USING btree (((effect_applied ->> 'effect_type'::text)));


--

-- Name: idx_standardized_skill_targets_skill_use_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_standardized_skill_targets_skill_use_id ON public.standardized_skill_targets USING btree (skill_use_id);


--

-- Name: idx_standardized_skill_targets_target_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_standardized_skill_targets_target_user_id ON public.standardized_skill_targets USING btree (target_user_id);


--

-- Name: idx_standardized_skill_targets_user_game; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_standardized_skill_targets_user_game ON public.standardized_skill_targets USING btree (target_user_id, skill_use_id);


--

-- Name: idx_uploaded_files_file_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_uploaded_files_file_name ON public.uploaded_files USING btree (file_name);


--

-- Name: idx_uploaded_files_uploaded_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_uploaded_files_uploaded_at ON public.uploaded_files USING btree (uploaded_at DESC);


--

-- Name: idx_users_experience; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_experience ON public.users USING btree (experience);


--

-- Name: idx_users_level; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_level ON public.users USING btree (level);


--

-- Name: idx_users_player_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_player_name ON public.users USING btree (player_name);


--

-- Name: idx_users_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_user_id ON public.users USING btree (user_id);


--

-- Name: idx_vote_processing_logs_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vote_processing_logs_created_at ON public.vote_processing_logs USING btree (created_at DESC);


--

-- Name: idx_vote_processing_logs_processing_step; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vote_processing_logs_processing_step ON public.vote_processing_logs USING btree (processing_step);


--

-- Name: idx_vote_processing_logs_step_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vote_processing_logs_step_status ON public.vote_processing_logs USING btree (step_status);


--

-- Name: idx_vote_processing_logs_voting_result_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vote_processing_logs_voting_result_id ON public.vote_processing_logs USING btree (voting_result_id);


--

-- Name: idx_votes_is_valid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_votes_is_valid ON public.votes USING btree (is_valid);


--

-- Name: idx_votes_session_target; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_votes_session_target ON public.votes USING btree (voting_session_id, target_id) WHERE (is_valid = true);


--

-- Name: idx_votes_session_valid_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_votes_session_valid_time ON public.votes USING btree (voting_session_id, is_valid, vote_time DESC);


--

-- Name: idx_votes_session_voter; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_votes_session_voter ON public.votes USING btree (voting_session_id, voter_id);


--

-- Name: idx_votes_vote_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_votes_vote_time ON public.votes USING btree (vote_time DESC);


--

-- Name: idx_votes_voting_session_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_votes_voting_session_id ON public.votes USING btree (voting_session_id);


--

-- Name: idx_voting_results_processing_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_results_processing_status ON public.voting_results USING btree (processing_status);


--

-- Name: idx_voting_results_target_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_results_target_id ON public.voting_results USING btree (target_id);


--

-- Name: idx_voting_results_voting_session_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_results_voting_session_id ON public.voting_results USING btree (voting_session_id);


--

-- Name: idx_voting_sessions_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_sessions_active ON public.voting_sessions USING btree (room_id, status) WHERE (status = 'active'::text);


--

-- Name: idx_voting_sessions_game_state_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_sessions_game_state_id ON public.voting_sessions USING btree (game_state_id);


--

-- Name: idx_voting_sessions_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_sessions_room_id ON public.voting_sessions USING btree (room_id);


--

-- Name: idx_voting_sessions_round_phase; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_sessions_round_phase ON public.voting_sessions USING btree (round_number, phase);


--

-- Name: idx_voting_sessions_session_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_sessions_session_type ON public.voting_sessions USING btree (session_type);


--

-- Name: idx_voting_sessions_start_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_sessions_start_time ON public.voting_sessions USING btree (start_time DESC);


--

-- Name: idx_voting_sessions_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_voting_sessions_status ON public.voting_sessions USING btree (status);


--

-- Name: role_states trigger_initialize_role_state; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_initialize_role_state BEFORE INSERT ON public.role_states FOR EACH ROW EXECUTE FUNCTION public.initialize_role_state();


--

-- Name: standardized_skill_targets trigger_skill_effect_announcement; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_skill_effect_announcement AFTER INSERT ON public.standardized_skill_targets FOR EACH ROW EXECUTE FUNCTION public.handle_skill_effect_announcement();


--

-- Name: skill_uses trigger_skill_use_announcement; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_skill_use_announcement AFTER INSERT ON public.skill_uses FOR EACH ROW EXECUTE FUNCTION public.handle_skill_use_announcement();


--

-- Name: role_states trigger_update_role_status_effects; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_role_status_effects BEFORE UPDATE ON public.role_states FOR EACH ROW WHEN ((old.role_status IS DISTINCT FROM new.role_status)) EXECUTE FUNCTION public.update_role_status();


--

-- Name: room_players trigger_update_room_human_activity; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_room_human_activity AFTER INSERT OR DELETE ON public.room_players FOR EACH ROW EXECUTE FUNCTION public.update_room_human_activity();


--

-- Name: game_states update_game_states_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_game_states_updated_at BEFORE UPDATE ON public.game_states FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--

-- Name: role_states update_player_game_states_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_player_game_states_updated_at BEFORE UPDATE ON public.role_states FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--

-- Name: skill_conflicts update_skill_conflicts_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_skill_conflicts_updated_at BEFORE UPDATE ON public.skill_conflicts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--

-- Name: skill_effects_queue update_skill_effects_queue_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_skill_effects_queue_updated_at BEFORE UPDATE ON public.skill_effects_queue FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--

-- Name: standardized_skill_targets update_standardized_skill_targets_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_standardized_skill_targets_updated_at BEFORE UPDATE ON public.standardized_skill_targets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--

-- Name: chat_messages chat_messages_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.game_states(id) ON DELETE CASCADE;


--

-- Name: chat_messages chat_messages_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES auth.users(id);


--

-- Name: chat_messages chat_messages_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--

-- Name: chat_messages chat_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES auth.users(id);


--

-- Name: vote_processing_logs fk_logs_voting_result; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vote_processing_logs
    ADD CONSTRAINT fk_logs_voting_result FOREIGN KEY (voting_result_id) REFERENCES public.voting_results(id) ON DELETE CASCADE;


--

-- Name: role_selections fk_role_selections_role_design; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_selections
    ADD CONSTRAINT fk_role_selections_role_design FOREIGN KEY (role_id) REFERENCES public.role_design(id);


--

-- Name: role_states fk_role_states_game_state_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_states
    ADD CONSTRAINT fk_role_states_game_state_id FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) ON DELETE CASCADE;


--

-- Name: role_states fk_role_states_role_selection; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_states
    ADD CONSTRAINT fk_role_states_role_selection FOREIGN KEY (room_id, user_id, role_id) REFERENCES public.role_selections(room_id, user_id, role_id) ON DELETE CASCADE;


--

-- Name: room_answers fk_room_answers_role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_answers
    ADD CONSTRAINT fk_room_answers_role_id FOREIGN KEY (role_id) REFERENCES public.role_design(id) ON DELETE CASCADE;


--

-- Name: room_answers fk_room_answers_room_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_answers
    ADD CONSTRAINT fk_room_answers_room_id FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--

-- Name: room_answers fk_room_answers_room_question_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_answers
    ADD CONSTRAINT fk_room_answers_room_question_id FOREIGN KEY (room_question_id) REFERENCES public.room_questions(id) ON DELETE CASCADE;


--

-- Name: room_answers fk_room_answers_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_answers
    ADD CONSTRAINT fk_room_answers_user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--

-- Name: skill_conflicts fk_skill_conflicts_game_state; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_conflicts
    ADD CONSTRAINT fk_skill_conflicts_game_state FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) ON DELETE CASCADE;


--

-- Name: skill_conflicts fk_skill_conflicts_resolved_skill; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_conflicts
    ADD CONSTRAINT fk_skill_conflicts_resolved_skill FOREIGN KEY (resolved_skill_id) REFERENCES public.skill_uses(id) ON DELETE SET NULL;


--

-- Name: skill_effects_queue fk_skill_effects_queue_game_state; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_effects_queue
    ADD CONSTRAINT fk_skill_effects_queue_game_state FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) ON DELETE CASCADE;


--

-- Name: skill_effects_queue fk_skill_effects_queue_game_state_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_effects_queue
    ADD CONSTRAINT fk_skill_effects_queue_game_state_id FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) ON DELETE CASCADE;


--

-- Name: skill_effects_queue fk_skill_effects_queue_room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_effects_queue
    ADD CONSTRAINT fk_skill_effects_queue_room FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--

-- Name: skill_effects_queue fk_skill_effects_queue_skill_use; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_effects_queue
    ADD CONSTRAINT fk_skill_effects_queue_skill_use FOREIGN KEY (skill_use_id) REFERENCES public.skill_uses(id) ON DELETE CASCADE;


--

-- Name: skill_effects_queue fk_skill_effects_queue_skill_use_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_effects_queue
    ADD CONSTRAINT fk_skill_effects_queue_skill_use_id FOREIGN KEY (skill_use_id) REFERENCES public.skill_uses(id) ON DELETE CASCADE;


--

-- Name: skill_uses fk_skill_uses_game_state; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_uses
    ADD CONSTRAINT fk_skill_uses_game_state FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) ON DELETE CASCADE;


--

-- Name: standardized_skill_targets fk_standardized_skill_targets_skill_effects_queue_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.standardized_skill_targets
    ADD CONSTRAINT fk_standardized_skill_targets_skill_effects_queue_id FOREIGN KEY (skill_effects_queue_id) REFERENCES public.skill_effects_queue(id) ON DELETE CASCADE;


--

-- Name: standardized_skill_targets fk_standardized_skill_targets_skill_use_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.standardized_skill_targets
    ADD CONSTRAINT fk_standardized_skill_targets_skill_use_id FOREIGN KEY (skill_use_id) REFERENCES public.skill_uses(id) ON DELETE CASCADE;


--

-- Name: votes fk_votes_voting_session; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT fk_votes_voting_session FOREIGN KEY (voting_session_id) REFERENCES public.voting_sessions(id) ON DELETE CASCADE;


--

-- Name: voting_results fk_voting_results_session; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.voting_results
    ADD CONSTRAINT fk_voting_results_session FOREIGN KEY (voting_session_id) REFERENCES public.voting_sessions(id) ON DELETE CASCADE;


--

-- Name: game_phase_history game_phase_history_game_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_phase_history
    ADD CONSTRAINT game_phase_history_game_state_id_fkey FOREIGN KEY (game_state_id) REFERENCES public.game_states(id) ON DELETE CASCADE;


--

-- Name: room_questions game_questions_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_questions
    ADD CONSTRAINT game_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--

-- Name: game_sessions game_sessions_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_sessions
    ADD CONSTRAINT game_sessions_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--

-- Name: game_settings game_settings_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_settings
    ADD CONSTRAINT game_settings_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--

-- Name: game_states game_states_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_states
    ADD CONSTRAINT game_states_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--

-- Name: generated_questions generated_questions_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.generated_questions
    ADD CONSTRAINT generated_questions_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--

-- Name: generated_questions generated_questions_uploaded_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.generated_questions
    ADD CONSTRAINT generated_questions_uploaded_file_id_fkey FOREIGN KEY (uploaded_file_id) REFERENCES public.uploaded_files(id);


--

-- Name: preprocessed_files preprocessed_files_uploaded_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preprocessed_files
    ADD CONSTRAINT preprocessed_files_uploaded_file_id_fkey FOREIGN KEY (uploaded_file_id) REFERENCES public.uploaded_files(id);


--

-- Name: questions questions_generated_questions_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_generated_questions_id_fkey FOREIGN KEY (generated_questions_id) REFERENCES public.generated_questions(id) ON DELETE SET NULL;


--

-- Name: role_selections role_selections_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_selections
    ADD CONSTRAINT role_selections_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--

-- Name: room_players room_players_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_players
    ADD CONSTRAINT room_players_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--

-- Name: room_players room_players_user_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_players
    ADD CONSTRAINT room_players_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES auth.users(id);


--

-- Name: room_questions room_questions_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_questions
    ADD CONSTRAINT room_questions_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--

-- Name: rooms rooms_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.users(user_id);


--

-- Name: rooms rooms_judge_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_judge_user_id_fkey FOREIGN KEY (judge_user_id) REFERENCES auth.users(id);


--

-- Name: rooms rooms_next_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_next_room_id_fkey FOREIGN KEY (next_room_id) REFERENCES public.rooms(id);


--

-- Name: uploaded_files uploaded_files_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uploaded_files
    ADD CONSTRAINT uploaded_files_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--

-- Name: role_design Allow all authenticated users to view role_design; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow all authenticated users to view role_design" ON public.role_design FOR SELECT TO authenticated USING (true);


--

-- Name: generated_questions Allow authenticated users to manage generated questions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to manage generated questions" ON public.generated_questions USING ((auth.uid() IS NOT NULL)) WITH CHECK ((auth.uid() IS NOT NULL));


--

-- Name: preprocessed_files Allow authenticated users to manage preprocessed files; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to manage preprocessed files" ON public.preprocessed_files USING ((auth.uid() IS NOT NULL)) WITH CHECK ((auth.uid() IS NOT NULL));


--

-- Name: uploaded_files Allow authenticated users to upload files; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to upload files" ON public.uploaded_files FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--

-- Name: uploaded_files Allow authenticated users to view uploaded files; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to view uploaded files" ON public.uploaded_files FOR SELECT USING ((auth.uid() IS NOT NULL));


--

-- Name: game_phase_history Allow judges to manage game phase history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow judges to manage game phase history" ON public.game_phase_history USING (public.is_room_judge(( SELECT game_states.room_id
   FROM public.game_states
  WHERE (game_states.id = game_phase_history.game_state_id)), auth.uid())) WITH CHECK (public.is_room_judge(( SELECT game_states.room_id
   FROM public.game_states
  WHERE (game_states.id = game_phase_history.game_state_id)), auth.uid()));


--

-- Name: game_settings Allow judges to manage game settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow judges to manage game settings" ON public.game_settings USING (public.is_room_judge(room_id, auth.uid())) WITH CHECK (public.is_room_judge(room_id, auth.uid()));


--

-- Name: game_states Allow judges to manage game states; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow judges to manage game states" ON public.game_states USING (public.is_room_judge(room_id, auth.uid())) WITH CHECK (public.is_room_judge(room_id, auth.uid()));


--

-- Name: voting_results Allow judges to manage voting results; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow judges to manage voting results" ON public.voting_results USING ((EXISTS ( SELECT 1
   FROM public.voting_sessions vs
  WHERE ((vs.id = voting_results.voting_session_id) AND public.is_room_judge(vs.room_id, auth.uid()))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM public.voting_sessions vs
  WHERE ((vs.id = voting_results.voting_session_id) AND public.is_room_judge(vs.room_id, auth.uid())))));


--

-- Name: rooms Allow judges to update next_room_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow judges to update next_room_id" ON public.rooms FOR UPDATE USING ((judge_user_id = auth.uid())) WITH CHECK ((judge_user_id = auth.uid()));


--

-- Name: role_selections Allow judges to view all role selections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow judges to view all role selections" ON public.role_selections FOR SELECT USING (public.is_room_judge(room_id, auth.uid()));


--

-- Name: room_answers Allow players to insert their own answers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow players to insert their own answers" ON public.room_answers FOR INSERT WITH CHECK (((user_id = auth.uid()) AND public.is_room_participant(room_id, auth.uid())));


--

-- Name: chat_messages Allow players to send and view messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow players to send and view messages" ON public.chat_messages USING (((sender_id = auth.uid()) AND (room_id IN ( SELECT room_players.room_id
   FROM public.room_players
  WHERE (room_players.user_id = auth.uid())))));


--

-- Name: room_answers Allow players to update their own answers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow players to update their own answers" ON public.room_answers FOR UPDATE USING ((user_id = auth.uid()));


--

-- Name: room_questions Allow room judges to manage room questions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room judges to manage room questions" ON public.room_questions USING (public.is_room_judge(room_id, auth.uid())) WITH CHECK (public.is_room_judge(room_id, auth.uid()));


--

-- Name: game_phase_history Allow room participants to view game phase history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view game phase history" ON public.game_phase_history FOR SELECT USING (public.is_room_participant(( SELECT game_states.room_id
   FROM public.game_states
  WHERE (game_states.id = game_phase_history.game_state_id)), auth.uid()));


--

-- Name: game_settings Allow room participants to view game settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view game settings" ON public.game_settings FOR SELECT USING (public.is_room_participant(room_id, auth.uid()));


--

-- Name: game_states Allow room participants to view game states; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view game states" ON public.game_states FOR SELECT USING (public.is_room_participant(room_id, auth.uid()));


--

-- Name: role_selections Allow room participants to view role selections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view role selections" ON public.role_selections FOR SELECT USING (public.is_room_participant(room_id, auth.uid()));


--

-- Name: room_answers Allow room participants to view room answers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view room answers" ON public.room_answers FOR SELECT USING (public.is_room_participant(room_id, auth.uid()));


--

-- Name: room_questions Allow room participants to view room questions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view room questions" ON public.room_questions FOR SELECT USING (public.is_room_participant(room_id, auth.uid()));


--

-- Name: standardized_skill_targets Allow room participants to view standardized skill targets; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view standardized skill targets" ON public.standardized_skill_targets FOR SELECT USING (
CASE
    WHEN (skill_effects_queue_id IS NOT NULL) THEN public.is_room_participant(public.get_skill_target_room_id(skill_effects_queue_id), auth.uid())
    ELSE (EXISTS ( SELECT 1
       FROM (public.skill_uses su
         JOIN public.game_states gs ON ((gs.id = su.game_state_id)))
      WHERE ((su.id = standardized_skill_targets.skill_use_id) AND public.is_room_participant(gs.room_id, auth.uid()))))
END);


--

-- Name: vote_processing_logs Allow room participants to view vote processing logs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view vote processing logs" ON public.vote_processing_logs FOR SELECT USING ((EXISTS ( SELECT 1
   FROM (public.voting_results vr
     JOIN public.voting_sessions vs ON ((vs.id = vr.voting_session_id)))
  WHERE ((vr.id = vote_processing_logs.voting_result_id) AND public.is_room_participant(vs.room_id, auth.uid())))));


--

-- Name: votes Allow room participants to view votes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view votes" ON public.votes FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.voting_sessions vs
  WHERE ((vs.id = votes.voting_session_id) AND public.is_room_participant(vs.room_id, auth.uid())))));


--

-- Name: voting_results Allow room participants to view voting results; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow room participants to view voting results" ON public.voting_results FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.voting_sessions vs
  WHERE ((vs.id = voting_results.voting_session_id) AND public.is_room_participant(vs.room_id, auth.uid())))));


--

-- Name: standardized_skill_targets Allow system to insert standardized skill targets; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow system to insert standardized skill targets" ON public.standardized_skill_targets FOR INSERT WITH CHECK (true);


--

-- Name: standardized_skill_targets Allow system to update standardized skill targets; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow system to update standardized skill targets" ON public.standardized_skill_targets FOR UPDATE USING (true);


--

-- Name: votes Allow voters to cast their votes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow voters to cast their votes" ON public.votes FOR INSERT WITH CHECK (((voter_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM public.voting_sessions vs
  WHERE ((vs.id = votes.voting_session_id) AND public.is_room_participant(vs.room_id, auth.uid()) AND (vs.status = 'active'::text))))));


--

-- Name: votes Allow voters to update their votes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow voters to update their votes" ON public.votes FOR UPDATE USING ((voter_id = auth.uid()));


--

-- Name: room_players Authenticated users can view room players they're involved with; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can view room players they're involved with" ON public.room_players FOR SELECT TO authenticated USING (public.is_room_participant(room_id, auth.uid()));


--

-- Name: chat_messages Chat visibility by type and participation; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Chat visibility by type and participation" ON public.chat_messages FOR SELECT USING ((((chat_type = 'public'::text) AND public.is_room_participant(room_id, auth.uid())) OR ((chat_type = 'private'::text) AND ((sender_id = auth.uid()) OR (recipient_id = auth.uid()))) OR ((chat_type = 'werewolf'::text) AND (EXISTS ( SELECT 1
   FROM (public.room_players rp
     JOIN public.game_sessions gs ON ((gs.room_id = rp.room_id)))
  WHERE ((gs.id = chat_messages.game_id) AND (rp.user_id = auth.uid()) AND (rp.role = ANY (ARRAY['Werewolf'::text, 'White Wolf King'::text, 'Night Sorcerer'::text, 'Demon'::text])))))) OR public.is_room_judge(room_id, auth.uid())));


--

-- Name: role_design Delete role_design; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Delete role_design" ON public.role_design FOR DELETE USING ((EXISTS ( SELECT 1
   FROM public.role_selections
  WHERE ((role_selections.role_id = role_design.id) AND (role_selections.user_id = auth.uid())))));


--

-- Name: rooms Host can update room settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Host can update room settings" ON public.rooms FOR UPDATE USING ((auth.uid() = host_id)) WITH CHECK ((auth.uid() = host_id));


--

-- Name: rooms Hosts can delete their own rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Hosts can delete their own rooms" ON public.rooms FOR DELETE TO authenticated USING ((host_id = auth.uid()));


--

-- Name: rooms Hosts can update their own rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Hosts can update their own rooms" ON public.rooms FOR UPDATE TO authenticated USING ((host_id = auth.uid()));


--

-- Name: role_design Insert role_design; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Insert role_design" ON public.role_design FOR INSERT WITH CHECK (true);


--

-- Name: game_sessions Judges can create game sessions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Judges can create game sessions" ON public.game_sessions FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.rooms
  WHERE ((rooms.id = game_sessions.room_id) AND (rooms.judge_user_id = auth.uid())))));


--

-- Name: game_sessions Judges can update game sessions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Judges can update game sessions" ON public.game_sessions FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM public.rooms
  WHERE ((rooms.id = game_sessions.room_id) AND (rooms.judge_user_id = auth.uid())))));


--

-- Name: role_selections Players can view role selections in their room; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Players can view role selections in their room" ON public.role_selections FOR SELECT USING ((room_id IN ( SELECT room_players.room_id
   FROM public.room_players
  WHERE (room_players.user_id = auth.uid()))));


--

-- Name: game_sessions Players can view their game sessions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Players can view their game sessions" ON public.game_sessions FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.room_players
  WHERE ((room_players.room_id = game_sessions.room_id) AND (room_players.user_id = auth.uid())))));


--

-- Name: game_settings Room hosts can manage game settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Room hosts can manage game settings" ON public.game_settings USING ((room_id IN ( SELECT r.id
   FROM public.rooms r
  WHERE (r.host_id = auth.uid()))));


--

-- Name: game_sessions Room participants can view game sessions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Room participants can view game sessions" ON public.game_sessions FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.rooms
  WHERE ((rooms.id = game_sessions.room_id) AND ((rooms.judge_user_id = auth.uid()) OR (rooms.host_id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM public.room_players
          WHERE ((room_players.room_id = rooms.id) AND (room_players.user_id = auth.uid())))))))));


--

-- Name: generated_questions Room participants can view generated questions for their rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Room participants can view generated questions for their rooms" ON public.generated_questions FOR SELECT TO authenticated USING (((room_id IS NULL) OR public.is_room_participant(room_id, auth.uid())));


--

-- Name: preprocessed_files Room participants can view preprocessed files for their rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Room participants can view preprocessed files for their rooms" ON public.preprocessed_files FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.generated_questions gq
  WHERE ((gq.uploaded_file_id = preprocessed_files.uploaded_file_id) AND ((gq.room_id IS NULL) OR public.is_room_participant(gq.room_id, auth.uid()))))));


--

-- Name: role_design Select role_design; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Select role_design" ON public.role_design FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.role_selections
  WHERE ((role_selections.role_id = role_design.id) AND (role_selections.user_id = auth.uid())))));


--

-- Name: role_design Update role_design; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Update role_design" ON public.role_design FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM public.role_selections
  WHERE ((role_selections.role_id = role_design.id) AND (role_selections.user_id = auth.uid())))));


--

-- Name: rooms Users can create rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create rooms" ON public.rooms FOR INSERT TO authenticated WITH CHECK ((host_id = auth.uid()));


--

-- Name: users Users can delete own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own profile" ON public.users FOR DELETE TO authenticated USING ((user_id = auth.uid()));


--

-- Name: role_selections Users can delete their own role selections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete their own role selections" ON public.role_selections FOR DELETE USING ((auth.uid() = user_id));


--

-- Name: uploaded_files Users can delete uploaded files; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete uploaded files" ON public.uploaded_files FOR DELETE USING ((auth.uid() IS NOT NULL));


--

-- Name: users Users can insert own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT TO authenticated WITH CHECK ((user_id = auth.uid()));


--

-- Name: role_selections Users can insert their own role selections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own role selections" ON public.role_selections FOR INSERT WITH CHECK ((auth.uid() = user_id));


--

-- Name: uploaded_files Users can insert uploaded files; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert uploaded files" ON public.uploaded_files FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--

-- Name: room_players Users can join rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can join rooms" ON public.room_players FOR INSERT TO authenticated WITH CHECK ((user_id = auth.uid()));


--

-- Name: room_players Users can leave rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can leave rooms" ON public.room_players FOR DELETE TO authenticated USING ((user_id = auth.uid()));


--

-- Name: rooms Users can manage judgeship; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage judgeship" ON public.rooms FOR UPDATE USING (((judge_user_id IS NULL) OR (auth.uid() = judge_user_id))) WITH CHECK (((judge_user_id IS NULL) OR (auth.uid() = judge_user_id)));


--

-- Name: users Users can select own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can select own profile" ON public.users FOR SELECT TO authenticated USING ((user_id = auth.uid()));


--

-- Name: role_selections Users can select their own role selections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can select their own role selections" ON public.role_selections FOR SELECT USING ((auth.uid() = user_id));


--

-- Name: chat_messages Users can send chat messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can send chat messages" ON public.chat_messages FOR INSERT WITH CHECK (true);


--

-- Name: users Users can update own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE TO authenticated USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--

-- Name: room_players Users can update their own player status; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own player status" ON public.room_players FOR UPDATE TO authenticated USING ((user_id = auth.uid()));


--

-- Name: role_selections Users can update their own role selections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own role selections" ON public.role_selections FOR UPDATE USING ((auth.uid() = user_id));


--

-- Name: uploaded_files Users can update uploaded files; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update uploaded files" ON public.uploaded_files FOR UPDATE USING ((auth.uid() IS NOT NULL));


--

-- Name: rooms Users can view all rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view all rooms" ON public.rooms FOR SELECT TO authenticated USING (true);


--

-- Name: game_settings Users can view game settings for their rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view game settings for their rooms" ON public.game_settings FOR SELECT USING ((room_id IN ( SELECT rp.room_id
   FROM public.room_players rp
  WHERE (rp.user_id = auth.uid()))));


--

-- Name: generated_questions Users can view questions in their rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view questions in their rooms" ON public.generated_questions FOR SELECT USING (true);


--

-- Name: rooms Users can view rooms they are part of; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view rooms they are part of" ON public.rooms FOR SELECT USING (((auth.uid() = host_id) OR (auth.uid() = judge_user_id) OR (EXISTS ( SELECT 1
   FROM public.room_players
  WHERE ((room_players.room_id = rooms.id) AND (room_players.user_id = auth.uid()))))));


--

-- Name: rooms Users can view rooms they participate in or all waiting rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view rooms they participate in or all waiting rooms" ON public.rooms FOR SELECT TO authenticated USING (((status = 'waiting'::text) OR public.is_room_participant(id, auth.uid())));


--

-- Name: uploaded_files Users can view uploaded files; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view uploaded files" ON public.uploaded_files FOR SELECT USING ((auth.uid() IS NOT NULL));


--

-- Name: questions authenticated_can_create_manual_questions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY authenticated_can_create_manual_questions ON public.questions FOR INSERT TO authenticated WITH CHECK ((auth.uid() IS NOT NULL));


--

-- Name: questions authenticated_can_delete_questions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY authenticated_can_delete_questions ON public.questions FOR DELETE TO authenticated USING ((auth.uid() IS NOT NULL));


--

-- Name: questions authenticated_can_update_questions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY authenticated_can_update_questions ON public.questions FOR UPDATE TO authenticated USING ((auth.uid() IS NOT NULL)) WITH CHECK ((auth.uid() IS NOT NULL));


--

-- Name: questions authenticated_can_view_questions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY authenticated_can_view_questions ON public.questions FOR SELECT TO authenticated USING ((auth.uid() IS NOT NULL));


--

-- Name: chat_messages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

--

-- Name: game_phase_history; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.game_phase_history ENABLE ROW LEVEL SECURITY;

--

-- Name: game_sessions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;

--

-- Name: game_settings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.game_settings ENABLE ROW LEVEL SECURITY;

--

-- Name: game_states; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.game_states ENABLE ROW LEVEL SECURITY;

--

-- Name: generated_questions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.generated_questions ENABLE ROW LEVEL SECURITY;

--

-- Name: preprocessed_files; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.preprocessed_files ENABLE ROW LEVEL SECURITY;

--

-- Name: questions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

--

-- Name: role_design; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.role_design ENABLE ROW LEVEL SECURITY;

--

-- Name: role_selections; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.role_selections ENABLE ROW LEVEL SECURITY;

--

-- Name: role_selections role_selections_delete_own_in_room; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_selections_delete_own_in_room ON public.role_selections FOR DELETE USING (((user_id = auth.uid()) AND public.is_room_participant(room_id, auth.uid())));


--

-- Name: role_selections role_selections_insert_participants_only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_selections_insert_participants_only ON public.role_selections FOR INSERT WITH CHECK (((user_id = auth.uid()) AND public.is_room_participant(room_id, auth.uid())));


--

-- Name: role_selections role_selections_select_participants; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_selections_select_participants ON public.role_selections FOR SELECT USING ((public.is_room_participant(room_id, auth.uid()) OR public.is_room_judge(room_id, auth.uid())));


--

-- Name: role_selections role_selections_update_own_in_room; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_selections_update_own_in_room ON public.role_selections FOR UPDATE USING (((user_id = auth.uid()) AND public.is_room_participant(room_id, auth.uid()))) WITH CHECK (((user_id = auth.uid()) AND public.is_room_participant(room_id, auth.uid())));


--

-- Name: role_states; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.role_states ENABLE ROW LEVEL SECURITY;

--

-- Name: role_states role_states_select_room_participants; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_states_select_room_participants ON public.role_states FOR SELECT USING ((public.is_room_participant(room_id, auth.uid()) OR public.is_room_judge(room_id, auth.uid())));


--

-- Name: role_states role_states_update_judges_only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_states_update_judges_only ON public.role_states FOR UPDATE USING (public.is_room_judge(room_id, auth.uid())) WITH CHECK (public.is_room_judge(room_id, auth.uid()));


--

-- Name: room_answers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.room_answers ENABLE ROW LEVEL SECURITY;

--

-- Name: room_players; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.room_players ENABLE ROW LEVEL SECURITY;

--

-- Name: room_questions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.room_questions ENABLE ROW LEVEL SECURITY;

--

-- Name: rooms; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

--

-- Name: questions service_role_can_insert_questions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY service_role_can_insert_questions ON public.questions FOR INSERT TO service_role WITH CHECK (true);


--

-- Name: skill_conflicts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.skill_conflicts ENABLE ROW LEVEL SECURITY;

--

-- Name: skill_effects_queue; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.skill_effects_queue ENABLE ROW LEVEL SECURITY;

--

-- Name: skill_uses; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.skill_uses ENABLE ROW LEVEL SECURITY;

--

-- Name: standardized_skill_targets; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.standardized_skill_targets ENABLE ROW LEVEL SECURITY;

--

-- Name: uploaded_files; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;

--

-- Name: users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--

-- Name: vote_processing_logs; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vote_processing_logs ENABLE ROW LEVEL SECURITY;

--

-- Name: votes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

--

-- Name: voting_results; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.voting_results ENABLE ROW LEVEL SECURITY;

--

-- Name: voting_sessions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.voting_sessions ENABLE ROW LEVEL SECURITY;

--

-- Name: voting_sessions voting_sessions_insert_via_function; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY voting_sessions_insert_via_function ON public.voting_sessions FOR INSERT TO authenticated WITH CHECK ((public.is_room_participant(room_id, auth.uid()) OR public.is_room_judge(room_id, auth.uid())));


--

-- Name: voting_sessions voting_sessions_judge_manage; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY voting_sessions_judge_manage ON public.voting_sessions TO authenticated USING (public.is_room_judge(room_id, auth.uid())) WITH CHECK (public.is_room_judge(room_id, auth.uid()));


--

-- Name: voting_sessions voting_sessions_select_participants; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY voting_sessions_select_participants ON public.voting_sessions FOR SELECT TO authenticated USING ((public.is_room_participant(room_id, auth.uid()) OR public.is_room_judge(room_id, auth.uid())));


--

-- Name: skill_uses 允许房间参与者查看技能使用记录; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许房间参与者查看技能使用记录" ON public.skill_uses FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.game_states gs
  WHERE ((gs.id = skill_uses.game_state_id) AND public.is_room_participant(gs.room_id, auth.uid())))));


--

-- Name: skill_conflicts 允许房间参与者查看技能冲突; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许房间参与者查看技能冲突" ON public.skill_conflicts FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.game_states gs
  WHERE ((gs.id = skill_conflicts.game_state_id) AND public.is_room_participant(gs.room_id, auth.uid())))));


--

-- Name: skill_effects_queue 允许房间参与者查看技能效果队列; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许房间参与者查看技能效果队列" ON public.skill_effects_queue FOR SELECT USING (public.is_room_participant(room_id, auth.uid()));


--

-- Name: role_states 允许房间参与者查看角色状态; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许房间参与者查看角色状态" ON public.role_states FOR SELECT USING (((EXISTS ( SELECT 1
   FROM public.role_selections rs
  WHERE ((rs.room_id = role_states.room_id) AND (rs.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.rooms r
  WHERE ((r.id = role_states.room_id) AND (r.judge_user_id = auth.uid()))))));


--

-- Name: role_states 允许房间法官更新角色状态; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许房间法官更新角色状态" ON public.role_states FOR UPDATE USING (public.is_room_judge(room_id, auth.uid())) WITH CHECK (public.is_room_judge(room_id, auth.uid()));


--

-- Name: skill_effects_queue 允许法官管理技能效果队列; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许法官管理技能效果队列" ON public.skill_effects_queue USING (public.is_room_judge(room_id, auth.uid()));


--

-- Name: skill_uses 允许玩家插入自己的技能使用记录; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许玩家插入自己的技能使用记录" ON public.skill_uses FOR INSERT WITH CHECK (((user_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM public.game_states gs
  WHERE ((gs.id = skill_uses.game_state_id) AND public.is_room_participant(gs.room_id, auth.uid()))))));


--

-- Name: skill_uses 允许玩家更新自己的技能使用记录; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许玩家更新自己的技能使用记录" ON public.skill_uses FOR UPDATE USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--

-- Name: skill_conflicts 允许系统插入技能冲突; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许系统插入技能冲突" ON public.skill_conflicts FOR INSERT WITH CHECK (true);


--

-- Name: skill_effects_queue 允许系统插入技能效果; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "允许系统插入技能效果" ON public.skill_effects_queue FOR INSERT WITH CHECK (true);


--

-- Name: supabase_realtime chat_messages; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.chat_messages;


--

-- Name: supabase_realtime game_phase_history; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.game_phase_history;


--

-- Name: supabase_realtime game_settings; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.game_settings;


--

-- Name: supabase_realtime game_states; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.game_states;


--

-- Name: supabase_realtime role_selections; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.role_selections;


--

-- Name: supabase_realtime role_states; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.role_states;


--

-- Name: supabase_realtime room_answers; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.room_answers;


--

-- Name: supabase_realtime room_players; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.room_players;


--

-- Name: supabase_realtime room_questions; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.room_questions;


--

-- Name: supabase_realtime rooms; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.rooms;


--

-- Name: supabase_realtime skill_uses; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.skill_uses;


--

-- Name: supabase_realtime vote_processing_logs; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.vote_processing_logs;


--

-- Name: supabase_realtime votes; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.votes;


--

-- Name: supabase_realtime voting_results; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.voting_results;


--

-- Name: supabase_realtime voting_sessions; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.voting_sessions;


--

