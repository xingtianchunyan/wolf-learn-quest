
-- 为每场游戏记录使用的题目列表和顺序
CREATE TABLE public.game_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES public.game_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  question_order INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(game_id, question_id),
  UNIQUE(game_id, question_order)
);

COMMENT ON TABLE public.game_questions IS 'Stores the ordered list of questions for each game session.';
COMMENT ON COLUMN public.game_questions.question_order IS 'The order in which the question appears in the game.';

-- 为 game_questions 表开启行级安全
ALTER TABLE public.game_questions ENABLE ROW LEVEL SECURITY;

-- 创建策略，允许参与者查看游戏题目
CREATE POLICY "Allow participants to view game questions"
  ON public.game_questions
  FOR SELECT
  USING (
    public.is_room_participant(
      (SELECT room_id FROM public.game_sessions WHERE id = game_id),
      auth.uid()
    )
  );

-- 创建策略，只允许法官为游戏添加或修改题目
CREATE POLICY "Allow judge to manage game questions"
  ON public.game_questions
  FOR ALL
  USING (
    (SELECT judge_user_id FROM public.rooms WHERE id = (
      SELECT room_id FROM public.game_sessions WHERE id = game_id
    )) = auth.uid()
  )
  WITH CHECK (
    (SELECT judge_user_id FROM public.rooms WHERE id = (
      SELECT room_id FROM public.game_sessions WHERE id = game_id
    )) = auth.uid()
  );

-- 为提高查询效率，在 (game_id, question_order) 上创建索引
CREATE INDEX idx_game_questions_game_id_order ON public.game_questions(game_id, question_order);

-- 为 player_answers 表开启行级安全
ALTER TABLE public.player_answers ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许房间参与者查看所有答案
CREATE POLICY "Allow room participants to view answers"
  ON public.player_answers
  FOR SELECT
  USING (
    public.is_room_participant(
      (SELECT room_id FROM public.game_sessions WHERE id = game_id),
      auth.uid()
    )
  );

-- 创建策略：允许玩家插入或更新自己的答案
CREATE POLICY "Allow players to manage their own answers"
  ON public.player_answers
  FOR ALL
  USING (
    player_id = auth.uid()
  )
  WITH CHECK (
    player_id = auth.uid()
  );
