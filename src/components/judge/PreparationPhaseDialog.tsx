
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Play, BookOpen, Wifi, WifiOff, UserCheck, UserX, Crown, Bot } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { usePlayerPresence } from '@/hooks/usePlayerPresence';
import RoomInfoCard from '@/components/room/RoomInfoCard';

interface PreparationPhaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: number;
}

const PreparationPhaseDialog: React.FC<PreparationPhaseDialogProps> = ({
  isOpen,
  onClose,
  roomId
}) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  // 使用真实数据
  const { players, loading: playersLoading } = usePlayersRealtime(roomId);
  const { getOnlinePlayers } = usePlayerPresence(roomId, null);
  const onlinePlayersList = getOnlinePlayers();

  // Mock question bank
  const questions: Question[] = [
    {
      id: 'q1',
      question: '什么是团队合作的核心要素？',
      category: '团队协作',
      difficulty: 2
    },
    {
      id: 'q2',
      question: '如何有效处理团队冲突？',
      category: '冲突管理',
      difficulty: 3
    },
    {
      id: 'q3',
      question: '领导力的关键特质包括哪些？',
      category: '领导力',
      difficulty: 3
    },
    {
      id: 'q4',
      question: '有效沟通的基本原则是什么？',
      category: '沟通技巧',
      difficulty: 1
    },
    {
      id: 'q5',
      question: '如何建立团队信任？',
      category: '团队建设',
      difficulty: 2
    }
  ];

  const allPlayersReady = players.every(player => player.isReady);

  const handleStartGame = () => {
    console.log('开始游戏');
    onClose();
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return '简单';
      case 2: return '中等';
      case 3: return '困难';
      default: return '未知';
    }
  };

  // 检查玩家是否在线
  const isPlayerOnline = (player: any) => {
    return onlinePlayersList.some(onlinePlayer => 
      onlinePlayer.user_id === player.id || 
      (player.name && player.name.includes(onlinePlayer.user_id))
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh] bg-werewolf-card border-werewolf-purple/30">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple text-xl">
            准备阶段管理
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-12 gap-6 h-full overflow-hidden">
          {/* 左侧 - 题库组件 */}
          <div className="col-span-4 flex flex-col">
            {/* 房间信息 */}
            <div className="mb-4">
              <RoomInfoCard roomId={roomId} />
            </div>
            
            {/* 题库 */}
            <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-werewolf-purple flex items-center text-lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  题库管理
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 h-full overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-3 pr-4">
                    {questions.map((question) => (
                      <div
                        key={question.id}
                        className={`p-3 rounded-md border cursor-pointer transition-colors ${
                          selectedQuestionId === question.id
                            ? 'border-werewolf-purple bg-werewolf-purple/20'
                            : 'border-werewolf-purple/30 hover:border-werewolf-purple/50'
                        }`}
                        onClick={() => setSelectedQuestionId(question.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                            {getDifficultyText(question.difficulty)}
                          </Badge>
                          <span className="text-xs text-gray-400">{question.category}</span>
                        </div>
                        <p className="text-sm text-gray-300">{question.question}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* 右侧 - 玩家状态表格和开始游戏按钮 */}
          <div className="col-span-8 flex flex-col">
            <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 flex-1 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-werewolf-purple flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  玩家状态
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 h-full overflow-hidden">
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
                          players.map((player) => (
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

            {/* 开始游戏按钮 */}
            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleStartGame}
                disabled={!allPlayersReady || players.length === 0}
                className={`px-8 py-3 text-lg ${
                  allPlayersReady && players.length > 0
                    ? 'bg-werewolf-purple hover:bg-werewolf-light'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                <Play className="mr-2 h-5 w-5" />
                开始游戏
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreparationPhaseDialog;
