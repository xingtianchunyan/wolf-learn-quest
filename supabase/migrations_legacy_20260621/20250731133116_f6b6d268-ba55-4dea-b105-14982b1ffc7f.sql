-- 为所有数据表添加 B-tree 索引以优化查询性能

-- generated_questions 表索引
CREATE INDEX IF NOT EXISTS idx_generated_questions_room_id ON public.generated_questions(room_id);
CREATE INDEX IF NOT EXISTS idx_generated_questions_uploaded_file_id ON public.generated_questions(uploaded_file_id);
CREATE INDEX IF NOT EXISTS idx_generated_questions_created_at ON public.generated_questions(created_at DESC);

-- role_states 表索引
CREATE INDEX IF NOT EXISTS idx_role_states_room_id ON public.role_states(room_id);
CREATE INDEX IF NOT EXISTS idx_role_states_user_id ON public.role_states(user_id);
CREATE INDEX IF NOT EXISTS idx_role_states_role_id ON public.role_states(role_id);
CREATE INDEX IF NOT EXISTS idx_role_states_game_state_id ON public.role_states(game_state_id);
CREATE INDEX IF NOT EXISTS idx_role_states_role_status ON public.role_states(role_status);
CREATE INDEX IF NOT EXISTS idx_role_states_current_phase ON public.role_states(current_phase);
CREATE INDEX IF NOT EXISTS idx_role_states_room_user ON public.role_states(room_id, user_id);
CREATE INDEX IF NOT EXISTS idx_role_states_game_user ON public.role_states(game_state_id, user_id);

-- room_players 表索引
CREATE INDEX IF NOT EXISTS idx_room_players_room_id ON public.room_players(room_id);
CREATE INDEX IF NOT EXISTS idx_room_players_user_id ON public.room_players(user_id);
CREATE INDEX IF NOT EXISTS idx_room_players_is_ai ON public.room_players(is_ai);
CREATE INDEX IF NOT EXISTS idx_room_players_status ON public.room_players(status);
CREATE INDEX IF NOT EXISTS idx_room_players_room_user ON public.room_players(room_id, user_id);

-- users 表索引
CREATE INDEX IF NOT EXISTS idx_users_user_id ON public.users(user_id);
CREATE INDEX IF NOT EXISTS idx_users_player_name ON public.users(player_name);
CREATE INDEX IF NOT EXISTS idx_users_level ON public.users(level);
CREATE INDEX IF NOT EXISTS idx_users_experience ON public.users(experience);

-- voting_sessions 表索引
CREATE INDEX IF NOT EXISTS idx_voting_sessions_game_state_id ON public.voting_sessions(game_state_id);
CREATE INDEX IF NOT EXISTS idx_voting_sessions_room_id ON public.voting_sessions(room_id);
CREATE INDEX IF NOT EXISTS idx_voting_sessions_status ON public.voting_sessions(status);
CREATE INDEX IF NOT EXISTS idx_voting_sessions_round_phase ON public.voting_sessions(round_number, phase);
CREATE INDEX IF NOT EXISTS idx_voting_sessions_session_type ON public.voting_sessions(session_type);
CREATE INDEX IF NOT EXISTS idx_voting_sessions_start_time ON public.voting_sessions(start_time DESC);

-- voting_results 表索引
CREATE INDEX IF NOT EXISTS idx_voting_results_voting_session_id ON public.voting_results(voting_session_id);
CREATE INDEX IF NOT EXISTS idx_voting_results_target_id ON public.voting_results(target_id);
CREATE INDEX IF NOT EXISTS idx_voting_results_result_type ON public.voting_results(result_type);
CREATE INDEX IF NOT EXISTS idx_voting_results_processing_status ON public.voting_results(processing_status);

-- vote_processing_logs 表索引
CREATE INDEX IF NOT EXISTS idx_vote_processing_logs_voting_result_id ON public.vote_processing_logs(voting_result_id);
CREATE INDEX IF NOT EXISTS idx_vote_processing_logs_processing_step ON public.vote_processing_logs(processing_step);
CREATE INDEX IF NOT EXISTS idx_vote_processing_logs_step_status ON public.vote_processing_logs(step_status);
CREATE INDEX IF NOT EXISTS idx_vote_processing_logs_created_at ON public.vote_processing_logs(created_at DESC);

-- preprocessed_files 表索引
CREATE INDEX IF NOT EXISTS idx_preprocessed_files_uploaded_file_id ON public.preprocessed_files(uploaded_file_id);
CREATE INDEX IF NOT EXISTS idx_preprocessed_files_file_name ON public.preprocessed_files(file_name);
CREATE INDEX IF NOT EXISTS idx_preprocessed_files_created_at ON public.preprocessed_files(created_at DESC);

-- game_actions 表索引
CREATE INDEX IF NOT EXISTS idx_game_actions_game_id ON public.game_actions(game_id);
CREATE INDEX IF NOT EXISTS idx_game_actions_actor_id ON public.game_actions(actor_id);
CREATE INDEX IF NOT EXISTS idx_game_actions_target_id ON public.game_actions(target_id);
CREATE INDEX IF NOT EXISTS idx_game_actions_action_type ON public.game_actions(action_type);
CREATE INDEX IF NOT EXISTS idx_game_actions_round_phase ON public.game_actions(round, phase);
CREATE INDEX IF NOT EXISTS idx_game_actions_created_at ON public.game_actions(created_at DESC);

