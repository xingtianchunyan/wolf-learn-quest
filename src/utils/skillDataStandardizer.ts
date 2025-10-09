import { createLogger   } from '@/lib/logger';
import { SkillConfig   } from '@/utils/skillMappingConfig';
import { standardizeEffectData, type StandardizedEffectData   } from '@/utils/skillEffectStandardization';

// 技能数据结构标准化工具

const logger = createLogger('skill-data-standardizer');

// 标准化的技能使用记录
export interface StandardizedSkillUse { id: string;
  user_id: string;
  game_state_id: string;
  skill_name: string;
  skill_chinese_name: string;
  target_user_id?: string;
  round_number: number;
  phase: string;
  skill_priority: number;
  execution_status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'failed';
  skill_effects: StandardizedEffectData;
  conditions_met: Record<string, any>;
  result?: any;
  execution_time?: string;
  failure_reason?: string;
  created_at: string;
  updated_at?: string;
  // 标准化配置
  skill_config: SkillConfig
}

// 标准化的技能效果队列
export interface StandardizedSkillEffectsQueue { id: string;
  skill_use_id: string;
  game_state_id: string;
  room_id: string;
  effect_type: string;
  effect_data: StandardizedEffectData;
  priority: number;
  execution_order: number;
  status: 'queued' | 'processing' | 'completed' | 'cancelled' | 'failed';
  trigger_time?: string;
  processed_at?: string;
  expires_at?: string;
  conditions?: Record<string, any>;
  created_at: string;
  updated_at: string
}

// 标准化的技能目标记录
export interface StandardizedSkillTarget { id: string;
  skill_use_id: string;
  skill_effects_queue_id?: string;
  target_user_id?: string;
  target_type: 'player' | 'room' | 'phase' | 'global';
  effect_applied: StandardizedEffectData;
  effect_duration?: number;
  effect_start_time: string;
  effect_end_time?: string;
  stack_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string
}

// 数据验证接口
export interface DataValidationResult { isValid: boolean;
  errors: string[];
  warnings: string[];
  statistics: {
    totalRecords: number;
    validRecords: number;
    invalidRecords: number;
    missingFieldCount: number;
    inconsistentFieldCount: number
}
}

/**
 * 标准化技能使用记录
 */
export function standardizeSkillUse(
  rawSkillUse: any,
  skillConfig?: SkillConfig
): StandardizedSkillUse | null { if (!rawSkillUse?.id || !rawSkillUse?.skill_name) {
    logger.warn('无效的技能使用记录', { rawSkillUse  });
    return null
}

  // 标准化技能效果数据
  const standardizedEffects = standardizeEffectData(rawSkillUse.skill_effects) || { effect_type: 'unknown',
    target_type: 'player',
    duration: 0,
    stack_count: 1,
    data: { 
} };

  return { id: rawSkillUse.id,
    user_id: rawSkillUse.user_id,
    game_state_id: rawSkillUse.game_state_id,
    skill_name: rawSkillUse.skill_name,
    skill_chinese_name: skillConfig?.chineseName || rawSkillUse.skill_name,
    target_user_id: rawSkillUse.target_user_id,
    round_number: rawSkillUse.round_number || 1,
    phase: rawSkillUse.phase || 'night',
    skill_priority: rawSkillUse.skill_priority || skillConfig?.priority || 100,
    execution_status: rawSkillUse.execution_status || 'pending',
    skill_effects: standardizedEffects,
    conditions_met: rawSkillUse.conditions_met || { 
},
    result: rawSkillUse.result,
    execution_time: rawSkillUse.execution_time,
    failure_reason: rawSkillUse.failure_reason,
    created_at: rawSkillUse.created_at,
    updated_at: rawSkillUse.updated_at,
    skill_config: skillConfig || { id: rawSkillUse.skill_name,
      chineseName: rawSkillUse.skill_name,
      englishName: rawSkillUse.skill_name,
      priority: 100,
      phase: 'night' as const,
      usageLimit: 'unlimited' as const,
      requiredStatus: ['normal' as const],
      targetType: 'single' as const,
      effectType: ['passive' as const],
      isPassive: false,
      conflictsWith: [] 
}
  }
}

