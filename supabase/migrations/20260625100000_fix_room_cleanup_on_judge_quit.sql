-- 修复说明：
-- 当法官正常退出等待中的房间时，房间可能因没有人类玩家而被 close_inactive_rooms() 立即标记为 finished。
-- 修复策略：
-- 1. close_inactive_rooms() 不再清理仍有在线人类法官（judge_user_id IS NOT NULL）的房间。
-- 2. 前端退出法官时会更新 rooms.last_human_activity，为无人类玩家的房间保留 3 分钟缓冲期。
CREATE OR REPLACE FUNCTION public.close_inactive_rooms()
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.rooms
  SET status = 'finished'
  WHERE status = 'waiting'
    AND last_human_activity < (now() - interval '3 minutes')
    AND judge_user_id IS NULL
    AND NOT EXISTS (
      SELECT 1
      FROM public.room_players
      WHERE room_players.room_id = rooms.id
        AND (room_players.is_ai = false OR room_players.is_ai IS NULL)
    );
END;
$$;
