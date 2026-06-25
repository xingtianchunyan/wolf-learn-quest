-- 当玩家退出导致房间从满员状态变化时，同步重置相关玩家的准备状态与角色选择：
-- 1. 人类玩家退出：所有剩余玩家（含 AI）重置准备状态并清除角色选择，
--    因为人类选角是自主行为，人类变动后需要重新选角。
-- 2. AI 玩家退出：仅重置剩余 AI 玩家的准备状态并清除其角色选择，
--    人类玩家的准备状态和角色选择保持不变。

CREATE OR REPLACE FUNCTION public.reset_state_on_player_leave()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  room_max_players integer;
  remaining_count integer;
  was_full boolean;
BEGIN
  SELECT max_players
  INTO room_max_players
  FROM public.rooms
  WHERE id = OLD.room_id;

  SELECT COUNT(*)
  INTO remaining_count
  FROM public.room_players
  WHERE room_id = OLD.room_id;

  -- 判断退出前房间是否满员：退出后人数 + 1 == max_players
  was_full := (remaining_count + 1) >= room_max_players;

  IF NOT was_full THEN
    RETURN OLD;
  END IF;

  IF OLD.is_ai = false OR OLD.is_ai IS NULL THEN
    -- 人类玩家退出：所有人重新准备、重新选角
    UPDATE public.room_players
    SET is_ready = false,
        role = NULL
    WHERE room_id = OLD.room_id;

    DELETE FROM public.role_selections
    WHERE room_id = OLD.room_id;
  ELSE
    -- AI 玩家退出：仅 AI 重新准备、重新选角，人类状态不变
    UPDATE public.room_players
    SET is_ready = false,
        role = NULL
    WHERE room_id = OLD.room_id
      AND is_ai = true;

    DELETE FROM public.role_selections
    WHERE room_id = OLD.room_id
      AND ai_player_id IS NOT NULL;
  END IF;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS trigger_reset_ready_on_player_leave ON public.room_players;
CREATE TRIGGER trigger_reset_state_on_player_leave
AFTER DELETE ON public.room_players
FOR EACH ROW
EXECUTE FUNCTION public.reset_state_on_player_leave();
