
-- 删除依赖的视图
DROP VIEW IF EXISTS available_roles_for_room;

-- 删除当前的role_selections数据（因为结构要改变）
DELETE FROM public.role_selections;

-- 删除新添加的role_character_id列
ALTER TABLE public.role_selections 
DROP COLUMN IF EXISTS role_character_id;

-- 恢复原来的role_id列（文本类型）
ALTER TABLE public.role_selections 
ADD COLUMN role_id TEXT NOT NULL;

-- 先彻底清理game_characters表的所有数据
TRUNCATE TABLE public.game_characters CASCADE;

-- 重新插入原始的角色数据（每个角色类型只有一条记录）
INSERT INTO public.game_characters ("Role ID", character_name, faction, skill_name, skill_description, description, skill_usage) VALUES
(gen_random_uuid(), '村民', 'Village', '睡觉', '夜晚安然入睡', 'skill_sleep', 0),
(gen_random_uuid(), '狼人', 'Werewolves', '夜袭', '夜晚可以杀死一名玩家', 'skill_night_attack', -1),
(gen_random_uuid(), '预言家', 'Village', '预言', '夜晚可以查验一名玩家的身份', 'skill_prophecy', -1),
(gen_random_uuid(), '女巫', 'Village', '魔法药剂', '拥有一瓶解药和一瓶毒药', 'skill_magic_potion', 2);

-- 添加唯一约束
ALTER TABLE public.game_characters 
ADD CONSTRAINT game_characters_character_name_key UNIQUE (character_name);
