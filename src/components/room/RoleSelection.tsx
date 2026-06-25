/**
 * 文件级注释：房间角色选择组件（线下抽卡模式）
 * - 角色卡片根据房间 ID 种子随机洗牌，所有客户端展示相同布局
 * - 所有卡片初始覆盖迷雾，玩家只能看到自己点选卡片的内容
 * - 被其他玩家选中的卡片保留迷雾并带有呼吸动画，防止重复选择
 * - 点选后自动与角色绑定，并通过回调通知父组件进入已准备状态
 */
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  getRoleConfiguration,
  expandRolesWithDesigns,
  type ExpandedRole,
} from '@/utils/roleConfiguration';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useToast } from '@/components/ui/use-toast';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { RoleCard } from './RoleCard';
import { shuffleWithSeed } from '@/lib/utils';
import type { Player } from '@/hooks/usePlayersRealtime';

interface RoleSelectionProps {
  maxPlayers: number;
  currentPlayerCount: number;
  selectedCharacter: string | null;
  onCharacterSelect: (characterId: string | null) => void;
  onAutoReady?: () => void;
  roomId: string;
  currentPlayerId: string | null;
  isReady: boolean;
  players?: Player[];
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  maxPlayers,
  currentPlayerCount,
  selectedCharacter,
  onCharacterSelect,
  onAutoReady,
  roomId,
  currentPlayerId,
  isReady,
  players = [],
}) => {
  const { t } = useLanguage();

  const getRoleDisplayName = (roleName: string) => {
    const baseName = roleName.replace(/_\d+$/, '');
    const keyMap: Record<string, string> = {
      whitewolf: 'game.role.white_wolf',
    };
    const key = keyMap[baseName] || `game.role.${baseName}`;
    const translated = t(key as never);
    return translated !== key ? translated : roleName;
  };

  const getRoleSelectionToast = (key: string) =>
    t(`gameComponent.room.roleSelection.${key}` as never);
  const { toast } = useToast();
  const {
    roleDesigns,
    loading: roleDesignsLoading,
    getLocalImageByDesignId,
  } = useRoleDesigns();
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const {
    roleSelections,
    selectRole,
    unselectRole,
    isRoleSelected,
    getCurrentPlayerSelection,
    canSelectRoles,
    loading: roleSelectionLoading,
  } = useRoleSelection(roomId, currentPlayerId, currentPlayerCount, maxPlayers);

  const roleConfigs = getRoleConfiguration(maxPlayers);
  const expandedRoles = useMemo(() => {
    if (roleDesignsLoading) return [];
    return expandRolesWithDesigns(roleConfigs, roleDesigns);
  }, [roleConfigs, roleDesigns, roleDesignsLoading]);

  // 使用房间 ID 作为种子进行确定性洗牌，保证所有客户端卡片顺序一致
  const shuffledRoles = useMemo(() => {
    if (!expandedRoles.length || !roomId) return [];
    return shuffleWithSeed(expandedRoles, roomId);
  }, [expandedRoles, roomId]);

  const currentSelection = getCurrentPlayerSelection();
  const currentSelectedRoleId = currentSelection?.roleId || null;
  const playerHasSelected = !!currentSelectedRoleId;

  // 收集 AI 玩家已被分配的角色设计 ID（存储在 room_players.role 中）
  const aiAssignedRoleIds = useMemo(() => {
    return new Set(
      players
        .filter(player => player.isAI && player.role)
        .map(player => player.role as string)
    );
  }, [players]);

  const handleCardFlip = (roleInstanceId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roleInstanceId)) {
        newSet.delete(roleInstanceId);
      } else {
        newSet.add(roleInstanceId);
      }
      return newSet;
    });
  };

  const isFlipped = (roleInstanceId: string) =>
    flippedCards.has(roleInstanceId);

  const getSelectionByRoleId = (roleDesignId?: string) => {
    if (!roleDesignId) return undefined;
    return roleSelections.find(selection => selection.role_id === roleDesignId);
  };

  const handleRoleSelect = async (role: ExpandedRole) => {
    if (!canSelectRoles()) {
      toast({
        title: getRoleSelectionToast('roleSelectionNotOpen'),
        description: t('gameComponent.room.roleSelection.waitForMaxPlayers', {
          maxPlayers,
        }),
        variant: 'destructive',
      });
      return;
    }

    // 每位人类玩家只能点选一次角色卡片
    if (playerHasSelected || isReady) {
      toast({
        title: getRoleSelectionToast('alreadyDrewCard'),
        description: getRoleSelectionToast('cannotRedraw'),
        variant: 'destructive',
      });
      return;
    }

    if (!role.roleDesignId) {
      toast({
        title: t('common.error'),
        description: getRoleSelectionToast('roleDesignMissing'),
        variant: 'destructive',
      });
      return;
    }

    // 防止选择已被其他玩家选中的卡片
    const existingSelection = getSelectionByRoleId(role.roleDesignId);
    if (existingSelection && existingSelection.user_id !== currentPlayerId) {
      toast({
        title: getRoleSelectionToast('roleAlreadySelected'),
        description: getRoleSelectionToast('chooseAnotherCard'),
        variant: 'destructive',
      });
      return;
    }

    const success = await selectRole(role.roleDesignId);
    if (success) {
      onCharacterSelect(role.roleDesignId);
      toast({
        title: getRoleSelectionToast('cardRevealed'),
        description: t('gameComponent.room.roleSelection.selectedRole', {
          roleName: getRoleDisplayName(role.roleName),
        }),
      });
      // 抽卡成功后自动进入已准备状态
      onAutoReady?.();
    } else {
      toast({
        title: t('common.error'),
        description: getRoleSelectionToast('selectRoleFailed'),
        variant: 'destructive',
      });
    }
  };

  const getRoleDesignById = (roleDesignId: string | undefined) => {
    if (!roleDesignId) return null;
    return roleDesigns.find(design => design.id === roleDesignId);
  };

  if (roleDesignsLoading || roleSelectionLoading) {
    return (
      <Card className='bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col'>
        <CardHeader className='flex-shrink-0'>
          <CardTitle className='text-werewolf-purple'>
            {t('select_role')}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex-1 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple'></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col'>
      <CardHeader className='flex-shrink-0'>
        <CardTitle className='text-werewolf-purple'>
          {t('select_role')}
        </CardTitle>
        <div className='space-y-2'>
          <p className='text-sm text-gray-400'>
            {t('current_config')}: {maxPlayers}
            {t('players_game')} ({shuffledRoles.length}
            {t('roles')})
          </p>
          <p className='text-sm text-gray-400'>
            {t('gameComponent.room.roleSelection.currentPlayerCount', {
              current: currentPlayerCount,
              max: maxPlayers,
            })}
          </p>
          {!canSelectRoles() && (
            <p className='text-sm text-yellow-400'>
              {t('gameComponent.room.roleSelection.waitingForRoleSelection', {
                maxPlayers,
              })}
            </p>
          )}
          {canSelectRoles() && currentSelection && (
            <p className='text-sm text-werewolf-purple'>
              {t('gameComponent.room.roleSelection.currentSelection', {
                roleName: getRoleDisplayName(currentSelection.roleName),
              })}
            </p>
          )}
          {canSelectRoles() && !currentSelection && (
            <p className='text-sm text-werewolf-purple'>
              {t('gameComponent.room.roleSelection.clickCardToDraw')}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col'>
        <ScrollArea className='flex-1 pr-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px]'>
            {shuffledRoles.map(role => {
              const roleDesign = getRoleDesignById(role.roleDesignId);
              const selection = getSelectionByRoleId(role.roleDesignId);
              const isTakenByAI =
                !!role.roleDesignId && aiAssignedRoleIds.has(role.roleDesignId);
              const isSelected = !!selection || isTakenByAI;
              const isCurrentSelection = selection?.user_id === currentPlayerId;
              const isTakenByOther = isSelected && !isCurrentSelection;
              const isRevealed = isCurrentSelection;
              const canSelect =
                canSelectRoles() &&
                !isReady &&
                !playerHasSelected &&
                !isSelected &&
                role.roleDesignId;
              const imageUrl = role.roleDesignId
                ? getLocalImageByDesignId(role.roleDesignId)
                : null;

              return (
                <RoleCard
                  key={role.instanceId}
                  role={role}
                  roleDesign={roleDesign || null}
                  isSelected={isSelected}
                  isCurrentSelection={isCurrentSelection}
                  isTakenByOther={isTakenByOther}
                  isRevealed={isRevealed}
                  canSelect={!!canSelect}
                  imageUrl={imageUrl}
                  flipped={isFlipped(role.instanceId)}
                  onFlip={() => handleCardFlip(role.instanceId)}
                  onSelect={() => handleRoleSelect(role)}
                />
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
