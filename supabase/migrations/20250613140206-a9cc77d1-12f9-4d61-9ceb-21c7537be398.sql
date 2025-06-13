
-- 1. 删除依赖 created_by 列的策略
DROP POLICY IF EXISTS "Users can create questions" ON public.generated_questions;
DROP POLICY IF EXISTS "Users can view their own questions" ON public.generated_questions;
DROP POLICY IF EXISTS "Users can update their own questions" ON public.generated_questions;
DROP POLICY IF EXISTS "Users can delete their own questions" ON public.generated_questions;

-- 2. 创建文件管理表，为每个上传的文件建立独立ID
CREATE TABLE IF NOT EXISTS public.uploaded_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  room_id UUID REFERENCES public.rooms(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(file_name, room_id)
);

-- 3. 为preprocessed_files表添加唯一约束并关联uploaded_files
ALTER TABLE public.preprocessed_files 
ADD COLUMN IF NOT EXISTS uploaded_file_id UUID REFERENCES public.uploaded_files(id);

-- 添加唯一约束（如果不存在）
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_preprocessed_file'
    ) THEN
        ALTER TABLE public.preprocessed_files 
        ADD CONSTRAINT unique_preprocessed_file UNIQUE (original_file_path);
    END IF;
END $$;

-- 4. 简化generated_questions表，删除不必要的字段
ALTER TABLE public.generated_questions 
DROP COLUMN IF EXISTS question_text CASCADE,
DROP COLUMN IF EXISTS option_a CASCADE,
DROP COLUMN IF EXISTS option_b CASCADE,
DROP COLUMN IF EXISTS option_c CASCADE,
DROP COLUMN IF EXISTS option_d CASCADE,
DROP COLUMN IF EXISTS correct_answer CASCADE,
DROP COLUMN IF EXISTS created_by CASCADE;

-- 重命名source_file为original_file_path（如果列存在）
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'generated_questions' AND column_name = 'source_file'
    ) THEN
        ALTER TABLE public.generated_questions 
        RENAME COLUMN source_file TO original_file_path;
    END IF;
END $$;

-- 添加与uploaded_files的关联
ALTER TABLE public.generated_questions 
ADD COLUMN IF NOT EXISTS uploaded_file_id UUID REFERENCES public.uploaded_files(id);

-- 添加唯一约束（如果不存在）
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_generated_questions'
    ) THEN
        ALTER TABLE public.generated_questions 
        ADD CONSTRAINT unique_generated_questions UNIQUE (original_file_path);
    END IF;
END $$;

-- 5. 优化questions表，添加与generated_questions的关联
ALTER TABLE public.questions 
ADD COLUMN IF NOT EXISTS generated_questions_id UUID REFERENCES public.generated_questions(id),
ADD COLUMN IF NOT EXISTS room_id UUID REFERENCES public.rooms(id);

-- 6. 创建索引提高查询效率
CREATE INDEX IF NOT EXISTS idx_uploaded_files_room_id ON public.uploaded_files(room_id);
CREATE INDEX IF NOT EXISTS idx_preprocessed_files_uploaded_file_id ON public.preprocessed_files(uploaded_file_id);
CREATE INDEX IF NOT EXISTS idx_generated_questions_uploaded_file_id ON public.generated_questions(uploaded_file_id);
CREATE INDEX IF NOT EXISTS idx_questions_generated_questions_id ON public.questions(generated_questions_id);
CREATE INDEX IF NOT EXISTS idx_questions_room_id ON public.questions(room_id);

-- 7. 创建存储桶用于文件上传
INSERT INTO storage.buckets (id, name, public) 
VALUES ('question-files', 'question-files', true)
ON CONFLICT (id) DO NOTHING;

-- 8. 为存储桶创建策略（删除后重新创建以避免冲突）
DROP POLICY IF EXISTS "Anyone can view files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete files" ON storage.objects;

CREATE POLICY "Anyone can view files" ON storage.objects
FOR SELECT USING (bucket_id = 'question-files');

CREATE POLICY "Anyone can upload files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'question-files');

CREATE POLICY "Anyone can update files" ON storage.objects
FOR UPDATE USING (bucket_id = 'question-files');

CREATE POLICY "Anyone can delete files" ON storage.objects
FOR DELETE USING (bucket_id = 'question-files');

-- 9. 为新的表结构创建适当的 RLS 策略
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view uploaded files" ON public.uploaded_files;
DROP POLICY IF EXISTS "Anyone can create uploaded files" ON public.uploaded_files;

CREATE POLICY "Anyone can view uploaded files" ON public.uploaded_files FOR SELECT USING (true);
CREATE POLICY "Anyone can create uploaded files" ON public.uploaded_files FOR INSERT WITH CHECK (true);

ALTER TABLE public.generated_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view generated questions" ON public.generated_questions;
DROP POLICY IF EXISTS "Anyone can create generated questions" ON public.generated_questions;

CREATE POLICY "Anyone can view generated questions" ON public.generated_questions FOR SELECT USING (true);
CREATE POLICY "Anyone can create generated questions" ON public.generated_questions FOR INSERT WITH CHECK (true);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view questions" ON public.questions;
DROP POLICY IF EXISTS "Anyone can create questions" ON public.questions;

CREATE POLICY "Anyone can view questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Anyone can create questions" ON public.questions FOR INSERT WITH CHECK (true);
