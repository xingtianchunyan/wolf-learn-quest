import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AccessibilitySettings {
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
  confirmActions: false,
};

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      'useAccessibility must be used within AccessibilityProvider'
    );
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings;
  });

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem(
        'accessibility-settings',
        JSON.stringify(newSettings)
      );
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
      const darkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
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
              {
                const main = document.querySelector('[role="main"]');
                if (main) (main as HTMLElement).focus();
              }
              break;
            case '2':
              event.preventDefault();
              announceText('跳转到导航区域');
              {
                const nav = document.querySelector('[role="navigation"]');
                if (nav) (nav as HTMLElement).focus();
              }
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
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        announceText,
        isHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
