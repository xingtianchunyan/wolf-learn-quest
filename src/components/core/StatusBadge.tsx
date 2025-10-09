import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'default',
  className
}) => {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
      case '可用':
      case 'available':
        return 'text-green-400 border-green-400';
      case 'used':
      case '已使用':
        return 'text-yellow-400 border-yellow-400';
      case 'blocked':
      case '禁用':
      case 'disabled':
        return 'text-red-400 border-red-400';
      case 'pending':
      case '等待':
        return 'text-blue-400 border-blue-400';
      default:
        return 'text-werewolf-purple border-werewolf-purple/50';
    }
  };

  return (
    <Badge 
      variant={variant} 
      className={cn(getStatusColor(status), className)}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;