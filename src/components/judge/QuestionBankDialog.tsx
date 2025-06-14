import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import QuestionSourceList from './QuestionSourceList';
import QuestionPreview from './QuestionPreview';
import ManualQuestionEditor from './ManualQuestionEditor';
import QuestionOrderEditor from './QuestionOrderEditor';
import { Question, QuestionSource, ManualQuestionForm } from './types/questionBank';
import { useJudgePage } from '@/contexts/JudgePageContext';

interface QuestionBankDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

const QuestionBankDialog: React.FC<QuestionBankDialogProps> = ({
  isOpen,
  onClose,
  roomId
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('generated');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [questionSources, setQuestionSources] = useState<QuestionSource[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { linkedQuestions, saveLinkedQuestions, isSystemLinked } = useJudgePage();

  const [manualQuestion, setManualQuestion] = useState<ManualQuestionForm>({
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: 1,
    explanation: '',
    difficulty: 1
  });

  // 拖动处理函数
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.dialog-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  useEffect(() => {
    if (isOpen) {
      fetchGeneratedQuestions();
      setSelectedQuestions(linkedQuestions);
    }
  }, [isOpen, linkedQuestions]);

  useEffect(() => {
    if (selectedSources.length === 0) {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(q => {
        if (selectedSources.includes('manual') && q.category === '手动编辑') return true;
        if (q.generated_questions_id && selectedSources.includes(q.generated_questions_id)) return true;
        return false;
      });
      setFilteredQuestions(filtered);
    }
    setCurrentQuestionIndex(0);
  }, [selectedSources, questions]);

  const fetchGeneratedQuestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          generated_questions!inner(file_name)
        `)
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      const formattedQuestions = (data || []).map(q => ({
        id: q.id,
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_option: q.correct_option,
        explanation: q.explanation,
        difficulty: q.difficulty || 1,
        source_file: q.generated_questions?.file_name || '未知来源',
        category: q.category || '生成题目',
        generated_questions_id: q.generated_questions_id
      }));

      setQuestions(formattedQuestions);

      // Build question sources
      const sourceMap = new Map<string, QuestionSource>();
      
      // Always include "手动编辑" source
      sourceMap.set('manual', {
        id: 'manual',
        name: '手动编辑',
        count: 0,
        type: 'manual'
      });
      
      formattedQuestions.forEach(q => {
        if (q.category === '手动编辑') {
          const existingManual = sourceMap.get('manual');
          if (existingManual) {
            existingManual.count++;
          }
        } else if (q.generated_questions_id) {
          const existingFileSource = sourceMap.get(q.generated_questions_id);
          if (existingFileSource) {
            existingFileSource.count++;
          } else {
            sourceMap.set(q.generated_questions_id, {
              id: q.generated_questions_id,
              name: q.source_file || '未知文件',
              count: 1,
              type: 'file'
            });
          }
        }
      });

      setQuestionSources(Array.from(sourceMap.values()));
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: '获取题目失败',
        description: '无法加载已生成的题目',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSourceSelection = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const selectAllFromSource = (sourceId: string) => {
    const sourceQuestions = questions.filter(q => {
      if (sourceId === 'manual') return q.category === '手动编辑';
      return q.generated_questions_id === sourceId;
    });

    const newSelected = [...selectedQuestions];
    sourceQuestions.forEach(q => {
      if (!newSelected.some(sq => sq.id === q.id)) {
        if (newSelected.length < 18) {
          newSelected.push({ ...q, selected: true });
        }
      }
    });

    if (newSelected.length > 18) {
      toast({
        title: '选择题目过多',
        description: '最多只能选择18道题目',
        variant: 'destructive',
      });
      return;
    }

    setSelectedQuestions(newSelected);
  };

  const randomSelectAll = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 18).map(q => ({ ...q, selected: true }));
    setSelectedQuestions(selected);
  };

  const toggleQuestionSelection = (question: Question) => {
    const isSelected = selectedQuestions.some(q => q.id === question.id);
    
    if (isSelected) {
      setSelectedQuestions(prev => prev.filter(q => q.id !== question.id));
    } else {
      if (selectedQuestions.length >= 18) {
        toast({
          title: '选择题目过多',
          description: '最多只能选择18道题目',
          variant: 'destructive',
        });
        return;
      }
      setSelectedQuestions(prev => [...prev, { ...question, selected: true }]);
    }
  };

  const handleSubmitManualQuestion = async () => {
    if (!manualQuestion.question.trim() || 
        !manualQuestion.option_a.trim() || 
        !manualQuestion.option_b.trim()) {
      toast({
        title: '题目信息不完整',
        description: '请至少填写题干和两个选项',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('questions')
        .insert({
          question: manualQuestion.question,
          option_a: manualQuestion.option_a,
          option_b: manualQuestion.option_b,
          option_c: manualQuestion.option_c || '',
          option_d: manualQuestion.option_d || '',
          correct_option: manualQuestion.correct_option,
          explanation: manualQuestion.explanation,
          difficulty: manualQuestion.difficulty,
          category: '手动编辑'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setManualQuestion({
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_option: 1,
        explanation: '',
        difficulty: 1
      });

      await fetchGeneratedQuestions();

      toast({
        title: '题目添加成功',
        description: '手动编辑的题目已添加到题库中',
      });

      setActiveTab('generated');
    } catch (error) {
      console.error('Error adding manual question:', error);
      toast({
        title: '添加题目失败',
        description: '无法保存手动编辑的题目',
        variant: 'destructive',
      });
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(selectedQuestions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedQuestions(items);
  };

  const handleLinkSystem = async () => {
    await saveLinkedQuestions(selectedQuestions);
    onClose();
  };

  const updateManualQuestion = (updates: Partial<ManualQuestionForm>) => {
    setManualQuestion(prev => ({ ...prev, ...updates }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={dialogRef}
        className="absolute pointer-events-auto bg-werewolf-card border-werewolf-purple/30 border rounded-lg shadow-xl"
        style={{
          left: `${position.x + 150}px`,
          top: `${position.y + 100}px`,
          width: '1000px',
          height: '700px'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="dialog-header p-4 cursor-move border-b border-werewolf-purple/30">
          <h2 className="text-werewolf-purple text-xl font-semibold leading-none tracking-tight">
            题库管理
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-werewolf-purple"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4 h-[calc(100%-80px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3 bg-werewolf-dark/40">
              <TabsTrigger value="generated" className="data-[state=active]:bg-werewolf-purple data-[state=active]:text-white">
                已生成题目
              </TabsTrigger>
              <TabsTrigger value="manual" className="data-[state=active]:bg-werewolf-purple data-[state=active]:text-white">
                手动编辑题目
              </TabsTrigger>
              <TabsTrigger value="order" className="data-[state=active]:bg-werewolf-purple data-[state=active]:text-white">
                题目顺序编辑
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generated" className="h-[calc(100%-60px)] mt-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                <QuestionSourceList
                  questionSources={questionSources}
                  selectedSources={selectedSources}
                  onToggleSource={toggleSourceSelection}
                  onSelectAllFromSource={selectAllFromSource}
                  onRandomSelectAll={randomSelectAll}
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

            <TabsContent value="manual" className="h-[calc(100%-60px)] mt-4">
              <ManualQuestionEditor
                manualQuestion={manualQuestion}
                onUpdateQuestion={updateManualQuestion}
                onSubmit={handleSubmitManualQuestion}
              />
            </TabsContent>

            <TabsContent value="order" className="h-[calc(100%-60px)] mt-4">
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
