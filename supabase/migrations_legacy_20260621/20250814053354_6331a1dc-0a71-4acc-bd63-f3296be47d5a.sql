-- Fix quiz questions and answers exposure security issue
-- Remove overly permissive generated_questions policy and create stricter ones

-- Drop the current policy that allows access to questions with room_id IS NULL
DROP POLICY IF EXISTS "Room participants can view generated questions for their rooms" ON public.generated_questions;

-- Create a more restrictive policy that only allows:
-- 1. Room judges to view all questions for their rooms (needed for question management)
-- 2. Room participants to view questions only AFTER they've been assigned to the room (via room_questions)
-- 3. No access to questions that aren't specifically assigned to rooms the user participates in
CREATE POLICY "Judges can view generated questions for their rooms"
ON public.generated_questions
FOR SELECT
TO authenticated
USING (
  room_id IS NOT NULL AND is_room_judge(room_id, auth.uid())
);

-- Create a separate policy for participants to only see questions that are actually in use
CREATE POLICY "Participants can view active room questions only"
ON public.generated_questions
FOR SELECT  
TO authenticated
USING (
  room_id IS NOT NULL 
  AND is_room_participant(room_id, auth.uid())
  AND EXISTS (
    SELECT 1 FROM public.room_questions rq 
    WHERE rq.generated_questions_id = generated_questions.id
    AND rq.room_id = generated_questions.room_id
  )
);

-- Also tighten the questions table policy to prevent direct access to answers
DROP POLICY IF EXISTS "Room participants can view questions for their rooms" ON public.questions;

-- Create a policy that allows viewing questions but only when they're part of room_questions
CREATE POLICY "Room participants can view assigned questions"
ON public.questions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.room_questions rq
    WHERE rq.question_id = questions.id
    AND is_room_participant(rq.room_id, auth.uid())
  )
);

-- Add a judge-specific policy for questions to allow judges to manage all questions for their rooms
CREATE POLICY "Judges can view all questions for room management"
ON public.questions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.room_questions rq
    WHERE rq.question_id = questions.id
    AND is_room_judge(rq.room_id, auth.uid())
  )
  OR
  -- Allow judges to view questions from generated_questions they have access to
  EXISTS (
    SELECT 1 FROM public.generated_questions gq
    WHERE questions.generated_questions_id = gq.id
    AND gq.room_id IS NOT NULL
    AND is_room_judge(gq.room_id, auth.uid())
  )
);