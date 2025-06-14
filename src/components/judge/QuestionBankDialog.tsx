
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 题目难度映射
const difficultyLabel: Record<number, string> = {
  1: '简单',
  2: '中等',
  3: '困难',
};

const difficultyColor: Record<number, string> = {
  1: 'bg-green-600',
  2: 'bg-yellow-600',
  3: 'bg-red-600',
};

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation?: string;
  difficulty?: number;
  selected?: boolean;
  source_file?: string;
  generated_questions_id?: string;
  category?: string;
}

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
  const [activeTab, setActiveTab] = useState('generated');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [sourceList, setSourceList] = useState<{ id: string, name: string }[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  // 手动编辑状态
  const [manualQuestion, setManualQuestion] = useState({
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: 1,
    explanation: '',
    difficulty: 1,
  });

  // 获取所有题目和来源
  useEffect(() => {
    if (!isOpen) return;
    setActiveTab('generated');
    fetchQuestionsAndSources();
  }, [isOpen]);

  const fetchQuestionsAndSources = async () => {
    setLoading(true);
    try {
      // 1. 获取所有题目及来源
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          generated_questions!left(id, file_name)
        `)
        .order('id', { ascending: true });

      if (error) throw error;
      const formatted = (data || []).map(q => ({
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
        generated_questions_id: q.generated_questions?.id,
        source_file: q.generated_questions?.file_name ?? (q.category === '手动编辑' ? '手动编辑' : '未知'),
      }));

      setQuestions(formatted);

      // 2. 获取唯一来源列表
      const sourceSet = new Map();
      for (const q of formatted) {
        if (q.source_file && !sourceSet.has(q.source_file)) {
          sourceSet.set(q.source_file, {
            id: q.generated_questions_id || (q.category === '手动编辑' ? 'manual' : 'none'),
            name: q.source_file,
          });
        }
      }
      // 手动编辑入口
      if (!sourceSet.has('手动编辑')) {
        sourceSet.set('手动编辑', { id: 'manual', name: '手动编辑' });
      }
      setSourceList([{ id: 'all', name: '全部' }, ...Array.from(sourceSet.values())]);
      setSelectedSource('all');
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

  /** 多选与全选逻辑 */
  const getFilteredQuestions = () => selectedSource === 'all'
      ? questions
      : questions.filter(q =>
          (selectedSource === 'manual' && q.category === '手动编辑') ||
          q.generated_questions_id === selectedSource
        );

  const handleSelectQuestion = (question: Question) => {
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

  const handleSelectAll = () => {
    const filteredQ = getFilteredQuestions();
    const notSelected = filteredQ.filter(q => !selectedQuestions.some(sel => sel.id === q.id));
    if (!notSelected.length) {
      // 全部已选，再点则取消所有本来源选择
      setSelectedQuestions(prev => prev.filter(
        q => !filteredQ.some(fq => fq.id === q.id)
      ));
      return;
    }
    // 全选
    const max = 18 - selectedQuestions.length;
    setSelectedQuestions(prev =>
      prev.concat(notSelected.slice(0, max).map(q => ({ ...q, selected: true })))
    );
  };

  // 水平滚动
  const scrollBy = (delta: number) => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollLeft += delta;
    }
  };

  // 难度颜色标签样式
  const renderDifficultyTag = (difficulty?: number) => (
    <span
      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${difficultyColor[difficulty || 1]} text-white`}
    >
      {difficultyLabel[difficulty || 1]}
    </span>
  );

  const getPhaseLabel = (index: number) => {
    const round = Math.floor(index / 2) + 1;
    const phase = index % 2 === 0 ? '傍晚' : '黎明';
    return `第${round}轮 ${phase}阶段`;
  };

  /** ==== 手动编辑功能增强 ==== */
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
      const { data, error } = await supabase.from('questions').insert({
        question: manualQuestion.question,
        option_a: manualQuestion.option_a,
        option_b: manualQuestion.option_b,
        option_c: manualQuestion.option_c || '',
        option_d: manualQuestion.option_d || '',
        correct_option: manualQuestion.correct_option,
        explanation: manualQuestion.explanation,
        difficulty: manualQuestion.difficulty,
        category: '手动编辑'
      }).select().single();

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
      await fetchQuestionsAndSources();
      toast({
        title: '题目添加成功',
        description: '手动编辑的题目已添加到题库中',
      });
      setActiveTab('generated');
    } catch (error) {
      toast({
        title: '添加题目失败',
        description: '无法保存手动编辑的题目',
        variant: 'destructive',
      });
    }
  };

  // 在选中题目下方显示其对应游戏阶段
  const getSelectedQuestionPhase = (questionId: string) => {
    const idx = selectedQuestions.findIndex(q => q.id === questionId);
    if (idx === -1) return null;
    return getPhaseLabel(idx);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className="absolute pointer-events-auto bg-werewolf-card border-werewolf-purple/30 border rounded-lg shadow-xl"
        style={{
          left: '200px',
          top: '100px',
          width: '980px',
          height: '640px'
        }}
      >
        <div className="dialog-header p-4 cursor-move border-b border-werewolf-purple/30 flex justify-between items-center relative">
          <h2 className="text-werewolf-purple text-xl font-semibold leading-none tracking-tight">
            题库管理
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-werewolf-purple"
            tabIndex={0}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4 h-[calc(100%-80px)] flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-werewolf-dark/40 mb-2">
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
            {/* --- 优化后的 “已生成题目” 页 --- */}
            <TabsContent value="generated" className="h-full flex-1 mt-2 flex overflow-hidden">
              {/* 左：来源文件与全选 */}
              <div className="w-1/3 min-w-[210px] pr-3 flex flex-col border-r border-werewolf-purple/20">
                <div className="mb-2">
                  <label className="block text-werewolf-purple font-bold mb-2">题库来源</label>
                  <ScrollArea className="max-h-56 bg-werewolf-dark/20 rounded-md">
                    {
                      sourceList.map(option => {
                        // 当前来源已全选？
                        const filtered = questions.filter(
                          q =>
                            (option.id === 'all') ||
                            (option.id === 'manual' && q.category === '手动编辑') ||
                            (q.generated_questions_id === option.id)
                        );
                        const allSelected = filtered.length > 0 &&
                          filtered.every(q => selectedQuestions.some(sq => sq.id === q.id));
                        const isManual = option.id === 'manual';

                        return (
                          <div key={option.id} className={`flex items-center justify-between py-1 px-2 rounded hover:bg-werewolf-purple/15 ${selectedSource === option.id ? 'bg-werewolf-purple/20' : ''}`}>
                            <Button
                              size="sm"
                              variant={selectedSource === option.id ? 'secondary' : 'ghost'}
                              onClick={() => setSelectedSource(option.id)}
                              className="w-24 truncate"
                            >
                              {option.name}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleSelectAll}
                              className={`ml-2 px-1 text-xs ${allSelected ? 'bg-green-700/80 text-white' : ''}`}
                              title={allSelected ? '取消全选' : '全选所有此来源题目'}
                            >
                              {allSelected ? '取消全选' : '全选'}
                            </Button>
                          </div>
                        );
                      })
                    }
                  </ScrollArea>
                </div>
                <div className="mt-2">
                  <span className="block text-werewolf-purple font-bold mb-1">已选题目数</span>
                  <span className="bg-werewolf-purple/30 rounded px-2 py-1 text-white text-xs">{selectedQuestions.length} / 18</span>
                </div>
              </div>
              {/* 右：题目卡片展示与多选 */}
              <div className="w-2/3 relative flex flex-col h-full pl-4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">加载中...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mb-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollBy(-280)}
                        className="mr-2"
                        title="左移"
                      >
                        <ArrowLeft />
                      </Button>
                      <div className="w-full overflow-x-auto" ref={horizontalScrollRef} style={{ scrollbarWidth: 'thin' }}>
                        <div className="flex gap-3 pb-2 min-h-[334px]">
                          {getFilteredQuestions().length === 0 ? (
                            <div className="flex items-center justify-center w-full h-full">
                              <p className="text-gray-400">暂无可选题目</p>
                            </div>
                          ) : getFilteredQuestions().map((question, idx) => {
                            const isSelected = selectedQuestions.some(q => q.id === question.id);
                            return (
                              <Card
                                key={question.id}
                                className={`min-w-[240px] max-w-[260px] flex-shrink-0 cursor-pointer border-2 transition-all duration-150 ${isSelected ? 'border-werewolf-purple bg-werewolf-purple/15' : 'bg-werewolf-dark/40 border-werewolf-purple/20 hover:bg-werewolf-dark/60'}`}
                                onClick={() => handleSelectQuestion(question)}
                              >
                                <CardHeader className="pb-2 flex flex-row items-center">
                                  <CardTitle className="flex items-center text-base text-werewolf-purple">
                                    题目 {idx + 1}
                                    {renderDifficultyTag(question.difficulty)}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-xs">
                                  <div>
                                    <span className="font-medium text-white">题干：</span>
                                    <span className="text-gray-300">{question.question}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-white">选项：</span>
                                    <div className="text-gray-300">
                                      <span className={question.correct_option === 1 ? 'text-green-400 font-medium' : ''}>A. {question.option_a} </span>
                                      <span className={question.correct_option === 2 ? 'text-green-400 font-medium' : ''}>B. {question.option_b} </span>
                                      {question.option_c && <span className={question.correct_option === 3 ? 'text-green-400 font-medium' : ''}>C. {question.option_c} </span>}
                                      {question.option_d && <span className={question.correct_option === 4 ? 'text-green-400 font-medium' : ''}>D. {question.option_d}</span>}
                                    </div>
                                  </div>
                                  {question.explanation && (
                                    <div className="text-gray-400 text-xs">解析：{question.explanation}</div>
                                  )}
                                  <div className="text-xs text-gray-400 mt-1">来源：{question.source_file || '未知'}</div>
                                  {isSelected && (
                                    <div className="text-xs mt-1 px-2 py-1 rounded bg-werewolf-purple text-white inline-block">
                                      {getSelectedQuestionPhase(question.id)}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scrollBy(280)}
                        className="ml-2"
                        title="右移"
                      >
                        <ArrowRight />
                      </Button>
                    </div>
                    {/* 横向滚动条（加强视觉） */}
                    <div className="w-full h-3 flex">
                      <div className="w-full bg-gradient-to-r from-transparent via-werewolf-purple/10 to-transparent h-2 rounded" />
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
            {/* --- 手动编辑题目页，功能补充 --- */}
            <TabsContent value="manual" className="h-full flex-1 mt-2">
              <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
                <ScrollArea className="h-full">
                  <CardContent className="p-6 flex flex-col space-y-4 min-h-[460px]">
                    <div>
                      <label className="text-white font-medium mb-2 block">题干</label>
                      <Textarea
                        value={manualQuestion.question}
                        onChange={(e) => setManualQuestion(prev => ({ ...prev, question: e.target.value }))}
                        placeholder="请输入题目内容..."
                        className="bg-werewolf-dark border-werewolf-purple/30 text-white resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            checked={manualQuestion.correct_option === 1}
                            onCheckedChange={(checked) => {
                              if (checked) setManualQuestion(prev => ({ ...prev, correct_option: 1 }));
                            }}
                          />
                          <label className="text-white font-medium">选项 A</label>
                        </div>
                        <Input
                          value={manualQuestion.option_a}
                          onChange={(e) => setManualQuestion(prev => ({ ...prev, option_a: e.target.value }))}
                          placeholder="选项 A 内容"
                          className="bg-werewolf-dark border-werewolf-purple/30 text-white"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            checked={manualQuestion.correct_option === 2}
                            onCheckedChange={(checked) => {
                              if (checked) setManualQuestion(prev => ({ ...prev, correct_option: 2 }));
                            }}
                          />
                          <label className="text-white font-medium">选项 B</label>
                        </div>
                        <Input
                          value={manualQuestion.option_b}
                          onChange={(e) => setManualQuestion(prev => ({ ...prev, option_b: e.target.value }))}
                          placeholder="选项 B 内容"
                          className="bg-werewolf-dark border-werewolf-purple/30 text-white"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            checked={manualQuestion.correct_option === 3}
                            onCheckedChange={(checked) => {
                              if (checked) setManualQuestion(prev => ({ ...prev, correct_option: 3 }));
                            }}
                          />
                          <label className="text-white font-medium">选项 C（可选）</label>
                        </div>
                        <Input
                          value={manualQuestion.option_c}
                          onChange={(e) => setManualQuestion(prev => ({ ...prev, option_c: e.target.value }))}
                          placeholder="选项 C 内容（可选）"
                          className="bg-werewolf-dark border-werewolf-purple/30 text-white"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            checked={manualQuestion.correct_option === 4}
                            onCheckedChange={(checked) => {
                              if (checked) setManualQuestion(prev => ({ ...prev, correct_option: 4 }));
                            }}
                          />
                          <label className="text-white font-medium">选项 D（可选）</label>
                        </div>
                        <Input
                          value={manualQuestion.option_d}
                          onChange={(e) => setManualQuestion(prev => ({ ...prev, option_d: e.target.value }))}
                          placeholder="选项 D 内容（可选）"
                          className="bg-werewolf-dark border-werewolf-purple/30 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-white font-medium mb-1 block">题目解析</label>
                      <Textarea
                        value={manualQuestion.explanation}
                        onChange={(e) => setManualQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                        placeholder="题目解析、解题思路等内容..."
                        className="bg-werewolf-dark border-werewolf-purple/30 text-white resize-none"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="text-white font-medium mb-1 block">题目难度</label>
                      <Select
                        value={String(manualQuestion.difficulty)}
                        onValueChange={val =>
                          setManualQuestion(prev => ({ ...prev, difficulty: Number(val) }))
                        }
                      >
                        <SelectTrigger className="bg-werewolf-dark border-werewolf-purple/30 text-white w-36">
                          <SelectValue>
                            {difficultyLabel[manualQuestion.difficulty]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">简单</SelectItem>
                          <SelectItem value="2">中等</SelectItem>
                          <SelectItem value="3">困难</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleSubmitManualQuestion}
                      className="w-full bg-werewolf-purple hover:bg-werewolf-light text-white"
                    >
                      提交题目
                    </Button>
                  </CardContent>
                </ScrollArea>
              </Card>
            </TabsContent>
            {/* 顺序页保持原逻辑，只加滚动条 */}
            <TabsContent value="order" className="h-full flex-1 mt-2">
              <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-werewolf-purple">已选择题目顺序</CardTitle>
                  <p className="text-gray-400 text-sm">
                    已选择 {selectedQuestions.length}/18 道题目
                  </p>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)]">
                  <ScrollArea className="h-full">
                    {selectedQuestions.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">请先在"已生成题目"页面选择题目</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedQuestions.map((question, index) => (
                          <div
                            key={question.id}
                            className="bg-werewolf-dark/20 border border-werewolf-purple/30 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="bg-werewolf-purple text-white px-2 py-1 rounded text-xs font-medium">
                                    {getPhaseLabel(index)}
                                  </span>
                                  <span className="text-gray-400 text-xs">
                                    题目 {index + 1}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm">
                                  {question.question}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankDialog;
