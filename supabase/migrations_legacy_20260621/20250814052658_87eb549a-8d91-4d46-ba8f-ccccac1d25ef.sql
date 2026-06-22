-- Fix RLS policies for game security - restrict public access to authenticated room participants only

-- Drop existing overly permissive policies for room_players
DROP POLICY IF EXISTS "Anyone can view room players" ON public.room_players;
DROP POLICY IF EXISTS "Users can view room players" ON public.room_players;

-- Create secure room_players policies
CREATE POLICY "Authenticated users can view room players they're involved with"
ON public.room_players
FOR SELECT
TO authenticated
USING (
  is_room_participant(room_id, auth.uid())
);

-- Drop existing overly permissive policies for questions
DROP POLICY IF EXISTS "Anyone can view questions" ON public.questions;
DROP POLICY IF EXISTS "Anyone can create questions" ON public.questions;

-- Create secure questions policies  
CREATE POLICY "Room participants can view questions for their rooms"
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

CREATE POLICY "Authenticated users can create questions"
ON public.questions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Drop existing overly permissive policies for generated_questions
DROP POLICY IF EXISTS "Anyone can view generated questions" ON public.generated_questions;
DROP POLICY IF EXISTS "Anyone can create generated questions" ON public.generated_questions;

-- Create secure generated_questions policies
CREATE POLICY "Room participants can view generated questions for their rooms"
ON public.generated_questions
FOR SELECT
TO authenticated
USING (
  room_id IS NULL OR is_room_participant(room_id, auth.uid())
);

CREATE POLICY "Authenticated users can create generated questions"
ON public.generated_questions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Drop existing overly permissive policies for preprocessed_files
DROP POLICY IF EXISTS "Allow authenticated users to view preprocessed files" ON public.preprocessed_files;
DROP POLICY IF EXISTS "Allow authenticated users to create preprocessed files" ON public.preprocessed_files;

-- Create secure preprocessed_files policies
CREATE POLICY "Room participants can view preprocessed files for their rooms"
ON public.preprocessed_files
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.generated_questions gq
    WHERE gq.uploaded_file_id = preprocessed_files.uploaded_file_id
    AND (gq.room_id IS NULL OR is_room_participant(gq.room_id, auth.uid()))
  )
);

CREATE POLICY "Authenticated users can create preprocessed files"
ON public.preprocessed_files
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Drop existing overly permissive policies for uploaded_files
DROP POLICY IF EXISTS "Anyone can view uploaded files" ON public.uploaded_files;
DROP POLICY IF EXISTS "Anyone can create uploaded files" ON public.uploaded_files;

-- Create secure uploaded_files policies
CREATE POLICY "Room participants can view uploaded files for their rooms"
ON public.uploaded_files
FOR SELECT
TO authenticated
USING (
  room_id IS NULL OR is_room_participant(room_id, auth.uid())
);

CREATE POLICY "Authenticated users can create uploaded files"
ON public.uploaded_files
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Ensure rooms table has proper restrictions (keep existing good policies, add missing ones)
DROP POLICY IF EXISTS "Anyone can view rooms" ON public.rooms;

-- Create more restrictive room viewing policy
CREATE POLICY "Users can view rooms they participate in or all waiting rooms"
ON public.rooms
FOR SELECT
TO authenticated
USING (
  status = 'waiting' OR 
  is_room_participant(id, auth.uid())
);