/**
 * 增强的投票管理组件
 * 为法官提供优化的投票结果处理功能，包括平票重投和状态同步
 */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Gavel,
  Calculator,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { useVotingSystem } from '@/hooks/useVotingSystem';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useGameState } from '@/hooks/useGameState';
import { useToast } from '@/hooks/use-toast';
import { useEnhancedVotingAnalysis } from './useEnhancedVotingAnalysis';
import { EnhancedVotingRecordsTable } from './EnhancedVotingRecordsTable';

interface EnhancedVotingManagerProps {
  roomId: string;
  gameStateId?: string;
}

const EnhancedVotingManager: React.FC<EnhancedVotingManagerProps> = ({
  roomId,
  gameStateId,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  // Keep track of the last active session so the judge can still process
  // results after calculate_voting_results() marks the session as completed.
  const [lastSessionId, setLastSessionId] = useState<string | null>(null);

  const { gameState } = useGameState(roomId);
  const { players } = usePlayersRealtime(roomId);
  const {
    currentSession,
    getVotingSummary,
    getVotersForTarget,
    calculateResults,
    processEnhancedVotingResult,
    loading: votesLoading,
  } = useVotingSystem(gameStateId, roomId);

  const { toast } = useToast();
  const votingSummary = getVotingSummary();

  React.useEffect(() => {
    if (currentSession?.id) {
      setLastSessionId(currentSession.id);
    }
  }, [currentSession?.id]);

  const { voteRecords, resultAnalysis } = useEnhancedVotingAnalysis(
    players,
    votingSummary,
    getVotersForTarget
  );

  const handleCalculateResults = async () => {
    if (!currentSession || !gameStateId) {
      toast({
        title: '计算失败',
        description: '没有活跃的投票会话',
        variant: 'destructive',
      });
      return;
    }

    setIsCalculating(true);
    try {
      if (calculateResults) {
        await calculateResults(currentSession.id);
        toast({
          title: '计算完成',
          description: '投票结果已计算完成',
        });
      }
    } catch (error) {
      console.error('计算投票结果失败:', error);
      toast({
        title: '计算失败',
        description: '计算投票结果时发生错误',
        variant: 'destructive',
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleProcessResults = async () => {
    const targetSessionId = currentSession?.id || lastSessionId;
    if (!targetSessionId || !gameStateId) {
      toast({
        title: '处理失败',
        description: '没有可处理的投票会话',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      await processEnhancedVotingResult(targetSessionId, roomId, gameStateId);
      toast({
        title: '处理完成',
        description: '投票结果已处理',
      });
    } catch (error) {
      console.error('处理投票结果失败:', error);
      toast({
        title: '处理失败',
        description: '处理投票结果时发生错误',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col'>
      <CardHeader className='flex-shrink-0 pb-3'>
        <CardTitle className='text-werewolf-purple flex items-center justify-between text-lg'>
          <div className='flex items-center'>
            <Gavel className='mr-2 h-5 w-5' />
            增强投票管理
          </div>
          <div className='flex items-center gap-2'>
            {currentSession && (
              <Badge
                variant='outline'
                className='border-green-500 text-green-400'
              >
                会话活跃
              </Badge>
            )}
          </div>
        </CardTitle>

        {resultAnalysis && (
          <div
            className={`mt-2 p-2 rounded-md text-sm ${
              resultAnalysis.type === 'unique_winner'
                ? 'bg-green-500/20 text-green-400'
                : resultAnalysis.type === 'tie'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            <div className='flex items-center gap-2'>
              {resultAnalysis.type === 'unique_winner' ? (
                <CheckCircle className='h-4 w-4' />
              ) : resultAnalysis.type === 'tie' ? (
                <AlertTriangle className='h-4 w-4' />
              ) : (
                <RefreshCw className='h-4 w-4' />
              )}
              {resultAnalysis.message}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className='flex-1 p-4 pt-0 flex flex-col space-y-4 min-h-0'>
        <EnhancedVotingRecordsTable
          voteRecords={voteRecords}
          votesLoading={votesLoading}
          gameActive={gameState?.status === 'active'}
          hasSession={!!currentSession}
        />

        {(currentSession || voteRecords.length > 0) &&
          gameState?.status === 'active' && (
          <div className='grid grid-cols-2 gap-3 flex-shrink-0'>
            <Button
              variant='outline'
              onClick={handleCalculateResults}
              data-testid='calculate-results-button'
              className='border-werewolf-purple/50 hover:bg-werewolf-purple/20'
              disabled={isCalculating || votesLoading}
            >
              <Calculator className='h-4 w-4 mr-2' />
              {isCalculating ? '计算中...' : '计算结果'}
            </Button>

            <Button
              onClick={handleProcessResults}
              data-testid='process-results-button'
              className='bg-werewolf-purple hover:bg-werewolf-purple/80'
              disabled={
                isProcessing || votesLoading || voteRecords.length === 0
              }
            >
              <Gavel className='h-4 w-4 mr-2' />
              {isProcessing ? '处理中...' : '处理结果'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedVotingManager;
