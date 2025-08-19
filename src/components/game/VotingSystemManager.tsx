import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Vote, Clock, Users, Gavel } from 'lucide-react';
import VotingPanel from '@/components/voting/VotingPanel';
import { useGameState } from '@/hooks/useGameState';
import { useVotingSystem } from '@/hooks/useVotingSystem';

interface VotingSystemManagerProps {
  roomId: string;
  isJudge: boolean; // 移除默认值，强制上层传入
}

export const VotingSystemManager: React.FC<VotingSystemManagerProps> = ({
  roomId,
  isJudge
}) => {
  const { gameState } = useGameState(roomId);
  const { currentSession, createVotingSession, fetchCurrentSession } = useVotingSystem(roomId, gameState?.id);

  // 检查是否是投票阶段 - 白天和傍晚阶段都显示投票系统
  const isVotingPhase = gameState?.currentPhase === 1 || gameState?.currentPhase === 2; // 白天和傍晚阶段
  const gameStateId = gameState?.id;

  // 自动创建投票会话 - 只在白天阶段创建，傍晚阶段显示白天的投票结果
  useEffect(() => {
    if (gameState?.currentPhase === 1 && gameStateId) {
      // 只在白天阶段创建投票会话
      fetchCurrentSession(gameState.currentRound, gameState.currentPhase).then(() => {
        setTimeout(() => {
          if (!currentSession) {
            createVotingSession(gameState.currentRound, gameState.currentPhase, 'day_vote');
          }
        }, 100);
      });
    } else if (gameState?.currentPhase === 2 && gameStateId) {
      // 傍晚阶段，获取白天阶段的投票会话（phase 1）
      fetchCurrentSession(gameState.currentRound, 1);
    }
  }, [gameState?.currentPhase, gameState?.currentRound, gameStateId, fetchCurrentSession, createVotingSession, currentSession]);

  return (
    <div className="space-y-4">

      {/* 投票面板 - 白天和傍晚阶段都显示 */}
      {gameStateId && isVotingPhase && (
        <VotingPanel
          roomId={roomId}
          gameStateId={gameStateId}
          currentPhase={gameState?.currentPhase}
          isJudge={isJudge}
        />
      )}

      {/* 非投票阶段提示 */}
      {!isVotingPhase && (
        <Card>
          <CardContent className="py-6">
            <div className="text-center text-muted-foreground">
              <Vote className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {gameState?.currentPhase === 3 
                  ? '夜晚阶段 - 投票已结束'
                  : gameState?.currentPhase === 4
                  ? '黎明阶段 - 准备新的一天'
                  : '当前阶段不可投票'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};