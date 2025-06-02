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

    // Game Rules Dialog
    'game_rules_title': 'Game Rules',
    'game_rules_desc': 'Learn the complete game rules and mechanics',
    'tab_win_conditions': 'Win Conditions',
    'tab_factions': 'Factions',
    'tab_phases': 'Game Phases',
    'tab_roles': 'Character Skills',
    'tab_status': 'Status',
    'tab_info': 'Information',
    'win_conditions_title': 'Winning Conditions',
    'primary_win_condition': 'Primary Win Condition',
    'primary_win_condition_desc': 'Any character from the same camp survives to the end and eliminates all characters from the opposing camp.',
    'werewolf_auto_win': 'Werewolf Auto-Win',
    'werewolf_auto_win_desc': 'When the sum of surviving Werewolf and White Wolf characters equals the number of surviving Good Guys camp characters, the Werewolf camp automatically wins.',
    'draw_condition': 'Draw Condition',
    'draw_condition_desc': 'If there is no winner at the end of the predetermined action phase, both sides are considered to have won.',
    'factions_title': 'Camp Description',
    'good_guys_camp': 'Good Guys Camp',
    'werewolf_camp': 'Werewolf Camp',
    'villagers': 'Villagers',
    'hunter': 'Hunter',
    'witch': 'Witch',
    'seer': 'Seer (Prophet)',
    'guard': 'Guard',
    'game_phases_title': 'Game Time and Action Phases',
    'game_duration': 'Game Duration',
    'game_duration_desc': 'The game begins with Day 1 Evening Quiz and proceeds up to Day 9 Daytime phase - maximum of 24 phases.',
    'daily_action_phases': 'Daily Action Phases',
    'phase_daytime': 'Phase 1: Daytime',
    'phase_evening_quiz': 'Phase 2: Evening Quiz',
    'phase_nighttime': 'Phase 3: Nighttime',
    'phase_dawn_quiz': 'Phase 4: Dawn Quiz',
    'night_action_priority': 'Night Action Priority Order',
    'night_action_priority_desc': 'Villager → Guard → Werewolf → Seer → Demon → Witch → Warlock → White Wolf → Hunter',
    'character_skills_title': 'Character Skills',
    'role': 'Role',
    'skill': 'Skill',
    'usages': 'Usages',
    'type': 'Type',
    'effect': 'Effect',
    'special_rules': 'Special Rules',
    'special_rules_1': 'When multiple Werewolf characters use skills simultaneously, it counts as a single attack',
    'special_rules_2': 'A character enters Weakened state when targeted by two different Protection skills',
    'player_configurations': 'Player Configurations',
    'players': 'Players',
    'role_configuration': 'Role Configuration',
    'character_status_title': 'Character Status',
    'normal_state': 'Normal State',
    'normal_state_desc': 'Can participate in discussions, vote, use skills, be targeted for skills, be targeted for votes, and participate in quizzes. All characters start in Normal state.',
    'near_death_state': 'Near-Death State',
    'near_death_state_desc': 'Can use skills, be targeted for skills, and participate in quizzes. Cannot participate in discussions, vote, or be targeted for votes. Entered when attacked while in Normal state. Returns to Normal when protected.',
    'weakened_state': 'Weakened State',
    'weakened_state_desc': 'Can participate in discussions, be targeted for skills, be targeted for votes, and answer quizzes. Cannot vote or use skills. Entered from Near-Death by correctly answering Dawn Quiz, or when targeted by two Protection skills. Cannot return to Normal. Eliminated when attacked.',
    'elimination_state': 'Elimination State',
    'elimination_state_desc': 'Can only participate in answering quizzes. Cannot participate in discussions, vote, use skills, or be targeted. Entered when voted out, when failing Dawn Quiz while Near-Death, or when attacked while Weakened.',
    'info_disclosure_title': 'Information Disclosure',
    'info_disclosure_desc': 'Different roles can see different information at different stages',
    'disclosure_phases': 'Disclosure Phases',
    'information_scope': 'Information Scope',
    'phase_daytime_time': 'Time limit: 5 minutes or all vote completion',
    'phase_daytime_desc': 'Open discussion and voting to eliminate suspected werewolf camp players',
    'phase_evening_quiz_time': 'Time limit: 1 minute',
    'phase_evening_quiz_desc': 'All players answer quiz questions to enable night actions',
    'phase_nighttime_time': 'Time limit: 3 minutes or all skill decisions',
    'phase_nighttime_desc': 'Characters perform night actions in priority order',
    'phase_dawn_quiz_time': 'Time limit: 1 minute',
    'phase_dawn_quiz_desc': 'Quiz to exit Near-Death state and enter Weakened state',

    // Character Skills Table
    'villager_role': 'Villager',
    'hunter_role': 'Hunter',
    'witch_role': 'Witch',
    'seer_role': 'Seer',
    'guard_role': 'Guard',
    'werewolf_role': 'Werewolf',
    'white_wolf_role': 'White Wolf',
    'warlock_role': 'Warlock',
    'demon_role': 'Demon',
    'skill_sleep': 'Sleep',
    'skill_dying_shot': 'Dying Shot',
    'skill_magic_potion': 'Magic Potion',
    'skill_prophecy': 'Prophecy',
    'skill_vigil': 'Vigil',
    'skill_night_attack': 'Night Attack',
    'skill_self_destruct': 'Self-Destruct',
    'skill_voodoo': 'Voodoo',
    'skill_demon_eye': 'Demon\'s Eye',
    'usage_unlimited': 'Unlimited',
    'usage_1': '1',
    'usage_2': '2',
    'type_none': 'None',
    'type_attack': 'Attack',
    'type_protect': 'Protection',
    'type_protect_or_attack': 'Protect or Attack',
    'type_view': 'View',
    'effect_none': 'None',
    'effect_dying_shot': 'Designate a player to attack before being eliminated',
    'effect_magic_potion': 'Designate a player to protect or attack',
    'effect_prophecy': 'Specify to view one player\'s camp information',
    'effect_vigil': 'Designate a player (including yourself) to be protected from attacks',
    'effect_night_attack': 'Designated attack on one player',
    'effect_self_destruct': 'Designate an attack on a player, eliminating himself and target simultaneously',
    'effect_voodoo': 'Designate a player for protection',
    'effect_demon_eye': 'Specify to view one player\'s character information',

    // Player Configurations
    'player_config_6': '2 Werewolves, 2 Villagers, 1 Seer, 1 Witch',
    'player_config_7': '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch',
    'player_config_8': '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock',
    'player_config_9': '1 Werewolf, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock',
    'player_config_10': '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard',
    'player_config_11': '1 Werewolf, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard',
    'player_config_12': '2 Werewolves, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard',
    
    // Info Disclosure Table
    'info_phases_villager': 'Daytime + Evening + Dawn',
    'info_phases_all': 'All',
    'info_scope_villager': 'Public Chat + Quiz Questions and Options',
    'info_scope_hunter': 'Public Chat + Own Attack Status + Quiz Questions and Options',
    'info_scope_witch': 'Public Chat + Specific Night Attack Target + Quiz Questions and Options',
    'info_scope_seer': 'Public Chat + Target Camp Information + Quiz Questions and Options',
    'info_scope_werewolf': 'Public Chat + Team Chat + Werewolf/White Wolf Players + Quiz Questions and Options',
    'info_scope_warlock': 'Public Chat + Witch Poison Target + Quiz Questions and Options',
    'info_scope_demon': 'Public Chat + Werewolf/White Wolf Players + Target Role Info + Quiz Questions and Options',
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

    // Game Rules Dialog
    'game_rules_title': '游戏规则',
    'game_rules_desc': '了解完整的游戏规则与机制',
    'tab_win_conditions': '胜利条件',
    'tab_factions': '阵营',
    'tab_phases': '游戏阶段',
    'tab_roles': '角色技能',
    'tab_status': '状态',
    'tab_info': '信息',
    'win_conditions_title': '胜利条件',
    'primary_win_condition': '主要胜利条件',
    'primary_win_condition_desc': '同一阵营的角色存活到最后并消灭对方阵营所有角色。',
    'werewolf_auto_win': '狼人自动胜利',
    'werewolf_auto_win_desc': '当存活的狼人和白狼王角色数量等于好人阵营存活角色数量时，狼人阵营自动获胜。',
    'draw_condition': '平局条件',
    'draw_condition_desc': '如果在预定行动阶段结束时没有胜者，则双方都视为获胜。',
    'factions_title': '阵营说明',
    'good_guys_camp': '好人阵营',
    'werewolf_camp': '狼人阵营',
    'villagers': '村民',
    'hunter': '猎人',
    'witch': '女巫',
    'seer': '预言家',
    'guard': '守卫',
    'game_phases_title': '游戏时间与行动阶段',
    'game_duration': '游戏时长',
    'game_duration_desc': '游戏从第1天晚上答题开始，最多进行到第9天白天阶段，共24个阶段。',
    'daily_action_phases': '每日行动阶段',
    'phase_daytime': '阶段1：白天',
    'phase_evening_quiz': '阶段2：晚上答题',
    'phase_nighttime': '阶段3：夜晚',
    'phase_dawn_quiz': '阶段4：黎明答题',
    'night_action_priority': '夜间行动优先顺序',
    'night_action_priority_desc': '村民 → 守卫 → 狼人 → 预言家 → 恶魔 → 女巫 → 暗夜术士 → 白狼王 → 猎人',
    'character_skills_title': '角色技能',
    'role': '角色',
    'skill': '技能',
    'usages': '次数',
    'type': '类型',
    'effect': '效果',
    'special_rules': '特殊规则',
    'special_rules_1': '多个狼人同时使用技能时视为一次攻击',
    'special_rules_2': '被两种保护技能同时作用时进入虚弱状态',
    'player_configurations': '玩家配置',
    'players': '玩家数',
    'role_configuration': '角色配置',
    'character_status_title': '角色状态',
    'normal_state': '正常状态',
    'normal_state_desc': '可参与讨论、投票、使用技能、被技能/投票指定、参与答题。所有角色初始为正常状态。',
    'near_death_state': '濒死状态',
    'near_death_state_desc': '可使用技能、被技能指定、参与答题。不可参与讨论、投票或被投票。被攻击后进入，受保护可恢复正常。',
    'weakened_state': '虚弱状态',
    'weakened_state_desc': '可参与讨论、被技能/投票指定、答题。不可投票或使用技能。答对黎明题或被两种保护技能作用时进入，无法恢复正常，被攻击淘汰。',
    'elimination_state': '淘汰状态',
    'elimination_state_desc': '仅可参与答题，不能讨论、投票、使用技能或被指定。被投票出局、黎明题失败或虚弱时被攻击进入。',
    'info_disclosure_title': '信息公开',
    'info_disclosure_desc': '不同角色在不同阶段可见信息不同',
    'disclosure_phases': '公开阶段',
    'information_scope': '信息范围',
    'phase_daytime_time': '限时5分钟或全部投票完成',
    'phase_daytime_desc': '公开讨论并投票淘汰疑似狼人阵营玩家',
    'phase_evening_quiz_time': '限时1分钟',
    'phase_evening_quiz_desc': '所有玩家答题以开启夜间行动',
    'phase_nighttime_time': '限时3分钟或全部技能决策完成',
    'phase_nighttime_desc': '角色按优先顺序依次进行夜间行动',
    'phase_dawn_quiz_time': '限时1分钟',
    'phase_dawn_quiz_desc': '答题以脱离濒死状态并进入虚弱状态',

    // Character Skills Table
    'villager_role': '村民',
    'hunter_role': '猎人',
    'witch_role': '女巫',
    'seer_role': '预言家',
    'guard_role': '守卫',
    'werewolf_role': '狼人',
    'white_wolf_role': '白狼王',
    'warlock_role': '暗夜术士',
    'demon_role': '恶魔',
    'skill_sleep': '睡觉',
    'skill_dying_shot': '临终一击',
    'skill_magic_potion': '魔药',
    'skill_prophecy': '预言',
    'skill_vigil': '守夜',
    'skill_night_attack': '夜袭',
    'skill_self_destruct': '自爆',
    'skill_voodoo': '巫术',
    'skill_demon_eye': '恶魔之眼',
    'usage_unlimited': '不限',
    'usage_1': '1次',
    'usage_2': '2次',
    'type_none': '无',
    'type_attack': '攻击',
    'type_protect': '保护',
    'type_protect_or_attack': '保护或攻击',
    'type_view': '查看',
    'effect_none': '无',
    'effect_dying_shot': '被淘汰前指定一名玩家进行攻击',
    'effect_magic_potion': '指定一名玩家进行保护或攻击',
    'effect_prophecy': '指定查看一名玩家的阵营信息',
    'effect_vigil': '指定一名玩家（可为自己）免受攻击',
    'effect_night_attack': '指定攻击一名玩家',
    'effect_self_destruct': '指定攻击一名玩家，自身与目标同时淘汰',
    'effect_voodoo': '指定一名玩家进行保护',
    'effect_demon_eye': '指定查看一名玩家的角色信息',

    // Player Configurations
    'player_config_6': '2狼人、2村民、1预言家、1女巫',
    'player_config_7': '1狼人、1白狼王、2村民、1猎人、1预言家、1女巫',
    'player_config_8': '1狼人、1白狼王、2村民、1猎人、1预言家、1女巫、1暗夜术士',
    'player_config_9': '1狼人、1白狼王、3村民、1猎人、1预言家、1女巫、1暗夜术士',
    'player_config_10': '1狼人、1白狼王、2村民、1猎人、1预言家、1女巫、1暗夜术士、1恶魔、1守卫',
    'player_config_11': '1狼人、1白狼王、3村民、1猎人、1预言家、1女巫、1暗夜术士、1恶魔、1守卫',
    'player_config_12': '2狼人、1白狼王、3村民、1猎人、1预言家、1女巫、1暗夜术士、1恶魔、1守卫',
    
    // Info Disclosure Table
    'info_phases_villager': '白天+晚上+黎明',
    'info_phases_all': '全部',
    'info_scope_villager': '公聊+答题及选项',
    'info_scope_hunter': '公聊+自身被攻击状态+答题及选项',
    'info_scope_witch': '公聊+特定夜袭目标+答题及选项',
    'info_scope_seer': '公聊+目标阵营信息+答题及选项',
    'info_scope_werewolf': '公聊+狼队聊+狼人/白狼王玩家+答题及选项',
    'info_scope_warlock': '公聊+女巫毒杀目标+答题及选项',
    'info_scope_demon': '公聊+狼人/白狼王玩家+目标角色信息+答题及选项',
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
