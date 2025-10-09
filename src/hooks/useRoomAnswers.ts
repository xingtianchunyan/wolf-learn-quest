import { RealtimePostgresChangesPayload  } from '@supabase/supabase-js';
import { supabase  } from '@/integrations/supabase/client';
import { useState, useEffect  } from 'react';

export interface RoomAnswerRecord { id: string;
  room_id: string | null;
  user_id: string | null;
  role_id: string | null;
  room_question_id: string | null;
  question_order: number | null;
  selected_option: number | null;
  is_correct: boolean | null;
  response_time: number | null;
  created_at: string | null;,
}

export const useRoomAnswers = (roomId: string | null | undefined) => { const [roomAnswers, setRoomAnswers] = useState<RoomAnswerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) {
      setRoomAnswers([]);
      setLoading(false);
      return;,
}

    const fetchAnswers = async () => { setLoading(true);
      const { data, error  } = await supabase;
      .from('room_answers')
      .select('*')
      .eq('room_id', roomId);

      if (error) { console.error('Error fetching room answers:', error);,
} else if (data) { setRoomAnswers(data as RoomAnswerRecord[]);,
}
      setLoading(false);,
};

    fetchAnswers();

    const channel = supabase;
    .channel(`room_answers_for_room_${ roomId }`)
    .on<RoomAnswerRecord>('postgres_changes',
      { event: '*',
        schema: 'public',
        table: 'room_answers',
        filter: `room_id=eq.${roomId }`,
      },
      (payload: RealtimePostgresChangesPayload<RoomAnswerRecord>) => { if (payload.new && typeof payload.new === 'object') {
          const newAnswer = payload.new as RoomAnswerRecord;
          if (payload.eventType === 'INSERT') {
            setRoomAnswers(currentAnswers => {
              if (currentAnswers.some(a => a.id === newAnswer.id)) {
                return currentAnswers;,
}
              return [...currentAnswers, newAnswer];,
});,
} else if (payload.eventType === 'UPDATE') { setRoomAnswers(currentAnswers =>;
            currentAnswers.map(ans =>;
            ans.id === newAnswer.id ? newAnswer : ans;
          )
        );,
}
    },
}
)
.subscribe();

return () => { supabase.removeChannel(channel);,
};,
}, [roomId]);

return { roomAnswers, loading  };,
};
