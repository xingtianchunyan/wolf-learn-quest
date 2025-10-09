import React, { createContext, useContext, useState, useEffect } from 'react';
import { Monitor, Moon, Sun, Volume2, VolumeX, Keyboard, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface AccessibilitySettings {
  // 视觉设置
  theme: 'light' | 'dark' | 'high-contrast' | 'auto';
  fontSize: number;
  reducedMotion: boolean;
  
  // 听觉设置
  soundEnabled: boolean;
  soundVolume: number;
  voiceAnnouncements: boolean;
  
  // 交互设置
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  clickAreas: 'normal' | 'large' | 'extra-large';
  
  // 认知辅助
  gameInstructions: boolean;
  tooltipsEnabled: boolean;
  confirmActions: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  announceText: (text: string) => void;
  isHighContrast: boolean;
}

const defaultSettings: AccessibilitySettings = {
  theme: 'auto',
  fontSize: 16,
  reducedMotion: false,
  soundEnabled: true,
  soundVolume: 70,
  voiceAnnouncements: false,
  keyboardNavigation: true,
  focusIndicators: true,
  clickAreas: 'normal',
  gameInstructions: true,
  tooltipsEnabled: true,
  confirmActions: false
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const announceText = (text: string) => {
    if (settings.voiceAnnouncements && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = settings.soundVolume / 100;
      speechSynthesis.speak(utterance);
    }
  };

  const isHighContrast = settings.theme === 'high-contrast';

  // 应用主题设置
  useEffect(() => {
    const root = document.documentElement;
    
    // 主题设置
    if (settings.theme === 'high-contrast') {
      root.classList.add('high-contrast');
      root.classList.remove('dark');
    } else if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('high-contrast');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark', 'high-contrast');
    } else {
      // auto theme
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (darkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      root.classList.remove('high-contrast');
    }

    // 字体大小
    root.style.fontSize = `${settings.fontSize}px`;

    // 动画设置
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // 焦点指示器
    if (settings.focusIndicators) {
      root.classList.add('focus-indicators');
    } else {
      root.classList.remove('focus-indicators');
    }

    // 点击区域大小
    root.classList.remove('large-click-areas', 'extra-large-click-areas');
    if (settings.clickAreas === 'large') {
      root.classList.add('large-click-areas');
    } else if (settings.clickAreas === 'extra-large') {
      root.classList.add('extra-large-click-areas');
    }
  }, [settings]);

  // 键盘导航
  useEffect(() => {
    if (settings.keyboardNavigation) {
      const handleKeyDown = (event: KeyboardEvent) => {
        // Tab 键导航增强
        if (event.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
        
        // 快捷键支持
        if (event.ctrlKey || event.metaKey) {
          switch (event.key) {
            case '1':
              event.preventDefault();
              announceText('跳转到主要内容区域');
              const main = document.querySelector('[role="main"]');
              if (main) (main as HTMLElement).focus();
              break;
            case '2':
              event.preventDefault();
              announceText('跳转到导航区域');
              const nav = document.querySelector('[role="navigation"]');
              if (nav) (nav as HTMLElement).focus();
              break;
            case '/':
              event.preventDefault();
              announceText('显示快捷键帮助');
              // 可以触发快捷键帮助弹窗
              break;
          }
        }
      };

      const handleMouseDown = () => {
        document.body.classList.remove('keyboard-navigation');
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleMouseDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [settings.keyboardNavigation, announceText]);

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSetting,
      announceText,
      isHighContrast
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

interface AccessibilityControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityControlPanel: React.FC<AccessibilityControlPanelProps> = ({
  isOpen,
  onClose
}) => {
  const { settings, updateSetting } = useAccessibility();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                无障碍设置
              </CardTitle>
              <Button variant="ghost" onClick={onClose}>×</Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* 视觉设置 */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                视觉设置
              </h3>
              
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">主题</label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value: AccessibilitySettings['theme']) => 
                      updateSetting('theme', value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">自动</SelectItem>
                      <SelectItem value="light">浅色</SelectItem>
                      <SelectItem value="dark">深色</SelectItem>
                      <SelectItem value="high-contrast">高对比度</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">字体大小: {settings.fontSize}px</label>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={(value) => updateSetting('fontSize', value[0])}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">减少动画</label>
                  <Switch
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                  />
                </div>
              </div>
            </div>

            {/* 听觉设置 */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                听觉设置
              </h3>
              
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">启用声音</label>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
                  />
                </div>

                {settings.soundEnabled && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">音量: {settings.soundVolume}%</label>
                    <Slider
                      value={[settings.soundVolume]}
                      onValueChange={(value) => updateSetting('soundVolume', value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">语音播报</label>
                  <Switch
                    checked={settings.voiceAnnouncements}
                    onCheckedChange={(checked) => updateSetting('voiceAnnouncements', checked)}
                  />
                </div>
              </div>
            </div>

            {/* 交互设置 */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Keyboard className="w-4 h-4" />
                交互设置
              </h3>
              
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">键盘导航</label>
                  <Switch
                    checked={settings.keyboardNavigation}
                    onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">焦点指示器</label>
                  <Switch
                    checked={settings.focusIndicators}
                    onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">点击区域</label>
                  <Select
                    value={settings.clickAreas}
                    onValueChange={(value: AccessibilitySettings['clickAreas']) => 
                      updateSetting('clickAreas', value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">正常</SelectItem>
                      <SelectItem value="large">大</SelectItem>
                      <SelectItem value="extra-large">特大</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 认知辅助 */}
            <div className="space-y-4">
              <h3 className="font-semibold">认知辅助</h3>
              
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">游戏说明</label>
                  <Switch
                    checked={settings.gameInstructions}
                    onCheckedChange={(checked) => updateSetting('gameInstructions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">工具提示</label>
                  <Switch
                    checked={settings.tooltipsEnabled}
                    onCheckedChange={(checked) => updateSetting('tooltipsEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">操作确认</label>
                  <Switch
                    checked={settings.confirmActions}
                    onCheckedChange={(checked) => updateSetting('confirmActions', checked)}
                  />
                </div>
              </div>
            </div>

            {/* 快捷键说明 */}
            {settings.keyboardNavigation && (
              <div className="space-y-4">
                <h3 className="font-semibold">快捷键</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>跳转到主要内容</span>
                    <Badge variant="outline">Ctrl + 1</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>跳转到导航</span>
                    <Badge variant="outline">Ctrl + 2</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>显示帮助</span>
                    <Badge variant="outline">Ctrl + /</Badge>
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