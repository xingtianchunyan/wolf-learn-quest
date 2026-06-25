-- 为房主/法官提供删除 AI 玩家的能力
-- 1. 为 room_players 增加创建时间列，用于按加入顺序删除最后一个 AI 玩家
ALTER TABLE public.room_players
  ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();

UPDATE public.room_players
  SET created_at = now()
  WHERE created_at IS NULL;

-- 2. 创建 RLS 策略：房主或法官可以删除 AI 玩家
DROP POLICY IF EXISTS "Hosts can delete AI players" ON public.room_players;

CREATE POLICY "Hosts can delete AI players" ON public.room_players
  FOR DELETE TO authenticated
  USING (
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

-- 3. 创建 SECURITY DEFINER RPC：删除指定房间中最后加入的 AI 玩家
CREATE OR REPLACE FUNCTION public.remove_ai_player(p_room_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
  room_record public.rooms%ROWTYPE;
  ai_player_record public.room_players%ROWTYPE;
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
    RAISE EXCEPTION 'Room not found or not accepting player changes'
      USING ERRCODE = '42704';
  END IF;

  IF room_record.host_id <> current_user_id
     AND room_record.judge_user_id IS DISTINCT FROM current_user_id THEN
    RAISE EXCEPTION 'Only the host or judge can remove AI players'
      USING ERRCODE = '42501';
  END IF;

  SELECT *
  INTO ai_player_record
  FROM public.room_players
  WHERE room_id = p_room_id
    AND is_ai = true
  ORDER BY created_at DESC, id DESC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  DELETE FROM public.room_players
  WHERE id = ai_player_record.id;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.remove_ai_player(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.remove_ai_player(uuid) TO authenticated;
