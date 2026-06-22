-- Phase 3: Final Cleanup and Code Migration Support (Fixed)

-- Step 1: Create migration functions to support code transition
CREATE OR REPLACE FUNCTION public.get_active_skill_effects_for_user(p_user_id uuid, p_game_state_id uuid)
RETURNS TABLE(
  effect_type text,
  effect_duration integer,
  effect_end_time timestamp with time zone,
  stack_count integer,
  skill_name text
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT 
    sst.effect_applied->>'effect_type' as effect_type,
    sst.effect_duration,
    sst.effect_end_time,
    sst.stack_count,
    su.skill_name
  FROM public.standardized_skill_targets sst
  JOIN public.skill_uses su ON su.id = sst.skill_use_id
  WHERE sst.target_user_id = p_user_id
    AND su.game_state_id = p_game_state_id
    AND sst.is_active = true
    AND (sst.effect_end_time IS NULL OR sst.effect_end_time > now())
  ORDER BY sst.created_at ASC;
$function$;

-- Step 2: Create function to check if user has specific effect type
CREATE OR REPLACE FUNCTION public.user_has_effect_type(p_user_id uuid, p_game_state_id uuid, p_effect_type text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.standardized_skill_targets sst
    JOIN public.skill_uses su ON su.id = sst.skill_use_id
    WHERE sst.target_user_id = p_user_id
      AND su.game_state_id = p_game_state_id
      AND sst.effect_applied->>'effect_type' = p_effect_type
      AND sst.is_active = true
      AND (sst.effect_end_time IS NULL OR sst.effect_end_time > now())
  );
$function$;

-- Step 3: Create comprehensive skill system status function
CREATE OR REPLACE FUNCTION public.get_skill_system_status(p_game_state_id uuid)
RETURNS TABLE(
  total_skill_uses bigint,
  pending_effects bigint,
  active_effects bigint,
  expired_effects bigint,
  total_conflicts bigint
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT 
    (SELECT COUNT(*) FROM public.skill_uses WHERE game_state_id = p_game_state_id) as total_skill_uses,
    (SELECT COUNT(*) FROM public.skill_effects_queue WHERE game_state_id = p_game_state_id AND status = 'queued') as pending_effects,
    (SELECT COUNT(*) FROM public.standardized_skill_targets sst 
     JOIN public.skill_uses su ON su.id = sst.skill_use_id 
     WHERE su.game_state_id = p_game_state_id AND sst.is_active = true) as active_effects,
    (SELECT COUNT(*) FROM public.standardized_skill_targets sst 
     JOIN public.skill_uses su ON su.id = sst.skill_use_id 
     WHERE su.game_state_id = p_game_state_id AND sst.is_active = false) as expired_effects,
    (SELECT COUNT(*) FROM public.skill_conflicts WHERE game_state_id = p_game_state_id) as total_conflicts;
$function$;

-- Step 4: Optimize existing apply_* functions to work with standardized table
CREATE OR REPLACE FUNCTION public.apply_generic_effect(p_effect_queue_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
DECLARE
  effect_record RECORD;
  target_user_id UUID;
BEGIN
  -- Get effect information
  SELECT seq.*
  INTO effect_record
  FROM public.skill_effects_queue seq
  WHERE seq.id = p_effect_queue_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- Get target user ID
  SELECT su.target_user_id 
  INTO target_user_id
  FROM public.skill_uses su
  WHERE su.id = effect_record.skill_use_id;

  -- Create skill target record in standardized table
  INSERT INTO public.standardized_skill_targets (
    skill_use_id,
    skill_effects_queue_id,
    target_user_id,
    target_type,
    effect_applied
  ) VALUES (
    effect_record.skill_use_id,
    p_effect_queue_id,
    target_user_id,
    COALESCE(effect_record.effect_data->>'target_type', 'player'),
    effect_record.effect_data
  );

  RETURN true;
END;
$function$;

-- Step 5: Create automated cleanup job for old data
CREATE OR REPLACE FUNCTION public.cleanup_old_skill_data()
RETURNS void
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
BEGIN
  -- Clean up old completed skill effects queue entries (older than 7 days)
  DELETE FROM public.skill_effects_queue
  WHERE status IN ('completed', 'cancelled', 'failed')
    AND updated_at < (now() - interval '7 days');

  -- Clean up old inactive skill targets (older than 30 days)
  UPDATE public.standardized_skill_targets
  SET is_active = false, updated_at = now()
  WHERE is_active = true
    AND effect_end_time IS NOT NULL
    AND effect_end_time < (now() - interval '30 days');

  -- Clean up old skill conflicts (older than 30 days)
  DELETE FROM public.skill_conflicts
  WHERE created_at < (now() - interval '30 days');

  RAISE NOTICE 'Cleaned up old skill system data at %', now();
END;
$function$;

-- Step 6: Add performance monitoring views
CREATE OR REPLACE VIEW public.skill_system_performance AS
SELECT 
  'skill_uses' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE created_at > now() - interval '24 hours') as recent_rows,
  pg_size_pretty(pg_total_relation_size('public.skill_uses'::regclass)) as table_size
FROM public.skill_uses
UNION ALL
SELECT 
  'skill_effects_queue' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE created_at > now() - interval '24 hours') as recent_rows,
  pg_size_pretty(pg_total_relation_size('public.skill_effects_queue'::regclass)) as table_size
FROM public.skill_effects_queue
UNION ALL
SELECT 
  'standardized_skill_targets' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE created_at > now() - interval '24 hours') as recent_rows,
  pg_size_pretty(pg_total_relation_size('public.standardized_skill_targets'::regclass)) as table_size
