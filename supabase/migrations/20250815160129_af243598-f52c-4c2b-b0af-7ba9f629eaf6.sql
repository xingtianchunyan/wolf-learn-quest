-- Update specific rooms that have ended games but still show as waiting
UPDATE rooms 
SET status = 'finished' 
WHERE room_id IN ('2025/06/23-53', '2025/08/02-11', '2025/08/13-28') 
  AND status = 'waiting';