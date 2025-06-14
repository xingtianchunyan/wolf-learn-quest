import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import EnhancedGameStateDisplay from '@/components/judge/EnhancedGameStateDisplay';
import MultiChannelChat from '@/components/chat/MultiChannelChat';
import TeacherSystemPanel from '@/components/judge/TeacherSystemPanel';
import AnswerRecordPanel from '@/components/judge/AnswerRecordPanel';
import JudgeActionPanel from '@/components/judge/JudgeActionPanel';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { JudgePageProvider } from '@/contexts/JudgePageContext';

const JudgePage = () => {
  const {
    id: roomId
  } = useParams();
  const {
    currentUser
  } = useAuth();
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
    <JudgePageProvider>
      <PageLayout>
        <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]">
          {/* Navigation */}
          

          {/* Main Content Grid - 修复高度问题 */}
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
              <div className="h-1/2">
                <EnhancedGameStateDisplay roomId={roomId} />
              </div>
              <div className="h-1/2">
                <JudgeActionPanel roomId={roomId} />
              </div>
            </div>
            
            {/* Right Column - Chat */}
            <div className="lg:col-span-3 h-full">
              <MultiChannelChat roomId={roomId} currentUser={currentUser} isGameRoom={false} title="法官聊天" className="h-full" height="100%" />
            </div>
          </div>
        </div>
      </PageLayout>
    </JudgePageProvider>
  );
};
export default JudgePage;
