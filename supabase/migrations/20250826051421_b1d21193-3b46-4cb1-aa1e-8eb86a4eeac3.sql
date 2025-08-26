-- 修复所有数据库函数中对skill_targets表的引用，完全迁移到standardized_skill_targets

-- 1. 更新 validate_skill_data_consistency 函数，移除对已删除表的引用
CREATE OR REPLACE FUNCTION public.validate_skill_data_consistency()
RETURNS boolean
LANGUAGE plpgsql
SET search_path TO ''
AS $$
DECLARE
  inconsistent_count integer;
BEGIN
  -- 检查standardized_skill_targets表的数据完整性
  SELECT COUNT(*) INTO inconsistent_count
  FROM public.standardized_skill_targets sst
  LEFT JOIN public.skill_uses su ON su.id = sst.skill_use_id
  WHERE su.id IS NULL;
  
  IF inconsistent_count > 0 THEN
    RAISE WARNING 'Found % orphaned standardized_skill_targets records without valid skill_uses', inconsistent_count;
    RETURN false;
  END IF;
  
  -- 检查effect_applied字段的数据质量
  SELECT COUNT(*) INTO inconsistent_count
  FROM public.standardized_skill_targets
  WHERE effect_applied IS NULL 
    OR (NOT (effect_applied ? 'effect_type') AND NOT (effect_applied ? 'type'));
  
  IF inconsistent_count > 0 THEN
    RAISE WARNING 'Found % standardized_skill_targets records with invalid effect_applied data', inconsistent_count;
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- 2. 更新 check_skill_data_quality 函数，适配standardized_skill_targets
CREATE OR REPLACE FUNCTION public.check_skill_data_quality()
RETURNS TABLE(issue_type text, issue_count bigint, description text)
LANGUAGE sql
STABLE
SET search_path TO ''
AS $$
  -- 检查缺少 effect_type 的记录
  SELECT 
    'missing_effect_type' as issue_type,
    COUNT(*) as issue_count,
    'standardized_skill_targets records without effect_type in effect_applied' as description
  FROM public.standardized_skill_targets 
  WHERE effect_applied IS NOT NULL 
    AND NOT (effect_applied ? 'effect_type' OR effect_applied ? 'type')
  
  UNION ALL
  
  -- 检查同时有 type 和 effect_type 的记录
  SELECT 
    'duplicate_effect_fields' as issue_type,
    COUNT(*) as issue_count,
    'standardized_skill_targets records with both type and effect_type fields' as description
  FROM public.standardized_skill_targets 
  WHERE effect_applied ? 'type' AND effect_applied ? 'effect_type'
  
  UNION ALL
  
  -- 检查空的 effect_applied 记录
  SELECT 
    'empty_effect_applied' as issue_type,
    COUNT(*) as issue_count,
    'standardized_skill_targets records with null or empty effect_applied' as description
  FROM public.standardized_skill_targets 
  WHERE effect_applied IS NULL OR effect_applied = '{}'::jsonb
  
  UNION ALL
  
  -- 检查孤立的skill_effects_queue记录
  SELECT 
    'orphaned_queue_records' as issue_type,
    COUNT(*) as issue_count,
    'skill_effects_queue records without corresponding skill_uses' as description
  FROM public.skill_effects_queue seq
  LEFT JOIN public.skill_uses su ON su.id = seq.skill_use_id
  WHERE su.id IS NULL;
$$;

