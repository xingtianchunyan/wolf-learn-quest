-- Restore required storage buckets and baseline role design seed data.

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('question-files', 'question-files', false),
  ('avatars', 'avatars', true),
  ('role-design', 'role-design', true)
ON CONFLICT (id) DO UPDATE
SET
  name = EXCLUDED.name,
  public = EXCLUDED.public,
  updated_at = now();

DROP POLICY IF EXISTS "Users can upload question files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view question files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update question files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete question files" ON storage.objects;
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for role images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to role-design" ON storage.objects;

CREATE POLICY "Users can upload question files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'question-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can view question files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'question-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update question files"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'question-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete question files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'question-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Public read access for role images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'role-design');

CREATE POLICY "Allow authenticated uploads to role-design"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'role-design' AND auth.role() = 'authenticated');

INSERT INTO public.role_design (
  id,
  role_name,
  faction,
  role_description,
  skill_name,
  skill_type,
  skill_usage,
  skill_description,
  role_image,
  skill_effects,
  role_attributes,
  priority,
  usage_frequency
)
VALUES
  ('c95cb184-650e-4cec-a824-9a085c1f9432', 'demon', true, 'The devil disguised as a human seer', 'demon_eye', '["check"]'::jsonb, -1, 'Specify to view one player''s character information', 'role-design/role-image/demon.png', '{}'::jsonb, '{}'::jsonb, 5, false),
  ('b43a40fb-6042-49d6-81fa-ea67e6bdb99c', 'witch', false, 'A mysterious witch.', 'magic_potion', '["protect", "attack"]'::jsonb, 2, 'Designate a player to protect or attack', 'role-design/role-image/witch.png', '{}'::jsonb, '{}'::jsonb, 6, true),
  ('e31c21f7-fad6-4fb1-8f32-a5a30d9eb0f9', 'guard', false, 'A diligent and responsible guardian', 'vigil', '["protect"]'::jsonb, -1, 'Designate a player (including yourself) to be protected from attacks', 'role-design/role-image/guard.png', '{}'::jsonb, '{}'::jsonb, 2, false),
  ('e7929331-0b22-48b6-8cc4-0b2383dbb67d', 'hunter', false, 'A hunter who is not that experienced.', 'dying_shot', '["attack"]'::jsonb, 1, 'Designate a player to attack before being eliminated', 'role-design/role-image/hunter.png', '{}'::jsonb, '{}'::jsonb, 9, false),
  ('c0d5fa41-3cdb-4155-8da8-79555017d2f3', 'seer', false, 'A kind prophet who makes a living by collecting rent from farmers.', 'prophecy', '["check"]'::jsonb, -1, 'Specify to view one player''s camp information', 'role-design/role-image/seer.png', '{}'::jsonb, '{}'::jsonb, 4, false),
  ('013ebb20-ceea-4500-95a0-8caa1ccb4bc3', 'villager_3', false, 'An honest and simple villager', 'Sleep', '[]'::jsonb, -1, 'Have a good dream', 'role-design/role-image/villager.png', '{}'::jsonb, '{}'::jsonb, 1, false),
  ('6662ee7c-3201-4b17-a094-acfa5077133a', 'warlock', true, 'A mysterious warlock.', 'voodoo', '["protect"]'::jsonb, 1, 'Designate a player for protection', 'role-design/role-image/warlock.png', '{}'::jsonb, '{}'::jsonb, 7, false),
  ('36e9026f-960c-4dfa-96fb-abc4a5b60a7c', 'werewolf', true, 'A werewolf who loses control after mutation', 'night_attack', '["attack"]'::jsonb, -1, 'Designated attack on one player', 'role-design/role-image/werewolf.png', '{}'::jsonb, '{}'::jsonb, 2, false),
  ('1574c80e-89ec-4dce-8ed3-6323dbbb6981', 'werewolf_1', true, 'A werewolf who loses control after mutation', 'night_attack', '["attack"]'::jsonb, -1, 'Designated attack on one player', 'role-design/role-image/werewolf.png', '{}'::jsonb, '{}'::jsonb, 2, false),
  ('38423d1f-e74b-4752-bea0-609cc8e6c1a2', 'werewolf_2', true, 'A werewolf who loses control after mutation', 'night_attack', '["attack"]'::jsonb, -1, 'Designated attack on one player', 'role-design/role-image/werewolf.png', '{}'::jsonb, '{}'::jsonb, 2, false),
  ('8fa09b46-9735-41d7-9be2-cd54b3885f6e', 'whitewolf', true, 'A mutated werewolf driven solely by revenge', 'self_destruct', '["attack"]'::jsonb, 1, 'Designate an attack on a player, eliminating himself and target simultaneously', 'role-design/role-image/whitewolf.png', '{}'::jsonb, '{}'::jsonb, 8, false),
  ('b1d54d14-82f2-49ea-9b75-d6b49f7ef4ba', 'villager_2', false, 'An honest and simple villager', 'Sleep', '[]'::jsonb, -1, 'Have a good dream', 'role-design/role-image/villager.png', '{}'::jsonb, '{}'::jsonb, 1, false),
  ('dd9630fd-21b9-47e6-b63d-7fe623232669', 'villager_1', false, 'An honest and simple villager', 'Sleep', '[]'::jsonb, -1, 'Have a good dream', 'role-design/role-image/villager.png', '{}'::jsonb, '{}'::jsonb, 1, false),
  ('d01e1897-13ab-49e3-bc23-3e3b7aeeea2d', 'villager', false, 'An honest and simple villager', 'Sleep', '[]'::jsonb, -1, 'Have a good dream', 'role-design/role-image/villager.png', '{}'::jsonb, '{}'::jsonb, 1, false)
ON CONFLICT (id) DO UPDATE
SET
  role_name = EXCLUDED.role_name,
  faction = EXCLUDED.faction,
  role_description = EXCLUDED.role_description,
  skill_name = EXCLUDED.skill_name,
  skill_type = EXCLUDED.skill_type,
  skill_usage = EXCLUDED.skill_usage,
  skill_description = EXCLUDED.skill_description,
  role_image = EXCLUDED.role_image,
  skill_effects = EXCLUDED.skill_effects,
  role_attributes = EXCLUDED.role_attributes,
  priority = EXCLUDED.priority,
  usage_frequency = EXCLUDED.usage_frequency;
