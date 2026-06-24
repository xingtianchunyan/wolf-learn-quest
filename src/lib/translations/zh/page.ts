export const page = {
  game: {
    login_required: '请先登录以访问游戏',
    room_id_missing: '房间ID不存在',
    checking_permissions: '检查权限中...',
    not_participant: '您不是此房间的参与者',
    main_title: '游戏主界面',
    waiting_for_start: '等待游戏开始...',
    chat_title: '游戏聊天',
  },
  gameRoom: {
    cannot_ready: '无法准备',
    waiting_for_players: '需要等待房间人数达到{count}人',
    waiting_for_all_roles: '需要等待所有玩家选择角色',
    select_character_before_ready: '请先选择角色才能进入准备状态',
    cancel_ready_before_change: '请先取消准备状态才能更换角色',
    failed_to_update_status: '更新状态失败',
    cannot_change_character: '无法更换角色',
    max_players_set_to: '最大玩家数设置为{count}',
    roles_reset: '角色选择已重置',
    roles_reset_reason: '由于最大玩家数变化，所有角色选择已重置',
  },
  judge: {
    login_required: '请先登录以访问法官页面',
    room_id_missing: '房间ID不存在',
    checking_permissions: '检查权限中...',
    not_judge: '您不是此房间的法官',
    chat_title: '法官聊天',
  },
  navbar: {
    admin: '管理员',
  },
  roomList: {
    has_judge: '已有法官',
    ai_judge: 'AI法官',
  },
  avatarUpload: {
    image_file_required: '请选择图片文件',
    image_size_limit: '图片大小不能超过1MB',
  },
  playerInfo: {
    default_name: '玩家',
  },
  admin: {
    unauthorized: '未授权',
    please_sign_in_as_admin: '请以管理员身份登录',
    email_confirmed: '邮箱已确认',
    confirmed: '已确认',
    unconfirmed: '未确认',
  },
};

export type PageTranslations = typeof page;
