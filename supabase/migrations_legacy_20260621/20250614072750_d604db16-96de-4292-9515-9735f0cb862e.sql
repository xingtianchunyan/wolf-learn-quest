
-- 为 rooms 表添加 judge_user_id 字段来跟踪当前法官
ALTER TABLE public.rooms 
ADD COLUMN judge_user_id UUID REFERENCES auth.users(id);

-- 添加索引以提高查询性能
CREATE INDEX idx_rooms_judge_user_id ON public.rooms(judge_user_id);
