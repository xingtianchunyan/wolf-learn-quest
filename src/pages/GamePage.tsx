
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import GameStateDisplay from '@/components/game/GameStateDisplay';
import StudentSystemPanel from '@/components/game/StudentSystemPanel';
import StudentAnswerRecordPanel from '@/components/game/StudentAnswerRecordPanel';
import { VotingSystemManager } from '@/components/game/VotingSystemManager';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

const GamePage = () => {
  const { id: roomId } = useParams();
  const { t } = useLanguage();

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
            <div className="h-1/2">
              <GameStateDisplay roomId={roomId} />
            </div>
            <div className="h-1/2">
              <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6 h-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-werewolf-purple mb-4">游戏主界面</h2>
                <p className="text-sm text-gray-400">游戏主界面内容区域</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Side Panel */}
          <div className="lg:col-span-3">
            <div className="space-y-4 h-full overflow-y-auto">              
              {/* 玩家列表 */}
              <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-werewolf-purple mb-3">玩家列表</h3>
                <p className="text-sm text-gray-400">玩家列表和状态信息</p>
              </div>
              
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
