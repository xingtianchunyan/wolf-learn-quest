
-- 删除现有的聊天消息策略，以便重新创建
DROP POLICY IF EXISTS "Users can view chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can send chat messages" ON public.chat_messages;

-- 删除现有的帮助函数（如果存在），以确保它们被更新
DROP FUNCTION IF EXISTS public.is_room_participant(uuid, uuid);
DROP FUNCTION IF EXISTS public.get_room_judge_id(uuid);

-- 帮助函数：检查用户是否是房间的参与者（玩家或法官）
-- 使用 SECURITY DEFINER 以避免 RLS 策略中的递归问题
CREATE OR REPLACE FUNCTION public.is_room_participant(p_room_id uuid, p_user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN (
    -- 检查用户是否是房间中的玩家
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id = p_room_id AND rp.user_id = p_user_id
    )
    OR
    -- 检查用户是否是房间的法官
    EXISTS (
      SELECT 1 FROM public.rooms r
      WHERE r.id = p_room_id AND r.judge_user_id = p_user_id
    )
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 帮助函数：获取房间的法官ID
CREATE OR REPLACE FUNCTION public.get_room_judge_id(p_room_id uuid)
RETURNS uuid AS $$
DECLARE
  v_judge_id uuid;
BEGIN
  SELECT judge_user_id INTO v_judge_id FROM public.rooms WHERE id = p_room_id;
  RETURN v_judge_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;


-- 创建新的查看消息策略，将法官也视为参与者
CREATE POLICY "Users can view chat messages"
  ON public.chat_messages
  FOR SELECT
  USING (
    CASE
      -- 公共和系统消息对所有参与者（包括法官）可见
      WHEN chat_type IN ('public', 'system') THEN
        public.is_room_participant(room_id, auth.uid())

      -- 小队聊天仅对该房间的狼人可见
      WHEN chat_type = 'team' THEN
        EXISTS (
          SELECT 1 FROM public.role_selections rs
          WHERE rs.room_id = chat_messages.room_id
            AND rs.user_id = auth.uid()
            AND rs.role_id IN ('werewolf', 'werewolf1', 'werewolf2', 'whitewolf')
        )

      -- 法官私聊对发送者和房间法官可见
      WHEN chat_type = 'judge_private' THEN
        (sender_id = auth.uid() OR public.get_room_judge_id(room_id) = auth.uid())

      ELSE false
    END
  );

-- 创建新的发送消息策略，允许法官发送消息
CREATE POLICY "Users can send chat messages"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    CASE
      -- 任何参与者（包括法官）都可以发送公共和系统消息
      WHEN chat_type IN ('public', 'system') THEN
        public.is_room_participant(room_id, auth.uid())

      -- 只有狼人可以发送小队聊天
      WHEN chat_type = 'team' THEN
        EXISTS (
          SELECT 1 FROM public.role_selections rs
          WHERE rs.room_id = chat_messages.room_id
            AND rs.user_id = auth.uid()
            AND rs.role_id IN ('werewolf', 'werewolf1', 'werewolf2', 'whitewolf')
        )

      -- 任何参与者（包括法官）都可以发送法官私聊
      WHEN chat_type = 'judge_private' THEN
        public.is_room_participant(room_id, auth.uid())

      ELSE false
    END
  );
