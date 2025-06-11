export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
        Insert: {
          chat_type: string
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
        Update: {
          chat_type?: string
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
        Relationships: [
          {
            foreignKeyName: "chat_messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      file_processing_status: {
        Row: {
          created_at: string
          file_name: string
          id: string
          original_file_path: string | null
          processed_file_path: string | null
          room_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          id?: string
          original_file_path?: string | null
          processed_file_path?: string | null
          room_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          id?: string
          original_file_path?: string | null
          processed_file_path?: string | null
          room_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_processing_status_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      game_actions: {
        Row: {
          action_type: string
          actor_id: string | null
          created_at: string | null
          game_id: string | null
          id: string
          phase: string
          result: string | null
          round: number
          target_id: string | null
        }
        Insert: {
          action_type: string
          actor_id?: string | null
          created_at?: string | null
          game_id?: string | null
          id?: string
          phase: string
          result?: string | null
          round: number
          target_id?: string | null
        }
        Update: {
          action_type?: string
          actor_id?: string | null
          created_at?: string | null
          game_id?: string | null
          id?: string
          phase?: string
          result?: string | null
          round?: number
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_actions_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_actions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_actions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      game_characters: {
        Row: {
          character_name: string
          description: string | null
          faction: string
          "Role ID": string
          skill_description: string | null
          skill_name: string | null
          skill_usage: number | null
        }
        Insert: {
          character_name: string
          description?: string | null
          faction: string
          "Role ID"?: string
          skill_description?: string | null
          skill_name?: string | null
          skill_usage?: number | null
        }
        Update: {
          character_name?: string
          description?: string | null
          faction?: string
          "Role ID"?: string
          skill_description?: string | null
          skill_name?: string | null
          skill_usage?: number | null
        }
        Relationships: []
      }
      game_phase_history: {
        Row: {
          created_at: string
          duration_seconds: number | null
          ended_at: string | null
          game_state_id: string
          id: string
          phase: string
          round_number: number
          started_at: string
        }
        Insert: {
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          game_state_id: string
          id?: string
          phase: string
          round_number: number
          started_at: string
        }
        Update: {
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          game_state_id?: string
          id?: string
          phase?: string
          round_number?: number
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_phase_history_game_state_id_fkey"
            columns: ["game_state_id"]
            isOneToOne: false
            referencedRelation: "game_states"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          active_role: string | null
          created_at: string | null
          current_phase: string | null
          current_round: number | null
          id: string
          room_id: string | null
          status: string | null
        }
        Insert: {
          active_role?: string | null
          created_at?: string | null
          current_phase?: string | null
          current_round?: number | null
          id?: string
          room_id?: string | null
          status?: string | null
        }
        Update: {
          active_role?: string | null
          created_at?: string | null
          current_phase?: string | null
          current_round?: number | null
          id?: string
          room_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      game_settings: {
        Row: {
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
        Insert: {
          created_at?: string
          dawn_duration?: number
          day_duration?: number
          evening_duration?: number
          id?: string
          is_auto_advance?: boolean
          night_duration?: number
          room_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dawn_duration?: number
          day_duration?: number
          evening_duration?: number
          id?: string
          is_auto_advance?: boolean
          night_duration?: number
          room_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_settings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: true
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      game_states: {
        Row: {
          auto_advance: boolean
          created_at: string
          current_phase: string
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
        Insert: {
          auto_advance?: boolean
          created_at?: string
          current_phase?: string
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
        Update: {
          auto_advance?: boolean
          created_at?: string
          current_phase?: string
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
        Relationships: [
          {
            foreignKeyName: "game_states_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: true
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_questions: {
        Row: {
          correct_answer: string
          created_at: string
          created_by: string | null
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          room_id: string
          source_file: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string
          created_by?: string | null
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          room_id: string
          source_file?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string
          created_by?: string | null
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text?: string
          room_id?: string
          source_file?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_questions_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      player_answers: {
        Row: {
          created_at: string | null
          game_id: string | null
          id: string
          is_correct: boolean | null
          player_id: string | null
          question_id: string | null
          response_time: number | null
          selected_option: number | null
        }
        Insert: {
          created_at?: string | null
          game_id?: string | null
          id?: string
          is_correct?: boolean | null
          player_id?: string | null
          question_id?: string | null
          response_time?: number | null
          selected_option?: number | null
        }
        Update: {
          created_at?: string | null
          game_id?: string | null
          id?: string
          is_correct?: boolean | null
          player_id?: string | null
          question_id?: string | null
          response_time?: number | null
          selected_option?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_answers_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_answers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      player_game_states: {
        Row: {
          created_at: string
          game_state_id: string
          id: string
          is_alive: boolean
          role: string
          skill_uses_remaining: Json | null
          status_effects: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          game_state_id: string
          id?: string
          is_alive?: boolean
          role: string
          skill_uses_remaining?: Json | null
          status_effects?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          game_state_id?: string
          id?: string
          is_alive?: boolean
          role?: string
          skill_uses_remaining?: Json | null
          status_effects?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          category: string | null
          correct_option: number
          difficulty: number | null
          explanation: string | null
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question: string
        }
        Insert: {
          category?: string | null
          correct_option: number
          difficulty?: number | null
          explanation?: string | null
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question: string
        }
        Update: {
          category?: string | null
          correct_option?: number
          difficulty?: number | null
          explanation?: string | null
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question?: string
        }
        Relationships: []
      }
      role_selections: {
        Row: {
          id: string
          role_id: string
          room_id: string
          selected_at: string
          user_id: string
        }
        Insert: {
          id?: string
          role_id: string
          room_id: string
          selected_at?: string
          user_id: string
        }
        Update: {
          id?: string
          role_id?: string
          room_id?: string
          selected_at?: string
          user_id?: string
        }
        Relationships: []
      }
      room_players: {
        Row: {
          id: string
          is_ai: boolean | null
          is_ready: boolean | null
          role: string | null
          room_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          is_ai?: boolean | null
          is_ready?: boolean | null
          role?: string | null
          room_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          is_ai?: boolean | null
          is_ready?: boolean | null
          role?: string | null
          room_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_players_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          created_at: string | null
          host_id: string | null
          human_judge: boolean | null
          id: string
          last_human_activity: string | null
          max_players: number | null
          room_id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          host_id?: string | null
          human_judge?: boolean | null
          id?: string
          last_human_activity?: string | null
          max_players?: number | null
          room_id: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          host_id?: string | null
          human_judge?: boolean | null
          id?: string
          last_human_activity?: string | null
          max_players?: number | null
          room_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      skill_uses: {
        Row: {
          created_at: string
          game_state_id: string
          id: string
          phase: string
          result: Json | null
          round_number: number
          skill_name: string
          target_user_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          game_state_id: string
          id?: string
          phase: string
          result?: Json | null
          round_number: number
          skill_name: string
          target_user_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          game_state_id?: string
          id?: string
          phase?: string
          result?: Json | null
          round_number?: number
          skill_name?: string
          target_user_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
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
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          experience?: number | null
          games_lost?: number | null
          games_won?: number | null
          id: string
          level?: number | null
          player_name?: string | null
          user_id?: string
        }
        Update: {
          avatar_url?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      advance_game_phase: {
        Args: { p_room_id: string }
        Returns: {
          new_phase: string
          new_round: number
          phase_end_time: string
        }[]
      }
      cleanup_old_voice_signals: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      close_inactive_rooms: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_phase_duration: {
        Args: { p_room_id: string; p_phase: string }
        Returns: number
      }
      initialize_game_state: {
        Args: { p_room_id: string }
        Returns: string
      }
      start_game: {
        Args: { p_room_id: string }
        Returns: string
      }
      toggle_game_pause: {
        Args: { p_room_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
