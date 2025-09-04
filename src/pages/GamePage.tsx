
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import GameStateDisplay from '@/components/game/GameStateDisplay';
import StudentSystemPanel from '@/components/game/StudentSystemPanel';
import StudentAnswerRecordPanel from '@/components/game/StudentAnswerRecordPanel';
import GameInfoPanel from '@/components/game/GameInfoPanel';
import VotingPanel from '@/components/voting/VotingPanel';
import GameSkillPanel from '@/components/game/GameSkillPanel';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useRoleStates } from '@/hooks/useRoleStates';
import { useEveningRefresh } from '@/hooks/useEveningRefresh';
import { useRoomTransition } from '@/hooks/useRoomTransition';
import { useAuth } from '@/providers/AuthProvider';
import { usePermissions } from '@/contexts/PermissionContext';
import MultiChannelChat from '@/components/chat/MultiChannelChat';

const GamePage = () => {
  const { id: roomId } = useParams();
  const { t } = useLanguage();
  
  // 目标选择状态 - 必须在所有条件检查之前
  const [selectedTargetId, setSelectedTargetId] = useState<string>('');
  
  const { gameState } = useGameState(roomId!);
  useEveningRefresh(gameState);
  const { players } = usePlayersRealtime(roomId!);
  const { roleDesigns } = useRoleDesigns();
  const { roleStates } = useRoleStates(roomId!);
  
  // 自动在游戏结束后迁移到新房间
  useRoomTransition(roomId, gameState?.status);
  
  // 权限和认证检查
  const { currentUser, requireAuth } = useAuth();
  const { isJudge, isRoomParticipant, loading: permissionsLoading } = usePermissions(roomId);
  
  // 要求用户登录
  if (!requireAuth()) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">请先登录以访问游戏</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Get current user's role information - 只有登录用户才能获取
  const currentUserId = currentUser!.id; // 此时已确保用户已登录
  const currentRoleState = roleStates.find(rs => rs.user_id === currentUserId);
  const currentRoleDesign = roleDesigns.find(rd => rd.id === currentRoleState?.role_id);
  
  // Check current phase to determine which system to show
  // 白天(1)和傍晚(2)阶段显示投票系统，夜晚(3)和黎明(4)阶段显示技能系统
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

  // 检查权限加载状态
  if (permissionsLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
            <p className="text-gray-400 mb-4">检查权限中...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  // 检查是否是房间参与者
  if (!isRoomParticipant) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">您不是此房间的参与者</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4 h-[calc(100vh-4rem)] flex flex-col">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden">
          {/* Left Column - Student System and Answer Records */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-hidden">
            <div className="flex-1 min-h-0">
              <StudentSystemPanel roomId={roomId} />
            </div>
            <div className="flex-1 min-h-0">
              <StudentAnswerRecordPanel roomId={roomId} />
            </div>
          </div>
          
          {/* Center Column - Game Info and Main Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-full overflow-hidden">
            <div className="flex-shrink-0" style={{height: '40%'}}>
              <GameInfoPanel 
                roomId={roomId} 
                selectedTargetId={selectedTargetId}
                onTargetSelect={setSelectedTargetId}
                canSelectTargets={isVotingPhase || isSkillPhase}
              />
            </div>
            <div className="flex-1 min-h-0">
              <Card className="bg-werewolf-card border-werewolf-purple/30 h-full">
                <CardContent className="p-6 h-full overflow-y-auto">
                  <h2 className="text-2xl font-bold text-werewolf-purple mb-4">游戏主界面</h2>
                  
                  {/* 根据游戏阶段显示不同的系统 */}
                   {isVotingPhase && gameState && (
                     <VotingPanel 
                       roomId={roomId} 
                       gameStateId={gameState.id}
                       currentPhase={gameState.currentPhase}
                       currentRound={gameState.currentRound}
                       isJudge={isJudge}
                       selectedTargetId={selectedTargetId}
                       onTargetSelect={setSelectedTargetId}
                     />
                   )}
                  
                   {isSkillPhase && gameState && currentRoleState && currentRoleDesign && (
                     <GameSkillPanel
                       roomId={roomId}
                       gameStateId={gameState.id}
                       userId={currentUserId}
                       currentPhase={gameState.currentPhase}
                       roleState={currentRoleState}
                       roleDesign={currentRoleDesign}
                       players={players.map(p => ({
                         userId: p.userId || p.id,
                         name: p.name || '未知玩家',
                         roleStatus: roleStates.find(rs => rs.user_id === p.userId)?.role_status || 1
                       }))}
                       currentRound={gameState.currentRound}
                       selectedTargetId={selectedTargetId}
                       onTargetSelect={setSelectedTargetId}
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
          <div className="lg:col-span-3 h-full overflow-hidden">
            <div className="h-full flex flex-col">              
              {/* 聊天区 */}
              <MultiChannelChat
                roomId={roomId}
                currentUser={currentUser}
                gamePhase={gameState?.currentPhase === 1 ? 'day' : gameState?.currentPhase === 2 ? 'evening' : gameState?.currentPhase === 3 ? 'night' : gameState?.currentPhase === 4 ? 'dawn' : 'preparation'}
                gameRound={gameState?.currentRound}
                userRole={currentRoleDesign?.role_name}
                isGameRoom={true}
                title="游戏聊天"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GamePage;
