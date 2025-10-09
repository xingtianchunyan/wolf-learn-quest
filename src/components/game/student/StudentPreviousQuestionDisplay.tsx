import React from 'react';

/**
* 文件级注释：StudentPreviousQuestionDisplay 组件
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
* @filepath game\student\StudentPreviousQuestionDisplay.tsx
 */
interface Question  { id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string
}

interface StudentPreviousQuestionDisplayProps { previousQuestion: Question
}

/**
* StudentPreviousQuestionDisplay 组件
*
* 提供通用功能组件
*
* @component
* @param { StudentPreviousQuestionDisplayProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <StudentPreviousQuestionDisplay { ...props } />
 */
const StudentPreviousQuestionDisplay: React.FC<StudentPreviousQuestionDisplayProps> = ({ previousQuestion 
}) => { const getOptionLabel = (index: number) =>  {
  return ['A', 'B', 'C', 'D'][index - 1]

};

  return (;
    <>
    <div className='p-4 bg-werewolf-dark/40 rounded-md'>;
    <h3 className='font-semibold text-werewolf-purple mb-2'>上一阶段题目</h3>;
    <p className='text-gray-300 leading-relaxed'>{ previousQuestion.question }</p>;
    </div>

    <div className='space-y-2'>;
    <h3 className='font-semibold text-werewolf-purple'>选项及答案</h3>;
    { [1, 2, 3, 4].map(optionNum => {
      const optionText = optionNum === 1 ? previousQuestion.option_a;
      : optionNum === 2 ? previousQuestion.option_b;
      : optionNum === 3 ? previousQuestion.option_c;
      : previousQuestion.option_d;

      const isCorrect = optionNum === previousQuestion.correct_option;

      return (;
        <div
        key={optionNum }
        className={ `p-3 rounded-md border ${
          isCorrect
          ? 'bg-green-500/20 border-green-500 text-green-300'
          : 'bg-werewolf-dark/40 border-gray-600 text-gray-300' 
}`}
        >
        <span className='font-semibold mr-2'>;
        { getOptionLabel(optionNum) }.
        </span>
        { optionText }
        { isCorrect && (
          <span className='ml-2 text-green-400 font-bold'>✓ 正确答案</span>;
        ) }
        </div>
      )
})}
    </div>

    <div className='p-4 bg-werewolf-dark/40 rounded-md'>;
    <h3 className='font-semibold text-werewolf-purple mb-2'>答案解析</h3>;
    <p className='text-gray-300 leading-relaxed'>{ previousQuestion.explanation }</p>;
    </div>
    </>
  )
};

/**
 * StudentPreviousQuestionDisplay组件
 * StudentPreviousQuestionDisplay组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default StudentPreviousQuestionDisplay;
