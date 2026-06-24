import React from 'react';
import type { ExpandedRole } from '@/utils/roleConfiguration';
import type { RoleDesign } from '@/hooks/useRoleDesigns';
import {
  ROLE_SKILL_MAPPING,
  SKILL_MAPPING_CONFIG,
} from '@/utils/skillMappingConfig';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { HelpCircle, Sparkles } from 'lucide-react';

interface RoleCardProps {
  role: ExpandedRole;
  roleDesign: RoleDesign | null;
  isSelected: boolean;
  isCurrentSelection: boolean;
  isTakenByOther: boolean;
  isRevealed: boolean;
  canSelect: boolean;
  imageUrl: string | null;
  onSelect: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  roleDesign,
  isSelected,
  isCurrentSelection,
  isTakenByOther,
  isRevealed,
  canSelect,
  imageUrl,
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
    const config = getSkillConfig(roleDesign?.role_name);
    const usage = roleDesign?.skill_usage;

    if (usage === -1 || usage === null || usage === undefined) {
      if (config?.usageLimit === 'unlimited' || usage === -1) {
        return t('gameComponent.room.roleCard.unlimited');
      }
    }

    if (typeof usage === 'number' && usage > 0) {
      return String(usage);
    }

    if (typeof config?.usageLimit === 'number') {
      return String(config.usageLimit);
    }

    return t('gameComponent.room.roleCard.unlimited');
  };

  const getSkillTypeText = () => {
    if (!roleDesign?.skill_type) {
      return t('gameComponent.room.roleCard.none');
    }

    const translateType = (value: unknown): string => {
      if (typeof value !== 'string') return String(value);
      const normalizedValue = value === 'check' ? 'view' : value;
      const key = `game.skill.type.${normalizedValue}` as never;
      const translated = t(key);
      return translated !== key ? translated : value;
    };

    if (Array.isArray(roleDesign.skill_type)) {
      if (roleDesign.skill_type.length === 0) {
        return t('gameComponent.room.roleCard.none');
      }
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

  // 迷雾层：未揭示的卡片始终覆盖迷雾；被其他玩家选中的卡片增加呼吸动画
  const renderMistOverlay = () => {
    const baseClasses =
      'absolute inset-0 rounded-lg z-20 flex flex-col items-center justify-center transition-opacity duration-500';
    const mistClasses = isTakenByOther
      ? 'bg-slate-900/85 animate-mist-breathe'
      : 'bg-slate-900/80';

    return (
      <div className={`${baseClasses} ${mistClasses}`}>
        <div className='relative'>
          <Sparkles className='w-10 h-10 text-werewolf-purple/60 mb-2' />
          {isTakenByOther && (
            <span className='absolute -top-1 -right-1 flex h-3 w-3'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-werewolf-purple opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-werewolf-purple'></span>
            </span>
          )}
        </div>
        <HelpCircle className='w-12 h-12 text-gray-400 mb-3' />
        <p className='text-gray-300 text-sm font-medium text-center px-4'>
          {isTakenByOther
            ? t('gameComponent.room.roleCard.takenByOther')
            : t('gameComponent.room.roleCard.clickToDraw')}
        </p>
        {isTakenByOther && (
          <p className='text-werewolf-purple text-xs mt-2'>
            {t('gameComponent.room.roleCard.waitingForReveal')}
          </p>
        )}
      </div>
    );
  };

  return (
    <div
      className={`relative transition-all duration-300 transform hover:scale-105 ${
        isCurrentSelection
          ? 'ring-2 ring-werewolf-purple'
          : isSelected
            ? 'ring-2 ring-werewolf-purple/50'
            : ''
      }`}
      style={{ perspective: '1000px' }}
    >
      {isCurrentSelection && (
        <div className='absolute top-2 right-2 z-30 bg-werewolf-purple text-white px-2 py-1 rounded text-xs shadow-lg'>
          {t('gameComponent.room.roleCard.mySelection')}
        </div>
      )}
      {isTakenByOther && (
        <div className='absolute top-2 left-2 z-30 bg-slate-700 text-gray-200 px-2 py-1 rounded text-xs shadow-lg'>
          {t('gameComponent.room.roleCard.selected')}
        </div>
      )}

      <div
        className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${
          isRevealed ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 正面 - 迷雾覆盖的抽卡背面 */}
        <div
          className={`absolute inset-0 w-full h-full rounded-lg p-4 backface-hidden cursor-pointer ${
            canSelect && !isSelected
              ? 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
              : 'bg-werewolf-dark/40 cursor-not-allowed'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
          onClick={() => canSelect && !isSelected && onSelect()}
        >
          <div className='h-full flex flex-col items-center justify-center relative overflow-hidden rounded-md border border-werewolf-purple/20 bg-gradient-to-br from-werewolf-dark/80 to-werewolf-purple/10'>
            <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-werewolf-purple via-transparent to-transparent'></div>
            <HelpCircle className='w-16 h-16 text-gray-500 mb-4' />
            <p className='text-gray-400 text-sm'>
              {t('gameComponent.room.roleCard.mysteryRole')}
            </p>
          </div>
          {renderMistOverlay()}
        </div>

        {/* 背面 - 揭示后的角色详情 */}
        <div
          className={`absolute inset-0 w-full h-full rounded-lg p-4 backface-hidden rotate-y-180 ${
            isCurrentSelection
              ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple'
              : 'bg-werewolf-dark/40 border-2 border-werewolf-purple/30'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className='h-full flex flex-col'>
            <div className='flex-1 bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center overflow-hidden relative'>
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

            <div className='text-center mb-2'>
              <h3 className='font-bold text-lg text-white mb-1'>
                {getRoleDisplayName(role.roleName)}
              </h3>
              <span
                className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium ${
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

            <div className='bg-werewolf-dark/60 rounded-md p-2 flex-1 overflow-y-auto'>
              <div className='space-y-1.5'>
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

                <div className='flex gap-4'>
                  <div>
                    <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                      {t('gameComponent.room.roleCard.skillUsage')}
                    </h4>
                    <p className='text-xs text-gray-300'>
                      {getSkillUsageText()}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                      {t('gameComponent.room.roleCard.skillType')}
                    </h4>
                    <p className='text-xs text-gray-300'>
                      {getSkillTypeText()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
