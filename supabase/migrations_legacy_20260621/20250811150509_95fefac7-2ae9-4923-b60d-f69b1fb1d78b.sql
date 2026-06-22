-- Ensure triggers for role_states initialization and status updates, and add a function to initialize role_states for a room

-- 1) Create trigger to initialize role state fields on insert (skill_uses_remaining, status_effects)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_initialize_role_state'
  ) THEN
    CREATE TRIGGER trigger_initialize_role_state
    BEFORE INSERT ON public.role_states
    FOR EACH ROW
    EXECUTE FUNCTION public.initialize_role_state();
  END IF;
END$$;

-- 2) Create trigger to update status_effects when role_status changes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_role_status_effects'
  ) THEN
    CREATE TRIGGER trigger_update_role_status_effects
    BEFORE UPDATE OF role_status ON public.role_states
    FOR EACH ROW
    EXECUTE FUNCTION public.update_role_status();
  END IF;
END$$;

-- 3) Function to initialize role_states for a room from latest role selections
CREATE OR REPLACE FUNCTION public.initialize_room_role_states(p_room_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
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
