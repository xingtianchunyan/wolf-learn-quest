import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PlayerInfoPanel from '@/components/lobby/PlayerInfoPanel';
import LobbyActionButtons from '@/components/lobby/LobbyActionButtons';
import RoomListTable from '@/components/lobby/RoomListTable';
import { useGameLobby } from '@/hooks/useGameLobby';

const GameLobby = () => {
  const {
    initializing,
    currentUser,
    playerRoom,
    gameRooms,
    isCreatingRoom,
    isCreatingAIRoom,
    isLeavingRoom,
    t,
    navigate,
    handleLeaveCurrentRoom,
    handleCreateRoom,
    handleCreateAIJudge,
    joinRoom,
    playAsJudge,
  } = useGameLobby();

  if (initializing || playerRoom.isLoading) {
    return (
      <PageLayout>
        <div className='container mx-auto py-6 px-4'>
          <div className='flex justify-center items-center h-64'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4'></div>
              <p className='text-gray-400'>{t('loading')}</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className='container mx-auto py-6 px-4'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Player Info or Auth Notice - Left Side */}
          <div className='w-full lg:w-1/4'>
            <PlayerInfoPanel
              currentUser={currentUser}
              playerRoom={playerRoom}
              navigate={navigate}
              handleLeaveCurrentRoom={handleLeaveCurrentRoom}
              isLeavingRoom={isLeavingRoom}
              t={t}
            />
          </div>

          {/* Main Content - Right Side */}
          <div className='w-full lg:w-3/4'>
            <LobbyActionButtons
              handleCreateAIJudge={handleCreateAIJudge}
              handleCreateRoom={handleCreateRoom}
              currentUser={currentUser}
              isCreatingAIRoom={isCreatingAIRoom}
              isCreatingRoom={isCreatingRoom}
              playerRoom={playerRoom}
              t={t}
            />

            <RoomListTable
              gameRooms={gameRooms}
              playerRoom={playerRoom}
              t={t}
              joinRoom={joinRoom}
              playAsJudge={playAsJudge}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameLobby;
