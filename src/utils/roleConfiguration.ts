
export interface RoleCountConfig {
  roleName: string;
  count: number;
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
