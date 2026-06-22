
-- 首先检查 player_answers 表是否存在，然后重命名
ALTER TABLE public.player_answers RENAME TO room_answers;

-- 删除原有的不需要的字段
ALTER TABLE public.room_answers DROP COLUMN IF EXISTS game_id CASCADE;
ALTER TABLE public.room_answers DROP COLUMN IF EXISTS player_id CASCADE;
ALTER TABLE public.room_answers DROP COLUMN IF EXISTS question_id CASCADE;

-- 添加与 role_selections 表关联的字段
ALTER TABLE public.room_answers ADD COLUMN room_id uuid;
ALTER TABLE public.room_answers ADD COLUMN user_id uuid;
ALTER TABLE public.room_answers ADD COLUMN role_id uuid;

-- 添加与 room_questions 表关联的字段
ALTER TABLE public.room_answers ADD COLUMN room_question_id uuid;
ALTER TABLE public.room_answers ADD COLUMN question_order integer;

-- 添加外键约束
ALTER TABLE public.room_answers 
ADD CONSTRAINT fk_room_answers_room_id 
FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;

ALTER TABLE public.room_answers 
ADD CONSTRAINT fk_room_answers_user_id 
FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

ALTER TABLE public.room_answers 
ADD CONSTRAINT fk_room_answers_role_id 
FOREIGN KEY (role_id) REFERENCES public.role_design(id) ON DELETE CASCADE;

ALTER TABLE public.room_answers 
ADD CONSTRAINT fk_room_answers_room_question_id 
FOREIGN KEY (room_question_id) REFERENCES public.room_questions(id) ON DELETE CASCADE;

-- 为性能优化添加索引
CREATE INDEX idx_room_answers_room_id ON public.room_answers(room_id);
CREATE INDEX idx_room_answers_user_id ON public.room_answers(user_id);
CREATE INDEX idx_room_answers_question_order ON public.room_answers(question_order);
CREATE INDEX idx_room_answers_room_question ON public.room_answers(room_question_id, question_order);

-- 添加唯一约束，确保每个玩家对每道题只能答一次
ALTER TABLE public.room_answers 
ADD CONSTRAINT unique_room_answer_per_question 
UNIQUE (room_id, user_id, question_order);

-- 添加检查约束
ALTER TABLE public.room_answers 
ADD CONSTRAINT check_selected_option_range 
CHECK (selected_option >= 1 AND selected_option <= 4);

ALTER TABLE public.room_answers 
ADD CONSTRAINT check_response_time_positive 
CHECK (response_time >= 0);

-- 启用 RLS
ALTER TABLE public.room_answers ENABLE ROW LEVEL SECURITY;

-- 创建适合新表结构的RLS策略
CREATE POLICY "允许房间参与者查看答题记录" 
ON public.room_answers 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.role_selections rs 
    WHERE rs.room_id = room_answers.room_id 
    AND rs.user_id = auth.uid()
  )
  OR 
  EXISTS (
    SELECT 1 FROM public.rooms r 
    WHERE r.id = room_answers.room_id 
    AND r.judge_user_id = auth.uid()
  )
);

CREATE POLICY "允许玩家插入自己的答题记录" 
ON public.room_answers 
FOR INSERT 
WITH CHECK (
  user_id = auth.uid() 
  AND EXISTS (
    SELECT 1 FROM public.role_selections rs 
    WHERE rs.room_id = room_answers.room_id 
    AND rs.user_id = auth.uid() 
    AND rs.role_id = room_answers.role_id
  )
);

CREATE POLICY "允许玩家更新自己的答题记录" 
ON public.room_answers 
FOR UPDATE 
USING (user_id = auth.uid());
