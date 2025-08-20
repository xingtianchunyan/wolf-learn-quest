
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
  generated_questions_id: string | null;
}

// 带有顺序信息的题目结构 - 来自room_questions + questions的join结果
interface LinkedQuestion {
  question_order: number; // 来自room_questions表
  question: Question;     // 来自questions表的详细信息
  room_question_id: string; // room_questions表的id
}

interface JudgePageContextType {
  linkedQuestions: LinkedQuestion[] | null;
  isSystemLinked: boolean;
  refreshLinkedQuestions: () => Promise<void>;
  saveLinkedQuestions: (questions: Question[]) => Promise<void>;
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
  const [linkedQuestions, setLinkedQuestions] = useState<LinkedQuestion[] | null>(null);
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
          questions!inner (
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            explanation,
            difficulty,
            category,
            generated_questions_id
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

      // 构建带顺序的题目数据结构
      const linkedQuestionsData: LinkedQuestion[] = [];
      let missingQuestionsCount = 0;

      roomQuestionsData.forEach(rq => {
        if (rq.questions && rq.questions.id) {
          // questions存在且有效
          linkedQuestionsData.push({
            question_order: rq.question_order,
            question: rq.questions as Question,
            room_question_id: rq.id
          });
        } else {
          // questions缺失或已被删除
          missingQuestionsCount++;
          console.warn('JudgePage Context: 发现失联题目，question_order:', rq.question_order, 'room_question_id:', rq.id);
        }
      });

      if (missingQuestionsCount > 0) {
        console.warn(`JudgePage Context: ${missingQuestionsCount} 道题目失联（questions表中已删除但room_questions仍存在）`);
        toast({
          title: '题目数据警告',
          description: `检测到 ${missingQuestionsCount} 道题目失联，建议检查题库设置`,
          variant: 'destructive',
        });
      }

      console.log('JudgePage Context: 成功获取题目数量:', linkedQuestionsData.length);
      setLinkedQuestions(linkedQuestionsData);
      setIsSystemLinked(linkedQuestionsData.length > 0);

    } catch (error) {
      console.error('JudgePage Context: 获取题目时发生错误:', error);
      setLinkedQuestions(null);
      setIsSystemLinked(false);
    }
  };

  const saveLinkedQuestions = async (questions: Question[]) => {
    if (!roomId || questions.length === 0) return;

    try {
      console.log('JudgePage Context: 开始保存题目到房间，roomId:', roomId);

      // 先删除现有的房间题目
      const { error: deleteError } = await supabase
        .from('room_questions')
        .delete()
        .eq('room_id', roomId);

      if (deleteError) {
        console.error('JudgePage Context: 删除旧题目失败:', deleteError);
        throw deleteError;
      }

      // 插入新的房间题目，显式按传入顺序生成question_order
      const roomQuestions = questions.map((question, index) => ({
        room_id: roomId,
        question_id: question.id,
        question_order: index + 1 // 确保从1开始递增
      }));

      const { error: insertError } = await supabase
        .from('room_questions')
        .insert(roomQuestions);

      if (insertError) {
        console.error('JudgePage Context: 插入新题目失败:', insertError);
        throw insertError;
      }

      console.log('JudgePage Context: 题目保存成功，数量:', questions.length);
      
      // 重新拉取数据确保页面立即反映真实顺序
      await fetchLinkedQuestions();

      toast({
        title: '题目设置成功',
        description: `已为房间设置 ${questions.length} 道题目`,
      });

      // 发送实时通知，确保学生系统能够及时更新
      console.log('JudgePage Context: 发送题目更新通知');

    } catch (error) {
      console.error('JudgePage Context: 保存题目时发生错误:', error);
      toast({
        title: '题目设置失败',
        description: '无法保存题目设置',
        variant: 'destructive',
      });
    }
  };

  const refreshLinkedQuestions = async () => {
    console.log('JudgePage Context: 手动刷新题目');
    await fetchLinkedQuestions();
    
    // 获取刷新后的最新数据进行提示
    const currentLinkedQuestions = linkedQuestions;
    if (currentLinkedQuestions && currentLinkedQuestions.length > 0) {
      toast({
        title: '题目刷新成功',
        description: `已加载 ${currentLinkedQuestions.length} 道题目`,
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
      .channel(`judge_room_questions_${roomId}`)
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
    saveLinkedQuestions,
  };

  return (
    <JudgePageContext.Provider value={value}>
      {children}
    </JudgePageContext.Provider>
  );
};
