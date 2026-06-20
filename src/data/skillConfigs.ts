/**
 * 技能配置数据
 * 为 EnhancedSkillPanel 等组件提供技能配置兜底
 */

export interface SkillConfig {
  name: string;
  description: string;
  cooldown?: number;
  maxUses?: number;
  targetType?: 'single' | 'self' | 'all' | 'none';
}

export const skillConfigs: Record<string, SkillConfig> = {};
