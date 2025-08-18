-- 添加questions表与generated_questions表之间的外键约束
-- 首先检查是否已存在外键约束
DO $$
BEGIN
    -- 删除已存在的外键约束（如果存在）
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'questions_generated_questions_id_fkey' 
        AND table_name = 'questions'
    ) THEN
        ALTER TABLE public.questions DROP CONSTRAINT questions_generated_questions_id_fkey;
    END IF;
    
    -- 添加外键约束
    ALTER TABLE public.questions 
    ADD CONSTRAINT questions_generated_questions_id_fkey 
    FOREIGN KEY (generated_questions_id) 
    REFERENCES public.generated_questions(id) 
    ON DELETE SET NULL;
END $$;