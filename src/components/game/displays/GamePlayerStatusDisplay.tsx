import { canSeeTargetRole, canAccessWerewolfChannel, isDemonRole, isHunterRole   } from '@/utils/roleUtils';
import { useAuth   } from '@/providers/AuthProvider';
import { useRoleDesigns   } from '@/hooks/useRoleDesigns';
import { useRoleSelection   } from '@/hooks/useRoleSelection';
import { useRoleStates   } from '@/hooks/useRoleStates';
import React from 'react';
import PlayerStatusManager from '../panels/PlayerStatusManager';

/**
* 文件级注释：GamePlayerStatusDisplay 组件
*
* 该文件实现了一个处理游戏逻辑和状态管理，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category game
* @filepath game\displays\GamePlayerStatusDisplay.tsx
 */
interface Player  { id: string;
  name: string;
  avatar: string;
  userId?: string
}

interface GamePlayerStatusDisplayProps { players: Player[];
  roomId: string;
  maxPlayers: number;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
  canSelectTargets?: boolean;
  currentPhase?: number
}

/**
* GamePlayerStatusDisplay 组件
*
* 处理游戏逻辑和状态管理
*
* @component
* @param { GamePlayerStatusDisplayProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useAuth, useRoleStates, useRoleDesigns, useRoleSelection
*
* @example
* // 使用示例
* <GamePlayerStatusDisplay { ...props } />
 */
