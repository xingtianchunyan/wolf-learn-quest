import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Minimal shape to avoid importing full GameState type
interface MinimalGameState {
  id: string;
  currentPhase: number;
  currentRound: number;
}

export const useAutoProcessDayVote = (
  roomId: string,
  gameState?: MinimalGameState | null
) => {
  const { toast } = useToast();
  const processingRef = useRef(false);
  const lastProcessedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!roomId || !gameState?.id) return;
      // Only act when entering evening (phase 2)
      if (gameState.currentPhase !== 2) return;

      const processKey = `${gameState.id}-${gameState.currentRound}-evening`;
      if (processingRef.current || lastProcessedKeyRef.current === processKey) return;

      processingRef.current = true;
      try {
        // 1) Find the voting session for the just-ended day (phase 1)
        const { data: sessions, error: sessionErr } = await supabase
          .from('voting_sessions')
          .select('id,status')
          .eq('game_state_id', gameState.id)
          .eq('round_number', gameState.currentRound)
          .eq('phase', 1)
          .eq('session_type', 'day_vote')
          .order('created_at', { ascending: false })
          .limit(1);

        if (sessionErr) {
          console.error('获取投票会话失败:', sessionErr);
          return;
        }
        const session = sessions?.[0];
        if (!session) {
          return;
        }

        // 2) Prefetch existing results; if already processed, skip to avoid duplicate side effects
        const { data: existingResults, error: existingErr } = await supabase
          .from('voting_results')
          .select('id, processing_status')
          .eq('voting_session_id', session.id);
        if (existingErr) {
          console.error('获取投票结果失败:', existingErr);
          return;
        }
        if (existingResults && existingResults.length > 0) {
          const allCompleted = existingResults.every(r => r.processing_status === 'completed');
          if (allCompleted) {
            lastProcessedKeyRef.current = processKey;
            return;
          }
        }

        // 3) Calculate voting results (idempotent but we avoid re-run if already processed)
        const { error: calcErr } = await supabase.rpc('calculate_voting_results', {
          p_voting_session_id: session.id,
        });
        if (calcErr) {
          console.error('计算投票结果失败:', calcErr);
          return;
        }

        // 4) Fetch fresh results and process each (judge-only in RLS)
        const { data: results, error: resultsErr } = await supabase
          .from('voting_results')
          .select('id, processing_status')
          .eq('voting_session_id', session.id);
        if (resultsErr) {
          console.error('获取投票结果失败:', resultsErr);
          return;
        }

        if (!results || results.length === 0) {
          return;
        }

        for (const r of results) {
          if (r.processing_status !== 'completed') {
            const { error: procErr } = await supabase.rpc('process_voting_result', {
              p_voting_result_id: r.id,
            });
            if (procErr) {
              console.error('处理投票结果失败:', procErr);
            }
          }
        }

        lastProcessedKeyRef.current = processKey;
        toast({ title: '投票结果已自动处理', description: '已根据规则更新玩家状态' });
      } catch (e) {
        console.error('自动处理投票结果时出错:', e);
      } finally {
        processingRef.current = false;
      }
    };

    run();
  }, [roomId, gameState?.id, gameState?.currentPhase, gameState?.currentRound]);
};
