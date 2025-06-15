
export interface RoleCountConfig {
  roleName: string;
  count: number;
}

export const getRoleConfiguration = (playerCount: number): RoleCountConfig[] => {
  const configs: Record<number, RoleCountConfig[]> = {
    6: [
      { roleName: '狼人', count: 2 },
      { roleName: '村民', count: 2 },
      { roleName: '预言家', count: 1 },
      { roleName: '女巫', count: 1 },
    ],
    7: [
      { roleName: '狼人', count: 1 },
      { roleName: '白狼王', count: 1 },
      { roleName: '村民', count: 2 },
      { roleName: '猎人', count: 1 },
      { roleName: '预言家', count: 1 },
      { roleName: '女巫', count: 1 },
    ],
    8: [
      { roleName: '狼人', count: 1 },
      { roleName: '白狼王', count: 1 },
      { roleName: '村民', count: 2 },
      { roleName: '猎人', count: 1 },
      { roleName: '预言家', count: 1 },
      { roleName: '女巫', count: 1 },
      { roleName: '狼巫', count: 1 },
    ],
    9: [
      { roleName: '狼人', count: 1 },
      { roleName: '白狼王', count: 1 },
      { roleName: '村民', count: 3 },
      { roleName: '猎人', count: 1 },
      { roleName: '预言家', count: 1 },
      { roleName: '女巫', count: 1 },
      { roleName: '狼巫', count: 1 },
    ],
    10: [
      { roleName: '狼人', count: 1 },
      { roleName: '白狼王', count: 1 },
      { roleName: '村民', count: 2 },
      { roleName: '猎人', count: 1 },
      { roleName: '预言家', count: 1 },
      { roleName: '女巫', count: 1 },
      { roleName: '狼巫', count: 1 },
      { roleName: '恶魔', count: 1 },
      { roleName: '守卫', count: 1 },
    ],
    11: [
      { roleName: '狼人', count: 1 },
      { roleName: '白狼王', count: 1 },
      { roleName: '村民', count: 3 },
      { roleName: '猎人', count: 1 },
      { roleName: '预言家', count: 1 },
      { roleName: '女巫', count: 1 },
      { roleName: '狼巫', count: 1 },
      { roleName: '恶魔', count: 1 },
      { roleName: '守卫', count: 1 },
    ],
    12: [
      { roleName: '狼人', count: 2 },
      { roleName: '白狼王', count: 1 },
      { roleName: '村民', count: 3 },
      { roleName: '猎人', count: 1 },
      { roleName: '预言家', count: 1 },
      { roleName: '女巫', count: 1 },
      { roleName: '狼巫', count: 1 },
      { roleName: '恶魔', count: 1 },
      { roleName: '守卫', count: 1 },
    ],
  };

  return configs[playerCount] || configs[6];
};

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
