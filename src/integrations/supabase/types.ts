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
          id: string
          message: string
          recipient_id: string | null
          sender_id: string | null
        }
        Insert: {
          chat_type: string
          created_at?: string | null
          game_id?: string | null
          id?: string
          message: string
          recipient_id?: string | null
          sender_id?: string | null
        }
        Update: {
          chat_type?: string
          created_at?: string | null
          game_id?: string | null
          id?: string
          message?: string
          recipient_id?: string | null
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
            foreignKeyName: "chat_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
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
          player_id: string
          role_id: string
          room_id: string
          selected_at: string
        }
        Insert: {
          id?: string
          player_id: string
          role_id: string
          room_id: string
          selected_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          role_id?: string
          room_id?: string
          selected_at?: string
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
          {
            foreignKeyName: "room_players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
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
          id?: string
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
      voice_participants: {
        Row: {
          id: string
          is_connected: boolean
          joined_at: string
          player_name: string
          room_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          is_connected?: boolean
          joined_at?: string
          player_name: string
          room_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          is_connected?: boolean
          joined_at?: string
          player_name?: string
          room_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voice_signals: {
        Row: {
          created_at: string
          from_user: string
          id: string
          room_id: string
          signal_data: Json
          signal_type: string
          to_user: string
        }
        Insert: {
          created_at?: string
          from_user: string
          id?: string
          room_id: string
          signal_data: Json
          signal_type: string
          to_user: string
        }
        Update: {
          created_at?: string
          from_user?: string
          id?: string
          room_id?: string
          signal_data?: Json
          signal_type?: string
          to_user?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_voice_signals: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      close_inactive_rooms: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
