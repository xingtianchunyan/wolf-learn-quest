-- 修复说明：
-- `close_inactive_rooms()` 旧版本会把房间状态更新为 `closed`，
-- 但 `rooms_status_check` 仅允许 `waiting` / `playing` / `finished`，
-- 导致前端进入房间页时触发 RPC 直接报约束错误。
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
    AND NOT EXISTS (
      SELECT 1
      FROM public.room_players
      WHERE room_players.room_id = rooms.id
        AND (room_players.is_ai = false OR room_players.is_ai IS NULL)
    );
END;
$$;
