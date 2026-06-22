
-- 首先清空 role_selections 表的数据，因为现有的 text 类型数据无法直接转换为 uuid
DELETE FROM public.role_selections;

-- 修改 role_id 字段类型从 text 改为 uuid
ALTER TABLE public.role_selections 
ALTER COLUMN role_id TYPE uuid USING role_id::uuid;

-- 添加外键约束，将 role_id 关联到 role_design 表的 id 字段
ALTER TABLE public.role_selections 
ADD CONSTRAINT fk_role_selections_role_design 
FOREIGN KEY (role_id) REFERENCES public.role_design(id);

-- 为了性能优化，在 role_id 字段上创建索引
CREATE INDEX IF NOT EXISTS idx_role_selections_role_id ON public.role_selections(role_id);
