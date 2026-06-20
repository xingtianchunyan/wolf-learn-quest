import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PlayerInfo from '@/components/lobby/PlayerInfo';
import { LogOut } from 'lucide-react';

interface PlayerInfoPanelProps {
  currentUser: any;
  playerRoom: {
    roomId: string | null;
    roomDbId: string | null;
    isLoading: boolean;
  };
  navigate: (path: string) => void;
  handleLeaveCurrentRoom: () => Promise<void>;
  isLeavingRoom: boolean;
  t: (key: string) => string;
}

const PlayerInfoPanel: React.FC<PlayerInfoPanelProps> = ({
  currentUser,
  playerRoom,
  navigate,
  handleLeaveCurrentRoom,
  isLeavingRoom,
  t,
}) => {
  return (
    <div className='space-y-4'>
      {currentUser ? (
        <>
          <PlayerInfo currentUser={currentUser} />
          {playerRoom.roomDbId && (
            <Card className='bg-amber-900/20 border-amber-700/30'>
              <CardHeader>
                <CardTitle className='text-amber-200 text-sm'>
                  {t('current_room')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-amber-200 text-sm mb-3'>
                  {t('room_id')}: {playerRoom.roomId}
                </p>
                <div className='space-y-2'>
                  <Button
                    onClick={() => navigate(`/room/${playerRoom.roomDbId}`)}
                    className='w-full bg-werewolf-purple hover:bg-werewolf-light'
                    size='sm'
                  >
                    {t('return_to_room')}
                  </Button>
                  <Button
                    onClick={handleLeaveCurrentRoom}
                    variant='outline'
                    className='w-full border-amber-700/30 hover:bg-amber-900/40'
                    size='sm'
                    disabled={isLeavingRoom}
                  >
                    <LogOut className='mr-2 h-3 w-3' />
                    {isLeavingRoom ? t('leaving') : t('leave_room')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className='bg-amber-900/20 border-amber-700/30 h-full'>
          <CardContent className='pt-6 h-full flex items-center justify-center'>
            <p className='text-amber-200 text-center'>
              {t('sign_in_required')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlayerInfoPanel;
