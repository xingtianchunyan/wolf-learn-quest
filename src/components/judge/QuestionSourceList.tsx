
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Database, Shuffle, X } from 'lucide-react';
import { QuestionSource } from './types/questionBank';

interface QuestionSourceListProps {
  questionSources: QuestionSource[];
  selectedSources: string[];
  onToggleSource: (sourceId: string) => void;
  onSelectAllFromSource: (sourceId: string) => void;
  onRandomSelectAll: () => void;
  onClearAllSelections: () => void;
}

const QuestionSourceList: React.FC<QuestionSourceListProps> = ({
  questionSources,
  selectedSources,
  onToggleSource,
  onSelectAllFromSource,
  onRandomSelectAll,
  onClearAllSelections
}) => {
  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            题目源
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onRandomSelectAll}
              variant="outline"
              size="sm"
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 text-xs"
            >
              <Shuffle className="h-3 w-3 mr-1" />
              随机全选
            </Button>
            <Button
              onClick={onClearAllSelections}
              variant="outline"
              size="sm"
              className="border-red-500/50 hover:bg-red-500/20 text-red-400 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              取消全选
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-3 pr-4">
            {questionSources.map((source) => (
              <div 
                key={source.id}
                className="p-3 bg-werewolf-dark/40 rounded-md border border-gray-600"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`source-${source.id}`}
                      checked={selectedSources.includes(source.id)}
                      onCheckedChange={() => onToggleSource(source.id)}
                      className="border-werewolf-purple data-[state=checked]:bg-werewolf-purple"
                    />
                    <label 
                      htmlFor={`source-${source.id}`}
                      className="text-sm font-medium text-gray-300 cursor-pointer"
                    >
                      {source.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-400">
                    {source.count} 题
                  </span>
                </div>
                <Button
                  onClick={() => onSelectAllFromSource(source.id)}
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-werewolf-purple hover:bg-werewolf-purple/20"
                >
                  全选此源
                </Button>
              </div>
            ))}
            
            {questionSources.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                暂无题目源
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QuestionSourceList;
