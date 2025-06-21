
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export interface PlayerAnswerRecord {
  id: string;
  game_id: string | null;
  question_id: string | null;
  player_id: string | null;
  selected_option: number | null;
  is_correct: boolean | null;
  response_time: number | null;
  game_phase?: string | null;
  explanation?: string | null;
  is_timeout?: boolean | null;
}

export const usePlayerAnswers = (gameId: string | null | undefined) => {
  const [playerAnswers, setPlayerAnswers] = useState<PlayerAnswerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) {
      setPlayerAnswers([]);
      setLoading(false);
      return;
    }

    const fetchAnswers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('player_answers')
        .select('*')
        .eq('game_id', gameId);
      
      if (error) {
        console.error('Error fetching player answers:', error);
      } else if (data) {
        setPlayerAnswers(data as PlayerAnswerRecord[]);
      }
      setLoading(false);
    };

    fetchAnswers();

    const channel = supabase
      .channel(`player_answers_for_game_${gameId}`)
      .on<PlayerAnswerRecord>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'player_answers',
          filter: `game_id=eq.${gameId}`,
        },
        (payload: RealtimePostgresChangesPayload<PlayerAnswerRecord>) => {
          if (payload.new && typeof payload.new === 'object') {
            const newAnswer = payload.new as PlayerAnswerRecord;
            if (payload.eventType === 'INSERT') {
              setPlayerAnswers(currentAnswers => {
                if (currentAnswers.some(a => a.id === newAnswer.id)) {
                  return currentAnswers;
                }
                return [...currentAnswers, newAnswer];
              });
            } else if (payload.eventType === 'UPDATE') {
              setPlayerAnswers(currentAnswers =>
                currentAnswers.map(ans =>
                  ans.id === newAnswer.id ? newAnswer : ans
                )
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  return { playerAnswers, loading };
};
