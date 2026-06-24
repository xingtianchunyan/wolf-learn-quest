import React from 'react';
import {
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Keyboard,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  useAccessibility,
  type AccessibilitySettings,
} from './AccessibilityProvider';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface AccessibilityControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityControlPanel: React.FC<
  AccessibilityControlPanelProps
> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { settings, updateSetting } = useAccessibility();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto'
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='flex items-center gap-2'>
                <Eye className='w-5 h-5' />
                {t('gameComponent.accessibility.title')}
              </CardTitle>
              <Button variant='ghost' onClick={onClose}>
                ×
              </Button>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* 视觉设置 */}
            <div className='space-y-4'>
              <h3 className='font-semibold flex items-center gap-2'>
                <Monitor className='w-4 h-4' />
                {t('gameComponent.accessibility.visualSettings')}
              </h3>

              <div className='grid gap-4'>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.theme')}
                  </label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value: AccessibilitySettings['theme']) =>
                      updateSetting('theme', value)
                    }
                  >
                    <SelectTrigger className='w-32'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='auto'>
                        {t('gameComponent.accessibility.themeAuto')}
                      </SelectItem>
                      <SelectItem value='light'>
                        {t('gameComponent.accessibility.themeLight')}
                      </SelectItem>
                      <SelectItem value='dark'>
                        {t('gameComponent.accessibility.themeDark')}
                      </SelectItem>
                      <SelectItem value='high-contrast'>
                        {t('gameComponent.accessibility.themeHighContrast')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.fontSize', {
                      size: settings.fontSize,
                    })}
                  </label>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={value => updateSetting('fontSize', value[0])}
                    min={12}
                    max={24}
                    step={1}
                    className='w-full'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.reducedMotion')}
                  </label>
                  <Switch
                    checked={settings.reducedMotion}
                    onCheckedChange={checked =>
                      updateSetting('reducedMotion', checked)
                    }
                  />
                </div>
              </div>
            </div>

            {/* 听觉设置 */}
            <div className='space-y-4'>
              <h3 className='font-semibold flex items-center gap-2'>
                <Volume2 className='w-4 h-4' />
                {t('gameComponent.accessibility.audioSettings')}
              </h3>

              <div className='grid gap-4'>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.soundEnabled')}
                  </label>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={checked =>
                      updateSetting('soundEnabled', checked)
                    }
                  />
                </div>

                {settings.soundEnabled && (
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      {t('gameComponent.accessibility.volume', {
                        volume: settings.soundVolume,
                      })}
                    </label>
                    <Slider
                      value={[settings.soundVolume]}
                      onValueChange={value =>
                        updateSetting('soundVolume', value[0])
                      }
                      min={0}
                      max={100}
                      step={5}
                      className='w-full'
                    />
                  </div>
                )}

                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.voiceAnnouncements')}
                  </label>
                  <Switch
                    checked={settings.voiceAnnouncements}
                    onCheckedChange={checked =>
                      updateSetting('voiceAnnouncements', checked)
                    }
                  />
                </div>
              </div>
            </div>

            {/* 交互设置 */}
            <div className='space-y-4'>
              <h3 className='font-semibold flex items-center gap-2'>
                <Keyboard className='w-4 h-4' />
                {t('gameComponent.accessibility.interactionSettings')}
              </h3>

              <div className='grid gap-4'>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.keyboardNavigation')}
                  </label>
                  <Switch
                    checked={settings.keyboardNavigation}
                    onCheckedChange={checked =>
                      updateSetting('keyboardNavigation', checked)
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.focusIndicators')}
                  </label>
                  <Switch
                    checked={settings.focusIndicators}
                    onCheckedChange={checked =>
                      updateSetting('focusIndicators', checked)
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.clickAreas')}
                  </label>
                  <Select
                    value={settings.clickAreas}
                    onValueChange={(
                      value: AccessibilitySettings['clickAreas']
                    ) => updateSetting('clickAreas', value)}
                  >
                    <SelectTrigger className='w-32'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='normal'>
                        {t('gameComponent.accessibility.clickAreaNormal')}
                      </SelectItem>
                      <SelectItem value='large'>
                        {t('gameComponent.accessibility.clickAreaLarge')}
                      </SelectItem>
                      <SelectItem value='extra-large'>
                        {t('gameComponent.accessibility.clickAreaExtraLarge')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 认知辅助 */}
            <div className='space-y-4'>
              <h3 className='font-semibold'>
                {t('gameComponent.accessibility.cognitiveAssist')}
              </h3>

              <div className='grid gap-4'>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.gameInstructions')}
                  </label>
                  <Switch
                    checked={settings.gameInstructions}
                    onCheckedChange={checked =>
                      updateSetting('gameInstructions', checked)
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.tooltipsEnabled')}
                  </label>
                  <Switch
                    checked={settings.tooltipsEnabled}
                    onCheckedChange={checked =>
                      updateSetting('tooltipsEnabled', checked)
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium'>
                    {t('gameComponent.accessibility.confirmActions')}
                  </label>
                  <Switch
                    checked={settings.confirmActions}
                    onCheckedChange={checked =>
                      updateSetting('confirmActions', checked)
                    }
                  />
                </div>
              </div>
            </div>

            {/* 快捷键说明 */}
            {settings.keyboardNavigation && (
              <div className='space-y-4'>
                <h3 className='font-semibold'>
                  {t('gameComponent.accessibility.shortcuts')}
                </h3>
                <div className='grid gap-2 text-sm'>
                  <div className='flex justify-between'>
                    <span>
                      {t('gameComponent.accessibility.skipToMain')}
                    </span>
                    <Badge variant='outline'>Ctrl + 1</Badge>
                  </div>
                  <div className='flex justify-between'>
                    <span>
                      {t('gameComponent.accessibility.skipToNav')}
                    </span>
                    <Badge variant='outline'>Ctrl + 2</Badge>
                  </div>
                  <div className='flex justify-between'>
                    <span>
                      {t('gameComponent.accessibility.showHelp')}
                    </span>
                    <Badge variant='outline'>Ctrl + /</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AccessibilityControlPanel;
