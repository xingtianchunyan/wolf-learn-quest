-- 创建安全定义器函数获取等待中房间的玩家数量
CREATE OR REPLACE FUNCTION public.get_waiting_room_player_counts()
 RETURNS TABLE(room_id uuid, player_count bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT 
    r.id as room_id,
    COALESCE(COUNT(rp.id), 0) as player_count
  FROM public.rooms r
  LEFT JOIN public.room_players rp ON rp.room_id = r.id
  WHERE r.status = 'waiting'
  GROUP BY r.id;
$function$;