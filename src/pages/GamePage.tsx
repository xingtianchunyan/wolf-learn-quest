
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import GameStateDisplay from '@/components/game/GameStateDisplay';
import StudentSystemPanel from '@/components/game/StudentSystemPanel';
import StudentAnswerRecordPanel from '@/components/game/StudentAnswerRecordPanel';
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
              <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6 h-full">
                <h2 className="text-2xl font-bold text-werewolf-purple mb-4">游戏进行中</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-werewolf-dark/40 rounded-md">
                    <p className="text-gray-300">
                      房间ID: {roomId}
                    </p>
                    <p className="text-gray-300 mt-2">
                      游戏内容区域 - 这里将显示游戏的主要界面，包括玩家列表、投票界面、技能使用等功能。
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-werewolf-dark/40 rounded-md">
                      <h3 className="font-semibold text-werewolf-purple mb-2">玩家操作</h3>
                      <p className="text-sm text-gray-400">
                        根据当前阶段显示相应的操作界面
                      </p>
                    </div>
                    
                    <div className="p-4 bg-werewolf-dark/40 rounded-md">
                      <h3 className="font-semibold text-werewolf-purple mb-2">游戏信息</h3>
                      <p className="text-sm text-gray-400">
                        显示当前游戏状态和相关信息
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Side Panel */}
          <div className="lg:col-span-3">
            <div className="space-y-6 h-full">
              <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6 h-1/2">
                <h3 className="text-lg font-semibold text-werewolf-purple mb-4">玩家列表</h3>
                <p className="text-sm text-gray-400">玩家列表和状态信息</p>
              </div>
              
              <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6 h-1/2">
                <h3 className="text-lg font-semibold text-werewolf-purple mb-4">聊天区</h3>
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
