-- P0-2: Tighten role_selections RLS - ensure writes are limited to room participants only
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow players to manage their own role selections" ON public.role_selections;

-- Create new strict policies
-- SELECT: Allow room participants and judges to view selections
CREATE POLICY "role_selections_select_participants"
ON public.role_selections
FOR SELECT
USING (
  is_room_participant(room_id, auth.uid()) OR 
  is_room_judge(room_id, auth.uid())
);

-- INSERT: Only allow room participants to insert their own selections
CREATE POLICY "role_selections_insert_participants_only"
ON public.role_selections
FOR INSERT
WITH CHECK (
  user_id = auth.uid() AND 
  is_room_participant(room_id, auth.uid())
);

-- UPDATE: Only allow users to update their own selections in rooms they participate in
CREATE POLICY "role_selections_update_own_in_room"
ON public.role_selections
FOR UPDATE
USING (
  user_id = auth.uid() AND 
  is_room_participant(room_id, auth.uid())
)
WITH CHECK (
  user_id = auth.uid() AND 
  is_room_participant(room_id, auth.uid())
);

-- DELETE: Only allow users to delete their own selections in rooms they participate in
CREATE POLICY "role_selections_delete_own_in_room"
ON public.role_selections
FOR DELETE
USING (
  user_id = auth.uid() AND 
  is_room_participant(room_id, auth.uid())
);