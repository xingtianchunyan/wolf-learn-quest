
import React, { useState, useRef, useEffect } from 'react';
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);

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

  // 拖动处理函数
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.dialog-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div 
        ref={dialogRef}
        className="absolute pointer-events-auto bg-werewolf-card border-werewolf-purple/30 border rounded-lg shadow-xl"
        style={{
          left: `${position.x + 100}px`,
          top: `${position.y + 50}px`,
          width: '900px',
          height: '600px'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="dialog-header p-4 cursor-move border-b border-werewolf-purple/30">
          <h2 className="text-werewolf-purple text-xl font-semibold leading-none tracking-tight">
            准备阶段管理
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-werewolf-purple"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100%-80px)]">
          {/* 左侧 - 房间信息和开始游戏按钮 */}
          <div className="col-span-4 flex flex-col gap-4">
            {/* 房间信息 */}
            <div className="flex-shrink-0">
              <RoomInfoCard roomId={roomId} />
            </div>
            
            {/* 开始游戏按钮 */}
            <div className="flex-shrink-0">
              <Button
                onClick={handleStartGame}
                disabled={!allPlayersReady || players.length === 0}
                className={`w-full px-4 py-3 text-lg ${
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

          {/* 右侧 - 题库和玩家状态 */}
          <div className="col-span-8 flex flex-col gap-4">
            {/* 题库管理 */}
            <div className="flex-1">
              <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-werewolf-purple flex items-center text-lg">
                    <BookOpen className="mr-2 h-5 w-5" />
                    题库管理
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 h-[calc(100%-80px)]">
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

            {/* 玩家状态 */}
            <div className="flex-1">
              <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationPhaseDialog;
