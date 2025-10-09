import { createLogger  } from '@/lib/logger';
import { handleSkillError  } from '@/utils/common/errorHandling';
import { skillCache  } from '@/utils/skillCache';
import { supabase  } from '@/integrations/supabase/client';
import { validateSkillUnified  } from '@/utils/common/skillValidation';
import type { EnhancedSkillUse  } from '@/hooks/skill/useSkillData';

/**
* 技能系统专用服务类
* 将技能系统相关的业务逻辑从Hook中分离，提供专用的服务接口
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

const logger = createLogger('skill-system-service');

/**
* 技能使用请求接口
 */
export interface SkillUseRequest { skillType: string;
  targetUserId?: string;
  gameStateId: string;
  userId: string;
  roomId: string;
  metadata?: Record<string, any>;,
}

/**
* 技能使用结果接口
 */
export interface SkillUseResult { success: boolean;
  skillUseId?: string;
  message: string;
  effects?: Array<{
    type: string;
    targetUserId: string;
    value: any;,
}>;
  error?: Error;,
}

/**
* 技能数据查询选项接口
 */
export interface SkillDataQueryOptions { gameStateId?: string;
  userId?: string;
  skillType?: string;
  includeEffects?: boolean;
  includeTargets?: boolean;
  limit?: number;
  offset?: number;,
}

/**
* 技能统计数据接口
 */
export interface SkillSystemStats { totalSkillUses: number;
  skillTypeDistribution: Record<string, number>;
  userSkillCounts: Record<string, number>;
  activeEffectsCount: number;
  conflictCount: number;
  lastUpdateTime: Date;,
}

/**
* 技能系统专用服务类
* 提供技能系统的核心业务逻辑和数据操作
 */
export class SkillSystemService { private static instance: SkillSystemService;
  private readonly logger = createLogger('skill-system-service');

  private constructor() { }

  /**
  * 获取单例实例
   */
  public static getInstance(): SkillSystemService { if (!SkillSystemService.instance) {
      SkillSystemService.instance = new SkillSystemService();,
}
    return SkillSystemService.instance;,
}

  /**
  * 使用技能
  *
  * @param request - 技能使用请求
  * @returns 技能使用结果
   */
  public async useSkill(request: SkillUseRequest): Promise<SkillUseResult> { try {
      this.logger.info('开始使用技能', {
        skillType: request.skillType,
        userId: request.userId,
        gameStateId: request.gameStateId,
});

      // 1. 验证技能使用
      const validationResult = await this.validateSkillUse(request);
      if (!validationResult.isValid) { return {
          success: false,
          message: validationResult.message || '技能验证失败',
          error: new Error(validationResult.message),
};,
}

      // 2. 执行技能使用
      const skillUseResult = await this.executeSkillUse(request);
      if (!skillUseResult.success) { return skillUseResult;,
}

      // 3. 处理技能效果
      const effectsResult = await this.processSkillEffects(request, skillUseResult.skillUseId!);

      // 4. 更新缓存
      await this.updateSkillCache(request.gameStateId);

      this.logger.info('技能使用成功', { skillUseId: skillUseResult.skillUseId,
        effectsCount: effectsResult.length,
});

      return { success: true,
        skillUseId: skillUseResult.skillUseId,
        message: '技能使用成功',
        effects: effectsResult,
};,
} catch (error) { this.logger.error('技能使用失败', { error, request  });

      const handledError = await handleSkillError(error as Error, { skillType: request.skillType,
        userId: request.userId,
        operation: 'skill_use',
});

      return { success: false,
        message: handledError.userMessage,
        error: error as Error,
};,
}
  }

