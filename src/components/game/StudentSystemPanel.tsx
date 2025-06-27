
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation?: string;
}

interface StudentSystemPanelProps {
  roomId: string;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId }) => {
  const { gameState, timeRemaining, formatTime, getPhaseDisplayName } = useGameState(roomId);
  const { currentUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [previousAnswer, setPreviousAnswer] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [showPreviousResult, setShowPreviousResult] = useState(false);

  // 获取当前题目
  useEffect(() => {
    const fetchCurrentQuestion = async () => {
      if (!gameState || gameState.status !== 'active') return;
      
      const { currentRound, currentPhase } = gameState;
      const isAnsweringPhase = currentPhase === 2 || currentPhase === 4; // 傍晚、黎明
      
      if (!isAnsweringPhase) {
        setCurrentQuestion(null);
        setShowPreviousResult(true);
        return;
      }
      
      setShowPreviousResult(false);
      const phaseIndex = currentPhase === 2 ? 0 : 1; // 傍晚=0, 黎明=1
      const questionOrder = (currentRound - 1) * 2 + phaseIndex + 1;
      
      const { data } = await supabase
        .from('room_questions')
        .select(`
          questions (
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            explanation
          )
        `)
        .eq('room_id', roomId)
        .eq('question_order', questionOrder)
        .single();
      
      if (data?.questions) {
        setCurrentQuestion(data.questions as Question);
        
        // 检查是否已答题
        const { data: existingAnswer } = await supabase
          .from('room_answers')
          .select('*')
          .eq('room_id', roomId)
          .eq('user_id', currentUser?.id)
          .eq('question_order', questionOrder)
          .single();
        
        if (existingAnswer) {
          setSelectedOption(existingAnswer.selected_option);
          setAnswerSubmitted(true);
        } else {
          setSelectedOption(null);
          setAnswerSubmitted(false);
        }
      }
    };

    fetchCurrentQuestion();
  }, [gameState, roomId, currentUser?.id]);

  // 获取上一阶段答案
  useEffect(() => {
    const fetchPreviousAnswer = async () => {
      if (!gameState || !showPreviousResult) return;
      
      const { currentRound, currentPhase } = gameState;
      let previousQuestionOrder = 0;
      
      if (currentPhase === 1) { // 白天，显示上一轮黎明的答案
        previousQuestionOrder = (currentRound - 2) * 2 + 2;
      } else if (currentPhase === 3) { // 夜晚，显示当前轮傍晚的答案
        previousQuestionOrder = (currentRound - 1) * 2 + 1;
      }
      
      if (previousQuestionOrder > 0) {
        const { data } = await supabase
          .from('room_answers')
          .select(`
            *,
            room_questions!inner(
              questions (
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option,
                explanation
              )
            )
          `)
          .eq('room_id', roomId)
          .eq('user_id', currentUser?.id)
          .eq('question_order', previousQuestionOrder)
          .single();
        
        if (data) {
          setPreviousAnswer(data);
        }
      }
    };

    fetchPreviousAnswer();
  }, [gameState, showPreviousResult, roomId, currentUser?.id]);

  const handleOptionSelect = async (optionNumber: number) => {
    if (!currentQuestion || answerSubmitted || !currentUser) return;
    
    setSelectedOption(optionNumber);
    setAnswerSubmitted(true);
    
    const { currentRound, currentPhase } = gameState!;
    const phaseIndex = currentPhase === 2 ? 0 : 1;
    const questionOrder = (currentRound - 1) * 2 + phaseIndex + 1;
    const startTime = Date.now();
    
    const responseTime = Math.floor((Date.now() - startTime) / 1000);
    const isCorrect = optionNumber === currentQuestion.correct_option;
    
    await supabase
      .from('room_answers')
      .insert({
        room_id: roomId,
        user_id: currentUser.id,
        question_order: questionOrder,
        selected_option: optionNumber,
        response_time: responseTime,
        is_correct: isCorrect
      });
  };

  const getOptionLabel = (index: number) => ['A', 'B', 'C', 'D'][index];
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
  const isAnsweringPhase = gameState && (gameState.currentPhase === 2 || gameState.currentPhase === 4);
  const showTimer = gameState?.status === 'active' && isAnsweringPhase && !gameState.isPaused;

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GraduationCap className="mr-2 h-5 w-5" />
          学生系统 - 第{roundNumber}轮 {phaseName}阶段
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            {/* 答题倒计时 */}
            {showTimer && (
              <div className="flex items-center justify-center p-3 bg-werewolf-dark/40 rounded-md">
                <Clock className="mr-2 h-5 w-5 text-werewolf-purple" />
                <span className="text-lg font-bold text-werewolf-purple">
                  剩余时间: {formatTime(timeRemaining)}
                </span>
              </div>
            )}

            {/* 当前题目 */}
            {currentQuestion && !showPreviousResult ? (
              <>
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">题目</h3>
                  <p className="text-gray-300 leading-relaxed">{currentQuestion.question}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-werewolf-purple">选项</h3>
                  {[1, 2, 3, 4].map((optionNum) => (
                    <Button
                      key={optionNum}
                      variant="outline"
                      className={`w-full p-3 text-left justify-start ${
                        selectedOption === optionNum
                          ? answerSubmitted && optionNum === currentQuestion.correct_option
                            ? 'border-green-500 bg-green-500/20 text-green-300'
                            : answerSubmitted && optionNum !== currentQuestion.correct_option
                              ? 'border-red-500 bg-red-500/20 text-red-300'
                              : 'border-werewolf-purple bg-werewolf-purple/20'
                          : 'border-gray-600 hover:border-werewolf-purple/50'
                      }`}
                      onClick={() => handleOptionSelect(optionNum)}
                      disabled={answerSubmitted}
                    >
                      <span className="font-semibold mr-2">
                        {getOptionLabel(optionNum - 1)}.
                      </span>
                      {getOptionText(optionNum)}
                    </Button>
                  ))}
                </div>
              </>
            ) : showPreviousResult && previousAnswer ? (
              <>
                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">上一阶段题目</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {previousAnswer.room_questions.questions.question}
                  </p>
                </div>

                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">你的答案</h3>
                  <p className={`text-lg font-semibold ${
                    previousAnswer.is_correct ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {getOptionLabel(previousAnswer.selected_option - 1)}. 
                    {previousAnswer.is_correct ? ' 正确' : ' 错误'}
                  </p>
                </div>

                <div className="p-4 bg-werewolf-dark/40 rounded-md">
                  <h3 className="font-semibold text-werewolf-purple mb-2">正确答案与解析</h3>
                  <p className="text-green-400 mb-2">
                    正确答案: {getOptionLabel(previousAnswer.room_questions.questions.correct_option - 1)}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {previousAnswer.room_questions.questions.explanation}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center">
                {!gameState || gameState.status === 'waiting' 
                  ? '游戏尚未开始，请等待法官开始游戏'
                  : gameState.status === 'ended'
                    ? '游戏已结束'
                    : !isAnsweringPhase 
                      ? '当前非答题阶段' 
                      : '当前阶段无题目信息'
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
