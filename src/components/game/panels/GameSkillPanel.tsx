import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  Target,
  Clock,
  Zap,
  Shield,
  Search,
  Skull,
} from 'lucide-react';
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
import { getSkillConfigByEnglish } from '@/utils/skillMappingConfig';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import type { Tables } from '@/integrations/supabase/types';

/**
 * 文件: GameSkillPanel.tsx
 * 描述: 夜晚/拂晓阶段的技能使用面板。展示技能信息、目标选择提示、使用按钮与记录。
 * 依赖: useEnhancedSkillSystem 钩子提供技能可用性校验与执行。
 */

/**
 * 组件属性接口：用于描述技能面板所需的上下文信息与回调
 */
interface GameSkillPanelProps {
  roomId: string;
  gameStateId: string;
  userId: string;
  currentPhase: number;
  roleState: Tables<'role_states'> | null;
  roleDesign: Tables<'role_design'> | null;
  players?: Array<{
    userId: string;
    name: string;
    roleStatus?: number;
    status?: string;
  }>;
  currentRound?: number;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
}

/**
 * GameSkillPanel 组件
 * - 展示当前角色技能的基础信息
 * - 引导用户在左侧玩家列表中点击选择目标
 * - 根据 useEnhancedSkillSystem.canUseSkill 返回结果与是否选择目标控制按钮可点击状态
 */
