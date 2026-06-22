-- Phase 1: Restore critical validations in cast_vote function
CREATE OR REPLACE FUNCTION public.cast_vote(p_voting_session_id uuid, p_voter_id uuid, p_target_id uuid DEFAULT NULL::uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_id UUID;
  session_room_id UUID;
  session_status TEXT;
  voter_can_vote BOOLEAN := false;
  voter_role_status INTEGER;
  voter_status_effects JSONB;
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
  
  -- 获取会话对应的房间ID和状态
  SELECT room_id, status INTO session_room_id, session_status
  FROM voting_sessions
  WHERE id = p_voting_session_id;
  
  IF session_room_id IS NULL THEN
    RAISE EXCEPTION 'Voting session not found'
      USING ERRCODE = '42704';
  END IF;
  
  -- 检查会话状态必须为active
  IF session_status != 'active' THEN
    RAISE EXCEPTION 'Voting session is not active (current status: %)', session_status
      USING ERRCODE = '23503';
  END IF;
  
  -- 检查用户是否是房间参与者
  IF NOT is_room_participant(session_room_id, current_user_id) THEN
    RAISE EXCEPTION 'User is not authorized to vote in this session'
      USING ERRCODE = '42501';
  END IF;
  
  -- 检查投票权限：获取角色状态和状态效果
  SELECT role_status, status_effects 
  INTO voter_role_status, voter_status_effects
  FROM role_states rs
  JOIN game_states gs ON gs.id = rs.game_state_id
  JOIN voting_sessions vs ON vs.game_state_id = gs.id
  WHERE rs.user_id = current_user_id 
    AND vs.id = p_voting_session_id;
  
  -- 检查角色状态是否允许投票
  IF voter_role_status IS NULL THEN
    RAISE EXCEPTION 'Player role state not found'
      USING ERRCODE = '42704';
  END IF;
  
  -- 角色状态检查：1=正常, 3=虚弱 可以投票；2=濒死, 4=淘汰 不能投票
  IF voter_role_status NOT IN (1, 3) THEN
    RAISE EXCEPTION 'Player cannot vote due to role status (status: %)', voter_role_status
      USING ERRCODE = '23503';
  END IF;
  
  -- 状态效果检查：can_vote必须为true
  voter_can_vote := COALESCE((voter_status_effects->>'can_vote')::boolean, true);
  
  IF NOT voter_can_vote THEN
    RAISE EXCEPTION 'Player cannot vote due to status effects'
      USING ERRCODE = '23503';
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
$function$;

-- Phase 1: Update calculate_voting_results to use SUM(vote_weight) instead of COUNT(*)
CREATE OR REPLACE FUNCTION public.calculate_voting_results(p_voting_session_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  total_valid_votes INTEGER;
  vote_record RECORD;
  max_votes INTEGER := 0;
  tied_count INTEGER := 0;
BEGIN
  -- 清除旧的结果
  DELETE FROM public.voting_results WHERE voting_session_id = p_voting_session_id;
  
  -- 计算总有效票数权重
  SELECT COALESCE(SUM(vote_weight), 0) INTO total_valid_votes
  FROM public.votes
  WHERE voting_session_id = p_voting_session_id AND is_valid = true;
  
  -- 统计每个目标的得票权重
  FOR vote_record IN
    SELECT 
      target_id,
      COALESCE(SUM(vote_weight), 0) as vote_count,
      CASE 
        WHEN total_valid_votes > 0 THEN (COALESCE(SUM(vote_weight), 0) * 100.0 / total_valid_votes)
        ELSE 0
      END as percentage
    FROM public.votes
    WHERE voting_session_id = p_voting_session_id 
      AND is_valid = true 
      AND target_id IS NOT NULL
    GROUP BY target_id
  LOOP
    INSERT INTO public.voting_results (
      voting_session_id,
      target_id,
      total_votes,
      vote_percentage
    ) VALUES (
      p_voting_session_id,
      vote_record.target_id,
      vote_record.vote_count,
      vote_record.percentage
    );
    
    -- 记录最高票数
    IF vote_record.vote_count > max_votes THEN
      max_votes := vote_record.vote_count;
    END IF;
  END LOOP;
  
  -- 检查是否有并列最高票
  SELECT COUNT(*) INTO tied_count
  FROM public.voting_results
  WHERE voting_session_id = p_voting_session_id AND total_votes = max_votes;
  
  -- 更新结果状态
  UPDATE public.voting_results
  SET 
    is_majority = (total_votes > total_valid_votes / 2),
    is_tied = (tied_count > 1 AND total_votes = max_votes),
    result_type = CASE
      WHEN tied_count > 1 AND total_votes = max_votes THEN 'tied'
      WHEN total_votes = max_votes AND total_votes > 0 THEN 'eliminated'
      ELSE 'no_result'
    END,
    updated_at = now()
  WHERE voting_session_id = p_voting_session_id;
  
  -- 更新投票会话状态
  UPDATE public.voting_sessions
  SET status = 'completed', end_time = now(), updated_at = now()
  WHERE id = p_voting_session_id;
  
END;
$function$;

-- Phase 2: Enhance process_voting_result with better idempotency
CREATE OR REPLACE FUNCTION public.process_voting_result(p_voting_result_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_id UUID;
  result_record RECORD;
  session_room_id UUID;
  target_user_id UUID;
  current_status TEXT;
  rows_updated INTEGER;
BEGIN
  -- 获取当前用户ID并验证认证
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  -- 原子性检查并锁定结果记录
  SELECT processing_status INTO current_status
  FROM voting_results 
  WHERE id = p_voting_result_id
  FOR UPDATE;
  
  IF current_status IS NULL THEN
    RAISE EXCEPTION 'Voting result not found' USING ERRCODE = '42704';
  END IF;
  
  -- 幂等性检查：如果已经处理过，直接返回
  IF current_status != 'pending' THEN
    RETURN;
  END IF;
  
  -- 原子性更新状态为processing
  UPDATE voting_results 
  SET processing_status = 'processing', updated_at = now()
  WHERE id = p_voting_result_id AND processing_status = 'pending';
  
  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  
  -- 如果更新失败，说明被其他进程抢先处理
  IF rows_updated = 0 THEN
    RETURN;
  END IF;

  -- 获取详细的投票结果信息
  SELECT 
    vr.*,
    vs.room_id,
    vs.game_state_id,
    vs.round_number,
    vs.phase
  INTO result_record
  FROM voting_results vr
  JOIN voting_sessions vs ON vs.id = vr.voting_session_id
  WHERE vr.id = p_voting_result_id;

  -- 验证用户是否为房间法官
  IF NOT is_room_judge(result_record.room_id, current_user_id) THEN
    UPDATE voting_results 
    SET processing_status = 'failed', updated_at = now()
    WHERE id = p_voting_result_id;
    
    RAISE EXCEPTION 'Only room judge can process voting results' USING ERRCODE = '42501';
  END IF;

  BEGIN
    target_user_id := result_record.target_id;
    
    -- 处理投票结果的主要逻辑
    IF result_record.result_type = 'eliminated' AND target_user_id IS NOT NULL THEN
      -- 获取被票玩家在上一轮黎明阶段的答题情况
      DECLARE
        last_dawn_correct BOOLEAN := NULL;
        new_role_status INTEGER;
      BEGIN
        -- 查询上一轮黎明阶段的最后一次答题结果
        SELECT ra.is_correct INTO last_dawn_correct
        FROM room_answers ra
        JOIN room_questions rq ON rq.id = ra.room_question_id
        WHERE ra.user_id = target_user_id
          AND ra.room_id = result_record.room_id
          AND rq.question_order = (result_record.round_number - 1) * 4 + 4  -- 上一轮的第4题(黎明)
        ORDER BY ra.created_at DESC
        LIMIT 1;
        
        -- 根据答题情况决定处理方式
        IF last_dawn_correct = true THEN
          -- 答对了：设为虚弱状态
          new_role_status := 3;
          
          -- 记录处理日志
          INSERT INTO vote_processing_logs (
            voting_result_id,
            processing_step,
            step_status,
            step_details
          ) VALUES (
            p_voting_result_id,
            'player_weakened',
            'completed',
            jsonb_build_object(
              'target_user_id', target_user_id,
              'previous_answer_correct', true,
              'new_status', 'weakened'
            )
          );
        ELSE
          -- 答错了或没答题：淘汰
          new_role_status := 4;
          
          -- 记录处理日志
          INSERT INTO vote_processing_logs (
            voting_result_id,
            processing_step,
            step_status,
            step_details
          ) VALUES (
            p_voting_result_id,
            'player_eliminated',
            'completed',
            jsonb_build_object(
              'target_user_id', target_user_id,
              'previous_answer_correct', COALESCE(last_dawn_correct, false),
              'new_status', 'eliminated'
            )
          );
        END IF;
        
        -- 更新角色状态
        UPDATE role_states 
        SET 
          role_status = new_role_status,
          updated_at = now()
        WHERE user_id = target_user_id 
          AND game_state_id = result_record.game_state_id;
      END;
      
    ELSIF result_record.result_type = 'tied' THEN
      -- 平票情况的处理日志
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        step_details
      ) VALUES (
        p_voting_result_id,
        'tie_result',
        'completed',
        jsonb_build_object(
          'result_type', 'tied',
          'message', '投票平票，无人被淘汰'
        )
      );
      
    ELSE
      -- 其他情况的处理日志
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        step_details
      ) VALUES (
        p_voting_result_id,
        'no_action',
        'completed',
        jsonb_build_object(
          'result_type', result_record.result_type,
          'message', '投票结果无需特殊处理'
        )
      );
    END IF;

    -- 标记处理完成
    UPDATE voting_results 
    SET 
      processing_status = 'completed',
      processed_at = now(),
      updated_at = now()
    WHERE id = p_voting_result_id;

  EXCEPTION
    WHEN OTHERS THEN
      -- 处理失败，记录错误并更新状态
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        error_message,
        step_details
      ) VALUES (
        p_voting_result_id,
        'processing_error',
        'failed',
        SQLERRM,
        jsonb_build_object(
          'error_code', SQLSTATE,
          'error_message', SQLERRM
        )
      );
      
      UPDATE voting_results 
      SET processing_status = 'failed', updated_at = now()
      WHERE id = p_voting_result_id;
      
      RAISE;
  END;
END;
$function$;

-- Phase 2: Add performance index for vote aggregation
CREATE INDEX IF NOT EXISTS idx_votes_session_target 
ON votes(voting_session_id, target_id) 
WHERE is_valid = true;