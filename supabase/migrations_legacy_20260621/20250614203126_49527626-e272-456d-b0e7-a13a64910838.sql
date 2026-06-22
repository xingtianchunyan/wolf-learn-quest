
-- 为 rooms 表启用行级安全（RLS）
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- 创建SELECT策略：允许用户查看他们所属的房间信息
-- （作为房主、法官或玩家）
CREATE POLICY "Users can view rooms they are part of" ON public.rooms
FOR SELECT
USING (
  auth.uid() = host_id
  OR auth.uid() = judge_user_id
  OR EXISTS (
    SELECT 1
    FROM public.room_players
    WHERE room_players.room_id = rooms.id AND room_players.user_id = auth.uid()
  )
);

-- 创建UPDATE策略：允许房主更新房间设置
CREATE POLICY "Host can update room settings" ON public.rooms
FOR UPDATE
USING (auth.uid() = host_id)
WITH CHECK (auth.uid() = host_id);

-- 创建UPDATE策略：允许用户成为法官或辞去法官职务
-- 只有在法官席位为空或用户本人就是当前法官时，才允许操作
CREATE POLICY "Users can manage judgeship" ON public.rooms
FOR UPDATE
USING (judge_user_id IS NULL OR auth.uid() = judge_user_id)
WITH CHECK (judge_user_id IS NULL OR auth.uid() = judge_user_id);
