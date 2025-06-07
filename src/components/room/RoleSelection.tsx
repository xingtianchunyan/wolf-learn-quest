
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getRoleConfiguration, expandRoles } from '@/utils/roleConfiguration';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { useToast } from '@/components/ui/use-toast';

interface RoleSelectionProps {
  maxPlayers: number;
  selectedCharacter: string | null;
  onCharacterSelect: (characterId: string | null) => void;
  roomId: string;
  currentPlayerId: string | null;
  isReady: boolean;
  playerCount: number;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  maxPlayers,
  selectedCharacter,
  onCharacterSelect,
  roomId,
  currentPlayerId,
  isReady,
  playerCount
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const roleConfigs = getRoleConfiguration(maxPlayers);
  const expandedRoles = expandRoles(roleConfigs);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [previousMaxPlayers, setPreviousMaxPlayers] = useState(maxPlayers);

  const {
    selectRole,
    unselectRole,
    isRoleSelected,
    getCurrentPlayerSelection,
    loading: roleSelectionLoading,
    calculateSelectionLimit,
    canSelectRole,
    resetAllSelections
  } = useRoleSelection(roomId, currentPlayerId);

  // 获取当前玩家选择的角色
  const currentSelection = getCurrentPlayerSelection();

  // 监听最大玩家数变化，如果变化则重置所有选择
  useEffect(() => {
    if (previousMaxPlayers !== maxPlayers && previousMaxPlayers > 0) {
      resetAllSelections().then((success) => {
        if (success) {
          onCharacterSelect(null);
          toast({
            title: '房间设置变更',
            description: '最大玩家数已变更，所有角色选择已重置',
          });
        }
      });
    }
    setPreviousMaxPlayers(maxPlayers);
  }, [maxPlayers, previousMaxPlayers, resetAllSelections, onCharacterSelect, toast]);

  // 计算选择限制信息
  const selectionLimit = calculateSelectionLimit(playerCount, maxPlayers);
  const canSelect = canSelectRole(playerCount, maxPlayers);

  // 技能详细信息映射
  const skillDetails = {
    skill_night_attack: { name: 'skill_night_attack', effect: 'effect_night_attack', uses: 'usage_unlimited', type: 'type_attack' },
    skill_prophecy: { name: 'skill_prophecy', effect: 'effect_prophecy', uses: 'usage_unlimited', type: 'type_view' },
    skill_magic_potion: { name: 'skill_magic_potion', effect: 'effect_magic_potion', uses: 'usage_2', type: 'type_protect_or_attack' },
    skill_dying_shot: { name: 'skill_dying_shot', effect: 'effect_dying_shot', uses: 'usage_1', type: 'type_attack' },
    skill_vigil: { name: 'skill_vigil', effect: 'effect_vigil', uses: 'usage_unlimited', type: 'type_protect' },
    skill_sleep: { name: 'skill_sleep', effect: 'effect_none', uses: 'usage_unlimited', type: 'type_none' },
    skill_self_destruct: { name: 'skill_self_destruct', effect: 'effect_self_destruct', uses: 'usage_1', type: 'type_attack' },
    skill_voodoo: { name: 'skill_voodoo', effect: 'effect_voodoo', uses: 'usage_1', type: 'type_protect' },
    skill_demon_eye: { name: 'skill_demon_eye', effect: 'effect_demon_eye', uses: 'usage_unlimited', type: 'type_view' }
  };

