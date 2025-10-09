import { JudgePageProvider   } from '@/contexts/JudgePageContext';
import { useAuth   } from '@/providers/AuthProvider';
import { useAutoDyingStatusProcessor   } from '@/hooks/useAutoDyingStatusProcessor';
import { useAutoProcessDayVote   } from '@/hooks/useAutoProcessDayVote';
import { useEveningRefresh   } from '@/hooks/useEveningRefresh';
import { useGameState   } from '@/hooks/useGameState';
import { useParams   } from 'react-router-dom';
import { usePermissions   } from '@/contexts/PermissionContext';
import { useRoomTransition   } from '@/hooks/useRoomTransition';
import AnswerRecordPanel from '@/components/judge/management/AnswerRecordPanel';
import EnhancedGameStateDisplay from '@/components/judge/monitoring/EnhancedGameStateDisplay';
import JudgeActionPanel from '@/components/judge/management/JudgeActionPanel';
import MultiChannelChat from '@/components/chat/MultiChannelChat';
import PageLayout from '@/components/layout/PageLayout';
import React from 'react';
import TeacherSystemPanel from '@/components/judge/management/TeacherSystemPanel';

/**
 * JudgePage组件
 * JudgePage组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const JudgePage = () => { const  { id: roomId  
} = useParams();
  const { currentUser, requireAuth  } = useAuth();
  const { isJudge, isRoomParticipant, loading: permissionsLoading  
} = usePermissions(roomId);
  const { gameState  } = useGameState(roomId || '');
  useAutoProcessDayVote(roomId || '', gameState);
  useEveningRefresh(gameState);
  // 自动处理濒死状态转换
  useAutoDyingStatusProcessor(roomId || '', gameState);
  // 法官端也需要在结束后创建并进入新房间
  useRoomTransition(roomId, gameState?.status);

  // 要求用户登录
  if (!requireAuth()) { return (;
      <PageLayout>
      <div className='container mx-auto py-6 px-4'>;
      <div className='text-center'>;
      <p className='text-gray-400 mb-4'>请先登录以访问法官页面</p>;
      </div>
      </div>
      </PageLayout>
    )
}

  if (!roomId) { return (;
      <PageLayout>
      <div className='container mx-auto py-6 px-4'>;
      <div className='text-center'>;
      <p className='text-gray-400 mb-4'>房间ID不存在</p>;
      </div>
      </div>
      </PageLayout>
    )
}

  // 检查权限加载状态
  if (permissionsLoading) { return (;
      <PageLayout>
      <div className='container mx-auto py-6 px-4'>;
      <div className='text-center'>;
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-2'></div>;
      <p className='text-gray-400 mb-4'>检查权限中...</p>;
      </div>
      </div>
      </PageLayout>
    )
}

  // 检查是否是法官
  if (!isJudge) { return (;
      <PageLayout>
      <div className='container mx-auto py-6 px-4'>;
      <div className='text-center'>;
      <p className='text-gray-400 mb-4'>您不是此房间的法官</p>;
      </div>
      </div>
      </PageLayout>
    )
}

  return (;
    <JudgePageProvider roomId={ roomId }>;
    <PageLayout>
    <div className='container mx-auto py-4 px-4 h-screen'>;
    { /*  Main Content Grid - 固定高度，避免内容溢出  */ }
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 h-full'>;
    { /*  Left Column - Teacher System and Answer Records  */ }
    <div className='lg:col-span-3 flex flex-col gap-4 h-full'>;
    <div className='h-1/2 min-h-0'>;
    <TeacherSystemPanel roomId={ roomId } />;
    </div>
    <div className='h-1/2 min-h-0'>;
    <AnswerRecordPanel roomId={ roomId } />;
    </div>
    </div>

    { /*  Center Column - Game State and Judge Actions  */ }
    <div className='lg:col-span-6 flex flex-col gap-4 h-full'>;
    <div className='h-1/2 min-h-0'>;
    <EnhancedGameStateDisplay roomId={ roomId } />;
    </div>
    <div className='h-1/2 min-h-0'>;
    <JudgeActionPanel roomId={ roomId } />;
    </div>
    </div>

    { /*  Right Column - Chat  */ }
    <div className='lg:col-span-3 h-full min-h-0'>;
    <MultiChannelChat
    roomId={ roomId }
    currentUser={ currentUser }
    isGameRoom={ false }
    title='法官聊天';
    className='h-full';
    height='100%';
    />
    </div>
    </div>
    </div>
    </PageLayout>
    </JudgePageProvider>
  )
};

/**
 * JudgePage组件
 * JudgePage组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default JudgePage;
