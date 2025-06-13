
-- 修复 generated_questions 表结构，添加缺失的字段
ALTER TABLE public.generated_questions 
ADD COLUMN IF NOT EXISTS file_name TEXT,
ADD COLUMN IF NOT EXISTS model_used TEXT DEFAULT 'Qwen/Qwen3-30B-A3B',
ADD COLUMN IF NOT EXISTS question_count INTEGER DEFAULT 0;

-- 移除不再需要的字段约束
ALTER TABLE public.generated_questions 
ALTER COLUMN room_id DROP NOT NULL,
ALTER COLUMN question_text DROP NOT NULL,
ALTER COLUMN option_a DROP NOT NULL,
ALTER COLUMN option_b DROP NOT NULL,
ALTER COLUMN option_c DROP NOT NULL,
ALTER COLUMN option_d DROP NOT NULL,
ALTER COLUMN correct_answer DROP NOT NULL;

-- 添加新的字段来存储完整的题目数据
ALTER TABLE public.generated_questions 
ADD COLUMN IF NOT EXISTS questions JSONB;
