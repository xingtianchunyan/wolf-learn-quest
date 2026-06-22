
-- 修复 room_questions 表的 RLS 策略
-- 删除有问题的策略
DROP POLICY IF EXISTS "Allow judge to manage game questions" ON public.room_questions;
DROP POLICY IF EXISTS "Allow participants to view game questions" ON public.room_questions;
DROP POLICY IF EXISTS "Allow room judge to manage room questions" ON public.room_questions;
DROP POLICY IF EXISTS "只允许法官管理游戏题目" ON public.room_questions;
DROP POLICY IF EXISTS "允许参与者查看游戏题目" ON public.room_questions;

-- 创建正确的策略
-- 允许房间参与者（包括学生）查看房间题目
CREATE POLICY "Allow room participants to view room questions"
  ON public.room_questions FOR SELECT
  USING (is_room_participant(room_id, auth.uid()));

-- 允许房间法官管理房间题目
CREATE POLICY "Allow room judges to manage room questions"
  ON public.room_questions FOR ALL
  USING (is_room_judge(room_id, auth.uid()))
  WITH CHECK (is_room_judge(room_id, auth.uid()));

-- 确保 room_questions 表开启了实时订阅功能
ALTER TABLE public.room_questions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_questions;
