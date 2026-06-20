import React, { useState, useEffect, useMemo } from 'react';
import {
  Lightbulb,
  Clock,
  Users,
  Target,
  Shield,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface GameState {
  phase: 'day' | 'evening' | 'night' | 'dawn';
  round: number;
  timeRemaining: number;
  players: Array<{
    id: string;
    name: string;
    role: string;
    status: 'alive' | 'dying' | 'dead';
    isReady: boolean;
  }>;
  userRole: string;
  availableSkills: Array<{
    name: string;
    usesRemaining: number;
    isUnlimited: boolean;
    cooldown?: number;
  }>;
  recentEvents: Array<{
    type: string;
    description: string;
    timestamp: number;
  }>;
}

interface SmartHint {
  id: string;
  type: 'strategy' | 'timing' | 'warning' | 'opportunity' | 'tutorial';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: string;
  actionLabel?: string;
  dismissible: boolean;
  autoExpire?: number;
  conditions?: string[];
}

interface SmartHintSystemProps {
  gameState: GameState;
  onHintAction?: (hintId: string, action: string) => void;
  onDismissHint?: (hintId: string) => void;
  userExperience: 'beginner' | 'intermediate' | 'expert';
  showTutorialHints: boolean;
}

const SmartHintSystem: React.FC<SmartHintSystemProps> = ({
  gameState,
  onHintAction,
  onDismissHint,
  userExperience,
  showTutorialHints,
}) => {
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set());
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set());

  // 智能提示生成逻辑
  const smartHints = useMemo(() => {
    const hints: SmartHint[] = [];

    // 技能使用提示
    if (gameState.phase === 'night' && gameState.userRole === 'werewolf') {
      const nightAttackSkill = gameState.availableSkills.find(
        s => s.name === 'night_attack'
      );
      if (nightAttackSkill && nightAttackSkill.usesRemaining > 0) {
        hints.push({
          id: 'werewolf_night_action',
          type: 'opportunity',
          priority: 'high',
          title: '狼人夜间行动',
          description:
            '现在是夜晚阶段，你可以选择一个目标进行攻击。建议优先选择威胁性较大的角色。',
          action: 'use_night_attack',
          actionLabel: '使用夜杀',
          dismissible: true,
        });
      }
    }

    // 守卫保护提示
    if (gameState.phase === 'night' && gameState.userRole === 'vigil') {
      const vigilSkill = gameState.availableSkills.find(
        s => s.name === 'vigil'
      );
      if (vigilSkill && vigilSkill.usesRemaining > 0) {
        hints.push({
          id: 'vigil_protection',
          type: 'strategy',
          priority: 'high',
          title: '守卫保护建议',
          description:
            '选择保护对象时，优先考虑重要的神职角色，避免连续保护同一人。',
          dismissible: true,
        });
      }
    }

    // 女巫药剂提示
    if (gameState.phase === 'night' && gameState.userRole === 'witch') {
      const potionSkill = gameState.availableSkills.find(
        s => s.name === 'magic_potion'
      );
      if (potionSkill && potionSkill.usesRemaining > 0) {
        hints.push({
          id: 'witch_potion_usage',
          type: 'strategy',
          priority: 'medium',
          title: '女巫药剂使用策略',
          description:
            '解药应谨慎使用，毒药可以在关键时刻淘汰怀疑对象。记住每种药剂只能使用一次。',
          dismissible: true,
        });
      }
    }

    // 时间紧迫提示
    if (gameState.timeRemaining < 60 && gameState.timeRemaining > 0) {
      hints.push({
        id: 'time_warning',
        type: 'warning',
        priority: 'high',
        title: '时间紧迫',
        description: `距离${gameState.phase}阶段结束还有${gameState.timeRemaining}秒，请尽快完成操作。`,
        dismissible: false,
        autoExpire: gameState.timeRemaining * 1000,
      });
    }

    // 投票提示
    if (gameState.phase === 'day') {
      const unreadyPlayers = gameState.players.filter(p => !p.isReady).length;
      if (unreadyPlayers > 0) {
        hints.push({
          id: 'voting_reminder',
          type: 'timing',
          priority: 'medium',
          title: '投票提醒',
          description: `还有${unreadyPlayers}名玩家未投票，请等待所有玩家完成投票。`,
          dismissible: true,
        });
      }
    }

    // 新手教程提示
    if (showTutorialHints && userExperience === 'beginner') {
      if (gameState.round === 1 && gameState.phase === 'day') {
        hints.push({
          id: 'beginner_day_phase',
          type: 'tutorial',
          priority: 'medium',
          title: '白天阶段说明',
          description:
            '白天阶段是讨论和投票的时间。观察其他玩家的发言，寻找可疑的行为。',
          dismissible: true,
        });
      }

      if (gameState.phase === 'night' && gameState.round === 1) {
        hints.push({
          id: 'beginner_night_phase',
          type: 'tutorial',
          priority: 'medium',
          title: '夜晚阶段说明',
          description:
            '夜晚阶段各角色发动技能。根据你的角色执行相应的夜间行动。',
          dismissible: true,
        });
      }
    }

    // 策略建议
    if (gameState.round >= 3) {
      const deadPlayers = gameState.players.filter(
        p => p.status === 'dead'
      ).length;
      const aliveWerewolves = gameState.players.filter(
        p => p.status === 'alive' && ['werewolf', 'whitewolf'].includes(p.role)
      ).length;

      if (deadPlayers >= 2 && aliveWerewolves >= 2) {
        hints.push({
          id: 'game_balance_warning',
          type: 'warning',
          priority: 'high',
          title: '游戏平衡警告',
          description: '狼人数量仍然较多，好人阵营需要加快找出狼人的步伐。',
          dismissible: true,
        });
      }
    }

    // 技能冷却提示
    gameState.availableSkills.forEach(skill => {
      if (skill.cooldown && skill.cooldown > 0) {
        hints.push({
          id: `skill_cooldown_${skill.name}`,
          type: 'timing',
          priority: 'low',
          title: '技能冷却中',
          description: `${skill.name} 技能还需等待 ${skill.cooldown} 回合才能再次使用。`,
          dismissible: true,
        });
      }
    });

    // 根据优先级排序
    return hints
      .filter(hint => !dismissedHints.has(hint.id))
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }, [gameState, dismissedHints, userExperience, showTutorialHints]);

  // 自动过期处理
  useEffect(() => {
    smartHints.forEach(hint => {
      if (hint.autoExpire) {
        const timer = setTimeout(() => {
          handleDismissHint(hint.id);
        }, hint.autoExpire);

        return () => clearTimeout(timer);
      }
    });
  }, [smartHints]);

  const handleDismissHint = (hintId: string) => {
    setDismissedHints(prev => new Set(prev).add(hintId));
    onDismissHint?.(hintId);
  };

  const handleHintAction = (hintId: string, action: string) => {
    onHintAction?.(hintId, action);
    handleDismissHint(hintId);
  };

  const toggleHintExpansion = (hintId: string) => {
    setExpandedHints(prev => {
      const newSet = new Set(prev);
      if (newSet.has(hintId)) {
        newSet.delete(hintId);
      } else {
        newSet.add(hintId);
      }
      return newSet;
    });
  };

  const getTypeIcon = (type: SmartHint['type']) => {
    switch (type) {
      case 'strategy':
        return <Lightbulb className='w-4 h-4' />;
      case 'timing':
        return <Clock className='w-4 h-4' />;
      case 'warning':
        return <AlertTriangle className='w-4 h-4' />;
      case 'opportunity':
        return <Target className='w-4 h-4' />;
      case 'tutorial':
        return <Info className='w-4 h-4' />;
      default:
        return <Info className='w-4 h-4' />;
    }
  };

  const getTypeColor = (type: SmartHint['type']) => {
    switch (type) {
      case 'strategy':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'timing':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'warning':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'opportunity':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'tutorial':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: SmartHint['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant='destructive'>高</Badge>;
      case 'medium':
        return <Badge variant='default'>中</Badge>;
      case 'low':
        return <Badge variant='secondary'>低</Badge>;
    }
  };

  if (smartHints.length === 0) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-2'>
        <Lightbulb className='w-5 h-5 text-blue-600' />
        <h3 className='font-semibold text-sm'>智能提示</h3>
        <Badge variant='outline'>{smartHints.length}</Badge>
      </div>

      <div className='space-y-2'>
        <AnimatePresence>
          {smartHints.map(hint => (
            <motion.div
              key={hint.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
            >
              <Card className={`border ${getTypeColor(hint.type)}`}>
                <Collapsible>
                  <CardHeader className='pb-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        {getTypeIcon(hint.type)}
                        <CardTitle className='text-sm'>{hint.title}</CardTitle>
                        {getPriorityBadge(hint.priority)}
                      </div>
                      <div className='flex items-center gap-1'>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => toggleHintExpansion(hint.id)}
                          >
                            {expandedHints.has(hint.id) ? '−' : '+'}
                          </Button>
                        </CollapsibleTrigger>
                        {hint.dismissible && (
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDismissHint(hint.id)}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CollapsibleContent>
                    <CardContent className='pt-0'>
                      <p className='text-sm text-muted-foreground mb-3'>
                        {hint.description}
                      </p>

                      {hint.conditions && hint.conditions.length > 0 && (
                        <div className='mb-3'>
                          <p className='text-xs font-medium mb-1'>触发条件：</p>
                          <ul className='text-xs text-muted-foreground space-y-1'>
                            {hint.conditions.map((condition, index) => (
                              <li
                                key={index}
                                className='flex items-center gap-1'
                              >
                                <span className='w-1 h-1 bg-current rounded-full' />
                                {condition}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {hint.action && hint.actionLabel && (
                        <Button
                          size='sm'
                          className='w-full'
                          onClick={() => handleHintAction(hint.id, hint.action)}
                        >
                          {hint.actionLabel}
                        </Button>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartHintSystem;
