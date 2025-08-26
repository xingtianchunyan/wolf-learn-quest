-- 清理废弃的数据库函数和相关对象（修正版）

-- 1. 移除废弃的函数（忽略不存在的对象）
DROP FUNCTION IF EXISTS sync_skill_targets_to_standardized();
DROP FUNCTION IF EXISTS standardize_effect_applied_data();

-- 2. 优化skill_system_performance视图，移除对skill_targets的引用
DROP VIEW IF EXISTS skill_system_performance;

-- 重新创建性能监控视图，只包含现有表
CREATE VIEW skill_system_performance AS
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

-- 3. 更新清理函数，移除对skill_targets的引用
CREATE OR REPLACE FUNCTION cleanup_old_skill_data()
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

-- 4. 更新索引使用情况监控函数
CREATE OR REPLACE FUNCTION get_skill_table_index_usage()
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

-- 5. 添加注释说明清理完成
COMMENT ON VIEW skill_system_performance IS 'Performance monitoring view for skill system tables (cleaned up version without skill_targets references)';