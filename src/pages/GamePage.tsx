
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import StudentSystemPanel from '@/components/game/StudentSystemPanel';
import StudentAnswerRecordPanel from '@/components/game/StudentAnswerRecordPanel';
import ActionTargetPanel from '@/components/game/ActionTargetPanel';
import PlayerActionPanel from '@/components/game/PlayerActionPanel';
import MultiChannelChat from '@/components/chat/MultiChannelChat';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { JudgePageProvider } from '@/contexts/JudgePageContext';
import { useRoomRealtime } from '@/hooks/useRoomRealtime';

const GamePage = () => {
  const { id: roomId } = useParams();
  const { currentUser } = useAuth();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
  const { room } = useRoomRealtime(roomId || '');

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

  return (
    <JudgePageProvider roomId={roomId}>
      <PageLayout>
        <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]">
          {/* Main Content Grid - 与法官页面相同的高度设置 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{
            height: 'calc(100vh - 16rem)'
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
            
            {/* Center Column - Action Target and Player Actions */}
            <div className="lg:col-span-6 flex flex-col gap-6 h-full">
              <div className="h-1/2">
                <ActionTargetPanel 
                  roomId={roomId} 
                  maxPlayers={room?.max_players || 8}
                  onPlayerSelect={setSelectedPlayerId}
                  selectedPlayerId={selectedPlayerId}
                />
              </div>
              <div className="h-1/2">
                <PlayerActionPanel 
                  roomId={roomId}
                  selectedPlayerId={selectedPlayerId}
                />
              </div>
            </div>
            
            {/* Right Column - Chat */}
            <div className="lg:col-span-3 h-full">
              <MultiChannelChat 
                roomId={roomId} 
                currentUser={currentUser} 
                isGameRoom={true} 
                title="游戏聊天" 
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

export default GamePage;
