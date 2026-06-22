-- Phase 2: Convert standardized_skill_targets to proper table and implement data migration (Fixed)

-- Step 1: Drop the existing view if it exists
DROP VIEW IF EXISTS public.standardized_skill_targets;

-- Step 2: Create standardized_skill_targets as a proper table
CREATE TABLE public.standardized_skill_targets (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_use_id uuid NOT NULL,
  skill_effects_queue_id uuid,
  target_user_id uuid,
  target_type text NOT NULL,
  effect_applied jsonb NOT NULL DEFAULT '{}',
  effect_duration integer,
  effect_start_time timestamp with time zone NOT NULL DEFAULT now(),
  effect_end_time timestamp with time zone,
  stack_count integer NOT NULL DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Step 3: Add foreign key constraints
ALTER TABLE public.standardized_skill_targets
ADD CONSTRAINT fk_standardized_skill_targets_skill_use_id
FOREIGN KEY (skill_use_id) REFERENCES public.skill_uses(id) ON DELETE CASCADE;

ALTER TABLE public.standardized_skill_targets
ADD CONSTRAINT fk_standardized_skill_targets_skill_effects_queue_id
FOREIGN KEY (skill_effects_queue_id) REFERENCES public.skill_effects_queue(id) ON DELETE CASCADE;

-- Step 4: Add check constraints for data integrity
ALTER TABLE public.standardized_skill_targets 
ADD CONSTRAINT check_stack_count_positive 
CHECK (stack_count > 0);

ALTER TABLE public.standardized_skill_targets 
ADD CONSTRAINT check_effect_duration_non_negative 
CHECK (effect_duration IS NULL OR effect_duration >= 0);

-- Add validation for effect_applied structure
ALTER TABLE public.standardized_skill_targets 
ADD CONSTRAINT check_effect_applied_has_effect_type 
CHECK (
  effect_applied IS NULL OR 
  effect_applied = '{}' OR 
  effect_applied ? 'effect_type'
);

-- Step 5: Add performance indexes (Fixed GIN index)
CREATE INDEX idx_standardized_skill_targets_skill_use_id 
ON public.standardized_skill_targets(skill_use_id);

CREATE INDEX idx_standardized_skill_targets_target_user_id 
ON public.standardized_skill_targets(target_user_id);

CREATE INDEX idx_standardized_skill_targets_active_effects 
ON public.standardized_skill_targets(is_active, effect_end_time) 
WHERE is_active = true;

-- Fixed: Use btree index for text extraction from jsonb
CREATE INDEX idx_standardized_skill_targets_effect_type 
ON public.standardized_skill_targets((effect_applied->>'effect_type'));

-- Additional JSONB index for better performance
CREATE INDEX idx_standardized_skill_targets_effect_applied 
ON public.standardized_skill_targets USING gin(effect_applied);

-- Step 6: Enable RLS
ALTER TABLE public.standardized_skill_targets ENABLE ROW LEVEL SECURITY;

-- Step 7: Add RLS policies
CREATE POLICY "Allow room participants to view standardized skill targets"
ON public.standardized_skill_targets
FOR SELECT
USING (
  CASE
    WHEN skill_effects_queue_id IS NOT NULL THEN 
      is_room_participant(get_skill_target_room_id(skill_effects_queue_id), auth.uid())
    ELSE 
      EXISTS (
        SELECT 1 FROM skill_uses su
        JOIN game_states gs ON gs.id = su.game_state_id
        WHERE su.id = standardized_skill_targets.skill_use_id 
        AND is_room_participant(gs.room_id, auth.uid())
      )
  END
);

CREATE POLICY "Allow system to insert standardized skill targets"
ON public.standardized_skill_targets
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow system to update standardized skill targets"
ON public.standardized_skill_targets
FOR UPDATE
USING (true);

-- Step 8: Migrate existing skill_targets data to standardized_skill_targets
INSERT INTO public.standardized_skill_targets (
  id,
  skill_use_id,
  skill_effects_queue_id,
  target_user_id,
  target_type,
  effect_applied,
  effect_duration,
  effect_start_time,
  effect_end_time,
  stack_count,
  is_active,
  created_at,
  updated_at
)
SELECT 
  st.id,
  st.skill_use_id,
  st.skill_effects_queue_id,
  st.target_user_id,
  st.target_type,
  -- Standardize effect_applied data structure
  CASE 
    WHEN st.effect_applied ? 'effect_type' THEN st.effect_applied
    WHEN st.effect_applied ? 'type' THEN 
      jsonb_set(st.effect_applied, '{effect_type}', st.effect_applied->'type')
    ELSE st.effect_applied
  END as effect_applied,
  st.effect_duration,
  st.effect_start_time,
  st.effect_end_time,
  st.stack_count,
  st.is_active,
  st.created_at,
  st.updated_at
FROM public.skill_targets st
ON CONFLICT (id) DO NOTHING;

-- Step 9: Create sync function and trigger
CREATE OR REPLACE FUNCTION public.sync_skill_targets_to_standardized()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update in standardized table
  INSERT INTO public.standardized_skill_targets (
    id,
    skill_use_id,
    skill_effects_queue_id,
    target_user_id,
    target_type,
    effect_applied,
    effect_duration,
    effect_start_time,
    effect_end_time,
    stack_count,
    is_active,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.skill_use_id,
    NEW.skill_effects_queue_id,
    NEW.target_user_id,
    NEW.target_type,
    CASE 
      WHEN NEW.effect_applied ? 'effect_type' THEN NEW.effect_applied
      WHEN NEW.effect_applied ? 'type' THEN 
        jsonb_set(NEW.effect_applied, '{effect_type}', NEW.effect_applied->'type')
      ELSE NEW.effect_applied
    END,
    NEW.effect_duration,
    NEW.effect_start_time,
    NEW.effect_end_time,
    NEW.stack_count,
    NEW.is_active,
    NEW.created_at,
    NEW.updated_at
  )
  ON CONFLICT (id) DO UPDATE SET
    skill_use_id = EXCLUDED.skill_use_id,
    skill_effects_queue_id = EXCLUDED.skill_effects_queue_id,
    target_user_id = EXCLUDED.target_user_id,
    target_type = EXCLUDED.target_type,
    effect_applied = EXCLUDED.effect_applied,
    effect_duration = EXCLUDED.effect_duration,
    effect_start_time = EXCLUDED.effect_start_time,
    effect_end_time = EXCLUDED.effect_end_time,
    stack_count = EXCLUDED.stack_count,
    is_active = EXCLUDED.is_active,
    updated_at = EXCLUDED.updated_at;
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to sync data
CREATE TRIGGER sync_skill_targets_trigger
  AFTER INSERT OR UPDATE ON public.skill_targets
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_skill_targets_to_standardized();

-- Step 10: Create utility functions for standardized table
CREATE OR REPLACE FUNCTION public.get_standardized_skill_targets_by_game(p_game_state_id uuid)
RETURNS TABLE(
  id uuid,
  skill_use_id uuid,
  target_user_id uuid,
  target_type text,
  effect_type text,
  effect_duration integer,
  is_active boolean,
  created_at timestamp with time zone
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT 
    sst.id,
    sst.skill_use_id,
    sst.target_user_id,
    sst.target_type,
    sst.effect_applied->>'effect_type' as effect_type,
    sst.effect_duration,
    sst.is_active,
    sst.created_at
  FROM public.standardized_skill_targets sst
  JOIN public.skill_uses su ON su.id = sst.skill_use_id
  WHERE su.game_state_id = p_game_state_id
  ORDER BY sst.created_at DESC;
$function$;

-- Step 11: Create cleanup function for expired effects
CREATE OR REPLACE FUNCTION public.cleanup_expired_standardized_skill_effects()
RETURNS void
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
BEGIN
  -- Mark expired effects as inactive
  UPDATE public.standardized_skill_targets
  SET is_active = false, updated_at = now()
  WHERE is_active = true
    AND effect_end_time IS NOT NULL
    AND effect_end_time < now();

  -- Log cleanup activity
  RAISE NOTICE 'Cleaned up expired standardized skill effects at %', now();
END;
$function$;

-- Step 12: Add trigger for automatic updated_at timestamp
CREATE TRIGGER update_standardized_skill_targets_updated_at
  BEFORE UPDATE ON public.standardized_skill_targets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();