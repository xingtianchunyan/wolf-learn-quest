import React, { useMemo } from 'react';

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
 * - 使用 SVG feTurbulence + feDisplacementMap 生成真实雾气颗粒
 * - 径向渐变实现中心厚、边缘薄的体积感
 * - 呼吸动画：opacity 波动 + feTurbulence baseFrequency 漂移 + 轻微 scale
 * - 支持 prefers-reduced-motion（CSS 层停止呼吸，保留静态雾）
 */
export const RoleCardFogOverlay: React.FC<RoleCardFogOverlayProps> = ({
  isActive,
  isBreathing = false,
  seed,
}) => {
  const { filterId, gradientId, delay } = useMemo(() => {
    let hash = 0;
    const base = seed || 'default';
    for (let i = 0; i < base.length; i++) {
      const char = base.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const positiveHash = Math.abs(hash);
    return {
      filterId: `fog-filter-${positiveHash}`,
      gradientId: `fog-gradient-${positiveHash}`,
      delay: (positiveHash % 3000) / 1000,
    };
  }, [seed]);

  if (!isActive) return null;

  return (
    <div
      className='absolute inset-0 z-20 pointer-events-none rounded-lg overflow-hidden'
      aria-hidden='true'
    >
      {/* SVG 滤镜定义 */}
      <svg className='absolute w-0 h-0'>
        <defs>
          <filter id={filterId} x='-20%' y='-20%' width='140%' height='140%'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.01'
              numOctaves='4'
              seed={
                Math.abs(
                  seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
                ) % 100
              }
              result='noise'
            >
              <animate
                attributeName='baseFrequency'
                values='0.01;0.015;0.012;0.018;0.01'
                dur='6s'
                repeatCount='indefinite'
                calcMode='spline'
                keySplines='0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1'
              />
            </feTurbulence>
            <feDisplacementMap
              in='SourceGraphic'
              in2='noise'
              scale='18'
              xChannelSelector='R'
              yChannelSelector='G'
            />
          </filter>
          <radialGradient id={gradientId} cx='50%' cy='50%' r='70%'>
            <stop offset='0%' stopColor='#1a1a2e' stopOpacity='0.75' />
            <stop offset='55%' stopColor='#0f172a' stopOpacity='0.55' />
            <stop offset='100%' stopColor='#0f172a' stopOpacity='0.3' />
          </radialGradient>
        </defs>
      </svg>

      {/* 雾层主体：径向渐变 + 噪点位移 + 背景模糊 */}
      <div
        className={`absolute inset-0 backdrop-blur-[2px] ${
          isBreathing ? 'animate-mist-breathe' : ''
        }`}
        style={{
          background: `radial-gradient(circle at center, rgba(26,26,46,0.75) 0%, rgba(15,23,42,0.55) 55%, rgba(15,23,42,0.3) 100%)`,
          filter: `url(#${filterId})`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
};
