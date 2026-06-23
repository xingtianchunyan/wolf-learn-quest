import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Database,
  Gauge,
  RefreshCw,
  Settings,
  AlertTriangle,
} from 'lucide-react';

interface CacheStats {
  totalSize: number;
  hitCount: number;
  missCount: number;
  hitRate: number;
  lastCleanup?: Date | null;
}

interface SkillSystemAdminTabProps {
  isJudge: boolean;
  loading: boolean;
  cacheStats: CacheStats;
  onRefreshData: () => void;
  onClearCache: () => void;
}

export const SkillSystemAdminTab: React.FC<SkillSystemAdminTabProps> = ({
  isJudge,
  loading,
  cacheStats,
  onRefreshData,
  onClearCache,
}) => {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Database className='h-5 w-5' />
              数据管理
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Button
                onClick={onRefreshData}
                className='w-full'
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
                />
                {loading ? '刷新中...' : '刷新数据'}
              </Button>

              <Button
                onClick={onClearCache}
                variant='outline'
                className='w-full'
              >
                清理缓存
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Gauge className='h-5 w-5' />
              缓存统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>缓存条目</span>
                <span>{cacheStats.totalSize}</span>
              </div>
              <div className='flex justify-between'>
                <span>命中次数</span>
                <span>{cacheStats.hitCount}</span>
              </div>
              <div className='flex justify-between'>
                <span>未命中次数</span>
                <span>{cacheStats.missCount}</span>
              </div>
              <div className='flex justify-between'>
                <span>命中率</span>
                <span className='font-medium text-green-600'>
                  {cacheStats.hitRate.toFixed(1)}%
                </span>
              </div>
              {cacheStats.lastCleanup && (
                <div className='flex justify-between text-sm text-gray-600'>
                  <span>上次清理</span>
                  <span>{cacheStats.lastCleanup.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {!isJudge && (
        <Alert>
          <AlertTriangle className='h-4 w-4' />
          <AlertDescription>
            部分管理功能仅对游戏法官开放。如需完整权限，请联系法官。
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
