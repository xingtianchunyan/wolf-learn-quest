-- 创建投票系统相关表

-- 投票会话表
CREATE TABLE public.voting_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_state_id UUID NOT NULL,
  room_id UUID NOT NULL,
  round_number INTEGER NOT NULL,
  phase INTEGER NOT NULL,
  session_type TEXT NOT NULL DEFAULT 'day_vote',
  status TEXT NOT NULL DEFAULT 'active',
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 投票记录表
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voting_session_id UUID NOT NULL,
  voter_id UUID NOT NULL,
  target_id UUID,
  vote_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_valid BOOLEAN NOT NULL DEFAULT true,
  vote_weight INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(voting_session_id, voter_id)
);

-- 投票结果表
CREATE TABLE public.voting_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voting_session_id UUID NOT NULL,
  target_id UUID,
  total_votes INTEGER NOT NULL DEFAULT 0,
  vote_percentage DECIMAL(5,2),
  is_majority BOOLEAN NOT NULL DEFAULT false,
  is_tied BOOLEAN NOT NULL DEFAULT false,
  result_type TEXT NOT NULL DEFAULT 'no_result',
  processing_status TEXT NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 投票处理日志表
CREATE TABLE public.vote_processing_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voting_result_id UUID NOT NULL,
  processing_step TEXT NOT NULL,
  step_status TEXT NOT NULL,
  step_details JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 添加外键约束
ALTER TABLE public.votes ADD CONSTRAINT fk_votes_voting_session 
  FOREIGN KEY (voting_session_id) REFERENCES public.voting_sessions(id) ON DELETE CASCADE;

ALTER TABLE public.voting_results ADD CONSTRAINT fk_voting_results_session 
  FOREIGN KEY (voting_session_id) REFERENCES public.voting_sessions(id) ON DELETE CASCADE;

ALTER TABLE public.vote_processing_logs ADD CONSTRAINT fk_logs_voting_result 
  FOREIGN KEY (voting_result_id) REFERENCES public.voting_results(id) ON DELETE CASCADE;

-- 启用 RLS
ALTER TABLE public.voting_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voting_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vote_processing_logs ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
-- 投票会话表策略
CREATE POLICY "Allow room participants to view voting sessions"
  ON public.voting_sessions FOR SELECT
  USING (is_room_participant(room_id, auth.uid()));

CREATE POLICY "Allow judges to manage voting sessions"
  ON public.voting_sessions FOR ALL
  USING (is_room_judge(room_id, auth.uid()))
  WITH CHECK (is_room_judge(room_id, auth.uid()));

-- 投票记录表策略
CREATE POLICY "Allow room participants to view votes"
  ON public.votes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.voting_sessions vs 
      WHERE vs.id = votes.voting_session_id 
      AND is_room_participant(vs.room_id, auth.uid())
    )
  );

CREATE POLICY "Allow voters to cast their votes"
  ON public.votes FOR INSERT
  WITH CHECK (
    voter_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.voting_sessions vs 
      WHERE vs.id = votes.voting_session_id 
      AND is_room_participant(vs.room_id, auth.uid())
      AND vs.status = 'active'
    )
  );

CREATE POLICY "Allow voters to update their votes"
  ON public.votes FOR UPDATE
  USING (voter_id = auth.uid());

-- 投票结果表策略
CREATE POLICY "Allow room participants to view voting results"
  ON public.voting_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.voting_sessions vs 
      WHERE vs.id = voting_results.voting_session_id 
      AND is_room_participant(vs.room_id, auth.uid())
    )
  );

CREATE POLICY "Allow judges to manage voting results"
  ON public.voting_results FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.voting_sessions vs 
      WHERE vs.id = voting_results.voting_session_id 
      AND is_room_judge(vs.room_id, auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.voting_sessions vs 
      WHERE vs.id = voting_results.voting_session_id 
      AND is_room_judge(vs.room_id, auth.uid())
    )
  );

-- 投票处理日志表策略
CREATE POLICY "Allow room participants to view vote processing logs"
  ON public.vote_processing_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.voting_results vr
      JOIN public.voting_sessions vs ON vs.id = vr.voting_session_id
      WHERE vr.id = vote_processing_logs.voting_result_id 
      AND is_room_participant(vs.room_id, auth.uid())
    )
  );

-- 启用实时订阅
ALTER TABLE public.voting_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.votes REPLICA IDENTITY FULL;
ALTER TABLE public.voting_results REPLICA IDENTITY FULL;
ALTER TABLE public.vote_processing_logs REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.voting_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.votes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.voting_results;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vote_processing_logs;

-- 创建索引优化查询性能
CREATE INDEX idx_voting_sessions_room_id ON public.voting_sessions(room_id);
CREATE INDEX idx_voting_sessions_game_state_id ON public.voting_sessions(game_state_id);
CREATE INDEX idx_votes_voting_session_id ON public.votes(voting_session_id);
CREATE INDEX idx_votes_voter_id ON public.votes(voter_id);
CREATE INDEX idx_votes_target_id ON public.votes(target_id);
CREATE INDEX idx_voting_results_session_id ON public.voting_results(voting_session_id);
CREATE INDEX idx_vote_processing_logs_result_id ON public.vote_processing_logs(voting_result_id);