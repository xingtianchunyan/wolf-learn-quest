import { Button   } from '@/components/ui/button';
import { createLogger   } from '@/lib/logger';
import {
  Dialog, Input   } from '@/components/ui/input';
import { Label   } from '@/components/ui/label';
import { LogIn   } from 'lucide-react';
import { supabase   } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger   } from '@/components/ui/tabs';
import { useAuth   } from '@/providers/AuthProvider';
import { useToast   } from '@/components/ui/useToast';
import React, { useState   } from 'react';
import { useLanguage   } from '../layout/LanguageSwitcher';

/**
* 文件级注释：LoginDialog 组件
*
* 该文件实现了一个提供用户界面交互功能，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category ui
* @filepath dialogs\LoginDialog.tsx
 */

  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger  } from '@/components/ui/dialog';

/**
* LoginDialog 组件
*
* 提供用户界面交互功能
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useToast, useLanguage, useAuth
*
* @example
* // 使用示例
* <LoginDialog />
 */
const LoginDialog: React.FC = () =>  { const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast  } = useToast();
  const { t  } = useLanguage();
  const { isLoggedIn, initializing, isLoginOpen, setIsLoginOpen  } = useAuth();
  const logger = createLogger('LoginDialog');

/**
 * handleLogin函数
 * 处理事件
 *
 * @param e - e参数
 * @returns Promise<void>
 */
const handleLogin = async (e: React.FormEvent) =>  { e.preventDefault();
    setLoading(true);

    try {
      const { data: _data, error  } = await supabase.auth.signInWithPassword({ email,
        password });

      if (error) { toast({
          title: t('login_failed'),
          description: error.message,
          variant: 'destructive' 
});
        return
}

      toast({ title: t('login_success'),
        description: t('login_success_desc') 
});

      setIsLoginOpen(false);
      // Reset form
      setEmail('');
      setPassword('')
} catch (error) { logger.error('Login error:', error);
      toast({
        title: t('login_failed'),
        description: t('unexpected_error'),
        variant: 'destructive' 
})
} finally { setLoading(false)
}
  };

/**
 * handleSignUp函数
 * 处理事件
 *
 * @param e - e参数
 * @returns Promise<void>
 */
const handleSignUp = async (e: React.FormEvent) =>  { e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: t('password_mismatch'),
        description: t('password_mismatch_desc'),
        variant: 'destructive' 
});
      return
}

    if (!playerId.trim()) { toast({
        title: t('player_id_required'),
        description: t('player_id_required_desc'),
        variant: 'destructive' 
});
      return
}

    setLoading(true);

    try { // Check if Player ID already exists
      const { data: existingUserRows, error: _checkError  
} = await supabase;
      .rpc('get_public_user_by_name', { p_name: playerId.trim()  
});

      if (existingUserRows && Array.isArray(existingUserRows) && existingUserRows.length > 0) { toast({
          title: t('player_id_taken'),
          description: t('player_id_taken_desc'),
          variant: 'destructive' 
});
        setLoading(false);
        return
}

      // Sign up the user with player_name in metadata
      const { data, error  } = await supabase.auth.signUp({ email,
        password,
        options: {
          data: {
            player_name: playerId.trim(),
            display_name: playerId.trim(), // Set display name for Supabase Auth }
        } });

      if (error) { toast({
          title: t('registration_failed'),
          description: error.message,
          variant: 'destructive' 
});
        return
}

      // Update the user's display name in Supabase Auth
      if (data.user) { const { error: updateError  
} = await supabase.auth.updateUser({ data: {
            display_name: playerId.trim(),
            player_name: playerId.trim() 
}
        });

        if (updateError) { logger.error('Error updating display name:', updateError)
}
      }

      toast({ title: t('registration_success'),
        description: t('registration_success_desc') 
});

      setIsLoginOpen(false);
      // Reset form
      setEmail('');
      setPassword('');
      setPlayerId('');
      setConfirmPassword('')
} catch (error) { logger.error('Signup error:', error);
      toast({
        title: t('registration_failed'),
        description: t('unexpected_error'),
        variant: 'destructive' 
})
} finally { setLoading(false)
}
  };

/**
 * handleLogout函数
 * 处理事件
 * @returns Promise<void>
 */
