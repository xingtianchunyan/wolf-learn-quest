import { Button  } from '@/components/ui/button';
import { ChevronDown  } from 'lucide-react';
import { DropdownMenu,
import React from 'react';

/**
* 文件级注释：ChatChannelSelector 组件
*
* 该文件实现了一个处理聊天和通信功能，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category chat
* @filepath chat\ChatChannelSelector.tsx
 */

  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu';

export type ChatChannel = 'public' | 'team' | 'judge_private' | 'system' | 'all';

interface ChatChannelSelectorProps { currentChannel: ChatChannel;
  onChannelChange: (channel: ChatChannel) => void;
  availableChannels: ChatChannel[];
  isGameRoom?: boolean;,
}

/**
* ChatChannelSelector 组件
*
* 处理聊天和通信功能
*
* @component
* @param { ChatChannelSelectorProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <ChatChannelSelector { ...props } />
 */
const ChatChannelSelector: React.FC<ChatChannelSelectorProps> = ({ currentChannel,
  onChannelChange,
  availableChannels,
  isGameRoom: _isGameRoom = false;,
}) => { const channelNames = {
    public: '公共聊天',
    team: '小队聊天',
    judge_private: '法官私聊',
    system: '系统公告',
    all: '全部信息',
};

  const getDisplayChannels = () => { // 游戏房间显示所有可用频道，包括法官私聊和小队聊天
    return availableChannels;,
};

  const displayChannels = getDisplayChannels();

  return (;
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant='outline' size='sm' className='flex items-center gap-1'>;
    { channelNames[currentChannel] }
    <ChevronDown className='h-3 w-3' />;
    </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end'>;
    { displayChannels.map(channel => (;
      <DropdownMenuItem
      key={channel }
      onClick={ () => onChannelChange(channel) }
      className={ currentChannel === channel ? 'bg-werewolf-purple/20' : '' }
      >
      { channelNames[channel] }
      </DropdownMenuItem>
    ))}
    </DropdownMenuContent>
    </DropdownMenu>
  );,
};

export default ChatChannelSelector;
