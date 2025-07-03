-- 修复 room_answers 表的 RLS 策略
-- 删除有问题的策略
DROP POLICY IF EXISTS "允许房间参与者查看答题记录" ON public.room_answers;
DROP POLICY IF EXISTS "允许玩家插入自己的答题记录" ON public.room_answers;
DROP POLICY IF EXISTS "允许玩家更新自己的答题记录" ON public.room_answers;

-- 创建修复后的策略
-- 允许房间参与者查看答题记录
CREATE POLICY "Allow room participants to view room answers"
  ON public.room_answers FOR SELECT
  USING (is_room_participant(room_id, auth.uid()));

-- 允许玩家插入自己的答题记录（简化条件，不强制要求role_id）
CREATE POLICY "Allow players to insert their own answers"
  ON public.room_answers FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND 
    is_room_participant(room_id, auth.uid())
  );

-- 允许玩家更新自己的答题记录
CREATE POLICY "Allow players to update their own answers"
  ON public.room_answers FOR UPDATE
  USING (user_id = auth.uid());

-- 确保 room_answers 表开启了实时订阅功能
ALTER TABLE public.room_answers REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_answers;