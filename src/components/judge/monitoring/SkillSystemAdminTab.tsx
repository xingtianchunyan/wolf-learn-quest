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
import { useLanguage } from '@/components/layout/LanguageSwitcher';

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
  const { t } = useLanguage();
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Database className='h-5 w-5' />
              {t('judge.skillAdmin.dataManagement.title')}
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
                {loading
                  ? t('common.refreshing')
                  : t('judge.skillAdmin.refreshData')}
              </Button>

              <Button
                onClick={onClearCache}
                variant='outline'
                className='w-full'
              >
                {t('judge.skillAdmin.clearCache')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Gauge className='h-5 w-5' />
              {t('judge.skillAdmin.cacheStats.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>{t('judge.skillAdmin.cacheStats.totalSize')}</span>
                <span>{cacheStats.totalSize}</span>
              </div>
              <div className='flex justify-between'>
                <span>{t('judge.skillAdmin.cacheStats.hitCount')}</span>
                <span>{cacheStats.hitCount}</span>
              </div>
              <div className='flex justify-between'>
                <span>{t('judge.skillAdmin.cacheStats.missCount')}</span>
                <span>{cacheStats.missCount}</span>
              </div>
              <div className='flex justify-between'>
                <span>{t('judge.skillAdmin.cacheStats.hitRate')}</span>
                <span className='font-medium text-green-600'>
                  {cacheStats.hitRate.toFixed(1)}%
                </span>
              </div>
              {cacheStats.lastCleanup && (
                <div className='flex justify-between text-sm text-gray-600'>
                  <span>{t('judge.skillAdmin.cacheStats.lastCleanup')}</span>
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
            {t('judge.skillAdmin.judgeOnlyAlert')}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
