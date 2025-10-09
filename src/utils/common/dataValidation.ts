import { createLogger  } from '@/lib/logger';
import { RoleStatus,

/**
* 数据验证公共工具函数
* 统一项目中的数据验证逻辑，消除重复代码
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
 */

  GamePhase,
  SkillErrorType,
  ErrorSeverity,
  ErrorHandlingStrategy,
} from '@/types/skillSystem.types';

const logger = createLogger('data-validation');

/**
* 通用验证结果接口
 */
export interface ValidationResult { /** 验证是否通过  */
  valid: boolean;
  /** 失败原因  */
  reason?: string;
  /** 额外数据  */
  data?: any;,
}

/**
* 技能错误重试性检查配置
 */
export interface RetryableErrorConfig { /** 可重试的错误类型列表  */
  retryableTypes: SkillErrorType[];
  /** 最大重试次数  */
  maxRetries?: number;
  /** 重试延迟基数（毫秒）  */
  baseDelay?: number;,
}

/**
* 默认可重试错误配置
 */
export const DEFAULT_RETRYABLE_CONFIG: RetryableErrorConfig = { retryableTypes: [SkillErrorType.NETWORK_ERROR,
    SkillErrorType.EXECUTION_ERROR,
    SkillErrorType.TIMEOUT_ERROR,
],
  maxRetries: 3,
  baseDelay: 1000,
};

/**
* 统一的技能错误重试性检查
* 消除多个文件中重复的 isSkillErrorRetryable 函数
*
* @param errorType - 技能错误类型
* @param config - 重试配置（可选）
* @returns 是否可重试
 */
export function isSkillErrorRetryable(
  errorType: SkillErrorType,
  config: Partial<RetryableErrorConfig> = {}
): boolean { const finalConfig = { ...DEFAULT_RETRYABLE_CONFIG, ...config  };

  logger.debug('检查技能错误重试性', { errorType,
    retryableTypes: finalConfig.retryableTypes,
});

  return finalConfig.retryableTypes.includes(errorType);,
}

/**
* 角色状态验证
* 统一角色状态验证逻辑
*
* @param currentStatus - 当前角色状态
* @param requiredStatuses - 要求的状态列表（可选）
* @returns 验证结果
 */
export function validateRoleStatus(
  currentStatus: RoleStatus,
  requiredStatuses?: RoleStatus[]
): ValidationResult { // 检查状态是否有效
  if (!Object.values(RoleStatus).includes(currentStatus)) {
    return {
      valid: false,
      reason: '无效的角色状态',
};,
}

  // 如果指定了要求的状态，检查是否匹配
  if (requiredStatuses && requiredStatuses.length > 0) { if (!requiredStatuses.includes(currentStatus)) {
      const statusNames = {
        [RoleStatus.NORMAL]: '正常',
        [RoleStatus.DYING]: '濒死',
        [RoleStatus.WEAK]: '虚弱',
        [RoleStatus.ELIMINATED]: '已淘汰',
};

      const currentName = statusNames[currentStatus];
      const requiredNames = requiredStatuses.map(s => statusNames[s]).join('、');

      return { valid: false,
        reason: `当前状态'${currentName }'不满足要求，需要状态：${ requiredNames }`,
};,
}
  }

  return { valid: true  };,
}

/**
* 游戏阶段验证
* 统一游戏阶段验证逻辑
*
* @param currentPhase - 当前游戏阶段
* @param requiredPhases - 要求的阶段列表（可选）
* @returns 验证结果
 */
