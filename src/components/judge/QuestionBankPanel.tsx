
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: number;
}

interface QuestionBankPanelProps {
  className?: string;
}

const QuestionBankPanel: React.FC<QuestionBankPanelProps> = ({ className }) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  // Mock question bank
  const questions: Question[] = [
    {
      id: 'q1',
      question: '什么是团队合作的核心要素？',
      category: '团队协作',
      difficulty: 2
    },
    {
      id: 'q2',
      question: '如何有效处理团队冲突？',
      category: '冲突管理',
      difficulty: 3
    },
    {
      id: 'q3',
      question: '领导力的关键特质包括哪些？',
      category: '领导力',
      difficulty: 3
    },
    {
      id: 'q4',
      question: '有效沟通的基本原则是什么？',
      category: '沟通技巧',
      difficulty: 1
    },
    {
      id: 'q5',
      question: '如何建立团队信任？',
      category: '团队建设',
      difficulty: 2
    }
  ];

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'bg-green-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return '简单';
      case 2:
        return '中等';
      case 3:
        return '困难';
      default:
        return '未知';
    }
  };

  return (
    <Card className={`bg-werewolf-dark/40 border-werewolf-purple/30 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <BookOpen className="mr-2 h-5 w-5" />
          题库管理
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-80px)]">
        <ScrollArea className="h-full">
          <div className="space-y-3 pr-4">
            {questions.map(question => (
              <div
                key={question.id}
                className={`p-3 rounded-md border cursor-pointer transition-colors ${
                  selectedQuestionId === question.id
                    ? 'border-werewolf-purple bg-werewolf-purple/20'
                    : 'border-werewolf-purple/30 hover:border-werewolf-purple/50'
                }`}
                onClick={() => setSelectedQuestionId(question.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                    {getDifficultyText(question.difficulty)}
                  </Badge>
                  <span className="text-xs text-gray-400">{question.category}</span>
                </div>
                <p className="text-sm text-gray-300">{question.question}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QuestionBankPanel;