FROM public.standardized_skill_targets;

-- Step 7: Create index usage statistics function (Fixed column names)
CREATE OR REPLACE FUNCTION public.get_skill_table_index_usage()
RETURNS TABLE(
  table_name text,
  index_name text,
  index_size text,
  index_scans bigint,
  tuples_read bigint,
  tuples_fetched bigint
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT 
    schemaname||'.'||relname as table_name,
    indexrelname as index_name,
    pg_size_pretty(pg_relation_size(schemaname||'.'||indexrelname)) as index_size,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
  FROM pg_stat_user_indexes 
  WHERE schemaname = 'public' 
    AND relname IN ('skill_uses', 'skill_effects_queue', 'standardized_skill_targets', 'skill_conflicts')
  ORDER BY relname, indexrelname;
$function$;

-- Step 8: Add constraints to ensure data consistency between old and new tables
CREATE OR REPLACE FUNCTION public.validate_skill_data_consistency()
RETURNS boolean
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
DECLARE
  inconsistent_count integer;
BEGIN
  -- Check for skill_targets records not in standardized_skill_targets
  SELECT COUNT(*) INTO inconsistent_count
  FROM public.skill_targets st
  LEFT JOIN public.standardized_skill_targets sst ON sst.id = st.id
  WHERE sst.id IS NULL;
  
  IF inconsistent_count > 0 THEN
    RAISE WARNING 'Found % skill_targets records not in standardized_skill_targets', inconsistent_count;
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;

-- Step 9: Create transition helper for code migration
CREATE OR REPLACE FUNCTION public.get_skill_effects_by_type(p_game_state_id uuid, p_effect_type text)
RETURNS TABLE(
  target_user_id uuid,
  effect_data jsonb,
  created_at timestamp with time zone,
  is_active boolean
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT 
    sst.target_user_id,
    sst.effect_applied as effect_data,
    sst.created_at,
    sst.is_active
  FROM public.standardized_skill_targets sst
  JOIN public.skill_uses su ON su.id = sst.skill_use_id
  WHERE su.game_state_id = p_game_state_id
    AND sst.effect_applied->>'effect_type' = p_effect_type
  ORDER BY sst.created_at DESC;
$function$;

-- Step 10: Final performance optimization - Update statistics
ANALYZE public.skill_uses;
ANALYZE public.skill_effects_queue;
ANALYZE public.standardized_skill_targets;
ANALYZE public.skill_conflicts;