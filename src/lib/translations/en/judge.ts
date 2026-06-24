export const judge = {
  actionPanel: {
    title: 'Judge Actions',
    updateQuestions: 'Update Questions',
    preparationPhase: 'Preparation Phase',
    quitJudge: 'Stop Playing Judge',
    nextPhase: 'Enter Next Phase',
    resumeGame: 'Resume Game',
    pauseGame: 'Pause Game',
    endGame: 'End Game',
    gameSettlement: 'Game Settlement',
    activeGameHint: 'Game in progress, some features are disabled',
    toast: {
      updateSuccess: {
        title: 'Questions Updated',
        description: 'Question information has been reloaded',
      },
      updateError: {
        title: 'Failed to Update Questions',
      },
      cannotQuit: {
        title: 'Cannot Quit',
        description:
          'Cannot stop playing judge while the game is in progress. Please end the game first.',
      },
      quitError: {
        title: 'Failed to Quit Judge',
      },
      quitErrorGeneric: {
        title: 'Error Quitting Judge',
      },
    },
  },
  preparation: {
    title: 'Preparation Phase Management',
    startGame: 'Start Game',
    startingGame: 'Starting Game...',
    toast: {
      cannotStart: {
        title: 'Cannot Start Game',
        description: 'Please make sure all players are ready',
      },
      started: {
        title: 'Game Started',
        description:
          'The game has started successfully. Players will automatically jump to the game page.',
      },
      startFailed: {
        title: 'Failed to Start Game',
      },
      startError: {
        title: 'Error Starting Game',
      },
    },
  },
  questionBank: {
    panel: {
      title: 'Question Bank (Silicon AI)',
    },
    dialog: {
      title: 'Question Bank Management',
    },
    tabs: {
      generated: 'Generated Questions',
      manual: 'Manual Questions',
      order: 'Question Order',
    },
    source: {
      title: 'Question Sources',
      manual: 'Manual',
      randomSelectAll: 'Random Select All',
      clearAll: 'Clear All',
      selectAllSource: 'Select All from This Source',
      empty: 'No question sources',
      count: '{count} questions',
    },
    preview: {
      title: 'Question Preview',
      selectedCount: 'Selected {count}/18 questions',
      empty: 'No questions',
      questionLabel: 'Question {index}',
      stemLabel: 'Question Stem:',
      optionsLabel: 'Options:',
      explanationLabel: 'Explanation:',
      sourceLabel: 'Source:',
      correctAnswer: '✓ Correct Answer',
    },
    order: {
      title: 'Selected Question Order',
      updateSystem: 'Update Teacher System',
      linkSystem: 'Link Teacher System',
      selectedCount: 'Selected {count}/18 questions - Drag to reorder',
      empty:
        'Please select questions on the "Generated Questions" page first',
    },
    manual: {
      stemLabel: 'Question Stem',
      stemPlaceholder: 'Enter question content...',
      difficultyLabel: 'Difficulty',
      optionA: 'Option A',
      optionB: 'Option B',
      optionC: 'Option C (Optional)',
      optionD: 'Option D (Optional)',
      optionPlaceholder: 'Option {option} content (optional)',
      explanationLabel: 'Explanation',
      explanationPlaceholder: 'Enter question explanation (optional)...',
      submit: 'Submit Question',
    },
    uploadFile: 'Upload File',
    preprocess: 'AI Preprocess',
    generate: 'AI Generate Questions',
    selectUploaded: 'Select uploaded file',
    selectPreprocessed: 'Select preprocessed file',
    preprocessed: 'Preprocessed',
    generated: 'Questions Generated',
    openBank: 'Open Question Bank',
    tooltip: {
      usageLogic: 'How to Use',
      usageLogicDesc:
        'Upload file → Select uploaded file → AI Preprocess → Select preprocessed file → AI Generate Questions → Open Question Bank',
      fileLimits: 'File Limits',
      formats:
        'Supported formats: TXT, DOC, DOCX, XLS, XLSX, PPTX, MD',
      maxSize: 'File size: up to 10MB',
      contentRequirement:
        'Content must include study materials or knowledge points',
      aiModel: 'AI Model',
      preprocessModel: 'Preprocess: Qwen/Qwen3-30B-A3B',
      generateModel: 'Generate questions: Qwen/Qwen3-30B-A3B',
      contextLength: 'Context length: 128K tokens',
    },
    status: {
      preprocessing: 'Preprocessing file with Qwen2.5-72B...',
      generating: 'Generating questions with Qwen2.5-72B...',
    },
    errors: {
      fetchUploaded: 'Failed to fetch uploaded files: {message}',
      fetchPreprocessed: 'Failed to fetch preprocessed files: {message}',
      fetchUploadedGeneric: 'Error fetching uploaded files',
      fetchPreprocessedGeneric: 'Error fetching preprocessed files',
      invalidFileType: 'Please upload TXT, DOC, DOCX, XLS, XLSX, PPTX or MD files',
      invalidFileTypeTitle: 'Unsupported File Format',
      fileTooLarge: 'File size cannot exceed 10MB',
      fileTooLargeTitle: 'File Too Large',
      duplicateFile: 'This file has already been uploaded',
      duplicateFileTitle: 'Duplicate File',
      fileNotFound: 'Selected file does not exist',
      saveFileInfoFailed: 'Failed to save file information: {message}',
      uploadFailed: 'Upload failed: {message}',
      uploadFailedGeneric: 'File upload failed',
      selectFileToPreprocess: 'Please select a file to preprocess',
      preprocessApiFailed: 'API call failed: {message}',
      preprocessRetry: 'Preprocessing failed, please try again',
      preprocessFailed: 'Preprocessing failed: {message}',
      preprocessFailedGeneric: 'File preprocessing failed',
      selectFileToGenerate: 'Please select a preprocessed file',
      generateApiFailed: 'API call failed: {message}',
      generateFailed: 'Generation failed: {message}',
      generateFailedGeneric: 'Question generation failed',
    },
    toast: {
      fetchError: {
        title: 'Failed to Fetch Questions',
        description: 'Unable to load question data: {message}',
      },
      tooMany: {
        title: 'Too Many Questions Selected',
        description: 'You can select up to 18 questions',
      },
      incomplete: {
        title: 'Incomplete Question Information',
        description:
          'Please fill in the question stem and at least two options',
      },
      addSuccess: {
        title: 'Question Added',
        description:
          'The manually edited question has been added to the bank',
      },
      addError: {
        title: 'Failed to Add Question',
        description: 'Unable to save manually edited question: {message}',
      },
      preprocessComplete: {
        title: 'Preprocessing Complete',
        description: 'File preprocessing is complete and page data has been updated',
      },
      generateComplete: {
        title: 'Question Generation Complete',
        description: 'AI question generation is complete and page data has been updated',
      },
      uploadSuccess: {
        title: 'Upload Successful',
        description: 'File "{name}" has been uploaded successfully',
      },
    },
  },
  playerStatus: {
    title: 'Player Status',
    headers: {
      playerId: 'Player ID',
      role: 'Role',
      onlineStatus: 'Online Status',
      readyStatus: 'Ready Status',
      special: 'Special',
    },
    empty: 'No players',
    noRole: 'Not Selected',
  },
  teacherSystem: {
    title: 'Teacher System - {status}',
    status: {
      preparing: 'Game Preparing',
      active: 'Round {round} - {phase}',
      ended: 'Game Ended',
    },
    timeRemaining: 'Time Remaining: {time}',
    paused: 'Game Paused',
    questionLabel: 'Question',
    optionsLabel: 'Options',
    explanationLabel: 'Answer Explanation',
    empty: {
      gameNotStarted: 'The game has not started, please start the game first',
      notLinked:
        'Please link questions in Preparation Phase Management → Question Bank first',
      gameEnded: 'Game has ended',
      notAnsweringPhase: 'Current phase is not an answering phase',
      questionNotFound:
        'Question for current phase not found, please check question bank and order settings',
    },
  },
  answerRecord: {
    title: 'Answer Records',
    liveUpdate: '(Live Update)',
    gameNotStarted: 'The game has not started',
    notLinked: 'Please link questions in the preparation phase first',
    noRecords: 'No answer records',
    roundPhase: 'Round {round} - {phase}',
    correctAnswer: 'Correct Answer: {option}',
    timeUsed: 'Time Used: {time}',
    timeout: 'Timeout - No Answer',
    waitingAnswer: 'Waiting for answer...',
  },
  gameState: {
    title: 'Game Info',
    waitingPlayer: 'Waiting for player',
    paused: 'Paused',
    inProgress: 'In Progress',
    status: {
      waiting: 'Preparation Phase - Waiting to Start',
      active: 'Round {round} - {phase}',
      ended: 'Game Ended',
    },
    timeRemaining: 'Time Remaining: {time}',
    hint: {
      waitingForJudge: 'Waiting for the judge to start the game',
      ended: 'Game ended, settlement available',
    },
    playerStatusTitle: 'Player Status',
  },
  dying: {
    title: 'Dying Status Management',
    dyingCount: '{count} players dying',
    reason: {
      vote: 'Vote Elimination',
      attack: 'Night Attack',
      unknown: 'Unknown Reason',
    },
    roundPhase: 'Round {round} {phase}',
    resolve: {
      title: 'Choose resolution method:',
      protection: 'Gain Protection (Return to Normal)',
      correct: 'Correct Answer (Weakened)',
      wrong: 'Wrong Answer (Eliminated)',
    },
  },
  skillDashboard: {
    title: 'Skill System Dashboard',
    description: 'Manage and monitor all skill system features',
    chooseGameState:
      'Please select a game state to use the skill system dashboard',
    status: {
      loading: 'Loading...',
      error: 'System abnormal, error rate too high',
      warning: 'Queue backlog, needs handling',
      healthy: 'System running normally',
    },
    stats: {
      totalUses: 'Total Skill Uses',
      activeEffects: 'Active Effects',
      cacheEntries: 'Cache Entries',
      hitRate: 'Cache Hit Rate',
    },
    tabs: {
      overview: 'Overview',
      monitor: 'Performance Monitor',
      progress: 'Execution Progress',
      admin: 'System Admin',
    },
    toast: {
      refreshSuccess: {
        title: 'Data Refreshed',
        description: 'Latest skill system data retrieved',
      },
      refreshFailed: {
        title: 'Failed to Refresh Data',
        description: '{message}',
      },
      cacheCleared: {
        title: 'Cache Cleared',
        description: 'All cached data has been cleared',
      },
    },
  },
  skillOverview: {
    currentActiveSkills: 'Current Active Skills',
    noActiveSkills: 'No active skills',
    roundPhase: 'Round {round} - {phase}',
    executionStatus: {
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
    },
    effectQueue: {
      title: 'Effect Queue Status',
      queued: 'Queued',
      completed: 'Completed',
      conflicts: 'Conflict Resolutions',
    },
    recentActivity: 'Recent Skill Activity',
    noActivity: 'No recent skill activity',
    activityLine: '{date} - Round {round} - {phase}',
  },
  skillProgress: {
    title: 'Skill Execution Progress Tracking',
    description:
      'Real-time display of each step and status of skill execution',
    noExecution: 'No skill execution in progress',
    skillName: {
      werewolf_attack: 'Werewolf Night Attack',
      guard_vigil: 'Guard Vigil',
    },
  },
  skillAdmin: {
    dataManagement: {
      title: 'Data Management',
    },
    refreshData: 'Refresh Data',
    clearCache: 'Clear Cache',
    cacheStats: {
      title: 'Cache Statistics',
      totalSize: 'Cache Entries',
      hitCount: 'Hit Count',
      missCount: 'Miss Count',
      hitRate: 'Hit Rate',
      lastCleanup: 'Last Cleanup',
    },
    judgeOnlyAlert:
      'Some management features are only available to the game judge. Please contact the judge for full permissions.',
    monitor: {
      placeholder: 'Skill System Monitor Panel (To be implemented)',
      gameStateLabel: 'GameState: {id}',
    },
  },
  playerDisplay: {
    noRole: 'No role assigned',
  },
};

export type JudgeTranslations = typeof judge;
