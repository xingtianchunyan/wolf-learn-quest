-- 由于之前的迁移文件已被应用后又被修改，supabase db push 不会重新执行它们。
-- 此迁移以新的时间戳重新创建相关函数和触发器，确保修复真正生效。

-- 1. 重新创建玩家离开时的重置逻辑
DROP TRIGGER IF EXISTS trigger_reset_ready_on_player_leave ON public.room_players;
DROP TRIGGER IF EXISTS trigger_reset_state_on_player_leave ON public.room_players;

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

  -- 判断退出前房间是否满员：退出后人数 + 1 >= max_players
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

CREATE TRIGGER trigger_reset_state_on_player_leave
AFTER DELETE ON public.room_players
FOR EACH ROW
EXECUTE FUNCTION public.reset_state_on_player_leave();

-- 2. 重新创建 AI 角色分配逻辑（修复 NULL is_ai 和重复角色 ID 问题）
CREATE OR REPLACE FUNCTION public.assign_ai_roles_internal(p_room_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  room_record public.rooms%ROWTYPE;
  ai_player_record public.room_players%ROWTYPE;
  ai_players_cursor CURSOR FOR
    SELECT *
    FROM public.room_players
    WHERE room_id = p_room_id
      AND is_ai = true;
  human_count integer;
  selected_human_count integer;
  ai_player_count integer;
  max_players integer;
  role_configs jsonb;
  selected_role_ids uuid[];
  available_role_ids uuid[];
  random_role_id uuid;
  cfg_record RECORD;
  instance_idx integer;
  matched_role_id uuid;
  required_role_ids uuid[];
BEGIN
  SELECT *
  INTO room_record
  FROM public.rooms
  WHERE id = p_room_id
    AND status = 'waiting';

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  max_players := room_record.max_players;

  -- 房间是否满员
  SELECT COUNT(*)
  INTO human_count
  FROM public.room_players
  WHERE room_id = p_room_id;

  IF human_count < max_players THEN
    RETURN false;
  END IF;

  -- 统计人类玩家数量（NULL is_ai 也视为人类）
  SELECT COUNT(*)
  INTO human_count
  FROM public.room_players
  WHERE room_id = p_room_id
    AND (is_ai = false OR is_ai IS NULL);

  -- 统计已完成选角的人类玩家数量
  SELECT COUNT(*)
  INTO selected_human_count
  FROM public.role_selections rs
  JOIN public.room_players rp
    ON rp.room_id = rs.room_id
   AND rp.user_id = rs.user_id
  WHERE rs.room_id = p_room_id
    AND (rp.is_ai = false OR rp.is_ai IS NULL);

  IF selected_human_count < human_count THEN
    RETURN false;
  END IF;

  -- 清除旧的 AI 选角记录
  DELETE FROM public.role_selections
  WHERE room_id = p_room_id
    AND ai_player_id IS NOT NULL;

  role_configs := CASE max_players
    WHEN 6 THEN '[{"role":"werewolf","count":2},{"role":"villager","count":2},{"role":"seer","count":1},{"role":"witch","count":1}]'::jsonb
    WHEN 7 THEN '[{"role":"werewolf","count":1},{"role":"whitewolf","count":1},{"role":"villager","count":2},{"role":"hunter","count":1},{"role":"seer","count":1},{"role":"witch","count":1}]'::jsonb
    WHEN 8 THEN '[{"role":"werewolf","count":1},{"role":"whitewolf","count":1},{"role":"villager","count":2},{"role":"hunter","count":1},{"role":"seer","count":1},{"role":"witch","count":1},{"role":"warlock","count":1}]'::jsonb
    WHEN 9 THEN '[{"role":"werewolf","count":1},{"role":"whitewolf","count":1},{"role":"villager","count":3},{"role":"hunter","count":1},{"role":"seer","count":1},{"role":"witch","count":1},{"role":"warlock","count":1}]'::jsonb
    WHEN 10 THEN '[{"role":"werewolf","count":1},{"role":"whitewolf","count":1},{"role":"villager","count":2},{"role":"hunter","count":1},{"role":"seer","count":1},{"role":"witch","count":1},{"role":"warlock","count":1},{"role":"demon","count":1},{"role":"guard","count":1}]'::jsonb
    WHEN 11 THEN '[{"role":"werewolf","count":1},{"role":"whitewolf","count":1},{"role":"villager","count":3},{"role":"hunter","count":1},{"role":"seer","count":1},{"role":"witch","count":1},{"role":"warlock","count":1},{"role":"demon","count":1},{"role":"guard","count":1}]'::jsonb
    WHEN 12 THEN '[{"role":"werewolf","count":2},{"role":"whitewolf","count":1},{"role":"villager","count":3},{"role":"hunter","count":1},{"role":"seer","count":1},{"role":"witch","count":1},{"role":"warlock","count":1},{"role":"demon","count":1},{"role":"guard","count":1}]'::jsonb
    ELSE '[{"role":"werewolf","count":2},{"role":"villager","count":2},{"role":"seer","count":1},{"role":"witch","count":1}]'::jsonb
  END;

  SELECT ARRAY_AGG(role_id)
  INTO selected_role_ids
  FROM public.role_selections
  WHERE room_id = p_room_id;

  selected_role_ids := COALESCE(selected_role_ids, ARRAY[]::uuid[]);

  -- 实例化角色配置，尽量为每个槽位匹配不同的 role_design
  required_role_ids := ARRAY[]::uuid[];

  FOR cfg_record IN
    SELECT role, count
    FROM jsonb_to_recordset(role_configs) AS cfg(role text, count int)
  LOOP
    FOR instance_idx IN 1..cfg_record.count LOOP
      -- 优先匹配实例名
      SELECT id INTO matched_role_id
      FROM public.role_design
      WHERE role_name = cfg_record.role || '_' || instance_idx
      LIMIT 1;

      -- 回退到同基础名下的第 instance_idx 个设计
      IF matched_role_id IS NULL THEN
        SELECT id INTO matched_role_id
        FROM (
          SELECT rd.id,
                 COALESCE((regexp_match(rd.role_name, '_(\d+)$'))[1]::int, 0) AS instance_num
          FROM public.role_design rd
          WHERE rd.role_name = cfg_record.role
             OR rd.role_name LIKE cfg_record.role || '_%'
          ORDER BY instance_num
          LIMIT 1 OFFSET instance_idx - 1
        ) sub;
      END IF;

      -- 最终回退到基础名
      IF matched_role_id IS NULL THEN
        SELECT id INTO matched_role_id
        FROM public.role_design
        WHERE role_name = cfg_record.role
        LIMIT 1;
      END IF;

      IF matched_role_id IS NOT NULL THEN
        required_role_ids := array_append(required_role_ids, matched_role_id);
      END IF;
    END LOOP;
  END LOOP;

  SELECT ARRAY_AGG(id)
  INTO available_role_ids
  FROM (
    SELECT DISTINCT id
    FROM unnest(required_role_ids) AS id
    WHERE NOT (id = ANY(selected_role_ids))
  ) sub;

  available_role_ids := COALESCE(available_role_ids, ARRAY[]::uuid[]);

  SELECT COUNT(*)
  INTO ai_player_count
  FROM public.room_players
  WHERE room_id = p_room_id
    AND is_ai = true;

  IF ai_player_count = 0 OR array_length(available_role_ids, 1) IS NULL THEN
    RETURN false;
  END IF;

  OPEN ai_players_cursor;
  LOOP
    FETCH ai_players_cursor INTO ai_player_record;
    EXIT WHEN NOT FOUND;
    EXIT WHEN array_length(available_role_ids, 1) IS NULL;

    SELECT id INTO random_role_id
    FROM unnest(available_role_ids) AS id
    ORDER BY random()
    LIMIT 1;

    INSERT INTO public.role_selections (room_id, ai_player_id, role_id)
    VALUES (p_room_id, ai_player_record.id, random_role_id);

    available_role_ids := array_remove(available_role_ids, random_role_id);
  END LOOP;
  CLOSE ai_players_cursor;

  RETURN true;
END;
$$;

-- 确保对外 RPC 使用最新内部实现
CREATE OR REPLACE FUNCTION public.assign_ai_roles(p_room_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
  room_record public.rooms%ROWTYPE;
BEGIN
  current_user_id := auth.uid();

  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required'
      USING ERRCODE = '42501';
  END IF;

  SELECT *
  INTO room_record
  FROM public.rooms
  WHERE id = p_room_id
    AND status = 'waiting';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Room not found or not in waiting status'
      USING ERRCODE = '42704';
  END IF;

  IF room_record.host_id <> current_user_id
     AND room_record.judge_user_id IS DISTINCT FROM current_user_id THEN
    RAISE EXCEPTION 'Only the host or judge can assign AI roles'
      USING ERRCODE = '42501';
  END IF;

  RETURN public.assign_ai_roles_internal(p_room_id);
END;
$$;
