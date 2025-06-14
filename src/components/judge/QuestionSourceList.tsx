
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuestionSource } from './types/questionBank';

interface QuestionSourceListProps {
  questionSources: QuestionSource[];
  selectedSources: string[];
  onToggleSource: (sourceId: string) => void;
  onSelectAllFromSource: (sourceId: string) => void;
  onRandomSelectAll: () => void;
}

const QuestionSourceList: React.FC<QuestionSourceListProps> = ({
  questionSources,
  selectedSources,
  onToggleSource,
  onSelectAllFromSource,
  onRandomSelectAll
}) => {
  return (
    <Card className="bg-werewolf-dark/40 border-werewolf-purple/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-werewolf-purple text-lg">
            已生成题目文件
          </CardTitle>
          <Button
            size="sm"
            onClick={onRandomSelectAll}
            className="bg-werewolf-purple hover:bg-werewolf-light text-white"
          >
            随机全选
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-100px)]">
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {questionSources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between p-3 bg-werewolf-dark/20 border border-werewolf-purple/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedSources.includes(source.id)}
                    onCheckedChange={() => onToggleSource(source.id)}
                    id={`source-${source.id}`}
                  />
                  <label htmlFor={`source-${source.id}`} className="cursor-pointer">
                    <p className="text-white font-medium">{source.name}</p>
                    <p className="text-gray-400 text-sm">{source.count} 道题目</p>
                  </label>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelectAllFromSource(source.id)}
                  className="border-werewolf-purple/30 text-werewolf-purple hover:bg-werewolf-purple hover:text-white"
                  disabled={source.count === 0}
                >
                  快速全选
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QuestionSourceList;
