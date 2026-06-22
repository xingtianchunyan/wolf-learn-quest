/**
 * 文件级注释：房间角色配置与角色设计匹配工具
 * 负责根据玩家人数生成角色配置，并将角色实例稳定映射到 `role_design.role_name`。
 */
export interface RoleCountConfig {
  roleName: string;
  count: number;
}

// 扩展后的角色信息，包含 role_design 的 uuid
export interface ExpandedRole {
  roleName: string;
  instanceId: string;
  displayName: string;
  roleDesignId?: string;
}

/**
 * 函数级注释：根据玩家人数返回角色数量配置
 */
export const getRoleConfiguration = (
  playerCount: number
): RoleCountConfig[] => {
  const configs: Record<number, RoleCountConfig[]> = {
    6: [
      { roleName: 'werewolf', count: 2 },
      { roleName: 'villager', count: 2 },
      { roleName: 'seer', count: 1 },
      { roleName: 'witch', count: 1 },
    ],
    7: [
      { roleName: 'werewolf', count: 1 },
      { roleName: 'whitewolf', count: 1 },
      { roleName: 'villager', count: 2 },
      { roleName: 'hunter', count: 1 },
      { roleName: 'seer', count: 1 },
      { roleName: 'witch', count: 1 },
    ],
    8: [
      { roleName: 'werewolf', count: 1 },
      { roleName: 'whitewolf', count: 1 },
      { roleName: 'villager', count: 2 },
      { roleName: 'hunter', count: 1 },
      { roleName: 'seer', count: 1 },
      { roleName: 'witch', count: 1 },
      { roleName: 'warlock', count: 1 },
    ],
    9: [
      { roleName: 'werewolf', count: 1 },
      { roleName: 'whitewolf', count: 1 },
      { roleName: 'villager', count: 3 },
      { roleName: 'hunter', count: 1 },
      { roleName: 'seer', count: 1 },
      { roleName: 'witch', count: 1 },
      { roleName: 'warlock', count: 1 },
    ],
    10: [
      { roleName: 'werewolf', count: 1 },
      { roleName: 'whitewolf', count: 1 },
      { roleName: 'villager', count: 2 },
      { roleName: 'hunter', count: 1 },
      { roleName: 'seer', count: 1 },
      { roleName: 'witch', count: 1 },
      { roleName: 'warlock', count: 1 },
      { roleName: 'demon', count: 1 },
      { roleName: 'guard', count: 1 },
    ],
    11: [
      { roleName: 'werewolf', count: 1 },
      { roleName: 'whitewolf', count: 1 },
      { roleName: 'villager', count: 3 },
      { roleName: 'hunter', count: 1 },
      { roleName: 'seer', count: 1 },
      { roleName: 'witch', count: 1 },
      { roleName: 'warlock', count: 1 },
      { roleName: 'demon', count: 1 },
      { roleName: 'guard', count: 1 },
    ],
    12: [
      { roleName: 'werewolf', count: 2 },
      { roleName: 'whitewolf', count: 1 },
      { roleName: 'villager', count: 3 },
      { roleName: 'hunter', count: 1 },
      { roleName: 'seer', count: 1 },
      { roleName: 'witch', count: 1 },
      { roleName: 'warlock', count: 1 },
      { roleName: 'demon', count: 1 },
      { roleName: 'guard', count: 1 },
    ],
  };

  return configs[playerCount] || configs[6];
};

/**
 * 函数级注释：提取角色基础名
 * 例如 `werewolf_2` 会被归一化为 `werewolf`，用于对齐实例名与数据库中的基础角色名。
 */
const getBaseRoleName = (roleName: string): string => {
  return roleName.replace(/_\d+$/, '');
};

/**
 * 函数级注释：提取角色实例序号
 * 若角色名不带实例后缀，则返回 `null`。
 */
const getRoleInstanceIndex = (roleName: string): number | null => {
  const match = roleName.match(/_(\d+)$/);
  return match ? Number(match[1]) : null;
};

/**
 * 接口注释：角色设计最小匹配结构
 */
interface RoleDesignLookupItem {
  id: string;
  role_name: string;
}

/**
 * 函数级注释：为指定角色实例选择最合适的角色设计
 * 匹配顺序为：精确实例名 -> 基础角色名 -> 同基础名下的对应序号 -> 同基础名下的首个可用设计。
 */
const resolveRoleDesign = (
  roleName: string,
  instanceIndex: number,
  roleDesigns: RoleDesignLookupItem[]
): RoleDesignLookupItem | undefined => {
  const exactRoleName = `${roleName}_${instanceIndex}`;
  const exactMatch = roleDesigns.find(
    design => design.role_name === exactRoleName
  );
  if (exactMatch) {
    return exactMatch;
  }

  const baseMatch = roleDesigns.find(design => design.role_name === roleName);
  if (baseMatch) {
    return baseMatch;
  }

  const relatedDesigns = roleDesigns
    .filter(design => getBaseRoleName(design.role_name) === roleName)
    .sort((left, right) => {
      const leftIndex = getRoleInstanceIndex(left.role_name) ?? 0;
      const rightIndex = getRoleInstanceIndex(right.role_name) ?? 0;
      return leftIndex - rightIndex;
    });

  return relatedDesigns[instanceIndex - 1] ?? relatedDesigns[0];
};

/**
 * 函数级注释：根据角色设计数据扩展角色实例
 * 该函数会优先对齐实例名，再回退到基础角色名，确保 `role_design` 的命名差异不会导致房间页告警。
 */
export const expandRolesWithDesigns = (
  roleConfigs: RoleCountConfig[],
  roleDesigns: Array<{ id: string; role_name: string }>
): ExpandedRole[] => {
  if (roleDesigns.length === 0) {
    return [];
  }

  const expandedRoles: ExpandedRole[] = [];

  roleConfigs.forEach(role => {
    for (let i = 1; i <= role.count; i++) {
      const roleDesign = resolveRoleDesign(role.roleName, i, roleDesigns);

      if (!roleDesign) {
        console.warn(`No role design found for ${role.roleName} instance ${i}`);
        continue;
      }

      expandedRoles.push({
        roleName: role.roleName,
        instanceId: `${role.roleName}_${i}`,
        displayName: role.count > 1 ? `${role.roleName} ${i}` : role.roleName,
        roleDesignId: roleDesign.id,
      });
    }
  });

  return expandedRoles;
};

// 保持向后兼容的函数
export const expandRoles = (
  roleConfigs: RoleCountConfig[]
): Array<{ roleName: string; instanceId: string; displayName: string }> => {
  const expandedRoles: Array<{
    roleName: string;
    instanceId: string;
    displayName: string;
  }> = [];

  roleConfigs.forEach(role => {
    for (let i = 1; i <= role.count; i++) {
      expandedRoles.push({
        roleName: role.roleName,
        instanceId: `${role.roleName}_${i}`,
        displayName: role.count > 1 ? `${role.roleName} ${i}` : role.roleName,
      });
    }
  });

  return expandedRoles;
};
