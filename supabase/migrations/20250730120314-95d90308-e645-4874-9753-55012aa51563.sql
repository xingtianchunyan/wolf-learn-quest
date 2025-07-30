-- 创建技能效果队列表
CREATE TABLE public.skill_effects_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_use_id UUID NOT NULL,
  game_state_id UUID NOT NULL,
  room_id UUID NOT NULL,
  effect_type TEXT NOT NULL,
  effect_data JSONB NOT NULL DEFAULT '{}',
  priority INTEGER NOT NULL DEFAULT 100,
  execution_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'queued',
  conditions JSONB DEFAULT '{}',
  trigger_time TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- 创建技能目标表
CREATE TABLE public.skill_targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_use_id UUID NOT NULL,
  skill_effects_queue_id UUID,
  target_user_id UUID,
  target_type TEXT NOT NULL,
  effect_applied JSONB NOT NULL DEFAULT '{}',
  effect_duration INTEGER,
  effect_start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  effect_end_time TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  stack_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建技能冲突表
CREATE TABLE public.skill_conflicts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_state_id UUID NOT NULL,
  round_number INTEGER NOT NULL,
  phase TEXT NOT NULL,
  conflicting_skills JSONB NOT NULL DEFAULT '[]',
  resolution_rule TEXT NOT NULL DEFAULT 'priority',
  resolved_skill_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用 RLS
ALTER TABLE public.skill_effects_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_conflicts ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
-- skill_effects_queue 策略
CREATE POLICY "允许房间参与者查看技能效果队列" 
ON public.skill_effects_queue 
FOR SELECT 
USING (is_room_participant(room_id, auth.uid()));

CREATE POLICY "允许系统插入技能效果" 
ON public.skill_effects_queue 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "允许法官管理技能效果队列" 
ON public.skill_effects_queue 
FOR ALL 
USING (is_room_judge(room_id, auth.uid()));

-- skill_targets 策略
CREATE POLICY "允许房间参与者查看技能目标" 
ON public.skill_targets 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.skill_effects_queue seq 
  WHERE seq.id = skill_targets.skill_effects_queue_id 
  AND is_room_participant(seq.room_id, auth.uid())
));

CREATE POLICY "允许系统插入技能目标" 
ON public.skill_targets 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "允许系统更新技能目标" 
ON public.skill_targets 
FOR UPDATE 
USING (true);

-- skill_conflicts 策略  
CREATE POLICY "允许房间参与者查看技能冲突" 
ON public.skill_conflicts 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.game_states gs 
  WHERE gs.id = skill_conflicts.game_state_id 
  AND is_room_participant(gs.room_id, auth.uid())
));

CREATE POLICY "允许系统插入技能冲突" 
ON public.skill_conflicts 
FOR INSERT 
WITH CHECK (true);

-- 创建索引以提高查询性能
CREATE INDEX idx_skill_effects_queue_game_state ON public.skill_effects_queue(game_state_id);
CREATE INDEX idx_skill_effects_queue_status ON public.skill_effects_queue(status);
CREATE INDEX idx_skill_effects_queue_priority ON public.skill_effects_queue(priority, execution_order);

CREATE INDEX idx_skill_targets_skill_use ON public.skill_targets(skill_use_id);
CREATE INDEX idx_skill_targets_active ON public.skill_targets(is_active);
CREATE INDEX idx_skill_targets_user ON public.skill_targets(target_user_id);

CREATE INDEX idx_skill_conflicts_game_state ON public.skill_conflicts(game_state_id);

-- 创建触发器自动更新时间戳
CREATE TRIGGER update_skill_effects_queue_updated_at
  BEFORE UPDATE ON public.skill_effects_queue
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skill_targets_updated_at
  BEFORE UPDATE ON public.skill_targets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skill_conflicts_updated_at
  BEFORE UPDATE ON public.skill_conflicts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();