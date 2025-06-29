
import React from 'react';

interface StudentDebugInfoProps {
  gameState: any;
  currentQuestion: any;
  questionNotFound: boolean;
  timeIsUp: boolean;
  linkedQuestionsCount: number;
  expectedQuestionIndex: number;
  isLoadingQuestions?: boolean;
}

const StudentDebugInfo: React.FC<StudentDebugInfoProps> = ({
  gameState,
  currentQuestion,
  questionNotFound,
  timeIsUp,
  linkedQuestionsCount,
  expectedQuestionIndex,
  isLoadingQuestions = false
}) => {
  if (!gameState) return null;

  return (
    <div className="p-2 bg-gray-800/40 rounded text-xs text-gray-400">
      调试信息: 轮次={gameState.currentRound}, 阶段={gameState.currentPhase}, 
      题目总数={linkedQuestionsCount}, 
      期望题目索引={expectedQuestionIndex},
      题目状态={isLoadingQuestions ? '加载中' : currentQuestion ? '已找到' : questionNotFound ? '未找到' : '查询中'}
      {timeIsUp && ', 时间已结束'}
    </div>
  );
};

export default StudentDebugInfo;
