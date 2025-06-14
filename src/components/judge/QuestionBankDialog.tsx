import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation?: string;
  selected?: boolean;
  source_file?: string;
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
    correct_option: 1
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

  const fetchGeneratedQuestions = async () => {
    setLoading(true);
    try {
      // 修复：从questions表获取所有题目，不再过滤room_id
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

      // 转换数据格式以匹配组件期望的格式
      const formattedQuestions = (data || []).map(q => ({
        id: q.id,
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_option: q.correct_option,
        explanation: q.explanation,
        source_file: q.generated_questions?.file_name || '未知来源'
      }));

      setQuestions(formattedQuestions);
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
      // 修复：不传入room_id到questions表
      const { data, error } = await supabase
        .from('questions')
        .insert({
          question: manualQuestion.question,
          option_a: manualQuestion.option_a,
          option_b: manualQuestion.option_b,
          option_c: manualQuestion.option_c || '',
          option_d: manualQuestion.option_d || '',
          correct_option: manualQuestion.correct_option,
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
        correct_option: 1
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

  const getPhaseLabel = (index: number) => {
    const round = Math.floor(index / 2) + 1;
    const phase = index % 2 === 0 ? '傍晚' : '黎明';
    return `第${round}轮 ${phase}阶段`;
  };

  const getCorrectAnswerLetter = (correctOption: number) => {
    return ['A', 'B', 'C', 'D'][correctOption - 1] || 'A';
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
          width: '900px',
          height: '600px'
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
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">加载中...</p>
                </div>
              ) : questions.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">暂无生成的题目</p>
                </div>
              ) : (
                <Carousel className="w-full h-full">
                  <CarouselContent className="h-full">
                    {questions.map((question, index) => (
                      <CarouselItem key={question.id} className="h-full">
                        <Card 
                          className={`h-full cursor-pointer transition-all duration-200 ${
                            selectedQuestions.some(q => q.id === question.id)
                              ? 'bg-werewolf-purple/20 border-werewolf-purple'
                              : 'bg-werewolf-dark/40 border-werewolf-purple/30 hover:bg-werewolf-dark/60'
                          }`}
                          onClick={() => toggleQuestionSelection(question)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-werewolf-purple text-lg">
                                题目 {index + 1}
                              </CardTitle>
                              {selectedQuestions.some(q => q.id === question.id) && (
                                <span className="text-green-400">✓</span>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h3 className="text-white font-medium mb-2">题干：</h3>
                              <p className="text-gray-300 text-sm">{question.question}</p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-white font-medium">选项：</h4>
                              <div className="space-y-1 text-sm">
                                <p className={`text-gray-300 ${question.correct_option === 1 ? 'text-green-400 font-medium' : ''}`}>
                                  A. {question.option_a}
                                </p>
                                <p className={`text-gray-300 ${question.correct_option === 2 ? 'text-green-400 font-medium' : ''}`}>
                                  B. {question.option_b}
                                </p>
                                {question.option_c && (
                                  <p className={`text-gray-300 ${question.correct_option === 3 ? 'text-green-400 font-medium' : ''}`}>
                                    C. {question.option_c}
                                  </p>
                                )}
                                {question.option_d && (
                                  <p className={`text-gray-300 ${question.correct_option === 4 ? 'text-green-400 font-medium' : ''}`}>
                                    D. {question.option_d}
                                  </p>
                                )}
                              </div>
                            </div>
                            {question.explanation && (
                              <div className="text-xs text-gray-400">
                                解释：{question.explanation}
                              </div>
                            )}
                            {question.source_file && (
                              <div className="text-xs text-gray-500">
                                来源：{question.source_file}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              )}
            </TabsContent>

            <TabsContent value="manual" className="h-[calc(100%-60px)] mt-4">
              <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
                <CardContent className="p-6 h-full flex flex-col space-y-4">
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

                  <div className="grid grid-cols-2 gap-4 flex-1">
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

                  <Button
                    onClick={handleSubmitManualQuestion}
                    className="w-full bg-werewolf-purple hover:bg-werewolf-light text-white"
                  >
                    提交题目
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="order" className="h-[calc(100%-60px)] mt-4">
              <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-werewolf-purple">已选择题目顺序</CardTitle>
                  <p className="text-gray-400 text-sm">
                    已选择 {selectedQuestions.length}/18 道题目
                  </p>
                </CardHeader>
                <CardContent className="h-[calc(100%-100px)]">
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
