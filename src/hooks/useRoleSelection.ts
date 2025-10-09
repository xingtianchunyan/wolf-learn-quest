import { supabase   } from '@/integrations/supabase/client';
import { useEffect, useState   } from 'react';
import { useRoleDesigns   } from '@/hooks/useRoleDesigns';

interface RoleSelection { id: string;
  room_id: string;
  user_id: string;
  role_id: string; // 现在是 uuid 类型，关联到 role_design.id
  selected_at: string;
  // 添加角色设计信息
  role_design?: {
    id: string;
    role_name: string;
    faction: boolean;
    role_description: string | null
}
}

/**
 * useRoleSelection函数
 * 自定义Hook
 *
 * @param roomId - roomId参数
 * @param currentUserId - currentUserId参数
 * @param currentPlayerCount - currentPlayerCount参数
 * @param maxPlayers - maxPlayers参数
 * @returns void
 */
export const useRoleSelection = (roomId: string, currentUserId: string | null, currentPlayerCount: number, maxPlayers: number) =>  { const [roleSelections, setRoleSelections] = useState<RoleSelection[]>([]);
  const [loading, setLoading] = useState(true);
  const { roleDesigns  } = useRoleDesigns();

  useEffect(() => { if (!roomId) return;

    // 初始获取角色选择，包含角色设计信息
/**
 * fetchRoleSelections函数
 * 获取远程数据
 * @returns Promise<void>
 */
const fetchRoleSelections = async () =>  {
      try {
        const { data, error  } = await supabase;
        .from('role_selections')
        .select(`
        *,
        role_design:role_id (
          id,
          role_name,
          faction,
          role_description
        )
        `)
        .eq('room_id', roomId);

        if (error) { console.error('Error fetching role selections:', error);
          return
}

        console.log('Role selections with design data:', data);
        setRoleSelections(data || [])
} catch (error) { console.error('Error fetching role selections:', error)
} finally { setLoading(false)
}
    };

    fetchRoleSelections();

    // 订阅角色选择变化
    const channel = supabase;
    .channel(`role_selections_${ roomId }`)
    .on(
      'postgres_changes',
      { event: '*',
        schema: 'public',
        table: 'role_selections',
        filter: `room_id=eq.${roomId 
}`
},
      payload => {
  console.log('Role selection update received:', payload);
        fetchRoleSelections()

}
    )
    .subscribe();

    return () => {
  supabase.removeChannel(channel)
}

}, [roomId]);

  // 当最大玩家数变化时，清除所有角色选择
/**
 * clearAllRoleSelections函数
 * clearAllRoleSelections函数的功能描述
 * @returns Promise<void>
 */
const clearAllRoleSelections = async () =>  { if (!roomId) return false;

    try {
      const { error  } = await supabase;
      .from('role_selections')
      .delete()
      .eq('room_id', roomId);

      if (error) { console.error('Error clearing role selections:', error);
        return false
}

      return true
} catch (error) { console.error('Error clearing role selections:', error);
      return false
}
  };

/**
 * selectRole函数
 * selectRole函数的功能描述
 *
 * @param roleDesignId - roleDesignId参数
 * @returns Promise<void>
 */
const selectRole = async (roleDesignId: string) =>  { if (!currentUserId || !roomId) return false;

    try {
      const { error  } = await supabase;
      .from('role_selections')
      .upsert({ room_id: roomId,
        user_id: currentUserId,
        role_id: roleDesignId // 现在使用 role_design 的 uuid 
});

      if (error) { console.error('Error selecting role:', error);
        return false
}

      return true
} catch (error) { console.error('Error selecting role:', error);
      return false
}
  };

/**
 * unselectRole函数
 * unselectRole函数的功能描述
 * @returns Promise<void>
 */
const unselectRole = async () =>  { if (!currentUserId || !roomId) return false;

    try {
      const { error  } = await supabase;
      .from('role_selections')
      .delete()
      .eq('room_id', roomId)
      .eq('user_id', currentUserId);

      if (error) { console.error('Error unselecting role:', error);
        return false
}

      return true
} catch (error) { console.error('Error unselecting role:', error);
      return false
}
  };

/**
 * getSelectedRoleByUser函数
 * 获取数据
 *
 * @param userId - userId参数
 * @returns void
 */
const getSelectedRoleByUser = (userId: string) =>  { const selection = roleSelections.find(selection => selection.user_id === userId);
    return selection ? {
      roleId: selection.role_id,
      roleName: selection.role_design?.role_name || '未知角色',
      roleDesign: selection.role_design 
} : null
};

/**
 * isRoleSelected函数
 * isRoleSelected函数的功能描述
 *
 * @param roleDesignId - roleDesignId参数
 * @returns void
 */
const isRoleSelected = (roleDesignId: string) =>  {
  return roleSelections.some(selection => selection.role_id === roleDesignId)

};

/**
 * getCurrentPlayerSelection函数
 * 获取数据
 * @returns void
 */
const getCurrentPlayerSelection = () =>  {
  if (!currentUserId) return null;
    return getSelectedRoleByUser(currentUserId)

};

  // 检查是否可以选择角色（当前玩家数等于最大玩家数）
/**
 * canSelectRoles函数
 * canSelectRoles函数的功能描述
 * @returns void
 */
const canSelectRoles = () =>  {
  return currentPlayerCount >= maxPlayers

};

  // 检查是否所有玩家都已选择角色
/**
 * allPlayersSelectedRoles函数
 * allPlayersSelectedRoles函数的功能描述
 * @returns void
 */
const allPlayersSelectedRoles = () =>  {
  return roleSelections.length >= currentPlayerCount

};

  return { roleSelections,
    loading,
    selectRole,
    unselectRole,
    getSelectedRoleByUser,
    isRoleSelected,
    getCurrentPlayerSelection,
    canSelectRoles,
    allPlayersSelectedRoles,
    clearAllRoleSelections }
};
