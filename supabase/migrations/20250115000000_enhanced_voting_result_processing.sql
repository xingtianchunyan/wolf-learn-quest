-- 增强投票结果处理 - 优化游戏状态处理逻辑
-- 实现唯一最高票数玩家进入濒死状态，平票时重新投票的机制

-- 1. 更新 process_voting_result 函数以支持新的业务逻辑
CREATE OR REPLACE FUNCTION public.process_voting_result(p_voting_result_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_id UUID;
  result_record RECORD;
  target_user_id UUID;
  current_status TEXT;
  rows_updated INTEGER;
  processing_result JSONB := '{}'::jsonb;
  max_votes INTEGER := 0;
  tied_count INTEGER := 0;
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
    RETURN jsonb_build_object(
      'success', true,
      'message', 'Result already processed',
      'status', current_status
    );
  END IF;
  
  -- 原子性更新状态为processing
  UPDATE voting_results 
  SET processing_status = 'processing', updated_at = now()
  WHERE id = p_voting_result_id AND processing_status = 'pending';
  
  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  
  -- 如果更新失败，说明被其他进程抢先处理
  IF rows_updated = 0 THEN
    RETURN jsonb_build_object(
      'success', true,
      'message', 'Result processed by another process'
    );
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
    -- 获取该投票会话的所有结果，检查是否存在平票
    SELECT 
      MAX(total_votes) INTO max_votes
    FROM voting_results
    WHERE voting_session_id = result_record.voting_session_id;
    
    SELECT 
      COUNT(*) INTO tied_count
    FROM voting_results
    WHERE voting_session_id = result_record.voting_session_id 
      AND total_votes = max_votes
      AND target_id IS NOT NULL; -- 排除弃权票
    
    -- 处理投票结果的主要逻辑
    IF tied_count > 1 AND max_votes > 0 THEN
      -- 平票情况：废弃当前投票会话并准备重新投票
      UPDATE voting_sessions
      SET 
        status = 'cancelled',
        end_time = now(),
        updated_at = now()
      WHERE id = result_record.voting_session_id;
      
      -- 记录平票处理日志
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        step_details
      ) VALUES (
        p_voting_result_id,
        'tie_detected',
        'completed',
        jsonb_build_object(
          'tied_count', tied_count,
          'max_votes', max_votes,
          'action', 'session_cancelled_for_revote'
        )
      );
      
      processing_result := jsonb_build_object(
        'success', true,
        'result_type', 'tie',
        'action', 'revote_required',
        'tied_count', tied_count,
        'max_votes', max_votes,
        'message', '检测到平票，投票会话已废弃，需要重新投票'
      );
      
    ELSIF result_record.result_type = 'eliminated' AND result_record.target_id IS NOT NULL THEN
      -- 唯一最高票数玩家：直接设为濒死状态
      target_user_id := result_record.target_id;
      
      -- 更新角色状态为濒死状态 (role_status = 2)
      UPDATE role_states 
      SET 
        role_status = 2, -- 濒死状态
        updated_at = now()
      WHERE user_id = target_user_id 
        AND game_state_id = result_record.game_state_id;
      
      -- 记录处理日志
      INSERT INTO vote_processing_logs (
        voting_result_id,
        processing_step,
        step_status,
        step_details
      ) VALUES (
        p_voting_result_id,
        'player_near_death',
        'completed',
        jsonb_build_object(
          'target_user_id', target_user_id,
          'new_status', 'near_death',
          'vote_count', result_record.total_votes
        )
      );
      
      processing_result := jsonb_build_object(
        'success', true,
        'result_type', 'eliminated',
        'action', 'player_near_death',
        'target_user_id', target_user_id,
        'vote_count', result_record.total_votes,
        'message', '玩家进入濒死状态'
      );
      
    ELSE
      -- 其他情况（无投票、仅弃权等）
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
      
      processing_result := jsonb_build_object(
        'success', true,
        'result_type', COALESCE(result_record.result_type, 'no_result'),
        'action', 'no_action',
        'message', '投票结果无需特殊处理'
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
      
      processing_result := jsonb_build_object(
        'success', false,
        'error', SQLERRM,
        'error_code', SQLSTATE
      );
  END;
  
  RETURN processing_result;
END;
$function$;

-- 2. 创建一个辅助函数来检查投票会话是否可以重新投票
CREATE OR REPLACE FUNCTION public.can_create_revote_session(
  p_game_state_id uuid,
  p_round_number integer,
  p_phase integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  cancelled_session_count INTEGER;
BEGIN
  -- 检查是否存在被取消的投票会话（表示发生了平票）
  SELECT COUNT(*) INTO cancelled_session_count
  FROM voting_sessions
  WHERE game_state_id = p_game_state_id
    AND round_number = p_round_number
    AND phase = p_phase
    AND status = 'cancelled';
  
  -- 如果存在被取消的会话，说明可以重新投票
  RETURN cancelled_session_count > 0;
END;
$function$;

-- 3. 添加投票会话状态索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_voting_sessions_status_round_phase 
ON voting_sessions(status, round_number, phase) 
WHERE status IN ('active', 'cancelled');

-- 4. 添加角色状态更新的索引
CREATE INDEX IF NOT EXISTS idx_role_states_user_game_status 
ON role_states(user_id, game_state_id, role_status);

-- 5. 为投票处理日志添加索引
CREATE INDEX IF NOT EXISTS idx_vote_processing_logs_result_step 
ON vote_processing_logs(voting_result_id, processing_step, step_status);