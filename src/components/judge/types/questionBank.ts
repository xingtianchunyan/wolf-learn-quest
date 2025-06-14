export interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation?: string;
  difficulty?: number;
  selected?: boolean;
  source_file?: string;
  category?: string;
  generated_questions_id?: string;
  room_id?: string | null;
}

export interface QuestionSource {
  id: string;
  name: string;
  count: number;
  type: 'file' | 'manual';
}

export interface ManualQuestionForm {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string;
  difficulty: number;
}
