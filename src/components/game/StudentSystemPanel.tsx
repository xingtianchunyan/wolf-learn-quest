
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock } from 'lucide-react';
import { useJudgePage } from '@/contexts/JudgePageContext';
import { Question } from '@/components/judge/types/questionBank';
import { useGameState } from '@/hooks/useGameState';

interface StudentSystemPanelProps {
  roomId: string;
  onAnswerSubmit?: (questionId: string, selectedOption: number) => void;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ 
  roomId, 
  onAnswerSubmit 
}) => {
  const { linkedQuestions, isSystemLinked } = useJudgePage();
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } = useGameState(roomId);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (isSystemLinked && gameState && gameState.status === 'active') {
      const { currentRound, currentPhase } = gameState;
      const phaseIndex = currentPhase === 'evening' ? 0 : currentPhase === 'dawn' ? 1 : -1;

      if (phaseIndex !== -1) {
        const questionIndex = (currentRound - 1) * 2 + phaseIndex;
        if (linkedQuestions && linkedQuestions.length > questionIndex) {
          setCurrentQuestion(linkedQuestions[questionIndex]);
          setSelectedOption(null);
          setHasSubmitted(false);
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

  const handleOptionSelect = (optionNum: number) => {
    if (hasSubmitted) return;
    setSelectedOption(optionNum);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || selectedOption === null || hasSubmitted) return;
    
    setHasSubmitted(true);
    if (onAnswerSubmit) {
      onAnswerSubmit(currentQuestion.id.toString(), selectedOption);
    }
  };
  
  const roundNumber = gameState?.currentRound ?? 1;
  const phaseName = gameState ? getPhaseDisplayName(gameState.currentPhase) : '等待中';
  const isAnsweringPhase = gameState && (gameState.currentPhase === 'evening' || gameState.currentPhase === 'dawn');
  const showTimer = isSystemLinked && gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;

  const getGameStatusInfo = () => {
    if (!gameState) return '游戏准备中';
    if (gameState.status === 'waiting') return '游戏准备中';
    if (gameState.status === 'active') return `游戏进行中 - 第${roundNumber}轮 ${phaseName}阶段`;
    if (gameState.status === 'ended') return '游戏已结束';
    return '未知状态';
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GraduationCap className="mr-2 h-5 w-5" />
          学生系统 - {getGameStatusInfo()}
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

            {gameState?.status === 'active' && currentQuestion ? (
              <>
                {/* 题目题干 */}
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">题目</h3>
                  <p className="text-gray-300 leading-relaxed">{currentQuestion.question}</p>
                </div>

                {/* 选项列表 */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-werewolf-purple">选项</h3>
                  {[1, 2, 3, 4].map((optionNum) => {
                    const optionText = getOptionText(optionNum);
                    if (!optionText) return null;
                    
                    return (
                      <Button
                        key={optionNum}
                        variant={selectedOption === optionNum ? "default" : "outline"}
                        className={`w-full p-3 text-left justify-start ${
                          selectedOption === optionNum
                            ? 'bg-werewolf-purple hover:bg-werewolf-purple/80'
                            : 'bg-werewolf-dark/40 border-gray-600 text-gray-300 hover:bg-werewolf-dark/60'
                        } ${hasSubmitted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                        onClick={() => handleOptionSelect(optionNum)}
                        disabled={hasSubmitted}
                      >
                        <span className="font-semibold mr-2">
                          {getOptionLabel(optionNum - 1)}.
                        </span>
                        {optionText}
                      </Button>
                    );
                  })}
                </div>

                {/* 提交答案按钮 */}
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null || hasSubmitted}
                    className="bg-werewolf-purple hover:bg-werewolf-purple/80"
                  >
                    {hasSubmitted ? '已提交答案' : '提交答案'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
                {!gameState || gameState.status === 'waiting' 
                  ? '游戏尚未开始，请等待游戏开始'
                  : !isSystemLinked 
                    ? '等待法官配置题目'
                    : gameState.status === 'ended'
                      ? '游戏已结束'
                      : !isAnsweringPhase 
                        ? '当前非答题阶段' 
                        : '当前阶段无题目信息或题目已用尽'
                }
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentSystemPanel;
