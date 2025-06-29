
import React from 'react';

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
  totalQuestions
}) => {
  return (
    <div className="text-center text-red-400 py-8">
      <div className="p-4 bg-red-900/20 rounded-md border border-red-500/30">
        <h3 className="font-semibold mb-2">题目加载失败</h3>
        <p className="text-sm">
          当前阶段（第{roundNumber}轮{phaseName}）的题目未找到。
          <br />
          期望题目索引：{expectedQuestionIndex} (总题目数: {totalQuestions})
          <br />
          可能原因：法官尚未为此房间设置足够的题目，或题目索引超出范围。
        </p>
      </div>
    </div>
  );
};

export default StudentQuestionNotFound;
