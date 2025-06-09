
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import GameStateDisplay from '@/components/game/GameStateDisplay';
import GameSettingsPanel from '@/components/game/GameSettingsPanel';
import { useSearchParams } from 'react-router-dom';

const JudgePage = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') || '';

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]">
        <div className="space-y-6">
          {/* Game State Display at the top center */}
          <div className="max-w-2xl mx-auto">
            <GameStateDisplay roomId={roomId} isJudge={true} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Judge Content */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-werewolf-purple mb-4">法官控制台</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-werewolf-dark/40 rounded-md">
                      <h3 className="font-semibold text-werewolf-purple mb-2">游戏监控</h3>
                      <p className="text-gray-300">
                        这里显示游戏的详细状态信息，包括所有玩家的行动、投票结果、技能使用等。
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-werewolf-dark/40 rounded-md">
                        <h3 className="font-semibold text-werewolf-purple mb-2">玩家状态</h3>
                        <p className="text-sm text-gray-400">
                          监控所有玩家的状态和行动
                        </p>
                      </div>
                      
                      <div className="p-4 bg-werewolf-dark/40 rounded-md">
                        <h3 className="font-semibold text-werewolf-purple mb-2">游戏日志</h3>
                        <p className="text-sm text-gray-400">
                          记录游戏中的所有重要事件
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-werewolf-purple mb-4">问题管理</h3>
                  <div className="p-4 bg-werewolf-dark/40 rounded-md">
                    <p className="text-gray-300">
                      管理答题阶段的问题，包括问题选择、答案验证、评分等功能。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Settings and Control Panel */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <GameSettingsPanel roomId={roomId} />
                
                <div className="bg-werewolf-card border-werewolf-purple/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-werewolf-purple mb-4">快速操作</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-werewolf-dark/40 rounded-md">
                      <p className="text-sm text-gray-400">
                        法官专用的快速操作按钮和功能面板
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default JudgePage;
