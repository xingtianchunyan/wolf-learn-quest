
-- 创建预处理文件表
CREATE TABLE IF NOT EXISTS public.preprocessed_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  original_file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  preprocessed_content TEXT NOT NULL,
  model_used TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 启用RLS
ALTER TABLE public.preprocessed_files ENABLE ROW LEVEL SECURITY;

-- 删除可能存在的旧策略（如果有的话）
DROP POLICY IF EXISTS "Allow authenticated users to view preprocessed files" ON public.preprocessed_files;
DROP POLICY IF EXISTS "Allow authenticated users to create preprocessed files" ON public.preprocessed_files;

-- 创建查看策略
CREATE POLICY "Allow authenticated users to view preprocessed files" 
ON public.preprocessed_files FOR SELECT 
USING (true);

-- 创建插入策略
CREATE POLICY "Allow authenticated users to create preprocessed files" 
ON public.preprocessed_files FOR INSERT 
WITH CHECK (true);
