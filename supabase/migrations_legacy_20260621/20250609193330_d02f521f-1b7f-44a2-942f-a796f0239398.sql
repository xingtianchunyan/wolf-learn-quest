
-- 为 chat_messages 表添加 room_id 字段
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS room_id uuid;

-- 添加外键约束，关联到 rooms 表
ALTER TABLE public.chat_messages ADD CONSTRAINT chat_messages_room_id_fkey 
FOREIGN KEY (room_id) REFERENCES public.rooms(id);

-- 修改 recipient_id 的外键约束，使其正确指向 users 表的 id 字段
ALTER TABLE public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_recipient_id_fkey;
ALTER TABLE public.chat_messages ADD CONSTRAINT chat_messages_recipient_id_fkey 
FOREIGN KEY (recipient_id) REFERENCES public.users(id);

-- 修改 sender_id 的外键约束，使其正确指向 users 表的 id 字段  
ALTER TABLE public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_sender_id_fkey;
ALTER TABLE public.chat_messages ADD CONSTRAINT chat_messages_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES public.users(id);

-- 更新 RLS 策略以使用新的 room_id 字段
DROP POLICY IF EXISTS "Users can view chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can send chat messages" ON public.chat_messages;

-- 创建新的查看策略
CREATE POLICY "Users can view chat messages" 
  ON public.chat_messages 
  FOR SELECT 
  USING (
    CASE 
      -- 公共聊天：房间内所有人可见
      WHEN chat_type = 'public' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = chat_messages.room_id AND rp.user_id = auth.uid()
      )
      -- 系统公告：房间内所有人可见
      WHEN chat_type = 'system' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = chat_messages.room_id AND rp.user_id = auth.uid()
      )
      -- 小队聊天：只有狼人可见
      WHEN chat_type = 'team' THEN EXISTS (
        SELECT 1 FROM public.role_selections rs
        WHERE rs.room_id = chat_messages.room_id 
          AND rs.user_id = auth.uid()
          AND rs.role_id IN ('werewolf', 'werewolf1', 'werewolf2', 'whitewolf')
      )
      -- 法官私聊：发送者或特定接收者可见
      WHEN chat_type = 'judge_private' THEN (sender_id = auth.uid() OR recipient_id = auth.uid())
      ELSE false
    END
  );

-- 创建新的发送消息策略
CREATE POLICY "Users can send chat messages" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (
    sender_id = auth.uid() AND
    CASE 
      -- 公共聊天：房间内成员可发送
      WHEN chat_type = 'public' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = chat_messages.room_id AND rp.user_id = auth.uid()
      )
      -- 系统公告：房间内成员可发送
      WHEN chat_type = 'system' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = chat_messages.room_id AND rp.user_id = auth.uid()
      )
      -- 小队聊天：只有狼人可发送
      WHEN chat_type = 'team' THEN EXISTS (
        SELECT 1 FROM public.role_selections rs
        WHERE rs.room_id = chat_messages.room_id 
          AND rs.user_id = auth.uid()
          AND rs.role_id IN ('werewolf', 'werewolf1', 'werewolf2', 'whitewolf')
      )
      -- 法官私聊：任何房间成员都可以发送
      WHEN chat_type = 'judge_private' THEN EXISTS (
        SELECT 1 FROM public.room_players rp
        WHERE rp.room_id = chat_messages.room_id AND rp.user_id = auth.uid()
      )
      ELSE false
    END
  );
