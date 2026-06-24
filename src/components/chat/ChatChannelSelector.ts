/**
 * 文件级注释：游戏房间聊天频道切换器
 * 统一使用字符串频道模型，与 `useMultiChannelChat` 返回值保持一致，避免运行时契约漂移。
 */
import React from 'react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

/**
 * 类型注释：聊天频道
 * 当前聊天系统通过字符串字面量描述频道类型。
 */
export type ChatChannel =
  | 'public'
  | 'team'
  | 'judge_private'
  | 'system'
  | 'all';

/**
 * 接口注释：聊天频道切换器属性
 */
interface ChatChannelSelectorProps {
  availableChannels: ChatChannel[];
  currentChannel: ChatChannel;
  onChannelChange: (channel: ChatChannel) => void;
  isGameRoom?: boolean;
}

const channelLabelKeys: Record<
  ChatChannel,
  import('@/lib/translations').TranslationKey
> = {
  public: 'channel_public',
  team: 'channel_team',
  judge_private: 'channel_judge_private',
  system: 'channel_system',
  all: 'channel_all',
};

/**
 * 组件级注释：渲染房间内可用频道按钮
 */
const ChatChannelSelector: React.FC<ChatChannelSelectorProps> = ({
  availableChannels,
  currentChannel,
  onChannelChange,
  isGameRoom: _isGameRoom = false,
}) => {
  const { t } = useLanguage();

  return React.createElement(
    'div',
    { className: 'flex gap-2 p-2' },
    availableChannels.map(channel =>
      React.createElement(
        'button',
        {
          key: channel,
          onClick: () => onChannelChange(channel),
          className: `px-3 py-1 text-sm rounded ${
            currentChannel === channel
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`,
        },
        t(channelLabelKeys[channel])
      )
    )
  );
};

export default ChatChannelSelector;
