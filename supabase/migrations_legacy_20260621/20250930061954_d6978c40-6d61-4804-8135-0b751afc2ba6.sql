-- Fix Function Search Path Mutable warnings by setting proper search_path on all functions
-- This ensures functions cannot be subject to search path manipulation attacks

-- Update all functions that don't have proper search_path set

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.can_use_skill(p_role_state_id uuid)
RETURNS boolean
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

CREATE OR REPLACE FUNCTION public.initialize_status_effects(p_role_status integer)
RETURNS jsonb
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

CREATE OR REPLACE FUNCTION public.initialize_skill_uses_remaining(p_role_id uuid)
RETURNS jsonb
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

CREATE OR REPLACE FUNCTION public.initialize_role_state()
RETURNS trigger
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

CREATE OR REPLACE FUNCTION public.get_phase_duration(p_room_id uuid, p_phase integer)
RETURNS integer
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

CREATE OR REPLACE FUNCTION public.initialize_game_state(p_room_id uuid)
RETURNS uuid
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

CREATE OR REPLACE FUNCTION public.get_room_judge_id(p_room_id uuid)
RETURNS uuid
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_judge_id uuid;
BEGIN
  SELECT judge_user_id INTO v_judge_id FROM public.rooms WHERE id = p_room_id;
  RETURN v_judge_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_room_human_activity()
RETURNS trigger
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

CREATE OR REPLACE FUNCTION public.close_inactive_rooms()
RETURNS void
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

CREATE OR REPLACE FUNCTION public.cleanup_old_voice_signals()
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- Delete signal messages from 5 minutes ago
  DELETE FROM public.voice_signals 
  WHERE created_at < (now() - interval '5 minutes');
END;
$$;

CREATE OR REPLACE FUNCTION public.auto_eliminate_expired_hunters()
RETURNS void
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

CREATE OR REPLACE FUNCTION public.process_skill_effects(p_game_state_id uuid)
RETURNS integer
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

CREATE OR REPLACE FUNCTION public.apply_generic_effect(p_effect_queue_id uuid)
RETURNS boolean
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