-- 修复上传文件和题目编辑的RLS策略问题
-- 允许所有认证用户上传文件（不限制为特定房间的法官）
DROP POLICY IF EXISTS "Allow judges to upload files for their rooms" ON uploaded_files;
CREATE POLICY "Allow authenticated users to upload files" 
ON uploaded_files 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- 允许所有认证用户查看上传的文件
DROP POLICY IF EXISTS "Room participants can view uploaded files for their rooms" ON uploaded_files;
CREATE POLICY "Allow authenticated users to view uploaded files" 
ON uploaded_files 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 允许所有认证用户创建题目（手动编辑题目功能）
DROP POLICY IF EXISTS "Allow system and judges to create questions" ON questions;
CREATE POLICY "Allow authenticated users to create questions" 
ON questions 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- 允许所有认证用户查看题目
DROP POLICY IF EXISTS "Room participants can view questions for their rooms" ON questions;
CREATE POLICY "Allow authenticated users to view questions" 
ON questions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 允许题目创建者或房间法官更新题目
DROP POLICY IF EXISTS "Allow judges to update questions" ON questions;
CREATE POLICY "Allow users to update questions" 
ON questions 
FOR UPDATE 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- 允许题目创建者或房间法官删除题目
DROP POLICY IF EXISTS "Allow judges to delete questions" ON questions;
CREATE POLICY "Allow users to delete questions" 
ON questions 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- 允许所有认证用户创建预处理文件
DROP POLICY IF EXISTS "Allow system and judges to manage preprocessed files" ON preprocessed_files;
CREATE POLICY "Allow authenticated users to manage preprocessed files" 
ON preprocessed_files 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- 允许所有认证用户创建生成的题目
DROP POLICY IF EXISTS "Allow system and judges to manage generated questions" ON generated_questions;
CREATE POLICY "Allow authenticated users to manage generated questions" 
ON generated_questions 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);