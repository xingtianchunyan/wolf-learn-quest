import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className='feature-card'>
      <div className='feature-icon'>
        <Icon className='h-8 w-8 text-werewolf-purple' />
      </div>
      <h3 className='text-lg font-bold mb-2 text-werewolf-purple'>{title}</h3>
      <p className='text-center text-sm'>{description}</p>
    </div>
  );
};

export default FeatureCard;
