
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Wifi, WifiOff, UserCheck, UserX, Crown, Bot } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { usePlayerPresence } from '@/hooks/usePlayerPresence';
import { useAuth } from '@/providers/AuthProvider';
import { useRoleSelection } from '@/hooks/useRoleSelection';
import { supabase } from '@/integrations/supabase/client';

interface Player {
  id: string;
  name: string;
  avatar: string;
  isReady: boolean;
  isHost: boolean;
  isAI: boolean;
  role?: string;
  userId?: string;
}

interface PlayerStatusPanelProps {
  roomId: string;
  className?: string;
}

const PlayerStatusPanel: React.FC<PlayerStatusPanelProps> = ({ roomId, className }) => {
  const { currentUser } = useAuth();
  const { players, loading: playersLoading } = usePlayersRealtime(roomId);
  const { getOnlinePlayers } = usePlayerPresence(roomId, currentUser);
  const onlinePlayersList = getOnlinePlayers();

  const [maxPlayers, setMaxPlayers] = useState(8);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!roomId) return;
      const { data, error } = await supabase
        .from('rooms')
        .select('max_players')
        .eq('id', roomId)
        .single();
      
      if (error) {
        console.error('Error fetching max players for PlayerStatusPanel:', error);
      } else if (data && data.max_players) {
        setMaxPlayers(data.max_players);
      }
    };
    fetchRoomData();
  }, [roomId]);

  const { getSelectedRoleByUser } = useRoleSelection(roomId, currentUser?.id || null, players.length, maxPlayers);

  // 根据角色ID获取角色名称（在恢复的结构中，role_id就是角色名称）
  const getRoleName = (roleId: string | null) => {
    if (!roleId) return '未选择';
    return roleId;
  };

  // 检查玩家是否在线 - 修正匹配逻辑
  const isPlayerOnline = (player: Player) => {
    // AI玩家总是显示为"在线"
    if (player.isAI) {
      return true;
    }

    // 对于真实玩家，检查userId是否在在线列表中
    if (!player.userId) {
      return false;
    }

    return onlinePlayersList.some(onlinePlayer => onlinePlayer.user_id === player.userId);
  };

  return (
    <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Users className="mr-2 h-5 w-5" />
          玩家状态
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-80px)]">
        <ScrollArea className="h-full">
          <div className="border border-werewolf-purple/30 rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="border-werewolf-purple/30">
                  <TableHead className="text-werewolf-purple">玩家ID</TableHead>
                  <TableHead className="text-werewolf-purple">角色</TableHead>
                  <TableHead className="text-werewolf-purple">在线状态</TableHead>
                  <TableHead className="text-werewolf-purple">准备状态</TableHead>
                  <TableHead className="text-werewolf-purple">特殊标识</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playersLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-400 py-4">
                      加载中...
                    </TableCell>
                  </TableRow>
                ) : players.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-400 py-4">
                      暂无玩家
                    </TableCell>
                  </TableRow>
                ) : (
                  players.map(player => {
                    const playerOnline = isPlayerOnline(player);
                    // 获取玩家选择的角色
                    const selectedRoleId = player.userId ? getSelectedRoleByUser(player.userId) : null;
                    const roleName = getRoleName(selectedRoleId);
                    
                    return (
                      <TableRow key={player.id} className="border-werewolf-purple/30">
                        <TableCell className="text-gray-300 font-medium">
                          {player.name}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {roleName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {playerOnline ? (
                              <Wifi className="h-4 w-4 text-green-400" />
                            ) : (
                              <WifiOff className="h-4 w-4 text-red-400" />
                            )}
                            <span className={`text-sm ${playerOnline ? 'text-green-400' : 'text-red-400'}`}>
                              {playerOnline ? '在线' : '离线'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {player.isReady ? (
                              <UserCheck className="h-4 w-4 text-green-400" />
                            ) : (
                              <UserX className="h-4 w-4 text-red-400" />
                            )}
                            <span className={`text-sm ${player.isReady ? 'text-green-400' : 'text-red-400'}`}>
                              {player.isReady ? '已准备' : '未准备'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {player.isHost && <Crown className="h-4 w-4 text-yellow-400" />}
                            {player.isAI && <Bot className="h-4 w-4 text-blue-400" />}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PlayerStatusPanel;
