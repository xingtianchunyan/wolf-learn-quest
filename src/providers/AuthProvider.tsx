/**
 * 文件级注释：全局认证上下文
 * 负责统一管理正式账号、游客账号与 Supabase 会话状态。
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  supabase,
  SUPABASE_STORAGE_KEY,
} from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  user_id: string;
  player_name: string;
  level: number;
  experience: number;
  games_won: number;
  games_lost: number;
}

interface AuthUser extends User {
  player_name?: string;
  is_guest?: boolean;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isLoggedIn: boolean;
  isAnonymous: boolean;
  initializing: boolean;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isSessionInitialized = useRef(false);
  const { toast } = useToast();

  /**
   * 函数级注释：清理当前项目之外的旧 Supabase token
   * 避免浏览器残留旧项目登录态影响新项目认证判断。
   */
  const cleanupLegacySupabaseTokens = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const keysToRemove: string[] = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (
        key &&
        key.startsWith('sb-') &&
        key.endsWith('-auth-token') &&
        key !== SUPABASE_STORAGE_KEY
      ) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => window.localStorage.removeItem(key));
  };

  /**
   * 函数级注释：为当前用户推导展示昵称
   */
  const resolvePlayerName = (user: User): string => {
    const guestFallback = `Guest-${user.id.slice(0, 6)}`;
    return (
      user.user_metadata?.player_name ||
      user.user_metadata?.display_name ||
      user.email?.split('@')[0] ||
      guestFallback
    );
  };

  /**
   * 函数级注释：构建上下文使用的认证用户对象
   */
  const buildAuthUser = (
    user: User,
    userProfile?: UserProfile | null
  ): AuthUser => ({
    ...user,
    player_name: userProfile?.player_name || resolvePlayerName(user),
    is_guest: Boolean(user.is_anonymous || user.user_metadata?.is_guest),
  });

  /**
   * 函数级注释：确保 public.users 中存在当前用户资料
   */
  const ensureUserProfile = async (user: User): Promise<UserProfile | null> => {
    try {
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error checking user profile:', fetchError);
        return null;
      }

      if (!existingUser) {
        const playerName = resolvePlayerName(user);

        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            user_id: user.id,
            player_name: playerName,
            level: 1,
            experience: 0,
            games_won: 0,
            games_lost: 0,
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating user profile:', insertError);
          toast({
            title: 'Profile Creation Failed',
            description: `Failed to create user profile: ${insertError.message}. Please try refreshing the page.`,
            variant: 'destructive',
          });
          return null;
        } else {
          return newUser;
        }
      }

      return existingUser;
    } catch (error) {
      console.error('Error ensuring user profile:', error);
      toast({
        title: 'Profile Creation Failed',
        description:
          'An unexpected error occurred while creating your profile.',
        variant: 'destructive',
      });
      return null;
    }
  };

  const requireAuth = (): boolean => {
    if (initializing) return false;
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    cleanupLegacySupabaseTokens();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') {
        isSessionInitialized.current = true;
      }

      if (!isSessionInitialized.current) {
        return;
      }

      if (session?.user) {
        const userProfile = await ensureUserProfile(session.user);
        setCurrentUser(buildAuthUser(session.user, userProfile));
        setIsLoggedIn(true);
        setIsAnonymous(Boolean(session.user.is_anonymous));
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setIsAnonymous(false);
      }

      setInitializing(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    currentUser,
    isLoggedIn,
    isAnonymous,
    initializing,
    isLoginOpen,
    setIsLoginOpen,
    requireAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
