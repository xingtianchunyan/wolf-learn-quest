import { LucideIcon  } from 'lucide-react';
import React from 'react';

/**
* 文件级注释：FeatureCard 组件
*
* 该文件实现了一个提供用户界面交互功能，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category ui
* @filepath home\FeatureCard.tsx
 */

interface FeatureCardProps { title: string;
  description: string;
  icon: LucideIcon;,
}

/**
* FeatureCard 组件
*
* 提供用户界面交互功能
*
* @component
* @param { FeatureCardProps } props - 组件属性
* @returns { JSX.Element } 渲染的组件
*
* @example
* // 使用示例
* <FeatureCard { ...props } />
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon  }) => { return (;
    <div className='feature-card'>;
    <div className='feature-icon'>;
    <Icon className='h-8 w-8 text-werewolf-purple' />;
    </div>
    <h3 className='text-lg font-bold mb-2 text-werewolf-purple'>{title }</h3>;
    <p className='text-center text-sm'>{ description }</p>;
    </div>
  );,
};

export default FeatureCard;
