
-- 清空现有的 role_design 表数据
TRUNCATE TABLE public.role_design;

-- 插入新的角色数据
INSERT INTO public.role_design (role_name, faction, role_description, skill_name, skill_type, skill_usage, skill_description) VALUES
-- 村民阵营 (faction = FALSE)
('villager', FALSE, 'An honest and simple villager', 'Sleep', '[]'::json, -1, 'Have a good dream'),
('villager_1', FALSE, 'An honest and simple villager', 'Sleep', '[]'::json, -1, 'Have a good dream'),
('villager_2', FALSE, 'An honest and simple villager', 'Sleep', '[]'::json, -1, 'Have a good dream'),
('villager_3', FALSE, 'An honest and simple villager', 'Sleep', '[]'::json, -1, 'Have a good dream'),
('witch', FALSE, 'A mysterious witch.', 'magic_potion', '["protect", "attack"]'::json, 2, 'Designate a player to protect or attack'),
('seer', FALSE, 'A kind prophet who makes a living by collecting rent from farmers.', 'prophecy', '["check"]'::json, -1, 'Specify to view one player''s camp information'),
('hunter', FALSE, 'A hunter who is not that experienced.', 'dying_shot', '["attack"]'::json, 1, 'Designate a player to attack before being eliminated'),
('guard', FALSE, 'A diligent and responsible guardian', 'vigil', '["protect"]'::json, -1, 'Designate a player (including yourself) to be protected from attacks'),

-- 狼人阵营 (faction = TRUE)
('werewolf', TRUE, 'A werewolf who loses control after mutation', 'night_attack', '["attack"]'::json, -1, 'Designated attack on one player'),
('werewolf_1', TRUE, 'A werewolf who loses control after mutation', 'night_attack', '["attack"]'::json, -1, 'Designated attack on one player'),
('werewolf_2', TRUE, 'A werewolf who loses control after mutation', 'night_attack', '["attack"]'::json, -1, 'Designated attack on one player'),
('whitewolf', TRUE, 'A mutated werewolf driven solely by revenge', 'self_destruct', '["attack"]'::json, 1, 'Designate an attack on a player, eliminating himself and target simultaneously'),
('warlock', TRUE, 'A mysterious warlock.', 'voodoo', '["protect"]'::json, 1, 'Designate a player for protection'),
('demon', TRUE, 'The devil disguised as a human seer', 'demon_eye', '["check"]'::json, -1, 'Specify to view one player''s character information');
