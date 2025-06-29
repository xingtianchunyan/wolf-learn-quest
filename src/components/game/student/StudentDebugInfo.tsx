
import React from 'react';

interface StudentDebugInfoProps {
  gameState: any;
  currentQuestion: any;
  questionNotFound: boolean;
  timeIsUp: boolean;
  linkedQuestionsCount: number;
  expectedQuestionIndex: number;
  isLoadingQuestions?: boolean;
  hasQuestionsInRoom?: boolean;
}

const StudentDebugInfo: React.FC<StudentDebugInfoProps> = ({
  gameState,
  currentQuestion,
  questionNotFound,
  timeIsUp,
  linkedQuestionsCount,
  expectedQuestionIndex,
  isLoadingQuestions = false,
  hasQuestionsInRoom = false
}) => {
  if (!gameState) return null;

  const getQuestionStatus = () => {
    if (isLoadingQuestions) return '加载中';
    if (!hasQuestionsInRoom) return '房间无题目';
    if (currentQuestion) return '已找到';
    if (questionNotFound) return '未找到';
    return '查询中';
  };

  return (
    <div className="p-2 bg-gray-800/40 rounded text-xs text-gray-400">
      调试信息: 轮次={gameState.currentRound}, 阶段={gameState.currentPhase}, 
      题目总数={linkedQuestionsCount}, 
      期望题目索引={expectedQuestionIndex},
      题目状态={getQuestionStatus()}
      {timeIsUp && ', 时间已结束'}
      {!hasQuestionsInRoom && ', ⚠️房间未设置题目'}
    </div>
  );
};

export default StudentDebugInfo;
