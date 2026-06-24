/**
 * 文件级注释：房间角色选择组件
 * 在角色设计数据加载完成后再展开角色实例，避免加载阶段的空匹配告警。
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

interface RoleSelectionProps {
  maxPlayers: number;
  currentPlayerCount: number;
  selectedCharacter: string | null;
  onCharacterSelect: (characterId: string | null) => void;
  roomId: string;
  currentPlayerId: string | null;
  isReady: boolean;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  maxPlayers,
  currentPlayerCount,
  selectedCharacter,
  onCharacterSelect,
  roomId,
  currentPlayerId,
  isReady,
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

  const currentSelection = getCurrentPlayerSelection();
  const currentSelectedRoleId = currentSelection?.roleId || null;

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

    if (isReady) {
      toast({
        title: getRoleSelectionToast('cannotSelectRole'),
        description: getRoleSelectionToast('cancelReadyFirst'),
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

    if (
      isRoleSelected(role.roleDesignId) &&
      currentSelectedRoleId !== role.roleDesignId
    ) {
      toast({
        title: getRoleSelectionToast('roleAlreadySelected'),
        description: getRoleSelectionToast('roleAlreadySelected'),
        variant: 'destructive',
      });
      return;
    }

    if (currentSelectedRoleId === role.roleDesignId) {
      const success = await unselectRole();
      if (success) {
        onCharacterSelect(null);
        toast({
          title: getRoleSelectionToast('roleUnselected'),
          description: getRoleSelectionToast('roleUnselectedDesc'),
        });
      } else {
        toast({
          title: t('common.error'),
          description: getRoleSelectionToast('unselectFailed'),
          variant: 'destructive',
        });
      }
      return;
    }

    const success = await selectRole(role.roleDesignId);
    if (success) {
      onCharacterSelect(role.roleDesignId);
      toast({
        title: getRoleSelectionToast('roleSelected'),
        description: t('gameComponent.room.roleSelection.selectedRole', {
          roleName: getRoleDisplayName(role.roleName),
        }),
      });
    } else {
      toast({
        title: t('common.error'),
        description: getRoleSelectionToast('selectRoleFailed'),
        variant: 'destructive',
      });
    }
  };

  const isFlipped = (roleInstanceId: string) =>
    flippedCards.has(roleInstanceId);

  const getRoleDesignById = (roleDesignId: string | undefined) => {
    if (!roleDesignId) return null;
    return roleDesigns.find(design => design.id === roleDesignId);
  };

  if (roleDesignsLoading) {
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
            {t('players_game')} ({expandedRoles.length}
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
        </div>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col'>
        <ScrollArea className='flex-1 pr-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px]'>
            {expandedRoles.map(role => {
              const roleDesign = getRoleDesignById(role.roleDesignId);
              const isSelected = role.roleDesignId
                ? isRoleSelected(role.roleDesignId)
                : false;
              const isCurrentSelection =
                currentSelectedRoleId === role.roleDesignId;
              const canSelect =
                canSelectRoles() &&
                !isReady &&
                (!isSelected || isCurrentSelection) &&
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
