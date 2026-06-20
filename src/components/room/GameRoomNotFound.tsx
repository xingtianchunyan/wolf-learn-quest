import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';

interface GameRoomNotFoundProps {
  roomId?: string;
  notSpecifiedText: string;
  returnText: string;
  title: string;
  description: string;
}

export const GameRoomNotFound: React.FC<GameRoomNotFoundProps> = ({
  roomId,
  notSpecifiedText,
  returnText,
  title,
  description
}) => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-400 mb-4">{title}</p>
            <p className="text-sm text-gray-500 mb-4">
              {description}: {roomId || notSpecifiedText}
            </p>
            <Button onClick={() => navigate('/lobby')}>
              {returnText}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GameRoomNotFound;
