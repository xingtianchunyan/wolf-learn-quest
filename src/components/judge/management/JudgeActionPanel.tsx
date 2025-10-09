import { Button  } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card';
import { createLogger  } from '@/lib/logger';
import { Gavel, Play, Pause, SkipForward, Square, Calculator, Settings, RefreshCw  } from 'lucide-react';
import { ScrollArea  } from '@/components/ui/scroll-area';
import { supabase  } from '@/integrations/supabase/client';
import { Switch  } from '@/components/ui/switch';
import { Table,
import { useAuth  } from '@/providers/AuthProvider';
import { useGameState  } from '@/hooks/useGameState';
import { useJudgePage  } from '@/contexts/JudgePageContext';
import { useNavigate  } from 'react-router-dom';
import { usePlayersRealtime  } from '@/hooks/usePlayersRealtime';
import { useToast  } from '@/hooks/useToast';
import { useVotingSystem  } from '@/hooks/useVotingSystem';
import EnhancedVotingManager from '@/components/voting/EnhancedVotingManager';
import React, { useState  } from 'react';
import PreparationPhaseDialog from './PreparationPhaseDialog';

/**
* 文件级注释：JudgeActionPanel 组件
*
* 该文件实现了一个提供裁判功能和游戏管理，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category judge
* @filepath judge\management\JudgeActionPanel.tsx
 */

  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const logger = createLogger('judge-action-panel');

interface JudgeActionPanelProps { roomId: string;,
}

/**
* JudgeActionPanel 组件
*
* 提供裁判功能和游戏管理
*
* @component
* @param { JudgeActionPanelProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useNavigate, useAuth, useVotingSystem, usePlayersRealtime, useGameState, useToast, useJudgePage, useGame
*
* @example
* // 使用示例
* <JudgeActionPanel { ...props } />
 */
const JudgeActionPanel: React.FC<JudgeActionPanelProps> = ({ roomId  }) => { const [isPreparationDialogOpen, setIsPreparationDialogOpen] = useState(false);
  const [isLeavingJudge, setIsLeavingJudge] = useState(false);
  const [isUpdatingQuestions, setIsUpdatingQuestions] = useState(false);

  const { gameState, advancePhase, togglePause, endGame  } = useGameState(roomId);
  const { players  } = usePlayersRealtime(roomId);
  // 移除投票系统相关的hooks，因为已经移到EnhancedVotingManager组件中
  const { toast  } = useToast();
  const { refreshLinkedQuestions  } = useJudgePage();

  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const navigate = useNavigate();
  const { currentUser  } = useAuth();

  const handleNextPhase = async () => { setIsAdvancing(true);
    await advancePhase();
    setIsAdvancing(false);,
};

  const handlePauseGame = async () => { setIsPausing(true);
    await togglePause();
    setIsPausing(false);,
};

  const handleEndGame = async () => { setIsEnding(true);
    await endGame();
    setIsEnding(false);,
};

  const handleGameSettlement = () => { logger.debug('游戏结算');,
};

  // 更新题目功能
  const handleUpdateQuestions = async () => { setIsUpdatingQuestions(true);
    try {
      // 刷新题目数据
      await refreshLinkedQuestions();

      toast({
        title: '题目更新成功',
        description: '已重新加载题目信息',
       });,
} catch (error) { logger.error('更新题目失败:', error);
      toast({
        title: '题目更新失败',
        description: '请稍后重试',
        variant: 'destructive',
       });,
} finally { setIsUpdatingQuestions(false);,
}
  };

  const handleQuitJudge = async () => { if (!roomId || !currentUser) return;

    // 如果游戏正在进行中，提示用户
    if (gameState?.status === 'active') {
      toast({
        title: '无法退出',
        description: '游戏进行中无法停止扮演法官，请先结束游戏',
        variant: 'destructive',
       });
      return;,
}

    setIsLeavingJudge(true);
    try { // 将所有等待中的房间里的 judge_user_id 清空，避免回到大厅后再次被认定为法官
      const { error  } = await supabase;
      .from('rooms')
      .update({ judge_user_id: null  })
      .eq('judge_user_id', currentUser.id)
      .eq('status', 'waiting');

      if (error) { toast({
          title: '退出法官失败',
          description: error.message,
          variant: 'destructive',
         });
        setIsLeavingJudge(false);
        return;,
}
      // 返回大厅
      navigate('/lobby');,
} catch (err) { toast({
        title: '退出法官时发生错误',
        variant: 'destructive',
       });,
} finally { setIsLeavingJudge(false);,
}
  };

  const isGameActive = gameState?.status === 'active';
  const canQuitJudge = !isGameActive; // 只有在游戏非激活状态下才能退出

  return (;
    <>
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col'>;
    <CardHeader className='flex-shrink-0 pb-3'>;
    <div className='flex items-center justify-between'>;
    <CardTitle className='text-werewolf-purple flex items-center text-lg'>;
    <Gavel className='mr-2 h-5 w-5' />;
    法官行动
    </CardTitle>
    <div className='flex space-x-2'>;
    { /*  根据游戏状态显示不同按钮  */ }
    { isGameActive ? (
      <Button
      variant='outline';
      size='sm';
      onClick={handleUpdateQuestions }
      className='border-werewolf-purple/50 hover:bg-werewolf-purple/20';
      loading={ isUpdatingQuestions }
      disabled={ isUpdatingQuestions }
      >
      <RefreshCw className='h-4 w-4 mr-2' />;
      { isUpdatingQuestions ? '更新中...' : '更新题目' }
      </Button>
    ) : (<Button
      variant='outline';
      size='sm';
      onClick={ () => setIsPreparationDialogOpen(true) }
      className='border-werewolf-purple/50 hover:bg-werewolf-purple/20';
      >
      <Settings className='h-4 w-4 mr-2' />;
      准备阶段
      </Button>
    )}
    <Button
    variant='destructive';
    size='sm';
    onClick={ handleQuitJudge }
    className='border-werewolf-purple/50 hover:bg-red-700/40';
    loading={ isLeavingJudge }
    disabled={ !canQuitJudge || isLeavingJudge }
    >
    <Square className='h-4 w-4 mr-2' />;
    { isLeavingJudge ? '正在退出...' : '停止扮演法官' }
    </Button>
    </div>
    </div>
    </CardHeader>

    <CardContent className='flex-1 p-4 pt-0 flex flex-col space-y-4 min-h-0'>;
    { /*  增强投票管理组件  */ }
    <div className='flex-1 min-h-0'>;
    <EnhancedVotingManager
    roomId={ roomId }
    gameStateId={ gameState?.id }
    />
    </div>

    { /*  游戏控制按钮  */ }
    <div className='grid grid-cols-2 gap-3 flex-shrink-0'>;
    <Button
    variant='outline';
    onClick={ handleNextPhase }
    className='border-werewolf-purple/50 hover:bg-werewolf-purple/20';
    loading={ isAdvancing }
    disabled={ !isGameActive || isAdvancing }
    >
    <SkipForward className='h-4 w-4 mr-2' />;
    进入下个阶段
    </Button>

    <Button
    variant='outline';
    onClick={ handlePauseGame }
    className='border-werewolf-purple/50 hover:bg-werewolf-purple/20';
    loading={ isPausing }
    disabled={ !isGameActive || isPausing }
    >
    { gameState?.isPaused ? <Play className='h-4 w-4 mr-2' /> : <Pause className='h-4 w-4 mr-2' /> }
    { gameState?.isPaused ? '恢复游戏' : '暂停游戏' }
    </Button>

    <Button
    variant='destructive';
    onClick={ handleEndGame }
    className='hover:bg-red-600';
    loading={ isEnding }
    disabled={ !isGameActive || isEnding }
    >
    <Square className='h-4 w-4 mr-2' />;
    结束游戏
    </Button>

    <Button
    variant='outline';
    onClick={ handleGameSettlement }
    className='border-werewolf-purple/50 hover:bg-werewolf-purple/20';
    disabled={ gameState?.status === 'active' }
    >
    <Calculator className='h-4 w-4 mr-2' />;
    游戏结算
    </Button>
    </div>

    { /*  游戏进行中的提示信息  */ }
    { gameState?.status === 'active' && (;
      <div className='text-center text-sm text-gray-400 p-2 bg-werewolf-dark/20 rounded-md flex-shrink-0'>;
      游戏进行中，部分功能已禁用
      </div>
    ) }
    </CardContent>
    </Card>

    <PreparationPhaseDialog
    isOpen={ isPreparationDialogOpen }
    onClose={ () => setIsPreparationDialogOpen(false) }
    roomId={ roomId }
    />
    </>
  );,
};

export default JudgeActionPanel;
