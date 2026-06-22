-- P0-1: Tighten role_states RLS - prevent direct player updates, only allow through RPC
-- Drop existing policies
DROP POLICY IF EXISTS "允许玩家更新自己的角色状态" ON public.role_states;
DROP POLICY IF EXISTS "允许系统插入角色状态" ON public.role_states;

-- Create new restrictive policies
-- Only allow SELECT for room participants and judges (maintain existing read access)
CREATE POLICY "role_states_select_room_participants"
ON public.role_states
FOR SELECT
USING (
  is_room_participant(room_id, auth.uid()) OR 
  is_room_judge(room_id, auth.uid())
);

-- Only allow UPDATE for judges (controlled access)
CREATE POLICY "role_states_update_judges_only"
ON public.role_states
FOR UPDATE
USING (is_room_judge(room_id, auth.uid()))
WITH CHECK (is_room_judge(room_id, auth.uid()));

-- Only allow INSERT through system/RPC (SECURITY DEFINER functions)
-- No direct client INSERT allowed