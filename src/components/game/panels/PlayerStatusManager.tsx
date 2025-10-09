/**
 * 玩家状态管理组件
 * 处理状态变更、实时更新和可视化显示的统一管理
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRoleStates } from '@/hooks/useRoleStates';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { ROLE_STATUS, getRoleStatusName, getRoleStatusColor } from '@/utils/roleStateHelpers';
import { canAccessWerewolfChannel, isDemonRole } from '@/utils/roleUtils';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Heart } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  userId?: string;
  avatar?: string;
}

interface PlayerStatusManagerProps {
  players: Player[];
  roomId: string;
  maxPlayers: number;
  showDyingStatusOnly?: boolean; // 是否只显示濒死状态变更
  allowedRoles?: string[]; // 允许查看状态变更的角色列表
  className?: string;
}

/**
 * 允许查看濒死状态的角色列表
 * - 狼人角色（包括狼人、狼人_1、狼人_2）
 * - 白狼角色  
 * - 女巫角色
 * - 暗夜术士角色
 * - 恶魔角色
 */
const DYING_STATUS_VISIBLE_ROLES = [
  'werewolf', 'werewolf_1', 'werewolf_2', 'whitewolf', 
  'witch', 'voodoo', 'demon'
];

const PlayerStatusManager: React.FC<PlayerStatusManagerProps> = ({
  players,
  roomId,
  maxPlayers,
  showDyingStatusOnly = false,
  allowedRoles = DYING_STATUS_VISIBLE_ROLES,
  className = ''
}) => {
  const { currentUser } = useAuth();
  const { roleStates } = useRoleStates(roomId);
  const { getSelectedRoleByUser } = useRoleSelection(roomId, currentUser?.id || null, players.length, maxPlayers);
  const [dyingPlayers, setDyingPlayers] = useState<string[]>([]);
  const [recentChanges, setRecentChanges] = useState<Map<string, { fromStatus: number; toStatus: number; timestamp: number }>>(new Map());

  // 获取当前用户角色信息
  const currentUserRoleSelection = currentUser ? getSelectedRoleByUser(currentUser.id) : null;
  const currentUserRole = currentUserRoleSelection?.roleDesign?.role_name;
  const currentUserRoleDesign = currentUserRoleSelection?.roleDesign;

  // 检查当前用户是否有权查看状态变更
  const canViewStatusChanges = React.useMemo(() => {
    if (!currentUserRole) return false;
    
    // 法官总是可以查看
    if (currentUser?.id && roomId) {
      // 这里可以添加法官权限检查逻辑
    }
    
    // 特定角色可以查看濒死状态变更
    if (showDyingStatusOnly) {
      return allowedRoles.includes(currentUserRole) || 
             canAccessWerewolfChannel(currentUserRole, currentUserRoleDesign) ||
             isDemonRole(currentUserRole);
    }
    
    return true;
  }, [currentUserRole, currentUserRoleDesign, showDyingStatusOnly, allowedRoles, currentUser?.id, roomId]);

  // 监听角色状态变更
  useEffect(() => {
    const newDyingPlayers: string[] = [];
    const changes = new Map();
    
    roleStates.forEach(roleState => {
      const player = players.find(p => p.userId === roleState.user_id);
      if (!player) return;
      
      // 记录濒死状态的玩家
      if (roleState.role_status === ROLE_STATUS.DYING) {
        newDyingPlayers.push(roleState.user_id);
        
        // 检查是否是新的状态变更
        const existingChange = recentChanges.get(roleState.user_id);
        if (!existingChange || existingChange.toStatus !== ROLE_STATUS.DYING) {
          changes.set(roleState.user_id, {
            fromStatus: existingChange?.toStatus || ROLE_STATUS.NORMAL,
            toStatus: ROLE_STATUS.DYING,
            timestamp: Date.now()
          });
        } else {
          // 保留现有的变更记录
          changes.set(roleState.user_id, existingChange);
        }
      }
    });
    
    setDyingPlayers(newDyingPlayers);
    
    // 只有当changes不为空时才更新recentChanges
    if (changes.size > 0) {
      setRecentChanges(prevChanges => {
        const newChanges = new Map(prevChanges);
        changes.forEach((change, userId) => {
          newChanges.set(userId, change);
        });
        return newChanges;
      });
    }
  }, [roleStates, players]);

  // 清理超过10秒的变更记录
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentChanges(prevChanges => {
        const now = Date.now();
        const filteredChanges = new Map();
        prevChanges.forEach((change, userId) => {
          if (now - change.timestamp < 10000) {
            filteredChanges.set(userId, change);
          }
        });
        return filteredChanges.size !== prevChanges.size ? filteredChanges : prevChanges;
      });
    }, 1000); // 每秒检查一次

    return () => clearInterval(interval);
  }, []);

  // 获取玩家状态显示信息
  const getPlayerStatusInfo = (player: Player) => {
    if (!player.userId) return null;
    
    const roleState = roleStates.find(rs => rs.user_id === player.userId);
    if (!roleState) return null;
    
    const recentChange = recentChanges.get(player.userId);
    const isRecentChange = recentChange && (Date.now() - recentChange.timestamp < 5000);
    
    return {
      status: roleState.role_status,
      statusName: getRoleStatusName(roleState.role_status),
      statusColor: getRoleStatusColor(roleState.role_status),
      isRecentChange,
      recentChange
    };
  };

  // 获取状态变更动画类
  const getStatusChangeAnimation = (statusInfo: ReturnType<typeof getPlayerStatusInfo>) => {
    if (!statusInfo?.isRecentChange) return '';
    
    switch (statusInfo.status) {
      case ROLE_STATUS.DYING:
        return 'animate-pulse border-red-500';
      case ROLE_STATUS.WEAK:
        return 'animate-bounce border-yellow-500';
      case ROLE_STATUS.ELIMINATED:
        return 'animate-fade-out border-gray-500';
      default:
        return '';
    }
  };

  // 如果当前用户无权查看，不显示组件
  if (!canViewStatusChanges) {
    return null;
  }

  // 过滤要显示的玩家
  const playersToShow = showDyingStatusOnly 
    ? players.filter(p => p.userId && dyingPlayers.includes(p.userId))
    : players;

  if (playersToShow.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {showDyingStatusOnly && dyingPlayers.length > 0 && (
        <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
          <AlertTriangle className="h-4 w-4" />
          <span>濒死状态玩家：</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-2">
        {playersToShow.map(player => {
          const statusInfo = getPlayerStatusInfo(player);
          if (!statusInfo) return null;
          
          const animationClass = getStatusChangeAnimation(statusInfo);
          
          return (
            <div
              key={player.id}
              className={`
                flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-500
                bg-werewolf-dark/40 ${animationClass}
                ${statusInfo.isRecentChange ? 'ring-2 ring-opacity-50' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                {/* 玩家头像 */}
                <div className="relative">
                  {player.avatar ? (
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-werewolf-purple/60 flex items-center justify-center text-sm">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  {/* 状态指示器 */}
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-werewolf-dark ${
                    statusInfo.status === ROLE_STATUS.DYING ? 'bg-red-500' :
                    statusInfo.status === ROLE_STATUS.WEAK ? 'bg-yellow-500' :
                    statusInfo.status === ROLE_STATUS.ELIMINATED ? 'bg-gray-500' :
                    'bg-green-500'
                  }`} />
                </div>
                
                {/* 玩家信息 */}
                <div>
                  <div className="font-medium text-white text-sm">
                    {player.name}
                  </div>
                  {statusInfo.isRecentChange && statusInfo.recentChange && (
                    <div className="text-xs text-gray-400">
                      {getRoleStatusName(statusInfo.recentChange.fromStatus)} → {statusInfo.statusName}
                    </div>
                  )}
                </div>
              </div>
              
              {/* 状态标识 */}
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`${statusInfo.statusColor} border-current`}
                >
                  {statusInfo.status === ROLE_STATUS.DYING && <Heart className="h-3 w-3 mr-1" />}
                  {statusInfo.status === ROLE_STATUS.WEAK && <Clock className="h-3 w-3 mr-1" />}
                  {statusInfo.statusName}
                </Badge>
                
                {statusInfo.isRecentChange && (
                  <div className="text-xs text-yellow-400 animate-pulse">
                    新状态
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerStatusManager;