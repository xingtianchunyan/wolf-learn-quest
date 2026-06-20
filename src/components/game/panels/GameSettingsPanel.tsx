import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Settings, Save } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useToast } from '@/hooks/use-toast';

interface GameSettingsPanelProps {
  roomId: string;
}

const GameSettingsPanel: React.FC<GameSettingsPanelProps> = ({ roomId }) => {
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
          title: '设置已保存',
          description: '游戏设置已成功更新',
        });
      } else {
        toast({
          title: '保存失败',
          description: '无法保存游戏设置，请重试',
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
            游戏设置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center text-gray-400'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto mb-2'></div>
            加载设置...
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
          游戏设置
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Auto Advance Toggle */}
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <Label htmlFor='auto-advance'>自动切换阶段</Label>
            <p className='text-xs text-gray-400'>
              开启后白天/夜晚阶段将自动切换
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
            阶段时长设置（秒）
          </h4>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='day-duration'>白天阶段</Label>
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
                {Math.floor(localSettings.dayDuration / 60)}分
                {localSettings.dayDuration % 60}秒
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='night-duration'>夜晚阶段</Label>
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
                {Math.floor(localSettings.nightDuration / 60)}分
                {localSettings.nightDuration % 60}秒
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='evening-duration'>傍晚阶段</Label>
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
                {localSettings.eveningDuration}秒 (答题)
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='dawn-duration'>黎明阶段</Label>
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
                {localSettings.dawnDuration}秒 (答题)
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
          {saving ? '保存中...' : '保存设置'}
        </Button>

        {/* Info */}
        <div className='p-3 bg-werewolf-dark/20 rounded-md'>
          <p className='text-xs text-gray-400'>
            ⚠️ 设置更改将在下次游戏开始时生效。傍晚和黎明阶段始终自动切换。
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameSettingsPanel;
