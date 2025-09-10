-- 修改投票结果处理函数，将"得票最高的玩家进入淘汰状态"调整为"得票最高的玩家进入濒死状态"
CREATE OR REPLACE FUNCTION public.process_voting_result(p_voting_result_id uuid)
 RETURNS void
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
      -- 修改逻辑：得票最高的玩家进入濒死状态（而非淘汰状态）
      -- 更新角色状态为濒死状态
      UPDATE role_states 
      SET 
        role_status = 2, -- 濒死状态
        status_effects = jsonb_build_object(
          'can_chat', false,
          'can_vote', false,
          'can_use_skill', false,
          'can_be_targeted', false,
          'can_answer_questions', true,
          'can_be_voted', false,
          'dying_reason', 'vote_elimination',
          'dying_round', result_record.round_number,
          'dying_phase', result_record.phase
        ),
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
        'player_dying',
        'completed',
        jsonb_build_object(
          'target_user_id', target_user_id,
          'new_status', 'dying',
          'reason', 'vote_elimination',
          'round', result_record.round_number,
          'phase', result_record.phase
        )
      );
      
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
          'message', '投票平票，无人进入濒死状态'
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

-- 添加处理濒死状态转换的新函数
CREATE OR REPLACE FUNCTION public.resolve_dying_status(p_user_id uuid, p_game_state_id uuid, p_resolution_type text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_id UUID;
  role_state_record RECORD;
  new_status INTEGER;
  room_id_val UUID;
BEGIN
  -- 获取当前用户ID并验证认证
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  -- 获取角色状态
  SELECT * INTO role_state_record
  FROM role_states rs
  WHERE rs.user_id = p_user_id 
    AND rs.game_state_id = p_game_state_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Role state not found' USING ERRCODE = '42704';
  END IF;

  -- 获取房间信息
  SELECT room_id INTO room_id_val
  FROM game_states
  WHERE id = p_game_state_id;

  -- 验证用户是否为房间法官
  IF NOT is_room_judge(room_id_val, current_user_id) THEN
    RAISE EXCEPTION 'Only room judge can resolve dying status' USING ERRCODE = '42501';
  END IF;

  -- 检查当前状态是否为濒死状态
  IF role_state_record.role_status != 2 THEN
    RAISE EXCEPTION 'Player is not in dying status' USING ERRCODE = '23503';
  END IF;

  -- 根据解除类型设置新状态
  CASE p_resolution_type
    WHEN 'protected' THEN
      -- 获得保护：解除濒死状态，恢复为正常状态
      new_status := 1;
    WHEN 'answer_correct' THEN
      -- 答题正确：转为虚弱状态
      new_status := 3;
    WHEN 'answer_wrong' THEN
      -- 答题错误：转为淘汰状态
      new_status := 4;
    ELSE
      RAISE EXCEPTION 'Invalid resolution type: %', p_resolution_type USING ERRCODE = '22023';
  END CASE;

  -- 更新角色状态
  UPDATE role_states 
  SET 
    role_status = new_status,
    status_effects = CASE 
      WHEN new_status = 1 THEN jsonb_build_object(
        'can_chat', true,
        'can_vote', true,
        'can_use_skill', true,
        'can_be_targeted', true,
        'can_answer_questions', true,
        'can_be_voted', true
      )
      WHEN new_status = 3 THEN jsonb_build_object(
        'can_chat', true,
        'can_vote', true,
        'can_use_skill', true,
        'can_be_targeted', true,
        'can_answer_questions', true,
        'can_be_voted', true,
        'is_weak', true
      )
      WHEN new_status = 4 THEN jsonb_build_object(
        'can_chat', false,
        'can_vote', false,
        'can_use_skill', false,
        'can_be_targeted', false,
        'can_answer_questions', false,
        'can_be_voted', false,
        'is_eliminated', true
      )
      ELSE role_state_record.status_effects
    END,
    updated_at = now()
  WHERE user_id = p_user_id 
    AND game_state_id = p_game_state_id;

  RETURN true;
END;
$function$;