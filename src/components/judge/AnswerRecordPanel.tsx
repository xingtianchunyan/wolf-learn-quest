
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';

interface AnswerRecordPanelProps {
  roomId: string;
}

interface PlayerAnswer {
  playerId: string;
  playerName: string;
  selectedOption: number;
  remainingTime: number;
  isCorrect: boolean;
}

interface AnswerRecord {
  round: number;
  phase: string;
  questionText: string;
  correctOption: number;
  answers: PlayerAnswer[];
}

const AnswerRecordPanel: React.FC<AnswerRecordPanelProps> = ({ roomId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Mock data for demonstration
  const answerRecords: AnswerRecord[] = [
    {
      round: 1,
      phase: '傍晚',
      questionText: '在狼人杀游戏中，预言家的主要作用是什么？',
      correctOption: 1,
      answers: [
        { playerId: 'player1', playerName: '玩家1', selectedOption: 1, remainingTime: 45, isCorrect: true },
        { playerId: 'player2', playerName: '玩家2', selectedOption: 2, remainingTime: 32, isCorrect: false },
        { playerId: 'player3', playerName: '玩家3', selectedOption: 1, remainingTime: 28, isCorrect: true },
        { playerId: 'player4', playerName: '玩家4', selectedOption: 3, remainingTime: 15, isCorrect: false },
      ]
    },
    {
      round: 1,
      phase: '黎明',
      questionText: '女巫的解药可以救活谁？',
      correctOption: 2,
      answers: [
        { playerId: 'player1', playerName: '玩家1', selectedOption: 2, remainingTime: 50, isCorrect: true },
        { playerId: 'player2', playerName: '玩家2', selectedOption: 1, remainingTime: 40, isCorrect: false },
        { playerId: 'player3', playerName: '玩家3', selectedOption: 2, remainingTime: 35, isCorrect: true },
        { playerId: 'player4', playerName: '玩家4', selectedOption: 4, remainingTime: 20, isCorrect: false },
      ]
    }
  ];

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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" />
            答题记录
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400">
              {currentPage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        {currentRecord ? (
          <div className="space-y-4 h-full">
            {/* 题目信息 */}
            <div className="p-3 bg-werewolf-dark/40 rounded-md flex-shrink-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-werewolf-purple">
                  第{currentRecord.round}轮 - {currentRecord.phase}阶段
                </h3>
                <span className="text-sm text-gray-400">
                  正确答案: {getOptionLabel(currentRecord.correctOption)}
                </span>
              </div>
              <p className="text-sm text-gray-300">{currentRecord.questionText}</p>
            </div>

            {/* 答题记录列表 */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-2 pr-4">
                  {currentRecord.answers.map((answer, index) => (
                    <div 
                      key={answer.playerId}
                      className="p-3 bg-werewolf-dark/40 rounded-md border border-gray-600"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-300">
                            {answer.playerName}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            answer.isCorrect 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {getOptionLabel(answer.selectedOption)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            剩余: {formatTime(answer.remainingTime)}
                          </span>
                          {answer.isCorrect ? (
                            <span className="text-green-400">✓</span>
                          ) : (
                            <span className="text-red-400">✗</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            暂无答题记录
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnswerRecordPanel;
