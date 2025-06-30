
import React from 'react';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string | null;
}

interface StudentQuestionDisplayProps {
  currentQuestion: Question;
  selectedOption: number | null;
  hasSubmitted: boolean;
  loading: boolean;
  timeIsUp: boolean;
  onOptionClick: (optionNumber: number) => void;
}

const StudentQuestionDisplay: React.FC<StudentQuestionDisplayProps> = ({
  currentQuestion,
  selectedOption,
  hasSubmitted,
  loading,
  timeIsUp,
  onOptionClick
}) => {
  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];
  };

  const handleOptionClick = (optionNumber: number) => {
    if (hasSubmitted || loading || timeIsUp) {
      return;
    }
    onOptionClick(optionNumber);
  };

  return (
    <>
      {/* 题目题干 */}
      <div className="p-4 bg-werewolf-dark/40 rounded-md">
        <h3 className="font-semibold text-werewolf-purple mb-2">题目</h3>
        <p className="text-gray-300 leading-relaxed">{currentQuestion.question}</p>
      </div>

      {/* 选项列表 */}
      <div className="space-y-2">
        <h3 className="font-semibold text-werewolf-purple">选项</h3>
        {[1, 2, 3, 4].map((optionNum) => {
          const optionText = optionNum === 1 ? currentQuestion.option_a
            : optionNum === 2 ? currentQuestion.option_b
            : optionNum === 3 ? currentQuestion.option_c
            : currentQuestion.option_d;
          
          const isSelected = selectedOption === optionNum;
          const isCorrect = hasSubmitted && optionNum === currentQuestion.correct_option;
          const isWrong = hasSubmitted && isSelected && optionNum !== currentQuestion.correct_option;
          const isDisabled = hasSubmitted || loading || timeIsUp;
          
          return (
            <button
              key={optionNum}
              onClick={() => handleOptionClick(optionNum)}
              disabled={isDisabled}
              className={`w-full p-3 rounded-md border text-left transition-all ${
                isCorrect && hasSubmitted
                  ? 'bg-green-500/20 border-green-500 text-green-300'
                  : isWrong
                  ? 'bg-red-500/20 border-red-500 text-red-300'
                  : isSelected
                  ? 'bg-werewolf-purple/20 border-werewolf-purple text-werewolf-purple'
                  : isDisabled
                  ? 'bg-werewolf-dark/40 border-gray-600 text-gray-500 cursor-not-allowed'
                  : 'bg-werewolf-dark/40 border-gray-600 text-gray-300 hover:bg-werewolf-purple/10 hover:border-werewolf-purple/50 cursor-pointer'
              }`}
            >
              <span className="font-semibold mr-2">
                {getOptionLabel(optionNum)}.
              </span>
              {optionText}
            </button>
          );
        })}
      </div>

      {/* 状态提示 */}
      {loading && (
        <div className="text-center text-blue-400 font-medium">
          正在提交答案...
        </div>
      )}

      {hasSubmitted && !loading && (
        <div className="text-center text-green-400 font-medium">
          答案已提交
        </div>
      )}
      
      {timeIsUp && !hasSubmitted && !loading && (
        <div className="text-center text-red-400 font-medium">
          答题时间已结束，无法提交答案
        </div>
      )}

      {/* 显示解释（如果已提交且有解释） */}
      {hasSubmitted && currentQuestion.explanation && (
        <div className="p-4 bg-blue-900/20 rounded-md border border-blue-500/30">
          <h4 className="font-semibold text-blue-400 mb-2">题目解释</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {currentQuestion.explanation}
          </p>
        </div>
      )}
    </>
  );
};

export default StudentQuestionDisplay;
