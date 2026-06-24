import React, { useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface RoleCardFogOverlayProps {
  /** 是否显示雾层 */
  isActive: boolean;
  /** 是否启用呼吸波动动画 */
  isBreathing?: boolean;
  /** 用于生成确定性随机延迟和唯一 filter id 的种子 */
  seed: string;
}

/**
 * 角色卡片团雾覆盖层
 * - 使用深灰色完全不透明背景完全遮盖底层角色卡片
 * - SVG feTurbulence 仅作为极淡的纹理叠加，避免脏污感
 * - 呼吸动画通过 scale + brightness 实现（不透明层无法使用 opacity 波动）
 * - 支持 prefers-reduced-motion
 */
export const RoleCardFogOverlay: React.FC<RoleCardFogOverlayProps> = ({
  isActive,
  isBreathing = false,
  seed,
}) => {
  const { t } = useLanguage();

  const { filterId, delay } = useMemo(() => {
    let hash = 0;
    const base = seed || 'default';
    for (let i = 0; i < base.length; i++) {
      const char = base.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const positiveHash = Math.abs(hash);
    return {
      filterId: `fog-noise-${positiveHash}`,
      delay: (positiveHash % 3000) / 1000,
    };
  }, [seed]);

  if (!isActive) return null;

  return (
    <div
      className='absolute inset-0 z-20 pointer-events-none rounded-lg overflow-hidden'
      aria-hidden='true'
    >
      {/* SVG 噪点纹理定义（极淡，仅增加雾的颗粒感，不做位移扭曲） */}
      <svg className='absolute w-0 h-0'>
        <defs>
          <filter id={filterId} x='0' y='0' width='100%' height='100%'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.015'
              numOctaves='3'
              seed={
                Math.abs(
                  seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
                ) % 100
              }
              result='noise'
            >
              <animate
                attributeName='baseFrequency'
                values='0.015;0.018;0.015'
                dur='6s'
                repeatCount='indefinite'
                calcMode='spline'
                keySplines='0.4 0 0.2 1;0.4 0 0.2 1'
              />
            </feTurbulence>
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0.08 0'
              in='noise'
              result='softNoise'
            />
            <feComposite in='softNoise' in2='SourceGraphic' operator='over' />
          </filter>
        </defs>
      </svg>

      {/* 雾层主体：深灰色完全不透明径向渐变 */}
      <div
        className={`absolute inset-0 ${
          isBreathing ? 'animate-mist-breathe' : ''
        }`}
        style={{
          background: `radial-gradient(circle at center, #222228 0%, #1a1a1f 55%, #141418 100%)`,
          filter: `url(#${filterId})`,
          animationDelay: `${delay}s`,
        }}
      />

      {/* 迷雾表面的提示图标与文字 */}
      <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
        <HelpCircle className='w-14 h-14 text-gray-500 mb-3' />
        <p className='text-gray-400 text-sm font-medium text-center px-4'>
          {isBreathing
            ? t('gameComponent.room.roleCard.takenByOther')
            : t('gameComponent.room.roleCard.clickToDraw')}
        </p>
        {isBreathing && (
          <p className='text-gray-500 text-xs mt-2'>
            {t('gameComponent.room.roleCard.waitingForReveal')}
          </p>
        )}
      </div>
    </div>
  );
};
