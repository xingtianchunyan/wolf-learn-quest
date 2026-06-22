
-- 清空现有测试数据，避免迁移时因数据不一致而出错
TRUNCATE TABLE public.game_questions, public.player_answers RESTART IDENTITY;

-- 修正 game_questions 表，使其关联到 game_states
ALTER TABLE public.game_questions DROP CONSTRAINT IF EXISTS game_questions_game_id_fkey;
ALTER TABLE public.game_questions
  ADD CONSTRAINT game_questions_game_id_fkey
  FOREIGN KEY (game_id) REFERENCES public.game_states(id) ON DELETE CASCADE;
COMMENT ON COLUMN public.game_questions.game_id IS '关联到 game_states 表，代表唯一的游戏状态';

-- 修正 player_answers 表，使其关联到 game_states
ALTER TABLE public.player_answers DROP CONSTRAINT IF EXISTS player_answers_game_id_fkey;
ALTER TABLE public.player_answers
  ADD CONSTRAINT player_answers_game_id_fkey
  FOREIGN KEY (game_id) REFERENCES public.game_states(id) ON DELETE CASCADE;
COMMENT ON COLUMN public.player_answers.game_id IS '关联到 game_states 表，代表唯一的游戏状态';

-- 为 game_questions 启用并配置行级安全 (RLS)
ALTER TABLE public.game_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "允许参与者查看游戏题目" ON public.game_questions;
CREATE POLICY "允许参与者查看游戏题目"
  ON public.game_questions FOR SELECT
  USING (public.is_room_participant((SELECT room_id FROM public.game_states WHERE id = game_id), auth.uid()));

DROP POLICY IF EXISTS "只允许法官管理游戏题目" ON public.game_questions;
CREATE POLICY "只允许法官管理游戏题目"
  ON public.game_questions FOR ALL
  USING ((SELECT judge_user_id FROM public.rooms WHERE id = (SELECT room_id FROM public.game_states WHERE id = game_id)) = auth.uid())
  WITH CHECK ((SELECT judge_user_id FROM public.rooms WHERE id = (SELECT room_id FROM public.game_states WHERE id = game_id)) = auth.uid());

-- 为 player_answers 启用并配置行级安全 (RLS)
ALTER TABLE public.player_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "允许参与者查看答题记录" ON public.player_answers;
CREATE POLICY "允许参与者查看答题记录"
  ON public.player_answers FOR SELECT
  USING (public.is_room_participant((SELECT room_id FROM public.game_states WHERE id = game_id), auth.uid()));

DROP POLICY IF EXISTS "玩家只能管理自己的答题记录" ON public.player_answers;
CREATE POLICY "玩家只能管理自己的答题记录"
  ON public.player_answers FOR ALL
  USING (player_id = auth.uid())
  WITH CHECK (player_id = auth.uid());
