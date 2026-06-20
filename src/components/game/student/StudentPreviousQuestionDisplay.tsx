import React from 'react';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string;
}

interface StudentPreviousQuestionDisplayProps {
  previousQuestion: Question;
}

const StudentPreviousQuestionDisplay: React.FC<
  StudentPreviousQuestionDisplayProps
> = ({ previousQuestion }) => {
  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];
  };

  return (
    <>
      <div className='p-4 bg-werewolf-dark/40 rounded-md'>
        <h3 className='font-semibold text-werewolf-purple mb-2'>
          上一阶段题目
        </h3>
        <p className='text-gray-300 leading-relaxed'>
          {previousQuestion.question}
        </p>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold text-werewolf-purple'>选项及答案</h3>
        {[1, 2, 3, 4].map(optionNum => {
          const optionText =
            optionNum === 1
              ? previousQuestion.option_a
              : optionNum === 2
                ? previousQuestion.option_b
                : optionNum === 3
                  ? previousQuestion.option_c
                  : previousQuestion.option_d;

          const isCorrect = optionNum === previousQuestion.correct_option;

          return (
            <div
              key={optionNum}
              className={`p-3 rounded-md border ${
                isCorrect
                  ? 'bg-green-500/20 border-green-500 text-green-300'
                  : 'bg-werewolf-dark/40 border-gray-600 text-gray-300'
              }`}
            >
              <span className='font-semibold mr-2'>
                {getOptionLabel(optionNum)}.
              </span>
              {optionText}
              {isCorrect && (
                <span className='ml-2 text-green-400 font-bold'>
                  ✓ 正确答案
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className='p-4 bg-werewolf-dark/40 rounded-md'>
        <h3 className='font-semibold text-werewolf-purple mb-2'>答案解析</h3>
        <p className='text-gray-300 leading-relaxed'>
          {previousQuestion.explanation}
        </p>
      </div>
    </>
  );
};

export default StudentPreviousQuestionDisplay;