-- 3. 更新 standardize_effect_applied_data 函数，仅处理standardized_skill_targets表
CREATE OR REPLACE FUNCTION public.standardize_effect_applied_data()
RETURNS void
LANGUAGE plpgsql
SET search_path TO ''
AS $$
BEGIN
  -- 更新 standardized_skill_targets 表中的 effect_applied 数据
  -- 将所有只有 'type' 字段的记录更新为 'effect_type'
  UPDATE public.standardized_skill_targets
  SET effect_applied = jsonb_set(
    effect_applied,
    '{effect_type}',
    effect_applied->'type'
  )
  WHERE effect_applied ? 'type' 
    AND NOT effect_applied ? 'effect_type';

  -- 可选：移除旧的 'type' 字段（如果需要的话）
  -- UPDATE public.standardized_skill_targets
  -- SET effect_applied = effect_applied - 'type'
  -- WHERE effect_applied ? 'type' AND effect_applied ? 'effect_type';

  -- 记录处理的行数
  RAISE NOTICE 'Standardized effect_applied data for standardized_skill_targets table';
END;
$$;

-- 4. 更新 cleanup_old_skill_data 函数，移除对已删除表的操作
CREATE OR REPLACE FUNCTION public.cleanup_old_skill_data()
RETURNS void
LANGUAGE plpgsql
SET search_path TO ''
AS $$
BEGIN
  -- Clean up old completed skill effects queue entries (older than 7 days)
  DELETE FROM public.skill_effects_queue
  WHERE status IN ('completed', 'cancelled', 'failed')
    AND updated_at < (now() - interval '7 days');

  -- Clean up old inactive standardized skill targets (older than 30 days)
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
$$;

-- 5. 更新 cleanup_expired_skill_effects 函数，只处理standardized_skill_targets
CREATE OR REPLACE FUNCTION public.cleanup_expired_skill_effects()
RETURNS void
LANGUAGE plpgsql
SET search_path TO ''
AS $$
BEGIN
  -- 清理过期的标准化技能目标效果
  UPDATE public.standardized_skill_targets
  SET is_active = false, updated_at = now()
  WHERE is_active = true
    AND effect_end_time IS NOT NULL
    AND effect_end_time < now();

  -- 取消过期的排队效果
  UPDATE public.skill_effects_queue
  SET status = 'cancelled', updated_at = now()
  WHERE status = 'queued'
    AND expires_at IS NOT NULL
    AND expires_at < now();
    
  RAISE NOTICE 'Cleaned up expired skill effects at %', now();
END;
$$;

-- 6. 更新skill_system_performance视图，移除已删除表的引用
DROP VIEW IF EXISTS public.skill_system_performance;
CREATE VIEW public.skill_system_performance AS
SELECT 
  'standardized_skill_targets' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE created_at >= now() - interval '24 hours') as recent_rows,
  pg_size_pretty(pg_total_relation_size('public.standardized_skill_targets'::regclass)) as table_size
FROM public.standardized_skill_targets

UNION ALL

SELECT 
  'skill_uses' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE created_at >= now() - interval '24 hours') as recent_rows,
  pg_size_pretty(pg_total_relation_size('public.skill_uses'::regclass)) as table_size
FROM public.skill_uses

UNION ALL

SELECT 
  'skill_effects_queue' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE created_at >= now() - interval '24 hours') as recent_rows,
  pg_size_pretty(pg_total_relation_size('public.skill_effects_queue'::regclass)) as table_size
FROM public.skill_effects_queue

UNION ALL

SELECT 
  'skill_conflicts' as table_name,
  COUNT(*) as total_rows,
  COUNT(*) FILTER (WHERE created_at >= now() - interval '24 hours') as recent_rows,
  pg_size_pretty(pg_total_relation_size('public.skill_conflicts'::regclass)) as table_size
FROM public.skill_conflicts;

-- 7. 更新 get_skill_table_index_usage 函数，移除对已删除表的引用
CREATE OR REPLACE FUNCTION public.get_skill_table_index_usage()
RETURNS TABLE(table_name text, index_name text, index_size text, index_scans bigint, tuples_read bigint, tuples_fetched bigint)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
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
$$;

-- 添加验证记录
INSERT INTO public.system_logs (log_type, message, created_at) 
VALUES ('migration', 'Fixed all skill_targets table references to use standardized_skill_targets', now())
ON CONFLICT DO NOTHING;