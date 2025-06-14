
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import RoomInfoCard from '@/components/room/RoomInfoCard';
import QuestionBankPanel from './QuestionBankPanel';
import PlayerStatusPanel from './PlayerStatusPanel';
import { useRoomRealtime } from '@/hooks/useRoomRealtime';
// 假设有 LanguageSwitcher 中的 useLanguage，如果没有可以用临时实现
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface PreparationPhaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

const PreparationPhaseDialog: React.FC<PreparationPhaseDialogProps> = ({
  isOpen,
  onClose,
  roomId,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);

  // 读取国际化
  const { t } = useLanguage ? useLanguage() : { t: (x: string) => x };

  // 获取房间实时数据（含主题、人数等）
  const { roomData: realtimeRoomData } = useRoomRealtime(roomId);

  // 获取玩家状态
  const { players } = usePlayersRealtime(roomId);
  const allPlayersReady = players.every((player) => player.isReady);

  // 拖动处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).closest('.dialog-header')
    ) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
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

  if (!isOpen) return null;

  // ---------关键信息聚合---------
  const hostPlayerId =
    realtimeRoomData?.hostPlayerId || players[0]?.name || 'Host';
  const topic = realtimeRoomData?.topic || '元素周期表';
  const onlinePlayersCount = players.filter((p) => !p.isAI).length;
  const playersCount = players.length;
  // 优先取 roomData 的 maxPlayers，否则默认 8
  const maxPlayers = realtimeRoomData?.maxPlayers || 8;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={dialogRef}
        className="absolute pointer-events-auto bg-werewolf-card border-werewolf-purple/30 border rounded-lg shadow-xl"
        style={{
          left: `${position.x + 100}px`,
          top: `${position.y + 50}px`,
          width: '900px',
          height: '600px',
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
            {/* 房间信息，完全复用 GameRoom 页面的组件和数据结构 */}
            <div className="flex-shrink-0">
              <RoomInfoCard
                roomId={roomId}
                hostPlayerId={hostPlayerId}
                topic={topic}
                onlinePlayersCount={onlinePlayersCount}
                playersCount={playersCount}
                maxPlayers={maxPlayers}
                t={t}
              />
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

          {/* 右侧 - 题库管理和玩家状态 */}
          <div className="col-span-8 flex flex-col gap-4">
            <div className="flex-1">
              <QuestionBankPanel className="h-full" />
            </div>
            <div className="flex-1">
              <PlayerStatusPanel roomId={roomId} className="h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationPhaseDialog;
