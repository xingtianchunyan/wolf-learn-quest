import React from 'react';
import PageLayout from '@/components/layout/PageLayout';

interface GameRoomLoadingProps {
  message: string;
}

export const GameRoomLoading: React.FC<GameRoomLoadingProps> = ({ message }) => {
  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-werewolf-purple mx-auto mb-4"></div>
            <p className="text-gray-400">{message}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameRoomLoading;
