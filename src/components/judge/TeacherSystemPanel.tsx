
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, Clock } from 'lucide-react';

interface TeacherSystemPanelProps {
  roomId: string;
}

interface CurrentQuestion {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string;
}

const TeacherSystemPanel: React.FC<TeacherSystemPanelProps> = ({ roomId }) => {
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes default
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion | null>(null);
  const [displayRound, setDisplayRound] = useState(1);
  const [displayPhase, setDisplayPhase] = useState('evening');
  
  // 从游戏信息组件获取的当前状态（这里用模拟数据）
  const currentGameRound = 2;
  const currentGamePhase = 'day'; // 可能是 'day', 'evening', 'night', 'dawn'

  // 根据当前游戏阶段确定要显示的问题阶段
  useEffect(() => {
    if (currentGamePhase === 'day') {
      // 白天阶段显示上一个黎明阶段的信息
      setDisplayRound(currentGameRound);
      setDisplayPhase('dawn');
    } else if (currentGamePhase === 'night') {
      // 夜晚阶段显示上一个傍晚阶段的信息
      setDisplayRound(currentGameRound);
      setDisplayPhase('evening');
    } else if (currentGamePhase === 'evening') {
      // 傍晚阶段显示当前阶段信息
      setDisplayRound(currentGameRound);
      setDisplayPhase('evening');
    } else if (currentGamePhase === 'dawn') {
      // 黎明阶段显示当前阶段信息
      setDisplayRound(currentGameRound);
      setDisplayPhase('dawn');
    }
  }, [currentGameRound, currentGamePhase]);

  // Mock data for demonstration
  useEffect(() => {
    setCurrentQuestion({
      id: '1',
      question: '在狼人杀游戏中，预言家的主要作用是什么？',
      option_a: '每晚可以查验一名玩家的身份',
      option_b: '每晚可以毒死一名玩家',
      option_c: '每晚可以保护一名玩家',
      option_d: '每晚可以与狼人队友交流',
      correct_option: 1,
      explanation: '预言家是神民阵营的重要角色，每晚可以查验一名玩家的身份（好人或狼人），是好人阵营获取信息的重要途径。'
    });
  }, [displayRound, displayPhase]);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  const getPhaseDisplayName = (phase: string) => {
    switch (phase) {
      case 'evening': return '傍晚';
      case 'dawn': return '黎明';
      default: return phase;
    }
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <GraduationCap className="mr-2 h-5 w-5" />
          教师系统 - 第{displayRound}轮 {getPhaseDisplayName(displayPhase)}阶段
        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-full p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-4">
            {/* 剩余答题时间 */}
            <div className="flex items-center justify-center p-3 bg-werewolf-dark/40 rounded-md">
              <Clock className="mr-2 h-5 w-5 text-werewolf-purple" />
              <span className="text-lg font-bold text-werewolf-purple">
                剩余时间: {formatTime(timeRemaining)}
              </span>
            </div>

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
              <div className="text-center text-gray-400 py-8">
                暂无题目信息
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TeacherSystemPanel;
