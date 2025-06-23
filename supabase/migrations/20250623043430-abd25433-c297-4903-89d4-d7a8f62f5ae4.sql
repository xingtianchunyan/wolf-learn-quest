
-- 首先检查现有数据中 current_round 的值分布
-- 然后修复超出范围的数据，最后添加约束

-- 1. 将 current_phase 字段从文本改为整数类型
-- 首先添加新的整数字段
ALTER TABLE public.game_states 
ADD COLUMN current_phase_new INTEGER DEFAULT 1;

-- 转换现有数据：白天=1，傍晚=2，夜晚=3，黎明=4
UPDATE public.game_states 
SET current_phase_new = CASE 
  WHEN current_phase = 'day' THEN 1
  WHEN current_phase = 'evening' THEN 2
  WHEN current_phase = 'night' THEN 3
  WHEN current_phase = 'dawn' THEN 4
  ELSE 1
END;

-- 删除旧字段并重命名新字段
ALTER TABLE public.game_states DROP COLUMN current_phase;
ALTER TABLE public.game_states RENAME COLUMN current_phase_new TO current_phase;

-- 添加约束确保 current_phase 值在有效范围内（1-4）
ALTER TABLE public.game_states 
ADD CONSTRAINT check_current_phase 
CHECK (current_phase IN (1, 2, 3, 4));

-- 2. 修复 current_round 字段的数据，将超出范围的值调整到有效范围
UPDATE public.game_states 
SET current_round = CASE 
  WHEN current_round < 1 THEN 1
  WHEN current_round > 9 THEN 9
  ELSE current_round
END;

-- 现在添加 current_round 字段的约束
ALTER TABLE public.game_states 
ADD CONSTRAINT check_current_round 
CHECK (current_round >= 1 AND current_round <= 9);

-- 添加总阶段数验证约束
ALTER TABLE public.game_states 
ADD CONSTRAINT check_max_phases 
CHECK (((current_round - 1) * 4 + current_phase) <= 36);
