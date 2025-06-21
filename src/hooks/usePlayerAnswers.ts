
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Player answer record with extended properties
export interface PlayerAnswerRecord {
  id: string;
  game_id: string | null;
  question_id: string | null;
  player_id: string | null;
  selected_option: number | null;
  is_correct: boolean | null;
  response_time: number | null;
  user_id?: string;
  game_round?: number;
  game_phase?: string;
  is_timeout?: boolean;
  questions?: {
    question: string;
    correct_option: number;
    explanation?: string;
  };
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
        .select(`
          *,
          questions (
            question,
            correct_option,
            explanation
          )
        `)
        .eq('game_id', gameId);
      
      if (error) {
        console.error('Error fetching player answers:', error);
      } else if (data) {
        // Add user_id field for compatibility
        const transformedData = data.map(answer => ({
          ...answer,
          user_id: answer.player_id,
          is_timeout: answer.response_time === null
        }));
        setPlayerAnswers(transformedData as PlayerAnswerRecord[]);
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
            const newAnswer = {
              ...payload.new as PlayerAnswerRecord,
              user_id: (payload.new as any).player_id,
              is_timeout: (payload.new as any).response_time === null
            };
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
