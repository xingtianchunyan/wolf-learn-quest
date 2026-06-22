
-- 检查并创建 generated_questions 表的缺失字段
DO $$ 
BEGIN
    -- 添加 file_name 字段（如果不存在）
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='generated_questions' AND column_name='file_name') THEN
        ALTER TABLE public.generated_questions ADD COLUMN file_name TEXT;
    END IF;
    
    -- 添加 model_used 字段（如果不存在）
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='generated_questions' AND column_name='model_used') THEN
        ALTER TABLE public.generated_questions ADD COLUMN model_used TEXT DEFAULT 'Qwen/Qwen3-30B-A3B';
    END IF;
    
    -- 添加 question_count 字段（如果不存在）
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='generated_questions' AND column_name='question_count') THEN
        ALTER TABLE public.generated_questions ADD COLUMN question_count INTEGER DEFAULT 0;
    END IF;
    
    -- 添加 questions 字段来存储完整的题目数据（如果不存在）
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='generated_questions' AND column_name='questions') THEN
        ALTER TABLE public.generated_questions ADD COLUMN questions JSONB;
    END IF;
END $$;

-- 修改约束，允许某些字段为空（因为我们现在使用 JSONB 存储）
ALTER TABLE public.generated_questions 
ALTER COLUMN room_id DROP NOT NULL,
ALTER COLUMN question_text DROP NOT NULL,
ALTER COLUMN option_a DROP NOT NULL,
ALTER COLUMN option_b DROP NOT NULL,
ALTER COLUMN option_c DROP NOT NULL,
ALTER COLUMN option_d DROP NOT NULL,
ALTER COLUMN correct_answer DROP NOT NULL;
