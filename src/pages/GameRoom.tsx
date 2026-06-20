/**
 * 游戏房间页面组件
 *
 * 功能说明：
 * - 显示房间信息、玩家列表、角色选择和聊天功能
 * - 处理房间状态的实时更新
 * - 管理玩家的准备状态和角色选择
 *
 * 修复说明：
 * - 修复房主ID和法官ID显示问题
 * - 使用 get_public_user_profile RPC 函数替代直接的外键关联查询
 * - 确保所有玩家都能正确查看房主和法官信息
 * - 统一数据获取方式，提高权限兼容性
 */

import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useRoomCleanup } from '@/hooks/useRoomCleanup';
import { usePlayerRoom } from '@/hooks/usePlayerRoom';
import { useRoomRealtime } from '@/hooks/useRoomRealtime';
import { usePlayerPresence } from '@/hooks/usePlayerPresence';
import RoleSelection from '@/components/room/RoleSelection';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useGameState } from '@/hooks/useGameState';
import { useRoomTransition } from '@/hooks/useRoomTransition';
import { useGameRoomData } from '@/hooks/useGameRoomData';
import GameRoomSidebar from '@/components/room/GameRoomSidebar';
import GameRoomChatPanel from '@/components/room/GameRoomChatPanel';
import GameRoomLoading from '@/components/room/GameRoomLoading';
import GameRoomNotFound from '@/components/room/GameRoomNotFound';

const GameRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { t } = useLanguage();
  const {
    currentUser,
    currentUserId,
    roomData,
    judgeName,
    isLoading,
    setRoomData,
    setIsLoading,
  } = useGameRoomData(id);

  const [isReady, setIsReady] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [currentPlayerRecord, setCurrentPlayerRecord] = useState<any>(null);
  const [previousMaxPlayers, setPreviousMaxPlayers] = useState<number | null>(
    null
  );

  const { leaveCurrentRoom } = usePlayerRoom();
  const { roomData: realtimeRoomData, updateMaxPlayers } = useRoomRealtime(
    roomData?.id
  );
  const {
    players,
    loading: playersLoading,
    updatePlayerReady,
    addAIPlayer,
  } = usePlayersRealtime(roomData?.id);
  const { gameState } = useGameState(roomData?.id || '');
  // 游戏结束后自动迁移到新房间
  useRoomTransition(roomData?.id, gameState?.status);

  // 监听游戏状态变化，当游戏开始时自动跳转
  useEffect(() => {
    if (gameState?.status === 'active' && roomData?.id) {
      navigate(`/room/${roomData.id}/game`);
    }
  }, [gameState?.status, roomData?.id, navigate]);

  // 添加在线状态追踪
  const { getOnlinePlayers, isPlayerOnline } = usePlayerPresence(
    roomData?.id,
    currentUser
  );
  const onlinePlayersList = getOnlinePlayers();
  const onlinePlayers = onlinePlayersList.map(p => p.user_id);

  // Get current max players from realtime data or fallback to local state
  const currentMaxPlayers =
    realtimeRoomData?.maxPlayers || roomData?.maxPlayers || 6;

  // 使用角色选择 hook，传递 user_id 而不是 player_id
  const {
    canSelectRoles,
    allPlayersSelectedRoles,
    clearAllRoleSelections,
    getCurrentPlayerSelection,
  } = useRoleSelection(
    roomData?.id || '',
    currentUserId,
    players.length,
    currentMaxPlayers
  );

  // 获取当前玩家是否已选择角色
  const currentPlayerHasSelectedRole = !!getCurrentPlayerSelection();

  const allReady = players.every(player => player.isReady);

  // Add room cleanup functionality
  useRoomCleanup();

  // 查找当前用户的玩家记录
  useEffect(() => {
    if (currentUserId && players.length > 0) {
      // 通过查询数据库来获取当前用户的玩家记录
      const fetchCurrentPlayerRecord = async () => {
        try {
          const { data: playerRecord, error } = await supabase
            .from('room_players')
            .select('*')
            .eq('room_id', roomData?.id)
            .eq('user_id', currentUserId)
            .single();

          if (error) {
            console.error('Error fetching current player record:', error);
          } else {
            setCurrentPlayerRecord(playerRecord);
            setIsReady(playerRecord?.is_ready || false);
          }
        } catch (error) {
          console.error('Error fetching current player record:', error);
        }
      };

      fetchCurrentPlayerRecord();
    }
  }, [currentUserId, players.length, roomData?.id]);

  // 初始化 previousMaxPlayers
  useEffect(() => {
    if (roomData && previousMaxPlayers === null) {
      setPreviousMaxPlayers(roomData.maxPlayers);
    }
  }, [roomData, previousMaxPlayers]);

  // 监听最大玩家数变化并重置角色选择
  useEffect(() => {
    if (
      previousMaxPlayers !== null &&
      previousMaxPlayers !== currentMaxPlayers
    ) {
      // 最大玩家数发生变化，清除所有角色选择
      const resetRoleSelections = async () => {
        const success = await clearAllRoleSelections();
        if (success) {
          setSelectedCharacter(null);
          setIsReady(false);
          toast({
            title: '角色选择已重置',
            description: '由于最大玩家数变化，所有角色选择已重置',
          });
        }
      };

      resetRoleSelections();
    }
    setPreviousMaxPlayers(currentMaxPlayers);
  }, [currentMaxPlayers, previousMaxPlayers, clearAllRoleSelections, toast]);

  const handleMaxPlayersChange = async (increment: number) => {
    if (!roomData || !currentUser) return;

    const newMaxPlayers = Math.max(
      6,
      Math.min(12, currentMaxPlayers + increment)
    );

    if (newMaxPlayers === currentMaxPlayers) return;

    try {
      const success = await updateMaxPlayers(newMaxPlayers);

      if (!success) {
        toast({
          title: t('error'),
          description: t('error_updating_players'),
          variant: 'destructive',
        });
        return;
      }

      // Update local state for immediate feedback
      setRoomData({ ...roomData, maxPlayers: newMaxPlayers });

      toast({
        title: t('max_players_updated'),
        description: `${t('max_players_set')} ${newMaxPlayers}`,
      });
    } catch (error) {
      console.error('Error updating max players:', error);
      toast({
        title: t('error'),
        description: t('error_updating_players'),
        variant: 'destructive',
      });
    }
  };

  const handleAddAIPlayer = async () => {
    if (players.length >= currentMaxPlayers) {
      toast({
        title: t('room_full'),
        description: t('room_is_full'),
        variant: 'destructive',
      });
      return;
    }

    try {
      const success = await addAIPlayer();

      if (success) {
        toast({
          title: t('ai_player_added'),
          description: t('ai_player_joined'),
        });
      } else {
        toast({
          title: t('error'),
          description: t('failed_to_add_ai'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error adding AI player:', error);
      toast({
        title: t('error'),
        description: t('failed_to_add_ai'),
        variant: 'destructive',
      });
    }
  };

  const handleReadyToggle = async () => {
    if (!currentUser || !roomData || !currentPlayerRecord) return;

    // 检查是否满足准备条件
    if (!canSelectRoles()) {
      toast({
        title: '无法准备',
        description: `需要等待房间人数达到${currentMaxPlayers}人`,
        variant: 'destructive',
      });
      return;
    }

    if (!allPlayersSelectedRoles()) {
      toast({
        title: '无法准备',
        description: '需要等待所有玩家选择角色',
        variant: 'destructive',
      });
      return;
    }

    // 使用数据库状态检查角色选择
    if (!isReady && !currentPlayerHasSelectedRole) {
      toast({
        title: t('select_character_first'),
        description: '请先选择角色才能进入准备状态',
        variant: 'destructive',
      });
      return;
    }

    const newReadyState = !isReady;

    try {
      const success = await updatePlayerReady(
        currentPlayerRecord.id,
        newReadyState
      );

      if (success) {
        setIsReady(newReadyState);
        toast({
          title: newReadyState ? t('ready') : t('not_ready'),
          description: newReadyState
            ? t('you_are_ready')
            : t('you_are_not_ready'),
        });
      } else {
        toast({
          title: t('error'),
          description: t('failed_to_update_status'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating ready status:', error);
      toast({
        title: t('error'),
        description: t('failed_to_update_status'),
        variant: 'destructive',
      });
    }
  };

  const handleCharacterSelect = (characterId: string | null) => {
    // 如果已经准备，不能更改角色选择
    if (isReady && characterId !== selectedCharacter) {
      toast({
        title: t('cannot_change_character'),
        description: '请先取消准备状态才能更换角色',
        variant: 'destructive',
      });
      return;
    }

    setSelectedCharacter(characterId);
  };

  const handleStartGame = () => {
    if (!allReady) {
      toast({
        title: t('cannot_start_game'),
        description: t('players_not_ready'),
        variant: 'destructive',
      });
      return;
    }

    if (!selectedCharacter) {
      toast({
        title: t('select_character'),
        description: t('select_character_desc'),
        variant: 'destructive',
      });
      return;
    }

    // 导航到游戏页面，传递房间ID
    navigate(`/room/${roomData.id}/game`);
  };

  const handleLeaveRoom = async () => {
    try {
      const success = await leaveCurrentRoom();

      if (success) {
        toast({
          title: t('left_room'),
          description: t('left_room_desc'),
        });
        navigate('/lobby');
      } else {
        toast({
          title: t('error'),
          description: t('leave_room_failed'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error leaving room:', error);
      toast({
        title: t('error'),
        description: t('leave_room_failed'),
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <GameRoomLoading message={t('loading_room')} />;
  }

  if (!roomData) {
    return (
      <GameRoomNotFound
        title={t('room_not_found')}
        description={t('room_id_label')}
        roomId={id}
        notSpecifiedText={t('not_specified')}
        returnText={t('return_to_lobby')}
      />
    );
  }

  return (
    <PageLayout>
      <div className='container mx-auto py-6 px-4 min-h-[calc(100vh-4rem)]'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Left Column - Room Info & Players */}
          <div className='lg:col-span-3'>
            <GameRoomSidebar
              roomData={roomData}
              judgeName={judgeName}
              players={players}
              currentMaxPlayers={currentMaxPlayers}
              onlinePlayers={onlinePlayers}
              isReady={isReady}
              allReady={allReady}
              selectedCharacter={selectedCharacter}
              playersLoading={playersLoading}
              allPlayersSelectedRoles={allPlayersSelectedRoles()}
              canSelectRoles={canSelectRoles()}
              currentPlayerHasSelectedRole={currentPlayerHasSelectedRole}
              t={t}
              onReadyToggle={handleReadyToggle}
              onLeaveRoom={handleLeaveRoom}
              onStartGame={handleStartGame}
              onAddAIPlayer={handleAddAIPlayer}
              onMaxPlayersChange={handleMaxPlayersChange}
            />
          </div>

          {/* Middle Column - Character Selection */}
          <div className='lg:col-span-5'>
            <RoleSelection
              maxPlayers={currentMaxPlayers}
              currentPlayerCount={players.length}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={handleCharacterSelect}
              roomId={roomData?.id || ''}
              currentPlayerId={currentUserId}
              isReady={isReady}
            />
          </div>

          {/* Right Column - Chat */}
          <div className='lg:col-span-4 flex flex-col'>
            <GameRoomChatPanel
              roomId={roomData?.id || null}
              currentUser={currentUser}
              title={t('room_chat')}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameRoom;
