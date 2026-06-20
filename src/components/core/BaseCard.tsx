import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BaseCardProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({
  title,
  icon: Icon,
  children,
  className,
  contentClassName,
  headerClassName,
}) => {
  return (
    <Card
      className={cn('bg-werewolf-card border-werewolf-purple/30', className)}
    >
      <CardHeader className={cn('pb-3', headerClassName)}>
        <CardTitle className='text-werewolf-purple flex items-center text-lg'>
          {Icon && <Icon className='mr-2 h-5 w-5' />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(contentClassName)}>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
