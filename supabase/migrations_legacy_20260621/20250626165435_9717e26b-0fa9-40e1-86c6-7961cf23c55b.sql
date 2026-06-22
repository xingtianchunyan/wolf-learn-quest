
-- 修复 advance_game_phase 函数中的列名歧义问题
CREATE OR REPLACE FUNCTION public.advance_game_phase(p_room_id uuid)
 RETURNS TABLE(new_phase integer, new_round integer, phase_end_time timestamp with time zone)
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