/**
 * 标准化技能效果队列记录
 */
export function standardizeSkillEffectsQueue(
  rawQueue: any
): StandardizedSkillEffectsQueue | null { if (!rawQueue?.id || !rawQueue?.effect_type) {
    logger.warn('无效的技能效果队列记录', { rawQueue  });
    return null
}

  const standardizedEffectData = standardizeEffectData(rawQueue.effect_data) || { effect_type: rawQueue.effect_type,
    target_type: 'player',
    duration: 0,
    stack_count: 1,
    data: { 
} };

  return { id: rawQueue.id,
    skill_use_id: rawQueue.skill_use_id,
    game_state_id: rawQueue.game_state_id,
    room_id: rawQueue.room_id,
    effect_type: rawQueue.effect_type,
    effect_data: standardizedEffectData,
    priority: rawQueue.priority || 100,
    execution_order: rawQueue.execution_order || 0,
    status: rawQueue.status || 'queued',
    trigger_time: rawQueue.trigger_time,
    processed_at: rawQueue.processed_at,
    expires_at: rawQueue.expires_at,
    conditions: rawQueue.conditions || { 
},
    created_at: rawQueue.created_at,
    updated_at: rawQueue.updated_at 
}
}

/**
 * 标准化技能目标记录
 */
export function standardizeSkillTarget(
  rawTarget: any
): StandardizedSkillTarget | null { if (!rawTarget?.id) {
    logger.warn('无效的技能目标记录', { rawTarget  });
    return null
}

  const standardizedEffect = standardizeEffectData(rawTarget.effect_applied) || { effect_type: 'unknown',
    target_type: 'player',
    duration: 0,
    stack_count: 1,
    data: { 
} };

  return { id: rawTarget.id,
    skill_use_id: rawTarget.skill_use_id,
    skill_effects_queue_id: rawTarget.skill_effects_queue_id,
    target_user_id: rawTarget.target_user_id,
    target_type: rawTarget.target_type || 'player',
    effect_applied: standardizedEffect,
    effect_duration: rawTarget.effect_duration,
    effect_start_time: rawTarget.effect_start_time || rawTarget.created_at,
    effect_end_time: rawTarget.effect_end_time,
    stack_count: rawTarget.stack_count || 1,
    is_active: rawTarget.is_active !== false,
    created_at: rawTarget.created_at,
    updated_at: rawTarget.updated_at || rawTarget.created_at 
}
}

/**
 * 批量标准化技能数据
 */
export function batchStandardizeSkillData(
  skillUses: any[],
  skillConfigs: Map<string, SkillConfig>
): { standardizedUses: StandardizedSkillUse[];
  errors: string[]
} { const standardizedUses: StandardizedSkillUse[] = [];
  const errors: string[] = [];

  for (const rawUse of skillUses) {
    try {
      const config = skillConfigs.get(rawUse.skill_name);
      const standardized = standardizeSkillUse(rawUse, config);

      if (standardized) {
        standardizedUses.push(standardized)
} else { errors.push(`无法标准化技能使用记录: ${rawUse.id 
}`)
}
    } catch (error: any) { errors.push(`标准化失败 (${rawUse.id 
}): ${ error.message 
}`)
}
  }

  return { standardizedUses, errors  }
}

/**
 * 验证数据一致性
 */
