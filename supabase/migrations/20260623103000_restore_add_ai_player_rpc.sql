-- Restore AI player insertion after the baseline migration reset removed the
-- dedicated RPC and related policy.

DROP POLICY IF EXISTS "Hosts can add AI players" ON public.room_players;

CREATE POLICY "Hosts can add AI players" ON public.room_players
  FOR INSERT TO authenticated
  WITH CHECK (
    is_ai = true
    AND EXISTS (
      SELECT 1
      FROM public.rooms
      WHERE rooms.id = room_players.room_id
        AND (
          rooms.host_id = auth.uid()
          OR rooms.judge_user_id = auth.uid()
        )
    )
  );

CREATE OR REPLACE FUNCTION public.add_ai_player(p_room_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
  room_record public.rooms%ROWTYPE;
  player_count integer;
BEGIN
  current_user_id := auth.uid();

  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required'
      USING ERRCODE = '42501';
  END IF;

  SELECT *
  INTO room_record
  FROM public.rooms
  WHERE id = p_room_id
    AND status = 'waiting';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Room not found or not accepting AI players'
      USING ERRCODE = '42704';
  END IF;

  IF room_record.host_id <> current_user_id
     AND room_record.judge_user_id IS DISTINCT FROM current_user_id THEN
    RAISE EXCEPTION 'Only the host or judge can add AI players'
      USING ERRCODE = '42501';
  END IF;

  SELECT COUNT(*)
  INTO player_count
  FROM public.room_players
  WHERE room_id = p_room_id;

  IF player_count >= room_record.max_players THEN
    RAISE EXCEPTION 'Room is full'
      USING ERRCODE = '23505';
  END IF;

  INSERT INTO public.room_players (room_id, is_ai, is_ready, user_id)
  VALUES (p_room_id, true, true, NULL);

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.add_ai_player(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.add_ai_player(uuid) TO authenticated;
