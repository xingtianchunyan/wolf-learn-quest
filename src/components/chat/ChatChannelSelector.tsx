
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type ChatChannel = 'public' | 'team' | 'judge_private' | 'system' | 'all';

interface ChatChannelSelectorProps {
  currentChannel: ChatChannel;
  onChannelChange: (channel: ChatChannel) => void;
  availableChannels: ChatChannel[];
  isGameRoom?: boolean;
}

const ChatChannelSelector: React.FC<ChatChannelSelectorProps> = ({
  currentChannel,
  onChannelChange,
  availableChannels,
  _isGameRoom = false
}) => {
  const channelNames = {
    public: '公共聊天',
    team: '小队聊天',
    judge_private: '法官私聊',
    system: '系统公告',
    all: '全部信息'
  };

  const getDisplayChannels = () => {
    // 游戏房间显示所有可用频道，包括法官私聊和小队聊天
    return availableChannels;
  };

  const displayChannels = getDisplayChannels();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          {channelNames[currentChannel]}
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {displayChannels.map((channel) => (
          <DropdownMenuItem
            key={channel}
            onClick={() => onChannelChange(channel)}
            className={currentChannel === channel ? 'bg-werewolf-purple/20' : ''}
          >
            {channelNames[channel]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatChannelSelector;
