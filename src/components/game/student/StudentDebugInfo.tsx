
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
  dataSource?: 'judge' | 'database' | 'none';
}

const StudentDebugInfo: React.FC<StudentDebugInfoProps> = ({
  gameState,
  currentQuestion,
  questionNotFound,
  timeIsUp,
  linkedQuestionsCount,
  expectedQuestionIndex,
  isLoadingQuestions = false,
  hasQuestionsInRoom = false,
  dataSource = 'none'
}) => {
  if (!gameState && !isLoadingQuestions) return null;

  const getQuestionStatus = () => {
    if (isLoadingQuestions) return '加载中';
    if (!hasQuestionsInRoom) return '房间无题目';
    if (currentQuestion) return '已找到';
    if (questionNotFound) return '未找到';
    return '查询中';
  };

  const getGameStateStatus = () => {
    if (!gameState) return '未初始化';
    return `${gameState.status}`;
  };

  const getDataSourceText = () => {
    switch (dataSource) {
      case 'judge': return '法官导入';
      case 'database': return '数据库直读';
      case 'none': return '无数据源';
      default: return '未知';
    }
  };

  return (
    <div className="p-2 bg-gray-800/40 rounded text-xs text-gray-400">
      调试信息: 游戏状态={getGameStateStatus()}, 
      轮次={gameState?.currentRound || 'N/A'}, 
      阶段={gameState?.currentPhase || 'N/A'}, 
      题目总数={linkedQuestionsCount}, 
      期望题目索引={expectedQuestionIndex},
      题目状态={getQuestionStatus()},
      数据源={getDataSourceText()}
      {timeIsUp && ', 时间已结束'}
      {!hasQuestionsInRoom && !isLoadingQuestions && ', ⚠️房间未设置题目'}
      {isLoadingQuestions && ', 正在加载题目...'}
    </div>
  );
};

export default StudentDebugInfo;
