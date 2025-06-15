
-- 首先删除依赖于role_selections.role_id的策略
DROP POLICY IF EXISTS "Users can view chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can send chat messages" ON public.chat_messages;

-- 删除现有的role_selections表数据（因为结构要改变）
DELETE FROM public.role_selections;

-- 修改role_selections表的role_id字段类型为UUID，并添加外键约束
ALTER TABLE public.role_selections 
DROP COLUMN role_id CASCADE;

ALTER TABLE public.role_selections 
ADD COLUMN role_character_id UUID NOT NULL 
REFERENCES public.game_characters("Role ID") ON DELETE CASCADE;

-- 删除character_name的唯一约束（如果存在）
ALTER TABLE public.game_characters 
DROP CONSTRAINT IF EXISTS game_characters_character_name_key;

-- 清理现有数据并重新插入
DELETE FROM public.game_characters;

-- 重新插入角色数据，为每个可能的角色实例创建唯一记录
-- 8人局配置示例
INSERT INTO public.game_characters ("Role ID", character_name, faction, skill_name, skill_description, description, skill_usage) VALUES
-- 村民 (4个实例)
(gen_random_uuid(), '村民', 'Village', '睡觉', '夜晚安然入睡', 'skill_sleep', 0),
(gen_random_uuid(), '村民', 'Village', '睡觉', '夜晚安然入睡', 'skill_sleep', 0),
(gen_random_uuid(), '村民', 'Village', '睡觉', '夜晚安然入睡', 'skill_sleep', 0),
(gen_random_uuid(), '村民', 'Village', '睡觉', '夜晚安然入睡', 'skill_sleep', 0),
-- 狼人 (2个实例)
(gen_random_uuid(), '狼人', 'Werewolves', '夜袭', '夜晚可以杀死一名玩家', 'skill_night_attack', -1),
(gen_random_uuid(), '狼人', 'Werewolves', '夜袭', '夜晚可以杀死一名玩家', 'skill_night_attack', -1),
-- 预言家 (1个实例)
(gen_random_uuid(), '预言家', 'Village', '预言', '夜晚可以查验一名玩家的身份', 'skill_prophecy', -1),
-- 女巫 (1个实例)
(gen_random_uuid(), '女巫', 'Village', '魔法药剂', '拥有一瓶解药和一瓶毒药', 'skill_magic_potion', 2);

-- 创建一个视图来显示可用的角色配置
CREATE OR REPLACE VIEW available_roles_for_room AS
SELECT 
  gc."Role ID" as role_id,
  gc.character_name,
  gc.faction,
  gc.skill_name,
  gc.description as skill_key,
  CASE 
    WHEN rs.role_character_id IS NOT NULL THEN true 
    ELSE false 
  END as is_selected,
  rs.user_id as selected_by_user,
  rs.room_id
FROM public.game_characters gc
LEFT JOIN public.role_selections rs ON gc."Role ID" = rs.role_character_id;

-- 重新创建chat_messages表的RLS策略（如果需要的话）
CREATE POLICY "Users can view chat messages" ON public.chat_messages
FOR SELECT USING (true);

CREATE POLICY "Users can send chat messages" ON public.chat_messages
FOR INSERT WITH CHECK (true);
