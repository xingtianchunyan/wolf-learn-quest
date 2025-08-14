import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRoleStates } from '@/hooks/useRoleStates';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { useRoleSelection } from '@/hooks/useRoleSelection';

interface Player {
  id: string;
  name: string;
  avatar: string;
  userId?: string;
}

interface GamePlayerStatusDisplayProps {
  players: Player[];
  roomId: string;
  maxPlayers: number;
  selectedTargetId?: string;
  onTargetSelect?: (targetId: string) => void;
  canSelectTargets?: boolean;
}

const GamePlayerStatusDisplay: React.FC<GamePlayerStatusDisplayProps> = ({ 
  players, 
  roomId, 
  maxPlayers, 
  selectedTargetId,
  onTargetSelect,
  canSelectTargets = false
}) => {
  const { currentUser } = useAuth();
  const { roleStates } = useRoleStates(roomId);
  const { getSelectedRoleByUser } = useRoleSelection(roomId, currentUser?.id || null, players.length, maxPlayers);
  const { getLocalImageByDesignId } = useRoleDesigns();

  // 获取当前用户的角色信息
  const currentUserRoleState = currentUser ? roleStates.find(rs => rs.user_id === currentUser.id) : null;
  const currentUserRoleSelection = currentUser ? getSelectedRoleByUser(currentUser.id) : null;

  // 检查当前用户是否是狼人阵营
  const isCurrentUserWerewolf = currentUserRoleSelection?.roleDesign?.role_name === 'werewolf' || 
                                currentUserRoleSelection?.roleDesign?.role_name === 'whitewolf';

  const displayPlayers = Array.from({ length: maxPlayers }, (_, i) => {
    if (i < players.length) {
      return players[i];
    } else {
      return {
        id: `placeholder-${i}`,
        name: '等待玩家',
        avatar: '',
        userId: undefined,
      };
    }
  });

  const handlePlayerClick = (player: typeof displayPlayers[0]) => {
    if (!canSelectTargets || !player.userId || player.userId === currentUser?.id) return;
    
    // 检查玩家是否可以被选为目标
    const targetRoleState = roleStates.find(rs => rs.user_id === player.userId);
    if (targetRoleState?.role_status === 4) return; // 已淘汰的玩家不能被选择
    
    onTargetSelect?.(player.userId);
  };

  const getPlayerDisplayInfo = (player: typeof displayPlayers[0]) => {
    if (!player.userId) {
      return {
        roleName: '',
        roleImageUrl: null,
        showRole: false
      };
    }

    const selectedRole = getSelectedRoleByUser(player.userId);
    const isCurrentPlayer = player.userId === currentUser?.id;
    
    // 当前玩家总是能看到自己的角色
    if (isCurrentPlayer) {
      return {
        roleName: selectedRole?.roleName || '未分配角色',
        roleImageUrl: selectedRole?.roleDesign ? getLocalImageByDesignId(selectedRole.roleDesign.id) : null,
        showRole: true
      };
    }

    // 狼人可以看到其他狼人的角色
    const targetIsWerewolf = selectedRole?.roleDesign?.role_name === 'werewolf' || 
                            selectedRole?.roleDesign?.role_name === 'whitewolf';
    
    if (isCurrentUserWerewolf && targetIsWerewolf) {
      return {
        roleName: selectedRole?.roleName || '未分配角色',
        roleImageUrl: selectedRole?.roleDesign ? getLocalImageByDesignId(selectedRole.roleDesign.id) : null,
        showRole: true
      };
    }

    return {
      roleName: '未知角色',
      roleImageUrl: null,
      showRole: false
    };
  };

  const getStatusBorderClass = (player: typeof displayPlayers[0]) => {
    if (!player.userId) return 'border-werewolf-purple/30';
    
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
      default:
        return 'border-werewolf-purple/30';
    }
  };

  const getPlayerCardClass = (player: typeof displayPlayers[0]) => {
    const baseClass = `relative w-full h-32 rounded-lg p-3 transition-all duration-200`;
    
    if (!player.userId) {
      return `${baseClass} bg-gray-600/40 border-2 border-gray-500`;
    }

    const statusBorder = getStatusBorderClass(player);
    const isSelected = selectedTargetId === player.userId;
    const isSelectable = canSelectTargets && player.userId !== currentUser?.id;
    const isEliminated = roleStates.find(rs => rs.user_id === player.userId)?.role_status === 4;

    return `${baseClass} bg-werewolf-dark/40 border-2 ${statusBorder} ${
      isSelected ? 'ring-2 ring-werewolf-purple ring-offset-2 ring-offset-werewolf-dark' : ''
    } ${
      isSelectable && !isEliminated ? 'hover:bg-werewolf-dark/60 cursor-pointer' : ''
    } ${
      isEliminated ? 'opacity-50' : ''
    }`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {displayPlayers.map((player) => {
        const { roleName, roleImageUrl, showRole } = getPlayerDisplayInfo(player);

        return (
          <div 
            key={player.id}
            className={getPlayerCardClass(player)}
            onClick={() => handlePlayerClick(player)}
          >
            <div className="h-full flex flex-col items-center justify-between">
              {/* 玩家头像 */}
              <div className="flex-1 flex items-center justify-center">
                {player.avatar && player.userId ? (
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                    !player.userId ? 'bg-gray-500' : 'bg-werewolf-purple/60'
                  }`}>
                    {!player.userId ? '?' : player.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {/* 玩家信息 */}
              <div className="text-center">
                <h4 className="font-semibold text-sm text-white truncate">
                  {player.name}
                </h4>
                {showRole && (
                  <p className="text-xs text-werewolf-purple mt-1 font-medium">
                    {roleName}
                  </p>
                )}
                {player.userId === currentUser?.id && (
                  <div className="text-xs text-yellow-400 mt-1">你</div>
                )}
              </div>

              {/* 角色图片（悬浮显示） */}
              {showRole && roleImageUrl && (
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg overflow-hidden">
                  <img 
                    src={roleImageUrl} 
                    alt={roleName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-end p-2">
                    <span className="text-white text-xs font-medium">{roleName}</span>
                  </div>
                </div>
              )}

              {/* 选中指示器 */}
              {selectedTargetId === player.userId && (
                <div className="absolute top-1 right-1 w-3 h-3 bg-werewolf-purple rounded-full border-2 border-white"></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GamePlayerStatusDisplay;