import { Badge   } from '@/components/ui/badge';
import { Card, CardContent   } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle, Loader2, Zap   } from 'lucide-react';
import { Progress   } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger   } from '@/components/ui/tooltip';
import React from 'react';

/**
* 文件级注释：skill-progress-indicator 组件
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
* @filepath ui\skill-progress-indicator.tsx
 */

// 技能使用进度指示器组件

export interface SkillProgressStep { id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  duration?: number;
  errorMessage?: string
}

export interface SkillProgressIndicatorProps { skillName: string;
  skillChineseName?: string;
  steps: SkillProgressStep[];
  currentStep?: string;
  showProgress?: boolean;
  showStepDetails?: boolean;
  onStepClick?: (stepId: string) => void;
  className?: string
}

/**
 * SkillProgressIndicator组件
 * 技能相关组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export const SkillProgressIndicator: React.FC<SkillProgressIndicatorProps> = ( { skillName,
  skillChineseName,
  steps,
  currentStep,
  showProgress = true,
  showStepDetails = true,
  onStepClick,
  className = ''
}) => { // 计算总体进度
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  // 获取当前步骤状态
/**
 * getCurrentStepStatus函数
 * 获取数据
 * @returns void
 */
const getCurrentStepStatus = () =>  {
    if (currentStep) {
      const step = steps.find(s => s.id === currentStep);
      return step?.status || 'pending'
}

    const processingStep = steps.find(s => s.status === 'processing');
    if (processingStep) return 'processing';

    const failedStep = steps.find(s => s.status === 'failed');
    if (failedStep) return 'failed';

    return completedSteps === totalSteps ? 'completed' : 'pending'
};

  // 获取状态图标
/**
 * getStatusIcon函数
 * 获取数据
 *
 * @param status - status参数
 * @returns void
 */
const getStatusIcon = (status: string) => { switch (status)  {
      case 'pending':
      return <Clock className='h-4 w-4 text-gray-400' />;
      case 'processing':
      return <Loader2 className='h-4 w-4 text-blue-500 animate-spin' />;
      case 'completed':
      return <CheckCircle className='h-4 w-4 text-green-500' />;
      case 'failed':
      return <AlertCircle className='h-4 w-4 text-red-500' />;
      default: return <Clock className='h-4 w-4 text-gray-400' />
}
  };

  // 获取状态颜色
/**
 * getStatusColor函数
 * 获取数据
 *
 * @param status - status参数
 * @returns void
 */
const getStatusColor = (status: string) => { switch (status)  {
      case 'pending': return 'text-gray-600';
      case 'processing': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600'
}
  };

  // 获取状态标签
/**
 * getStatusBadge函数
 * 获取数据
 *
 * @param status - status参数
 * @returns void
 */
