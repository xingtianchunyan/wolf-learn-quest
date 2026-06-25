-- 支持 AI 玩家通过 role_selections 记录角色选择，使房间页和法官页都能统一读取

-- 1. 调整 role_selections 表结构
ALTER TABLE public.role_selections
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.role_selections
  ADD COLUMN IF NOT EXISTS ai_player_id uuid REFERENCES public.room_players(id) ON DELETE CASCADE;

-- 2. 移除与 user_id 相关的旧唯一约束（允许同一房间内多个 NULL user_id）
ALTER TABLE public.role_selections
  DROP CONSTRAINT IF EXISTS role_selections_unique_room_user;

ALTER TABLE public.role_selections
  DROP CONSTRAINT IF EXISTS role_selections_user_room_unique;

ALTER TABLE public.role_selections
  DROP CONSTRAINT IF EXISTS unique_role_selection_per_room;

-- 3. 确保 AI 玩家在同一房间内只能有一条选角记录
ALTER TABLE public.role_selections
  DROP CONSTRAINT IF EXISTS role_selections_unique_room_ai_player;

ALTER TABLE public.role_selections
  ADD CONSTRAINT role_selections_unique_room_ai_player UNIQUE (room_id, ai_player_id);

-- 4. 确保每条记录至少属于人类或 AI 中的一方
ALTER TABLE public.role_selections
  DROP CONSTRAINT IF EXISTS role_selections_human_or_ai_check;

ALTER TABLE public.role_selections
  ADD CONSTRAINT role_selections_human_or_ai_check
  CHECK ((user_id IS NOT NULL) OR (ai_player_id IS NOT NULL));

-- 5. 为 AI 选角添加 RLS 策略：房主或法官可以管理 AI 选角
DROP POLICY IF EXISTS "Host or judge can manage AI role selections" ON public.role_selections;

CREATE POLICY "Host or judge can manage AI role selections" ON public.role_selections
  FOR ALL TO authenticated
  USING (
    ai_player_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.rooms
      WHERE rooms.id = role_selections.room_id
        AND (
          rooms.host_id = auth.uid()
          OR rooms.judge_user_id = auth.uid()
        )
    )
  )
  WITH CHECK (
    ai_player_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.rooms
      WHERE rooms.id = role_selections.room_id
        AND (
          rooms.host_id = auth.uid()
          OR rooms.judge_user_id = auth.uid()
        )
    )
  );

-- 6. 允许房间参与者查看 AI 选角（用于前端统一渲染）
DROP POLICY IF EXISTS "Participants can view AI role selections" ON public.role_selections;

CREATE POLICY "Participants can view AI role selections" ON public.role_selections
  FOR SELECT TO authenticated
  USING (
    ai_player_id IS NOT NULL
    AND public.is_room_participant(room_id, auth.uid())
  );

-- 7. 更新 initialize_room_role_states，跳过 AI 选角记录（AI 暂不进入 role_states）
CREATE OR REPLACE FUNCTION public.initialize_room_role_states(p_room_id uuid)
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  v_game_state_id uuid;
  inserted_count integer := 0;
BEGIN
  SELECT gs.id INTO v_game_state_id
  FROM public.game_states gs
  WHERE gs.room_id = p_room_id
  ORDER BY (gs.status = 'active') DESC, gs.created_at DESC
  LIMIT 1;

  IF v_game_state_id IS NULL THEN
    RAISE EXCEPTION 'No game_state found for room %', p_room_id;
  END IF;

  -- 仅为人类玩家（user_id IS NOT NULL）创建 role_state
  WITH latest_selections AS (
    SELECT DISTINCT ON (rs.user_id)
      rs.room_id,
      rs.user_id,
      rs.role_id,
      rs.selected_at
    FROM public.role_selections rs
    WHERE rs.room_id = p_room_id
      AND rs.user_id IS NOT NULL
    ORDER BY rs.user_id, rs.selected_at DESC
  ), ins AS (
    INSERT INTO public.role_states (
      game_state_id,
      room_id,
      user_id,
      role_id,
      current_phase,
      role_status,
      skill_uses_remaining,
      status_effects
    )
    SELECT
      v_game_state_id,
      ls.room_id,
      ls.user_id,
      ls.role_id,
      NULL,
      1,
      public.initialize_skill_uses_remaining(ls.role_id),
      public.initialize_status_effects(1)
    FROM latest_selections ls
    LEFT JOIN public.role_states existing
      ON existing.game_state_id = v_game_state_id
     AND existing.user_id = ls.user_id
    WHERE existing.id IS NULL
    RETURNING 1
  )
  SELECT COUNT(*) INTO inserted_count FROM ins;

  RETURN inserted_count;
END;
$$;

-- 8. 重写 AI 角色分配逻辑：写入 role_selections.ai_player_id
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

  SELECT COUNT(*)
  INTO human_count
  FROM public.room_players
  WHERE room_id = p_room_id;

  IF human_count < max_players THEN
    RETURN false;
  END IF;

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

  -- 清除旧的 AI 选角记录（避免角色冲突并为重新分配做准备）
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

-- 9. 保留对外 RPC 签名不变，内部调用新的实现
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
