
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { JudgePageProvider } from '@/contexts/JudgePageContext';
import StudentSystemPanel from '@/components/game/StudentSystemPanel';
import StudentAnswerRecord from '@/components/game/StudentAnswerRecord';
import ActionTargetPanel from '@/components/game/ActionTargetPanel';
import PlayerActionPanel from '@/components/game/PlayerActionPanel';
import MultiChannelChat from '@/components/chat/MultiChannelChat';

const GamePage = () => {
  const { id: roomId } = useParams();
  const { currentUser } = useAuth();

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
          {/* Navigation */}
          <div className="mb-6">
            <Link to={`/room/${roomId}`}>
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回房间
              </Button>
            </Link>
          </div>

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
                <StudentAnswerRecord roomId={roomId} />
              </div>
            </div>
            
            {/* Center Column - Action Target and Player Actions */}
            <div className="lg:col-span-6 flex flex-col gap-6 h-full">
              <div className="h-1/2">
                <ActionTargetPanel roomId={roomId} />
              </div>
              <div className="h-1/2">
                <PlayerActionPanel roomId={roomId} />
              </div>
            </div>
            
            {/* Right Column - Chat */}
            <div className="lg:col-span-3 h-full">
              <MultiChannelChat 
                roomId={roomId} 
                currentUser={currentUser} 
                isGameRoom={false} 
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
