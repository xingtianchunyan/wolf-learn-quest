
-- 为 role_design 表添加 role_image 字段
ALTER TABLE public.role_design 
ADD COLUMN role_image TEXT;

-- 更新角色图片路径，根据角色名称对应图片文件
UPDATE public.role_design 
SET role_image = CASE 
  WHEN role_name LIKE 'villager%' THEN 'role-design/role-image/villager.png'
  WHEN role_name LIKE 'werewolf%' THEN 'role-design/role-image/werewolf.png'
  WHEN role_name = 'witch' THEN 'role-design/role-image/witch.png'
  WHEN role_name = 'seer' THEN 'role-design/role-image/seer.png'
  WHEN role_name = 'hunter' THEN 'role-design/role-image/hunter.png'
  WHEN role_name = 'guard' THEN 'role-design/role-image/guard.png'
  WHEN role_name = 'whitewolf' THEN 'role-design/role-image/whitewolf.png'
  WHEN role_name = 'warlock' THEN 'role-design/role-image/warlock.png'
  WHEN role_name = 'demon' THEN 'role-design/role-image/demon.png'
  ELSE NULL
END;

-- 创建 Storage bucket (如果还没有创建的话)
INSERT INTO storage.buckets (id, name, public)
VALUES ('role-design', 'role-design', true)
ON CONFLICT (id) DO NOTHING;

-- 为 role-design bucket 创建存储策略，允许所有人查看图片
CREATE POLICY "Allow public read access for role images" ON storage.objects
FOR SELECT USING (bucket_id = 'role-design');
