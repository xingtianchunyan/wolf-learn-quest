import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Settings, Save } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface GameSettingsPanelProps {
  roomId: string;
}

const GameSettingsPanel: React.FC<GameSettingsPanelProps> = ({ roomId }) => {
  const { t } = useLanguage();
  const { gameSettings, updateGameSettings } = useGameState(roomId);
  const { toast } = useToast();
  const [localSettings, setLocalSettings] = useState(gameSettings);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setLocalSettings(gameSettings);
  }, [gameSettings]);

  const handleSave = async () => {
    if (!localSettings) return;

    setSaving(true);
    try {
      const success = await updateGameSettings({
        isAutoAdvance: localSettings.isAutoAdvance,
        dayDuration: localSettings.dayDuration,
        eveningDuration: localSettings.eveningDuration,
        nightDuration: localSettings.nightDuration,
        dawnDuration: localSettings.dawnDuration,
      });

      if (success) {
        toast({
          title: t('gameComponent.settings.saveSuccessTitle'),
          description: t('gameComponent.settings.saveSuccessDesc'),
        });
      } else {
        toast({
          title: t('gameComponent.settings.saveFailedTitle'),
          description: t('gameComponent.settings.saveFailedDesc'),
          variant: 'destructive',
        });
      }
    } finally {
      setSaving(false);
    }
  };

  if (!localSettings) {
    return (
      <Card className='bg-werewolf-card border-werewolf-purple/30'>
        <CardHeader>
          <CardTitle className='text-werewolf-purple flex items-center'>
            <Settings className='h-5 w-5 mr-2' />
            {t('gameComponent.settings.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center text-gray-400'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto mb-2'></div>
            {t('gameComponent.settings.loading')}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='bg-werewolf-card border-werewolf-purple/30'>
      <CardHeader>
        <CardTitle className='text-werewolf-purple flex items-center'>
          <Settings className='h-5 w-5 mr-2' />
          {t('gameComponent.settings.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Auto Advance Toggle */}
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <Label htmlFor='auto-advance'>
              {t('gameComponent.settings.autoAdvance')}
            </Label>
            <p className='text-xs text-gray-400'>
              {t('gameComponent.settings.autoAdvanceDescription')}
            </p>
          </div>
          <Switch
            id='auto-advance'
            checked={localSettings.isAutoAdvance}
            onCheckedChange={checked =>
              setLocalSettings(prev =>
                prev ? { ...prev, isAutoAdvance: checked } : null
              )
            }
          />
        </div>

        {/* Phase Duration Settings */}
        <div className='space-y-4'>
          <h4 className='text-sm font-semibold text-werewolf-purple'>
            {t('gameComponent.settings.durationTitle')}
          </h4>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='day-duration'>{t('game.phase.day')}</Label>
              <Input
                id='day-duration'
                type='number'
                min='60'
                max='1800'
                value={localSettings.dayDuration}
                onChange={e =>
                  setLocalSettings(prev =>
                    prev
                      ? {
                          ...prev,
                          dayDuration: parseInt(e.target.value) || 300,
                        }
                      : null
                  )
                }
                className='bg-werewolf-dark/40 border-werewolf-purple/30'
              />
              <p className='text-xs text-gray-400'>
                {t('common.duration_minutes_seconds', {
                  min: Math.floor(localSettings.dayDuration / 60),
                  sec: localSettings.dayDuration % 60,
                })}
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='night-duration'>{t('game.phase.night')}</Label>
              <Input
                id='night-duration'
                type='number'
                min='60'
                max='1800'
                value={localSettings.nightDuration}
                onChange={e =>
                  setLocalSettings(prev =>
                    prev
                      ? {
                          ...prev,
                          nightDuration: parseInt(e.target.value) || 180,
                        }
                      : null
                  )
                }
                className='bg-werewolf-dark/40 border-werewolf-purple/30'
              />
              <p className='text-xs text-gray-400'>
                {t('common.duration_minutes_seconds', {
                  min: Math.floor(localSettings.nightDuration / 60),
                  sec: localSettings.nightDuration % 60,
                })}
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='evening-duration'>
                {t('game.phase.evening')}
              </Label>
              <Input
                id='evening-duration'
                type='number'
                min='10'
                max='300'
                value={localSettings.eveningDuration}
                onChange={e =>
                  setLocalSettings(prev =>
                    prev
                      ? {
                          ...prev,
                          eveningDuration: parseInt(e.target.value) || 40,
                        }
                      : null
                  )
                }
                className='bg-werewolf-dark/40 border-werewolf-purple/30'
              />
              <p className='text-xs text-gray-400'>
                {t('common.seconds', {
                  seconds: localSettings.eveningDuration,
                })}{' '}
                {t('gameComponent.settings.answerSuffix')}
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='dawn-duration'>{t('game.phase.dawn')}</Label>
              <Input
                id='dawn-duration'
                type='number'
                min='10'
                max='300'
                value={localSettings.dawnDuration}
                onChange={e =>
                  setLocalSettings(prev =>
                    prev
                      ? {
                          ...prev,
                          dawnDuration: parseInt(e.target.value) || 40,
                        }
                      : null
                  )
                }
                className='bg-werewolf-dark/40 border-werewolf-purple/30'
              />
              <p className='text-xs text-gray-400'>
                {t('common.seconds', { seconds: localSettings.dawnDuration })}{' '}
                {t('gameComponent.settings.answerSuffix')}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={saving}
          className='w-full bg-werewolf-purple hover:bg-werewolf-light'
        >
          <Save className='h-4 w-4 mr-2' />
          {saving ? t('common.saving') : t('gameComponent.settings.save')}
        </Button>

        {/* Info */}
        <div className='p-3 bg-werewolf-dark/20 rounded-md'>
          <p className='text-xs text-gray-400'>
            ⚠️ {t('gameComponent.settings.settingsNote')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameSettingsPanel;