-- room_answers 表索引
CREATE INDEX IF NOT EXISTS idx_room_answers_room_id ON public.room_answers(room_id);
CREATE INDEX IF NOT EXISTS idx_room_answers_user_id ON public.room_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_room_answers_role_id ON public.room_answers(role_id);
CREATE INDEX IF NOT EXISTS idx_room_answers_room_question_id ON public.room_answers(room_question_id);
CREATE INDEX IF NOT EXISTS idx_room_answers_question_order ON public.room_answers(question_order);
CREATE INDEX IF NOT EXISTS idx_room_answers_is_correct ON public.room_answers(is_correct);
CREATE INDEX IF NOT EXISTS idx_room_answers_room_user ON public.room_answers(room_id, user_id);

-- skill_effects_queue 表索引
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_skill_use_id ON public.skill_effects_queue(skill_use_id);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_game_state_id ON public.skill_effects_queue(game_state_id);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_room_id ON public.skill_effects_queue(room_id);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_status ON public.skill_effects_queue(status);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_effect_type ON public.skill_effects_queue(effect_type);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_priority ON public.skill_effects_queue(priority);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_trigger_time ON public.skill_effects_queue(trigger_time);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_expires_at ON public.skill_effects_queue(expires_at);
CREATE INDEX IF NOT EXISTS idx_skill_effects_queue_processing ON public.skill_effects_queue(status, trigger_time, priority);

-- game_states 表索引
CREATE INDEX IF NOT EXISTS idx_game_states_room_id ON public.game_states(room_id);
CREATE INDEX IF NOT EXISTS idx_game_states_status ON public.game_states(status);
CREATE INDEX IF NOT EXISTS idx_game_states_current_phase ON public.game_states(current_phase);
CREATE INDEX IF NOT EXISTS idx_game_states_current_round ON public.game_states(current_round);
CREATE INDEX IF NOT EXISTS idx_game_states_phase_end_time ON public.game_states(phase_end_time);
CREATE INDEX IF NOT EXISTS idx_game_states_is_paused ON public.game_states(is_paused);

-- room_questions 表索引
CREATE INDEX IF NOT EXISTS idx_room_questions_room_id ON public.room_questions(room_id);
CREATE INDEX IF NOT EXISTS idx_room_questions_question_id ON public.room_questions(question_id);
CREATE INDEX IF NOT EXISTS idx_room_questions_question_order ON public.room_questions(question_order);
CREATE INDEX IF NOT EXISTS idx_room_questions_room_order ON public.room_questions(room_id, question_order);

-- skill_targets 表索引
CREATE INDEX IF NOT EXISTS idx_skill_targets_skill_use_id ON public.skill_targets(skill_use_id);
CREATE INDEX IF NOT EXISTS idx_skill_targets_skill_effects_queue_id ON public.skill_targets(skill_effects_queue_id);
CREATE INDEX IF NOT EXISTS idx_skill_targets_target_user_id ON public.skill_targets(target_user_id);
CREATE INDEX IF NOT EXISTS idx_skill_targets_target_type ON public.skill_targets(target_type);
CREATE INDEX IF NOT EXISTS idx_skill_targets_is_active ON public.skill_targets(is_active);
CREATE INDEX IF NOT EXISTS idx_skill_targets_effect_end_time ON public.skill_targets(effect_end_time);

