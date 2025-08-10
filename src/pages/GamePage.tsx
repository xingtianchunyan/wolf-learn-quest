
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import GameStateDisplay from '@/components/game/GameStateDisplay';
import StudentSystemPanel from '@/components/game/StudentSystemPanel';
import StudentAnswerRecordPanel from '@/components/game/StudentAnswerRecordPanel';
import { VotingSystemManager } from '@/components/game/VotingSystemManager';
import SkillSystemManager from '@/components/game/SkillSystemManager';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useRoleStates } from '@/hooks/useRoleStates';
import { useEveningRefresh } from '@/hooks/useEveningRefresh';

const GamePage = () => {
  const { id: roomId } = useParams();
  const { t } = useLanguage();
  const { gameState } = useGameState(roomId!);
  useEveningRefresh(gameState);
  const { players } = usePlayersRealtime(roomId!);
  const { roleDesigns } = useRoleDesigns();
  const { roleStates } = useRoleStates(gameState?.id);
  
  // Get current user's role information
  const currentUserId = 'current-user-id'; // This should come from auth context
  const currentRoleState = roleStates.find(rs => rs.user_id === currentUserId);
  const currentRoleDesign = roleDesigns.find(rd => rd.id === currentRoleState?.role_id);
  
  // Determine if user is judge
  const isJudge = false; // This should come from room/user context
  
  // Check current phase to determine which system to show
  const isVotingPhase = gameState?.currentPhase === 1 || gameState?.currentPhase === 2; // Day and evening
  const isSkillPhase = gameState?.currentPhase === 3 || gameState?.currentPhase === 4; // Night and dawn

  if (!roomId) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">房间ID不存在</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{
          height: 'calc(100vh - 12rem)'
        }}>
          {/* Left Column - Student System and Answer Records */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-full">
            <div className="h-1/2">
              <StudentSystemPanel roomId={roomId} />
            </div>
            <div className="h-1/2">
              <StudentAnswerRecordPanel roomId={roomId} />
            </div>
          </div>
          
          {/* Center Column - Game State Display */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-full">
            <div className="h-1/3">
              <GameStateDisplay roomId={roomId} />
            </div>
            <div className="h-2/3">
              <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
                <CardContent className="p-6 h-full overflow-y-auto">
                  <h2 className="text-2xl font-bold text-werewolf-purple mb-4">游戏主界面</h2>
                  
                  {/* 根据游戏阶段显示不同的系统 */}
                  {isVotingPhase && (
                    <VotingSystemManager roomId={roomId} isJudge={isJudge} />
                  )}
                  
                  {isSkillPhase && gameState && (
                    <SkillSystemManager
                      roomId={roomId}
                      gameStateId={gameState.id}
                      userId={currentUserId}
                      isJudge={isJudge}
                      currentPhase={gameState.currentPhase}
                      roleState={currentRoleState}
                      roleDesign={currentRoleDesign}
                      players={players.map(p => ({
                        userId: p.userId || p.id,
                        name: p.name || '未知玩家',
                        roleStatus: roleStates.find(rs => rs.user_id === p.userId)?.role_status || 1,
                        isAlive: roleStates.find(rs => rs.user_id === p.userId)?.role_status !== 4
                      }))}
                    />
                  )}
                  
                  {/* 等待阶段或游戏未开始 */}
                  {!gameState && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">等待游戏开始...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Right Column - Side Panel */}
          <div className="lg:col-span-3">
            <div className="space-y-4 h-full overflow-y-auto">              
              {/* 聊天区 */}
              <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-werewolf-purple mb-3">聊天区</h3>
                <p className="text-sm text-gray-400">游戏聊天和讨论区域</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GamePage;
