
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

const JudgePage = () => {
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
    <PageLayout>
      <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)] flex flex-col justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end" style={{
          height: 'calc(100vh - 16rem)'
        }}>
          {/* 左侧 - Teacher System + Answer Records */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-full justify-end">
            <div className="h-1/2 min-h-0 flex flex-col">
              <TeacherSystemPanel roomId={roomId} className="rounded-lg flex-1 min-h-0 overflow-auto"/>
            </div>
            <div className="h-1/2 min-h-0 flex flex-col">
              <AnswerRecordPanel roomId={roomId} className="rounded-lg flex-1 min-h-0 overflow-auto"/>
            </div>
          </div>
          {/* 中间 - Game State + Judge Actions */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-full justify-end">
            <div className="h-1/2 min-h-0 flex flex-col">
              <EnhancedGameStateDisplay roomId={roomId} className="rounded-lg flex-1 min-h-0 overflow-auto"/>
            </div>
            <div className="h-1/2 min-h-0 flex flex-col">
              <JudgeActionPanel roomId={roomId} className="rounded-lg flex-1 min-h-0 overflow-auto"/>
            </div>
          </div>
          {/* 右侧 - Chat */}
          <div className="lg:col-span-3 h-full flex flex-col justify-end">
            <MultiChannelChat
              roomId={roomId}
              currentUser={currentUser}
              isGameRoom={false}
              title="法官聊天"
              className="h-full rounded-lg flex-1 min-h-0 overflow-auto"
              height="100%"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export default JudgePage;