-- chat_messages 表索引
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON public.chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_game_id ON public.chat_messages(game_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_id ON public.chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_recipient_id ON public.chat_messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_type ON public.chat_messages(chat_type);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_type ON public.chat_messages(room_id, chat_type, created_at DESC);

-- game_sessions 表索引
CREATE INDEX IF NOT EXISTS idx_game_sessions_room_id ON public.game_sessions(room_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_status ON public.game_sessions(status);
CREATE INDEX IF NOT EXISTS idx_game_sessions_winner_faction ON public.game_sessions(winner_faction);
CREATE INDEX IF NOT EXISTS idx_game_sessions_start_time ON public.game_sessions(start_time DESC);
CREATE INDEX IF NOT EXISTS idx_game_sessions_end_time ON public.game_sessions(end_time DESC);

-- game_settings 表索引
CREATE INDEX IF NOT EXISTS idx_game_settings_room_id ON public.game_settings(room_id);
CREATE INDEX IF NOT EXISTS idx_game_settings_is_auto_advance ON public.game_settings(is_auto_advance);

-- skill_uses 表索引
CREATE INDEX IF NOT EXISTS idx_skill_uses_game_state_id ON public.skill_uses(game_state_id);
CREATE INDEX IF NOT EXISTS idx_skill_uses_user_id ON public.skill_uses(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_uses_target_user_id ON public.skill_uses(target_user_id);
CREATE INDEX IF NOT EXISTS idx_skill_uses_skill_name ON public.skill_uses(skill_name);
CREATE INDEX IF NOT EXISTS idx_skill_uses_phase ON public.skill_uses(phase);
CREATE INDEX IF NOT EXISTS idx_skill_uses_execution_status ON public.skill_uses(execution_status);
CREATE INDEX IF NOT EXISTS idx_skill_uses_round_phase ON public.skill_uses(round_number, phase);
CREATE INDEX IF NOT EXISTS idx_skill_uses_priority ON public.skill_uses(skill_priority);

-- game_phase_history 表索引
CREATE INDEX IF NOT EXISTS idx_game_phase_history_game_state_id ON public.game_phase_history(game_state_id);
CREATE INDEX IF NOT EXISTS idx_game_phase_history_phase ON public.game_phase_history(phase);
CREATE INDEX IF NOT EXISTS idx_game_phase_history_round_number ON public.game_phase_history(round_number);
CREATE INDEX IF NOT EXISTS idx_game_phase_history_started_at ON public.game_phase_history(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_phase_history_ended_at ON public.game_phase_history(ended_at DESC);

-- uploaded_files 表索引
CREATE INDEX IF NOT EXISTS idx_uploaded_files_room_id ON public.uploaded_files(room_id);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_file_name ON public.uploaded_files(file_name);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_uploaded_at ON public.uploaded_files(uploaded_at DESC);

-- rooms 表索引
CREATE INDEX IF NOT EXISTS idx_rooms_host_id ON public.rooms(host_id);
CREATE INDEX IF NOT EXISTS idx_rooms_judge_user_id ON public.rooms(judge_user_id);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON public.rooms(status);
CREATE INDEX IF NOT EXISTS idx_rooms_room_id ON public.rooms(room_id);
CREATE INDEX IF NOT EXISTS idx_rooms_last_human_activity ON public.rooms(last_human_activity DESC);
CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON public.rooms(created_at DESC);

-- skill_conflicts 表索引
CREATE INDEX IF NOT EXISTS idx_skill_conflicts_game_state_id ON public.skill_conflicts(game_state_id);
CREATE INDEX IF NOT EXISTS idx_skill_conflicts_round_number ON public.skill_conflicts(round_number);
CREATE INDEX IF NOT EXISTS idx_skill_conflicts_phase ON public.skill_conflicts(phase);
CREATE INDEX IF NOT EXISTS idx_skill_conflicts_resolved_skill_id ON public.skill_conflicts(resolved_skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_conflicts_resolution_rule ON public.skill_conflicts(resolution_rule);

-- role_selections 表索引
CREATE INDEX IF NOT EXISTS idx_role_selections_room_id ON public.role_selections(room_id);
CREATE INDEX IF NOT EXISTS idx_role_selections_user_id ON public.role_selections(user_id);
CREATE INDEX IF NOT EXISTS idx_role_selections_role_id ON public.role_selections(role_id);
CREATE INDEX IF NOT EXISTS idx_role_selections_selected_at ON public.role_selections(selected_at DESC);
CREATE INDEX IF NOT EXISTS idx_role_selections_room_user ON public.role_selections(room_id, user_id);

-- votes 表索引
CREATE INDEX IF NOT EXISTS idx_votes_voting_session_id ON public.votes(voting_session_id);
CREATE INDEX IF NOT EXISTS idx_votes_voter_id ON public.votes(voter_id);
CREATE INDEX IF NOT EXISTS idx_votes_target_id ON public.votes(target_id);
CREATE INDEX IF NOT EXISTS idx_votes_is_valid ON public.votes(is_valid);
CREATE INDEX IF NOT EXISTS idx_votes_vote_time ON public.votes(vote_time DESC);
CREATE INDEX IF NOT EXISTS idx_votes_session_voter ON public.votes(voting_session_id, voter_id);

-- questions 表索引
CREATE INDEX IF NOT EXISTS idx_questions_generated_questions_id ON public.questions(generated_questions_id);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_correct_option ON public.questions(correct_option);

-- role_design 表索引
CREATE INDEX IF NOT EXISTS idx_role_design_role_name ON public.role_design(role_name);
CREATE INDEX IF NOT EXISTS idx_role_design_faction ON public.role_design(faction);
CREATE INDEX IF NOT EXISTS idx_role_design_priority ON public.role_design(priority);
CREATE INDEX IF NOT EXISTS idx_role_design_skill_name ON public.role_design(skill_name);
CREATE INDEX IF NOT EXISTS idx_role_design_usage_frequency ON public.role_design(usage_frequency);

-- 复合索引用于常见的查询模式
CREATE INDEX IF NOT EXISTS idx_skill_uses_game_round_phase ON public.skill_uses(game_state_id, round_number, phase);
CREATE INDEX IF NOT EXISTS idx_role_states_game_role_status ON public.role_states(game_state_id, role_status);
CREATE INDEX IF NOT EXISTS idx_votes_session_valid_time ON public.votes(voting_session_id, is_valid, vote_time DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_phase_time ON public.chat_messages(room_id, game_phase, created_at DESC);