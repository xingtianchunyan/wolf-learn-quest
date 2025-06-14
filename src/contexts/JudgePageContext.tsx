
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Question } from '@/components/judge/types/questionBank';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';

interface JudgePageContextType {
  linkedQuestions: Question[];
  isSystemLinked: boolean;
  isLoading: boolean;
  saveLinkedQuestions: (questions: Question[]) => Promise<void>;
}

const JudgePageContext = createContext<JudgePageContextType | undefined>(undefined);

export const JudgePageProvider = ({ children, roomId }: { children: ReactNode; roomId:string }) => {
  const [linkedQuestions, setLinkedQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const fetchLinkedQuestions = useCallback(async () => {
    if (!roomId) {
      setLinkedQuestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data: roomQuestionsData, error: roomQuestionsError } = await supabase
        .from('room_questions')
        .select('question_id')
        .eq('room_id', roomId)
        .order('question_order', { ascending: true });

      if (roomQuestionsError) throw roomQuestionsError;

      if (!roomQuestionsData || roomQuestionsData.length === 0) {
        setLinkedQuestions([]);
        return;
      }

      const questionIds = roomQuestionsData.map(rq => rq.question_id);
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .in('id', questionIds);
      
      if (questionsError) throw questionsError;

      const questionsMap = new Map(questionsData.map(q => [q.id, q]));
      const orderedQuestions = questionIds
        .map(id => questionsMap.get(id))
        .filter((q): q is Question => !!q);

      setLinkedQuestions(orderedQuestions);

    } catch (error: any) {
      console.error('Error fetching linked questions:', error);
      toast({
        title: '获取链接题目失败',
        description: error.message,
        variant: 'destructive',
      });
      setLinkedQuestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [roomId, toast]);
  
  useEffect(() => {
    const takeOverJudgeshipAndFetch = async () => {
      if (!roomId || !currentUser) {
        if (!isLoading) setIsLoading(true);
        fetchLinkedQuestions().finally(() => setIsLoading(false));
        return;
      }
      
      setIsLoading(true);
      
      const { error } = await supabase
        .from('rooms')
        .update({ judge_user_id: currentUser.id })
        .eq('id', roomId);
        
      if (error) {
        console.error('Failed to take over as judge:', error);
        toast({
          title: '担任法官失败',
          description: '无法将您设置为当前房间的法官。',
          variant: 'destructive',
        });
      }
      
      await fetchLinkedQuestions();
      setIsLoading(false);
    };

    takeOverJudgeshipAndFetch();
  }, [roomId, currentUser, fetchLinkedQuestions, toast]);

  const saveLinkedQuestions = async (questions: Question[]) => {
    if (!roomId) return;

    try {
      const { error: deleteError } = await supabase
        .from('room_questions')
        .delete()
        .eq('room_id', roomId);

      if (deleteError) throw deleteError;

      if (questions.length > 0) {
        const newRoomQuestions = questions.map((q, index) => ({
          room_id: roomId,
          question_id: q.id,
          question_order: index + 1,
        }));
        const { error: insertError } = await supabase
          .from('room_questions')
          .insert(newRoomQuestions);

        if (insertError) throw insertError;
      }
      
      setLinkedQuestions(questions);

      toast({
        title: questions.length > 0 ? '链接成功' : '链接已清空',
        description: `已将 ${questions.length} 道题目同步至教师系统。`,
      });

    } catch (error: any) {
       console.error('Error saving linked questions:', error);
       toast({
         title: '保存题目顺序失败',
         description: error.message,
         variant: 'destructive',
       });
    }
  };

  const isSystemLinked = linkedQuestions.length > 0;

  return (
    <JudgePageContext.Provider value={{ linkedQuestions, isSystemLinked, isLoading, saveLinkedQuestions }}>
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
