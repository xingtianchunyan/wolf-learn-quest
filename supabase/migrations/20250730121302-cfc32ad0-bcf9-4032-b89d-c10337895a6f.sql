-- 修复 skill_targets 的 RLS 策略以避免循环引用
DROP POLICY IF EXISTS "允许房间参与者查看技能目标" ON public.skill_targets;

-- 创建安全定义函数来获取房间ID
CREATE OR REPLACE FUNCTION public.get_skill_target_room_id(p_skill_effects_queue_id UUID)
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT room_id FROM public.skill_effects_queue WHERE id = p_skill_effects_queue_id;
$$;

-- 重新创建策略使用安全函数
CREATE POLICY "允许房间参与者查看技能目标" 
ON public.skill_targets 
FOR SELECT 
USING (
  CASE 
    WHEN skill_effects_queue_id IS NOT NULL THEN 
      is_room_participant(public.get_skill_target_room_id(skill_effects_queue_id), auth.uid())
    ELSE 
      EXISTS (
        SELECT 1 FROM public.skill_uses su 
        JOIN public.game_states gs ON gs.id = su.game_state_id
        WHERE su.id = skill_targets.skill_use_id 
        AND is_room_participant(gs.room_id, auth.uid())
      )
  END
);