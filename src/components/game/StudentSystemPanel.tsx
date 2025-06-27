
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, BookOpen, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface StudentSystemPanelProps {
  roomId: string;
}

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string;
}

interface RoomQuestion {
  id: string;
  question_order: number;
  questions: Question;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId }) => {
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<RoomQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { gameState } = useGameState(roomId);
  const { currentUser } = useAuth();

  // 获取当前阶段的题目
  useEffect(() => {
    const fetchCurrentQuestion = async () => {
      if (!gameState || !currentUser?.id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // 计算当前题目顺序
        const currentRound = gameState.currentRound || 1;
        const currentPhase = gameState.currentPhase || 1;
        
        let questionOrder = 0;
        if (currentPhase === 2) { // 傍晚阶段
          questionOrder = (currentRound - 1) * 2 + 1;
        } else if (currentPhase === 4) { // 黎明阶段
          questionOrder = (currentRound - 1) * 2 + 2;
        } else {
          // 非答题阶段
          setCurrentQuestion(null);
          setLoading(false);
          return;
        }

        console.log('Fetching question for order:', questionOrder);

        // 从 room_questions 表获取题目
        const { data: roomQuestion, error: questionError } = await supabase
          .from('room_questions')
          .select(`
            id,
            question_order,
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

        if (questionError) {
          console.error('Error fetching question:', questionError);
          setError('获取题目失败');
          return;
        }

        if (!roomQuestion || !roomQuestion.questions) {
          setError('未找到当前阶段的题目');
          return;
        }

        setCurrentQuestion(roomQuestion as RoomQuestion);

        // 检查用户是否已经答过这道题
        const { data: existingAnswer } = await supabase
          .from('room_answers')
          .select('*')
          .eq('room_id', roomId)
          .eq('user_id', currentUser.id)
          .eq('question_order', questionOrder)
          .single();

        if (existingAnswer) {
          setSelectedAnswer(existingAnswer.selected_option);
          setIsAnswered(true);
          setIsCorrect(existingAnswer.is_correct || false);
          setShowResult(true);
        } else {
          // 重置答题状态
          setSelectedAnswer(null);
          setIsAnswered(false);
          setShowResult(false);
          setIsCorrect(false);
        }

      } catch (err) {
        console.error('Error in fetchCurrentQuestion:', err);
        setError('获取题目时发生错误');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentQuestion();
  }, [roomId, gameState, currentUser?.id]);

  // 倒计时逻辑
  useEffect(() => {
    if (timeRemaining > 0 && !isAnswered && gameState?.status === 'active') {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isAnswered) {
      handleTimeout();
    }
  }, [timeRemaining, isAnswered, gameState?.status]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setShowResult(true);
    setIsCorrect(false);
  };

  const handleAnswerSelect = async (optionIndex: number) => {
    if (isAnswered || !currentQuestion || !currentUser?.id || submitting) return;
    
    try {
      setSubmitting(true);
      const startTime = Date.now();
      
      setSelectedAnswer(optionIndex);
      setIsAnswered(true);
      
      const correct = optionIndex === currentQuestion.questions.correct_option;
      setIsCorrect(correct);
      
      const responseTime = Math.floor((Date.now() - startTime) / 1000);
      
      // 保存答案到数据库
      const { error: saveError } = await supabase
        .from('room_answers')
        .insert({
          room_id: roomId,
          user_id: currentUser.id,
          room_question_id: currentQuestion.id,
          question_order: currentQuestion.question_order,
          selected_option: optionIndex,
          is_correct: correct,
          response_time: responseTime
        });

      if (saveError) {
        console.error('Error saving answer:', saveError);
      }
      
      // 延迟显示结果
      setTimeout(() => {
        setShowResult(true);
      }, 500);
      
    } catch (err) {
      console.error('Error handling answer:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionClassName = (optionIndex: number) => {
    let baseClass = "w-full p-3 text-left border-2 rounded-md transition-all duration-300 ";
    
    if (!isAnswered) {
      baseClass += "border-werewolf-purple/30 hover:border-werewolf-purple/50 hover:bg-werewolf-purple/10";
    } else if (selectedAnswer === optionIndex) {
      if (isCorrect) {
        baseClass += "border-green-500 bg-green-500/20 text-green-300";
      } else {
        baseClass += "border-red-500 bg-red-500/20 text-red-300";
      }
    } else if (showResult && optionIndex === currentQuestion?.questions.correct_option) {
      baseClass += "border-green-500 bg-green-500/10 text-green-300";
    } else {
      baseClass += "border-gray-500/30 text-gray-400";
    }
    
    return baseClass;
  };

  // 获取当前阶段显示文本
  const getCurrentPhaseText = () => {
    if (!gameState) return '等待开始';
    
    const phase = gameState.currentPhase;
    if (phase === 2) return '傍晚答题阶段';
    if (phase === 4) return '黎明答题阶段';
    return '非答题阶段';
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            学生系统
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono text-sm ${timeRemaining <= 30 ? 'text-red-400' : 'text-werewolf-purple'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-2">
            {/* 当前阶段提示 */}
            <div className="p-3 bg-werewolf-dark/20 rounded-md border border-werewolf-purple/30">
              <div className="text-sm text-werewolf-purple font-medium">
                {getCurrentPhaseText()}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-werewolf-purple" />
                <span className="ml-2 text-gray-400">加载题目中...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-400 mb-2">{error}</p>
                <p className="text-gray-500 text-sm">请等待题目加载或联系管理员</p>
              </div>
            ) : !currentQuestion ? (
              <div className="text-center py-8">
                <p className="text-gray-400">当前阶段无答题任务</p>
                <p className="text-gray-500 text-sm">等待进入答题阶段</p>
              </div>
            ) : (
              <>
                {/* 题目 */}
                <div className="p-4 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">
                    {currentQuestion.questions.question}
                  </h3>
                  
                  {/* 选项 */}
                  <div className="space-y-3">
                    {[
                      currentQuestion.questions.option_a,
                      currentQuestion.questions.option_b,
                      currentQuestion.questions.option_c,
                      currentQuestion.questions.option_d
                    ].map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleAnswerSelect(index + 1)}
                        disabled={isAnswered || submitting}
                        className={getOptionClassName(index + 1)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-left flex-1">
                            {String.fromCharCode(65 + index)}. {option}
                          </span>
                          {isAnswered && selectedAnswer === index + 1 && (
                            <div className="ml-2 flex-shrink-0">
                              {isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-green-400" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-400" />
                              )}
                            </div>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                  
                  {submitting && (
                    <div className="mt-3 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-werewolf-purple" />
                      <span className="ml-2 text-sm text-gray-400">提交中...</span>
                    </div>
                  )}
                </div>
                
                {/* 答案解析 */}
                {showResult && (
                  <div className="p-4 bg-werewolf-dark/20 rounded-md border border-werewolf-purple/30">
                    <h4 className="text-werewolf-purple font-semibold mb-2">答案解析</h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {currentQuestion.questions.explanation}
                    </p>
                    <div className="text-sm">
                      <span className="text-gray-400">正确答案: </span>
                      <span className="text-green-400">
                        {String.fromCharCode(64 + currentQuestion.questions.correct_option)}. {
                          [
                            currentQuestion.questions.option_a,
                            currentQuestion.questions.option_b,
                            currentQuestion.questions.option_c,
                            currentQuestion.questions.option_d
                          ][currentQuestion.questions.correct_option - 1]
                        }
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentSystemPanel;
