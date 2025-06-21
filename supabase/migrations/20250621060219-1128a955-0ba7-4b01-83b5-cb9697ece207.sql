
-- 修复类型转换问题的 RLS 策略
-- 为 game_sessions 表创建 RLS 策略

-- 允许法官用户插入游戏会话记录
CREATE POLICY "Judges can create game sessions" 
  ON public.game_sessions 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE rooms.id = game_sessions.room_id 
      AND rooms.judge_user_id = auth.uid()
    )
  );

-- 允许相关用户查看游戏会话记录（房间的法官和参与者）
CREATE POLICY "Room participants can view game sessions" 
  ON public.game_sessions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE rooms.id = game_sessions.room_id 
      AND (
        rooms.judge_user_id = auth.uid() 
        OR rooms.host_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.room_players 
          WHERE room_players.room_id = rooms.id 
          AND room_players.user_id = auth.uid()
        )
      )
    )
  );

-- 允许法官更新游戏会话记录
CREATE POLICY "Judges can update game sessions" 
  ON public.game_sessions 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms 
      WHERE rooms.id = game_sessions.room_id 
      AND rooms.judge_user_id = auth.uid()
    )
  );
