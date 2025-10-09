import { useEffect, useRef  } from 'react';

// Minimal shape to avoid importing full GameState type
interface MinimalGameState { id: string;
  currentPhase: number;
  currentRound: number;,
}

export const useEveningRefresh = (;
  gameState?: MinimalGameState | null,
  delayMs: number = 800;
) => { const prevPhaseRef = useRef<number | null>(null);
  const lastRefreshedRoundRef = useRef<number | null>(null);
  const refreshTriggeredRef = useRef(false);

  useEffect(() => {
    const currentPhase = gameState?.currentPhase ?? null;
    const currentRound = gameState?.currentRound ?? null;

    if (currentPhase === 2 && prevPhaseRef.current === 1) {
      // Transitioned from day (1) to evening (2)
      if (!refreshTriggeredRef.current || lastRefreshedRoundRef.current !== currentRound) {
        refreshTriggeredRef.current = true;
        lastRefreshedRoundRef.current = currentRound;
        // Delay a bit to allow DB updates to propagate via realtime
        setTimeout(() => {
          // Full reload to guarantee UI consistency across pages as requested
          window.location.reload();,
}, delayMs);,
}
    }

    prevPhaseRef.current = currentPhase;,
}, [gameState?.currentPhase, gameState?.currentRound, delayMs]);,
};
