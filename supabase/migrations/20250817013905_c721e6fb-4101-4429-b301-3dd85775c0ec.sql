-- 修复题库组件的RLS策略问题

-- 1. 更新 uploaded_files 表的RLS策略，允许法官上传文件
DROP POLICY IF EXISTS "Authenticated users can create uploaded files" ON public.uploaded_files;
CREATE POLICY "Allow judges to upload files for their rooms" 
ON public.uploaded_files 
FOR INSERT 
WITH CHECK (
  -- 如果有room_id，必须是该房间的法官
  (room_id IS NULL OR is_room_judge(room_id, auth.uid())) AND
  -- 同时要求用户已认证
  auth.uid() IS NOT NULL
);

-- 2. 更新 questions 表的RLS策略，允许UPDATE权限
CREATE POLICY "Allow judges to update questions" 
ON public.questions 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM room_questions rq
    WHERE rq.question_id = questions.id 
      AND is_room_judge(rq.room_id, auth.uid())
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM room_questions rq
    WHERE rq.question_id = questions.id 
      AND is_room_judge(rq.room_id, auth.uid())
  )
);

-- 3. 允许法官删除问题
CREATE POLICY "Allow judges to delete questions" 
ON public.questions 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM room_questions rq
    WHERE rq.question_id = questions.id 
      AND is_room_judge(rq.room_id, auth.uid())
  )
);

-- 4. 更新 preprocessed_files 表的策略，允许法官访问
DROP POLICY IF EXISTS "Authenticated users can create preprocessed files" ON public.preprocessed_files;
CREATE POLICY "Allow system and judges to manage preprocessed files" 
ON public.preprocessed_files 
FOR ALL
USING (
  -- 系统可以创建，法官可以查看相关房间的预处理文件
  auth.uid() IS NOT NULL AND (
    -- 系统创建时没有特定限制
    TRUE
  )
)
WITH CHECK (
  -- 插入时需要认证用户
  auth.uid() IS NOT NULL
);

-- 5. 更新 generated_questions 表的策略
DROP POLICY IF EXISTS "Authenticated users can create generated questions" ON public.generated_questions;
CREATE POLICY "Allow system and judges to manage generated questions" 
ON public.generated_questions 
FOR ALL
USING (
  auth.uid() IS NOT NULL AND (
    -- 如果没有room_id，或者用户是房间法官，都可以访问
    room_id IS NULL OR is_room_judge(room_id, auth.uid())
  )
)
WITH CHECK (
  -- 插入时需要认证用户
  auth.uid() IS NOT NULL
);

-- 6. 确保 questions 表允许法官创建手动题目
DROP POLICY IF EXISTS "Authenticated users can create questions" ON public.questions;
CREATE POLICY "Allow system and judges to create questions" 
ON public.questions 
FOR INSERT 
WITH CHECK (
  -- 认证用户可以创建题目
  auth.uid() IS NOT NULL
);