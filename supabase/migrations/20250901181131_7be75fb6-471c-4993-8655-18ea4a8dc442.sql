-- Fix database security issues: Set search_path for all functions to prevent SQL injection attacks

-- Update all functions to have secure search_path
ALTER FUNCTION is_room_participant(uuid, uuid) SET search_path = public;
ALTER FUNCTION is_room_judge(uuid, uuid) SET search_path = public;
ALTER FUNCTION get_skill_target_room_id(uuid) SET search_path = public;

-- Create any missing security functions if they don't exist
CREATE OR REPLACE FUNCTION public.is_room_participant(room_id uuid, user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM room_players rp 
    WHERE rp.room_id = $1 AND rp.user_id = $2
  ) OR EXISTS (
    SELECT 1 
    FROM rooms r 
    WHERE r.id = $1 AND (r.host_id = $2 OR r.judge_user_id = $2)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_room_judge(room_id uuid, user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM rooms r 
    WHERE r.id = $1 AND r.judge_user_id = $2
  );
$$;

CREATE OR REPLACE FUNCTION public.get_skill_target_room_id(queue_id uuid)
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT seq.room_id 
  FROM skill_effects_queue seq 
  WHERE seq.id = $1;
$$;