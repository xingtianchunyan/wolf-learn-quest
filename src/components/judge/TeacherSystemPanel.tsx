
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, Clock } from 'lucide-react';
import { useJudgePage } from '@/contexts/JudgePageContext';
import { Question } from './types/questionBank';
import { useGameState } from '@/hooks/useGameState';

interface TeacherSystemPanelProps {
  roomId: string;
}

const TeacherSystemPanel: React.FC<TeacherSystemPanelProps> = ({ roomId }) => {
  const { linkedQuestions, isSystemLinked } = useJudgePage();
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } = useGameState(roomId);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (isSystemLinked && gameState) {
      const { currentRound, currentPhase } = gameState;
      const phaseIndex = currentPhase === 'evening' ? 0 : currentPhase === 'dawn' ? 1 : -1;

      if (phaseIndex !== -1) {
        const questionIndex = (currentRound - 1) * 2 + phaseIndex;
        if (linkedQuestions && linkedQuestions.length > questionIndex) {
          setCurrentQuestion(linkedQuestions[questionIndex]);
        } else {
          setCurrentQuestion(null);
        }
      } else {
        setCurrentQuestion(null);
      }
    } else {
      setCurrentQuestion(null);
    }
  }, [isSystemLinked, linkedQuestions, gameState]);

  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index];
  };

  const getOptionText = (option: number) => {
    if (!currentQuestion) return '';
    switch (option) {
      case 1: return currentQuestion.option_a;
      case 2: return currentQuestion.option_b;
      case 3: return currentQuestion.option_c;
      case 4: return currentQuestion.option_d;
      default: return '';
    }
  };
  
  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState ? getPhaseDisplayName(gameState.currentPhase) : '等待中';
  const isAnsweringPhase = gameState && (gameState.currentPhase === 'evening' || gameState.currentPhase === 'dawn');
  const showTimer = isSystemLinked && gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GraduationCap className="mr-2 h-5 w-5" />
          教师系统 - 第{roundNumber}轮 {phaseName}阶段
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            {/* 剩余答题时间 */}
            {showTimer && (
              <div className="flex items-center justify-center p-3 bg-werewolf-dark/40 rounded-md">
                <Clock className="mr-2 h-5 w-5 text-werewolf-purple" />
                <span className="text-lg font-bold text-werewolf-purple">
                  剩余时间: {formatTime(timeRemaining)}
                </span>
              </div>
            )}
             {gameState?.isPaused && isAnsweringPhase && (
                <div className="flex items-center justify-center p-3 bg-yellow-900/30 rounded-md">
                    <span className="text-lg font-bold text-yellow-400">游戏已暂停</span>
                </div>
            )}


            {currentQuestion ? (
              <>
                {/* 题目题干 */}
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">题目</h3>
                  <p className="text-gray-300 leading-relaxed">{currentQuestion.question}</p>
                </div>

                {/* 选项列表 */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-werewolf-purple">选项</h3>
                  {[1, 2, 3, 4].map((optionNum) => (
                    <div 
                      key={optionNum}
                      className={`p-3 rounded-md border ${
                        optionNum === currentQuestion.correct_option
                          ? 'bg-green-500/20 border-green-500 text-green-300'
                          : 'bg-werewolf-dark/40 border-gray-600 text-gray-300'
                      }`}
                    >
                      <span className="font-semibold mr-2">
                        {getOptionLabel(optionNum - 1)}.
                      </span>
                      {getOptionText(optionNum)}
                      {optionNum === currentQuestion.correct_option && (
                        <span className="ml-2 text-green-400 font-bold">✓ 正确答案</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 正确答案解析 */}
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">答案解析</h3>
                  <p className="text-gray-300 leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
                {isSystemLinked
                  ? (gameState && !isAnsweringPhase ? '当前非答题阶段' : '当前阶段无题目信息或题目已用尽')
                  : '请先在 准备阶段管理 -> 题库管理 中链接题目'}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TeacherSystemPanel;
