export const hook = {
  error: {
    network: 'Network connection failed. Please check your network settings.',
    unauthorized: 'Permission denied. Please log in again.',
    forbidden: 'No permission to perform this operation.',
    not_found: 'Requested resource not found.',
    internal_server: 'Internal server error, please try again later.',
    bad_request: 'Invalid request parameters.',
    timeout: 'Request timed out, please try again.',
    data_not_found: 'Data does not exist or has been deleted.',
    permission_denied: 'Insufficient permission to access data.',
    auth_required: 'Please log in first.',
    invalid_credentials: 'Incorrect username or password.',
  },

  enhanced: {
    system_error_title: 'System Error',
    system_error_desc:
      'An exception occurred while handling the error. Please refresh the page and try again.',
    network_error_title: 'Network Error',
    network_error_desc: 'Network connection abnormal, please check your network settings.',
    permission_denied_title: 'Permission Denied',
    permission_denied_desc: 'You do not have permission to perform this operation.',
    validation_error_title: 'Input Error',
    validation_error_desc: 'Input data format is incorrect.',
    skill_error_title: 'Skill Use Failed',
    skill_error_desc: 'Skill usage conditions not met or execution failed.',
    retry_success_title: 'Operation Successful',
    retry_success_desc: 'Retry successful, operation completed.',
    fallback_title: 'Switched to Backup Plan',
    fallback_desc: 'Continuing operation using backup plan.',
    refresh_title: 'Data Refreshed',
    refresh_desc: 'Latest data has been reloaded.',
    recovery_failed_title: 'Recovery Failed',
    recovery_failed_desc:
      'Automatic recovery failed, please refresh the page manually.',
    retry_exhausted: 'Operation failed, retried {count} times.',
    component_render_error: 'Component rendering error.',
  },

  game: {
    init_settings_failed: 'Failed to initialize game settings',
    start_failed: 'Failed to start game',
    started_title: 'Game Started',
    started_desc: 'Game has started, entering evening phase.',
    advance_phase_failed: 'Phase transition failed',
    paused_title: 'Game Paused',
    paused_desc: 'Game paused, timer stopped.',
    resumed_title: 'Game Resumed',
    resumed_desc: 'Game resumed, timer continues.',
    pause_failed: 'Pause/Resume failed',
    settings_update_failed: 'Failed to update settings',
    settings_updated: 'Game settings updated',
    end_failed: 'Failed to end game',
    ended_with_archive_error:
      'Game ended, but an error occurred during archiving: {message}',
    ended_title: 'Game Ended',
    ended_desc: 'Game has ended and been archived successfully.',
    end_unknown_error: 'Unknown error occurred while ending game',
    end_reason_judge: 'Judge ended the game',
  },

  lobby: {
    game_room_name: 'Game Room {roomId}',
    sign_in_to_judge: 'Please sign in to play as judge',
    become_judge_failed: 'Failed to become judge',
    judge_taken: 'Another player may have already become the judge',
    join_judge_failed: 'Failed to join as judge',
    join_judge_error: 'An unexpected error occurred',
  },

  vote: {
    session_started_title: 'Voting Started',
    session_started_desc: 'New voting session created.',
    auth_failed_title: 'Authentication Failed',
    sign_in_required: 'Please sign in and try again.',
    not_participant_title: 'Permission Denied',
    not_participant_desc:
      'You are not a room participant, cannot create voting session.',
    create_failed_title: 'Failed to Create Voting Session',
    session_created_title: 'Voting Session Created',
    session_created_desc: 'Round {round} day vote has started.',
    cast_success_title: 'Vote Successful',
    cast_voted_desc: 'You have voted successfully.',
    cast_abstain_desc: 'You have abstained.',
    cast_failed_title: 'Vote Failed',
    results_calculated_title: 'Vote Results Calculated',
    results_calculated_desc: 'Vote result statistics completed.',
    calculate_failed_title: 'Failed to Calculate Vote Results',
    result_processed_title: 'Vote Result Processed',
    result_processed_desc: 'Player status has been updated.',
    process_failed_title: 'Failed to Process Vote Result',
    process_error_title: 'Processing Failed',
    process_error_desc: 'Unable to get vote results.',
    no_pending_title: 'No Processing Needed',
    no_pending_desc: 'No pending vote results.',
    all_processed_title: 'Vote Results Processed',
    all_processed_desc:
      'All vote results have been processed according to game rules.',
    partial_failed_title: 'Partial Processing Failed',
    partial_failed_desc:
      'Some vote results encountered errors during processing.',
    process_system_error_title: 'Vote Result Processing Error',
    process_system_error_desc: 'System error, please contact administrator.',
    handle_error_title: 'Vote Processing Error',
    handle_error_desc:
      'Error occurred while calculating or processing vote results.',
  },

  witch: {
    protection_unavailable_title: 'Cannot Use Protection Potion',
    protection_unavailable_desc:
      'Protection potion is unavailable or already used.',
    protection_success_title: 'Protection Potion Used',
    protection_success_desc: 'Antidote used, will save tonight\'s victim.',
    protection_failed_title: 'Protection Potion Failed',
    attack_unavailable_title: 'Cannot Use Attack Potion',
    attack_unavailable_desc: 'Attack potion is unavailable or already used.',
    select_target_title: 'Please Select Target',
    select_target_desc: 'Using attack potion requires selecting a target.',
    attack_success_title: 'Attack Potion Used',
    attack_success_desc: 'Poison used, target will die at end of night.',
    attack_failed_title: 'Attack Potion Failed',
  },

  dying: {
    missing_game_state: 'Game state ID does not exist',
    resolution_protected: 'Gained protection, returned to normal status.',
    resolution_correct: 'Answered correctly, changed to weakened status.',
    resolution_wrong: 'Answered incorrectly, eliminated.',
    update_success_title: 'Status Updated',
    update_success_desc: '{userName}{resolution}',
    update_failed_title: 'Status Update Failed',
  },

  auto_vote: {
    processed_title: 'Vote Results Auto-Processed',
    processed_desc: 'Player status updated according to rules.',
  },

  auto_dying: {
    protection_title: 'Auto-Protection Activated',
    protection_desc: 'Player gained protection, dying status automatically resolved.',
    answer_title: 'Auto-Answer Judgment',
    answer_status_desc: 'Based on answer result, player {status}.',
  },

  skill_validation: {
    missing_context: 'Missing required game state or user information.',
    validation_failed: 'Validation failed, please try again.',
    use_success_title: 'Skill Used Successfully',
    use_success_desc: 'Successfully used skill: {skillName}',
    use_failed_title: 'Skill Use Failed',
    missing_game_state: 'Missing game state information.',
    unavailable: 'Unavailable',
    cannot_use: 'Cannot use',
  },

  skill_stats: {
    conflicts_resolved_title: 'Skill Conflicts Resolved',
    conflicts_resolved_desc:
      'Resolved {resolved} skills, cancelled {cancelled} conflicting skills.',
    conflicts_failed_title: 'Conflict Resolution Failed',
    conflicts_failed_desc:
      'Unable to resolve skill conflicts, please contact administrator.',
  },

  skill_data: {
    load_failed_title: 'Data Load Failed',
    load_failed_desc:
      'Unable to get skill system data, please refresh the page.',
  },

  skill_effect: {
    process_error_title: 'Skill Effect Processing Exception',
    process_error_desc:
      'Has failed {count} times in a row, please check system status.',
    manual_success_title: 'Manual Processing Complete',
    manual_success_desc: 'Processed {count} skill effects.',
    manual_failed_title: 'Manual Processing Failed',
    process_success_title: 'Skill Effects Processed',
    process_success_desc: 'Successfully processed {count} skill effects.',
    process_failed_title: 'Skill Effect Processing Failed',
  },

  chat: {
    load_failed_title: 'Failed to Load Chat History',
    send_failed_title: 'Failed to Send Message',
    unauthenticated: 'User not authenticated',
  },

  room_transition: {
    join_failed_title: 'Failed to Enter New Room',
    entered_title: 'Entered New Room',
    entered_desc: 'Please reselect role and get ready.',
    created_title: 'New Room Created',
    created_desc: 'You have entered the judge page for the new round.',
  },

  ux: {
    operation_recorded: 'Operation recorded: {action}',
    cannot_undo_title: 'Cannot Undo',
    cannot_undo_desc: 'This operation does not support undo.',
    undone: 'Undone operation: {action}',
    undo_success_title: 'Operation Undone',
    undo_success_desc: 'Undone: {action}',
    redone: 'Redone operation: {action}',
    redo_success_title: 'Operation Redone',
    redo_success_desc: 'Redone: {action}',
    confirm_message: 'Are you sure you want to {action}?\n\n{message}',
    confirmed: 'Confirmed and executed: {action}',
    critical_failed_title: 'Operation Failed',
    critical_failed_desc: 'Error occurred while executing {action}: {error}',
    cancelled: 'Cancelled operation: {action}',
    loading_detail: 'Executing: {operationId}',
    operation_success_desc: '{operationId} executed successfully',
    operation_failed_desc: '{operationId} execution failed',
    auto_save_success: 'Data auto-saved.',
    auto_save_failed_title: 'Auto-Save Failed',
    auto_save_failed_desc: 'Unable to save data to local storage.',
    read_saved_failed_title: 'Read Saved Data Failed',
    read_saved_failed_desc: 'Unable to read data from local storage.',
    performance_warning_title: 'Performance Warning',
    performance_warning_desc:
      'Page rendering took {time}ms, which may affect user experience.',
    suggestion_pattern_title: 'Based on History',
    suggestion_pattern_desc:
      'You often use "{action}", need a shortcut?',
    suggestion_performance_title: 'Performance Optimization Suggestion',
    suggestion_performance_desc:
      'Page rendering is slow, recommend enabling performance mode.',
    suggestion_error_title: 'High Error Frequency',
    suggestion_error_desc: 'Recommend checking the guide or contacting support.',
  },

  service: {
    enhancedSkill: {
      auth_required: 'User not logged in',
      missing_skill_name: 'Role design missing skill name',
      config_not_found: 'Skill config not found: {skillName}',
      config_missing_reason: 'Skill config not found',
      check_role_design: 'Please check role design configuration',
      check_usage_conditions: 'Please check skill usage conditions',
      usage_conditions_not_met: 'Skill usage conditions not met',
      use_failed: 'Skill use failed: {message}',
      config_not_exist: 'Skill config does not exist',
      network_error: 'Network connection failed',
      conflict_detect_failed: 'Conflict detection failed: {message}',
      potion_validate_failed: 'Potion validation failed: {message}',
      suggestion_elimination:
        'Suggest choosing key targets, prioritize eliminating the biggest threat.',
      suggestion_protection:
        'Suggest protecting important roles, such as Seer or confirmed good players.',
      suggestion_investigation:
        'Suggest investigating suspicious targets to get key information.',
      suggestion_status_change:
        'Suggest using at appropriate timing to change the game situation.',
      suggestion_passive: 'Passive skill, system will trigger automatically.',
      suggestion_default: 'Please use skill reasonably.',
      timing_night: 'Night action phase',
      timing_day: 'Day discussion phase',
      timing_specific: 'Specific phase',
      skill_unavailable: 'Skill unavailable',
      cannot_use: 'Cannot use',
    },

    passiveSkill: {
      demon_passive: 'Demon Passive',
      immunity: 'Immunity',
      demon_immune_reason: 'Demon is immune to werewolf attack',
      multiple_protection: 'Multiple Protection',
      special_judgment: 'Special Judgment',
      eliminated: 'Eliminated',
      multiple_protection_reason: 'Multiple protection led to elimination',
      hunter_broadcast: 'Hunter Death Broadcast',
      conflict_reason: 'Skill conflict, lower priority',
    },

    analytics: {
      high_failure_rate: 'Skill failure rate too high: {rate}%',
      low_activity: '{count} users have low activity',
      slow_response: 'System response is too slow',
    },

    monitoring: {
      response_time_alert: 'Response time too long: {value}ms',
      memory_usage_alert: 'Memory usage too high: {value}MB',
      error_rate_alert: 'Error rate too high: {value}%',
    },
  },
};

export type HookTranslations = typeof hook;
