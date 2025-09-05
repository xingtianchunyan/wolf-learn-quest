-- 修复create_voting_session函数为SECURITY DEFINER并添加认证检查
CREATE OR REPLACE FUNCTION public.create_voting_session(
  p_game_state_id uuid,
  p_room_id uuid,
  p_round_number integer,
  p_phase integer,
  p_session_type text DEFAULT 'day_vote'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  session_id UUID;
  current_user_id UUID;
BEGIN
  -- 获取当前用户ID
  current_user_id := auth.uid();
  
  -- 检查用户是否已认证
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required'
      USING ERRCODE = '42501';
  END IF;
  
  -- 检查用户是否是房间参与者或法官
  IF NOT (
    -- 检查是否是房间参与者
    EXISTS (
      SELECT 1 FROM room_players rp 
      WHERE rp.room_id = p_room_id AND rp.user_id = current_user_id
    ) OR
    -- 检查是否是房间法官
    EXISTS (
      SELECT 1 FROM rooms r 
      WHERE r.id = p_room_id AND r.judge_user_id = current_user_id
    )
  ) THEN
    RAISE EXCEPTION 'User is not a participant or judge in this room'
      USING ERRCODE = '42501';
  END IF;
  
  -- 检查是否已存在活跃的投票会话
  SELECT id INTO session_id
  FROM public.voting_sessions 
  WHERE game_state_id = p_game_state_id 
    AND round_number = p_round_number 
    AND phase = p_phase
    AND status = 'active'
  LIMIT 1;
  
  -- 如果已存在活跃会话，直接返回
  IF session_id IS NOT NULL THEN
    RETURN session_id;
  END IF;
  
  -- 结束当前活跃的投票会话（如果有的话）
  UPDATE public.voting_sessions 
  SET status = 'completed', 
      end_time = now(),
      updated_at = now()
  WHERE room_id = p_room_id 
    AND status = 'active';
  
  -- 创建新的投票会话
  INSERT INTO public.voting_sessions (
    game_state_id, 
    room_id, 
    round_number, 
    phase, 
    session_type,
    status
  ) VALUES (
    p_game_state_id,
    p_room_id,
    p_round_number,
    p_phase,
    p_session_type,
    'active'
  ) RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$;