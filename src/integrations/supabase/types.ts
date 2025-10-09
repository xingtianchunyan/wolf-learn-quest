export type Json =;
| string
| number
| boolean
| null
| { [key: string]: Json | undefined  
}
| Json[]

export type Database = { // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX'  
}>(URL, KEY)
  __InternalSupabase: { PostgrestVersion: '12.2.3 (519615d)' 
}
  public: { Tables: {
      chat_messages: {
        Row: {
          chat_type: string
          created_at: string | null
          game_id: string | null
          game_phase: string | null
          game_round: number | null
          id: string
          message: string
          recipient_id: string | null
          room_id: string
          sender_id: string | null 
}
        Insert: { chat_type: string
          created_at?: string | null
          game_id?: string | null
          game_phase?: string | null
          game_round?: number | null
          id?: string
          message: string
          recipient_id?: string | null
          room_id: string
          sender_id?: string | null 
}
        Update: { chat_type?: string
          created_at?: string | null
          game_id?: string | null
          game_phase?: string | null
          game_round?: number | null
          id?: string
          message?: string
          recipient_id?: string | null
          room_id?: string
          sender_id?: string | null 
}
        Relationships: [{ foreignKeyName: 'chat_messages_game_id_fkey'
            columns: ['game_id']
            isOneToOne: false
            referencedRelation: 'game_states'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'chat_messages_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
} ] }
      game_phase_history: { Row: {
          created_at: string
          duration_seconds: number | null
          ended_at: string | null
          game_state_id: string
          id: string
          phase: string
          round_number: number
          started_at: string 
}
        Insert: { created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          game_state_id: string
          id?: string
          phase: string
          round_number: number
          started_at: string 
}
        Update: { created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          game_state_id?: string
          id?: string
          phase?: string
          round_number?: number
          started_at?: string 
}
        Relationships: [{ foreignKeyName: 'game_phase_history_game_state_id_fkey'
            columns: ['game_state_id']
            isOneToOne: false
            referencedRelation: 'game_states'
            referencedColumns: ['id'] 
} ] }
      game_sessions: { Row: {
          end_reason: string | null
          end_time: string | null
          final_round: number | null
          id: string
          room_id: string
          start_time: string
          status: string
          total_duration_seconds: number | null
          winner_faction: string | null 
}
        Insert: { end_reason?: string | null
          end_time?: string | null
          final_round?: number | null
          id?: string
          room_id: string
          start_time?: string
          status?: string
          total_duration_seconds?: number | null
          winner_faction?: string | null 
}
        Update: { end_reason?: string | null
          end_time?: string | null
          final_round?: number | null
          id?: string
          room_id?: string
          start_time?: string
          status?: string
          total_duration_seconds?: number | null
          winner_faction?: string | null 
}
        Relationships: [{ foreignKeyName: 'game_sessions_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
} ] }
      game_settings: { Row: {
          created_at: string
          dawn_duration: number
          day_duration: number
          evening_duration: number
          id: string
          is_auto_advance: boolean
          night_duration: number
          room_id: string
          updated_at: string 
}
        Insert: { created_at?: string
          dawn_duration?: number
          day_duration?: number
          evening_duration?: number
          id?: string
          is_auto_advance?: boolean
          night_duration?: number
          room_id: string
          updated_at?: string 
}
        Update: { created_at?: string
          dawn_duration?: number
          day_duration?: number
          evening_duration?: number
          id?: string
          is_auto_advance?: boolean
          night_duration?: number
          room_id?: string
          updated_at?: string 
}
        Relationships: [{ foreignKeyName: 'game_settings_room_id_fkey'
            columns: ['room_id']
            isOneToOne: true
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
} ] }
      game_states: { Row: {
          auto_advance: boolean
          created_at: string
          current_phase: number | null
          current_round: number
          id: string
          is_paused: boolean
          paused_at: string | null
          phase_duration: number
          phase_end_time: string | null
          phase_start_time: string
          room_id: string
          status: string
          total_paused_duration: number
          updated_at: string 
}
        Insert: { auto_advance?: boolean
          created_at?: string
          current_phase?: number | null
          current_round?: number
          id?: string
          is_paused?: boolean
          paused_at?: string | null
          phase_duration?: number
          phase_end_time?: string | null
          phase_start_time?: string
          room_id: string
          status?: string
          total_paused_duration?: number
          updated_at?: string 
}
        Update: { auto_advance?: boolean
          created_at?: string
          current_phase?: number | null
          current_round?: number
          id?: string
          is_paused?: boolean
          paused_at?: string | null
          phase_duration?: number
          phase_end_time?: string | null
          phase_start_time?: string
          room_id?: string
          status?: string
          total_paused_duration?: number
          updated_at?: string 
}
        Relationships: [{ foreignKeyName: 'game_states_room_id_fkey'
            columns: ['room_id']
            isOneToOne: true
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
} ] }
      generated_questions: { Row: {
          created_at: string
          file_name: string | null
          id: string
          model_used: string | null
          original_file_path: string | null
          question_count: number | null
          questions: Json | null
          room_id: string | null
          uploaded_file_id: string | null 
}
        Insert: { created_at?: string
          file_name?: string | null
          id?: string
          model_used?: string | null
          original_file_path?: string | null
          question_count?: number | null
          questions?: Json | null
          room_id?: string | null
          uploaded_file_id?: string | null 
}
        Update: { created_at?: string
          file_name?: string | null
          id?: string
          model_used?: string | null
          original_file_path?: string | null
          question_count?: number | null
          questions?: Json | null
          room_id?: string | null
          uploaded_file_id?: string | null 
}
        Relationships: [{ foreignKeyName: 'generated_questions_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'generated_questions_uploaded_file_id_fkey'
            columns: ['uploaded_file_id']
            isOneToOne: false
            referencedRelation: 'uploaded_files'
            referencedColumns: ['id'] 
} ] }
      preprocessed_files: { Row: {
          created_at: string | null
          file_name: string
          id: string
          model_used: string
          original_file_path: string
          preprocessed_content: string
          uploaded_file_id: string | null 
}
        Insert: { created_at?: string | null
          file_name: string
          id?: string
          model_used: string
          original_file_path: string
          preprocessed_content: string
          uploaded_file_id?: string | null 
}
        Update: { created_at?: string | null
          file_name?: string
          id?: string
          model_used?: string
          original_file_path?: string
          preprocessed_content?: string
          uploaded_file_id?: string | null 
}
        Relationships: [{ foreignKeyName: 'preprocessed_files_uploaded_file_id_fkey'
            columns: ['uploaded_file_id']
            isOneToOne: false
            referencedRelation: 'uploaded_files'
            referencedColumns: ['id'] 
} ] }
      questions: { Row: {
          category: string | null
          correct_option: number
          difficulty: number | null
          explanation: string | null
          generated_questions_id: string | null
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question: string 
}
        Insert: { category?: string | null
          correct_option: number
          difficulty?: number | null
          explanation?: string | null
          generated_questions_id?: string | null
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question: string 
}
        Update: { category?: string | null
          correct_option?: number
          difficulty?: number | null
          explanation?: string | null
          generated_questions_id?: string | null
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question?: string 
}
        Relationships: [{ foreignKeyName: 'questions_generated_questions_id_fkey'
            columns: ['generated_questions_id']
            isOneToOne: false
            referencedRelation: 'generated_questions'
            referencedColumns: ['id'] 
} ] }
      role_design: { Row: {
          faction: boolean
          id: string
          priority: number
          role_attributes: Json
          role_description: string | null
          role_image: string | null
          role_name: string
          skill_description: string | null
          skill_effects: Json
          skill_name: string | null
          skill_type: Json | null
          skill_usage: number | null
          usage_frequency: boolean 
}
        Insert: { faction: boolean
          id?: string
          priority: number
          role_attributes?: Json
          role_description?: string | null
          role_image?: string | null
          role_name: string
          skill_description?: string | null
          skill_effects?: Json
          skill_name?: string | null
          skill_type?: Json | null
          skill_usage?: number | null
          usage_frequency?: boolean 
}
        Update: { faction?: boolean
          id?: string
          priority?: number
          role_attributes?: Json
          role_description?: string | null
          role_image?: string | null
          role_name?: string
          skill_description?: string | null
          skill_effects?: Json
          skill_name?: string | null
          skill_type?: Json | null
          skill_usage?: number | null
          usage_frequency?: boolean 
}
        Relationships: [] 
}
      role_selections: { Row: {
          id: string
          role_id: string
          room_id: string
          selected_at: string
          user_id: string 
}
        Insert: { id?: string
          role_id: string
          room_id: string
          selected_at?: string
          user_id: string 
}
        Update: { id?: string
          role_id?: string
          room_id?: string
          selected_at?: string
          user_id?: string 
}
        Relationships: [{ foreignKeyName: 'fk_role_selections_role_design'
            columns: ['role_id']
            isOneToOne: false
            referencedRelation: 'role_design'
            referencedColumns: ['id'] 
} ] }
      role_states: { Row: {
          created_at: string
          current_phase: number | null
          game_state_id: string
          id: string
          role_id: string
          role_status: number
          room_id: string
          skill_uses_remaining: Json | null
          status_effects: Json | null
          updated_at: string
          user_id: string 
}
        Insert: { created_at?: string
          current_phase?: number | null
          game_state_id: string
          id?: string
          role_id: string
          role_status?: number
          room_id: string
          skill_uses_remaining?: Json | null
          status_effects?: Json | null
          updated_at?: string
          user_id: string 
}
        Update: { created_at?: string
          current_phase?: number | null
          game_state_id?: string
          id?: string
          role_id?: string
          role_status?: number
          room_id?: string
          skill_uses_remaining?: Json | null
          status_effects?: Json | null
          updated_at?: string
          user_id?: string 
}
        Relationships: [{ foreignKeyName: 'fk_role_states_game_state_id'
            columns: ['game_state_id']
            isOneToOne: false
            referencedRelation: 'game_states'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_role_states_role_selection'
            columns: ['room_id', 'user_id', 'role_id']
            isOneToOne: false
            referencedRelation: 'role_selections'
            referencedColumns: ['room_id', 'user_id', 'role_id'] } ] }
      room_answers: { Row: {
          created_at: string | null
          id: string
          is_correct: boolean | null
          question_order: number | null
          response_time: number | null
          role_id: string | null
          room_id: string | null
          room_question_id: string | null
          selected_option: number | null
          user_id: string | null 
}
        Insert: { created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_order?: number | null
          response_time?: number | null
          role_id?: string | null
          room_id?: string | null
          room_question_id?: string | null
          selected_option?: number | null
          user_id?: string | null 
}
        Update: { created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_order?: number | null
          response_time?: number | null
          role_id?: string | null
          room_id?: string | null
          room_question_id?: string | null
          selected_option?: number | null
          user_id?: string | null 
}
        Relationships: [{ foreignKeyName: 'fk_room_answers_role_id'
            columns: ['role_id']
            isOneToOne: false
            referencedRelation: 'role_design'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_room_answers_room_id'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_room_answers_room_question_id'
            columns: ['room_question_id']
            isOneToOne: false
            referencedRelation: 'room_questions'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_room_answers_user_id'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id'] 
} ] }
      room_players: { Row: {
          id: string
          is_ai: boolean | null
          is_ready: boolean | null
          role: string | null
          room_id: string | null
          status: string | null
          user_id: string | null 
}
        Insert: { id?: string
          is_ai?: boolean | null
          is_ready?: boolean | null
          role?: string | null
          room_id?: string | null
          status?: string | null
          user_id?: string | null 
}
        Update: { id?: string
          is_ai?: boolean | null
          is_ready?: boolean | null
          role?: string | null
          room_id?: string | null
          status?: string | null
          user_id?: string | null 
}
        Relationships: [{ foreignKeyName: 'room_players_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
} ] }
      room_questions: { Row: {
          created_at: string
          id: string
          question_id: string
          question_order: number
          room_id: string 
}
        Insert: { created_at?: string
          id?: string
          question_id: string
          question_order: number
          room_id: string 
}
        Update: { created_at?: string
          id?: string
          question_id?: string
          question_order?: number
          room_id?: string 
}
        Relationships: [{ foreignKeyName: 'game_questions_question_id_fkey'
            columns: ['question_id']
            isOneToOne: false
            referencedRelation: 'questions'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'room_questions_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
} ] }
      rooms: { Row: {
          created_at: string | null
          host_id: string | null
          human_judge: boolean | null
          id: string
          judge_user_id: string | null
          last_human_activity: string | null
          max_players: number | null
          next_room_id: string | null
          room_id: string
          status: string | null 
}
        Insert: { created_at?: string | null
          host_id?: string | null
          human_judge?: boolean | null
          id?: string
          judge_user_id?: string | null
          last_human_activity?: string | null
          max_players?: number | null
          next_room_id?: string | null
          room_id: string
          status?: string | null 
}
        Update: { created_at?: string | null
          host_id?: string | null
          human_judge?: boolean | null
          id?: string
          judge_user_id?: string | null
          last_human_activity?: string | null
          max_players?: number | null
          next_room_id?: string | null
          room_id?: string
          status?: string | null 
}
        Relationships: [{ foreignKeyName: 'rooms_host_id_fkey'
            columns: ['host_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id'] 
},
          { foreignKeyName: 'rooms_next_room_id_fkey'
            columns: ['next_room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
} ] }
      skill_conflicts: { Row: {
          conflicting_skills: Json
          created_at: string
          game_state_id: string
          id: string
          phase: string
          resolution_rule: string
          resolved_skill_id: string | null
          round_number: number
          updated_at: string 
}
        Insert: { conflicting_skills?: Json
          created_at?: string
          game_state_id: string
          id?: string
          phase: string
          resolution_rule?: string
          resolved_skill_id?: string | null
          round_number: number
          updated_at?: string 
}
        Update: { conflicting_skills?: Json
          created_at?: string
          game_state_id?: string
          id?: string
          phase?: string
          resolution_rule?: string
          resolved_skill_id?: string | null
          round_number?: number
          updated_at?: string 
}
        Relationships: [{ foreignKeyName: 'fk_skill_conflicts_game_state'
            columns: ['game_state_id']
            isOneToOne: false
            referencedRelation: 'game_states'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_skill_conflicts_resolved_skill'
            columns: ['resolved_skill_id']
            isOneToOne: false
            referencedRelation: 'skill_uses'
            referencedColumns: ['id'] 
} ] }
      skill_effects_queue: { Row: {
          conditions: Json | null
          created_at: string
          effect_data: Json
          effect_type: string
          execution_order: number
          expires_at: string | null
          game_state_id: string
          id: string
          priority: number
          processed_at: string | null
          room_id: string
          skill_use_id: string
          status: string
          trigger_time: string | null
          updated_at: string 
}
        Insert: { conditions?: Json | null
          created_at?: string
          effect_data?: Json
          effect_type: string
          execution_order?: number
          expires_at?: string | null
          game_state_id: string
          id?: string
          priority?: number
          processed_at?: string | null
          room_id: string
          skill_use_id: string
          status?: string
          trigger_time?: string | null
          updated_at?: string 
}
        Update: { conditions?: Json | null
          created_at?: string
          effect_data?: Json
          effect_type?: string
          execution_order?: number
          expires_at?: string | null
          game_state_id?: string
          id?: string
          priority?: number
          processed_at?: string | null
          room_id?: string
          skill_use_id?: string
          status?: string
          trigger_time?: string | null
          updated_at?: string 
}
        Relationships: [{ foreignKeyName: 'fk_skill_effects_queue_game_state'
            columns: ['game_state_id']
            isOneToOne: false
            referencedRelation: 'game_states'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_skill_effects_queue_game_state_id'
            columns: ['game_state_id']
            isOneToOne: false
            referencedRelation: 'game_states'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_skill_effects_queue_room'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_skill_effects_queue_skill_use'
            columns: ['skill_use_id']
            isOneToOne: false
            referencedRelation: 'skill_uses'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_skill_effects_queue_skill_use_id'
            columns: ['skill_use_id']
            isOneToOne: false
            referencedRelation: 'skill_uses'
            referencedColumns: ['id'] 
} ] }
      skill_uses: { Row: {
          conditions_met: Json | null
          created_at: string
          execution_status: string | null
          execution_time: string | null
          failure_reason: string | null
          game_state_id: string
          id: string
          phase: string
          result: Json | null
          round_number: number
          skill_effects: Json | null
          skill_name: string
          skill_priority: number | null
          target_user_id: string | null
          updated_at: string | null
          user_id: string 
}
        Insert: { conditions_met?: Json | null
          created_at?: string
          execution_status?: string | null
          execution_time?: string | null
          failure_reason?: string | null
          game_state_id: string
          id?: string
          phase: string
          result?: Json | null
          round_number: number
          skill_effects?: Json | null
          skill_name: string
          skill_priority?: number | null
          target_user_id?: string | null
          updated_at?: string | null
          user_id: string 
}
        Update: { conditions_met?: Json | null
          created_at?: string
          execution_status?: string | null
          execution_time?: string | null
          failure_reason?: string | null
          game_state_id?: string
          id?: string
          phase?: string
          result?: Json | null
          round_number?: number
          skill_effects?: Json | null
          skill_name?: string
          skill_priority?: number | null
          target_user_id?: string | null
          updated_at?: string | null
          user_id?: string 
}
        Relationships: [{ foreignKeyName: 'fk_skill_uses_game_state'
            columns: ['game_state_id']
            isOneToOne: false
            referencedRelation: 'game_states'
            referencedColumns: ['id'] 
} ] }
      standardized_skill_targets: { Row: {
          created_at: string
          effect_applied: Json
          effect_duration: number | null
          effect_end_time: string | null
          effect_start_time: string
          id: string
          is_active: boolean
          skill_effects_queue_id: string | null
          skill_use_id: string
          stack_count: number
          target_type: string
          target_user_id: string | null
          updated_at: string 
}
        Insert: { created_at?: string
          effect_applied?: Json
          effect_duration?: number | null
          effect_end_time?: string | null
          effect_start_time?: string
          id?: string
          is_active?: boolean
          skill_effects_queue_id?: string | null
          skill_use_id: string
          stack_count?: number
          target_type: string
          target_user_id?: string | null
          updated_at?: string 
}
        Update: { created_at?: string
          effect_applied?: Json
          effect_duration?: number | null
          effect_end_time?: string | null
          effect_start_time?: string
          id?: string
          is_active?: boolean
          skill_effects_queue_id?: string | null
          skill_use_id?: string
          stack_count?: number
          target_type?: string
          target_user_id?: string | null
          updated_at?: string 
}
        Relationships: [{ foreignKeyName: 'fk_standardized_skill_targets_skill_effects_queue_id'
            columns: ['skill_effects_queue_id']
            isOneToOne: false
            referencedRelation: 'skill_effects_queue'
            referencedColumns: ['id'] 
},
          { foreignKeyName: 'fk_standardized_skill_targets_skill_use_id'
            columns: ['skill_use_id']
            isOneToOne: false
            referencedRelation: 'skill_uses'
            referencedColumns: ['id'] 
} ] }
      uploaded_files: { Row: {
          file_name: string
          file_path: string
          id: string
          room_id: string | null
          uploaded_at: string | null 
}
        Insert: { file_name: string
          file_path: string
          id?: string
          room_id?: string | null
          uploaded_at?: string | null 
}
        Update: { file_name?: string
          file_path?: string
          id?: string
          room_id?: string | null
          uploaded_at?: string | null 
}
        Relationships: [{ foreignKeyName: 'uploaded_files_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id'] 
} ] }
      users: { Row: {
          avatar_url: string | null
          created_at: string | null
          experience: number | null
          games_lost: number | null
          games_won: number | null
          id: string
          level: number | null
          player_name: string | null
          user_id: string 
}
        Insert: { avatar_url?: string | null
          created_at?: string | null
          experience?: number | null
          games_lost?: number | null
          games_won?: number | null
          id: string
          level?: number | null
          player_name?: string | null
          user_id?: string 
}
        Update: { avatar_url?: string | null
          created_at?: string | null
          experience?: number | null
          games_lost?: number | null
          games_won?: number | null
          id?: string
          level?: number | null
          player_name?: string | null
          user_id?: string 
}
        Relationships: [] 
}
      vote_processing_logs: { Row: {
          created_at: string
          error_message: string | null
          id: string
          processing_step: string
          step_details: Json | null
          step_status: string
          voting_result_id: string 
}
        Insert: { created_at?: string
          error_message?: string | null
          id?: string
          processing_step: string
          step_details?: Json | null
          step_status: string
          voting_result_id: string 
}
        Update: { created_at?: string
          error_message?: string | null
          id?: string
          processing_step?: string
          step_details?: Json | null
          step_status?: string
          voting_result_id?: string 
}
        Relationships: [{ foreignKeyName: 'fk_logs_voting_result'
            columns: ['voting_result_id']
            isOneToOne: false
            referencedRelation: 'voting_results'
            referencedColumns: ['id'] 
} ] }
      votes: { Row: {
          created_at: string
          id: string
          is_valid: boolean
          target_id: string | null
          vote_time: string
          vote_weight: number
          voter_id: string
          voting_session_id: string 
}
        Insert: { created_at?: string
          id?: string
          is_valid?: boolean
          target_id?: string | null
          vote_time?: string
          vote_weight?: number
          voter_id: string
          voting_session_id: string 
}
        Update: { created_at?: string
          id?: string
          is_valid?: boolean
          target_id?: string | null
          vote_time?: string
          vote_weight?: number
          voter_id?: string
          voting_session_id?: string 
}
        Relationships: [{ foreignKeyName: 'fk_votes_voting_session'
            columns: ['voting_session_id']
            isOneToOne: false
            referencedRelation: 'voting_sessions'
            referencedColumns: ['id'] 
} ] }
      voting_results: { Row: {
          created_at: string
          id: string
          is_majority: boolean
          is_tied: boolean
          processed_at: string | null
          processing_status: string
          result_type: string
          target_id: string | null
          total_votes: number
          updated_at: string
          vote_percentage: number | null
          voting_session_id: string 
}
        Insert: { created_at?: string
          id?: string
          is_majority?: boolean
          is_tied?: boolean
          processed_at?: string | null
          processing_status?: string
          result_type?: string
          target_id?: string | null
          total_votes?: number
          updated_at?: string
          vote_percentage?: number | null
          voting_session_id: string 
}
        Update: { created_at?: string
          id?: string
          is_majority?: boolean
          is_tied?: boolean
          processed_at?: string | null
          processing_status?: string
          result_type?: string
          target_id?: string | null
          total_votes?: number
          updated_at?: string
          vote_percentage?: number | null
          voting_session_id?: string 
}
        Relationships: [{ foreignKeyName: 'fk_voting_results_session'
            columns: ['voting_session_id']
            isOneToOne: false
            referencedRelation: 'voting_sessions'
            referencedColumns: ['id'] 
} ] }
      voting_sessions: { Row: {
          created_at: string
          end_time: string | null
          game_state_id: string
          id: string
          phase: number
          room_id: string
          round_number: number
          session_type: string
          start_time: string
          status: string
          updated_at: string 
}
        Insert: { created_at?: string
          end_time?: string | null
          game_state_id: string
          id?: string
          phase: number
          room_id: string
          round_number: number
          session_type?: string
          start_time?: string
          status?: string
          updated_at?: string 
}
        Update: { created_at?: string
          end_time?: string | null
          game_state_id?: string
          id?: string
          phase?: number
          room_id?: string
          round_number?: number
          session_type?: string
          start_time?: string
          status?: string
          updated_at?: string 
}
        Relationships: [] 
}
    }
    Views: { skill_system_performance: {
        Row: {
          recent_rows: number | null
          table_name: string | null
          table_size: string | null
          total_rows: number | null 
}
        Relationships: [] 
}
    }
    Functions: { advance_game_phase: {
        Args: { p_room_id: string  
}
        Returns: { new_phase: number
          new_round: number
          phase_end_time: string 
}[] }
      apply_elimination_effect: { Args: { p_effect_queue_id: string  
}
        Returns: boolean 
}
      apply_generic_effect: { Args: { p_effect_queue_id: string  
}
        Returns: boolean 
}
      apply_investigation_effect: { Args: { p_effect_queue_id: string  
}
        Returns: boolean 
}
      apply_protection_effect: { Args: { p_effect_queue_id: string  
}
        Returns: boolean 
}
      apply_status_effect: { Args: { p_effect_queue_id: string  
}
        Returns: boolean 
}
      auto_eliminate_expired_hunters: { Args: Record<PropertyKey, never>
        Returns: undefined 
}
      calculate_voting_results: { Args: { p_voting_session_id: string  
}
        Returns: undefined 
}
      can_use_skill: { Args: { p_role_state_id: string  
}
        Returns: boolean 
}
      cast_vote: { Args: {
          p_target_id?: string
          p_voter_id: string
          p_voting_session_id: string 
}
        Returns: undefined 
}
      check_demon_immunity: { Args: {
          p_attacker_user_id: string
          p_game_state_id: string
          p_target_user_id: string 
}
        Returns: boolean 
}
      check_multiple_protection: { Args: {
          p_game_state_id: string
          p_round_number: number
          p_target_user_id: string 
}
        Returns: Json 
}
      check_skill_data_quality: { Args: Record<PropertyKey, never>
        Returns: {
          description: string
          issue_count: number
          issue_type: string 
}[] }
      cleanup_expired_skill_effects: { Args: Record<PropertyKey, never>
        Returns: undefined 
}
      cleanup_expired_standardized_skill_effects: { Args: Record<PropertyKey, never>
        Returns: undefined 
}
      cleanup_old_skill_data: { Args: Record<PropertyKey, never>
        Returns: undefined 
}
      cleanup_old_voice_signals: { Args: Record<PropertyKey, never>
        Returns: undefined 
}
      close_inactive_rooms: { Args: Record<PropertyKey, never>
        Returns: undefined 
}
      create_next_room: { Args: { p_room_id: string  
}
        Returns: string 
}
      create_voting_session: { Args: {
          p_game_state_id: string
          p_phase: number
          p_room_id: string
          p_round_number: number
          p_session_type?: string 
}
        Returns: string 
}
      detect_skill_conflicts: { Args: {
          p_game_state_id: string
          p_phase: string
          p_round_number: number 
}
        Returns: Json 
}
      get_active_skill_effects_for_user: { Args: { p_game_state_id: string; p_user_id: string  
}
        Returns: { effect_duration: number
          effect_end_time: string
          effect_type: string
          skill_name: string
          stack_count: number 
}[] }
      get_phase_duration: { Args: { p_phase: number; p_room_id: string  
}
        Returns: number 
}
      get_public_user_by_name: { Args: { p_name: string  
}
        Returns: { avatar_url: string
          player_name: string
          user_id: string 
}[] }
      get_public_user_profile: { Args: { p_user_id: string  
}
        Returns: { avatar_url: string
          player_name: string
          user_id: string 
}[] }
      get_public_user_profiles_by_ids: { Args: { p_user_ids: string[]  
}
        Returns: { avatar_url: string
          player_name: string
          user_id: string 
}[] }
      get_room_judge_id: { Args: { p_room_id: string  
}
        Returns: string 
}
      get_skill_effects_by_type: { Args: { p_effect_type: string; p_game_state_id: string  
}
        Returns: { created_at: string
          effect_data: Json
          is_active: boolean
          target_user_id: string 
}[] }
      get_skill_system_status: { Args: { p_game_state_id: string  
}
        Returns: { active_effects: number
          expired_effects: number
          pending_effects: number
          total_conflicts: number
          total_skill_uses: number 
}[] }
      get_skill_table_index_usage: { Args: Record<PropertyKey, never>
        Returns: {
          index_name: string
          index_scans: number
          index_size: string
          table_name: string
          tuples_fetched: number
          tuples_read: number 
}[] }
      get_skill_target_room_id: { Args: { p_skill_effects_queue_id: string  
}
        Returns: string 
}
      get_standardized_skill_targets_by_game: { Args: { p_game_state_id: string  
}
        Returns: { created_at: string
          effect_duration: number
          effect_type: string
          id: string
          is_active: boolean
          skill_use_id: string
          target_type: string
          target_user_id: string 
}[] }
      get_waiting_room_player_counts: { Args: Record<PropertyKey, never>
        Returns: {
          player_count: number
          room_id: string 
}[] }
      initialize_game_state: { Args: { p_room_id: string  
}
        Returns: string 
}
      initialize_room_role_states: { Args: { p_room_id: string  
}
        Returns: number 
}
      initialize_skill_uses_remaining: { Args: { p_role_id: string  
}
        Returns: Json 
}
      initialize_status_effects: { Args: { p_role_status: number  
}
        Returns: Json 
}
      is_room_judge: { Args: { p_room_id: string; p_user_id: string  
}
        Returns: boolean 
}
      is_room_participant: { Args: { p_room_id: string; p_user_id: string  
}
        Returns: boolean 
}
      join_room_as_player: { Args: { p_room_id: string  
}
        Returns: boolean 
}
      process_skill_effects: { Args: { p_game_state_id: string  
}
        Returns: number 
}
      process_voting_result: { Args: { p_voting_result_id: string  
}
        Returns: undefined 
}
      queue_skill_effect: { Args: {
          p_conditions?: Json
          p_effect_data: Json
          p_effect_type: string
          p_priority?: number
          p_skill_use_id: string
          p_trigger_delay_seconds?: number 
}
        Returns: string 
}
      resolve_dying_status: { Args: {
          p_game_state_id: string
          p_resolution_type: string
          p_user_id: string 
}
        Returns: boolean 
}
      start_game: { Args: { p_room_id: string  
}
        Returns: string 
}
      toggle_game_pause: { Args: { p_room_id: string  
}
        Returns: boolean 
}
      trigger_hunter_dying_skill: { Args: {
          p_game_state_id: string
          p_hunter_user_id: string
          p_trigger_reason?: string 
}
        Returns: boolean 
}
      use_skill: { Args: {
          p_game_state_id: string
          p_skill_data?: Json
          p_skill_name: string
          p_target_user_id?: string 
}
        Returns: string 
}
      use_skill_charge: { Args: { p_role_state_id: string  
}
        Returns: boolean 
}
      use_skill_enhanced: { Args: {
          p_game_state_id: string
          p_skill_data?: Json
          p_skill_name: string
          p_target_user_id?: string 
}
        Returns: string 
}
      user_has_effect_type: { Args: {
          p_effect_type: string
          p_game_state_id: string
          p_user_id: string 
}
        Returns: boolean 
}
      validate_skill_data_consistency: { Args: Record<PropertyKey, never>
        Returns: boolean 
}
      validate_witch_potion_usage: { Args: {
          p_game_state_id: string
          p_potion_type: string
          p_target_user_id?: string
          p_user_id: string 
}
        Returns: Json 
}
    }
    Enums: { [_ in never]: never 
}
    CompositeTypes: { [_ in never]: never 
}
  } }

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
DefaultSchemaTableNameOrOptions extends
| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
| { schema: keyof DatabaseWithoutInternals  
},
TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends { Row: infer R 
}
? R
: never
: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
DefaultSchema['Views'])
? (DefaultSchema['Tables'] &
DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends { Row: infer R 
}
? R
: never
: never

export type TablesInsert<
DefaultSchemaTableNameOrOptions extends
| keyof DefaultSchema['Tables']
| { schema: keyof DatabaseWithoutInternals  
},
TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends { Insert: infer I 
}
? I
: never
: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends { Insert: infer I 
}
? I
: never
: never

export type TablesUpdate<
DefaultSchemaTableNameOrOptions extends
| keyof DefaultSchema['Tables']
| { schema: keyof DatabaseWithoutInternals  
},
TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends { Update: infer U 
}
? U
: never
: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends { Update: infer U 
}
? U
: never
: never

export type Enums<
DefaultSchemaEnumNameOrOptions extends
| keyof DefaultSchema['Enums']
| { schema: keyof DatabaseWithoutInternals  
},
EnumName extends DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
: never

export type CompositeTypes<
PublicCompositeTypeNameOrOptions extends
| keyof DefaultSchema['CompositeTypes']
| { schema: keyof DatabaseWithoutInternals  
},
CompositeTypeName extends PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals 
}
? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
: never

export const Constants = { public: {
    Enums: { 
} } } as const