const GameSkillPanel: React.FC<GameSkillPanelProps> = ({
  roomId,
  gameStateId,
  userId,
  currentPhase,
  roleState,
  roleDesign,
  players,
  currentRound = 1,
  selectedTargetId,
  onTargetSelect,
}) => {
  const { t } = useLanguage();
  const {
    skillUses,
    loading,
    useSkillEnhanced: useSkill,
    getUserSkillData,
    canUseSkill: canUseSkillFromHook,
  } = useEnhancedSkillSystem(roomId, gameStateId, userId);

  // 将技能英文名映射到已有的翻译 key（en.ts / zh.ts 中的 skill_*/effect_*）
  const getSkillName = (englishName: string) => {
    const key = `skill_${englishName.toLowerCase()}` as never;
    const translated = t(key);
    return translated !== key ? translated : englishName;
  };

  const getSkillDescription = (englishName: string) => {
    const key = `effect_${englishName.toLowerCase()}` as never;
    const translated = t(key);
    return translated !== key
      ? translated
      : roleDesign?.skill_description ||
          skillConfig?.description ||
          englishName;
  };

  const getEffectTypeLabel = (effectType: string) => {
    const key =
      `gameComponent.gameSkillPanel.effectTypes.${effectType}` as never;
    const translated = t(key);
    return translated !== key ? translated : effectType;
  };

  const getTargetTypeLabel = (targetType: string) => {
    const key = `gameComponent.skillInfo.targetTypes.${targetType}` as never;
    const translated = t(key);
    return translated !== key ? translated : targetType;
  };

  // 获取技能配置
  const skillConfig = useMemo(() => {
    if (!roleDesign?.skill_name) return null;
    return getSkillConfigByEnglish(roleDesign.skill_name);
  }, [roleDesign]);

  // 检查是否可以使用技能（关键：将选择的目标与轮次一起传入，避免单体技能误判不可用）
  const canUseSkill = canUseSkillFromHook(
    roleDesign?.skill_name || '',
    roleState,
    roleDesign,
    currentPhase,
    selectedTargetId,
    currentRound
  );

  // 获取用户的技能使用数据
  const userSkillData = getUserSkillData(userId);

  // 获取可选择的目标玩家
  const availableTargets = useMemo(() => {
    if (!players) return [];

    return players.filter(player => {
      // 排除自己
      if (player.userId === userId) return false;

      // 排除已淘汰的玩家
      if (player.status === 'eliminated' || player.roleStatus === 4)
        return false;

      // 狼人夜袭技能的特殊限制：不能攻击其他狼人和白狼队友
      if (
        skillConfig?.englishName === 'night_attack' &&
        roleDesign?.role_name
      ) {
        const currentRoleName = roleDesign.role_name.toLowerCase();
        if (
          currentRoleName.includes('werewolf') ||
          currentRoleName.includes('wolf') ||
          currentRoleName.includes('狼人')
        ) {
          // 需要获取目标玩家的角色信息来判断是否为狼人阵营
          // 这里暂时通过角色名判断，后续可以优化为通过roleStates获取
          // 由于我们没有直接访问其他玩家角色信息的权限，这个限制需要在服务端验证
          // 前端只做基础过滤，主要的验证在后端进行
        }
      }

      return true;
    });
  }, [players, userId, skillConfig, roleDesign]);

  /**
   * 处理技能使用点击
   * - 若技能配置或可用性校验不通过则直接返回
   * - 执行技能后清空已选目标
   */
  const handleUseSkill = async () => {
    if (!skillConfig || !canUseSkill) return;

    await useSkill(
      skillConfig.englishName,
      selectedTargetId || undefined,
      {},
      roleState,
      roleDesign,
      currentPhase,
      currentRound || 1
    );

    // 清空选择的目标
    onTargetSelect?.('');
  };

  if (!skillConfig) {
    return (
      <Card className='bg-werewolf-card border-werewolf-purple/30 h-full'>
        <CardHeader>
          <CardTitle>{t('gameComponent.gameSkillPanel.title')}</CardTitle>
        </CardHeader>
        <CardContent className='h-full overflow-y-auto'>
          <p className='text-sm text-muted-foreground'>
            {t('gameComponent.gameSkillPanel.noSkill')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Target className='w-4 h-4' />
          {t('gameComponent.gameSkillPanel.title')}
          <Badge variant='outline' className='ml-auto'>
            {t('gameComponent.gameSkillPanel.priority', {
              priority: skillConfig.priority,
            })}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 h-full overflow-y-auto'>
        {/* 技能信息 */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='font-medium text-werewolf-purple'>
              {getSkillName(skillConfig.englishName)}
            </span>
            <div className='flex gap-1'>
              {skillConfig.effectType.map((type, index) => (
                <Badge key={index} variant='secondary' className='text-xs'>
                  {getEffectTypeLabel(type)}
                </Badge>
              ))}
            </div>
          </div>

          <p className='text-sm text-muted-foreground'>
            {getSkillDescription(skillConfig.englishName)}
          </p>
          <p className='text-xs text-muted-foreground'>
            {t('gameComponent.skillInfo.targetType')}:{' '}
            {getTargetTypeLabel(skillConfig.targetType)}
          </p>
        </div>

        {/* 目标选择提示 */}
        {skillConfig.targetType === 'single' && availableTargets.length > 0 && (
          <div className='bg-werewolf-dark/30 border border-werewolf-purple/20 rounded-lg p-3'>
            <p className='text-sm text-gray-300 mb-1'>
              <Target className='inline w-4 h-4 mr-1' />
              {t('gameComponent.gameSkillPanel.targetHint')}
            </p>
            {selectedTargetId && (
              <p className='text-sm text-werewolf-purple'>
                {t('gameComponent.gameSkillPanel.selectedTarget', {
                  target:
                    availableTargets.find(p => p.userId === selectedTargetId)
                      ?.name || t('common.unknown_player'),
                })}
              </p>
            )}
          </div>
        )}

        {/* 使用按钮 */}
        <Button
          onClick={handleUseSkill}
          disabled={
            loading ||
            !canUseSkill ||
            (skillConfig.targetType === 'single' && !selectedTargetId)
          }
          className='w-full bg-werewolf-purple hover:bg-werewolf-purple/80'
        >
          {loading ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              {t('gameComponent.gameSkillPanel.using')}
            </>
          ) : (
            t('gameComponent.gameSkillPanel.useSkill', {
              skillName: getSkillName(skillConfig.englishName),
            })
          )}
        </Button>

        {/* 当前效果 */}
        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-gray-300'>
            {t('gameComponent.gameSkillPanel.currentEffects')}
          </h4>
          {userSkillData.targets.length > 0 ? (
            <div className='space-y-2'>
              {userSkillData.targets.map(effect => (
                <div
                  key={effect.id}
                  className='flex items-center justify-between text-xs p-2 bg-werewolf-dark/40 rounded'
                >
                  <span>
                    {effect.target_type
                      ? getEffectTypeLabel(effect.target_type)
                      : effect.target_type}
                  </span>
                  <Badge
                    variant={effect.is_active ? 'default' : 'secondary'}
                    className='text-xs'
                  >
                    {effect.is_active
                      ? t('gameComponent.gameSkillPanel.active')
                      : t('gameComponent.gameSkillPanel.inactive')}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-xs text-muted-foreground'>
              {t('gameComponent.gameSkillPanel.noActiveEffects')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameSkillPanel;
