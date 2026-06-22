-- 修改投票会话的RLS策略，允许房间参与者在白天阶段创建投票会话
DROP POLICY IF EXISTS "Allow judges to manage voting sessions" ON voting_sessions;

-- 允许法官管理所有投票会话
CREATE POLICY "Allow judges to manage voting sessions" 
ON voting_sessions 
FOR ALL 
USING (is_room_judge(room_id, auth.uid()))
WITH CHECK (is_room_judge(room_id, auth.uid()));

-- 允许房间参与者在白天阶段创建投票会话
CREATE POLICY "Allow room participants to create day voting sessions" 
ON voting_sessions 
FOR INSERT 
WITH CHECK (
  is_room_participant(room_id, auth.uid()) 
  AND session_type = 'day_vote'
  AND phase = 1
);