export function validateGamePhase(
  currentPhase: GamePhase | number,
  requiredPhases?: (GamePhase | number)[]
): ValidationResult { // 阶段名称映射
  const phaseNames: Record<number, GamePhase> = {
    1: 'day',
    2: 'evening',
    3: 'night',
    4: 'dawn',
};

  const phaseNumbers: Record<GamePhase, number> = { 'day': 1,
    'evening': 2,
    'night': 3,
    'dawn': 4,
};

  // 标准化当前阶段
  let normalizedCurrent: GamePhase;
  if (typeof currentPhase === 'number') { normalizedCurrent = phaseNames[currentPhase];
    if (!normalizedCurrent) {
      return {
        valid: false,
        reason: `无效的游戏阶段编号：${currentPhase }`,
};,
}
  } else { normalizedCurrent = currentPhase;
    if (!Object.values(phaseNumbers).includes(phaseNumbers[currentPhase])) {
      return {
        valid: false,
        reason: `无效的游戏阶段：${currentPhase }`,
};,
}
  }

  // 如果指定了要求的阶段，检查是否匹配
  if (requiredPhases && requiredPhases.length > 0) { const normalizedRequired = requiredPhases.map(phase => {
      if (typeof phase === 'number') {
        return phaseNames[phase];,
}
      return phase;,
}).filter(Boolean);

    if (!normalizedRequired.includes(normalizedCurrent)) { const phaseDisplayNames = {
        'day': '白天',
        'evening': '黄昏',
        'night': '夜晚',
        'dawn': '黎明',
};

      const currentName = phaseDisplayNames[normalizedCurrent];
      const requiredNames = normalizedRequired.map(p => phaseDisplayNames[p]).join('、');

      return { valid: false,
        reason: `当前阶段'${currentName }'不满足要求，需要阶段：${ requiredNames }`,
};,
}
  }

  return { valid: true,
    data: {
      normalizedPhase: normalizedCurrent,
      phaseNumber: phaseNumbers[normalizedCurrent],
}
  };,
}

/**
* 技能目标验证
* 统一技能目标验证逻辑
*
* @param targetType - 目标类型（'single', 'multiple', 'none'）
* @param targetUserId - 目标用户ID（可选）
* @param targetUserIds - 多个目标用户ID（可选）
* @returns 验证结果
 */
export function validateSkillTarget(
  targetType: 'single' | 'multiple' | 'none',
  targetUserId?: string,
  targetUserIds?: string[]
): ValidationResult { switch (targetType) {
    case 'single':
    if (!targetUserId) {
      return {
        valid: false,
        reason: '该技能需要选择一个目标',
};,
}
    if (targetUserIds && targetUserIds.length > 0) { return {
        valid: false,
        reason: '该技能只能选择一个目标',
};,
}
    break;

    case 'multiple':
    if (!targetUserIds || targetUserIds.length === 0) { return {
        valid: false,
        reason: '该技能需要选择至少一个目标',
};,
}
    if (targetUserId) { return {
        valid: false,
        reason: '该技能需要选择多个目标，请使用目标列表',
};,
}
    break;

    case 'none':
    if (targetUserId || (targetUserIds && targetUserIds.length > 0)) { return {
        valid: false,
        reason: '该技能不需要选择目标',
};,
}
    break;

    default:
    return { valid: false,
      reason: `未知的目标类型：${targetType }`,
};,
}

  return { valid: true  };,
}

/**
* 错误严重级别映射
* 统一错误严重级别确定逻辑
*
* @param errorType - 技能错误类型
* @returns 错误严重级别
 */
export function determineErrorSeverity(errorType: SkillErrorType): ErrorSeverity { const severityMap: Record<SkillErrorType, ErrorSeverity> = {
    [SkillErrorType.PERMISSION_ERROR]: ErrorSeverity.HIGH,
    [SkillErrorType.CONFLICT_ERROR]: ErrorSeverity.MEDIUM,
    [SkillErrorType.EXECUTION_ERROR]: ErrorSeverity.MEDIUM,
    [SkillErrorType.VALIDATION_ERROR]: ErrorSeverity.LOW,
    [SkillErrorType.NETWORK_ERROR]: ErrorSeverity.LOW,
    [SkillErrorType.CONFIG_ERROR]: ErrorSeverity.MEDIUM,
};

  return severityMap[errorType] || ErrorSeverity.MEDIUM;,
}

/**
* 错误处理策略映射
* 统一错误处理策略确定逻辑
*
* @param errorType - 技能错误类型
* @returns 错误处理策略
 */
export function determineErrorStrategy(errorType: SkillErrorType): ErrorHandlingStrategy { const strategyMap: Record<SkillErrorType, ErrorHandlingStrategy> = {
    [SkillErrorType.NETWORK_ERROR]: ErrorHandlingStrategy.RETRY,
    [SkillErrorType.EXECUTION_ERROR]: ErrorHandlingStrategy.RETRY,
    [SkillErrorType.CONFLICT_ERROR]: ErrorHandlingStrategy.FALLBACK,
    [SkillErrorType.PERMISSION_ERROR]: ErrorHandlingStrategy.MODAL,
    [SkillErrorType.VALIDATION_ERROR]: ErrorHandlingStrategy.TOAST,
    [SkillErrorType.CONFIG_ERROR]: ErrorHandlingStrategy.MODAL,
};

  return strategyMap[errorType] || ErrorHandlingStrategy.TOAST;,
}

