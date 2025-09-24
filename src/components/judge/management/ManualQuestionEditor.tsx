
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ManualQuestionForm } from '../types/questionBank';

interface ManualQuestionEditorProps {
  manualQuestion: ManualQuestionForm;
  onUpdateQuestion: (updates: Partial<ManualQuestionForm>) => void;
  onSubmit: () => void;
}

const ManualQuestionEditor: React.FC<ManualQuestionEditorProps> = ({
  manualQuestion,
  onUpdateQuestion,
  onSubmit
}) => {
  return (
    <Card className="bg-werewolf-dark/40 border-werewolf-purple/30 h-full">
      <CardContent className="p-6 h-full">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            <div>
              <label className="text-white font-medium mb-2 block">题干</label>
              <Textarea
                value={manualQuestion.question}
                onChange={(e) => onUpdateQuestion({ question: e.target.value })}
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
                  onValueChange={(value) => onUpdateQuestion({ difficulty: parseInt(value) })}
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
                      if (checked) onUpdateQuestion({ correct_option: 1 });
                    }}
                  />
                  <label className="text-white font-medium">选项 A</label>
                </div>
                <Input
                  value={manualQuestion.option_a}
                  onChange={(e) => onUpdateQuestion({ option_a: e.target.value })}
                  placeholder="选项 A 内容"
                  className="bg-werewolf-dark border-werewolf-purple/30 text-white"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    checked={manualQuestion.correct_option === 2}
                    onCheckedChange={(checked) => {
                      if (checked) onUpdateQuestion({ correct_option: 2 });
                    }}
                  />
                  <label className="text-white font-medium">选项 B</label>
                </div>
                <Input
                  value={manualQuestion.option_b}
                  onChange={(e) => onUpdateQuestion({ option_b: e.target.value })}
                  placeholder="选项 B 内容"
                  className="bg-werewolf-dark border-werewolf-purple/30 text-white"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    checked={manualQuestion.correct_option === 3}
                    onCheckedChange={(checked) => {
                      if (checked) onUpdateQuestion({ correct_option: 3 });
                    }}
                  />
                  <label className="text-white font-medium">选项 C（可选）</label>
                </div>
                <Input
                  value={manualQuestion.option_c}
                  onChange={(e) => onUpdateQuestion({ option_c: e.target.value })}
                  placeholder="选项 C 内容（可选）"
                  className="bg-werewolf-dark border-werewolf-purple/30 text-white"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    checked={manualQuestion.correct_option === 4}
                    onCheckedChange={(checked) => {
                      if (checked) onUpdateQuestion({ correct_option: 4 });
                    }}
                  />
                  <label className="text-white font-medium">选项 D（可选）</label>
                </div>
                <Input
                  value={manualQuestion.option_d}
                  onChange={(e) => onUpdateQuestion({ option_d: e.target.value })}
                  placeholder="选项 D 内容（可选）"
                  className="bg-werewolf-dark border-werewolf-purple/30 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-white font-medium mb-2 block">题目解析</label>
              <Textarea
                value={manualQuestion.explanation}
                onChange={(e) => onUpdateQuestion({ explanation: e.target.value })}
                placeholder="请输入题目解析（可选）..."
                className="bg-werewolf-dark border-werewolf-purple/30 text-white resize-none"
                rows={3}
              />
            </div>

            <Button
              onClick={onSubmit}
              className="w-full bg-werewolf-purple hover:bg-werewolf-light text-white"
            >
              提交题目
            </Button>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ManualQuestionEditor;
