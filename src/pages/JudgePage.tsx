
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import EnhancedGameStateDisplay from '@/components/judge/EnhancedGameStateDisplay';
import MultiChannelChat from '@/components/chat/MultiChannelChat';
import TeacherSystemPanel from '@/components/judge/TeacherSystemPanel';
import AnswerRecordPanel from '@/components/judge/AnswerRecordPanel';
import JudgeActionPanel from '@/components/judge/JudgeActionPanel';
import SkillSystemManager from '@/components/game/SkillSystemManager';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useGameState } from '@/hooks/useGameState';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { JudgePageProvider } from '@/contexts/JudgePageContext';

const JudgePage = () => {
  const { id: roomId } = useParams();
  const { currentUser } = useAuth();
  const { gameState } = useGameState(roomId || '');
  const { players } = usePlayersRealtime(roomId || '');
  
  // 获取角色选择信息
  const { getSelectedRoleByUser } = useRoleSelection(
    roomId || '',
    currentUser?.id || null,
    players.length,
    8
  );

  if (!roomId) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">房间ID不存在</p>
            <Link to="/lobby">
              <Button>返回大厅</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  // 构建玩家信息，包含角色状态
  const playersWithRoles = players.map(player => {
    const selectedRole = getSelectedRoleByUser(player.userId || '');
    return {
      userId: player.userId || '',
      name: player.name,
      roleStatus: 1 // 默认正常状态，实际应该从 role_states 表获取
    };
  });

  return (
    <JudgePageProvider roomId={roomId}>
      <PageLayout>
        <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]">
          {/* Navigation */}
          <div className="mb-6">
            <Link to="/lobby">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回大厅
              </Button>
            </Link>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{
            height: 'calc(100vh - 16rem)'
          }}>
            {/* Left Column - Teacher System and Answer Records */}
            <div className="lg:col-span-3 flex flex-col gap-6 h-full">
              <div className="h-1/2">
                <TeacherSystemPanel roomId={roomId} />
              </div>
              <div className="h-1/2">
                <AnswerRecordPanel roomId={roomId} />
              </div>
            </div>
            
            {/* Center Column - Game State and Judge Actions */}
            <div className="lg:col-span-6 flex flex-col gap-6 h-full">
              <div className="h-1/3">
                <EnhancedGameStateDisplay roomId={roomId} />
              </div>
              <div className="h-1/3">
                <JudgeActionPanel roomId={roomId} />
              </div>
              {/* 添加技能系统管理器 */}
              {gameState && (
                <div className="h-1/3">
                  <SkillSystemManager
                    roomId={roomId}
                    gameStateId={gameState.id}
                    userId={currentUser?.id || ''}
                    isJudge={true}
                    currentPhase={gameState.currentPhase}
                    roleState={null}
                    roleDesign={null}
                    players={playersWithRoles}
                  />
                </div>
              )}
            </div>
            
            {/* Right Column - Chat */}
            <div className="lg:col-span-3 h-full">
              <MultiChannelChat 
                roomId={roomId} 
                currentUser={currentUser} 
                isGameRoom={false} 
                title="法官聊天" 
                className="h-full" 
                height="100%" 
              />
            </div>
          </div>
        </div>
      </PageLayout>
    </JudgePageProvider>
  );
};

export default JudgePage;
