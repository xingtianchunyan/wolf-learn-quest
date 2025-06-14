
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question } from './types/questionBank';

interface QuestionPreviewProps {
  questions: Question[];
  selectedQuestions: Question[];
  currentIndex: number;
  loading: boolean;
  onIndexChange: (index: number) => void;
  onToggleSelection: (question: Question) => void;
}

const QuestionPreview: React.FC<QuestionPreviewProps> = ({
  questions,
  selectedQuestions,
  currentIndex,
  loading,
  onIndexChange,
  onToggleSelection
}) => {
  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return '简单';
      case 2: return '容易';
      case 3: return '中等';
      case 4: return '困难';
      case 5: return '极难';
      default: return '未知';
    }
  };

  const getPhaseLabel = (index: number) => {
    const round = Math.floor(index / 2) + 1;
    const phase = index % 2 === 0 ? '傍晚' : '黎明';
    return `第${round}轮 ${phase}阶段`;
  };

  const currentQuestion = questions[currentIndex];

  return (
    <Card className="bg-werewolf-dark/40 border-werewolf-purple/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple text-lg">
          题目预览
        </CardTitle>
        <p className="text-gray-400 text-sm">
          已选择 {selectedQuestions.length}/18 道题目
        </p>
      </CardHeader>
      <CardContent className="h-[calc(100%-100px)] flex flex-col">
        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-400">加载中...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-400">暂无题目</p>
          </div>
        ) : (
          <>
            <div className="flex-1 mb-4">
              <Card 
                className={`h-full cursor-pointer transition-all duration-200 ${
                  selectedQuestions.some(q => q.id === currentQuestion?.id)
                    ? 'bg-werewolf-purple/20 border-werewolf-purple'
                    : 'bg-werewolf-dark/60 border-werewolf-purple/30 hover:bg-werewolf-dark/80'
                }`}
                onClick={() => currentQuestion && onToggleSelection(currentQuestion)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-werewolf-purple text-lg">
                        题目 {currentIndex + 1}
                      </CardTitle>
                      {currentQuestion && (
                        <Badge className={`text-white ${getDifficultyColor(currentQuestion.difficulty || 1)}`}>
                          {getDifficultyLabel(currentQuestion.difficulty || 1)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedQuestions.some(q => q.id === currentQuestion?.id) && (
                        <>
                          <Badge className="bg-green-500 text-white">
                            {getPhaseLabel(selectedQuestions.findIndex(q => q.id === currentQuestion?.id))}
                          </Badge>
                          <span className="text-green-400">✓</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentQuestion && (
                    <>
                      <div>
                        <h3 className="text-white font-medium mb-2">题干：</h3>
                        <p className="text-gray-300 text-sm">{currentQuestion.question}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white font-medium">选项：</h4>
                        <div className="space-y-1 text-sm">
                          <p className={`text-gray-300 ${currentQuestion.correct_option === 1 ? 'text-green-400 font-medium' : ''}`}>
                            A. {currentQuestion.option_a}
                          </p>
                          <p className={`text-gray-300 ${currentQuestion.correct_option === 2 ? 'text-green-400 font-medium' : ''}`}>
                            B. {currentQuestion.option_b}
                          </p>
                          {currentQuestion.option_c && (
                            <p className={`text-gray-300 ${currentQuestion.correct_option === 3 ? 'text-green-400 font-medium' : ''}`}>
                              C. {currentQuestion.option_c}
                            </p>
                          )}
                          {currentQuestion.option_d && (
                            <p className={`text-gray-300 ${currentQuestion.correct_option === 4 ? 'text-green-400 font-medium' : ''}`}>
                              D. {currentQuestion.option_d}
                            </p>
                          )}
                        </div>
                      </div>
                      {currentQuestion.explanation && (
                        <div className="text-xs text-gray-400">
                          解释：{currentQuestion.explanation}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        来源：{currentQuestion.source_file}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="border-werewolf-purple/30 text-werewolf-purple hover:bg-werewolf-purple hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 mx-4">
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, questions.length - 1)}
                  value={currentIndex}
                  onChange={(e) => onIndexChange(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onIndexChange(Math.min(questions.length - 1, currentIndex + 1))}
                disabled={currentIndex >= questions.length - 1}
                className="border-werewolf-purple/30 text-werewolf-purple hover:bg-werewolf-purple hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionPreview;
