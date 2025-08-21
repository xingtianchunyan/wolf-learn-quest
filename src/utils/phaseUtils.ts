// 阶段转换工具函数 - 统一处理数字与字符串阶段的转换
export type PhaseNumber = 1 | 2 | 3 | 4;
export type PhaseName = 'day' | 'evening' | 'night' | 'dawn';

export const PHASE_MAPPING = {
  1: 'day',
  2: 'evening', 
  3: 'night',
  4: 'dawn'
} as const;

export const REVERSE_PHASE_MAPPING = {
  'day': 1,
  'evening': 2,
  'night': 3,
  'dawn': 4
} as const;

/**
 * 将数字阶段转换为字符串名称
 */
export function toPhaseName(phase: PhaseNumber): PhaseName {
  return PHASE_MAPPING[phase];
}

/**
 * 将字符串阶段名称转换为数字
 */
export function toPhaseId(phaseName: PhaseName): PhaseNumber {
  return REVERSE_PHASE_MAPPING[phaseName];
}

/**
 * 验证阶段值是否有效
 */
export function isValidPhaseNumber(phase: number): phase is PhaseNumber {
  return phase >= 1 && phase <= 4 && Number.isInteger(phase);
}

/**
 * 验证阶段名称是否有效
 */
export function isValidPhaseName(phaseName: string): phaseName is PhaseName {
  return ['day', 'evening', 'night', 'dawn'].includes(phaseName);
}

/**
 * 获取阶段的显示名称（中文）
 */
export function getPhaseDisplayName(phase: PhaseNumber | PhaseName): string {
  const phaseName = typeof phase === 'number' ? toPhaseName(phase) : phase;
  
  switch (phaseName) {
    case 'day':
      return '白天';
    case 'evening':
      return '黄昏';
    case 'night':
      return '夜晚';
    case 'dawn':
      return '黎明';
    default:
      return '未知阶段';
  }
}

/**
 * 获取下一个阶段
 */
export function getNextPhase(currentPhase: PhaseNumber): PhaseNumber {
  return currentPhase === 4 ? 1 : (currentPhase + 1) as PhaseNumber;
}

/**
 * 获取上一个阶段
 */
export function getPreviousPhase(currentPhase: PhaseNumber): PhaseNumber {
  return currentPhase === 1 ? 4 : (currentPhase - 1) as PhaseNumber;
}

/**
 * 判断是否为投票阶段
 */
export function isVotingPhase(phase: PhaseNumber | PhaseName): boolean {
  const phaseName = typeof phase === 'number' ? toPhaseName(phase) : phase;
  return phaseName === 'day' || phaseName === 'evening';
}

/**
 * 判断是否为夜晚行动阶段
 */
export function isNightActionPhase(phase: PhaseNumber | PhaseName): boolean {
  const phaseName = typeof phase === 'number' ? toPhaseName(phase) : phase;
  return phaseName === 'night';
}