
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface StudentSystemPanelProps {
  roomId: string;
}

const StudentSystemPanel: React.FC<StudentSystemPanelProps> = ({ roomId }) => {
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 模拟题目数据
  const currentQuestion = {
    id: '1',
    question: '狼人杀游戏中，预言家的技能是什么？',
    options: [
      '每晚可以查验一名玩家的身份',
      '每晚可以救一名玩家',
      '每晚可以杀死一名玩家',
      '可以与其他狼人交流'
    ],
    correctAnswer: 0,
    explanation: '预言家是好人阵营的角色，每晚可以查验一名玩家的真实身份。'
  };

  // 倒计时逻辑
  useEffect(() => {
    if (timeRemaining > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isAnswered) {
      // 时间到了，自动提交
      handleTimeout();
    }
  }, [timeRemaining, isAnswered]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setShowResult(true);
    setIsCorrect(false);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    setIsCorrect(optionIndex === currentQuestion.correctAnswer);
    
    // 延迟显示结果
    setTimeout(() => {
      setShowResult(true);
    }, 500);
    
    // TODO: 保存答案到数据库
    console.log('保存答案:', {
      roomId,
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
      isCorrect: optionIndex === currentQuestion.correctAnswer
    });
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
    } else if (showResult && optionIndex === currentQuestion.correctAnswer) {
      baseClass += "border-green-500 bg-green-500/10 text-green-300";
    } else {
      baseClass += "border-gray-500/30 text-gray-400";
    }
    
    return baseClass;
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
            <span className={`font-mono ${timeRemaining <= 30 ? 'text-red-400' : 'text-werewolf-purple'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {/* 题目 */}
            <div className="p-4 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                {currentQuestion.question}
              </h3>
              
              {/* 选项 */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={getOptionClassName(index)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{String.fromCharCode(65 + index)}. {option}</span>
                      {isAnswered && selectedAnswer === index && (
                        <div className="ml-2">
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
            </div>
            
            {/* 答案解析 */}
            {showResult && (
              <div className="p-4 bg-werewolf-dark/20 rounded-md border border-werewolf-purple/30">
                <h4 className="text-werewolf-purple font-semibold mb-2">答案解析</h4>
                <p className="text-gray-300 text-sm">
                  {currentQuestion.explanation}
                </p>
                <div className="mt-2 text-sm">
                  <span className="text-gray-400">正确答案: </span>
                  <span className="text-green-400">
                    {String.fromCharCode(65 + currentQuestion.correctAnswer)}. {currentQuestion.options[currentQuestion.correctAnswer]}
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentSystemPanel;
