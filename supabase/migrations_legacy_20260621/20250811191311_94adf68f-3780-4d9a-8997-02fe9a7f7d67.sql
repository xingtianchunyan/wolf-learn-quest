-- Add next_room_id to rooms and RPC to create the next room for a finished game
-- 1) Schema change: add next_room_id column
ALTER TABLE public.rooms
ADD COLUMN IF NOT EXISTS next_room_id uuid;

-- 2) Function: create_next_room
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
  -- Fetch source room details
  SELECT judge_user_id, host_id, max_players, human_judge, status, next_room_id
  INTO v_judge, v_host, v_max_players, v_human_judge, v_status, v_existing_next
  FROM public.rooms
  WHERE id = p_room_id;

  IF v_judge IS NULL THEN
    RAISE EXCEPTION 'Room % has no judge assigned', p_room_id;
  END IF;

  -- Only judge can create next room
  IF auth.uid() IS NULL OR auth.uid() <> v_judge THEN
    RAISE EXCEPTION 'Not authorized to create next room';
  END IF;

  -- If already created, return existing
  IF v_existing_next IS NOT NULL THEN
    RETURN v_existing_next;
  END IF;

  -- Generate a simple room code like YYYY/MM/DD-XX
  v_new_room_code := to_char(now(), 'YYYY/MM/DD') || '-' || lpad(((floor(random()*99)+1))::text, 2, '0');

  -- Create new room carrying over key settings
  INSERT INTO public.rooms (room_id, host_id, max_players, status, human_judge, judge_user_id, last_human_activity)
  VALUES (v_new_room_code, v_host, COALESCE(v_max_players, 12), 'waiting', COALESCE(v_human_judge, true), v_judge, now())
  RETURNING id INTO v_new_room_id;

  -- Link from old room to new room and mark old room as closed
  UPDATE public.rooms
  SET next_room_id = v_new_room_id,
      status = CASE WHEN v_status = 'ended' THEN 'closed' ELSE v_status END,
      updated_at = now()
  WHERE id = p_room_id;

  RETURN v_new_room_id;
END;
$$;