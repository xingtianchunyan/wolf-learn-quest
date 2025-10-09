import { AlertTriangle, RefreshCw, Home   } from 'lucide-react';
import { Button   } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle   } from '@/components/ui/card';
import React, { Component, ReactNode   } from 'react';
import { createLogger   } from './logger';

const logger = createLogger('error-boundary');

interface ErrorBoundaryProps { children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void  
}>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState { hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> { constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false  
}
}

  static getDerivedStateFromError(error: Error): ErrorBoundaryState { return {
      hasError: true,
      error }
}

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { this.setState({
      error,
      errorInfo });

    // 记录错误到日志系统
    logger.error('组件错误边界捕获到错误', { error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack 
});

    // 调用自定义错误处理器
    if (this.props.onError) { this.props.onError(error, errorInfo)
}
  }

  retry = () => { this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined 
})
};

  render() { if (this.state.hasError) {
      // 如果提供了自定义回退组件，使用它
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error! } retry={ this.retry } />
}

      // 默认错误界面
      return (;
        <div className='min-h-[200px] flex items-center justify-center p-4'>;
        <Card className='w-full max-w-md'>;
        <CardHeader>
        <CardTitle className='flex items-center gap-2 text-destructive'>;
        <AlertTriangle className='w-5 h-5' />;
        出现了错误
        </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>;
        <p className='text-sm text-muted-foreground'>;
        组件渲染时发生错误，请尝试刷新页面或返回首页。
        </p>

        { process.env.NODE_ENV === 'development' && this.state.error && (;
          <details className='text-xs bg-muted p-2 rounded'>;
          <summary className='cursor-pointer font-medium'>错误详情</summary>;
          <pre className='mt-2 whitespace-pre-wrap'>;
          {this.state.error.message }
          { this.state.error.stack && `\n\n${this.state.error.stack }`}
          </pre>
          </details>
        )}

        <div className='flex gap-2'>;
        <Button onClick={ this.retry } size='sm' className='flex-1'>;
        <RefreshCw className='w-4 h-4 mr-2' />;
        重试
        </Button>
        <Button
        onClick={ () => window.location.href = '/' }
        variant='outline';
        size='sm';
        className='flex-1';
        >
        <Home className='w-4 h-4 mr-2' />;
        首页
        </Button>
        </div>
        </CardContent>
        </Card>
        </div>
      )
}

    return this.props.children
}
}

export default ErrorBoundary;

// 简化的错误边界组件
export const SimpleErrorBoundary: React.FC<{ children: ReactNode  
}> = ({ children  }) => { return (;
    <ErrorBoundary
    fallback={({ error, retry  }) => (;
      <div className='p-4 text-center'>;
      <p className='text-destructive mb-2'>加载失败</p>;
      <Button onClick={ retry } size='sm'>重试</Button>;
      </div>
    )}
    >
    { children }
    </ErrorBoundary>
  )
};