  /**
  * 验证技能使用
  *
  * @param request - 技能使用请求
  * @returns 验证结果
   */
  private async validateSkillUse(request: SkillUseRequest): Promise<{ isValid: boolean;
    message?: string;,
}> { try {
      // 使用统一的技能验证函数
      const validationResult = await validateSkillUnified({
        skillType: request.skillType,
        targetUserId: request.targetUserId,
        gameStateId: request.gameStateId,
        userId: request.userId,
        roomId: request.roomId,
});

      return { isValid: validationResult.isValid,
        message: validationResult.message,
};,
} catch (error) { this.logger.error('技能验证失败', { error, request  });
      return { isValid: false,
        message: '技能验证过程中发生错误',
};,
}
  }

  /**
  * 执行技能使用
  *
  * @param request - 技能使用请求
  * @returns 执行结果
   */
  private async executeSkillUse(request: SkillUseRequest): Promise<{ success: boolean;
    skillUseId?: string;
    message: string;,
}> { try {
      const { data, error  } = await supabase;
      .from('skill_uses')
      .insert({ skill_type: request.skillType,
        target_user_id: request.targetUserId,
        game_state_id: request.gameStateId,
        user_id: request.userId,
        room_id: request.roomId,
        metadata: request.metadata || { },
        used_at: new Date().toISOString(),
})
      .select()
      .single();

      if (error) { throw error;,
}

      return { success: true,
        skillUseId: data.id,
        message: '技能记录创建成功',
};,
} catch (error) { this.logger.error('技能使用记录创建失败', { error, request  });
      return { success: false,
        message: '技能使用记录创建失败',
};,
}
  }

  /**
  * 处理技能效果
  *
  * @param request - 技能使用请求
  * @param skillUseId - 技能使用ID
  * @returns 技能效果列表
   */
  private async processSkillEffects(
    request: SkillUseRequest,
    skillUseId: string
  ): Promise<Array<{ type: string;
    targetUserId: string;
    value: any;,
}>> { try {
      const effects = this.calculateSkillEffects(request);

      if (effects.length === 0) {
        return [];,
}

      // 批量插入技能效果
      const effectsData = effects.map(effect => ({ skill_use_id: skillUseId,
        effect_type: effect.type,
        target_user_id: effect.targetUserId,
        effect_value: effect.value,
        game_state_id: request.gameStateId,
        created_at: new Date().toISOString(),
}));

      const { error  } = await supabase;
      .from('skill_effects_queue')
      .insert(effectsData);

      if (error) { throw error;,
}

      this.logger.info('技能效果处理完成', { skillUseId,
        effectsCount: effects.length,
});

      return effects;,
} catch (error) { this.logger.error('技能效果处理失败', { error, request, skillUseId  });
      return [];,
}
  }

  /**
  * 计算技能效果
  *
  * @param request - 技能使用请求
  * @returns 技能效果列表
   */
  private calculateSkillEffects(request: SkillUseRequest): Array<{ type: string;
    targetUserId: string;
    value: any;,
}> { const effects: Array<{
      type: string;
      targetUserId: string;
      value: any;,
}> = [];

    // 根据技能类型计算效果
    switch (request.skillType) { case 'werewolf_attack':
      if (request.targetUserId) {
        effects.push({
          type: 'death',
          targetUserId: request.targetUserId,
          value: { cause: 'werewolf_attack', attackerId: request.userId  },
});,
}
      break;

      case 'seer_check':
      if (request.targetUserId) { effects.push({
          type: 'identity_reveal',
          targetUserId: request.targetUserId,
          value: { revealedTo: request.userId, skillType: 'seer_check'  },
});,
}
      break;

      case 'witch_heal':
      if (request.targetUserId) { effects.push({
          type: 'heal',
          targetUserId: request.targetUserId,
          value: { healerId: request.userId, skillType: 'witch_heal'  },
});,
}
      break;

      case 'witch_poison':
      if (request.targetUserId) { effects.push({
          type: 'death',
          targetUserId: request.targetUserId,
          value: { cause: 'witch_poison', poisonerId: request.userId  },
});,
}
      break;

      case 'guard_protect':
      if (request.targetUserId) { effects.push({
          type: 'protection',
          targetUserId: request.targetUserId,
          value: { protectorId: request.userId, skillType: 'guard_protect'  },
});,
}
      break;

      case 'hunter_revenge':
      if (request.targetUserId) { effects.push({
          type: 'death',
          targetUserId: request.targetUserId,
          value: { cause: 'hunter_revenge', hunterId: request.userId  },
});,
}
      break;

      default:
      this.logger.warn('未知的技能类型', { skillType: request.skillType  });
      break;,
}

    return effects;,
}

  /**
  * 更新技能缓存
  *
  * @param gameStateId - 游戏状态ID
   */
  private async updateSkillCache(gameStateId: string): Promise<void> { try {
      // 清理相关缓存
      skillCache.invalidateByPattern(`skill-uses-${gameStateId }`);
      skillCache.invalidateByPattern(`skill-effects-${ gameStateId }`);
      skillCache.invalidateByPattern(`skill-targets-${ gameStateId }`);

      this.logger.debug('技能缓存已更新', { gameStateId  });,
} catch (error) { this.logger.error('技能缓存更新失败', { error, gameStateId  });,
}
  }

  /**
  * 查询技能数据
  *
  * @param options - 查询选项
  * @returns 技能数据
   */
  public async querySkillData(options: SkillDataQueryOptions): Promise<{ skillUses: EnhancedSkillUse[];
    skillEffects?: any[];
    skillTargets?: any[];
    total: number;,
}> { try {
      this.logger.debug('查询技能数据', { options  });

      // 构建查询
      let query = supabase;
      .from('skill_uses')
      .select(`
      *,
      user:users(id, username, avatar_url),
      target_user:users!skill_uses_target_user_id_fkey(id, username, avatar_url)
      `);

      // 添加过滤条件
      if (options.gameStateId) { query = query.eq('game_state_id', options.gameStateId);,
}
      if (options.userId) { query = query.eq('user_id', options.userId);,
}
      if (options.skillType) { query = query.eq('skill_type', options.skillType);,
}

      // 添加分页
      if (options.limit) { query = query.limit(options.limit);,
}
      if (options.offset) { query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1);,
}

      // 按时间排序
      query = query.order('used_at', { ascending: false  });

      const { data: skillUses, error, count  } = await query;

      if (error) { throw error;,
}

      const result: { skillUses: EnhancedSkillUse[];
        skillEffects?: any[];
        skillTargets?: any[];
        total: number;,
} = { skillUses: skillUses || [],
        total: count || 0,
};

      // 查询技能效果（如果需要）
      if (options.includeEffects && options.gameStateId) { const { data: skillEffects  } = await supabase;
        .from('skill_effects_queue')
        .select('*')
        .eq('game_state_id', options.gameStateId)
        .order('created_at', { ascending: false  });

        result.skillEffects = skillEffects || [];,
}

      // 查询技能目标（如果需要）
      if (options.includeTargets && options.gameStateId) { const { data: skillTargets  } = await supabase;
        .from('skill_targets')
        .select('*')
        .eq('game_state_id', options.gameStateId)
        .order('created_at', { ascending: false  });

        result.skillTargets = skillTargets || [];,
}

      this.logger.debug('技能数据查询完成', { skillUsesCount: result.skillUses.length,
        total: result.total,
});

      return result;,
} catch (error) { this.logger.error('技能数据查询失败', { error, options  });
      throw error;,
}
  }

  /**
  * 获取技能统计数据
  *
  * @param gameStateId - 游戏状态ID
  * @returns 统计数据
   */
  public async getSkillStats(gameStateId: string): Promise<SkillSystemStats> { try {
      this.logger.debug('获取技能统计数据', { gameStateId  });

      // 查询技能使用数据
      const { data: skillUses, error: skillUsesError  } = await supabase;
      .from('skill_uses')
      .select('skill_type, user_id, used_at')
      .eq('game_state_id', gameStateId);

      if (skillUsesError) { throw skillUsesError;,
}

      // 查询活跃效果数量
      const { count: activeEffectsCount, error: effectsError  } = await supabase;
      .from('skill_effects_queue')
      .select('*', { count: 'exact', head: true  })
      .eq('game_state_id', gameStateId)
      .eq('is_processed', false);

      if (effectsError) { throw effectsError;,
}

      // 计算统计数据
      const skillTypeDistribution: Record<string, number> = {};
      const userSkillCounts: Record<string, number> = {};

      skillUses?.forEach(skillUse => { // 技能类型分布
        skillTypeDistribution[skillUse.skill_type] =;
        (skillTypeDistribution[skillUse.skill_type] || 0) + 1;

        // 用户技能使用次数
        userSkillCounts[skillUse.user_id] =;
        (userSkillCounts[skillUse.user_id] || 0) + 1;,
});

      const stats: SkillSystemStats = { totalSkillUses: skillUses?.length || 0,
        skillTypeDistribution,
        userSkillCounts,
        activeEffectsCount: activeEffectsCount || 0,
        conflictCount: 0, // TODO: 实现冲突检测
        lastUpdateTime: new Date(),
};

      this.logger.debug('技能统计数据获取完成', { stats  });

      return stats;,
} catch (error) { this.logger.error('技能统计数据获取失败', { error, gameStateId  });
      throw error;,
}
  }

  /**
  * 解决技能冲突
  *
  * @param gameStateId - 游戏状态ID
  * @returns 冲突解决结果
   */
  public async resolveSkillConflicts(gameStateId: string): Promise<{ resolvedConflicts: number;
    remainingConflicts: number;
    resolutionDetails: Array<{
      conflictType: string;
      resolution: string;
      affectedSkills: string[];,
}>;,
}> { try {
      this.logger.info('开始解决技能冲突', { gameStateId  });

      // TODO: 实现技能冲突检测和解决逻辑
      // 这里应该包含：
      // 1. 检测同时发生的技能冲突
      // 2. 应用冲突解决规则
      // 3. 更新技能效果状态
      // 4. 记录冲突解决日志

      const result = { resolvedConflicts: 0,
        remainingConflicts: 0,
        resolutionDetails: [],
};

      this.logger.info('技能冲突解决完成', { gameStateId, result  });

      return result;,
} catch (error) { this.logger.error('技能冲突解决失败', { error, gameStateId  });
      throw error;,
}
  }

  /**
  * 清理过期的技能数据
  *
  * @param gameStateId - 游戏状态ID
  * @param olderThanHours - 清理多少小时前的数据
   */
  public async cleanupExpiredSkillData(
    gameStateId: string,
    olderThanHours: number = 24;
  ): Promise<{ deletedSkillUses: number;
    deletedEffects: number;,
}> { try {
      this.logger.info('开始清理过期技能数据', { gameStateId, olderThanHours  });

      const cutoffTime = new Date();
      cutoffTime.setHours(cutoffTime.getHours() - olderThanHours);

      // 清理过期的技能使用记录
      const { count: deletedSkillUses, error: skillUsesError  } = await supabase;
      .from('skill_uses')
      .delete({ count: 'exact'  })
      .eq('game_state_id', gameStateId)
      .lt('used_at', cutoffTime.toISOString());

      if (skillUsesError) { throw skillUsesError;,
}

      // 清理过期的技能效果
      const { count: deletedEffects, error: effectsError  } = await supabase;
      .from('skill_effects_queue')
      .delete({ count: 'exact'  })
      .eq('game_state_id', gameStateId)
      .eq('is_processed', true)
      .lt('created_at', cutoffTime.toISOString());

      if (effectsError) { throw effectsError;,
}

      const result = { deletedSkillUses: deletedSkillUses || 0,
        deletedEffects: deletedEffects || 0,
};

      this.logger.info('过期技能数据清理完成', { gameStateId, result  });

      return result;,
} catch (error) { this.logger.error('过期技能数据清理失败', { error, gameStateId  });
      throw error;,
}
  },
}

// 导出单例实例
export const skillSystemService = SkillSystemService.getInstance();