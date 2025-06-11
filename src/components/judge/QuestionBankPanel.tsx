
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileQuestion, 
  Plus, 
  Edit, 
  Settings,
  BookOpen,
  Target,
  Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface QuestionBankPanelProps {
  className?: string;
}

interface QuestionStats {
  totalQuestions: number;
  selectedQuestions: number;
  generatedQuestions: number;
  manualQuestions: number;
}

const QuestionBankPanel: React.FC<QuestionBankPanelProps> = ({ className }) => {
  const [stats, setStats] = useState<QuestionStats>({
    totalQuestions: 0,
    selectedQuestions: 0,
    generatedQuestions: 0,
    manualQuestions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestionStats();
  }, []);

  const fetchQuestionStats = async () => {
    try {
      // TODO: Implement proper question statistics query
      // This is a placeholder - replace with actual room-specific queries
      const { data, error } = await supabase
        .from('generated_questions')
        .select('id, source_file')
        .limit(1);

      if (error) {
        console.error('Error fetching question stats:', error);
      }

      // TODO: Calculate real statistics
      setStats({
        totalQuestions: 0,
        selectedQuestions: 0,
        generatedQuestions: 0,
        manualQuestions: 0
      });
    } catch (error) {
      console.error('Error fetching question stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <FileQuestion className="mr-2 h-5 w-5" />
          题库概况
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {/* Statistics Overview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
            <div className="flex items-center justify-between">
              <BookOpen className="h-4 w-4 text-werewolf-purple" />
              <span className="text-lg font-bold text-white">
                {loading ? '...' : stats.totalQuestions}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">总题目数</p>
          </div>

          <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
            <div className="flex items-center justify-between">
              <Target className="h-4 w-4 text-green-400" />
              <span className="text-lg font-bold text-white">
                {loading ? '...' : stats.selectedQuestions}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">已选题目</p>
          </div>

          <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
            <div className="flex items-center justify-between">
              <Settings className="h-4 w-4 text-blue-400" />
              <span className="text-lg font-bold text-white">
                {loading ? '...' : stats.generatedQuestions}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">AI生成</p>
          </div>

          <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
            <div className="flex items-center justify-between">
              <Edit className="h-4 w-4 text-orange-400" />
              <span className="text-lg font-bold text-white">
                {loading ? '...' : stats.manualQuestions}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">手动编辑</p>
          </div>
        </div>

        {/* Quick Status */}
        <div className="p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium text-sm">题库状态</span>
            <Badge 
              variant="outline" 
              className={`${
                loading ? 'border-gray-500 text-gray-200' :
                stats.selectedQuestions >= 18 ? 'border-green-500 text-green-200' :
                stats.selectedQuestions > 0 ? 'border-yellow-500 text-yellow-200' :
                'border-red-500 text-red-200'
              }`}
            >
              {loading ? '等待读取对应数据' :
               stats.selectedQuestions >= 18 ? '准备就绪' :
               stats.selectedQuestions > 0 ? '部分完成' : '未完成'}
            </Badge>
          </div>
          <p className="text-gray-400 text-xs">
            {loading ? '正在加载题库信息...' :
             `已选择 ${stats.selectedQuestions}/18 道题目，游戏需要18道题目`}
          </p>
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <h3 className="text-white font-medium text-sm">最近活动</h3>
          <ScrollArea className="h-32">
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
                <p className="text-gray-400 text-xs">等待读取对应数据</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400 text-xs">暂无最近活动</p>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-white font-medium text-sm">快速操作</h3>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 justify-start opacity-50"
            >
              <Plus className="h-3 w-3 mr-2" />
              新建题目
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20 justify-start opacity-50"
            >
              <Clock className="h-3 w-3 mr-2" />
              自动生成
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionBankPanel;
