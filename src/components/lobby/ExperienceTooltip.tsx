
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ExperienceTooltip: React.FC = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle size={14} className="text-gray-400 cursor-help hover:text-werewolf-purple transition-colors" />
        </TooltipTrigger>
        <TooltipContent className="bg-werewolf-dark text-white border-werewolf-purple/30 max-w-sm p-4">
          <div className="space-y-2">
            <p className="font-semibold text-werewolf-purple">Experience & Level System</p>
            <div className="space-y-1 text-sm">
              <p><strong>Level Requirements:</strong></p>
              <p>• Level 1: 0-49 XP</p>
              <p>• Level 2: 50-99 XP</p>
              <p>• Level 3: 100-199 XP</p>
              <p>• Level 4: 200+ XP</p>
            </div>
            <div className="space-y-1 text-sm mt-3">
              <p><strong>Experience Rewards:</strong></p>
              <p>• Win a game: +50 XP</p>
              <p>• Lose a game: +30 XP</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExperienceTooltip;
