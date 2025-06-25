
-- 修改 skill_type 字段类型从 json 改为 jsonb
ALTER TABLE public.role_design 
ALTER COLUMN skill_type TYPE jsonb USING skill_type::jsonb;

-- 添加 skill_effects 字段
ALTER TABLE public.role_design 
ADD COLUMN skill_effects jsonb DEFAULT '{}'::jsonb;

-- 添加 role_attributes 字段
ALTER TABLE public.role_design 
ADD COLUMN role_attributes jsonb DEFAULT '{}'::jsonb;

-- 更新村民的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["none"]'::jsonb,
  skill_effects = '{
    "target_type": ["self"],
    "effect_type": "none",
    "active_phases": ["night"],
    "required_status": ["normal", "dying"],
    "cooldown": 0,
    "priority": 1
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "好人阵营获得胜利",
    "special_abilities": []
  }'::jsonb
WHERE role_name = '村民';

-- 更新守卫的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["protect"]'::jsonb,
  skill_effects = '{
    "target_type": ["single", "self"],
    "effect_type": "protect",
    "active_phases": ["night"],
    "required_status": ["normal", "dying"],
    "cooldown": 0,
    "priority": 2
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "好人阵营获得胜利",
    "special_abilities": []
  }'::jsonb
WHERE role_name = '守卫';

-- 更新狼人的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["attack"]'::jsonb,
  skill_effects = '{
    "target_type": ["single"],
    "effect_type": "attack",
    "active_phases": ["night"],
    "required_status": ["normal", "dying"],
    "cooldown": 0,
    "priority": 3
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "狼人阵营获得胜利",
    "special_abilities": []
  }'::jsonb
WHERE role_name = '狼人';

-- 更新预言家的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["check"]'::jsonb,
  skill_effects = '{
    "target_type": ["single"],
    "effect_type": "check",
    "active_phases": ["night"],
    "required_status": ["normal", "dying"],
    "cooldown": 0,
    "priority": 4
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "好人阵营获得胜利",
    "special_abilities": []
  }'::jsonb
WHERE role_name = '预言家';

-- 更新恶魔的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["check"]'::jsonb,
  skill_effects = '{
    "target_type": ["single"],
    "effect_type": "check",
    "active_phases": ["night"],
    "required_status": ["normal", "dying"],
    "cooldown": 0,
    "priority": 5
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "狼人阵营获得胜利",
    "special_abilities": ["无法在夜晚被杀死"]
  }'::jsonb
WHERE role_name = '恶魔';

-- 更新女巫的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["protect", "attack"]'::jsonb,
  skill_effects = '{
    "target_type": ["single", "self"],
    "effect_type": ["protect", "attack"],
    "active_phases": ["night"],
    "required_status": ["normal", "dying"],
    "cooldown": 0,
    "priority": 6
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "好人阵营获得胜利",
    "special_abilities": []
  }'::jsonb
WHERE role_name = '女巫';

-- 更新狼巫（术士）的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["protect"]'::jsonb,
  skill_effects = '{
    "target_type": ["single", "self"],
    "effect_type": "protect",
    "active_phases": ["night"],
    "required_status": ["normal", "dying"],
    "cooldown": 0,
    "priority": 7
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "狼人阵营获得胜利",
    "special_abilities": []
  }'::jsonb
WHERE role_name = '狼巫';

-- 更新白狼王的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["attack"]'::jsonb,
  skill_effects = '{
    "target_type": ["single"],
    "effect_type": "attack",
    "active_phases": ["day", "evening", "night", "dawn"],
    "required_status": ["normal", "dying"],
    "cooldown": 0,
    "priority": 8
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "狼人阵营获得胜利",
    "special_abilities": []
  }'::jsonb
WHERE role_name = '白狼王';

-- 更新猎人的技能配置
UPDATE public.role_design 
SET 
  skill_type = '["attack"]'::jsonb,
  skill_effects = '{
    "target_type": ["single"],
    "effect_type": "attack",
    "active_phases": ["day", "evening", "night", "dawn"],
    "required_status": ["dying"],
    "cooldown": 0,
    "priority": 9
  }'::jsonb,
  role_attributes = '{
    "victory_condition": "好人阵营获得胜利",
    "special_abilities": []
  }'::jsonb
WHERE role_name = '猎人';

-- 添加注释说明各字段的含义
COMMENT ON COLUMN public.role_design.skill_type IS 'JSONB字段，包含技能类型数组：attack(攻击)、protect(保护)、check(查看)、none(无)';
COMMENT ON COLUMN public.role_design.skill_effects IS 'JSONB字段，包含技能效果配置：target_type(目标类型)、effect_type(影响类型)、active_phases(发动阶段)、required_status(状态要求)、cooldown(冷却时间)、priority(优先级)';
COMMENT ON COLUMN public.role_design.role_attributes IS 'JSONB字段，包含角色属性：victory_condition(胜利条件)、special_abilities(特殊能力)';
