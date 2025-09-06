-- 修复投票系统的关键问题

-- 1. 创建更强大的投票会话创建函数
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

-- 2. 创建投票函数
CREATE OR REPLACE FUNCTION public.cast_vote(
  p_voting_session_id uuid,
  p_voter_id uuid,
  p_target_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id UUID;
  session_room_id UUID;
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
  
  -- 获取会话对应的房间ID
  SELECT room_id INTO session_room_id
  FROM voting_sessions
  WHERE id = p_voting_session_id;
  
  IF session_room_id IS NULL THEN
    RAISE EXCEPTION 'Voting session not found'
      USING ERRCODE = '42704';
  END IF;
  
  -- 检查用户是否是房间参与者
  IF NOT is_room_participant(session_room_id, current_user_id) THEN
    RAISE EXCEPTION 'User is not authorized to vote in this session'
      USING ERRCODE = '42501';
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

-- 3. 更新投票会话的RLS策略，允许房间参与者在任何阶段查看投票会话
DROP POLICY IF EXISTS "Allow room participants to create day voting sessions" ON voting_sessions;
DROP POLICY IF EXISTS "Allow room participants to view voting sessions" ON voting_sessions;
DROP POLICY IF EXISTS "Allow judges to manage voting sessions" ON voting_sessions;

-- 允许房间参与者查看投票会话（任何阶段）
CREATE POLICY "voting_sessions_select_participants"
ON voting_sessions FOR SELECT
TO authenticated
USING (is_room_participant(room_id, auth.uid()) OR is_room_judge(room_id, auth.uid()));

-- 允许房间参与者和法官创建投票会话（通过函数）
CREATE POLICY "voting_sessions_insert_via_function"
ON voting_sessions FOR INSERT
TO authenticated
WITH CHECK (is_room_participant(room_id, auth.uid()) OR is_room_judge(room_id, auth.uid()));

-- 允许法官管理投票会话
CREATE POLICY "voting_sessions_judge_manage"
ON voting_sessions FOR ALL
TO authenticated
USING (is_room_judge(room_id, auth.uid()))
WITH CHECK (is_room_judge(room_id, auth.uid()));

-- 4. 确保实时更新能正常工作
ALTER TABLE voting_sessions REPLICA IDENTITY FULL;
ALTER TABLE votes REPLICA IDENTITY FULL;
ALTER TABLE voting_results REPLICA IDENTITY FULL;