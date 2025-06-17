
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

// 根据角色设计数据扩展角色，确保每个角色实例都对应一个具体的 role_design 记录
export const expandRolesWithDesigns = (
  roleConfigs: RoleCountConfig[],
  roleDesigns: Array<{ id: string; role_name: string }>
): ExpandedRole[] => {
  const expandedRoles: ExpandedRole[] = [];

  roleConfigs.forEach(role => {
    // 查找匹配的角色设计，优先匹配带序号的角色名
    const baseDesigns = roleDesigns.filter(design => 
      design.role_name === role.roleName || 
      design.role_name.startsWith(role.roleName + '_')
    );
    
    // 如果没有找到带序号的设计，使用基础角色设计
    const availableDesigns = baseDesigns.length > 0 ? baseDesigns : 
      roleDesigns.filter(design => design.role_name === role.roleName);
    
    for (let i = 1; i <= role.count; i++) {
      // 优先使用带序号的角色设计
      const numberedRoleName = `${role.roleName}_${i}`;
      let roleDesign = roleDesigns.find(design => design.role_name === numberedRoleName);
      
      // 如果没有找到带序号的设计，使用基础角色设计
      if (!roleDesign) {
        roleDesign = roleDesigns.find(design => design.role_name === role.roleName);
      }
      
      // 如果仍然没有找到，跳过这个角色
      if (!roleDesign) {
        console.warn(`No role design found for ${role.roleName} instance ${i}`);
        continue;
      }
      
      expandedRoles.push({
        roleName: role.roleName,
        instanceId: `${role.roleName}_${i}`,
        displayName: role.count > 1 ? `${role.roleName} ${i}` : role.roleName,
        roleDesignId: roleDesign.id
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
