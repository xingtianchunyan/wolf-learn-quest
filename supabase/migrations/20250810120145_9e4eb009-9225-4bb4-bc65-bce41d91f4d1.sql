-- Update process_voting_result to apply day-vote elimination vs weakness based on previous round's dawn answer
-- Also make it SECURITY DEFINER and require judge authorization, and ensure status_effects are kept in sync

CREATE OR REPLACE FUNCTION public.process_voting_result(p_voting_result_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  result_record RECORD;
  v_room_id uuid;
  v_game_state_id uuid;
  v_phase integer;
  v_round integer;
  v_is_majority boolean;
  v_target uuid;
  is_hunter boolean := false;
  prev_dawn_order integer;
  prev_dawn_correct boolean;
BEGIN
  -- 获取投票结果与会话信息
  SELECT vr.*, vs.room_id, vs.game_state_id, vs.phase, vs.round_number
  INTO result_record
  FROM public.voting_results vr
  JOIN public.voting_sessions vs ON vs.id = vr.voting_session_id
  WHERE vr.id = p_voting_result_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Voting result not found: %', p_voting_result_id;
  END IF;

  v_room_id := result_record.room_id;
  v_game_state_id := result_record.game_state_id;
  v_phase := result_record.phase;
  v_round := result_record.round_number;
  v_is_majority := result_record.is_majority;
  v_target := result_record.target_id;

  -- 仅允许房间法官处理
  IF NOT public.is_room_judge(v_room_id, auth.uid()) THEN
    RAISE EXCEPTION 'Not authorized to process voting results for this room';
  END IF;

  -- 标记开始处理
  UPDATE public.voting_results
  SET processing_status = 'processing', updated_at = now()
  WHERE id = p_voting_result_id;
  
  INSERT INTO public.vote_processing_logs (
    voting_result_id, processing_step, step_status, step_details
  ) VALUES (
    p_voting_result_id, 
    'start_processing', 
    'started',
    jsonb_build_object(
      'target_id', v_target, 
      'result_type', result_record.result_type,
      'phase', v_phase,
      'round', v_round,
      'is_majority', v_is_majority
    )
  );

  -- 仅在白天阶段(1)且为多数票时处理，且有明确目标，且非平票
  IF v_phase = 1 AND v_is_majority = true AND result_record.result_type <> 'tied' AND v_target IS NOT NULL THEN
    -- 检查目标是否为猎人（保留原有猎人逻辑）
    SELECT rd.role_name = 'hunter' INTO is_hunter
    FROM public.role_states rs
    JOIN public.role_design rd ON rd.id = rs.role_id
    WHERE rs.user_id = v_target AND rs.game_state_id = v_game_state_id;

    IF is_hunter THEN
      -- 猎人进入濒死状态，激活反击机制（与原逻辑一致）
      UPDATE public.role_states
      SET 
        role_status = 2, -- 濒死
        status_effects = jsonb_set(
          public.initialize_status_effects(2),
          '{hunter_revenge_end_time}',
          to_jsonb((now() + interval '40 seconds')::text)
        ) || '{"is_hunter_revenge": true, "can_use_skill": true, "can_be_voted": false}'::jsonb,
        updated_at = now()
      WHERE user_id = v_target 
        AND game_state_id = v_game_state_id;
      
      INSERT INTO public.vote_processing_logs (
        voting_result_id, processing_step, step_status, step_details
      ) VALUES (
        p_voting_result_id,
        'hunter_revenge_activated',
        'completed',
        jsonb_build_object('target_id', v_target, 'revenge_end_time', now() + interval '40 seconds')
      );
    ELSE
      -- 根据上一轮黎明阶段答题情况决定 淘汰(4) 或 虚弱(3)
      prev_dawn_correct := NULL;
      IF v_round > 1 THEN
        prev_dawn_order := (v_round - 2) * 2 + 2; -- 上一轮黎明题目序号：偶数题
        SELECT ra.is_correct INTO prev_dawn_correct
        FROM public.room_answers ra
        WHERE ra.room_id = v_room_id 
          AND ra.user_id = v_target 
          AND ra.question_order = prev_dawn_order
        ORDER BY ra.created_at DESC
        LIMIT 1;
      ELSE
        -- 第一轮没有上一轮黎明，按“未错误/未超时”处理 => 虚弱
        prev_dawn_correct := true;
      END IF;

      IF coalesce(prev_dawn_correct, false) = false THEN
        -- 上一轮黎明答错或超时未答 => 直接淘汰
        UPDATE public.role_states
        SET role_status = 4, status_effects = public.initialize_status_effects(4), updated_at = now()
        WHERE user_id = v_target AND game_state_id = v_game_state_id;
        
        INSERT INTO public.vote_processing_logs (
          voting_result_id, processing_step, step_status, step_details
        ) VALUES (
          p_voting_result_id,
          'player_eliminated_by_day_vote_due_to_dawn_incorrect',
          'completed',
          jsonb_build_object('target_id', v_target, 'prev_dawn_order', prev_dawn_order, 'prev_dawn_correct', prev_dawn_correct)
        );
      ELSE
        -- 上一轮黎明答对 => 变为虚弱
        UPDATE public.role_states
        SET role_status = 3, status_effects = public.initialize_status_effects(3), updated_at = now()
        WHERE user_id = v_target AND game_state_id = v_game_state_id;

        INSERT INTO public.vote_processing_logs (
          voting_result_id, processing_step, step_status, step_details
        ) VALUES (
          p_voting_result_id,
          'player_weakened_by_day_vote',
          'completed',
          jsonb_build_object('target_id', v_target, 'prev_dawn_order', prev_dawn_order, 'prev_dawn_correct', prev_dawn_correct)
        );
      END IF;
    END IF;
  ELSE
    -- 不满足处理条件时记录说明
    INSERT INTO public.vote_processing_logs (
      voting_result_id, processing_step, step_status, step_details
    ) VALUES (
      p_voting_result_id,
      'no_action_taken',
      'completed',
      jsonb_build_object('reason', 'not_day_phase_or_not_majority_or_no_target_or_tied', 'phase', v_phase, 'is_majority', v_is_majority, 'result_type', result_record.result_type)
    );
  END IF;

  -- 标记处理完成
  UPDATE public.voting_results
  SET 
    processing_status = 'completed',
    processed_at = now(),
    updated_at = now()
  WHERE id = p_voting_result_id;
  
  INSERT INTO public.vote_processing_logs (
    voting_result_id, processing_step, step_status
  ) VALUES (
    p_voting_result_id, 'processing_completed', 'completed'
  );

  RETURN TRUE;
  
EXCEPTION WHEN OTHERS THEN
  -- 处理错误
  UPDATE public.voting_results
  SET processing_status = 'failed', updated_at = now()
  WHERE id = p_voting_result_id;
  
  INSERT INTO public.vote_processing_logs (
    voting_result_id, processing_step, step_status, error_message
  ) VALUES (
    p_voting_result_id, 'processing_failed', 'failed', SQLERRM
  );
  
  RETURN FALSE;
END;
$function$;