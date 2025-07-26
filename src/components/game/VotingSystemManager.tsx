import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Vote, Clock, Users, Gavel } from 'lucide-react';
import VotingPanel from '@/components/voting/VotingPanel';
import { useGameState } from '@/hooks/useGameState';

interface VotingSystemManagerProps {
  roomId: string;
  isJudge?: boolean;
}

export const VotingSystemManager: React.FC<VotingSystemManagerProps> = ({
  roomId,
  isJudge = false
}) => {
  const { gameState } = useGameState(roomId);

  // 检查是否是投票阶段
  const isVotingPhase = gameState?.currentPhase === 1; // 白天阶段可以投票
  const gameStateId = gameState?.id;

  return (
    <div className="space-y-4">
      {/* 投票系统状态概览 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Vote className="h-5 w-5" />
            投票系统
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  当前阶段: {
                    gameState?.currentPhase === 1 ? '白天' :
                    gameState?.currentPhase === 2 ? '傍晚' :
                    gameState?.currentPhase === 3 ? '夜晚' :
                    gameState?.currentPhase === 4 ? '黎明' : '未知'
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">回合 {gameState?.currentRound || 1}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isVotingPhase ? 'default' : 'secondary'}>
                {isVotingPhase ? '可投票' : '非投票阶段'}
              </Badge>
              {isJudge && (
                <Badge variant="outline">
                  <Gavel className="h-3 w-3 mr-1" />
                  法官
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 投票面板 */}
      {gameStateId && (
        <VotingPanel
          roomId={roomId}
          gameStateId={gameStateId}
          currentPhase={gameState?.currentPhase}
          isJudge={isJudge}
        />
      )}

      {/* 投票阶段提示 */}
      {!isVotingPhase && (
        <Card>
          <CardContent className="py-6">
            <div className="text-center text-muted-foreground">
              <Vote className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {gameState?.currentPhase === 3 
                  ? '夜晚阶段 - 等待白天进行投票'
                  : '当前阶段不可投票'
                }
              </p>
              {isJudge && (
                <p className="text-xs mt-1 text-muted-foreground">
                  法官可以在白天阶段开启投票
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};