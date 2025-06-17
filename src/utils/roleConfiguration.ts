
export interface RoleCountConfig {
  roleName: string;
  count: number;
}

// 扩展后的角色信息，包含 role_design 的 uuid
export interface ExpandedRole {
  roleName: string;
  instanceId: string; // 保持兼容性的实例标识符
  displayName: string;
  roleDesignId?: string; // role_design 表中的 uuid
}

export const getRoleConfiguration = (playerCount: number): RoleCountConfig[] => {
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

// 新增：根据角色设计数据扩展角色
export const expandRolesWithDesigns = (
  roleConfigs: RoleCountConfig[],
  roleDesigns: Array<{ id: string; role_name: string }>
): ExpandedRole[] => {
  const expandedRoles: ExpandedRole[] = [];

  roleConfigs.forEach(role => {
    // 找到匹配的角色设计
    const matchingDesigns = roleDesigns.filter(design => design.role_name === role.roleName);
    
    for (let i = 1; i <= role.count; i++) {
      // 如果有多个相同角色，按顺序分配给不同的设计（如果有的话）
      const designIndex = Math.min(i - 1, matchingDesigns.length - 1);
      const roleDesign = matchingDesigns[designIndex];
      
      expandedRoles.push({
        roleName: role.roleName,
        instanceId: `${role.roleName}_${i}`,
        displayName: role.count > 1 ? `${role.roleName} ${i}` : role.roleName,
        roleDesignId: roleDesign?.id
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
