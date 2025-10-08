import React from 'react';

/**
* 文件级注释：StudentQuestionDisplay 组件
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
* @filepath game\student\StudentQuestionDisplay.tsx
 */

interface Question { id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string | null;
  difficulty: number | null;
  category: string | null;,
}

interface StudentQuestionDisplayProps { currentQuestion: Question;
  selectedOption: number | null;
  hasSubmitted: boolean;
  loading: boolean;
  timeIsUp: boolean;
  onOptionClick: (optionNumber: number) => void;,
}

/**
* StudentQuestionDisplay 组件
*
* 提供通用功能组件
*
* @component
* @param { StudentQuestionDisplayProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <StudentQuestionDisplay { ...props } />
 */
const StudentQuestionDisplay: React.FC<StudentQuestionDisplayProps> = ({ currentQuestion,
  selectedOption,
  hasSubmitted,
  loading,
  timeIsUp,
  onOptionClick,
}) => { const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];,
};

  const getOptionText = (optionNumber: number) => { switch (optionNumber) {
      case 1: return currentQuestion.option_a;
      case 2: return currentQuestion.option_b;
      case 3: return currentQuestion.option_c;
      case 4: return currentQuestion.option_d;
      default: return '';,
}
  };

  return (;
    <>
    { /*  题目题干  */ }
    <div className='p-4 bg-werewolf-dark/40 rounded-md'>;
    <h3 className='font-semibold text-werewolf-purple mb-2'>题目</h3>;
    <p className='text-gray-300 leading-relaxed'>{ currentQuestion.question }</p>;
    { currentQuestion.category && (
      <div className='mt-2 text-xs text-gray-500'>;
      类别: {currentQuestion.category }
      </div>
    )}
    { currentQuestion.difficulty && (
      <div className='mt-1 text-xs text-gray-500'>;
      难度: {currentQuestion.difficulty }/10
      </div>
    )}
    </div>

    { /*  选项列表  */ }
    <div className='space-y-2'>;
    <h3 className='font-semibold text-werewolf-purple'>选项</h3>;
    { [1, 2, 3, 4].map(optionNum => {
      const optionText = getOptionText(optionNum);
      const isSelected = selectedOption === optionNum;
      const isCorrect = hasSubmitted && optionNum === currentQuestion.correct_option;
      const isWrong = hasSubmitted && isSelected && optionNum !== currentQuestion.correct_option;

      return (;
        <button
        key={optionNum }
        onClick={ () => onOptionClick(optionNum) }
        disabled={ hasSubmitted || loading || timeIsUp }
        className={ `w-full p-3 rounded-md border text-left transition-all ${
          isCorrect && hasSubmitted
          ? 'bg-green-500/20 border-green-500 text-green-300'
          : isWrong
          ? 'bg-red-500/20 border-red-500 text-red-300'
          : isSelected
          ? 'bg-werewolf-purple/20 border-werewolf-purple text-werewolf-purple'
          : hasSubmitted || timeIsUp
          ? 'bg-werewolf-dark/40 border-gray-600 text-gray-500 cursor-not-allowed'
          : 'bg-werewolf-dark/40 border-gray-600 text-gray-300 hover:bg-werewolf-purple/10 hover:border-werewolf-purple/50',
}`}
        >
        <span className='font-semibold mr-2'>;
        { getOptionLabel(optionNum) }.
        </span>
        { optionText }
        </button>
      );,
})}
    </div>

    { /*  答案状态提示  */ }
    { hasSubmitted && (
      <div className='text-center'>;
      <div className='text-green-400 font-medium mb-2'>;
      答案已提交
      </div>
      {currentQuestion.explanation && (
        <div className='p-3 bg-blue-900/20 rounded-md border border-blue-500/30'>;
        <h4 className='font-semibold text-blue-300 mb-1'>解释</h4>;
        <p className='text-sm text-gray-300'>{currentQuestion.explanation }</p>;
        </div>
      )}
      </div>
    )}

    { timeIsUp && !hasSubmitted && (
      <div className='text-center text-red-400 font-medium'>;
      答题时间已结束，无法提交答案
      </div>
    ) }

    { loading && (
      <div className='text-center text-yellow-400 font-medium'>;
      正在提交答案...
      </div>
    ) }
    </>
  );,
};

export default StudentQuestionDisplay;
