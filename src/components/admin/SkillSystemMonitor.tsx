import React from 'react';

interface SkillSystemMonitorProps {
  gameStateId?: string;
}

export const SkillSystemMonitor: React.FC<SkillSystemMonitorProps> = ({
  gameStateId,
}) => {
  return (
    <div className='p-4 text-sm text-gray-500 border rounded-md'>
      技能系统监控面板（待实现）
      {gameStateId && <span className='ml-2'>GameState: {gameStateId}</span>}
    </div>
  );
};
