-- Secure chat_messages visibility
BEGIN;

-- Drop overly permissive SELECT policy
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'chat_messages' 
      AND policyname = 'Users can view chat messages'
  ) THEN
    EXECUTE 'DROP POLICY "Users can view chat messages" ON public.chat_messages';
  END IF;
END $$;

-- Replace/standardize SELECT policy with strict, role-aware visibility
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'chat_messages' 
      AND policyname = 'Players can view public and their private messages'
  ) THEN
    EXECUTE 'DROP POLICY "Players can view public and their private messages" ON public.chat_messages';
  END IF;
END $$;

CREATE POLICY "Chat visibility by type and participation"
ON public.chat_messages
FOR SELECT
USING (
  -- Public messages visible only to room participants (players or judge)
  (chat_type = 'public' AND public.is_room_participant(room_id, auth.uid()))
  OR
  -- Private messages visible only to sender or recipient
  (chat_type = 'private' AND (sender_id = auth.uid() OR recipient_id = auth.uid()))
  OR
  -- Werewolf team chat visible only to wolves in same game session
  (chat_type = 'werewolf' AND EXISTS (
    SELECT 1
    FROM public.room_players rp
    JOIN public.game_sessions gs ON gs.room_id = rp.room_id
    WHERE gs.id = public.chat_messages.game_id
      AND rp.user_id = auth.uid()
      AND rp.role = ANY (ARRAY['Werewolf','White Wolf King','Night Sorcerer','Demon'])
  ))
  OR
  -- Judges can view all messages in their room
  public.is_room_judge(room_id, auth.uid())
);

COMMIT;