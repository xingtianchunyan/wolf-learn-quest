-- 为 AI 玩家自动随机分配剩余角色
-- 当房间满员且所有人类玩家已完成选角后，将未被选择的角色随机分配给 AI 玩家

-- 内部实现（无权限检查，供触发器和 RPC 复用）
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
      AND is_ai = true
      AND (role IS NULL OR role = '');
  human_count integer;
  selected_human_count integer;
  ai_player_count integer;
  max_players integer;
  role_configs jsonb;
  selected_role_ids uuid[];
  available_role_ids uuid[];
  random_role_id uuid;
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

  -- 所有人类玩家是否都已选角
  SELECT COUNT(*)
  INTO human_count
  FROM public.room_players
  WHERE room_id = p_room_id
    AND is_ai = false;

  SELECT COUNT(*)
  INTO selected_human_count
  FROM public.role_selections rs
  JOIN public.room_players rp
    ON rp.room_id = rs.room_id
   AND rp.user_id = rs.user_id
  WHERE rs.room_id = p_room_id
    AND rp.is_ai = false;

  IF selected_human_count < human_count THEN
    RETURN false;
  END IF;

  -- 根据最大人数确定角色配置（与前端 getRoleConfiguration 保持一致）
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

  -- 获取所有已被人类玩家选中的角色设计 ID
  SELECT ARRAY_AGG(role_id)
  INTO selected_role_ids
  FROM public.role_selections
  WHERE room_id = p_room_id;

  selected_role_ids := COALESCE(selected_role_ids, ARRAY[]::uuid[]);

  -- 构建可用角色设计 ID 列表（按配置展开，减去已被选中的）
  SELECT ARRAY_AGG(design_id)
  INTO available_role_ids
  FROM (
    SELECT
      (
        SELECT rd.id
        FROM public.role_design rd
        WHERE rd.role_name = cfg.role
        LIMIT 1
      ) AS design_id
    FROM jsonb_to_recordset(role_configs) AS cfg(role text, count int)
    CROSS JOIN LATERAL generate_series(1, cfg.count) AS n
  ) sub
  WHERE design_id IS NOT NULL
    AND NOT (design_id = ANY(selected_role_ids));

  available_role_ids := COALESCE(available_role_ids, ARRAY[]::uuid[]);

  -- 如果没有可用角色或没有待分配的 AI，直接返回
  SELECT COUNT(*)
  INTO ai_player_count
  FROM public.room_players
  WHERE room_id = p_room_id
    AND is_ai = true
    AND (role IS NULL OR role = '');

  IF ai_player_count = 0 OR array_length(available_role_ids, 1) IS NULL THEN
    RETURN false;
  END IF;

  -- 为每个未分配角色的 AI 玩家随机分配一个剩余角色
  OPEN ai_players_cursor;
  LOOP
    FETCH ai_players_cursor INTO ai_player_record;
    EXIT WHEN NOT FOUND;
    EXIT WHEN array_length(available_role_ids, 1) IS NULL;

    SELECT id INTO random_role_id
    FROM unnest(available_role_ids) AS id
    ORDER BY random()
    LIMIT 1;

    UPDATE public.room_players
    SET role = random_role_id::text
    WHERE id = ai_player_record.id;

    available_role_ids := array_remove(available_role_ids, random_role_id);
  END LOOP;
  CLOSE ai_players_cursor;

  RETURN true;
END;
$$;

-- 对外 RPC：房主/法官可手动触发 AI 角色分配
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

REVOKE ALL ON FUNCTION public.assign_ai_roles(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.assign_ai_roles(uuid) TO authenticated;

-- 触发器函数：在角色选择变化或 AI 玩家加入时自动尝试分配 AI 角色
CREATE OR REPLACE FUNCTION public.trigger_auto_assign_ai_roles()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_room_id uuid;
BEGIN
  IF TG_TABLE_NAME = 'role_selections' THEN
    v_room_id := NEW.room_id;
  ELSIF TG_TABLE_NAME = 'room_players' THEN
    v_room_id := NEW.room_id;
  ELSE
    RETURN NULL;
  END IF;

  PERFORM public.assign_ai_roles_internal(v_room_id);
  RETURN NULL;
END;
$$;

-- 角色选择变化时尝试自动分配
DROP TRIGGER IF EXISTS trigger_auto_assign_ai_roles_on_selection ON public.role_selections;
CREATE TRIGGER trigger_auto_assign_ai_roles_on_selection
AFTER INSERT OR UPDATE ON public.role_selections
FOR EACH ROW
EXECUTE FUNCTION public.trigger_auto_assign_ai_roles();

-- AI 玩家加入导致房间满员时也尝试自动分配
DROP TRIGGER IF EXISTS trigger_auto_assign_ai_roles_on_join ON public.room_players;
CREATE TRIGGER trigger_auto_assign_ai_roles_on_join
AFTER INSERT ON public.room_players
FOR EACH ROW
WHEN (NEW.is_ai = true)
EXECUTE FUNCTION public.trigger_auto_assign_ai_roles();
