
-- 修改 sender_id 外键约束，直接关联到 auth.users 表
ALTER TABLE public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_sender_id_fkey;
ALTER TABLE public.chat_messages ADD CONSTRAINT chat_messages_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES auth.users(id);

-- 同样修改 recipient_id 外键约束
ALTER TABLE public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_recipient_id_fkey;
ALTER TABLE public.chat_messages ADD CONSTRAINT chat_messages_recipient_id_fkey 
FOREIGN KEY (recipient_id) REFERENCES auth.users(id);
