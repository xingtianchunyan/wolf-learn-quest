
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getRoleConfiguration, expandRoles } from '@/utils/roleConfiguration';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface RoleSelectionProps {
  maxPlayers: number;
  selectedCharacter: string | null;
  onCharacterSelect: (characterId: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  maxPlayers,
  selectedCharacter,
  onCharacterSelect
}) => {
  const { t } = useLanguage();
  const roleConfigs = getRoleConfiguration(maxPlayers);
  const expandedRoles = expandRoles(roleConfigs);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  // 技能详细信息映射 - 基于游戏规则对话框中的数据
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

  const isFlipped = (roleId: string) => flippedCards.has(roleId);

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-werewolf-purple">{t('select_role')}</CardTitle>
        <p className="text-sm text-gray-400">
          {t('current_config')}: {maxPlayers}{t('players_game')} ({expandedRoles.length}{t('roles')})
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px]">
            {expandedRoles.map((role) => {
              const flipped = isFlipped(role.instanceId);
              const skill = skillDetails[role.description as keyof typeof skillDetails];
              
              return (
                <div 
                  key={role.instanceId}
                  className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedCharacter === role.instanceId
                      ? 'ring-2 ring-werewolf-purple' 
                      : ''
                  }`}
                  onClick={() => onCharacterSelect(role.instanceId)}
                  onDoubleClick={() => handleCardDoubleClick(role.instanceId)}
                  style={{ perspective: '1000px' }}
                >
                  <div 
                    className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${
                      flipped ? 'rotate-y-180' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* 正面 - 角色形象和名称 */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg p-4 backface-hidden ${
                        selectedCharacter === role.instanceId
                          ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple' 
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
                        selectedCharacter === role.instanceId
                          ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple' 
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
                        <div className="flex-1 bg-werewolf-dark/60 rounded-md p-3">
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-werewolf-purple font-semibold mb-1">
                                技能名称
                              </h4>
                              <p className="text-sm text-gray-300">
                                {t(skill?.name || role.description)}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-werewolf-purple font-semibold mb-1">
                                技能效果
                              </h4>
                              <p className="text-sm text-gray-300">
                                {skill ? t(skill.effect) : '暂无详细说明'}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-werewolf-purple font-semibold mb-1">
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
