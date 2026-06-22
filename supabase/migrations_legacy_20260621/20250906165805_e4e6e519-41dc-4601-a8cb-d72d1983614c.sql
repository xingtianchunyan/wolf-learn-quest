-- 继续修复投票系统的RLS策略

-- 更新投票会话的RLS策略
DROP POLICY IF EXISTS "Allow room participants to create day voting sessions" ON voting_sessions;
DROP POLICY IF EXISTS "Allow room participants to view voting sessions" ON voting_sessions;
DROP POLICY IF EXISTS "Allow judges to manage voting sessions" ON voting_sessions;

-- 允许房间参与者查看投票会话（任何阶段）
CREATE POLICY "voting_sessions_select_participants"
ON voting_sessions FOR SELECT
TO authenticated
USING (is_room_participant(room_id, auth.uid()) OR is_room_judge(room_id, auth.uid()));

-- 允许房间参与者和法官创建投票会话（通过函数）
CREATE POLICY "voting_sessions_insert_via_function"
ON voting_sessions FOR INSERT
TO authenticated
WITH CHECK (is_room_participant(room_id, auth.uid()) OR is_room_judge(room_id, auth.uid()));

-- 允许法官管理投票会话
CREATE POLICY "voting_sessions_judge_manage"
ON voting_sessions FOR ALL
TO authenticated
USING (is_room_judge(room_id, auth.uid()))
WITH CHECK (is_room_judge(room_id, auth.uid()));

-- 确保实时更新能正常工作
ALTER TABLE voting_sessions REPLICA IDENTITY FULL;
ALTER TABLE votes REPLICA IDENTITY FULL;
ALTER TABLE voting_results REPLICA IDENTITY FULL;