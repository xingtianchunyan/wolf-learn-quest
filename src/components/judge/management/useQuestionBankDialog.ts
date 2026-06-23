import { useEffect, useRef, useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useJudgePage } from '@/contexts/JudgePageContext';
import type {
  Question,
  QuestionSource,
  ManualQuestionForm,
} from '../types/questionBank';

export interface UseQuestionBankDialogOptions {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

export const useQuestionBankDialog = ({
  isOpen,
  onClose,
}: UseQuestionBankDialogOptions) => {
  const { toast } = useToast();
  const { linkedQuestions, saveLinkedQuestions, isSystemLinked } =
    useJudgePage();

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

  const [manualQuestion, setManualQuestion] = useState<ManualQuestionForm>({
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: 1,
    explanation: '',
    difficulty: 1,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).closest('.dialog-header')
    ) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
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
      const convertedQuestions =
        linkedQuestions?.map(lq => ({
          ...lq.question,
          selected: true,
        })) || [];
      setSelectedQuestions(convertedQuestions);
    }
  }, [isOpen, linkedQuestions]);

  useEffect(() => {
    if (selectedSources.length === 0) {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(q => {
        if (selectedSources.includes('manual') && q.category === '手动编辑')
          return true;
        if (
          q.generated_questions_id &&
          selectedSources.includes(q.generated_questions_id)
        )
          return true;
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
        .select(
          `
          *,
          generated_questions(file_name)
        `
        )
        .order('id', { ascending: true });

      if (error) throw error;

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
        source_file: q.generated_questions?.file_name || '手动编辑',
        category:
          q.category || (q.generated_questions_id ? '生成题目' : '手动编辑'),
        generated_questions_id: q.generated_questions_id,
      }));

      setQuestions(formattedQuestions);

      const sourceMap = new Map<string, QuestionSource>();
      sourceMap.set('manual', {
        id: 'manual',
        name: '手动编辑',
        count: 0,
        type: 'manual',
      });

      formattedQuestions.forEach(q => {
        if (q.category === '手动编辑') {
          const existingManual = sourceMap.get('manual');
          if (existingManual) existingManual.count++;
        } else if (q.generated_questions_id) {
          const existingFileSource = sourceMap.get(q.generated_questions_id);
          if (existingFileSource) {
            existingFileSource.count++;
          } else {
            sourceMap.set(q.generated_questions_id, {
              id: q.generated_questions_id,
              name: q.source_file || '未知文件',
              count: 1,
              type: 'file',
            });
          }
        }
      });

      setQuestionSources(Array.from(sourceMap.values()));
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: '获取题目失败',
        description: `无法加载题目数据: ${error instanceof Error ? error.message : '未知错误'}`,
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
    const availableQuestions =
      filteredQuestions.length > 0 ? filteredQuestions : questions;
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 18).map(q => ({ ...q, selected: true }));
    setSelectedQuestions(selected);
  };

  const clearAllSelections = () => {
    setSelectedQuestions([]);
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
    if (
      !manualQuestion.question.trim() ||
      !manualQuestion.option_a.trim() ||
      !manualQuestion.option_b.trim()
    ) {
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
          category: '手动编辑',
        })
        .select()
        .single();

      if (error) throw error;

      setManualQuestion({
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_option: 1,
        explanation: '',
        difficulty: 1,
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
        description: `无法保存手动编辑的题目: ${error instanceof Error ? error.message : '未知错误'}`,
        variant: 'destructive',
      });
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(selectedQuestions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedQuestions(items);
  };

  const handleLinkSystem = async () => {
    const questionsToSave = selectedQuestions.map(q => ({
      id: q.id,
      question: q.question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_option: q.correct_option,
      explanation: q.explanation,
      difficulty: q.difficulty,
      category: q.category,
      generated_questions_id: q.generated_questions_id,
    }));

    await saveLinkedQuestions(questionsToSave);
    onClose();
  };

  const updateManualQuestion = (updates: Partial<ManualQuestionForm>) => {
    setManualQuestion(prev => ({ ...prev, ...updates }));
  };

  return {
    dialogRef,
    position,
    isDragging,
    handleMouseDown,
    activeTab,
    setActiveTab,
    questions,
    selectedQuestions,
    filteredQuestions,
    questionSources,
    selectedSources,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    loading,
    manualQuestion,
    updateManualQuestion,
    isSystemLinked,
    toggleSourceSelection,
    selectAllFromSource,
    randomSelectAll,
    clearAllSelections,
    toggleQuestionSelection,
    handleSubmitManualQuestion,
    handleDragEnd,
    handleLinkSystem,
  };
};
