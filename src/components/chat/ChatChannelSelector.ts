import React from 'react';

export interface ChatChannel {
  id: string;
  name: string;
  type: 'public' | 'team' | 'judge' | 'system';
}

interface ChatChannelSelectorProps {
  channels: ChatChannel[];
  currentChannel: ChatChannel;
  onChannelChange: (channel: ChatChannel) => void;
}

const ChatChannelSelector: React.FC<ChatChannelSelectorProps> = ({
  channels,
  currentChannel,
  onChannelChange,
}) => {
  return React.createElement(
    'div',
    { className: 'flex gap-2 p-2' },
    channels.map(channel =>
      React.createElement(
        'button',
        {
          key: channel.id,
          onClick: () => onChannelChange(channel),
          className: `px-3 py-1 text-sm rounded ${
            currentChannel.id === channel.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`,
        },
        channel.name
      )
    )
  );
};

export default ChatChannelSelector;
