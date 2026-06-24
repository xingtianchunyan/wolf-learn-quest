import React from 'react';
import type { ExpandedRole } from '@/utils/roleConfiguration';
import type { RoleDesign } from '@/hooks/useRoleDesigns';
import {
  ROLE_SKILL_MAPPING,
  SKILL_MAPPING_CONFIG,
} from '@/utils/skillMappingConfig';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface RoleCardProps {
  role: ExpandedRole;
  roleDesign: RoleDesign | null;
  isSelected: boolean;
  isCurrentSelection: boolean;
  canSelect: boolean;
  imageUrl: string | null;
  flipped: boolean;
  onFlip: () => void;
  onSelect: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  roleDesign,
  isSelected,
  isCurrentSelection,
  canSelect,
  imageUrl,
  flipped,
  onFlip,
  onSelect,
}) => {
  const { t } = useLanguage();

  const getFactionLabel = () => {
    if (roleDesign?.faction === false) {
      return t('gameComponent.room.roleCard.villagerFaction');
    }
    if (roleDesign?.faction === true) {
      return t('gameComponent.room.roleCard.werewolfFaction');
    }
    return t('gameComponent.room.roleCard.unknownFaction');
  };

  const getRoleDisplayName = (roleName: string) => {
    const baseName = roleName.replace(/_\d+$/, '');
    const keyMap: Record<string, string> = {
      whitewolf: 'game.role.white_wolf',
    };
    const key = keyMap[baseName] || `game.role.${baseName}`;
    const translated = t(key as never);
    return translated !== key ? translated : role.displayName;
  };

  const getSkillUsageText = () => {
    if (roleDesign?.skill_usage === -1) {
      return t('gameComponent.room.roleCard.unlimited');
    }
    return roleDesign?.skill_usage || 0;
  };

  const getSkillTypeText = () => {
    if (!roleDesign?.skill_type) {
      return t('gameComponent.room.roleCard.none');
    }

    const translateType = (value: unknown): string => {
      if (typeof value !== 'string') return String(value);
      const key = `game.skill.type.${value}` as never;
      const translated = t(key);
      return translated !== key ? translated : value;
    };

    if (Array.isArray(roleDesign.skill_type)) {
      return roleDesign.skill_type.map(translateType).join(', ');
    }

    if (typeof roleDesign.skill_type === 'string') {
      return translateType(roleDesign.skill_type);
    }

    return JSON.stringify(roleDesign.skill_type);
  };

  const getSkillConfig = (roleName?: string) => {
    if (!roleName) return null;
    const baseName = roleName.replace(/_\d+$/, '');
    const skillId = ROLE_SKILL_MAPPING[baseName];
    return skillId ? SKILL_MAPPING_CONFIG[skillId] : null;
  };

  const getSkillName = () => {
    const config = getSkillConfig(roleDesign?.role_name);
    if (!config) {
      return roleDesign?.skill_name || t('gameComponent.room.roleCard.noSkill');
    }
    const key = `skill_${config.englishName.toLowerCase()}` as never;
    const translated = t(key);
    return translated !== key
      ? translated
      : roleDesign?.skill_name || config.chineseName;
  };

  const getSkillDescription = () => {
    const config = getSkillConfig(roleDesign?.role_name);
    if (!config) {
      return (
        roleDesign?.skill_description ||
        t('gameComponent.room.roleCard.noDescription')
      );
    }
    const key = `effect_${config.englishName.toLowerCase()}` as never;
    const translated = t(key);
    return translated !== key
      ? translated
      : roleDesign?.skill_description ||
          config.description ||
          t('gameComponent.room.roleCard.noDescription');
  };

  return (
    <div
      className={`relative transition-all duration-300 transform hover:scale-105 ${
        isCurrentSelection
          ? 'ring-2 ring-werewolf-purple'
          : isSelected
            ? 'ring-2 ring-red-500'
            : ''
      }`}
      style={{ perspective: '1000px' }}
    >
      {isSelected && !isCurrentSelection && (
        <div className='absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs'>
          {t('gameComponent.room.roleCard.selected')}
        </div>
      )}
      {isCurrentSelection && (
        <div className='absolute top-2 right-2 z-10 bg-werewolf-purple text-white px-2 py-1 rounded text-xs'>
          {t('gameComponent.room.roleCard.mySelection')}
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
          <div className='h-full flex flex-col'>
            <div
              className={`flex-1 bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center overflow-hidden relative ${
                canSelect ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
              onClick={() => canSelect && onSelect()}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={getRoleDisplayName(role.roleName)}
                  className='w-full h-full object-cover rounded-md'
                  onError={e => {
                    console.error('Image failed to load:', imageUrl);
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector(
                      '.fallback-icon'
                    ) as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                className={`fallback-icon ${imageUrl ? 'hidden' : 'flex'} absolute inset-0 text-6xl items-center justify-center w-full h-full`}
              >
                🎭
              </div>
            </div>
            <div className='text-center cursor-pointer' onClick={onFlip}>
              <h3 className='font-bold text-lg text-white mb-2'>
                {getRoleDisplayName(role.roleName)}
              </h3>
              <div className='text-xs text-gray-400'>
                {t('gameComponent.room.roleCard.clickToSelect')}
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
            transform: 'rotateY(180deg)',
          }}
        >
          <div className='h-full flex flex-col'>
            <div className='text-center mb-4'>
              <h3 className='font-bold text-lg text-white mb-2'>
                {getRoleDisplayName(role.roleName)}
              </h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  roleDesign?.faction === false
                    ? 'bg-green-900/60 text-green-200'
                    : roleDesign?.faction === true
                      ? 'bg-red-900/60 text-red-200'
                      : 'bg-purple-900/60 text-purple-200'
                }`}
              >
                {getFactionLabel()}
                {t('gameComponent.room.roleCard.factionSuffix')}
              </span>
            </div>

            <div className='flex-1 bg-werewolf-dark/60 rounded-md p-2'>
              <div className='space-y-2'>
                <div>
                  <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                    {t('gameComponent.room.roleCard.skillName')}
                  </h4>
                  <p className='text-xs text-gray-300'>{getSkillName()}</p>
                </div>

                <div>
                  <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                    {t('gameComponent.room.roleCard.skillEffect')}
                  </h4>
                  <p className='text-xs text-gray-300 leading-tight'>
                    {getSkillDescription()}
                  </p>
                </div>

                <div>
                  <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                    {t('gameComponent.room.roleCard.skillUsage')}
                  </h4>
                  <p className='text-sm text-gray-300'>{getSkillUsageText()}</p>
                </div>

                <div>
                  <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                    {t('gameComponent.room.roleCard.skillType')}
                  </h4>
                  <p className='text-sm text-gray-300'>{getSkillTypeText()}</p>
                </div>
              </div>
            </div>

            <div className='text-center mt-3 cursor-pointer' onClick={onFlip}>
              <div className='text-xs text-gray-400'>
                {t('gameComponent.room.roleCard.flipBack')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
