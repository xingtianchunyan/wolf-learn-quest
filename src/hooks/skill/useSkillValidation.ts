import { createLogger   } from '@/lib/logger';
import { EnhancedSkillService, type SkillUsageContext   } from '@/services/enhancedSkillService';
import { skillBatchProcessor   } from '@/utils/skillBatchProcessor';
import { skillCache   } from '@/utils/skillCache';
import { useCallback   } from 'react';
import { useToast   } from '@/hooks/useToast';

// 技能验证和使用逻辑

export interface SkillSuggestion { canUse: boolean;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
  timing: string;
  conflicts?: string[]
}

const logger = createLogger('skill-validation');

/**
 * useSkillValidation函数
 * 自定义Hook
 * @returns void
 */
export const useSkillValidation = (
  gameStateId?: string,
  userId?: string,
  roomId?: string
) => { const { toast  } = useToast();

  // 前端技能验证 - 避免发送无效请求到后端
  const validateSkillFrontend = useCallback(async (;
    skillName: string,
    roleState?: any,
    roleDesign?: any,
    currentPhase?: number,
    targetUserId?: string,
    currentRound?: number
  ): Promise<{ canUse: boolean; reason?: string; suggestion?: string  
}> => { if (!gameStateId || !userId) {
      return { canUse: false, reason: '缺少必要的游戏状态或用户信息'  
}
}

    // 检查缓存
    const cached = skillCache.getValidationCache(;
      skillName,
      userId,
      gameStateId,
      currentPhase || 1,
      targetUserId
    );

    if (cached) { logger.debug('使用缓存的验证结果', { skillName, cached  });
      return cached
}

    const context: SkillUsageContext = { userId,
      gameStateId,
      roomId: roomId || '',
      currentPhase: currentPhase || 1,
      currentRound: currentRound || 1,
      roleState,
      roleDesign,
      targetUserId  };

    try { const validation = await EnhancedSkillService.validateSkillUsage(context);
      const result = {
        canUse: validation.isValid,
        reason: validation.reason,
        suggestion: validation.suggestedAction  
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

      return result
} catch (error) { logger.error('技能验证失败', error);
      return { canUse: false, reason: '验证失败，请重试'  
}
}
  }, [gameStateId, userId, roomId]);

  // 增强的技能使用函数 - 加强前端验证和批处理
  const useSkillEnhanced = useCallback(async (;
    skillName: string,
    targetUserId?: string,
    additionalData: Record<string, any> = {},
    roleState?: any,
    roleDesign?: any,
    currentPhase?: number,
    currentRound?: number
  ) => { if (!gameStateId || !userId) {
      return null
}

    // 前端预验证 - 避免无效请求
    const frontendValidation = await validateSkillFrontend(;
      skillName,
      roleState,
      roleDesign,
      currentPhase,
      targetUserId,
      currentRound
    );

    if (!frontendValidation.canUse) { // 不显示错误弹窗，只记录日志
      logger.warn('技能使用被前端验证阻止', {
        skillName,
        reason: frontendValidation.reason,
        suggestion: frontendValidation.suggestion 
});
      return null
}

    try { const context: SkillUsageContext = {
        userId,
        gameStateId,
        roomId: roomId || '',
        currentPhase: currentPhase || 1,
        currentRound: currentRound || 1,
        roleState,
        roleDesign,
        targetUserId,
        additionalData  };

      // 使用批处理器来处理技能使用
      await skillBatchProcessor.addOperation({ type: 'skill_use',
        data: {
          user_id: userId,
          game_state_id: gameStateId,
          skill_name: skillName,
          target_user_id: targetUserId,
          phase: currentPhase === 1 ? 'day' : unknown;
          currentPhase === 2 ? 'evening' : unknown;
          currentPhase === 3 ? 'night' : 'dawn',
          round_number: currentRound || 1,
          skill_effects: additionalData,
          skill_priority: roleDesign?.priority || 100 
},
        priority: roleDesign?.priority || 100,
        gameStateId,
        userId });

      // 清除相关缓存
      skillCache.clearUserCache(userId);
      skillCache.clearGameCache(gameStateId);

      toast({ title: '技能使用成功',
        description: `成功使用技能: ${skillName 
}` });

      return { success: true  
}
} catch (error: any) { logger.error('技能使用失败', error);

      // 根据错误类型决定是否显示弹窗
      if (error.code === 'VALIDATION_FAILED' || error.reason?.includes('限制')) {
        // 游戏规则相关错误，不显示弹窗，只记录日志
        logger.warn('技能使用违反游戏规则', error)
} else { // 系统错误，显示错误弹窗
        toast({
          title: '技能使用失败',
          description: error.message || '系统错误，请重试',
          variant: 'destructive' 
})
}
      return null
}
  }, [gameStateId, userId, roomId, toast, validateSkillFrontend]);

  // 获取技能使用建议
  const getSkillSuggestion = useCallback(async (;
    roleState?: any,
    roleDesign?: any,
    currentPhase?: number,
    currentRound?: number,
    targetUserId?: string
  ): Promise<SkillSuggestion> => { if (!gameStateId || !userId) {
      return {
        canUse: false,
        suggestion: '缺少游戏状态信息',
        priority: 'low',
        timing: '无法获取' 
}
}

    const context: SkillUsageContext = { userId,
      gameStateId,
      roomId: roomId || '',
      currentPhase: currentPhase || 1,
      currentRound: currentRound || 1,
      roleState,
      roleDesign,
      targetUserId  };

    return await EnhancedSkillService.getSkillUsageSuggestion(context)
}, [gameStateId, userId, roomId]);

  // 检查技能可用性
  const canUseSkill = useCallback(async (;
    skillName: string,
    roleState?: any,
    roleDesign?: any,
    currentPhase?: number,
    targetUserId?: string,
    currentRound?: number
  ): Promise<boolean> => { if (!gameStateId || !userId) return false;

    const context: SkillUsageContext = {
      userId,
      gameStateId,
      roomId: roomId || '',
      currentPhase: currentPhase || 1,
      currentRound: currentRound || 1,
      roleState,
      roleDesign,
      targetUserId  };

    const validation = await EnhancedSkillService.validateSkillUsage(context);
    return validation.isValid
}, [gameStateId, userId, roomId]);

  return { validateSkillFrontend,
    useSkillEnhanced,
    getSkillSuggestion,
    canUseSkill }
};