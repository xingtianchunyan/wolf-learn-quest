import React from 'react';
import type { ExpandedRole } from '@/utils/roleConfiguration';
import type { RoleDesign } from '@/hooks/useRoleDesigns';

interface RoleCardProps {
  role: ExpandedRole;
  roleDesign: RoleDesign | null;
  isSelected: boolean;
  isCurrentSelection: boolean;
  canSelect: boolean;
  imageUrl: string | null;
  flipped: boolean;
  onFlip: () => void;
  onSelect: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  roleDesign,
  isSelected,
  isCurrentSelection,
  canSelect,
  imageUrl,
  flipped,
  onFlip,
  onSelect,
}) => {
  return (
    <div
      className={`relative transition-all duration-300 transform hover:scale-105 ${
        isCurrentSelection
          ? 'ring-2 ring-werewolf-purple'
          : isSelected
            ? 'ring-2 ring-red-500'
            : ''
      }`}
      style={{ perspective: '1000px' }}
    >
      {isSelected && !isCurrentSelection && (
        <div className='absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs'>
          已选择
        </div>
      )}
      {isCurrentSelection && (
        <div className='absolute top-2 right-2 z-10 bg-werewolf-purple text-white px-2 py-1 rounded text-xs'>
          我的选择
        </div>
      )}
      <div
        className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 正面 - 角色形象和名称 */}
        <div
          className={`absolute inset-0 w-full h-full rounded-lg p-4 backface-hidden ${
            isCurrentSelection
              ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple'
              : isSelected
                ? 'bg-red-900/30 border-2 border-red-500'
                : 'bg-werewolf-dark/40 hover:bg-werewolf-dark/60'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className='h-full flex flex-col'>
            <div
              className={`flex-1 bg-werewolf-dark/60 rounded-md mb-3 flex items-center justify-center overflow-hidden relative ${
                canSelect
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed opacity-60'
              }`}
              onClick={() => canSelect && onSelect()}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={role.displayName}
                  className='w-full h-full object-cover rounded-md'
                  onError={e => {
                    console.error('Image failed to load:', imageUrl);
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector(
                      '.fallback-icon'
                    ) as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                className={`fallback-icon ${imageUrl ? 'hidden' : 'flex'} absolute inset-0 text-6xl items-center justify-center w-full h-full`}
              >
                🎭
              </div>
            </div>
            <div
              className='text-center cursor-pointer'
              onClick={onFlip}
            >
              <h3 className='font-bold text-lg text-white mb-2'>
                {role.displayName}
              </h3>
              <div className='text-xs text-gray-400'>
                单击图片选中，单击名称翻面
              </div>
            </div>
          </div>
        </div>

        {/* 背面 - 阵营和技能详情 */}
        <div
          className={`absolute inset-0 w-full h-full rounded-lg p-4 backface-hidden rotate-y-180 ${
            isCurrentSelection
              ? 'bg-werewolf-purple/30 border-2 border-werewolf-purple'
              : isSelected
                ? 'bg-red-900/30 border-2 border-red-500'
                : 'bg-werewolf-dark/40'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className='h-full flex flex-col'>
            <div className='text-center mb-4'>
              <h3 className='font-bold text-lg text-white mb-2'>
                {role.displayName}
              </h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  roleDesign?.faction === false
                    ? 'bg-green-900/60 text-green-200'
                    : roleDesign?.faction === true
                      ? 'bg-red-900/60 text-red-200'
                      : 'bg-purple-900/60 text-purple-200'
                }`}
              >
                {roleDesign?.faction === false
                  ? '村民'
                  : roleDesign?.faction === true
                    ? '狼人'
                    : '未知'}
                阵营
              </span>
            </div>

            <div className='flex-1 bg-werewolf-dark/60 rounded-md p-2'>
              <div className='space-y-2'>
                <div>
                  <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                    技能名称
                  </h4>
                  <p className='text-xs text-gray-300'>
                    {roleDesign?.skill_name || '无技能'}
                  </p>
                </div>

                <div>
                  <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                    技能效果
                  </h4>
                  <p className='text-xs text-gray-300 leading-tight'>
                    {roleDesign?.skill_description || '暂无详细说明'}
                  </p>
                </div>

                <div>
                  <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                    使用次数
                  </h4>
                  <p className='text-sm text-gray-300'>
                    {roleDesign?.skill_usage === -1
                      ? '无限制'
                      : roleDesign?.skill_usage || 0}
                  </p>
                </div>

                <div>
                  <h4 className='text-xs text-werewolf-purple font-semibold mb-0.5'>
                    技能类型
                  </h4>
                  <p className='text-sm text-gray-300'>
                    {roleDesign?.skill_type
                      ? Array.isArray(roleDesign.skill_type)
                        ? roleDesign.skill_type.join(', ')
                        : JSON.stringify(roleDesign.skill_type)
                      : '无'}
                  </p>
                </div>
              </div>
            </div>

            <div
              className='text-center mt-3 cursor-pointer'
              onClick={onFlip}
            >
              <div className='text-xs text-gray-400'>单击返回正面</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
