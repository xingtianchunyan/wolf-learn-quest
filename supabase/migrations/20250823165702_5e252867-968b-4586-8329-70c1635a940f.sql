-- 技能效果数据结构标准化脚本
-- 修复历史数据中 effect_applied 字段的键名不一致问题

-- 创建一个函数来标准化 effect_applied 数据
CREATE OR REPLACE FUNCTION public.standardize_effect_applied_data()
RETURNS void
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
BEGIN
  -- 更新 skill_targets 表中的 effect_applied 数据
  -- 将所有只有 'type' 字段的记录更新为 'effect_type'
  UPDATE public.skill_targets
  SET effect_applied = jsonb_set(
    effect_applied,
    '{effect_type}',
    effect_applied->'type'
  )
  WHERE effect_applied ? 'type' 
    AND NOT effect_applied ? 'effect_type';

  -- 可选：移除旧的 'type' 字段（如果需要的话）
  -- UPDATE public.skill_targets
  -- SET effect_applied = effect_applied - 'type'
  -- WHERE effect_applied ? 'type' AND effect_applied ? 'effect_type';

  -- 记录处理的行数
  RAISE NOTICE 'Standardized effect_applied data for skill_targets table';
END;
$function$;

-- 执行数据标准化
SELECT public.standardize_effect_applied_data();

-- 创建一个视图来安全地访问标准化后的技能目标数据
CREATE OR REPLACE VIEW public.standardized_skill_targets AS
SELECT 
  id,
  skill_use_id,
  skill_effects_queue_id,
  target_user_id,
  target_type,
  CASE 
    WHEN effect_applied ? 'effect_type' THEN effect_applied
    WHEN effect_applied ? 'type' THEN jsonb_set(effect_applied, '{effect_type}', effect_applied->'type')
    ELSE effect_applied
  END AS effect_applied,
  effect_duration,
  effect_end_time,
  is_active,
  stack_count,
  effect_start_time,
  created_at,
  updated_at
FROM public.skill_targets;

-- 创建用于检查数据质量的函数
CREATE OR REPLACE FUNCTION public.check_skill_data_quality()
RETURNS TABLE(
  issue_type text,
  issue_count bigint,
  description text
)
LANGUAGE sql
STABLE
SET search_path TO ''
AS $function$
  -- 检查缺少 effect_type 的记录
  SELECT 
    'missing_effect_type' as issue_type,
    COUNT(*) as issue_count,
    'skill_targets records without effect_type in effect_applied' as description
  FROM public.skill_targets 
  WHERE effect_applied IS NOT NULL 
    AND NOT (effect_applied ? 'effect_type' OR effect_applied ? 'type')
  
  UNION ALL
  
  -- 检查同时有 type 和 effect_type 的记录
  SELECT 
    'duplicate_effect_fields' as issue_type,
    COUNT(*) as issue_count,
    'skill_targets records with both type and effect_type fields' as description
  FROM public.skill_targets 
  WHERE effect_applied ? 'type' AND effect_applied ? 'effect_type'
  
  UNION ALL
  
  -- 检查空的 effect_applied 记录
  SELECT 
    'empty_effect_applied' as issue_type,
    COUNT(*) as issue_count,
    'skill_targets records with null or empty effect_applied' as description
  FROM public.skill_targets 
  WHERE effect_applied IS NULL OR effect_applied = '{}'::jsonb;
$function$;