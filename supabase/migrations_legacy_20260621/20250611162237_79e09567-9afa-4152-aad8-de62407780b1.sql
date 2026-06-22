
-- 创建文件存储桶
INSERT INTO storage.buckets (id, name, public)
VALUES ('question-files', 'question-files', true);

-- 创建存储桶的RLS策略
CREATE POLICY "Allow authenticated users to upload files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'question-files' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view files" ON storage.objects
FOR SELECT USING (bucket_id = 'question-files' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete files" ON storage.objects
FOR DELETE USING (bucket_id = 'question-files' AND auth.role() = 'authenticated');

-- 创建题目表
CREATE TABLE public.generated_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.rooms(id) NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  source_file TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- 启用RLS
ALTER TABLE public.generated_questions ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
CREATE POLICY "Users can view questions in their rooms" ON public.generated_questions
FOR SELECT USING (true);

CREATE POLICY "Users can create questions" ON public.generated_questions
FOR INSERT WITH CHECK (auth.uid() = created_by);

-- 创建文件处理状态表
CREATE TABLE public.file_processing_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.rooms(id) NOT NULL,
  file_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'uploaded', -- uploaded, processing, processed, failed
  original_file_path TEXT,
  processed_file_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 启用RLS
ALTER TABLE public.file_processing_status ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
CREATE POLICY "Users can view file status" ON public.file_processing_status
FOR SELECT USING (true);

CREATE POLICY "Users can create file status" ON public.file_processing_status
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update file status" ON public.file_processing_status
FOR UPDATE USING (true);
