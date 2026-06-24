// 技能验证和使用逻辑
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { createLogger } from '@/lib/logger';
import {
  EnhancedSkillService,
  type SkillUsageContext,
} from '@/services/enhancedSkillService';
import { skillCache } from '@/utils/skillCache';
import type { RoleState, RoleDesign } from '@/types/skillSystem.types';

export interface SkillSuggestion {
  canUse: boolean;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
  timing: string;
  conflicts?: string[];
}

const logger = createLogger('skill-validation');

export const useSkillValidation = (
  gameStateId?: string,
  userId?: string,
  roomId?: string
) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // 前端技能验证 - 避免发送无效请求到后端
  const validateSkillFrontend = useCallback(
    async (
      skillName: string,
      roleState?: RoleState,
      roleDesign?: RoleDesign,
      currentPhase?: number,
      targetUserId?: string,
      currentRound?: number
    ): Promise<{ canUse: boolean; reason?: string; suggestion?: string }> => {
      if (!gameStateId || !userId) {
        return {
          canUse: false,
          reason: t('hook.skill_validation.missing_context'),
        };
      }

      // 检查缓存
      const cached = skillCache.getValidationCache(
        skillName,
        userId,
        gameStateId,
        currentPhase || 1,
        targetUserId
      );

      if (cached) {
        logger.debug('使用缓存的验证结果', { skillName, cached });
        return cached;
      }

      const context: SkillUsageContext = {
        userId,
        gameStateId,
        roomId: roomId || '',
        currentPhase: currentPhase || 1,
        currentRound: currentRound || 1,
        roleState,
        roleDesign,
        targetUserId,
      };

      try {
        const validation = await EnhancedSkillService.validateSkillUsage(
          context,
          language
        );
        const result = {
          canUse: validation.isValid,
          reason: validation.reason,
          suggestion: validation.suggestedAction,
        };

        // 缓存验证结果
        skillCache.setValidationCache(
          skillName,
          userId,
          gameStateId,
          currentPhase || 1,
          result,
          targetUserId
        );

        return result;
      } catch (error) {
        logger.error('Skill validation failed', error);
        return {
          canUse: false,
          reason: t('hook.skill_validation.validation_failed'),
        };
      }
    },
    [gameStateId, userId, roomId]
  );

  // 增强的技能使用函数 - 加强前端验证和批处理
  const useSkillEnhanced = useCallback(
    async (
      skillName: string,
      targetUserId?: string,
      additionalData: Record<string, unknown> = {},
      roleState?: RoleState,
      roleDesign?: RoleDesign,
      currentPhase?: number,
      currentRound?: number
    ) => {
      if (!gameStateId || !userId) {
        return null;
      }

      // 前端预验证 - 避免无效请求
      const frontendValidation = await validateSkillFrontend(
        skillName,
        roleState,
        roleDesign,
        currentPhase,
        targetUserId,
        currentRound
      );

      if (!frontendValidation.canUse) {
        // 不显示错误弹窗，只记录日志
        logger.warn('Skill use blocked by frontend validation', {
          skillName,
          reason: frontendValidation.reason,
          suggestion: frontendValidation.suggestion,
        });
        return null;
      }

      try {
        const context: SkillUsageContext = {
          userId,
          gameStateId,
          roomId: roomId || '',
          currentPhase: currentPhase || 1,
          currentRound: currentRound || 1,
          roleState,
          roleDesign,
          targetUserId,
          additionalData,
        };

        // 直接调用技能服务
        await EnhancedSkillService.useSkillEnhanced(context, language);

        // 清除相关缓存
        skillCache.clearUserCache(userId);
        skillCache.clearGameCache(gameStateId);

        toast({
          title: t('hook.skill_validation.use_success_title'),
          description: t('hook.skill_validation.use_success_desc', {
            skillName,
          }),
        });

        return { success: true };
      } catch (error) {
        logger.error('Skill use failed', error);

        const isGameRuleError =
          error &&
          typeof error === 'object' &&
          (('code' in error && error.code === 'VALIDATION_FAILED') ||
            ('reason' in error &&
              typeof error.reason === 'string' &&
              error.reason.includes('限制')));

        if (isGameRuleError) {
          // 游戏规则相关错误，不显示弹窗，只记录日志
          logger.warn('Skill use violates game rules', error);
        } else {
          // 系统错误，显示错误弹窗
          const message =
            error &&
            typeof error === 'object' &&
            'message' in error &&
            typeof error.message === 'string'
              ? error.message
              : t('common.system_error');
          toast({
            title: t('hook.skill_validation.use_failed_title'),
            description: message,
            variant: 'destructive',
          });
        }
        return null;
      }
    },
    [gameStateId, userId, roomId, language, toast, t, validateSkillFrontend]
  );

  // 获取技能使用建议
  const getSkillSuggestion = useCallback(
    async (
      roleState?: RoleState,
      roleDesign?: RoleDesign,
      currentPhase?: number,
      currentRound?: number,
      targetUserId?: string
    ): Promise<SkillSuggestion> => {
      if (!gameStateId || !userId) {
        return {
          canUse: false,
          suggestion: t('hook.skill_validation.missing_game_state'),
          priority: 'low',
          timing: t('hook.skill_validation.unavailable'),
        };
      }

      const context: SkillUsageContext = {
        userId,
        gameStateId,
        roomId: roomId || '',
        currentPhase: currentPhase || 1,
        currentRound: currentRound || 1,
        roleState,
        roleDesign,
        targetUserId,
      };

      return await EnhancedSkillService.getSkillUsageSuggestion(
        context,
        language
      );
    },
    [gameStateId, userId, roomId, language, t]
  );

  // 检查技能可用性
  const canUseSkill = useCallback(
    async (
      skillName: string,
      roleState?: RoleState,
      roleDesign?: RoleDesign,
      currentPhase?: number,
      targetUserId?: string,
      currentRound?: number
    ): Promise<boolean> => {
      if (!gameStateId || !userId) return false;

      const context: SkillUsageContext = {
        userId,
        gameStateId,
        roomId: roomId || '',
        currentPhase: currentPhase || 1,
        currentRound: currentRound || 1,
        roleState,
        roleDesign,
        targetUserId,
      };

      const validation = await EnhancedSkillService.validateSkillUsage(
        context,
        language
      );
      return validation.isValid;
    },
    [gameStateId, userId, roomId, language]
  );

  return {
    validateSkillFrontend,
    useSkillEnhanced,
    getSkillSuggestion,
    canUseSkill,
  };
};
