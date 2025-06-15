
-- 步骤 1: 创建新的 role_design 表
CREATE TABLE public.role_design (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name TEXT NOT NULL UNIQUE,
    faction BOOLEAN NOT NULL, -- true 代表狼人阵营, false 代表村民阵营
    role_description TEXT,
    skill_name TEXT,
    skill_type JSON,
    skill_usage INT4,
    skill_description TEXT
);

-- 步骤 2: 从 game_characters 表迁移数据到 role_design 表
INSERT INTO public.role_design (role_name, faction, role_description, skill_name, skill_type, skill_usage, skill_description)
SELECT
    character_name,
    (CASE WHEN faction = 'Werewolves' THEN true ELSE false END),
    description,
    skill_name,
    (CASE
        WHEN character_name = '村民' THEN '[]'::json
        WHEN character_name = '猎人' THEN '["attack"]'::json
        WHEN character_name = '女巫' THEN '["protect", "attack"]'::json
        WHEN character_name = '预言家' THEN '["view"]'::json
        WHEN character_name = '守卫' THEN '["protect"]'::json
        WHEN character_name = '狼人' THEN '["attack"]'::json
        WHEN character_name = '白狼王' THEN '["attack"]'::json
        WHEN character_name = '狼巫' THEN '["protect"]'::json
        WHEN character_name = '恶魔' THEN '["view"]'::json
        ELSE '[]'::json
    END),
    skill_usage,
    skill_description
FROM public.game_characters;

-- 步骤 3: 删除旧的 game_characters 表
DROP TABLE public.game_characters;
