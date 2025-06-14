import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  category?: string;
  generated_questions_id?: string;
}

interface QuestionSource {
  id: string;
  name: string;
  count: number;
  type: 'file' | 'manual';
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

  // 手动编辑题目的状态
  const [manualQuestion, setManualQuestion] = useState({
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
    }
  }, [isOpen, roomId]);

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
      
      formattedQuestions.forEach(q => {
        if (q.category === '手动编辑') {
          const existing = sourceMap.get('manual');
          if (existing) {
            existing.count++;
          } else {
            sourceMap.set('manual', {
              id: 'manual',
              name: '手动编辑',
              count: 1,
              type: 'manual'
            });
          }
        } else if (q.generated_questions_id) {
          const existing = sourceMap.get(q.generated_questions_id);
          if (existing) {
            existing.count++;
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
                {/* Left: Source Selection */}
                <Card className="bg-werewolf-dark/40 border-werewolf-purple/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-werewolf-purple text-lg">
                        已生成题目文件
                      </CardTitle>
                      <Button
                        size="sm"
                        onClick={randomSelectAll}
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
                                onCheckedChange={() => toggleSourceSelection(source.id)}
                              />
                              <div>
                                <p className="text-white font-medium">{source.name}</p>
                                <p className="text-gray-400 text-sm">{source.count} 道题目</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => selectAllFromSource(source.id)}
                              className="border-werewolf-purple/30 text-werewolf-purple hover:bg-werewolf-purple hover:text-white"
                            >
                              快速全选
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Right: Question Cards */}
                <Card className="bg-werewolf-dark/40 border-werewolf-purple/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-werewolf-purple text-lg">
                      题目预览
                    </CardTitle>
                    <p className="text-gray-400 text-sm">
                      已选择 {selectedQuestions.length}/18 道题目
                    </p>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-100px)] flex flex-col">
                    {loading ? (
                      <div className="flex items-center justify-center flex-1">
                        <p className="text-gray-400">加载中...</p>
                      </div>
                    ) : filteredQuestions.length === 0 ? (
                      <div className="flex items-center justify-center flex-1">
                        <p className="text-gray-400">暂无题目</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 mb-4">
                          <Card 
                            className={`h-full cursor-pointer transition-all duration-200 ${
                              selectedQuestions.some(q => q.id === filteredQuestions[currentQuestionIndex]?.id)
                                ? 'bg-werewolf-purple/20 border-werewolf-purple'
                                : 'bg-werewolf-dark/60 border-werewolf-purple/30 hover:bg-werewolf-dark/80'
                            }`}
                            onClick={() => filteredQuestions[currentQuestionIndex] && toggleQuestionSelection(filteredQuestions[currentQuestionIndex])}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <CardTitle className="text-werewolf-purple text-lg">
                                    题目 {currentQuestionIndex + 1}
                                  </CardTitle>
                                  {filteredQuestions[currentQuestionIndex] && (
                                    <Badge className={`text-white ${getDifficultyColor(filteredQuestions[currentQuestionIndex].difficulty || 1)}`}>
                                      {getDifficultyLabel(filteredQuestions[currentQuestionIndex].difficulty || 1)}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {selectedQuestions.some(q => q.id === filteredQuestions[currentQuestionIndex]?.id) && (
                                    <>
                                      <Badge className="bg-green-500 text-white">
                                        {getPhaseLabel(selectedQuestions.findIndex(q => q.id === filteredQuestions[currentQuestionIndex]?.id))}
                                      </Badge>
                                      <span className="text-green-400">✓</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {filteredQuestions[currentQuestionIndex] && (
                                <>
                                  <div>
                                    <h3 className="text-white font-medium mb-2">题干：</h3>
                                    <p className="text-gray-300 text-sm">{filteredQuestions[currentQuestionIndex].question}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="text-white font-medium">选项：</h4>
                                    <div className="space-y-1 text-sm">
                                      <p className={`text-gray-300 ${filteredQuestions[currentQuestionIndex].correct_option === 1 ? 'text-green-400 font-medium' : ''}`}>
                                        A. {filteredQuestions[currentQuestionIndex].option_a}
                                      </p>
                                      <p className={`text-gray-300 ${filteredQuestions[currentQuestionIndex].correct_option === 2 ? 'text-green-400 font-medium' : ''}`}>
                                        B. {filteredQuestions[currentQuestionIndex].option_b}
                                      </p>
                                      {filteredQuestions[currentQuestionIndex].option_c && (
                                        <p className={`text-gray-300 ${filteredQuestions[currentQuestionIndex].correct_option === 3 ? 'text-green-400 font-medium' : ''}`}>
                                          C. {filteredQuestions[currentQuestionIndex].option_c}
                                        </p>
                                      )}
                                      {filteredQuestions[currentQuestionIndex].option_d && (
                                        <p className={`text-gray-300 ${filteredQuestions[currentQuestionIndex].correct_option === 4 ? 'text-green-400 font-medium' : ''}`}>
                                          D. {filteredQuestions[currentQuestionIndex].option_d}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {filteredQuestions[currentQuestionIndex].explanation && (
                                    <div className="text-xs text-gray-400">
                                      解释：{filteredQuestions[currentQuestionIndex].explanation}
                                    </div>
                                  )}
                                  <div className="text-xs text-gray-500">
                                    来源：{filteredQuestions[currentQuestionIndex].source_file}
                                  </div>
                                </>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                            disabled={currentQuestionIndex === 0}
                            className="border-werewolf-purple/30 text-werewolf-purple hover:bg-werewolf-purple hover:text-white"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          
                          <div className="flex-1 mx-4">
                            <input
                              type="range"
                              min="0"
                              max={Math.max(0, filteredQuestions.length - 1)}
                              value={currentQuestionIndex}
                              onChange={(e) => setCurrentQuestionIndex(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentQuestionIndex(Math.min(filteredQuestions.length - 1, currentQuestionIndex + 1))}
                            disabled={currentQuestionIndex >= filteredQuestions.length - 1}
                            className="border-werewolf-purple/30 text-werewolf-purple hover:bg-werewolf-purple hover:text-white"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="h-[calc(100%-60px)] mt-4">
              <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
                <CardContent className="p-6 h-full">
                  <ScrollArea className="h-full">
                    <div className="space-y-4 pr-4">
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
                          <label className="text-white font-medium mb-2 block">题目难度</label>
                          <Select 
                            value={manualQuestion.difficulty.toString()} 
                            onValueChange={(value) => setManualQuestion(prev => ({ ...prev, difficulty: parseInt(value) }))}
                          >
                            <SelectTrigger className="bg-werewolf-dark border-werewolf-purple/30 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-werewolf-dark border-werewolf-purple/30">
                              <SelectItem value="1" className="text-white hover:bg-werewolf-purple/20">简单</SelectItem>
                              <SelectItem value="2" className="text-white hover:bg-werewolf-purple/20">容易</SelectItem>
                              <SelectItem value="3" className="text-white hover:bg-werewolf-purple/20">中等</SelectItem>
                              <SelectItem value="4" className="text-white hover:bg-werewolf-purple/20">困难</SelectItem>
                              <SelectItem value="5" className="text-white hover:bg-werewolf-purple/20">极难</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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
                        <label className="text-white font-medium mb-2 block">题目解析</label>
                        <Textarea
                          value={manualQuestion.explanation}
                          onChange={(e) => setManualQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                          placeholder="请输入题目解析（可选）..."
                          className="bg-werewolf-dark border-werewolf-purple/30 text-white resize-none"
                          rows={3}
                        />
                      </div>

                      <Button
                        onClick={handleSubmitManualQuestion}
                        className="w-full bg-werewolf-purple hover:bg-werewolf-light text-white"
                      >
                        提交题目
                      </Button>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="order" className="h-[calc(100%-60px)] mt-4">
              <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-werewolf-purple">已选择题目顺序</CardTitle>
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
                    <DragDropContext onDragEnd={handleDragEnd}>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankDialog;
