-- 新增 RPC：房主/法官可将房间内所有 AI 玩家统一设置为已准备/未准备
-- 由于 AI 玩家的 user_id 为 NULL，普通 UPDATE 会触发 RLS 限制，因此通过 SECURITY DEFINER 函数处理

CREATE OR REPLACE FUNCTION public.set_ai_players_ready(
  p_room_id uuid,
  p_ready boolean DEFAULT true
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
  room_record public.rooms%ROWTYPE;
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
    RAISE EXCEPTION 'Room not found or not in waiting status'
      USING ERRCODE = '42704';
  END IF;

  IF room_record.host_id <> current_user_id
     AND room_record.judge_user_id IS DISTINCT FROM current_user_id THEN
    RAISE EXCEPTION 'Only the host or judge can update AI player status'
      USING ERRCODE = '42501';
  END IF;

  UPDATE public.room_players
  SET is_ready = p_ready
  WHERE room_id = p_room_id
    AND is_ai = true;

  RETURN true;
END;
$$;
