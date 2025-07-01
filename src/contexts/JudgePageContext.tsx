
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string | null;
  difficulty: number | null;
  category: string | null;
}

interface JudgePageContextType {
  linkedQuestions: Question[] | null;
  isSystemLinked: boolean;
  refreshLinkedQuestions: () => Promise<void>;
}

const JudgePageContext = createContext<JudgePageContextType | undefined>(undefined);

export const useJudgePage = () => {
  const context = useContext(JudgePageContext);
  if (context === undefined) {
    throw new Error('useJudgePage must be used within a JudgePageProvider');
  }
  return context;
};

interface JudgePageProviderProps {
  roomId: string;
  children: React.ReactNode;
}

export const JudgePageProvider: React.FC<JudgePageProviderProps> = ({ roomId, children }) => {
  const [linkedQuestions, setLinkedQuestions] = useState<Question[] | null>(null);
  const [isSystemLinked, setIsSystemLinked] = useState(false);
  const { toast } = useToast();

  const fetchLinkedQuestions = async () => {
    if (!roomId) return;

    try {
      console.log('JudgePage Context: 开始获取房间题目，roomId:', roomId);
      
      const { data: roomQuestionsData, error } = await supabase
        .from('room_questions')
        .select(`
          id,
          room_id,
          question_id,
          question_order,
          questions (
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            explanation,
            difficulty,
            category
          )
        `)
        .eq('room_id', roomId)
        .order('question_order', { ascending: true });

      console.log('JudgePage Context: 题目查询结果:', { data: roomQuestionsData, error });

      if (error) {
        console.error('JudgePage Context: 获取题目失败:', error);
        setLinkedQuestions(null);
        setIsSystemLinked(false);
        return;
      }

      if (!roomQuestionsData || roomQuestionsData.length === 0) {
        console.log('JudgePage Context: 房间未设置题目');
        setLinkedQuestions(null);
        setIsSystemLinked(false);
        return;
      }

      // 提取题目数据
      const questions = roomQuestionsData
        .map(rq => rq.questions)
        .filter(q => q !== null) as Question[];

      console.log('JudgePage Context: 成功获取题目数量:', questions.length);
      setLinkedQuestions(questions);
      setIsSystemLinked(questions.length > 0);

    } catch (error) {
      console.error('JudgePage Context: 获取题目时发生错误:', error);
      setLinkedQuestions(null);
      setIsSystemLinked(false);
    }
  };

  const refreshLinkedQuestions = async () => {
    console.log('JudgePage Context: 手动刷新题目');
    await fetchLinkedQuestions();
    
    if (linkedQuestions && linkedQuestions.length > 0) {
      toast({
        title: '题目刷新成功',
        description: `已加载 ${linkedQuestions.length} 道题目`,
      });
    } else {
      toast({
        title: '题目刷新完成',
        description: '当前房间暂无题目',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchLinkedQuestions();
  }, [roomId]);

  // 监听房间题目变化
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room_questions_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_questions',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('JudgePage Context: 房间题目发生变化:', payload);
          fetchLinkedQuestions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const value: JudgePageContextType = {
    linkedQuestions,
    isSystemLinked,
    refreshLinkedQuestions,
  };

  return (
    <JudgePageContext.Provider value={value}>
      {children}
    </JudgePageContext.Provider>
  );
};
