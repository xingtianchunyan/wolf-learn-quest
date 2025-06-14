
-- Rename the table from game_questions to room_questions
ALTER TABLE public.game_questions RENAME TO room_questions;

-- Rename the game_id column to room_id
ALTER TABLE public.room_questions RENAME COLUMN game_id TO room_id;

-- Drop the old foreign key constraint that points to game_states
-- Note: The constraint name might vary if it was auto-generated, but this is the most likely name.
-- If this fails, we might need to look up the exact constraint name.
ALTER TABLE public.room_questions DROP CONSTRAINT IF EXISTS game_questions_game_id_fkey;

-- Add a new foreign key constraint pointing to the rooms table
ALTER TABLE public.room_questions 
  ADD CONSTRAINT room_questions_room_id_fkey 
  FOREIGN KEY (room_id) 
  REFERENCES public.rooms(id) 
  ON DELETE CASCADE;

-- Update comments on the table and column
COMMENT ON TABLE public.room_questions IS 'Stores the ordered list of questions selected for a specific room, available before the game starts.';
COMMENT ON COLUMN public.room_questions.room_id IS 'The room for which these questions are selected.';
