-- 创建加入房间的安全函数
CREATE OR REPLACE FUNCTION public.join_room_as_player(
  p_room_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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