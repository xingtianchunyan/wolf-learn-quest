import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import { GraduationCap, Clock   } from 'lucide-react';
import { ScrollArea   } from '@/components/ui/scroll-area';
import { useGameState   } from '@/hooks/useGameState';
import { useJudgePage   } from '@/contexts/JudgePageContext';
import React, { useState, useEffect   } from 'react';
import { Question   } from '../types/questionBank';

/**
* 文件级注释：TeacherSystemPanel 组件
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
* @filepath judge\management\TeacherSystemPanel.tsx
 */
interface TeacherSystemPanelProps  { roomId: string
}

/**
* TeacherSystemPanel 组件
*
* 提供裁判功能和游戏管理
*
* @component
* @param { TeacherSystemPanelProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect, useJudgePage, useGameState
*
* @example
* // 使用示例
* <TeacherSystemPanel { ...props } />
 */
const TeacherSystemPanel: React.FC<TeacherSystemPanelProps> = ({ roomId  
}) => { const  { linkedQuestions, isSystemLinked  } = useJudgePage();
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName  } = useGameState(roomId);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // 计算当前轮次和阶段对应的题目序号（与学生端保持一致）
/**
 * calculateQuestionOrder函数
 * calculateQuestionOrder函数的功能描述
 *
 * @param round - round参数
 * @param phase - phase参数
 * @returns void
 */
const calculateQuestionOrder = (round: number, phase: number): number =>  {
  const phaseIndex = phase === 2 ? 0 : phase === 4 ? 1 : -1; // 2=傍晚, 4=黎明
    if (phaseIndex === -1) return -1;

/**
 * questionIndex函数
 * questionIndex函数的功能描述
 *
 * @param round - round参数
 * @returns void
 */
    const questionIndex = (round - 1) * 2 + phaseIndex;
    return questionIndex + 1; // 转换为1基的question_order  
};

  useEffect(() => { if (isSystemLinked && gameState && gameState.status === 'active') {
      const { currentRound, currentPhase  } = gameState;
      const targetQuestionOrder = calculateQuestionOrder(currentRound, currentPhase);

      if (targetQuestionOrder > 0 && linkedQuestions) { // 使用question_order精确查找，而不是数组下标
        const foundQuestion = linkedQuestions.find(lq => lq.question_order === targetQuestionOrder);
        if (foundQuestion) {
          setCurrentQuestion(foundQuestion.question)
} else { console.warn('TeacherSystemPanel: 未找到题目，question_order:', targetQuestionOrder);
          setCurrentQuestion(null)
}
      } else { setCurrentQuestion(null)
}
    } else { setCurrentQuestion(null)
}
  }, [isSystemLinked, linkedQuestions, gameState]);

/**
 * getOptionLabel函数
 * 获取数据
 *
 * @param index - index参数
 * @returns void
 */
const getOptionLabel = (index: number) =>  {
  return ['A', 'B', 'C', 'D'][index]

};

/**
 * getOptionText函数
 * 获取数据
 *
 * @param option - option参数
 * @returns void
 */
const getOptionText = (option: number) =>  { if (!currentQuestion) return '';
    switch (option) {
      case 1: return currentQuestion.option_a;
      case 2: return currentQuestion.option_b;
      case 3: return currentQuestion.option_c;
      case 4: return currentQuestion.option_d;
      default: return ''
}
  };

  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState ? getPhaseDisplayName(gameState.currentPhase) : '等待中';
  // 修复答题阶段判断：使用数字比较
  const isAnsweringPhase = gameState && (gameState.currentPhase === 2 || gameState.currentPhase === 4); // 2=傍晚, 4=黎明
  const showTimer = isSystemLinked && gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;

  // 显示游戏状态信息
/**
 * getGameStatusInfo函数
 * 获取数据
 * @returns void
 */
const getGameStatusInfo = () =>  { if (!gameState) return '游戏准备中';
    if (gameState.status === 'waiting') return '游戏准备中';
    if (gameState.status === 'active') return `游戏进行中 - 第${roundNumber }轮 ${ phaseName }阶段`;
    if (gameState.status === 'ended') return '游戏已结束';
    return '未知状态'
};

  return (;
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col'>;
    <CardHeader className='flex-shrink-0 pb-3'>;
    <CardTitle className='text-werewolf-purple flex items-center text-lg'>;
    <GraduationCap className='mr-2 h-5 w-5' />;
    教师系统 - { getGameStatusInfo() }
    </CardTitle>
    </CardHeader>

    <CardContent className='flex-1 p-4 pt-0 overflow-hidden'>;
    <ScrollArea className='h-full'>;
    <div className='space-y-4 pr-4'>;
    { /*  剩余答题时间  */
} { showTimer && (
      <div className='flex items-center justify-center p-3 bg-werewolf-dark/40 rounded-md'>;
      <Clock className='mr-2 h-5 w-5 text-werewolf-purple' />;
      <span className='text-lg font-bold text-werewolf-purple'>;
      剩余时间: {formatTime(timeRemaining) 
}
      </span>
      </div>
    )}
    { gameState?.isPaused && isAnsweringPhase && (
      <div className='flex items-center justify-center p-3 bg-yellow-900/30 rounded-md'>;
      <span className='text-lg font-bold text-yellow-400'>游戏已暂停</span>;
      </div>
    ) }

    { gameState?.status === 'active' && currentQuestion ? (;
      <>
      {/*  题目题干  */ }
      <div className='p-4 bg-werewolf-dark/40 rounded-md'>;
      <h3 className='font-semibold text-werewolf-purple mb-2'>题目</h3>;
      <p className='text-gray-300 leading-relaxed'>{ currentQuestion.question }</p>;
      </div>

      { /*  选项列表  */ }
      <div className='space-y-2'>;
      <h3 className='font-semibold text-werewolf-purple'>选项</h3>;
      { [1, 2, 3, 4].map(optionNum => (;
        <div
        key={optionNum }
        className={ `p-3 rounded-md border ${
          optionNum === currentQuestion.correct_option;
          ? 'bg-green-500/20 border-green-500 text-green-300'
          : 'bg-werewolf-dark/40 border-gray-600 text-gray-300' 
}`}
        >
        <span className='font-semibold mr-2'>;
        { getOptionLabel(optionNum - 1) }.
        </span>
        { getOptionText(optionNum) }
        { optionNum === currentQuestion.correct_option && (;
          <span className='ml-2 text-green-400 font-bold'>✓ 正确答案</span>;
        ) }
        </div>
      ))}
      </div>

      { /*  正确答案解析  */ }
      <div className='p-4 bg-werewolf-dark/40 rounded-md'>;
      <h3 className='font-semibold text-werewolf-purple mb-2'>答案解析</h3>;
      <p className='text-gray-300 leading-relaxed'>{ currentQuestion.explanation }</p>;
      </div>
      </>
    ) : (
      <div className='text-center text-gray-400 py-8 h-full flex items-center justify-center'>;
      { !gameState || gameState.status === 'waiting';
      ? '游戏尚未开始，请先开始游戏'
      : !isSystemLinked
      ? '请先在 准备阶段管理 -> 题库管理 中链接题目'
      : gameState.status === 'ended';
      ? '游戏已结束'
      : !isAnsweringPhase
      ? '当前非答题阶段'
      : '当前阶段的题目未找到，请检查题库与题目顺序设置' 
}
    </div>
  )}
  </div>
  </ScrollArea>
  </CardContent>
  </Card>
)
};

/**
 * TeacherSystemPanel组件
 * TeacherSystemPanel组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default TeacherSystemPanel;