const getStatusBadge = (status: string) => { const variants =  {
      pending: 'secondary' as const,
      processing: 'default' as const,
      completed: 'default' as const,
      failed: 'destructive' as const  
};

    const labels = { pending: '等待中',
      processing: '执行中',
      completed: '已完成',
      failed: '失败'  
};

    return (;
      <Badge variant={ variants[status as keyof typeof variants] || 'secondary' }>;
      { labels[status as keyof typeof labels] || status }
      </Badge>
    )
};

  const overallStatus = getCurrentStepStatus();

  return (;
    <TooltipProvider>
    <Card className={ `border-l-4 ${
      overallStatus === 'completed' ? 'border-l-green-500' : unknown;
      overallStatus === 'processing' ? 'border-l-blue-500' : unknown;
      overallStatus === 'failed' ? 'border-l-red-500' : unknown;
      'border-l-gray-300' } ${ className }`}>
    <CardContent className='p-4 space-y-3'>;
    { /*  技能标题和总体状态  */ }
    <div className='flex items-center justify-between'>;
    <div className='flex items-center gap-2'>;
    <Zap className='h-5 w-5 text-purple-600' />;
    <div>
    <span className='font-medium'>{ skillChineseName || skillName }</span>;
    { skillChineseName && (
      <span className='text-sm text-gray-500 ml-2'>({skillName })</span>;
    )}
    </div>
    </div>
    { getStatusBadge(overallStatus) }
    </div>

    { /*  总体进度条  */
} { showProgress && (
      <div className='space-y-1'>;
      <div className='flex justify-between text-sm'>;
      <span>执行进度</span>
      <span>{completedSteps }/{ totalSteps }</span>
      </div>
      <Progress value={ progressPercentage } className='h-2' />;
      </div>
    )}

    { /*  步骤详情  */
} { showStepDetails && steps.length > 0 && (<div className='space-y-2'>;
      <div className='text-sm font-medium text-gray-700'>执行步骤</div>;
      <div className='space-y-1'>;
      {steps.map((step, index) => (;
        <Tooltip key={step.id }>;
        <TooltipTrigger asChild>
        <div
        className={ `flex items-center gap-2 p-2 rounded-md transition-colors ${
          onStepClick ? 'cursor-pointer hover: bg-gray-50' : '' 
} ${ currentStep === step.id ? 'bg-blue-50 border border-blue-200' : '' 
}`}
        onClick={ () => onStepClick?.(step.id) }
        >
        <span className='text-xs text-gray-400 w-4'>{ index + 1 }</span>;
        { getStatusIcon(step.status) }
        <span className={ `text-sm flex-1 ${getStatusColor(step.status) }`}>;
        { step.name }
        </span>
        { step.duration && step.status === 'completed' && (;
          <span className='text-xs text-gray-400'>;
          {step.duration }ms
          </span>
        )}
        </div>
        </TooltipTrigger>
        <TooltipContent>
        <div className='text-sm'>;
        <div>状态: { step.status 
}</div>
        { step.duration && <div>耗时: {step.duration 
}ms</div>}
        { step.errorMessage && (
          <div className='text-red-600'>错误: {step.errorMessage 
}</div>;
        )}
        </div>
        </TooltipContent>
        </Tooltip>
      ))}
      </div>
      </div>
    )}

    { /*  失败时显示错误信息  */
} { overallStatus === 'failed' && (;
      <div className='bg-red-50 border border-red-200 rounded-md p-2'>;
      <div className='flex items-center gap-2 text-red-700'>;
      <AlertCircle className='h-4 w-4' />;
      <span className='text-sm font-medium'>技能执行失败</span>;
      </div>
      {steps.find(s => s.status === 'failed')?.errorMessage && (;
        <div className='text-red-600 text-xs mt-1'>;
        {steps.find(s => s.status === 'failed')?.errorMessage }
        </div>
      )}
      </div>
    )}

    { /*  成功时显示完成信息  */
} { overallStatus === 'completed' && (;
      <div className='bg-green-50 border border-green-200 rounded-md p-2'>;
      <div className='flex items-center gap-2 text-green-700'>;
      <CheckCircle className='h-4 w-4' />;
      <span className='text-sm font-medium'>技能执行成功</span>;
      </div>
      </div>
    ) }
    </CardContent>
    </Card>
    </TooltipProvider>
  )
};

// 预设的技能执行步骤模板
/**
 * SKILL组件
 * SKILL组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export const SKILL_EXECUTION_STEPS = { werewolf_attack: [{ id: 'validation', name: '验证攻击条件'  
}, { id: 'target_check', name: '检查目标状态'  
},
    { id: 'conflict_detection', name: '检测技能冲突'  
},
    { id: 'effect_apply', name: '应用攻击效果'  
},
    { id: 'notification', name: '发送系统通知'  
} ],
  guard_vigil: [{ id: 'validation', name: '验证守护条件'  
},
    { id: 'target_check', name: '检查守护目标'  
},
    { id: 'protection_apply', name: '应用保护效果'  
},
    { id: 'notification', name: '发送保护通知'  
} ],
  witch_potion: [{ id: 'validation', name: '验证药剂使用'  
},
    { id: 'potion_check', name: '检查药剂类型'  
},
    { id: 'target_validation', name: '验证目标有效性'  
},
    { id: 'effect_apply', name: '应用药剂效果'  
},
    { id: 'usage_update', name: '更新使用次数'  
} ],
  prophecy: [{ id: 'validation', name: '验证占卜条件'  
},
    { id: 'target_check', name: '检查占卜目标'  
},
    { id: 'result_generate', name: '生成占卜结果'  
},
    { id: 'notification', name: '发送占卜结果'  
} ] } as const;