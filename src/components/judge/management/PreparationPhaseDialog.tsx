import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import RoomInfoCard from '@/components/room/RoomInfoCard';
import QuestionBankPanel from './QuestionBankPanel';
import PlayerStatusPanel from './PlayerStatusPanel';
import { useGameState } from '@/hooks/useGameState';
import { useToast } from '@/hooks/use-toast';
import { createLogger } from '@/lib/logger';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

const logger = createLogger('PreparationPhaseDialog');

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
  const { t } = useLanguage();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isStarting, setIsStarting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // 使用真实数据
  const { players } = usePlayersRealtime(roomId);
  const { startGame } = useGameState(roomId);
  const allPlayersReady = players.every(player => player.isReady);

  // 拖动处理函数
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
      if (isDragging && dialogRef.current) {
        const rect = dialogRef.current.getBoundingClientRect();
        const rawX = e.clientX - dragStart.x;
        const rawY = e.clientY - dragStart.y;
        // 限制弹窗不拖出视口（考虑 left/top 的初始偏移量）
        const minX = -100;
        const minY = -50;
        const maxX = window.innerWidth - rect.width - 100;
        const maxY = window.innerHeight - rect.height - 50;
        setPosition({
          x: Math.max(minX, Math.min(rawX, maxX)),
          y: Math.max(minY, Math.min(rawY, maxY)),
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

  const handleStartGame = async () => {
    if (!allPlayersReady || players.length === 0) {
      toast({
        title: t('judge.preparation.toast.cannotStart.title'),
        description: t('judge.preparation.toast.cannotStart.description'),
        variant: 'destructive',
      });
      return;
    }

    setIsStarting(true);
    try {
      const success = await startGame();

      if (success) {
        toast({
          title: t('judge.preparation.toast.started.title'),
          description: t('judge.preparation.toast.started.description'),
        });
        onClose();
      } else {
        toast({
          title: t('judge.preparation.toast.startFailed.title'),
          description: t('common.retry_later'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      logger.error('Error starting game:', error);
      toast({
        title: t('judge.preparation.toast.startError.title'),
        description: t('common.retry_later'),
        variant: 'destructive',
      });
    } finally {
      setIsStarting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 pointer-events-none'>
      <div
        ref={dialogRef}
        className='absolute pointer-events-auto bg-werewolf-card border-werewolf-purple/30 border rounded-lg shadow-xl w-[95vw] max-w-[900px] h-auto max-h-[90vh] lg:h-[600px] lg:max-h-[90vh] flex flex-col overflow-hidden'
        style={{
          left: `${position.x + 100}px`,
          top: `${position.y + 50}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className='dialog-header p-4 cursor-move border-b border-werewolf-purple/30 flex-shrink-0'>
          <h2 className='text-werewolf-purple text-xl font-semibold leading-none tracking-tight'>
            {t('judge.preparation.title')}
          </h2>
          <button
            onClick={onClose}
            className='absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-werewolf-purple'
          >
            ✕
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-auto flex-1 min-h-0'>
          {/* 左侧 - 房间信息和开始游戏按钮 */}
          <div className='lg:col-span-4 flex flex-col gap-4'>
            {/* 房间信息 */}
            <div className='flex-shrink-0'>
              <RoomInfoCard roomId={roomId} />
            </div>

            {/* 开始游戏按钮 */}
            <div className='flex-shrink-0'>
              <Button
                onClick={handleStartGame}
                disabled={
                  !allPlayersReady || players.length === 0 || isStarting
                }
                loading={isStarting}
                data-testid='start-game-button'
                className={`w-full px-4 py-3 text-lg ${
                  allPlayersReady && players.length > 0 && !isStarting
                    ? 'bg-werewolf-purple hover:bg-werewolf-light'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                <Play className='mr-2 h-5 w-5' />
                {isStarting
                  ? t('judge.preparation.startingGame')
                  : t('judge.preparation.startGame')}
              </Button>
            </div>
          </div>

          {/* 右侧 - 题库和玩家状态 */}
          <div className='lg:col-span-8 flex flex-col gap-4 min-h-0'>
            {/* 题库管理 */}
            <div className='flex-1 min-h-0'>
              <QuestionBankPanel className='h-full' roomId={roomId} />
            </div>

            {/* 玩家状态 */}
            <div className='flex-1 min-h-0'>
              <PlayerStatusPanel roomId={roomId} className='h-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationPhaseDialog;
