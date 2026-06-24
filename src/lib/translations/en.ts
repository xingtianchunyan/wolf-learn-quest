export const en = {
  // Navigation
  home: 'Home',
  lobby: 'Game Lobby',
  seedao: 'SeeDAO',
  game_rules: 'Game Rules',
  signin: 'Sign In',
  signout: 'Sign Out',
  signup: 'Sign Up',
  navbar_title: 'Old With New Werewolf',
  navbar_subtitle: 'A social game that makes learning no longer boring.',

  // Home Page
  welcome: 'Welcome to the Werewolf Social Learning',
  subtitle:
    'Join our community where learning becomes a thrilling adventure through the classic game of Werewolf combined with interactive quizzes.',
  start_game: 'Start Game',
  community_integration: 'Community Integration',
  community_desc:
    'Combine Werewolf gameplay with quiz Q&A to provide a channel for new community members to quickly integrate and bond with existing members.',
  ai_knowledge: 'AI Knowledge System',
  ai_knowledge_desc:
    'Leverage our AI knowledge base to generate questions and provide contextual within the game environment.',
  ai_participants: 'AI Participants',
  ai_participants_desc:
    'Never wait for players again! Our AI Players and AI Judge allow you to start a game immediately, even with fewer human participants.',

  // Game Lobby
  level: 'Level',
  wins: 'Wins',
  losses: 'Losses',
  game_rooms: 'Game Rooms',
  create_room: 'Create Room',
  create_ai_judge: 'Create AI Judge Room',
  join_existing: 'Join an existing room to start playing',
  room_id: 'Room ID',
  max_players: 'Max Players',
  status: 'Status',
  judge: 'Judge',
  action: 'Action',
  waiting: 'Waiting',
  started: 'Started',
  full: 'Full',
  play_judge: 'Play as Judge',
  creating: 'Creating...',
  leaving: 'Leaving...',
  leave_room: 'Leave Room',
  return_to_room: 'Return to Room',
  current_room: 'Current Room',
  already_in_room: 'Already in a room',
  leave_first: 'Please leave your current room first',
  auth_required: 'Authentication required',
  sign_in_required: 'Please sign in to create or join game rooms',
  loading: 'Loading...',
  no_rooms: 'No active rooms available. Create a new room to get started!',
  room_created: 'Room created!',
  room_created_desc: 'Room has been created successfully',
  room_join_failed: 'Failed to join room',
  room_leave_failed: 'Failed to leave room',
  room_leave_success: 'Successfully left room',
  room_create_failed: 'Failed to create room',
  room_join_error: 'An error occurred while joining the room',
  room_leave_error: 'An error occurred while leaving the room',
  room_create_error: 'An error occurred while creating the room',
  room_full: 'Room is full',
  room_not_found: 'Room not found',

  // Footer
  footer_tagline: 'Gamified Learning for Communities',
  footer_copyright: '2025 Old With New Werewolf',

  // Misc
  join: 'Join',

  // Auth/Login
  auth_title: 'Authentication',
  auth_desc: 'Sign in to access your account or create a new one',
  email: 'Email',
  password: 'Password',
  player_id: 'Player ID',
  confirm_password: 'Confirm Password',
  login_failed: 'Login failed',
  login_success: 'Login successful!',
  login_success_desc: 'Welcome to Werewolf Social Learning',
  registration_failed: 'Registration failed',
  registration_success: 'Registration successful!',
  registration_success_desc:
    'Welcome to Werewolf Social Learning! You can now create and join rooms.',
  password_mismatch: 'Password mismatch',
  password_mismatch_desc: 'Please make sure your passwords match',
  player_id_required: 'Player ID required',
  player_id_required_desc: 'Please enter a Player ID',
  player_id_taken: 'Player ID taken',
  player_id_taken_desc:
    'This Player ID is already in use. Please choose a different one.',
  logout_failed: 'Logout failed',
  logout_success: 'Logged out',
  logout_success_desc: 'You have been successfully logged out',
  unexpected_error: 'An unexpected error occurred',
  creating_account: 'Creating account...',
  signing_in: 'Signing in...',
  placeholder_email: 'your@email.com',
  placeholder_player_id: 'Choose a unique player ID',
  guest_account_badge: 'Guest Account',
  placeholder_password: 'Enter your password',
  placeholder_confirm_password: 'Confirm your password',
  forgot_password: 'Forgot password?',
  forgot_password_desc:
    'Enter your email and we will send you a password reset link',
  send_reset_link: 'Send reset link',
  sending_reset_link: 'Sending...',
  reset_link_sent: 'Reset link sent',
  reset_link_sent_desc:
    'Please check your email and click the link to reset your password',
  reset_link_failed: 'Failed to send reset link',
  back_to_signin: 'Back to sign in',

  // Game Rules Dialog
  game_rules_title: 'Game Rules',
  game_rules_desc: 'Learn the complete game rules and mechanics',
  tab_win_conditions: 'Win Conditions',
  tab_factions: 'Factions',
  tab_phases: 'Game Phases',
  tab_roles: 'Character Skills',
  tab_status: 'Status',
  tab_info: 'Information',
  win_conditions_title: 'Winning Conditions',
  primary_win_condition: 'Primary Win Condition',
  primary_win_condition_desc:
    'Any character from the same camp survives to the end and eliminates all characters from the opposing camp.',
  werewolf_auto_win: 'Werewolf Auto-Win',
  werewolf_auto_win_desc:
    'When the sum of surviving Werewolf and White Wolf characters equals the number of surviving Good Guys camp characters, the Werewolf camp automatically wins.',
  draw_condition: 'Draw Condition',
  draw_condition_desc:
    'If there is no winner at the end of the predetermined action phase, both sides are considered to have won.',
  factions_title: 'Camp Description',
  good_guys_camp: 'Good Guys Camp',
  werewolf_camp: 'Werewolf Camp',
  villager: 'Villager',
  hunter: 'Hunter',
  witch: 'Witch',
  seer: 'Seer (Prophet)',
  guard: 'Guard',
  werewolf: 'Werewolf',
  white_wolf: 'White Wolf',
  warlock: 'Warlock',
  demon: 'Demon',
  game_phases_title: 'Game Time and Action Phases',
  game_duration: 'Game Duration',
  game_duration_desc:
    'The game begins with Day 1 Evening Quiz and proceeds up to Day 9 Daytime phase - maximum of 24 phases.',
  daily_action_phases: 'Daily Action Phases',
  phase_daytime: 'Phase 1: Daytime',
  phase_evening_quiz: 'Phase 2: Evening Quiz',
  phase_nighttime: 'Phase 3: Nighttime',
  phase_dawn_quiz: 'Phase 4: Dawn Quiz',
  night_action_priority: 'Night Action Priority Order',
  night_action_priority_desc:
    'Villager → Guard → Werewolf → Seer → Demon → Witch → Warlock → White Wolf → Hunter',
  character_skills_title: 'Character Skills',
  role: 'Role',
  skill: 'Skill',
  usages: 'Usages',
  type: 'Type',
  effect: 'Effect',
  special_rules: 'Special Rules',
  special_rules_1:
    'When multiple Werewolf characters use skills simultaneously, it counts as a single attack',
  special_rules_2:
    'A character enters Weakened state when targeted by two different Protection skills',
  player_configurations: 'Player Configurations',
  players: 'Players',
  role_configuration: 'Role Configuration',
  character_status_title: 'Character Status',
  normal_state: 'Normal State',
  normal_state_desc:
    'Can participate in discussions, vote, use skills, be targeted for skills, be targeted for votes, and participate in quizzes. All characters start in Normal state.',
  near_death_state: 'Near-Death State',
  near_death_state_desc:
    'Can use skills, be targeted for skills, and participate in quizzes. Cannot participate in discussions, vote, or be targeted for votes. Entered when attacked while in Normal state. Returns to Normal when protected.',
  weakened_state: 'Weakened State',
  weakened_state_desc:
    'Can participate in discussions, be targeted for skills, be targeted for votes, and answer quizzes. Cannot vote or use skills. Entered from Near-Death by correctly answering Dawn Quiz, or when targeted by two Protection skills. Cannot return to Normal. Eliminated when attacked.',
  elimination_state: 'Elimination State',
  elimination_state_desc:
    'Can only participate in answering quizzes. Cannot participate in discussions, vote, use skills, or be targeted. Entered when voted out, when failing Dawn Quiz while Near-Death, or when attacked while Weakened.',
  info_disclosure_title: 'Information Disclosure',
  info_disclosure_desc:
    'Different roles can see different information at different stages',
  disclosure_phases: 'Disclosure Phases',
  information_scope: 'Information Scope',
  phase_daytime_time: 'Time limit: 5 minutes or all vote completion',
  phase_daytime_desc:
    'Open discussion and voting to eliminate suspected werewolf camp players',
  phase_evening_quiz_time: 'Time limit: 1 minute',
  phase_evening_quiz_desc:
    'All players answer quiz questions to enable night actions',
  phase_nighttime_time: 'Time limit: 3 minutes or all skill decisions',
  phase_nighttime_desc: 'Characters perform night actions in priority order',
  phase_dawn_quiz_time: 'Time limit: 1 minute',
  phase_dawn_quiz_desc:
    'Quiz to exit Near-Death state and enter Weakened state',

  // Character Skills Table
  skill_sleep: 'Sleep',
  skill_dying_shot: 'Dying Shot',
  skill_magic_potion: 'Magic Potion',
  skill_prophecy: 'Prophecy',
  skill_vigil: 'Vigil',
  skill_night_attack: 'Night Attack',
  skill_self_destruct: 'Self-Destruct',
  skill_voodoo: 'Voodoo',
  skill_demon_eye: "Demon's Eye",
  usage_unlimited: 'Unlimited',
  usage_1: '1',
  usage_2: '2',
  type_none: 'None',
  type_attack: 'Attack',
  type_protect: 'Protection',
  type_protect_or_attack: 'Protect or Attack',
  type_view: 'View',
  effect_none: 'None',
  effect_sleep: 'The villager sleeps safely at night with no special ability',
  effect_dying_shot: 'Designate a player to attack before being eliminated',
  effect_magic_potion: 'Designate a player to protect or attack',
  effect_prophecy: "Specify to view one player's camp information",
  effect_vigil:
    'Designate a player (including yourself) to be protected from attacks',
  effect_night_attack: 'Designated attack on one player',
  effect_self_destruct:
    'Designate an attack on a player, eliminating himself and target simultaneously',
  effect_voodoo: 'Designate a player for protection',
  effect_demon_eye: "Specify to view one player's character information",

  // Player Configurations
  player_config_6: '2 Werewolves, 2 Villagers, 1 Seer, 1 Witch',
  player_config_7:
    '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch',
  player_config_8:
    '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock',
  player_config_9:
    '1 Werewolf, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock',
  player_config_10:
    '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard',
  player_config_11:
    '1 Werewolf, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard',
  player_config_12:
    '2 Werewolves, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard',

  // Info Disclosure Table
  info_phases_villager: 'Daytime + Evening + Dawn',
  info_phases_all: 'All',
  info_scope_villager: 'Public Chat + Quiz Questions and Options',
  info_scope_hunter:
    'Public Chat + Own Attack Status + Quiz Questions and Options',
  info_scope_witch:
    'Public Chat + Specific Night Attack Target + Quiz Questions and Options',
  info_scope_seer:
    'Public Chat + Target Camp Information + Quiz Questions and Options',
  info_scope_werewolf:
    'Public Chat + Team Chat + Werewolf/White Wolf Players + Quiz Questions and Options',
  info_scope_warlock:
    'Public Chat + Witch Poison Target + Quiz Questions and Options',
  info_scope_demon:
    'Public Chat + Werewolf/White Wolf Players + Target Role Info + Quiz Questions and Options',

  // Player Info
  player_information: 'Player Information',
  experience: 'Experience',

  // Avatar Upload
  upload_avatar: 'Upload Avatar',
  auth_required_avatar: 'Authentication required',
  auth_required_avatar_desc: 'Please login to upload an avatar',
  upload_failed: 'Upload failed',
  upload_failed_desc: 'Something went wrong. Please try again.',
  profile_update_failed: 'Failed to update profile',
  profile_update_failed_desc:
    "Your avatar was uploaded but we couldn't update your profile",
  avatar_uploaded: 'Avatar uploaded',
  avatar_uploaded_desc: 'Your profile has been updated',

  // Experience Tooltip
  experience_system: 'Experience & Level System',
  level_requirements: 'Level Requirements',
  level_1: 'Level 1: 0-49 XP',
  level_2: 'Level 2: 50-99 XP',
  level_3: 'Level 3: 100-199 XP',
  level_4: 'Level 4: 200+ XP',
  experience_rewards: 'Experience Rewards',
  win_xp: 'Win a game: +50 XP',
  lose_xp: 'Lose a game: +30 XP',

  // Game Room
  room_info: 'Room Information',
  host_player_id: 'Host Player ID',
  auto_close_warning:
    '⚠️ Room will automatically close after 3 minutes without human players',
  room_chat: 'Room Chat',
  loading_room: 'Loading room data...',
  room_id_label: 'Room ID',
  return_to_lobby: 'Return to Lobby',
  error: 'Error',
  error_loading_room: 'Failed to load room data',
  error_updating_players: 'Failed to update max players',
  max_players_updated: 'Max players updated',
  max_players_set: 'Max players set to',
  ai_player_added: 'AI player added',
  ai_player_joined: 'An AI player has joined the game room',
  failed_to_add_ai: 'Failed to add AI player. Please try again later.',
  room_is_full: 'The room has reached the player limit',
  cannot_start_game: 'Cannot start game',
  players_not_ready: 'Some players are not ready',
  select_character: 'Please select a character',
  select_character_desc:
    'Please select a character card before starting the game',
  select_character_first: 'Please select a character first',
  left_room: 'Left room',
  left_room_desc: 'You have left the game room',
  leave_room_failed: 'Failed to leave room',
  you_are_ready: 'You are now ready',
  you_are_not_ready: 'You are no longer ready',

  // Game Room Messages
  not_specified: 'Not specified',

  // Players List
  players_list: 'Players List',
  ai_judge_unavailable: 'AI judge is not available yet',
  ai_judge_unavailable_desc:
    'The complete AI judge flow is still under construction, so only the regular room path is available for now.',
  ai_judge_feature_note:
    'AI judge mode is under development and temporarily unavailable',
  ready: 'Ready',
  not_ready: 'Not Ready',

  // Role Selection
  select_role: 'Select Role',
  current_config: 'Current Configuration',
  players_game: ' Players Game',
  roles: ' Roles',

  // Admin User Management
  admin_access_required: 'Admin Access Required',
  admin_access_required_desc: 'This page is restricted to administrators.',
  admin_access_hint:
    'To grant admin access, set role: admin in the user metadata of your account via Supabase Dashboard.',
  user_management: 'User Management',
  created_at: 'Created At',
  last_sign_in: 'Last Sign In',
  actions: 'Actions',
  never: 'Never',
  no_users_found: 'No users found',
  reset_password: 'Reset Password',
  new_password: 'New Password',
  reset_password_for: 'Set a new password for',
  update_password: 'Update Password',
  confirm_email_status_change: 'Confirm Email Status Change',
  confirm_email_status_change_desc:
    'Are you sure you want to mark this user as',
  mark_as_confirmed: 'confirmed',
  mark_as_unconfirmed: 'unconfirmed',
  cancel: 'Cancel',
  confirm: 'Confirm',
  failed_to_load_users: 'Failed to load users',
  password_updated: 'Password updated',
  password_updated_desc: 'Password has been updated successfully.',
  failed_to_update_password: 'Failed to update password',
  email_confirmation_updated: 'Email confirmation updated',
  email_confirmation_updated_desc:
    'Email confirmation status has been updated.',
  failed_to_update_confirmation_status: 'Failed to update confirmation status',

  // Error Boundary
  page_error: 'Page Error',
  app_component_error: 'Application ',
  component_error_suffix: 'component ',
  encountered_unexpected_error: 'encountered an unexpected error',
  error_details: 'Error Details',
  view_stack_trace: 'View Stack Trace',
  retry: 'Retry',
  recovering: 'Recovering...',
  reset_app: 'Reset Application',
  hide_error_details: 'Hide Error Details',
  show_error_details: 'Show Error Details',
  retry_attempts_notice:
    'Retry attempts exhausted. Please contact technical support if the issue persists.',

  // Chat
  chat: 'Chat',
  loading_chat_history: 'Loading chat history...',
  no_channel_messages: 'No messages in this channel yet',
  send_channel_message: 'Send a message...',
  send: 'Send',
  characters: 'characters',
  channel_public: 'Public',
  channel_team: 'Team',
  channel_judge_private: 'Judge Private',
  channel_system: 'System',
  channel_all: 'All',

  // Not Found
  not_found_title: '404',
  not_found_desc: 'Oops! Page not found',
  return_to_home: 'Return to Home',
};
