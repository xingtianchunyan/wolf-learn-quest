-- Fix RLS policies for questions table to allow service role to insert

-- Drop existing policies that might be conflicting
DROP POLICY IF EXISTS "Allow system to insert questions" ON questions;
DROP POLICY IF EXISTS "Allow authenticated users to manage questions" ON questions;

-- Create a policy that allows service_role to insert questions (for edge functions)
CREATE POLICY "Allow service role to insert questions" 
ON questions 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Keep the existing authenticated user policies but make them more specific
CREATE POLICY "Allow authenticated users to view questions" 
ON questions 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update questions" 
ON questions 
FOR UPDATE 
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to create manual questions" 
ON questions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete questions" 
ON questions 
FOR DELETE 
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Also add foreign key constraint if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_questions_generated_questions'
    ) THEN
        ALTER TABLE questions 
        ADD CONSTRAINT fk_questions_generated_questions 
        FOREIGN KEY (generated_questions_id) 
        REFERENCES generated_questions(id) 
        ON DELETE CASCADE;
    END IF;
END $$;