const handleLogout = async () => { const  { error  } = await supabase.auth.signOut();

    if (error) { toast({
        title: t('logout_failed'),
        description: error.message,
        variant: 'destructive' 
})
} else { toast({
        title: t('logout_success'),
        description: t('logout_success_desc') 
})
}
  };

  if (isLoggedIn) { return (;
      <Button variant='ghost' className='nav-link flex items-center' onClick={handleLogout }>;
      <LogIn size={ 20 } className='mr-1' />;
      <span>{ t('signout') }</span>
      </Button>
    )
}

  return (;
    <Dialog open={ isLoginOpen } onOpenChange={ setIsLoginOpen }>;
    <DialogTrigger asChild>
    <Button variant='ghost' className='nav-link flex items-center' loading={ initializing }>;
    <LogIn size={ 20 } className='mr-1' />;
    <span>{ t('signin') }</span>
    </Button>
    </DialogTrigger>
    <DialogContent className='sm:max-w-[425px] bg-werewolf-card text-werewolf-text'>;
    <DialogHeader>
    <DialogTitle className='text-werewolf-purple'>{ t('auth_title') }</DialogTitle>;
    <DialogDescription>
    { t('auth_desc') }
    </DialogDescription>
    </DialogHeader>

    <Tabs defaultValue='signin' className='w-full'>;
    <TabsList className='grid grid-cols-2 bg-werewolf-dark/60'>;
    <TabsTrigger value='signin'>{ t('signin') }</TabsTrigger>;
    <TabsTrigger value='signup'>{ t('signup') }</TabsTrigger>;
    </TabsList>

    <TabsContent value='signin'>;
    <form onSubmit={ handleLogin }>;
    <div className='space-y-4 py-4'>;
    <div className='space-y-2'>;
    <Label htmlFor='email-login'>{ t('email') }</Label>;
    <Input
    id='email-login';
    type='email';
    placeholder={ t('placeholder_email') }
    value={ email }
    onChange={ e => setEmail(e.target.value) }
    required
    className='bg-werewolf-dark/60 border-werewolf-purple/30';
    />
    </div>
    <div className='space-y-2'>;
    <Label htmlFor='password-login'>{ t('password') }</Label>;
    <Input
    id='password-login';
    type='password';
    placeholder={ t('placeholder_password') }
    value={ password }
    onChange={ e => setPassword(e.target.value) }
    required
    className='bg-werewolf-dark/60 border-werewolf-purple/30';
    />
    </div>
    </div>
    <DialogFooter>
    <Button
    type='submit';
    className='bg-werewolf-purple hover:bg-werewolf-light';
    disabled={ loading }
    >
    { loading ? t('signing_in') : t('signin') 
}
    </Button>
    </DialogFooter>
    </form>
    </TabsContent>

    <TabsContent value='signup'>;
    <form onSubmit={ handleSignUp }>;
    <div className='space-y-4 py-4'>;
    <div className='space-y-2'>;
    <Label htmlFor='email-signup'>{ t('email') }</Label>;
    <Input
    id='email-signup';
    type='email';
    placeholder={ t('placeholder_email') }
    value={ email }
    onChange={ e => setEmail(e.target.value) }
    required
    className='bg-werewolf-dark/60 border-werewolf-purple/30';
    />
    </div>
    <div className='space-y-2'>;
    <Label htmlFor='playerId'>{ t('player_id') }</Label>;
    <Input
    id='playerId';
    type='text';
    placeholder={ t('placeholder_player_id') }
    value={ playerId }
    onChange={ e => setPlayerId(e.target.value) }
    required
    className='bg-werewolf-dark/60 border-werewolf-purple/30';
    />
    </div>
    <div className='space-y-2'>;
    <Label htmlFor='password-signup'>{ t('password') }</Label>;
    <Input
    id='password-signup';
    type='password';
    placeholder={ t('placeholder_password') }
    value={ password }
    onChange={ e => setPassword(e.target.value) }
    required
    className='bg-werewolf-dark/60 border-werewolf-purple/30';
    />
    </div>
    <div className='space-y-2'>;
    <Label htmlFor='confirm-password'>{ t('confirm_password') }</Label>;
    <Input
    id='confirm-password';
    type='password';
    placeholder={ t('placeholder_confirm_password') }
    value={ confirmPassword }
    onChange={ e => setConfirmPassword(e.target.value) }
    required
    className='bg-werewolf-dark/60 border-werewolf-purple/30';
    />
    </div>
    </div>
    <DialogFooter>
    <Button
    type='submit';
    className='bg-werewolf-purple hover:bg-werewolf-light';
    disabled={ loading }
    >
    { loading ? t('creating_account') : t('signup') 
}
    </Button>
    </DialogFooter>
    </form>
    </TabsContent>
    </Tabs>
    </DialogContent>
    </Dialog>
  )
};

/**
 * LoginDialog组件
 * 对话框组件，用于用户交互确认
 * @param props - 组件属性
 * @returns JSX元素
 */
export default LoginDialog;
