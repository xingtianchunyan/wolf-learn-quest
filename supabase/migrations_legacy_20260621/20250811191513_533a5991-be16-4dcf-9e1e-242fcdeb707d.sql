-- Fix create_next_room function to avoid referencing non-existent updated_at column on rooms
CREATE OR REPLACE FUNCTION public.create_next_room(p_room_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_judge uuid;
  v_host uuid;
  v_max_players integer;
  v_human_judge boolean;
  v_status text;
  v_existing_next uuid;
  v_new_room_id uuid;
  v_new_room_code text;
BEGIN
  SELECT judge_user_id, host_id, max_players, human_judge, status, next_room_id
  INTO v_judge, v_host, v_max_players, v_human_judge, v_status, v_existing_next
  FROM public.rooms
  WHERE id = p_room_id;

  IF v_judge IS NULL THEN
    RAISE EXCEPTION 'Room % has no judge assigned', p_room_id;
  END IF;

  IF auth.uid() IS NULL OR auth.uid() <> v_judge THEN
    RAISE EXCEPTION 'Not authorized to create next room';
  END IF;

  IF v_existing_next IS NOT NULL THEN
    RETURN v_existing_next;
  END IF;

  v_new_room_code := to_char(now(), 'YYYY/MM/DD') || '-' || lpad(((floor(random()*99)+1))::text, 2, '0');

  INSERT INTO public.rooms (room_id, host_id, max_players, status, human_judge, judge_user_id, last_human_activity)
  VALUES (v_new_room_code, v_host, COALESCE(v_max_players, 12), 'waiting', COALESCE(v_human_judge, true), v_judge, now())
  RETURNING id INTO v_new_room_id;

  UPDATE public.rooms
  SET next_room_id = v_new_room_id,
      status = CASE WHEN v_status = 'ended' THEN 'closed' ELSE v_status END
  WHERE id = p_room_id;

  RETURN v_new_room_id;
END;
$$;