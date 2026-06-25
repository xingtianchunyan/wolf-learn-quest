-- 当人类玩家退出导致房间从满员变为未满员时，重置所有玩家（含 AI）的准备状态
-- 这样人类玩家和 AI 玩家的状态可以保持一致，避免房间回到未满员后仍有玩家保持已准备

CREATE OR REPLACE FUNCTION public.reset_ready_on_player_leave()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  room_max_players integer;
  remaining_count integer;
BEGIN
  -- 只处理人类玩家离开；AI 玩家被删除属于房主主动管理，不触发全局重置
  IF OLD.is_ai = true THEN
    RETURN OLD;
  END IF;

  SELECT max_players
  INTO room_max_players
  FROM public.rooms
  WHERE id = OLD.room_id;

  SELECT COUNT(*)
  INTO remaining_count
  FROM public.room_players
  WHERE room_id = OLD.room_id;

  -- 如果房间从满员变为未满员，重置所有剩余玩家的准备状态
  IF remaining_count < room_max_players THEN
    UPDATE public.room_players
    SET is_ready = false
    WHERE room_id = OLD.room_id;
  END IF;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS trigger_reset_ready_on_player_leave ON public.room_players;
CREATE TRIGGER trigger_reset_ready_on_player_leave
AFTER DELETE ON public.room_players
FOR EACH ROW
EXECUTE FUNCTION public.reset_ready_on_player_leave();
