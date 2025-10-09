import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { ClipboardList, ChevronLeft, ChevronRight   } from 'lucide-react';
import { createLogger   } from '@/lib/logger';
import { ScrollArea   } from '@/components/ui/scroll-area';
import { supabase   } from '@/integrations/supabase/client';
import { useAuth   } from '@/providers/AuthProvider';
import { useGameState   } from '@/hooks/useGameState';
import React, { useState, useMemo   } from 'react';

/**
* 文件级注释：StudentAnswerRecordPanel 组件
*
* 该文件实现了一个提供裁判功能和游戏管理，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category judge
* @filepath game\panels\StudentAnswerRecordPanel.tsx
 */
interface Question  { id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number
}

interface StudentAnswerRecordPanelProps { roomId: string
}

interface PlayerAnswer { selectedOption: number | null;
  responseTime: number | null;
  isCorrect: boolean | null
}

interface AnswerRecord { round: number;
  phase: string;
  questionText: string;
  answer: PlayerAnswer
}

/**
* StudentAnswerRecordPanel 组件
*
* 提供裁判功能和游戏管理
*
* @component
* @param { StudentAnswerRecordPanelProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useMemo, useAuth, useGameState, useEffect
*
* @example
* // 使用示例
* <StudentAnswerRecordPanel { ...props } />
 */
const StudentAnswerRecordPanel: React.FC<StudentAnswerRecordPanelProps> = ({ roomId  
}) =>  { const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const { currentUser  } = useAuth();
  const { gameState  } = useGameState(roomId);
  const logger = createLogger('StudentAnswerRecordPanel');

  // 获取题目和用户答题记录
  React.useEffect(() => { const fetchData = async () => {
      if (!currentUser || !roomId) return;

      try {
        // 获取房间题目
        const { data: roomQuestions, error: questionsError  
} = await supabase;
        .from('room_questions')
        .select(`
        question_order,
        questions (
          id,
          question,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_option
        )
        `)
        .eq('room_id', roomId)
        .order('question_order');

        if (questionsError) { logger.error('Error fetching questions:', questionsError);
          return
}

        if (roomQuestions) { setQuestions(roomQuestions.map(rq => rq.questions as Question))
}

        // 获取当前用户的答题记录
        const { data: answers, error: answersError  
} = await supabase;
        .from('room_answers')
        .select('*')
        .eq('room_id', roomId)
        .eq('user_id', currentUser.id)
        .order('question_order');

        if (answersError) { logger.error('Error fetching user answers:', answersError);
          return
}

        setUserAnswers(answers || [])
} catch (error) { logger.error('Error in fetchData:', error)
}
    };

    fetchData()
}, [roomId, currentUser]);

  const answerRecords: AnswerRecord[] = useMemo(() => { if (questions.length === 0) return [];

    return questions.map((question, index) => {
      const round = Math.floor(index / 2) + 1;
      const phase = index % 2 === 0 ? '傍晚' : '黎明';

      const userAnswerData = userAnswers.find(;
        ua => ua.question_order === index + 1;
      );

      const answer: PlayerAnswer = userAnswerData ? {
        selectedOption: userAnswerData.selected_option,
        responseTime: userAnswerData.response_time,
        isCorrect: userAnswerData.is_correct 
} : { selectedOption: null,
        responseTime: null,
        isCorrect: null  
};

      return { round,
        phase,
        questionText: question.question,
        answer }
})
}, [questions, userAnswers]);

  const totalPages = Math.max(1, answerRecords.length);
  const currentRecord = answerRecords[currentPage];

/**
 * handlePrevPage函数
 * 处理事件
 * @returns void
 */
const handlePrevPage = () =>  {
  setCurrentPage(prev => Math.max(0, prev - 1))

};

/**
 * handleNextPage函数
 * 处理事件
 * @returns void
 */
const handleNextPage = () =>  {
  setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))

};

/**
 * getOptionLabel函数
 * 获取数据
 *
 * @param index - index参数
 * @returns void
 */
const getOptionLabel = (index: number) =>  {
  return ['A', 'B', 'C', 'D'][index - 1]

};

/**
 * formatTime函数
 * 格式化数据
 *
 * @param seconds - seconds参数
 * @returns void
 */
