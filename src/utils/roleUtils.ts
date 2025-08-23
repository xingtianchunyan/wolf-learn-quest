/**
 * 角色工具模块
 * 统一处理角色名标准化、阵营判断和可见性规则
 */

import type { RoleDesign } from '@/hooks/useRoleDesigns';

/**
 * 标准化角色名称
 * 统一处理不同的命名格式：werewolf 1 / werewolf_1 / werewolf1 / white wolf / whitewolf
 */
export const normalizeRoleName = (roleName: string): string => {
  if (!roleName) return '';
  
  const normalized = roleName.toLowerCase().trim();
  
  // 标准化狼人角色名
  const roleMap: Record<string, string> = {
    'werewolf 1': 'werewolf_1',
    'werewolf1': 'werewolf_1',
    'werewolf 2': 'werewolf_2', 
    'werewolf2': 'werewolf_2',
    'white wolf': 'whitewolf',
    'white_wolf': 'whitewolf'
  };
  
  return roleMap[normalized] || normalized;
};

/**
 * 狼人阵营角色名列表（标准化后的名称）
 */
export const WEREWOLF_ROLES = ['werewolf', 'werewolf_1', 'werewolf_2', 'whitewolf'] as const;

/**
 * 基于角色名判断是否为狼人角色
 */
export const isWolfRoleName = (roleName: string): boolean => {
  const normalized = normalizeRoleName(roleName);
  return WEREWOLF_ROLES.includes(normalized as any);
};

/**
 * 基于RoleDesign的faction字段判断是否为狼人阵营
 * 优先使用数据库的faction字段
 */
export const hasWolfFaction = (roleDesign: RoleDesign | null | undefined): boolean => {
  if (!roleDesign) return false;
  // faction字段：true为狼人阵营，false为好人阵营
  return roleDesign.faction === true;
};

/**
 * 恶魔角色检查
 */
export const isDemonRole = (roleName: string): boolean => {
  return normalizeRoleName(roleName) === 'demon';
};

/**
 * 猎人角色检查
 */
export const isHunterRole = (roleName: string): boolean => {
  return normalizeRoleName(roleName) === 'hunter';
};

/**
 * 统一的角色可见性规则
 * 实现"狼人互见"和"恶魔可见狼人"的业务规则
 */
export const canSeeTargetRole = (
  currentUserRole: string | undefined,
  targetRole: string | undefined,
  currentUserRoleDesign?: any,
  targetRoleDesign?: any
): boolean => {
  if (!currentUserRole || !targetRole) return false;
  
  const normalizedCurrentRole = normalizeRoleName(currentUserRole);
  const normalizedTargetRole = normalizeRoleName(targetRole);
  
  // 优先使用数据库的faction字段判断
  const isCurrentWolf = currentUserRoleDesign 
    ? hasWolfFaction(currentUserRoleDesign)
    : isWolfRoleName(normalizedCurrentRole);
  
  const isTargetWolf = targetRoleDesign
    ? hasWolfFaction(targetRoleDesign) 
    : isWolfRoleName(normalizedTargetRole);
    
  const isCurrentDemon = isDemonRole(normalizedCurrentRole);
  const isTargetDemon = isDemonRole(normalizedTargetRole);
  
  // 狼人阵营四个角色之间可以互相查看完整角色信息
  if (isCurrentWolf && isTargetWolf) {
    return true;
  }
  
  // 恶魔可以看到所有狼人角色
  if (isCurrentDemon && (isTargetWolf || isTargetDemon)) {
    return true;
  }
  
  return false;
};

/**
 * 聊天频道类型映射
 * 将UI的team频道映射为数据库期望的werewolf类型
 */
export const mapChatChannelType = (uiChannelType: string): string => {
  const channelMap: Record<string, string> = {
    'team': 'werewolf', // UI显示为team，但数据库存储为werewolf
    'werewolf': 'werewolf' // 保持兼容
  };
  
  return channelMap[uiChannelType] || uiChannelType;
};

/**
 * 反向映射：从数据库聊天类型映射到UI显示类型
 */
export const mapChatTypeToUI = (dbChatType: string): string => {
  const uiMap: Record<string, string> = {
    'werewolf': 'team', // 数据库的werewolf在UI显示为team
    'team': 'team' // 兼容历史数据
  };
  
  return uiMap[dbChatType] || dbChatType;
};

/**
 * 获取聊天查询的兼容类型列表
 * 同时查询werewolf和team类型以兼容历史数据
 */
export const getCompatibleChatTypes = (uiChannelType: string): string[] => {
  if (uiChannelType === 'team') {
    return ['werewolf', 'team']; // 查询时同时兼容两种类型
  }
  return [uiChannelType];
};

/**
 * 基于角色判断是否可以访问狼人频道
 */
export const canAccessWerewolfChannel = (
  roleName: string | undefined,
  roleDesign?: any
): boolean => {
  if (!roleName) return false;
  
  // 优先使用数据库faction字段
  if (roleDesign) {
    return hasWolfFaction(roleDesign);
  }
  
  // 后备方案：基于角色名判断
  return isWolfRoleName(roleName);
};