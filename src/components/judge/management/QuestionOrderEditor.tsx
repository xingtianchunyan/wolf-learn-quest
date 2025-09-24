
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Question } from '../types/questionBank';
import { Button } from '@/components/ui/button';

interface QuestionOrderEditorProps {
  selectedQuestions: Question[];
  onDragEnd: (result: any) => void;
  onLinkSystem: () => void;
  isSystemLinked: boolean;
}

const QuestionOrderEditor: React.FC<QuestionOrderEditorProps> = ({
  selectedQuestions,
  onDragEnd,
  onLinkSystem,
  isSystemLinked,
}) => {
  const getPhaseLabel = (index: number) => {
    const round = Math.floor(index / 2) + 1;
    const phase = index % 2 === 0 ? '傍晚' : '黎明';
    return `第${round}轮 ${phase}阶段`;
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return '简单';
      case 2: return '容易';
      case 3: return '中等';
      case 4: return '困难';
      case 5: return '极难';
      default: return '未知';
    }
  };

  return (
    <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-werewolf-purple">已选择题目顺序</CardTitle>
          <Button
            onClick={onLinkSystem}
            disabled={selectedQuestions.length === 0}
            size="sm"
            className="bg-werewolf-purple hover:bg-werewolf-light text-white"
          >
            {isSystemLinked ? '更新教师系统' : '链接教师系统'}
          </Button>
        </div>
        <p className="text-gray-400 text-sm">
          已选择 {selectedQuestions.length}/18 道题目 - 拖动题目可调整顺序
        </p>
      </CardHeader>
      <CardContent className="h-[calc(100%-100px)]">
        {selectedQuestions.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">请先在"已生成题目"页面选择题目</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <ScrollArea className="h-full">
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 pr-4">
                    {selectedQuestions.map((question, index) => (
                      <Draggable key={question.id} draggableId={question.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-werewolf-dark/20 border border-werewolf-purple/30 rounded-lg p-4 transition-all ${
                              snapshot.isDragging ? 'shadow-lg bg-werewolf-purple/20' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div {...provided.dragHandleProps} className="mt-1 text-gray-400 hover:text-werewolf-purple cursor-grab">
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="bg-werewolf-purple text-white px-2 py-1 rounded text-xs font-medium">
                                      {getPhaseLabel(index)}
                                    </span>
                                    <span className="text-gray-400 text-xs">
                                      题目 {index + 1}
                                    </span>
                                    <Badge className={`text-white ${getDifficultyColor(question.difficulty || 1)}`}>
                                      {getDifficultyLabel(question.difficulty || 1)}
                                    </Badge>
                                  </div>
                                  <p className="text-gray-300 text-sm">
                                    {question.question}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </ScrollArea>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionOrderEditor;
