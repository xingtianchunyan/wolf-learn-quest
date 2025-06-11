import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnswerRecordPanelProps {
  roomId: string;
  className?: string;
}

interface AnswerRecord {
  id: string;
  player_name: string;
  question_text: string;
  selected_option: number;
  is_correct: boolean;
  response_time: number;
  created_at: string;
}

const AnswerRecordPanel: React.FC<AnswerRecordPanelProps> = ({ roomId, className }) => {
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (roomId) {
      fetchAnswers();
      // TODO: Set up real-time subscription for answer updates
    }
  }, [roomId]);

  const fetchAnswers = async () => {
    try {
      // TODO: Implement proper query with joins once player_answers table structure is confirmed
      // This is a placeholder query structure
      const { data, error } = await supabase
        .from('player_answers')
        .select(`
          id,
          selected_option,
          is_correct,
          response_time,
          created_at,
          question_id,
          player_id
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching answers:', error);
        return;
      }

      // TODO: Transform data once we have proper relations
      setAnswers([]);
    } catch (error) {
      console.error('Error fetching answers:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatResponseTime = (seconds: number) => {
    return `${seconds}秒`;
  };

  return (
    <Card className={`bg-werewolf-card border-werewolf-purple/30 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple flex items-center text-lg">
          <Users className="mr-2 h-5 w-5" />
          答题记录
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-80px)]">
        {/* Current Question Status */}
        <div className="mb-4 p-3 bg-werewolf-dark/40 rounded-md border border-werewolf-purple/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium text-sm">当前题目状态</span>
            <Badge variant="outline" className="border-werewolf-purple/50">
              <Clock className="h-3 w-3 mr-1" />
              等待读取对应数据
            </Badge>
          </div>
          <p className="text-gray-400 text-sm">
            {currentQuestion || '暂无进行中的题目'}
          </p>
        </div>

        {/* Answer Records */}
        <ScrollArea className="h-[calc(100%-120px)]">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto mb-2"></div>
              <p className="text-gray-400 text-sm">等待读取对应数据</p>
            </div>
          ) : answers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">暂无答题记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {answers.map((answer) => (
                <div
                  key={answer.id}
                  className="p-3 bg-werewolf-dark/20 rounded-md border border-werewolf-purple/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">
                          {answer.player_name}
                        </span>
                        {answer.is_correct ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                      <p className="text-gray-300 text-xs">
                        选择: 选项 {String.fromCharCode(65 + answer.selected_option - 1)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">
                        {formatResponseTime(answer.response_time)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(answer.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs truncate">
                    {answer.question_text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AnswerRecordPanel;
