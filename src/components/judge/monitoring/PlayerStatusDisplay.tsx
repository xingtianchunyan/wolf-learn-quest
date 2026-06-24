import React, { useState, useEffect } from 'react';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import type { Tables } from '@/integrations/supabase/types';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useAuth } from '@/providers/AuthProvider';
import { useRoleStates } from '@/hooks/useRoleStates';
import { supabase } from '@/integrations/supabase/client';
import PlayerStatusManager from '@/components/game/panels/PlayerStatusManager';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface RoomPlayersRow {
  user_id: string;
  status: string;
}

interface Player {
  id: string;
  name: string;
  role: string;
  status: 'normal' | 'waiting';
  avatar: string;
  userId?: string;
}

interface PlayerStatusDisplayProps {
  players: Player[];
  roomId: string;
  maxPlayers: number;
}

const PlayerStatusDisplay: React.FC<PlayerStatusDisplayProps> = ({
  players,
  roomId,
  maxPlayers,
}) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const { getSelectedRoleByUser } = useRoleSelection(
    roomId,
    currentUser?.id || null,
    players.length,
    maxPlayers
  );
  const { getLocalImageByDesignId } = useRoleDesigns();
  const { roleStates } = useRoleStates(roomId);

  // Fallback: 从 room_players 读取玩家的生存状态并建立映射
  const [userStatusMap, setUserStatusMap] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (!roomId) {
      setUserStatusMap({});
      return;
    }

    const fetchStatuses = async () => {
      const { data, error } = await supabase
        .from('room_players')
        .select('user_id,status')
        .eq('room_id', roomId);
      if (!error && Array.isArray(data)) {
        const map: Record<string, string> = {};
        data.forEach(
          (r: Pick<Tables<'room_players'>, 'user_id' | 'status'>) => {
            if (r?.user_id) map[r.user_id] = r.status;
          }
        );
        setUserStatusMap(map);
      }
    };

    fetchStatuses();

    const channel = supabase
      .channel(`room_players_status_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_players',
          filter: `room_id=eq.${roomId}`,
        },
        (payload: RealtimePostgresChangesPayload<RoomPlayersRow>) => {
          setUserStatusMap(prev => {
            const next = { ...prev } as Record<string, string>;
            if (payload.eventType === 'DELETE' && payload.old) {
              const oldUserId = payload.old.user_id;
              if (oldUserId) delete next[oldUserId];
            } else if (payload.new) {
              const row = payload.new;
              if (row?.user_id) next[row.user_id] = row.status;
            }
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const handleCardFlip = (playerId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  const isFlipped = (playerId: string) => flippedCards.has(playerId);

  return (
    <div className='space-y-4'>
      {/* 濒死状态管理器 - 法官界面显示所有状态变更 */}
      <PlayerStatusManager
        players={players}
        roomId={roomId}
        maxPlayers={maxPlayers}
        showDyingStatusOnly={false}
        className='mb-4'
      />

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
        {players.map(player => {
          const selectedRole = player.userId
            ? getSelectedRoleByUser(player.userId)
            : null;
          const roleName =
            selectedRole?.roleName || t('judge.playerDisplay.noRole');
          const roleImageUrl = selectedRole?.roleDesign
            ? getLocalImageByDesignId(selectedRole.roleDesign.id)
            : null;

          const roleState = player.userId
            ? roleStates.find(r => r.user_id === player.userId)
            : undefined;
          const effectiveStatus = (() => {
            if (roleState?.role_status) return roleState.role_status;
            const s = player.userId ? userStatusMap[player.userId] : undefined;
            switch (s) {
              case 'alive':
                return 1;
              case 'weak':
                return 3;
              case 'dying':
                return 2;
              case 'eliminated':
                return 4;
              default:
                return undefined;
            }
          })();
          const statusBorderClass = (() => {
            switch (effectiveStatus) {
              case 1: // 正常
                return 'border-green-400';
              case 3: // 虚弱
                return 'border-yellow-400';
              case 2: // 濒死
                return 'border-red-400 animate-pulse';
              case 4: // 淘汰
                return 'border-white';
              default:
                return 'border-werewolf-purple/30';
            }
          })();

          return (
            <div
              key={player.id}
              className='relative transition-all duration-300 transform hover:scale-105'
              style={{ perspective: '1000px' }}
            >
              <div
                className={`relative w-full h-32 transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped(player.id) ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 正面 - 玩家头像和角色名称 */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-lg p-3 backface-hidden cursor-pointer ${
                    player.status === 'waiting'
                      ? 'bg-gray-600/40 border-2 border-gray-500'
                      : `bg-werewolf-dark/40 hover:bg-werewolf-dark/60 border-2 ${statusBorderClass}`
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                  onClick={() =>
                    player.status !== 'waiting' && handleCardFlip(player.id)
                  }
                >
                  <div className='h-full flex flex-col items-center justify-between'>
                    {/* 玩家头像 */}
                    <div className='flex-1 flex items-center justify-center'>
                      {player.avatar && player.status !== 'waiting' ? (
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className='w-12 h-12 rounded-full object-cover'
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                            player.status === 'waiting'
                              ? 'bg-gray-500'
                              : 'bg-werewolf-purple/60'
                          }`}
                        >
                          {player.status === 'waiting'
                            ? '?'
                            : player.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* 玩家名称和角色 */}
                    <div className='text-center'>
                      <h4 className='font-semibold text-sm text-white truncate'>
                        {player.name}
                      </h4>
                      <p className='text-xs text-werewolf-purple mt-1 font-medium'>
                        {roleName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 背面 - 角色图片铺满整个面板 */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-lg backface-hidden rotate-y-180 cursor-pointer overflow-hidden ${
                    player.status === 'waiting'
                      ? 'bg-gray-600/40 border-2 border-gray-500'
                      : `bg-werewolf-purple/30 border-2 ${statusBorderClass}`
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  onClick={() => handleCardFlip(player.id)}
                >
                  {roleImageUrl && player.status !== 'waiting' ? (
                    <img
                      src={roleImageUrl}
                      alt={roleName}
                      className='w-full h-full object-cover rounded-lg'
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        const fallback =
                          e.currentTarget.parentElement?.querySelector(
                            '.fallback-icon'
                          ) as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className={`fallback-icon ${roleImageUrl ? 'hidden' : 'flex'} w-full h-full rounded-lg items-center justify-center text-6xl ${
                      player.status === 'waiting'
                        ? 'bg-gray-500'
                        : 'bg-werewolf-purple/60'
                    }`}
                  >
                    🎭
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerStatusDisplay;
