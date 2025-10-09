import { Alert, AlertDescription   } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, Loader2, Zap, Shield, Heart   } from 'lucide-react';
import { motion, AnimatePresence   } from 'framer-motion';
import { Progress   } from '@/components/ui/progress';
import { Toast   } from '@/components/ui/toast';
import React, { useState, useEffect   } from 'react';

/**
* 文件级注释：OperationFeedback 组件
*
* 该文件实现了一个提供通用功能组件，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category common
* @filepath game\feedback\OperationFeedback.tsx
 */
export interface FeedbackMessage  { id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  title: string;
  description?: string;
  action?: string;
  duration?: number;
  progress?: number;
  skillType?: string
}

interface OperationFeedbackProps { messages: FeedbackMessage[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'
}

const iconMap = { success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: AlertCircle,
  loading: Loader2  
};

const skillIconMap = { vigil: Shield,
  night_attack: Zap,
  magic_potion: Heart,
  default: Zap  
};

const colorMap = { success: 'border-green-500 bg-green-50 text-green-800',
  error: 'border-red-500 bg-red-50 text-red-800',
  warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
  info: 'border-blue-500 bg-blue-50 text-blue-800',
  loading: 'border-blue-500 bg-blue-50 text-blue-800'  
};

/**
* OperationFeedback 组件
*
* 提供通用功能组件
*
* @component
* @param { OperationFeedbackProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useEffect, useOperationFeedback
*
* @example
* // 使用示例
* <OperationFeedback { ...props } />
 */
const OperationFeedback: React.FC<OperationFeedbackProps> = ( { messages,
  onDismiss,
  position = 'top-right'
}) => { const [visibleMessages, setVisibleMessages] = useState<FeedbackMessage[]>(messages);

  useEffect(() => {
    setVisibleMessages(messages);

    // 自动消失逻辑
    messages.forEach(message => {
      if (message.type !== 'loading' && message.duration !== 0) {
        const timeout = setTimeout(() => {
  onDismiss(message.id)
}, message.duration || 5000);

        return () => clearTimeout(timeout)
}
    })

}, [messages, onDismiss]);

/**
 * getPositionClasses函数
 * 获取数据
 * @returns void
 */
const getPositionClasses = () => { switch (position)  {
      case 'top-right':
      return 'fixed top-4 right-4 z-50';
      case 'top-left':
      return 'fixed top-4 left-4 z-50';
      case 'bottom-right':
      return 'fixed bottom-4 right-4 z-50';
      case 'bottom-left':
      return 'fixed bottom-4 left-4 z-50';
      case 'top-center':
      return 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50';
      default: return 'fixed top-4 right-4 z-50'
}
  };

/**
 * renderIcon函数
 * renderIcon函数的功能描述
 *
 * @param message - message参数
 * @returns void
 */
const renderIcon = (message: FeedbackMessage) =>  { const Icon = iconMap[message.type];
/**
 * SkillIcon组件
 * 技能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
    const SkillIcon = message.skillType ? skillIconMap[message.skillType as keyof typeof skillIconMap] || skillIconMap.default : null;

    return (;
      <div className='flex items-center gap-2'>;
      {SkillIcon && <SkillIcon className='w-4 h-4' /> }
      <Icon className={ `w-5 h-5 ${message.type === 'loading' ? 'animate-spin' : '' 
}`} />;
      </div>
    )
};

/**
 * renderFeedbackCard函数
 * renderFeedbackCard函数的功能描述
 *
 * @param message - message参数
 * @returns void
 */
  const renderFeedbackCard = (message: FeedbackMessage) => (;
    <motion.div
    key={ message.id }
    initial={ { opacity: 0, x: position.includes('right') ? 300 : -300, scale: 0.9  
}}
    animate={ { opacity: 1, x: 0, scale: 1  
}}
    exit={ { opacity: 0, x: position.includes('right') ? 300 : -300, scale: 0.9  
}}
    className={ `;
    min-w-80 max-w-md p-4 rounded-lg border-l-4 shadow-lg backdrop-blur-sm
    ${colorMap[message.type] }
    cursor-pointer hover:shadow-xl transition-all duration-200
    `}
    onClick={ () => message.type !== 'loading' && onDismiss(message.id) }
    whileHover={ { scale: 1.02  
}}
    layout
    >
    <div className='flex items-start gap-3'>;
    <div className='flex-shrink-0 mt-0.5'>;
    { renderIcon(message) }
    </div>

    <div className='flex-1 min-w-0'>;
    <div className='flex items-center justify-between'>;
    <h4 className='font-semibold text-sm'>{ message.title }</h4>;
    { message.type !== 'loading' && (;
      <button
      onClick={e => {
  e.stopPropagation();
        onDismiss(message.id)
}}
      className='text-current opacity-50 hover:opacity-100 transition-opacity';
      aria-label='关闭';
      >
      ×
      </button>
    )
}
    </div>

    { message.description && (
      <p className='text-xs mt-1 opacity-80'>{message.description }</p>;
    )}

    { message.action && (
      <p className='text-xs mt-2 font-medium'>{message.action }</p>;
    )}

    { typeof message.progress === 'number' && (;
      <div className='mt-2'>;
      <Progress value={message.progress } className='h-1' />;
      <span className='text-xs opacity-70'>{ message.progress }%</span>;
      </div>
    )}
    </div>
    </div>
    </motion.div>
  );

  return (;
    <div className={ getPositionClasses() }>;
    <div className='space-y-2'>;
    <AnimatePresence mode='popLayout'>;
    { visibleMessages.map(renderFeedbackCard) }
    </AnimatePresence>
    </div>
    </div>
  )
};

// Hook for easy usage
/**
 * useOperationFeedback函数
 * 自定义Hook
 * @returns void
 */
export const useOperationFeedback = () =>  { const [messages, setMessages] = useState<FeedbackMessage[]>([]);

/**
 * addMessage函数
 * addMessage函数的功能描述
 *
 * @param message - message参数
 * @param 'id'> - 'id'>参数
 * @returns void
 */
const addMessage = (message: Omit<FeedbackMessage, 'id'>) =>  {
    const id = Math.random().toString(36).substr(2, 9);
    setMessages(prev => [...prev, { ...message, id  }]);
    return id
};

/**
 * updateMessage函数
 * 更新数据
 *
 * @param id - id参数
 * @param updates - updates参数
 * @returns void
 */
const updateMessage = (id: string, updates: Partial<FeedbackMessage>) =>  { setMessages(prev => prev.map(msg =>;
    msg.id === id ? { ...msg, ...updates  } : msg;
  ))
};

/**
 * removeMessage函数
 * removeMessage函数的功能描述
 *
 * @param id - id参数
 * @returns void
 */
const removeMessage = (id: string) =>  {
  setMessages(prev => prev.filter(msg => msg.id !== id))

};

/**
 * clearAll函数
 * clearAll函数的功能描述
 * @returns void
 */
const clearAll = () =>  {
  setMessages([])

};

// 预设的反馈类型
/**
 * showSuccess函数
 * showSuccess函数的功能描述
 *
 * @param title - title参数
 * @param description? - description?参数
 * @param skillType? - skillType?参数
 * @returns void
 */
const showSuccess = (title: string, description?: string, skillType?: string) => { return addMessage( {
    type: 'success',
    title,
    description,
    skillType,
    duration: 4000 
})
};

/**
 * showError函数
 * showError函数的功能描述
 *
 * @param title - title参数
 * @param description? - description?参数
 * @param skillType? - skillType?参数
 * @returns void
 */
const showError = (title: string, description?: string, skillType?: string) => { return addMessage( {
    type: 'error',
    title,
    description,
    skillType,
    duration: 6000 
})
};

/**
 * showWarning函数
 * showWarning函数的功能描述
 *
 * @param title - title参数
 * @param description? - description?参数
 * @returns void
 */
const showWarning = (title: string, description?: string) => { return addMessage( {
    type: 'warning',
    title,
    description,
    duration: 5000 
})
};

/**
 * showInfo函数
 * showInfo函数的功能描述
 *
 * @param title - title参数
 * @param description? - description?参数
 * @returns void
 */
const showInfo = (title: string, description?: string) => { return addMessage( {
    type: 'info',
    title,
    description,
    duration: 4000 
})
};

/**
 * showLoading函数
 * 加载数据
 *
 * @param title - title参数
 * @param description? - description?参数
 * @param progress? - progress?参数
 * @returns void
 */
const showLoading = (title: string, description?: string, progress?: number) => { return addMessage( {
    type: 'loading',
    title,
    description,
    progress,
    duration: 0 // 不自动消失 
})
};

// 技能相关的预设反馈
/**
 * showSkillSuccess函数
 * showSkillSuccess函数的功能描述
 *
 * @param skillName - skillName参数
 * @param targetName? - targetName?参数
 * @returns void
 */
const showSkillSuccess = (skillName: string, targetName?: string) => { const actionText = targetName ? `对 $ {targetName 
} 使用` : '使用';
  return showSuccess(;
    '技能使用成功',
    `${ actionText } ${ skillName } 技能成功`,
    skillName
  )
};

/**
 * showSkillError函数
 * showSkillError函数的功能描述
 *
 * @param skillName - skillName参数
 * @param reason - reason参数
 * @returns void
 */
const showSkillError = (skillName: string, reason: string) =>  { return showError(;
    '技能使用失败',
    `${skillName } 技能使用失败：${ reason }`,
    skillName
  )
};

/**
 * showSkillConflict函数
 * showSkillConflict函数的功能描述
 *
 * @param skillName - skillName参数
 * @param conflictReason - conflictReason参数
 * @returns void
 */
const showSkillConflict = (skillName: string, conflictReason: string) =>  { return showWarning(;
    '技能冲突',
    `${skillName } 与其他技能发生冲突：${ conflictReason }`
  )
};

return { messages,
  addMessage,
  updateMessage,
  removeMessage,
  clearAll,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showLoading,
  showSkillSuccess,
  showSkillError,
  showSkillConflict }
};

/**
 * OperationFeedback组件
 * OperationFeedback组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default OperationFeedback;