  const handleCardDoubleClick = (roleId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roleId)) {
        newSet.delete(roleId);
      } else {
        newSet.add(roleId);
      }
      return newSet;
    });
  };

  const handleRoleClick = async (roleId: string) => {
    // 如果已经准备，不能选择角色
    if (isReady) {
      toast({
        title: t('cannot_select_role'),
        description: '请先取消准备状态才能选择角色',
        variant: "destructive",
      });
      return;
    }

    // 检查玩家数量限制
    if (playerCount < 3) {
      toast({
        title: '玩家数量不足',
        description: '房间内至少需要3名玩家才能选择角色',
        variant: "destructive",
      });
      return;
    }

    // 如果当前玩家已选择这个角色，则取消选择
    if (currentSelection === roleId) {
      const success = await unselectRole();
      if (success) {
        onCharacterSelect(null);
        toast({
          title: t('role_unselected'),
          description: '已取消角色选择',
        });
      } else {
        toast({
          title: t('error'),
          description: '取消选择失败，请重试',
          variant: "destructive",
        });
      }
      return;
    }

    // 如果角色已被其他玩家选择，不能选择
    if (isRoleSelected(roleId)) {
      toast({
        title: t('role_already_selected'),
        description: '该角色已被其他玩家选择',
        variant: "destructive",
      });
      return;
    }

    // 检查是否还有选择名额
    if (!canSelect) {
      toast({
        title: '选择名额已满',
        description: `当前最多只允许 ${selectionLimit} 名玩家选择角色`,
        variant: "destructive",
      });
      return;
    }

    // 选择新角色
    const success = await selectRole(roleId);
    if (success) {
      onCharacterSelect(roleId);
      toast({
        title: t('role_selected'),
        description: `已选择角色：${t(expandedRoles.find(r => r.instanceId === roleId)?.name || '')}`,
      });
    } else {
      toast({
        title: t('error'),
        description: '选择角色失败，请重试',
        variant: "destructive",
      });
    }
  };

  const isFlipped = (roleId: string) => flippedCards.has(roleId);

  const getSelectionStatusMessage = () => {
    if (playerCount < 3) {
      return `需要至少3名玩家才能选择角色 (当前: ${playerCount})`;
    }
    if (playerCount >= maxPlayers) {
      return `所有玩家都可以选择角色`;
    }
    return `当前最多 ${selectionLimit} 名玩家可选择角色`;
  };

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-werewolf-purple">{t('select_role')}</CardTitle>
        <div className="space-y-1">
          <p className="text-sm text-gray-400">
            {t('current_config')}: {maxPlayers}{t('players_game')} ({expandedRoles.length}{t('roles')})
          </p>
          <p className="text-sm text-yellow-400">
            {getSelectionStatusMessage()}
          </p>
          {currentSelection && (
            <p className="text-sm text-werewolf-purple">
              当前选择：{t(expandedRoles.find(r => r.instanceId === currentSelection)?.name || '')}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px]">
            {expandedRoles.map((role) => {
              const flipped = isFlipped(role.instanceId);
              const skill = skillDetails[role.description as keyof typeof skillDetails];
              const isSelected = isRoleSelected(role.instanceId);
              const isCurrentSelection = currentSelection === role.instanceId;
              const canSelectThis = !isReady && (!isSelected || isCurrentSelection) && (canSelect || isCurrentSelection) && playerCount >= 3;
              
              return (
                <div 
                  key={role.instanceId}
                  className={`relative transition-all duration-300 transform hover:scale-105 ${
                    canSelectThis ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  } ${
                    isCurrentSelection
                      ? 'ring-2 ring-werewolf-purple' 
                      : isSelected
                      ? 'ring-2 ring-red-500'
                      : ''
                  }`}
                  onClick={() => handleRoleClick(role.instanceId)}
                  onDoubleClick={() => handleCardDoubleClick(role.instanceId)}
                  style={{ perspective: '1000px' }}
                >
                  {isSelected && !isCurrentSelection && (
                    <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      已选择
                    </div>
                  )}
                  {isCurrentSelection && (
                    <div className="absolute top-2 right-2 z-10 bg-werewolf-purple text-white px-2 py-1 rounded text-xs">
                      我的选择
                    </div>
                  )}
                  <div 
                    className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${
                      flipped ? 'rotate-y-180' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* 正面 - 角色形象和名称 */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg p-4 backface-hidden ${
                        isCurrentSelection
                          ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple' 
                          : isSelected
                          ? 'bg-red-900/30 border-2 border-red-500'
                          : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
                      }`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex-1 bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center">
                          <img 
                            src={role.image} 
                            alt={t(role.name)} 
                            className="max-h-full max-w-full object-contain p-2"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-lg text-white mb-2">
                            {t(role.name)}
                          </h3>
                          <div className="text-xs text-gray-400">
                            双击查看技能详情
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 背面 - 阵营和技能详情 */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg p-4 backface-hidden rotate-y-180 ${
                        isCurrentSelection
                          ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple' 
                          : isSelected
                          ? 'bg-red-900/30 border-2 border-red-500'
                          : 'bg-werewolf-dark/40'
                      }`}
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="h-full flex flex-col">
                        {/* 阵营信息 */}
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-lg text-white mb-2">
                            {t(role.name)}
                          </h3>
                          <span 
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              role.team === 'Village' ? 'bg-green-900/60 text-green-200' : 
                              role.team === 'Werewolves' ? 'bg-red-900/60 text-red-200' :
                              'bg-purple-900/60 text-purple-200'
                            }`}
                          >
                            {t(role.team.toLowerCase())}阵营
                          </span>
                        </div>

                        {/* 技能详情 */}
                        <div className="flex-1 bg-werewolf-dark/60 rounded-md p-2">
                          <div className="space-y-2">
                            <div>
                              <h4 className="text-xs text-werewolf-purple font-semibold mb-0.5">
                                技能名称
                              </h4>
                              <p className="text-xs text-gray-300">
                                {t(skill?.name || role.description)}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-xs text-werewolf-purple font-semibold mb-0.5">
                                技能效果
                              </h4>
                              <p className="text-xs text-gray-300 leading-tight">
                                {skill ? t(skill.effect) : '暂无详细说明'}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-xs text-werewolf-purple font-semibold mb-0.5">
                                使用次数
                              </h4>
                              <p className="text-sm text-gray-300">
                                {skill ? t(skill.uses) : '无限制'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-center mt-3">
                          <div className="text-xs text-gray-400">
                            双击返回正面
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