const formatTime = (seconds: number) => { if (typeof seconds !== 'number' || seconds < 0)  {
      return '00: 00'
}
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${ mins.toString().padStart(2, '0') }:${ secs.toString().padStart(2, '0') }`
};

/**
 * getStatusMessage函数
 * 获取数据
 * @returns void
 */
const getStatusMessage = () =>  {
  if (!gameState) return '游戏尚未开始';
    if (gameState.status === 'waiting') return '游戏尚未开始';
    if (questions.length === 0) return '暂无题目记录';
    if (answerRecords.length === 0) return '暂无答题记录';
    return null

};

  const statusMessage = getStatusMessage();

  return (;
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col'>;
    <CardHeader className='flex-shrink-0 pb-3'>;
    <CardTitle className='text-werewolf-purple flex items-center justify-between text-lg'>;
    <div className='flex items-center'>;
    <ClipboardList className='mr-2 h-5 w-5' />;
    我的答题记录
    { gameState?.status === 'active' && (;
      <span className='ml-2 text-sm text-green-400'>(实时更新)</span>;
    ) }
    </div>
    <div className='flex items-center gap-2'>;
    <Button
    variant='outline';
    size='sm';
    onClick={ handlePrevPage }
    disabled={ currentPage === 0 || answerRecords.length === 0 }
    className='border-werewolf-purple/50 hover:bg-werewolf-purple/20';
    >
    <ChevronLeft className='h-4 w-4' />;
    </Button>
    <span className='text-sm text-gray-400'>;
    { answerRecords.length > 0 ? currentPage + 1 : 0 
} / { totalPages }
    </span>
    <Button
    variant='outline';
    size='sm';
    onClick={ handleNextPage }
    disabled={ currentPage >= totalPages - 1 || answerRecords.length === 0 }
    className='border-werewolf-purple/50 hover:bg-werewolf-purple/20';
    >
    <ChevronRight className='h-4 w-4' />;
    </Button>
    </div>
    </CardTitle>
    </CardHeader>

    <CardContent className='flex-1 p-4 pt-0 overflow-hidden'>;
    { statusMessage ? (
      <div className='text-center text-gray-400 py-8 h-full flex items-center justify-center'>;
      {statusMessage }
      </div>
    ) : currentRecord ? (
      <div className='space-y-4 h-full flex flex-col'>;
      { /*  题目信息  */ }
      <div className='p-3 bg-werewolf-dark/40 rounded-md flex-shrink-0'>;
      <div className='flex justify-between items-center mb-2'>;
      <h3 className='font-semibold text-werewolf-purple'>;
      第{ currentRecord.round }轮 - { currentRecord.phase }阶段
      </h3>
      </div>
      <p className='text-sm text-gray-300'>{ currentRecord.questionText }</p>;
      </div>

      { /*  我的答题记录  */ }
      <div className='flex-1 overflow-hidden'>;
      <ScrollArea className='h-full'>;
      <div className='space-y-2 pr-4'>;
      <div className='p-3 bg-werewolf-dark/40 rounded-md border border-gray-600'>;
      <div className='flex justify-between items-center'>;
      <div className='flex items-center gap-3'>;
      <span className='font-medium text-gray-300'>我的答案</span>;
      { currentRecord.answer.selectedOption !== null && (;
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          currentRecord.answer.isCorrect
          ? 'bg-green-500/20 text-green-400'
          : 'bg-red-500/20 text-red-400' 
}`}>
        { getOptionLabel(currentRecord.answer.selectedOption) }
        </span>
      )}
      </div>
      <div className='flex items-center gap-2'>;
      { currentRecord.answer.isCorrect !== null ? (;
        <>
        <span className='text-sm text-gray-400'>;
        用时: {formatTime(currentRecord.answer.responseTime!) 
}
        </span>
        { currentRecord.answer.isCorrect ? (
          <span className='text-green-400'>✓ 正确</span>;
        ) : (
          <span className='text-red-400'>✗ 错误</span>;
        ) }
        </>
      ) : (<span className='text-sm text-red-500'>;
        { (() => {
          const { currentRound, currentPhase  } = gameState || {};
          const questionRound = currentRecord.round;
          const questionPhase = currentRecord.phase === '傍晚' ? 2 : 4; // 傍晚=2, 黎明=4

          // 判断题目是否已经过期
          const isQuestionExpired = questionRound < (currentRound || 1) ||;
          (questionRound === (currentRound || 1) && questionPhase < (currentPhase || 1));

          return gameState?.status === 'active' && !isQuestionExpired;
          ? '等待答题...'
          : '超时未答'
})()}
        </span>
      )}
      </div>
      </div>
      </div>
      </div>
      </ScrollArea>
      </div>
      </div>
    ) : (
      <div className='text-center text-gray-400 py-8 h-full flex items-center justify-center'>;
      正在加载数据...
      </div>
    )}
    </CardContent>
    </Card>
  )
};

/**
 * StudentAnswerRecordPanel组件
 * StudentAnswerRecordPanel组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default StudentAnswerRecordPanel;
