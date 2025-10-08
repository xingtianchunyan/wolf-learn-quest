/**
 * @fileoverview 调试面板组件 - 提供可视化调试界面
 * @author SOLO Coding
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  debugSystem, 
  DebugLevel, 
  DebugLogEntry, 
  PerformanceMetrics, 
  StateSnapshot,
  DebugConfig 
} from '@/utils/debugSystem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bug, 
  Download, 
  Trash2, 
  Play, 
  Pause,
  RefreshCw
} from 'lucide-react';

/**
 * 调试面板组件属性接口
 */
interface DebugPanelProps {
  /** 是否显示面板 */
  isVisible?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 初始标签页 */
  defaultTab?: string;
}

/**
 * 日志过滤器接口
 */
interface LogFilter {
  level?: DebugLevel;
  module?: string;
  search?: string;
  startTime?: number;
  endTime?: number;
}

/**
 * 调试面板组件
 */
export const DebugPanel: React.FC<DebugPanelProps> = ({
  isVisible = false,
  onClose,
  defaultTab = 'logs'
}) => {
  const [config, setConfig] = useState<DebugConfig>(debugSystem.getConfig());
  const [logs, setLogs] = useState<DebugLogEntry[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics[]>([]);
  const [stateSnapshots, setStateSnapshots] = useState<StateSnapshot[]>([]);
  const [logFilter, setLogFilter] = useState<LogFilter>({});
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  /**
   * 刷新数据
   */
  const refreshData = useCallback(() => {
    setLogs(debugSystem.getLogs(logFilter));
    setPerformanceMetrics(debugSystem.getPerformanceMetrics());
    setStateSnapshots(debugSystem.getStateSnapshots());
  }, [logFilter]);

  /**
   * 设置自动刷新
   */
  useEffect(() => {
    if (autoRefresh && isVisible) {
      const interval = setInterval(refreshData, 1000);
      setRefreshInterval(interval);
      return () => clearInterval(interval);
    } else if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
  }, [autoRefresh, isVisible, refreshData]);

  /**
   * 初始化数据
   */
  useEffect(() => {
    if (isVisible) {
      refreshData();
    }
  }, [isVisible, refreshData]);

  /**
   * 更新配置
   */
  const updateConfig = (newConfig: Partial<DebugConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    debugSystem.updateConfig(newConfig);
  };

  /**
   * 获取日志级别颜色
   */
  const getLogLevelColor = (level: DebugLevel): string => {
    switch (level) {
      case DebugLevel.ERROR: return 'destructive';
      case DebugLevel.WARN: return 'secondary';
      case DebugLevel.INFO: return 'default';
      case DebugLevel.DEBUG: return 'outline';
      case DebugLevel.TRACE: return 'outline';
      default: return 'default';
    }
  };

  /**
   * 格式化时间
   */
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  /**
   * 格式化持续时间
   */
  const formatDuration = (duration: number): string => {
    if (duration < 1000) {
      return `${duration.toFixed(2)}ms`;
    }
    return `${(duration / 1000).toFixed(2)}s`;
  };

  /**
   * 导出调试数据
   */
  const exportDebugData = () => {
    const data = debugSystem.exportDebugData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-data-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            调试面板
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {autoRefresh ? '暂停' : '开始'}
            </Button>
            <Button variant="outline" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
              刷新
            </Button>
            <Button variant="outline" size="sm" onClick={exportDebugData}>
              <Download className="h-4 w-4" />
              导出
            </Button>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                关闭
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <Tabs defaultValue={defaultTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="logs">日志</TabsTrigger>
              <TabsTrigger value="performance">性能</TabsTrigger>
              <TabsTrigger value="state">状态</TabsTrigger>
              <TabsTrigger value="config">配置</TabsTrigger>
            </TabsList>

            {/* 日志标签页 */}
            <TabsContent value="logs" className="flex-1 flex flex-col space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Label htmlFor="log-level">级别:</Label>
                  <Select
                    value={logFilter.level?.toString() || 'all'}
                    onValueChange={(value) => 
                      setLogFilter(prev => ({ 
                        ...prev, 
                        level: value === 'all' ? undefined : parseInt(value) 
                      }))
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="0">错误</SelectItem>
                      <SelectItem value="1">警告</SelectItem>
                      <SelectItem value="2">信息</SelectItem>
                      <SelectItem value="3">调试</SelectItem>
                      <SelectItem value="4">跟踪</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="log-module">模块:</Label>
                  <Input
                    id="log-module"
                    placeholder="模块名称"
                    value={logFilter.module || ''}
                    onChange={(e) => 
                      setLogFilter(prev => ({ ...prev, module: e.target.value || undefined }))
                    }
                    className="w-32"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor="log-search">搜索:</Label>
                  <Input
                    id="log-search"
                    placeholder="搜索消息"
                    value={logFilter.search || ''}
                    onChange={(e) => 
                      setLogFilter(prev => ({ ...prev, search: e.target.value || undefined }))
                    }
                    className="w-48"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => debugSystem.clearLogs()}
                >
                  <Trash2 className="h-4 w-4" />
                  清除
                </Button>
              </div>

              <ScrollArea className="flex-1 border rounded-md">
                <div className="p-4 space-y-2">
                  {logs
                    .filter(log => {
                      if (logFilter.search && !log.message.toLowerCase().includes(logFilter.search.toLowerCase())) {
                        return false;
                      }
                      return true;
                    })
                    .map((log, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 border rounded text-sm">
                      <Badge variant={getLogLevelColor(log.level) as any}>
                        {DebugLevel[log.level]}
                      </Badge>
                      <span className="text-muted-foreground min-w-20">
                        {formatTime(log.timestamp)}
                      </span>
                      <Badge variant="outline">{log.module}</Badge>
                      <span className="flex-1">{log.message}</span>
                      {log.data && (
                        <details className="text-xs">
                          <summary className="cursor-pointer">数据</summary>
                          <pre className="mt-1 p-2 bg-muted rounded">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* 性能标签页 */}
            <TabsContent value="performance" className="flex-1 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">性能指标</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => debugSystem.clearPerformanceMetrics()}
                >
                  <Trash2 className="h-4 w-4" />
                  清除
                </Button>
              </div>

              <ScrollArea className="flex-1 border rounded-md">
                <div className="p-4 space-y-2">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{metric.label}</span>
                        <Badge variant="outline">{metric.module}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">开始时间:</span>
                          <span className="ml-2">{formatTime(metric.startTime)}</span>
                        </div>
                        {metric.endTime && (
                          <div>
                            <span className="text-muted-foreground">结束时间:</span>
                            <span className="ml-2">{formatTime(metric.endTime)}</span>
                          </div>
                        )}
                        {metric.duration && (
                          <div>
                            <span className="text-muted-foreground">持续时间:</span>
                            <span className="ml-2">{formatDuration(metric.duration)}</span>
                          </div>
                        )}
                        {metric.memoryUsage && (
                          <div>
                            <span className="text-muted-foreground">内存使用:</span>
                            <span className="ml-2">{(metric.memoryUsage / 1024 / 1024).toFixed(2)}MB</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* 状态标签页 */}
            <TabsContent value="state" className="flex-1 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">状态快照</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => debugSystem.clearStateSnapshots()}
                >
                  <Trash2 className="h-4 w-4" />
                  清除
                </Button>
              </div>

              <ScrollArea className="flex-1 border rounded-md">
                <div className="p-4 space-y-2">
                  {stateSnapshots.map((snapshot, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{snapshot.module}</Badge>
                          {snapshot.action && (
                            <Badge variant="secondary">{snapshot.action}</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(snapshot.timestamp)}
                        </span>
                      </div>
                      <details className="text-sm">
                        <summary className="cursor-pointer">查看状态</summary>
                        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                          {JSON.stringify(snapshot.state, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* 配置标签页 */}
            <TabsContent value="config" className="flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">基本设置</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="debug-enabled">启用调试</Label>
                    <Switch
                      id="debug-enabled"
                      checked={config.enabled}
                      onCheckedChange={(checked) => updateConfig({ enabled: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="debug-level">调试级别</Label>
                    <Select
                      value={config.level.toString()}
                      onValueChange={(value) => updateConfig({ level: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">错误</SelectItem>
                        <SelectItem value="1">警告</SelectItem>
                        <SelectItem value="2">信息</SelectItem>
                        <SelectItem value="3">调试</SelectItem>
                        <SelectItem value="4">跟踪</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-logs">最大日志数</Label>
                    <Input
                      id="max-logs"
                      type="number"
                      value={config.maxLogs}
                      onChange={(e) => updateConfig({ maxLogs: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">显示选项</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-timestamp">显示时间戳</Label>
                    <Switch
                      id="show-timestamp"
                      checked={config.showTimestamp}
                      onCheckedChange={(checked) => updateConfig({ showTimestamp: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-stack">显示调用栈</Label>
                    <Switch
                      id="show-stack"
                      checked={config.showStack}
                      onCheckedChange={(checked) => updateConfig({ showStack: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="persist-logs">持久化日志</Label>
                    <Switch
                      id="persist-logs"
                      checked={config.persistLogs}
                      onCheckedChange={(checked) => updateConfig({ persistLogs: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">模块过滤</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="enabled-modules">启用的模块 (逗号分隔)</Label>
                  <Input
                    id="enabled-modules"
                    placeholder="Game,Chat,Auth"
                    value={config.enabledModules.join(',')}
                    onChange={(e) => updateConfig({ 
                      enabledModules: e.target.value.split(',').filter(m => m.trim()) 
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disabled-modules">禁用的模块 (逗号分隔)</Label>
                  <Input
                    id="disabled-modules"
                    placeholder="Test,Mock"
                    value={config.disabledModules.join(',')}
                    onChange={(e) => updateConfig({ 
                      disabledModules: e.target.value.split(',').filter(m => m.trim()) 
                    })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};