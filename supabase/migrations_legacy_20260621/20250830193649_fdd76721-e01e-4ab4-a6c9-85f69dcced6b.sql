-- Add RLS policy to allow judges to update next_room_id
CREATE POLICY "Allow judges to update next_room_id" 
ON public.rooms 
FOR UPDATE 
USING (judge_user_id = auth.uid())
WITH CHECK (judge_user_id = auth.uid());