export const page = {
  game: {
    login_required: 'Please sign in to access the game',
    room_id_missing: 'Room ID does not exist',
    checking_permissions: 'Checking permissions...',
    not_participant: 'You are not a participant in this room',
    main_title: 'Game Main Screen',
    waiting_for_start: 'Waiting for the game to start...',
    chat_title: 'Game Chat',
  },
  gameRoom: {
    cannot_ready: 'Cannot ready',
    waiting_for_players: 'Need {count} players to start',
    waiting_for_all_roles: 'Waiting for all players to select roles',
    select_character_before_ready: 'Please select a character before readying',
    cancel_ready_before_change:
      'Please cancel ready status before changing character',
    failed_to_update_status: 'Failed to update status',
    cannot_change_character: 'Cannot change character',
    max_players_set_to: 'Max players set to {count}',
    roles_reset: 'Role selections reset',
    roles_reset_reason:
      'All role selections have been reset due to max players change',
  },
  judge: {
    login_required: 'Please sign in to access the judge page',
    room_id_missing: 'Room ID does not exist',
    checking_permissions: 'Checking permissions...',
    not_judge: 'You are not the judge of this room',
    chat_title: 'Judge Chat',
  },
  navbar: {
    admin: 'Admin',
  },
  roomList: {
    has_judge: 'Judge assigned',
    ai_judge: 'AI Judge',
  },
  avatarUpload: {
    image_file_required: 'Please select an image file',
    image_size_limit: 'Image size must not exceed 1MB',
  },
  playerInfo: {
    default_name: 'Player',
  },
  admin: {
    unauthorized: 'Unauthorized',
    please_sign_in_as_admin: 'Please sign in as an administrator',
    email_confirmed: 'Email Confirmed',
    confirmed: 'Confirmed',
    unconfirmed: 'Unconfirmed',
  },
};

export type PageTranslations = typeof page;
