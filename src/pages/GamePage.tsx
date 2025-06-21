
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import StudentSystemPanel from '@/components/game/StudentSystemPanel';
import StudentAnswerRecord from '@/components/game/StudentAnswerRecord';
import ActionTargetPanel from '@/components/game/ActionTargetPanel';
import PlayerActionPanel from '@/components/game/PlayerActionPanel';
import MultiChannelChat from '@/components/chat/MultiChannelChat';
import { JudgePageProvider } from '@/contexts/JudgePageContext';

const GamePage = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId || !currentUser) return;

    // 获取当前玩家记录
    const fetchCurrentPlayer = async () => {
      const { data, error } = await supabase
        .from('room_players')
        .select('id')
        .eq('room_id', roomId)
        .eq('user_id', currentUser.id)
        .single();

      if (error) {
        console.error('Error fetching current player:', error);
        toast({
          title: '获取玩家信息失败',
          description: '无法获取当前玩家信息',
          variant: 'destructive',
        });
        navigate('/lobby');
        return;
      }

      setCurrentPlayerId(data.id);
    };

    fetchCurrentPlayer();
  }, [roomId, currentUser, navigate, toast]);

  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayerId(playerId === selectedPlayerId ? null : playerId);
  };

  const handleVoteConfirm = () => {
    if (!selectedPlayerId) return;
    
    // 实现投票逻辑
    console.log('Voting for player:', selectedPlayerId);
    toast({
      title: '投票成功',
      description: '您的投票已提交',
    });
    setSelectedPlayerId(null);
  };

  const handleVoteCancel = () => {
    // 实现取消投票逻辑
    console.log('Cancelling vote');
    toast({
      title: '已取消投票',
      description: '您已取消本轮投票',
    });
    setSelectedPlayerId(null);
  };

  if (!roomId) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">房间ID不存在</p>
            <button onClick={() => navigate('/lobby')} className="btn">
              返回大厅
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!currentPlayerId) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4"></div>
            <p className="text-gray-400">正在加载游戏信息...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <JudgePageProvider roomId={roomId}>
      <PageLayout>
        <div className="container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{
            height: 'calc(100vh - 16rem)'
          }}>
            {/* Left Column - Student System and Answer Records */}
            <div className="lg:col-span-3 flex flex-col gap-6 h-full">
              <div className="h-1/2">
                <StudentSystemPanel roomId={roomId} playerId={currentPlayerId} />
              </div>
              <div className="h-1/2">
                <StudentAnswerRecord roomId={roomId} playerId={currentPlayerId} />
              </div>
            </div>
            
            {/* Center Column - Action Target and Player Actions */}
            <div className="lg:col-span-6 flex flex-col gap-6 h-full">
              <div className="h-1/2">
                <ActionTargetPanel 
                  roomId={roomId} 
                  onPlayerSelect={handlePlayerSelect}
                  selectedPlayerId={selectedPlayerId}
                />
              </div>
              <div className="h-1/2">
                <PlayerActionPanel 
                  roomId={roomId}
                  selectedPlayerId={selectedPlayerId}
                  onVoteConfirm={handleVoteConfirm}
                  onVoteCancel={handleVoteCancel}
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
