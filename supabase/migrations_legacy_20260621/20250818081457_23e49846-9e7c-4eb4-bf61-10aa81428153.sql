-- 创建文件上传存储桶和相关策略
INSERT INTO storage.buckets (id, name, public) 
VALUES ('question-files', 'question-files', false)
ON CONFLICT (id) DO NOTHING;

-- 为question-files存储桶创建RLS策略
CREATE POLICY "Users can upload question files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'question-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can view question files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'question-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update question files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'question-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete question files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'question-files' AND auth.uid() IS NOT NULL);

-- 确保uploaded_files表有正确的RLS策略
CREATE POLICY "Users can insert uploaded files" 
ON public.uploaded_files 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view uploaded files" 
ON public.uploaded_files 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update uploaded files" 
ON public.uploaded_files 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete uploaded files" 
ON public.uploaded_files 
FOR DELETE 
USING (auth.uid() IS NOT NULL);