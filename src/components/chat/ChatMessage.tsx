
import React from 'react';

export interface ChatMessage {
  id: string;
  sender_id: string;
  message: string;
  created_at: string;
  chat_type: string;
  game_round?: number;
  game_phase?: string;
  sender_name?: string;
  metadata?: {
    visibility?: any;
    data?: any;
    announcement_type?: string;
  };
}

interface ChatMessageProps {
  message: ChatMessage;
  currentUserId?: string;
  gamePhase?: string;
  gameRound?: number;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({
  message,
  currentUserId,
  gamePhase,
  gameRound
}) => {
  const isOwnMessage = message.sender_id === currentUserId;
  
  // 关键词屏蔽列表
  const bannedKeywords = [
    '狼人', 'werewolf', '预言家', 'seer', '女巫', 'witch', 
    '守卫', 'guard', '猎人', 'hunter', '白狼王', 'whitewolf',
    '村民', 'villager', '平民', 'citizen'
  ];

  const containsBannedKeyword = (text: string) => {
    return bannedKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const shouldCensorMessage = message.chat_type === 'public' && containsBannedKeyword(message.message);
  const displayMessage = shouldCensorMessage ? '[消息已屏蔽 - 包含敏感词汇]' : message.message;

  // 格式化消息显示
  const formatMessage = () => {
    const playerName = isOwnMessage ? 'You' : (message.sender_name || 'Unknown');
    const timestamp = new Date(message.created_at).toLocaleTimeString();
    
    let roundPhaseInfo = '';
    if (message.game_round && message.game_phase) {
      roundPhaseInfo = `第${message.game_round}轮-${message.game_phase}期`;
    } else if (gameRound && gamePhase) {
      roundPhaseInfo = `第${gameRound}轮-${gamePhase}期`;
    }

    const header = roundPhaseInfo 
      ? `【${playerName}，${roundPhaseInfo}，${timestamp}】`
      : `【${playerName}，${timestamp}】`;

    return { header, content: displayMessage };
  };

  const { header, content } = formatMessage();

  const getChannelColor = () => {
    switch (message.chat_type) {
      case 'public': return 'text-blue-400';
      case 'team': return 'text-red-400';
      case 'judge_private': return 'text-yellow-400';
      case 'system': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="chat-message mb-3">
      <p className={`text-sm ${getChannelColor()}`}>
        <span className="font-bold">{header}</span>
      </p>
      <p className="text-sm text-gray-200 ml-2 mt-1">
        {content}
      </p>
    </div>
  );
};

export default ChatMessageComponent;
