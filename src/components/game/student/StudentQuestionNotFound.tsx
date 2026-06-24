import React from 'react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface StudentQuestionNotFoundProps {
  roundNumber: number;
  phaseName: string;
  expectedQuestionIndex: number;
  totalQuestions: number;
}

const StudentQuestionNotFound: React.FC<StudentQuestionNotFoundProps> = ({
  roundNumber,
  phaseName,
  expectedQuestionIndex,
  totalQuestions,
}) => {
  const { t } = useLanguage();

  return (
    <div className='text-center text-red-400 py-8'>
      <div className='p-4 bg-red-900/20 rounded-md border border-red-500/30'>
        <h3 className='font-semibold mb-2'>
          {t('gameComponent.question.notFound.title')}
        </h3>
        <p className='text-sm'>
          {t('gameComponent.question.notFound.description', {
            round: roundNumber,
            phase: phaseName,
          })}
          <br />
          {t('gameComponent.question.notFound.expectedIndex', {
            index: expectedQuestionIndex + 1,
            total: totalQuestions,
          })}
          <br />
          {t('gameComponent.question.notFound.possibleReason')}
        </p>
      </div>
    </div>
  );
};

export default StudentQuestionNotFound;
