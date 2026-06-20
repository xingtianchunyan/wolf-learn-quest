// 技能效果数据结构标准化工具
// 解决 effect_applied 字段键名不一致问题

export interface StandardizedEffectData {
  effect_type: string;
  target_type?: string;
  duration?: number;
  stack_count?: number;
  data?: Record<string, any>;
}

/**
 * 标准化 effect_applied 数据结构
 * 统一使用 effect_type 作为键名，兼容历史 type 字段
 */
export function standardizeEffectData(
  effectApplied: any
): StandardizedEffectData | null {
  if (!effectApplied || typeof effectApplied !== 'object') {
    return null;
  }

  // 优先使用 effect_type，回退到 type
  const effectType = effectApplied.effect_type || effectApplied.type;

  if (!effectType) {
    return null;
  }

  return {
    effect_type: effectType,
    target_type: effectApplied.target_type,
    duration: effectApplied.duration,
    stack_count: effectApplied.stack_count || 1,
    data: effectApplied.data || {},
  };
}

/**
 * 检查技能效果是否匹配指定类型
 * 兼容新旧字段名
 */
export function matchesEffectType(
  effectApplied: any,
  targetEffectType: string
): boolean {
  if (!effectApplied || !targetEffectType) {
    return false;
  }

  const standardized = standardizeEffectData(effectApplied);
  return standardized?.effect_type === targetEffectType;
}

/**
 * 批量标准化技能目标数据
 */
export function standardizeSkillTargets(targets: any[]): any[] {
  return targets
    .map(target => ({
      ...target,
      effect_applied: standardizeEffectData(target.effect_applied),
    }))
    .filter(target => target.effect_applied !== null);
}

/**
 * 创建标准化的 effect_applied 对象
 */
export function createStandardEffectData(
  effectType: string,
  options: {
    targetType?: string;
    duration?: number;
    stackCount?: number;
    data?: Record<string, any>;
  } = {}
): StandardizedEffectData {
  return {
    effect_type: effectType,
    target_type: options.targetType,
    duration: options.duration,
    stack_count: options.stackCount || 1,
    data: options.data || {},
  };
}

/**
 * 数据清理：为历史数据添加标准化字段
 * 这是一个一次性数据迁移的辅助函数
 */
export function migrateEffectAppliedData(
  oldEffectApplied: any
): StandardizedEffectData | null {
  if (!oldEffectApplied) return null;

  // 如果已经是标准格式，直接返回
  if (oldEffectApplied.effect_type) {
    return standardizeEffectData(oldEffectApplied);
  }

  // 如果只有 type 字段，进行迁移
  if (oldEffectApplied.type) {
    return {
      effect_type: oldEffectApplied.type,
      target_type: oldEffectApplied.target_type,
      duration: oldEffectApplied.duration,
      stack_count: oldEffectApplied.stack_count || 1,
      data: oldEffectApplied.data || {},
    };
  }

  return null;
}
