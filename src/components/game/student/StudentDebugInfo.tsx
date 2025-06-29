
import React from 'react';

interface StudentDebugInfoProps {
  gameState: any;
  currentQuestion: any;
  questionNotFound: boolean;
  timeIsUp: boolean;
}

const StudentDebugInfo: React.FC<StudentDebugInfoProps> = ({
  gameState,
  currentQuestion,
  questionNotFound,
  timeIsUp
}) => {
  if (!gameState) return null;

  return (
    <div className="p-2 bg-gray-800/40 rounded text-xs text-gray-400">
      调试信息: 轮次={gameState.currentRound}, 阶段={gameState.currentPhase}, 
      计算题目序号={gameState.currentPhase === 2 
        ? (gameState.currentRound - 1) * 2 + 1 
        : gameState.currentPhase === 4 
          ? (gameState.currentRound - 1) * 2 + 2 
          : '非答题阶段'},
      题目状态={currentQuestion ? '已找到' : questionNotFound ? '未找到' : '查询中'}
      {timeIsUp && ', 时间已结束'}
    </div>
  );
};

export default StudentDebugInfo;
