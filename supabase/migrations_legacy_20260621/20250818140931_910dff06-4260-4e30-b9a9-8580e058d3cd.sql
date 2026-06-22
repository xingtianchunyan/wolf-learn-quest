-- Fix the foreign key constraint and ensure questions can be inserted with generated_questions_id
-- Also check if we need to update RLS policies

-- First let's see the current questions table structure
\d questions;

-- Check current RLS policies on questions table
SELECT schemaname, tablename, policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'questions';

-- The issue is likely that the edge function can't insert questions because of RLS
-- Let's update the RLS policy to allow system/service role to insert questions
DROP POLICY IF EXISTS "Allow system to insert questions" ON questions;

CREATE POLICY "Allow system to insert questions" 
ON questions 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Also ensure that authenticated users can still manage questions
DROP POLICY IF EXISTS "Allow authenticated users to manage questions" ON questions;

CREATE POLICY "Allow authenticated users to manage questions" 
ON questions 
FOR ALL 
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Let's also make sure the foreign key constraint exists
ALTER TABLE questions 
ADD CONSTRAINT fk_questions_generated_questions 
FOREIGN KEY (generated_questions_id) 
REFERENCES generated_questions(id) 
ON DELETE CASCADE;