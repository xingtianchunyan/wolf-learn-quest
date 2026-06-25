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
  interface RoomPlayerRecord {
    id: string;
    room_id: string;
    user_id: string;
    is_ready: boolean;
    is_ai: boolean;
    role?: string | null;
  }

  const [currentPlayerRecord, setCurrentPlayerRecord] =
    useState<RoomPlayerRecord | null>(null);
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
    removeAIPlayer,
    setAIPlayersReady,
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
    roleSelections,
  } = useRoleSelection(
    roomData?.id || '',
    currentUserId,
    players.length,
    currentMaxPlayers
  );

  // 获取当前玩家是否已选择角色
  const currentPlayerHasSelectedRole = !!getCurrentPlayerSelection();

  // 区分人类玩家与 AI 玩家（AI 玩家无 user_id，无法通过 role_selections 选角）
  const humanPlayers = players.filter(player => !player.isAI);
  const aiPlayers = players.filter(player => player.isAI);
  const humanPlayerIds = new Set(
    humanPlayers.map(player => player.userId).filter(Boolean)
  );
  const selectedHumanCount = roleSelections.filter(selection =>
    humanPlayerIds.has(selection.user_id)
  ).length;
  const allHumanPlayersSelectedRoles =
    humanPlayers.length > 0 && selectedHumanCount >= humanPlayers.length;

  // 所有真实玩家已准备，AI 玩家会在真实玩家准备时自动准备
  const allReady =
    humanPlayers.length > 0 && humanPlayers.every(player => player.isReady);

  // AI 角色自动分配由数据库触发器处理：当房间满员且所有人类玩家完成选角后，
  // 触发器会自动为未分配角色的 AI 玩家随机分配剩余角色，并写入 room_players.role。

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
            title: t('page.gameRoom.roles_reset'),
            description: t('page.gameRoom.roles_reset_reason'),
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
        description: t('page.gameRoom.max_players_set_to', {
          count: newMaxPlayers,
        }),
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

  const handleRemoveAIPlayer = async () => {
    try {
      const success = await removeAIPlayer();

      if (success) {
        toast({
          title: t('gameComponent.room.playersList.aiPlayerRemoved'),
        });
      } else {
        toast({
          title: t('gameComponent.room.playersList.noAiPlayerToRemove'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error removing AI player:', error);
      toast({
        title: t('gameComponent.room.playersList.removeAiFailed'),
        variant: 'destructive',
      });
    }
  };

  const handleReadyToggle = async () => {
    if (!currentUser || !roomData || !currentPlayerRecord) return;

    // 检查是否满足准备条件
    if (!canSelectRoles()) {
      toast({
        title: t('page.gameRoom.cannot_ready'),
        description: t('page.gameRoom.waiting_for_players', {
          count: currentMaxPlayers,
        }),
        variant: 'destructive',
      });
      return;
    }

    // AI 玩家无法通过 role_selections 选角，因此只要求所有真实人类玩家已选角
    if (!allHumanPlayersSelectedRoles) {
      toast({
        title: t('page.gameRoom.cannot_ready'),
        description: t('page.gameRoom.waiting_for_all_roles'),
        variant: 'destructive',
      });
      return;
    }

    // 使用数据库状态检查角色选择
    if (!isReady && !currentPlayerHasSelectedRole) {
      toast({
        title: t('select_character_first'),
        description: t('page.gameRoom.select_character_before_ready'),
        variant: 'destructive',
      });
      return;
    }

    const newReadyState = !isReady;

    try {
      // 同步更新当前玩家准备状态
      const success = await updatePlayerReady(
        currentPlayerRecord.id,
        newReadyState
      );

      if (!success) {
        toast({
          title: t('error'),
          description: t('page.gameRoom.failed_to_update_status'),
          variant: 'destructive',
        });
        return;
      }

      setIsReady(newReadyState);

      // 当真实玩家准备时，通过 RPC 自动将 AI 玩家设为已准备
      // 直接 UPDATE 会触发 RLS（AI 玩家的 user_id 为 NULL），因此需要 SECURITY DEFINER 函数
      if (newReadyState && aiPlayers.length > 0) {
        await setAIPlayersReady(true);
      }

      toast({
        title: newReadyState ? t('ready') : t('not_ready'),
        description: newReadyState
          ? t('you_are_ready')
          : t('you_are_not_ready'),
      });
    } catch (error) {
      console.error('Error updating ready status:', error);
      toast({
        title: t('error'),
        description: t('page.gameRoom.failed_to_update_status'),
        variant: 'destructive',
      });
    }
  };

  // 抽卡模式：玩家点选角色卡片后自动进入已准备状态
  const handleAutoReady = async () => {
    if (!currentPlayerRecord) return;

    try {
      const success = await updatePlayerReady(currentPlayerRecord.id, true);
      if (success) {
        setIsReady(true);
        if (aiPlayers.length > 0) {
          await setAIPlayersReady(true);
        }
      }
    } catch (error) {
      console.error('Error auto-readying after card draw:', error);
    }
  };

  const handleCharacterSelect = (characterId: string | null) => {
    // 如果已经准备，不能更改角色选择
    if (isReady && characterId !== selectedCharacter) {
      toast({
        title: t('page.gameRoom.cannot_change_character'),
        description: t('page.gameRoom.cancel_ready_before_change'),
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
              allPlayersSelectedRoles={allHumanPlayersSelectedRoles}
              canSelectRoles={canSelectRoles()}
              currentPlayerHasSelectedRole={currentPlayerHasSelectedRole}
              hideReadyButton={true}
              t={t}
              onReadyToggle={handleReadyToggle}
              onLeaveRoom={handleLeaveRoom}
              onStartGame={handleStartGame}
              onAddAIPlayer={handleAddAIPlayer}
              onRemoveAIPlayer={handleRemoveAIPlayer}
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
              onAutoReady={handleAutoReady}
              roomId={roomData?.id || ''}
              currentPlayerId={currentUserId}
              isReady={isReady}
              players={players}
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
