import { createLogger  } from '@/lib/logger';
import { supabase  } from '@/integrations/supabase/client';
import { useEffect  } from 'react';

const logger = createLogger('useRoomCleanup');

export const useRoomCleanup = () => { useEffect(() => {
    // Function to call the room cleanup
    const cleanupInactiveRooms = async () => {
      try {
        const { error  } = await supabase.rpc('close_inactive_rooms');
        if (error) { logger.error('Error cleaning up inactive rooms:', error);,
}
      } catch (error) { logger.error('Error calling room cleanup function:', error);,
}
    };

    // Run cleanup immediately
    cleanupInactiveRooms();

    // Set up interval to run cleanup every minute
    const interval = setInterval(cleanupInactiveRooms, 60000);

    return () => clearInterval(interval);,
}, []);,
};
