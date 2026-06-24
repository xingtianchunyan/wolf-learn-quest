import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GripVertical } from 'lucide-react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from 'react-beautiful-dnd';
import { Question } from '../types/questionBank';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface QuestionOrderEditorProps {
  selectedQuestions: Question[];
  onDragEnd: (result: DropResult) => void;
  onLinkSystem: () => void;
  isSystemLinked: boolean;
}

const QuestionOrderEditor: React.FC<QuestionOrderEditorProps> = ({
  selectedQuestions,
  onDragEnd,
  onLinkSystem,
  isSystemLinked,
}) => {
  const { t } = useLanguage();
  const getPhaseLabel = (index: number) => {
    const round = Math.floor(index / 2) + 1;
    const phase =
      index % 2 === 0
        ? t('game.phase.evening_quiz')
        : t('game.phase.dawn_quiz');
    return t('judge.answerRecord.roundPhase', { round, phase });
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'bg-green-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-orange-500';
      case 4:
        return 'bg-red-500';
      case 5:
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return t('game.difficulty.very_easy');
      case 2:
        return t('game.difficulty.easy');
      case 3:
        return t('game.difficulty.medium');
      case 4:
        return t('game.difficulty.hard');
      case 5:
        return t('game.difficulty.very_hard');
      default:
        return t('game.difficulty.unknown');
    }
  };

  return (
    <Card className='bg-werewolf-dark/40 border-werewolf-purple/30 h-full'>
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-werewolf-purple'>
            {t('judge.questionBank.order.title')}
          </CardTitle>
          <Button
            onClick={onLinkSystem}
            disabled={selectedQuestions.length === 0}
            size='sm'
            className='bg-werewolf-purple hover:bg-werewolf-light text-white'
          >
            {isSystemLinked
              ? t('judge.questionBank.order.updateSystem')
              : t('judge.questionBank.order.linkSystem')}
          </Button>
        </div>
        <p className='text-gray-400 text-sm'>
          {t('judge.questionBank.order.selectedCount', {
            count: selectedQuestions.length,
          })}
        </p>
      </CardHeader>
      <CardContent className='h-[calc(100%-100px)]'>
        {selectedQuestions.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-400'>
              {t('judge.questionBank.order.empty')}
            </p>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='questions'>
              {provided => (
                <ScrollArea className='h-full'>
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='space-y-3 pr-4'
                  >
                    {selectedQuestions.map((question, index) => (
                      <Draggable
                        key={question.id}
                        draggableId={question.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-werewolf-dark/20 border border-werewolf-purple/30 rounded-lg p-4 transition-all ${
                              snapshot.isDragging
                                ? 'shadow-lg bg-werewolf-purple/20'
                                : ''
                            }`}
                          >
                            <div className='flex items-start justify-between'>
                              <div className='flex items-start space-x-3 flex-1'>
                                <div
                                  {...provided.dragHandleProps}
                                  className='mt-1 text-gray-400 hover:text-werewolf-purple cursor-grab'
                                >
                                  <GripVertical className='h-5 w-5' />
                                </div>
                                <div className='flex-1'>
                                  <div className='flex items-center space-x-2 mb-2'>
                                    <span className='bg-werewolf-purple text-white px-2 py-1 rounded text-xs font-medium'>
                                      {getPhaseLabel(index)}
                                    </span>
                                    <span className='text-gray-400 text-xs'>
                                      {t(
                                        'judge.questionBank.preview.questionLabel',
                                        { index: index + 1 }
                                      )}
                                    </span>
                                    <Badge
                                      className={`text-white ${getDifficultyColor(question.difficulty || 1)}`}
                                    >
                                      {getDifficultyLabel(
                                        question.difficulty || 1
                                      )}
                                    </Badge>
                                  </div>
                                  <p className='text-gray-300 text-sm'>
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
