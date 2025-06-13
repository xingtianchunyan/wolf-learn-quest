
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const QuestionBankTooltip: React.FC = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle size={16} className="text-gray-400 cursor-help hover:text-werewolf-purple transition-colors ml-2" />
        </TooltipTrigger>
        <TooltipContent className="bg-werewolf-dark text-white border-werewolf-purple/30 max-w-md p-4">
          <div className="space-y-3">
            <p className="font-semibold text-werewolf-purple">题库管理使用指南</p>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-300">使用流程：</p>
              <div className="text-xs space-y-1 text-gray-300">
                <p>1. 上传文件 → 2. 选择已上传文件</p>
                <p>3. AI预处理 → 4. 选择已预处理文件</p>
                <p>5. AI生成题目 → 6. 打开题库</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-green-300">文件限制：</p>
              <div className="text-xs space-y-1 text-gray-300">
                <p>• 支持格式：DOCX、TXT、MD</p>
                <p>• 文件大小：建议不超过10MB</p>
                <p>• 内容长度：最大100K字符</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-yellow-300">AI模型：</p>
              <div className="text-xs space-y-1 text-gray-300">
                <p>• 模型：Qwen/Qwen3-30B-A3B</p>
                <p>• 上下文：支持128K tokens</p>
                <p>• 限制：RPM 1000, TPM 40000</p>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default QuestionBankTooltip;
