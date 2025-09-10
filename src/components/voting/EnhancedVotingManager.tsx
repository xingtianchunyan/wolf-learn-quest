/**
 * 增强的投票管理组件
 * 为法官提供优化的投票结果处理功能，包括平票重投和状态同步
 */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Gavel, Calculator, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useVotingSystem } from '@/hooks/useVotingSystem';
import { useEnhancedVotingHandler } from '@/hooks/useEnhancedVotingHandler';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useGameState } from '@/hooks/useGameState';
import { useToast } from '@/hooks/use-toast';

/**
 * 增强投票管理组件的Props接口
 */
interface EnhancedVotingManagerProps {
  roomId: string;
  gameStateId?: string;
}

/**
 * 增强的投票管理组件
 * @param props 组件属性
 * @returns JSX元素
 */
const EnhancedVotingManager: React.FC<EnhancedVotingManagerProps> = ({
  roomId,
  gameStateId
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const { gameState } = useGameState(roomId);
  const { players } = usePlayersRealtime(roomId);
  const { 
    currentSession, 
    votes, 
    getVotingSummary, 
    getVotersForTarget,
    calculateVotingResults,
    loading: votesLoading 
  } = useVotingSystem(gameStateId, roomId);
  
  const { 
    processEnhancedVotingResult, 
    calculateAndProcessResults 
  } = useEnhancedVotingHandler(gameStateId, roomId);
  
  const { toast } = useToast();

  // 获取当前投票统计信息
  const votingSummary = getVotingSummary();
  
  /**
   * 格式化投票记录用于显示
   * @returns 格式化的投票记录数组
   */
  const formatVoteRecordsForDisplay = () => {
    if (!votingSummary.hasVotes) return [];
    
    const records = [];
    
    // 显示有得票的玩家
    for (const [targetId, voteCount] of Object.entries(votingSummary.votesByTarget)) {
      const targetPlayer = players.find(p => p.userId === targetId);
      const voters = getVotersForTarget(targetId);
      const voterNames = voters.map(voter => {
        const voterPlayer = players.find(p => p.userId === voter.voterId);
        return voterPlayer?.name || '未知玩家';
      });
      
      records.push({
        votedPlayerId: targetId,
        votedPlayerName: targetPlayer?.name || '未知玩家',
        voteCount: voteCount,
        voters: voterNames,
        isHighest: false // 稍后计算
      });
    }
    
    // 显示弃权票（如果有的话）
    if (votingSummary.abstentions > 0) {
      const abstentionVoters = votingSummary.voteDetails?.['abstention'] || [];
      const abstentionVoterNames = abstentionVoters.map(vote => {
        const voterPlayer = players.find(p => p.userId === vote.voterId);
        return voterPlayer?.name || '未知玩家';
      });
      
      records.push({
        votedPlayerId: 'abstention',
        votedPlayerName: '弃权',
        voteCount: votingSummary.abstentions,
        voters: abstentionVoterNames,
        isHighest: false
      });
    }
    
    // 按票数降序排序并标记最高票
    records.sort((a, b) => b.voteCount - a.voteCount);
    if (records.length > 0) {
      const maxVotes = records[0].voteCount;
      records.forEach(record => {
        record.isHighest = record.voteCount === maxVotes;
      });
    }
    
    return records;
  };
  
  const voteRecords = formatVoteRecordsForDisplay();
  
  /**
   * 分析投票结果类型
   * @returns 投票结果分析
   */
  const analyzeVotingResult = () => {
    if (voteRecords.length === 0) {
      return { type: 'no_votes', message: '暂无投票记录' };
    }
    
    const maxVotes = Math.max(...voteRecords.map(r => r.voteCount));
    const topVotedPlayers = voteRecords.filter(r => r.voteCount === maxVotes && r.votedPlayerId !== 'abstention');
    
    if (topVotedPlayers.length === 0) {
      return { type: 'only_abstention', message: '仅有弃权票' };
    } else if (topVotedPlayers.length === 1) {
      return { 
        type: 'unique_winner', 
        message: `${topVotedPlayers[0].votedPlayerName} 获得最高票数 (${maxVotes} 票)`,
        winner: topVotedPlayers[0]
      };
    } else {
      const tiedPlayerNames = topVotedPlayers.map(p => p.votedPlayerName).join('、');
      return { 
        type: 'tie', 
        message: `平票：${tiedPlayerNames} 各获得 ${maxVotes} 票`,
        tiedPlayers: topVotedPlayers
      };
    }
  };
  
  const resultAnalysis = analyzeVotingResult();
  
  /**
   * 处理计算投票结果
   */
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
      if (calculateVotingResults) {
        await calculateVotingResults(currentSession.id);
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
  
  /**
   * 处理投票结果
   */
  const handleProcessResults = async () => {
    if (!currentSession || !gameStateId) {
      toast({
        title: '处理失败',
        description: '没有活跃的投票会话',
        variant: 'destructive',
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      const success = await calculateAndProcessResults(
        currentSession.id,
        roomId,
        gameStateId
      );
      
      if (success) {
        // 成功处理后的额外逻辑可以在这里添加
      }
    } catch (error) {
      console.error('处理投票结果失败:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30 h-full flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-werewolf-purple flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Gavel className="mr-2 h-5 w-5" />
            增强投票管理
          </div>
          <div className="flex items-center gap-2">
            {currentSession && (
              <Badge variant="outline" className="border-green-500 text-green-400">
                会话活跃
              </Badge>
            )}
          </div>
        </CardTitle>
        
        {/* 投票结果分析 */}
        {resultAnalysis && (
          <div className={`mt-2 p-2 rounded-md text-sm ${
            resultAnalysis.type === 'unique_winner' ? 'bg-green-500/20 text-green-400' :
            resultAnalysis.type === 'tie' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            <div className="flex items-center gap-2">
              {resultAnalysis.type === 'unique_winner' ? <CheckCircle className="h-4 w-4" /> :
               resultAnalysis.type === 'tie' ? <AlertTriangle className="h-4 w-4" /> :
               <RefreshCw className="h-4 w-4" />}
              {resultAnalysis.message}
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-0 flex flex-col space-y-4 min-h-0">
        {/* 投票结果表格 */}
        <div className="border border-werewolf-purple/30 rounded-md flex-1 min-h-0">
          <ScrollArea className="h-full">
            <Table>
              <TableHeader className="sticky top-0 bg-werewolf-card z-10">
                <TableRow className="border-b border-werewolf-purple/30 hover:bg-transparent">
                  <TableHead className="text-werewolf-purple">被投票玩家</TableHead>
                  <TableHead className="text-werewolf-purple">得票数</TableHead>
                  <TableHead className="text-werewolf-purple">投票玩家</TableHead>
                  <TableHead className="text-werewolf-purple">状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {votesLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-400">
                      正在加载投票数据...
                    </TableCell>
                  </TableRow>
                ) : voteRecords.length > 0 ? (
                  voteRecords.map((record, index) => (
                    <TableRow key={`${record.votedPlayerId}-${index}`} className="border-b border-werewolf-purple/30 last:border-b-0">
                      <TableCell className="text-gray-300">
                        <div className="flex items-center gap-2">
                          {record.votedPlayerName}
                          {record.isHighest && record.votedPlayerId !== 'abstention' && (
                            <Badge variant="outline" className="border-yellow-500 text-yellow-400 text-xs">
                              最高票
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 font-semibold">
                        {record.voteCount}
                      </TableCell>
                      <TableCell className="text-gray-300 text-sm">
                        {record.voters.join(', ')}
                      </TableCell>
                      <TableCell>
                        {record.isHighest && record.votedPlayerId !== 'abstention' ? (
                          voteRecords.filter(r => r.isHighest && r.votedPlayerId !== 'abstention').length === 1 ? (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500">
                              待处理
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
                              平票
                            </Badge>
                          )
                        ) : (
                          <Badge variant="outline" className="border-gray-500 text-gray-400">
                            普通
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-400">
                      {gameState?.status === 'active' && currentSession ? 
                        '当前无投票记录' : 
                        '游戏尚未开始或无活跃投票会话'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* 操作按钮 */}
        {currentSession && gameState?.status === 'active' && (
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            <Button
              variant="outline"
              onClick={handleCalculateResults}
              className="border-werewolf-purple/50 hover:bg-werewolf-purple/20"
              disabled={isCalculating || votesLoading}
            >
              <Calculator className="h-4 w-4 mr-2" />
              {isCalculating ? '计算中...' : '计算结果'}
            </Button>
            
            <Button
              onClick={handleProcessResults}
              className="bg-werewolf-purple hover:bg-werewolf-purple/80"
              disabled={isProcessing || votesLoading || voteRecords.length === 0}
            >
              <Gavel className="h-4 w-4 mr-2" />
              {isProcessing ? '处理中...' : '处理结果'}
            </Button>
          </div>
        )}
        
        {/* 状态提示 */}
        {(!currentSession || gameState?.status !== 'active') && (
          <div className="text-center text-sm text-gray-400 p-2 bg-werewolf-dark/20 rounded-md flex-shrink-0">
            {!currentSession ? '无活跃投票会话' : '游戏未进行中'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedVotingManager;