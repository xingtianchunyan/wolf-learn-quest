import React from 'react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation: string | null;
  difficulty: number | null;
  category: string | null;
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
  onOptionClick,
}) => {
  const { t } = useLanguage();
  const getOptionLabel = (index: number) => {
    return ['A', 'B', 'C', 'D'][index - 1];
  };

  const getOptionText = (optionNumber: number) => {
    switch (optionNumber) {
      case 1:
        return currentQuestion.option_a;
      case 2:
        return currentQuestion.option_b;
      case 3:
        return currentQuestion.option_c;
      case 4:
        return currentQuestion.option_d;
      default:
        return '';
    }
  };

  return (
    <>
      {/* 题目题干 */}
      <div className='p-4 bg-werewolf-dark/40 rounded-md'>
        <h3 className='font-semibold text-werewolf-purple mb-2'>
          {t('gameComponent.question.questionTitle')}
        </h3>
        <p className='text-gray-300 leading-relaxed'>
          {currentQuestion.question}
        </p>
        {currentQuestion.category && (
          <div className='mt-2 text-xs text-gray-500'>
            {t('gameComponent.question.category', {
              category: currentQuestion.category,
            })}
          </div>
        )}
        {currentQuestion.difficulty && (
          <div className='mt-1 text-xs text-gray-500'>
            {t('gameComponent.question.difficulty', {
              difficulty: currentQuestion.difficulty,
            })}
          </div>
        )}
      </div>

      {/* 选项列表 */}
      <div className='space-y-2'>
        <h3 className='font-semibold text-werewolf-purple'>
          {t('gameComponent.question.optionsTitle')}
        </h3>
        {[1, 2, 3, 4].map(optionNum => {
          const optionText = getOptionText(optionNum);
          const isSelected = selectedOption === optionNum;
          const isCorrect =
            hasSubmitted && optionNum === currentQuestion.correct_option;
          const isWrong =
            hasSubmitted &&
            isSelected &&
            optionNum !== currentQuestion.correct_option;

          return (
            <button
              key={optionNum}
              onClick={() => onOptionClick(optionNum)}
              disabled={hasSubmitted || loading || timeIsUp}
              className={`w-full p-3 rounded-md border text-left transition-all ${
                isCorrect && hasSubmitted
                  ? 'bg-green-500/20 border-green-500 text-green-300'
                  : isWrong
                    ? 'bg-red-500/20 border-red-500 text-red-300'
                    : isSelected
                      ? 'bg-werewolf-purple/20 border-werewolf-purple text-werewolf-purple'
                      : hasSubmitted || timeIsUp
                        ? 'bg-werewolf-dark/40 border-gray-600 text-gray-500 cursor-not-allowed'
                        : 'bg-werewolf-dark/40 border-gray-600 text-gray-300 hover:bg-werewolf-purple/10 hover:border-werewolf-purple/50'
              }`}
            >
              <span className='font-semibold mr-2'>
                {t('gameComponent.question.optionLabel', {
                  label: getOptionLabel(optionNum),
                })}
              </span>
              {optionText}
            </button>
          );
        })}
      </div>

      {/* 答案状态提示 */}
      {hasSubmitted && (
        <div className='text-center'>
          <div className='text-green-400 font-medium mb-2'>
            {t('gameComponent.question.submitted')}
          </div>
          {currentQuestion.explanation && (
            <div className='p-3 bg-blue-900/20 rounded-md border border-blue-500/30'>
              <h4 className='font-semibold text-blue-300 mb-1'>
                {t('gameComponent.question.explanationTitle')}
              </h4>
              <p className='text-sm text-gray-300'>
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {timeIsUp && !hasSubmitted && (
        <div className='text-center text-red-400 font-medium'>
          {t('gameComponent.question.timeUp')}
        </div>
      )}

      {loading && (
        <div className='text-center text-yellow-400 font-medium'>
          {t('gameComponent.question.submitting')}
        </div>
      )}
    </>
  );
};

export default StudentQuestionDisplay;
