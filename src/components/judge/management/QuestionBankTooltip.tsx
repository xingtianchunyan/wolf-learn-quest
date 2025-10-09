import { HelpCircle  } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger  } from '@/components/ui/tooltip';
import React from 'react';

/**
* 文件级注释：QuestionBankTooltip 组件
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
* @filepath judge\management\QuestionBankTooltip.tsx
 */

/**
* QuestionBankTooltip 组件
*
* 提供通用功能组件
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <QuestionBankTooltip />
 */
const QuestionBankTooltip: React.FC = () => { return (;
    <TooltipProvider>
    <Tooltip>
    <TooltipTrigger asChild>
    <HelpCircle className='h-4 w-4 text-werewolf-purple/60 hover:text-werewolf-purple cursor-help' />;
    </TooltipTrigger>
    <TooltipContent side='bottom' className='max-w-sm bg-werewolf-dark border-werewolf-purple/30 text-white p-4'>;
    <div className='space-y-3'>;
    <div>
    <h4 className='font-semibold text-werewolf-purple mb-2'>使用逻辑</h4>;
    <p className='text-sm text-gray-300'>;
    上传文件 → 选择已上传文件 → AI预处理 → 选择已预处理文件 → AI生成题目 → 打开题库
    </p>
    </div>

    <div>
    <h4 className='font-semibold text-werewolf-purple mb-2'>文件限制</h4>;
    <ul className='text-sm text-gray-300 space-y-1'>;
    <li>• 支持格式：TXT、DOC、DOCX、XLS、XLSX、PPTX、MD</li>
    <li>• 文件大小：最大10MB</li>
    <li>• 内容要求：包含学习材料或知识点</li>
    </ul>
    </div>

    <div>
    <h4 className='font-semibold text-werewolf-purple mb-2'>AI模型</h4>;
    <div className='text-sm text-gray-300 space-y-1'>;
    <p>• 预处理：Qwen/Qwen3-30B-A3B</p>
    <p>• 生成题目：Qwen/Qwen3-30B-A3B</p>
    <p>• 上下文长度：128K tokens</p>
    </div>
    </div>
    </div>
    </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  );,
};

export default QuestionBankTooltip;
