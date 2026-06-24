import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Sword, Eye, Ban } from 'lucide-react';
import type { SkillEffects, RoleAttributes } from '@/utils/skillSystemHelpers';
import {
  getSkillEffectTypes,
  getSkillTargetTypes,
  hasSpecialAbility,
} from '@/utils/skillSystemHelpers';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface RoleSkillInfoProps {
  roleName: string;
  skillEffects?: SkillEffects;
  roleAttributes?: RoleAttributes;
  className?: string;
}

const RoleSkillInfo: React.FC<RoleSkillInfoProps> = ({
  roleName,
  skillEffects,
  roleAttributes,
  className = '',
}) => {
  const { t } = useLanguage();

  const getRoleDisplayName = (name: string) => {
    const baseName = name.replace(/_\d+$/, '');
    const keyMap: Record<string, string> = {
      whitewolf: 'game.role.white_wolf',
    };
    const key = keyMap[baseName] || `game.role.${baseName}`;
    const translated = t(key as never);
    return translated !== key ? translated : name;
  };

  const getSkillIcon = (effectType: string) => {
    switch (effectType) {
      case 'attack':
        return <Sword className='h-3 w-3' />;
      case 'protect':
        return <Shield className='h-3 w-3' />;
      case 'check':
        return <Eye className='h-3 w-3' />;
      case 'none':
        return <Ban className='h-3 w-3' />;
      default:
        return null;
    }
  };

  const getSkillTypeColor = (effectType: string) => {
    switch (effectType) {
      case 'attack':
        return 'bg-red-500/20 text-red-400 border-red-400';
      case 'protect':
        return 'bg-green-500/20 text-green-400 border-green-400';
      case 'check':
        return 'bg-blue-500/20 text-blue-400 border-blue-400';
      case 'none':
        return 'bg-gray-500/20 text-gray-400 border-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400';
    }
  };

  const getTargetTypeText = (targetTypes: string[]) => {
    return targetTypes
      .map(type => {
        switch (type) {
          case 'single':
            return t('gameComponent.skillInfo.targetTypes.single');
          case 'self':
            return t('gameComponent.skillInfo.targetTypes.self');
          case 'multiple':
            return t('gameComponent.skillInfo.targetTypes.multiple');
          case 'all':
            return t('gameComponent.skillInfo.targetTypes.all');
          default:
            return type;
        }
      })
      .join(', ');
  };

  const getPhaseText = (phases: string[]) => {
    return phases
      .map(phase => {
        switch (phase) {
          case 'day':
            return t('game.phase.day');
          case 'evening':
            return t('game.phase.evening');
          case 'night':
            return t('game.phase.night');
          case 'dawn':
            return t('game.phase.dawn');
          default:
            return phase;
        }
      })
      .join(', ');
  };

  const getFactionColor = (isWolfFaction: boolean) => {
    return isWolfFaction ? 'text-red-400' : 'text-blue-400';
  };

  const isWolfFaction = (victoryCondition: string) => {
    const lower = victoryCondition.toLowerCase();
    return lower.includes('werewolf') || lower.includes('狼人');
  };

  if (!skillEffects && !roleAttributes) {
    return null;
  }

  return (
    <Card
      className={`bg-werewolf-dark/40 border-werewolf-purple/30 ${className}`}
    >
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm text-werewolf-purple flex items-center justify-between'>
          <span>
            {t('gameComponent.skillInfo.title', {
              role: getRoleDisplayName(roleName),
            })}
          </span>
          {roleAttributes && (
            <Badge
              variant='outline'
              className={getFactionColor(
                isWolfFaction(roleAttributes.victory_condition)
              )}
            >
              {isWolfFaction(roleAttributes.victory_condition)
                ? t('game.faction.werewolf_camp')
                : t('game.faction.good_guys_camp')}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {skillEffects && (
          <div className='space-y-2'>
            <div className='flex flex-wrap gap-1'>
              {getSkillEffectTypes(skillEffects).map((effectType, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className={`text-xs ${getSkillTypeColor(effectType)}`}
                >
                  {getSkillIcon(effectType)}
                  <span className='ml-1'>
                    {effectType === 'attack'
                      ? t('gameComponent.skillInfo.effect.attack')
                      : effectType === 'protect'
                        ? t('gameComponent.skillInfo.effect.protect')
                        : effectType === 'check'
                          ? t('gameComponent.skillInfo.effect.check')
                          : effectType === 'none'
                            ? t('gameComponent.skillInfo.effect.none')
                            : effectType}
                  </span>
                </Badge>
              ))}
            </div>

            <div className='text-xs text-gray-400 space-y-1'>
              <div>
                {t('gameComponent.skillInfo.targetType')}:{' '}
                {getTargetTypeText(getSkillTargetTypes(skillEffects))}
              </div>
              <div>
                {t('gameComponent.skillInfo.activePhases')}:{' '}
                {getPhaseText(skillEffects.active_phases)}
              </div>
              <div>
                {t('gameComponent.skillInfo.priority')}: {skillEffects.priority}
              </div>
            </div>
          </div>
        )}

        {roleAttributes && roleAttributes.special_abilities.length > 0 && (
          <div className='space-y-1'>
            <div className='text-xs font-medium text-werewolf-purple'>
              {t('gameComponent.skillInfo.specialAbilities')}
            </div>
            {roleAttributes.special_abilities.map((ability, index) => (
              <Badge
                key={index}
                variant='outline'
                className='text-xs bg-purple-500/20 text-purple-400 border-purple-400'
              >
                {ability}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleSkillInfo;
