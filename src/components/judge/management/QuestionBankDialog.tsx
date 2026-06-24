/**
 * 题库对话框组件
 *
 * 功能说明：
 * - 显示和管理题库中的所有题目（AI生成和手动编辑）
 * - 提供题目选择、预览、编辑和排序功能
 * - 支持将选中的题目链接到房间
 */

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import QuestionSourceList from './QuestionSourceList';
import QuestionPreview from './QuestionPreview';
import ManualQuestionEditor from './ManualQuestionEditor';
import QuestionOrderEditor from './QuestionOrderEditor';
import { useQuestionBankDialog } from './useQuestionBankDialog';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface QuestionBankDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

const QuestionBankDialog: React.FC<QuestionBankDialogProps> = ({
  isOpen,
  onClose,
  roomId,
}) => {
  const { t } = useLanguage();
  const {
    dialogRef,
    position,
    handleMouseDown,
    activeTab,
    setActiveTab,
    filteredQuestions,
    selectedQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    loading,
    questionSources,
    selectedSources,
    manualQuestion,
    isSystemLinked,
    toggleSourceSelection,
    selectAllFromSource,
    randomSelectAll,
    clearAllSelections,
    toggleQuestionSelection,
    updateManualQuestion,
    handleSubmitManualQuestion,
    handleDragEnd,
    handleLinkSystem,
  } = useQuestionBankDialog({ isOpen, onClose, roomId });

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 pointer-events-none'>
      <div
        ref={dialogRef}
        className='absolute pointer-events-auto bg-werewolf-card border-werewolf-purple/30 border rounded-lg shadow-xl'
        style={{
          left: `${position.x + 150}px`,
          top: `${position.y + 100}px`,
          width: '1000px',
          height: '700px',
        }}
        onMouseDown={handleMouseDown}
      >
        <div className='dialog-header p-4 cursor-move border-b border-werewolf-purple/30'>
          <h2 className='text-werewolf-purple text-xl font-semibold leading-none tracking-tight'>
            {t('judge.questionBank.dialog.title')}
          </h2>
          <button
            onClick={onClose}
            className='absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-werewolf-purple'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <div className='p-4 h-[calc(100%-80px)]'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='h-full'
          >
            <TabsList className='grid w-full grid-cols-3 bg-werewolf-dark/40'>
              <TabsTrigger
                value='generated'
                className='data-[state=active]:bg-werewolf-purple data-[state=active]:text-white'
              >
                {t('judge.questionBank.tabs.generated')}
              </TabsTrigger>
              <TabsTrigger
                value='manual'
                className='data-[state=active]:bg-werewolf-purple data-[state=active]:text-white'
              >
                {t('judge.questionBank.tabs.manual')}
              </TabsTrigger>
              <TabsTrigger
                value='order'
                className='data-[state=active]:bg-werewolf-purple data-[state=active]:text-white'
              >
                {t('judge.questionBank.tabs.order')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value='generated' className='h-[calc(100%-60px)] mt-4'>
              <div className='grid grid-cols-2 gap-4 h-full'>
                <QuestionSourceList
                  questionSources={questionSources}
                  selectedSources={selectedSources}
                  onToggleSource={toggleSourceSelection}
                  onSelectAllFromSource={selectAllFromSource}
                  onRandomSelectAll={randomSelectAll}
                  onClearAllSelections={clearAllSelections}
                />
                <QuestionPreview
                  questions={filteredQuestions}
                  selectedQuestions={selectedQuestions}
                  currentIndex={currentQuestionIndex}
                  loading={loading}
                  onIndexChange={setCurrentQuestionIndex}
                  onToggleSelection={toggleQuestionSelection}
                />
              </div>
            </TabsContent>

            <TabsContent value='manual' className='h-[calc(100%-60px)] mt-4'>
              <ManualQuestionEditor
                manualQuestion={manualQuestion}
                onUpdateQuestion={updateManualQuestion}
                onSubmit={handleSubmitManualQuestion}
              />
            </TabsContent>

            <TabsContent value='order' className='h-[calc(100%-60px)] mt-4'>
              <QuestionOrderEditor
                selectedQuestions={selectedQuestions}
                onDragEnd={handleDragEnd}
                onLinkSystem={handleLinkSystem}
                isSystemLinked={isSystemLinked}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankDialog;
