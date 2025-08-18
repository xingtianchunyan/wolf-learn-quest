-- First check what policies exist on the questions table
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'questions';

-- Drop all existing policies to clean up
DROP POLICY IF EXISTS "Allow authenticated users to view questions" ON questions;
DROP POLICY IF EXISTS "Allow authenticated users to create questions" ON questions;
DROP POLICY IF EXISTS "Allow authenticated users to update questions" ON questions; 
DROP POLICY IF EXISTS "Allow authenticated users to delete questions" ON questions;
DROP POLICY IF EXISTS "Allow users to delete questions" ON questions;
DROP POLICY IF EXISTS "Allow users to update questions" ON questions;

-- Create new clean policies
CREATE POLICY "service_role_can_insert_questions" 
ON questions 
FOR INSERT 
TO service_role
WITH CHECK (true);

CREATE POLICY "authenticated_can_view_questions" 
ON questions 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_can_create_manual_questions" 
ON questions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_can_update_questions" 
ON questions 
FOR UPDATE 
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_can_delete_questions" 
ON questions 
FOR DELETE 
TO authenticated
USING (auth.uid() IS NOT NULL);