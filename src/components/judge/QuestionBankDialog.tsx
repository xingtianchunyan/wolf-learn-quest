import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// 题目类型
interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c?: string;
  option_d?: string;
  correct_option: number;
  explanation?: string;
  difficulty?: number;
  selected?: boolean;
  source_file?: string; // 文件名
  category?: string; // 是否“手动编辑”
}

interface QuestionBankDialogProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
}

type SourceGroup = {
  id: string;
  label: string;
  isManual: boolean;
};

const getPhaseLabel = (index: number) => {
  const round = Math.floor(index / 2) + 1;
  const phase = index % 2 === 0 ? '傍晚' : '黎明';
  return `第${round}轮 ${phase}阶段`;
};

const getDifficultyLabel = (difficulty: number | undefined) => {
  if (!difficulty || difficulty <= 1) return '难度1';
  if (difficulty === 2) return '难度2';
  if (difficulty === 3) return '难度3';
  return `难度${difficulty}`;
};

const QuestionBankDialog: React.FC<QuestionBankDialogProps> = ({
  isOpen,
  onClose,
  roomId
}) => {
  // 筛选、题目与选中等状态
  const [activeTab, setActiveTab] = useState('generated');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  // 手动编辑题目的状态
  const [manualQuestion, setManualQuestion] = useState({
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: 1
  });

  // 分组（文件名/手动编辑）
  const [sourceGroups, setSourceGroups] = useState<SourceGroup[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]); // 当前左侧勾选分组
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { toast } = useToast();

  // fetch all questions, and build group info
  useEffect(() => {
    if (isOpen) {
      fetchGeneratedQuestions();
    }
  }, [isOpen, roomId]);

  const fetchGeneratedQuestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          generated_questions(file_name)
        `)
        .order('id', { ascending: true });

      if (error) throw error;

      const formattedQuestions: Question[] = (data || []).map((q: any) => ({
        id: q.id,
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_option: q.correct_option,
        explanation: q.explanation,
        difficulty: q.difficulty || 1,
        source_file: q?.generated_questions?.file_name || (q.category === '手动编辑' ? '手动编辑' : '未知'),
        category: q.category
      }));

      setQuestions(formattedQuestions);

      // 分组逻辑
      const manual = formattedQuestions.find(q => q.category === '手动编辑');
      // 文件名唯一
      const fileNames = Array.from(new Set(
        formattedQuestions
          .filter(q => q.category !== '手动编辑')
          .map(q => q.source_file || '未知')
      ));
      const groups: SourceGroup[] = [];
      if (manual) groups.push({ id: '手动编辑', label: '手动编辑', isManual: true });
      groups.push(...fileNames.map(x => ({ id: x, label: x, isManual: false })));
      setSourceGroups(groups);

      // 默认选中全部分组
      setSelectedSources(groups.map(g => g.id));
      setCarouselIndex(0);

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

  // 过滤后题目
  const filteredQuestions = questions.filter(q =>
    selectedSources.includes(q.source_file || q.category || '未知')
  );

  // --------- 多选/全选/按照来源分组逻辑 ----------
  const handleSourceCheckbox = (id: string) => {
    setSelectedSources(prev =>
      prev.includes(id)
        ? prev.filter(gid => gid !== id)
        : [...prev, id]
    );
    setCarouselIndex(0);
  };

  // 全选某一分组题目
  const handleQuickSelect = (sourceId: string) => {
    const allOfThisSource = questions.filter(q =>
      (q.source_file === sourceId || (sourceId === '手动编辑' && q.category === '手动编辑'))
    );
    // 新选题并去重
    setSelectedQuestions(prev => {
      // 全部都已选 → 全部取消
      const allIds = allOfThisSource.map(q => q.id);
      const alreadyAllSelected = allIds.every(id => prev.some(q => q.id === id));
      if (alreadyAllSelected) {
        return prev.filter(q => !allIds.includes(q.id));
      }
      // 否则全部加入
      // 判断不超18
      const addNum = 18 - prev.length;
      if (addNum <= 0) return prev;
      const toAdd = allOfThisSource.filter(q => !prev.some(sq => sq.id === q.id)).slice(0, addNum);
      return prev.concat(toAdd.map(q => ({ ...q, selected: true })));
    });
  };

  const handleToggleQuestion = (question: Question) => {
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

  // 轮次/阶段辅助
  const getQuestionIndex = (qid: string) => {
    return selectedQuestions.findIndex(q => q.id === qid);
  };

  // ------------------- 组件拆分 --------------------
  // 分组菜单（checkbox+全选按钮）
  const QuestionSourceMenu: React.FC = () => (
    <div className="flex flex-col h-full justify-between pb-4">
      <div>
        <div className="mb-2 text-werewolf-purple font-bold">已生成题目文件</div>
        <div className="flex flex-col gap-1">
          {sourceGroups.map(src => (
            <div key={src.id} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedSources.includes(src.id)}
                  onCheckedChange={() => handleSourceCheckbox(src.id)}
                  className="border-werewolf-purple text-werewolf-purple"
                />
                <span className={`text-white ${src.isManual ? '' : ''}`}>{src.label}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="border border-werewolf-purple text-werewolf-purple px-2 py-1 text-xs ml-2"
                onClick={() => handleQuickSelect(src.id)}
                tabIndex={-1}
              >
                快速全选
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 题目小卡片组件
  const QuestionCard: React.FC<{
    question: Question;
    index: number;
    isSelected: boolean;
    onSelect: (q: Question) => void;
    phaseLabel?: string | null;
  }> = ({ question, index, isSelected, onSelect, phaseLabel }) => (
    <div
      className={`relative w-[380px] min-w-[360px] max-w-[400px] bg-werewolf-dark/40 border rounded-lg mb-2 border-werewolf-purple/30 px-4 py-3 cursor-pointer transition-colors duration-150 ${
        isSelected ? 'border-werewolf-purple bg-werewolf-purple/20 shadow' : 'hover:bg-werewolf-dark/70'
      }`}
      onClick={() => onSelect(question)}
      tabIndex={0}
    >
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-werewolf-purple font-bold text-base">
          题目 {index + 1}
        </span>
        <span
          className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            !question.difficulty || question.difficulty === 1
              ? 'bg-gray-700 text-white'
              : question.difficulty === 2
                ? 'bg-werewolf-light text-white'
                : 'bg-werewolf-purple/80 text-white'
          }`}
        >
          {getDifficultyLabel(question.difficulty)}
        </span>
        {isSelected && (
          <span className="ml-2 text-green-400 font-bold">✓</span>
        )}
      </div>
      <div className="mb-2">
        <span className="text-white font-medium">题干：</span>
        <span className="text-gray-300 ml-2">{question.question}</span>
      </div>
      <div>
        <span className="text-white font-medium">选项：</span>
        <div className="pl-2 mt-1 text-sm">
          <p className={`${question.correct_option === 1 ? 'text-green-400 font-medium' : 'text-gray-300'}`}>A. {question.option_a}</p>
          <p className={`${question.correct_option === 2 ? 'text-green-400 font-medium' : 'text-gray-300'}`}>B. {question.option_b}</p>
          {question.option_c && (
            <p className={`${question.correct_option === 3 ? 'text-green-400 font-medium' : 'text-gray-300'}`}>C. {question.option_c}</p>
          )}
          {question.option_d && (
            <p className={`${question.correct_option === 4 ? 'text-green-400 font-medium' : 'text-gray-300'}`}>D. {question.option_d}</p>
          )}
        </div>
      </div>
      {question.explanation && (
        <div className="mt-2 text-xs text-gray-400">
          解析：{question.explanation}
        </div>
      )}
      {question.source_file && (
        <div className="mt-1 text-xs text-gray-500">
          来源：{question.source_file}
        </div>
      )}
      {isSelected && typeof phaseLabel === 'string' && (
        <div className="absolute top-2 right-3 px-2 py-0.5 rounded bg-werewolf-purple text-white text-xs font-semibold">
          {phaseLabel}
        </div>
      )}
    </div>
  );

  // 横向scroll+左右切换按钮+题目卡片集合
  const QuestionCardList: React.FC = () => {
    // 控制当前横向滚动的索引和滚动
    const scrollRef = useRef<HTMLDivElement>(null);
    // 最多每页5题
    const cardsPerPage = 5;
    const total = filteredQuestions.length;
    const maxIndex = Math.max(0, total - cardsPerPage);

    useEffect(() => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollLeft = carouselIndex * 400; // 卡片宽/间距约400px
    }, [carouselIndex]);

    const handlePrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCarouselIndex(idx => Math.max(0, idx - 1));
    };
    const handleNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCarouselIndex(idx => Math.min(maxIndex, idx + 1));
    };

    return (
      <div className="relative flex items-center">
        {/* 左按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-werewolf-dark/80"
          disabled={carouselIndex === 0}
          onClick={handlePrev}
        >
          <span className="sr-only">前一题</span>
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-werewolf-purple"><polyline points="13 15 8 10 13 5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
        </Button>

        <div
          ref={scrollRef}
          className="overflow-x-auto flex-1 scrollbar-thin scrollbar-thumb-werewolf-purple scrollbar-track-transparent px-12"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-4 min-w-max py-2">
            {filteredQuestions.map((q, i) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={i}
                isSelected={selectedQuestions.some(sel => sel.id === q.id)}
                onSelect={handleToggleQuestion}
                phaseLabel={
                  getQuestionIndex(q.id) !== -1
                    ? getPhaseLabel(getQuestionIndex(q.id))
                    : null
                }
              />
            ))}
          </div>
        </div>

        {/* 右按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-werewolf-dark/80"
          disabled={carouselIndex === maxIndex}
          onClick={handleNext}
        >
          <span className="sr-only">后一题</span>
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-werewolf-purple"><polyline points="7 5 12 10 7 15" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
        </Button>
      </div>
    );
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className="absolute pointer-events-auto bg-werewolf-card border-werewolf-purple/30 border rounded-lg shadow-xl"
        style={{
          left: `250px`,
          top: `100px`,
          width: '900px',
          height: '600px'
        }}
      >
        <div className="dialog-header p-4 cursor-move border-b border-werewolf-purple/30 relative">
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
              {/* 其余标签页省略 */}
              <TabsTrigger value="manual" className="data-[state=active]:bg-werewolf-purple data-[state=active]:text-white">
                手动编辑题目
              </TabsTrigger>
              <TabsTrigger value="order" className="data-[state=active]:bg-werewolf-purple data-[state=active]:text-white">
                题目顺序编辑
              </TabsTrigger>
            </TabsList>
            {/* --- 已生成题目优化实现 --- */}
            <TabsContent value="generated" className="h-full mt-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">加载中...</p>
                </div>
              ) : (
                <div className="flex h-full gap-5">
                  {/* 左侧菜单 */}
                  <div className="w-[220px] h-full border rounded-lg border-werewolf-purple/30 bg-werewolf-dark/40 p-4 flex-shrink-0">
                    <QuestionSourceMenu />
                  </div>
                  {/* 右侧题目卡片区域 */}
                  <div className="flex-1 flex flex-col h-full min-w-0">
                    <div className="flex-1 overflow-y-auto">
                      <QuestionCardList />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            {/* 其余标签页原实现不变 */}
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
