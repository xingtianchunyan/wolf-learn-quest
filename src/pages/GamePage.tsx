import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import GameStateDisplay from '@/components/game/GameStateDisplay';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
        {/* Navigation */}
        <div className="mb-6">
          <Link to={`/room/${roomId}`}>
            <Button variant="ghost" className="mb-4 rounded-lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回房间
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* 顶部中心 - Game State Display */}
          <div className="lg:col-span-12 flex flex-col justify-end">
            <div className="max-w-2xl mx-auto flex flex-col justify-end">
              <GameStateDisplay roomId={roomId} className="rounded-lg" />
            </div>
          </div>
          {/* 主区 - 游戏内容 */}
          <div className="lg:col-span-8 flex flex-col justify-end">
            <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6 flex-1 min-h-0 overflow-auto flex flex-col justify-end">
              <h2 className="text-2xl font-bold text-werewolf-purple mb-4">游戏进行中</h2>
              <div className="space-y-4 flex-1 min-h-0 overflow-auto">
                <div className="p-4 bg-werewolf-dark/40 rounded-lg min-h-0 overflow-auto">
                  <p className="text-gray-300">
                    房间ID: {roomId}
                  </p>
                  <p className="text-gray-300 mt-2">
                    游戏内容区域 - 这里将显示游戏的主要界面，包括玩家列表、投票界面、技能使用等功能。
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-werewolf-dark/40 rounded-lg min-h-0 overflow-auto">
                    <h3 className="font-semibold text-werewolf-purple mb-2">玩家操作</h3>
                    <p className="text-sm text-gray-400">
                      根据当前阶段显示相应的操作界面
                    </p>
                  </div>
                  <div className="p-4 bg-werewolf-dark/40 rounded-lg min-h-0 overflow-auto">
                    <h3 className="font-semibold text-werewolf-purple mb-2">游戏信息</h3>
                    <p className="text-sm text-gray-400">
                      显示当前游戏状态和相关信息
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 侧栏 */}
          <div className="lg:col-span-4 flex flex-col h-full justify-end">
            <div className="space-y-6 flex-1 min-h-0 flex flex-col justify-end">
              <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6 flex-1 min-h-0 overflow-auto">
                <h3 className="text-lg font-semibold text-werewolf-purple mb-4">玩家列表</h3>
                <p className="text-sm text-gray-400">玩家列表和状态信息</p>
              </div>
              <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6 flex-1 min-h-0 overflow-auto">
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