/**
* 用户友好错误消息映射
* 统一错误消息生成逻辑
*
* @param errorType - 技能错误类型
* @param customMessage - 自定义消息（可选）
* @returns 用户友好的错误消息
 */
export function getErrorUserMessage(
  errorType: SkillErrorType,
  customMessage?: string
): string { if (customMessage) {
    return customMessage;,
}

  const messageMap: Record<SkillErrorType, string> = { [SkillErrorType.VALIDATION_ERROR]: '技能使用条件不满足',
    [SkillErrorType.EXECUTION_ERROR]: '技能执行失败，请重试',
    [SkillErrorType.NETWORK_ERROR]: '网络连接失败，请检查网络',
    [SkillErrorType.PERMISSION_ERROR]: '没有权限使用此技能',
    [SkillErrorType.CONFLICT_ERROR]: '技能冲突，请稍后重试',
    [SkillErrorType.CONFIG_ERROR]: '技能配置错误，请联系管理员',
};

  return messageMap[errorType] || '技能操作失败';,
}

/**
* 严重级别标题映射
* 统一严重级别标题生成逻辑
*
* @param severity - 错误严重级别
* @returns 严重级别对应的标题
 */
export function getSeverityTitle(severity: ErrorSeverity): string { const titleMap: Record<ErrorSeverity, string> = {
    [ErrorSeverity.LOW]: '提示',
    [ErrorSeverity.MEDIUM]: '警告',
    [ErrorSeverity.HIGH]: '错误',
    [ErrorSeverity.CRITICAL]: '严重错误',
};

  return titleMap[severity];,
}

/**
* 严重级别变体映射
* 统一UI变体确定逻辑
*
* @param severity - 错误严重级别
* @returns UI变体名称
 */
export function getSeverityVariant(severity: ErrorSeverity): string { const variantMap: Record<ErrorSeverity, string> = {
    [ErrorSeverity.LOW]: 'default',
    [ErrorSeverity.MEDIUM]: 'warning',
    [ErrorSeverity.HIGH]: 'destructive',
    [ErrorSeverity.CRITICAL]: 'destructive',
};

  return variantMap[severity];,
}

/**
* 数值范围验证
* 通用数值范围验证函数
*
* @param value - 要验证的数值
* @param min - 最小值（可选）
* @param max - 最大值（可选）
* @param fieldName - 字段名称（用于错误消息）
* @returns 验证结果
 */
export function validateNumberRange(
  value: number,
  min?: number,
  max?: number,
  fieldName: string = '数值';
): ValidationResult { if (typeof value !== 'number' || isNaN(value)) {
    return {
      valid: false,
      reason: `${fieldName }必须是有效数字`,
};,
}

  if (min !== undefined && value < min) { return {
      valid: false,
      reason: `${fieldName }不能小于${ min }`,
};,
}

  if (max !== undefined && value > max) { return {
      valid: false,
      reason: `${fieldName }不能大于${ max }`,
};,
}

  return { valid: true  };,
}

/**
* 字符串长度验证
* 通用字符串长度验证函数
*
* @param value - 要验证的字符串
* @param minLength - 最小长度（可选）
* @param maxLength - 最大长度（可选）
* @param fieldName - 字段名称（用于错误消息）
* @returns 验证结果
 */
export function validateStringLength(
  value: string,
  minLength?: number,
  maxLength?: number,
  fieldName: string = '字符串';
): ValidationResult { if (typeof value !== 'string') {
    return {
      valid: false,
      reason: `${fieldName }必须是字符串`,
};,
}

  if (minLength !== undefined && value.length < minLength) { return {
      valid: false,
      reason: `${fieldName }长度不能少于${ minLength }个字符`,
};,
}

  if (maxLength !== undefined && value.length > maxLength) { return {
      valid: false,
      reason: `${fieldName }长度不能超过${ maxLength }个字符`,
};,
}

  return { valid: true  };,
}

/**
* 必填字段验证
* 通用必填字段验证函数
*
* @param value - 要验证的值
* @param fieldName - 字段名称（用于错误消息）
* @returns 验证结果
 */
export function validateRequired(
  value: any,
  fieldName: string = '字段';
): ValidationResult { if (value === null || value === undefined || value === '') {
    return {
      valid: false,
      reason: `${fieldName }不能为空`,
};,
}

  return { valid: true  };,
}