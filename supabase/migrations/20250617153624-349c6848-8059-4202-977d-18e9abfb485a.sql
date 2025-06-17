
-- 确保 role-design bucket 存在并且是公开的
INSERT INTO storage.buckets (id, name, public)
VALUES ('role-design', 'role-design', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 删除现有的存储策略（如果存在）
DROP POLICY IF EXISTS "Allow public read access for role images" ON storage.objects;

-- 创建新的公开读取策略
CREATE POLICY "Public read access for role images" ON storage.objects
FOR SELECT USING (bucket_id = 'role-design');

-- 允许上传文件到 role-design bucket
CREATE POLICY "Allow authenticated uploads to role-design" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'role-design' AND auth.role() = 'authenticated');
