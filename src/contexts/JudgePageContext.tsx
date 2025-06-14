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

      const questionsMap = new Map(questionsData.map(q => [q.id, q,]));
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
      // 如果没有房间ID或当前用户信息，则显示加载中并等待。
      // 当用户信息加载后，此效果将重新运行。
      if (!roomId || !currentUser) {
        setIsLoading(true);
        return;
      }
      
      setIsLoading(true);
      
      // 尝试获取房间的法官权限
      const { error } = await supabase
        .from('rooms')
        .update({ judge_user_id: currentUser.id })
        .eq('id', roomId);
        
      if (error) {
        console.error('Failed to take over as judge:', error);
        toast({
          title: '担任法官失败',
          description: `无法将您设置为当前房间的法官。原因: ${error.message}`,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      // 成为法官后，获取链接的题目
      await fetchLinkedQuestions();
      setIsLoading(false);
    };

    takeOverJudgeshipAndFetch();
  }, [roomId, currentUser, fetchLinkedQuestions, toast]);

  const saveLinkedQuestions = async (questions: Question[]) => {
    if (!roomId || !currentUser) return;

    try {
      // 在保存前，首先确保当前用户是法官。
      // 使用 .select() 有助于确保数据库更改已传播。
      const { error: judgeError } = await supabase
        .from('rooms')
        .update({ judge_user_id: currentUser.id })
        .eq('id', roomId)
        .select('id')
        .single();

      if (judgeError) {
        console.error('Failed to assert judgeship before saving:', judgeError);
        throw new Error(`无法确认法官权限，保存失败。原因: ${judgeError.message}`);
      }
      
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
