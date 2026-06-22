
-- 删除现有的chat_type约束（如果存在）
ALTER TABLE public.chat_messages DROP CONSTRAINT IF EXISTS "chat_messages_chat_type_check";

-- 添加新的chat_type约束，支持所有频道类型
ALTER TABLE public.chat_messages ADD CONSTRAINT "chat_messages_chat_type_check" 
CHECK (chat_type IN ('public', 'team', 'judge_private', 'system', 'room'));

-- 添加新的列来存储游戏轮次和阶段信息
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS game_round integer;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS game_phase text;

-- 更新RLS策略以支持新的频道类型
DROP POLICY IF EXISTS "Users can view room chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can send room chat messages" ON public.chat_messages;

-- 创建更全面的查看策略
CREATE POLICY "Users can view chat messages" 
  ON public.chat_messages 
  FOR SELECT 
  USING (
    CASE chat_type
      -- 房间聊天：只能看到自己房间的消息
      WHEN 'room' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        JOIN public.rooms r ON r.id = rp.room_id
        WHERE r.id = recipient_id::uuid AND rp.user_id = auth.uid()
      )
      -- 公共聊天：房间内所有人可见
      WHEN 'public' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = recipient_id::uuid AND rp.user_id = auth.uid()
      )
      -- 小队聊天：只有狼人可见
      WHEN 'team' THEN EXISTS (
        SELECT 1 FROM public.role_selections rs
        WHERE rs.room_id = recipient_id::uuid 
          AND rs.user_id = auth.uid()
          AND rs.role_id IN ('werewolf', 'werewolf1', 'werewolf2', 'whitewolf')
      )
      -- 法官私聊：发送者或接收者可见
      WHEN 'judge_private' THEN (sender_id = auth.uid() OR recipient_id::uuid = auth.uid())
      -- 系统公告：房间内所有人可见
      WHEN 'system' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = recipient_id::uuid AND rp.user_id = auth.uid()
      )
      ELSE false
    END
  );

-- 创建发送消息策略
CREATE POLICY "Users can send chat messages" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (
    sender_id = auth.uid() AND
    CASE chat_type
      -- 房间聊天
      WHEN 'room' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = recipient_id::uuid AND rp.user_id = auth.uid()
      )
      -- 公共聊天
      WHEN 'public' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = recipient_id::uuid AND rp.user_id = auth.uid()
      )
      -- 小队聊天：只有狼人可发送
      WHEN 'team' THEN EXISTS (
        SELECT 1 FROM public.role_selections rs
        WHERE rs.room_id = recipient_id::uuid 
          AND rs.user_id = auth.uid()
          AND rs.role_id IN ('werewolf', 'werewolf1', 'werewolf2', 'whitewolf')
      )
      -- 法官私聊：任何人都可以发送给法官
      WHEN 'judge_private' THEN true
      -- 系统公告：通常由系统发送，暂时允许所有用户
      WHEN 'system' THEN true
      ELSE false
    END
  );
