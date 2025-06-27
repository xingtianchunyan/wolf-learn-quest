
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ClipboardList, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface StudentAnswerRecordPanelProps {
  roomId: string;
}

interface AnswerRecord {
  round: number;
  phase: string;
  questionText: string;
  selectedOption: number | null;
  responseTime: number | null;
  isCorrect: boolean | null;
  explanation?: string;
  correctOption?: number;
  showExplanation: boolean;
  options: string[];
}

const StudentAnswerRecordPanel: React.FC<StudentAnswerRecordPanelProps> = ({ roomId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { gameState } = useGameState(roomId);
  const { currentUser } = useAuth();

  // 获取答题记录
  useEffect(() => {
    const fetchAnswerRecords = async () => {
      if (!currentUser?.id) return;

      try {
        setLoading(true);
        setError(null);

        console.log('Fetching answer records for room:', roomId, 'user:', currentUser.id);

        // 获取房间的所有题目
        const { data: roomQuestions, error: questionsError } = await supabase
          .from('room_questions')
          .select(`
            question_order,
            questions (
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
          .order('question_order');

        if (questionsError) {
          console.error('Error fetching room questions:', questionsError);
          setError('获取题目失败');
          return;
        }

        if (!roomQuestions || roomQuestions.length === 0) {
          console.log('No questions found for room:', roomId);
          setAnswerRecords([]);
          return;
        }

        // 获取用户的答题记录
        const { data: userAnswers, error: answersError } = await supabase
          .from('room_answers')
          .select('*')
          .eq('room_id', roomId)
          .eq('user_id', currentUser.id)
          .order('question_order');

        if (answersError) {
          console.error('Error fetching user answers:', answersError);
          setError('获取答题记录失败');
          return;
        }

        console.log('Room questions:', roomQuestions);
        console.log('User answers:', userAnswers);

        // 构建答题记录
        const records: AnswerRecord[] = roomQuestions.map((rq, index) => {
          const round = Math.floor(index / 2) + 1;
          const phase = index % 2 === 0 ? '傍晚' : '黎明';
          const userAnswer = userAnswers?.find(ua => ua.question_order === rq.question_order);
          
          // 判断是否应该显示解析（已完成的阶段）
          const currentRound = gameState?.currentRound ?? 1;
          const currentPhase = gameState?.currentPhase ?? 1;
          const currentQuestionOrder = (currentRound - 1) * 2 + (currentPhase === 2 ? 1 : currentPhase === 4 ? 2 : 0);
          const showExplanation = rq.question_order < currentQuestionOrder;

          if (!rq.questions) {
            return {
              round,
              phase,
              questionText: '题目数据错误',
              selectedOption: null,
              responseTime: null,
              isCorrect: null,
              showExplanation: false,
              options: []
            };
          }

          return {
            round,
            phase,
            questionText: rq.questions.question,
            selectedOption: userAnswer?.selected_option || null,
            responseTime: userAnswer?.response_time || null,
            isCorrect: userAnswer?.is_correct || null,
            explanation: rq.questions.explanation,
            correctOption: rq.questions.correct_option,
            showExplanation,
            options: [
              rq.questions.option_a,
              rq.questions.option_b,
              rq.questions.option_c,
              rq.questions.option_d
            ]
          };
        });

        setAnswerRecords(records);
        console.log('Answer records:', records);

      } catch (err) {
        console.error('Error in fetchAnswerRecords:', err);
        setError('获取数据时发生错误');
      } finally {
        setLoading(false);
      }
    };

    fetchAnswerRecords();
  }, [roomId, currentUser?.id, gameState]);

  const totalPages = Math.max(1, answerRecords.length);
  const currentRecord = answerRecords[currentPage];

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];
  };

  const formatTime = (seconds: number) => {
    if (typeof seconds !== 'number' || seconds < 0) {
      return '00:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" />
            我的答题记录
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 0 || answerRecords.length === 0}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400 min-w-[3rem] text-center">
              {answerRecords.length > 0 ? currentPage + 1 : 0} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1 || answerRecords.length === 0}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-2">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-werewolf-purple" />
                <span className="ml-2 text-gray-400">加载记录中...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-400 mb-2">{error}</p>
                <p className="text-gray-500 text-sm">请刷新页面重试</p>
              </div>
            ) : answerRecords.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-2">暂无答题记录</p>
                <p className="text-gray-500 text-sm">完成答题后记录将显示在这里</p>
              </div>
            ) : currentRecord ? (
              <>
                {/* 题目信息 */}
                <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-werewolf-purple">
                      第{currentRecord.round}轮 - {currentRecord.phase}阶段
                    </h3>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{currentRecord.questionText}</p>
                </div>

                {/* 我的答题情况 */}
                <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
                  <h3 className="font-semibold text-werewolf-purple mb-2">我的答题情况</h3>
                  {currentRecord.selectedOption !== null ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300">选择答案:</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          currentRecord.isCorrect 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {getOptionLabel(currentRecord.selectedOption)}
                        </span>
                        {currentRecord.isCorrect !== null && (
                          <span className={currentRecord.isCorrect ? 'text-green-400' : 'text-red-400'}>
                            {currentRecord.isCorrect ? '✓ 正确' : '✗ 错误'}
                          </span>
                        )}
                      </div>
                      {currentRecord.responseTime !== null && (
                        <div className="text-sm text-gray-400">
                          用时: {formatTime(currentRecord.responseTime)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">超时未答</span>
                  )}
                </div>

                {/* 答案解析（仅在已完成的阶段显示） */}
                {currentRecord.showExplanation && (
                  <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
                    <h3 className="font-semibold text-werewolf-purple mb-2">答案解析</h3>
                    <div className="space-y-2">
                      <div className="text-green-400">
                        正确答案: {currentRecord.correctOption ? getOptionLabel(currentRecord.correctOption) : '未知'}
                        {currentRecord.correctOption && currentRecord.options[currentRecord.correctOption - 1] && (
                          <span className="text-gray-300 ml-2">
                            ({currentRecord.options[currentRecord.correctOption - 1]})
                          </span>
                        )}
                      </div>
                      {currentRecord.explanation && (
                        <p className="text-gray-300 leading-relaxed text-sm">{currentRecord.explanation}</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">数据加载中...</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentAnswerRecordPanel;
