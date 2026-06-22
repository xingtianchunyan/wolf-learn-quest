
-- Drop the old policy if it exists, to avoid errors on re-run
DROP POLICY IF EXISTS "Allow room judge to manage room questions" ON public.room_questions;

-- Ensure RLS is enabled, this is safe to run multiple times.
ALTER TABLE public.room_questions ENABLE ROW LEVEL SECURITY;

-- Re-create the policy with explicit table references to avoid ambiguity
CREATE POLICY "Allow room judge to manage room questions"
ON public.room_questions
FOR ALL
USING (auth.uid() = (SELECT r.judge_user_id FROM public.rooms AS r WHERE r.id = room_questions.room_id))
WITH CHECK (auth.uid() = (SELECT r.judge_user_id FROM public.rooms AS r WHERE r.id = room_questions.room_id));
