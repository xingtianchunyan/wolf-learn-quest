-- 修复玩家加入房间后自动进入已准备状态的问题
-- 玩家和 AI 玩家加入后默认应为未准备，需先选择角色再手动准备

-- 1. 修复人类玩家加入房间的 RPC：is_ready 改为 false
CREATE OR REPLACE FUNCTION public.join_room_as_player(p_room_id uuid)
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
    RAISE EXCEPTION 'Room not found or not accepting players'
      USING ERRCODE = '42704';
  END IF;

  SELECT COUNT(*)
  INTO player_count
  FROM public.room_players
  WHERE room_id = p_room_id;

  IF player_count >= room_record.max_players THEN
    RAISE EXCEPTION 'Room is full'
      USING ERRCODE = '23505';
  END IF;

  -- 玩家加入后默认未准备，需先选择角色再手动准备
  INSERT INTO public.room_players (room_id, user_id, is_ai, is_ready)
  VALUES (p_room_id, current_user_id, false, false)
  ON CONFLICT (room_id, user_id) DO UPDATE SET
    is_ready = false,
    is_ai = false;

  RETURN true;
END;
$$;

-- 2. 修复 AI 玩家加入房间的 RPC：is_ready 改为 false
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

  -- AI 玩家加入后默认未准备，由前端在选角完成后自动设为已准备
  INSERT INTO public.room_players (room_id, is_ai, is_ready, user_id)
  VALUES (p_room_id, true, false, NULL);

  RETURN true;
END;
$$;