export function validateDataConsistency(
  skillUses: any[],
  skillTargets: any[],
  skillEffectsQueue: any[]
): DataValidationResult { const errors: string[] = [];
  const warnings: string[] = [];
  let validRecords = 0;
  let invalidRecords = 0;
  let missingFieldCount = 0;
  let inconsistentFieldCount = 0;

  // 验证技能使用记录
  for (const use of skillUses) {
    let isValidRecord = true;

    // 必需字段检查
    const requiredFields = ['id', 'user_id', 'game_state_id', 'skill_name'];
    for (const field of requiredFields) {
      if (!use[field]) {
        errors.push(`技能使用记录 ${use.id || 'unknown' } 缺少必需字段: ${ field 
}`);
        missingFieldCount++;
        isValidRecord = false
}
    }

    // 数据类型检查
    if (use.round_number && typeof use.round_number !== 'number') { warnings.push(`技能使用记录 ${use.id } 的 round_number 类型不正确`);
      inconsistentFieldCount++
}

    // 技能效果格式检查
    if (use.skill_effects && typeof use.skill_effects === 'object') { const standardized = standardizeEffectData(use.skill_effects);
      if (!standardized) {
        warnings.push(`技能使用记录 ${use.id } 的 skill_effects 格式异常`);
        inconsistentFieldCount++
}
    }

    if (isValidRecord) { validRecords++
} else { invalidRecords++
}
  }

  // 验证技能目标记录
  for (const target of skillTargets) { // 检查关联的技能使用记录是否存在
    const relatedUse = skillUses.find(use => use.id === target.skill_use_id);
    if (!relatedUse) {
      errors.push(`技能目标记录 ${target.id } 关联的技能使用记录不存在: ${ target.skill_use_id 
}`);
      inconsistentFieldCount++
}

    // 检查效果数据格式
    if (target.effect_applied) { const standardized = standardizeEffectData(target.effect_applied);
      if (!standardized) {
        warnings.push(`技能目标记录 ${target.id } 的 effect_applied 格式异常`);
        inconsistentFieldCount++
}
    } }

  // 验证技能效果队列
  for (const queue of skillEffectsQueue) { // 检查关联的技能使用记录是否存在
    const relatedUse = skillUses.find(use => use.id === queue.skill_use_id);
    if (!relatedUse) {
      errors.push(`技能效果队列 ${queue.id } 关联的技能使用记录不存在: ${ queue.skill_use_id 
}`);
      inconsistentFieldCount++
}

    // 检查效果数据格式
    if (queue.effect_data) { const standardized = standardizeEffectData(queue.effect_data);
      if (!standardized) {
        warnings.push(`技能效果队列 ${queue.id } 的 effect_data 格式异常`);
        inconsistentFieldCount++
}
    } }

  const totalRecords = skillUses.length + skillTargets.length + skillEffectsQueue.length;

  return { isValid: errors.length === 0,
    errors,
    warnings,
    statistics: {
      totalRecords,
      validRecords,
      invalidRecords,
      missingFieldCount,
      inconsistentFieldCount }
  }
}

/**
 * 生成数据质量报告
 */
export function generateDataQualityReport(validationResult: DataValidationResult): string { const  { statistics, errors, warnings  } = validationResult;
  let report = '=== 技能系统数据质量报告 ===\n\n';

  report += `总记录数: ${ statistics.totalRecords 
}\n`;
  report += `有效记录数: ${ statistics.validRecords 
}\n`;
  report += `无效记录数: ${ statistics.invalidRecords 
}\n`;
  report += `缺失字段数: ${ statistics.missingFieldCount 
}\n`;
  report += `不一致字段数: ${ statistics.inconsistentFieldCount 
}\n\n`;

  if (errors.length > 0) { report += '=== 错误列表 ===\n';
    errors.forEach((error, index) => {
      report += `${index + 1 }. ${ error }\n`
});
    report += '\n'
}

  if (warnings.length > 0) { report += '=== 警告列表 ===\n';
    warnings.forEach((warning, index) => {
      report += `${index + 1 }. ${ warning }\n`
});
    report += '\n'
}

  const qualityScore = statistics.totalRecords > 0;
  ? Math.round((statistics.validRecords / statistics.totalRecords) * 100)
  : 0;

  report += `=== 质量评分: ${ qualityScore 
}% ===\n`;

  if (qualityScore >= 90) { report += '数据质量优秀 ✅\n'
} else if (qualityScore >= 70) { report += '数据质量良好 ⚠️\n'
} else { report += '数据质量需要改进 ❌\n'
}

  return report
}