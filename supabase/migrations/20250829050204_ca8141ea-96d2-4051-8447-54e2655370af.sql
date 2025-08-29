-- P0-4: Add unique constraints to role_selections to prevent dual/multi-selection race conditions
-- Check for existing conflicting data first and clean up if necessary
-- Keep only the earliest selection per room_id, user_id combination
DELETE FROM public.role_selections 
WHERE id NOT IN (
  SELECT DISTINCT ON (room_id, user_id) id 
  FROM public.role_selections 
  ORDER BY room_id, user_id, selected_at ASC
);

-- Keep only the earliest selection per room_id, role_id combination  
DELETE FROM public.role_selections 
WHERE id NOT IN (
  SELECT DISTINCT ON (room_id, role_id) id 
  FROM public.role_selections 
  ORDER BY room_id, role_id, selected_at ASC
);

-- Add unique constraint: one role per room (prevent same role being selected by multiple users)
ALTER TABLE public.role_selections 
ADD CONSTRAINT role_selections_unique_room_role 
UNIQUE (room_id, role_id);

-- Add unique constraint: one user per room (prevent same user selecting multiple roles)
ALTER TABLE public.role_selections 
ADD CONSTRAINT role_selections_unique_room_user 
UNIQUE (room_id, user_id);