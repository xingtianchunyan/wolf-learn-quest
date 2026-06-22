-- Add next_room_id column to rooms table for room transitions
ALTER TABLE public.rooms ADD COLUMN next_room_id UUID REFERENCES public.rooms(id);

-- Add index for better performance on next_room_id lookups
CREATE INDEX idx_rooms_next_room_id ON public.rooms(next_room_id);