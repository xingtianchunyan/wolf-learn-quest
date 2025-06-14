
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Question } from '@/components/judge/types/questionBank';

interface JudgePageContextType {
  linkedQuestions: Question[];
  setLinkedQuestions: (questions: Question[]) => void;
  isSystemLinked: boolean;
  setIsSystemLinked: (isLinked: boolean) => void;
}

const JudgePageContext = createContext<JudgePageContextType | undefined>(undefined);

export const JudgePageProvider = ({ children }: { children: ReactNode }) => {
  const [linkedQuestions, setLinkedQuestions] = useState<Question[]>([]);
  const [isSystemLinked, setIsSystemLinked] = useState(false);

  return (
    <JudgePageContext.Provider value={{ linkedQuestions, setLinkedQuestions, isSystemLinked, setIsSystemLinked }}>
      {children}
    </JudgePageContext.Provider>
  );
};

export const useJudgePage = () => {
  const context = useContext(JudgePageContext);
  if (context === undefined) {
    throw new Error('useJudgePage must be used within a JudgePageProvider');
  }
  return context;
};
