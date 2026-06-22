-- 修复技能效果处理函数
CREATE OR REPLACE FUNCTION public.process_skill_effects(p_game_state_id uuid)
RETURNS integer
LANGUAGE plpgsql
AS $function$
DECLARE
  effect_record RECORD;
  processed_count INTEGER := 0;
BEGIN
  -- 处理所有准备执行的技能效果
  FOR effect_record IN
    SELECT *
    FROM public.skill_effects_queue
    WHERE game_state_id = p_game_state_id
      AND status = 'queued'
      AND (trigger_time IS NULL OR trigger_time <= now())
    ORDER BY priority ASC, execution_order ASC, created_at ASC
  LOOP
    -- 标记为处理中
    UPDATE public.skill_effects_queue
    SET status = 'processing', updated_at = now()
    WHERE id = effect_record.id;

    -- 根据效果类型执行不同逻辑
    CASE effect_record.effect_type
      WHEN 'status_change' THEN
        PERFORM public.apply_generic_effect(effect_record.id);
      WHEN 'elimination' THEN
        PERFORM public.apply_generic_effect(effect_record.id);
      WHEN 'protection' THEN
        PERFORM public.apply_generic_effect(effect_record.id);
      WHEN 'investigation' THEN
        PERFORM public.apply_generic_effect(effect_record.id);
      ELSE
        -- 通用效果处理
        PERFORM public.apply_generic_effect(effect_record.id);
    END CASE;

    -- 标记为完成
    UPDATE public.skill_effects_queue
    SET status = 'completed', processed_at = now(), updated_at = now()
    WHERE id = effect_record.id;

    processed_count := processed_count + 1;
  END LOOP;

  RETURN processed_count;
END;
$function$;