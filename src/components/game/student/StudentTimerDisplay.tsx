import { Clock   } from 'lucide-react';
import React from 'react';

/**
* 文件级注释：StudentTimerDisplay 组件
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
* @filepath game\student\StudentTimerDisplay.tsx
 */
interface StudentTimerDisplayProps  { showTimer: boolean;
  timeIsUp: boolean;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  isAnsweringPhase: boolean;
  gameState: any; // 保持原有类型 
}

/**
* StudentTimerDisplay 组件
*
* 提供通用功能组件
*
* @component
* @param { StudentTimerDisplayProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <StudentTimerDisplay { ...props } />
 */
const StudentTimerDisplay: React.FC<StudentTimerDisplayProps> = ( { showTimer,
  timeIsUp,
  timeRemaining,
  formatTime,
  isAnsweringPhase,
  gameState }) => { return (;
    <>
    {/*  剩余答题时间或时间结束提示  */
} { showTimer && (
      <div className={`flex items-center justify-center p-3 rounded-md ${
        timeIsUp ? 'bg-red-900/30' : 'bg-werewolf-dark/40' 
}`}>
      <Clock className={ `mr-2 h-5 w-5 ${timeIsUp ? 'text-red-400' : 'text-werewolf-purple' 
}`} />;
      <span className={ `text-lg font-bold ${
        timeIsUp ? 'text-red-400' : 'text-werewolf-purple' 
}`}>
      { timeIsUp ? '答题时间已结束' : `剩余时间: ${formatTime(timeRemaining) 
}`}
      </span>
      </div>
    )}
    { gameState?.isPaused && isAnsweringPhase && (
      <div className='flex items-center justify-center p-3 bg-yellow-900/30 rounded-md'>;
      <span className='text-lg font-bold text-yellow-400'>游戏已暂停</span>;
      </div>
    ) }
    </>
  )
};

/**
 * StudentTimerDisplay组件
 * StudentTimerDisplay组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default StudentTimerDisplay;
