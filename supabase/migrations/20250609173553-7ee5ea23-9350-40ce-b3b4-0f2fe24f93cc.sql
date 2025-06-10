
-- 为房间聊天消息启用实时功能
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;

-- 将聊天消息表添加到实时发布中
ALTER publication supabase_realtime ADD TABLE public.chat_messages;

-- 添加RLS策略以确保用户只能看到和发送自己房间的聊天消息
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 创建策略允许用户查看房间聊天消息 (修复类型转换)
CREATE POLICY "Users can view room chat messages" 
  ON public.chat_messages 
  FOR SELECT 
  USING (
    chat_type = 'room' AND 
    EXISTS (
      SELECT 1 FROM public.room_players rp
      JOIN public.rooms r ON r.id = rp.room_id
      WHERE r.id = recipient_id::uuid AND rp.user_id = auth.uid()
    )
  );

-- 创建策略允许用户在房间中发送聊天消息 (修复类型转换)
CREATE POLICY "Users can send room chat messages" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (
    chat_type = 'room' AND
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.room_players rp
      JOIN public.rooms r ON r.id = rp.room_id
      WHERE r.id = recipient_id::uuid AND rp.user_id = auth.uid()
    )
  );
