
-- 创建安全定义器函数来检查用户是否为房间法官
CREATE OR REPLACE FUNCTION public.is_room_judge(p_room_id uuid, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.rooms 
    WHERE id = p_room_id AND judge_user_id = p_user_id
  );
END;
$$;

-- 删除可能已存在的策略
DROP POLICY IF EXISTS "Allow room participants to view game states" ON public.game_states;
DROP POLICY IF EXISTS "Allow judges to manage game states" ON public.game_states;
DROP POLICY IF EXISTS "Allow room participants to view game settings" ON public.game_settings;
DROP POLICY IF EXISTS "Allow judges to manage game settings" ON public.game_settings;
DROP POLICY IF EXISTS "Allow room participants to view game phase history" ON public.game_phase_history;
DROP POLICY IF EXISTS "Allow judges to manage game phase history" ON public.game_phase_history;
DROP POLICY IF EXISTS "Allow room participants to view role selections" ON public.role_selections;
DROP POLICY IF EXISTS "Allow players to manage their own role selections" ON public.role_selections;
DROP POLICY IF EXISTS "Allow judges to view all role selections" ON public.role_selections;

-- 为 game_states 表添加 RLS 策略
ALTER TABLE public.game_states ENABLE ROW LEVEL SECURITY;

-- 允许房间参与者查看游戏状态
CREATE POLICY "Allow room participants to view game states"
  ON public.game_states FOR SELECT
  USING (public.is_room_participant(room_id, auth.uid()));

-- 允许法官管理游戏状态
CREATE POLICY "Allow judges to manage game states"
  ON public.game_states FOR ALL
  USING (public.is_room_judge(room_id, auth.uid()))
  WITH CHECK (public.is_room_judge(room_id, auth.uid()));

-- 为 game_settings 表添加 RLS 策略  
ALTER TABLE public.game_settings ENABLE ROW LEVEL SECURITY;

-- 允许房间参与者查看游戏设置
CREATE POLICY "Allow room participants to view game settings"
  ON public.game_settings FOR SELECT
  USING (public.is_room_participant(room_id, auth.uid()));

-- 允许法官管理游戏设置
CREATE POLICY "Allow judges to manage game settings"
  ON public.game_settings FOR ALL
  USING (public.is_room_judge(room_id, auth.uid()))
  WITH CHECK (public.is_room_judge(room_id, auth.uid()));

-- 为 game_phase_history 表添加 RLS 策略
ALTER TABLE public.game_phase_history ENABLE ROW LEVEL SECURITY;

-- 允许房间参与者查看游戏阶段历史
CREATE POLICY "Allow room participants to view game phase history"
  ON public.game_phase_history FOR SELECT
  USING (public.is_room_participant((SELECT room_id FROM public.game_states WHERE id = game_state_id), auth.uid()));

-- 允许法官管理游戏阶段历史  
CREATE POLICY "Allow judges to manage game phase history"
  ON public.game_phase_history FOR ALL
  USING (public.is_room_judge((SELECT room_id FROM public.game_states WHERE id = game_state_id), auth.uid()))
  WITH CHECK (public.is_room_judge((SELECT room_id FROM public.game_states WHERE id = game_state_id), auth.uid()));

-- 为 role_selections 表添加 RLS 策略
ALTER TABLE public.role_selections ENABLE ROW LEVEL SECURITY;

-- 允许房间参与者查看角色选择
CREATE POLICY "Allow room participants to view role selections"
  ON public.role_selections FOR SELECT
  USING (public.is_room_participant(room_id, auth.uid()));

-- 允许玩家管理自己的角色选择
CREATE POLICY "Allow players to manage their own role selections"
  ON public.role_selections FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 允许法官查看所有角色选择
CREATE POLICY "Allow judges to view all role selections"  
  ON public.role_selections FOR SELECT
  USING (public.is_room_judge(room_id, auth.uid()));
