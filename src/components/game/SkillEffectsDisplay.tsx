
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Zap, Users, Target, AlertCircle } from 'lucide-react';
import { useSkillSystem } from '@/hooks/useSkillSystem';
import { formatVoteTime } from '@/utils/votingSystemHelpers';

interface SkillEffectsDisplayProps {
  roomId: string;
  gameStateId: string;
  players: Array<{ userId: string; name: string; roleStatus: number }>;
}

const SkillEffectsDisplay: React.FC<SkillEffectsDisplayProps> = ({
  roomId,
  gameStateId,
  players
}) => {
  const {
    skillEffectsQueue,
    skillTargets,
    processSkillEffects,
    loading
  } = useSkillSystem(roomId, gameStateId);

  // 获取活跃的技能效果
  const activeEffects = skillTargets.filter(target => target.is_active);
  
  // 获取排队中的技能效果
  const queuedEffects = skillEffectsQueue.filter(effect => 
    effect.status === 'queued' || effect.status === 'processing'
  );

  // 按目标用户分组效果
  const effectsByUser = activeEffects.reduce((acc, effect) => {
    const userId = effect.target_user_id;
    if (!userId) return acc;
    
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(effect);
    return acc;
  }, {} as Record<string, typeof activeEffects>);

  const getPlayerName = (userId: string) => {
    return players.find(p => p.userId === userId)?.name || '未知玩家';
  };

  const getEffectColor = (effectType: string) => {
    switch (effectType) {
      case 'protection': return 'bg-green-500';
      case 'elimination': return 'bg-red-500';
      case 'investigation': return 'bg-blue-500';
      case 'status_change': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'queued': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getRemainingTime = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const remaining = Math.max(0, end - now);
    
    if (remaining === 0) return '已过期';
    
    const minutes = Math.floor(remaining / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (startTime: string, endTime?: string) => {
    if (!endTime) return 100;
    
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    
    const total = end - start;
    const elapsed = now - start;
    
    return Math.max(0, Math.min(100, (elapsed / total) * 100));
  };

  return (
    <div className="space-y-4">
      {/* 技能效果队列 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            技能效果队列
            {queuedEffects.length > 0 && (
              <Badge variant="secondary">{queuedEffects.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {queuedEffects.length > 0 ? (
            <div className="space-y-2">
              {queuedEffects
                .sort((a, b) => a.priority - b.priority)
                .map((effect) => (
                <div 
                  key={effect.id} 
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">{effect.effect_type}</span>
                    </div>
                    <Badge variant="outline">优先级 {effect.priority}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {effect.trigger_time && (
                      <span className="text-sm text-muted-foreground">
                        {formatVoteTime(effect.trigger_time)}
                      </span>
                    )}
                    <Badge className={getStatusColor(effect.status)}>
                      {effect.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">当前没有排队的技能效果</p>
          )}
        </CardContent>
      </Card>

      {/* 活跃技能效果 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            活跃技能效果
            {activeEffects.length > 0 && (
              <Badge variant="secondary">{activeEffects.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(effectsByUser).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(effectsByUser).map(([userId, effects]) => (
                <div key={userId} className="border rounded p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4" />
                    <span className="font-medium">{getPlayerName(userId)}</span>
                  </div>
                  <div className="space-y-2">
                    {effects.map((effect) => (
                      <div 
                        key={effect.id} 
                        className="flex items-center justify-between p-2 bg-muted rounded"
                      >
                        <div className="flex items-center gap-2">
                          <Badge className={getEffectColor(effect.target_type)}>
                            {effect.target_type}
                          </Badge>
                          {effect.stack_count > 1 && (
                            <Badge variant="outline">x{effect.stack_count}</Badge>
                          )}
                        </div>
                        <div className="text-right space-y-1">
                          {effect.effect_end_time && (
                            <div className="text-xs text-muted-foreground">
                              剩余: {getRemainingTime(effect.effect_end_time)}
                            </div>
                          )}
                          {effect.effect_end_time && effect.effect_duration && (
                            <Progress 
                              value={getProgressPercentage(
                                effect.effect_start_time, 
                                effect.effect_end_time
                              )}
                              className="w-20 h-2"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">当前没有活跃的技能效果</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillEffectsDisplay;
