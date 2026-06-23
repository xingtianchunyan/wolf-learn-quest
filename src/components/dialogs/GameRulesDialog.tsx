import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useLanguage } from '../layout/LanguageSwitcher';
import GameRulesContent from './GameRulesContent';

const GameRulesDialog: React.FC<{ trigger?: React.ReactNode }> = ({
  trigger,
}) => {
  const { t } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant='ghost' className='nav-link flex items-center'>
            <span className='hidden sm:inline'>{t('game_rules')}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[900px] md:max-w-[1000px] bg-werewolf-card text-werewolf-text'>
        <DialogHeader>
          <DialogTitle className='text-werewolf-purple'>
            {t('game_rules_title')}
          </DialogTitle>
          <DialogDescription>{t('game_rules_desc')}</DialogDescription>
        </DialogHeader>
        <GameRulesContent />
      </DialogContent>
    </Dialog>
  );
};

export default GameRulesDialog;
