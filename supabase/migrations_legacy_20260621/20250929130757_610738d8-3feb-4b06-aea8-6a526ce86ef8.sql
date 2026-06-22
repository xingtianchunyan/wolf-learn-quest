-- Fix Security Definer View issue by converting views to use SECURITY INVOKER
-- This ensures views run with the permissions of the accessing user, not the creator

-- 1. Drop and recreate skill_system_performance view with SECURITY INVOKER
DROP VIEW IF EXISTS public.skill_system_performance;

CREATE VIEW public.skill_system_performance 
WITH (security_invoker = true)
AS
SELECT 
  'skill_uses' as table_name,
  pg_size_pretty(pg_total_relation_size('skill_uses')) as table_size,
  (SELECT COUNT(*) FROM skill_uses) as total_rows,
  (SELECT COUNT(*) FROM skill_uses WHERE created_at > now() - interval '24 hours') as recent_rows
UNION ALL
SELECT 
  'skill_effects_queue' as table_name,
  pg_size_pretty(pg_total_relation_size('skill_effects_queue')) as table_size,
  (SELECT COUNT(*) FROM skill_effects_queue) as total_rows,
  (SELECT COUNT(*) FROM skill_effects_queue WHERE created_at > now() - interval '24 hours') as recent_rows
UNION ALL
SELECT 
  'standardized_skill_targets' as table_name,
  pg_size_pretty(pg_total_relation_size('standardized_skill_targets')) as table_size,
  (SELECT COUNT(*) FROM standardized_skill_targets) as total_rows,
  (SELECT COUNT(*) FROM standardized_skill_targets WHERE created_at > now() - interval '24 hours') as recent_rows
UNION ALL
SELECT 
  'skill_conflicts' as table_name,
  pg_size_pretty(pg_total_relation_size('skill_conflicts')) as table_size,
  (SELECT COUNT(*) FROM skill_conflicts) as total_rows,
  (SELECT COUNT(*) FROM skill_conflicts WHERE created_at > now() - interval '24 hours') as recent_rows;

-- 2. Add proper RLS policy for the skill_system_performance view access
ALTER VIEW public.skill_system_performance OWNER TO postgres;
GRANT SELECT ON public.skill_system_performance TO authenticated;

-- 3. Update comment to reflect security fix
COMMENT ON VIEW public.skill_system_performance IS 'Performance monitoring view for skill system tables with SECURITY INVOKER for proper access control';

-- 4. Fix any functions missing proper search_path (addressing the Function Search Path Mutable warning)
-- These functions already have SET search_path but let's ensure they're properly set

-- Ensure all critical security definer functions have immutable search_path
CREATE OR REPLACE FUNCTION public.is_room_participant(p_room_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN (
    -- Check if user is a player in the room
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id = p_room_id AND rp.user_id = p_user_id
    )
    OR
    -- Check if user is the room judge
    EXISTS (
      SELECT 1 FROM public.rooms r
      WHERE r.id = p_room_id AND r.judge_user_id = p_user_id
    )
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_room_judge(p_room_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.rooms 
    WHERE id = p_room_id AND judge_user_id = p_user_id
  );
END;
$$;