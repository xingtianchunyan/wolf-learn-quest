
export interface Question { id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string | null;
  difficulty: number | null;
  selected?: boolean;
  source_file?: string;
  category: string | null;
  generated_questions_id: string | null;,
}

export interface QuestionSource { id: string;
  name: string;
  count: number;
  type: 'file' | 'manual';,
}

export interface ManualQuestionForm { question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string;
  difficulty: number;,
}
