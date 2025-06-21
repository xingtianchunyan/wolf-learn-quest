
import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import PlayerStatusDisplay from '@/components/judge/PlayerStatusDisplay';

interface RoomInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

const RoomInfoDialog: React.FC<RoomInfoDialogProps> = ({
  isOpen,
  onClose,
  roomId
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={dialogRef}
        className="absolute pointer-events-auto bg-werewolf-card border-werewolf-purple/30 border rounded-lg shadow-xl"
        style={{
          left: `${position.x + 150}px`,
          top: `${position.y + 100}px`,
          width: '600px',
          height: '500px'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="dialog-header p-4 cursor-move border-b border-werewolf-purple/30">
          <h2 className="text-werewolf-purple text-xl font-semibold leading-none tracking-tight">
            房间信息
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-werewolf-purple"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4 h-[calc(100%-80px)]">
          <PlayerStatusDisplay roomId={roomId} hideRoles={true} />
        </div>
      </div>
    </div>
  );
};

export default RoomInfoDialog;
