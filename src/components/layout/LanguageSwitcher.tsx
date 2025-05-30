import React, { useState, createContext, useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, Languages } from 'lucide-react';

// Define the language options
type LanguageOption = {
  code: string;
  name: string;
};

// Only English and Chinese options as requested
const languages: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '简体中文' },
];

// Create a context for language translation
interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}

const defaultLanguage = 'en';

// Create translations object with English and Chinese translations
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'home': 'Home',
    'lobby': 'Game Lobby',
    'seedao': 'SeeDAO',
    'rules': 'Game Rules',
    'game_rules': 'Game Rules',
    'signin': 'Sign In',
    'signout': 'Sign Out',
    'signup': 'Sign Up',
    'navbar_title': 'Old With New Werewolf',
    'navbar_subtitle': 'A social game that makes learning no longer boring.',
    
    // Home Page
    'welcome': 'Welcome to the Werewolf Social Learning',
    'subtitle': 'Join our community where learning becomes a thrilling adventure through the classic game of Werewolf combined with interactive quizzes.',
    'start_game': 'Start Game',
    'community_integration': 'Community Integration',
    'community_desc': 'Combine Werewolf gameplay with quiz Q&A to provide a channel for new community members to quickly integrate and bond with existing members.',
    'ai_knowledge': 'AI Knowledge System',
    'ai_knowledge_desc': 'Leverage our AI knowledge base to generate questions and provide contextual within the game environment.',
    'ai_participants': 'AI Participants',
    'ai_participants_desc': 'Never wait for players again! Our AI Players and AI Judge allow you to start a game immediately, even with fewer human participants.',
    
    // Game Lobby
    'player_profile': 'Player Profile',
    'level': 'Level',
    'games': 'Games',
    'wins': 'Wins',
    'game_rooms': 'Game Rooms',
    'create_room': 'Create Room',
    'ai_settings': 'AI Settings',
    'available_rooms': 'Available Game Rooms',
    'join_existing': 'Join an existing room to start playing',
    'room_name': 'Room Name',
    'max_players': 'Maximum Players',
    'private_room': 'Private Room (Invitation Only)',
    'include_ai': 'Include AI Players',
    'ai_count': 'Number of AI Players',
    
    // Footer
    'footer_tagline': 'Gamified Learning for Communities',
    'footer_copyright': '2025 Old With New Werewolf',
    
    // Misc
    'host': 'Host',
    'join': 'Join',
    'create': 'Create',
    'private': 'Private',

    // Auth/Login
    'auth_title': 'Authentication',
    'auth_desc': 'Sign in to access your account or create a new one',
    'email': 'Email',
    'password': 'Password',
    'player_id': 'Player ID',
    'confirm_password': 'Confirm Password',
    'login_failed': 'Login failed',
    'login_success': 'Login successful!',
    'login_success_desc': 'Welcome to Werewolf Social Learning',
    'registration_failed': 'Registration failed',
    'registration_success': 'Registration successful!',
    'registration_success_desc': 'Welcome to Werewolf Social Learning! You can now create and join rooms.',
    'password_mismatch': 'Password mismatch',
    'password_mismatch_desc': 'Please make sure your passwords match',
    'player_id_required': 'Player ID required',
    'player_id_required_desc': 'Please enter a Player ID',
    'player_id_taken': 'Player ID taken',
    'player_id_taken_desc': 'This Player ID is already in use. Please choose a different one.',
    'logout_failed': 'Logout failed',
    'logout_success': 'Logged out',
    'logout_success_desc': 'You have been successfully logged out',
    'unexpected_error': 'An unexpected error occurred',
    'creating_account': 'Creating account...',
    'signing_in': 'Signing in...',
    'placeholder_email': 'your@email.com',
    'placeholder_player_id': 'Choose a unique player ID',
    'placeholder_password': 'Enter your password',
    'placeholder_confirm_password': 'Confirm your password',
  },
  zh: {
    // Navigation
    'home': '首页',
    'lobby': '游戏大厅',
    'seedao': 'SeeDAO',
    'rules': '游戏规则',
    'game_rules': '游戏规则',
    'signin': '登录',
    'signout': '退出',
    'signup': '注册',
    'navbar_title': '新旧狼人杀',
    'navbar_subtitle': '让学习不再枯燥的社交游戏。',
    
    // Home Page
    'welcome': '欢迎来到新旧狼人杀',
    'subtitle': '加入我们的社区，通过经典的狼人杀游戏和互动问答，让学习变成一场惊险刺激的冒险。',
    'start_game': '开始游戏',
    'community_integration': '社区融合',
    'community_desc': '将狼人杀游戏与问答相结合，为新社区成员提供快速融入和与现有成员建立联系的渠道。',
    'ai_knowledge': 'AI知识系统',
    'ai_knowledge_desc': '利用我们的AI知识库在游戏环境中生成问题并提供背景知识。',
    'ai_participants': 'AI参与者',
    'ai_participants_desc': '再也不用等待玩家！我们的AI玩家和AI评委让您即使在人类参与者较少的情况下也能立即开始游戏。',
    
    // Game Lobby
    'player_profile': '玩家档案',
    'level': '等级',
    'games': '游戏',
    'wins': '胜利',
    'game_rooms': '游戏房间',
    'create_room': '创建房间',
    'ai_settings': 'AI设置',
    'available_rooms': '可用游戏房间',
    'join_existing': '加入现有房间开始游戏',
    'room_name': '房间名称',
    'max_players': '最大玩家数',
    'private_room': '私人房间（仅限邀请）',
    'include_ai': '包含AI玩家',
    'ai_count': 'AI玩家数量',
    
    // Footer
    'footer_tagline': '为社区提供游戏化学习',
    'footer_copyright': '2025 新旧狼人杀',
    
    // Misc
    'host': '主持人',
    'join': '加入',
    'create': '创建',
    'private': '私人',

    // Auth/Login
    'auth_title': '身份验证',
    'auth_desc': '登录以访问您的账户或创建新账户',
    'email': '邮箱',
    'password': '密码',
    'player_id': '玩家ID',
    'confirm_password': '确认密码',
    'login_failed': '登录失败',
    'login_success': '登录成功！',
    'login_success_desc': '欢迎来到新旧狼人杀',
    'registration_failed': '注册失败',
    'registration_success': '注册成功！',
    'registration_success_desc': '欢迎来到新旧狼人杀！您现在可以创建和加入房间。',
    'password_mismatch': '两次密码不一致',
    'password_mismatch_desc': '请确保两次输入的密码一致',
    'player_id_required': '需要玩家ID',
    'player_id_required_desc': '请输入玩家ID',
    'player_id_taken': '玩家ID已被占用',
    'player_id_taken_desc': '该玩家ID已被使用，请换一个。',
    'logout_failed': '退出失败',
    'logout_success': '已退出登录',
    'logout_success_desc': '您已成功退出登录',
    'unexpected_error': '发生未知错误',
    'creating_account': '正在创建账户...',
    'signing_in': '正在登录...',
    'placeholder_email': '请输入邮箱',
    'placeholder_player_id': '请输入唯一玩家ID',
    'placeholder_password': '请输入密码',
    'placeholder_confirm_password': '请再次输入密码',
  }
};

// Create the Language Context
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
});

// Export the hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

// Create the Language Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(localStorage.getItem('language') || defaultLanguage);

  // Set language and store in localStorage
  const setLanguage = (code: string) => {
    setLanguageState(code);
    localStorage.setItem('language', code);
  };

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Translate function
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// The LanguageSwitcher component
const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    console.log(`Language changed to ${languageCode}`);
  };

  // Get current language object
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="nav-link flex items-center">
          <Languages size={20} className="mr-1" />
          <span>{currentLanguage.name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 bg-werewolf-card border-werewolf-purple/30">
        <div className="space-y-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.code === language && (
                <Check size={16} className="mr-2 text-werewolf-purple" />
              )}
              {lang.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
