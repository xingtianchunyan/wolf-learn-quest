
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Wifi, WifiOff, UserCheck, UserX, Crown, Bot } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { usePlayerPresence } from '@/hooks/usePlayerPresence';

interface PlayerStatusPanelProps {
  roomId: string;
  className?: string;
}

const PlayerStatusPanel: React.FC<PlayerStatusPanelProps> = ({ roomId, className }) => {
  const { players, loading: playersLoading } = usePlayersRealtime(roomId);
  const { getOnlinePlayers } = usePlayerPresence(roomId, null);
  const onlinePlayersList = getOnlinePlayers();

  // 检查玩家是否在线
  const isPlayerOnline = (player: any) => {
    return onlinePlayersList.some(onlinePlayer => 
      onlinePlayer.user_id === player.id || 
      (player.name && player.name.includes(onlinePlayer.user_id))
    );
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
                  players.map(player => (
                    <TableRow key={player.id} className="border-werewolf-purple/30">
                      <TableCell className="text-gray-300 font-medium">
                        {player.name}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        未选择
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {isPlayerOnline(player) ? (
                            <Wifi className="h-4 w-4 text-green-400" />
                          ) : (
                            <WifiOff className="h-4 w-4 text-red-400" />
                          )}
                          <span className={`text-sm ${isPlayerOnline(player) ? 'text-green-400' : 'text-red-400'}`}>
                            {isPlayerOnline(player) ? '在线' : '离线'}
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
                  ))
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
