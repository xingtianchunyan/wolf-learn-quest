
-- 创建投票会话表
CREATE TABLE public.voting_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_state_id UUID NOT NULL REFERENCES public.game_states(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  phase INTEGER NOT NULL,
  session_type TEXT NOT NULL DEFAULT 'day_vote', -- day_vote, exile_vote, etc.
  status TEXT NOT NULL DEFAULT 'active', -- active, completed, cancelled
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建投票记录表
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voting_session_id UUID NOT NULL REFERENCES public.voting_sessions(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_id UUID REFERENCES public.users(id) ON DELETE CASCADE, -- 可以为空（弃权票）
  vote_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_valid BOOLEAN NOT NULL DEFAULT true,
  vote_weight INTEGER NOT NULL DEFAULT 1, -- 支持特殊角色多票权重
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建投票结果表
CREATE TABLE public.voting_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voting_session_id UUID NOT NULL REFERENCES public.voting_sessions(id) ON DELETE CASCADE,
  target_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  total_votes INTEGER NOT NULL DEFAULT 0,
  vote_percentage DECIMAL(5,2),
  is_majority BOOLEAN NOT NULL DEFAULT false,
  is_tied BOOLEAN NOT NULL DEFAULT false,
  result_type TEXT NOT NULL, -- eliminated, saved, tied, no_result
  processing_status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建投票处理日志表（用于跟踪复杂的投票结果处理过程）
CREATE TABLE public.vote_processing_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voting_result_id UUID NOT NULL REFERENCES public.voting_results(id) ON DELETE CASCADE,
  processing_step TEXT NOT NULL,
  step_status TEXT NOT NULL, -- started, completed, failed
  step_details JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 添加索引优化查询性能
CREATE INDEX idx_voting_sessions_game_state ON public.voting_sessions(game_state_id);
CREATE INDEX idx_voting_sessions_room_round ON public.voting_sessions(room_id, round_number, phase);
CREATE INDEX idx_votes_session_voter ON public.votes(voting_session_id, voter_id);
CREATE INDEX idx_votes_target ON public.votes(target_id);
CREATE INDEX idx_voting_results_session ON public.voting_results(voting_session_id);
CREATE INDEX idx_voting_results_target ON public.voting_results(target_id);

-- 添加唯一约束防止重复投票
ALTER TABLE public.votes ADD CONSTRAINT unique_voter_per_session 
  UNIQUE (voting_session_id, voter_id);

-- 创建投票会话管理函数
CREATE OR REPLACE FUNCTION public.create_voting_session(
  p_game_state_id UUID,
  p_room_id UUID,
  p_round_number INTEGER,
  p_phase INTEGER,
  p_session_type TEXT DEFAULT 'day_vote'
) RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  session_id UUID;
BEGIN
  -- 结束当前活跃的投票会话
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
    session_type
  ) VALUES (
    p_game_state_id,
    p_room_id,
    p_round_number,
    p_phase,
    p_session_type
  ) RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$;

-- 创建投票函数
CREATE OR REPLACE FUNCTION public.cast_vote(
  p_voting_session_id UUID,
  p_voter_id UUID,
  p_target_id UUID DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  session_status TEXT;
  voter_can_vote BOOLEAN;
BEGIN
  -- 检查投票会话状态
  SELECT status INTO session_status
  FROM public.voting_sessions
  WHERE id = p_voting_session_id;
  
  IF session_status != 'active' THEN
    RAISE EXCEPTION 'Voting session is not active';
  END IF;
  
  -- 检查投票者是否有投票权限
  SELECT rs.status_effects->>'can_vote' = 'true' INTO voter_can_vote
  FROM public.role_states rs
  JOIN public.voting_sessions vs ON vs.game_state_id = rs.game_state_id
  WHERE vs.id = p_voting_session_id AND rs.user_id = p_voter_id;
  
  IF NOT voter_can_vote THEN
    RAISE EXCEPTION 'Voter does not have voting permission';
  END IF;
  
  -- 插入或更新投票
  INSERT INTO public.votes (voting_session_id, voter_id, target_id)
  VALUES (p_voting_session_id, p_voter_id, p_target_id)
  ON CONFLICT (voting_session_id, voter_id) 
  DO UPDATE SET 
    target_id = EXCLUDED.target_id,
    vote_time = now();
  
  RETURN TRUE;
END;
$$;

-- 创建投票结果计算函数
CREATE OR REPLACE FUNCTION public.calculate_voting_results(
  p_voting_session_id UUID
) RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  total_valid_votes INTEGER;
  vote_record RECORD;
  max_votes INTEGER := 0;
  tied_count INTEGER := 0;
BEGIN
  -- 清除旧的结果
  DELETE FROM public.voting_results WHERE voting_session_id = p_voting_session_id;
  
  -- 计算总有效票数
  SELECT COUNT(*) INTO total_valid_votes
  FROM public.votes
  WHERE voting_session_id = p_voting_session_id AND is_valid = true;
  
  -- 统计每个目标的得票
  FOR vote_record IN
    SELECT 
      target_id,
      COUNT(*) as vote_count,
      (COUNT(*) * 100.0 / NULLIF(total_valid_votes, 0)) as percentage
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
$$;

-- 创建投票结果处理函数（包含猎人反击逻辑）
CREATE OR REPLACE FUNCTION public.process_voting_result(
  p_voting_result_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  result_record RECORD;
  target_role_name TEXT;
  is_hunter BOOLEAN := false;
BEGIN
  -- 获取投票结果信息
  SELECT vr.*, vs.room_id, vs.game_state_id
  INTO result_record
  FROM public.voting_results vr
  JOIN public.voting_sessions vs ON vs.id = vr.voting_session_id
  WHERE vr.id = p_voting_result_id;
  
  -- 标记开始处理
  UPDATE public.voting_results
  SET processing_status = 'processing', updated_at = now()
  WHERE id = p_voting_result_id;
  
  -- 记录处理开始
  INSERT INTO public.vote_processing_logs (
    voting_result_id, processing_step, step_status, step_details
  ) VALUES (
    p_voting_result_id, 
    'start_processing', 
    'started',
    jsonb_build_object('target_id', result_record.target_id, 'result_type', result_record.result_type)
  );
  
  -- 如果有明确的淘汰目标
  IF result_record.result_type = 'eliminated' AND result_record.target_id IS NOT NULL THEN
    -- 检查目标角色是否是猎人
    SELECT rd.role_name = 'hunter' INTO is_hunter
    FROM public.role_states rs
    JOIN public.role_design rd ON rd.id = rs.role_id
    WHERE rs.user_id = result_record.target_id 
      AND rs.game_state_id = result_record.game_state_id;
    
    IF is_hunter THEN
      -- 猎人进入濒死状态，激活反击机制
      UPDATE public.role_states
      SET 
        role_status = 2, -- 濒死状态
        status_effects = jsonb_set(
          status_effects,
          '{hunter_revenge_end_time}',
          to_jsonb((now() + interval '40 seconds')::text)
        ) || '{"is_hunter_revenge": true, "can_use_skill": true, "can_be_voted": false}'::jsonb,
        updated_at = now()
      WHERE user_id = result_record.target_id 
        AND game_state_id = result_record.game_state_id;
      
      -- 记录猎人反击处理
      INSERT INTO public.vote_processing_logs (
        voting_result_id, processing_step, step_status, step_details
      ) VALUES (
        p_voting_result_id,
        'hunter_revenge_activated',
        'completed',
        jsonb_build_object('target_id', result_record.target_id, 'revenge_end_time', now() + interval '40 seconds')
      );
    ELSE
      -- 非猎人直接淘汰
      UPDATE public.role_states
      SET role_status = 4, updated_at = now() -- 淘汰状态
      WHERE user_id = result_record.target_id 
        AND game_state_id = result_record.game_state_id;
      
      -- 记录普通淘汰处理
      INSERT INTO public.vote_processing_logs (
        voting_result_id, processing_step, step_status, step_details
      ) VALUES (
        p_voting_result_id,
        'player_eliminated',
        'completed',
        jsonb_build_object('target_id', result_record.target_id)
      );
    END IF;
  END IF;
  
  -- 标记处理完成
  UPDATE public.voting_results
  SET 
    processing_status = 'completed',
    processed_at = now(),
    updated_at = now()
  WHERE id = p_voting_result_id;
  
  -- 记录处理完成
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
$$;

-- 创建自动处理猎人超时的函数
CREATE OR REPLACE FUNCTION public.auto_eliminate_expired_hunters()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  -- 自动淘汰超时的猎人
  UPDATE public.role_states
  SET role_status = 4, updated_at = now()
  WHERE role_status = 2 -- 濒死状态
    AND status_effects->>'is_hunter_revenge' = 'true'
    AND (status_effects->>'hunter_revenge_end_time')::timestamp with time zone < now();
END;
$$;