const GamePlayerStatusDisplay: React.FC<GamePlayerStatusDisplayProps> = ( { players,
  roomId,
  maxPlayers,
  selectedTargetId,
  onTargetSelect,
  canSelectTargets = false,
  currentPhase }) => { const { currentUser  } = useAuth();
  const { roleStates  } = useRoleStates(roomId);
  const { getSelectedRoleByUser  } = useRoleSelection(roomId, currentUser?.id || null, players.length, maxPlayers);
  const { getLocalImageByDesignId  } = useRoleDesigns();

  // 获取当前用户的角色信息
  const currentUserRoleState = currentUser ? roleStates.find(rs => rs.user_id === currentUser.id) : null;
  const _currentUserRoleSelection = currentUser ? getSelectedRoleByUser(currentUser.id) : null;

  // 检查当前用户的角色类型和特殊权限
  const currentUserRole = _currentUserRoleSelection?.roleDesign?.role_name;
  const currentUserRoleDesign = _currentUserRoleSelection?.roleDesign;

  // 使用统一的角色工具判断角色类型
  const _isCurrentUserWerewolf = canAccessWerewolfChannel(currentUserRole, currentUserRoleDesign);
  const _isCurrentUserDemon = isDemonRole(currentUserRole || '');
  const isCurrentUserHunter = isHunterRole(currentUserRole || '');

  const displayPlayers = Array.from({ length: maxPlayers  
}, (_, i) => { if (i < players.length) {
      return players[i]
} else { return {
        id: `placeholder-${i 
}`,
        name: '等待玩家',
        avatar: '',
        userId: undefined 
}
}
  });

/**
 * handlePlayerClick函数
 * 处理事件
 *
 * @param player - player参数
 * @returns void
 */
const handlePlayerClick = (player: typeof displayPlayers[0]) =>  {
  if (!canSelectTargets || !player.userId) return;

    // 在白天阶段不能选择自己，夜晚阶段可以选择自己
    const isNightPhase = currentPhase === 3 || currentPhase === 4;
    if (player.userId === currentUser?.id && !isNightPhase) return;

    // 检查玩家是否可以被选为目标
    const targetRoleState = roleStates.find(rs => rs.user_id === player.userId);
    if (targetRoleState?.role_status === 4) return; // 已淘汰的玩家不能被选择

    onTargetSelect?.(player.userId)

};

/**
 * getPlayerDisplayInfo函数
 * 获取数据
 *
 * @param player - player参数
 * @returns void
 */
const getPlayerDisplayInfo = (player: typeof displayPlayers[0]) => { if (!player.userId)  {
      return {
        roleName: '',
        roleImageUrl: null,
        showRole: false 
}
}

    const selectedRole = getSelectedRoleByUser(player.userId);
    const isCurrentPlayer = player.userId === currentUser?.id;

    // 当前玩家总是能看到自己的角色
    if (isCurrentPlayer) { return {
        roleName: selectedRole?.roleName || '未分配角色',
        roleImageUrl: selectedRole?.roleDesign ? getLocalImageByDesignId(selectedRole.roleDesign.id) : null,
        showRole: true 
}
}

    // 使用统一的角色可见性规则
    const targetRole = selectedRole?.roleDesign?.role_name;
    const targetRoleDesign = selectedRole?.roleDesign;

    // 统一的角色可见性判断
    if (canSeeTargetRole(currentUserRole, targetRole, currentUserRoleDesign, targetRoleDesign)) { return {
        roleName: selectedRole?.roleName || '未分配角色',
        roleImageUrl: selectedRole?.roleDesign ? getLocalImageByDesignId(selectedRole.roleDesign.id) : null,
        showRole: true 
}
}

    // 猎人濒死状态下可以查看自身状态
    if (isCurrentUserHunter && isCurrentPlayer && currentUserRoleState?.role_status === 2) { return {
        roleName: selectedRole?.roleName || '未分配角色',
        roleImageUrl: selectedRole?.roleDesign ? getLocalImageByDesignId(selectedRole.roleDesign.id) : null,
        showRole: true,
        specialStatus: '濒死状态 - 可使用技能' 
}
}

    return { roleName: '未知角色',
      roleImageUrl: null,
      showRole: false 
}
};

/**
 * getStatusBorderClass函数
 * 获取数据
 *
 * @param player - player参数
 * @returns void
 */
const getStatusBorderClass = (player: typeof displayPlayers[0]) =>  { if (!player.userId) return 'border-werewolf-purple/30';

    const roleState = roleStates.find(rs => rs.user_id === player.userId);
    switch (roleState?.role_status) {
      case 1: // 正常
      return 'border-green-400';
      case 2: // 濒死
      return 'border-red-400 animate-pulse';
      case 3: // 虚弱
      return 'border-yellow-400';
      case 4: // 淘汰
      return 'border-white';
      default: return 'border-werewolf-purple/30'
}
  };

/**
 * getPlayerCardClass函数
 * 获取数据
 *
 * @param player - player参数
 * @returns void
 */
const getPlayerCardClass = (player: typeof displayPlayers[0]) =>  { const baseClass = `relative w-full h-28 rounded-lg p-2 transition-all duration-200 flex-shrink-0 overflow-hidden aspect-square`;

    if (!player.userId) {
      return `${baseClass } bg-gray-600/40 border-2 border-gray-500`
}

    const statusBorder = getStatusBorderClass(player);
    const isSelected = selectedTargetId === player.userId;
    const isNightPhase = currentPhase === 3 || currentPhase === 4;
    const isSelectable = canSelectTargets && (player.userId !== currentUser?.id || isNightPhase);
    const isEliminated = roleStates.find(rs => rs.user_id === player.userId)?.role_status === 4;

    return `${ baseClass } bg-werewolf-dark/40 border-2 ${ statusBorder } ${ isSelected ? 'ring-2 ring-werewolf-purple ring-offset-2 ring-offset-werewolf-dark' : '' 
} ${ isSelectable && !isEliminated ? 'hover: bg-werewolf-dark/60 cursor-pointer' : '' 
} ${ isEliminated ? 'opacity-50' : '' 
}`
};

  return (;
    <div className='space-y-4'>;
    { /*  濒死状态管理器 - 仅向特定角色显示濒死状态变更  */ }
    <PlayerStatusManager
    players={ displayPlayers.filter(p => p.userId) }
    roomId={ roomId }
    maxPlayers={ maxPlayers }
    showDyingStatusOnly={ true }
    className='mb-4';
    />

    <div className='grid grid-cols-4 gap-3 auto-rows-max'>;
    { displayPlayers.map(player => {
      const { roleName, roleImageUrl, showRole  } = getPlayerDisplayInfo(player);

      return (;
        <div
        key={ player.id }
        className={ getPlayerCardClass(player) }
        onClick={ () => handlePlayerClick(player) }
        >
        <div className='h-full flex flex-col items-center justify-between'>;
        { /*  玩家头像  */ }
        <div className='flex-1 flex items-center justify-center'>;
        { player.avatar && player.userId ? (
          <img
          src={player.avatar }
          alt={ player.name }
          className='w-8 h-8 rounded-full object-cover';
          />
        ) : (
          <div className={ `w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            !player.userId ? 'bg-gray-500' : 'bg-werewolf-purple/60' 
}`}>
          { !player.userId ? '?' : player.name.charAt(0).toUpperCase() 
}
          </div>
        )}
        </div>

        { /*  玩家信息  */ }
        <div className='text-center'>;
        <h4 className='font-semibold text-xs text-white truncate'>;
        { player.name }
        </h4>
        { showRole && (
          <p className='text-xs text-werewolf-purple mt-1 font-medium'>;
          {roleName }
          </p>
        )}
        { player.userId === currentUser?.id && (;
          <div className='text-xs text-yellow-400 mt-1'>你</div>;
        ) }
        </div>

        { /*  角色图片（悬浮显示）  */
} { showRole && roleImageUrl && (
          <div className='absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg overflow-hidden'>;
          <img
          src={roleImageUrl }
          alt={ roleName }
          className='w-full h-full object-cover rounded-lg';
          />
          <div className='absolute inset-0 bg-black/50 flex items-end p-2'>;
          <span className='text-white text-xs font-medium'>{ roleName }</span>;
          </div>
          </div>
        )}

        { /*  选中指示器  */
} { selectedTargetId === player.userId && (;
          <div className='absolute top-1 right-1 w-3 h-3 bg-werewolf-purple rounded-full border-2 border-white'></div>;
        ) }
        </div>
        </div>
      )
})}
    </div>
    </div>
  )
};

/**
 * GamePlayerStatusDisplay组件
 * 游戏相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export default GamePlayerStatusDisplay;