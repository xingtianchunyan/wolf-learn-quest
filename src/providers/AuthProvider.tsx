import { supabase   } from '@/integrations/supabase/client';
import { User   } from '@supabase/supabase-js';
import { useToast   } from '@/components/ui/useToast';
import React, { createContext, useContext, useEffect, useState, useRef   } from 'react';

interface UserProfile { user_id: string;
  player_name: string;
  level: number;
  experience: number;
  games_won: number;
  games_lost: number
}

interface AuthContextType { currentUser: (User & { player_name?: string  
}) | null;
  isLoggedIn: boolean;
  initializing: boolean;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => { const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
}
  return context
};

export const AuthProvider: React.FC<{ children: React.ReactNode  
}> = ({ children  }) => { const [currentUser, setCurrentUser] = useState<(User & { player_name?: string  
}) | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isSessionInitialized = useRef(false);
  const { toast  } = useToast();

  // Ensure user profile exists in users table
  const ensureUserProfile = async (user: User): Promise<UserProfile | null> => { try {
      // Check if user profile exists
      const { data: existingUser, error: fetchError  
} = await supabase;
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') { console.error('Error checking user profile:', fetchError);
        return null
}

      // If user doesn't exist, create profile
      if (!existingUser) { console.log('Creating user profile for:', user.id);

        // Get player name from user metadata or display name, fallback to email
        const playerName = user.user_metadata?.player_name ||;
        user.user_metadata?.display_name ||
        user.email?.split('@')[0] ||
        'Player';

        const { data: newUser, error: insertError  
} = await supabase;
        .from('users')
        .insert({ id: user.id, // Add the required id field
          user_id: user.id,
          player_name: playerName,
          level: 1,
          experience: 0,
          games_won: 0,
          games_lost: 0 
})
        .select()
        .single();

        if (insertError) { console.error('Error creating user profile:', insertError);
          toast({
            title: 'Profile Creation Failed',
            description: `Failed to create user profile: ${insertError.message 
}. Please try refreshing the page.`,
            variant: 'destructive' 
});
          return null
} else { console.log('User profile created successfully');
          return newUser
}
      }

      return existingUser
} catch (error) { console.error('Error ensuring user profile:', error);
      toast({
        title: 'Profile Creation Failed',
        description: 'An unexpected error occurred while creating your profile.',
        variant: 'destructive' 
});
      return null
}
  };

  const requireAuth = (): boolean => { if (initializing) return false;
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return false
}
    return true
};

  useEffect(() => { // Listen for auth changes
    const { data: { subscription  
} } = supabase.auth.onAuthStateChange(async (event, session) => { console.log('Auth change:', event, session?.user?.id);

      if (event === 'INITIAL_SESSION') {
        isSessionInitialized.current = true
}

      if (!isSessionInitialized.current) { return
}

      if (session?.user) { const userProfile = await ensureUserProfile(session.user);
        setCurrentUser({ ...session.user, player_name: userProfile?.player_name  
});
        setIsLoggedIn(true)
} else { setCurrentUser(null);
        setIsLoggedIn(false)
}

      setInitializing(false)
});

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps }, []);

  const value = { currentUser,
    isLoggedIn,
    initializing,
    isLoginOpen,
    setIsLoginOpen,
    requireAuth  };

  return (;
    <AuthContext.Provider value={ value }>;
    { children }
    </AuthContext.Provider>
  )
};
